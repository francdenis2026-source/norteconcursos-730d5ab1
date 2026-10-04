-- Rode SÓ depois de revisar as questões (e de confirmar que pode usar o material da FGV).
-- Ativa as questões que não dependem de figura/tabela, não são de legislação (que exige conferência da vigência) e não foram anuladas.
-- As de legislação ficam fora do treino até terem a base legal e a data de conferência registradas.
update public.board_exam_questions
set content_status = 'active',
    verified_at = now(),
    review_note = concat_ws('; ', review_note, 'ativada após revisão em ' || to_char(now(), 'DD/MM/YYYY'))
where board = 'FGV'
  and content_status = 'under_review'
  and needs_visual = false
  and legal_review_required = false
  and official_answer <> 'X';

-- Para desativar tudo da FGV de uma vez:
-- update public.board_exam_questions set content_status = 'under_review' where board = 'FGV';
