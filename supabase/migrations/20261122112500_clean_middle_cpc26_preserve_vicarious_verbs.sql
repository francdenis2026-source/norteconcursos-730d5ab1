UPDATE public.study_materials SET
body_md=rtrim(left(body_md,strpos(body_md,'## Classificação dos passivos financeiros — CPC 26')-1)) || E'\n\n' ||
substr(body_md,strpos(body_md,E'---\n\n## Verbo vicário: substitua o verbo, não repita a ação')),
practice_review=jsonb_set(coalesce(practice_review,'{}'::jsonb),'{cross_discipline_contamination}',jsonb_build_object('status','unrelated_middle_cpc26_section_removed','checked_at','2026-11-21','preserved_following_section','Verbo vicário'),true),updated_at=now()
WHERE slug='portugues-verbos-tempos-vozes'
AND practice_review->'cross_discipline_contamination'->>'status'='requires_section_level_review'
AND strpos(body_md,'## Classificação dos passivos financeiros — CPC 26')>1
AND strpos(body_md,E'---\n\n## Verbo vicário: substitua o verbo, não repita a ação')>strpos(body_md,'## Classificação dos passivos financeiros — CPC 26');