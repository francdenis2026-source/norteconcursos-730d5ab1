-- Remove only the known CPC 26 cross-discipline block accidentally appended to PC-AC materials.
-- Preserve all content before the contaminant and any later section after the next separator.
update public.study_materials
set body_md=regexp_replace(
 body_md,
 E'\\n{2}## Classificação dos passivos financeiros — CPC 26[\\s\\S]*?(?=\\n{2}---\\n{2}|$)',
 '',
 'g'
),
updated_at=now()
where contest_name='PC-AC 2026'
and content_status='active'
and body_md like '%## Classificação dos passivos financeiros — CPC 26%';
