-- Prioriza a fonte de prova Direito Desenhado e registra as referências cruzadas do usuário.
update public.content_sources
set title='PC-SE 2021 CEBRASPE — prova comentada com 8 itens de Contabilidade Geral',
    issuer='Direito Desenhado',
    url='https://direitodesenhado.app/provas/pc-se-2021-cebraspe-policia-civil-do-estado-de-sergipe',
    notes='Página da prova PC-SE 2021 CEBRASPE com 45 questões comentadas; 8 itens de Contabilidade Geral, questões 79 a 86. Gabarito conferido na página da prova: E, C, C, E, E, E, C, E. A questão 81 também corresponde à referência do Portal IDEA fornecida pelo usuário. Enunciados cadastrados em paráfrase. Referência adicional: QConcursos, página de 8 itens de Contabilidade Geral: https://www.qconcursos.com/questoes-de-concursos/provas/cespe-cebraspe-2021-pc-se-agente-de-policia-judiciaria/questoes?discipline_ids%5B%5D=35. Link Portal IDEA fornecido pelo usuário não foi acessível para leitura automatizada nesta verificação.'
where url='https://www.qconcursos.com/questoes-de-concursos/provas/cespe-cebraspe-2021-pc-se-agente-de-policia-judiciaria/questoes?discipline_ids%5B%5D=35'
   or id in (select source_id from public.curated_question_catalog where external_item_key in ('Q1847175','Q1847176','Q1847177','Q1847178','Q1847179','Q1847180','Q1847181','Q1847182'));

update public.curated_question_catalog
set didactic_provenance = coalesce(didactic_provenance,'{}'::jsonb) || jsonb_build_object(
 'source_url','https://direitodesenhado.app/provas/pc-se-2021-cebraspe-policia-civil-do-estado-de-sergipe',
 'source_item','Questão '||case external_item_key
  when 'Q1847175' then '79' when 'Q1847176' then '80' when 'Q1847177' then '81' when 'Q1847178' then '82'
  when 'Q1847179' then '83' when 'Q1847180' then '84' when 'Q1847181' then '85' when 'Q1847182' then '86' end,
 'alternative_index_source','https://www.qconcursos.com/questoes-de-concursos/provas/cespe-cebraspe-2021-pc-se-agente-de-policia-judiciaria/questoes?discipline_ids%5B%5D=35',
 'user_provided_source','https://questoes.portalidea.com.br/questao/6a1fbbdca2ec866807935bca/cebraspe-2021-contabilidade-mensuracao-de-passivos-atuariais-e-custo-historico'
)
where source_id in (select id from public.content_sources where url='https://direitodesenhado.app/provas/pc-se-2021-cebraspe-policia-civil-do-estado-de-sergipe');
