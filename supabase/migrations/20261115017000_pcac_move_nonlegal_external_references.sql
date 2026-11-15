-- Move non-legal editorial/technical references out of legal_basis.
update public.curated_question_catalog
set didactic_provenance = coalesce(didactic_provenance, '{}'::jsonb) ||
      jsonb_build_object(
        'reference_materials',
        coalesce(didactic_provenance->'reference_materials', '[]'::jsonb) || legal_basis
      ),
    legal_basis = '[]'::jsonb
where external_item_key in ('pcac26-autoria-json-03','pcac26-autoria-json-04')
  and contest_year = 2026
  and content_status = 'active'
  and subject !~* '(direito|legisla)';
