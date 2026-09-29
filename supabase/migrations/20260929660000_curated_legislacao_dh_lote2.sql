-- Curated (authored) questions, Direito lote 6: mais Legislação Especial
-- (ECA, Crimes Ambientais, Licitações) e Direitos Humanos. Same approach
-- as prior lotes: original content, full legal audit.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-005',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Estatuto da Criança e do Adolescente',
  $q$Julgue o item a seguir, com base na Lei nº 8.069/1990.
Considera-se criança, para os efeitos do Estatuto da Criança e do Adolescente, a pessoa até doze anos de idade incompletos, e adolescente aquela entre doze e dezoito anos de idade, sendo aplicáveis excepcionalmente as disposições do Estatuto às pessoas entre dezoito e vinte e um anos, nos casos expressos em lei.$q$,
  'C',
  $q$Certo. O art. 2º, caput, da Lei nº 8.069/1990 (Estatuto da Criança e do Adolescente) define exatamente essa distinção etária: criança é a pessoa até doze anos de idade incompletos, e adolescente é aquela entre doze e dezoito anos de idade. O parágrafo único do mesmo artigo prevê ainda a aplicação excepcional do Estatuto a pessoas entre dezoito e vinte e um anos, nos casos expressos em lei — por exemplo, em situações de medidas socioeducativas já em andamento que podem continuar sendo executadas mesmo após a maioridade civil, dentro dos limites legais estabelecidos.
Exemplo: um adolescente que comete um ato infracional pouco antes de completar dezoito anos pode continuar cumprindo medida socioeducativa determinada com base no Estatuto mesmo após atingir a maioridade, dentro do limite de até vinte e um anos previsto na lei, sem que isso signifique tratá-lo simplesmente como um adulto comum no sistema penal.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.069/1990 – Estatuto da Criança e do Adolescente','url','https://www.planalto.gov.br/ccivil_03/leis/l8069.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-006',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Estatuto da Criança e do Adolescente — ato infracional',
  $q$Julgue o item a seguir, com base na Lei nº 8.069/1990.
Considera-se ato infracional a conduta descrita como crime ou contravenção penal, praticada por criança ou adolescente, sendo que, no caso de ato infracional praticado por criança, aplicam-se medidas de proteção, e não medidas socioeducativas, exclusivas para adolescentes.$q$,
  'C',
  $q$Certo. O art. 103 do ECA define ato infracional como "a conduta descrita como crime ou contravenção penal", praticada por criança ou adolescente. Porém, o tratamento legal para cada faixa etária é diferente: às crianças que praticam ato infracional aplicam-se apenas medidas de PROTEÇÃO (previstas no art. 101 do ECA, como encaminhamento aos pais, orientação, tratamento etc.), já que crianças são consideradas inimputáveis e não sujeitas ao sistema socioeducativo propriamente dito; já aos adolescentes autores de ato infracional podem ser aplicadas medidas SOCIOEDUCATIVAS (art. 112), que vão desde a advertência até, em casos mais graves, a internação — um sistema próprio, diferente do sistema penal comum de adultos, mas com maior grau de responsabilização do que o aplicável às crianças.
Exemplo: uma criança de 9 anos que pratica uma conduta que, se cometida por um adulto, seria crime, não vai para nenhum tipo de "internação" — recebe medidas de proteção, como acompanhamento familiar ou psicológico; já um adolescente de 16 anos que comete um ato infracional grave pode, dependendo do caso, receber uma medida socioeducativa mais rigorosa, como a internação em unidade específica.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.069/1990 – Estatuto da Criança e do Adolescente','url','https://www.planalto.gov.br/ccivil_03/leis/l8069.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-007',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Crimes Ambientais',
  $q$Julgue o item a seguir, com base na Lei nº 9.605/1998.
A Lei de Crimes Ambientais prevê a responsabilização penal da pessoa jurídica nos casos em que a infração seja cometida por decisão de seu representante legal ou contratual, ou de seu órgão colegiado, no interesse ou benefício da sua entidade, sem prejuízo da responsabilização individual dos autores, coautores ou partícipes do mesmo fato.$q$,
  'C',
  $q$Certo. O art. 3º, caput, da Lei nº 9.605/1998 estabelece que "as pessoas jurídicas serão responsabilizadas administrativa, civil e penalmente conforme o disposto nesta Lei, nos casos em que a infração seja cometida por decisão de seu representante legal ou contratual, ou de seu órgão colegiado, no interesse ou benefício da sua entidade". O parágrafo único do mesmo artigo esclarece que essa responsabilização da pessoa jurídica não exclui a das pessoas físicas, autoras, coautoras ou partícipes do mesmo fato — ou seja, empresa e responsáveis individuais podem ser responsabilizados simultaneamente pelo mesmo crime ambiental.
Exemplo: se uma empresa despeja resíduos tóxicos ilegalmente em um rio por decisão de sua diretoria, tanto a empresa (pessoa jurídica) quanto os diretores que tomaram essa decisão (pessoas físicas) podem responder, cada um dentro de sua esfera de responsabilidade, pelo mesmo crime ambiental — não é "ou uma coisa ou outra", pode ser as duas ao mesmo tempo.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.605/1998 – Crimes Ambientais','url','https://www.planalto.gov.br/ccivil_03/leis/l9605.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '9dfc55b7-7ad4-4b76-9b5f-ea1a7a421254', 'auth-leg-008',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Licitações e Contratos (Lei 14.133/2021)',
  $q$Julgue o item a seguir, com base na Lei nº 14.133/2021.
A Nova Lei de Licitações e Contratos Administrativos estabelece, entre os princípios expressamente aplicáveis às licitações, o julgamento objetivo das propostas, de modo a reduzir a discricionariedade do agente público na escolha do vencedor do certame, com base em critérios previamente definidos no edital.$q$,
  'C',
  $q$Certo. O art. 5º da Lei nº 14.133/2021 lista uma série de princípios aplicáveis à licitação, entre eles o julgamento objetivo. Esse princípio busca justamente reduzir a margem de subjetividade e discricionariedade do agente público responsável pelo julgamento das propostas: os critérios de avaliação (como menor preço, melhor técnica, técnica e preço, entre outros previstos na lei) devem estar claramente definidos no edital, de forma que a escolha do vencedor decorra da aplicação desses critérios pré-estabelecidos, e não de uma avaliação pessoal e subjetiva de quem julga as propostas.
Exemplo: se o edital estabelece "menor preço" como critério de julgamento, a escolha do vencedor deve seguir estritamente esse critério objetivo entre as propostas que atendem aos requisitos mínimos — o agente público não pode escolher outro concorrente com preço mais alto só porque, na sua opinião pessoal, "gostou mais" da proposta dele.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.133/2021 – Nova Lei de Licitações e Contratos Administrativos','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'afaf633e-5b3a-4ed9-96ae-a1a9a352c339', 'auth-dh-006',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Regras de Mandela',
  $q$Julgue o item a seguir.
As Regras Mínimas das Nações Unidas para o Tratamento de Reclusos (Regras de Mandela) estabelecem parâmetros internacionais sobre condições de encarceramento, vedando expressamente o isolamento solitário indefinido e o isolamento solitário prolongado (definido como aquele que excede 15 dias consecutivos), por considerá-los formas de tratamento cruel, desumano ou degradante.$q$,
  'C',
  $q$Certo. As Regras Mínimas das Nações Unidas para o Tratamento de Reclusos, revisadas e rebatizadas de "Regras de Mandela" em 2015, tratam especificamente do isolamento solitário na Regra 43 e na Regra 45: o isolamento solitário só deve ser usado em circunstâncias excepcionais, como último recurso, pelo menor tempo possível, e a própria regra 44 define "isolamento solitário prolongado" como aquele que excede 15 dias consecutivos — sendo tanto o isolamento indefinido quanto o prolongado (acima desse limite) considerados formas de tratamento cruel, desumano ou degradante, incompatíveis com os padrões internacionais de direitos humanos aplicáveis a pessoas privadas de liberdade.
Exemplo: uma medida disciplinar de isolamento aplicada a um preso por um período curto e determinado, como sanção pontual a uma falta grave, pode estar dentro dos parâmetros aceitos; mas manter alguém isolado por meses, sem prazo definido de término, contraria diretamente o padrão internacional estabelecido pelas Regras de Mandela.$q$,
  jsonb_build_array(jsonb_build_object('title','Regras Mínimas das Nações Unidas para o Tratamento de Reclusos (Regras de Mandela, ONU, 2015)','url','https://www.unodc.org/documents/justice-and-prison-reform/Nelson_Mandela_Rules-P-ebook.pdf')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a575269f-0315-4e3c-b7fa-14f3cfa05c8a', 'auth-dh-007',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direitos Humanos', 'Igualdade e não discriminação',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O princípio da igualdade, previsto no art. 5º, caput, da Constituição Federal, não veda todo e qualquer tratamento diferenciado entre as pessoas, admitindo distinções desde que fundadas em critério razoável e proporcional ao fim constitucionalmente legítimo perseguido.$q$,
  'C',
  $q$Certo. O art. 5º, caput, da CF/1988 estabelece que "todos são iguais perante a lei, sem distinção de qualquer natureza". Mas a doutrina constitucional consolidada entende que a igualdade formal absoluta e cega a qualquer diferença concreta acabaria gerando, na prática, mais injustiça do que justiça — por isso se fala em igualdade material, que admite tratamento diferenciado quando há um critério de discriminação razoável e proporcional, voltado a corrigir desigualdades reais ou a atender a uma finalidade constitucionalmente legítima, como ocorre, por exemplo, com políticas de ação afirmativa (cotas) voltadas a grupos historicamente marginalizados.
Exemplo: reservar vagas em concursos públicos para pessoas com deficiência não fere o princípio da igualdade — ao contrário, busca justamente compensar uma desigualdade de oportunidades preexistente, tratando de forma diferente situações que já são, de fato, desiguais, com o objetivo legítimo de promover maior igualdade material de acesso.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
