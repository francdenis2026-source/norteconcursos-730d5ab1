-- Consulta independente, somente leitura; confira também o relatório verification-result.json.
select jsonb_build_object(
 'material',(select to_jsonb(m) from public.study_materials m where slug='constitucional-principios-fundamentais-federacao-republica'),
 'enrichment',(select to_jsonb(e) from public.study_material_enrichments e where material_slug='constitucional-principios-fundamentais-federacao-republica' and version='2026-10-24-principios-v1'),
 'official_sources',(select jsonb_agg(jsonb_build_object('url',s.url,'is_official',s.is_official,'status',s.status)) from public.content_sources s where s.url in (
  'https://www.planalto.gov.br/ccivil_03/Constituicao/ConstituicaoCompilado.htm',
  'https://www.planalto.gov.br/ccivil_03/Decreto-Lei/Del2848compilado.htm',
  'https://cdn.cebraspe.org.br/concursos/PM_SC_23_SOLDADO/arquivos/Ed_2_2022_PMSC_Abertura_Soldado_atualizado.pdf'
 )),
 'syllabus_valid',(select t.content_status='current' and e.status='active' from public.syllabus_topics t join public.syllabus_editions e on e.id=t.edition_id where t.id='5b5a7f1e-44bf-4cab-903e-199eacd65578')
) as data;
