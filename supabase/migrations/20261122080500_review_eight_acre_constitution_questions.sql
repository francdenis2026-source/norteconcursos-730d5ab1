-- Targeted item-by-item constitutional review; distinct source wordings preserved.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_constitution_and_stf',
 'checked_at','2026-11-21',
 'scope','Eight quiz items reviewed; does not certify full lesson or edital. Item 6 is explicitly restricted to literal Acre Constitution art. 134 §1.',
 'official_sources',jsonb_build_array('https://legis.ac.gov.br/detalhar_constituicao','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm','https://noticias.stf.jus.br/postsnoticias/stf-invalida-norma-que-transformou-instituto-socioeducativo-do-acre-em-orgao-de-seguranca-publica/','https://legis.ac.gov.br/detalhar/6874'),
 'items',quiz,
 'state_constitution_audit',jsonb_build_object('status','reviewed_with_normative_wording_caveat','note','Constitution art 134 §1 says provas e títulos, LC 129/2004 art 64 as amended says provas ou provas e títulos; the item asks only literal constitutional wording. STF ADI 7466 invalidates art 131 IV.'),
 'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE slug='pcac-2026-constitucional-constituicao-acre-policia-civil'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=8
 AND quiz->5->>'q' LIKE 'Segundo a redação literal do art. 134%';