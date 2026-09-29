-- Curated (authored) questions, Direito lote 36: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-033',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Agências reguladoras',
  $q$Julgue o item a seguir.
As agências reguladoras são autarquias em regime especial, criadas por lei específica, cuja principal peculiaridade em relação às autarquias comuns é a maior autonomia administrativa, financeira e, sobretudo, a estabilidade de seus dirigentes, nomeados para mandato fixo, não coincidente com o mandato do chefe do Poder Executivo, e demissíveis apenas nas hipóteses previstas em lei.$q$,
  'C',
  $q$Certo. As agências reguladoras (como ANATEL, ANEEL, ANVISA, entre outras) são classificadas doutrinariamente como autarquias em regime especial, criadas por lei específica para regular determinados setores da economia ou de serviços públicos, com maior grau de especialização técnica. A principal característica que as distingue das autarquias comuns é justamente o reforço da autonomia — inclusive a estabilidade de seus dirigentes, geralmente nomeados para mandato de duração fixa, não coincidente com o mandato do chefe do Executivo que os indicou, e sujeitos a exoneração apenas nas hipóteses expressamente previstas em lei (como renúncia, condenação judicial transitada em julgado, ou processo administrativo disciplinar específico) — o que busca blindar a agência de ingerências políticas de curto prazo, garantindo maior continuidade e independência técnica na regulação do setor.
Exemplo: um dirigente de agência reguladora nomeado para mandato de quatro anos não pode, em regra, ser simplesmente exonerado a critério político do novo governo que assume, ainda que haja mudança de presidente durante seu mandato — essa estabilidade especial visa proteger a atuação técnica e imparcial da agência das oscilações político-eleitorais de curto prazo.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-034',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Licença e afastamento do servidor (Lei 8.112/1990)',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
O servidor poderá ser licenciado, entre outras hipóteses, para tratar de interesses particulares, a critério da administração, hipótese em que a licença não é remunerada, sendo vedada sua concessão quando o servidor estiver em estágio probatório.$q$,
  'C',
  $q$Certo. O art. 91 da Lei nº 8.112/1990 estabelece que, "a critério da Administração, poderão ser concedidas ao servidor ocupante de cargo efetivo, desde que não esteja em estágio probatório, licenças para o trato de assuntos particulares pelo prazo de até três anos consecutivos, sem remuneração". Dois elementos essenciais desse dispositivo: a licença é discricionária (concedida "a critério da Administração", não sendo direito automático do servidor mediante simples requerimento) e não remunerada durante o período de afastamento; além disso, a lei expressamente veda sua concessão a servidor que ainda esteja em estágio probatório, período em que ele ainda está sendo avaliado quanto à sua aptidão para o cargo, sendo incompatível conceder-lhe, nesse momento, um afastamento tão prolongado.
Exemplo: um servidor efetivo, já estável, que deseja se afastar temporariamente para cuidar de assuntos pessoais (como um negócio próprio ou questões familiares) pode requerer essa licença, mas ela depende da avaliação discricionária da administração sobre a conveniência de concedê-la, e não implica pagamento de remuneração durante o período afastado.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-021',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Direitos políticos',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São condições de elegibilidade, na forma da lei, entre outras, a nacionalidade brasileira, o pleno exercício dos direitos políticos, o alistamento eleitoral, o domicílio eleitoral na circunscrição e a filiação partidária, sendo a idade mínima variável conforme o cargo disputado.$q$,
  'C',
  $q$Certo. O art. 14, § 3º, da CF/1988 lista as condições de elegibilidade, na forma da lei: nacionalidade brasileira; pleno exercício dos direitos políticos; alistamento eleitoral; domicílio eleitoral na circunscrição; filiação partidária; e idade mínima, que varia conforme o cargo pretendido, conforme o § 3º, inciso VI (por exemplo, 35 anos para Presidente e Senador, 30 anos para Governador, 21 anos para Deputado, e 18 anos para Vereador). Essas condições cumulativas precisam estar presentes para que uma pessoa possa se candidatar validamente a um cargo eletivo, cada uma delas com sua função específica na garantia de um processo eleitoral organizado e representativo.
Exemplo: um cidadão brasileiro naturalizado (que atende à condição de nacionalidade), maior de idade, com título de eleitor regular no domicílio onde pretende se candidatar, e filiado a um partido político, mas que ainda não completou a idade mínima exigida para o cargo específico que deseja disputar (por exemplo, 35 anos para concorrer a Senador), não atende, nesse quesito, às condições de elegibilidade para aquele cargo específico, ainda que preencha todos os demais requisitos.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
