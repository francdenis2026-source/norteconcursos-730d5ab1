-- Remove a verified, unrelated CPC 26 appendix only where it is the final section.
-- The original discipline-specific content before the heading is preserved.
UPDATE public.study_materials
SET body_md=rtrim(left(body_md,strpos(body_md,'## Classificação dos passivos financeiros — CPC 26')-1)),
practice_review=jsonb_set(coalesce(practice_review,'{}'::jsonb),'{cross_discipline_contamination}',jsonb_build_object('status','unrelated_trailing_cpc26_section_removed','checked_at','2026-11-21','preservation','all text before CPC 26 heading retained'),true),
updated_at=now()
WHERE content_status='active' AND discipline NOT ILIKE '%Contab%'
AND strpos(body_md,'## Classificação dos passivos financeiros — CPC 26')>1
AND right(trim(body_md),length('sem ignorar os demais critérios do pronunciamento.'))='sem ignorar os demais critérios do pronunciamento.'
AND practice_review->'cross_discipline_contamination'->>'status'='requires_section_level_review';