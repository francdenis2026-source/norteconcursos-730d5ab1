update public.curated_question_catalog
set
  legal_basis = case
    when external_item_key like 'pcac-national-%'
      or external_item_key like 'pcac-inst-lon-%'
      or external_item_key like 'pcac-nat-%'
      or external_item_key in (
        'pcac-2026-legislacao-institucional-lote1-q01',
        'pcac-2026-legislacao-institucional-lote1-q02',
        'pcac-2026-legislacao-institucional-lote1-q04',
        'pcac-2026-legislacao-institucional-lote1-q05',
        'pcac-2026-legislacao-institucional-lote1-q06',
        'pcac-2026-legislacao-institucional-lote1-q08',
        'pcac-2026-legislacao-institucional-lote1-q09',
        'pcac-2026-legislacao-institucional-lote1-q10'
      )
      then jsonb_build_array(jsonb_build_object(
        'title','Lei Orgânica Nacional das Polícias Civis',
        'lei','Lei nº 14.735/2023',
        'url','https://www2.camara.leg.br/legin/fed/lei/2023/lei-14735-23-novembro-2023-794983-normaatualizada-pl.html'
      ))
    when external_item_key = 'pcac-2026-legislacao-institucional-lote1-q07'
      then jsonb_build_array(jsonb_build_object(
        'title','Código de Processo Penal — cadeia de custódia',
        'lei','Decreto-Lei nº 3.689/1941',
        'artigo','158-A e seguintes',
        'url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm'
      ))
    when external_item_key like 'pcac-inst-lc39-%'
      or external_item_key like 'pcac-inst-licenca-%'
      or external_item_key like 'pcac-disc-lc39-%'
      or external_item_key like 'pcac-lc39-%'
      then jsonb_build_array(jsonb_build_object(
        'title','Estatuto dos Servidores Públicos Civis do Estado do Acre',
        'lei','Lei Complementar Estadual nº 39/1993',
        'url','https://legis.ac.gov.br/detalhar/110'
      ))
    when external_item_key like 'pcac-inst-pccr-%'
      or external_item_key like 'pcac-law2250-%'
      or external_item_key = 'pcac-law3228-instruction-08'
      or external_item_key = 'pcac-pccr-progression-43'
      or external_item_key = 'pcac-2026-legislacao-institucional-lote1-q11'
      then jsonb_build_array(jsonb_build_object(
        'title','Plano de Cargos, Carreiras e Remuneração da Polícia Civil',
        'lei','Lei Estadual nº 2.250/2009',
        'url','https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/5556/pdf-texto'
      ))
    when external_item_key like 'pcac-law3228-%'
      or external_item_key like 'pcac-pccr-3228-%'
      or external_item_key = 'pcac-pccr-promotion-44'
      or external_item_key = 'pcac-pccr-titulacao-03'
      then jsonb_build_array(jsonb_build_object(
        'title','Plano de carreira da Polícia Civil',
        'lei','Lei Estadual nº 3.228/2017',
        'url','https://legis.ac.gov.br/detalhar/2499'
      ))
    when external_item_key like 'pcac-lc303-%'
      then case
        when external_item_key = 'pcac-lc303-extra-duty-48'
          then jsonb_build_array(
            jsonb_build_object('title','Plano de carreira de Delegado de Polícia Civil','lei','Lei Complementar Estadual nº 303/2015','url','https://legis.ac.gov.br/detalhar/3990'),
            jsonb_build_object('title','Adicional de sujeição a serviço e convocação extraordinária','lei','Lei Complementar Estadual nº 401/2022','url','https://legis.ac.gov.br/detalhar/5137-0'),
            jsonb_build_object('title','Alteração da carreira de Delegado','lei','Lei Complementar Estadual nº 448/2023','url','https://legis.ac.gov.br/detalhar/5795-0')
          )
        else jsonb_build_array(jsonb_build_object(
          'title','Plano de carreira de Delegado de Polícia Civil',
          'lei','Lei Complementar Estadual nº 303/2015',
          'url','https://legis.ac.gov.br/detalhar/3990'
        ))
      end
    when external_item_key like 'pcac-lc496-%'
      or external_item_key like 'pcac-pccr-496-%'
      or external_item_key = 'pcac-2026-legislacao-institucional-lote1-q14'
      then jsonb_build_array(jsonb_build_object(
        'title','Unificação dos cargos de Agente e Escrivão como Oficial Investigador',
        'lei','Lei Complementar Estadual nº 496/2025',
        'url','https://legis.ac.gov.br/detalhar/6527'
      ))
    when external_item_key like 'pcac-lc526-%'
      or external_item_key like 'pcac-pccr-526-%'
      or external_item_key = 'pcac-2026-legislacao-institucional-lote1-q13'
      then jsonb_build_array(jsonb_build_object(
        'title','Alterações no regime da Polícia Civil e formação',
        'lei','Lei Complementar Estadual nº 526/2026',
        'url','https://legis.ac.gov.br/detalhar/6874'
      ))
    when external_item_key like 'pcac-dec8912-%'
      then jsonb_build_array(jsonb_build_object(
        'title','Regulamento de promoção da Polícia Civil',
        'lei','Decreto Estadual nº 8.912/2018',
        'url','https://legis.ac.gov.br/detalhar/5749-0'
      ))
    when external_item_key = 'pcac-constitution-sixthpart-10'
      then jsonb_build_array(jsonb_build_object(
        'title','Constituição do Estado do Acre',
        'lei','Constituição Estadual',
        'url','https://legis.ac.gov.br/detalhar_constituicao'
      ))
    when external_item_key like 'pcac-lc129-%'
      or external_item_key like 'pcac-disc-%'
      or external_item_key like 'pcac-groups-%'
      or external_item_key like 'pcac-pad-%'
      or external_item_key like 'pcac-proc-%'
      or external_item_key in (
        'pcac-2026-legislacao-institucional-lote1-q03',
        'pcac-2026-legislacao-institucional-lote1-q12'
      )
      then jsonb_build_array(jsonb_build_object(
        'title','Lei Orgânica da Polícia Civil do Estado do Acre',
        'lei','Lei Complementar Estadual nº 129/2004',
        'url','https://legis.ac.gov.br/detalhar/674'
      ))
    else legal_basis
  end,
  law_version_checked_at = now()
where contest_name='Norte Concursos — treino autoral PC-AC 2026'
  and subject='Legislação Institucional'
  and content_status='active'
  and external_item_key like 'pcac-%';
