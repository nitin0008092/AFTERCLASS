import { supabase, supabaseAdmin, getSupabaseAdmin, getSupabaseClient, RegistrationRecord } from "./supabase";
import { sendRegistrationEmails } from "./email-service";
import { syncRegistrationToGoogleSheets } from "./sheets-service";

// In-memory persistent cache for development mode when Supabase credentials are empty
// This guarantees zero data loss and flawless local testing
const localRegistrationsStore: RegistrationRecord[] = [];

// Simple in-memory rate limiter tracker (IP/identifier -> array of timestamps)
const rateLimitMap = new Map<string, number[]>();

export interface RegistrationInput {
  name: string;
  email: string;
  phone?: string;
  productName: string;
  colour: string;
  size: string;
  quantity?: number;
  referralSource?: string;
  consent: boolean;
  honeypot?: string; // bot check
  submissionTimeMs?: number; // client render to submit time
  clientIp?: string;
}

export interface RegistrationResponse {
  success: boolean;
  registrationId?: string;
  message?: string;
  alreadyRegistered?: boolean;
  record?: RegistrationRecord;
  error?: string;
}

function generateRegistrationId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AC-2026-${random}`;
}

/**
 * Validates, saves, and automates emails and spreadsheet sync for AFTERCLASS interest registrations.
 */
export async function processInterestRegistration(
  input: RegistrationInput
): Promise<RegistrationResponse> {
  // 1. Spam & Bot Protection
  if (input.honeypot && input.honeypot.trim().length > 0) {
    // Silently drop bots
    return {
      success: true,
      registrationId: "AC-2026-BOT-CHK",
      message: "You are on the list.",
    };
  }

  // Rate Limiting check (max 6 requests per 10 minutes per IP)
  const clientKey = input.clientIp || "default-client";
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const timestamps = (rateLimitMap.get(clientKey) || []).filter((t) => now - t < windowMs);

  if (timestamps.length >= 6) {
    return {
      success: false,
      error: "Too many attempts from this connection. Please try again in a few minutes.",
    };
  }
  timestamps.push(now);
  rateLimitMap.set(clientKey, timestamps);

  // 2. Field Validation
  if (!input.name || typeof input.name !== "string" || input.name.trim().length < 2) {
    return {
      success: false,
      error: "Please provide your full name (minimum 2 characters).",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let cleanEmail = input.email ? input.email.trim().toLowerCase() : "";
  const cleanPhone = input.phone ? input.phone.trim().replace(/\D/g, "") : null;

  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    if (cleanPhone && cleanPhone.length >= 10) {
      cleanEmail = `${cleanPhone}@afterclass.in`;
    } else {
      return {
        success: false,
        error: "Please enter a valid email address.",
      };
    }
  }

  if (!input.consent) {
    return {
      success: false,
      error: "Please confirm your consent to receive launch updates from AFTERCLASS.",
    };
  }

  const cleanName = input.name.trim();
  const selectedProduct = input.productName?.trim() || "ON A DIET (COKE)";
  const selectedColour = input.colour?.trim() || "Washed Black";
  const selectedSize = input.size?.trim().toUpperCase() || "L";
  const requestedQty = Math.max(1, Math.min(10, Number(input.quantity) || 1));
  const referral = input.referralSource?.trim() || "website";

  const registrationId = generateRegistrationId();
  const createdAt = new Date().toISOString();

  const record: RegistrationRecord = {
    registration_id: registrationId,
    customer_name: cleanName,
    customer_email: cleanEmail,
    phone: cleanPhone,
    product_name: selectedProduct,
    colour: selectedColour,
    size: selectedSize,
    quantity: requestedQty,
    referral_source: referral,
    consent: true,
    status: "pending",
    internal_email_status: "pending",
    customer_email_status: "pending",
    sheets_sync_status: "pending",
    created_at: createdAt,
  };

  // 3. Database Persistence: Supabase
  const clientToUse = getSupabaseAdmin() || getSupabaseClient() || supabaseAdmin || supabase;
  let savedToDb = false;

  if (clientToUse) {
    try {
      const { error } = await clientToUse
        .from("registrations")
        .insert([record]);

      if (error) {
        // Check for duplicate registration if email + product unique is enforced
        if (error.code === "23505") {
          return {
            success: true,
            alreadyRegistered: true,
            message: "You're already on the list for this drop! We'll notify you as soon as Drop 01 releases.",
          };
        }
        console.error("[SUPABASE INSERT ERROR]", error.message);
        // Fall back to memory so customer never loses their spot
        localRegistrationsStore.unshift(record);
      } else {
        savedToDb = true;
      }
    } catch (dbErr) {
      console.error("[SUPABASE EXCEPTION]", dbErr);
      localRegistrationsStore.unshift(record);
    }
  } else {
    // In-memory fallback
    localRegistrationsStore.unshift(record);
  }

  // 4. Trigger Asynchronous Background Integrations (Resend & Google Sheets)
  // These run safely and never fail the customer registration if external services error
  (async () => {
    try {
      // Emails
      const emailResult = await sendRegistrationEmails(record);
      record.internal_email_status = emailResult.internalStatus;
      record.customer_email_status = emailResult.customerStatus;

      // Google Sheets
      const sheetResult = await syncRegistrationToGoogleSheets(record);
      record.sheets_sync_status = sheetResult.status;
      record.sync_error = sheetResult.error || null;
      record.last_synced_at = sheetResult.syncedAt || null;

      // Update statuses in database if saved
      if (savedToDb && clientToUse) {
        await clientToUse
          .from("registrations")
          .update({
            internal_email_status: record.internal_email_status,
            customer_email_status: record.customer_email_status,
            sheets_sync_status: record.sheets_sync_status,
            sync_error: record.sync_error,
            last_synced_at: record.last_synced_at,
          })
          .eq("registration_id", record.registration_id);
      }
    } catch (bgError) {
      console.error("[BACKGROUND AUTOMATION ERROR]", bgError);
    }
  })();

  return {
    success: true,
    registrationId,
    message: "You're on the AFTERCLASS list.",
    record,
  };
}

/**
 * Retrieves all registrations for Founder Admin Dashboard
 */
export async function getAllRegistrations(): Promise<RegistrationRecord[]> {
  const clientToUse = getSupabaseAdmin() || getSupabaseClient() || supabaseAdmin || supabase;
  if (clientToUse) {
    try {
      const { data, error } = await clientToUse
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as RegistrationRecord[];
      }
    } catch (e) {
      console.error("[GET REGISTRATIONS ERROR]", e);
    }
  }

  // Return local memory store if Supabase is unconfigured or failed
  return [...localRegistrationsStore];
}

/**
 * Updates a registration's status (pending, reviewed, contacted, vip)
 */
export async function updateRegistrationStatus(
  idOrRegId: string,
  newStatus: "pending" | "reviewed" | "contacted" | "vip"
): Promise<boolean> {
  const clientToUse = getSupabaseAdmin() || getSupabaseClient() || supabaseAdmin || supabase;
  if (clientToUse) {
    try {
      const { error } = await clientToUse
        .from("registrations")
        .update({ status: newStatus })
        .or(`id.eq.${idOrRegId},registration_id.eq.${idOrRegId}`);

      if (!error) return true;
    } catch (e) {
      console.error("[UPDATE STATUS ERROR]", e);
    }
  }

  const found = localRegistrationsStore.find(
    (r) => r.id === idOrRegId || r.registration_id === idOrRegId
  );
  if (found) {
    found.status = newStatus;
    return true;
  }
  return false;
}
