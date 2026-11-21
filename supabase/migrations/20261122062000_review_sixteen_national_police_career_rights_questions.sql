-- Verify 16 national police organic law quiz items against the consolidated text of Law 14735/2023.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_national_law_14735',
 'checked_at','2026-11-21',
 'scope','Eight quiz items per lesson, not a full lesson or edital audit.',
 'official_sources',jsonb_build_array('https://www2.camara.leg.br/legin/fed/lei/2023/lei-14735-23-novembro-2023-794983-normaatualizada-pl.pdf'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE slug IN ('pcac-2026-lei14735-cargos-concurso-atribuicoes','pcac-2026-lei14735-direitos-deveres-disposicoes-finais')
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=8;