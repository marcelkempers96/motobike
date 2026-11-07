-- Motopedia: "Brand a bike" requests (/brand/). Run in the Supabase SQL editor
-- after docs/supabase.sql (it uses public.is_admin()). Safe to run twice.

-- 1. Requests. Visitors may insert; only admins can read or update.
create table if not exists public.brand_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  company text not null,
  name text not null,
  email text not null constraint brand_requests_email_format check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
  country text not null,
  fleet text,
  message text,
  logo_path text,
  preview_path text,
  consent boolean not null,
  status text not null default 'new'
);
create index if not exists brand_requests_created_idx on public.brand_requests (created_at desc);

alter table public.brand_requests enable row level security;
grant insert on public.brand_requests to anon, authenticated;
grant select, update on public.brand_requests to authenticated;

drop policy if exists "anyone can send a brand request" on public.brand_requests;
create policy "anyone can send a brand request" on public.brand_requests for insert to anon, authenticated
  with check (
    consent = true
    and status = 'new'
    and char_length(company) between 1 and 200
    and char_length(name) between 1 and 200
    and char_length(email) between 3 and 320
    and char_length(country) between 1 and 100
    and (fleet is null or char_length(fleet) <= 50)
    and (message is null or char_length(message) <= 4000)
    and (logo_path is null or (char_length(logo_path) <= 200 and logo_path like id::text || '/%'))
    and (preview_path is null or (char_length(preview_path) <= 200 and preview_path like id::text || '/%'))
  );
-- No select policy for anon or ordinary users: they cannot read any request, not even their own.
drop policy if exists "admins read brand requests" on public.brand_requests;
create policy "admins read brand requests" on public.brand_requests for select to authenticated using (public.is_admin());
drop policy if exists "admins update brand requests" on public.brand_requests;
create policy "admins update brand requests" on public.brand_requests for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 2. Files: bucket brand-requests, path <uuid>/logo.<ext> and <uuid>/preview.png.
-- The bucket is public so the links in the team email open directly. A public bucket serves
-- files by URL without a select policy, so no one can list the bucket through the API.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('brand-requests', 'brand-requests', true, 5242880, array['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];

drop policy if exists "brand requests upload" on storage.objects;
create policy "brand requests upload" on storage.objects for insert to anon, authenticated
  with check (
    bucket_id = 'brand-requests'
    and name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/(logo\.(png|jpg|svg|webp)|preview\.png)$'
  );
drop policy if exists "brand requests admin" on storage.objects;
create policy "brand requests admin" on storage.objects for all to authenticated
  using (bucket_id = 'brand-requests' and public.is_admin())
  with check (bucket_id = 'brand-requests' and public.is_admin());
