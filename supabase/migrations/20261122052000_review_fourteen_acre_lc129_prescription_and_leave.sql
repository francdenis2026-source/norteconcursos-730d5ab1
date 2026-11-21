-- Audit 14 quiz items under Acre LC 129/2004, articles 118-123 and 127-128.
-- Preserve the original answers and explanations; do not infer a fixed 30-day renewal under art. 127.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_official_acre_lc129',
 'checked_at','2026-11-21',
 'scope','Quiz items only: 8 on sindicancia/prescription, 6 on preventive leave. Entire lessons not audited.',
 'official_sources',jsonb_build_array('https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/6614'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'),
 updated_at=now()
WHERE slug IN ('pcac-2026-lc129-sindicancia-prazos-prescricao-extincao','pcac-2026-lc129-afastamento-preventivo-direitos-tempo-servico')
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND ((slug='pcac-2026-lc129-sindicancia-prazos-prescricao-extincao' AND jsonb_array_length(quiz)=8)
 OR (slug='pcac-2026-lc129-afastamento-preventivo-direitos-tempo-servico' AND jsonb_array_length(quiz)=6));