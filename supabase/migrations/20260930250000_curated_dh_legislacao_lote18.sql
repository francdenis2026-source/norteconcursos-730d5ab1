-- Curated (authored) questions, Direito lote 66: mais Direitos Humanos e
-- Legislação Especial. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '89f9d268-5925-40fd-b80e-30dc41723d21', 'auth-dh-039',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Direito ao esquecimento e liberdade de informação',
  $q$Julgue o item a seguir.
O chamado direito ao esquecimento, discutido pela jurisprudência brasileira em casos envolvendo divulgação posterior de fatos verídicos do passado de uma pessoa, tem sido tratado de forma cautelosa pelo Supremo Tribunal Federal, que reconheceu, em julgamento com repercussão geral, ser incompatível com a Constituição a ideia de um direito ao esquecimento genérico e absoluto, devendo eventuais conflitos entre liberdade de expressão e proteção à privacidade ser resolvidos caso a caso, à luz da ponderação de valores constitucionais.$q$,
  'C',
  $q$Certo. No julgamento do RE 1.010.606, com repercussão geral reconhecida, o STF fixou entendimento no sentido de que é incompatível com a Constituição Federal a ideia de um direito ao esquecimento genérico e abstrato, aplicável indistintamente a qualquer situação de divulgação posterior de fatos verídicos ocorridos no passado — isso poderia representar uma forma de censura indireta a informações verdadeiras e historicamente relevantes. A Corte entendeu que eventuais conflitos entre a liberdade de expressão/informação e outros direitos da personalidade (privacidade, imagem) devem ser resolvidos caso a caso, ponderando as circunstâncias específicas de cada situação concreta, e não por meio de uma regra geral e abstrata que sempre favoreceria o "esquecimento" em detrimento da liberdade de informar fatos verídicos.
Exemplo: a divulgação de um fato criminoso verdadeiro ocorrido décadas atrás, envolvendo uma pessoa que hoje leva vida pacata, não pode ser automaticamente proibida com base num "direito ao esquecimento" genérico — a análise deve considerar as circunstâncias específicas do caso, como o interesse público remanescente na informação, o contexto da divulgação e outros fatores relevantes, sem uma regra abstrata predefinida em favor de qualquer um dos lados.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-035',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Acesso a Documentos Sigilosos',
  $q$Julgue o item a seguir, com base na Lei nº 12.527/2011 (Lei de Acesso à Informação).
A informação em poder dos órgãos e entidades públicas pode ser classificada como ultrassecreta, secreta ou reservada, conforme o grau de sigilo, com prazos máximos de restrição de acesso que variam conforme a classificação, sendo o prazo máximo para informações ultrassecretas de 25 anos, prorrogável uma única vez por igual período, mediante procedimento específico.$q$,
  'C',
  $q$Certo. O art. 24 da Lei nº 12.527/2011 estabelece essa classificação em três graus de sigilo — ultrassecreto, secreto e reservado — cada um com prazo máximo de restrição de acesso à informação: 25 anos para informações ultrassecretas, 15 anos para secretas, e 5 anos para reservadas. O § 4º do mesmo artigo prevê que o prazo de restrição de acesso à informação ultrassecreta poderá ser renovado uma única vez, por igual período, mediante procedimento formal específico, sem que isso signifique que o sigilo possa se perpetuar indefinidamente — há sempre um limite temporal máximo previsto em lei para a restrição do acesso público a essas informações, ainda que classificadas no mais alto grau de sigilo.
Exemplo: um documento classificado como ultrassecreto, relacionado a questões de segurança nacional, pode ficar sob sigilo por até 25 anos, prorrogável por mais 25 anos mediante procedimento específico previsto na lei — mas, após esse prazo máximo total, a informação deve, em regra, se tornar acessível ao público, refletindo o compromisso da lei com a transparência, mesmo que diferida no tempo para informações mais sensíveis.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.527/2011 – Lei de Acesso à Informação','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm')),
  'difícil', now()
);
