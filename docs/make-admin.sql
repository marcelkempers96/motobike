-- Motopedia: make marcel@transitionslab.org an admin. Safe to run more than once.
-- Supabase > SQL Editor > New query > paste > Run. Sign in on the site once with this email first.

-- 1. columns the account page uses (no effect if they already exist)
alter table public.profiles add column if not exists is_admin boolean not null default false;
alter table public.profiles add column if not exists avatar_path text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists country text;

-- 2. the admin check used by the security rules
create or replace function public.is_admin() returns boolean
  language sql stable security definer set search_path = public as
$$ select coalesce((select is_admin from public.profiles where id = auth.uid()), false) $$;

-- 3. create the profile if it is missing, and make it admin
insert into public.profiles (id, display_name, is_admin)
select id, 'Transitions Lab', true from auth.users where lower(email) = 'marcel@transitionslab.org'
on conflict (id) do update set is_admin = true;

-- 4. check: one row with is_admin = true. No row means you have not signed in with this email yet.
select u.email, p.display_name, p.is_admin
from auth.users u left join public.profiles p on p.id = u.id
where lower(u.email) = 'marcel@transitionslab.org';
