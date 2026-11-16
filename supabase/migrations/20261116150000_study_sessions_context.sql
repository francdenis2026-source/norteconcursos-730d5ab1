-- Vincula o tempo ativo ao contexto de estudo aberto pelo usuário.

alter table public.study_sessions
  add column if not exists discipline text,
  add column if not exists topic text;

create index if not exists study_sessions_context_idx
  on public.study_sessions (user_id, study_date, discipline);

create or replace function public.study_heartbeat(
  _id uuid,
  _seconds integer,
  _discipline text default null,
  _topic text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return; end if;
  insert into public.study_sessions (id, user_id, active_seconds, discipline, topic)
  values (_id, uid, least(greatest(coalesce(_seconds, 0), 0), 120), nullif(trim(_discipline), ''), nullif(trim(_topic), ''))
  on conflict (id) do update
    set active_seconds = public.study_sessions.active_seconds + least(greatest(coalesce(_seconds, 0), 0), 120),
        last_seen_at = now(),
        discipline = coalesce(nullif(trim(_discipline), ''), public.study_sessions.discipline),
        topic = coalesce(nullif(trim(_topic), ''), public.study_sessions.topic)
    where public.study_sessions.user_id = uid;
end $$;

revoke all on function public.study_heartbeat(uuid, integer, text, text) from public;
grant execute on function public.study_heartbeat(uuid, integer, text, text) to authenticated;
