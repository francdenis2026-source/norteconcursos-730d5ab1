-- Explicações do dia a dia: DEPEN 2021 (Departamento Penitenciário Nacional /
-- Agente Federal de Execução Penal, CEBRASPE) — lote 3: itens 45-62 do
-- caderno, bloco "Direito Penal e Processual Penal" do topic_map.
--
-- Fonte: supabase/migrations/20260927003000_depen_2021_reimport_fixed.sql
-- (versão final e corrigida da reimportação). topic_map ali confirma:
--   45-62  Direito Penal e Processual Penal
--
-- question_text é a transcrição verbatim do caderno de provas fornecido pelo
-- candidato; official_answer conferido no gabarito definitivo (MATRIZ_541_
-- DEPEN_008_00, CB2 e CG2).
--
-- career_name para DEPEN 2021 está gravado como 'Departamento Penitenciário
-- Nacional' (igual a contest_name), confirmado nas migrações anteriores; as
-- cláusulas WHERE abaixo copiam esse valor literalmente.
--
-- ITENS 52 e 54 (official_answer='X') são anulados e não são tocados aqui.
--
-- AUTOSSUFICIÊNCIA: todo o bloco 45-62 traz o enunciado completo dentro do
-- próprio question_text (hipóteses fechadas embutidas na assertiva, ao
-- contrário do bloco de Língua Portuguesa que depende de um texto-base não
-- gravado). Ainda assim, o ITEM 58 foi deixado de fora deste lote: seu
-- enunciado usa o termo "rejeitar a denúncia... pela resposta do acusado",
-- que mistura, de forma imprecisa, dois institutos distintos do CPP
-- (rejeição liminar da denúncia, art. 395, anterior à resposta à acusação; e
-- absolvição sumária, art. 397, posterior à resposta) — não há certeza
-- suficiente sobre qual dispositivo o examinador realmente tinha em mente
-- para escrever uma explicação correta e honesta. Fica em under_review para
-- revisão humana com acesso ao padrão de resposta oficial do CEBRASPE.
--
-- VERIFICAÇÃO DE VIGÊNCIA (nesta sessão, 29/09/2026, texto compilado do
-- Planalto):
--   - Código Penal (Decreto-Lei nº 2.848/1940), compilado em
--     planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm:
--     art. 1º (legalidade), art. 2º (abolitio criminis / retroatividade
--     benéfica), art. 23, III (excludente do estrito cumprimento do dever
--     legal), art. 158 (extorsão), art. 299 (falsidade ideológica), art. 329
--     (resistência) e art. 331 (desacato) conferidos — nenhum revogado ou
--     alterado de modo a afetar as questões abaixo.
--   - Código de Processo Penal (Decreto-Lei nº 3.689/1941), compilado em
--     planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm:
--     art. 2º (lei processual aplica-se desde logo, sem prejuízo da validade
--     dos atos já realizados), art. 5º, §5º (ação penal privada), art. 28-A,
--     caput (acordo de não persecução penal — confissão formal e
--     circunstanciada, incluído pela Lei nº 13.964/2019, com ADI 6.298 ainda
--     pendente de julgamento no STF mas dispositivo em pleno vigor), art. 61
--     (extinção da punibilidade declarada de ofício em qualquer fase), art.
--     295, §4º (preso especial não é transportado junto com preso comum) e
--     art. 310 (audiência de custódia — redação atualizada pela Lei nº
--     15.358/2026, sem previsão de interrogatório do preso como um de seus
--     atos) e art. 654, caput (habeas corpus impetrável também pelo
--     Ministério Público) conferidos — todos vigentes.
--   - Item 50 (crime-meio/crime-fim, subsidiariedade x consunção) e item 47
--     (admissibilidade de tentativa no crime de extorsão) apoiam-se em
--     doutrina penal consolidada sobre concurso aparente de normas e sobre a
--     teoria geral da tentativa (art. 14, II, do Código Penal, também
--     conferido vigente), não em dispositivo isolado sujeito a revogação.
--
-- Nenhum item deste lote sobrepõe os itens já cobertos pelos lotes 1 e 2
-- (13-19, 20-30, 3, 4, 5, 9). Apenas review_note e content_status são
-- alterados — official_answer não é tocado.

-- 45: excludente de ilicitude do estrito cumprimento do dever legal (CP,
-- art. 23, III) cobre o agente de segurança que repele agressão a refém
-- durante ação legítima.
update public.official_exam_questions set review_note=$q$Certo. O art. 23, III, do Código Penal prevê que não há crime quando o agente pratica o fato em "estrito cumprimento de dever legal". Um policial ou agente de segurança que reage para repelir uma agressão (ou risco de agressão) contra uma vítima mantida refém está agindo dentro das atribuições legais da sua função — usar a força necessária para proteger a vida do refém é, nesse contexto, o próprio cumprimento do dever, e não um excesso. Por isso, essa conduta é amparada pela excludente de ilicitude do estrito cumprimento do dever legal, que afasta o crime.
Exemplo: é como um bombeiro que arromba uma porta para salvar alguém de um incêndio — o ato, isolado, poderia parecer uma invasão, mas como está dentro do que a lei manda o bombeiro fazer naquela situação, não há crime.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=45 and content_status='under_review';

-- 46: falsidade ideológica (CP, art. 299) está no conteúdo do documento, não
-- na forma — por isso não depende de perícia grafotécnica/material.
update public.official_exam_questions set review_note=$q$Certo. Existem dois tipos principais de falsidade documental: a falsidade material, que altera a forma do documento (uma assinatura forjada, uma rasura, um papel adulterado), e a falsidade ideológica (art. 299 do Código Penal), em que o documento é formalmente autêntico e perfeito, mas contém uma declaração falsa em seu conteúdo (por exemplo, inserir uma informação mentirosa em um documento verdadeiro). Como a falsidade ideológica está no que está escrito, e não em características físicas do papel, da tinta ou da assinatura, não faz sentido submeter o documento a uma perícia técnica para detectar adulteração material — não há adulteração física a ser encontrada, só uma mentira no conteúdo, que se prova por outros meios (testemunhas, documentos contraditórios, confissão etc.).
Exemplo: é a diferença entre falsificar uma assinatura em um atestado médico verdadeiro (falsidade material, perícia grafotécnica ajuda) e um médico emitir, com sua própria assinatura autêntica, um atestado com diagnóstico inventado (falsidade ideológica — a perícia na assinatura não ajudaria em nada, porque ela é genuína).$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=46 and content_status='under_review';

-- 47: extorsão (CP, art. 158) admite tentativa — doutrina majoritária,
-- possível quando o iter criminis é fracionável (ex.: ameaça interceptada
-- antes de chegar à vítima).
update public.official_exam_questions set review_note=$q$Errado. A extorsão (art. 158 do Código Penal) admite tentativa, sim. A doutrina majoritária explica que, embora a extorsão seja um crime formal (se consuma com o constrangimento, independentemente de a vantagem econômica ser efetivamente obtida), o caminho até esse constrangimento pode ser fracionado em etapas — por exemplo, quando a ameaça é enviada por carta, mensagem ou terceiro e é interceptada antes de chegar ao conhecimento da vítima. Nesse caso, o agente já iniciou a execução do crime, mas não conseguiu, por circunstâncias alheias à sua vontade, produzir o constrangimento — que é exatamente a definição de tentativa (art. 14, II, do Código Penal).
Exemplo: alguém escreve um bilhete ameaçando a vítima para exigir dinheiro e o entrega a um mensageiro, mas o bilhete é interceptado pela polícia antes de chegar à vítima — o agente já agiu para constranger, só não conseguiu completar o crime por um motivo fora do seu controle: é tentativa de extorsão, não crime impossível nem fato atípico.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=47 and content_status='under_review';

-- 48: CP, art. 1º (legalidade) veda analogia in malam partem, mas a
-- interpretação/analogia favorável ao réu (in bonam partem) é admitida.
update public.official_exam_questions set review_note=$q$Errado. O princípio da legalidade (art. 1º do Código Penal — "não há crime sem lei anterior que o defina, não há pena sem prévia cominação legal") proíbe usar a analogia para criar crime ou agravar a pena de alguém (analogia in malam partem, contra o réu), porque isso violaria a garantia de que só a lei pode definir o que é crime. Mas essa proibição não é absoluta: quando a analogia é usada em favor do réu (in bonam partem) — por exemplo, para estender ao acusado um benefício ou uma causa de exclusão de pena que a lei previu para uma situação semelhante, mas não citou expressamente a dele — ela é aceita, porque não fere a garantia de legalidade: pelo contrário, amplia proteção ao indivíduo, e não a punição do Estado contra ele.
Exemplo: é como usar por analogia uma excludente prevista para uma situação parecida com a do réu, para livrá-lo de pena — isso é permitido; já criar um crime novo "por analogia" com outro, para condenar alguém que a lei não previu expressamente, isso é proibido.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=48 and content_status='under_review';

-- 49: CP, art. 2º, caput — abolitio criminis cessa apenas os efeitos penais
-- da condenação; efeitos civis (ex.: dever de indenizar) permanecem.
update public.official_exam_questions set review_note=$q$Errado. O art. 2º, caput, do Código Penal diz que, quando uma lei posterior deixa de considerar crime um fato (fenômeno chamado de "abolitio criminis"), cessam a execução e os efeitos PENAIS da sentença condenatória — a pessoa deixa de cumprir pena e perde os antecedentes criminais relativos àquele fato. Mas a lei fala apenas em efeitos penais: os efeitos CÍVEIS da condenação, como o dever de indenizar a vítima pelo dano causado, não são automaticamente apagados. A vítima continua podendo cobrar essa indenização na esfera civil, ainda que o fato tenha deixado de ser crime.
Exemplo: imagine que um fato deixe de ser crime por lei nova — quem foi condenado para de cumprir pena, mas se causou um prejuízo financeiro real a alguém, ainda pode ser cobrado por esse prejuízo na Justiça cível; uma coisa (punição penal) e outra (reparação do dano) seguem regras diferentes.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=49 and content_status='under_review';

-- 50: invadir residência para furtar é caso de CONSUNÇÃO (crime-meio
-- absorvido pelo crime-fim), não de subsidiariedade — distinção doutrinária
-- de concurso aparente de normas.
update public.official_exam_questions set review_note=$q$Errado. Quando um crime é praticado apenas como passagem necessária para cometer outro (o crime-meio existe só para viabilizar o crime-fim), a doutrina penal chama isso de CONSUNÇÃO, e não de subsidiariedade. Na consunção, o crime-meio é "absorvido" pelo crime-fim, e o agente responde só pelo crime-fim. A subsidiariedade é outra coisa: ocorre quando a própria lei (ou o contexto) prevê um crime como "reserva", aplicável apenas se um crime mais grave não se configurar — os dois tipos descrevem o mesmo bem jurídico em graus diferentes de gravidade, e não uma relação de meio para fim. No caso de Aldo, invadir a residência foi só o meio para chegar ao furto (o fim); a invasão é absorvida pelo furto — isso é consunção, não subsidiariedade.
Exemplo: matar alguém para depois ficar com seu carro (o roubo com resultado morte tem uma dinâmica parecida): o crime-meio "some" dentro do crime-fim mais grave, sendo o agente punido pelo conjunto — essa absorção é a lógica da consunção, diferente de uma norma que só vale "se não se aplicar outra mais grave" (que é a lógica da subsidiariedade).$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=50 and content_status='under_review';

-- 51: xingar agente federal de execução penal, em razão do cargo, mesmo
-- fora do exercício da função (encontro casual no shopping) configura
-- desacato (CP, art. 331 — "em razão dela").
update public.official_exam_questions set review_note=$q$Certo. O crime de desacato (art. 331 do Código Penal) não exige que o funcionário público esteja, no momento exato da ofensa, exercendo sua função — a lei também pune quem desacata o funcionário "em razão" da função, isto é, por causa do cargo que ele ocupa, mesmo em um encontro fora do serviço. No caso descrito, Carlos xingou Daniel justamente porque o reconheceu como o agente federal de execução penal que o escoltara durante uma transferência de presídio — a ofensa tem como motivo o cargo de Daniel, ainda que o encontro tenha sido casual, em um shopping, fora do exercício da função. Isso preenche a segunda hipótese do art. 331: desacatar funcionário público "em razão" da função.
Exemplo: é diferente de um xingamento qualquer entre duas pessoas quaisquer — aqui, Carlos só ofendeu Daniel por causa do papel que ele desempenhou como agente prisional; é o cargo, e a lembrança dele, que motiva a ofensa, o que caracteriza o desacato mesmo fora do horário de trabalho de Daniel.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=51 and content_status='under_review';

-- 53: resistência (CP, art. 329) exige violência ou ameaça contra o
-- funcionário; oposição meramente passiva não preenche o tipo.
update public.official_exam_questions set review_note=$q$Certo. O crime de resistência (art. 329 do Código Penal) exige, pelo próprio texto da lei, que a oposição à execução de ato legal ocorra "mediante violência ou ameaça" a funcionário competente. Uma oposição meramente passiva — por exemplo, a pessoa se deixar cair no chão, ficar rígida, recusar-se a andar ou a colaborar, sem empregar força contra o agente nem ameaçá-lo — não emprega violência nem ameaça, e por isso não se enquadra no tipo penal do art. 329. Isso não significa que a conduta seja sempre irrelevante (pode, por exemplo, configurar desobediência, a depender do caso), mas não configura, especificamente, o crime de resistência.
Exemplo: recusar-se a sair de um local por conta própria, sentando-se no chão sem empurrar ou ameaçar ninguém, é resistência passiva — bem diferente de empurrar o agente ou brandir um objeto contra ele, que é o tipo de conduta ativa (violência/ameaça) que a lei exige para caracterizar o crime de resistência.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=53 and content_status='under_review';

-- 55: CPP, art. 654, caput — habeas corpus pode ser impetrado por qualquer
-- pessoa e também pelo Ministério Público.
update public.official_exam_questions set review_note=$q$Errado. O art. 654, caput, do Código de Processo Penal diz expressamente que o habeas corpus "poderá ser impetrado por qualquer pessoa, em seu favor ou de outrem, bem como pelo Ministério Público". Ou seja, a lei prevê de forma explícita que o Ministério Público tem legitimidade para impetrar habeas corpus — inclusive em favor do próprio investigado ou réu, quando entender que há ilegalidade na prisão ou ameaça a ela. O item erra ao afirmar que o MP não poderia fazer isso.
Exemplo: é um papel que pode soar contraintuitivo — o mesmo órgão que normalmente acusa também pode, em determinadas situações, atuar para proteger a liberdade de alguém que considera estar sendo preso ou ameaçado ilegalmente; a lei dá essa legitimidade ao MP justamente porque seu papel institucional inclui zelar pela ordem jurídica, não apenas acusar.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código de Processo Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=55 and content_status='under_review';

-- 56: CPP, art. 5º, §5º — nos crimes de ação penal privada, o inquérito só
-- pode ser instaurado mediante requerimento de quem tenha qualidade para
-- intentar a ação.
update public.official_exam_questions set review_note=$q$Certo. O art. 5º, §5º, do Código de Processo Penal estabelece que, nos crimes de ação penal privada, a autoridade policial só pode instaurar inquérito mediante requerimento de quem tenha qualidade para intentar a ação (em regra, a própria vítima ou seu representante legal). Isso decorre da lógica da ação privada: como só o titular do direito de queixa pode decidir processar o autor do crime, a própria investigação policial fica condicionada à vontade dele — sem esse requerimento, a polícia não tem autorização legal para abrir o inquérito por iniciativa própria.
Exemplo: é parecido com uma queixa-crime em si — assim como só a vítima (ou quem a representa) pode decidir processar em juízo nos crimes de ação privada, também é só ela quem pode "destravar" a investigação policial pedindo formalmente sua abertura; a polícia não pode agir de ofício nesses casos.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código de Processo Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=56 and content_status='under_review';

-- 57: CPP, art. 61 — o juiz deve declarar de ofício a extinção da
-- punibilidade em qualquer fase do processo.
update public.official_exam_questions set review_note=$q$Certo. O art. 61 do Código de Processo Penal é claro ao dizer que, "em qualquer fase do processo, o juiz, se reconhecer extinta a punibilidade, deverá declará-lo de ofício". Isso significa que o juiz não precisa esperar um pedido da defesa ou do Ministério Público para reconhecer a extinção da punibilidade (por exemplo, por prescrição, morte do agente ou outra causa prevista em lei) — ao perceber que ela ocorreu, ele tem o dever de declará-la por conta própria, a qualquer momento do processo, independentemente de provocação.
Exemplo: é como um sinal de "pare" que o próprio juiz deve enxergar sozinho — assim que ele constata, em qualquer etapa do caso, que não há mais base legal para punir (a punibilidade acabou), ele tem a obrigação de encerrar essa parte do processo por iniciativa própria, sem esperar ninguém pedir.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código de Processo Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=57 and content_status='under_review';

-- 59: CPP, art. 28-A, caput (incluído pela Lei 13.964/2019 — Pacote
-- Anticrime) — confissão formal e circunstanciada é requisito para o
-- acordo de não persecução penal.
update public.official_exam_questions set review_note=$q$Certo. O art. 28-A, caput, do Código de Processo Penal, incluído pela Lei nº 13.964/2019 (o "Pacote Anticrime"), condiciona a proposta de acordo de não persecução penal (ANPP) pelo Ministério Público a que o investigado tenha "confessado formal e circunstancialmente a prática de infração penal", além de outros requisitos (ausência de violência ou grave ameaça, pena mínima inferior a quatro anos, entre outros). Ou seja, sem essa confissão detalhada dos fatos, não há como o Ministério Público propor o acordo — é um dos pressupostos essenciais do instituto, ao lado dos demais requisitos da lei.
Exemplo: o ANPP funciona um pouco como uma delação da própria conduta em troca de condições mais brandas — o investigado assume, com detalhes, o que fez (confissão formal e circunstanciada) e, em contrapartida, evita o processo criminal, cumprindo condições como reparar o dano ou prestar serviços à comunidade.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código de Processo Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=59 and content_status='under_review';

-- 60: CPP, art. 2º — a lei processual penal nova aplica-se de imediato, mas
-- sem prejuízo da validade dos atos já realizados; a retroatividade
-- benéfica (CP, art. 2º) é regra de direito PENAL material, não processual.
update public.official_exam_questions set review_note=$q$Errado. O art. 2º do Código de Processo Penal diz que a lei processual penal nova "aplicar-se-á desde logo, sem prejuízo da validade dos atos realizados sob a vigência da lei anterior" — ou seja, uma lei processual nova vale para os atos futuros do processo, mas não desfaz nem atinge os atos processuais já praticados sob a lei antiga (é o chamado princípio do "tempus regit actum"). O princípio da retroatividade da lei mais benéfica, citado no item, é uma regra do direito PENAL material (art. 2º do Código Penal), que serve para beneficiar o réu quanto ao crime e à pena em si — ele não se estende, do mesmo jeito, às normas puramente processuais, como a criação de um novo recurso. Por isso, a nova lei que cria um recurso exclusivo para a defesa não pode retroagir para atingir decisões já proferidas anteriormente naquele mesmo processo.
Exemplo: é como trocar as regras de um jogo de recurso no meio da partida — quem já jogou uma fase pelas regras antigas não tem essa fase refeita; só as fases que ainda faltam seguem as regras novas. A "vantagem" de uma regra nova de processo não volta no tempo para desfazer decisões que já tinham se tornado válidas.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código de Processo Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm$q$),jsonb_build_object('title',$q$Código Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=60 and content_status='under_review';

-- 61: CPP, art. 295, §4º — o preso especial não pode ser transportado
-- juntamente com o preso comum.
update public.official_exam_questions set review_note=$q$Certo. O art. 295, §4º, do Código de Processo Penal diz, de forma direta, que "o preso especial não será transportado juntamente com o preso comum". A prisão especial (destinada a determinadas categorias de pessoas, como as com diploma de curso superior, entre outras previstas em lei) consiste em recolhimento em local distinto do preso comum, e essa separação vale também para o transporte: se Alberto tem direito a prisão especial, ele não pode ser deslocado no mesmo veículo, junto com presos comuns.
Exemplo: é a mesma lógica de manter, dentro do estabelecimento, o preso especial em cela ou alojamento separado do preso comum — essa separação não vale só para onde ele fica, mas também para como ele é levado de um lugar a outro.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código de Processo Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=61 and content_status='under_review';

-- 62: CPP, art. 310 — a audiência de custódia serve para verificar a
-- legalidade da prisão em flagrante (relaxar, converter em preventiva ou
-- conceder liberdade provisória); o interrogatório de mérito é ato próprio
-- da instrução (art. 400 do CPP), não da audiência de custódia.
update public.official_exam_questions set review_note=$q$Errado. O art. 310 do Código de Processo Penal define o papel da audiência de custódia: depois de receber o auto de prisão em flagrante, o juiz deve, nessa audiência, relaxar a prisão ilegal, converter a prisão em flagrante em preventiva (quando presentes os requisitos legais) ou conceder liberdade provisória. Não consta, entre essas funções, o interrogatório de mérito do preso sobre os fatos que lhe são imputados — esse é um ato próprio da instrução processual (previsto no art. 400 do CPP), que ocorre em momento distinto, já no curso da ação penal, com todas as garantias da instrução criminal. A proximidade temporal com o fato (mencionada no item) não transforma a audiência de custódia no momento adequado para o interrogatório: sua finalidade é apenas verificar a legalidade da prisão, não colher a versão do acusado sobre o crime em si.
Exemplo: a audiência de custódia é como uma checagem rápida logo na entrada do sistema — "essa prisão foi feita direito, e o que fazer com essa pessoa agora?" —, bem diferente do interrogatório, que é o momento mais aprofundado, já dentro do processo, em que o acusado é ouvido sobre os fatos que lhe são atribuídos.$q$, content_status='active', current_syllabus_topic_id=$q$1d07c499-25e5-4d30-a283-96c366217e88$q$::uuid, legal_audit_completed=true, law_version_checked_at=now(), legal_basis=jsonb_build_array(jsonb_build_object('title',$q$Código de Processo Penal – texto compilado$q$,'url',$q$https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm$q$))
where exam_year=2021 and career_name=$q$Departamento Penitenciário Nacional$q$ and item_number=62 and content_status='under_review';
