-- Normalize verified binary-answer records without modifying the underlying assertions.
UPDATE public.study_materials
SET quiz=(
 SELECT jsonb_agg(
  CASE
   WHEN elem ? 'question' AND elem ? 'answer' AND elem ? 'explanation'
    THEN jsonb_build_object('q',elem->>'question','a',case when elem->>'answer'='Sim' then true else false end,'why',elem->>'explanation')
   ELSE elem END ORDER BY ord
 )
 FROM jsonb_array_elements(quiz) WITH ORDINALITY e(elem,ord)
),
practice_review=jsonb_set(coalesce(practice_review,'{}'::jsonb),'{quiz_schema_audit}',jsonb_build_object('status','normalized_verified_binary_answers','checked_at','2026-11-21')),updated_at=now()
WHERE slug='contabilidade-balancete-verificacao-finalidade-limitacoes'
AND jsonb_array_length(quiz)=2
AND quiz->0->>'answer'='Não' AND quiz->1->>'answer'='Sim';
-- C/E convention used by this source means Certo/Errado; retain original statement and rationale.
UPDATE public.study_materials
SET quiz=(SELECT jsonb_agg(
 jsonb_set(elem,'{a}',to_jsonb(elem->>'a'='C')) ORDER BY ord)
 FROM jsonb_array_elements(quiz) WITH ORDINALITY e(elem,ord)),
practice_review=jsonb_set(coalesce(practice_review,'{}'::jsonb),'{quiz_schema_audit}',jsonb_build_object('status','normalized_ce_pending_independent_legal_review','checked_at','2026-11-21','original_convention','C=Certo; E=Errado')),updated_at=now()
WHERE slug='contabilidade-cebraspe-tce-rs-2025-ciencias-contabeis'
AND jsonb_array_length(quiz)=13
AND NOT EXISTS (SELECT 1 FROM jsonb_array_elements(quiz) item WHERE item->>'a' NOT IN ('C','E'));