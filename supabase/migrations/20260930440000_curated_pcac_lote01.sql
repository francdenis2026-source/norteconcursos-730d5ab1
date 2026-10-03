-- Curated (authored) questions for Polícia Civil do Acre (edital 2017, base
-- para a campanha PCAC 2026): 30 questões cobrindo as disciplinas do edital
-- vigente na plataforma (Constitucional, Administrativo, Penal, Processual
-- Penal, Legislação Especial, Medicina Legal, Português, RLM e Informática).
-- Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-01',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Remédios constitucionais — habeas data',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Conceder-se-á habeas data para assegurar o conhecimento de informações relativas à pessoa do impetrante, constantes de registros ou bancos de dados de entidades governamentais ou de caráter público, e para a retificação de dados, quando não se prefira fazê-lo por processo sigiloso, judicial ou administrativo.$q$,
  'C',
  $q$Certo. O art. 5º, inciso LXXII, da Constituição Federal prevê o habeas data como remédio constitucional destinado a garantir o acesso a informações pessoais mantidas em bancos de dados públicos ou de caráter público, bem como a retificação desses dados, ressalvada a preferência do interessado por processo sigiloso, judicial ou administrativo, para a correção. Exemplo: um cidadão pode impetrar habeas data para saber quais informações constam sobre ele em um cadastro de órgão público e corrigir dado incorreto.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, LXXII','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-02',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Segurança pública — órgãos (art. 144, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
São órgãos da segurança pública a polícia federal, a polícia rodoviária federal, a polícia ferroviária federal, as polícias civis, as polícias militares e corpos de bombeiros militares, e as polícias penais federal, estaduais e distrital.$q$,
  'C',
  $q$Certo. O art. 144 da Constituição Federal enumera os órgãos responsáveis pela segurança pública, entre eles as polícias civis, responsáveis, ressalvada a competência da União, pelas funções de polícia judiciária e pela apuração de infrações penais, exceto as militares, nos respectivos estados. Exemplo: a Polícia Civil do Acre integra esse rol constitucional, exercendo função de polícia judiciária no âmbito estadual.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 144','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '67c00539-c251-4b73-83fe-7cfd075469e9', 'pcac17-const-03',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Constitucional', 'Direito de reunião (art. 5º, XVI, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de autorização, desde que não frustrem outra reunião anteriormente convocada para o mesmo local, sendo apenas exigido prévio aviso à autoridade competente.$q$,
  'C',
  $q$Certo. O art. 5º, inciso XVI, da Constituição Federal assegura o direito de reunião pacífica e sem armas, dispensando autorização prévia do Poder Público, mas exigindo apenas aviso prévio à autoridade competente, justamente para permitir a organização logística (como o trânsito) e evitar sobreposição com reunião já convocada para o mesmo local e horário. Exemplo: um grupo que deseja realizar uma manifestação em praça pública deve apenas avisar previamente a autoridade competente, sem necessidade de pedir autorização.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, XVI','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-01',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Poder de polícia — conceito legal',
  $q$Julgue o item a seguir, com base no Código Tributário Nacional e na doutrina de direito administrativo.
Poder de polícia é a atividade da administração pública que, limitando ou disciplinando direito, interesse ou liberdade, regula a prática de ato ou a abstenção de fato, em razão de interesse público concernente à segurança, à higiene, à ordem, aos costumes e à disciplina da produção e do mercado.$q$,
  'C',
  $q$Certo. O art. 78 do Código Tributário Nacional traz a definição legal de poder de polícia, amplamente utilizada pela doutrina administrativista, caracterizando-o como atividade estatal de limitação de direitos individuais em favor do interesse coletivo, presente, por exemplo, na fiscalização de estabelecimentos comerciais e na regulação do trânsito. Exemplo: a fiscalização de um estabelecimento comercial quanto às normas de segurança é exercício do poder de polícia.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 5.172/1966 (CTN), art. 78','url','https://www.planalto.gov.br/ccivil_03/leis/l5172compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-02',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Atributos do ato administrativo — autoexecutoriedade',
  $q$Julgue o item a seguir, com base na doutrina de direito administrativo.
A autoexecutoriedade permite que a Administração Pública execute diretamente suas decisões, sem necessidade de prévia autorização judicial, nos casos expressamente previstos em lei ou quando a urgência da medida assim exigir.$q$,
  'C',
  $q$Certo. A autoexecutoriedade é atributo de determinados atos administrativos que permite à Administração implementar suas decisões por meios próprios, sem depender de prévia manifestação do Poder Judiciário, limitando-se, porém, às hipóteses previstas em lei ou de urgência comprovada, sem prejuízo do posterior controle jurisdicional do ato. Exemplo: a apreensão de mercadorias em desacordo com normas sanitárias pode ser executada diretamente pela autoridade administrativa, sem necessidade de ordem judicial prévia.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Direito Administrativo — Atributos do Ato Administrativo','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'a4bda690-568e-4dfd-8706-250551f8ce00', 'pcac17-adm-03',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Administrativo', 'Pregão — modalidade de licitação (Lei 14.133/2021)',
  $q$Julgue o item a seguir, com base na Lei nº 14.133/2021.
O pregão é modalidade obrigatória de licitação para aquisição de bens e serviços comuns, cujo critério de julgamento poderá ser o de menor preço ou o de maior desconto.$q$,
  'C',
  $q$Certo. A Lei nº 14.133/2021 mantém o pregão como modalidade licitatória de uso obrigatório para bens e serviços comuns, ou seja, aqueles cujos padrões de desempenho e qualidade podem ser objetivamente definidos no edital, admitindo como critérios de julgamento o menor preço ou o maior desconto, o que confere celeridade ao processo de contratação. Exemplo: a compra de material de escritório padronizado, por ser bem comum, deve ser feita por meio de pregão.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.133/2021, art. 6º, XLI, e art. 29','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-01',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Princípio da legalidade (art. 1º, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Não há crime sem lei anterior que o defina, nem pena sem prévia cominação legal.$q$,
  'C',
  $q$Certo. O art. 1º do Código Penal consagra o princípio da legalidade (ou da reserva legal), segundo o qual nenhuma conduta pode ser considerada crime, nem sofrer punição, sem que exista lei anterior definindo-a como tal e cominando a respectiva pena, vedando-se, assim, a analogia in malam partem e a retroatividade da lei penal mais gravosa. Exemplo: uma conduta que não estava tipificada como crime no momento em que foi praticada não pode ser punida posteriormente, ainda que uma lei nova venha a criminalizá-la.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 1º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-02',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Crime consumado e crime tentado (art. 14, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
Diz-se o crime consumado quando nele se reúnem todos os elementos de sua definição legal, e tentado quando, iniciada a execução, não se consuma por circunstâncias alheias à vontade do agente.$q$,
  'C',
  $q$Certo. O art. 14 do Código Penal distingue o crime consumado, em que todos os elementos do tipo penal estão presentes, do crime tentado, em que a execução foi iniciada mas o resultado não ocorreu por circunstâncias independentes da vontade do agente, aplicando-se, neste último caso, a pena correspondente ao crime consumado diminuída de um a dois terços. Exemplo: se o agente efetua disparos contra a vítima com intenção de matá-la, mas ela é socorrida a tempo e sobrevive, o crime é de homicídio tentado.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 14','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-03',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Furto qualificado (art. 155, § 4º, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
A pena do furto é aumentada caso o crime seja praticado com destruição ou rompimento de obstáculo à subtração da coisa, mediante escalada ou destreza, com emprego de chave falsa, ou mediante concurso de duas ou mais pessoas.$q$,
  'C',
  $q$Certo. O art. 155, § 4º, do Código Penal prevê as qualificadoras do furto, majorando a pena quando a subtração é praticada com destruição ou rompimento de obstáculo, escalada, destreza, emprego de chave falsa ou concurso de agentes, circunstâncias que revelam maior habilidade, planejamento ou periculosidade da conduta. Exemplo: um furto praticado mediante arrombamento de uma porta configura furto qualificado pelo rompimento de obstáculo.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 155, § 4º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '4e6e26d4-5cfb-4c0a-8b4d-842b04a17af3', 'pcac17-penal-04',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Penal', 'Homicídio simples e qualificado (art. 121, CP)',
  $q$Julgue o item a seguir, com base no Código Penal.
O homicídio simples consiste em matar alguém, com pena de reclusão de seis a vinte anos, sendo qualificado, entre outras hipóteses, quando cometido mediante paga ou promessa de recompensa, por motivo torpe ou fútil, ou com emprego de meio cruel.$q$,
  'C',
  $q$Certo. O art. 121, caput, do Código Penal tipifica o homicídio simples, e o § 2º prevê as qualificadoras, entre elas o motivo torpe (repugnante, vil) e o motivo fútil (desproporcional à gravidade da reação), o emprego de meio cruel (que aumenta o sofrimento da vítima) e o recebimento de paga ou promessa de recompensa (motivo econômico), hipóteses que elevam a reprovabilidade da conduta e, consequentemente, a pena aplicável. Exemplo: matar alguém mediante pagamento em dinheiro por um terceiro configura homicídio qualificado por motivo torpe (mercenário).$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 121, caput e § 2º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-01',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Inquérito policial — finalidade (art. 4º, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
O inquérito policial destina-se a apurar as infrações penais e sua autoria, a fim de que o titular da ação penal disponha dos elementos necessários à propositura da ação.$q$,
  'C',
  $q$Certo. O art. 4º do Código de Processo Penal define o inquérito policial como procedimento administrativo, de natureza inquisitorial, presidido pela autoridade policial, cuja finalidade é reunir elementos de convicção sobre a materialidade e a autoria de infrações penais, subsidiando o titular da ação penal (em regra, o Ministério Público) na decisão de oferecer ou não a denúncia. Exemplo: após a instauração de inquérito para apurar um homicídio, o delegado colhe provas e depoimentos que, ao final, são remetidos ao Ministério Público para eventual oferecimento de denúncia.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 4º','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-02',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Prisão em flagrante (art. 302, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
Considera-se em flagrante delito quem está cometendo a infração penal, quem acaba de cometê-la, quem é perseguido logo após pela autoridade, pelo ofendido ou por qualquer pessoa em situação que faça presumir ser autor da infração, ou quem é encontrado logo depois com instrumentos, armas, objetos ou papéis que façam presumir ser ele autor da infração.$q$,
  'C',
  $q$Certo. O art. 302 do Código de Processo Penal define as quatro espécies de flagrante: próprio (cometendo ou acabando de cometer), impróprio (perseguição logo após) e presumido (encontrado logo depois com indícios da autoria), autorizando a prisão em flagrante como medida cautelar independente de ordem judicial prévia. Exemplo: um agente policial que, minutos após um roubo, encontra o suspeito com a arma utilizada no crime pode efetuar a prisão em flagrante na modalidade presumida.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 302','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '78fdd802-2bfa-48ed-b56d-e4c2b9f41f3b', 'pcac17-proc-03',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Direito Processual Penal', 'Comunicação da prisão em flagrante (art. 306, CPP)',
  $q$Julgue o item a seguir, com base no Código de Processo Penal.
A prisão de qualquer pessoa deverá ser imediatamente comunicada ao juiz competente, ao Ministério Público e à família do preso ou à pessoa por ele indicada.$q$,
  'C',
  $q$Certo. O art. 306 do Código de Processo Penal, com a redação atual, impõe o dever de comunicação imediata da prisão ao juiz competente, para fins de análise da legalidade da prisão e eventual audiência de custódia, ao Ministério Público, para fiscalização do ato, e à família do preso ou pessoa por ele indicada, garantindo transparência e controle sobre a privação de liberdade. Exemplo: efetuada a prisão em flagrante de um suspeito, o delegado deve comunicar imediatamente o fato ao juiz e ao Ministério Público, além de informar a família do preso.$q$,
  jsonb_build_array(jsonb_build_object('title','Código de Processo Penal, art. 306','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-01',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'Lei de Abuso de Autoridade — conceito de agente público',
  $q$Julgue o item a seguir, com base na Lei nº 13.869/2019 (Lei de Abuso de Autoridade).
Para os efeitos da Lei de Abuso de Autoridade, considera-se agente público todo aquele que exerce cargo, emprego ou função pública, ainda que transitoriamente ou sem remuneração, seja no âmbito da administração direta ou indireta de qualquer dos Poderes da União, dos estados, do Distrito Federal e dos municípios.$q$,
  'C',
  $q$Certo. O art. 2º da Lei nº 13.869/2019 adota conceito amplo de agente público para fins de responsabilização por abuso de autoridade, abrangendo servidores civis e militares, membros dos Poderes Executivo, Legislativo e Judiciário, do Ministério Público e dos Tribunais de Contas, exercendo função pública de forma permanente ou transitória, remunerada ou não. Exemplo: um perito nomeado ad hoc para atuar em um único caso, mesmo sem vínculo permanente com o Estado, pode responder por abuso de autoridade se cometer as condutas previstas na lei nesse exercício.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 13.869/2019, art. 2º','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-02',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'Porte funcional de arma de fogo dos policiais civis',
  $q$Julgue o item a seguir, com base na Lei nº 10.826/2003 (Estatuto do Desarmamento).
Os integrantes das polícias civis, referidas no art. 144 da Constituição Federal, têm direito ao porte de arma de fogo em todo o território nacional, mesmo fora do horário de serviço, conforme as condições estabelecidas na legislação e na regulamentação específica.$q$,
  'C',
  $q$Certo. O art. 6º da Lei nº 10.826/2003 assegura o porte funcional de arma de fogo, em âmbito nacional, aos integrantes dos órgãos policiais elencados no art. 144 da Constituição Federal, entre eles as polícias civis, direito que, em regra, se estende também fora do horário de expediente, sujeito à regulamentação e às condições estabelecidas pela respectiva corporação. Exemplo: um agente da Polícia Civil do Acre, mesmo em período de folga, pode portar sua arma funcional em outro estado, observadas as normas de regulamentação do porte.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 10.826/2003, art. 6º','url','https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '713962cc-aa8b-4b88-b0fa-bfc79ac6f10f', 'pcac17-leg-03',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Legislação de Direito Penal e Processual Penal Especial', 'Lei de Drogas — posse para consumo pessoal (art. 28)',
  $q$Julgue o item a seguir, com base na Lei nº 11.343/2006 (Lei de Drogas).
Quem adquire, guarda, tem em depósito, transporta ou traz consigo, para consumo pessoal, drogas sem autorização ou em desacordo com determinação legal ou regulamentar, será submetido a medidas como advertência sobre os efeitos das drogas, prestação de serviços à comunidade e medida educativa de comparecimento a programa ou curso educativo, sendo vedada a pena privativa de liberdade.$q$,
  'C',
  $q$Certo. O art. 28 da Lei nº 11.343/2006 despenalizou, em sentido estrito, a conduta de posse de drogas para consumo pessoal, afastando a pena privativa de liberdade e prevendo, em seu lugar, medidas de caráter educativo e restaurativo, como advertência, prestação de serviços à comunidade e comparecimento a programa educativo, refletindo a política de tratar o usuário de forma distinta do traficante. Exemplo: uma pessoa flagrada portando pequena quantidade de droga para uso próprio pode ser encaminhada a essas medidas alternativas, sem risco de prisão por esse fato isolado.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.343/2006, art. 28','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-01',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Tanatologia forense — fenômenos cadavéricos abióticos imediatos',
  $q$Julgue o item a seguir, com base na tanatologia forense.
Os fenômenos abióticos imediatos, como a cessação da respiração, da circulação e das funções do sistema nervoso central, ocorrem logo após a morte, distinguindo-se dos fenômenos abióticos consecutivos (tardios), como o resfriamento cadavérico, a rigidez muscular e os livores de hipóstase.$q$,
  'C',
  $q$Certo. A tanatologia forense classifica os sinais de morte em fenômenos abióticos imediatos (cessação das funções vitais logo após o óbito) e fenômenos abióticos consecutivos ou tardios (alterações que se desenvolvem progressivamente no cadáver ao longo do tempo, como o resfriamento, a rigidez cadavérica e as livores), sendo esses últimos particularmente úteis para a estimativa da data e hora da morte em exames periciais. Exemplo: ao periciar um cadáver, o médico legista avalia o grau de instalação da rigidez cadavérica para estimar o intervalo de tempo decorrido desde o óbito.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Medicina Legal — Tanatologia Forense','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-02',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Rigidez cadavérica (rigor mortis)',
  $q$Julgue o item a seguir, com base na tanatologia forense.
A rigidez cadavérica é fenômeno abiótico consecutivo que se instala, em regra, algumas horas após a morte, seguindo a lei de Nysten, iniciando-se na face e na mandíbula, progredindo para o pescoço, o tronco e os membros, e desaparecendo, posteriormente, na mesma ordem em que se instalou.$q$,
  'C',
  $q$Certo. A rigidez cadavérica (rigor mortis) decorre de alterações bioquímicas na musculatura após a morte e, segundo a lei de Nysten, segue uma progressão craniocaudal (face, mandíbula, pescoço, tronco e, por último, membros), com desaparecimento posterior na mesma sequência de instalação, em razão do início dos processos de putrefação, servindo esses dados como parâmetro auxiliar para a estimativa da data da morte. Exemplo: um cadáver com rigidez já instalada na face mas ainda ausente nos membros inferiores indica estágio inicial do fenômeno.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Medicina Legal — Lei de Nysten','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-03',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Livores cadavéricos (hipóstases)',
  $q$Julgue o item a seguir, com base na tanatologia forense.
Os livores cadavéricos são manchas de coloração arroxeada que surgem nas partes mais declives do corpo, em razão do acúmulo de sangue por ação da gravidade após a cessação da circulação, podendo auxiliar na estimativa do tempo de morte e na identificação de eventual mudança de posição do cadáver após o óbito.$q$,
  'C',
  $q$Certo. Os livores de hipóstase resultam da deposição do sangue nas regiões mais baixas do corpo após a parada circulatória, em razão da ação da gravidade, e sua análise permite estimar o tempo decorrido desde a morte, além de indicar se o corpo foi movimentado após o óbito, quando os livores não correspondem à posição em que o cadáver foi encontrado. Exemplo: encontrar livores na região dorsal de um corpo posicionado de bruços sugere que ele foi movimentado após a morte, quando os livores já estavam fixados.$q$,
  jsonb_build_array(jsonb_build_object('title','Doutrina de Medicina Legal — Livores de Hipóstase','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '83e39ab6-fa8d-40b5-8599-d32dcf9e0736', 'pcac17-medlegal-04',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Medicina Legal', 'Classificação pericial da lesão corporal (art. 129, CP)',
  $q$Julgue o item a seguir, com base no Código Penal e na perícia de lesão corporal.
A perícia de lesão corporal busca estabelecer o nexo causal entre a conduta e o resultado lesivo, classificando a lesão quanto à gravidade em leve, grave ou gravíssima, conforme critérios como a incapacidade para as ocupações habituais por mais de trinta dias, o perigo de vida, a debilidade ou a perda de membro, sentido ou função.$q$,
  'C',
  $q$Certo. O art. 129 do Código Penal e seus parágrafos estabelecem os critérios de gravação da lesão corporal, cabendo à perícia médico-legal, por meio do exame de corpo de delito, verificar objetivamente esses critérios (incapacidade prolongada, perigo de vida, debilidade permanente, deformidade, entre outros) para subsidiar a correta capitulação jurídica do fato pelo delegado e, posteriormente, pelo Ministério Público e pelo juiz. Exemplo: uma lesão que resulte em incapacidade para as ocupações habituais por mais de 30 dias deve ser classificada, ao menos, como lesão corporal de natureza grave.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 129','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-01',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Concordância verbal — sujeito composto anteposto ao verbo',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Quando o sujeito composto é anteposto ao verbo, a concordância verbal deve ser feita, em regra, no plural, ainda que os núcleos estejam ligados pela conjunção "e".$q$,
  'C',
  $q$Certo. A regra geral de concordância verbal determina que, estando o sujeito composto antes do verbo, este deve concordar no plural, independentemente do número gramatical de cada núcleo isoladamente considerado, por se tratar de mais de um elemento praticando a ação verbal. Exemplo: "O delegado e o escrivão assinaram o auto" — o verbo "assinaram" vai para o plural porque o sujeito composto (delegado e escrivão) está antes dele.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Concordância verbal','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-02',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Crase — regra geral',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Emprega-se o acento indicativo de crase na fusão da preposição "a" com o artigo definido feminino "a" ou "as", sendo incorreto seu uso antes de palavras masculinas ou de verbos, salvo em locuções adverbiais femininas de instrumento.$q$,
  'C',
  $q$Certo. A crase representa a fusão da preposição "a" (exigida por regência) com o artigo definido feminino "a(s)" ou com o "a" inicial de pronomes demonstrativos, não devendo ser empregada antes de palavras masculinas (que não admitem artigo feminino) nem antes de verbos (que não são antecedidos por artigo), ressalvadas locuções adverbiais femininas de instrumento, como "escrito à mão". Exemplo: "Cheguei à delegacia" tem crase correta (fusão da preposição "a" exigida por "cheguei a" com o artigo "a" de "delegacia"), mas "Cheguei a pé" não leva crase, por se tratar de palavra masculina.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Regência e crase','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-03',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Regência verbal — o verbo "assistir" no sentido de "ver"',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Quando empregado no sentido de "ver, presenciar", o verbo "assistir" é transitivo indireto, regendo a preposição "a", como em "assisti ao filme", sendo inadequado, na norma-padrão, empregá-lo como transitivo direto nesse sentido.$q$,
  'C',
  $q$Certo. Na norma-padrão, o verbo "assistir", quando significa "ver, presenciar", exige a preposição "a" (transitivo indireto), como em "assisti ao jogo" ou "assisti à palestra", sendo considerada inadequada, para essa acepção, a construção sem a preposição ("assisti o jogo"), embora essa forma seja comum na linguagem coloquial. Exemplo: em um relatório policial formal, o correto seria escrever "a testemunha assistiu ao crime", e não "assistiu o crime".$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Regência verbal','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'd89ab6a6-2087-4e27-8763-0e54944b8e16', 'pcac17-port-04',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Língua Portuguesa', 'Pontuação — vírgula entre sujeito e predicado',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
É incorreto, segundo a norma-padrão, separar por vírgula o sujeito do seu predicado, ainda que o sujeito seja extenso, salvo quando há elemento intercalado que exija isolamento por vírgulas.$q$,
  'C',
  $q$Certo. A norma-padrão veda a separação do sujeito e do predicado por vírgula, mesmo quando o sujeito é longo, pois essa pontuação romperia a unidade sintática essencial da oração; a exceção ocorre quando há um termo ou oração intercalada entre sujeito e verbo, que deve ser isolado por vírgulas, sem que isso configure a separação vedada. Exemplo: "Os policiais que participaram da operação, é claro, foram elogiados" tem vírgulas corretas isolando a expressão intercalada "é claro", e não separando indevidamente sujeito e predicado.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Pontuação','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-01',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Negação da proposição condicional',
  $q$Julgue o item a seguir, com base na lógica proposicional.
A negação da proposição "se P, então Q" equivale logicamente a "P e não Q", e não a "se não P, então não Q".$q$,
  'C',
  $q$Certo. Na lógica proposicional, a negação do condicional "P → Q" não é outro condicional, mas sim a conjunção "P e não Q" (P ∧ ¬Q), pois basta que a condição P seja verdadeira e a consequência Q seja falsa para que o condicional original seja falso, o que caracteriza logicamente sua negação. Exemplo: a negação de "se chover, então levarei guarda-chuva" é "choveu e não levei guarda-chuva", e não "se não chover, então não levarei guarda-chuva".$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica proposicional — Negação do condicional','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-02',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Tabela-verdade da disjunção inclusiva ("ou")',
  $q$Julgue o item a seguir, com base na lógica proposicional.
A disjunção inclusiva "P ou Q" é falsa apenas quando ambas as proposições P e Q forem falsas, sendo verdadeira em todos os demais casos.$q$,
  'C',
  $q$Certo. A disjunção inclusiva (P ∨ Q), representada pelo conectivo "ou" em seu sentido lógico usual, é falsa unicamente na hipótese em que as duas proposições componentes são falsas, bastando que ao menos uma delas seja verdadeira para que toda a disjunção seja considerada verdadeira. Exemplo: a afirmação "o suspeito estava em casa ou no trabalho" só é falsa se ele não estivesse em nenhum dos dois lugares; se estivesse em pelo menos um deles, a afirmação é verdadeira.$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica proposicional — Disjunção inclusiva','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', '098eb318-18ca-4aae-a304-765207231c3a', 'pcac17-rlm-03',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Raciocínio Lógico', 'Contrapositiva de uma proposição condicional',
  $q$Julgue o item a seguir, com base na lógica proposicional.
A proposição "se P, então Q" é logicamente equivalente à sua contrapositiva "se não Q, então não P", ainda que não seja equivalente à sua recíproca "se Q, então P".$q$,
  'C',
  $q$Certo. Em lógica proposicional, o condicional "P → Q" é logicamente equivalente à sua contrapositiva "¬Q → ¬P" (mesma tabela-verdade em todas as linhas), mas não é equivalente à sua recíproca "Q → P", que pode ter valor de verdade diferente do condicional original. Exemplo: "se é policial civil, então tem porte funcional de arma" equivale logicamente a "se não tem porte funcional de arma, então não é policial civil", mas não equivale a "se tem porte funcional de arma, então é policial civil" (pode haver outras categorias com esse direito).$q$,
  jsonb_build_array(jsonb_build_object('title','Lógica proposicional — Contrapositiva e recíproca','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-01',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Backup incremental',
  $q$Julgue o item a seguir, com base em noções de informática.
O backup incremental copia apenas os arquivos criados ou alterados desde o último backup realizado, seja ele completo ou incremental, sendo necessária, para a restauração completa dos dados, a aplicação sequencial de todos os backups incrementais realizados desde o último backup completo.$q$,
  'C',
  $q$Certo. O backup incremental, ao contrário do backup completo (que copia todos os dados a cada execução), registra apenas as alterações ocorridas desde o backup anterior, o que reduz o tempo de execução e o espaço de armazenamento necessário, mas exige, na restauração, a recomposição de toda a cadeia de backups incrementais a partir do último backup completo, tornando o processo de recuperação mais complexo. Exemplo: se um backup completo é feito no domingo e backups incrementais diários de segunda a sexta, restaurar os dados de sexta-feira exige aplicar o backup completo de domingo e todos os incrementais subsequentes, em ordem.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Políticas de backup','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-02',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Navegação anônima (modo privado)',
  $q$Julgue o item a seguir, com base em noções de informática.
A navegação anônima (modo privado) não salva o histórico de navegação, os cookies e os dados de formulário no dispositivo local após o encerramento da sessão, mas não impede que o provedor de internet, o administrador de rede ou os próprios sites visitados registrem a atividade do usuário.$q$,
  'C',
  $q$Certo. O modo de navegação anônima ou privada, disponível nos principais navegadores, evita apenas que informações da sessão (histórico, cookies, dados de formulário) sejam armazenadas localmente no dispositivo usado, mas não oferece anonimato perante terceiros externos, como o provedor de acesso à internet, o administrador de uma rede corporativa ou os próprios servidores dos sites acessados, que continuam podendo registrar a atividade do usuário. Exemplo: usar o modo anônimo em um computador de uso compartilhado impede que a próxima pessoa veja o histórico de navegação, mas não impede que a empresa provedora de internet registre os sites visitados.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Navegadores e privacidade','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  '30d1c027-8fc9-450d-b37b-f76fa9aa813e', 'b3806fcd-6dc5-46da-83a4-3179af207f79', 'pcac17-info-03',
  'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE', 'Noções de Informática', 'Malware — vírus e worm',
  $q$Julgue o item a seguir, com base em noções de informática.
Um vírus de computador necessita de um programa hospedeiro para se replicar e se espalhar, ao passo que um worm é capaz de se autorreplicar e se propagar de forma autônoma pela rede, sem necessidade de anexar-se a outro programa.$q$,
  'C',
  $q$Certo. O vírus de computador é um tipo de malware que depende da execução de um arquivo ou programa hospedeiro infectado para se ativar e se propagar, ao passo que o worm (verme) possui capacidade de autorreplicação e propagação autônoma através de redes de computadores, explorando vulnerabilidades, sem necessidade de intervenção do usuário ou de anexação a outro arquivo. Exemplo: um worm pode se espalhar automaticamente por uma rede corporativa explorando uma falha de segurança, enquanto um vírus normalmente depende de o usuário executar um arquivo infectado anexado a um e-mail.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Segurança e malware','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
);
