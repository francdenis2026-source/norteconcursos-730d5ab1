-- Reforço de questões: o aluno pode refazer questões que já respondeu (por exemplo, as que errou).
-- Estas tentativas ficam em tabela própria e NÃO entram no ranking, nas medalhas nem na contagem diária:
-- só a 1ª resposta de cada questão (question_training_responses) é a oficial.
create table if not exists public.question_reinforcement_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null,
  question_source text not null check (question_source in ('official','curated','personal')),
  contest_name text not null,
  board text not null default '',
  subject text not null,
  selected_answer text not null check (selected_answer in ('A','B','C','D','E')),
  official_answer text not null check (official_answer in ('A','B','C','D','E')),
  is_correct boolean not null,
  response_seconds integer not null default 0 check (response_seconds >= 0),
  created_at timestamptz not null default now()
);

alter table public.question_reinforcement_attempts enable row level security;

drop policy if exists "Users manage own reinforcement attempts" on public.question_reinforcement_attempts;
create policy "Users manage own reinforcement attempts"
  on public.question_reinforcement_attempts for all to authenticated
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Admins read reinforcement attempts" on public.question_reinforcement_attempts;
create policy "Admins read reinforcement attempts"
  on public.question_reinforcement_attempts for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_reinforcement_user_created
  on public.question_reinforcement_attempts(user_id, created_at desc);
create index if not exists idx_reinforcement_user_question
  on public.question_reinforcement_attempts(user_id, question_id);

comment on table public.question_reinforcement_attempts is
  'Reforço de questões já respondidas: guarda desempenho de estudo, mas nunca conta para ranking ou medalhas.';
