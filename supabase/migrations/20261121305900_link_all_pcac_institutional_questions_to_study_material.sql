update public.curated_question_catalog
set didactic_provenance = coalesce(didactic_provenance,'{}'::jsonb) || jsonb_build_object(
  'linked_study_material_slug','pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025',
  'source_material_slug','pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025'
)
where contest_name='Norte Concursos — treino autoral PC-AC 2026'
  and subject='Legislação Institucional'
  and content_status='active'
  and external_item_key like 'pcac-%';