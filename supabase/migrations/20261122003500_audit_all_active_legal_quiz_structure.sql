-- Reproducible structural audit across 328 active legal quiz items.
-- Audit annotations are separate from editorial/legal approval and do not change review statuses.
WITH audited AS (
 SELECT s.id,
        count(*)::int AS n,
        count(*) FILTER (WHERE length(trim(coalesce(e.value->>'q','')))<15)::int AS invalid_question,
        count(*) FILTER (WHERE jsonb_typeof(e.value->'a') IS DISTINCT FROM 'boolean')::int AS invalid_answer,
        count(*) FILTER (WHERE length(trim(coalesce(e.value->>'why','')))<40)::int AS weak_explanation,
        count(*) FILTER (WHERE e.value->>'q' ~* 'sempre|nunca|todo|somente|exclusivamente')::int AS absolute_wording
 FROM public.study_materials s CROSS JOIN LATERAL jsonb_array_elements(s.quiz) e(value)
 WHERE s.content_status='active' AND s.discipline IN
 ('Legislação Institucional','Noções de Direito Administrativo','Noções de Direito Constitucional','Noções de Direito Penal e Processual Penal')
 GROUP BY s.id
)
UPDATE public.study_materials s
SET practice_review=jsonb_set(coalesce(s.practice_review,'{}'::jsonb),'{structural_audit}',
 jsonb_build_object('checked_on','2026-11-21','status',CASE WHEN a.invalid_question+a.invalid_answer+a.weak_explanation=0 THEN 'passed' ELSE 'requires_fix' END,
 'items_checked',a.n,'invalid_questions',a.invalid_question,'invalid_answers',a.invalid_answer,
 'weak_explanations',a.weak_explanation,'absolute_wording_to_review',a.absolute_wording,
 'note','Verificação automatizada estrutural; NÃO certifica vigência normativa, gabarito, jurisprudência ou aderência ao edital.'),true),
 updated_at=now()
FROM audited a WHERE s.id=a.id
 AND coalesce(s.practice_review->'structural_audit'->>'checked_on','') <> '2026-11-21';