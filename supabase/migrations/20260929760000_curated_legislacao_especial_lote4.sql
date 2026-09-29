-- Curated (authored) questions, Direito lote 16: mais Legislação
-- Especial. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-015',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Organização Criminosa',
  $q$Julgue o item a seguir, com base na Lei nº 12.850/2013.
Considera-se organização criminosa a associação de quatro ou mais pessoas estruturalmente ordenada e caracterizada pela divisão de tarefas, ainda que informalmente, com objetivo de obter, direta ou indiretamente, vantagem de qualquer natureza, mediante a prática de infrações penais cujas penas máximas sejam superiores a quatro anos, ou que sejam de caráter transnacional.$q$,
  'C',
  $q$Certo. O art. 1º, § 1º, da Lei nº 12.850/2013 define organização criminosa nesses exatos termos: associação de quatro ou mais pessoas estruturalmente ordenada e caracterizada pela divisão de tarefas, ainda que informalmente, com objetivo de obter, direta ou indiretamente, vantagem de qualquer natureza, mediante a prática de infrações penais cujas penas máximas sejam superiores a quatro anos, ou que sejam de caráter transnacional. A exigência de pelo menos quatro integrantes e de uma estrutura organizacional mínima (com divisão de papéis) distingue a organização criminosa de um simples concurso de pessoas eventual e desorganizado para a prática de um único crime.
Exemplo: um grupo estável, com hierarquia e funções bem definidas entre seus integrantes (um planeja, outro executa, outro lava o dinheiro, por exemplo), dedicado à prática reiterada de crimes graves, tende a se enquadrar no conceito legal de organização criminosa — diferente de duas pessoas que, isoladamente e sem qualquer estrutura organizacional, cometem um único crime em conjunto.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.850/2013 – Lei de Organização Criminosa','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'cbe51652-703c-468d-a370-58100d8ef40c', 'auth-leg-016',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Lavagem de Dinheiro',
  $q$Julgue o item a seguir, com base na Lei nº 9.613/1998.
Constitui crime de lavagem de dinheiro ocultar ou dissimular a natureza, origem, localização, disposição, movimentação ou propriedade de bens, direitos ou valores provenientes, direta ou indiretamente, de infração penal, não exigindo a lei um rol taxativo de crimes antecedentes específicos após as alterações promovidas pela Lei nº 12.683/2012.$q$,
  'C',
  $q$Certo. O art. 1º, caput, da Lei nº 9.613/1998 tipifica a lavagem de dinheiro como "ocultar ou dissimular a natureza, origem, localização, disposição, movimentação ou propriedade de bens, direitos ou valores provenientes, direta ou indiretamente, de infração penal". Antes da reforma promovida pela Lei nº 12.683/2012, a lei exigia que o dinheiro lavado tivesse origem em um rol taxativo e específico de crimes antecedentes (como tráfico de drogas, terrorismo, corrupção, entre outros expressamente listados). Após a reforma de 2012, esse rol taxativo foi eliminado: agora, qualquer infração penal (crime ou contravenção) pode, em tese, servir de base para a caracterização da lavagem de dinheiro, desde que os valores lavados decorram dela, ampliando significativamente o alcance do tipo penal.
Exemplo: antes de 2012, lavar dinheiro proveniente de um crime que não estivesse na lista específica da lei poderia não configurar lavagem de dinheiro; depois da reforma, praticamente qualquer origem infracional ilícita dos valores já é suficiente para configurar o crime de lavagem, desde que presentes os demais elementos do tipo penal.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.613/1998 – Lei de Lavagem de Dinheiro, com alterações da Lei nº 12.683/2012','url','https://www.planalto.gov.br/ccivil_03/leis/l9613.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '82857c23-6112-48ab-a1b2-733c5595cab8', 'auth-leg-017',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei Geral de Proteção de Dados',
  $q$Julgue o item a seguir, com base na Lei nº 13.709/2018 (LGPD).
A Lei Geral de Proteção de Dados Pessoais aplica-se a qualquer operação de tratamento de dados pessoais realizada por pessoa natural ou jurídica, de direito público ou privado, independentemente do meio, país de sede ou local de armazenamento dos dados, desde que a operação de tratamento seja realizada no território nacional.$q$,
  'C',
  $q$Certo. O art. 3º, inciso I, da Lei nº 13.709/2018 (LGPD) estabelece que essa lei se aplica a qualquer operação de tratamento realizada por pessoa natural ou por pessoa jurídica de direito público ou privado, independentemente do meio, do país de sua sede ou do país onde estejam localizados os dados, desde que a operação de tratamento seja realizada no território nacional. Isso significa que mesmo uma empresa estrangeira, sem sede formal no Brasil, pode estar sujeita à LGPD se realizar tratamento de dados pessoais dentro do território brasileiro (ou, conforme outros incisos do mesmo artigo, quando a atividade de tratamento tiver por objetivo a oferta de bens/serviços a pessoas no Brasil, ou quando os dados tratados tiverem sido coletados no território nacional).
Exemplo: uma empresa de tecnologia com sede em outro país, mas que oferece um aplicativo tratando dados pessoais de usuários localizados no Brasil, pode se sujeitar às regras da LGPD, mesmo sem ter escritório físico ou sede formal em território brasileiro — o que importa é a conexão da operação de tratamento com o Brasil, não apenas a nacionalidade formal da empresa.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.709/2018 – Lei Geral de Proteção de Dados Pessoais','url','https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '012bdb9d-f67d-48e9-911e-10be9fc9226e', 'auth-leg-018',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Estatuto da Segurança Privada',
  $q$Julgue o item a seguir, com base na Lei nº 14.967/2024.
A Lei do Estatuto da Segurança Privada estabelece regras sobre a atividade de segurança privada, patrimonial e pessoal, no Brasil, dispondo sobre requisitos para a constituição e funcionamento de empresas especializadas, bem como sobre a formação e o porte de arma de fogo pelos vigilantes que exercem a atividade.$q$,
  'C',
  $q$Certo. A Lei nº 14.967/2024 consolidou e atualizou a regulamentação da segurança privada no Brasil, estabelecendo requisitos para a constituição e funcionamento de empresas especializadas em vigilância patrimonial e em transporte de valores, além de disciplinar a formação profissional exigida dos vigilantes e as condições para o porte de arma de fogo no exercício dessa atividade específica — um regime diferenciado do porte de arma para civis em geral, justamente pela natureza da função exercida por esses profissionais, que atuam justamente na proteção de patrimônio e pessoas.
Exemplo: um vigilante que atua no transporte de valores segue um regime próprio de porte de arma de fogo, vinculado ao exercício de sua função regulamentada por essa lei específica, diferente do regime aplicável a um cidadão comum que busca autorização de porte para uso pessoal, fora do contexto de uma atividade profissional de segurança regulamentada.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.967/2024 – Estatuto da Segurança Privada','url','https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14967.htm')),
  'difícil', now()
);
