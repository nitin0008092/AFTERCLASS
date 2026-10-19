import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Public client (for client-side or anonymous reads/inserts)
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Server-side privileged client (for Admin API routes and batch tasks)
export const supabaseAdmin =
  supabaseUrl && (supabaseServiceRoleKey || supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey!)
    : null;

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
