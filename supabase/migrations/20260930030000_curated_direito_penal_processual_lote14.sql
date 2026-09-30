-- Curated (authored) questions, Direito lote 43: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-028',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Teoria do crime — culpabilidade',
  $q$Julgue o item a seguir.
São elementos da culpabilidade, segundo a teoria finalista adotada predominantemente pelo Código Penal brasileiro, a imputabilidade, a potencial consciência da ilicitude e a exigibilidade de conduta diversa, sendo a ausência de qualquer um desses elementos suficiente para excluir a culpabilidade do agente, ainda que o fato seja típico e ilícito.$q$,
  'C',
  $q$Certo. Sob a ótica da teoria finalista da ação (adotada, com adaptações, pelo Código Penal brasileiro desde a reforma de 1984), a culpabilidade é composta por três elementos: a imputabilidade (capacidade mental do agente de entender o caráter ilícito do fato e de se determinar conforme esse entendimento); a potencial consciência da ilicitude (possibilidade de o agente, nas circunstâncias, ter consciência de que seu ato era proibido); e a exigibilidade de conduta diversa (possibilidade de, nas circunstâncias concretas, se esperar que o agente tivesse agido de forma diferente, conforme o direito). A ausência de qualquer um desses três elementos é suficiente para excluir a culpabilidade — mesmo que o fato seja típico (encaixe-se na descrição legal do crime) e ilícito (contrário ao direito), sem culpabilidade não há crime completo, pois este exige a presença simultânea de tipicidade, ilicitude e culpabilidade.
Exemplo: um agente que, sob coação moral irresistível, pratica um crime — sem que fosse razoável esperar que ele resistisse a essa coação naquele contexto específico — pode ter sua culpabilidade excluída por ausência de exigibilidade de conduta diversa, ainda que o fato praticado seja, em si, típico e ilícito.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-023',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Indulto e graça no processo de execução',
  $q$Julgue o item a seguir, com base no Código de Processo Penal e na legislação correlata.
O indulto, tradicionalmente concedido por decreto do Presidente da República, extingue ou substitui a pena de determinada categoria de condenados, geralmente de forma coletiva e impessoal, diferentemente da graça, também de competência presidencial, mas de natureza individual, concedida em favor de um condenado específico, mediante provocação.$q$,
  'C',
  $q$Certo. Tanto o indulto quanto a graça são competência do Presidente da República (art. 84, XII, da CF/1988), mas se distinguem pela abrangência: o INDULTO é concedido de forma coletiva e impessoal, por decreto, beneficiando uma categoria de condenados que preencham determinados requisitos objetivos previstos no próprio decreto (por exemplo, condenados a penas até determinado limite, com bom comportamento carcerário), sem individualização prévia dos beneficiários; já a GRAÇA (também chamada de indulto individual) é concedida em favor de um condenado específico, geralmente mediante provocação (pedido) da defesa ou de outras partes interessadas, analisando-se as circunstâncias particulares daquele caso individual.
Exemplo: um decreto presidencial de indulto de fim de ano, aplicável genericamente a todos os condenados que atendam a certos critérios objetivos (como tempo de pena cumprido e boa conduta), é bem diferente de um pedido de graça formulado especificamente em favor de um único condenado, analisando as particularidades daquele caso específico para uma eventual concessão individualizada do benefício.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
);
