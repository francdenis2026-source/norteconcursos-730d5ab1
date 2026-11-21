-- PCCR: five questions checked individually against Acre Law 2250/2009, arts 1,20,21 and scope.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_official_acre_pccr',
 'checked_at','2026-11-21',
 'scope','Five PCCR quiz statements only; no full salary table or entire lesson certification.',
 'official_sources',jsonb_build_array('https://www.legis.ac.gov.br/detalhar/417','https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/5556','https://www.legis.ac.gov.br/detalhar/674'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'),
 updated_at=now()
WHERE slug='pcac-2026-legislacao-lei-2250-pccr'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=5;