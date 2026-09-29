-- Curated (authored) questions, Direito lote 7: mais Direito
-- Administrativo (bens públicos, responsabilidade civil do Estado) e
-- Direito Constitucional (controle de constitucionalidade). Same
-- approach as prior lotes: original content, full legal audit.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-011',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Responsabilidade civil do Estado',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
As pessoas jurídicas de direito público e as de direito privado prestadoras de serviços públicos responderão pelos danos que seus agentes, nessa qualidade, causarem a terceiros, sob a modalidade objetiva, assegurado o direito de regresso contra o responsável nos casos de dolo ou culpa.$q$,
  'C',
  $q$Certo. O art. 37, § 6º, da CF/1988 estabelece exatamente essa regra de responsabilidade civil objetiva do Estado (e de entes privados prestadores de serviço público): "As pessoas jurídicas de direito público e as de direito privado prestadoras de serviços públicos responderão pelos danos que seus agentes, nessa qualidade, causarem a terceiros, assegurado o direito de regresso contra o responsável nos casos de dolo ou culpa". Sendo objetiva, a responsabilidade do Estado não exige que se prove dolo ou culpa do agente público para que a vítima seja indenizada — basta demonstrar o dano, a conduta do agente público no exercício da função, e o nexo de causalidade entre eles. Já a responsabilidade do agente perante o Estado (ação de regresso) continua sendo subjetiva, exigindo prova de dolo ou culpa desse agente.
Exemplo: se um servidor público, no exercício de sua função, causa um dano a um cidadão, este pode processar diretamente o Estado, sem precisar provar que o servidor agiu com culpa; depois de indenizar a vítima, é o Estado quem pode, então, cobrar do servidor (ação regressiva), mas nessa segunda etapa já é preciso provar dolo ou culpa dele.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-012',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Bens públicos',
  $q$Julgue o item a seguir.
Os bens públicos de uso comum do povo e de uso especial são, em regra, inalienáveis enquanto conservarem essa qualificação jurídica, podendo, contudo, ser desafetados por lei ou ato administrativo específico, hipótese em que passam a integrar a categoria de bens dominicais, tornando-se, então, alienáveis nas condições estabelecidas em lei.$q$,
  'C',
  $q$Certo. Os bens públicos se classificam, quanto à destinação, em bens de uso comum do povo (como ruas, praças, praias), bens de uso especial (como edifícios onde funcionam repartições públicas) e bens dominicais (que não têm destinação pública específica, integrando o patrimônio disponível do Estado, como imóveis desocupados). Enquanto classificados como de uso comum ou de uso especial, os bens públicos são, em regra, inalienáveis — não podem ser vendidos. Porém, é possível "desafetá-los" (retirar sua destinação pública específica) por lei ou ato administrativo, fazendo-os migrar para a categoria de bens dominicais, que, esses sim, podem ser alienados, observadas as condições e formalidades legais (como licitação, quando exigível).
Exemplo: uma escola pública desativada (bem de uso especial) pode ser formalmente desafetada dessa finalidade por ato do poder público, passando a ser um bem dominical, e só então tornar-se passível de venda ou de outra forma de alienação, seguindo os procedimentos legais aplicáveis.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-013',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Regime disciplinar (Lei 8.112/1990) — sindicância e PAD',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
As sanções de advertência e de suspensão de até 30 dias poderão ser aplicadas com base em sindicância, procedimento sumário que independe da instauração de processo administrativo disciplinar, quando não for aplicável penalidade mais grave.$q$,
  'C',
  $q$Certo. O art. 145 da Lei nº 8.112/1990 estabelece que, "da sindicância poderá resultar: I – arquivamento do processo; II – aplicação de penalidade de advertência ou suspensão de até 30 (trinta) dias; III – instauração de processo disciplinar". Ou seja, para infrações menos graves, cujas penalidades cabíveis sejam apenas advertência ou suspensão de até 30 dias, a própria sindicância (procedimento mais simples e célere) já pode servir de base para a aplicação da penalidade, sem necessidade de instaurar o processo administrativo disciplinar (PAD) completo, mais formal e demorado, reservado a infrações mais graves ou quando a sindicância assim recomendar.
Exemplo: um atraso reiterado e injustificado ao trabalho, de menor gravidade, pode ser apurado e punido com advertência já na fase de sindicância; já uma suspeita de corrupção, por ser infração muito mais grave, normalmente exige a instauração do processo disciplinar completo, com todas as suas etapas formais.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-007',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Controle de constitucionalidade',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
No controle difuso de constitucionalidade, qualquer juiz ou tribunal, no julgamento de um caso concreto, pode deixar de aplicar uma lei por considerá-la inconstitucional, produzindo essa decisão, em regra, efeitos apenas entre as partes do processo (inter partes), diferentemente do controle concentrado, exercido perante o STF, cuja decisão em ação direta tem, em regra, eficácia contra todos (erga omnes).$q$,
  'C',
  $q$Certo. O sistema brasileiro de controle de constitucionalidade admite duas vias principais: o controle DIFUSO (ou incidental), no qual qualquer juiz ou tribunal, ao julgar um caso concreto, pode reconhecer a inconstitucionalidade de uma lei como questão prejudicial ao mérito da causa, produzindo, em regra, efeitos apenas entre as partes daquele processo específico (inter partes) e a partir da decisão (em regra, retroativos ao caso concreto, mas limitados a ele); e o controle CONCENTRADO (ou abstrato), exercido perante o Supremo Tribunal Federal por meio de ações diretas (como a ADI), cuja decisão de mérito tem, em regra, eficácia contra todos (erga omnes) e efeito vinculante em relação aos demais órgãos do Judiciário e à administração pública.
Exemplo: um juiz de primeira instância pode, num processo específico entre duas partes, deixar de aplicar uma lei que considera inconstitucional apenas para aquele caso (controle difuso); já uma decisão do STF numa ADI julgando uma lei inconstitucional vale para todo mundo, em todo o país, de uma só vez (controle concentrado).$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-008',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Estado de defesa e estado de sítio',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O estado de defesa pode ser decretado pelo Presidente da República, ouvidos o Conselho da República e o Conselho de Defesa Nacional, para preservar ou restabelecer, em locais restritos e determinados, a ordem pública ou a paz social ameaçadas por grave e iminente instabilidade institucional ou atingidas por calamidades de grandes proporções na natureza.$q$,
  'C',
  $q$Certo. O art. 136, caput, da CF/1988 estabelece justamente essa competência e esses requisitos para a decretação do estado de defesa: o Presidente da República pode decretá-lo, ouvidos o Conselho da República e o Conselho de Defesa Nacional, para preservar ou restabelecer, em locais restritos e determinados, a ordem pública ou a paz social ameaçadas por grave e iminente instabilidade institucional, ou atingidas por calamidades de grandes proporções na natureza. É uma medida excepcional e territorialmente limitada, diferente do estado de sítio (art. 137), que é ainda mais grave e pode abranger todo o território nacional, exigindo, além disso, prévia autorização do Congresso Nacional.
Exemplo: uma calamidade natural severa e localizada, que comprometa a ordem numa determinada região do país, pode justificar a decretação de estado de defesa restrito àquela área específica — diferente de uma crise institucional de escala nacional, que poderia, em tese, justificar a medida mais drástica do estado de sítio, com autorização prévia do Congresso.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
);
