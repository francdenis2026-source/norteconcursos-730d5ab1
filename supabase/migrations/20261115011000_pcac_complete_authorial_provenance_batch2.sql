-- Complete authorial provenance for the earlier PC-AC 2026 second-batch items.
update public.curated_question_catalog
set didactic_provenance = jsonb_build_object(
  'kind', 'original_question',
  'source', 'Norte Concursos — elaboração autoral PC-AC 2026, lote complementar 2',
  'target_exam', 'PC-AC 2026 — Oficial Investigador de Polícia',
  'target_style', 'IDECAN',
  'source_board_style', 'IDECAN',
  'authored', true,
  'not_official_exam', true,
  'review_note', 'Questão autoral de treinamento; não é questão oficial aplicada pela IDECAN.'
)
where contest_year = 2026
  and career_name ilike '%Oficial Investigador%'
  and content_status = 'active'
  and contest_name = 'Polícia Civil do Acre'
  and exam_board = 'AUTORAL'
  and didactic_provenance is null
  and external_item_key like 'PCAC-2026-AUTORAL-B2-Q%';
