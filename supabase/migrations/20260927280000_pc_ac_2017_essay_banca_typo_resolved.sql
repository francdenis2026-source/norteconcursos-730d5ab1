-- Candidate clarified (2026-09-27): the "FUNCAB" footer printed on the essay
-- prompt page was a typo/printing error by the banca itself when preparing
-- that page — not a sign the essay belongs to a different contest. This
-- resolves the conflict flagged in 20260927270000_pc_ac_2017_essay_import.sql.
-- Raises confidence and replaces the "unresolved conflict" comment with an
-- explanation of the typo, keeping the note for future reference rather than
-- deleting the history of the question.
update public.essay_submissions
set correcao = jsonb_set(
  jsonb_set(correcao, '{confianca}', '"media"'),
  '{comentario}',
  '"O rodapé \"FUNCAB - Fundação Professor Carlos Augusto Bittencourt\" impresso na folha do enunciado foi confirmado pelo candidato (2026-09-27) como erro de digitação/impressão da própria banca IBADE ao preparar essa página da prova discursiva — não indica outro concurso. Sem rubrica de tópicos oficial publicada pelo IBADE, então nenhuma nota estimada foi atribuída."'::jsonb
)
where user_id = (select id from auth.users where email = '69598193268@norteconcurso.local')
  and contest_name = 'Polícia Civil do Acre'
  and contest_year = '2017';
