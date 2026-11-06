-- Moto Zero: accounts, comments with photos, course progress and members-only content.
-- Paste this whole file into Supabase: SQL Editor > New query > Run. Safe to run again.

-- 1. Profiles: one row per account, created automatically at sign-up.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default 'Rider' check (char_length(display_name) between 1 and 40),
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "profiles are public" on public.profiles;
create policy "profiles are public" on public.profiles for select using (true);
drop policy if exists "edit own profile" on public.profiles;
create policy "edit own profile" on public.profiles for update using (auth.uid() = id)
  with check (auth.uid() = id and is_admin = (select p.is_admin from public.profiles p where p.id = auth.uid()));

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false)
$$;

-- 2. Comments: one simple thread per page (the page path, e.g. /repair/problems/no-spark/).
create table if not exists public.comments (
  id bigint generated always as identity primary key,
  page text not null check (char_length(page) between 1 and 300),
  user_id uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  photo_path text,
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists comments_page_idx on public.comments (page, created_at desc);
alter table public.comments enable row level security;
drop policy if exists "read visible comments" on public.comments;
create policy "read visible comments" on public.comments for select using (not hidden or auth.uid() = user_id or public.is_admin());
drop policy if exists "post as yourself" on public.comments;
create policy "post as yourself" on public.comments for insert to authenticated with check (auth.uid() = user_id and hidden = false);
drop policy if exists "delete own or admin" on public.comments;
create policy "delete own or admin" on public.comments for delete using (auth.uid() = user_id or public.is_admin());
drop policy if exists "admin can hide" on public.comments;
create policy "admin can hide" on public.comments for update using (public.is_admin());

-- 3. Course progress: the same data the site keeps in the browser, saved to the account.
create table if not exists public.progress (
  user_id uuid primary key default auth.uid() references public.profiles (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.progress enable row level security;
drop policy if exists "own progress" on public.progress;
create policy "own progress" on public.progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 4. Members-only content: readable by anyone signed in. Add rows in the Table Editor.
create table if not exists public.member_content (
  slug text primary key,
  title text not null,
  body_html text not null default '',
  file_url text,
  sort int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.member_content enable row level security;
drop policy if exists "members read" on public.member_content;
create policy "members read" on public.member_content for select to authenticated using (true);
drop policy if exists "admin writes" on public.member_content;
create policy "admin writes" on public.member_content for all using (public.is_admin()) with check (public.is_admin());

-- 5. Photo uploads: public bucket, each user writes only in a folder named after their id.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('uploads', 'uploads', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];
drop policy if exists "uploads are public" on storage.objects;
create policy "uploads are public" on storage.objects for select using (bucket_id = 'uploads');
drop policy if exists "upload to own folder" on storage.objects;
create policy "upload to own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'uploads' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "delete own uploads" on storage.objects;
create policy "delete own uploads" on storage.objects for delete
  using (bucket_id = 'uploads' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

-- 6. A first members-only item, so the account page shows something.
insert into public.member_content (slug, title, body_html, sort) values
  ('welcome', 'Welcome to Moto Zero', '<p>Thank you for joining. Your course progress is now saved to your account, and you can comment and share photos on any page.</p>', 0)
on conflict (slug) do nothing;

-- To make yourself an admin (can hide or delete any comment), after you have signed up once:
--   update public.profiles set is_admin = true where id = (select id from auth.users where email = 'you@example.com');

-- 7. Email sign-ups from the "Get updates" boxes. Visitors can add an address; nobody can read
--    the list through the website. Read or export it in the Table Editor (subscribers > Export CSV).
create table if not exists public.subscribers (
  id bigint generated always as identity primary key,
  email text not null unique check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
  source text check (char_length(source) <= 300),
  created_at timestamptz not null default now()
);
alter table public.subscribers enable row level security;
drop policy if exists "anyone can subscribe" on public.subscribers;
create policy "anyone can subscribe" on public.subscribers for insert to anon, authenticated with check (true);
