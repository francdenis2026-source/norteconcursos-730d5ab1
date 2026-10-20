-- Complementa 20261020120000_cross_mode_question_identity.sql (reserva da primeira resposta e
-- pontos de ranking por tentativa). Esta migração NÃO toca em score_events nem nas respostas.
--
-- 1. question_public_code(): mesmo código NC-<prefixo>-<uuid> de src/lib/questionIdentity.ts.
-- 2. _normalize_question_text(): usado pela auditoria scripts/db/audit-shared-exam-items.sql.
-- 3. simulator_attempt_results: regra de correção e nota de cada tentativa (separadas do ranking).
-- 4. study_later_items: "Estudar depois" e questões puladas ligados à conta.

create or replace function public.question_public_code(_table text, _id uuid)
returns text
language sql
immutable
set search_path = public
as $$
  select 'NC-' || case _table
      when 'official_exam_questions' then 'OF'
      when 'board_exam_questions' then 'BA'
      when 'curated_question_catalog' then 'AU'
      when 'question_bank' then 'PE'
    end || '-' || _id::text
$$;
grant execute on function public.question_public_code(text, uuid) to authenticated;

create or replace function public._normalize_question_text(_text text)
returns text
language sql
immutable
set search_path = public
as $$ select lower(regexp_replace(btrim(coalesce(_text, '')), '\s+', ' ', 'g')) $$;
revoke all on function public._normalize_question_text(text) from public, anon, authenticated;

create table if not exists public.simulator_attempt_results (
  attempt_id uuid primary key references public.simulator_attempts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  scoring_rule text not null check (scoring_rule in ('simple', 'net_one_to_one')),
  rule_verified boolean not null default false,
  score numeric(8,2) not null,
  max_score numeric(8,2) not null,
  answered_count integer not null check (answered_count >= 0),
  skipped_count integer not null default 0 check (skipped_count >= 0),
  created_at timestamptz not null default now()
);
alter table public.simulator_attempt_results enable row level security;
drop policy if exists "Users manage own attempt results" on public.simulator_attempt_results;
create policy "Users manage own attempt results" on public.simulator_attempt_results
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Admins read attempt results" on public.simulator_attempt_results;
create policy "Admins read attempt results" on public.simulator_attempt_results
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
comment on table public.simulator_attempt_results is
  'Nota da tentativa conforme a regra da edição (ou pontuação simples). Não é a pontuação do ranking.';

create table if not exists public.study_later_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_table text not null check (
    question_table in ('official_exam_questions','curated_question_catalog','question_bank','board_exam_questions')
  ),
  question_id uuid not null,
  reason text not null default 'saved' check (reason in ('saved', 'skipped')),
  payload jsonb not null,
  notes text not null default '' check (char_length(notes) <= 4000),
  reviewed boolean not null default false,
  saved_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, question_table, question_id)
);
alter table public.study_later_items enable row level security;
drop policy if exists "Users manage own study later items" on public.study_later_items;
create policy "Users manage own study later items" on public.study_later_items
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index if not exists idx_study_later_items_user on public.study_later_items(user_id, reviewed, saved_at desc);
comment on table public.study_later_items is
  'Caderno "Estudar depois" por conta. payload guarda o item como exibido no navegador.';
