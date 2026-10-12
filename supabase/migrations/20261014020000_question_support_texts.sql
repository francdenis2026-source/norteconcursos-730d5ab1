-- Textos de apoio compartilhados por vários itens de uma prova (Língua Portuguesa, principalmente).
-- Um texto é cadastrado uma vez e ligado a todos os itens que o usam, em official_exam_questions.support_text_id.
create table if not exists public.question_support_texts (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  body text not null check (length(btrim(body)) > 0),
  contest_name text not null,
  exam_year integer not null,
  exam_board text,
  source_note text,
  created_at timestamptz not null default now()
);

alter table public.question_support_texts enable row level security;

drop policy if exists "Authenticated read support texts" on public.question_support_texts;
create policy "Authenticated read support texts"
  on public.question_support_texts for select to authenticated using (true);

drop policy if exists "Admins manage support texts" on public.question_support_texts;
create policy "Admins manage support texts"
  on public.question_support_texts for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create index if not exists idx_support_texts_contest on public.question_support_texts(contest_name, exam_year);

alter table public.official_exam_questions
  add column if not exists support_text_id uuid references public.question_support_texts(id) on delete set null;
create index if not exists idx_official_questions_support_text on public.official_exam_questions(support_text_id);

comment on table public.question_support_texts is
  'Texto-base de provas, compartilhado por vários itens. O treinador o exibe junto com cada questão ligada.';
