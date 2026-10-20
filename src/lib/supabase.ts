import { createClient } from "@supabase/supabase-js";

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && (service || anon)) {
    return createClient(url, service || anon!);
  }
  return null;
}

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (url && anon) {
    return createClient(url, anon);
  }
  return null;
}

// Backwards compatible exports
export const supabase = getSupabaseClient();
export const supabaseAdmin = getSupabaseAdmin();

export interface RegistrationRecord {
  id?: string;
  registration_id: string;
  customer_name: string;
  customer_email: string;
  phone?: string | null;
  product_name: string;
  colour: string;
  size: string;
  quantity: number;
  referral_source?: string;
  consent: boolean;
  status: "pending" | "reviewed" | "contacted" | "vip";
  internal_email_status: string;
  customer_email_status: string;
  sheets_sync_status: string;
  sync_error?: string | null;
  last_synced_at?: string | null;
  created_at: string;
  updated_at?: string;
}
