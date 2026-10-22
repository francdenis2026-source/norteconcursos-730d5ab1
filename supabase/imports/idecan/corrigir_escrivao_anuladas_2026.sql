-- Conferência do gabarito definitivo da PC SC Escrivão (IDECAN) em 22/10/2026 (antigo-concurso.idecan.org.br)
-- mostrou que os itens 24 e 96 (Tipo A), que tinham resposta válida no gabarito PRELIMINAR, foram
-- ANULADOS no gabarito DEFINITIVO. pcsc_escrivao_2026.sql já foi atualizado para não trazer mais esses
-- dois itens. Rode este script SE você já havia aplicado uma versão anterior de pcsc_escrivao_2026.sql
-- (com os itens 24 e 96 presentes) antes desta correção — ele remove só esses dois itens, sem afetar
-- os demais 98. Idempotente (pode rodar mais de uma vez; não dá erro se os itens já não existirem).
delete from public.board_exam_questions
where board = 'IDECAN'
  and contest_name = 'PC SC - Escrivão de Polícia Civil 2026'
  and exam_type = 'Tipo A'
  and item_number in (24, 96);
