-- Follow-up: this source contains 15 (not 13) C/E items.
UPDATE public.study_materials
SET quiz=(SELECT jsonb_agg(jsonb_set(elem,'{a}',to_jsonb(elem->>'a'='C')) ORDER BY ord) FROM jsonb_array_elements(quiz) WITH ORDINALITY e(elem,ord)),
practice_review=jsonb_set(coalesce(practice_review,'{}'::jsonb),'{quiz_schema_audit}',jsonb_build_object('status','normalized_ce_pending_independent_legal_review','checked_at','2026-11-21','original_convention','C=Certo; E=Errado')),updated_at=now()
WHERE slug='contabilidade-cebraspe-tce-rs-2025-ciencias-contabeis'
AND jsonb_array_length(quiz)=15
AND NOT EXISTS (SELECT 1 FROM jsonb_array_elements(quiz) item WHERE item->>'a' NOT IN ('C','E'));