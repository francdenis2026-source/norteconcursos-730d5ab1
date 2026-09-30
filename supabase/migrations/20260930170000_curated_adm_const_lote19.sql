-- Curated (authored) questions, Direito lote 58: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-045',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Extinção do contrato administrativo',
  $q$Julgue o item a seguir, com base na Lei nº 14.133/2021.
A rescisão do contrato administrativo pode ocorrer, entre outras hipóteses, por ato unilateral da administração, por acordo entre as partes, ou por decisão judicial ou arbitral, sendo a rescisão unilateral prerrogativa exclusiva da administração, não sendo facultada ao contratado promover a rescisão unilateral do ajuste, ainda que a administração descumpra suas obrigações contratuais.$q$,
  'E',
  $q$Errado. Embora a rescisão unilateral por ato da administração seja, de fato, uma prerrogativa exclusiva do poder público (cláusula exorbitante), a afirmação está errada ao dizer que o contratado nunca pode, em nenhuma hipótese, buscar a extinção do contrato diante de descumprimento da administração. A Lei nº 14.133/2021 prevê, no art. 137, hipóteses em que o contratado pode requerer, judicialmente ou perante a própria administração, a rescisão do contrato em razão de inadimplemento da administração pública (como atraso de pagamentos superior a determinado prazo) — o contratado não tem o mesmo poder de simplesmente rescindir unilateralmente e por conta própria, sem qualquer formalidade, mas pode buscar a extinção do vínculo contratual diante de descumprimentos graves da administração, o que não se confunde com a prerrogativa de rescisão unilateral automática que a administração possui.
Exemplo: se a administração deixa de efetuar pagamentos devidos ao contratado por um período prolongado além do limite legal, o contratado pode buscar a extinção do contrato, seja por via administrativa, seja por via judicial ou arbitral, mesmo não tendo a mesma prerrogativa de simplesmente decidir, por ato próprio e unilateral, encerrar o vínculo como a administração pode fazer.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.133/2021 – Nova Lei de Licitações e Contratos Administrativos','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-030',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Sistema tributário — princípios constitucionais',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
É vedado à União, aos Estados, ao Distrito Federal e aos Municípios cobrar tributos no mesmo exercício financeiro em que haja sido publicada a lei que os instituiu ou aumentou, princípio conhecido como anterioridade tributária, ressalvadas as exceções expressamente previstas na própria Constituição.$q$,
  'C',
  $q$Certo. O art. 150, inciso III, alínea "b", da CF/1988 estabelece o princípio da anterioridade tributária (também chamado de anterioridade de exercício): é vedado aos entes federativos cobrar tributos no mesmo exercício financeiro em que haja sido publicada a lei que os instituiu ou aumentou. Esse princípio garante segurança jurídica e previsibilidade ao contribuinte, evitando cobranças tributárias surpresa dentro do mesmo ano fiscal. A própria Constituição prevê exceções expressas a essa regra (como determinados impostos de caráter extrafiscal, ligados a política econômica de curto prazo, como II, IE, IPI e IOF, entre outras hipóteses específicas listadas no § 1º do mesmo artigo), que podem ter cobrança imediata, sem se submeter à anterioridade anual.
Exemplo: uma lei que aumenta determinado imposto e é publicada em dezembro de um ano só pode, em regra, gerar cobrança efetiva a partir do exercício financeiro seguinte (o próximo ano), e não já dentro daquele mesmo ano em que a lei foi publicada, salvo se o tributo específico estiver entre as exceções constitucionalmente previstas à anterioridade.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
