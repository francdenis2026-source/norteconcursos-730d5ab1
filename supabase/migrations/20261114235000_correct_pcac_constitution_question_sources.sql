-- Corrige os fundamentos constitucionais e institucionais de nove questões autorais PC-AC 2026.
-- Idempotente: preserva enunciados, gabaritos e status editorial.
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
  when 'NC-PCAC-LEG-001' then jsonb_build_array(
    'Lei Federal nº 14.735/2023, Lei Orgânica Nacional das Polícias Civis — https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14735.htm',
    'Edital PC-AC 2026, Anexo III'
  )
  when 'NC-PCAC-LEG-002' then jsonb_build_array(
    'Lei Complementar estadual nº 129/2004, ementa e texto consolidado — https://legis.ac.gov.br/detalhar/674',
    'Lei Complementar estadual nº 526/2026, alterações à LC nº 129/2004 — https://legis.ac.gov.br/detalhar/6874',
    'Edital PC-AC 2026, Anexo III'
  )
  when 'NC-PCAC-LEG-003' then jsonb_build_array(
    'Lei Complementar estadual nº 496/2025, art. 1º — unificação dos cargos de escrivão e agente sob Oficial Investigador de Polícia — https://legis.ac.gov.br/detalhar_imprimir/6527',
    'Edital PC-AC 2026, Anexo III'
  )
  when 'NC-PCAC-LEG-004' then jsonb_build_array(
    'Lei Complementar estadual nº 526/2026, art. 1º (nova redação do art. 64 da LC nº 129/2004) — https://legis.ac.gov.br/detalhar/6874',
    'Edital PC-AC 2026, Anexo III'
  )
  when 'NC-PCAC-LEG-005' then jsonb_build_array(
    'Lei estadual nº 2.250/2009, art. 1º — PCCR dos servidores da Polícia Civil do Acre — https://legis.ac.gov.br/detalhar/417',
    'Lei Complementar estadual nº 39/1993 — Estatuto dos Servidores Públicos Civis do Acre — https://legis.ac.gov.br/detalhar/110',
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
    'NC-PCAC-CONST-005',
    'NC-PCAC-LEG-001',
    'NC-PCAC-LEG-002',
    'NC-PCAC-LEG-003',
    'NC-PCAC-LEG-004',
    'NC-PCAC-LEG-005'
  );
