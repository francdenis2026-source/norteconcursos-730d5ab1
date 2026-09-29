-- A reimportação em 20260927080000_fix_pf_prf_2021_collision.sql recriou as
-- questões da PRF 2021 com career_name = 'Policial Rodoviário Federal',
-- desfazendo 20260927000000. Os documentos do aluno usam
-- contest_name = 'Polícia Rodoviária Federal', e a tela "Corrigir meu gabarito"
-- filtra por igualdade exata, então a prova ficava sem gabarito.
update public.official_exam_questions
set career_name = 'Polícia Rodoviária Federal'
where career_name = 'Policial Rodoviário Federal';
