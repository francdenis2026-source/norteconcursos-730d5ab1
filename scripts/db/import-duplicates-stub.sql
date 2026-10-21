-- Disposable PostgreSQL only. Synthetic records, no production data.
create table public.question_support_texts (
  id uuid primary key default gen_random_uuid(), label text, body text,
  contest_name text default 'Prova teste', exam_year integer default 2026, exam_board text default 'FGV'
);
create table public.board_exam_questions (
  id uuid primary key default gen_random_uuid(), board text default 'FGV',
  contest_name text default 'Prova teste', career_name text default 'Agente', exam_year integer default 2026,
  exam_type text default 'Tipo 1', item_number integer, stem text, support_text text,
  options jsonb default '{"A":"Uma resposta","B":"Outra resposta"}',
  official_answer text default 'A', needs_visual boolean default false, figure_urls jsonb default '[]',
  content_status text default 'under_review', review_note text,
  unique(board,contest_name,career_name,exam_year,exam_type,item_number)
);
create table public.official_exam_questions (
  id uuid primary key default gen_random_uuid(), exam_board text default 'CEBRASPE',
  contest_name text default 'Prova teste', career_name text default 'Agente', exam_year integer default 2026,
  item_number integer, question_text text, official_answer text default 'C',
  support_text_id uuid references public.question_support_texts(id), content_status text default 'under_review'
);
create table public.curated_question_catalog (
  id uuid primary key default gen_random_uuid(), exam_board text default 'CEBRASPE',
  contest_name text default 'Prova teste', career_name text default 'Agente', contest_year integer default 2026,
  source_id uuid, question_text text, official_answer text default 'C'
);
create table public.question_bank (
  id uuid primary key default gen_random_uuid(), user_id uuid, contest_name text default 'Prova teste',
  contest_year text default '2026', question_text text, options jsonb, official_answer text default 'C'
);
insert into public.board_exam_questions(id,item_number,stem) values
 ('00000000-0000-4000-8000-000000000001',1,'Legado repetido que precisa manter suas referências.'),
 ('00000000-0000-4000-8000-000000000002',2,'Legado repetido que precisa manter suas referências.');
