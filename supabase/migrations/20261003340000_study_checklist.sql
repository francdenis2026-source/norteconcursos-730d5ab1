-- Cronograma com horários e acompanhamento: o aluno marca cada bloco estudado e o histórico vira o
-- "Registro de estudos" no próprio painel.
alter table public.study_profiles add column if not exists start_time text not null default '19:00'
  check (start_time ~ '^[0-2][0-9]:[0-5][0-9]$');

create table if not exists public.study_plan_checks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid references public.study_profiles(id) on delete set null,
  week_start date not null,                 -- segunda-feira da semana (fuso do Acre)
  block_key text not null,                  -- identifica o bloco dentro da semana
  subject text not null,
  kind text not null,
  topics text[] not null default '{}',
  minutes integer not null check (minutes > 0 and minutes <= 600),
  done_at timestamptz not null default now(),
  unique (user_id, plan_id, week_start, block_key)
);
create index if not exists study_plan_checks_user_idx on public.study_plan_checks (user_id, done_at desc);
alter table public.study_plan_checks enable row level security;
drop policy if exists "Users manage own study checks" on public.study_plan_checks;
create policy "Users manage own study checks" on public.study_plan_checks
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Admins read study checks" on public.study_plan_checks;
create policy "Admins read study checks" on public.study_plan_checks
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
