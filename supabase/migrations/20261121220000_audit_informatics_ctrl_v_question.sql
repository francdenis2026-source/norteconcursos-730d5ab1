-- Auditoria editorial: corrige ambiguidade do Ctrl+V e sincroniza a revisão exata.
-- Idempotente; mantém a aprovação somente se o enunciado anterior corresponde ao esperado.
WITH revised AS (
 SELECT id, jsonb_agg(CASE WHEN item->>'q'='Ctrl+V cola o conteúdo selecionado?' THEN jsonb_set(jsonb_set(item,'{q}',to_jsonb('Ctrl+V cola o conteúdo que está na área de transferência?'::text)),'{why}',to_jsonb('Ctrl+V cola o conteúdo presente na área de transferência, copiado ou recortado anteriormente; não cola necessariamente o conteúdo atualmente selecionado.'::text)) ELSE item END ORDER BY ord) AS new_quiz
 FROM public.study_materials CROSS JOIN LATERAL jsonb_array_elements(quiz) WITH ORDINALITY q(item,ord)
 WHERE slug='informatica-03-01' AND EXISTS(SELECT 1 FROM jsonb_array_elements(quiz) x WHERE x->>'q'='Ctrl+V cola o conteúdo selecionado?')
 GROUP BY id
), patched AS (
 UPDATE public.study_materials s SET quiz=r.new_quiz, practice_review=jsonb_set(s.practice_review,'{items}',(SELECT jsonb_agg(jsonb_build_object('q',item->>'q','a',(item->>'a')::boolean,'why',item->>'why') ORDER BY ord) FROM jsonb_array_elements(r.new_quiz) WITH ORDINALITY x(item,ord))), updated_at=now() FROM revised r WHERE s.id=r.id AND s.practice_review->>'status'='reviewed' RETURNING s.slug
) SELECT * FROM patched;
