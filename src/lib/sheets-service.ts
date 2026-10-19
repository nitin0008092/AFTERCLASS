import { google } from "googleapis";
import { RegistrationRecord } from "./supabase";

const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export interface SheetsSyncResult {
  status: "synced" | "failed" | "skipped_no_creds" | "duplicate_skipped";
  error?: string;
  syncedAt?: string;
}

/**
 * Appends or updates a registration row in the private Google Sheet.
 * Ensures idempotency by checking if the Registration ID is already present in column A.
 */
export async function syncRegistrationToGoogleSheets(
  reg: RegistrationRecord
): Promise<SheetsSyncResult> {
  // If credentials are not set, fail gracefully without disrupting registration flow
  if (!serviceAccountEmail || !privateKey || !spreadsheetId) {
    console.info(
      `[AFTERCLASS SHEETS] Google Sheets credentials not configured. Skipping sync for Reg ID: ${reg.registration_id}`
    );
    return {
      status: "skipped_no_creds",
    };
  }

  try {
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Step 1: Ensure sheet header exists or read Column A to prevent duplicates
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "A:A",
    });

    const existingRows = getRes.data.values || [];

    // If sheet is completely empty, initialize headers first
    if (existingRows.length === 0) {
      const headers = [
        "Registration ID",
        "Registration Timestamp",
        "Customer Name",
        "Customer Email",
        "Optional Phone Number",
        "Product",
        "Colour",
        "Size",
        "Requested Quantity",
        "Referral Source",
        "Contact Consent",
        "Registration Status",
        "Internal Notification Status",
        "Customer Email Status",
        "Spreadsheet Sync Status",
      ];
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "A1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [headers],
        },
      });
    } else {
      // Check for duplicate Registration ID in column A
      const isAlreadyInSheet = existingRows.some(
        (row) => row[0] && row[0].toString().trim() === reg.registration_id.trim()
      );

      if (isAlreadyInSheet) {
        return {
          status: "duplicate_skipped",
          syncedAt: new Date().toISOString(),
        };
      }
    }

    // Step 2: Append new row
    const rowValues = [
      reg.registration_id,
      new Date(reg.created_at).toISOString(),
      reg.customer_name,
      reg.customer_email,
      reg.phone || "",
      reg.product_name,
      reg.colour,
      reg.size,
      reg.quantity,
      reg.referral_source || "website",
      reg.consent ? "TRUE" : "FALSE",
      reg.status,
      reg.internal_email_status,
      reg.customer_email_status,
      "synced",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "A:O",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowValues],
      },
    });

    return {
      status: "synced",
      syncedAt: new Date().toISOString(),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[AFTERCLASS SHEETS ERROR] Sync failed for ${reg.registration_id}:`, errorMsg);
    return {
      status: "failed",
      error: errorMsg,
    };
  }
}
