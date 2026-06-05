-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard)
-- Creates shared site content storage for the admin panel.

create table if not exists public.site_content (
  id text primary key default 'main',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Public read site content" on public.site_content;
create policy "Public read site content"
  on public.site_content
  for select
  using (true);

drop policy if exists "Authenticated insert site content" on public.site_content;
create policy "Authenticated insert site content"
  on public.site_content
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update site content" on public.site_content;
create policy "Authenticated update site content"
  on public.site_content
  for update
  to authenticated
  using (true)
  with check (true);

insert into public.site_content (id, data)
values ('main', '{}'::jsonb)
on conflict (id) do nothing;

-- Create an admin user in Supabase Dashboard:
-- Authentication → Users → Add user (email + password)
