-- Replace unsupported claim about the edital with a directly verifiable CP statement.
-- Audit limited to the 5 quiz items of this lesson; no claim of edital verification.
UPDATE public.study_materials s
SET quiz=(SELECT jsonb_agg(
 CASE WHEN e.value->>'q'='O edital delimita os crimes contra o respeito aos mortos nos arts. 209 a 212 do CP.'
 THEN jsonb_set(jsonb_set(e.value,'{q}',to_jsonb('O Código Penal disciplina os crimes contra o respeito aos mortos nos arts. 209 a 212.'::text)),'{why}',to_jsonb('Correto. Os arts. 209 a 212 do Código Penal tratam, respectivamente, de impedimento ou perturbação de cerimônia funerária, violação de sepultura, destruição/subtração/ocultação de cadáver e vilipêndio a cadáver. Esta questão testa a localização legal, sem afirmar que o edital cobra todos esses dispositivos. Fonte: https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'::text))
 ELSE e.value END ORDER BY e.ordinality)
 FROM jsonb_array_elements(s.quiz) WITH ORDINALITY e(value,ordinality)),
 practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_penal_code',
 'checked_at','2026-11-21','scope','Five quiz items only. Edital coverage not certified.',
 'official_sources',jsonb_build_array('https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'),
 'structural_audit',s.practice_review->'structural_audit',
 'editorial_correction','Removed unsupported assertion about exact edital scope.'),
 updated_at=now()
WHERE s.slug='pcac-2026-direito-penal-04-crimes-sexuais-mortos-fe-publica'
 AND s.content_status='active' AND s.practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(s.quiz)=5
 AND s.quiz @> '[{"q":"O edital delimita os crimes contra o respeito aos mortos nos arts. 209 a 212 do CP."}]'::jsonb;

-- Individually inspected 10 inquest questions against CPP arts. 7, 10, 13-A, 13-B, 14-A, 16, 17, 21 and CF defense guarantees.
UPDATE public.study_materials
SET practice_review=jsonb_build_object(
 'version',1,'status','reviewed','review_type','item_by_item_cpp',
 'checked_at','2026-11-21','scope','Ten inquest quiz questions only; no blanket approval of entire lesson or later jurisprudence.',
 'official_sources',jsonb_build_array('https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'),
 'structural_audit',practice_review->'structural_audit'),
 updated_at=now()
WHERE slug='pcac-2026-processo-penal-07-inquerito-policial'
 AND content_status='active' AND practice_review->>'status'='needs_revalidation'
 AND jsonb_array_length(quiz)=10;