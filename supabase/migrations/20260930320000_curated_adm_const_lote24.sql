-- Curated (authored) questions, Direito lote 73: mais Direito
-- Administrativo e Direito Constitucional. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-050',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Sanções administrativas — Lei 14.133/2021',
  $q$Julgue o item a seguir, com base na Lei nº 14.133/2021.
São sanções administrativas aplicáveis ao contratado que descumpre o contrato administrativo, entre outras, advertência, multa, impedimento de licitar e contratar, e declaração de inidoneidade para licitar ou contratar, sendo essa última a sanção mais severa, com efeitos que se estendem a toda a Administração Pública, direta e indireta, de todos os entes federativos.$q$,
  'C',
  $q$Certo. O art. 156 da Lei nº 14.133/2021 lista as sanções administrativas aplicáveis: advertência, multa, impedimento de licitar e contratar, e declaração de inidoneidade para licitar ou contratar. A declaração de inidoneidade é, de fato, a sanção mais grave, produzindo efeitos que impedem o contratado de licitar ou contratar não apenas com o órgão ou entidade que aplicou a sanção, mas com toda a Administração Pública Direta e Indireta de todos os entes federativos (União, Estados, Distrito Federal e Municípios), diferentemente do impedimento de licitar e contratar, cujos efeitos, em regra, se restringem ao âmbito do próprio ente federativo que aplicou a penalidade.
Exemplo: uma empresa que recebe declaração de inidoneidade por fraude grave num contrato com um município fica impedida de licitar ou contratar não apenas com aquele município específico, mas com qualquer órgão público federal, estadual ou municipal em todo o país, refletindo a gravidade e a amplitude dessa sanção máxima prevista na lei.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.133/2021 – Nova Lei de Licitações e Contratos Administrativos','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-035',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Vedação à prisão civil por dívida',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Não haverá prisão civil por dívida, salvo a do responsável pelo inadimplemento voluntário e inescusável de obrigação alimentícia, sendo essa a única hipótese de prisão civil ainda admitida pela Constituição, após a jurisprudência do STF afastar a prisão civil do depositário infiel.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LXVII, da CF/1988 estabelece que "não haverá prisão civil por dívida, salvo a do responsável pelo inadimplemento voluntário e inescusável de obrigação alimentícia e a do depositário infiel". Embora o texto constitucional literalmente ainda mencione duas hipóteses (obrigação alimentícia e depositário infiel), o STF, no julgamento do RE 466.343 e em súmula vinculante posterior (SV 25), firmou entendimento de que a prisão civil do depositário infiel não é mais aplicável no ordenamento brasileiro, em razão do status supralegal atribuído aos tratados internacionais de direitos humanos (especialmente o Pacto de San José da Costa Rica, que só admite prisão civil por dívida alimentícia), tornando, na prática, a prisão civil por inadimplemento de obrigação alimentícia a única hipótese efetivamente aplicável hoje.
Exemplo: mesmo que uma pessoa descumpra um contrato de depósito, entregando-se como depositária infiel de um bem, ela não pode mais, na prática atual, ser presa civilmente por essa dívida específica — a única hipótese de prisão civil efetivamente em vigor hoje é a decorrente do inadimplemento voluntário e inescusável de pensão alimentícia.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm'),jsonb_build_object('title','STF – Súmula Vinculante nº 25 – Prisão do depositário infiel','url','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=1247')),
  'difícil', now()
);
