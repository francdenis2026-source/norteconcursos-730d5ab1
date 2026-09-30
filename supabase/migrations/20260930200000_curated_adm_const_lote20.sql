-- Curated (authored) questions, Direito lote 61: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-046',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Registro de preços',
  $q$Julgue o item a seguir, com base na Lei nº 14.133/2021.
O sistema de registro de preços permite que a administração pública formalize, mediante procedimento licitatório próprio, um cadastro de preços e fornecedores para contratações futuras e eventuais, sem que isso obrigue a administração a firmar contratações naquela quantidade máxima registrada, o que confere maior flexibilidade em relação a compras diretas tradicionais.$q$,
  'C',
  $q$Certo. O sistema de registro de preços, disciplinado pela Lei nº 14.133/2021, permite à administração pública, mediante licitação específica (geralmente na modalidade pregão), formalizar uma "ata de registro de preços" contendo os preços e fornecedores selecionados para eventual contratação futura, sem que essa formalização gere, por si só, obrigação de compra imediata ou nas quantidades máximas estimadas — a administração contrata conforme sua necessidade real for surgindo, dentro do prazo de validade da ata (em regra, de até um ano), o que confere maior flexibilidade logística e evita a necessidade de estocar antecipadamente grandes quantidades de bens ou serviços, além de facilitar a adesão de outros órgãos à mesma ata registrada, em certas condições (a chamada "carona").
Exemplo: um órgão público pode registrar preços para aquisição de materiais de escritório por um ano, e ir contratando as quantidades efetivamente necessárias ao longo desse período, conforme a demanda real surgir, sem precisar comprar tudo de uma vez logo após a licitação, nem estar obrigado a atingir a quantidade máxima estimada inicialmente.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.133/2021 – Nova Lei de Licitações e Contratos Administrativos','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-031',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Direitos das minorias e ações afirmativas',
  $q$Julgue o item a seguir, com base na jurisprudência do Supremo Tribunal Federal.
O Supremo Tribunal Federal já reconheceu a constitucionalidade de políticas de ação afirmativa, como cotas raciais em universidades públicas e em concursos públicos, entendendo que tais medidas são compatíveis com o princípio constitucional da igualdade material, na medida em que visam corrigir desigualdades históricas e estruturais enfrentadas por determinados grupos.$q$,
  'C',
  $q$Certo. O STF, em diversos julgamentos (como na ADPF 186, sobre cotas raciais em universidades, e na ADC 41, sobre a Lei de Cotas em concursos públicos federais), reconheceu a constitucionalidade das políticas de ação afirmativa baseadas em critério racial, entendendo que essas medidas, longe de violarem o princípio da igualdade, buscam efetivar sua dimensão material — reconhecendo que o tratamento estritamente formal e idêntico entre grupos que partem de posições estruturalmente desiguais (por razões históricas de discriminação e exclusão) pode, na prática, perpetuar essas desigualdades, e que medidas temporárias e proporcionais de compensação são compatíveis com a Constituição.
Exemplo: reservar uma parcela de vagas em concursos públicos federais para candidatos negros, como fez a Lei nº 12.990/2014, foi considerada constitucional pelo STF justamente sob esse fundamento de igualdade material, entendendo que a medida, ainda que trate diferentemente candidatos negros e não negros no processo seletivo, busca corrigir uma desigualdade histórica de acesso a oportunidades no serviço público.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
