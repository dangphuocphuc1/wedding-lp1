-- Chạy trong SQL Editor của project Supabase.
begin;

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 100),
  message text not null check (char_length(btrim(message)) between 1 and 1000),
  created_at timestamptz not null default now()
);

create index if not exists wishes_created_at_idx on public.wishes (created_at desc, id desc);
alter table public.wishes enable row level security;

-- Khách chỉ được đọc và gửi tên/lời chúc; không được sửa, xóa hay giả thời gian gửi.
revoke all on table public.wishes from anon, authenticated;
grant select on table public.wishes to anon, authenticated;
grant insert (name, message) on public.wishes to anon, authenticated;

drop policy if exists "Guests can read wishes" on public.wishes;
create policy "Guests can read wishes" on public.wishes
  for select to anon, authenticated using (true);

drop policy if exists "Guests can send wishes" on public.wishes;
create policy "Guests can send wishes" on public.wishes
  for insert to anon, authenticated with check (
    char_length(btrim(name)) between 1 and 100
    and char_length(btrim(message)) between 1 and 1000
  );

commit;
