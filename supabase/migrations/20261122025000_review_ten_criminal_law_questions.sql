-- Ten item-level questions checked against CP arts. 316,317,319,342,347;
-- Laws 9.455/1997 and 13.869/2019 (art. 1). No edital-specific assertion approved.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_official_criminal_statutes',
 'subject','Noções de Direito Penal e Processual Penal','checked_at','2026-11-21',
 'scope','Five quiz questions in each of two lessons; full text and jurisprudence not certified.',
 'official_sources',jsonb_build_array('https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm','https://www.planalto.gov.br/ccivil_03/leis/l9455.htm','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869.htm'),
 'items',quiz,'structural_audit',practice_review->'structural_audit'
),updated_at=now()
WHERE slug IN ('pcac-2026-direito-penal-05-crimes-administracao-publica','pcac-2026-direito-penal-06-tortura-abuso-autoridade')
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=5;