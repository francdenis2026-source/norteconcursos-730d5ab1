-- Tempo de estudo por sessão: o navegador envia um "batimento" a cada ~30 s com os segundos
-- em que a aba esteve visível. O servidor soma; o aluno não escreve na tabela diretamente.
create table if not exists public.study_sessions (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  active_seconds integer not null default 0,
  study_date date not null default public.get_current_acre_date()
);
create index if not exists study_sessions_user_idx on public.study_sessions (user_id, started_at desc);
alter table public.study_sessions enable row level security;

drop policy if exists "Users read own study sessions" on public.study_sessions;
create policy "Users read own study sessions" on public.study_sessions
  for select to authenticated using (auth.uid() = user_id);

create or replace function public.study_heartbeat(_id uuid, _seconds integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return; end if;
  insert into public.study_sessions (id, user_id, active_seconds)
  values (_id, uid, least(greatest(coalesce(_seconds, 0), 0), 120))
  on conflict (id) do update
    set active_seconds = public.study_sessions.active_seconds + least(greatest(coalesce(_seconds, 0), 0), 120),
        last_seen_at = now()
    where public.study_sessions.user_id = uid;
end $$;
revoke all on function public.study_heartbeat(uuid, integer) from public;
grant execute on function public.study_heartbeat(uuid, integer) to authenticated;

-- Total estudado hoje (dia do Acre) pelo usuário logado.
create or replace function public.study_time_today()
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(sum(active_seconds), 0)::int from public.study_sessions
  where user_id = auth.uid() and study_date = public.get_current_acre_date()
$$;
revoke all on function public.study_time_today() from public;
grant execute on function public.study_time_today() to authenticated;

-- Administrador: quem está online agora (batimento nos últimos 90 s).
create or replace function public.admin_students_online()
returns table (user_id uuid, session_seconds integer)
language sql
stable
security definer
set search_path = public
as $$
  select distinct on (s.user_id) s.user_id, s.active_seconds
  from public.study_sessions s
  where public.has_role(auth.uid(), 'admin') and s.last_seen_at > now() - interval '90 seconds'
  order by s.user_id, s.last_seen_at desc
$$;
revoke all on function public.admin_students_online() from public;
grant execute on function public.admin_students_online() to authenticated;

-- Administrador: tempo de uso de um aluno.
create or replace function public.admin_student_time(_user_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare r jsonb;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Acesso restrito ao administrador' using errcode = '42501';
  end if;
  select jsonb_build_object(
    'total_seconds', coalesce(sum(active_seconds), 0),
    'today_seconds', coalesce(sum(active_seconds) filter (where study_date = public.get_current_acre_date()), 0),
    'sessions', count(*),
    'online', coalesce(bool_or(last_seen_at > now() - interval '90 seconds'), false),
    'recent', coalesce((select jsonb_agg(t order by t.started_at desc) from (
        select started_at, last_seen_at, active_seconds from public.study_sessions
        where user_id = _user_id order by started_at desc limit 8) t), '[]'::jsonb)
  ) into r
  from public.study_sessions where user_id = _user_id;
  return r;
end $$;
revoke all on function public.admin_student_time(uuid) from public;
grant execute on function public.admin_student_time(uuid) to authenticated;
