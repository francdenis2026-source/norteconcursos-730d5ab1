-- Review of nine PAD procedural quiz questions based on Acre LC 129/2004,
-- arts. 129, 132-134, 137-138, 147-148-A.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_acre_lc129_pad',
 'checked_at','2026-11-21',
 'scope','Nine PAD procedural quiz items only; not full lesson certification.',
 'official_sources',jsonb_build_array('https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/6614'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE slug='pcac-2026-lc129-pad-instrucao-defesa-relatorio-recursos'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=9;