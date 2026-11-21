-- Item-by-item review: seven PAD/deveres questions and eight sanctions questions.
-- Based on official Assembleia Legislativa do Acre consolidated LC 129/2004, arts 100, 106-C, 107-112, 124, 129-131.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_acre_lc129_disciplinary',
 'checked_at','2026-11-21',
 'scope','Quiz statements only (7 PAD and 8 sanctions). Full lesson and post-publication case law not certified.',
 'official_sources',jsonb_build_array('https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/6614','https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/6614/pdf?alteracaoId=83'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE slug IN ('pcac-2026-lc129-deveres-investigacao-e-processo-disciplinar','pcac-2026-lc129-transgressoes-penalidades-responsabilidades')
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND ((slug='pcac-2026-lc129-deveres-investigacao-e-processo-disciplinar' AND jsonb_array_length(quiz)=7)
 OR (slug='pcac-2026-lc129-transgressoes-penalidades-responsabilidades' AND jsonb_array_length(quiz)=8));