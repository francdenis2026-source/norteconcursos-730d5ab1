-- Flag all insufficient explanations for substantive review, without modifying answer keys.
WITH weak AS (
 SELECT sm.id, count(*)::int n
 FROM public.study_materials sm
 CROSS JOIN LATERAL jsonb_array_elements(sm.quiz) e(item)
 WHERE sm.content_status='active' AND jsonb_typeof(sm.quiz)='array'
 AND length(trim(coalesce(e.item->>'why','')))<25
 GROUP BY sm.id
)
UPDATE public.study_materials sm
SET practice_review=jsonb_set(coalesce(sm.practice_review,'{}'::jsonb),'{explanation_quality_audit}',
jsonb_build_object('status','needs_substantive_review','short_explanation_count',weak.n,'threshold_characters',25,'checked_at','2026-11-21'),true),
updated_at=now()
FROM weak WHERE sm.id=weak.id;
-- Five clear, independently checkable RLM explanations.
UPDATE public.study_materials sm
SET quiz=(SELECT jsonb_agg(
 CASE e.ord
 WHEN 1 THEN jsonb_set(e.item,'{why}',to_jsonb('Correto. A união A∪B inclui todos os elementos que pertencem a A, a B ou a ambos; não exclui os elementos comuns.'::text))
 WHEN 2 THEN jsonb_set(e.item,'{why}',to_jsonb('Errado. A interseção A∩B contém somente os elementos presentes nos dois conjuntos. Os que não pertencem a nenhum ficam fora da união.'::text))
 WHEN 5 THEN jsonb_set(e.item,'{why}',to_jsonb('Correto. Pelo princípio da inclusão-exclusão, |A∪B|=|A|+|B|−|A∩B|=18+16−8=26; subtraímos a interseção para não contá-la duas vezes.'::text))
 WHEN 7 THEN jsonb_set(e.item,'{why}',to_jsonb('Correto. Se o universo contém 30 elementos e a união contém 26, seu complemento tem 30−26=4 elementos.'::text))
 ELSE e.item END ORDER BY e.ord)
 FROM jsonb_array_elements(sm.quiz) WITH ORDINALITY e(item,ord)),
practice_review=jsonb_set(coalesce(sm.practice_review,'{}'::jsonb),'{explanation_quality_audit}',jsonb_build_object('status','targeted_expansion_pending_full_review','checked_at','2026-11-21'),true),
updated_at=now()
WHERE sm.slug='rlm-conjuntos-quantificadores' AND jsonb_array_length(sm.quiz)>=7;
UPDATE public.study_materials sm
SET quiz=(SELECT jsonb_agg(CASE WHEN e.ord=6 THEN jsonb_set(e.item,'{why}',to_jsonb('Errado. Eventos disjuntos não ocorrem simultaneamente: P(A∩B)=0. Eventos independentes satisfazem P(A∩B)=P(A)P(B). Se ambos têm probabilidade positiva, não podem ser ao mesmo tempo disjuntos e independentes.'::text)) ELSE e.item END ORDER BY e.ord)
 FROM jsonb_array_elements(sm.quiz) WITH ORDINALITY e(item,ord)),
practice_review=jsonb_set(coalesce(sm.practice_review,'{}'::jsonb),'{explanation_quality_audit}',jsonb_build_object('status','targeted_expansion_pending_full_review','checked_at','2026-11-21'),true),updated_at=now()
WHERE sm.slug='rlm-contagem-probabilidade-basica' AND jsonb_array_length(sm.quiz)>=6;