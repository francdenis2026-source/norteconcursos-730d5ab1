-- Corrige os fundamentos constitucionais de quatro questões autorais PC-AC 2026.
-- A correção é idempotente e preserva enunciados, gabaritos e status editorial.
update public.curated_question_catalog
set legal_basis = case external_item_key
  when 'NC-PCAC-CONST-002' then jsonb_build_array(
    'Constituição Federal, art. 5º, LXVIII (habeas corpus) — https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
    'Edital PC-AC 2026, Anexo III'
  )
  when 'NC-PCAC-CONST-003' then jsonb_build_array(
    'Constituição Federal, art. 5º, LXIX (mandado de segurança individual) — https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
    'Edital PC-AC 2026, Anexo III'
  )
  when 'NC-PCAC-CONST-004' then jsonb_build_array(
    'Constituição Federal, art. 144, caput — https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm',
    'Edital PC-AC 2026, Anexo III'
  )
  when 'NC-PCAC-CONST-005' then jsonb_build_array(
    'Constituição do Estado do Acre, art. 131, redação dada pela Emenda Constitucional estadual nº 63/2022 — https://legis.ac.gov.br/detalhar_constituicao',
    'Emenda Constitucional estadual nº 63/2022, art. 1º — https://legis.ac.gov.br/detalhar_emendas/64',
    'Edital PC-AC 2026, Anexo III'
  )
  else legal_basis
end
where contest_name = 'Polícia Civil do Acre'
  and contest_year = 2026
  and is_original = true
  and external_item_key in (
    'NC-PCAC-CONST-002',
    'NC-PCAC-CONST-003',
    'NC-PCAC-CONST-004',
    'NC-PCAC-CONST-005'
  );
