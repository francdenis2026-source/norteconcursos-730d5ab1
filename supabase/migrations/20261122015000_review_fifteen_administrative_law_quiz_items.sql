-- Targeted item-level review of fifteen administrative-law quiz questions.
-- Sources: CF arts. 37 and 84; Law 13.303/2016; general administrative-law doctrine.
-- Scope: quizzes only, not wholesale validation of lessons or jurisprudence.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_admin_law',
 'subject','Noções de Direito Administrativo','checked_at','2026-11-21',
 'scope','Five original true/false quiz items per lesson; reviewed for legal consistency. Does not certify full body content.',
 'official_sources',jsonb_build_array('https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13303.htm'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'
),updated_at=now()
WHERE slug IN (
 'pcac-2026-direito-administrativo-01-principios-administracao-publica',
 'pcac-2026-direito-administrativo-02-organizacao-direta-indireta',
 'pcac-2026-direito-administrativo-03-poderes-administrativos')
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=5;