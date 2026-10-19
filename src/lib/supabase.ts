// Supabase Client Helper for Waitlist / Launch Registrations
// Uses public ANON KEY or standard environment variables safely without leaking secrets

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface RegistrationPayload {
  name: string;
  email: string;
  instagram?: string;
  source?: string;
}

/*
-- SUPABASE SQL MIGRATION SCHEMA (Run in Supabase SQL editor):
create table if not exists public.launch_registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  instagram text,
  source text default 'website',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.launch_registrations enable row level security;

-- Allow anonymous inserts only (public waitlist submission)
create policy "Allow anonymous submission"
on public.launch_registrations
for insert
with check (true);

-- Product Interest Table for Drop 01
create table if not exists public.product_interest (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  mobile text not null,
  email text,
  city text,
  product_name text not null,
  color text not null,
  size text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.product_interest enable row level security;

create policy "Allow anonymous product interest"
on public.product_interest
for insert
with check (true);
*/
