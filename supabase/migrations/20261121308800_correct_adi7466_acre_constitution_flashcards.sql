-- STF ADI 7466/AC, judgment dated 12 Nov 2024.
-- Correct the revision cards that used EC 63/2022 without the subsequent
-- invalidation of art. 131, IV of the Acre Constitution.
WITH target(slug, item_number) AS (
 VALUES
 ('pcac-2026-constitucional-constituicao-acre-policia-civil', 2),
 ('pcac-2026-constituicao-seguranca-publica-art144-acre', 5)
),
updated AS (
 SELECT m.id,
 jsonb_agg(
  CASE WHEN f.ordinality = target.item_number
   THEN jsonb_build_object(
    'f', 'Após a ADI 7.466/STF, quais órgãos permanecem validamente previstos no art. 131 da Constituição do Acre?',
    'b', 'Polícia Civil; Polícia Militar e Corpo de Bombeiros Militar; Polícia Penal. O inciso IV (Instituto Socioeducativo) foi declarado inconstitucional pelo STF em 12/11/2024.'
   )
   ELSE f.item END ORDER BY f.ordinality
 ) AS flashcards
 FROM public.study_materials m
 JOIN target ON target.slug = m.slug
 CROSS JOIN LATERAL jsonb_array_elements(m.flashcards) WITH ORDINALITY f(item, ordinality)
 WHERE m.contest_name = 'PC-AC 2026'
 GROUP BY m.id
)
UPDATE public.study_materials m
SET flashcards = updated.flashcards, updated_at = now()
FROM updated
WHERE m.id = updated.id
AND m.flashcards IS DISTINCT FROM updated.flashcards;
