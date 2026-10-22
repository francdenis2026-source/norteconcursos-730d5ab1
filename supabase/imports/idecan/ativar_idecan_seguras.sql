-- Ativa so questoes IDECAN com gabarito definitivo e sem pendencia juridica.
-- Fora: lei 'sem alteracao localizada' (revisao individual) e PMSC (gabarito preliminar).
update public.board_exam_questions set content_status='active'
where board='IDECAN' and content_status='under_review' and (
  (contest_name='PC SC - Agente de Polícia Civil 2026' and career_name='Agente de Polícia Civil' and item_number in (32,33,34,35,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100))
  or
  (contest_name='CBMMG - CFO BM 2027 (Cadete BM) 2026' and career_name='Cadete BM (CFO)' and item_number in (1,2,3,4,5,6,7,8,9,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,41,42,43,44,45,46,47,48,49,50))
);
