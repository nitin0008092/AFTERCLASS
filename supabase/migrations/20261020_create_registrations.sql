-- ==============================================================================
-- AFTERCLASS DATABASE MIGRATION
-- Table: registrations
-- Description: Stores customer interest registrations for AFTERCLASS pre-launch
-- RLS: Enabled. Public insert permitted; read/update restricted to founders/service role.
-- ==============================================================================

-- Create registrations table
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  registration_id text unique not null,
  customer_name text not null,
  customer_email text not null,
  phone text,
  product_name text not null,
  colour text not null,
  size text not null,
  quantity integer not null default 1 check (quantity > 0 and quantity <= 10),
  referral_source text default 'website',
  consent boolean not null default true,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'contacted', 'vip')),
  internal_email_status text not null default 'pending',
  customer_email_status text not null default 'pending',
  sheets_sync_status text not null default 'pending',
  sync_error text,
  last_synced_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for speedy queries on registration ID, email, product, and creation date
create index if not exists idx_registrations_reg_id on public.registrations (registration_id);
create index if not exists idx_registrations_email on public.registrations (customer_email);
create index if not exists idx_registrations_product on public.registrations (product_name);
create index if not exists idx_registrations_created_at on public.registrations (created_at desc);

-- Enable Row Level Security (RLS)
alter table public.registrations enable row level security;

-- Policy 1: Allow public / anonymous users to INSERT new registrations only
create policy "Allow public interest registration insert"
on public.registrations
for insert
with check (true);

-- Policy 2: Restrict SELECT to authenticated service_role (Founder API / Admin)
create policy "Allow service_role full read access"
on public.registrations
for select
using (auth.role() = 'service_role' or auth.role() = 'authenticated');

-- Policy 3: Restrict UPDATE to authenticated service_role
create policy "Allow service_role update access"
on public.registrations
for update
using (auth.role() = 'service_role' or auth.role() = 'authenticated');

-- Policy 4: Restrict DELETE to service_role
create policy "Allow service_role delete access"
on public.registrations
for delete
using (auth.role() = 'service_role');

-- Trigger to auto-update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_update_registrations_updated_at on public.registrations;
create trigger trigger_update_registrations_updated_at
  before update on public.registrations
  for each row
  execute function public.update_updated_at_column();
