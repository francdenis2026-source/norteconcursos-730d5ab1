-- Correction to the PF 2014 personal grading inserted in
-- 20260926090000_pf_2014_student_grading.sql. The candidate resent his answer
-- sheet and it differs from the first submission in exactly two items:
--   item 37: was C (correct per gabarito E -> now marked E in the resend, wait —
--            actually the resend changed item 37 FROM the previously-submitted E
--            TO C, which is wrong vs the official E, flipping it from correta to
--            errada;
--   item 56: was answered C (correct) in the first submission, now sent as blank.
-- Net effect versus the original insert: 52->50 corretas, 18->19 erradas,
-- 43->44 em branco, anuladas unchanged at 7. CEBRASPE net score: 50-19+7 = 38
-- (was 41).
update public.student_exam_documents
set correct_count = 50,
    wrong_count = 19,
    blank_count = 44,
    score_net = 38,
    extracted_data = jsonb_set(
      jsonb_set(extracted_data, '{items,37}', '"errada"'),
      '{items,56}', '"branco"'
    ),
    notes = 'Reanálise solicitada pelo candidato: reenvio do gabarito corrigiu 2 itens frente ao envio anterior (item 37 e item 56). Nota líquida final 38, pelo padrão CEBRASPE (50 corretas − 19 erradas + 7 anuladas), 44 itens em branco.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2014'
  and doc_type = 'resultado';
