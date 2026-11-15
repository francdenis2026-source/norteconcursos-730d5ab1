-- Keep non-legal study references out of the legal-basis eligibility gate.
-- Preserve their URLs/labels in didactic_provenance.reference_materials.
update public.curated_question_catalog
set didactic_provenance = coalesce(didactic_provenance, '{}'::jsonb) ||
      jsonb_build_object(
        'reference_materials',
        coalesce(didactic_provenance->'reference_materials', '[]'::jsonb) || legal_basis
      ),
    legal_basis = '[]'::jsonb
where contest_year = 2026
  and career_name ilike '%Oficial Investigador%'
  and content_status = 'active'
  and subject !~* '(direito|legisla)'
  and jsonb_typeof(legal_basis) = 'array'
  and jsonb_array_length(legal_basis) > 0
  and not exists (
    select 1
    from jsonb_array_elements(legal_basis) b
    where jsonb_typeof(b) = 'object'
  );

-- The archival-law question is genuinely based on Lei nº 8.159/1991;
-- record the source-check date so the simulator can validate its official URL.
update public.curated_question_catalog
set law_version_checked_at = '2026-11-14T12:00:00-03:00'
where external_item_key = 'PCAC-2026-AUTORAL-B2-Q10'
  and contest_year = 2026
  and content_status = 'active'
  and subject = 'Arquivologia'
  and legal_basis @> '[{"url":"https://www.planalto.gov.br/ccivil_03/leis/l8159.htm"}]'::jsonb;
