-- Verified 12 item-level quiz assertions in identification, custody and pretrial measures.
-- Official 2025/2026 legislation checked: Laws 15.272/2025, 15.295/2025, 15.487/2026.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_recent_criminal_statutes',
 'checked_at','2026-11-21','scope','Twelve quiz assertions checked against updated CPP, Law 12.037/2009 and recent statutes; does not certify entire lesson or all jurisprudence.',
 'official_sources',jsonb_build_array(
 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15272.htm',
 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15295.htm',
 'https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15487.htm',
 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm'),
 'structural_audit',practice_review->'structural_audit'),
 updated_at=now()
WHERE slug='pcac-2026-processo-penal-09-identificacao-criminal-prisoes-medidas-cautelares'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=12;