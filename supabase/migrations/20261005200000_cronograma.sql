-- Cronograma de estudos por edital: planos do aluno (modelo fixo ou personalizado) e progresso por conteúdo.
-- config guarda disciplinas/pesos/conteúdos, dias, horário e horas semanais (ver src/lib/cronograma.ts).
create table if not exists public.cronograma_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (length(name) between 1 and 120),
  model_id text,                          -- id do modelo fixo de origem; null = montado do zero
  custom boolean not null default false,  -- true = estrutura (disciplinas/conteúdos) editável
  exam_date date,
  config jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists cronograma_plans_user_idx on public.cronograma_plans (user_id, updated_at desc);

create table if not exists public.cronograma_progress (
  plan_id uuid not null references public.cronograma_plans(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id text not null,
  video boolean not null default false,
  pdf boolean not null default false,
  podcast boolean not null default false,
  qtde integer not null default 0 check (qtde >= 0),
  acertos integer not null default 0 check (acertos >= 0),
  rev_pdf boolean not null default false,
  rev_questoes boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (plan_id, topic_id),
  check (acertos <= qtde)
);

alter table public.cronograma_plans enable row level security;
alter table public.cronograma_progress enable row level security;
drop policy if exists "Users manage own cronograma plans" on public.cronograma_plans;
create policy "Users manage own cronograma plans" on public.cronograma_plans
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users manage own cronograma progress" on public.cronograma_progress;
create policy "Users manage own cronograma progress" on public.cronograma_progress
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id and exists (
    select 1 from public.cronograma_plans p where p.id = plan_id and p.user_id = auth.uid()));
