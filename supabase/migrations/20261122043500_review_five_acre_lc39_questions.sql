-- Item-level review of five LC 39/1993 questions, including the narrow repeal by LC 525/2026.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_official_acre_statute',
 'checked_at','2026-11-21','scope','Five quiz statements only; not a full audit of LC 39/1993 or the complete lesson.',
 'official_sources',jsonb_build_array('https://legis.ac.gov.br/detalhar/110','https://legis.ac.gov.br/detalhar/6864-0'),
 'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE slug='pcac-2026-legislacao-lc39-regime-servidor'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=5;