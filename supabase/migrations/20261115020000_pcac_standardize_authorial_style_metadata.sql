-- Standardize target exam style metadata for all active authorial PC-AC 2026 questions.
update public.curated_question_catalog
set didactic_provenance = coalesce(didactic_provenance, '{}'::jsonb) ||
  jsonb_build_object(
    'authored', true,
    'not_official_exam', true,
    'source_board_style', 'IDECAN',
    'target_exam', 'PC-AC 2026 — Oficial Investigador de Polícia'
  )
where contest_year = 2026
  and career_name ilike '%Oficial Investigador%'
  and content_status = 'active'
  and exam_board = 'AUTORAL';
