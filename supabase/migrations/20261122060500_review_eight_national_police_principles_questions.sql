-- Item-level review of eight national police organic law questions, arts 4-12.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_national_law_14735',
 'checked_at','2026-11-21',
 'scope','Eight quiz statements on institutional principles, competences and structure only; not full lesson.',
 'official_sources',jsonb_build_array('https://www2.camara.leg.br/legin/fed/lei/2023/lei-14735-23-novembro-2023-794983-normaatualizada-pl.pdf','https://normas.leg.br/?urn=urn%3Alex%3Abr%3Afederal%3Alei%3A2023-11-23%3B14735'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE slug='pcac-2026-lei14735-principios-competencias-estrutura'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=8;