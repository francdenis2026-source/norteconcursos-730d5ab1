-- "O que a banca cobrou": frase curta por questão (ex.: "Infanticídio e comunicabilidade do estado puerperal"),
-- exibida junto ao número da questão e usada em métricas de tendências por assunto.
alter table public.official_exam_questions add column if not exists tested_topic text;
-- @@
alter table public.board_exam_questions add column if not exists tested_topic text;
-- @@
alter table public.curated_question_catalog add column if not exists tested_topic text;
-- @@
comment on column public.official_exam_questions.tested_topic is 'Assunto cobrado pela banca em uma frase curta (editorial).';
-- @@
comment on column public.board_exam_questions.tested_topic is 'Assunto cobrado pela banca em uma frase curta (editorial).';
-- @@
comment on column public.curated_question_catalog.tested_topic is 'Assunto cobrado pela banca em uma frase curta (editorial).';
