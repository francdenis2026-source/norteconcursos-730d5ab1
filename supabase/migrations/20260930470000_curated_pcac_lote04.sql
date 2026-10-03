-- Curated (authored) questions for Polícia Civil do Acre (edital 2017, base
-- para a campanha PCAC 2026), lote 04: 30 questões cobrindo as 9 disciplinas
-- do edital com subtemas inéditos. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-10',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Cláusulas pétreas (art. 60, § 4º, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Não será objeto de deliberação a proposta de emenda constitucional tendente a abolir a forma federativa de Estado, o voto direto, secreto, universal e periódico, a separação dos Poderes, e os direitos e garantias individuais.$q$,
  'C',
  $q$Certo. O art. 60, § 4º, da Constituição Federal elenca as cláusulas pétreas, núcleo imodificável da Constituição que não pode ser suprimido nem mesmo por emenda constitucional aprovada pelo rito qualificado, protegendo elementos considerados essenciais à identidade constitucional, como a forma federativa, o voto direto e periódico, a separação de Poderes e os direitos e garantias individuais. Exemplo: uma proposta de emenda constitucional que pretendesse transformar o Brasil em Estado unitário, abolindo a autonomia dos estados-membros, seria inconstitucional por violar cláusula pétrea.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 60, § 4º','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-11',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Devido processo legal (art. 5º, LIV, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Ninguém será privado da liberdade ou de seus bens sem o devido processo legal.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LIV, da Constituição Federal consagra o princípio do devido processo legal, garantia fundamental que assegura a observância de um processo justo, com respeito ao contraditório e à ampla defesa, como condição prévia para qualquer restrição legítima à liberdade ou ao patrimônio de uma pessoa, servindo de fundamento para diversas outras garantias processuais específicas. Exemplo: a apreensão de bens de um investigado sem qualquer procedimento formal e sem oportunidade de manifestação viola o devido processo legal.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, LIV','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-12',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Direito de petição (art. 5º, XXXIV, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São a todos assegurados, independentemente do pagamento de taxas, o direito de petição aos Poderes Públicos em defesa de direitos ou contra ilegalidade ou abuso de poder.$q$,
  'C',
  $q$Certo. O art. 5º, inciso XXXIV, alínea "a", da Constituição Federal garante o direito de petição, instrumento de participação direta do cidadão perante o Poder Público, sem exigência de pagamento de taxas, para postular a defesa de direitos ou denunciar ilegalidade ou abuso de poder por parte de autoridades. Exemplo: um cidadão pode dirigir petição gratuita a um órgão público denunciando conduta abusiva de um agente estatal, sem necessidade de contratar advogado ou pagar qualquer taxa.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, XXXIV, "a"','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-10',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Desapropriação (art. 5º, XXIV, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
A lei estabelecerá o procedimento para desapropriação por necessidade ou utilidade pública, ou por interesse social, mediante justa e prévia indenização em dinheiro, ressalvados os casos previstos na Constituição.$q$,
  'C',
  $q$Certo. O art. 5º, inciso XXIV, da Constituição Federal disciplina a desapropriação como forma de intervenção estatal na propriedade privada, exigindo, como regra geral, indenização justa e prévia em dinheiro, ressalvadas hipóteses específicas previstas na própria Constituição, como a desapropriação para fins de reforma agrária de imóvel rural que não cumpre sua função social, indenizada em títulos da dívida agrária. Exemplo: a desapropriação de um imóvel urbano para construção de uma via pública deve, em regra, ser precedida do pagamento da justa indenização em dinheiro ao proprietário.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, XXIV','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-11',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Servidão administrativa',
  $q$Julgue o item a seguir, com base na doutrina de direito administrativo.
A servidão administrativa é direito real público que autoriza o Poder Público a usar a propriedade imóvel privada para permitir a execução de obras e serviços de interesse coletivo, sem retirar do proprietário o domínio ou a posse direta do bem, gerando direito à indenização apenas quando houver efetivo prejuízo comprovado.$q$,
  'C',
  $q$Certo. A servidão administrativa constitui forma de intervenção restritiva na propriedade privada, na qual o Poder Público impõe um ônus real sobre o imóvel para viabilizar a execução de obra ou serviço de interesse público, sem que o proprietário perca o domínio ou a posse direta do bem, sendo a indenização devida apenas na medida do prejuízo efetivamente demonstrado, diferentemente da desapropriação, que transfere a propriedade. Exemplo: a instalação de uma linha de transmissão de energia elétrica sobre uma propriedade rural, sem retirar do proprietário o uso do solo, exemplifica servidão administrativa.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Direito Administrativo — Servidão administrativa','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-12',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Princípio do informalismo no processo administrativo',
  $q$Julgue o item a seguir, com base na Lei nº 9.784/1999.
No processo administrativo, os atos devem ser produzidos com simplicidade, clareza e sem rigidez de formas, salvo exigência expressa de lei, permitindo maior flexibilidade procedimental em benefício do administrado.$q$,
  'C',
  $q$Certo. O art. 22 da Lei nº 9.784/1999 consagra o princípio do informalismo (ou formalismo moderado), segundo o qual os atos do processo administrativo não dependem de forma determinada, senão quando a lei expressamente a exigir, buscando maior celeridade e acessibilidade do administrado ao processo, em contraposição ao rigor formal muitas vezes exigido em processos judiciais. Exemplo: um requerimento administrativo apresentado de forma simples, sem seguir modelo rígido, pode ser aceito pela Administração, desde que contenha os elementos essenciais para sua compreensão e tramitação.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.784/1999, art. 22','url','https://www.planalto.gov.br/ccivil_03/leis/l9784.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-13',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Crime impossível (art. 17, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Não se pune a tentativa quando, por ineficácia absoluta do meio empregado ou por absoluta impropriedade do objeto, é impossível consumar-se o crime.$q$,
  'C',
  $q$Certo. O art. 17 do Código Penal consagra o crime impossível (tentativa inidônea), afastando a punição quando, avaliada em concreto, a consumação do crime é absolutamente impossível, seja pela ineficácia total do meio empregado (por exemplo, uma arma de brinquedo usada com a crença de que é real), seja pela impropriedade absoluta do objeto (por exemplo, tentar matar alguém que já está morto), exigindo, para a atipicidade, que a impossibilidade seja absoluta, e não apenas relativa. Exemplo: atirar em um travesseiro pensando que é uma pessoa que dorme na cama, quando na verdade não há ninguém ali, pode configurar crime impossível por absoluta impropriedade do objeto.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 17','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-14',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Concurso formal de crimes (art. 70, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Quando o agente, mediante uma só ação ou omissão, pratica dois ou mais crimes, idênticos ou não, aplica-se a pena mais grave dentre as cabíveis, ou, se iguais, somente uma delas, aumentada, em qualquer caso, de um sexto até metade.$q$,
  'C',
  $q$Certo. O art. 70 do Código Penal disciplina o concurso formal (ou ideal) de crimes, em que uma única conduta produz mais de um resultado criminoso, aplicando-se, em regra, o sistema da exasperação (pena mais grave, ou uma das iguais, aumentada de um sexto até metade), sistema mais benéfico ao réu do que o cúmulo material, salvo quando as ações ou omissões forem dolosas e os resultados diferentes decorrerem de desígnios autônomos, hipótese em que se aplica o cúmulo material das penas. Exemplo: um único disparo de arma de fogo que atinge e mata duas pessoas configura concurso formal de dois homicídios.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 70','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-15',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Latrocínio (art. 157, § 3º, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Se da violência empregada no roubo resulta lesão corporal grave, a pena é de reclusão de sete a dezoito anos; se resulta morte, a pena é de reclusão de vinte a trinta anos, sendo esta última hipótese denominada latrocínio, crime hediondo por equiparação legal.$q$,
  'C',
  $q$Certo. O art. 157, § 3º, do Código Penal prevê as formas qualificadas do roubo pelo resultado, sendo a hipótese de morte da vítima (latrocínio) tratada com pena extremamente elevada, além de ser expressamente equiparada a crime hediondo pela Lei nº 8.072/1990, o que implica consequências penais mais rigorosas, como o cumprimento de maior fração da pena para progressão de regime. Exemplo: um roubo em que a vítima é morta durante a subtração, mesmo sem intenção inicial de matar (dolo eventual ou preterdolo), pode configurar latrocínio, dependendo da análise do elemento subjetivo do agente quanto ao resultado morte.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 157, § 3º; Lei nº 8.072/1990','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-16',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Sequestro e cárcere privado (art. 148, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
O crime de sequestro e cárcere privado consiste em privar alguém de sua liberdade, sendo a pena aumentada em determinadas circunstâncias, como quando a vítima é ascendente, descendente, cônjuge ou companheiro do agente, ou maior de sessenta anos.$q$,
  'C',
  $q$Certo. O art. 148 do Código Penal tipifica o crime de sequestro e cárcere privado como a privação da liberdade de locomoção de alguém, prevendo, no § 1º, causas de aumento de pena relacionadas a circunstâncias que revelam maior gravidade ou vulnerabilidade da vítima, como o parentesco próximo com o agente ou a idade avançada da vítima (maior de 60 anos), além de outras hipóteses como fins libidinosos ou grave sofrimento físico ou moral imposto à vítima. Exemplo: manter uma pessoa idosa, maior de 60 anos, trancada contra sua vontade em um cômodo configura sequestro com pena aumentada, em razão da idade da vítima.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 148, § 1º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-10',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Liberdade provisória (art. 321, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Ausentes os requisitos que autorizam a decretação da prisão preventiva, o juiz concederá liberdade provisória, impondo, se for o caso, as medidas cautelares diversas da prisão previstas no Código de Processo Penal.$q$,
  'C',
  $q$Certo. O art. 321 do Código de Processo Penal determina que, não presentes os requisitos autorizadores da prisão preventiva (art. 312), o juiz deve conceder liberdade provisória, podendo, quando necessário e adequado, impor uma ou mais medidas cautelares diversas da prisão elencadas no art. 319 do CPP, como comparecimento periódico em juízo, proibição de acesso a determinados lugares ou monitoração eletrônica, evitando o encarceramento desnecessário. Exemplo: um investigado sem antecedentes, residência fixa e trabalho lícito, preso em flagrante por crime de menor gravidade, pode ter a prisão relaxada e receber liberdade provisória com a imposição de comparecimento periódico em juízo.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, arts. 319 e 321','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-11',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Prova emprestada',
  $q$Julgue o item a seguir, com base na doutrina processual penal.
A prova emprestada consiste na utilização, em um processo, de prova produzida originalmente em outro processo, sendo admitida desde que respeitado o contraditório, preferencialmente entre as mesmas partes, ainda que perante juízos diferentes.$q$,
  'C',
  $q$Certo. A prova emprestada permite o aproveitamento, em outro processo, de prova já produzida (como um depoimento ou uma perícia), evitando a repetição desnecessária de atos processuais, desde que se assegure o contraditório em relação à parte contra a qual a prova será utilizada, sendo desejável, embora não absolutamente exigível pela jurisprudência, a identidade de partes entre os processos envolvidos. Exemplo: um laudo pericial produzido em um processo criminal pode ser utilizado como prova emprestada em outro processo relacionado ao mesmo fato, desde que garantido o direito de manifestação da parte interessada sobre essa prova.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Direito Processual Penal — Prova emprestada','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-12',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Recurso de apelação (art. 593, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Cabe apelação contra sentenças definitivas de condenação ou absolvição proferidas por juiz singular, devendo o recurso ser interposto no prazo legal, podendo devolver ao tribunal o conhecimento de toda a matéria impugnada.$q$,
  'C',
  $q$Certo. O art. 593 do Código de Processo Penal disciplina o cabimento da apelação, recurso ordinário destinado a impugnar sentenças definitivas de condenação ou absolvição, bem como outras decisões elencadas no dispositivo, permitindo ao tribunal ad quem reexaminar amplamente a matéria de fato e de direito discutida na instância inferior, dentro dos limites do que foi efetivamente impugnado pelo recorrente. Exemplo: condenado em primeira instância, o réu pode apelar da sentença, submetendo ao tribunal a reapreciação das provas e da aplicação do direito ao caso concreto.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 593','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-10',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'Lei de Execução Penal — progressão de regime (art. 112)',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
A pena privativa de liberdade será executada de forma progressiva, com a transferência do condenado para regime menos rigoroso, a ser determinada pelo juiz da execução, quando satisfeitos o requisito temporal de cumprimento de parte da pena no regime anterior e o requisito de bom comportamento carcerário.$q$,
  'C',
  $q$Certo. O art. 112 da Lei de Execução Penal consagra o princípio da progressividade no cumprimento da pena privativa de liberdade, exigindo, para a transferência a regime mais brando, o preenchimento cumulativo de um requisito objetivo (cumprimento de fração mínima da pena, variável conforme a natureza do crime e a reincidência) e de um requisito subjetivo (atestado de bom comportamento carcerário), mecanismo que busca estimular a ressocialização gradual do condenado. Exemplo: um condenado que cumpre a fração mínima exigida e apresenta bom comportamento no regime fechado pode ser transferido para o regime semiaberto, mediante decisão do juiz da execução penal.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, art. 112','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-11',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'Estatuto da Igualdade Racial — conceito de discriminação (Lei 12.288/2010)',
  $q$Julgue o item a seguir, com base na Lei nº 12.288/2010 (Estatuto da Igualdade Racial).
Discriminação racial ou étnico-racial consiste em toda distinção, exclusão, restrição ou preferência baseada em raça, cor, descendência ou origem nacional ou étnica que tenha por objeto anular ou restringir o reconhecimento, gozo ou exercício, em igualdade de condições, de direitos humanos e liberdades fundamentais.$q$,
  'C',
  $q$Certo. O art. 1º, parágrafo único, inciso I, do Estatuto da Igualdade Racial traz definição ampla de discriminação racial, alinhada aos parâmetros internacionais de direitos humanos, abrangendo qualquer conduta que, com base em critérios raciais, étnicos ou de origem, tenha por objeto ou efeito anular ou restringir direitos fundamentais em condições de igualdade, servindo de base conceitual para as políticas de promoção da igualdade racial previstas na lei. Exemplo: a recusa de acesso a um estabelecimento comercial motivada pela cor da pele de uma pessoa configura discriminação racial nos termos dessa definição legal.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.288/2010, art. 1º, parágrafo único, I','url','https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12288.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-12',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'Lei de Acesso à Informação — informação sigilosa',
  $q$Julgue o item a seguir, com base na Lei nº 12.527/2011 (Lei de Acesso à Informação).
São passíveis de classificação em graus de sigilo as informações cuja divulgação ou acesso irrestrito possam pôr em risco a defesa e a soberania nacionais ou a integridade do território nacional, a vida ou a segurança da população, entre outras hipóteses expressamente previstas em lei.$q$,
  'C',
  $q$Certo. O art. 23 da Lei nº 12.527/2011 elenca as hipóteses em que uma informação pode ser considerada imprescindível à segurança da sociedade ou do Estado e, por isso, submetida à classificação de sigilo, entre elas o risco à defesa e à soberania nacionais e à vida ou segurança de pessoas, hipóteses que constituem exceção pontual e justificada à regra geral de publicidade prevista na lei. Exemplo: informações estratégicas sobre operações policiais em andamento, cuja divulgação prematura comprometeria a segurança dos agentes e o êxito da investigação, podem ser classificadas como sigilosas.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 12.527/2011, art. 23','url','https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-13',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Perícia em crimes contra a dignidade sexual',
  $q$Julgue o item a seguir, com base na medicina legal.
A perícia em casos de crimes contra a dignidade sexual busca constatar vestígios físicos compatíveis com a conduta narrada, sendo importante destacar que a ausência de vestígios físicos não afasta, por si só, a ocorrência do crime, sobretudo em razão do decurso de tempo entre o fato e o exame ou da natureza do ato praticado.$q$,
  'C',
  $q$Certo. A perícia médico-legal em crimes contra a dignidade sexual busca identificar vestígios materiais compatíveis com a narrativa da vítima, mas a medicina legal reconhece expressamente que a ausência de sinais físicos no exame pericial não significa, necessariamente, que o crime não ocorreu, seja porque determinados atos não deixam vestígios detectáveis, seja em razão do tempo decorrido entre o fato e a realização do exame, exigindo a valoração conjunta de outras provas pelo julgador. Exemplo: em um caso de abuso sexual denunciado meses após o ocorrido, a inexistência de vestígios físicos no exame não impede que a condenação se baseie em outras provas, como o depoimento da vítima e prova testemunhal.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Medicina Legal — Perícia em crimes sexuais','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-14',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Perícia em infanticídio (art. 123, CP)',
  $q$Julgue o item a seguir, com base no Código Penal e na medicina legal.
A perícia em casos de infanticídio busca comprovar o estado puerperal da mãe e estabelecer se a morte do recém-nascido ocorreu durante o parto ou logo após, elementos essenciais para a configuração desse tipo penal específico, distinto do homicídio comum.$q$,
  'C',
  $q$Certo. O art. 123 do Código Penal exige, para a configuração do infanticídio, que a morte do próprio filho, nascente ou recém-nascido, ocorra sob a influência do estado puerperal, durante o parto ou logo após, elementos cuja comprovação depende de perícia médico-legal que avalie tanto o aspecto temporal (relação com o parto) quanto o estado psíquico da genitora, distinguindo essa figura típica privilegiada do homicídio comum. Exemplo: a comprovação pericial de que a morte do recém-nascido ocorreu horas após o parto, sob influência do estado puerperal da mãe, é determinante para a capitulação do fato como infanticídio, e não como homicídio.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 123','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-15',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Traumatologia forense — classificação dos instrumentos causadores de lesão',
  $q$Julgue o item a seguir, com base na traumatologia forense.
A traumatologia forense estuda as lesões produzidas por energia de natureza mecânica, física, química ou biológica, classificando-as conforme o instrumento causador, como perfurante, cortante, contundente ou perfurocontundente, o que auxilia na reconstrução da dinâmica do evento lesivo.$q$,
  'C',
  $q$Certo. A traumatologia forense classifica as lesões corporais conforme a natureza da energia causadora (mecânica, física, química, biológica ou mista) e o instrumento empregado, permitindo à perícia reconstruir aspectos relevantes da dinâmica do crime, como a posição relativa entre agressor e vítima, o número de golpes e a compatibilidade com determinada arma ou objeto apreendido. Exemplo: a identificação de múltiplas lesões perfurocontundentes em um cadáver pode indicar o uso de instrumento específico, contribuindo para a investigação da autoria do crime.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Medicina Legal — Traumatologia Forense','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-16',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Exame de corpo de delito complementar (art. 168, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Quando a infração deixar vestígios e for necessário exame complementar para a exata avaliação da lesão, os peritos, sempre que possível, se servirão desse novo exame para completar ou retificar as conclusões do exame anterior.$q$,
  'C',
  $q$Certo. O art. 168 do Código de Processo Penal prevê a possibilidade de exame complementar quando o exame de corpo de delito inicial não permite avaliar com precisão a totalidade dos efeitos da lesão, especialmente naqueles casos em que suas consequências definitivas (como classificação da gravidade) somente se manifestam ou se confirmam após período de observação médica, sendo esse exame complementar essencial para a correta capitulação jurídica do fato. Exemplo: uma lesão que, no exame inicial, parece de natureza leve pode, no exame complementar realizado dias depois, revelar sequela que a reclassifique como lesão de natureza grave.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 168','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-13',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Colocação pronominal — próclise obrigatória',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Emprega-se a próclise, colocação do pronome oblíquo átono antes do verbo, obrigatoriamente diante de palavras de sentido negativo, como "não", "nunca" e "jamais".$q$,
  'C',
  $q$Certo. A norma-padrão determina o uso obrigatório da próclise (pronome antes do verbo) em diversas situações, entre elas a presença de palavras de sentido negativo antecedendo o verbo, como "não", "nunca", "jamais", "nada" e similares, sendo considerada inadequada, nesses contextos, a colocação do pronome depois do verbo (ênclise). Exemplo: escreve-se corretamente "Nunca lhe disse a verdade" (próclise obrigatória por causa de "nunca"), e não "Nunca disse-lhe a verdade".$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Colocação pronominal','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-14',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Polissemia e homonímia',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
A polissemia ocorre quando uma mesma palavra possui múltiplos significados relacionados entre si pelo contexto, enquanto a homonímia ocorre quando palavras de origens ou significados distintos coincidem na forma escrita e/ou na pronúncia, sem relação de sentido entre elas.$q$,
  'C',
  $q$Certo. A polissemia caracteriza-se pela existência de diversos sentidos para uma mesma palavra, todos relacionados etimológica ou semanticamente entre si e ativados conforme o contexto de uso, ao passo que a homonímia envolve palavras de origens distintas que, por coincidência fonética e/ou gráfica, assumem a mesma forma, sem qualquer relação semântica entre os significados. Exemplo: a palavra "manga" (fruta) e "manga" (parte da camisa) são homônimas, por terem origens distintas sem relação de sentido; já a palavra "banco" (instituição financeira e assento) exemplifica homonímia também, mas "cabeça" (parte do corpo e "cabeça de uma organização") exemplifica polissemia, por manter relação metafórica de sentido.$q$,
  jsonb_build_array(jsonb_build_object('title','Semântica — Polissemia e homonímia','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-15',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Conjunções coordenativas adversativas',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
As conjunções coordenativas adversativas exprimem ideia de oposição, contraste ou compensação em relação à oração anterior, sendo exemplos "mas", "porém", "todavia", "contudo" e "entretanto".$q$,
  'C',
  $q$Certo. As conjunções adversativas ligam orações ou termos de mesma função sintática estabelecendo uma relação de contraste, oposição ou ressalva entre as ideias expressas, sendo "mas" a mais empregada, seguida de outras com o mesmo valor semântico, como "porém", "todavia", "contudo", "entretanto" e "no entanto". Exemplo: "O investigado confessou o crime, mas alegou legítima defesa" apresenta relação de contraste entre a confissão e a alegação de excludente de ilicitude.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Conjunções coordenativas','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-16',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Concordância nominal com expressões predicativas invariáveis',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Quando o predicativo é formado por expressões como "é proibido", "é necessário" ou "é bom", seguidas de substantivo sem artigo ou outro determinante, essas expressões permanecem invariáveis no masculino singular.$q$,
  'C',
  $q$Certo. A norma-padrão estabelece que expressões predicativas do tipo "é proibido", "é necessário", "é bom", entre outras, ficam invariáveis quando o substantivo que as segue não é precedido de artigo definido ou outro determinante, situação em que a concordância deixa de ocorrer com o gênero e número do substantivo; havendo determinante, a concordância volta a ser exigida. Exemplo: "É proibido entrada de pessoas estranhas" (invariável, sem determinante) versus "É proibida a entrada de pessoas estranhas" (concordância exigida, com o artigo "a" determinando o substantivo "entrada").$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Concordância nominal','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-10',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Bicondicional — "se e somente se"',
  $q$Julgue o item a seguir, com base na lógica proposicional.
A proposição "P se e somente se Q" é verdadeira quando P e Q têm o mesmo valor lógico, ou seja, quando ambas são verdadeiras ou ambas são falsas, sendo falsa quando os valores lógicos de P e Q são diferentes.$q$,
  'C',
  $q$Certo. O conectivo bicondicional (P ↔ Q) representa uma equivalência lógica entre as proposições, sendo verdadeiro exatamente quando P e Q compartilham o mesmo valor de verdade (ambas verdadeiras ou ambas falsas), e falso quando os valores divergem, o que corresponde à conjunção de duas condicionais recíprocas ("se P então Q" e "se Q então P"). Exemplo: "o suspeito é culpado se e somente se a prova pericial o incrimina" é verdadeira tanto na situação em que ambas as afirmações são verdadeiras quanto naquela em que ambas são falsas.$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica proposicional — Bicondicional','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-11',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Cálculo de porcentagem',
  $q$Julgue o item a seguir, com base em raciocínio lógico-matemático.
Para calcular o valor correspondente a determinada porcentagem de uma quantidade, multiplica-se essa quantidade pela fração equivalente ao percentual, geralmente expressa em centésimos.$q$,
  'C',
  $q$Certo. O cálculo de porcentagem baseia-se na conversão do percentual em uma fração de denominador 100 (ou seu equivalente decimal), que é então multiplicada pela quantidade total, permitindo obter a parcela correspondente a essa porcentagem. Exemplo: para calcular 20% de 80 candidatos aprovados em uma prova, multiplica-se 80 pela fração 20/100 (ou 0,20), obtendo-se 16 candidatos.$q$,
  jsonb_build_array(jsonb_build_object('title','Raciocínio lógico-matemático — Porcentagem','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-12',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Princípio fundamental da contagem',
  $q$Julgue o item a seguir, com base em raciocínio lógico-matemático.
Se um evento pode ocorrer de "m" maneiras diferentes e, uma vez ocorrido, um segundo evento pode ocorrer de "n" maneiras diferentes, então o número de maneiras de os dois eventos ocorrerem em sucessão é dado pelo produto "m" vezes "n".$q$,
  'C',
  $q$Certo. O princípio fundamental da contagem (ou princípio multiplicativo) é a base para a resolução de problemas de análise combinatória, estabelecendo que, para eventos sucessivos e independentes, o número total de possibilidades é o produto do número de possibilidades de cada evento individual. Exemplo: se uma senha de acesso é composta por uma letra (26 possibilidades) seguida de um dígito (10 possibilidades), o número total de senhas possíveis é 26 x 10 = 260.$q$,
  jsonb_build_array(jsonb_build_object('title','Raciocínio lógico-matemático — Análise combinatória','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-10',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Atualizações de segurança de software',
  $q$Julgue o item a seguir, com base em noções de informática.
Manter o sistema operacional e os aplicativos atualizados é medida essencial de segurança da informação, pois as atualizações frequentemente corrigem vulnerabilidades conhecidas que poderiam ser exploradas por agentes maliciosos.$q$,
  'C',
  $q$Certo. Os fabricantes de sistemas operacionais e aplicativos lançam periodicamente atualizações de segurança para corrigir falhas descobertas após o lançamento do software, sendo a aplicação dessas atualizações uma das práticas mais recomendadas de segurança da informação, já que sistemas desatualizados permanecem vulneráveis a explorações conhecidas e já documentadas publicamente. Exemplo: a demora em instalar uma atualização de segurança crítica pode deixar um computador exposto a um ataque que já é de conhecimento público e para o qual já existe correção disponível.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Segurança da informação','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-11',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Phishing — engenharia social',
  $q$Julgue o item a seguir, com base em noções de informática.
Phishing é técnica de engenharia social utilizada por criminosos para induzir a vítima, por meio de mensagens ou páginas falsas que imitam instituições confiáveis, a fornecer informações sensíveis, como senhas e dados bancários.$q$,
  'C',
  $q$Certo. O phishing consiste em uma fraude digital baseada em engenharia social, na qual o criminoso se passa por uma entidade legítima (banco, órgão público, empresa conhecida) por meio de e-mails, mensagens ou sites falsificados, com o objetivo de enganar a vítima e obter dados sensíveis, como senhas, números de cartão de crédito ou informações pessoais que possam ser usadas para fraudes posteriores. Exemplo: um e-mail que imita a comunicação de um banco, solicitando que o usuário clique em um link e informe sua senha para "regularizar" a conta, é uma tentativa típica de phishing.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Segurança e engenharia social','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-12',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Protocolo de segurança WPA2 em redes sem fio',
  $q$Julgue o item a seguir, com base em noções de informática.
O WPA2 é protocolo de segurança utilizado em redes sem fio (Wi-Fi) que criptografa os dados transmitidos entre os dispositivos e o roteador, sendo considerado mais seguro do que protocolos anteriores, como o WEP.$q$,
  'C',
  $q$Certo. O WPA2 (Wi-Fi Protected Access 2) representa uma evolução em relação ao protocolo WEP, oferecendo criptografia mais robusta dos dados transmitidos em redes sem fio, o que dificulta significativamente a interceptação e a decodificação do tráfego por terceiros não autorizados, sendo, por essa razão, recomendado em detrimento de protocolos mais antigos e vulneráveis. Exemplo: configurar uma rede Wi-Fi doméstica com WPA2 (ou protocolo ainda mais recente) em vez de WEP reduz significativamente o risco de acesso não autorizado à rede.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Segurança de redes sem fio','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
);
