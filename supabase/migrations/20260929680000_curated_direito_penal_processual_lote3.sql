-- Curated (authored) questions, Direito lote 8: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-007',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a fé pública',
  $q$Julgue o item a seguir, com base no Código Penal.
Na falsidade ideológica, prevista no art. 299 do Código Penal, o documento é formalmente verdadeiro (autêntico), mas contém uma declaração falsa em seu conteúdo, o que diferencia esse crime da falsidade material, em que se altera a própria estrutura física do documento.$q$,
  'C',
  $q$Certo. O art. 299 do Código Penal descreve a falsidade ideológica como "omitir, em documento público ou particular, declaração que dele devia constar, ou nele inserir ou fazer inserir declaração falsa ou diversa da que devia ser escrita". Nesse crime, o documento em si é genuíno — não há rasura, adulteração física ou forjamento de assinatura —, mas o CONTEÚDO registrado nele é mentiroso. Isso contrasta com a falsidade material (arts. 296 a 298), em que a própria estrutura do documento é adulterada (uma assinatura forjada, um papel rasurado, um selo falsificado), tornando o documento fisicamente inautêntico.
Exemplo: um médico que emite, com sua assinatura verdadeira, um atestado com um diagnóstico inventado pratica falsidade ideológica (o documento é autêntico, mas a informação nele é falsa); já quem forja a assinatura de outro médico num atestado pratica falsidade material (o próprio documento é fisicamente forjado).$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-008',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a pessoa — homicídio qualificado',
  $q$Julgue o item a seguir, com base no Código Penal.
O homicídio é qualificado, entre outras hipóteses, quando praticado mediante paga ou promessa de recompensa, ou por outro motivo torpe, ou ainda mediante emprego de meio que dificulte ou torne impossível a defesa do ofendido, como no caso da traição, emboscada ou dissimulação.$q$,
  'C',
  $q$Certo. O art. 121, § 2º, do Código Penal lista as hipóteses de homicídio qualificado, incluindo, entre elas: mediante paga ou promessa de recompensa, ou por outro motivo torpe (inciso I); e, entre os meios que dificultam ou impossibilitam a defesa da vítima, o recurso que dificulte ou torne impossível a defesa do ofendido (inciso IV), o que abrange condutas como traição, emboscada ou dissimulação — situações em que a vítima é surpreendida sem chance real de se defender, o que a lei considera especialmente reprovável, justificando a qualificação do crime com pena bem mais severa.
Exemplo: matar alguém por encomenda, mediante pagamento (motivo torpe: mercenário) é homicídio qualificado; da mesma forma, atacar a vítima pelas costas, de surpresa, sem que ela tenha qualquer chance de reação (dissimulação/traição), também qualifica o crime, ainda que sem envolver pagamento algum.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-009',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Imputabilidade penal',
  $q$Julgue o item a seguir, com base no Código Penal.
É isento de pena o agente que, por doença mental ou desenvolvimento mental incompleto ou retardado, era, ao tempo da ação ou da omissão, inteiramente incapaz de entender o caráter ilícito do fato ou de determinar-se de acordo com esse entendimento, salvo quando a inimputabilidade decorrer exclusivamente de embriaguez voluntária ou culposa pelo álcool ou substância de efeitos análogos.$q$,
  'C',
  $q$Certo. O art. 26, caput, do Código Penal trata da inimputabilidade por doença mental ou desenvolvimento mental incompleto ou retardado: se, ao tempo do fato, o agente era inteiramente incapaz de entender o caráter ilícito de sua conduta ou de se controlar conforme esse entendimento, ele é isento de pena (embora possa se sujeitar a medida de segurança). Já o art. 28, inciso II, e § 1º, tratam de forma diferente a embriaguez: em regra, a embriaguez voluntária ou culposa (o agente quis se embriagar ou assumiu o risco disso) não exclui a imputabilidade penal — só a embriaguez completa, proveniente de caso fortuito ou força maior (ou seja, involuntária e imprevisível), pode isentar de pena, situação bem mais restrita do que a simples "ficar bêbado por vontade própria".
Exemplo: uma pessoa com transtorno mental grave que a torna incapaz de compreender que está cometendo um crime pode ser considerada inimputável; já quem comete um crime embriagado, tendo decidido beber por conta própria, em regra continua respondendo normalmente pelo crime — a embriaguez voluntária não é, por si só, um "escudo" contra a responsabilização penal.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-007',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Busca e apreensão',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A busca domiciliar, em regra, depende de mandado judicial, mas pode ser realizada sem mandado durante o dia ou a noite, em caso de flagrante delito ou desastre, ou para prestar socorro, respeitando-se a inviolabilidade constitucional do domicílio.$q$,
  'C',
  $q$Certo. O art. 5º, inciso XI, da Constituição Federal estabelece que a casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial. Ou seja, as exceções de flagrante delito, desastre ou prestação de socorro permitem o ingresso mesmo sem mandado judicial e a qualquer hora (dia ou noite); já a entrada por determinação judicial, fora dessas situações emergenciais, só é permitida durante o dia. O Código de Processo Penal regulamenta esses parâmetros nos arts. 240 e seguintes, tratando da busca domiciliar propriamente dita.
Exemplo: policiais que estão em perseguição de um suspeito e o veem entrar correndo numa casa, em situação de flagrante, podem ingressar no imóvel mesmo sem mandado judicial e mesmo de madrugada; já uma busca planejada, baseada em investigação prévia, sem essas urgências, normalmente exige mandado judicial e, em regra, deve ser cumprida durante o dia.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal de 1988 – texto compilado','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm'),jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-008',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Ação penal',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Nos crimes de ação penal pública, esta será promovida pelo Ministério Público, dependendo, quando a lei assim o exigir, de representação do ofendido ou de requisição do Ministro da Justiça, hipótese em que se denomina ação penal pública condicionada.$q$,
  'C',
  $q$Certo. O art. 24, caput, do Código de Processo Penal estabelece que, "nos crimes de ação pública, esta será promovida por denúncia do Ministério Público, mas dependerá, quando a lei o exigir, de requisição do Ministro da Justiça, ou de representação do ofendido ou de quem tiver qualidade para representá-lo". Isso mostra que existem duas modalidades de ação penal pública: a incondicionada, em que o Ministério Público pode agir de ofício, sem depender de manifestação de terceiros; e a condicionada, em que, apesar de ser o Ministério Público quem promove a ação (por meio da denúncia), essa iniciativa depende previamente de uma condição de procedibilidade — a representação do ofendido ou, em casos específicos, a requisição do Ministro da Justiça.
Exemplo: em crimes de ação pública condicionada à representação (como certos crimes contra a honra em determinadas circunstâncias), o Ministério Público só pode oferecer a denúncia depois que a vítima manifestar formalmente seu interesse em ver o autor processado — sem essa representação, o MP não pode agir por conta própria nesses casos específicos.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
);
