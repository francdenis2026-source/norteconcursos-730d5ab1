-- Curated (authored) questions, Direito lote 54: mais Direito
-- Processual Penal e Direitos Humanos. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-027',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Infiltração de agentes',
  $q$Julgue o item a seguir, com base na Lei nº 12.850/2013.
A infiltração de agentes de polícia em tarefas de investigação, representada pelo delegado de polícia ou requerida pelo Ministério Público, depende de autorização judicial, que estabelecerá seus limites, sendo o prazo da infiltração de até 6 meses, sem prejuízo de eventuais renovações, desde que comprovada sua necessidade.$q$,
  'C',
  $q$Certo. O art. 10 da Lei nº 12.850/2013 disciplina a infiltração de agentes de polícia como técnica especial de investigação em casos de organização criminosa, exigindo autorização judicial circunstanciada e sigilosa, mediante representação do delegado de polícia ou requerimento do Ministério Público, ouvido este último quando a representação for do delegado. O § 3º do mesmo artigo estabelece que "a infiltração será autorizada pelo prazo de até 6 (seis) meses, sem prejuízo de eventuais renovações, desde que comprovada sua necessidade" — reconhecendo que investigações mais complexas podem exigir prazo maior do que o inicialmente autorizado, desde que essa necessidade continue sendo demonstrada e reavaliada pelo Judiciário a cada renovação.
Exemplo: numa investigação de longa duração sobre uma organização criminosa complexa, o agente infiltrado pode ter sua atuação inicialmente autorizada por 6 meses, e, se ao final desse período ainda for necessário aprofundar a investigação, o prazo pode ser renovado judicialmente, desde que essa necessidade continue sendo comprovada perante o juiz responsável pela autorização.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.850/2013 – Lei de Organização Criminosa','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-035',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Ouvidorias de polícia e controle externo da atividade policial',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O controle externo da atividade policial é atribuição constitucionalmente conferida ao Ministério Público, tratando-se de mecanismo institucional voltado a verificar a legalidade da atuação dos órgãos de segurança pública na investigação criminal e a garantir o respeito aos direitos fundamentais dos investigados durante essa atividade.$q$,
  'C',
  $q$Certo. O art. 129, inciso VII, da CF/1988 estabelece, entre as funções institucionais do Ministério Público, "exercer o controle externo da atividade policial, na forma da lei complementar". Essa função reflete o papel do Ministério Público como fiscal da lei, atuando para verificar se a atuação dos órgãos policiais (delegacias, investigações) respeita os limites legais e constitucionais, especialmente quanto aos direitos fundamentais dos investigados, atuando como mecanismo institucional de accountability sobre a atividade policial, distinto de outros mecanismos complementares, como ouvidorias de polícia e corregedorias, que também exercem funções de controle e fiscalização, mas em âmbitos e formas diferentes daquela atribuída constitucionalmente ao MP.
Exemplo: o Ministério Público pode, no exercício desse controle externo, requisitar informações sobre inquéritos policiais em andamento, verificar eventuais irregularidades na condução de investigações e, se necessário, tomar as medidas cabíveis para corrigir desvios identificados na atuação policial, refletindo essa função fiscalizadora atribuída constitucionalmente à instituição.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
