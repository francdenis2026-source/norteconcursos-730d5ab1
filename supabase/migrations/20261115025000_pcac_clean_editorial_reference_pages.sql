-- Keep edital reference metadata precise without relying on uncertain PDF page offsets.
update public.curated_question_catalog
set didactic_provenance = jsonb_set(
  didactic_provenance,
  '{reference_materials}',
  (
    select coalesce(jsonb_agg(reference_item - 'page'), '[]'::jsonb)
    from jsonb_array_elements(coalesce(didactic_provenance->'reference_materials', '[]'::jsonb)) reference_item
  )
)
where external_item_key in (
  'pcac26-autoral-informatica-validacao-001',
  'pcac26-autoral-analise-comunicacao-001',
  'pcac26-autoral-analise-geografica-001'
)
and didactic_provenance ? 'reference_materials';
