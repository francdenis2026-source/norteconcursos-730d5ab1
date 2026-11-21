-- Multi-block quiz audit: LC39 disciplinary process, Federal Delegado Law 12830, and SUSP Law 13675.
UPDATE public.study_materials SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_statute','checked_at','2026-11-21',
 'scope','Quiz questions only; excludes full lessons and edital coverage.',
 'official_sources',CASE
 WHEN slug='pcac-2026-lc39-deveres-acumulacao-penalidades-prescricao-pad' THEN jsonb_build_array('https://legis.ac.gov.br/detalhar/110')
 WHEN slug='pcac-2026-lei12830-investigacao-delegado-adi5043' THEN jsonb_build_array('https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12830.htm','https://portal.stf.jus.br/')
 ELSE jsonb_build_array('https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13675.htm') END,
 'items',quiz,'structural_audit',practice_review->'structural_audit'),updated_at=now()
WHERE content_status='active' AND practice_review->>'status'='needs_revalidation'
AND ((slug='pcac-2026-lc39-deveres-acumulacao-penalidades-prescricao-pad' AND jsonb_array_length(quiz)=9)
OR (slug='pcac-2026-lei12830-investigacao-delegado-adi5043' AND jsonb_array_length(quiz)=8)
OR (slug='pcac-2026-lei13675-susp-politica-seguranca' AND jsonb_array_length(quiz)=8));