-- Curated (authored) questions, Direito lote 74: mais Direito Penal e
-- Direito Processual Penal. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-038',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra o patrimônio — receptação',
  $q$Julgue o item a seguir, com base no Código Penal.
A receptação qualificada, prevista no art. 180, § 1º, do Código Penal, exige, para sua configuração no exercício de atividade comercial ou industrial, apenas que o agente devesse presumir a origem criminosa da coisa, dispensando a comprovação de conhecimento efetivo dessa origem, diferentemente da receptação simples, dolosa, que exige conhecimento efetivo da origem ilícita do bem.$q$,
  'C',
  $q$Certo. O art. 180, § 1º, do Código Penal tipifica a receptação qualificada como conduta praticada por quem, no exercício de atividade comercial ou industrial, adquire, recebe, transporta, conduz ou oculta, em proveito próprio ou alheio, coisa que "deve saber" ser produto de crime — a expressão "deve saber" indica um padrão de culpa (o agente tinha o dever de desconfiar e verificar a origem, dada sua atividade profissional específica) diferente do dolo direto exigido na receptação simples (art. 180, caput), em que o agente precisa efetivamente saber (conhecimento real) que a coisa é produto de crime. Essa distinção reconhece que comerciantes e industriais, por sua atividade profissional, têm um dever de diligência maior em verificar a procedência das mercadorias que adquirem, justificando um padrão de responsabilização mais amplo (baseado em culpa/negligência, e não apenas em dolo pleno) para essa categoria específica.
Exemplo: um comerciante de eletrônicos que adquire mercadorias a preços muito abaixo do mercado, sem qualquer nota fiscal ou documentação, de fornecedor desconhecido, mesmo sem ter certeza absoluta da origem criminosa, pode responder por receptação qualificada se as circunstâncias evidentemente indicassem que ele "deveria saber" da procedência ilícita — diferente do consumidor comum, que, ao comprar um produto de aparência normal, não tem o mesmo dever de investigação sobre sua procedência.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-034',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Transação penal',
  $q$Julgue o item a seguir, com base na Lei nº 9.099/1995.
A transação penal, aplicável no âmbito dos Juizados Especiais Criminais para infrações de menor potencial ofensivo, consiste na proposta, pelo Ministério Público, de aplicação imediata de pena restritiva de direitos ou multa, dispensada a necessidade de instauração de processo criminal formal, desde que o autor do fato aceite a proposta.$q$,
  'C',
  $q$Certo. O art. 76 da Lei nº 9.099/1995 disciplina a transação penal, aplicável às infrações de menor potencial ofensivo (crimes com pena máxima não superior a dois anos, e contravenções penais, conforme a Lei nº 10.259/2001): havendo representação (nos crimes que a exigem) ou tratando-se de crime de ação penal pública incondicionada, o Ministério Público poderá propor a aplicação imediata de pena restritiva de direitos ou multa, a ser especificada na proposta, dispensando a instauração formal de um processo criminal completo, desde que o autor do fato concorde voluntariamente com a proposta apresentada. É um instrumento de justiça penal consensual, voltado a agilizar a resposta estatal para infrações de menor gravidade, sem a necessidade do trâmite processual completo.
Exemplo: um autor de infração de menor potencial ofensivo, ao ser abordado na audiência preliminar do Juizado Especial Criminal, pode receber uma proposta do Ministério Público de cumprir determinada pena restritiva de direitos (como prestação de serviços comunitários) ou pagamento de multa, e, aceitando voluntariamente essa proposta, evita o desenvolvimento de um processo criminal formal completo para aquela infração específica.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.099/1995 – Lei dos Juizados Especiais Cíveis e Criminais','url','https://www.planalto.gov.br/ccivil_03/leis/l9099.htm')),
  'média', now()
);
