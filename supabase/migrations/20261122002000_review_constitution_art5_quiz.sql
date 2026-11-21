-- Audited against the official compiled Federal Constitution, art. 5 (XI, XVI, LVI, LXVIII, LXXII).
-- Scope is limited to the five quiz items; does not certify the whole lesson or jurisprudence.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_constitutional_text',
 'subject','Noções de Direito Constitucional','checked_at','2026-11-21',
 'scope','Five quiz items only, checked against the compiled text of CF/1988 art. 5; broader case law review remains separate',
 'official_source','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
 'items',quiz
),updated_at=now()
WHERE slug='pcac-2026-constitucional-art5-direitos-garantias-aplicacao-pratica'
 AND content_status='active'
 AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=5;
