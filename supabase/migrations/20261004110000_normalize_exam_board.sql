-- Padroniza o nome da banca (ex.: "Cebraspe" e "CEBRASPE" viram "CEBRASPE"). Idempotente.
update public.official_exam_questions set exam_board = 'CEBRASPE' where upper(btrim(exam_board)) ~ '^(CESPE|CEBRASPE)' and exam_board <> 'CEBRASPE';
update public.curated_question_catalog set exam_board = 'CEBRASPE' where upper(btrim(exam_board)) ~ '^(CESPE|CEBRASPE)' and exam_board <> 'CEBRASPE';
update public.official_exam_questions set exam_board = upper(btrim(exam_board)) where exam_board <> upper(btrim(exam_board));
update public.curated_question_catalog set exam_board = upper(btrim(exam_board)) where exam_board <> upper(btrim(exam_board));
update public.student_exam_documents set exam_board = upper(btrim(exam_board)) where exam_board is not null and exam_board <> upper(btrim(exam_board));
update public.official_exam_documents set exam_board = upper(btrim(exam_board)) where exam_board is not null and exam_board <> upper(btrim(exam_board));
