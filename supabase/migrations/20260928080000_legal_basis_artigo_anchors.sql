-- Preenche o campo "artigo" dentro de legal_basis pras 3 questões onde o
-- artigo já está claramente identificado no review_note (Feijó 2018,
-- itens 26-28). O treinador agora usa esse campo pra montar um link com
-- âncora direto (#art205 etc.), já que o Planalto marca cada artigo com
-- uma âncora nomeada na página. As demais ~85 questões com legal_basis
-- ainda sem "artigo" preenchido vão sendo completadas junto com os lotes
-- de auditoria de legislação (cada uma precisa de conferência individual
-- de qual artigo exato foi cobrado, não dá pra automatizar com segurança).

update public.official_exam_questions
set legal_basis = jsonb_set(legal_basis, '{0,artigo}', '"2"')
where exam_year = 2018 and item_number = 26
  and career_name = 'Professor - Licenciatura Plena - Pedagogo'
  and jsonb_array_length(legal_basis) = 1
  and legal_basis -> 0 ->> 'artigo' is null;

update public.official_exam_questions
set legal_basis = jsonb_set(legal_basis, '{0,artigo}', '"205"')
where exam_year = 2018 and item_number = 27
  and career_name = 'Professor - Licenciatura Plena - Pedagogo'
  and jsonb_array_length(legal_basis) = 1
  and legal_basis -> 0 ->> 'artigo' is null;

update public.official_exam_questions
set legal_basis = jsonb_set(legal_basis, '{0,artigo}', '"210"')
where exam_year = 2018 and item_number = 28
  and career_name = 'Professor - Licenciatura Plena - Pedagogo'
  and jsonb_array_length(legal_basis) = 1
  and legal_basis -> 0 ->> 'artigo' is null;
