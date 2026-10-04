-- Questões objetivas de múltipla escolha de bancas (FGV e outras): provas oficiais já aplicadas, com gabarito definitivo.
-- Entram como 'under_review' e só aparecem aos alunos depois de revisadas e ativadas (CONTENT_GOVERNANCE.md).
create table if not exists public.board_exam_questions (
  id uuid primary key default gen_random_uuid(),
  board text not null,                       -- ex.: 'FGV'
  contest_name text not null,
  career_name text not null,
  exam_year integer not null,
  exam_date date,
  exam_type text not null default 'Tipo 1',  -- tipo de caderno (as questões são as mesmas, só muda a ordem)
  item_number integer not null,
  subject text not null,                     -- disciplina (atribuída pela ordem do caderno; revisar)
  support_text text,                         -- texto de apoio compartilhado por várias questões
  stem text not null,                        -- enunciado
  options jsonb not null,                    -- {"A": "...", "B": "...", ...}
  official_answer text not null check (official_answer in ('A','B','C','D','E','X')),  -- X = anulada
  needs_visual boolean not null default false,        -- depende de figura/tabela/gráfico ou a extração pode ter distorcido
  legal_review_required boolean not null default false,
  law_version_checked_at timestamptz,
  legal_basis jsonb not null default '[]'::jsonb,
  explanation text,
  difficulty text not null default 'média',
  state text,
  career_category text,
  source_url text not null,                  -- caderno de questões oficial
  answer_key_url text not null,              -- gabarito definitivo oficial
  content_status text not null default 'under_review'
    check (content_status in ('draft','under_review','active','obsolete','revoked','archived')),
  review_note text,
  verified_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (board, contest_name, career_name, exam_year, exam_type, item_number)
);
create index if not exists board_exam_questions_filters on public.board_exam_questions (content_status, board, subject, exam_year);

alter table public.board_exam_questions enable row level security;
drop policy if exists "Students read active board exam questions" on public.board_exam_questions;
create policy "Students read active board exam questions" on public.board_exam_questions
  for select to authenticated using (content_status = 'active');
drop policy if exists "Admins manage board exam questions" on public.board_exam_questions;
create policy "Admins manage board exam questions" on public.board_exam_questions
  for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
