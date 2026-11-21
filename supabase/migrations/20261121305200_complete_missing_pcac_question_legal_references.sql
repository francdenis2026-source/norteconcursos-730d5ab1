update public.curated_question_catalog
set legal_basis = case
  when external_item_key like 'pcac-inst-lc129-%' then jsonb_build_array(jsonb_build_object(
    'title','Lei Orgânica da Polícia Civil do Estado do Acre, com alterações da LC nº 526/2026',
    'lei','Lei Complementar Estadual nº 129/2004',
    'url','https://legis.ac.gov.br/detalhar/674'
  ))
  when external_item_key='pcac-pccr-promocao-analise-04' then jsonb_build_array(jsonb_build_object(
    'title','Plano de carreira da Polícia Civil — comissão e homologação da promoção',
    'lei','Lei Estadual nº 3.228/2017',
    'url','https://legis.ac.gov.br/detalhar/2499'
  ))
  else legal_basis end,
law_version_checked_at=now()
where contest_name='Norte Concursos — treino autoral PC-AC 2026'
and subject='Legislação Institucional'
and external_item_key in ('pcac-inst-lc129-01','pcac-inst-lc129-02','pcac-pccr-promocao-analise-04');