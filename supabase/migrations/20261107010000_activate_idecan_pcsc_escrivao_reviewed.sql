-- IDECAN PC-SC Escrivão 2026
-- Publicação dos itens revisados com gabarito definitivo.
update public.board_exam_questions
set content_status = 'active'
where board = 'IDECAN'
  and contest_name = 'PC SC - Escrivão de Polícia Civil 2026'
  and career_name = 'Escrivão de Polícia Civil'
  and content_status = 'under_review'
  and item_number not in (24, 96);
