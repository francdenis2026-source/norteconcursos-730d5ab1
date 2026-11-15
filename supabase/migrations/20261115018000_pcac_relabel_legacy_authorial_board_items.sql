-- The five legacy board-table items are author-created exercises in IDECAN style,
-- not official questions applied by IDECAN. Keep them under review.
update public.board_exam_questions
set board = 'AUTORAL',
    contest_name = 'PC-AC 2026 — treino autoral (estilo IDECAN)',
    review_note = case
      when coalesce(review_note, '') ilike '%não oficial%' then review_note
      else coalesce(review_note, '') || ' Questão autoral de treinamento, inspirada no estilo IDECAN; não é questão oficial aplicada pela banca.'
    end
where exam_year = 2026
  and contest_name = 'PC-AC 2026 — Questões autorais IDECAN'
  and board = 'IDECAN'
  and content_status = 'under_review';
