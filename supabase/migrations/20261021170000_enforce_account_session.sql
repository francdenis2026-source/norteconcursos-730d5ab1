begin;

-- Preserve existing registrations. Re-running this migration is safe.
create table if not exists public.active_user_sessions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  session_key text not null,
  last_seen_at timestamptz not null default now()
);
alter table public.active_user_sessions enable row level security;
drop policy if exists "Users manage own active session" on public.active_user_sessions;
drop policy if exists "Read own active session" on public.active_user_sessions;
create policy "Read own active session" on public.active_user_sessions
  for select to authenticated using (auth.uid() = user_id);
revoke all on public.active_user_sessions from public, anon, authenticated;
grant select on public.active_user_sessions to authenticated;

-- Prompt eviction when connected, plus the application's polling/resume fallback.
do $$
begin
  if exists (select 1 from pg_catalog.pg_publication where pubname = 'supabase_realtime')
     and not exists (select 1 from pg_catalog.pg_publication_tables
       where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'active_user_sessions') then
    alter publication supabase_realtime add table public.active_user_sessions;
  end if;
end;
$$;

-- Session identity and login order come from Supabase Auth, never browser clocks,
-- device fingerprints or the JWT iat (which changes when a token is refreshed).
create or replace function public.verify_account_session(p_claim boolean default false)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  account_id uuid := auth.uid();
  login_id uuid := nullif(auth.jwt() ->> 'session_id', '')::uuid;
  newest_login uuid;
  registered_key text;
  expected_key text;
begin
  if account_id is null or login_id is null then return false; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(account_id::text, 721031));
  -- A JWT from a revoked auth session cannot recover ownership.
  if not exists (select 1 from auth.sessions where id = login_id and user_id = account_id) then
    return false;
  end if;
  select id into newest_login from auth.sessions
    where user_id = account_id order by created_at desc, id desc limit 1;
  expected_key := 'norte_auth_activity:' || account_id::text || ':' || login_id::text;
  select session_key into registered_key from public.active_user_sessions where user_id = account_id;

  if (p_claim or registered_key is null) and newest_login = login_id then
    insert into public.active_user_sessions(user_id, session_key, last_seen_at)
      values (account_id, expected_key, pg_catalog.now())
      on conflict (user_id) do update
        set session_key = excluded.session_key, last_seen_at = excluded.last_seen_at;
    -- Cascade revokes their refresh tokens. Never use client signOut(scope=others),
    -- which can race with a newer login and revoke the winning device.
    delete from auth.sessions where user_id = account_id
      and (created_at, id) < (select created_at, id from auth.sessions where id = login_id);
    return true;
  end if;
  return registered_key = expected_key and newest_login = login_id;
end;
$$;
revoke all on function public.verify_account_session(boolean) from public, anon;
grant execute on function public.verify_account_session(boolean) to authenticated;

commit;
