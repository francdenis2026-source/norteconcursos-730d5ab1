update public.study_materials
set legal_basis=jsonb_set(legal_basis,'{0,url}','"https://www.legis.ac.gov.br/detalhar/674"'::jsonb,true),
updated_at=now()
where slug in ('pcac-2026-lc129-deveres-investigacao-e-processo-disciplinar','pcac-2026-lc129-pad-instrucao-defesa-relatorio-recursos','pcac-2026-lc129-sindicancia-prazos-prescricao-extincao','pcac-2026-lc129-transgressoes-penalidades-responsabilidades')
and jsonb_typeof(legal_basis)='array' and jsonb_array_length(legal_basis)>0;
