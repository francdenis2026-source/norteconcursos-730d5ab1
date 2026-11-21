-- Five individually examined institutional career quiz assertions.
-- Sources: LC 496/2025; LC 129/2004; LC 39/1993 art. 166 IV; Constitution and national law.
UPDATE public.study_materials
SET practice_review=jsonb_build_object('version',1,'status','reviewed',
 'review_type','item_by_item_acre_career_duties',
 'checked_at','2026-11-21',
 'scope','Five quiz statements only; does not approve all disciplinary rules in the lesson.',
 'official_sources',jsonb_build_array('https://legis.ac.gov.br/detalhar/6874','https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14735.htm','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'),
 'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE slug='pcac-2026-legislacao-carreira-deveres-disciplina'
AND content_status='active' AND practice_review->>'status'='needs_revalidation'
AND jsonb_array_length(quiz)=5;