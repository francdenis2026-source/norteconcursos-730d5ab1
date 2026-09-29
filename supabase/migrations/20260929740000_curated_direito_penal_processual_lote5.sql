-- Curated (authored) questions, Direito lote 14: mais Direito Penal e
-- Direito Processual Penal. Same approach as prior lotes.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-012',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a incolumidade pública',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de incêndio, previsto no art. 250 do Código Penal, é crime de perigo comum, ou seja, sua consumação não exige que o fogo efetivamente atinja pessoas ou bens, bastando a criação de situação de perigo à incolumidade pública, o que justifica sua inclusão entre os crimes contra a incolumidade pública, e não meramente contra o patrimônio.$q$,
  'C',
  $q$Certo. O crime de incêndio (art. 250 do CP) está classificado entre os crimes de perigo comum, dentro do título dos crimes contra a incolumidade pública, justamente porque o bem jurídico protegido não é apenas o patrimônio isoladamente considerado, mas a segurança coletiva de um número indeterminado de pessoas. É um crime de perigo concreto: para sua consumação, exige-se que o incêndio tenha efetivamente criado uma situação de perigo real e comum a pessoas ou a um número indeterminado de pessoas ou bens — não basta o mero ato de atear fogo isoladamente a um objeto sem esse potencial de perigo generalizado, o que o diferencia de um simples dano patrimonial.
Exemplo: atear fogo a um imóvel isolado, sem risco de propagação a outros bens ou pessoas, pode configurar crime de dano (contra o patrimônio); já provocar um incêndio numa área urbana densamente povoada, com risco real de propagação e perigo a diversas pessoas, tipifica o crime de incêndio, justamente pelo elemento do perigo comum à coletividade.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-013',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Crimes contra a fé pública — moeda falsa',
  $q$Julgue o item a seguir, com base no Código Penal.
Constitui crime falsificar, fabricando-a ou alterando-a, moeda metálica ou papel-moeda de curso legal no país ou no estrangeiro, sendo essa conduta classificada entre os crimes contra a fé pública, já que o bem jurídico protegido é a confiança coletiva na autenticidade do sistema monetário.$q$,
  'C',
  $q$Certo. O art. 289, caput, do Código Penal tipifica a moeda falsa exatamente nesses termos: "Falsificar, fabricando-a ou alterando-a, moeda metálica ou papel-moeda de curso legal no país ou no estrangeiro". Esse crime está classificado, junto com falsidade documental e outros tipos penais afins, no título dos crimes contra a fé pública, porque o que se protege não é apenas o patrimônio individual de quem eventualmente recebe a moeda falsa, mas a confiança coletiva no próprio sistema monetário — se a população não pudesse confiar que o dinheiro em circulação é genuíno, todo o sistema de trocas econômicas baseado na moeda ficaria comprometido.
Exemplo: mesmo que a moeda falsa nunca chegue a ser efetivamente utilizada para lesar patrimonialmente alguém (por exemplo, se for apreendida antes de circular), o simples ato de fabricá-la já configura o crime, justamente porque o bem jurídico protegido (a fé pública no sistema monetário) já foi posto em risco pela própria fabricação.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', '7010cf66-304d-4251-8180-aa575b0c9134', 'auth-penal-014',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Penal', 'Dosimetria da pena',
  $q$Julgue o item a seguir, com base no Código Penal.
A pena será fixada em três fases, conforme o critério trifásico: na primeira, o juiz fixa a pena-base, atendendo às circunstâncias judiciais previstas no art. 59; na segunda, considera as circunstâncias atenuantes e agravantes; e, na terceira, as causas de diminuição e de aumento de pena.$q$,
  'C',
  $q$Certo. O sistema trifásico de dosimetria da pena, consolidado na doutrina e na jurisprudência a partir da interpretação dos arts. 59 e 68 do Código Penal, funciona exatamente nessa sequência: primeiro, o juiz fixa a pena-base, dentro dos limites mínimo e máximo previstos em lei, considerando as circunstâncias judiciais do art. 59 (culpabilidade, antecedentes, conduta social, personalidade do agente, motivos, circunstâncias e consequências do crime, comportamento da vítima); em seguida, aplica as circunstâncias atenuantes e agravantes (previstas nos arts. 61 a 66), ajustando a pena-base; e, por fim, na terceira fase, aplica eventuais causas de diminuição ou de aumento de pena (como a redução por tentativa, ou aumentos específicos previstos para determinados crimes), chegando à pena definitiva.
Exemplo: é como um cálculo em etapas sucessivas — primeiro se define um "ponto de partida" dentro da faixa de pena prevista para o crime (pena-base), depois esse valor é ajustado para cima ou para baixo conforme circunstâncias específicas do caso (atenuantes/agravantes), e só então se aplicam reduções ou aumentos fixos previstos especificamente em lei (como o corte proporcional da pena por tentativa).$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal – Decreto-Lei nº 2.848/1940, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-011',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Sujeitos processuais — juiz das garantias',
  $q$Julgue o item a seguir, com base no Código de Processo Penal, com a redação dada pela Lei nº 13.964/2019.
O juiz das garantias, instituto introduzido pela Lei nº 13.964/2019, é responsável pelo controle da legalidade da investigação criminal e pela salvaguarda dos direitos individuais durante a fase de investigação, ficando impedido de atuar como juiz do processo, quando este for instaurado, salvo nas comarcas em que houver apenas um único juiz.$q$,
  'C',
  $q$Certo. A Lei nº 13.964/2019 (Pacote Anticrime) introduziu, no Código de Processo Penal, a figura do juiz das garantias (arts. 3º-A a 3º-F), cuja função é justamente atuar como um "filtro" de legalidade durante a fase de investigação criminal, decidindo sobre medidas cautelares e assegurando os direitos do investigado, mas sem participar do julgamento do mérito do processo — esse julgamento cabe a outro juiz, o juiz da instrução e julgamento, evitando que quem esteve envolvido nas decisões da fase investigativa também julgue o mérito da ação penal posteriormente. A lei prevê exceções em comarcas com estrutura judiciária reduzida, onde não seja possível a separação de funções entre juízes diferentes.
Exemplo: é como separar, dentro do próprio Judiciário, quem "supervisiona a investigação" de quem "julga o caso depois de virar processo" — a ideia é reforçar a imparcialidade do julgamento, evitando que o juiz que autorizou medidas invasivas durante a investigação (como uma busca e apreensão) seja o mesmo que, depois, precisa julgar com isenção o mérito da acusação.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  'e48e61a0-ecf6-4140-b431-e9dba7b40b67', 'a572ead8-4b70-4b28-b5aa-110fff10a435', 'auth-proc-012',
  'Polícia Federal', 2025, 'Agente de Polícia Federal', 'CEBRASPE', 'Direito Processual Penal', 'Citação e intimação',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A citação por edital é cabível quando o réu não é encontrado para citação pessoal, e, nesse caso, se o acusado não comparecer nem constituir advogado, o processo e o curso do prazo prescricional ficarão suspensos, podendo o juiz determinar a produção antecipada de provas consideradas urgentes.$q$,
  'C',
  $q$Certo. O art. 366 do Código de Processo Penal estabelece que, "se o acusado, citado por edital, não comparecer, nem constituir advogado, ficarão suspensos o processo e o curso do prazo prescricional, podendo o juiz determinar a produção antecipada das provas consideradas urgentes e, se for o caso, decretar prisão preventiva, nos termos do disposto no art. 312". Essa suspensão existe justamente porque seria incompatível com as garantias processuais julgar alguém sem que essa pessoa tenha, de fato, tomado conhecimento efetivo da acusação — mas, para evitar que provas se percam com o tempo (como o depoimento de uma testemunha idosa ou doente), a lei permite ao juiz antecipar a colheita dessas provas urgentes mesmo durante essa suspensão.
Exemplo: se um réu citado apenas por edital (porque não foi encontrado) simplesmente não aparece nem contrata advogado, o processo fica temporariamente "congelado" quanto ao andamento e à prescrição, mas o juiz pode, se houver risco de perda de uma prova importante, determinar sua colheita antecipada, para que ela não se perca até que o réu eventualmente seja localizado e o processo retome seu curso normal.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal – Decreto-Lei nº 3.689/1941, texto compilado','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
);
