-- Aggregate only: never expose session IDs, user IDs, names or individual activity.
create index if not exists study_sessions_recent_activity_idx
  on public.study_sessions (last_seen_at desc) include (user_id)
  where active_seconds > 0;

create or replace function public.get_public_study_presence()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select pg_catalog.jsonb_build_object(
    'studying_now', count(distinct s.user_id),
    'as_of', pg_catalog.now(),
    'window_seconds', 90
  )
  from public.study_sessions as s
  where s.last_seen_at > pg_catalog.now() - interval '90 seconds'
    and s.active_seconds > 0;
$$;

revoke all on function public.get_public_study_presence() from public;
grant execute on function public.get_public_study_presence() to anon, authenticated, service_role;
comment on function public.get_public_study_presence() is
  'Public aggregate of distinct accounts with a study heartbeat in the last 90 seconds. No individual activity is returned.';
