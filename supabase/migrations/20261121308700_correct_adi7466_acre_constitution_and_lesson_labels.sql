-- PC-AC 2026: fix STF ADI 7466/AC (12 Nov 2024) and the unwanted
-- opening-question caption in existing course lessons.
-- Primary ruling: https://portal.stf.jus.br/jurisprudencia/obterInteiroTeor.asp?idDocumento=782332210
-- Idempotent: retain valid updated items and preserve other answers.
WITH expected(slug, item_number, corrected_statement, corrected_explanation) AS (
 VALUES
 (
  'pcac-2026-constitucional-constituicao-acre-policia-civil', 3,
  'Atualmente, o Instituto Socioeducativo do Estado do Acre integra validamente o rol de órgãos de segurança pública do art. 131 da Constituição estadual.',
  'Errado. Embora a EC estadual nº 63/2022 tenha incluído o Instituto Socioeducativo no art. 131, IV, o STF declarou esse inciso inconstitucional na ADI 7.466, julgada em 12/11/2024. A redação histórica não representa o direito válido atual.'
 ),
 (
  'pcac-2026-constituicao-seguranca-publica-art144-acre', 5,
  'Após o julgamento da ADI 7.466 pelo STF em novembro de 2024, o Instituto Socioeducativo do Acre permanece validamente incluído como órgão de segurança pública no art. 131, IV, da Constituição estadual.',
  'Errado. O art. 131, IV, incluído pela EC nº 63/2022, foi declarado inconstitucional pelo STF na ADI 7.466 em 12/11/2024. O rol vigente não pode ser interpretado com base apenas na redação histórica da emenda.'
 )
),
revised AS (
 SELECT m.slug,
        jsonb_agg(
         CASE WHEN item.ordinality = e.item_number
         THEN jsonb_set(
               jsonb_set(
                jsonb_set(item.value, '{q}', to_jsonb(e.corrected_statement)),
                '{a}', 'false'::jsonb),
               '{why}', to_jsonb(e.corrected_explanation))
         ELSE item.value END
         ORDER BY item.ordinality
        ) AS quiz_corrected
 FROM public.study_materials m
 JOIN expected e ON e.slug = m.slug
 CROSS JOIN LATERAL jsonb_array_elements(m.quiz) WITH ORDINALITY AS item(value, ordinality)
 WHERE m.contest_name = 'PC-AC 2026'
 GROUP BY m.slug
)
UPDATE public.study_materials m
SET quiz = r.quiz_corrected,
    body_md = CASE WHEN m.body_md LIKE '%ADI 7.466%'
                   THEN m.body_md
                   ELSE m.body_md || E'\n\n> **ATUALIZAÇÃO — ADI 7.466/STF (12/11/2024):** O art. 131, IV, da Constituição do Acre, que incluía o Instituto Socioeducativo no rol de segurança pública, foi declarado inconstitucional. Fonte: https://portal.stf.jus.br/jurisprudencia/obterInteiroTeor.asp?idDocumento=782332210'
              END,
    practice_review = coalesce(m.practice_review, '{}'::jsonb)
      || jsonb_build_object('status', 'needs_revalidation',
      'revision_reason','ADI 7.466/STF: gabarito corrigido e revisão jurídica integral ainda necessária'),
    updated_at = now()
FROM revised r
WHERE m.slug = r.slug
AND (m.quiz IS DISTINCT FROM r.quiz_corrected OR m.body_md NOT LIKE '%ADI 7.466%');

UPDATE public.study_materials
SET body_md = replace(
  replace(body_md,
   'QUESTÃO DE ABERTURA — padrão IDECAN (autoral)',
   '🎯 DESAFIO DE PROVA'),
   'QUESTÃO DE ABERTURA', 'DESAFIO DE PROVA'),
 updated_at = now()
WHERE contest_name = 'PC-AC 2026'
AND body_md ILIKE '%QUESTÃO DE ABERTURA%';
