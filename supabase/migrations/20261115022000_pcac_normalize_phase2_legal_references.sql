-- Convert the newly added PC-AC legal questions' plain-text references to
-- the structured official-source format required by the simulator's legal gate.
update public.curated_question_catalog
set legal_basis = case
  when external_item_key='NC-PCAC-LEG-001' then jsonb_build_array(
    jsonb_build_object('title','Lei Orgânica Nacional das Polícias Civis','lei','Lei nº 14.735/2023','url','https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14735.htm')
  )
  when external_item_key='NC-PCAC-LEG-002' then jsonb_build_array(
    jsonb_build_object('title','Lei Orgânica da Polícia Civil do Acre — texto consolidado','lei','Lei Complementar estadual nº 129/2004','url','https://legis.ac.gov.br/detalhar/674-1'),
    jsonb_build_object('title','Lei Complementar estadual nº 526/2026 — alteração da LC nº 129/2004','lei','Lei Complementar estadual nº 526/2026','url','https://legis.ac.gov.br/detalhar/6874')
  )
  when external_item_key='NC-PCAC-LEG-003' then jsonb_build_array(
    jsonb_build_object('title','Lei Complementar estadual nº 496/2025 — texto oficial','lei','Lei Complementar estadual nº 496/2025','artigo','1º','url','https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/9611')
  )
  when external_item_key='NC-PCAC-LEG-004' then jsonb_build_array(
    jsonb_build_object('title','Lei Complementar estadual nº 526/2026 — texto oficial','lei','Lei Complementar estadual nº 526/2026','artigo','1º','url','https://legis.ac.gov.br/detalhar/6874')
  )
  when external_item_key='NC-PCAC-LEG-005' then jsonb_build_array(
    jsonb_build_object('title','Plano de Cargos, Carreiras e Remuneração da Polícia Civil do Acre','lei','Lei estadual nº 2.250/2009','artigo','1º','url','https://legis.ac.gov.br/detalhar/417-0'),
    jsonb_build_object('title','Estatuto dos Servidores Públicos Civis do Acre','lei','Lei Complementar estadual nº 39/1993','url','https://legis.ac.gov.br/detalhar/110')
  )
  when external_item_key='NC-PCAC-ADM-001' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','37, caput','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key='NC-PCAC-ADM-002' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','37, XIX','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm'),
    jsonb_build_object('title','Organização da Administração Federal','lei','Decreto-Lei nº 200/1967','artigo','5º, I','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del0200.htm')
  )
  when external_item_key='NC-PCAC-ADM-003' then jsonb_build_array(
    jsonb_build_object('title','Organização da Administração Federal','lei','Decreto-Lei nº 200/1967','artigo','4º e 10','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del0200.htm')
  )
  when external_item_key='NC-PCAC-ADM-004' then jsonb_build_array(
    jsonb_build_object('title','Organização da Administração Federal','lei','Decreto-Lei nº 200/1967','artigo','19','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del0200.htm'),
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','37, caput','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key='NC-PCAC-ADM-005' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','5º, LIV e LV','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm'),
    jsonb_build_object('title','Lei de Licitações e Contratos Administrativos','lei','Lei nº 14.133/2021','artigo','156','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')
  )
  when external_item_key='NC-PCAC-ADM-006' then jsonb_build_array(
    jsonb_build_object('title','Código Tributário Nacional — texto compilado','lei','Lei nº 5.172/1966','artigo','78','url','https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm'),
    jsonb_build_object('title','STF — RE 633.782, Tema 532','lei','RE 633.782 / Tema 532','url','https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=3998987&numeroProcesso=633782&classeProcesso=RE&numeroTema=532')
  )
  when external_item_key='NC-PCAC-ADM-007' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','37, caput','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm'),
    jsonb_build_object('title','Processo Administrativo Federal — princípios','lei','Lei nº 9.784/1999','artigo','2º','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')
  )
  when external_item_key='NC-PCAC-ADM-008' then jsonb_build_array(
    jsonb_build_object('title','STF — Súmula 473','lei','Súmula 473 do STF','url','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=473'),
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','37, caput','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key='NC-PCAC-ADM-009' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','37, XVI e XVII','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key='NC-PCAC-ADM-010' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','37, § 6º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key='NC-PCAC-CONST-001' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','37, caput','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key='NC-PCAC-CONST-002' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','5º, LXVIII','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key='NC-PCAC-CONST-003' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','5º, LXIX','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key='NC-PCAC-CONST-004' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','144, caput','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key='NC-PCAC-CONST-005' then jsonb_build_array(
    jsonb_build_object('title','Constituição do Estado do Acre — texto consolidado','lei','Constituição do Estado do Acre','artigo','131','url','https://legis.ac.gov.br/detalhar_constituicao'),
    jsonb_build_object('title','Emenda Constitucional estadual nº 63/2022','lei','Emenda Constitucional estadual nº 63/2022','artigo','1º','url','https://legis.ac.gov.br/detalhar_emendas/64')
  )
end
where external_item_key in (
  'NC-PCAC-LEG-001','NC-PCAC-LEG-002','NC-PCAC-LEG-003','NC-PCAC-LEG-004','NC-PCAC-LEG-005',
  'NC-PCAC-ADM-001','NC-PCAC-ADM-002','NC-PCAC-ADM-003','NC-PCAC-ADM-004','NC-PCAC-ADM-005',
  'NC-PCAC-ADM-006','NC-PCAC-ADM-007','NC-PCAC-ADM-008','NC-PCAC-ADM-009','NC-PCAC-ADM-010',
  'NC-PCAC-CONST-001','NC-PCAC-CONST-002','NC-PCAC-CONST-003','NC-PCAC-CONST-004','NC-PCAC-CONST-005'
)
and contest_year = 2026
and career_name ilike '%Oficial Investigador%'
and content_status = 'active';
