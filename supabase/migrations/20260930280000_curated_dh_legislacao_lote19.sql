-- Curated (authored) questions, Direito lote 69: mais Direitos Humanos e
-- Legislação Especial. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-040',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Direitos humanos e migração — Lei de Migração',
  $q$Julgue o item a seguir, com base na Lei nº 13.445/2017.
São direitos assegurados ao migrante em território nacional, em condições de igualdade com os nacionais, entre outros, o acesso a serviços, programas e benefícios sociais, bens públicos, educação e assistência jurídica integral e gratuita aos que comprovarem insuficiência de recursos, independentemente de sua situação migratória regular ou irregular.$q$,
  'C',
  $q$Certo. O art. 4º da Lei nº 13.445/2017 (Lei de Migração) assegura ao migrante, em território nacional, em condições de igualdade com os nacionais, uma série de direitos e liberdades civis, sociais, culturais e econômicos, incluindo acesso a serviços, programas e benefícios sociais, bens públicos, educação e assistência jurídica integral gratuita aos que comprovarem insuficiência de recursos. Um aspecto importante da lei é que muitos desses direitos básicos são assegurados independentemente da situação migratória do indivíduo (regular ou irregular), refletindo o compromisso com uma abordagem de direitos humanos na política migratória brasileira, que reconhece que a irregularidade documental não pode servir de pretexto para negar direitos fundamentais básicos à pessoa migrante.
Exemplo: uma criança migrante em situação irregular no Brasil tem, ainda assim, direito de acesso à educação básica nas escolas públicas, em condições de igualdade com crianças brasileiras, refletindo esse compromisso da lei com direitos fundamentais que independem da regularidade documental da pessoa migrante.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.445/2017 – Lei de Migração','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13445.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-036',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei da Ficha Limpa',
  $q$Julgue o item a seguir, com base na Lei Complementar nº 135/2010.
A Lei Complementar nº 135/2010, conhecida como Lei da Ficha Limpa, alterou os critérios de inelegibilidade previstos na Lei Complementar nº 64/1990, tornando inelegíveis, entre outras hipóteses, candidatos condenados por órgão colegiado (e não apenas em decisão transitada em julgado) em determinados crimes, pelo prazo de 8 anos após o cumprimento da pena.$q$,
  'C',
  $q$Certo. A Lei Complementar nº 135/2010 introduziu alterações significativas nos critérios de inelegibilidade da Lei Complementar nº 64/1990, prevendo, entre outras hipóteses, que a condenação por órgão colegiado (mesmo sem trânsito em julgado definitivo — ou seja, ainda cabendo recurso) em determinados crimes específicos (como crimes contra a administração pública, eleitorais, abuso de poder econômico, entre outros listados na norma) já gera inelegibilidade pelo prazo de 8 anos, contados após o cumprimento da pena. Essa foi uma das inovações mais debatidas da lei — antes dela, a regra geral exigia trânsito em julgado da condenação para gerar inelegibilidade; a Lei da Ficha Limpa antecipou esse efeito para decisões colegiadas ainda pendentes de recurso, dentro das hipóteses específicas que ela mesma estabeleceu.
Exemplo: um candidato condenado por um tribunal (órgão colegiado, ainda que a decisão não tenha transitado em julgado, por ainda caber recurso a instância superior) por determinado crime contra a administração pública pode se tornar inelegível já a partir dessa condenação colegiada, sem precisar aguardar o esgotamento de todos os recursos possíveis, conforme os critérios estabelecidos pela Lei da Ficha Limpa.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei Complementar nº 135/2010 – Lei da Ficha Limpa','url','https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp135.htm')),
  'difícil', now()
);
