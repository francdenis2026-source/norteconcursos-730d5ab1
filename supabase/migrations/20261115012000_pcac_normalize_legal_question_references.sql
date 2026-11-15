-- Normalize legal references for the 12 reviewed PC-AC institutional questions.
-- The catalog previously stored legal_basis as plain strings, but the application
-- requires structured {title, lei, artigo, url} objects and a checked-at timestamp.
update public.curated_question_catalog
set legal_basis = case
  when external_item_key = 'pcac26-legis-301-12830-investigacao-nao-exclusiva' then jsonb_build_array(
    jsonb_build_object('title','Lei nº 12.830/2013 — texto oficial','lei','Lei nº 12.830/2013','artigo','2º, § 1º','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12830.htm'),
    jsonb_build_object('title','STF — ADI 5.043, inteiro teor','lei','ADI 5.043','url','https://portal.stf.jus.br/jurisprudencia/obterInteiroTeor.asp?idDocumento=785761791')
  )
  when external_item_key like 'pcac26-legis-30%-12830-%' then jsonb_build_array(
    jsonb_build_object('title','Lei nº 12.830/2013 — texto oficial','lei','Lei nº 12.830/2013','artigo',case
      when external_item_key like '%avocacao%' then '2º, § 4º'
      when external_item_key like '%indiciamento%' then '2º, § 6º'
      else '2º, § 2º' end,
      'url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12830.htm')
  )
  when external_item_key in (
    'pcac26-legis-305-susp-integrantes-estrategicos',
    'pcac26-legis-306-susp-policia-civil-operacional',
    'pcac26-legis-307-susp-integracao-competencias'
  ) then jsonb_build_array(
    jsonb_build_object('title','Lei nº 13.675/2018 — texto oficial','lei','Lei nº 13.675/2018','artigo','9º e 10','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13675.htm')
  )
  when external_item_key = 'pcac26-legis-308-susp-integrantes-operacionais-alteracoes' then jsonb_build_array(
    jsonb_build_object('title','Lei nº 13.675/2018 — texto oficial','lei','Lei nº 13.675/2018','artigo','9º, § 2º, XVII','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13675.htm'),
    jsonb_build_object('title','Lei nº 14.531/2023 — alteração da PNSPDS','lei','Lei nº 14.531/2023','url','https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14531.htm')
  )
  when external_item_key in (
    'pcac26-legis-309-cf144-funcao-pc',
    'pcac26-legis-312-cf144-seguranca-publica'
  ) then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto oficial','lei','Constituição Federal','artigo','144','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key = 'pcac26-legis-310-ceacre-art131-ec63' then jsonb_build_array(
    jsonb_build_object('title','Constituição do Estado do Acre — texto consolidado','lei','Constituição do Estado do Acre','artigo','131','url','https://legis.ac.gov.br/detalhar_constituicao'),
    jsonb_build_object('title','Emenda Constitucional estadual nº 63/2022','lei','Emenda Constitucional estadual nº 63/2022','artigo','1º','url','https://legis.ac.gov.br/detalhar_emendas/64')
  )
  when external_item_key = 'pcac26-legis-311-ceacre-art133-competencia' then jsonb_build_array(
    jsonb_build_object('title','Constituição do Estado do Acre — texto consolidado','lei','Constituição do Estado do Acre','artigo','133','url','https://legis.ac.gov.br/detalhar_constituicao')
  )
end,
law_version_checked_at = '2026-11-14T12:00:00-03:00'
where external_item_key in (
  'pcac26-legis-301-12830-investigacao-nao-exclusiva',
  'pcac26-legis-302-12830-avocacao-redistribuicao',
  'pcac26-legis-303-12830-indiciamento',
  'pcac26-legis-304-12830-requisicao',
  'pcac26-legis-305-susp-integrantes-estrategicos',
  'pcac26-legis-306-susp-policia-civil-operacional',
  'pcac26-legis-307-susp-integracao-competencias',
  'pcac26-legis-308-susp-integrantes-operacionais-alteracoes',
  'pcac26-legis-309-cf144-funcao-pc',
  'pcac26-legis-310-ceacre-art131-ec63',
  'pcac26-legis-311-ceacre-art133-competencia',
  'pcac26-legis-312-cf144-seguranca-publica'
)
and contest_year = 2026
and content_status = 'active';
