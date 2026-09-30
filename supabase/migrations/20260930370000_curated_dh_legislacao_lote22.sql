-- Curated (authored) questions, Direito lote 78: mais Direitos Humanos e
-- Legislação Especial. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-043',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Direito à saúde mental e desinstitucionalização',
  $q$Julgue o item a seguir, com base na Lei nº 10.216/2001.
A Lei da Reforma Psiquiátrica estabelece os direitos das pessoas portadoras de transtornos mentais, priorizando o tratamento em serviços comunitários de saúde mental, em detrimento da internação em hospitais psiquiátricos tradicionais, sendo a internação medida excepcional, indicada apenas quando os recursos extra-hospitalares se mostrarem insuficientes.$q$,
  'C',
  $q$Certo. A Lei nº 10.216/2001 (Lei da Reforma Psiquiátrica) estabelece, em seu art. 4º, que "a internação, em qualquer de suas modalidades, só será indicada quando os recursos extra-hospitalares se mostrarem insuficientes". Essa lei consagra o paradigma da desinstitucionalização, privilegiando o tratamento em serviços comunitários de saúde mental (como os Centros de Atenção Psicossocial, os CAPS) em vez do modelo antigo de longas internações em hospitais psiquiátricos, reconhecendo o direito da pessoa com transtorno mental a ser tratada, sempre que possível, em ambiente menos restritivo, próximo de sua comunidade e de sua rede de apoio social e familiar, preservando ao máximo sua dignidade e autonomia.
Exemplo: uma pessoa com transtorno mental que pode ser adequadamente acompanhada por um Centro de Atenção Psicossocial, com consultas regulares e suporte comunitário, não deve, segundo essa lei, ser desnecessariamente internada em regime hospitalar prolongado — a internação é reservada para situações em que esses recursos comunitários comprovadamente não sejam suficientes para o tratamento adequado.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 10.216/2001 – Lei da Reforma Psiquiátrica','url','https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10216.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-039',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Acesso a Registros de Identificação Civil',
  $q$Julgue o item a seguir, com base na Lei nº 7.116/1983.
A Carteira de Identidade expedida em qualquer estado, território ou no Distrito Federal, dentro dos padrões e das normas técnicas fixadas pelo Ministério da Justiça, terá validade em todo o território nacional, sendo aceita como prova de identidade civil por qualquer órgão público, sem necessidade de nova identificação para cada ente federativo.$q$,
  'C',
  $q$Certo. A Lei nº 7.116/1983 assegura que a Carteira de Identidade emitida por qualquer unidade federativa, seguindo os padrões técnicos nacionalmente uniformizados, tem validade em todo o território nacional, dispensando a necessidade de o cidadão obter uma nova identificação civil sempre que se desloca ou passa a residir em outro estado da federação. Essa uniformidade nacional busca facilitar a vida do cidadão, evitando a burocracia e o custo de múltiplas identificações estaduais para a mesma pessoa, e reconhecendo que a identidade civil é um documento de circulação nacional, e não meramente estadual.
Exemplo: uma pessoa que se muda do Acre para São Paulo não precisa emitir uma nova carteira de identidade só por causa dessa mudança de domicílio — sua identidade civil original, emitida em qualquer unidade da federação, continua válida e aceita em todo o território nacional, para qualquer finalidade que exija comprovação de identidade civil.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.116/1983 – Lei da Carteira de Identidade','url','https://www.planalto.gov.br/ccivil_03/leis/l7116.htm')),
  'fácil', now()
);
