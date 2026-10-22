-- IDECAN PMSC (Aluno-Soldado Temporario): ativa as 39 questoes, todas de legislacao federal ou materia nao juridica.
-- Gabarito importado e o preliminar; a plataforma exibe a marca 'preliminar' pela review_note.
-- Legislacao reconferida em 22/10/2026 (CP, CPM, CF, CTB) ate a Lei 15.517/2026.
update public.board_exam_questions
set content_status = 'active',
    review_note = case when coalesce(review_note,'') like '%Gabarito PRELIMINAR%' then review_note
                       else 'Gabarito PRELIMINAR da banca; confira o definitivo. ' || coalesce(review_note,'') end
where board = 'IDECAN'
  and content_status = 'under_review'
  and contest_name = 'PMSC - Aluno-Soldado Temporário 2026'
  and career_name = 'Aluno-Soldado Temporário (QPTPM)'
  and item_number in (2,4,5,6,7,8,9,10,11,12,14,15,16,17,18,20,21,22,29,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50);
