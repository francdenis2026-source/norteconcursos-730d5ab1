-- Individual quiz review of 14 items: integrated administrative cases (5) and improbity law (9).
-- Official consolidated legal basis: Law 8.429/1992, arts. 1, 9, 10, 11, 12, 16.
-- Does not certify entire lesson text or judicial decisions.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_official_law',
 'subject','Noções de Direito Administrativo','checked_at','2026-11-21',
 'scope','All quiz items of the two named lessons; full body and case-law review not included.',
 'official_sources',jsonb_build_array('https://www.planalto.gov.br/ccivil_03/leis/l8429.htm','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'
),updated_at=now()
WHERE slug IN ('pcac-2026-administrativo-casos-praticos-atos-poderes-agentes','pcac-2026-direito-administrativo-08-improbidade-administrativa')
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND ((slug='pcac-2026-administrativo-casos-praticos-atos-poderes-agentes' AND jsonb_array_length(quiz)=5)
 OR (slug='pcac-2026-direito-administrativo-08-improbidade-administrativa' AND jsonb_array_length(quiz)=9));