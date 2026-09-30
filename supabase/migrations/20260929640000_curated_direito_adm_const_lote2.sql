-- Curated (authored) questions, Direito lote 4: mais Direito
-- Administrativo e Direito Constitucional. Same approach as prior
-- lotes: original content, full legal audit.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-007',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Princípios — moralidade e eficiência',
  $q$Julgue o item a seguir.
O princípio da eficiência, incluído expressamente entre os princípios da administração pública pela Emenda Constitucional nº 19/1998, exige que a atuação administrativa busque os melhores resultados possíveis com os recursos disponíveis, não se limitando à mera legalidade formal do ato.$q$,
  'C',
  $q$Certo. O princípio da eficiência foi incorporado ao caput do art. 37 da Constituição Federal pela Emenda Constitucional nº 19/1998, justamente para reforçar que a administração pública não deve se contentar em apenas seguir formalmente a lei (legalidade), mas também buscar a melhor gestão possível dos recursos públicos, com qualidade, presteza e economicidade nos resultados alcançados. É um princípio que se soma aos demais (legalidade, impessoalidade, moralidade, publicidade), sem substituí-los — todos continuam obrigatórios simultaneamente.
Exemplo: um serviço público pode ser prestado dentro da lei (legal), mas de forma lenta, cara ou de baixa qualidade — a exigência de eficiência cobra que, além de legal, o serviço seja também bem executado, otimizando tempo e recursos em benefício do cidadão.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-008',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Recursos administrativos (Lei 9.784/1999)',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
Salvo disposição legal específica em contrário, o recurso administrativo tramitará no máximo por três instâncias administrativas, e o prazo para interposição de recurso é de dez dias, contado a partir da ciência ou divulgação oficial da decisão recorrida.$q$,
  'C',
  $q$Certo. O art. 57 da Lei nº 9.784/1999 estabelece que "o recurso administrativo tramitará no máximo por três instâncias administrativas, salvo disposição legal diversa", limitando, como regra geral, a quantidade de instâncias recursais dentro da própria administração. Já o art. 59, caput, fixa o prazo para interposição do recurso: "salvo disposição legal específica, é de dez dias o prazo para interposição de recurso administrativo, contado a partir da ciência ou divulgação oficial da decisão recorrida". Ambos os dispositivos são regras gerais supletivas, aplicáveis quando não houver previsão legal específica diferente para determinado tipo de processo.
Exemplo: se uma lei específica sobre determinado processo administrativo não estabelecer um prazo diferente para recurso, aplica-se automaticamente o prazo geral de dez dias da Lei nº 9.784/1999 — que funciona como uma "regra padrão" para todo o processo administrativo federal.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999 – Processo Administrativo Federal','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'd2bdb958-6b28-45c5-8da1-b29dbe72e905', 'auth-adm-009',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Regime Jurídico dos Servidores — Deveres e proibições',
  $q$Julgue o item a seguir, com base na Lei nº 8.112/1990.
Constitui dever do servidor público federal observar as normas legais e regulamentares, cumprindo com zelo e presteza as atribuições do cargo, sendo-lhe vedado, entre outras condutas, opor resistência injustificada ao andamento de documento e processo ou execução de serviço.$q$,
  'C',
  $q$Certo. O art. 116 da Lei nº 8.112/1990 lista os deveres do servidor público federal, entre eles "exercer com zelo e dedicação as atribuições do cargo" e "observar as normas legais e regulamentares". Já o art. 117 lista as condutas vedadas ao servidor, incluindo, no inciso XV, "opor resistência injustificada ao andamento de documento e processo ou execução de serviço" — comportamento que, na prática, corresponde a criar entraves deliberados e sem justificativa ao trâmite normal da administração, o que pode configurar infração disciplinar.
Exemplo: um servidor que, sem motivo legítimo, atrasa deliberadamente a tramitação de um processo administrativo sob sua responsabilidade — "engavetando" documentos sem justificativa — está incorrendo justamente nessa conduta vedada, sujeita a apuração disciplinar.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.112/1990 – Regime Jurídico dos Servidores Públicos Civis da União','url','https://www.planalto.gov.br/ccivil_03/leis/l8112compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '2e8560fa-c1c5-4753-8ec6-275261802195', 'auth-adm-010',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Administrativo', 'Anulação e revogação de atos administrativos',
  $q$Julgue o item a seguir.
A anulação de um ato administrativo decorre de vício de legalidade e produz efeitos retroativos (ex tunc), enquanto a revogação decorre de razões de conveniência e oportunidade e produz efeitos apenas para o futuro (ex nunc), respeitados os direitos adquiridos.$q$,
  'C',
  $q$Certo. Essa distinção é central na teoria dos atos administrativos: a ANULAÇÃO ocorre quando o ato apresenta algum vício de legalidade (foi praticado em desacordo com a lei), e, por corrigir uma ilegalidade desde a origem, seus efeitos retroagem ao momento em que o ato foi praticado (efeito ex tunc), como se o ato nunca tivesse produzido efeitos válidos. Já a REVOGAÇÃO ocorre quando um ato, embora legal, deixa de ser conveniente ou oportuno para a administração — nesse caso, os efeitos da revogação só valem a partir dali para frente (efeito ex nunc), preservando os efeitos já produzidos e os direitos adquiridos durante o período em que o ato esteve em vigor.
Exemplo: um ato administrativo ilegal, uma vez anulado, é tratado como se nunca tivesse existido validamente (ex tunc); já uma autorização legal que deixou de fazer sentido por mudança de circunstâncias pode ser revogada, mas quem já se beneficiou legitimamente dela antes da revogação mantém esse benefício (ex nunc).$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-004',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Direitos sociais',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São direitos sociais, nos termos do art. 6º da Constituição Federal, a educação, a saúde, a alimentação, o trabalho, a moradia, o transporte, o lazer, a segurança, a previdência social, a proteção à maternidade e à infância, e a assistência aos desamparados, entre outros previstos na Constituição.$q$,
  'C',
  $q$Certo. O art. 6º, caput, da CF/1988 elenca expressamente esses direitos sociais: "São direitos sociais a educação, a saúde, a alimentação, o trabalho, a moradia, o transporte, o lazer, a segurança, a previdência social, a proteção à maternidade e à infância, a assistência aos desamparados, na forma desta Constituição". Trata-se de um rol que já sofreu inclusões ao longo do tempo (como "moradia", incluída pela EC nº 26/2000, e "transporte", incluído pela EC nº 90/2015), refletindo uma característica dos direitos sociais: eles exigem, em regra, prestações positivas do Estado (políticas públicas, serviços) para sua efetivação, diferente dos direitos individuais clássicos, que costumam exigir principalmente uma abstenção do Estado.
Exemplo: o direito à saúde não se efetiva apenas com o Estado "não impedindo" alguém de buscar tratamento — exige que o Estado ative e mantenha um sistema de saúde pública (como o SUS) capaz de prestar esse atendimento, o que é típico da natureza prestacional dos direitos sociais.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'fácil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '913febb7-8618-4d32-b48d-069814380f64', 'auth-const-005',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Organização dos Poderes',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário, sendo vedado a qualquer um deles delegar atribuições, salvo nas hipóteses expressamente previstas na própria Constituição.$q$,
  'C',
  $q$Certo. O art. 2º da CF/1988 estabelece exatamente essa estrutura tripartite: "São Poderes da União, independentes e harmônicos entre si, o Legislativo, o Executivo e o Judiciário". A independência não significa isolamento total: os Poderes se relacionam por meio do sistema de freios e contrapesos (checks and balances), fiscalizando-se mutuamente dentro de limites constitucionais. Quanto à delegação de atribuições entre os Poderes, a regra geral é a vedação, admitindo-se exceções apenas quando a própria Constituição expressamente as autoriza — como ocorre, por exemplo, com as leis delegadas (art. 68), em que o Congresso Nacional pode delegar ao Presidente da República a elaboração de determinadas normas, dentro de limites e procedimentos constitucionalmente definidos.
Exemplo: o Judiciário não pode, por iniciativa própria, assumir a função de criar leis (papel do Legislativo), nem o Executivo pode, sem previsão constitucional específica, julgar processos (papel do Judiciário) — cada Poder tem sua esfera própria de atuação, com poucas e específicas exceções previstas na própria Constituição.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'ef9221e3-d6c4-4b76-b747-e1a1e89fc1a2', 'auth-const-006',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Constitucional', 'Direito de reunião e associação',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
O direito de reunião pacífica, sem armas, em locais abertos ao público, independe de autorização estatal, sendo suficiente o prévio aviso à autoridade competente, exceto quando outra reunião já estiver convocada para o mesmo local, hipótese em que se deve respeitar a prioridade da convocação anterior.$q$,
  'C',
  $q$Certo. O art. 5º, XVI, da CF/1988 assegura que "todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de autorização, desde que não frustrem outra reunião anteriormente convocada para o mesmo local, sendo apenas exigido prévio aviso à autoridade competente". O texto constitucional deixa claro que o Estado não precisa "autorizar" a reunião — trata-se de direito de exercício direto, condicionado apenas a: ser pacífica, sem armas, em local aberto ao público, com prévio aviso (não pedido de autorização) e sem conflitar com outra reunião já convocada anteriormente para o mesmo local.
Exemplo: um grupo que deseja fazer uma manifestação pacífica numa praça pública não precisa pedir "permissão" ao poder público para isso, apenas avisar previamente — mas, se outro grupo já havia convocado um evento para aquele mesmo local e horário, a reunião anterior tem prioridade, e o segundo grupo deve buscar outro local ou horário.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm')),
  'média', now()
);
