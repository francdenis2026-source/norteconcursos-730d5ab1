-- Five quiz statements inspected on national organic law 14.735/2023.
-- Review limited to quiz; state laws and full lesson not certified.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_national_organic_law',
 'checked_at','2026-11-21','scope','Five true/false items about national Law 14.735/2023; state-specific lessons remain pending.',
 'official_sources',jsonb_build_array('https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14735.htm'),
 'structural_audit',practice_review->'structural_audit'),
 updated_at=now()
WHERE slug='pcac-2026-legislacao-lei-organica-nacional-14735'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=5;