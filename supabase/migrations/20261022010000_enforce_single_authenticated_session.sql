-- Apply this entire transaction. The newest Auth session owns the account,
-- independently of IP, browser storage, token refresh and device clocks.
begin;

create table if not exists public.active_user_sessions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  session_key text not null,
  last_seen_at timestamptz not null default now()
);
alter table public.active_user_sessions
  add column if not exists session_started_at timestamptz not null default '-infinity';
alter table public.active_user_sessions enable row level security;
drop policy if exists "Users manage own active session" on public.active_user_sessions;
drop policy if exists "Read own active session" on public.active_user_sessions;
drop policy if exists "Users read own active session" on public.active_user_sessions;
create policy "Users read own active session" on public.active_user_sessions
  for select to authenticated using (auth.uid() = user_id);
revoke all on public.active_user_sessions from public, anon, authenticated;
grant select on public.active_user_sessions to authenticated;

-- Ownership is issued by Auth, never by a browser heartbeat. Retain the row
-- after logout so an older surviving session cannot take the account back.
create or replace function public.register_account_session_on_auth_login()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.active_user_sessions as current_session
    (user_id, session_key, session_started_at, last_seen_at)
  values (new.user_id, 'norte_auth_activity:' || new.user_id::text || ':' || new.id::text, coalesce(new.created_at, now()), now())
  on conflict (user_id) do update set
    session_key = excluded.session_key,
    session_started_at = excluded.session_started_at,
    last_seen_at = excluded.last_seen_at
  where (excluded.session_started_at, excluded.session_key) >
        (current_session.session_started_at, current_session.session_key);
  -- Revoke older refresh tokens as well as their database write access.
  delete from auth.sessions s using public.active_user_sessions a
    where a.user_id = new.user_id and s.user_id = a.user_id
      and a.session_key <> 'norte_auth_activity:' || s.user_id::text || ':' || s.id::text;
  return new;
end;
$$;
revoke all on function public.register_account_session_on_auth_login() from public, anon, authenticated;
drop trigger if exists norte_register_auth_session on auth.sessions;
drop trigger if exists norte_single_account_session on auth.sessions;
create trigger norte_single_account_session after insert on auth.sessions
  for each row execute function public.register_account_session_on_auth_login();

insert into public.active_user_sessions as current_session
  (user_id, session_key, session_started_at, last_seen_at)
select distinct on (s.user_id) s.user_id, 'norte_auth_activity:' || s.user_id::text || ':' || s.id::text, coalesce(s.created_at, now()), now()
from auth.sessions s
order by s.user_id, s.created_at desc nulls last, s.id::text desc
on conflict (user_id) do update set
  session_key = excluded.session_key,
  session_started_at = excluded.session_started_at,
  last_seen_at = excluded.last_seen_at
where (excluded.session_started_at, excluded.session_key) >
      (current_session.session_started_at, current_session.session_key);

create or replace function public.is_current_device_session()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.active_user_sessions a
    join auth.sessions s on a.session_key = 'norte_auth_activity:' || s.user_id::text || ':' || s.id::text and s.user_id = a.user_id
    where a.user_id = auth.uid() and a.session_key = 'norte_auth_activity:' || auth.uid()::text || ':' || (auth.jwt()->>'session_id')
  );
$$;
revoke all on function public.is_current_device_session() from public, anon;
grant execute on function public.is_current_device_session() to authenticated;

create or replace function public.verify_account_session(p_claim boolean default false)
returns boolean language sql stable security definer set search_path = '' as $$
  select public.is_current_device_session();
$$;
revoke all on function public.verify_account_session(boolean) from public, anon;
grant execute on function public.verify_account_session(boolean) to authenticated;

-- Statement triggers also protect writes inside SECURITY DEFINER RPCs, unlike
-- RLS alone. The row lock serializes writes against ownership changes: a new
-- login cannot complete while a previously authorized transaction is saving.
create or replace function public.require_current_device_session()
returns trigger language plpgsql security definer set search_path = '' as $$
declare owner_session text;
begin
  if auth.role() = 'authenticated' then
    select a.session_key into owner_session from public.active_user_sessions a
      where a.user_id = auth.uid() for update;
    if owner_session is null or owner_session is distinct from ('norte_auth_activity:' || auth.uid()::text || ':' || (auth.jwt()->>'session_id'))
       or not exists (select 1 from auth.sessions s
                      where owner_session = 'norte_auth_activity:' || s.user_id::text || ':' || s.id::text and s.user_id = auth.uid()) then
      raise exception 'Sessão substituída por um novo login. Entre novamente.'
        using errcode = '42501', detail = 'NORTE_SESSION_REPLACED';
    end if;
  end if;
  return null;
end;
$$;
revoke all on function public.require_current_device_session() from public, anon, authenticated;

do $$
declare target record;
begin
  for target in select c.relname from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind in ('r', 'p')
      and not c.relispartition and c.relname <> 'active_user_sessions'
  loop
    execute format('drop trigger if exists norte_require_current_session on public.%I', target.relname);
    execute format('create trigger norte_require_current_session before insert or update or delete on public.%I for each statement execute function public.require_current_device_session()', target.relname);
  end loop;
  if exists (select 1 from pg_catalog.pg_publication where pubname = 'supabase_realtime')
     and not exists (select 1 from pg_catalog.pg_publication_tables
                     where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'active_user_sessions') then
    alter publication supabase_realtime add table public.active_user_sessions;
  end if;
end;
$$;
notify pgrst, 'reload schema';
commit;
