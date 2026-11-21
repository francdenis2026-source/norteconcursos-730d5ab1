-- Item-level audit: CPP evidence and forensics (12); CP public faith/dead/justice (5).
-- Do not autoapprove modules requiring 2025/2026 statutory verification or edital checking.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_criminal_statutes',
 'subject','Noções de Direito Penal e Processual Penal','checked_at','2026-11-21',
 'scope','Quiz questions only, not full lesson or later case-law developments.',
 'official_sources',jsonb_build_array('https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'
),updated_at=now()
WHERE slug IN ('pcac-2026-processo-penal-08-provas-cadeia-custodia-peritos','pcac-2026-penal-crimes-fe-publica-mortos-testemunho-fraude')
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND ((slug='pcac-2026-processo-penal-08-provas-cadeia-custodia-peritos' AND jsonb_array_length(quiz)=12)
 OR (slug='pcac-2026-penal-crimes-fe-publica-mortos-testemunho-fraude' AND jsonb_array_length(quiz)=5));