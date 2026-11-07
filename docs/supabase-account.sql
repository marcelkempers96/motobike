-- Motopedia: account dashboard, profile pictures, messages, admin.
-- Run AFTER docs/supabase.sql (and docs/supabase-brand.sql). Paste into SQL Editor > New query > Run.
-- Safe to run again.

-- 1. Profile picture and a short bio
alter table public.profiles add column if not exists avatar_path text;
alter table public.profiles add column if not exists bio text check (char_length(bio) <= 300);
alter table public.profiles add column if not exists country text check (char_length(country) <= 60);

-- Storage: let people replace their own files (profile picture), not only add and delete
drop policy if exists "update own uploads" on storage.objects;
create policy "update own uploads" on storage.objects for update to authenticated
  using (bucket_id = 'uploads' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'uploads' and (storage.foldername(name))[1] = auth.uid()::text);

-- 2. Messages between a member and the team (one thread per member)
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,  -- the member the thread belongs to
  from_admin boolean not null default false,
  body text not null check (char_length(body) between 1 and 4000),
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists messages_user_idx on public.messages (user_id, created_at);
alter table public.messages enable row level security;
drop policy if exists "read own thread" on public.messages;
create policy "read own thread" on public.messages for select using (auth.uid() = user_id or public.is_admin());
drop policy if exists "member writes own thread" on public.messages;
create policy "member writes own thread" on public.messages for insert to authenticated
  with check ((auth.uid() = user_id and from_admin = false) or (public.is_admin() and from_admin = true));
drop policy if exists "mark read" on public.messages;
create policy "mark read" on public.messages for update using (auth.uid() = user_id or public.is_admin());

-- 3. Admins can read sign-ups and brand requests in the dashboard
drop policy if exists "admin reads subscribers" on public.subscribers;
create policy "admin reads subscribers" on public.subscribers for select using (public.is_admin());
drop policy if exists "admin deletes subscribers" on public.subscribers;
create policy "admin deletes subscribers" on public.subscribers for delete using (public.is_admin());
do $$ begin
  if to_regclass('public.brand_requests') is not null then
    execute 'drop policy if exists "admin reads brand requests" on public.brand_requests';
    execute 'create policy "admin reads brand requests" on public.brand_requests for select using (public.is_admin())';
    execute 'drop policy if exists "admin updates brand requests" on public.brand_requests';
    execute 'create policy "admin updates brand requests" on public.brand_requests for update using (public.is_admin())';
  end if;
end $$;

-- Admins can read every member's progress count (for the overview numbers)
drop policy if exists "admin reads progress" on public.progress;
create policy "admin reads progress" on public.progress for select using (public.is_admin());

-- 4. Make Marcel an admin (creates the profile row if the account was made before the trigger)
insert into public.profiles (id, display_name)
  select id, 'Marcel' from auth.users where email = 'marcel@transitionslab.org'
  on conflict (id) do nothing;
update public.profiles set is_admin = true
  where id = (select id from auth.users where email = 'marcel@transitionslab.org');

-- Check: should return one row with is_admin = true
select p.id, u.email, p.display_name, p.is_admin from public.profiles p join auth.users u on u.id = p.id
  where u.email = 'marcel@transitionslab.org';
