update public.curated_question_catalog
set legal_basis = case
  when external_item_key='pcac-2026-legislacao-institucional-lote1-q12'
    then jsonb_build_array(jsonb_build_object(
      'title','Estatuto dos Servidores Públicos Civis do Estado do Acre',
      'lei','Lei Complementar Estadual nº 39/1993',
      'url','https://legis.ac.gov.br/detalhar/110'
    ))
  when external_item_key='pcac-pccr-progression-43'
    then jsonb_build_array(
      jsonb_build_object('title','Plano de Cargos, Carreiras e Remuneração da Polícia Civil','lei','Lei Estadual nº 2.250/2009','url','https://app.al.ac.leg.br/legisla-e/legislacao/visualizar/5556/pdf-texto'),
      jsonb_build_object('title','Estrutura da carreira da Polícia Civil','lei','Lei Estadual nº 3.228/2017','url','https://legis.ac.gov.br/detalhar/2499')
    )
  else legal_basis end,
law_version_checked_at=now()
where contest_name='Norte Concursos — treino autoral PC-AC 2026'
and subject='Legislação Institucional'
and external_item_key in ('pcac-2026-legislacao-institucional-lote1-q12','pcac-pccr-progression-43');