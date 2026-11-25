-- Respostas da Área de estudo PC-AC (questões autorais da área, não o catálogo oficial).
-- Cada resposta vira uma linha: estudo ou simulado. Não altera question_training_responses,
-- então o contador oficial do treinador continua separado.

create table if not exists public.pcac_study_responses (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  question_key text not null check (char_length(question_key) between 1 and 80),
  question_text text not null default '' check (char_length(question_text) <= 600),
  topic_id text not null check (char_length(topic_id) between 1 and 60),
  topic_name text,
  subject_name text,
  mode text not null default 'estudo' check (mode in ('estudo', 'simulado')),
  selected text not null check (selected in ('A', 'B', 'C', 'D', 'E')),
  correct text not null check (correct in ('A', 'B', 'C', 'D', 'E')),
  is_correct boolean not null,
  answered_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  check (is_correct = (selected = correct))
);

alter table public.pcac_study_responses enable row level security;

drop policy if exists "Students insert own study responses" on public.pcac_study_responses;
create policy "Students insert own study responses"
  on public.pcac_study_responses for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Students read own study responses" on public.pcac_study_responses;
create policy "Students read own study responses"
  on public.pcac_study_responses for select to authenticated
  using (auth.uid() = user_id);

create index if not exists idx_pcac_study_responses_user_time
  on public.pcac_study_responses (user_id, answered_at desc);
create index if not exists idx_pcac_study_responses_user_topic
  on public.pcac_study_responses (user_id, topic_id);
