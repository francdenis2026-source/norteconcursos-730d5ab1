-- Curated (authored) questions, Direito lote 26: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-025',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Improbidade administrativa — sanções',
  $q$Julgue o item a seguir, com base na Lei nº 8.429/1992, com as alterações da Lei nº 14.230/2021.
Constituem sanções aplicáveis aos atos de improbidade administrativa, entre outras, o ressarcimento integral do dano, quando houver, a perda da função pública, a suspensão dos direitos políticos e o pagamento de multa civil, variando a gravidade conforme a modalidade de improbidade praticada.$q$,
  'C',
  $q$Certo. O art. 12 da Lei nº 8.429/1992 (com a redação dada pela Lei nº 14.230/2021) prevê um sistema de sanções aplicáveis aos atos de improbidade, incluindo o ressarcimento integral do dano, quando houver; a perda da função pública; a suspensão dos direitos políticos; e o pagamento de multa civil, entre outras sanções previstas nos incisos do dispositivo. A gravidade e a extensão dessas sanções variam conforme a modalidade de improbidade praticada — atos que importam enriquecimento ilícito (art. 9º), os que causam prejuízo ao erário (art. 10) e os que atentam contra os princípios da administração pública (art. 11) têm faixas de penalidades diferentes, refletindo a diferente gravidade de cada categoria.
Exemplo: um agente que se enriquece ilicitamente às custas do erário público tende a sofrer sanções mais severas (incluindo suspensão de direitos políticos por período mais longo) do que um agente que praticou uma violação mais branda dos princípios administrativos, sem enriquecimento pessoal ou prejuízo financeiro direto ao erário — a lei diferencia o tratamento conforme a modalidade e a gravidade da conduta.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.429/1992 – Lei de Improbidade Administrativa, com alterações da Lei nº 14.230/2021','url','https://www.planalto.gov.br/ccivil_03/leis/l8429.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-026',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Estágio probatório e estabilidade (Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
O servidor nomeado para cargo de provimento efetivo adquirirá estabilidade no serviço público ao completar três anos de efetivo exercício, período em que sua aptidão e capacidade para o desempenho do cargo serão objeto de avaliação de desempenho.$q$,
  'C',
  $q$Certo. O art. 21 da Lei nº 8.112/1990, combinado com o art. 41, caput, da Constituição Federal (na redação dada pela Emenda Constitucional nº 19/1998), estabelece que o servidor público nomeado para cargo de provimento efetivo adquire estabilidade após três anos de efetivo exercício, período conhecido como estágio probatório, durante o qual sua aptidão e capacidade são avaliadas para determinar sua confirmação (ou não) no cargo. É importante notar que, antes da EC nº 19/1998, esse prazo era de dois anos — a exigência de três anos passou a valer justamente para alinhar o período de estágio probatório ao mesmo prazo constitucional de aquisição de estabilidade, evitando discrepâncias entre os dois institutos.
Exemplo: um servidor recém-nomeado passa por um período de avaliação contínua durante seus três primeiros anos de exercício efetivo no cargo, e só após cumprir esse prazo, com avaliação favorável, é que adquire a estabilidade que dificulta sua exoneração ou demissão sem processo administrativo específico que a justifique.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm'),jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-017',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Mandado de segurança',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Conceder-se-á mandado de segurança para proteger direito líquido e certo, não amparado por habeas corpus ou habeas data, quando o responsável pela ilegalidade ou abuso de poder for autoridade pública ou agente de pessoa jurídica no exercício de atribuições do Poder Público.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LXIX, da CF/1988 estabelece que "conceder-se-á mandado de segurança para proteger direito líquido e certo, não amparado por habeas corpus ou habeas data, quando o responsável pela ilegalidade ou abuso de poder for autoridade pública ou agente de pessoa jurídica no exercício de atribuições do Poder Público". O mandado de segurança é, portanto, um remédio constitucional residual em relação ao habeas corpus (que protege especificamente a liberdade de locomoção) e ao habeas data (que protege especificamente o acesso e a retificação de dados pessoais) — sendo cabível para proteger qualquer outro direito líquido e certo (comprovável de plano, sem necessidade de dilação probatória) violado por ilegalidade ou abuso de poder de autoridade pública ou de agente que exerça, ainda que privado, atribuições delegadas do Poder Público.
Exemplo: um candidato que teve indevidamente negada sua inscrição num concurso público, com base em critério manifestamente ilegal, e cujo direito à inscrição pode ser comprovado documentalmente de plano (sem necessidade de produção de provas mais complexas), pode buscar mandado de segurança para proteger esse direito líquido e certo, já que não se trata de matéria própria de habeas corpus nem de habeas data.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
