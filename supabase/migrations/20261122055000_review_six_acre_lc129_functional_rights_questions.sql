-- Six quiz items on police functional rights, identification, carry and training.
-- Scope deliberately excludes the full lesson and individual firearms authorization.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_acre_lc129_rights',
 'checked_at','2026-11-21',
 'scope','Six quiz statements on arts 87-90, 93 and LC 496/2025 only; full lesson not certified.',
 'official_sources',jsonb_build_array('https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/6614','https://legis.ac.gov.br/detalhar/6874'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE slug='pcac-2026-lc129-direitos-funcionais-carteira-porte-bolsa'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=6;