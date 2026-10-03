-- Preenche law_version_checked_at nas questoes que ja citam fonte oficial do
-- Planalto em legal_basis mas nunca tiveram a data de conferencia registrada,
-- o que as mantinha ocultas no treinador por isLegallyVerified exigir tambem
-- essa data preenchida, mesmo com URL oficial presente.

update public.curated_question_catalog
set law_version_checked_at = now()
where law_version_checked_at is null
  and exists (
    select 1 from jsonb_array_elements(legal_basis) e
    where e->>'url' ilike '%planalto.gov.br%'
  );
