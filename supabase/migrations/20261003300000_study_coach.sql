-- Assistente de estudos: perfil de preparação do aluno e estatísticas reais por matéria.
create table if not exists public.study_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  experience text not null check (experience in ('first', 'some', 'veteran')),
  career text not null,
  exam_date date,
  hours_per_week integer not null check (hours_per_week between 1 and 80),
  last_plan jsonb,              -- foto do último plano: {at, shares:{matéria: %}} para mostrar o que mudou
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.study_profiles enable row level security;
drop policy if exists "Users manage own study profile" on public.study_profiles;
create policy "Users manage own study profile" on public.study_profiles
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop trigger if exists set_study_profiles_updated_at on public.study_profiles;
create trigger set_study_profiles_updated_at before update on public.study_profiles
  for each row execute function public.set_updated_at();

-- Desempenho do aluno por matéria: totais, últimos 14 dias e tempo gasto respondendo.
-- Só a primeira resposta de cada questão do Treinador conta; simulados entram sem tempo.
create or replace function public.my_subject_stats()
returns table (subject text, answered integer, correct integer, recent_answered integer, recent_correct integer, seconds integer)
language sql
stable
security definer
set search_path = public
as $$
  with tr as (
    select distinct on (question_id) subject, is_correct, created_at, response_seconds
    from public.question_training_responses where user_id = auth.uid()
    order by question_id, created_at
  ),
  sr as (
    select subject, is_correct, created_at, 0 as response_seconds
    from public.simulator_responses where user_id = auth.uid() and selected_answer is not null
  ),
  allr as (select * from tr union all select * from sr)
  select subject,
    count(*)::int,
    count(*) filter (where is_correct)::int,
    count(*) filter (where created_at > now() - interval '14 days')::int,
    count(*) filter (where is_correct and created_at > now() - interval '14 days')::int,
    coalesce(sum(response_seconds), 0)::int
  from allr group by subject
$$;
revoke all on function public.my_subject_stats() from public;
grant execute on function public.my_subject_stats() to authenticated;

-- Horas totais de estudo na plataforma (sessões com a aba visível).
create or replace function public.my_study_hours()
returns numeric
language sql
stable
security definer
set search_path = public
as $$
  select round(coalesce(sum(active_seconds), 0) / 3600.0, 1) from public.study_sessions where user_id = auth.uid()
$$;
revoke all on function public.my_study_hours() from public;
grant execute on function public.my_study_hours() to authenticated;
