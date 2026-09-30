-- Corrige questoes curadas de materias sem base legal real (Portugues, RLM,
-- Informatica, Medicina Legal doutrinaria, Historia/Geografia, Realidade do
-- Acre, doutrina administrativa) que foram inseridas com uma URL placeholder
-- (gov.br/acre ou gov.br/mdh) em legal_basis. Essa URL nao e reconhecida como
-- fonte oficial por isLegallyVerified (src/lib/questionFormat.ts), o que
-- prendia essas questoes ocultas no treinador esperando "vigencia conferida"
-- mesmo nao havendo lei nenhuma para conferir. Como essas materias nao citam
-- lei/sumula, o correto e legal_basis vazio (basis.length === 0 ja libera a
-- questao para o treino).

update public.curated_question_catalog
set legal_basis = '[]'::jsonb
where legal_basis::text like '%gov.br/acre%'
   or legal_basis::text like '%gov.br/mdh%';
