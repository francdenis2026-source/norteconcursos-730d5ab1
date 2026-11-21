-- Individual audit of 15 Penal Code quiz questions, modules 01-03.
-- The edital-dependent assertion in module 04 is deliberately not approved.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_penal_code',
 'subject','Noções de Direito Penal e Processual Penal','checked_at','2026-11-21',
 'scope','Five Penal Code quiz questions per lesson; excludes full lesson and edital verification.',
 'official_sources',jsonb_build_array('https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'
),updated_at=now()
WHERE slug IN (
 'pcac-2026-direito-penal-01-aplicacao-lei-penal',
 'pcac-2026-direito-penal-02-teoria-do-crime',
 'pcac-2026-direito-penal-03-crimes-pessoa-patrimonio')
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=5;