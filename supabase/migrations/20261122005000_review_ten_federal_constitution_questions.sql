-- Editorial item-by-item audit of ten constitutional questions against CF/1988.
-- This approves only the listed quiz items, not all body content or case law.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_constitutional_text',
 'subject','Noções de Direito Constitucional','checked_at','2026-11-21',
 'scope','Five quiz questions per lesson; checked against CF/1988 articles 5, 37, 41 and 144 as applicable. Does not certify all didactic text or case law.',
 'official_source','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
 'items',quiz,
 'structural_audit',practice_review->'structural_audit'
),updated_at=now()
WHERE slug IN ('pcac-2026-constitucional-art37-41-servidores-administracao',
'pcac-2026-constitucional-remedios-art37-art144')
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=5;