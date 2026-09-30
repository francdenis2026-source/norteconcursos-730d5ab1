-- Curated (authored) questions, Direito lote 57: mais Direitos Humanos e
-- Legislação Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-036',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Convenção de Palermo — crime organizado transnacional',
  $q$Julgue o item a seguir.
A Convenção das Nações Unidas contra o Crime Organizado Transnacional (Convenção de Palermo), ratificada pelo Brasil, prevê mecanismos de cooperação internacional entre os Estados-parte para prevenir e combater o crime organizado transnacional, incluindo assistência jurídica mútua e extradição, reconhecendo a necessidade de resposta coordenada a crimes que ultrapassam fronteiras nacionais.$q$,
  'C',
  $q$Certo. A Convenção das Nações Unidas contra o Crime Organizado Transnacional (Convenção de Palermo, 2000), ratificada pelo Brasil e internalizada pelo Decreto nº 5.015/2004, estabelece um marco de cooperação internacional para o combate ao crime organizado que atravessa fronteiras nacionais, prevendo mecanismos como assistência jurídica mútua entre os Estados-parte, extradição de pessoas acusadas ou condenadas por crimes abrangidos pela Convenção, e cooperação para fins de confisco de bens de origem criminosa. O reconhecimento de que o crime organizado moderno frequentemente opera de forma transnacional (tráfico de drogas, tráfico de pessoas, lavagem de dinheiro internacional) justifica essa necessidade de resposta coordenada entre diferentes países, que isoladamente teriam dificuldade de combater efetivamente organizações com operações internacionais.
Exemplo: uma organização criminosa que opera simultaneamente em múltiplos países, lavando dinheiro por meio de transferências internacionais complexas, exige que as autoridades de diferentes nações cooperem entre si (compartilhando provas, coordenando prisões, processando pedidos de extradição) para que a investigação e a persecução penal sejam efetivas — exatamente o tipo de cooperação que a Convenção de Palermo busca viabilizar.$q$,
  jsonb_build_array(jsonb_build_object('title','Convenção das Nações Unidas contra o Crime Organizado Transnacional (Convenção de Palermo, 2000) – Decreto nº 5.015/2004','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2004/decreto/d5015.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-032',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Interceptação de Comunicações Telemáticas',
  $q$Julgue o item a seguir, com base na Lei nº 9.296/1996.
A interceptação de comunicações em sistemas de informática e telemática, como e-mails e mensagens transmitidas pela internet, também se submete às disposições da Lei nº 9.296/1996, que originalmente regulamentava apenas as comunicações telefônicas, por força de expressa previsão contida no parágrafo único do art. 1º dessa lei.$q$,
  'C',
  $q$Certo. O parágrafo único do art. 1º da Lei nº 9.296/1996 estabelece expressamente que "o disposto nesta Lei aplica-se à interceptação do fluxo de comunicações em sistemas de informática e telemática". Embora o corpo principal da lei tenha sido originalmente concebido com foco nas comunicações telefônicas (conforme o próprio caput do art. 1º e o título da lei), essa extensão expressa às comunicações em sistemas de informática e telemática (como e-mails, aplicativos de mensagens e outras formas de comunicação digital) já estava prevista desde a redação original da lei, permitindo sua aplicação, com as devidas adaptações técnicas, também a esse tipo de comunicação eletrônica moderna.
Exemplo: uma investigação criminal que necessite acessar, mediante autorização judicial e dentro dos requisitos legais, o fluxo de mensagens trocadas em tempo real por um investigado através de um aplicativo de comunicação instantânea, pode se valer dos mesmos parâmetros legais estabelecidos pela Lei nº 9.296/1996 para a interceptação telefônica tradicional, por força dessa extensão expressa da lei às comunicações telemáticas.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.296/1996 – Lei de Interceptação Telefônica','url','https://www.planalto.gov.br/ccivil_03/leis/l9296.htm')),
  'difícil', now()
);
