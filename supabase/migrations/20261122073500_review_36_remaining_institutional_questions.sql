-- Additional multi-block audit: LC39 leave and duties, Acre PCCR and constitutional security.
-- Review scope is quiz items, preserving earlier structural audit.
UPDATE public.study_materials SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_statute','checked_at','2026-11-21',
 'scope','Quiz questions only; not a full lesson or edital audit.',
 'official_sources',CASE
 WHEN slug IN ('pcac-2026-lc39-licenca-premio-regras-aquisicao-concessao','pcac-2026-lc39-deveres-proibicoes-responsabilidades-servidor') THEN jsonb_build_array('https://legis.ac.gov.br/detalhar/110')
 WHEN slug='pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025' THEN jsonb_build_array('https://legis.ac.gov.br/','https://app.al.ac.leg.br/legisla-e/')
 ELSE jsonb_build_array('https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm','https://legis.ac.gov.br/detalhar_constituicao/0','https://portal.stf.jus.br/jurisprudencia/obterInteiroTeor.asp?idDocumento=782332210') END,
 'items',quiz,'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE content_status='active' AND practice_review->>'status'='needs_revalidation'
AND ((slug='pcac-2026-lc39-licenca-premio-regras-aquisicao-concessao' AND jsonb_array_length(quiz)=6)
OR (slug='pcac-2026-lc39-deveres-proibicoes-responsabilidades-servidor' AND jsonb_array_length(quiz)=12)
OR (slug='pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025' AND jsonb_array_length(quiz)=10)
OR (slug='pcac-2026-constituicao-seguranca-publica-art144-acre' AND jsonb_array_length(quiz)=8));