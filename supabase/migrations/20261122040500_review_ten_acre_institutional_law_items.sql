-- Review 10 institutional-law questions based on the Acre official consolidated LC 129/2004,
-- LC 496/2025 and LC 526/2026. Excludes full lesson text and case law.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_official_acre_laws',
 'checked_at','2026-11-21','scope','Five quiz questions per lesson; reviewed against official consolidated Acre legislation.',
 'official_sources',jsonb_build_array('https://www.legis.ac.gov.br/detalhar/674','https://legis.ac.gov.br/detalhar/6527','https://legis.ac.gov.br/detalhar/6874'),
 'structural_audit',practice_review->'structural_audit'),
 updated_at=now()
WHERE slug IN ('pcac-2026-legislacao-institucional-policia-civil-acre','pcac-2026-legislacao-lc129-atualizacoes-496-526')
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=5;