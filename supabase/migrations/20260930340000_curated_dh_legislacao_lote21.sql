-- Curated (authored) questions, Direito lote 75: mais Direitos Humanos e
-- Legislação Especial. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'afaf633e-5b3a-4ed9-96ae-a1a9a352c339', 'auth-dh-042',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Revistas pessoais e dignidade humana',
  $q$Julgue o item a seguir.
Revistas pessoais em locais de privação de liberdade, como estabelecimentos prisionais, quando necessárias por razões de segurança, devem observar critérios de proporcionalidade e respeito à dignidade da pessoa revistada, sendo consideradas incompatíveis com os padrões de direitos humanos revistas de natureza vexatória, invasiva e desnecessária, especialmente em relação a familiares visitantes.$q$,
  'C',
  $q$Certo. Diretrizes e jurisprudência sobre direitos humanos no contexto prisional reconhecem que medidas de segurança, como revistas pessoais, embora legítimas em seu propósito de garantir a segurança do estabelecimento, precisam observar critérios de proporcionalidade e respeito à dignidade da pessoa revistada. Práticas de revista vexatória, invasiva ou humilhante (como revistas íntimas realizadas de forma degradante, especialmente contra familiares visitantes, incluindo mulheres e crianças) têm sido consideradas incompatíveis com padrões de direitos humanos, gerando debates e mudanças normativas em diversos estados brasileiros que substituíram revistas físicas invasivas por métodos alternativos, como scanners corporais, justamente para preservar a segurança do estabelecimento sem submeter visitantes a procedimentos degradantes.
Exemplo: substituir a revista íntima manual de visitantes por detectores de metal e scanners corporais não invasivos é uma medida que busca conciliar a necessidade legítima de segurança do estabelecimento prisional com o respeito à dignidade das pessoas que buscam visitar seus familiares privados de liberdade.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '9dfc55b7-7ad4-4b76-9b5f-ea1a7a421254', 'auth-leg-038',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Combate à Discriminação de Pessoas com HIV/AIDS',
  $q$Julgue o item a seguir, com base na Lei nº 12.984/2014.
Constitui crime, previsto na Lei nº 12.984/2014, discriminar pessoa com HIV/AIDS, em razão de sua condição de portador do vírus ou da doença, entre outras condutas, recusando ou retardando atendimento de saúde, negando emprego ou trabalho, ou exigindo teste de HIV para fins de admissão em concursos ou processos seletivos.$q$,
  'C',
  $q$Certo. A Lei nº 12.984/2014 define crimes de discriminação contra pessoa com HIV/AIDS, incluindo, entre as condutas tipificadas: recusar ou retardar atendimento à saúde da pessoa com HIV/AIDS em razão dessa condição; negar emprego ou trabalho por causa dessa condição; e exigir teste de HIV como condição para admissão em concursos públicos ou processos seletivos de qualquer natureza. Essa legislação reflete a preocupação em combater a discriminação estrutural que historicamente afetou pessoas soropositivas em diferentes esferas da vida social, reconhecendo que a condição de portador do vírus não pode servir de justificativa para negar acesso a direitos básicos como saúde e trabalho.
Exemplo: um empregador que, ao descobrir que um candidato a determinado cargo é soropositivo, recusa sua contratação exclusivamente por essa razão (sem qualquer relação real da condição com a capacidade de desempenhar a função), pratica conduta tipificada como crime pela Lei nº 12.984/2014.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.984/2014 – Lei de Combate à Discriminação de Pessoas com HIV/AIDS','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12984.htm')),
  'média', now()
);
