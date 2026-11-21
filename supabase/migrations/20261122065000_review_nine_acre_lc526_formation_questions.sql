-- Nine LC 129/2004 questions reviewed against LC 526/2026 consolidated text (arts 65,73,77-79-E).
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_lc526_2026',
 'checked_at','2026-11-21',
 'scope','Nine questions on appointment, formation, probation and first placement only; full lesson not certified.',
 'official_sources',jsonb_build_array('https://legis.ac.gov.br/detalhar/6874','https://legis.ac.gov.br/detalhar/674-0'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE slug='pcac-2026-lc129-atualizacao-lc526-2026-ingresso-formacao-lotacao'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=9;