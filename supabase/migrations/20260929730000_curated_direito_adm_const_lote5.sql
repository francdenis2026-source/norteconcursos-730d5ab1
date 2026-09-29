-- Curated (authored) questions, Direito lote 13: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-017',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Organização administrativa — descentralização',
  $q$Julgue o item a seguir.
A descentralização administrativa por outorga (ou por serviços) ocorre quando o Estado transfere, por lei, a titularidade e a execução de determinado serviço público a uma pessoa jurídica de direito público ou privado da administração indireta, como uma autarquia ou uma empresa pública, diferentemente da descentralização por colaboração, em que apenas a execução do serviço é transferida a particulares, mediante contrato ou ato administrativo, mantendo o Estado a titularidade.$q$,
  'C',
  $q$Certo. A descentralização administrativa pode ocorrer de duas formas principais: por OUTORGA (ou por serviços), quando o Estado, por meio de lei, cria uma entidade da administração indireta (autarquia, fundação pública, empresa pública, sociedade de economia mista) e transfere a ela tanto a titularidade quanto a execução de determinado serviço público — a entidade passa a ser, ela mesma, a responsável legal por aquele serviço; e por COLABORAÇÃO, quando o Estado, mantendo a titularidade do serviço, transfere apenas sua execução a particulares, por meio de instrumentos como concessão, permissão ou autorização, permanecendo o poder público como titular final da atividade, ainda que não a execute diretamente.
Exemplo: quando a lei cria uma autarquia para gerir a previdência social, transferindo a ela a titularidade e execução desse serviço, há descentralização por outorga; já quando o Estado contrata uma empresa privada, por concessão, para prestar o serviço de transporte público, mantendo a titularidade do serviço, há descentralização por colaboração.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-018',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Vacância e provimento de cargos (Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
São formas de provimento de cargo público a nomeação, a promoção, a readaptação, a reversão, o aproveitamento, a reintegração e a recondução, cada uma delas destinada a situações específicas previstas em lei.$q$,
  'C',
  $q$Certo. O art. 8º da Lei nº 8.112/1990 lista essas formas de provimento de cargo público: nomeação (forma originária, para preenchimento de cargo vago); promoção (movimentação dentro da carreira); readaptação (investidura em cargo compatível com limitação sofrida em sua capacidade física ou mental); reversão (retorno do aposentado à atividade); aproveitamento (reinvestidura de servidor em disponibilidade); reintegração (retorno do servidor estável ao cargo, quando invalidada sua demissão); e recondução (retorno do servidor estável ao cargo anteriormente ocupado, decorrente de inabilitação em estágio probatório relativo a outro cargo ou de reintegração do anterior ocupante). Cada instituto atende a uma situação jurídica distinta prevista na lei.
Exemplo: um servidor demitido que consegue, judicial ou administrativamente, anular essa demissão retorna ao cargo por reintegração; já um servidor estável que assume um novo cargo, mas não passa no estágio probatório correspondente, pode retornar ao cargo anterior por recondução — institutos parecidos na consequência prática (voltar a ocupar um cargo), mas com causas jurídicas diferentes.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-011',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Direito de petição e certidão',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São a todos assegurados, independentemente do pagamento de taxas, o direito de petição aos Poderes Públicos em defesa de direitos ou contra ilegalidade ou abuso de poder, e a obtenção de certidões em repartições públicas, para defesa de direitos e esclarecimento de situações de interesse pessoal.$q$,
  'C',
  $q$Certo. O art. 5º, inciso XXXIV, alíneas "a" e "b", da CF/1988 assegura, independentemente do pagamento de taxas: "a) o direito de petição aos Poderes Públicos em defesa de direitos ou contra ilegalidade ou abuso de poder; b) a obtenção de certidões em repartições públicas, para defesa de direitos e esclarecimento de situações de interesse pessoal". Esses dois direitos, embora distintos, compartilham a característica de serem instrumentos de participação e controle do cidadão perante a administração pública, e ambos são gratuitos — sua efetivação não pode ser condicionada ao pagamento de qualquer taxa, o que os diferencia, por exemplo, de outras certidões que podem envolver emolumentos em contextos diversos.
Exemplo: um cidadão pode solicitar gratuitamente a um órgão público uma certidão comprovando determinada situação de seu interesse pessoal (como tempo de contribuição previdenciária), ou pode apresentar uma petição formal denunciando um abuso de poder cometido por uma autoridade, sem que, em nenhum dos dois casos, precise pagar taxa alguma para exercer esse direito constitucional.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-012',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Processo legislativo',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
As emendas constitucionais são votadas em cada Casa do Congresso Nacional, em dois turnos, considerando-se aprovada a proposta que obtiver, em ambos os turnos, três quintos dos votos dos respectivos membros, sendo a matéria constante de proposta de emenda rejeitada ou havida por prejudicada objeto de nova proposta na mesma sessão legislativa.$q$,
  'E',
  $q$Errado. O art. 60, § 2º, da CF/1988 realmente exige aprovação por três quintos dos votos dos respectivos membros, em dois turnos, em cada Casa do Congresso Nacional, para que uma proposta de emenda constitucional seja aprovada — essa parte do item está correta. O erro está na parte final: o § 5º do mesmo artigo estabelece que "a matéria constante de proposta de emenda rejeitada ou havida por prejudicada NÃO PODE ser objeto de nova proposta na mesma sessão legislativa" — ou seja, é exatamente o oposto do que o item afirma. Uma vez rejeitada ou prejudicada, a proposta só pode ser reapresentada em sessão legislativa posterior, e não na mesma sessão em que foi rejeitada.
Exemplo: se uma PEC é rejeitada em um determinado ano legislativo, seus proponentes não podem simplesmente reapresentar a mesma proposta naquele mesmo ano — precisam aguardar a sessão legislativa seguinte para tentar novamente, o que evita insistências sucessivas e imediatas sobre matérias já rejeitadas pelo Congresso.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
);
