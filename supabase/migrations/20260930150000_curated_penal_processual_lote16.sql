-- Curated (authored) questions, Direito lote 56: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-032',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a Administração Pública — condescendência criminosa',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de condescendência criminosa, previsto no art. 320 do Código Penal, consiste em deixar o funcionário público, por indulgência, de responsabilizar subordinado que cometeu infração no exercício do cargo, ou, quando falte competência para promover a responsabilização, deixar de levar o fato ao conhecimento da autoridade competente.$q$,
  'C',
  $q$Certo. O art. 320, caput, do Código Penal tipifica essa conduta: "Deixar o funcionário, por indulgência, de responsabilizar subordinado que cometeu infração no exercício do cargo ou, quando lhe falte competência, não levar o fato ao conhecimento da autoridade competente". A "indulgência" mencionada no tipo indica uma tolerância indevida do superior hierárquico em relação à infração cometida pelo subordinado — o superior, por benevolência mal colocada (e não por interesse próprio direto, o que aproximaria de outros crimes como a prevaricação), deixa de tomar as medidas cabíveis contra a infração, seja aplicando a punição diretamente (se tiver competência para isso), seja comunicando o fato à autoridade competente (se não tiver essa competência específica).
Exemplo: um chefe de repartição que descobre que um subordinado cometeu uma infração funcional, mas, por simpatia pessoal ou desejo de "não criar problemas", simplesmente ignora o fato e não toma nenhuma providência (nem pune, nem comunica a quem deveria), pratica condescendência criminosa, ainda que não tenha nenhum interesse pessoal direto na infração cometida pelo subordinado.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-028',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Sistemas processuais penais',
  $q$Julgue o item a seguir.
O sistema processual penal acusatório, adotado pela Constituição Federal de 1988 como referência, caracteriza-se pela separação das funções de acusar, defender e julgar entre sujeitos processuais distintos, diferentemente do sistema inquisitivo, em que essas funções tendem a se concentrar nas mãos de um único órgão ou pessoa.$q$,
  'C',
  $q$Certo. O sistema acusatório é caracterizado justamente pela separação clara entre as funções de acusação (exercida, em regra, pelo Ministério Público, no caso de ação penal pública, ou pelo ofendido, na ação penal privada), defesa (exercida pelo próprio acusado e seu defensor) e julgamento (exercida por um juiz ou tribunal imparcial, que não acumula funções acusatórias). Já o sistema inquisitivo, historicamente característico de outros períodos e ordenamentos, concentrava essas funções — o mesmo órgão poderia investigar, acusar e julgar, o que compromete estruturalmente a imparcialidade do julgamento. A doutrina majoritária entende que a Constituição de 1988, ao estabelecer garantias como o contraditório, a ampla defesa e a atribuição da persecução penal ao Ministério Público (não ao juiz), adotou o sistema acusatório como modelo de referência para o processo penal brasileiro.
Exemplo: no sistema acusatório brasileiro, o juiz não pode, em regra, iniciar de ofício uma ação penal pública (essa iniciativa cabe ao Ministério Público) — essa separação de papéis, entre quem acusa e quem julga, é justamente o que caracteriza e diferencia o sistema acusatório do modelo inquisitivo, em que o próprio juiz poderia acumular essas funções.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
