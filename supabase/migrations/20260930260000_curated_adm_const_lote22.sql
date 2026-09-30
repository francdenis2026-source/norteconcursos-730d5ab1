-- Curated (authored) questions, Direito lote 67: mais Direito
-- Administrativo e Direito Constitucional. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-048',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Súmula Vinculante nº 3 — Tribunal de Contas e contraditório',
  $q$Julgue o item a seguir, com base na jurisprudência do STF.
Segundo a Súmula Vinculante nº 3 do STF, nos processos perante o Tribunal de Contas da União asseguram-se o contraditório e a ampla defesa quando da decisão puder resultar anulação ou revogação de ato administrativo que beneficie o interessado, excetuada a apreciação da legalidade do ato de concessão inicial de aposentadoria, reforma e pensão.$q$,
  'C',
  $q$Certo. A Súmula Vinculante nº 3 do STF estabelece: "Nos processos perante o Tribunal de Contas da União asseguram-se o contraditório e a ampla defesa quando da decisão puder resultar anulação ou revogação de ato administrativo que beneficie o interessado, excetuada a apreciação da legalidade do ato de concessão inicial de aposentadoria, reforma e pensão". Essa exceção específica reconhece que, no ato inicial de registro de aposentadoria, reforma ou pensão pelo TCU, não há um "processo" contraditório clássico no mesmo sentido — trata-se de um controle de legalidade que, historicamente, é tratado como ato administrativo complexo que só se aperfeiçoa com o registro do TCU, dispensando, nessa fase específica de apreciação inicial, o contraditório prévio do beneficiário, embora esse entendimento também comporte nuances quanto ao decurso de tempo entre a concessão e a análise do TCU.
Exemplo: se o TCU está analisando pela primeira vez a legalidade de uma aposentadoria recém-concedida (ato inicial de concessão), o servidor aposentado não tem, nessa fase específica, direito automático ao contraditório prévio perante o Tribunal — situação diferente de outras decisões do TCU que anulem atos já consolidados que beneficiem outros interessados, hipótese em que o contraditório e a ampla defesa são, em regra, assegurados.$q$,
  jsonb_build_array(jsonb_build_object('title','STF – Súmula Vinculante nº 3','url','https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=1209')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-033',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Ação civil pública e direitos coletivos',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O Ministério Público tem legitimidade constitucional para promover o inquérito civil e a ação civil pública, para a proteção do patrimônio público e social, do meio ambiente e de outros interesses difusos e coletivos, sem prejuízo da legitimidade de outros entes e associações previstos em lei para promover ações semelhantes.$q$,
  'C',
  $q$Certo. O art. 129, inciso III, da CF/1988 estabelece, entre as funções institucionais do Ministério Público, "promover o inquérito civil e a ação civil pública, para a proteção do patrimônio público e social, do meio ambiente e de outros interesses difusos e coletivos". O § 1º do mesmo artigo complementa que essa legitimação do Ministério Público não impede a de terceiros, nas mesmas hipóteses, segundo o disposto na Constituição e na lei — ou seja, a legitimidade do MP para tutelar interesses difusos e coletivos coexiste com a de outros legitimados previstos em legislação específica, como associações civis constituídas há determinado tempo e com finalidade estatutária compatível, a Defensoria Pública, e outros entes previstos na Lei de Ação Civil Pública e legislação correlata.
Exemplo: tanto o Ministério Público quanto uma associação de defesa do consumidor devidamente constituída podem, em suas respectivas esferas de legitimação, ajuizar ação civil pública para proteger interesses coletivos de consumidores lesados por uma prática comercial ilegal, sem que a legitimidade de um exclua a do outro.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
