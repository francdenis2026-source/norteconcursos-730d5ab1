-- Visitantes sem login (role anon) não precisam ler tabelas de questões, materiais de prova
-- nem resultados de simulados: a home, o desafio diário e o resumo público usam funções
-- (RPC) que rodam com permissão própria. Remove o acesso direto do anon; alunos logados
-- (authenticated) continuam com as políticas de RLS já existentes.
revoke all on table
  public.questions,
  public.official_exam_questions,
  public.curated_question_catalog,
  public.board_exam_questions,
  public.question_support_texts,
  public.official_exam_documents,
  public.practice_questions,
  public.mock_exam_results
from anon;
