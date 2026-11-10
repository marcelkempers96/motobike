-- Motopedia: track quotes and payments for Brand a bike requests. Safe to run more than once.
alter table public.brand_requests add column if not exists package text;
alter table public.brand_requests add column if not exists amount numeric(10,2);
alter table public.brand_requests add column if not exists currency text default 'EUR';
alter table public.brand_requests add column if not exists payment_ref text;
alter table public.brand_requests add column if not exists quoted_at timestamptz;
alter table public.brand_requests add column if not exists paid_at timestamptz;
alter table public.brand_requests add column if not exists live_until date;
alter table public.brand_requests add column if not exists admin_note text;
