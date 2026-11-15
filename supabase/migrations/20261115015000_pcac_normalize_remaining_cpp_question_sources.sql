-- Normalize the remaining 22 PC-AC criminal-procedure questions to the
-- structured legal-basis schema consumed by the simulator eligibility gate.
update public.curated_question_catalog
set legal_basis = case
  when external_item_key = 'pcac26-autoria-json-01' then jsonb_build_array(
    jsonb_build_object('title','Código Penal — texto compilado','lei','Decreto-Lei nº 2.848/1940','artigo','20','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')
  )
  when external_item_key = 'pcac26-autoria-json-02' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','4º e 12','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-201-art14a-defensor' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','14-A, §§ 1º a 6º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-202-art13a-dados-cadastrais' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','13-A','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-203-art13b-localizacao' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','13-B, caput e §§ 1º a 4º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-204-art155-prova-investigacao' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','155','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-205-art158-167-corpo-delito' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','158 e 167','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-206-cadeia-custodia-isolamento' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','158-A, 158-B e 158-C, § 2º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-207-art159-perito-nao-oficial' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','159, caput e § 1º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-208-art180-divergencia-peritos' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','180','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-209-arts280-281-suspeicao-interprete' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','280 e 281','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-210-art184-pericia-desnecessaria' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','158 e 184','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key in ('pcac26-penal-proc-211-lei15295-identificacao','pcac26-penal-proc-212-lei15295-dna') then jsonb_build_array(
    jsonb_build_object('title','Lei de Identificação Criminal — texto oficial','lei','Lei nº 12.037/2009','artigo',case when external_item_key like '%211-%' then '3º, VII' else '5º, §§ 1º e 2º' end,'url','https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12037.htm'),
    jsonb_build_object('title','Lei nº 15.295/2025 — alteração da identificação criminal','lei','Lei nº 15.295/2025','url','https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15295.htm')
  )
  when external_item_key = 'pcac26-penal-proc-213-art310-videoconferencia' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','310, caput','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-214-art310-par5-circunstancias' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','310, §§ 5º e 6º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-215-art310a-perfil-genetico' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','310-A, §§ 1º e 2º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-216-art312-periculosidade' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','312, § 3º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-217-art312-gravidade-abstrata' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','312, § 4º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-218-art313-v-vi' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','313, V e VI','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-219-art316-revisao-90dias' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','316, parágrafo único','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key = 'pcac26-penal-proc-220-temporaria-cinco-requisitos-stf' then jsonb_build_array(
    jsonb_build_object('title','Lei da Prisão Temporária — texto oficial','lei','Lei nº 7.960/1989','artigo','1º','url','https://www.planalto.gov.br/ccivil_03/leis/l7960.htm'),
    jsonb_build_object('title','STF — ADI 3.360','lei','ADI 3.360','url','https://portal.stf.jus.br/processos/listarProcessos.asp?classe=ADI&numeroProcesso=3360'),
    jsonb_build_object('title','STF — ADI 4.109','lei','ADI 4.109','url','https://portal.stf.jus.br/processos/listarProcessos.asp?classe=ADI&numeroProcesso=4109')
  )
end,
law_version_checked_at = '2026-11-14T12:00:00-03:00'
where external_item_key in (
  'pcac26-autoria-json-01','pcac26-autoria-json-02',
  'pcac26-penal-proc-201-art14a-defensor','pcac26-penal-proc-202-art13a-dados-cadastrais',
  'pcac26-penal-proc-203-art13b-localizacao','pcac26-penal-proc-204-art155-prova-investigacao',
  'pcac26-penal-proc-205-art158-167-corpo-delito','pcac26-penal-proc-206-cadeia-custodia-isolamento',
  'pcac26-penal-proc-207-art159-perito-nao-oficial','pcac26-penal-proc-208-art180-divergencia-peritos',
  'pcac26-penal-proc-209-arts280-281-suspeicao-interprete','pcac26-penal-proc-210-art184-pericia-desnecessaria',
  'pcac26-penal-proc-211-lei15295-identificacao','pcac26-penal-proc-212-lei15295-dna',
  'pcac26-penal-proc-213-art310-videoconferencia','pcac26-penal-proc-214-art310-par5-circunstancias',
  'pcac26-penal-proc-215-art310a-perfil-genetico','pcac26-penal-proc-216-art312-periculosidade',
  'pcac26-penal-proc-217-art312-gravidade-abstrata','pcac26-penal-proc-218-art313-v-vi',
  'pcac26-penal-proc-219-art316-revisao-90dias','pcac26-penal-proc-220-temporaria-cinco-requisitos-stf'
)
and contest_year = 2026
and career_name ilike '%Oficial Investigador%'
and content_status = 'active';
