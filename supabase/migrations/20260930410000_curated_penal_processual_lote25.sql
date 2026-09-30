-- Curated (authored) questions, Direito lote 82: mais Direito Penal e
-- Direito Processual Penal. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-041',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a Administração Pública — prevaricação',
  $q$Julgue o item a seguir, com base no Código Penal.
Comete o crime de prevaricação o funcionário público que retarda ou deixa de praticar, indevidamente, ato de ofício, ou o pratica contra disposição expressa de lei, para satisfazer interesse ou sentimento pessoal, distinguindo-se da corrupção passiva pela ausência de vantagem indevida solicitada, recebida ou aceita pelo agente.$q$,
  'C',
  $q$Certo. O art. 319 do Código Penal tipifica a prevaricação como o retardamento ou a omissão indevida de ato de ofício, ou a sua prática contra expressa disposição de lei, exigindo como elemento subjetivo especial a satisfação de interesse ou sentimento pessoal do agente (por exemplo, favorecer um amigo, prejudicar um desafeto ou evitar trabalho). A principal diferença em relação à corrupção passiva (art. 317 do CP) está no elemento da vantagem: na corrupção passiva o funcionário público solicita, recebe ou aceita promessa de vantagem indevida, ao passo que na prevaricação não há essa vantagem patrimonial ou de outra natureza envolvida — o motivo do agente é puramente pessoal, sem contrapartida.
Exemplo: um delegado que deixa de instaurar inquérito contra o filho de um amigo próximo, sem receber qualquer vantagem por isso, comete prevaricação; se, em vez disso, ele deixasse de agir mediante o recebimento de dinheiro, o crime seria de corrupção passiva.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-037',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Recursos — recurso em sentido estrito',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
O recurso em sentido estrito é cabível, entre outras hipóteses previstas em rol taxativo do art. 581 do CPP, contra a decisão que não recebe a denúncia ou a queixa, sendo dirigido ao tribunal competente, mas processado e julgado, em regra, sem a exigência de preparo recursal nos casos de réu que litiga sob os benefícios da justiça gratuita.$q$,
  'C',
  $q$Certo. O recurso em sentido estrito (RESE), previsto no art. 581 do Código de Processo Penal, é cabível em hipóteses taxativamente elencadas, entre elas a decisão que não recebe a denúncia ou a queixa (inciso I). Trata-se de recurso dirigido ao tribunal competente para reexame da decisão de primeiro grau, e sua tramitação segue procedimento próprio, sem prejuízo da regra geral do processo penal de que a gratuidade de justiça, reconhecida ao réu hipossuficiente, o dispensa do pagamento de custas e do preparo recursal, diferentemente do que ocorre, em regra, no processo civil.
Exemplo: se o juiz rejeita a denúncia oferecida pelo Ministério Público por entender ausente justa causa para a ação penal, cabe ao órgão acusador interpor recurso em sentido estrito para que o tribunal reexamine a decisão de não recebimento, buscando o prosseguimento da persecução penal.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
);
