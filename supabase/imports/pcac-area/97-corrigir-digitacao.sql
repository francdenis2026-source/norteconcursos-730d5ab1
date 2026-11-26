-- Corrige o erro de digitação "operaçãoões" -> "operações" nas questões PC-AC já importadas.
update public.board_exam_questions
set stem = replace(stem, 'operaçãoões', 'operações'),
    options = replace(options::text, 'operaçãoões', 'operações')::jsonb,
    explanation = replace(explanation, 'operaçãoões', 'operações')
where contest_name = $q$PC-AC 2026 — questão autoral$q$
  and (stem like '%operaçãoões%' or options::text like '%operaçãoões%' or explanation like '%operaçãoões%');
