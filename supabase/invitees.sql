-- Chạy một lần trong SQL Editor của project Supabase đang dùng cho website.
begin;

create table if not exists public.invitees (
  code text primary key check (code ~ '^[a-z0-9][a-z0-9_-]{0,63}$'),
  name text not null check (char_length(btrim(name)) between 1 and 100),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.invitees enable row level security;
-- Website chỉ được tra đúng mã; không được tải danh sách hoặc sửa dữ liệu.
revoke all on table public.invitees from public, anon, authenticated;
grant all on table public.invitees to service_role;

create or replace function public.lookup_invitee(invite_code text)
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select btrim(i.name)
  from public.invitees as i
  where i.code = lower(btrim(invite_code)) and i.active = true
  limit 1;
$$;

revoke all on function public.lookup_invitee(text) from public, anon, authenticated;
grant execute on function public.lookup_invitee(text) to anon, authenticated, service_role;

-- Nhập danh sách hiện tại từ src/data/invitees.ts, không ghi đè khách đã có.
insert into public.invitees (code, name) values
  ('ph', 'Phúc')
on conflict (code) do nothing;

notify pgrst, 'reload schema';
commit;
