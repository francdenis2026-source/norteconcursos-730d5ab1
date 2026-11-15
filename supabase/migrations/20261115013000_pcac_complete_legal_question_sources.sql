-- Add structured, official legal references to reviewed PC-AC authorial questions.
-- Two generic items (administrative-act presumption and study-method guidance) are
-- kept out of the active simulator until their direct legal basis/editorial scope is reviewed.
update public.curated_question_catalog
set legal_basis = case
  when external_item_key in ('pcac26-autoria-draft-1','pcac26-autoria-draft-2','pcac26-autoria-draft-50','pcac26-autoria-draft-51','pcac26-autoria-draft-52','pcac26-autoria-draft-53','pcac26-autoria-draft-54','pcac26-autoria-draft-55','pcac26-autoria-draft-56') then jsonb_build_array(
    jsonb_build_object('title','Código Penal — texto compilado','lei','Decreto-Lei nº 2.848/1940','artigo',case
      when external_item_key in ('pcac26-autoria-draft-1','pcac26-autoria-draft-56') then '14, II'
      when external_item_key in ('pcac26-autoria-draft-2','pcac26-autoria-draft-55') then '29 e 30'
      when external_item_key='pcac26-autoria-draft-50' then '18, I'
      when external_item_key='pcac26-autoria-draft-51' then '20'
      when external_item_key in ('pcac26-autoria-draft-52','pcac26-autoria-draft-53') then '15'
      else '17' end,
      'url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')
  )
  when external_item_key in ('pcac26-autoria-draft-3','pcac26-autoria-draft-40','pcac26-autoria-draft-41','pcac26-autoria-draft-42','pcac26-autoria-draft-43','pcac26-autoria-draft-44') then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo',case
      when external_item_key='pcac26-autoria-draft-3' then '158-A a 158-F'
      when external_item_key='pcac26-autoria-draft-40' then '4º a 23'
      when external_item_key='pcac26-autoria-draft-41' then '6º'
      when external_item_key='pcac26-autoria-draft-42' then '157'
      when external_item_key='pcac26-autoria-draft-43' then '158-A'
      else '302' end,
      'url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key='pcac26-autoria-draft-4' then jsonb_build_array(
    jsonb_build_object('title','Código de Processo Penal — texto compilado','lei','Decreto-Lei nº 3.689/1941','artigo','311 a 316','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm')
  )
  when external_item_key='pcac26-autoria-draft-45' then jsonb_build_array(
    jsonb_build_object('title','Lei de Identificação Criminal — texto oficial','lei','Lei nº 12.037/2009','artigo','3º','url','https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12037.htm')
  )
  when external_item_key in ('pcac26-autoria-draft-9','pcac26-autoria-draft-46','pcac26-autoria-draft-47') then jsonb_build_array(
    jsonb_build_object('title','Lei Orgânica Nacional das Polícias Civis','lei','Lei nº 14.735/2023','url','https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14735.htm'),
    jsonb_build_object('title','Lei Orgânica da Polícia Civil do Acre — texto consolidado','lei','Lei Complementar estadual nº 129/2004','url','https://legis.ac.gov.br/detalhar/674-1')
  )
  when external_item_key='pcac26-autoria-draft-49' then jsonb_build_array(
    jsonb_build_object('title','Lei Orgânica da Polícia Civil do Acre — texto consolidado','lei','Lei Complementar estadual nº 129/2004','url','https://legis.ac.gov.br/detalhar/674-1'),
    jsonb_build_object('title','Estatuto dos Servidores Públicos Civis do Acre','lei','Lei Complementar estadual nº 39/1993','url','https://legis.ac.gov.br/detalhar/110')
  )
  when external_item_key='pcac26-autoria-draft-25' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','37, § 6º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key='pcac26-autoria-draft-22' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','144, caput','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
  when external_item_key='pcac26-autoria-draft-23' then jsonb_build_array(
    jsonb_build_object('title','Constituição Federal — texto compilado','lei','Constituição Federal','artigo','5º, XI','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')
  )
end,
law_version_checked_at = '2026-11-14T12:00:00-03:00'
where external_item_key in (
  'pcac26-autoria-draft-1','pcac26-autoria-draft-2','pcac26-autoria-draft-3','pcac26-autoria-draft-4',
  'pcac26-autoria-draft-9','pcac26-autoria-draft-22','pcac26-autoria-draft-23','pcac26-autoria-draft-25',
  'pcac26-autoria-draft-40','pcac26-autoria-draft-41','pcac26-autoria-draft-42','pcac26-autoria-draft-43',
  'pcac26-autoria-draft-44','pcac26-autoria-draft-45','pcac26-autoria-draft-46','pcac26-autoria-draft-47',
  'pcac26-autoria-draft-49','pcac26-autoria-draft-50','pcac26-autoria-draft-51','pcac26-autoria-draft-52',
  'pcac26-autoria-draft-53','pcac26-autoria-draft-54','pcac26-autoria-draft-55','pcac26-autoria-draft-56',
  'pcac26-autoria-draft-57','pcac26-autoria-draft-58','pcac26-autoria-draft-59'
)
and contest_year = 2026
and career_name ilike '%Oficial Investigador%'
and content_status = 'active';

update public.curated_question_catalog
set content_status = 'under_review',
    didactic_provenance = coalesce(didactic_provenance, '{}'::jsonb) ||
      jsonb_build_object(
        'review_note',
        'Retirada temporariamente do simulado: questão genérica/metodológica sem fundamento legal direto individualizado; aguarda revisão editorial.'
      )
where external_item_key in ('pcac26-autoria-draft-24','pcac26-autoria-draft-48')
  and contest_year = 2026
  and career_name ilike '%Oficial Investigador%'
  and content_status = 'active';
