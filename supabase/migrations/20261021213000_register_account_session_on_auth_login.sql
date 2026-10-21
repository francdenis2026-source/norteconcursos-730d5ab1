begin;

-- Auth creates this row for every real login, including clients opened before
-- the frontend guard was deployed. Token refresh updates an existing session;
-- it must not take ownership from a more recent login.
create or replace function public.register_account_session_on_auth_login()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  winner uuid;
begin
  if new.user_id is null then return new; end if;
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(new.user_id::text, 721031)
  );
  select id into winner
  from auth.sessions
  where user_id = new.user_id
  order by created_at desc, id desc
  limit 1;

  insert into public.active_user_sessions(user_id, session_key, last_seen_at)
  values (
    new.user_id,
    'norte_auth_activity:' || new.user_id::text || ':' || winner::text,
    pg_catalog.now()
  )
  on conflict (user_id) do update
  set session_key = excluded.session_key,
      last_seen_at = excluded.last_seen_at;

  delete from auth.sessions
  where user_id = new.user_id
    and (created_at, id) < (
      select created_at, id from auth.sessions where id = winner
    );
  return new;
end;
$$;

revoke all on function public.register_account_session_on_auth_login()
  from public, anon, authenticated;

drop trigger if exists norte_single_account_session on auth.sessions;
create trigger norte_single_account_session
  after insert on auth.sessions
  for each row
  execute function public.register_account_session_on_auth_login();

-- Adopt existing accounts as well. Keep their newest login and all account data;
-- revoke only older Auth sessions and their refresh tokens.
insert into public.active_user_sessions(user_id, session_key, last_seen_at)
select distinct on (user_id)
  user_id,
  'norte_auth_activity:' || user_id::text || ':' || id::text,
  pg_catalog.now()
from auth.sessions
where user_id is not null
order by user_id, created_at desc, id desc
on conflict (user_id) do update
set session_key = excluded.session_key,
    last_seen_at = excluded.last_seen_at;

delete from auth.sessions s
using public.active_user_sessions a
where s.user_id = a.user_id
  and a.session_key <> 'norte_auth_activity:' || s.user_id::text || ':' || s.id::text;

commit;
