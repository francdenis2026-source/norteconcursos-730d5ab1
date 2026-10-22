-- Conferência do gabarito definitivo da PMSC Aluno-Soldado Temporário (IDECAN) em 22/10/2026
-- (antigo-concurso.idecan.org.br, concurso ID 207, Edital nº 200/CCP/2025) mostrou que:
--   - os itens 5 e 42 (Tipo A), que tinham resposta válida no gabarito PRELIMINAR, foram
--     ANULADOS no gabarito DEFINITIVO;
--   - o item 6 (Tipo A) teve a resposta alterada de D (preliminar) para A (definitivo).
-- pmsc_aluno_soldado_2026.sql já foi atualizado para refletir isso (itens 5 e 42 removidos,
-- item 6 corrigido). Rode este script SE você já havia aplicado uma versão anterior do arquivo
-- (com os itens 5 e 42 presentes e o item 6 com resposta D) antes desta correção.
-- Idempotente (pode rodar mais de uma vez).
delete from public.board_exam_questions
where board = 'IDECAN'
  and contest_name = 'PMSC - Aluno-Soldado Temporário 2026'
  and exam_type = 'Tipo A'
  and item_number in (5, 42);

update public.board_exam_questions
set official_answer = 'A'
where board = 'IDECAN'
  and contest_name = 'PMSC - Aluno-Soldado Temporário 2026'
  and exam_type = 'Tipo A'
  and item_number = 6;
