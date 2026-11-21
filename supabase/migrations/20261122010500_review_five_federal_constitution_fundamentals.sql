-- Item-by-item review of five questions based on CF/1988 arts. 1, 3, 5, 37 and 144.
-- The separate Acre constitutional lesson remains pending state-law and ADI 7466 verification.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_constitutional_text',
 'subject','Noções de Direito Constitucional','checked_at','2026-11-21',
 'scope','Five federal constitutional quiz items only; not a certification of the entire lesson or jurisprudence.',
 'official_source','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
 'items',quiz,'structural_audit',practice_review->'structural_audit'
),updated_at=now()
WHERE slug='pcac-2026-constituicao-federal-fundamentos-direitos-administracao-seguranca'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=5;