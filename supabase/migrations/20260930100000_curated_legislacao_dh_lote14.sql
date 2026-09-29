-- Curated (authored) questions, Direito lote 51: mais Legislação Especial
-- e Direitos Humanos. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '012bdb9d-f67d-48e9-911e-10be9fc9226e', 'auth-leg-030',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Estatuto Geral das Guardas Municipais',
  $q$Julgue o item a seguir, com base na Lei nº 13.022/2014.
As guardas municipais destinam-se, nos termos da lei, à proteção de bens, serviços, logradouros públicos municipais e instalações do Município, competindo-lhes, entre outras atribuições, colaborar, de forma integrada com os órgãos de segurança pública, em ações conjuntas que contribuam com a paz social, mas sem que essa colaboração as transforme em polícia ostensiva geral, atribuição constitucionalmente reservada às polícias militares.$q$,
  'C',
  $q$Certo. O art. 4º da Lei nº 13.022/2014 (Estatuto Geral das Guardas Municipais) estabelece essa finalidade principal de proteção de bens, serviços, logradouros públicos municipais e instalações do Município, prevendo, entre suas competências, a colaboração com os demais órgãos de segurança pública em ações conjuntas. Porém, a Constituição Federal, no art. 144, § 5º, atribui especificamente à Polícia Militar a competência de polícia ostensiva geral e de preservação da ordem pública — competência distinta e mais ampla do que a das guardas municipais, cuja atuação, embora relevante e reconhecida como integrante do sistema de segurança pública desde a EC nº 82/2014, permanece focada primariamente na proteção do patrimônio e dos serviços municipais, sem substituir o papel constitucional específico atribuído às polícias militares.
Exemplo: uma guarda municipal pode atuar na proteção de um parque público ou de um prédio da prefeitura, e colaborar com a Polícia Militar em situações específicas de interesse comum, mas não substitui, por exemplo, o policiamento ostensivo geral das ruas da cidade contra a criminalidade comum, que continua sendo atribuição típica e específica da Polícia Militar, segundo a distribuição constitucional de competências.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.022/2014 – Estatuto Geral das Guardas Municipais','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13022.htm'),jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'afaf633e-5b3a-4ed9-96ae-a1a9a352c339', 'auth-dh-034',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Comissão Nacional da Verdade e memória histórica',
  $q$Julgue o item a seguir.
A Comissão Nacional da Verdade, instituída pela Lei nº 12.528/2011, teve por finalidade examinar e esclarecer as graves violações de direitos humanos praticadas no período fixado no seu ato constitutivo, a fim de efetivar o direito à memória e à verdade histórica e promover a reconciliação nacional, sem, contudo, ter poderes de natureza jurisdicional ou persecutória.$q$,
  'C',
  $q$Certo. A Lei nº 12.528/2011 instituiu a Comissão Nacional da Verdade, com a finalidade de examinar e esclarecer as graves violações de direitos humanos praticadas no contexto histórico definido em seu ato constitutivo (relacionado, principalmente, ao período do regime militar brasileiro), buscando efetivar o direito à memória e à verdade histórica das vítimas e da sociedade como um todo, e promover a reconciliação nacional. Um elemento importante é que a Comissão teve caráter estritamente investigativo e histórico, sem poderes de natureza jurisdicional (não podia processar ou julgar responsáveis) nem persecutória (não tinha poder de instaurar ação penal diretamente) — seu trabalho resultou em relatórios com recomendações, sem produzir, por si só, efeitos jurídicos condenatórios diretos contra indivíduos específicos.
Exemplo: a Comissão pôde reunir testemunhos, documentos e investigar fatos históricos relacionados a violações de direitos humanos, produzindo um relatório final com suas conclusões, mas não teve o poder de, ela mesma, condenar penalmente alguém por esses fatos — eventual responsabilização penal dependeria de instrumentos jurisdicionais próprios, fora do escopo da Comissão.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.528/2011 – Lei da Comissão Nacional da Verdade','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12528.htm')),
  'difícil', now()
);
