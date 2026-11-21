-- Four targeted quiz audits (20 items): police powers, administrative acts, agents, state liability.
-- Preserve the structural audit and do not certify complete lessons or case-law.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_admin_law',
 'subject','Noções de Direito Administrativo','checked_at','2026-11-21',
 'scope','Five true/false quiz items per lesson; checked for legal and doctrinal consistency. Does not certify entire lesson or case law.',
 'official_sources',jsonb_build_array('https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'
),updated_at=now()
WHERE slug IN (
 'pcac-2026-direito-administrativo-04-poder-de-policia',
 'pcac-2026-direito-administrativo-05-atos-administrativos',
 'pcac-2026-direito-administrativo-06-agentes-publicos',
 'pcac-2026-direito-administrativo-07-responsabilidade-civil-estado')
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=5;