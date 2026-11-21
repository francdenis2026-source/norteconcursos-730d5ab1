-- Seven PCCR career/entry/progression quiz statements checked against Acre Law 2250/2009 as amended.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_acre_law_2250',
 'checked_at','2026-11-21',
 'scope','Seven quiz items only; not certification of the full lesson, salary tables or 2026 edital.',
 'official_sources',jsonb_build_array('https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/5556','https://legis.ac.gov.br/detalhar/417'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE slug='pcac-2026-lei2250-estrutura-ingresso-progressao-promocao'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=7;