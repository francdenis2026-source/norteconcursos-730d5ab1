-- Opportunistically prune expired guest bearer sessions when a new visitor arrives.
-- Answer rows are removed by ON DELETE CASCADE, keeping the anonymous challenge tables bounded.

create or replace function public.start_daily_guest_session(p_existing_token uuid default null)
returns uuid
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_day date := public.get_current_acre_date();
  v_token uuid;
begin
  delete from public.daily_guest_sessions
  where expires_at <= now();

  if p_existing_token is not null then
    select s.token into v_token
    from public.daily_guest_sessions s
    where s.token = p_existing_token
      and s.day = v_day
      and s.expires_at > now()
    limit 1;
    if v_token is not null then return v_token; end if;
  end if;

  insert into public.daily_guest_sessions(day)
  values (v_day)
  returning token into v_token;
  return v_token;
end;
$function$;
