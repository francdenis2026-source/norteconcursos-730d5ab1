-- Seven LC 39/1993 quiz items checked against arts 1,4,19,20,38,39 and LC 525/2026.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_acre_lc39',
 'checked_at','2026-11-21',
 'scope','Seven quiz statements only; not full lesson or edital certification.',
 'official_sources',jsonb_build_array('https://legis.ac.gov.br/detalhar/110','https://legis.ac.gov.br/detalhar/6864-1','https://www.tjac.jus.br/wp-content/uploads/1993/12/Lei_Complementar_39_1993.pdf'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE slug='pcac-2026-lc39-regime-geral-provimento-vacancia-direitos'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=7;