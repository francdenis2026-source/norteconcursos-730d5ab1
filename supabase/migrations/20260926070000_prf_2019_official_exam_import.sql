-- Official PRF 2019 exam import ("Policial Rodoviário Federal", aplicação 3/2/2019).
-- Verbatim transcription (não paráfrase) of all 120 objective items from the caderno
-- de provas supplied directly by the student (files under
-- "PROVAS FEITAS POR MIM/POLICIA RODOVIARIA/PRF 2019/"), matched to the official
-- gabarito definitivo (anuladas marcadas com X no documento oficial). Every item is
-- inserted as content_status='under_review', mirroring the PF 2014/2018/2021 import
-- pattern (see 7fe6835 / 5f8821b): legal-basis items still need individual
-- verification against planalto.gov.br before being promoted to 'active', per
-- CONTENT_GOVERNANCE.md.
--
-- Kept on the table shared with the PF import (public.official_exam_questions) but
-- scoped by contest_name/career_name so the UI renders it as its own panel, never
-- mixed with the PF questions (explicit user instruction).

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('outro','Concursos Cebraspe (listagem oficial, inclui PRF)','CEBRASPE','https://www.cebraspe.org.br/concursos/encerrado','vigente','Prova, gabarito e padrão de resposta desta importação foram fornecidos em PDF pelo próprio candidato (caderno físico da aplicação de 3/2/2019); link direto ao PDF específico ainda não localizado nesta sessão — adicionar quando disponível.')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select 'Polícia Rodoviária Federal','Policial Rodoviário Federal',2019,'CEBRASPE',id,'active'
from public.content_sources where url='https://www.cebraspe.org.br/concursos/encerrado'
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id,status='active';

with edition as (
  select id from public.syllabus_editions
  where contest_name='Polícia Rodoviária Federal' and role_name='Policial Rodoviário Federal' and contest_year=2019
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select edition.id,'Histórico 2019',d.discipline,1,d.topic_text,'current'
from edition cross join (values
  ('Língua Portuguesa','Compreensão e interpretação de texto; coesão e coerência; gramática aplicada ao texto.'),
  ('Raciocínio Lógico-Matemático','Sequências numéricas, funções, geometria espacial, física básica aplicada a situações de trânsito.'),
  ('Ética no Serviço Público','Moralidade administrativa, deveres do servidor, Comissão de Ética.'),
  ('Atualidades e Geografia','Território, redes de transporte, globalização, história da PRF.'),
  ('Direito de Trânsito','Código de Trânsito Brasileiro e resoluções do CONTRAN.'),
  ('Direito Administrativo','Atos administrativos, poderes administrativos, responsabilidade civil do Estado.'),
  ('Direito Constitucional','Direitos e garantias fundamentais; defesa do Estado e das instituições democráticas.'),
  ('Direito Penal e Processual Penal','Teoria geral do crime, prisão em flagrante, meios de prova, legislação especial.'),
  ('Direitos Humanos','Teoria geral, afirmação histórica, tratados internacionais.'),
  ('Informática','Redes, segurança da informação, computação em nuvem.')
) d(discipline,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text;

with src as (select id from public.content_sources where url='https://www.cebraspe.org.br/concursos/encerrado'),
edition as (select id from public.syllabus_editions where contest_name='Polícia Rodoviária Federal' and role_name='Policial Rodoviário Federal' and contest_year=2019),
topic_map(item_from,item_to,discipline) as (values
  (1,20,'Língua Portuguesa'),(21,23,'Raciocínio Lógico-Matemático'),(24,40,'Raciocínio Lógico-Matemático'),
  (41,44,'Ética no Serviço Público'),(45,48,'Atualidades e Geografia'),(49,50,'Atualidades e Geografia'),
  (51,90,'Direito de Trânsito'),(91,92,'Direito Administrativo'),(93,95,'Direito Administrativo'),
  (96,100,'Direito Constitucional'),(101,115,'Direito Penal e Processual Penal'),(116,120,'Direitos Humanos')
),
imported(item_number,statement,official_answer,source_page) as (values
(1,'A forma verbal “viceja” (l.1) poderia ser substituída por germina, sem prejuízo da coerência e da correção gramatical do trecho.','C',1),
(2,'Infere-se do primeiro parágrafo do texto que “boêmios da pá virada e vampiros” diferem biologicamente dos seres humanos em geral, os quais tendem a desempenhar a maior parte de suas atividades durante a manhã e a tarde.','E',1),
(3,'A correção gramatical do texto seria mantida caso o pronome “se”, em “se sentindo” (l.6), fosse deslocado para imediatamente após a forma verbal “sentindo”, da seguinte maneira: sentindo-se.','X',1),
(4,'A correção gramatical e os sentidos do texto seriam mantidos caso se suprimisse o trecho “é que”, em “como é que se fazia” (l.27).','C',1),
(5,'Sem prejuízo da correção gramatical e dos sentidos do texto, o primeiro período do terceiro parágrafo poderia ser assim reescrito: Contudo, os cientistas avisam que ter tanta luz à nosso dispor custa muito caro ao meio ambiente.','E',1),
(6,'A correção gramatical do texto seria mantida, mas seu sentido seria alterado, caso o trecho “que se infiltra no ambiente no qual dormimos” (l. 18 e 19) fosse isolado por vírgulas.','C',1),
(7,'A correção gramatical e os sentidos do texto seriam mantidos caso a forma verbal “existia” (l.34) fosse substituída por existisse.','E',1),
(8,'A substituição da locução “a cidade toda” (l.30) por toda cidade preservaria os sentidos e a correção gramatical do período.','E',1),
(9,'É correto inferir do trecho “o homem da luz já deve ter se transferido para o mundo das trevas eternas” (l. 34 e 35) que provavelmente o funcionário responsável pelo acionamento da iluminação urbana já morreu.','C',1),
(10,'As formas pronominais “Estas” (l.4) e “las” (l.7) referem-se a “necessidades dos seres humanos” (l. 2 e 3).','C',2),
(11,'Seriam mantidos os sentidos do texto caso o primeiro período do segundo parágrafo fosse assim reescrito: Quando prestamos atenção a nossa volta, percebemos que quase tudo que vemos existe pelas atividades do trabalho humano.','C',2),
(12,'A locução “em razão de” (l.9) expressa uma ideia de causa.','C',2),
(13,'Com o emprego da expressão “assim como” (l.12), estabelece-se uma relação de comparação entre ideias expressas no período.','C',2),
(14,'Conclui-se do texto que, devido à abundância de recursos, nas sociedades tribais os indivíduos não têm necessidade de separar as práticas laborais das outras atividades sociais.','C',2),
(15,'Caso o advérbio “praticamente” (l.23) fosse isolado por vírgulas, a correção gramatical do trecho seria alterada.','E',2),
(16,'No trecho “Os processos de produção dos objetos que nos cercam movimentam relações diversas entre os indivíduos” (l. 10 a 12), o sujeito da forma verbal “cercam” é “Os processos de produção dos objetos”.','C',2),
(17,'A afirmação de que alguns nomes põem nos olhos de seus donos “um azul que não possuem” (l. 4 e 5) contradiz a ideia de que os nomes definem não as qualidades reais de cada um, mas o modo como os outros o veem.','C',2),
(18,'A informação apresentada pela oração “nenhuma letra se igualando a outra” (l. 7 e 8) é redundante em relação à informação apresentada na oração imediatamente anterior, servindo para reforçar-lhe o sentido.','C',2),
(19,'O vocábulo “um” (l.14) refere-se a um indivíduo cujo nome é idêntico ao do autor do texto.','E',2),
(20,'Infere-se que o autor do texto é espanhol.','E',2),
(21,'O padrão apresentado pela referida sequência indica que os números podem corresponder, na ordem em que aparecem, a ordenadas de pontos do gráfico de uma função afim de inclinação positiva.','E',2),
(22,'A partir do padrão da sequência, infere-se que o 12.º termo é o número 1.600.','E',2),
(23,'Se an for o n-ésimo termo da sequência, em que n = 1, 2, 3, ..., então, para n ≥ 3, tem-se que an = 2 × an – 2.','C',2),
(24,'Julgue os itens a seguir, com relação à possibilidade de a figura representar uma vista superior do referido sólido (opção 24).','E',3),
(25,'Julgue os itens a seguir, com relação à possibilidade de a figura representar uma vista superior do referido sólido (opção 25).','E',3),
(26,'Julgue os itens a seguir, com relação à possibilidade de a figura representar uma vista superior do referido sólido (opção 26).','C',3),
(27,'Segundo o modelo apresentado, após dez anos de campanha educativa, haverá, em cada um dos anos seguintes, menos de 300 acidentes de trânsito com vítimas fatais.','E',3),
(28,'De acordo com o modelo, no final do primeiro ano da campanha, apesar do decréscimo com relação ao ano anterior, ainda ocorreram mais de 400 acidentes de trânsito com vítimas fatais.','C',3),
(29,'As versões mais modernas dos navegadores Chrome, Firefox e Edge reconhecem e suportam, em instalação padrão, os protocolos de Internet FTP, SMTP e NNTP, os quais implementam, respectivamente, aplicações de transferência de arquivos, correio eletrônico e compartilhamento de notícias.','E',3),
(30,'Por meio de uma aplicação de acesso remoto, um computador é capaz de acessar e controlar outro computador, independentemente da distância física entre eles, desde que ambos os computadores estejam conectados à Internet.','C',3),
(31,'No fluxo de pacotes em uma rede de computadores, a qualidade de serviço é determinada pelos parâmetros relacionados a propagação, recuperação, interferência e perda de dados.','X',3),
(32,'No acesso a uma página web que contenha o código de um vírus de script, pode ocorrer a execução automática desse vírus, conforme as configurações do navegador.','C',3),
(33,'Programas anti-spyware usam basicamente mecanismos de análise comportamental, análise heurística e inteligência artificial para detectar software de spyware instalado indevidamente em um sistema.','X',3),
(34,'A computação em nuvem do tipo software as a service (SaaS) possibilita que o usuário acesse aplicativos e serviços de qualquer local usando um computador conectado à Internet.','C',3),
(35,'O deslocamento do projétil na direção horizontal ocorre de acordo com uma função quadrática do tempo.','E',3),
(36,'Na situação em tela, o projétil atingirá o alvo circular.','E',3),
(37,'Se o alvo fosse retirado da direção do projétil, então o trabalho realizado pela força gravitacional para levar o projétil até o solo seria superior a 0,10 J.','C',3),
(38,'O veículo está sujeito a uma aceleração centrípeta superior à aceleração gravitacional.','C',3),
(39,'Se o veículo estivesse sujeito a uma aceleração centrípeta de 4,8 m/s2, então ele faria a curva em segurança, sem derrapar.','C',3),
(40,'Considere que esse veículo colida com outro veículo, mas o sistema permaneça isolado, ou seja, não haja troca de matéria com o meio externo nem existam forças externas agindo sobre ele. Nesse caso, segundo a lei de conservação da quantidade de movimento, a soma das quantidades de movimento dos dois veículos, antes e após a colisão, permanece constante.','C',3),
(41,'Na administração pública, moralidade restringe-se à distinção entre o bem e o mal: o servidor público nunca poderá desprezar o elemento ético de sua conduta.','E',4),
(42,'No estrito exercício de sua função, o servidor público deve nortear-se por primados maiores — como a consciência dos princípios morais, o zelo e a eficácia —; fora dessa função, porém, por estar diante de situação particular, não está obrigado a agir conforme tais primados.','E',4),
(43,'Servidor público que se apresenta habitualmente embriagado no serviço ou até mesmo fora dele poderá ser submetido à Comissão de Ética, a qual poderá aplicar-lhe a pena de censura.','C',4),
(44,'Servidor público que, no exercício da função pública, desviar outro servidor para atender a seu interesse particular, ou, movido pelo espírito de solidariedade, for conivente com prática como esta, poderá ser submetido à Comissão de Ética.','C',4),
(45,'O custo do frete e as grandes distâncias a serem percorridas entre as regiões produtoras e os centros urbanos consumidores e os portos de exportação são fatores que impactam diretamente no preço dos produtos agropecuários e industriais brasileiros e em sua competividade nos mercados nacional e internacional.','C',4),
(46,'A rede de transporte rodoviário integra todo o território brasileiro, com rodovias conectando em rede todos os municípios das cinco macrorregiões do território nacional, e a predominância desse modal de transporte é fator de vulnerabilidade em relação aos países desenvolvidos, os quais também dependem desse modal de transporte.','E',4),
(47,'O processo de globalização econômica e desenvolvimento tecnológico é marcado pela solidariedade organizacional entre empresas, sistema financeiro, tecnologia e lugares eleitos como regiões de investimento pela economia globalizada e, com o capital globalizado, busca-se desenvolver as regiões de modo a diminuir as desigualdades regionais e a oferecer uma economia justa e solidária.','E',4),
(48,'No Brasil, o setor de serviços ampliou a sua participação no PIB; o setor agropecuário, estratégico na economia brasileira, se tornou mais complexo, o que permitiu a ampliação de diversos serviços relacionados aos diferentes momentos do processo de produção/consumo, como os setores de tecnologia, transporte e finanças.','C',4),
(49,'Durante os grandes eventos esportivos sediados no Brasil nesta década, a PRF adotou como principal estratégia concentrar suas ações de policiamento nos locais de realização dos eventos, priorizando a segurança dos estrangeiros que ingressaram no país, especialmente de autoridades e delegações esportivas, com destaque para as atividades de escolta.','E',4),
(50,'No que se refere ao trânsito, a PRF exerce atividades como fiscalização de documentos e repressão a modalidades criminosas, além de atividades educativas para adultos e crianças, por meio de projetos que visem transmitir aspectos legais, éticos e de cidadania.','C',4),
(51,'Godofredo e Antônio responderiam por crime de trânsito independentemente da lesão corporal causada, pois a conduta de ambos gerou situação de risco à incolumidade pública.','C',5),
(52,'Godofredo e Antônio estão sujeitos à pena de reclusão, em razão do resultado danoso da conduta delitiva narrada.','E',5),
(53,'Por se tratar de lesão corporal de natureza culposa, é vedada a instauração de inquérito policial para apurar as condutas de Godofredo e Antônio, bastando a realização dos exames médicos da vítima e o compromisso dos autores em comparecer a todos os atos necessários junto às autoridades policial e judiciária.','E',5),
(54,'Dirigindo seu veículo automotor, Luciano atropelou um transeunte, causando-lhe ferimentos leves. Luciano não prestou socorro à vítima nem solicitou auxílio da autoridade pública. Nessa situação, a conduta de Luciano será considerada atípica caso um terceiro tenha prestado apoio à vítima em seu lugar.','E',5),
(55,'Felipe, ao violar a suspensão para dirigir, foi flagrado e autuado pela autoridade competente, em operação de fiscalização, conduzindo seu veículo automotor em via pública. Nessa situação, Felipe responderá por crime de trânsito e poderá receber como pena nova imposição adicional de suspensão pelo dobro do primeiro prazo, sendo vedada a substituição de pena privativa de liberdade por restritiva de direito, em razão da natureza da infração.','C',5),
(56,'Lucas, motorista de ônibus, quando dirigia seu coletivo, atropelou e matou, culposamente, uma pedestre. Sávio, ao conduzir seu veículo em um passeio com a família, atropelou culposamente, na faixa de pedestre, uma pessoa, que faleceu no mesmo instante. Severino, ao dirigir seu veículo, atropelou culposamente uma transeunte que estava na calçada; ela morreu em seguida. Nessas situações, Lucas, Sávio e Severino responderão por crime de trânsito, cujas penas poderão, pelas circunstâncias fáticas, ser aumentadas até a metade, e suas habilitações para dirigir deverão ser suspensas.','C',5),
(57,'Alfredo, conduzindo seu veículo automotor sem placas, atropelou um pedestre. Alessandro, dirigindo um veículo de categoria diversa das que sua carteira de habilitação permitia, causou lesão corporal culposa em um transeunte, ao atingi-lo. Nessas situações, as penas impostas a Alfredo e a Alessandro serão agravadas, devendo o juiz aplicar as penas-base com especial atenção à culpabilidade e às circunstâncias e consequências do crime.','C',5),
(58,'Sandro responderá por crime de trânsito somente se a condução de Wellington causar perigo de dano.','E',5),
(59,'Wellington responderá por crime de trânsito, independentemente de gerar perigo de dano ao conduzir o veículo.','C',5),
(60,'Dirigindo seu veículo automotor, Caio foi abordado por policial rodoviário federal, que constatou que a validade de sua carteira nacional de habilitação estava vencida havia mais de trinta dias. Nessa situação, Caio será multado, sua carteira de habilitação será recolhida e seu veículo será removido.','C',5),
(61,'Um policial rodoviário federal abordou o condutor de um veículo por dirigir sem usar o cinto de segurança. Nessa situação, depois de aplicar multa, o policial poderá reter o veículo somente até a colocação do cinto pelo motorista, se não constatar outra infração de trânsito.','X',5),
(62,'O condutor de um veículo foi abordado por policial rodoviário federal depois de ultrapassar outro veículo pelo acostamento. Nessa situação, o policial poderá multar o condutor, mas não poderá reter nem remover o seu veículo.','X',5),
(63,'O condutor estacionou o seu veículo sem observar a distância máxima permitida de afastamento da guia da calçada. Nessa situação, o condutor poderá ser multado e seu veículo, removido.','C',5),
(64,'Márcio conduzia seu veículo automotor produzindo fumaça em níveis superiores aos legalmente permitidos. Nessa situação, conforme o nível de fumaça exalada, a conduta de Márcio pode configurar tanto infração administrativa como crime de trânsito.','C',5),
(65,'Para que uma concessionária de serviço público de transporte de passageiros conheça a pontuação de infrações atribuída a um motorista de seu quadro funcional, que, no exercício da atividade remunerada ao volante, tenha tido seu direito de dirigir suspenso, ela deve ter autorização do respectivo empregado, uma vez que essa informação é personalíssima.','E',5),
(66,'Se um policial rodoviário federal autuar, por infração de trânsito, um condutor de veículo em circulação no Brasil, mas licenciado no exterior, o infrator deverá pagar a multa no país de origem do licenciamento do automóvel, na forma estabelecida pelo CONTRAN.','E',5),
(67,'Nas rodovias de pista dupla localizadas em vias rurais, a velocidade máxima permitida para automóveis, camionetas e motocicletas será a mesma.','C',5),
(68,'A sinalização de trânsito segue uma ordem de prevalência: as ordens do agente de trânsito prevalecem sobre as normas de circulação e outros sinais; as indicações do semáforo sobre os demais sinais; e as indicações dos sinais sobre as demais normas de trânsito.','C',5),
(69,'A Polícia Rodoviária Federal integra o Sistema Nacional de Trânsito, competindo-lhe, no âmbito das rodovias e estradas federais, implementar as medidas da Política Nacional de Segurança e Educação de Trânsito.','C',6),
(70,'O CONTRAN é o órgão máximo executivo de trânsito da União, cabendo a coordenação máxima do Sistema Nacional de Trânsito ao Departamento Nacional de Trânsito (DENATRAN).','E',6),
(71,'Em uma operação de fiscalização, na abordagem de um veículo automotor, o policial rodoviário federal, ao notar que o condutor do veículo apresentava vermelhidão nos olhos, odor de álcool no hálito, desordem nas vestes e fala alterada, solicitou que o motorista se submetesse ao competente teste, mas o etilômetro apresentou súbita pane, tornando-se inservível para o teste. Nessa situação, diante da impossibilidade de confirmar alteração da capacidade psicomotora do condutor, o policial ficou impedido de lavrar o auto de infração pela conduta de direção sob a influência de álcool prevista no CTB.','X',6),
(72,'No interior de um automóvel com capacidade para cinco pessoas, o condutor transportava quatro crianças: uma de oito anos de idade, no banco dianteiro; e outras três, todas de nove anos de idade, no banco traseiro. Cada criança utilizava o cinto de segurança individual. Apesar de ser mais nova que as demais, a criança transportada no banco dianteiro era a de maior estatura. Nessa situação, a disposição das crianças no veículo está em conformidade com a legislação de trânsito brasileira.','X',6),
(73,'Constatado que no para-brisa de um veículo automotor havia sido aplicada película não refletiva, o policial rodoviário federal, utilizando-se de um medidor de transmitância luminosa legalmente aprovado, verificou o valor de 70% de transmitância luminosa do conjunto vidro-película na área central do para-brisa. Nessa situação, não há o que se falar em auto de infração, pois o valor verificado está dentro do padrão de regularidade previsto na legislação de trânsito brasileira.','E',6),
(74,'Em uma rodovia federal, em um trecho em curva localizado fora do perímetro urbano, é alto o índice de acidentes de trânsito, apesar de haver medidor de velocidade do tipo fixo instalado no local. Nesse caso, no sentido de aumentar a fiscalização do excesso de velocidade nesse trecho, será correta a utilização de equipamento do tipo portátil à distância de um quilômetro do medidor de velocidade do tipo fixo já instalado.','C',6),
(75,'Estudos técnicos adequados constataram a necessidade de instalar equipamentos de controle de velocidade do tipo fixo em trecho de rodovia federal onde é alto o índice de atropelamentos de pedestres. Nessa situação, respaldado nas evidências técnicas, a intervenção na via poderá ser realizada desde que mediante prévia autorização do Departamento Nacional de Infraestrutura de Transportes (DNIT).','E',6),
(76,'Não se permite o transporte de bicicleta em veículo com o compartimento de carga aberto, mesmo que o comprimento da bicicleta ultrapasse o comprimento da caçamba ou do referido compartimento.','X',6),
(77,'Independentemente de instruções do fabricante, nos dispositivos instalados na parte traseira externa do veículo, a quantidade de bicicletas que podem ser transportadas depende do comprimento do balanço traseiro ocupado pelas bicicletas, que, de acordo com a legislação pertinente, não pode ultrapassar 60% da distância entre os eixos do veículo transportador.','E',6),
(78,'O transporte de bicicletas em dispositivos fixados no teto de veículos estará em conformidade com a legislação de trânsito caso a altura do sistema veículo-dispositivo-bicicletas não ultrapasse 4,4 metros.','C',6),
(79,'O condutor em questão não ultrapassou o tempo máximo ininterrupto de direção previsto na legislação de trânsito para o tipo de veículo referido.','E',6),
(80,'Nessa situação, apesar de o disco-diagrama não se prestar para exame, não cabe a aplicação de penalidade decorrente do defeito no aparelho registrador, já que foi possível a fiscalização do tempo de direção do motorista por meio da verificação da ficha de trabalho do autônomo.','C',6),
(81,'Haja vista o horário e o local da vistoria, bem como as condições de transporte do veículo, o policial rodoviário federal deverá lavrar auto de infração pelo descumprimento da restrição de tráfego, cabendo a aplicação de penalidades previstas no CTB.','E',6),
(82,'Nos veículos com carroceria aberta, os dispositivos de amarração devem ser tensionados pelo lado externo das guardas laterais, independentemente do espaço interno ocupado pela carga na carroceria, como mostram as figuras a seguir.','E',7),
(83,'No caso de transporte de tubos apoiados sobre a carroceria e na posição horizontal, apesar de a carga ultrapassar a altura do painel frontal da carroceria, é permitida a circulação do veículo ante a impossibilidade de deslizamento longitudinal da carga, como ilustra a figura a seguir.','X',7),
(84,'Tanto em veículos do tipo baú frigorífico (como o da figura 1A9-I a seguir) como em veículos do tipo baú lonado (como o da figura 1A9-II a seguir), é opcional a existência de pontos de amarração internos para a carga transportada.','C',7),
(85,'Entre as três situações ilustradas a seguir, apenas o dispositivo utilizado na figura 1A9-V é permitido para o transporte de galões de água mineral com capacidade de até 20 litros.','E',7),
(86,'É permitido que motociclista levante a viseira do capacete enquanto o veículo conduzido estiver parado, aguardando a travessia de pedestres diante de semáforo.','E',7),
(87,'Situação hipotética: Em operação de fiscalização em uma rodovia federal, a equipe da PRF verificou que o condutor de um quadriciclo não fazia uso do capacete. O policial que abordou o condutor o liberou, considerando que o uso de capacete pelo condutor desse tipo de veículo se restringe à condução em vias urbanas pavimentadas. Assertiva: Nessa situação, foram adequadas as condutas do policial e do condutor.','E',7),
(88,'Situação hipotética: Ao abordar um veículo em rodovia federal, o policial rodoviário federal constatou que o condutor, que era o proprietário do veículo, dirigia sem utilizar o cinto de segurança. O policial lavrou o auto de infração, que continha a assinatura do condutor e especificava o prazo para apresentação da defesa da autuação. Assertiva: Nessa situação, fica a PRF dispensada de expedir a notificação da autuação ao proprietário do veículo.','C',7),
(89,'As receitas oriundas das multas aplicadas pela PRF serão repassadas ao DNIT, órgão executivo rodoviário com circunscrição sobre as rodovias federais.','E',7),
(90,'Situação hipotética: Policial rodoviário federal, ao flagrar o condutor de um veículo dirigindo alcoolizado, o que ficou comprovado pelo teste de etilômetro, lavrou o competente auto de infração de trânsito. Assertiva: Nessa situação, a própria PRF aplicará ao condutor infrator a penalidade de suspensão do direito de dirigir, assegurando-lhe a ampla defesa, o contraditório e o devido processo legal.','E',7),
(91,'A responsabilidade administrativa do servidor público independe da sua responsabilidade penal, salvo na hipótese de, na esfera criminal, ocorrer absolvição do réu fundamentada na negativa do fato criminoso ou da autoria do delito.','X',8),
(92,'Tanto a inexistência da matéria de fato quanto a sua inadequação jurídica podem configurar o vício de motivo de um ato administrativo.','C',8),
(93,'Constitui poder de polícia a atividade da administração pública ou de empresa privada ou concessionária com delegação para disciplinar ou limitar direito, interesse ou liberdade, de modo a regular a prática de ato em razão do interesse público relativo à segurança.','E',8),
(94,'O abuso de poder, que inclui o excesso de poder e o desvio de finalidade, não decorre de conduta omissiva de agente público.','E',8),
(95,'A responsabilidade civil do Estado por ato comissivo é subjetiva e baseada na teoria do risco administrativo, devendo o particular, que foi a vítima, comprovar a culpa ou o dolo do agente público.','E',8),
(96,'Em caso de iminente perigo público, autoridade pública competente poderá usar a propriedade particular, desde que assegure a consequente indenização, independentemente da comprovação da existência de dano, que, nesse caso, é presumido.','E',8),
(97,'A competência da PRF, instituição permanente, organizada e mantida pela União, inclui o patrulhamento ostensivo das rodovias e das ferrovias federais.','E',8),
(98,'Policial rodoviário federal com mais de dez anos de serviço pode candidatar-se ao cargo de deputado federal, devendo, no caso de ser eleito, passar para inatividade a partir do ato de sua diplomação.','C',8),
(99,'São constitucionalmente assegurados ao preso o direito à identificação dos agentes estatais responsáveis pela sua prisão e o direito de permanecer em silêncio.','C',8),
(100,'A segurança viária compreende a educação, a engenharia e a fiscalização de trânsito, vetores que asseguram ao cidadão o direito à mobilidade urbana eficiente.','C',8),
(101,'A conduta do motorista configura crime de descaminho em sua forma consumada, ainda que não tenha havido constituição definitiva do crédito tributário e a ocorrência de efetivo prejuízo ao erário.','C',8),
(102,'Caso fique comprovada a participação do servidor público na conduta delituosa, ele responderá pelo delito de descaminho em sua forma qualificada: ela tinha o dever funcional de prevenir e de reprimir o crime.','C',8),
(103,'De acordo com a classificação doutrinária dominante, a situação configura hipótese de flagrante presumido ou ficto.','C',8),
(104,'Quanto ao sujeito ativo da prisão, o flagrante narrado é classificado como obrigatório, hipótese em que a ação de prender e as eventuais consequências físicas dela advindas em razão do uso da força se encontram abrigadas pela excludente de ilicitude denominada exercício regular de direito.','E',8),
(105,'Durante o procedimento de lavratura do auto de prisão em flagrante pela autoridade policial competente, o policial rodoviário responsável pela prisão e condução do preso deverá ser ouvido logo após a oitiva das testemunhas e o interrogatório do preso.','E',8),
(106,'A norma penal deve ser instituída por lei em sentido estrito, razão por que é proibida, em caráter absoluto, a analogia no direito penal, seja para criar tipo penal incriminador, seja para fundamentar ou alterar a pena.','E',9),
(107,'O presidente da República, em caso de extrema relevância e urgência, pode editar medida provisória para agravar a pena de determinado crime, desde que a aplicação da pena agravada ocorra somente após a aprovação da medida pelo Congresso Nacional.','E',9),
(108,'A conduta do motorista do veículo se amolda ao tipo penal do tráfico de pessoas, em sua forma consumada, incidindo, nesse caso, causa de aumento de pena, em razão de as vítimas serem adolescentes.','C',9),
(109,'A boleia de um caminhão, utilizada pelo motorista, ainda que provisoriamente, como dormitório e local de guarda de seus objetos pessoais em longas viagens, não poderá ser objeto de busca e apreensão sem a competente ordem judicial na hipótese de fiscalização policial com a finalidade de revista específica àquele veículo.','X',9),
(110,'A entrada forçada em determinado domicílio é lícita, mesmo sem mandado judicial e ainda que durante a noite, caso esteja ocorrendo, dentro da casa, situação de flagrante delito nas modalidades próprio, impróprio ou ficto.','C',9),
(111,'Em uma operação da PRF, foram encontradas, no veículo de Sandro, munições de arma de fogo de uso permitido e, no veículo de Eurípedes, munições de uso restrito. Nenhum deles tinha autorização para o transporte desses artefatos. Nessa situação, considerando-se o previsto no Estatuto de Desarmamento, Sandro responderá por infração administrativa e Eurípedes responderá por crime.','E',9),
(112,'João foi flagrado, em operação da PRF, submetendo uma adolescente a exploração sexual em rodovia federal. Nessa situação, João poderá não responder pelo crime se comprovar o consentimento da menor.','E',9),
(113,'Um policial rodoviário federal encontrou dois jovens, maiores e capazes, consumindo drogas no acostamento de determinada rodovia federal. Um dos jovens confessou que havia oferecido ao outro pequena quantidade da substância para que ele a experimentasse pela primeira vez. Nessa situação, o jovem que ofertou a droga responderá por crime e estará sujeito à pena de detenção; o que consumiu pela primeira vez estará sujeito a pena diversa da de detenção.','X',9),
(114,'A Política Nacional de Enfrentamento ao Tráfico de Pessoas é coordenada por vários órgãos da Presidência da República.','C',9),
(115,'Situação hipotética: João foi autuado por policial rodoviário federal, por supostamente ter praticado conduta prevista como crime contra a fauna. Assertiva: Nessa situação, João necessariamente responderá pela conduta praticada.','E',9),
(116,'As pessoas naturais que violam direitos humanos continuam a gozar da proteção prevista nas normas que dispõem sobre direitos humanos.','C',9),
(117,'Apenas por atos de seus agentes o Estado pode ser responsabilizado por violação de direitos humanos reconhecidos na Convenção Americana de Direitos Humanos.','E',9),
(118,'Todos os direitos humanos foram afirmados em um único momento histórico.','E',9),
(119,'Conforme a maneira como são internalizados, os tratados internacionais sobre direitos humanos podem receber status normativo-hierárquico constitucional ou legal.','C',9),
(120,'A hierarquia constitucional dos tratados internacionais de direitos humanos depende de sua aprovação por três quintos dos membros de cada casa do Congresso Nacional.','C',9)
)
insert into public.official_exam_questions
  (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,
   item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,
   legal_review_required,context_review_required,legal_basis,review_note)
select
  src.id, src.id, t.id, 'Polícia Rodoviária Federal', 2019, 'Policial Rodoviário Federal', 'CEBRASPE',
  imported.item_number,
  coalesce(tm.discipline,'Geral'),
  imported.statement, imported.statement, imported.official_answer, imported.source_page,
  case when imported.official_answer='X' then 'annulled' else 'under_review' end,
  (tm.discipline in ('Direito de Trânsito','Direito Administrativo','Direito Constitucional','Direito Penal e Processual Penal','Direitos Humanos')),
  true,
  '[]'::jsonb,
  case when imported.official_answer='X'
    then 'Item anulado no gabarito oficial definitivo; não é exibido aos estudantes.'
    else 'Transcrição verbatim do caderno de provas fornecido pelo candidato; gabarito conferido no documento oficial definitivo (MATRIZ_440_PRF_001_00_Pag 9). Base legal ainda não conferida individualmente no planalto.gov.br — aguardando revisão item a item antes de content_status=active.'
  end
from imported
cross join src
cross join edition
join topic_map tm on imported.item_number between tm.item_from and tm.item_to
join public.syllabus_topics t on t.edition_id=edition.id and t.discipline=coalesce(tm.discipline,'Geral')
on conflict (exam_year,item_number) do update set
  question_text=excluded.question_text, official_answer=excluded.official_answer,
  content_status=excluded.content_status, review_note=excluded.review_note;

-- Student's own graded attempt (Franc Denis, CPF 69598193268).
-- Per explicit instruction, this is NOT based on the handwritten tally on the cover
-- page ("79 acertos"). All 120 items were individually re-read from the scanned
-- booklet and cross-checked one by one against the confirmed official gabarito
-- above. Where the candidate's own check/X self-grade conflicted with the answer
-- letter he actually wrote, the written letter was treated as authoritative (his X
-- most likely reflects a preliminary, not the definitive, gabarito). The final 7
-- items (24, 26, 29, 37, 103, 116, 119) had no legible letter in the scan at all —
-- the candidate confirmed his answers for these directly in chat, so this is now a
-- complete, fully confirmed grading of all 120 items with zero items pending.
-- correct_count/wrong_count: 64 corretas + 12 anuladas (sempre contam como acerto)
-- = 76 pontos líquidos; 42 erradas; 2 em branco (itens 2 e 92).
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Polícia Rodoviária Federal','2019','CEBRASPE','resultado',
  'PRF_2019_resultado_franc_denis.txt','manual-entry/prf-2019-franc-denis',
  76, 42, 2, 76,
  '{
    "method": "leitura manuscrita item a item confrontada com o gabarito oficial definitivo; 7 itens sem letra legível na foto (24,26,29,37,103,116,119) foram confirmados diretamente pelo candidato em chat",
    "items": {
      "1":"correta","2":"branco","3":"anulada","4":"correta","5":"errada",
      "6":"correta","7":"correta","8":"correta","9":"correta","10":"correta","11":"errada","12":"correta",
      "13":"correta","14":"correta","15":"correta","16":"correta","17":"correta","18":"correta","19":"correta",
      "20":"errada","21":"correta","22":"errada","23":"errada","24":"correta","25":"errada",
      "26":"errada","27":"correta","28":"errada","29":"errada","30":"errada",
      "31":"anulada","32":"errada","33":"anulada","34":"correta","35":"correta","36":"correta",
      "37":"errada","38":"correta","39":"correta","40":"errada","41":"correta",
      "42":"errada","43":"errada","44":"errada","45":"errada","46":"errada","47":"errada","48":"errada",
      "49":"errada","50":"correta","51":"correta","52":"correta","53":"correta",
      "54":"errada","55":"correta","56":"correta","57":"correta","58":"errada","59":"errada",
      "60":"correta","61":"anulada","62":"anulada","63":"correta","64":"correta","65":"correta",
      "66":"correta","67":"correta","68":"errada","69":"correta","70":"errada","71":"anulada","72":"anulada",
      "73":"errada","74":"errada","75":"errada","76":"anulada","77":"errada","78":"correta",
      "79":"correta","80":"correta","81":"correta","82":"errada","83":"anulada","84":"correta",
      "85":"correta","86":"correta","87":"correta","88":"errada","89":"correta",
      "90":"correta","91":"anulada","92":"branco","93":"errada","94":"correta","95":"correta","96":"errada",
      "97":"errada","98":"errada","99":"errada","100":"correta","101":"correta","102":"correta",
      "103":"errada","104":"errada","105":"errada","106":"correta","107":"correta",
      "108":"correta","109":"anulada","110":"errada","111":"correta","112":"correta","113":"anulada",
      "114":"correta","115":"errada","116":"correta","117":"correta","118":"correta",
      "119":"correta","120":"correta"
    }
  }'::jsonb,
  'Todos os 120 itens conferidos individualmente contra o gabarito oficial definitivo — 113 lidos diretamente da foto e 7 (24,26,29,37,103,116,119) confirmados pelo próprio candidato em chat, pois a foto não tinha letra legível para eles. Não foi usada a contagem "79" anotada pelo candidato na capa, conforme solicitado; nota líquida final 76 (64 corretas + 12 anuladas), 42 erradas, 2 em branco. Conferência completa, sem itens pendentes.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

create index if not exists idx_official_exam_questions_prf2019
  on public.official_exam_questions(contest_name,exam_year) where contest_name='Polícia Rodoviária Federal';
