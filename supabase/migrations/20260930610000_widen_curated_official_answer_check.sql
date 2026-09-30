-- A tabela curated_question_catalog foi originalmente desenhada so para
-- questoes CEBRASPE (Certo/Errado), com official_answer restrito a 'C'/'E'.
-- Agora que curamos conteudo tambem para bancas de multipla escolha (IBADE,
-- IBFC, UECE-CEV etc.), a constraint precisa aceitar A-E.

alter table public.curated_question_catalog
  drop constraint curated_question_catalog_official_answer_check;

alter table public.curated_question_catalog
  add constraint curated_question_catalog_official_answer_check
  check (official_answer = any (array['A','B','C','D','E']));
