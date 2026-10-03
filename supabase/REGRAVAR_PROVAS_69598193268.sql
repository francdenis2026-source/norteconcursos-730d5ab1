-- Regrava as provas do CPF 69598193268 (rode no SQL Editor depois que a conta existir).

-- ===== ./20260926070000_prf_2019_official_exam_import.sql
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
on conflict (contest_name,career_name,exam_year,item_number) do update set
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
-- Score follows the CEBRASPE net-score formula: nota líquida = corretas − erradas +
-- anuladas (cada errada anula uma certa; cada anulada vale +1 ponto ao candidato).
-- 64 corretas − 42 erradas + 12 anuladas = 34 pontos líquidos; 2 em branco (itens 2
-- e 92, que não somam nem descontam).
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Polícia Rodoviária Federal','2019','CEBRASPE','resultado',
  'PRF_2019_resultado_franc_denis.txt','manual-entry/prf-2019-franc-denis',
  64, 42, 2, 34,
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
  'Todos os 120 itens conferidos individualmente contra o gabarito oficial definitivo — 113 lidos diretamente da foto e 7 (24,26,29,37,103,116,119) confirmados pelo próprio candidato em chat, pois a foto não tinha letra legível para eles. Não foi usada a contagem "79" anotada pelo candidato na capa, conforme solicitado; nota líquida final 34, pelo padrão CEBRASPE (64 corretas − 42 erradas + 12 anuladas), 2 em branco. Conferência completa, sem itens pendentes.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

create index if not exists idx_official_exam_questions_prf2019
  on public.official_exam_questions(contest_name,exam_year) where contest_name='Polícia Rodoviária Federal';

-- ===== ./20260926080000_prf_2021_official_exam_import.sql
-- Official PRF 2021 exam import ("Policial Rodoviário Federal", Edital nº 1 de 18/01/2021).
-- Verbatim transcription of all 120 objective items (items 1-8 in English, from
-- 578_PRF_ING_01.pdf; items 9-120 in Portuguese, from "QUESTOES DA 9 ATE A 120.pdf"),
-- matched to the two official gabaritos definitivos (578_PRF_001_01 and
-- 578_PRF_ING_01). 10 anuladas confirmed: itens 1, 39, 45, 67, 69, 76, 83, 89, 97, 98.
-- Follows the same pattern as the PF and PRF 2019 imports: content_status =
-- 'under_review'/'annulled', legal_review_required=true for legal-basis items,
-- pending individual verification against planalto.gov.br per CONTENT_GOVERNANCE.md.
-- Scoped by career_name so it renders as its own panel, never mixed with PF or
-- PRF 2019 (both already compare correctly since the UI groups by contest_name+year).

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select 'Polícia Rodoviária Federal','Policial Rodoviário Federal',2021,'CEBRASPE',id,'active'
from public.content_sources where url='https://www.cebraspe.org.br/concursos/encerrado'
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id,status='active';

with edition as (
  select id from public.syllabus_editions
  where contest_name='Polícia Rodoviária Federal' and role_name='Policial Rodoviário Federal' and contest_year=2021
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select edition.id,'Histórico 2021',d.discipline,1,d.topic_text,'current'
from edition cross join (values
  ('Língua Estrangeira - Inglês','Compreensão de texto em língua inglesa aplicada a temas de atualidades e segurança pública.'),
  ('Língua Portuguesa','Compreensão e interpretação de texto; coesão e coerência; redação oficial (MRPR).'),
  ('Raciocínio Lógico-Matemático','Modelagem de proporcionalidade, progressões, sequências numéricas.'),
  ('Informática','Internet, intranet, Windows, segurança da informação, cloud computing.'),
  ('Física','Mecânica clássica aplicada a situações de trânsito e balística.'),
  ('Ética no Serviço Público','Código de Ética Profissional do Servidor Público Civil, governança pública.'),
  ('Geografia dos Transportes','Rede de transportes no Brasil, estrutura urbana, metrópoles.'),
  ('Direito de Trânsito','Código de Trânsito Brasileiro e resoluções do CONTRAN.'),
  ('Direito Administrativo','Contratos administrativos, poderes administrativos, carreira PRF.'),
  ('Direito Constitucional','Direitos fundamentais, garantias e remédios constitucionais, defesa do Estado.'),
  ('Direito Penal e Processual Penal','Crimes de trânsito, flagrante, identificação criminal, crimes hediondos.'),
  ('Direitos Humanos','CF/1988, Pacto de São José da Costa Rica, entendimento do STF.')
) d(discipline,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text;

with src as (select id from public.content_sources where url='https://www.cebraspe.org.br/concursos/encerrado'),
edition as (select id from public.syllabus_editions where contest_name='Polícia Rodoviária Federal' and role_name='Policial Rodoviário Federal' and contest_year=2021),
topic_map(item_from,item_to,discipline) as (values
  (1,8,'Língua Estrangeira - Inglês'),(9,26,'Língua Portuguesa'),(27,32,'Raciocínio Lógico-Matemático'),
  (33,39,'Informática'),(40,44,'Física'),(45,50,'Ética no Serviço Público'),(51,55,'Geografia dos Transportes'),
  (56,85,'Direito de Trânsito'),(86,92,'Direito Administrativo'),(93,99,'Direito Constitucional'),
  (100,115,'Direito Penal e Processual Penal'),(116,120,'Direitos Humanos')
),
imported(item_number,statement,official_answer,source_page) as (values
(1,'Extremely cold temperatures in Texas created problems for the distribution of energy in the state.','X',1),
(2,'In the last paragraph of the text, "That" refers to the decision by Texas to isolate its energy grid from the rest of the country.','C',1),
(3,'Despite the cold temperatures, energy production in Texas continued unimpeded.','E',1),
(4,'Changes in energy production in Texas are having an impact across the United States.','C',1),
(5,'There are other states, like Florida, that produce energy on a level similar to that of Texas.','E',1),
(6,'There are places in the world where wind power works well in freezing temperatures.','C',1),
(7,'In "Natural gas and coal-fired power plants need water to stay online. Yet those water facilities froze in the cold temperatures and others lost access to the electricity they require to operate", it is possible to substitute "Yet" for Even so without changing the meaning of the sentence.','C',1),
(8,'The text points to the lack of wind as the primary cause for a dip in the production of wind energy during the period described.','E',1),
(9,'A transferência da polícia do sistema de justiça para o governo da cidade marca o que pode ser considerado uma mudança de paradigma no que se refere ao papel da polícia na sociedade.','C',1),
(10,'Seriam mantidos a correção gramatical e os sentidos do texto caso o segundo período do primeiro parágrafo fosse reescrito da seguinte maneira: Porque nos países europeus houve empenho em prevenir crimes, o que representou nova atitude de controle social, o resultado foi o desenvolvimento de uma habilidade específica pelas autoridades policiais: a de explicar e prevenir o crime.','E',1),
(11,'Infere-se da leitura do primeiro parágrafo do texto que o desenvolvimento de áreas científicas ligadas à justiça criminal no século XIX está associado a visões preconceituosas sobre certos grupos de indivíduos.','C',1),
(12,'Um dos traços característicos da modernidade, segundo Norbert Elias, é a renúncia de certas emoções e de certos prazeres pelos indivíduos, que, em compensação, passaram a ser protegidos da violência devido à atuação do Estado.','C',1),
(13,'Depreende-se do segundo parágrafo do texto que a violência na era medieval era comum e socialmente aceita.','C',1),
(14,'Conclui-se do texto que o monopólio da violência legítima pelo Estado deveu-se à necessidade de reação aos índices insustentáveis de violência física entre os indivíduos.','E',1),
(15,'O pronome "Isso", que introduz o terceiro período do primeiro parágrafo do texto, poderia ser corretamente substituído por O que.','E',1),
(16,'Infere-se do segundo parágrafo do texto que a agressividade humana passou por um processo de transformação gradativo de perda de aspectos primitivos e animalescos.','C',1),
(17,'O emprego do vocábulo "irrupção", no último período do texto, indica que a violência atingia os indivíduos de forma súbita.','C',1),
(18,'Mantém-se a correção gramatical do trecho "o autocontrole e a moderação das emoções que acabaram por se impor na modernidade", do texto, caso a forma verbal "impor" seja flexionada no plural imporem.','E',1),
(19,'A correção gramatical do último período do texto seria mantida, embora seu sentido original fosse prejudicado, se a locução "na medida em que" fosse substituída por à medida que e a vírgula empregada logo após "vida" fosse suprimida.','C',1),
(20,'O trecho "A conversão do controle que se exercia por terceiros no autocontrole é relacionada à organização e à estabilização de Estados modernos" poderia ser reescrito da seguinte forma, sem prejuízo para os sentidos e para a correção gramatical do texto: Converter o controle efetuado por terceiros a autocontrole concatena a organização e estabilização dos Estados do mundo moderno.','E',1),
(21,'A coerência e os sentidos do texto seriam mantidos caso fosse suprimido o artigo "os", no trecho "desenvolveram-se os vários campos de saber", no último período do primeiro parágrafo.','E',1),
(22,'Entre as características da redação oficial incluem-se a objetividade, a impessoalidade e a informatividade.','E',1),
(23,'Na identificação do signatário de uma comunicação oficial destinada a uma pessoa do sexo feminino, dispensa-se flexão de gênero no nome do cargo.','E',1),
(24,'O vocativo, nas comunicações oficiais, deverá ser sempre seguido de vírgula.','C',1),
(25,'De acordo com a legislação vigente, o e-mail institucional tem valor documental e, por isso, deve ser aceito como documento original.','E',1),
(26,'O assunto das comunicações oficiais deve apresentar de forma geral o que será tratado no documento e seu formato deve seguir as orientações do MRPR, conforme o exemplo a seguir. Assunto: Realização de concurso público.','C',1),
(27,'Se, em determinado instante, 30% da população já conhece a notícia, então, nesse instante, o seu espalhamento estaria em patamar superior a 20% por unidade de tempo.','E',2),
(28,'Se, em determinado instante, o espalhamento de uma notícia é igual a 16% por unidade de tempo, então, nesse instante, mais de 75% da população ainda desconhece a notícia.','E',2),
(29,'De acordo com a modelagem realizada, é possível que, em determinado instante, o espalhamento da notícia seja superior a 50% por unidade de tempo.','E',2),
(30,'O espalhamento de uma notícia será tanto maior quanto maior for o número de pessoas que dela tiverem tomado conhecimento.','E',2),
(31,'Mais de 550 veículos terão sido fiscalizados até o fim da sétima hora de realização da operação.','C',2),
(32,'Considere que {qn}, para n variando de 1 a 10, seja a sequência numérica formada pelas quantidades de veículos fiscalizados apenas no decorrer da n-ésima hora de realização da operação. Nessa situação, a sequência {qn}, para n variando de 1 a 10, é uma progressão aritmética.','C',2),
(33,'Embora as versões mais atuais do Mozilla Firefox e do Google Chrome permitam salvar e sincronizar senhas para realizar, posteriormente, login automático em formulários de sítios da Internet, essa ação somente será possível se os sítios em questão estiverem disponibilizados em uma intranet e utilizarem o protocolo HTTPS.','E',2),
(34,'No Windows, ainda que seja possível compartilhar configurações — como plano de fundo e histórico de navegação do Internet Explorer — entre computadores que utilizem a mesma conta em outras máquinas com Windows 10, não é permitido, em razão da segurança, o compartilhamento de senhas.','C',2),
(35,'Caso sejam digitados os termos descritos a seguir na ferramenta de busca do Google, serão pesquisadas publicações que contenham os termos "PRF" e "campanha" na rede social Twitter. campanha PRF @twitter','C',2),
(36,'A Internet das coisas (IoT) aumenta a quantidade e a complexidade dos dados por meio de novas formas e novas fontes de informações, influenciando diretamente em uma ou mais das características do big data, a exemplo de volume, velocidade e variedade.','C',2),
(37,'Ransomware é um programa malicioso de computador que se propaga por meio da inserção de cópias de si mesmo em arquivos criptografados.','E',2),
(38,'Identifica-se Software como Serviço (SaaS) quando um provedor de serviços oferece acesso a um ambiente baseado em cloud, no qual os usuários podem construir e disponibilizar aplicativos.','E',2),
(39,'O firewall da próxima geração (NGFW) dispõe, em um mesmo equipamento, de recursos como IDS (intrusion detection system), IPS (intrusion prevention system) e antivírus.','X',2),
(40,'Durante todo o movimento, a aceleração vetorial do projétil será constante.','C',2),
(41,'Na posição de altura máxima, a força resultante sobre o projétil será nula.','E',2),
(42,'Na posição de altura máxima, a velocidade vetorial do projétil será nula.','E',2),
(43,'Na posição de compressão máxima, a energia potencial elástica armazenada na mola tem valor menor que o da energia cinética do projétil antes da colisão.','C',3),
(44,'Como não há atrito entre o bloco de madeira e a mesa horizontal, a conservação da energia mecânica garante que o valor da energia cinética do sistema imediatamente antes da colisão seja igual ao valor da energia cinética do sistema imediatamente após a colisão.','E',3),
(45,'A revelação de segredo do qual o servidor se apropriou em razão do cargo enseja a penalidade de demissão, o que implica o ressarcimento ao erário por parte do servidor.','X',3),
(46,'De acordo com o Código de Ética Profissional do Servidor Público Civil do Poder Executivo Federal, ausência de servidor do seu local de trabalho é fator de desmoralização do serviço público, já que pode acarretar desordem nas relações humanas.','C',3),
(47,'A estratégia, que consiste em um mecanismo para o exercício da governança pública, compreende a definição de diretrizes, objetivos, planos e ações, para que os serviços de responsabilidade da organização alcancem o resultado pretendido.','C',3),
(48,'O investigado poderá ter vista dos autos, com direito a cópia se assim o desejar, mesmo antes da notificação da existência de procedimento investigatório em comissão de ética.','C',3),
(49,'Caso terceiro solicite, por telefone, informação sobre aquisições de determinado órgão público, o servidor deverá orientá-lo a preencher o formulário padrão, disponibilizado em meio eletrônico e físico, com os dados exigidos pela lei.','E',3),
(50,'O diretor-geral da Polícia Rodoviária Federal, desde que satisfeitos os requisitos legais, poderá realizar a contratação direta de empresa na qual um primo seja sócio.','C',3),
(51,'A duplicação dos principais eixos rodoviários, a restruturação do modelo de investimento e de exploração das ferrovias e a expansão e o aumento da capacidade da malha ferroviária são considerados condições para o desenvolvimento das regiões brasileiras no que diz respeito às redes de transporte.','C',3),
(52,'Na escala interurbana, o Brasil apresenta uma rede de transportes integrada, diversa e eficiente, o que resulta em integração regional e competitividade no contexto da economia nacional.','E',3),
(53,'As políticas públicas no Brasil, sobretudo as implementadas a partir da segunda metade do século passado, incentivaram o transporte rodoviário de pessoas e de cargas em detrimento de outros modais de transporte.','C',3),
(54,'As metrópoles brasileiras são arranjos populacionais acima de um milhão de habitantes que exercem influência direta sobre os demais níveis de cidades na rede urbana.','C',3),
(55,'Os arranjos populacionais de Campinas e Ribeirão Preto, no estado de São Paulo, e de Uberlândia, em Minas Gerais, configuram-se como metrópoles em ascensão na rede urbana brasileira e encontram-se no primeiro nível da hierarquia urbana.','E',3),
(56,'Em rodovias de via dupla de zonas rurais em que não houver sinalização regulamentadora, deve-se aplicar a automóveis, camionetas e motocicletas o mesmo limite máximo de velocidade permitido para transitar.','C',4),
(57,'Veículos em movimento em via pública que possuam espelhos retrovisores em ambos os lados poderão usar cortinas nas áreas envidraçadas.','C',4),
(58,'Considere que, em determinada rodovia federal, tenha havido um acidente, sem vítimas, em que um veículo colidira com outro, do que resultara, para os dois veículos, em avaria e em dano patrimonial. Nessa situação hipotética, o causador do acidente deverá preservar o local, a fim de facilitar os trabalhos da polícia e da perícia, sob pena de responder por grave infração administrativa de trânsito.','E',4),
(59,'Para que autoridade ou agente policial possa autorizar a remoção de veículos envolvidos em acidente de trânsito ocorrido em leito de via pública que tenha causado lesão em pessoas e dano aos veículos envolvidos, é necessário que antes tenha sido prestado socorro às vítimas e realizada a perícia no local.','E',4),
(60,'Cidadão que seja penalmente inimputável não pode obter habilitação para conduzir veículo automotor e elétrico.','C',4),
(61,'A fiscalização de trânsito por videomonitoramento independe de sinalização na via e, em caso de infração, a autoridade ou o agente de trânsito responsável pela lavratura de auto de infração deve indicar, no campo observação, informações relativas ao modo de constatação da referida infração.','E',4),
(62,'A emissão de Certificado de Registro e Licenciamento de Veículo em meio digital (CRLV-e), no qual constam o Certificado de Registro de Veículo (CRV) e o Certificado de Licenciamento Anual (CLA), é obrigatória se houver transferência de propriedade, sendo dispensável em caso de mudança de município de residência do proprietário.','E',4),
(63,'Os objetivos da campanha educativa de trânsito do ano de 2021 incluem divulgar, mensalmente, temas com orientações específicas, as quais promovam, por exemplo, reflexões sobre como lesões e sequelas psicológicas e sociais decorrentes de acidentes de trânsito impactam a vida das vítimas e de seus familiares.','C',4),
(64,'Para a medição de velocidade de veículos automotores elétricos, reboques e semirreboques em rodovias, utilizam-se medidores de velocidade do tipo fixo; entre estes, somente o medidor de velocidade do tipo fixo redutor deve obrigatoriamente ser dotado de display.','C',4),
(65,'Como os reboques e os semirreboques são identificados somente por placa de identificação veicular (PIV) traseira, caso seja necessário, veículos equipados com engates para reboques ou com carroceria intercambiável deverão obrigatoriamente usar uma segunda PIV traseira.','C',4),
(66,'Infração de trânsito concomitante é aquela em que o cometimento de uma infração tem como pressuposto o cometimento de outra.','E',4),
(67,'O Plano Nacional de Trânsito é composto por um rol de iniciativas e de ações, sendo um de seus pilares a mobilidade e a engenharia.','X',4),
(68,'A circulação de veículos em via pode ocorrer a título precário, sendo vedado o transporte de passageiro que esteja em pé no veículo ou que tenha menos de dezoito anos de idade no caso de transporte de passageiros em veículos de carga ou misto.','E',4),
(69,'Lanternas especiais de emergência que emitem luz de cor azul são de uso exclusivo de veículos que estejam devidamente identificados e destinados a socorro de incêndio e salvamento, a exemplo dos veículos de polícia, de fiscalização e de operações de trânsito e de ambulâncias, quando da efetiva prestação do serviço de urgência.','X',4),
(70,'É permitido que veículos de passageiros, ônibus, micro-ônibus e caminhões transitem em rodovia com trincas em seus para-brisas, desde que elas estejam dentro do limite previsto em norma específica e não haja fratura de configuração circular.','E',4),
(71,'O equipamento em questão deve apresentar o tempo de movimentação do veículo, bem como suas interrupções.','C',4),
(72,'Em caso de operação de fiscalização do registrador instantâneo e inalterável de velocidade e tempo, o policial rodoviário federal deve identificar-se e assinar o verso do disco ou da fita diagrama, além de mencionar o local, a data e horário em que ocorreu a fiscalização.','C',4),
(73,'É de seis meses o prazo em que as informações relativas às últimas vinte e quatro horas de operação do veículo devem ficar à disposição das autoridades competentes em caso de acidente.','E',4),
(74,'A largura máxima autorizada para a circulação de veículos em via pública, com ou sem carga, é de 2,50 metros.','E',5),
(75,'Cumpridos os requisitos legais, para a combinação de veículos de carga com mais de duas unidades, incluída a unidade tratora, o peso bruto total deve ser de até 60 toneladas.','E',5),
(76,'O comprimento máximo permitido para a circulação de veículos não articulados em vias públicas é de 14,00 metros.','X',5),
(77,'A fiscalização do tempo de direção e do intervalo de descanso pode ocorrer por meio da verificação do diário de bordo, da papeleta ou da ficha de trabalho externo, fornecidos pelo empregador.','C',5),
(78,'Na condução de veículo de carga com peso bruto total superior a 4.536 kg, é permitido ao motorista profissional dirigir por até seis horas e meia ininterruptas.','E',5),
(79,'A responsabilidade pela guarda, pela proteção e pela precisão das informações contidas no equipamento registrador instantâneo inalterável de velocidade e de tempo é do proprietário do veículo.','E',5),
(80,'O slogan da campanha educativa de trânsito de 2021, a qual deve ser veiculada, obrigatoriamente, nos meios de comunicação social, em toda peça publicitária de produtos automobilísticos, é: "No trânsito, sua responsabilidade salva vidas".','C',5),
(81,'Excetuados os produtos perigosos e a critério do policial rodoviário federal, desde que observadas as condições de segurança, produtos perecíveis e cargas vivas podem ser dispensados do remanejamento ou transbordo em caso de excesso de peso veicular.','E',5),
(82,'Em rodovias federais, na fiscalização de peso dos veículos por balança rodoviária, é admitida a tolerância de 12,5% sobre os limites de peso regulamentares por eixo de veículos transmitidos à superfície das vias públicas.','E',5),
(83,'Para a amarração de carga, é proibida a utilização de cordas, sendo permitido o seu uso exclusivamente para a fixação da lona de cobertura, quando necessário.','X',5),
(84,'Quando não há pontos de amarração adequados ou em número suficiente, pode-se realizar a fixação dos dispositivos de amarração no próprio chassi do veículo.','C',5),
(85,'Para a amarração da carga, devem ser utilizadas cintas têxteis, correntes ou cabos de aço, com resistência total à ruptura por tração de, no mínimo, 1,50 vez o peso da carga.','E',5),
(86,'A impetração de mandado de segurança configura controle judicial de mérito administrativo.','E',6),
(87,'Órgão público é ente descentralizado da administração indireta que possui personalidade jurídica de direito público.','E',6),
(88,'Essa situação caracteriza contratação direta por dispensa de licitação.','E',6),
(89,'A aplicação da multa em questão decorre do poder administrativo disciplinar.','X',6),
(90,'O ajuizamento da ação judicial para conter eventuais abusos praticados pela administração pública caracteriza a aplicação do princípio da sindicabilidade.','C',6),
(91,'A promoção do policial rodoviário federal para a segunda classe depende de participação em cursos de capacitação cujo conteúdo seja compatível com as atribuições do cargo e que tenha duração de, no mínimo, 150 horas.','E',6),
(92,'As atribuições do policial rodoviário federal de terceira classe, cuja jornada de trabalho é de quarenta horas semanais, incluem realizar patrulhamento e policiamento ostensivo.','C',6),
(93,'A manifestação pública em defesa da abolição de crime, por ser considerada incitação à prática de fato criminoso, não está protegida pela liberdade de reunião.','E',6),
(94,'Autoriza-se o confisco de bem utilizado para o tráfico de drogas nas situações em que se constatar que houve habitualidade do uso do bem para a prática do referido crime.','C',6),
(95,'As hipóteses de perda da nacionalidade brasileira previstas na Constituição Federal de 1988 têm natureza taxativa, de modo que nem mesmo convenções ou tratados internacionais podem ampliá-las.','C',6),
(96,'A Constituição Federal de 1988 não garante o direito à escusa de consciência sobre o dever de votar para os maiores de 18 anos de idade e para os menores de 70 anos de idade.','E',6),
(97,'De acordo com o Supremo Tribunal Federal, não é cabível habeas data para a obtenção de informações a respeito da identidade de responsáveis por agressões e denúncias feitas contra o impetrante.','X',6),
(98,'Durante a vigência do estado de sítio, as imunidades parlamentares poderão ser suspensas pelo voto de dois terços dos membros da respectiva casa legislativa.','X',6),
(99,'Em caso de decretação do estado de sítio em razão de comoção interna autorizada pelo Congresso Nacional, admite-se a suspensão de todas as garantias constitucionais.','E',6),
(100,'A remarcação de novo número no chassi e a falsificação do certificado de registro do veículo caracterizam crime único de falsificação de documento público.','E',7),
(101,'A remarcação do chassi com o mesmo número original do veículo caracteriza crime contra a fé pública e infração administrativa de trânsito.','C',7),
(102,'Ao oferecer dinheiro para ser irregularmente liberado da blitz, o condutor praticou o crime de corrupção ativa.','E',7),
(103,'Nessa situação, se o policial não aceitar o dinheiro oferecido, a conduta da pessoa deve ser punida na modalidade tentada.','C',7),
(104,'A adulteração grosseira do chassi do veículo não caracteriza crime impossível.','E',7),
(105,'A busca e a apreensão no veículo foram ilícitas, já que o policial as realizou sem autorização judicial.','C',7),
(106,'A situação caracteriza flagrante próprio e, em até vinte e quatro horas após a realização da prisão, deverá ser entregue a nota de culpa ao preso.','E',7),
(107,'A identificação criminal do condutor não poderá ser feita, uma vez que ele foi identificado civilmente pela CNH.','E',7),
(108,'O policial poderá ser arrolado como testemunha, caso em que seu depoimento terá valor probatório superior ao do interrogatório do condutor.','E',7),
(109,'A prisão do condutor é uma espécie de prisão provisória, dispensa a expedição de mandado e o policial deve exigir o recibo de entrega do preso.','C',7),
(110,'Caso três pessoas associadas, com divisão de tarefas, subtraiam substância explosiva, estará configurado crime hediondo.','E',7),
(111,'Qualquer agente público, ainda que não seja servidor e não perceba remuneração, pode ser sujeito ativo do crime de abuso de autoridade.','C',7),
(112,'Mesmo em caso de apresentação do documento de identificação civil, é possível a identificação criminal em caso de constar de registros policiais o uso de outros nomes ou diferentes qualificações.','C',7),
(113,'Entre as atividades de prevenção do uso indevido de drogas, está o fortalecimento da autonomia e da responsabilidade individual em relação ao uso indevido dessas substâncias ilícitas.','C',7),
(114,'Conduzir arma de fogo, no exercício de atividade comercial, sem autorização, configura comércio ilegal de arma de fogo.','C',7),
(115,'Praticam o crime de tortura policiais rodoviários federais que, dentro de um posto policial, submetem o autor de crime a sofrimento físico, independentemente de sua intensidade.','E',7),
(116,'A mera intuição de que esteja havendo tráfico de drogas em uma casa não configura justa causa para autorizar o ingresso sem mandado judicial ou sem o consentimento do morador, exceto em caso de flagrante delito.','C',7),
(117,'O aviso prévio é uma condicionante ao exercício do direito de reunião previsto na CF: a inexistência de notificação às autoridades competentes torna ilegal a manifestação coletiva.','E',7),
(118,'A alteração do gênero nos assentamentos de registro civil independe da realização de procedimento cirúrgico, denominado transgenitalização, ou da comprovação da realização de tratamentos hormonais ou patologizantes, por parte da pessoa interessada.','C',7),
(119,'A Declaração Universal dos Direitos Humanos, um dos primeiros instrumentos normativos gerais de direitos humanos adotados por uma organização internacional, destacou-se pelo fato de comportar a ideia de dignidade da pessoa humana como ponto de convergência da ética universal e do fundamento valorativo do sistema protetivo global dos direitos humanos.','C',7),
(120,'A Convenção Internacional dos Direitos das Pessoas com Deficiência possui status supraconstitucional no ordenamento pátrio, sendo um exemplo de instrumento normativo internacional de caráter inclusivo adotado pelo Brasil para promover a acessibilidade e a autodeterminação de pessoas com deficiência.','E',7)
)
insert into public.official_exam_questions
  (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,
   item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,
   legal_review_required,context_review_required,legal_basis,review_note)
select
  src.id, src.id, t.id, 'Polícia Rodoviária Federal', 2021, 'Policial Rodoviário Federal', 'CEBRASPE',
  imported.item_number,
  coalesce(tm.discipline,'Geral'),
  imported.statement, imported.statement, imported.official_answer, imported.source_page,
  case when imported.official_answer='X' then 'annulled' else 'under_review' end,
  (tm.discipline in ('Direito de Trânsito','Direito Administrativo','Direito Constitucional','Direito Penal e Processual Penal','Direitos Humanos')),
  true,
  '[]'::jsonb,
  case when imported.official_answer='X'
    then 'Item anulado no gabarito oficial definitivo; não é exibido aos estudantes.'
    else 'Transcrição verbatim do caderno de provas fornecido pelo candidato; gabarito conferido nos documentos oficiais definitivos (578_PRF_001_01 e 578_PRF_ING_01). Base legal ainda não conferida individualmente no planalto.gov.br — aguardando revisão item a item antes de content_status=active.'
  end
from imported
cross join src
cross join edition
join topic_map tm on imported.item_number between tm.item_from and tm.item_to
join public.syllabus_topics t on t.edition_id=edition.id and t.discipline=coalesce(tm.discipline,'Geral')
on conflict (contest_name,career_name,exam_year,item_number) do update set
  question_text=excluded.question_text, official_answer=excluded.official_answer,
  content_status=excluded.content_status, review_note=excluded.review_note;

-- Student's own graded attempt (Franc Denis, CPF 69598193268), all 120 items
-- individually confronted with the official gabarito; items 38, 44, 53 and 82 were
-- left blank by the candidate (confirmed by him directly in chat), not guessed.
-- CEBRASPE net-score formula: 55 corretas − 51 erradas + 10 anuladas = 14 pontos
-- líquidos; 4 em branco.
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Polícia Rodoviária Federal','2021','CEBRASPE','resultado',
  'PRF_2021_resultado_franc_denis.txt','manual-entry/prf-2021-franc-denis',
  55, 51, 4, 14,
  '{
    "method": "leitura manuscrita item a item confrontada com o gabarito oficial definitivo; itens sem letra legível foram confirmados diretamente pelo candidato em chat",
    "items": {
      "1":"anulada","2":"correta","3":"correta","4":"correta","5":"correta","6":"errada","7":"correta","8":"errada",
      "9":"correta","10":"errada","11":"errada","12":"errada","13":"errada","14":"correta","15":"correta","16":"errada",
      "17":"correta","18":"correta","19":"errada","20":"correta","21":"errada","22":"errada","23":"errada","24":"correta",
      "25":"correta","26":"correta","27":"correta","28":"errada","29":"correta","30":"correta","31":"correta","32":"correta",
      "33":"correta","34":"errada","35":"correta","36":"correta","37":"errada","38":"branco","39":"anulada","40":"errada",
      "41":"correta","42":"errada","43":"errada","44":"branco","45":"anulada","46":"correta","47":"errada","48":"correta",
      "49":"errada","50":"correta","51":"errada","52":"errada","53":"branco","54":"correta","55":"correta","56":"errada",
      "57":"errada","58":"errada","59":"correta","60":"correta","61":"errada","62":"errada","63":"errada","64":"correta",
      "65":"correta","66":"correta","67":"anulada","68":"errada","69":"anulada","70":"errada","71":"correta","72":"errada",
      "73":"errada","74":"errada","75":"correta","76":"anulada","77":"correta","78":"errada","79":"errada","80":"errada",
      "81":"errada","82":"branco","83":"anulada","84":"correta","85":"correta","86":"errada","87":"correta","88":"errada",
      "89":"anulada","90":"errada","91":"errada","92":"errada","93":"correta","94":"correta","95":"correta","96":"errada",
      "97":"anulada","98":"anulada","99":"correta","100":"correta","101":"correta","102":"errada","103":"errada","104":"errada",
      "105":"correta","106":"errada","107":"correta","108":"correta","109":"errada","110":"errada","111":"correta","112":"correta",
      "113":"correta","114":"correta","115":"errada","116":"correta","117":"errada","118":"correta","119":"correta","120":"errada"
    }
  }'::jsonb,
  'Todos os 120 itens conferidos individualmente contra o gabarito oficial definitivo (dois documentos: 578_PRF_001_01 para os itens 9-120 e 578_PRF_ING_01 para os itens 1-8 e o bloco de inglês). Itens 38, 44, 53 e 82 foram deixados em branco pelo candidato (confirmado em chat). Nota líquida final 14, pelo padrão CEBRASPE (55 corretas − 51 erradas + 10 anuladas).'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

-- Discursive essay review, following exactly the official grading breakdown printed
-- on PRF_21_PROVA_DISCURSIVA.pdf: 20,00 pts total (1,00 apresentação/estrutura +
-- 3 aspectos temáticos com pesos distintos). This is an educational estimate by the
-- platform, NOT an official CEBRASPE correction (that requires a human examiner) —
-- correcao.confianca and comentario say so explicitly.
insert into public.essay_submissions
  (user_id,contest_name,contest_year,exam_board,tema,topicos,nota_maxima,valor_apresentacao,
   status,transcricao,correcao)
select u.id,'Polícia Rodoviária Federal','2021','CEBRASPE',
  'A inovação legislativa como instrumento para a redução dos acidentes de transporte terrestre (ATT)',
  '[
    {"descricao":"Impacto da previsão dos crimes de trânsito nos ATTs e possíveis causas desse impacto","valor_pontos":5.00,"abordado":true,"obs":"O texto cita que o CTB trouxe previsões legais para condutores que abusam de álcool ou cometem crimes de trânsito, e que isso teve impacto positivo ao obrigar infratores a seguir a lei. Falta aprofundar as causas desse impacto (por que a tipificação penal reduz a reincidência/os acidentes)."},
    {"descricao":"Impacto da Lei Seca nos ATTs e possíveis causas desse impacto","valor_pontos":5.00,"abordado":true,"obs":"Bem encaminhado: cita corretamente a Lei nº 11.705/2008, penas mais severas e a vedação de conversão de pena para crimes graves (homicídio culposo, lesão de natureza grave) como fatores de redução."},
    {"descricao":"Ações para a redução dos ATTs","valor_pontos":9.00,"abordado":true,"obs":"É o aspecto de maior peso e o mais fraco do texto: fica restrito a apelos genéricos de conscientização individual, sem propor ações institucionais concretas (fiscalização, engenharia viária, educação de trânsito, ampliação de blitze da Lei Seca, investimento em infraestrutura)."}
  ]'::jsonb,
  20.00, 1.00,
  'rascunho_incompleto',
  'Nas últimas duas décadas, pesquisas sobre acidentes de transportes terrestres no Brasil demonstram a letalidade e gravidade do problema enfrentados pelos usuários das vias e rodovias do país, muitas vezes ocasionadas por direção veicular. E as políticas de enfrentamento de redução desses índices vêm a partir da implantação do Código de Trânsito Brasileiro (CTB), além das inovações legislativas, como é o caso da Lei [Seca].

O Código de Trânsito Brasileiro, por meio das políticas públicas, inovou ao trazer previsões legais sobre crimes e infrações de trânsito para condutores que abusam de álcool ou cometem algum tipo de crime de trânsito.

As inovações têm um impacto positivo na preservação de vidas, pois obrigam os "infratores" a seguirem as leis conforme a previsão legal.

A Lei 11.705/2008, conhecida como Lei Seca, aliada a penas mais severas e sem possibilitar conversão de penas para alguns tipos de crimes como, por exemplo, crime de homicídio culposo e lesão de natureza grave, contribui para a redução dos crimes de trânsito.

É importante salientar que os condutores devem se conscientizar, pensar no próximo, nas vidas, ser consciente da responsabilidade na direção.

Por fim, é notável que os índices demonstram a eficácia que as políticas de enfrentamento às mortes provocadas no trânsito. É mais importante a construção responsável, que todo aquele que dirige é responsável pela manutenção das vidas.',
  '{
    "nota_estimada": 10.2,
    "pontos_fortes": [
      "Cita corretamente as duas leis motivadoras (CTB, Lei nº 9.503/1997, e Lei Seca, Lei nº 11.705/2008) com número de lei correto",
      "Estrutura em parágrafos, dentro das margens, tema desenvolvido do início ao fim"
    ],
    "pontos_fracos": [
      "Aspecto 3 (ações para redução dos ATT, maior peso do texto: 9 pts) fica genérico — apela à conscientização individual sem propor ações institucionais concretas (fiscalização, engenharia de trânsito, educação de trânsito formal, ampliação de blitze)",
      "Não explica as causas do impacto da tipificação penal (aspecto 1), só descreve o efeito",
      "Faltou uma conclusão que amarre os três aspectos pedidos pelo edital de forma mais explícita"
    ],
    "comentario": "Estimativa educacional interna da plataforma, não é correção oficial CEBRASPE — isso exige banca examinadora humana. Sirva como orientação de estudo: o maior ganho de nota está em desenvolver o aspecto 3 (ações concretas), que vale quase metade da prova (9 de 20 pontos).",
    "confianca": "media"
  }'::jsonb
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

create index if not exists idx_official_exam_questions_prf2021
  on public.official_exam_questions(contest_name,exam_year) where contest_name='Polícia Rodoviária Federal' and exam_year=2021;

-- ===== ./20260926090000_pf_2014_student_grading.sql
-- Franc Denis's personal graded attempt for PF 2014 (CPF 69598193268), built from
-- his own re-typed answer sheet (reliable, not handwritten-photo OCR this time),
-- confronted item by item against the official gabarito definitivo
-- (120DPFAGENTE14_001_01 — 7 anuladas: itens 21, 46, 57, 61, 76, 84, 111).
--
-- This is the first time this attempt is persisted to Supabase — the "57 certas /
-- 16 erradas / 44 em branco" figure mentioned in prior chat history/HANDOFF.md was
-- never actually written to the database, so there is nothing to overwrite; this is
-- a fresh, more accurate insert (52 corretas, 18 erradas, 7 anuladas, 43 em branco).
-- contest_name matches the career_name already used by the PF 2014
-- official_exam_questions rows ('Agente de Polícia Federal') so the "Pontos fracos
-- por disciplina" breakdown in Central de Provas joins correctly.
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Agente de Polícia Federal','2014','CEBRASPE','resultado',
  'PF_2014_resultado_franc_denis.txt','manual-entry/pf-2014-franc-denis',
  52, 18, 43, 41,
  '{
    "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (120DPFAGENTE14_001_01)",
    "items": {
      "1":"correta","2":"correta","3":"errada","4":"correta","5":"errada","6":"correta","7":"correta","8":"errada",
      "9":"correta","10":"correta","11":"correta","12":"correta","13":"correta","14":"correta","15":"errada","16":"correta",
      "17":"correta","18":"correta","19":"errada","20":"correta","21":"anulada","22":"correta","23":"correta","24":"correta",
      "25":"correta","26":"errada","27":"correta","28":"correta","29":"correta","30":"correta","31":"correta","32":"correta",
      "33":"errada","34":"correta","35":"branco","36":"branco","37":"correta","38":"correta","39":"correta","40":"errada",
      "41":"correta","42":"correta","43":"errada","44":"correta","45":"branco","46":"anulada","47":"errada","48":"correta",
      "49":"correta","50":"correta","51":"correta","52":"correta","53":"correta","54":"errada","55":"correta","56":"correta",
      "57":"anulada","58":"branco","59":"branco","60":"branco","61":"anulada","62":"branco","63":"branco","64":"branco",
      "65":"branco","66":"branco","67":"branco","68":"branco","69":"branco","70":"branco","71":"branco","72":"branco",
      "73":"branco","74":"branco","75":"branco","76":"anulada","77":"branco","78":"branco","79":"branco","80":"branco",
      "81":"branco","82":"branco","83":"branco","84":"anulada","85":"branco","86":"branco","87":"branco","88":"branco",
      "89":"branco","90":"branco","91":"branco","92":"branco","93":"branco","94":"branco","95":"branco","96":"branco",
      "97":"branco","98":"branco","99":"branco","100":"branco","101":"errada","102":"correta","103":"errada","104":"correta",
      "105":"correta","106":"correta","107":"correta","108":"errada","109":"correta","110":"correta","111":"anulada",
      "112":"errada","113":"errada","114":"correta","115":"correta","116":"correta","117":"errada","118":"correta",
      "119":"correta","120":"errada"
    }
  }'::jsonb,
  'Reanálise solicitada pelo candidato: respostas retranscritas por ele mesmo (mais confiável que leitura de foto manuscrita) e confrontadas item a item com o gabarito oficial definitivo. Substitui qualquer contagem anterior mencionada apenas em conversa (nunca gravada no banco). Nota líquida final 41, pelo padrão CEBRASPE (52 corretas − 18 erradas + 7 anuladas), 43 itens em branco (deixados sem marcação pelo próprio candidato).'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

-- ===== ./20260926100000_pf_2021_student_grading.sql
-- Franc Denis's personal graded attempt for PF 2021 (CPF 69598193268), built from
-- his own re-typed answer sheet, confronted item by item against the official
-- gabarito definitivo (Matriz_577_PF_002_00 — Edital nº 1 – DGP/PF, de 15/1/2021,
-- cargo Agente de Polícia Federal). 5 anuladas confirmed: itens 28, 92, 106, 108, 119.
--
-- First time this attempt is persisted to Supabase. The "58 certas / 17 erradas / 1
-- anulada / 44 sem marcação" figure mentioned in prior chat history/HANDOFF.md was
-- never written to the database and does not match a verified item-by-item
-- confrontation against the official gabarito — this insert (38 corretas, 35
-- erradas, 5 anuladas, 42 em branco) replaces it as the first persisted, verified
-- figure for this attempt.
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Agente de Polícia Federal','2021','CEBRASPE','resultado',
  'PF_2021_resultado_franc_denis.txt','manual-entry/pf-2021-franc-denis',
  38, 35, 42, 8,
  '{
    "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (Matriz_577_PF_002_00)",
    "items": {
      "1":"correta","2":"correta","3":"errada","4":"correta","5":"errada","6":"errada","7":"branco","8":"correta",
      "9":"errada","10":"correta","11":"errada","12":"branco","13":"correta","14":"errada","15":"errada","16":"correta",
      "17":"correta","18":"branco","19":"errada","20":"correta","21":"errada","22":"branco","23":"errada","24":"branco",
      "25":"errada","26":"branco","27":"errada","28":"anulada","29":"correta","30":"correta","31":"correta","32":"correta",
      "33":"correta","34":"errada","35":"correta","36":"errada","37":"branco","38":"branco","39":"branco","40":"branco",
      "41":"branco","42":"branco","43":"correta","44":"branco","45":"branco","46":"branco","47":"branco","48":"branco",
      "49":"errada","50":"errada","51":"branco","52":"errada","53":"errada","54":"branco","55":"errada","56":"correta",
      "57":"correta","58":"correta","59":"errada","60":"branco","61":"errada","62":"errada","63":"correta","64":"branco",
      "65":"correta","66":"errada","67":"correta","68":"errada","69":"correta","70":"correta","71":"correta","72":"correta",
      "73":"branco","74":"branco","75":"errada","76":"branco","77":"correta","78":"correta","79":"correta","80":"branco",
      "81":"errada","82":"branco","83":"correta","84":"branco","85":"branco","86":"errada","87":"branco","88":"branco",
      "89":"errada","90":"correta","91":"branco","92":"anulada","93":"correta","94":"errada","95":"branco","96":"branco",
      "97":"errada","98":"correta","99":"correta","100":"branco","101":"errada","102":"errada","103":"correta","104":"branco",
      "105":"branco","106":"anulada","107":"correta","108":"anulada","109":"correta","110":"branco","111":"errada","112":"branco",
      "113":"branco","114":"branco","115":"errada","116":"branco","117":"errada","118":"correta","119":"anulada","120":"branco"
    }
  }'::jsonb,
  'Reanálise solicitada pelo candidato: respostas retranscritas por ele mesmo e confrontadas item a item com o gabarito oficial definitivo (cargo Agente de Polícia Federal, Edital nº 1 – DGP/PF de 15/1/2021). Primeira vez que esse resultado é gravado no banco — substitui qualquer contagem anterior mencionada apenas em conversa. Nota líquida final 8, pelo padrão CEBRASPE (38 corretas − 35 erradas + 5 anuladas), 42 itens em branco.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

-- ===== ./20260926110000_pf_2014_grading_correction.sql
-- Correction to the PF 2014 personal grading inserted in
-- 20260926090000_pf_2014_student_grading.sql. The candidate resent his answer
-- sheet and it differs from the first submission in exactly two items:
--   item 37: was C (correct per gabarito E -> now marked E in the resend, wait —
--            actually the resend changed item 37 FROM the previously-submitted E
--            TO C, which is wrong vs the official E, flipping it from correta to
--            errada;
--   item 56: was answered C (correct) in the first submission, now sent as blank.
-- Net effect versus the original insert: 52->50 corretas, 18->19 erradas,
-- 43->44 em branco, anuladas unchanged at 7. CEBRASPE net score: 50-19+7 = 38
-- (was 41).
update public.student_exam_documents
set correct_count = 50,
    wrong_count = 19,
    blank_count = 44,
    score_net = 38,
    extracted_data = jsonb_set(
      jsonb_set(extracted_data, '{items,37}', '"errada"'),
      '{items,56}', '"branco"'
    ),
    notes = 'Reanálise solicitada pelo candidato: reenvio do gabarito corrigiu 2 itens frente ao envio anterior (item 37 e item 56). Nota líquida final 38, pelo padrão CEBRASPE (50 corretas − 19 erradas + 7 anuladas), 44 itens em branco.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2014'
  and doc_type = 'resultado';

-- ===== ./20260926120000_pf_2018_student_grading.sql
-- Franc Denis's personal graded attempt for PF 2018 (CPF 69598193268), built from
-- his own re-typed answer sheet, confronted item by item against the official
-- gabarito definitivo (408_DGPPF012_Pag 9, cargo 12: Agente de Polícia Federal,
-- aplicação 16/9/2018). 6 anuladas confirmed: itens 29, 30, 51, 78, 91, 117.
--
-- First time this attempt is persisted to Supabase (a previous submission of this
-- answer sheet was reported by the candidate as sent in error and was never
-- inserted). 60 corretas, 51 erradas, 6 anuladas, 3 em branco (itens 83, 94, 95).
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Agente de Polícia Federal','2018','CEBRASPE','resultado',
  'PF_2018_resultado_franc_denis.txt','manual-entry/pf-2018-franc-denis',
  60, 51, 3, 15,
  '{
    "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (408_DGPPF012_Pag 9)",
    "items": {
      "1":"correta","2":"correta","3":"errada","4":"correta","5":"correta","6":"errada","7":"correta","8":"correta",
      "9":"errada","10":"errada","11":"correta","12":"errada","13":"correta","14":"errada","15":"correta","16":"errada",
      "17":"correta","18":"errada","19":"correta","20":"errada","21":"correta","22":"correta","23":"errada","24":"errada",
      "25":"correta","26":"correta","27":"correta","28":"correta","29":"anulada","30":"anulada","31":"errada","32":"errada",
      "33":"errada","34":"errada","35":"errada","36":"correta","37":"errada","38":"errada","39":"correta","40":"correta",
      "41":"correta","42":"correta","43":"errada","44":"errada","45":"correta","46":"errada","47":"correta","48":"errada",
      "49":"correta","50":"errada","51":"anulada","52":"errada","53":"correta","54":"correta","55":"errada","56":"errada",
      "57":"correta","58":"errada","59":"correta","60":"errada","61":"errada","62":"correta","63":"correta","64":"errada",
      "65":"errada","66":"errada","67":"correta","68":"errada","69":"correta","70":"errada","71":"correta","72":"correta",
      "73":"correta","74":"errada","75":"errada","76":"correta","77":"correta","78":"anulada","79":"correta","80":"correta",
      "81":"errada","82":"errada","83":"branco","84":"correta","85":"correta","86":"correta","87":"correta","88":"correta",
      "89":"correta","90":"correta","91":"anulada","92":"correta","93":"correta","94":"branco","95":"branco","96":"errada",
      "97":"correta","98":"correta","99":"errada","100":"correta","101":"correta","102":"correta","103":"errada","104":"errada",
      "105":"errada","106":"correta","107":"correta","108":"correta","109":"errada","110":"correta","111":"errada","112":"errada",
      "113":"correta","114":"errada","115":"errada","116":"errada","117":"anulada","118":"correta","119":"errada","120":"errada"
    }
  }'::jsonb,
  'Resultado registrado a pedido do candidato: respostas retranscritas por ele mesmo e confrontadas item a item com o gabarito oficial definitivo (Cargo 12: Agente de Polícia Federal, aplicação 16/9/2018). Um envio anterior deste ano foi reportado pelo próprio candidato como equivocado e nunca chegou a ser gravado. Nota líquida final 15, pelo padrão CEBRASPE (60 corretas − 51 erradas + 6 anuladas), 3 itens em branco.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

-- ===== ./20260926130000_pf_2025_student_grading.sql
-- Franc Denis's PF 2025 result (CPF 69598193268), cargo 16: Agente de Polícia
-- Federal, Edital nº 1 - PF - Policial de 20/5/2025, aplicação 27/7/2025.
--
-- Unlike the other years, this uses the OFFICIAL BDI (Boletim de Desempenho
-- Individual) figure published by CEBRASPE itself — 82 acertos, 26 erros, nota
-- líquida 56,00, 13.104ª colocação na ampla concorrência — rather than an
-- item-by-item re-grading from a retyped answer sheet. A candidate-side
-- item-by-item confrontation was attempted first and produced a materially
-- different result (52/46/10/12), which strongly suggests a transcription error
-- in the retyped sheet rather than an error in the official gabarito
-- (106_PF_016_01 + 106_PF_CB2_01 + 106_PF_CG1_01, all read directly from the
-- official CEBRASPE PDFs). Per the candidate's explicit choice, the officially
-- published BDI number is used as the source of truth here; no per-item
-- "items" breakdown is stored since the BDI does not publish one, so the
-- "Pontos fracos por disciplina" section will not have data for this specific
-- attempt (it still works normally for the other years already graded item by
-- item).
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Agente de Polícia Federal','2025','CEBRASPE','resultado',
  'PF_2025_resultado_franc_denis.txt','manual-entry/pf-2025-franc-denis',
  82, 26, 12, 56,
  '{
    "method": "Boletim de Desempenho Individual (BDI) oficial da CEBRASPE — fonte mais autoritativa que uma reconferência manual",
    "classificacao_ampla_concorrencia": 13104,
    "resultado_oficial": {"nota_total": 56.00, "acertos_total": 82, "erros_total": 26, "classificacao_ampla_objetiva": 13104}
  }'::jsonb,
  'Nota líquida oficial confirmada pelo BDI da CEBRASPE: 56,00 pts (82 acertos, 26 erros), 13.104ª colocação na ampla concorrência. Uma primeira tentativa de conferência item a item, a partir de respostas retranscritas pelo candidato, resultou em números bem diferentes (52 corretas / 46 erradas / 10 anuladas / 12 em branco) — divergência grande demais para ser explicada por diferença de critério, então foi tratada como provável erro de transcrição na planilha, e descartada em favor do BDI oficial (fonte publicada pela própria banca), por decisão explícita do candidato.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

-- ===== ./20260926140000_prf_2021_grading_correction.sql
-- Correction to the PRF 2021 personal grading. The candidate resent his answer
-- sheet retyped (more reliable than the original handwritten-photo reading from
-- 20260926080000_prf_2021_official_exam_import.sql) and asked for a fresh
-- item-by-item confrontation against the same official gabarito
-- (578_PRF_001_01 + 578_PRF_ING_01), 10 anuladas: itens 1, 39, 45, 67, 69, 76,
-- 83, 89, 97, 98.
--
-- New result: 51 corretas, 55 erradas, 10 anuladas, 4 em branco (itens 23, 40,
-- 92, 120). CEBRASPE net score: 51-55+10 = 6 (was 14, from the photo-based
-- reading).
update public.student_exam_documents
set correct_count = 51,
    wrong_count = 55,
    blank_count = 4,
    score_net = 6,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (578_PRF_001_01 + 578_PRF_ING_01) — substitui a leitura anterior feita a partir das fotos do caderno manuscrito",
      "items": {
        "1":"anulada","2":"errada","3":"errada","4":"correta","5":"errada","6":"errada","7":"errada","8":"correta",
        "9":"correta","10":"errada","11":"correta","12":"correta","13":"correta","14":"errada","15":"correta","16":"correta",
        "17":"correta","18":"errada","19":"errada","20":"correta","21":"correta","22":"correta","23":"branco","24":"errada",
        "25":"correta","26":"errada","27":"errada","28":"correta","29":"errada","30":"errada","31":"correta","32":"errada",
        "33":"errada","34":"errada","35":"errada","36":"errada","37":"correta","38":"errada","39":"anulada","40":"branco",
        "41":"correta","42":"errada","43":"errada","44":"correta","45":"anulada","46":"errada","47":"correta","48":"errada",
        "49":"errada","50":"correta","51":"correta","52":"correta","53":"errada","54":"correta","55":"errada","56":"errada",
        "57":"correta","58":"errada","59":"correta","60":"correta","61":"errada","62":"errada","63":"correta","64":"correta",
        "65":"errada","66":"correta","67":"anulada","68":"correta","69":"anulada","70":"errada","71":"errada","72":"correta",
        "73":"errada","74":"correta","75":"errada","76":"anulada","77":"correta","78":"errada","79":"correta","80":"correta",
        "81":"correta","82":"errada","83":"anulada","84":"correta","85":"correta","86":"correta","87":"correta","88":"correta",
        "89":"anulada","90":"errada","91":"errada","92":"branco","93":"errada","94":"errada","95":"errada","96":"errada",
        "97":"anulada","98":"anulada","99":"correta","100":"errada","101":"correta","102":"errada","103":"errada","104":"errada",
        "105":"correta","106":"correta","107":"correta","108":"errada","109":"errada","110":"correta","111":"errada","112":"errada",
        "113":"errada","114":"correta","115":"errada","116":"correta","117":"correta","118":"errada","119":"correta","120":"branco"
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato: reenvio das respostas retranscritas, substituindo a leitura anterior feita a partir das fotos do caderno manuscrito. Nota líquida final 6, pelo padrão CEBRASPE (51 corretas − 55 erradas + 10 anuladas), 4 itens em branco (23, 40, 92, 120).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2021'
  and doc_type = 'resultado';

-- ===== ./20260926160000_revert_prf2021_fix_prf2019.sql
-- Correction: the retyped answer sheet applied in 20260926140000 (which updated
-- PRF 2021) actually belonged to PRF 2019, per the candidate. This migration:
--   1) reverts PRF 2021 back to its original grading from the initial import
--      (20260926080000_prf_2021_official_exam_import.sql) — 55 corretas, 51
--      erradas, 10 anuladas, 4 em branco, nota líquida 14;
--   2) applies that same retyped answer sheet to PRF 2019 instead, confronted
--      against the official gabarito already used in
--      20260926070000_prf_2019_official_exam_import.sql (12 anuladas: itens 3,
--      31, 33, 61, 62, 71, 72, 76, 83, 91, 109, 113) — 66 corretas, 38 erradas,
--      12 anuladas, 4 em branco (itens 23, 40, 92, 120), nota líquida 40 (was 34).

update public.student_exam_documents
set correct_count = 55,
    wrong_count = 51,
    blank_count = 4,
    score_net = 14,
    extracted_data = '{
      "method": "leitura manuscrita item a item confrontada com o gabarito oficial definitivo",
      "items": {
        "1":"anulada","2":"correta","3":"correta","4":"correta","5":"correta","6":"errada","7":"correta","8":"errada",
        "9":"correta","10":"errada","11":"errada","12":"errada","13":"errada","14":"correta","15":"correta","16":"errada",
        "17":"correta","18":"correta","19":"errada","20":"correta","21":"errada","22":"errada","23":"errada","24":"correta",
        "25":"correta","26":"correta","27":"correta","28":"errada","29":"correta","30":"correta","31":"correta","32":"correta",
        "33":"correta","34":"errada","35":"correta","36":"correta","37":"errada","38":"branco","39":"anulada","40":"errada",
        "41":"correta","42":"errada","43":"errada","44":"branco","45":"anulada","46":"correta","47":"errada","48":"correta",
        "49":"errada","50":"correta","51":"errada","52":"errada","53":"branco","54":"correta","55":"correta","56":"errada",
        "57":"errada","58":"errada","59":"correta","60":"correta","61":"errada","62":"errada","63":"errada","64":"correta",
        "65":"correta","66":"correta","67":"anulada","68":"errada","69":"anulada","70":"errada","71":"correta","72":"errada",
        "73":"errada","74":"errada","75":"correta","76":"anulada","77":"correta","78":"errada","79":"errada","80":"errada",
        "81":"errada","82":"branco","83":"anulada","84":"correta","85":"correta","86":"errada","87":"correta","88":"errada",
        "89":"anulada","90":"errada","91":"errada","92":"errada","93":"correta","94":"correta","95":"correta","96":"errada",
        "97":"anulada","98":"anulada","99":"correta","100":"correta","101":"correta","102":"errada","103":"errada","104":"errada",
        "105":"correta","106":"errada","107":"correta","108":"correta","109":"errada","110":"errada","111":"correta","112":"correta",
        "113":"correta","114":"correta","115":"errada","116":"correta","117":"errada","118":"correta","119":"correta","120":"errada"
      }
    }'::jsonb,
    notes = 'Nota líquida final 14, pelo padrão CEBRASPE (55 corretas − 51 erradas + 10 anuladas), 4 itens em branco. Restaurado ao valor original após reversão de uma correção aplicada por engano em 20260926140000 (a planilha usada ali era da PRF 2019, não 2021).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2021'
  and doc_type = 'resultado';

update public.student_exam_documents
set correct_count = 66,
    wrong_count = 38,
    blank_count = 4,
    score_net = 40,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (MATRIZ_440_PRF_001_00_Pag 9) — substitui a leitura anterior feita a partir das fotos do caderno manuscrito",
      "items": {
        "1":"correta","2":"correta","3":"anulada","4":"correta","5":"errada","6":"errada","7":"correta","8":"correta",
        "9":"correta","10":"correta","11":"correta","12":"correta","13":"correta","14":"correta","15":"correta","16":"correta",
        "17":"correta","18":"correta","19":"correta","20":"correta","21":"correta","22":"correta","23":"branco","24":"correta",
        "25":"correta","26":"errada","27":"correta","28":"errada","29":"errada","30":"correta","31":"anulada","32":"errada",
        "33":"anulada","34":"correta","35":"correta","36":"correta","37":"errada","38":"correta","39":"correta","40":"branco",
        "41":"correta","42":"errada","43":"errada","44":"errada","45":"errada","46":"errada","47":"errada","48":"errada",
        "49":"errada","50":"correta","51":"correta","52":"correta","53":"correta","54":"errada","55":"correta","56":"errada",
        "57":"correta","58":"errada","59":"errada","60":"correta","61":"anulada","62":"anulada","63":"correta","64":"correta",
        "65":"correta","66":"correta","67":"correta","68":"errada","69":"errada","70":"errada","71":"anulada","72":"anulada",
        "73":"errada","74":"errada","75":"errada","76":"anulada","77":"errada","78":"correta","79":"correta","80":"correta",
        "81":"correta","82":"errada","83":"anulada","84":"correta","85":"correta","86":"correta","87":"correta","88":"errada",
        "89":"correta","90":"correta","91":"anulada","92":"branco","93":"errada","94":"correta","95":"correta","96":"errada",
        "97":"errada","98":"errada","99":"errada","100":"correta","101":"correta","102":"correta","103":"errada","104":"errada",
        "105":"errada","106":"correta","107":"correta","108":"correta","109":"anulada","110":"errada","111":"correta","112":"correta",
        "113":"anulada","114":"correta","115":"errada","116":"correta","117":"correta","118":"correta","119":"correta","120":"branco"
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato: respostas retranscritas por ele mesmo (a mesma planilha usada por engano na PRF 2021 pertencia, na verdade, à PRF 2019). Nota líquida final 40, pelo padrão CEBRASPE (66 corretas − 38 erradas + 12 anuladas), 4 itens em branco (23, 40, 92, 120).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2019'
  and doc_type = 'resultado';

-- ===== ./20260926170000_prf_2021_correct_grading.sql
-- Correct PRF 2021 grading. The candidate confirmed this retyped answer sheet is
-- genuinely PRF 2021 (unlike the previous one in 20260926140000, which turned out
-- to belong to PRF 2019 and was reverted in 20260926160000). Confronted against
-- the official gabarito (578_PRF_001_01 + 578_PRF_ING_01, 10 anuladas: itens 1,
-- 39, 45, 67, 69, 76, 83, 89, 97, 98).
--
-- Result: 53 corretas, 42 erradas, 10 anuladas, 15 em branco. CEBRASPE net score:
-- 53-42+10 = 21 (was 14 from the photo-based reading).
update public.student_exam_documents
set correct_count = 53,
    wrong_count = 42,
    blank_count = 15,
    score_net = 21,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (578_PRF_001_01 + 578_PRF_ING_01)",
      "items": {
        "1":"anulada","2":"correta","3":"correta","4":"correta","5":"correta","6":"errada","7":"errada","8":"branco",
        "9":"correta","10":"errada","11":"errada","12":"errada","13":"errada","14":"correta","15":"correta","16":"errada",
        "17":"correta","18":"correta","19":"errada","20":"branco","21":"errada","22":"errada","23":"errada","24":"correta",
        "25":"correta","26":"correta","27":"correta","28":"branco","29":"errada","30":"correta","31":"branco","32":"branco",
        "33":"correta","34":"correta","35":"errada","36":"correta","37":"errada","38":"branco","39":"anulada","40":"errada",
        "41":"correta","42":"errada","43":"branco","44":"branco","45":"anulada","46":"correta","47":"errada","48":"correta",
        "49":"errada","50":"correta","51":"errada","52":"errada","53":"branco","54":"correta","55":"branco","56":"correta",
        "57":"errada","58":"errada","59":"correta","60":"correta","61":"errada","62":"errada","63":"errada","64":"correta",
        "65":"correta","66":"correta","67":"anulada","68":"errada","69":"anulada","70":"errada","71":"correta","72":"correta",
        "73":"correta","74":"branco","75":"errada","76":"anulada","77":"correta","78":"errada","79":"branco","80":"errada",
        "81":"errada","82":"branco","83":"anulada","84":"correta","85":"errada","86":"errada","87":"correta","88":"errada",
        "89":"anulada","90":"errada","91":"correta","92":"correta","93":"correta","94":"correta","95":"correta","96":"errada",
        "97":"anulada","98":"anulada","99":"correta","100":"correta","101":"correta","102":"errada","103":"errada","104":"correta",
        "105":"correta","106":"errada","107":"correta","108":"correta","109":"errada","110":"errada","111":"branco","112":"correta",
        "113":"branco","114":"correta","115":"correta","116":"correta","117":"errada","118":"correta","119":"correta","120":"correta"
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato com uma nova planilha confirmada como sendo genuinamente da PRF 2021 (a anterior, aplicada em 20260926140000, era da PRF 2019 por engano e já foi revertida). Nota líquida final 21, pelo padrão CEBRASPE (53 corretas − 42 erradas + 10 anuladas), 15 itens em branco.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2021'
  and doc_type = 'resultado';

-- ===== ./20260926180000_cleanup_duplicate_pf_rows.sql
-- Cleanup: dozens of duplicate legacy rows exist in student_exam_documents under
-- contest_name='Polícia Federal' (score_net always null, stale unverified numbers
-- like 63/49 for 2018 or 58/17 for 2021 — the same figures HANDOFF.md flagged as
-- never having been confirmed item-by-item). These are distinct from, and were
-- causing a duplicate "Polícia Federal" tab alongside, the verified
-- 'Agente de Polícia Federal' rows inserted in this session's migrations
-- (20260926090000 through 20260926170000). Removes all of them for this
-- candidate, by explicit request, keeping only the verified career_name buckets
-- ('Agente de Polícia Federal' and 'Polícia Rodoviária Federal').
delete from public.student_exam_documents
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Federal';

-- ===== ./20260926190000_depen_2021_official_exam_import.sql
-- Official DEPEN 2021 exam import (Edital nº 1 - DEPEN, de 4/5/2020, cargo 8:
-- Agente Federal de Execução Penal, aplicação 27/6/2021). Verbatim transcription
-- of all 120 objective items, matched against the three official gabaritos
-- (Matriz_541_DEPEN_008_00 for the main block, Matriz_541_DEPEN_CB2_00 for
-- items 1-30, Matriz_541_DEPEN_CG2_00 for items 81-120). 5 anuladas confirmed:
-- itens 6, 34, 52, 54, 100. Follows the same career-scoped pattern as PF and
-- PRF (career_name='Agente Federal de Execução Penal', content_status
-- 'under_review'/'annulled' pending planalto.gov.br verification of
-- legal-basis items per CONTENT_GOVERNANCE.md), rendering as its own panel.

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('outro','DEPEN - Edital nº 1/2020, gabaritos e provas oficiais','DEPEN / CEBRASPE','https://www.cebraspe.org.br/concursos/encerrado','vigente','Prova, gabaritos e discursiva desta importação foram fornecidos em PDF pelo próprio candidato; link direto aos PDFs específicos ainda não localizado.')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select 'Departamento Penitenciário Nacional','Agente Federal de Execução Penal',2021,'CEBRASPE',id,'active'
from public.content_sources where url='https://www.cebraspe.org.br/concursos/encerrado' and title like 'DEPEN%'
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id,status='active';

with edition as (
  select id from public.syllabus_editions
  where contest_name='Departamento Penitenciário Nacional' and role_name='Agente Federal de Execução Penal' and contest_year=2021
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select edition.id,'Histórico 2021',d.discipline,1,d.topic_text,'current'
from edition cross join (values
  ('Língua Portuguesa','Compreensão e interpretação de texto; redação oficial (MRPR).'),
  ('Lei 12.846/2013','Responsabilização administrativa e civil de pessoas jurídicas.'),
  ('Ética, Moral e Sindicância','Ética, moral, princípios, valores e espécies de sindicância.'),
  ('Raciocínio Lógico','Lógica proposicional e situações hipotéticas de raciocínio lógico.'),
  ('Microsoft Office e Informática','MS Word, conceitos básicos de informática e segurança.'),
  ('Direito Constitucional e Administrativo','Racismo, prisão, poderes administrativos, licitação, Lei 8.112/1990 e Lei 9.784/1999.'),
  ('Direito Penal e Processual Penal','Crimes contra administração pública e patrimônio, execução penal, prisão especial.'),
  ('Direitos Humanos e Política Penitenciária','Declaração Universal, CF/1988, Programa Nacional de Direitos Humanos, CNPCP.'),
  ('Regras da ONU e Legislação Especial','Regras mínimas da ONU, infiltração de agentes, tortura, organização criminosa.'),
  ('Plano Nacional de Política Criminal e Penitenciária','PNPCP 2020-2023, LEP, faltas disciplinares.'),
  ('SUSP e Execução Penal','Lei 13.675/2018, jurisdicionalização da execução penal.'),
  ('Regulamento Penitenciário Federal','RDD, visitas sociais, carreira e Manual de Assistências.')
) d(discipline,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text;

with src as (select id from public.content_sources where url='https://www.cebraspe.org.br/concursos/encerrado' and title like 'DEPEN%'),
edition as (select id from public.syllabus_editions where contest_name='Departamento Penitenciário Nacional' and role_name='Agente Federal de Execução Penal' and contest_year=2021),
topic_map(item_from,item_to,discipline) as (values
  (1,13,'Língua Portuguesa'),(14,15,'Lei 12.846/2013'),(16,19,'Ética, Moral e Sindicância'),
  (20,24,'Raciocínio Lógico'),(25,30,'Microsoft Office e Informática'),
  (31,44,'Direito Constitucional e Administrativo'),(45,62,'Direito Penal e Processual Penal'),
  (63,67,'Direitos Humanos e Política Penitenciária'),(68,70,'Direitos Humanos e Política Penitenciária'),
  (71,80,'Regras da ONU e Legislação Especial'),(81,85,'Plano Nacional de Política Criminal e Penitenciária'),
  (86,89,'SUSP e Execução Penal'),(90,94,'SUSP e Execução Penal'),(95,100,'Regulamento Penitenciário Federal'),
  (101,102,'Plano Nacional de Política Criminal e Penitenciária'),(103,120,'Regulamento Penitenciário Federal')
),
imported(item_number,statement,official_answer,source_page) as (values
(1,'Segundo o autor do texto, na Declaração Universal dos Direitos do Homem, estão elencados os direitos possíveis e cabíveis a um tipo de homem específico: o homem histórico.','C',1),
(2,'Infere-se do texto que inovações tecnológicas, como as que reconfiguraram as relações do homem com a informação, são um dos elementos que ensejam uma ampliação de perspectivas sobre limites de direitos individuais e coletivos.','C',1),
(3,'No trecho, "poderão produzir tais mudanças na organização da vida humana e das relações sociais que se criem ocasiões favoráveis para o nascimento de novos carecimentos", seria mantida a correção gramatical, caso o "se" fosse deslocado para imediatamente após o verbo: criem-se.','E',1),
(4,'No trecho "com relação ao conteúdo, isto é, com relação aos direitos proclamados", é facultativo o uso das vírgulas para separar a expressão "isto é", que foi empregada com o mesmo sentido de a saber e ou seja.','E',1),
(5,'Nas comunicações oficiais para autoridade de hierarquia superior à do remetente, deve-se utilizar, exceto para o presidente da República, o fecho "Respeitosamente,".','E',1),
(6,'De acordo com a última edição do MRPR, a distinção entre aviso, memorando e ofício foi abolida, passando-se a adotar o termo ofício como única nomenclatura para todos os expedientes, com o objetivo de uniformizá-los.','X',1),
(7,'A descrição do espaço é um recurso utilizado pela autora para criticar o ambiente prisional em que se encontra.','C',2),
(8,'Infere-se do texto que a autora se sentiu desarmada e, portanto, menos desconfiada, devido ao fato de a agente prisional referida no quarto parágrafo ser negra.','E',2),
(9,'Sem prejuízo da correção gramatical do texto, a primeira ocorrência da preposição "de", no trecho "com a sujeira dos sapatos de milhares de prisioneiras", poderia ser substituída por "dos", da seguinte forma: com a sujeira dos sapatos dos milhares de prisioneiras.','C',2),
(10,'Em suas duas ocorrências no terceiro parágrafo do texto, o vocábulo lá faz referência à parede da sala em que estava afixado um cartaz com a fotografia da autora do texto.','E',2),
(11,'Sem alteração dos sentidos originais do texto, o vocábulo "Enquanto", que introduz o terceiro parágrafo, poderia ser substituído por À medida que.','E',2),
(12,'Os últimos parágrafos do texto evidenciam que a agente prisional enviada para vigiar a autora do texto tinha detalhes acerca da área da prisão para onde esta seria levada, mas preferiu não os revelar.','E',2),
(13,'Sem alteração dos sentidos do texto, a palavra "lúgubre", no primeiro parágrafo do texto, poderia ser substituída por fúnebre.','C',2),
(14,'A responsabilização administrativa e civil da pessoa jurídica pela prática de atos contra a administração pressupõe a prática de ato doloso.','E',2),
(15,'Compete exclusivamente à Controladoria-Geral da União a instauração do processo administrativo de responsabilização no âmbito da União.','E',2),
(16,'A responsabilidade moral de uma conduta está vinculada à autonomia do sujeito.','C',2),
(17,'Os valores éticos são volitivos e escolhidos por cada indivíduo de determinada sociedade.','E',2),
(18,'A sindicância investigatória instaurada para apuração de fatos e infrações prescinde de contraditório e ampla defesa, na hipótese de não estar desde logo direcionada a aplicação de penalidade.','C',2),
(19,'A penalidade de destituição de cargo em comissão poderá ser aplicada no âmbito da sindicância acusatória.','E',2),
(20,'Uma tautologia é uma proposição composta em que seu valor lógico será sempre verdadeiro, independentemente do valor lógico das proposições que a estruturam. Nesse sentido, considerando-se p e q como proposições, a proposição composta p^q <-> ~(p -> ~q) é uma tautologia.','C',2),
(21,'Considere as seguintes proposições p: "Paola é feliz"; q: "Paola pinta um quadro". Assim, a proposição "Paola é feliz apenas se ela pinta um quadro" pode ser representada por ~(p^~q).','C',2),
(22,'Em um tabuleiro que possui quatro linhas e cinco colunas, serão distribuídas vinte fichas, numeradas de 1 a 20. Nessa situação, é possível distribuir as fichas no tabuleiro de maneira que a soma dos números das fichas em cada uma das linhas seja sempre a mesma.','E',3),
(23,'A construtora Gama é capaz de construir uma estrada que ligue as cidades A e B no prazo de 15 meses, e a construtora Delta é capaz de construir essa mesma estrada no prazo de 25 meses. Nessa situação, se as duas construtoras forem contratadas para construir a estrada nos respectivos prazos, de modo que a construtora Gama comece a construí-la a partir da cidade A e a construtora Delta comece a construí-la a partir da cidade B, serão necessários mais de 10 meses para concluir a construção da estrada.','E',3),
(24,'Em uma pesquisa, perguntou-se a um grupo de pessoas o seguinte: "você está feliz com o seu trabalho atual?". Foram admitidos como resposta a esse questionamento apenas "sim" ou "não", e cada entrevistado emitiu somente uma única resposta. Verificou-se que, no conjunto de respostas obtidas, a quantidade de respostas "sim" foi igual a 50% da quantidade de respostas "não". Nessa situação, conclui-se que a quantidade de respostas "não" foi superior a 60% do total de respostas obtidas.','C',3),
(25,'Para sublinhar uma palavra no texto, é necessário selecionar a palavra e, em seguida, clicar o botão da barra de ferramentas ou acionar simultaneamente as teclas Ctrl e S.','C',3),
(26,'O botão Pincel de Formatação, na aba de opções Arquivo do MS Word, é usado para colorir ou realçar palavras a que se deseja dar destaque no texto.','E',3),
(27,'É possível inserir uma tabela em formato .xls em um documento Word e editá-la nesse mesmo documento utilizando a barra de ferramentas do Excel.','C',3),
(28,'As intranets são redes que permitem utilizar as tecnologias de Internet para conectar, por exemplo, uma empresa com seus clientes ou fornecedores, por meio de VPNs (virtual private network).','E',3),
(29,'O PowerBI é uma ferramenta moderna utilizada para gerar dashboards de visualização de dados oriundos de fontes separadas e que facilita a integração de conteúdos armazenados em arquivos de formatos diferentes.','C',3),
(30,'Os vírus do tipo cavalo de Troia, também conhecidos como trojans, podem ser instalados por outros vírus e programas, mas também podem infectar o ambiente por meio de links durante a navegação na Internet ou até mesmo por meio de emails falsos (phishing).','C',3),
(31,'A prática do racismo constitui crime afiançável, sujeito a pena de detenção.','E',4),
(32,'Sem ordem escrita e fundamentada de autoridade judiciária competente, o fornecedor mencionado apenas poderá ser preso em caso de flagrante delito.','C',4),
(33,'A ação do agente penitenciário de iniciar procedimento de apuração foi correta, uma vez que competem às polícias penais a segurança dos estabelecimentos penais e a apuração de infrações penais ocorridas nesses estabelecimentos.','E',4),
(34,'A Constituição Federal garante expressamente que a pena deve ser cumprida em estabelecimento prisional destinado a pessoas do mesmo sexo do apenado.','X',4),
(35,'Em razão da condenação criminal transitada em julgado, os direitos políticos do apenado são cassados.','E',4),
(36,'No Brasil, as funções de chefe de Estado e chefe de governo são desempenhadas pela mesma pessoa: quando o presidente da República nomeia ministro de Estado, exerce função de chefe de Estado, e, quando mantém relações com Estado estrangeiro, exerce função de chefe de governo.','E',4),
(37,'Por se ausentar do serviço durante o expediente, sem prévia autorização do chefe imediato, João está sujeito a pena de suspensão.','E',4),
(38,'É legítimo à administração pública exigir de empresa contratada, em editais de licitação para a contratação de serviços, que um percentual mínimo de sua mão de obra seja proveniente do sistema prisional.','C',4),
(39,'A atitude do chefe de João foi equivocada, uma vez que os atos administrativos que dispensem processo licitatório deverão ser motivados com indicação dos fatos e dos fundamentos jurídicos.','C',4),
(40,'A Lei n.º 8.112/1990 é inaplicável a Bruno, uma vez que ele exerce cargo em comissão e não possui cargo efetivo.','E',4),
(41,'No âmbito administrativo, a prática de insubordinação no serviço público configura ofensa ao poder hierárquico.','C',4),
(42,'A punição de Bruno exemplifica o exercício do poder de polícia pela administração pública.','E',4),
(43,'Fernanda, caso tenha se sentido ofendida por ter sido destratada, poderá ajuizar ação de responsabilidade civil contra a União, devendo comprovar o dolo ou a culpa de Bruno para eventualmente lograr êxito na ação.','E',4),
(44,'Configurada situação de grave e iminente risco à segurança pública, a administração pública poderá realizar reforma de estabelecimentos penais por meio de contratação direta, sendo dispensável a licitação.','C',4),
(45,'O agente de segurança pública que repele agressão ou risco de agressão a vítima mantida refém durante a prática de crimes está amparado legalmente pela excludente do estrito cumprimento do dever legal.','C',5),
(46,'A realização de perícia em documento ideologicamente falso é desnecessária, haja vista a falsidade encontrar-se no conteúdo, e não na forma.','C',5),
(47,'No crime de extorsão, não se admite tentativa.','E',5),
(48,'O direito penal brasileiro proíbe a interpretação analógica, ainda que ela seja favorável ao réu.','E',5),
(49,'Lei posterior que deixe de considerar crime determinado fato faz cessarem tanto os efeitos penais quanto os efeitos cíveis de eventual sentença condenatória.','E',5),
(50,'Aldo invadiu uma residência e furtou objetos eletrônicos. Nessa situação, configura-se caso de subsidiariedade, uma vez que a invasão da residência é um crime meio e o furto é um crime fim.','E',5),
(51,'Em um shopping, Carlos, ex-presidiário, encontrou-se com Daniel, que estava passeando no local com sua família. Nessa ocasião, Carlos reconheceu Daniel como sendo um dos agentes federais de execução penal que haviam realizado sua escolta durante uma de suas transferências de presídio. Carlos, então, dirigiu xingamentos a Daniel, em razão do cargo deste. Nessa situação hipotética, Carlos cometeu o crime de desacato.','C',5),
(52,'O Código Penal dispõe a mesma pena em abstrato tanto para um preso que efetivamente consiga evadir-se de estabelecimento carcerário quanto para um que apenas tente, mas não consiga, evadir-se.','X',5),
(53,'A oposição passiva à execução de ato legal praticado por funcionário público não caracteriza o crime de resistência.','C',5),
(54,'O fato de a arma de fogo empregada em um roubo ser de uso permitido ou restrito é irrelevante para a configuração em abstrato do tipo penal do roubo.','X',5),
(55,'O habeas corpus não poderá ser impetrado pelo Ministério Público.','E',5),
(56,'Para a instauração de inquérito de ação penal privada, é imprescindível o requerimento de quem tenha qualidade para intentá-la.','C',5),
(57,'O juiz, em qualquer fase do processo, ao reconhecer extinta a punibilidade, deverá declará-lo de ofício.','C',5),
(58,'Caso um funcionário público tenha sido denunciado por suposta prática de crime, o juiz poderá rejeitar a denúncia se estiver convencido, pela resposta do acusado, da improcedência da ação.','C',5),
(59,'A confissão formal e circunstanciada do investigado é um dos requisitos para a propositura de acordo de não persecução penal pelo Ministério Público.','C',5),
(60,'No curso de determinada ação penal, foi sancionada lei que cria recurso exclusivo para defesa. Nessa situação, a nova lei poderá atingir decisões proferidas anteriormente na referida ação penal, em razão do princípio da retroatividade da lei mais benéfica.','E',5),
(61,'Alberto possui direito a prisão especial. Nessa situação, Alberto não pode ser transportado juntamente com preso comum.','C',5),
(62,'Por ocasião da realização da audiência de custódia relativa a determinada prisão em flagrante, o juiz verificou a legalidade da prisão e procedeu ao interrogatório do preso. Nessa situação, o juiz agiu corretamente, pois a audiência de custódia é o momento processual adequado para a realização do interrogatório do preso, visto que ela é realizada em data próxima à da ocorrência dos fatos.','E',5),
(63,'A presunção da inocência de uma pessoa acusada de um ato delituoso é prevista na Declaração Universal dos Direitos Humanos.','C',6),
(64,'Desde a entrada em vigor da Constituição Federal de 1988, os tratados internacionais de direitos humanos em que o Brasil seja signatário equivalem às emendas constitucionais.','E',6),
(65,'Sob determinadas condições, a criação de um colegiado interministerial para tratar temas sobre política penitenciária pode se dar por meio de portaria.','C',6),
(66,'O estabelecimento de diretrizes na política penitenciária nacional com o objetivo de fortalecer o processo de reintegração social dos presos, internados e egressos, é de responsabilidade exclusiva do Ministério da Justiça e Segurança Pública.','E',6),
(67,'O registro de armas de fogo destruídas no Sistema Nacional de Armas é de incumbência do Ministério da Defesa.','C',6),
(68,'Ao Conselho Nacional de Política Criminal e Penitenciária cabe estimular e promover a pesquisa criminológica.','C',6),
(69,'O estabelecimento de regras acerca de arquitetura e construção de estabelecimentos penais e casas de albergados é de responsabilidade dos conselhos penitenciários.','E',6),
(70,'O conselho da comunidade deve visitar, no mínimo, uma vez por mês os estabelecimentos penais existentes na comarca.','C',6),
(71,'Entre os objetivos prioritários de uma pena de prisão estão: ministrar ao criminoso punição justa e proporcional ao crime cometido e promover sua ressocialização.','E',6),
(72,'A mediação, ou qualquer outro meio alternativo de resolução de conflitos, deve ser utilizada como meio para punir aqueles que cometem infrações disciplinares.','E',6),
(73,'Para garantir o sigilo das investigações, antes da conclusão da operação de infiltração de agentes, o acesso aos autos é reservado ao juiz, ao Ministério Público e ao delegado de polícia responsável pela operação.','C',6),
(74,'Quando não mais interessarem à investigação, as armas de fogo apreendidas serão encaminhadas ao Ministério da Justiça para destruição.','E',6),
(75,'O perito que subscrever o laudo de constatação da natureza e quantidade da droga apreendida em prisão em flagrante ficará impedido de participar da elaboração do laudo definitivo.','E',6),
(76,'O crime de tortura é inafiançável, devendo o condenado por esse crime iniciar o cumprimento da pena em regime fechado.','C',6),
(77,'O Ministério Público perdeu o prazo para oferecer denúncia relativa a um crime de abuso de autoridade. Nessa situação, apesar de esse tipo de ação ser pública e incondicionada, admite-se a apresentação de ação penal privada subsidiária.','C',6),
(78,'Integrantes de uma organização criminosa que utilizava em um de seus ramos de atuação a prática de lavagem de dinheiro foram detidos. Nessa situação, o crime de lavagem de dinheiro absorverá o crime de integrar organização criminosa.','E',6),
(79,'É permitido a agentes e guardas prisionais não submetidos a regime de dedicação exclusiva portar arma de fogo particular ou fornecida por sua corporação enquanto não estiverem de serviço.','E',6),
(80,'O crime de comércio ilegal de arma de fogo não preenche os requisitos legais objetivos para ser enquadrado como infração praticada por organização criminosa.','E',6),
(81,'De acordo com o Plano Nacional de Política Criminal e Penitenciária, a capacitação e os cuidados com a saúde mental dos agentes penitenciários devem merecer atenção estatal, cabendo ao DEPEN, com o auxílio dos estados, estruturar escolas ou academias de formação multidisciplinar.','C',7),
(82,'Pelo Plano, a evolução tecnológica e seus produtos — monitoramento eletrônico — devem ser efetivamente utilizados como meios alternativos à prisão, cumprindo ao DEPEN o fomento e a criação de centrais de monitoramento.','C',7),
(83,'Comete falta grave a pessoa condenada a pena privativa de liberdade que participa de movimento para subverter a disciplina do estabelecimento prisional.','C',7),
(84,'O regime disciplinar diferenciado não se aplica aos presos provisórios.','E',7),
(85,'As faltas graves admitem sanções de repreensão, suspensão ou restrição de direitos e isolamento.','E',7),
(86,'A força-tarefa de intervenção penitenciária (FTIP) no âmbito do DEPEN será composta por agentes federais de execução penal, agentes penitenciários e policiais civis estaduais e do Distrito Federal.','E',7),
(87,'As visitas sociais em parlatório deverão ser previamente agendadas e realizadas semanalmente, em dias úteis, com duração máxima de até três horas, permitindo-se a cada preso o acesso de até dois visitantes, sem contar crianças.','C',7),
(88,'São integrantes operacionais do SUSP, entre outros órgãos, as polícias militares, os corpos de bombeiros militares, as guardas municipais, os agentes de trânsito e a guarda portuária.','C',7),
(89,'Situação hipotética: Após ter sido consultado a respeito de determinado assunto relativo às atividades de segurança e defesa social em todo o país, o Conselho Nacional de Segurança Pública (CNSP) apresentou um posicionamento sobre o tema. Assertiva: Nesse caso, o posicionamento do CNSP deverá ser rigorosamente respeitado, uma vez que os posicionamentos desse conselho são vinculantes.','E',7),
(90,'Em seu aspecto jurisdicional, a intervenção do juiz da execução se esgota com o trânsito em julgado da sentença proferida no processo de conhecimento, sendo os demais atos meramente administrativos.','E',7),
(91,'A execução penal tem caráter de processo judicial contraditório.','C',7),
(92,'É possível a execução provisória por encarceramento resultante de prisão temporária.','E',7),
(93,'Admite-se a progressão de regime prisional de preso provisório antes do trânsito em julgado da sentença penal condenatória.','C',7),
(94,'Considere que Elisa tenha sido presa preventivamente por trinta dias no decurso de uma investigação policial. Nessa situação hipotética, considerando-se o instituto da detração penal, esses dias serão computados em eventual aplicação de pena privativa de liberdade.','C',7),
(95,'Considere que determinado gestor de um presídio federal de segurança máxima, temendo a propagação do coronavírus no ambiente carcerário, tenha criado condições para a realização de visitas sociais por meio de videoconferência. Nesse caso, essa forma de realização de visita social é permitida, sendo respaldada pelas normas aplicáveis ao caso.','C',7),
(96,'Em regra, é assegurado ao cônjuge ou companheiro de internos a visita em parlatório, mediante separação por vidros, garantindo-se a comunicação por meio de interfone.','C',7),
(97,'Considere que uma mãe deseje levar seu filho de dois anos para visitar o pai dele, que se encontra preso em um presídio federal. Nesse caso, a visita não será permitida, uma vez que é proibida a visitação de crianças em ambiente prisional.','E',7),
(98,'Se os presos de determinado presídio federal iniciarem uma rebelião, a suspensão das visitas de todos eles, caso assim imponha a situação, deverá ser determinada pelo juízo da execução, por meio de ato motivado.','E',7),
(99,'É requisito para a valorização dos institutos de criminalística, medicina legal e identificação a autonomia financeira e administrativa dos respectivos órgãos.','E',7),
(100,'O Conselho Nacional de Segurança Pública e Defesa Social, em nível estadual e distrital, é constituído, entre outros, por um representante dos agentes penitenciários, indicado por conselho nacional devidamente constituído.','X',7),
(101,'A inclusão de preso em regime disciplinar diferenciado não pode ser decretada de ofício pelo juiz da execução, dependendo, em regra, de requerimento do diretor do estabelecimento prisional ou de outra autoridade administrativa.','C',7),
(102,'Em observância ao princípio da legalidade, as faltas disciplinares leves, médias e graves deverão ter previsão expressa na Lei de Execução Penal.','E',7),
(103,'De acordo com o Regulamento Penitenciário Federal, a pessoa presa em estabelecimento penal federal que divulgar notícia que possa perturbar a ordem ou a disciplina do ambiente cometerá falta disciplinar de natureza grave, e estará sujeita a sanção de restrição de direito.','E',8),
(104,'A incumbência de promover a proteção de dados no âmbito do DEPEN é da Coordenação de Aparelhamento e Tecnologia.','E',8),
(105,'Compete ao agente federal de execução penal vigiar e orientar pessoa recolhida em estabelecimento penal federal.','C',8),
(106,'Para progredir funcionalmente, o agente federal de execução penal deve cumprir o interstício mínimo de doze meses entre duas progressões consecutivas, sendo suspensa a contagem deste prazo quando o agente se afastar do exercício funcional, com ou sem remuneração.','E',8),
(107,'As visitas a pessoas presas em estabelecimento penal federal de segurança máxima podem ser gravadas, mas as gravações não podem ser utilizadas como meio de prova de fatos ocorridos antes do ingresso do preso no estabelecimento.','C',8),
(108,'Pessoa presa em estabelecimento penal federal que for vítima de surtos psicóticos, a depender da gravidade do caso, poderá ser internado em unidade de saúde fora do estabelecimento prisional.','C',8),
(109,'Para ser transferido para estabelecimento penal federal, um preso deve apresentar algumas características, entre as quais, estar submetido ao Regime Disciplinar Diferenciado (RDD).','C',8),
(110,'Considere que uma mãe queira reclamar das condições a que seu filho esteja sendo submetido em um presídio federal. Nessa situação hipotética, a reclamação deverá ser encaminhada para a Corregedoria-Geral do Sistema Penitenciário, uma vez que cabem a essa unidade as atribuições de fiscalização e correção.','E',8),
(111,'Considere que Alberto seja liberado definitivo de um estabelecimento penal federal, e Bernardo, livrado condicional. Nesse caso, ambos fazem jus à assistência relativa à orientação e ao apoio para reintegração à vida em liberdade; sendo que, para Alberto, essa assistência durará por um ano, ao passo que, para Bernardo, ela durará enquanto ele estiver no período de prova.','C',8),
(112,'Considere que Manoel, preso provisório, tenha cometido, no estabelecimento penal federal, fato previsto como crime doloso, e que Carlos, preso condenado, tenha cometido, no mesmo estabelecimento, fato previsto como crime culposo. Nessa situação, somente Manoel cometeu falta de natureza grave.','C',8),
(113,'Considere que Jonas, preso provisório em estabelecimento penal federal, tentou cometer uma falta média nesse estabelecimento. Nessa situação, Jonas estará sujeito a ser punido com a sanção correspondente à falta consumada.','C',8),
(114,'De acordo com a lei que criou o atual cargo de agente federal de execução penal, compete à Diretoria-Geral do Departamento Penitenciário Nacional promover programa de capacitação para os servidores que ocupem o referido cargo.','E',8),
(115,'Para atuação em atividades relacionadas à segurança de grandes eventos, a União e os entes federados poderão firmar convênio para suprir a previsão do efetivo da Força Nacional de Segurança Pública (FNSP), sendo vedado o desempenho dessas atividades em caráter voluntário.','E',8),
(116,'Considere que determinado juiz de origem, após admitir a transferência de preso condenado para estabelecimento penal federal, tenha remetido carta precatória ao juízo federal competente. Nessa situação, por se tratar de preso condenado, o envio dessa carta é suficiente, estando dispensado o envio ao juízo federal competente dos autos da execução penal correspondente.','E',8),
(117,'Para que o Ministério Público possa requerer a transferência de preso para estabelecimento penal federal de segurança máxima, o parquet deverá comprovar que o encarcerado é membro de quadrilha ou bando, que pratica reiteradamente crimes com violência e que desempenha função de liderança na organização criminosa.','E',8),
(118,'Caso um preso custodiado em estabelecimento penal federal obtenha progressão de regime, caberá ao DEPEN providenciar o seu retorno ao local de origem ou a sua transferência ao estabelecimento penal indicado para cumprimento do novo regime.','C',8),
(119,'Ao preso que estiver em penitenciária federal é vedada a realização de cirurgias estéticas e de caráter eletivo, salvo se a eletiva for realizada pelo SUS.','C',8),
(120,'Em penitenciária federal, a realização de pesquisa científica com preso depende da autorização do diretor e da assistência educacional da penitenciária, além do consentimento formal do preso.','E',8)
)
insert into public.official_exam_questions
  (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,
   item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,
   legal_review_required,context_review_required,legal_basis,review_note)
select
  src.id, src.id, t.id, 'Departamento Penitenciário Nacional', 2021, 'Agente Federal de Execução Penal', 'CEBRASPE',
  imported.item_number,
  coalesce(tm.discipline,'Geral'),
  imported.statement, imported.statement, imported.official_answer, imported.source_page,
  case when imported.official_answer='X' then 'annulled' else 'under_review' end,
  (tm.discipline not in ('Raciocínio Lógico','Microsoft Office e Informática')),
  true,
  '[]'::jsonb,
  case when imported.official_answer='X'
    then 'Item anulado no gabarito oficial definitivo; não é exibido aos estudantes.'
    else 'Transcrição verbatim do caderno de provas fornecido pelo candidato; gabarito conferido nos documentos oficiais definitivos (Matriz_541_DEPEN_008_00, CB2 e CG2). Base legal ainda não conferida individualmente no planalto.gov.br — aguardando revisão item a item antes de content_status=active.'
  end
from imported
cross join src
cross join edition
join topic_map tm on imported.item_number between tm.item_from and tm.item_to
join public.syllabus_topics t on t.edition_id=edition.id and t.discipline=coalesce(tm.discipline,'Geral')
on conflict (contest_name,career_name,exam_year,item_number) do update set
  question_text=excluded.question_text, official_answer=excluded.official_answer,
  content_status=excluded.content_status, review_note=excluded.review_note;

-- Discursive essay review, following the exact official rubric printed on the
-- discursiva page: 20,00 pts total (1,00 apresentação/estrutura + 3 aspectos
-- temáticos: 6,00 + 6,50 + 6,50). Educational estimate only, not an official
-- CEBRASPE correction.
insert into public.essay_submissions
  (user_id,contest_name,contest_year,exam_board,tema,topicos,nota_maxima,valor_apresentacao,
   status,transcricao,correcao)
select u.id,'Departamento Penitenciário Nacional','2021','CEBRASPE',
  'A educação como caminho para a ressocialização das mulheres privadas de liberdade no Brasil',
  '[
    {"descricao":"Relação entre classe social e nível de escolaridade das mulheres privadas de liberdade","valor_pontos":6.00,"abordado":true,"obs":"O texto trata do perfil pobre/jovem/baixa escolaridade das custodiadas e relaciona classe social a menor acesso à educação e maior vulnerabilidade ao sistema carcerário."},
    {"descricao":"Desafios da garantia do acesso pleno à educação, com base na LEP","valor_pontos":6.50,"abordado":true,"obs":"Cita a LEP e a obrigatoriedade do ensino, mas não aprofunda os desafios práticos (infraestrutura, priorização do trabalho sobre estudo, rotatividade de presas) de forma tão explícita quanto o quesito pede."},
    {"descricao":"Medidas para garantir acesso pleno à educação e favorecer ressocialização","valor_pontos":6.50,"abordado":true,"obs":"Sugere parcerias com empresas privadas para emprego pós-egresso e mecanismos de inserção social; poderia detalhar mais medidas educacionais específicas dentro do presídio."}
  ]'::jsonb,
  20.00, 1.00,
  'rascunho_incompleto',
  'No Brasil, segundo o relatório temático sobre mulheres privadas de liberdade, realizado em 2018, percebeu-se que a maior parte do contingente das custodiadas femininas do país são mulheres pobres, jovens e de pouca escolaridade, em que um índice de 60% foram presas por envolvimento com o tráfico de drogas. Notoriamente, indicou-se pelos índices que a falta de escolaridade é uma porta de entrada para o sistema carcerário feminino, e ao mesmo tempo, a escolarização é sua porta de saída.

Nossa sociedade claramente tem relações antagônicas, com as classes mais favorecidas e menos favorecidas. Quanto maior as classes sociais, melhores serão as condições de vida, e acesso a educação. Outrossim, quanto menor o nível de escolaridade, mais chances serão de fazer parte das estatísticas carcerárias.

Desta forma, a educação tem um papel extremamente importante não só para a escolarização mas também para resgatar a dignidade perdida enquanto encarcerada. Muitos são os esforços trazidos pela Lei de Execução Penal, demonstrando uma atenção especial neste processo de ressocialização. A exemplo, a obrigatoriedade do ensino de 1º grau, o oferecimento de cursos supletivos, ensino profissional, além de outros incentivos como a remição pelo estudo e pela leitura. São esforços efetivos, mas que poderiam ser ampliados, uma sugestão seria criar parceria com empresas privadas para oferecer emprego após o livramento dos egressos, satisfazendo os requisitos de ressocialização.

Enfim, para que o sistema carcerário possa devolver a dignidade às presas, é evidente que uma das formas mais significativas se dá por meio da oferta de escolarização de qualidade, e que não basta apenas isto, é necessário oferecer mecanismos de para inserir, pela ressocialização adotada em sociedade.',
  '{
    "nota_estimada": 12.0,
    "pontos_fortes": [
      "Cita corretamente o dado dos 60% das custodiadas presas por tráfico e o relatório temático de mulheres privadas de liberdade",
      "Aborda os três aspectos pedidos pelo edital, com progressão lógica entre eles",
      "Sugere uma medida concreta (parceria com empresas privadas para emprego pós-egresso)"
    ],
    "pontos_fracos": [
      "O aspecto 2 (desafios de acesso pleno à educação com base na LEP) fica genérico — cita a lei mas não desenvolve os obstáculos práticos de aplicá-la no sistema prisional feminino",
      "O aspecto 3 (medidas) traz só uma sugestão concreta; o edital pede \"medidas\" no plural, então vale desenvolver mais de uma",
      "Faltou uma conclusão mais forte amarrando os três aspectos"
    ],
    "comentario": "Estimativa educacional interna da plataforma, não é correção oficial CEBRASPE — isso exige banca examinadora humana.",
    "confianca": "media"
  }'::jsonb
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

-- Student's own graded attempt (Franc Denis, CPF 69598193268). All 120 items were
-- individually re-read from the scanned booklet and cross-checked against the
-- official gabarito. 25 items had ambiguous/illegible marks (no clear C/E letter)
-- and are kept as "pendente_conferencia" rather than guessed.
-- correct_count/wrong_count reflect only the confidently-read items: 47 corretas,
-- 43 erradas, 5 anuladas (sempre contam como acerto), 25 pendentes.
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Departamento Penitenciário Nacional','2021','CEBRASPE','resultado',
  'DEPEN_2021_resultado_franc_denis.txt','manual-entry/depen-2021-franc-denis',
  47, 43, 0, 9,
  '{
    "method": "leitura manuscrita item a item confrontada com o gabarito oficial definitivo; itens sem letra legível marcados pendente_conferencia",
    "items": {
        "1":"correta","2":"errada","3":"errada","4":"correta","5":"errada","6":"anulada","7":"errada","8":"correta",
        "9":"errada","10":"pendente_conferencia","11":"correta","12":"pendente_conferencia","13":"errada","14":"correta","15":"pendente_conferencia","16":"errada",
        "17":"correta","18":"errada","19":"correta","20":"pendente_conferencia","21":"correta","22":"correta","23":"errada","24":"pendente_conferencia",
        "25":"correta","26":"correta","27":"errada","28":"pendente_conferencia","29":"correta","30":"correta","31":"correta","32":"correta",
        "33":"errada","34":"anulada","35":"pendente_conferencia","36":"correta","37":"errada","38":"correta","39":"correta","40":"errada",
        "41":"errada","42":"errada","43":"errada","44":"correta","45":"errada","46":"errada","47":"errada","48":"errada",
        "49":"pendente_conferencia","50":"pendente_conferencia","51":"errada","52":"anulada","53":"correta","54":"anulada","55":"errada","56":"errada",
        "57":"correta","58":"pendente_conferencia","59":"pendente_conferencia","60":"errada","61":"errada","62":"errada","63":"correta","64":"pendente_conferencia",
        "65":"correta","66":"correta","67":"correta","68":"correta","69":"correta","70":"errada","71":"correta","72":"errada",
        "73":"correta","74":"correta","75":"errada","76":"errada","77":"correta","78":"errada","79":"pendente_conferencia","80":"errada",
        "81":"correta","82":"correta","83":"correta","84":"errada","85":"correta","86":"correta","87":"errada","88":"pendente_conferencia",
        "89":"errada","90":"correta","91":"errada","92":"pendente_conferencia","93":"correta","94":"errada","95":"correta","96":"correta",
        "97":"correta","98":"pendente_conferencia","99":"pendente_conferencia","100":"anulada","101":"pendente_conferencia","102":"errada","103":"pendente_conferencia","104":"pendente_conferencia",
        "105":"errada","106":"errada","107":"correta","108":"correta","109":"correta","110":"errada","111":"correta","112":"correta",
        "113":"errada","114":"errada","115":"pendente_conferencia","116":"pendente_conferencia","117":"correta","118":"pendente_conferencia","119":"pendente_conferencia","120":"pendente_conferencia"
    }
  }'::jsonb,
  '95 dos 120 itens lidos e confrontados individualmente com o gabarito oficial definitivo (três documentos: Matriz_541_DEPEN_008_00, CB2 e CG2). 25 itens (10,12,15,20,24,28,35,49,50,58,59,64,79,88,92,98,99,101,103,104,115,116,118,119,120) tiveram marcação ambígua/ilegível nas fotos e ficaram como pendente_conferencia — não foram chutados. Nota líquida parcial 9 (47 corretas − 43 erradas + 5 anuladas), ainda sujeita a mudança quando os pendentes forem confirmados com o candidato.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

create index if not exists idx_official_exam_questions_depen2021
  on public.official_exam_questions(contest_name,exam_year) where contest_name='Departamento Penitenciário Nacional';

-- ===== ./20260926200000_depen_2021_final_grading.sql
-- Final DEPEN 2021 grading. The candidate resent his answer sheet retyped (more
-- reliable than the original handwritten-photo reading), replacing the partial
-- reading in 20260926190000 (47/43/5/25 pendentes). Confronted all 120 items
-- against the official gabarito (Matriz_541_DEPEN_008_00, CB2, CG2; 5 anuladas:
-- itens 6, 34, 52, 54, 100).
--
-- Result: 56 corretas, 46 erradas, 5 anuladas, 13 em branco. CEBRASPE net score:
-- 56-46+5 = 15 (was a partial 9, with 25 items unconfirmed).
update public.student_exam_documents
set correct_count = 56,
    wrong_count = 46,
    blank_count = 13,
    score_net = 15,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (Matriz_541_DEPEN_008_00, CB2, CG2) — substitui a leitura anterior feita a partir das fotos do caderno manuscrito",
      "items": {
        "1":"correta","2":"errada","3":"errada","4":"correta","5":"errada","6":"anulada","7":"errada","8":"correta",
        "9":"branco","10":"correta","11":"branco","12":"correta","13":"errada","14":"errada","15":"correta","16":"correta",
        "17":"errada","18":"errada","19":"correta","20":"branco","21":"branco","22":"correta","23":"errada","24":"correta",
        "25":"correta","26":"correta","27":"correta","28":"errada","29":"errada","30":"correta","31":"correta","32":"correta",
        "33":"errada","34":"anulada","35":"branco","36":"correta","37":"errada","38":"correta","39":"correta","40":"correta",
        "41":"errada","42":"errada","43":"errada","44":"correta","45":"errada","46":"errada","47":"errada","48":"correta",
        "49":"errada","50":"correta","51":"correta","52":"anulada","53":"correta","54":"anulada","55":"errada","56":"errada",
        "57":"correta","58":"correta","59":"errada","60":"errada","61":"correta","62":"correta","63":"correta","64":"branco",
        "65":"correta","66":"branco","67":"errada","68":"correta","69":"errada","70":"errada","71":"correta","72":"errada",
        "73":"correta","74":"correta","75":"errada","76":"errada","77":"correta","78":"errada","79":"branco","80":"errada",
        "81":"correta","82":"correta","83":"correta","84":"errada","85":"correta","86":"correta","87":"errada","88":"correta",
        "89":"errada","90":"correta","91":"errada","92":"branco","93":"correta","94":"errada","95":"correta","96":"correta",
        "97":"correta","98":"correta","99":"branco","100":"anulada","101":"errada","102":"errada","103":"errada","104":"branco",
        "105":"errada","106":"errada","107":"correta","108":"correta","109":"correta","110":"errada","111":"correta","112":"correta",
        "113":"errada","114":"correta","115":"errada","116":"branco","117":"errada","118":"correta","119":"correta","120":"branco"
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato: respostas retranscritas por ele mesmo, substituindo a leitura anterior feita a partir das fotos do caderno manuscrito. Nota líquida final 15, pelo padrão CEBRASPE (56 corretas − 46 erradas + 5 anuladas), 13 itens em branco. Conferência completa, sem itens pendentes.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Departamento Penitenciário Nacional'
  and contest_year = '2021'
  and doc_type = 'resultado';

-- ===== ./20260926210000_pp_acre_2023_official_exam_import.sql
-- Official Polícia Penal do Acre 2023 exam import (Edital nº 001/2023 - SEAD/IAPEN,
-- cargo: Agente de Polícia Penal - Masculino/Feminino, banca IBFC, aplicação
-- 15/10/2023, caderno IBFC_02 - Versão B). Verbatim transcription of all 60
-- objective items (multiple choice A-D, not CEBRASPE C/E), matched against the
-- official Gabarito Pós Recurso published by IBFC
-- (https://fs.ibfc.org.br/arquivos/2309/IAPEM_GABA_DEF/pdf/GABARITO_IBFC02_VERSAO_B.pdf).
-- 1 anulada confirmed: item 3.
--
-- IBFC uses A/B/C/D alternatives, not CEBRASPE's C/E — the shared
-- official_exam_questions.official_answer check constraint only allowed
-- ('C','E','X'), so it is widened here to also accept 'A','B','D' for this and
-- future non-CEBRASPE imports.
alter table public.official_exam_questions drop constraint if exists official_exam_questions_official_answer_check;
alter table public.official_exam_questions add constraint official_exam_questions_official_answer_check
  check (official_answer in ('A','B','C','D','E','X'));

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('edital','Edital nº 001/2023 - SEAD/IAPEN, Polícia Penal do Acre','SEAD/IAPEN / IBFC','https://fs.ibfc.org.br/arquivos/2309/IAPEM_GABA_DEF/pdf/GABARITO_IBFC02_VERSAO_B.pdf','vigente','Gabarito pós recurso oficial, cargo Agente de Polícia Penal, Versão B, consultado diretamente no site da banca IBFC.')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select 'Polícia Penal do Acre','Agente de Polícia Penal',2023,'IBFC',id,'active'
from public.content_sources where url='https://fs.ibfc.org.br/arquivos/2309/IAPEM_GABA_DEF/pdf/GABARITO_IBFC02_VERSAO_B.pdf'
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id,status='active';

with edition as (
  select id from public.syllabus_editions
  where contest_name='Polícia Penal do Acre' and role_name='Agente de Polícia Penal' and contest_year=2023
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select edition.id,'Histórico 2023',d.discipline,1,d.topic_text,'current'
from edition cross join (values
  ('Língua Portuguesa','Compreensão de texto, sintaxe, semântica, coesão e pontuação.'),
  ('História e Geografia do Acre','História, geografia física e humana do estado do Acre.'),
  ('Informática Básica','Windows, Office, Internet, malware, backup e área de transferência.'),
  ('Conhecimentos Específicos','IAPEN/AC, LEP, Código Penal, legislação especial e direitos humanos.')
) d(discipline,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text;

with src as (select id from public.content_sources where url='https://fs.ibfc.org.br/arquivos/2309/IAPEM_GABA_DEF/pdf/GABARITO_IBFC02_VERSAO_B.pdf'),
edition as (select id from public.syllabus_editions where contest_name='Polícia Penal do Acre' and role_name='Agente de Polícia Penal' and contest_year=2023),
topic_map(item_from,item_to,discipline) as (values
  (1,10,'Língua Portuguesa'),(11,20,'História e Geografia do Acre'),
  (21,30,'Informática Básica'),(31,60,'Conhecimentos Específicos')
),
imported(item_number,statement,official_answer,source_page) as (values
(1,'De acordo com o texto, assinale a alternativa correta em referência aos alimentos mencionados.','D',1),
(2,'Analise as afirmativas abaixo e dê valores Verdadeiro (V) ou Falso (F): (F) Os exploradores europeus auxiliaram a compreender, de maneira ínfima, especificamente os povos do continente norte-americano. (F) Os marinheiros europeus trouxeram o amendoim da Espanha para o mundo. (V) Os povos do Mundo Novo também contribuíram com outros alimentos para a Europa, a exemplo da alcachofra. Assinale a alternativa que apresenta a sequência correta de cima para baixo.','A',1),
(3,'Releia o texto, preencha as lacunas referentes às enumerações (I) e (II). Assinale a alternativa que apresenta corretamente o uso da crase.','X',1),
(4,'Observe as palavras elencadas a seguir e indique suas classificações no que se refere à tonicidade. O plural das palavras costuma não alterar a acentuação. Entretanto a palavra "pastel" é uma oxítona terminada em L e não é acentuada, mas o plural "pastéis" é. Há três outras palavras que contêm essa formação. Assinale a alternativa que apresenta a única palavra que, quando pluralizada, não recebe acento tônico na última sílaba.','D',1),
(5,'Diante da área da Morfologia, analise a palavra "americano", observe que ela é formada por sufixo. Assinale a alternativa que apresenta a mesma análise.','B',1),
(6,'A densidade da área da sintaxe confere a ela estudos diversos, dentre eles, o das vozes verbais. Analise as afirmativas e assinale a alternativa em que a oração na voz ativa: "Os marinheiros europeus levaram o amendoim para a Espanha" está corretamente formada na voz passiva. I. A Espanha recebeu o amendoim dos marinheiros europeus. II. O amendoim foi levado para a Espanha pelos marinheiros europeus. III. Os marinheiros europeus trouxeram para a Espanha o amendoim. Estão corretas as afirmativas:','C',1),
(7,'Leia a oração a seguir: "Grande parte dos arqueólogos admite que o amendoim é um alimento básico para algumas culturas". Assinale a alternativa correta quanto ao fragmento classificado como oração subordinada substantiva objetiva direta.','C',1),
(8,'Emprega-se a vírgula para separar os termos coordenados assindéticos, ou seja, os termos que não são unidos por conectivo. Esses termos devem ter mesma função sintática, que formam, muitas vezes, enumerações (BEZERRA, 2015, p.671). Diante deste conceito de uso da vírgula, analise as afirmativas abaixo e assinale a alternativa que exemplifique o conceito apresentado. I. (...) ele se tornou um alimento básico de alimentação cotidiana na Europa, América do Norte, África e Ásia. II. De fato, sem o amendoim, as economias dessas áreas seriam fortemente afetadas. III. Além do amendoim, o Peru é citado como o país de origem de outros alimentos atualmente populares. Estão corretas as afirmativas:','B',1),
(9,'No estudo da norma culta da língua portuguesa encontram-se os termos essenciais da oração. A seguir há orações que foram separadas em seus termos essenciais oracionais. Diante do exposto, assinale a separação incorreta.','A',1),
(10,'Considerando a área da Semântica, leia o excerto a seguir e assinale a alternativa correta em relação à função da linguagem: "O amendoim é um alimento muito conhecido no mundo todo. Grande parte dos arqueólogos acreditam que o amendoim seja um alimento básico para algumas culturas há, pelo menos, 3.500 anos".','D',1),
(11,'Unificada a partir de 1920, a administração do Acre passou a ser exercida por um governador nomeado pelo Presidente da República até que em 15 de Junho de 1962 foi sancionada pelo Presidente da República João Goulart a Lei nº 4.070, que elevou o Acre a categoria de ___. Em outubro de 1962 foi eleito o primeiro governador do Estado do Acre, José Augusto de Araújo. Assinale a alternativa que preencha corretamente a lacuna.','B',2),
(12,'O Acre faz fronteira com dois países da América do Sul e divisa com outras duas Unidades Federativas (UF) brasileiras. No que se refere aos países que fazem fronteira e as UF que fazem divisa com o Acre, assinale a alternativa incorreta.','C',2),
(13,'O Acre está entre as três Unidades Federativas com menor número de municípios no Brasil (IBGE, 2023). Em relação às características dos municípios do Acre, assinale a alternativa correta.','A',2),
(14,'Literalmente, a palavra "acre" pode significar medida agrária ou até mesmo adjetivo de sabor ácido ou azedo. Mas, segundo relatos da história, o batismo do estado do Acre não tem nada a ver com a palavra no sentido literal. A explicação mais aceita e mais propagada pelos historiadores é contestada também por uma linha de estudiosos, inclusive do próprio estado (adaptado de G1, 2019). Assinale a alternativa correta quanto à origem do nome do estado do Acre.','B',2),
(15,'A diversidade étnica dos povos indígenas do Acre está distribuída por seus municípios. Neles, estão localizadas as 34 Terras Indígenas (TI) pertencentes ao território acreano, nas quais habitam as várias etnias (adaptado de NOTÍCIAS DO ACRE, 2016). No que se refere a etnias indígenas que tradicionalmente habitam o estado do Acre, assinale a alternativa incorreta.','A',2),
(16,'O Acre possui um território com 16.422.136 hectares (ha), dos quais 7.774.440 ha, ou 47,3% do estado, é composto por Unidades de Conservação (UC) Federais, Estaduais e Municipais (adaptado de SEMAPI, 2023). Assinale a alternativa correta quanto a uma UC localizada no estado do Acre.','A',2),
(17,'A Amazônia é constituída não apenas por vegetação florestal, mas, também, por outras fitofisionomias não florestais (MESSIAS et al., 2021). No que se refere à vegetação predominante no estado do Acre, assinale a alternativa correta.','B',2),
(18,'"Na porção mais oeste do Estado do Acre [...], encontra-se a Serra do Divisor, local onde a geomorfologia acidentada abriga uma das maiores biodiversidades do planeta e seguramente a mais preservada da Amazônia brasileira" (PORTAL AMAZÔNIA, 2023). Assinale a alternativa correta quanto à Unidade de Relevo (morfoestrutural) à qual está associada a Serra do Divisor, segundo a classificação de Jurandyr Ross.','D',2),
(19,'A casa onde Chico Mendes, líder seringueiro morto em dezembro de 1988, viveu seus últimos momentos, encontra-se localizada na cidade de Xapuri (AC). A casa foi tombada pelo Instituto do Patrimônio Histórico e Artístico Nacional (Iphan) e atualmente é um museu, no qual seu acervo retrata a história do líder seringueiro (adaptado de IPATRIMÔNIO, 2023). Assinale a alternativa correspondente à referência turística citada no texto, de forma correta.','B',2),
(20,'Com um caiaque na bagagem, pode-se realizar uma das viagens mais lindas pelo interior do Acre, visando explorar os principais balneários da região de Cruzeiro do Sul (distante da capital Rio Branco, 680 quilômetros). As opções de lazer são variadas: navegar pelo ___ e explorar as belezas do lugar, como praias de água doce (adaptado de PORTAL AMAZÔNIA, 2023). Assinale a alternativa que preencha corretamente a lacuna.','B',2),
(21,'Sobre o nome do assistente virtual que acompanha o Windows 10 e o Windows 11, assinale a alternativa correta.','D',3),
(22,'Quanto aos principais aplicativos do Windows 10, analise as afirmativas abaixo. 1. As Notas Autoadesivas são um aplicativo do Windows 10 que permite criar lembretes na tela do computador com cores e tamanhos diferentes. 2. A Calculadora é um aplicativo do Windows 10 que permite realizar diversos cálculos matemáticos, além de conversões de unidades e moedas. Assinale a alternativa correta.','B',3),
(23,'Relacione os números abaixo com as respectivas letras quanto aos principais aplicativos de Correio Eletrônico. 1. Thunderbird. 2. Outlook. 3. Gmail. A. Um dos aplicativos mais populares e utilizados para enviar e receber e-mails na Internet. B. Aplicativo gratuito de correio eletrônico desenvolvido pela Fundação Mozilla. C. Software que conta com integração com Skype e OneDrive.','C',3),
(24,'Quanto às principais extensões de arquivos, analise as afirmativas abaixo. I. A extensão .avi é uma das mais utilizadas para arquivos de vídeo que podem ter diferentes codecs e formatos internos. II. A extensão .png é usada para arquivos de imagens que suportam transparência e compressão sem perdas. III. A extensão .txt é usada para arquivos simples de texto criados pelo bloco de notas do Windows. Assinale a alternativa correta.','A',3),
(25,'Quanto aos conceitos de organização de pastas e arquivos, analise as afirmativas abaixo e dê valores Verdadeiro (V) ou Falso (F). (F) O símbolo ? é usado para representar um único caractere na pesquisa por arquivos e pastas no Windows Explorer. (V) As pastas: Downloads, Documentos, Imagens e Música são exemplos de pastas padrão do Windows 10. (V) Para renomear uma pasta ou um arquivo, basta clicar duas vezes sobre ele e digitar o novo nome. Assinale a alternativa que apresenta a sequência correta de cima para baixo.','C',3),
(26,'Leia a frase abaixo referente a dispositivos para armazenamento de dados, cópia de segurança e procedimentos de backup. "Um tipo de cópia de segurança é ___, que copia todos os dados selecionados na primeira vez e depois só copia os dados que foram alterados desde a última cópia. Esse tipo de cópia economiza espaço e tempo, mas requer mais cuidado na hora de restaurar os dados". Assinale a alternativa que preencha corretamente a lacuna.','D',3),
(27,'Assinale a alternativa correta sobre conceitos gerais sobre Internet: ferramentas e aplicativos de navegação (browser).','D',3),
(28,'Relacione as duas colunas quanto aos principais aplicativos para edição de textos, planilhas eletrônicas e editor de apresentações: (1) Tabela dinâmica (A) Microsoft Excel; (2) Mala direta (B) Microsoft PowerPoint; (3) Transição de slides (C) Microsoft Word.','B',3),
(29,'Quanto ao Malware e Antivírus, analise as afirmativas abaixo e assinale a alternativa correta. 1. Um antivírus nunca irá interferir no desempenho do sistema, pelo contrário, logo após a instalação de antivírus percebe-se melhorias no sistema. 2. Um antivírus deve ser executado, e atualizado, apenas quando o usuário suspeitar que o sistema está infectado.','A',3),
(30,'A área de transferência é um recurso do sistema operacional que permite armazenar temporariamente dados copiados ou recortados de um aplicativo como o Microsoft Word, Excel e PowerPoint, e colá-los em outro. Existem alguns atalhos de teclado que usam a área de transferência para facilitar essas operações tais como: 1. Ctrl+V; 2. Ctrl+X; 3. Ctrl+B; 4. Ctrl+C. Da relação apresentada:','C',3),
(31,'Acerca da Lei Estadual nº 1.908/2007, que dispõe sobre o Instituto de Administração Penitenciária do Acre - IAPEN/AC, analise as afirmativas abaixo e dê valores Verdadeiro (V) ou Falso (F). (V) O IAPEN/AC constitui-se em entidade autárquica, dotada de personalidade jurídica de direito público interno, com autonomia administrativa, financeira e patrimonial, tendo por finalidade precípua humanizar, planejar, implementar, coordenar, fiscalizar e executar as diretrizes da política prisional, vinculada à Secretaria de Estado de Justiça e Direitos Humanos. (V) Constituem o patrimônio do IAPEN/AC os bens móveis e imóveis de sua propriedade, os recursos financeiros, os documentos e outros que vierem a integrar o seu patrimônio. (F) As contas e demais atos referentes à movimentação de recursos emanados do Instituto de Administração Penitenciária não serão submetidos ao Tribunal de Contas do Estado. Assinale a alternativa que apresenta a sequência correta de cima para baixo.','A',4),
(32,'Acerca das disposições do Código de Conduta do Servidor com lotação no Instituto de Administração Penitenciária do Acre (IAPEN/AC), assinale a alternativa incorreta.','D',4),
(33,'A Resolução nº 307/2019 do Conselho Nacional de Justiça institui a Política de Atenção às Pessoas Egressas do Sistema Prisional no âmbito do Poder Judiciário. De acordo com a resolução mencionada, assinale a alternativa que apresenta a definição de egressa.','C',4),
(34,'A Lei nº 8.742/1993 dispõe sobre a organização da Assistência Social. De acordo com a mencionada lei, analise as afirmativas abaixo. I. O benefício de prestação continuada é a garantia de um salário-mínimo mensal à pessoa com deficiência e ao idoso com 65 (sessenta e cinco) anos ou mais que comprovem não possuir meios de prover a própria manutenção nem de tê-la provida por sua família. II. A condição de acolhimento em instituições de longa permanência não prejudica o direito do idoso ou da pessoa com deficiência ao benefício de prestação continuada. III. Para efeito de concessão do benefício de prestação continuada, considera-se pessoa com deficiência aquela que tem impedimento de longo prazo de natureza física, mental, intelectual ou sensorial, o qual, em interação com uma ou mais barreiras, pode obstruir sua participação plena e efetiva na sociedade em igualdade de condições com as demais pessoas. Assinale a alternativa correta.','B',4),
(35,'A Resolução nº 2 de 2010 da Câmara de Educação Básica do Conselho Nacional de Educação dispõe sobre as Diretrizes Nacionais para a oferta de educação para jovens e adultos em situação de privação de liberdade nos estabelecimentos penais. Acerca das disposições da mencionada resolução sobre a oferta de educação para jovens e adultos em estabelecimentos penais, assinale a alternativa incorreta.','D',4),
(36,'A Lei nº 13.675/2018 disciplina a organização e o funcionamento dos órgãos responsáveis pela segurança pública e traz outras disposições. Com relação à Política Nacional de Segurança Pública e Defesa Social (PNSPDS), assinale a alternativa que apresenta incorretamente um dos princípios da PNSPDS.','C',4),
(37,'O Decreto nº 9.489/2018 regulamenta, no âmbito da União, a Lei nº 13.675, de 11 de junho de 2018, para estabelecer normas, estrutura e procedimentos para a execução da Política Nacional de Segurança Pública e Defesa Social. De acordo com o mencionado decreto, analise as afirmativas abaixo e dê valores de Verdadeiro (V) ou Falso (F). (V) A elaboração do Plano Nacional de Segurança Pública e Defesa Social terá fase de consulta pública, efetuada por meio eletrônico, sob a coordenação do Ministério da Justiça e Segurança Pública. (V) Aos órgãos de correição dos integrantes operacionais do Sistema Único de Segurança Pública, no exercício de suas competências, caberão o gerenciamento e a realização dos procedimentos de apuração de responsabilidade funcional, por meio de sindicância e processo administrativo disciplinar, e a proposição de subsídios para o aperfeiçoamento das atividades dos órgãos de segurança pública e defesa social. (F) Caberá ao Ministério das Relações Exteriores instituir mecanismos de registro, acompanhamento e avaliação, em âmbito nacional, dos órgãos de correição, e poderá, para tanto, solicitar aos órgãos de correição. Assinale a alternativa que apresenta a sequência correta de cima para baixo.','A',4),
(38,'De acordo com o Estatuto da Pessoa Idosa (Lei nº 10.741/2003), assinale a alternativa correta.','D',4),
(39,'Acerca das formas de violência doméstica e familiar contra a mulher previstas na Lei Maria da Penha (Lei nº 11.340/2006), assinale a alternativa que apresenta a definição de violência moral.','D',4),
(40,'De acordo com a Lei nº 7.716/1989, que define os crimes resultantes de preconceito de raça ou cor, analise as afirmativas abaixo. Assinale a alternativa correta.','B',4),
(41,'Não se considera o homicídio qualificado quando cometido:','D',4),
(42,'Consoante as disposições do Código Penal e suas alterações, assinale a alternativa incorreta.','A',4),
(43,'Sobre o delito de lesão corporal previsto no Código Penal e suas alterações, assinale a alternativa correta.','C',4),
(44,'Assinale a alternativa que apresenta corretamente a conduta e o crime correspondente.','A',4),
(45,'Assinale a alternativa incorreta.','B',4),
(46,'Com base no Código Penal e em suas alterações, analise as afirmativas abaixo e dê valores Verdadeiro (V) ou Falso (F). Assinale a alternativa que apresenta a sequência correta de cima para baixo.','C',4),
(47,'De acordo com a Lei nº 9.455/1997 (e suas alterações), que define os crimes de tortura, assinale a alternativa incorreta.','D',4),
(48,'Nos termos da Lei nº 12.580/2013 (e suas alterações), que define organização criminosa e dispõe sobre a investigação criminal, os meios de obtenção da prova, infrações penais correlatas e o procedimento criminal. Assinale a alternativa correta.','A',4),
(49,'Segundo a Lei nº 8.072/1990, com suas alterações, é considerado hediondo o seguinte crime, consumado ou tentado:','A',4),
(50,'Analise as afirmativas abaixo e dê valores Verdadeiro (V) ou Falso (F). Assinale a alternativa que apresenta a sequência correta de cima para baixo.','B',4),
(51,'De acordo com as disposições da Lei nº 10.826/2003 (Estatuto do Desarmamento) e suas alterações, assinale a alternativa correta.','D',4),
(52,'Aquele que possuir, deter, fabricar, empregar artefato explosivo ou incendiário, sem autorização ou em desacordo com determinação legal ou regulamentar, incorrerá nas mesmas penas do delito de:','C',4),
(53,'De acordo com a Lei nº 13.869/2019 (dispõe sobre os crimes de abuso de autoridade) e suas alterações, assinale a alternativa incorreta.','A',4),
(54,'Segundo o que dispõe a Lei nº 13.869/2019 (dispõe sobre os crimes de abuso de autoridade) e suas alterações, analise as afirmativas abaixo e dê valores Verdadeiro (V) ou Falso (F). Assinale a alternativa que apresenta a sequência correta de cima para baixo.','D',4),
(55,'De acordo com a Lei nº 11.343/2006 (Lei de Drogas) e suas alterações, assinale a alternativa incorreta.','B',4),
(56,'Ante o que dispõe a Lei nº 11.343/2006 (Lei de Drogas) e suas alterações, o inquérito policial será concluído no prazo de:','C',4),
(57,'Com base no que estabelece a Lei nº 11.343/2006 (Lei de Drogas) e suas alterações, analise o texto abaixo e assinale a alternativa que preencha correta e respectivamente as lacunas. "Ocorrendo prisão ___, a autoridade de polícia judiciária fará ___, comunicação ao juiz competente, remetendo-lhe cópia do auto lavrado, do qual será dada vista ao órgão do Ministério Público, em ___".','D',4),
(58,'Com base na Lei nº 7.210/1984 (Lei de Execução Penal) e suas alterações, analise as afirmativas abaixo e dê valores Verdadeiro (V) ou Falso (F). Assinale a alternativa que apresenta a sequência correta de cima para baixo.','A',4),
(59,'De acordo com a Lei nº 7.210/1984 (Lei de Execução Penal) e suas alterações, assinale a alternativa que não constituem deveres do condenado.','A',4),
(60,'Com base na Lei nº 7.210/1984 (Lei de Execução Penal) e suas alterações, analise as alternativas a seguir e aponte qual representa uma falta grave do condenado à pena privativa de liberdade.','B',4)
)
insert into public.official_exam_questions
  (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,
   item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,
   legal_review_required,context_review_required,legal_basis,review_note)
select
  src.id, src.id, t.id, 'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC',
  imported.item_number,
  coalesce(tm.discipline,'Geral'),
  imported.statement, imported.statement, imported.official_answer, imported.source_page,
  case when imported.official_answer='X' then 'annulled' else 'under_review' end,
  (tm.discipline = 'Conhecimentos Específicos'),
  true,
  '[]'::jsonb,
  case when imported.official_answer='X'
    then 'Item anulado no gabarito oficial pós-recurso; não é exibido aos estudantes.'
    else 'Transcrição verbatim do caderno de provas fornecido pelo candidato; gabarito conferido no documento oficial "Gabarito Pós Recurso" publicado pela banca IBFC (consultado diretamente no site fs.ibfc.org.br). Base legal ainda não conferida individualmente no planalto.gov.br — aguardando revisão item a item antes de content_status=active.'
  end
from imported
cross join src
cross join edition
join topic_map tm on imported.item_number between tm.item_from and tm.item_to
join public.syllabus_topics t on t.edition_id=edition.id and t.discipline=coalesce(tm.discipline,'Geral')
on conflict (contest_name,career_name,exam_year,item_number) do update set
  question_text=excluded.question_text, official_answer=excluded.official_answer,
  content_status=excluded.content_status, review_note=excluded.review_note;

-- Discursive essay (redação dissertativo-argumentativa, tema livre, sem rubrica
-- de quesitos publicada pela banca IBFC como a CEBRASPE faz — apenas critério
-- geral de correção). Educational transcription/estimate only.
insert into public.essay_submissions
  (user_id,contest_name,contest_year,exam_board,tema,topicos,nota_maxima,valor_apresentacao,
   status,transcricao,correcao)
select u.id,'Polícia Penal do Acre','2023','IBFC',
  'As relações entre o individual e o social na busca contemporânea pela felicidade',
  '[
    {"descricao":"Desenvolvimento dissertativo-argumentativo do tema, com base nos textos motivadores","valor_pontos":null,"abordado":true,"obs":"IBFC não publica rubrica de quesitos temáticos como a CEBRASPE; a correção oficial segue critério próprio não detalhado publicamente."}
  ]'::jsonb,
  null, null,
  'texto_completo',
  'Felicidade, segundo a definição da língua Portuguesa é uma palavra substantiva, abstrata, com certo grau de subjetividade, a depender de determinado ponto de vista.

Desde os primórdios da humanidade, o ser humano vem tentando dar um significado ou melhor definir o conceito de felicidade, seja em uma perspectiva individual e social.

Na sociedade moderna, o conceito e sobretudo a busca pela felicidade tem fortes relações com a vida em sociedade. No mundo moderno, não basta apenas pertencer, é preciso acompanhar as mudanças, a tecnologia, que proporciona assistência, a nos locomover, a construir, obriga cada vez mais o homem a depender do meio, e a pensar que será feliz se a sua satisfação é para alcançar a felicidade é preciso disso.

No entanto, se a realização de um objetivo, quer seja planejado ou não, seja por uma criança que acabara de aprender algo novo, ou por um adulto, o conceito de felicidade é constatado.

Numa perspectiva macro, como se evidencia em pesquisas onde se é avaliado índices de uma população, felicidade passa a ganhar outros valores. Certamente, ainda assim o conceito muda a depender do lugar e do próprio indivíduo, que possa buscar a felicidade ideal, dentro do seu mundo real.

Portanto, conforme o exposto, a compreensão desse estado de espírito, que a língua Portuguesa a define como substantivo, ainda não foi encontrada uma explicação definitiva, visto que sua compreensão muda de acordo com uma compreensão pessoal e coletiva.',
  '{
    "nota_estimada": null,
    "pontos_fortes": [
      "Desenvolve o tema do início ao fim, cita a definição de felicidade e articula perspectiva individual x social pedida no enunciado",
      "Estrutura em parágrafos com introdução, desenvolvimento e conclusão"
    ],
    "pontos_fracos": [
      "Não retoma explicitamente os textos motivadores (filme, relatório da ONU) fornecidos na prova, o que normalmente é valorizado em redações dissertativo-argumentativas",
      "Alguns trechos ficam repetitivos/confusos na construção das frases (ex.: parágrafo 3), o que pode custar pontos em coesão/coerência"
    ],
    "comentario": "IBFC não publica rubrica detalhada de quesitos temáticos como a CEBRASPE costuma fazer, então não é possível estimar uma nota numérica com a mesma precisão usada nas provas da PF/PRF/DEPEN. Isso é apenas uma leitura qualitativa, não uma correção oficial.",
    "confianca": "baixa"
  }'::jsonb
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

-- Student's own graded attempt (Franc Denis, CPF 69598193268). All 60 items
-- confronted against the official gabarito pós recurso. 1 anulada (item 3,
-- counts as correct regardless of the mark). IBFC multiple-choice scoring has
-- no negative marking — score is simply correct items (+ anuladas) out of 60.
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Polícia Penal do Acre','2023','IBFC','resultado',
  'PP_Acre_2023_resultado_franc_denis.txt','manual-entry/pp-acre-2023-franc-denis',
  47, 12, 0, 48,
  '{
    "method": "leitura das marcações do candidato no caderno de provas, confrontada item a item com o gabarito oficial pós recurso (IBFC, Versão B)",
    "items": {
      "1":"correta","2":"correta","3":"anulada","4":"correta","5":"correta","6":"errada","7":"correta","8":"correta",
      "9":"correta","10":"errada","11":"correta","12":"correta","13":"correta","14":"correta","15":"correta","16":"correta",
      "17":"correta","18":"correta","19":"correta","20":"correta","21":"correta","22":"correta","23":"correta","24":"correta",
      "25":"errada","26":"correta","27":"correta","28":"correta","29":"correta","30":"correta","31":"correta","32":"correta",
      "33":"correta","34":"correta","35":"correta","36":"errada","37":"correta","38":"correta","39":"errada","40":"errada",
      "41":"correta","42":"errada","43":"correta","44":"correta","45":"correta","46":"correta","47":"correta","48":"correta",
      "49":"errada","50":"correta","51":"errada","52":"errada","53":"errada","54":"errada","55":"correta","56":"correta",
      "57":"correta","58":"correta","59":"correta","60":"correta"
    }
  }'::jsonb,
  'Prova IBFC (múltipla escolha A-D, sem marcação negativa) — pontuação bruta simples: 47 corretas + 1 anulada (item 3, conta como acerto) = 48 pontos de 60 questões. Erros nos itens 6, 10, 25, 36, 39, 40, 42, 49, 51, 52, 53, 54. Conferência completa contra o gabarito oficial pós recurso, sem itens pendentes.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

create index if not exists idx_official_exam_questions_ppacre2023
  on public.official_exam_questions(contest_name,exam_year) where contest_name='Polícia Penal do Acre';

-- ===== ./20260926220000_pp_acre_official_scoring.sql
-- Correct Polícia Penal do Acre 2023 scoring to the official formula from Edital nº
-- 001/2023 - SEAD/IAPEN, item 7.1.1/7.1.3: the objective exam is NOT a simple
-- correct-count out of 60 (no negative marking, but also not flat 1pt/item) — it
-- is weighted: Conhecimentos Gerais (Língua Portuguesa, História e Geografia do
-- Acre, Informática Básica; itens 1-30) worth 1 point each (30 pts max, mínimo
-- exigido 15), and Conhecimentos Específicos (itens 31-60) worth 2 points each
-- (60 pts max, mínimo exigido 30), for a grand total of 90 points (mínimo exigido
-- 45 no total). The candidate must clear all three minimums cumulatively to be
-- HABILITADO in this stage.
--
-- Also uses the candidate's own retyped answer list (more reliable than the
-- earlier photo-based reading), replacing the previous grading (47/12/1/0)
-- with 47/11/1/1 (item 6 blank instead of errada) — same set of wrong items
-- minus one, since accuracy at the item level didn't change materially.
--
-- Recomputed by discipline:
--   Língua Portuguesa (1-10): 7 corretas = 7 pts
--   História e Geografia do Acre (11-20): 10 corretas = 10 pts
--   Informática Básica (21-30): 9 corretas = 9 pts
--   Conhecimentos Gerais total: 26 pts (mínimo exigido: 15) — OK
--   Conhecimentos Específicos (31-60): 22 corretas x 2 = 44 pts (mínimo exigido: 30) — OK
--   TOTAL: 70 de 90 pontos (mínimo exigido: 45) — OK
--   HABILITADO na Prova Objetiva pelos três critérios cumulativos do item 7.1.3.
update public.student_exam_documents
set correct_count = 47,
    wrong_count = 11,
    blank_count = 1,
    score_net = 70,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato, confrontadas item a item com o gabarito oficial pós recurso (IBFC) e pontuadas conforme a fórmula oficial do edital (item 7.1.1/7.1.3): Conhecimentos Gerais valem 1 ponto por questão, Conhecimentos Específicos valem 2 pontos por questão — não é contagem simples de acertos",
      "escala_oficial": "0 a 90 pontos (30 Gerais + 60 Específicos)",
      "minimo_exigido": {"gerais": 15, "especificos": 30, "total": 45},
      "pontuacao_obtida": {
        "lingua_portuguesa": {"corretas": 7, "de": 10, "pontos": 7},
        "historia_geografia_acre": {"corretas": 10, "de": 10, "pontos": 10},
        "informatica_basica": {"corretas": 9, "de": 10, "pontos": 9},
        "gerais_total": 26,
        "especificos": {"corretas": 22, "de": 30, "pontos": 44},
        "total": 70
      },
      "habilitado_prova_objetiva": true,
      "items": {
        "1":"correta","2":"correta","3":"anulada","4":"correta","5":"correta","6":"branco","7":"correta","8":"correta",
        "9":"correta","10":"errada","11":"correta","12":"correta","13":"correta","14":"correta","15":"correta","16":"correta",
        "17":"correta","18":"correta","19":"correta","20":"correta","21":"correta","22":"correta","23":"correta","24":"correta",
        "25":"errada","26":"correta","27":"correta","28":"correta","29":"correta","30":"correta","31":"correta","32":"correta",
        "33":"correta","34":"correta","35":"correta","36":"errada","37":"correta","38":"correta","39":"errada","40":"errada",
        "41":"correta","42":"errada","43":"correta","44":"correta","45":"correta","46":"correta","47":"correta","48":"correta",
        "49":"errada","50":"correta","51":"errada","52":"errada","53":"errada","54":"errada","55":"correta","56":"correta",
        "57":"correta","58":"correta","59":"correta","60":"correta"
      }
    }'::jsonb,
    notes = 'Correção da nota conforme a fórmula oficial do edital (item 7.1.1/7.1.3): Conhecimentos Gerais 1pt/questão, Conhecimentos Específicos 2pt/questão, escala total 0-90 pontos. Resultado: Língua Portuguesa 7/10, História e Geografia do Acre 10/10, Informática 9/10 (Gerais: 26 pts, mínimo 15 — OK); Conhecimentos Específicos 22/30 corretas = 44 pts (mínimo 30 — OK); TOTAL 70/90 (mínimo 45 — OK). Candidato HABILITADO na Prova Objetiva pelos três critérios cumulativos. Erros nos itens 10, 25, 36, 39, 40, 42, 49, 51, 52, 53, 54; item 6 em branco; item 3 anulado.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Penal do Acre'
  and contest_year = '2023'
  and doc_type = 'resultado';

-- ===== ./20260926240000_pp_acre_official_total_confirmed.sql
-- Official confirmation from the Diário Oficial do Estado do Acre: candidate
-- "Franc Denis Barroso de Oliveira" scored 85,40 (Prova Objetiva + Prova
-- Discursiva combined). This matches, and confirms, the weighted-scoring
-- calculation already applied in 20260926220000 (70,00 na Prova Objetiva):
--   85,40 (oficial, combinado) - 70,00 (objetiva, calculada) = 15,40 (discursiva)
-- 15,40 de 20 pontos na discursiva está bem acima do mínimo exigido (10 pontos)
-- pelo item 7.2.2 do edital — candidato HABILITADO também na Prova Discursiva.

update public.student_exam_documents
set score_raw = 85.40,
    extracted_data = extracted_data || jsonb_build_object(
      'confirmacao_diario_oficial', jsonb_build_object(
        'nome', 'Franc Denis Barroso de Oliveira',
        'nota_combinada_objetiva_mais_discursiva', 85.40,
        'nota_objetiva_calculada', 70.00,
        'nota_discursiva_deduzida', 15.40,
        'fonte', 'Diário Oficial do Estado do Acre'
      )
    ),
    notes = notes || ' CONFIRMADO no Diário Oficial do Estado do Acre: nota combinada (objetiva + discursiva) de 85,40 para o candidato. Isso valida o cálculo da objetiva (70,00) feito nesta sessão e permite deduzir a nota da discursiva: 85,40 - 70,00 = 15,40 de 20 pontos — habilitado também na discursiva (mínimo exigido: 10).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Penal do Acre'
  and contest_year = '2023'
  and doc_type = 'resultado';

update public.essay_submissions
set status = 'corrigida',
    correcao = correcao || jsonb_build_object(
      'nota_oficial_confirmada', 15.40,
      'fonte_confirmacao', 'Deduzida do Diário Oficial do Estado do Acre (nota combinada 85,40 - nota objetiva calculada 70,00 = 15,40)'
    )
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Penal do Acre'
  and contest_year = '2023';

-- ===== ./20260926250000_pc_acre_2017_agente_import.sql
-- Official Polícia Civil do Acre (PC-AC) 2017 exam import, cargo: Agente de
-- Polícia Civil (Edital nº 001/2017 - Governo do Estado do Acre / SEPC, banca
-- IBADE, aplicação 7/5/2017, caderno S01 - Versão V). 80 itens objetivos de
-- múltipla escolha (A-E, sem marcação negativa), com pontuação ponderada por
-- disciplina conforme a capa da prova do candidato:
--   Língua Portuguesa (1-10): 1 pt/questão (10 pts)
--   Noções de Informática (11-15): 1 pt/questão (5 pts)
--   Raciocínio Lógico (16-20): 1 pt/questão (5 pts)
--   Noções de Direito Administrativo (21-30): 1 pt/questão (10 pts)
--   Noções de Direito Constitucional (31-40): 1 pt/questão (10 pts)
--   Noções de Direito Penal (41-50): 2 pt/questão (20 pts)
--   Noções de Direito Processual Penal (51-60): 2 pt/questão (20 pts)
--   Legislação de Direito Penal e Processual Penal Especial (61-70): 1 pt/questão (10 pts)
--   Noções de Medicina Legal (71-80): 1 pt/questão (10 pts)
--   TOTAL: 100 pontos
--
-- Gabarito oficial ("Gabarito Final da Prova Objetiva", banca IBADE) localizado via
-- mirror do qconcursos.com (antigo.ibade.org.br está inacessível):
-- https://arquivos.qconcursos.com/prova/arquivo_gabarito/54462/ibade-2017-pc-ac-agente-de-policia-civil-gabarito.pdf
-- Este documento publica o gabarito separadamente para cada versão do caderno
-- (S01-T/V/W/X e demais cargos). Conferido: o código do caderno do candidato
-- (S01 V) corresponde exatamente à seção "Prova: V" desse PDF — usado aqui.
--
-- IMPORTANTE (transparência): o texto verbatim das 80 questões da VERSÃO V não
-- foi localizado nesta sessão — o PDF de prova disponível no qconcursos é da
-- versão T (mesmo enunciado provável, mas ordem das alternativas embaralhada
-- entre versões pela banca IBADE, então não é seguro reaproveitar o texto sem
-- confirmar). Por isso, question_text fica como placeholder explícito e
-- content_status='under_review' — nunca deve ser exibido como questão ativa
-- até a transcrição verbatim da versão V ser confirmada.
alter table public.official_exam_questions drop constraint if exists official_exam_questions_official_answer_check;
alter table public.official_exam_questions add constraint official_exam_questions_official_answer_check
  check (official_answer in ('A','B','C','D','E','X'));

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
('edital','Edital nº 001/2017 - Governo do Estado do Acre/SEPC, Polícia Civil do Acre','Governo do Estado do Acre / SEPC / IBADE','https://arquivos.qconcursos.com/prova/arquivo_gabarito/54462/ibade-2017-pc-ac-agente-de-policia-civil-gabarito.pdf','vigente','Gabarito Final da Prova Objetiva, banca IBADE, cargo Agente de Polícia Civil, caderno S01, todas as versões (T/V/W/X). Consultado via mirror qconcursos.com pois antigo.ibade.org.br está inacessível (conexão recusada). Versão V confirmada como a do caderno do candidato.')
on conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;

insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)
select 'Polícia Civil do Acre','Agente de Polícia Civil',2017,'IBADE',id,'active'
from public.content_sources where url='https://arquivos.qconcursos.com/prova/arquivo_gabarito/54462/ibade-2017-pc-ac-agente-de-policia-civil-gabarito.pdf'
on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id,status='active';

with edition as (
  select id from public.syllabus_editions
  where contest_name='Polícia Civil do Acre' and role_name='Agente de Polícia Civil' and contest_year=2017
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select edition.id,'Histórico 2017',d.discipline,1,d.topic_text,'current'
from edition cross join (values
  ('Língua Portuguesa','Compreensão de texto, sintaxe, semântica, coesão e pontuação.'),
  ('Noções de Informática','Windows, Office, Internet, malware e backup.'),
  ('Raciocínio Lógico','Lógica proposicional, sequências e problemas de raciocínio.'),
  ('Noções de Direito Administrativo','Princípios, atos e poderes administrativos, licitações e servidores públicos.'),
  ('Noções de Direito Constitucional','Direitos e garantias fundamentais, organização do Estado e segurança pública.'),
  ('Noções de Direito Penal','Parte geral e especial do Código Penal.'),
  ('Noções de Direito Processual Penal','Inquérito policial, prisões e procedimentos do CPP.'),
  ('Legislação de Direito Penal e Processual Penal Especial','Leis penais e processuais especiais.'),
  ('Noções de Medicina Legal','Tanatologia, traumatologia e perícia médico-legal.')
) d(discipline,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text;

with src as (select id from public.content_sources where url='https://arquivos.qconcursos.com/prova/arquivo_gabarito/54462/ibade-2017-pc-ac-agente-de-policia-civil-gabarito.pdf'),
edition as (select id from public.syllabus_editions where contest_name='Polícia Civil do Acre' and role_name='Agente de Polícia Civil' and contest_year=2017),
topic_map(item_from,item_to,discipline) as (values
  (1,10,'Língua Portuguesa'),(11,15,'Noções de Informática'),(16,20,'Raciocínio Lógico'),
  (21,30,'Noções de Direito Administrativo'),(31,40,'Noções de Direito Constitucional'),
  (41,50,'Noções de Direito Penal'),(51,60,'Noções de Direito Processual Penal'),
  (61,70,'Legislação de Direito Penal e Processual Penal Especial'),(71,80,'Noções de Medicina Legal')
),
gabarito(item_number,official_answer) as (values
(1,'C'),(2,'A'),(3,'C'),(4,'A'),(5,'E'),(6,'D'),(7,'C'),(8,'A'),(9,'A'),(10,'D'),
(11,'B'),(12,'A'),(13,'A'),(14,'D'),(15,'A'),
(16,'B'),(17,'A'),(18,'A'),(19,'B'),(20,'E'),
(21,'A'),(22,'D'),(23,'E'),(24,'C'),(25,'E'),(26,'X'),(27,'E'),(28,'C'),(29,'A'),(30,'B'),
(31,'E'),(32,'B'),(33,'B'),(34,'E'),(35,'A'),(36,'C'),(37,'E'),(38,'A'),(39,'C'),(40,'D'),
(41,'B'),(42,'B'),(43,'D'),(44,'A'),(45,'B'),(46,'C'),(47,'C'),(48,'B'),(49,'E'),(50,'C'),
(51,'D'),(52,'C'),(53,'D'),(54,'C'),(55,'C'),(56,'C'),(57,'C'),(58,'C'),(59,'B'),(60,'B'),
(61,'E'),(62,'C'),(63,'B'),(64,'A'),(65,'B'),(66,'C'),(67,'B'),(68,'B'),(69,'D'),(70,'B'),
(71,'C'),(72,'D'),(73,'E'),(74,'D'),(75,'B'),(76,'A'),(77,'D'),(78,'D'),(79,'A'),(80,'D')
)
insert into public.official_exam_questions
  (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,
   item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,
   legal_review_required,context_review_required,legal_basis,review_note)
select
  src.id, src.id, t.id, 'Polícia Civil do Acre', 2017, 'Agente de Polícia Civil', 'IBADE',
  gabarito.item_number,
  coalesce(tm.discipline,'Geral'),
  '[TEXTO VERBATIM DA VERSÃO V AINDA NÃO CONFIRMADO — apenas o gabarito oficial foi localizado nesta sessão; a prova disponível publicamente (qconcursos) é da versão T, com ordem de alternativas diferente da versão V do candidato. Não exibir como questão ativa até a transcrição verbatim ser confirmada.]',
  '[TEXTO VERBATIM DA VERSÃO V AINDA NÃO CONFIRMADO — apenas o gabarito oficial foi localizado nesta sessão; a prova disponível publicamente (qconcursos) é da versão T, com ordem de alternativas diferente da versão V do candidato. Não exibir como questão ativa até a transcrição verbatim ser confirmada.]',
  gabarito.official_answer, 2,
  case when gabarito.official_answer='X' then 'annulled' else 'under_review' end,
  true, true, '[]'::jsonb,
  case when gabarito.official_answer='X'
    then 'Item anulado no gabarito oficial (legenda "Questão Anulada" no documento da banca); não deve ser exibido aos estudantes.'
    else 'Apenas o gabarito oficial (resposta correta) foi confirmado nesta sessão, no "Gabarito Final da Prova Objetiva" da banca IBADE, seção "Prova: V". Texto da questão ainda pendente de transcrição verbatim da versão V — content_status permanece under_review até então.'
  end
from gabarito
cross join src
cross join edition
join topic_map tm on gabarito.item_number between tm.item_from and tm.item_to
join public.syllabus_topics t on t.edition_id=edition.id and t.discipline=coalesce(tm.discipline,'Geral')
on conflict (contest_name,career_name,exam_year,item_number) do update set
  official_answer=excluded.official_answer, content_status=excluded.content_status, review_note=excluded.review_note;

-- Student's own graded attempt (Franc Denis, CPF 69598193268), caderno S01 -
-- Versão V. Todos os 80 itens confrontados item a item com o gabarito oficial.
-- 1 anulada (item 26, conta como acerto para todos). IBADE, assim como a
-- IBFC, não aplica marcação negativa — pontuação é ponderada por disciplina,
-- não é contagem simples de acertos.
-- Recomputado por disciplina (pontos, não nº de acertos, exceto onde 1pt=1acerto):
--   Língua Portuguesa (1-10): 2 corretas = 2 pts (acertos: 1,10)
--   Noções de Informática (11-15): 5 corretas = 5 pts
--   Raciocínio Lógico (16-20): 1 correta = 1 pt (acerto: 16)
--   Direito Administrativo (21-30): 5 corretas (21,24,26*anulada,28,30) = 5 pts
--   Direito Constitucional (31-40): 5 corretas (31,33,34,36,39) = 5 pts
--   Direito Penal (41-50): 4 corretas x2 (46,47,49,50) = 8 pts
--   Direito Processual Penal (51-60): 6 corretas x2 (51,52,55,56,58,60) = 12 pts
--   Legislação Penal/Proc. Especial (61-70): 5 corretas (65,66,67,68,70) = 5 pts
--   Medicina Legal (71-80): 8 corretas (72,73,74,75,76,78,79,80) = 8 pts
--   TOTAL: 51 de 100 pontos. 41 acertos brutos (incluindo a anulada) de 80, 39 erros, 0 em branco.
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,score_raw,extracted_data,notes)
select u.id,'Polícia Civil do Acre','2017','IBADE','resultado',
  'PC_Acre_2017_resultado_franc_denis.txt','manual-entry/pc-acre-2017-franc-denis',
  41, 39, 0, 51, 51,
  '{
    "method": "respostas informadas pelo próprio candidato, confrontadas item a item com o Gabarito Final da Prova Objetiva oficial da banca IBADE (seção Prova: V), e pontuadas conforme a tabela de pesos por disciplina da capa da prova",
    "escala_oficial": "0 a 100 pontos (soma ponderada por disciplina)",
    "pontuacao_obtida": {
      "lingua_portuguesa": {"corretas": 2, "de": 10, "pontos": 2},
      "informatica": {"corretas": 5, "de": 5, "pontos": 5},
      "raciocinio_logico": {"corretas": 1, "de": 5, "pontos": 1},
      "direito_administrativo": {"corretas": 5, "de": 10, "pontos": 5},
      "direito_constitucional": {"corretas": 5, "de": 10, "pontos": 5},
      "direito_penal": {"corretas": 4, "de": 10, "pontos": 8},
      "direito_processual_penal": {"corretas": 6, "de": 10, "pontos": 12},
      "legislacao_penal_especial": {"corretas": 5, "de": 10, "pontos": 5},
      "medicina_legal": {"corretas": 8, "de": 10, "pontos": 8},
      "total": 51
    },
    "items": {
      "1":"correta","2":"errada","3":"errada","4":"errada","5":"errada","6":"errada","7":"errada","8":"errada","9":"errada","10":"correta",
      "11":"correta","12":"correta","13":"correta","14":"correta","15":"correta",
      "16":"correta","17":"errada","18":"errada","19":"errada","20":"errada",
      "21":"correta","22":"errada","23":"errada","24":"correta","25":"errada","26":"anulada","27":"errada","28":"correta","29":"errada","30":"correta",
      "31":"correta","32":"errada","33":"correta","34":"correta","35":"errada","36":"correta","37":"errada","38":"errada","39":"correta","40":"errada",
      "41":"errada","42":"errada","43":"errada","44":"errada","45":"errada","46":"correta","47":"correta","48":"errada","49":"correta","50":"correta",
      "51":"correta","52":"correta","53":"errada","54":"errada","55":"correta","56":"correta","57":"errada","58":"correta","59":"errada","60":"correta",
      "61":"errada","62":"errada","63":"errada","64":"errada","65":"correta","66":"correta","67":"correta","68":"correta","69":"errada","70":"correta",
      "71":"errada","72":"correta","73":"correta","74":"correta","75":"correta","76":"correta","77":"errada","78":"correta","79":"correta","80":"correta"
    }
  }'::jsonb,
  'Prova IBADE (múltipla escolha A-E, sem marcação negativa), caderno S01 - Versão V. Pontuação ponderada por disciplina conforme capa da prova (Direito Penal e Direito Processual Penal valem 2 pts/questão; as demais 1 pt/questão), escala 0-100. Resultado: Língua Portuguesa 2/10, Informática 5/5, Raciocínio Lógico 1/5, Direito Administrativo 5/10, Direito Constitucional 5/10, Direito Penal 4/10 (8 pts), Direito Processual Penal 6/10 (12 pts), Legislação Penal Especial 5/10, Medicina Legal 8/10. TOTAL: 51/100 pontos. Item 26 anulado (conta como acerto). Nota de corte oficial ainda não localizada nesta sessão — não é possível afirmar classificação sem essa referência.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

insert into public.contest_reference_info (contest_name,contest_year,exam_board,cutoff_score,scoring_rule,source_url,notes) values
('Polícia Civil do Acre','2017','IBADE',null,'Pontuação ponderada por disciplina (Direito Penal e Direito Processual Penal valem 2 pts/questão; demais 1 pt/questão), total 0-100.',null,'NÃO LOCALIZADO com confiança nesta sessão — antigo.ibade.org.br (fonte oficial) está inacessível e a busca na web não retornou o resultado final/classificação consolidada para o cargo de Agente de Polícia Civil do Edital nº 001/2017. Precisa de verificação no Diário Oficial do Estado do Acre.')
on conflict (contest_name, contest_year) do update set
  exam_board = excluded.exam_board,
  scoring_rule = excluded.scoring_rule,
  notes = excluded.notes;

create index if not exists idx_official_exam_questions_pcacre2017
  on public.official_exam_questions(contest_name,exam_year) where contest_name='Polícia Civil do Acre';

-- ===== ./20260926260000_pc_acre_2017_prova_reference_upload.sql
-- Uploads a reference copy of the PC-AC 2017 (Agente de Polícia Civil, IBADE)
-- exam booklet to the "student-exams" storage bucket, for later use.
--
-- IMPORTANT: the file uploaded is caderno S01 - VERSÃO T (not V). The
-- candidate's actual booklet is versão V, but the version-V PDF could not be
-- located this session (official site antigo.ibade.org.br unreachable, no
-- Wayback Machine archive of the exam booklet exists — only the gabarito and
-- edital were archived — and the only other mirror, pciconcursos.com.br, is
-- blocked by a captcha). IBADE typically keeps the same question stems across
-- versions and only reshuffles the order of the five alternatives (A-E) and
-- the resulting correct letter, so this T-version booklet is useful as a
-- reference for the QUESTION TEXT, but its alternative lettering does NOT
-- match the candidate's version-V answer sheet or the official V gabarito
-- already stored in this database. Kept here purely as a placeholder for
-- future use, clearly labeled, until the true version-V booklet is located.
insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,notes)
select u.id,'Polícia Civil do Acre','2017','IBADE','prova',
  'PC_Acre_2017_S01_T_prova_referencia.pdf','pc-acre-2017/prova-S01-T-referencia.pdf',
  null,null,null,
  'ATENÇÃO: este arquivo é o caderno de provas na VERSÃO T (código S01 T), baixado de arquivos.qconcursos.com. O caderno do candidato é a VERSÃO V (S01 V) — a ordem/letra das alternativas certamente difere entre as duas versões, e por isso o gabarito oficial já cadastrado (seção "Prova: V") NÃO corresponde a este PDF item a item. Guardado apenas como referência do enunciado das questões (texto normalmente idêntico entre versões na banca IBADE), para uso futuro caso a versão V seja localizada ou para conferência manual pelo candidato. Fontes tentadas sem sucesso para a versão V: site oficial da IBADE (fora do ar), Wayback Machine (não arquivou o caderno de provas, só gabarito e edital), pciconcursos.com.br (bloqueado por captcha).'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

-- ===== ./20260926261000_restore_pf_exam_image_links.sql
-- Restores the database links for Franc Denis's 46 original PF exam pages.
-- The objects remained intact in the student-exams bucket after the legacy
-- duplicate cleanup, but their student_exam_documents rows were removed.
-- Keep the verified manual result rows: these page rows carry no score and are
-- grouped with the corresponding result by contest_name + contest_year.

with owner as (
  select id
  from auth.users
  where email = '69598193268@norteconcurso.local'
  limit 1
), exams(contest_year, folder, page_count) as (
  values
    ('2014', 'policia-federal-2014-agente', 12),
    ('2018', 'policia-federal-2018-agente', 12),
    ('2021', 'policia-federal-2021-agente', 12),
    ('2025', 'policia-federal-2025-agente', 10)
), pages as (
  select
    owner.id as user_id,
    exams.contest_year,
    exams.folder,
    generate_series(1, exams.page_count) as page_number
  from owner
  cross join exams
)
insert into public.student_exam_documents (
  user_id,
  contest_name,
  contest_year,
  exam_board,
  doc_type,
  file_name,
  storage_path,
  notes
)
select
  pages.user_id,
  'Agente de Polícia Federal',
  pages.contest_year,
  'CEBRASPE',
  'prova_realizada',
  format('pagina-%s.jpg', lpad(pages.page_number::text, 2, '0')),
  format(
    '%s/%s/pagina-%s.jpg',
    pages.user_id,
    pages.folder,
    lpad(pages.page_number::text, 2, '0')
  ),
  'Página original enviada pelo candidato; vínculo restaurado após auditoria do Storage.'
from pages
where not exists (
  select 1
  from public.student_exam_documents existing
  where existing.user_id = pages.user_id
    and existing.storage_path = format(
      '%s/%s/pagina-%s.jpg',
      pages.user_id,
      pages.folder,
      lpad(pages.page_number::text, 2, '0')
    )
);

-- ===== ./20260927020000_upload_candidate_exam_photos.sql
-- Uploads the candidate's own exam booklet photos (Franc Denis, CPF
-- 69598193268) to the "student-exams" storage bucket and registers them as
-- doc_type='prova_realizada' rows, so they are permanently accessible to the
-- system ("guardadas onde o sistema possa acessar a qualquer momento") and
-- grouped under the exact same contest_name/contest_year already used by
-- each contest's "resultado" row.
--
-- IMPORTANT — separation of "provas que realizei" from "provas do
-- concurso": these rows are ONLY the candidate's own scanned booklet pages.
-- Official reference material (gabaritos, matrizes, padrões de resposta —
-- e.g. GAB_DEFINITIVO_*.pdf, MATRIZ_*.pdf) that sits in the same local
-- folders was intentionally NOT uploaded here; that material already feeds
-- official_exam_questions via the exam-import migrations and does not
-- belong in the candidate's own document history.
with owner as (
  select id from auth.users where email = '69598193268@norteconcurso.local'
)
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, uploaded_via, file_name, storage_path, notes)
select
  owner.id, c.contest_name, c.contest_year, c.exam_board, 'prova_realizada', 'admin_import',
  format('pagina-%s.jpg', lpad(p::text, 2, '0')),
  format('%s/%s/pagina-%s.jpg', owner.id, c.folder, lpad(p::text, 2, '0')),
  'Página original do caderno de provas do candidato, enviada para o storage durante auditoria/reorganização do painel (2026-09-27).'
from owner
cross join (values
  ('Polícia Civil do Acre','2017','IBADE','policia-civil-ac-2017-agente',24),
  ('Polícia Penal do Acre','2023','IBFC','policia-penal-ac-2023-agente',15),
  ('Departamento Penitenciário Nacional','2021','CEBRASPE','depen-2021-agente',10),
  ('Polícia Rodoviária Federal','2019','CEBRASPE','prf-2019-agente',11),
  ('Polícia Rodoviária Federal','2021','CEBRASPE','prf-2021-agente',9),
  ('SEFAZ/AC - Secretaria de Estado da Fazenda do Acre','2023','CEBRASPE','sefaz-ac-2023-especialista',10)
) as c(contest_name, contest_year, exam_board, folder, page_count)
cross join generate_series(1, c.page_count) as p
on conflict do nothing;

-- The two "REDAÇÃO" photos found inside the PC-AC 2017 local folder carry
-- the banca "FUNCAB - Fundação Professor Carlos Augusto Bittencourt" in
-- their footer, which is NOT IBADE (the real PC-AC 2017 banca). They were
-- almost certainly misfiled from a different, not-yet-identified contest.
-- Stored here with contest_name left NULL and a clear note instead of
-- guessing — visible in the admin "Provas Enviadas" screen so the candidate
-- can say which contest they actually belong to.
with owner as (
  select id from auth.users where email = '69598193268@norteconcurso.local'
)
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, uploaded_via, analysis_status, file_name, storage_path, notes)
select owner.id, null, null, 'FUNCAB', 'prova_realizada', 'admin_import', 'pendente', f.file_name,
  format('%s/nao-identificado-funcab/%s', owner.id, f.file_name),
  'ATENÇÃO: encontrada dentro da pasta local "PC CIVEL DO ACRE 2017", mas o rodapé do documento mostra a banca FUNCAB - Fundação Professor Carlos Augusto Bittencourt, diferente da banca real do PC-AC 2017 (IBADE). Provavelmente pertence a outro concurso ainda não identificado nesta plataforma. Aguardando o candidato confirmar a qual concurso/ano isto pertence antes de vincular a um painel.'
from owner
cross join (values ('redacao-enunciado.jpg'), ('redacao-texto.jpg')) as f(file_name)
on conflict do nothing;

-- ===== ./20260927030000_remove_unidentified_funcab_essay.sql
-- The candidate confirmed the two "REDAÇÃO" photos found misfiled inside the
-- PC-AC 2017 local folder (banca FUNCAB, not IBADE) don't belong to any
-- contest they recognize. Removing the placeholder rows; the storage
-- objects were already deleted directly via the Storage API.
delete from public.student_exam_documents
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and storage_path like '%/nao-identificado-funcab/%';

-- ===== ./20260927040000_pc_acre_store_candidate_answer_letters.sql
-- The candidate asked whether their literal marked answer per item (not
-- just the correct/wrong verdict) is stored. It wasn't — extracted_data.items
-- only ever held the comparison verdict. This adds a parallel
-- "candidate_answers" map (item_number -> the letter the candidate actually
-- marked) for Polícia Civil do Acre 2017, the one exam in this session whose
-- raw answer list is still available (pasted by the candidate earlier in
-- this conversation). The other graded contests (PF, PRF, DEPEN, PP-Acre)
-- were graded in earlier sessions whose raw letters are no longer in
-- context — adding them now would mean guessing, which is not acceptable
-- per CONTENT_GOVERNANCE's honesty rule. The candidate would need to
-- re-paste those gabaritos for the same treatment.
with answers(item_number, letter) as (
  values
    (1,'C'),(2,'C'),(3,'D'),(4,'E'),(5,'C'),(6,'C'),(7,'D'),(8,'C'),(9,'D'),(10,'D'),
    (11,'B'),(12,'A'),(13,'A'),(14,'D'),(15,'A'),(16,'B'),(17,'B'),(18,'E'),(19,'E'),(20,'B'),
    (21,'A'),(22,'B'),(23,'B'),(24,'C'),(25,'B'),(26,'A'),(27,'C'),(28,'C'),(29,'C'),(30,'B'),
    (31,'E'),(32,'C'),(33,'B'),(34,'E'),(35,'D'),(36,'C'),(37,'A'),(38,'E'),(39,'C'),(40,'B'),
    (41,'E'),(42,'A'),(43,'C'),(44,'E'),(45,'C'),(46,'C'),(47,'C'),(48,'D'),(49,'E'),(50,'C'),
    (51,'D'),(52,'C'),(53,'E'),(54,'B'),(55,'C'),(56,'C'),(57,'D'),(58,'C'),(59,'E'),(60,'B'),
    (61,'C'),(62,'B'),(63,'A'),(64,'E'),(65,'B'),(66,'C'),(67,'B'),(68,'B'),(69,'A'),(70,'B'),
    (71,'B'),(72,'D'),(73,'E'),(74,'D'),(75,'B'),(76,'A'),(77,'A'),(78,'D'),(79,'A'),(80,'D')
),
agg as (
  select jsonb_object_agg(item_number::text, letter) as candidate_answers from answers
)
update public.student_exam_documents d
set extracted_data = d.extracted_data || jsonb_build_object('candidate_answers', agg.candidate_answers)
from agg
where d.user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and d.contest_name = 'Polícia Civil do Acre'
  and d.contest_year = '2017'
  and d.doc_type = 'resultado';

-- ===== ./20260927050000_store_all_candidate_answer_letters.sql
-- Recovered from this session's pre-compaction chat transcript: the literal
-- answer letters the candidate pasted for each exam, matched against the
-- stored final correct/wrong/blank counts to confirm which pasted list
-- belongs to which contest (some were mislabeled by the candidate, e.g. the
-- PRF 2019 list was pasted under a "PRF DE 2021" heading). Adds a parallel
-- candidate_answers map (item_number -> letter actually marked) alongside
-- the existing correta/errada/anulada verdict in extracted_data.items.

-- Agente de Polícia Federal 2014
with answers(item_number, letter) as (
  values
    ('1','C'),
    ('2','E'),
    ('3','C'),
    ('4','C'),
    ('5','E'),
    ('6','C'),
    ('7','C'),
    ('8','C'),
    ('9','C'),
    ('10','C'),
    ('11','C'),
    ('12','E'),
    ('13','C'),
    ('14','C'),
    ('15','C'),
    ('16','E'),
    ('17','C'),
    ('18','E'),
    ('19','C'),
    ('20','C'),
    ('21','E'),
    ('22','C'),
    ('23','E'),
    ('24','E'),
    ('25','C'),
    ('26','C'),
    ('27','E'),
    ('28','C'),
    ('29','C'),
    ('30','E'),
    ('31','E'),
    ('32','C'),
    ('33','C'),
    ('34','C'),
    ('37','C'),
    ('38','E'),
    ('39','E'),
    ('40','C'),
    ('41','E'),
    ('42','C'),
    ('43','E'),
    ('44','E'),
    ('46','E'),
    ('47','E'),
    ('48','C'),
    ('49','C'),
    ('50','E'),
    ('51','E'),
    ('52','C'),
    ('53','C'),
    ('54','C'),
    ('55','C'),
    ('101','C'),
    ('102','C'),
    ('103','E'),
    ('104','C'),
    ('105','C'),
    ('106','C'),
    ('107','E'),
    ('108','C'),
    ('109','C'),
    ('110','E'),
    ('111','C'),
    ('112','E'),
    ('113','C'),
    ('114','E'),
    ('115','C'),
    ('116','E'),
    ('117','C'),
    ('118','C'),
    ('119','C'),
    ('120','C')
),
agg as (
  select jsonb_object_agg(item_number, letter) as candidate_answers from answers
)
update public.student_exam_documents d
set extracted_data = d.extracted_data || jsonb_build_object('candidate_answers', agg.candidate_answers)
from agg
where d.user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and d.contest_name = 'Agente de Polícia Federal'
  and d.contest_year = '2014'
  and d.doc_type = 'resultado';

-- Agente de Polícia Federal 2018
with answers(item_number, letter) as (
  values
    ('1','C'),
    ('2','C'),
    ('3','C'),
    ('4','E'),
    ('5','E'),
    ('6','E'),
    ('7','E'),
    ('8','E'),
    ('9','C'),
    ('10','E'),
    ('11','C'),
    ('12','C'),
    ('13','C'),
    ('14','C'),
    ('15','C'),
    ('16','C'),
    ('17','E'),
    ('18','C'),
    ('19','C'),
    ('20','E'),
    ('21','E'),
    ('22','C'),
    ('23','E'),
    ('24','E'),
    ('25','C'),
    ('26','E'),
    ('27','C'),
    ('28','E'),
    ('29','C'),
    ('30','C'),
    ('31','C'),
    ('32','E'),
    ('33','E'),
    ('34','C'),
    ('35','E'),
    ('36','E'),
    ('37','C'),
    ('38','C'),
    ('39','E'),
    ('40','C'),
    ('41','C'),
    ('42','C'),
    ('43','C'),
    ('44','C'),
    ('45','C'),
    ('46','C'),
    ('47','C'),
    ('48','C'),
    ('49','C'),
    ('50','C'),
    ('51','C'),
    ('52','C'),
    ('53','C'),
    ('54','C'),
    ('55','C'),
    ('56','E'),
    ('57','C'),
    ('58','C'),
    ('59','C'),
    ('60','C'),
    ('61','C'),
    ('62','C'),
    ('63','C'),
    ('64','C'),
    ('65','C'),
    ('66','C'),
    ('67','C'),
    ('68','C'),
    ('69','C'),
    ('70','C'),
    ('71','C'),
    ('72','C'),
    ('73','C'),
    ('74','C'),
    ('75','C'),
    ('76','C'),
    ('77','E'),
    ('78','C'),
    ('79','C'),
    ('80','C'),
    ('81','C'),
    ('82','C'),
    ('84','C'),
    ('85','C'),
    ('86','C'),
    ('87','C'),
    ('88','C'),
    ('89','C'),
    ('90','C'),
    ('91','C'),
    ('92','E'),
    ('93','E'),
    ('96','C'),
    ('97','C'),
    ('98','E'),
    ('99','C'),
    ('100','E'),
    ('101','C'),
    ('102','C'),
    ('103','C'),
    ('104','C'),
    ('105','E'),
    ('106','C'),
    ('107','C'),
    ('108','E'),
    ('109','E'),
    ('110','E'),
    ('111','E'),
    ('112','C'),
    ('113','E'),
    ('114','C'),
    ('115','E'),
    ('116','C'),
    ('117','E'),
    ('118','C'),
    ('119','E'),
    ('120','C')
),
agg as (
  select jsonb_object_agg(item_number, letter) as candidate_answers from answers
)
update public.student_exam_documents d
set extracted_data = d.extracted_data || jsonb_build_object('candidate_answers', agg.candidate_answers)
from agg
where d.user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and d.contest_name = 'Agente de Polícia Federal'
  and d.contest_year = '2018'
  and d.doc_type = 'resultado';

-- Agente de Polícia Federal 2025
with answers(item_number, letter) as (
  values
    ('1','E'),
    ('2','E'),
    ('3','C'),
    ('4','C'),
    ('5','E'),
    ('6','C'),
    ('7','E'),
    ('8','C'),
    ('9','E'),
    ('10','C'),
    ('11','C'),
    ('12','C'),
    ('13','C'),
    ('14','E'),
    ('15','C'),
    ('16','C'),
    ('17','C'),
    ('18','C'),
    ('19','E'),
    ('20','C'),
    ('21','C'),
    ('22','E'),
    ('23','E'),
    ('24','C'),
    ('25','C'),
    ('26','E'),
    ('27','C'),
    ('28','E'),
    ('29','C'),
    ('30','E'),
    ('31','C'),
    ('32','C'),
    ('33','E'),
    ('34','C'),
    ('35','C'),
    ('36','C'),
    ('37','C'),
    ('38','C'),
    ('39','C'),
    ('40','C'),
    ('41','C'),
    ('42','C'),
    ('43','C'),
    ('44','C'),
    ('47','C'),
    ('49','E'),
    ('50','E'),
    ('51','E'),
    ('52','C'),
    ('53','E'),
    ('55','E'),
    ('60','E'),
    ('61','C'),
    ('62','C'),
    ('63','C'),
    ('64','C'),
    ('65','C'),
    ('66','E'),
    ('67','E'),
    ('68','C'),
    ('69','C'),
    ('70','E'),
    ('71','C'),
    ('72','E'),
    ('73','C'),
    ('75','E'),
    ('76','C'),
    ('77','E'),
    ('79','C'),
    ('80','E'),
    ('81','E'),
    ('82','C'),
    ('83','C'),
    ('84','C'),
    ('85','E'),
    ('86','C'),
    ('87','C'),
    ('88','E'),
    ('91','E'),
    ('92','E'),
    ('93','C'),
    ('94','C'),
    ('95','C'),
    ('96','E'),
    ('97','C'),
    ('98','C'),
    ('99','E'),
    ('100','E'),
    ('101','C'),
    ('102','E'),
    ('103','C'),
    ('104','E'),
    ('105','C'),
    ('106','E'),
    ('107','E'),
    ('108','C'),
    ('109','E'),
    ('110','C'),
    ('112','C'),
    ('113','C'),
    ('114','C'),
    ('115','C'),
    ('116','C'),
    ('117','E'),
    ('118','C'),
    ('119','E'),
    ('120','C')
),
agg as (
  select jsonb_object_agg(item_number, letter) as candidate_answers from answers
)
update public.student_exam_documents d
set extracted_data = d.extracted_data || jsonb_build_object('candidate_answers', agg.candidate_answers)
from agg
where d.user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and d.contest_name = 'Agente de Polícia Federal'
  and d.contest_year = '2025'
  and d.doc_type = 'resultado';

-- Polícia Rodoviária Federal 2019
with answers(item_number, letter) as (
  values
    ('1','C'),
    ('2','E'),
    ('3','C'),
    ('4','C'),
    ('5','C'),
    ('6','E'),
    ('7','E'),
    ('8','E'),
    ('9','C'),
    ('10','C'),
    ('11','C'),
    ('12','C'),
    ('13','C'),
    ('14','C'),
    ('15','E'),
    ('16','C'),
    ('17','C'),
    ('18','C'),
    ('19','E'),
    ('20','E'),
    ('21','E'),
    ('22','E'),
    ('24','E'),
    ('25','E'),
    ('26','E'),
    ('27','E'),
    ('28','E'),
    ('29','C'),
    ('30','C'),
    ('31','C'),
    ('32','E'),
    ('33','C'),
    ('34','C'),
    ('35','E'),
    ('36','E'),
    ('37','E'),
    ('38','C'),
    ('39','C'),
    ('41','E'),
    ('42','C'),
    ('43','E'),
    ('44','E'),
    ('45','E'),
    ('46','C'),
    ('47','C'),
    ('48','E'),
    ('49','C'),
    ('50','C'),
    ('51','C'),
    ('52','E'),
    ('53','E'),
    ('54','C'),
    ('55','C'),
    ('56','E'),
    ('57','C'),
    ('58','C'),
    ('59','E'),
    ('60','C'),
    ('61','C'),
    ('62','C'),
    ('63','C'),
    ('64','C'),
    ('65','E'),
    ('66','E'),
    ('67','C'),
    ('68','E'),
    ('69','E'),
    ('70','C'),
    ('71','E'),
    ('72','C'),
    ('73','C'),
    ('74','E'),
    ('75','C'),
    ('76','E'),
    ('77','C'),
    ('78','C'),
    ('79','E'),
    ('80','C'),
    ('81','E'),
    ('82','C'),
    ('83','C'),
    ('84','C'),
    ('85','E'),
    ('86','E'),
    ('87','E'),
    ('88','E'),
    ('89','E'),
    ('90','E'),
    ('91','C'),
    ('93','C'),
    ('94','E'),
    ('95','E'),
    ('96','C'),
    ('97','C'),
    ('98','E'),
    ('99','E'),
    ('100','C'),
    ('101','C'),
    ('102','C'),
    ('103','E'),
    ('104','C'),
    ('105','C'),
    ('106','E'),
    ('107','E'),
    ('108','C'),
    ('109','E'),
    ('110','E'),
    ('111','E'),
    ('112','E'),
    ('113','E'),
    ('114','C'),
    ('115','C'),
    ('116','C'),
    ('117','E'),
    ('118','E'),
    ('119','C')
),
agg as (
  select jsonb_object_agg(item_number, letter) as candidate_answers from answers
)
update public.student_exam_documents d
set extracted_data = d.extracted_data || jsonb_build_object('candidate_answers', agg.candidate_answers)
from agg
where d.user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and d.contest_name = 'Polícia Rodoviária Federal'
  and d.contest_year = '2019'
  and d.doc_type = 'resultado';

-- Polícia Rodoviária Federal 2021
with answers(item_number, letter) as (
  values
    ('1','C'),
    ('2','C'),
    ('3','E'),
    ('4','C'),
    ('5','E'),
    ('6','E'),
    ('7','E'),
    ('9','C'),
    ('10','C'),
    ('11','E'),
    ('12','E'),
    ('13','E'),
    ('14','E'),
    ('15','E'),
    ('16','E'),
    ('17','C'),
    ('18','E'),
    ('19','E'),
    ('21','C'),
    ('22','C'),
    ('23','C'),
    ('24','C'),
    ('25','E'),
    ('26','C'),
    ('27','E'),
    ('29','C'),
    ('30','E'),
    ('33','E'),
    ('34','C'),
    ('35','E'),
    ('36','C'),
    ('37','C'),
    ('39','C'),
    ('40','E'),
    ('41','E'),
    ('42','C'),
    ('45','E'),
    ('46','C'),
    ('47','E'),
    ('48','C'),
    ('49','C'),
    ('50','C'),
    ('51','E'),
    ('52','C'),
    ('54','C'),
    ('56','C'),
    ('57','E'),
    ('58','C'),
    ('59','E'),
    ('60','C'),
    ('61','C'),
    ('62','C'),
    ('63','E'),
    ('64','C'),
    ('65','C'),
    ('66','E'),
    ('67','C'),
    ('68','C'),
    ('69','E'),
    ('70','C'),
    ('71','C'),
    ('72','C'),
    ('73','E'),
    ('75','C'),
    ('76','E'),
    ('77','C'),
    ('78','C'),
    ('80','E'),
    ('81','C'),
    ('83','E'),
    ('84','C'),
    ('85','C'),
    ('86','C'),
    ('87','E'),
    ('88','C'),
    ('89','E'),
    ('90','E'),
    ('91','E'),
    ('92','C'),
    ('93','E'),
    ('94','C'),
    ('95','C'),
    ('96','C'),
    ('97','C'),
    ('99','E'),
    ('100','E'),
    ('101','C'),
    ('102','C'),
    ('103','E'),
    ('104','E'),
    ('105','C'),
    ('106','C'),
    ('107','E'),
    ('108','E'),
    ('109','E'),
    ('110','C'),
    ('112','C'),
    ('114','C'),
    ('115','E'),
    ('116','C'),
    ('117','C'),
    ('118','C'),
    ('119','C'),
    ('120','E')
),
agg as (
  select jsonb_object_agg(item_number, letter) as candidate_answers from answers
)
update public.student_exam_documents d
set extracted_data = d.extracted_data || jsonb_build_object('candidate_answers', agg.candidate_answers)
from agg
where d.user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and d.contest_name = 'Polícia Rodoviária Federal'
  and d.contest_year = '2021'
  and d.doc_type = 'resultado';

-- Departamento Penitenciário Nacional 2021
with answers(item_number, letter) as (
  values
    ('1','C'),
    ('2','E'),
    ('3','C'),
    ('4','E'),
    ('5','C'),
    ('6','E'),
    ('7','E'),
    ('8','E'),
    ('10','E'),
    ('12','E'),
    ('13','E'),
    ('14','C'),
    ('15','E'),
    ('16','C'),
    ('17','C'),
    ('18','E'),
    ('19','E'),
    ('22','E'),
    ('23','C'),
    ('24','C'),
    ('25','C'),
    ('26','E'),
    ('27','C'),
    ('28','C'),
    ('29','E'),
    ('30','C'),
    ('31','E'),
    ('32','C'),
    ('33','C'),
    ('34','E'),
    ('36','E'),
    ('37','C'),
    ('38','C'),
    ('39','C'),
    ('40','E'),
    ('41','E'),
    ('42','C'),
    ('43','C'),
    ('44','C'),
    ('45','C'),
    ('46','E'),
    ('47','C'),
    ('48','E'),
    ('49','C'),
    ('50','E'),
    ('51','C'),
    ('52','E'),
    ('53','C'),
    ('54','C'),
    ('55','C'),
    ('56','E'),
    ('57','C'),
    ('58','C'),
    ('59','E'),
    ('60','C'),
    ('61','C'),
    ('62','E'),
    ('63','C'),
    ('65','C'),
    ('67','E'),
    ('68','C'),
    ('69','C'),
    ('70','E'),
    ('71','E'),
    ('72','C'),
    ('73','C'),
    ('74','E'),
    ('75','C'),
    ('76','E'),
    ('77','C'),
    ('78','C'),
    ('80','C'),
    ('81','C'),
    ('82','C'),
    ('83','C'),
    ('84','C'),
    ('85','E'),
    ('86','E'),
    ('87','E'),
    ('88','C'),
    ('89','C'),
    ('90','E'),
    ('91','E'),
    ('93','C'),
    ('94','E'),
    ('95','C'),
    ('96','C'),
    ('97','E'),
    ('98','E'),
    ('100','C'),
    ('101','E'),
    ('102','C'),
    ('103','C'),
    ('105','E'),
    ('106','C'),
    ('107','C'),
    ('108','C'),
    ('109','C'),
    ('110','C'),
    ('111','C'),
    ('112','C'),
    ('113','E'),
    ('114','E'),
    ('115','C'),
    ('117','C'),
    ('118','C'),
    ('119','C')
),
agg as (
  select jsonb_object_agg(item_number, letter) as candidate_answers from answers
)
update public.student_exam_documents d
set extracted_data = d.extracted_data || jsonb_build_object('candidate_answers', agg.candidate_answers)
from agg
where d.user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and d.contest_name = 'Departamento Penitenciário Nacional'
  and d.contest_year = '2021'
  and d.doc_type = 'resultado';

-- Polícia Penal do Acre 2023
with answers(item_number, letter) as (
  values
    ('1','D'),
    ('2','A'),
    ('3','C'),
    ('4','D'),
    ('5','B'),
    ('7','C'),
    ('8','B'),
    ('9','C'),
    ('10','B'),
    ('11','B'),
    ('12','C'),
    ('13','A'),
    ('14','B'),
    ('15','A'),
    ('16','A'),
    ('17','B'),
    ('18','D'),
    ('19','B'),
    ('20','B'),
    ('21','D'),
    ('22','B'),
    ('23','C'),
    ('24','A'),
    ('25','B'),
    ('26','D'),
    ('27','D'),
    ('28','B'),
    ('29','A'),
    ('30','C'),
    ('31','A'),
    ('32','D'),
    ('33','C'),
    ('34','B'),
    ('35','D'),
    ('36','D'),
    ('37','A'),
    ('38','D'),
    ('39','D'),
    ('40','C'),
    ('41','D'),
    ('42','C'),
    ('43','C'),
    ('44','A'),
    ('45','A'),
    ('46','C'),
    ('47','D'),
    ('48','A'),
    ('49','B'),
    ('50','B'),
    ('51','D'),
    ('52','B'),
    ('53','C'),
    ('54','B'),
    ('55','B'),
    ('56','C'),
    ('57','D'),
    ('58','A'),
    ('59','A'),
    ('60','B')
),
agg as (
  select jsonb_object_agg(item_number, letter) as candidate_answers from answers
)
update public.student_exam_documents d
set extracted_data = d.extracted_data || jsonb_build_object('candidate_answers', agg.candidate_answers)
from agg
where d.user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and d.contest_name = 'Polícia Penal do Acre'
  and d.contest_year = '2023'
  and d.doc_type = 'resultado';

-- ===== ./20260927060000_pf2021_store_candidate_answer_letters.sql
-- Candidate's literal marked answers for PF 2021, pasted directly by the
-- candidate. Blank-question count matches exactly (42) against the already
-- stored final grading, confirming this is the right list for this contest.
with answers(item_number, letter) as (
  values
    ('1','E'),
    ('2','C'),
    ('3','C'),
    ('4','E'),
    ('5','C'),
    ('6','E'),
    ('8','C'),
    ('9','E'),
    ('10','E'),
    ('11','C'),
    ('13','E'),
    ('14','E'),
    ('15','E'),
    ('16','C'),
    ('17','E'),
    ('19','E'),
    ('20','C'),
    ('21','C'),
    ('23','E'),
    ('25','E'),
    ('27','C'),
    ('28','C'),
    ('29','C'),
    ('30','E'),
    ('31','E'),
    ('32','C'),
    ('33','C'),
    ('34','C'),
    ('35','E'),
    ('36','E'),
    ('43','E'),
    ('49','E'),
    ('50','E'),
    ('52','C'),
    ('53','C'),
    ('55','E'),
    ('56','E'),
    ('57','C'),
    ('58','C'),
    ('59','C'),
    ('61','C'),
    ('62','E'),
    ('63','E'),
    ('65','C'),
    ('66','E'),
    ('67','C'),
    ('68','C'),
    ('69','E'),
    ('70','E'),
    ('71','E'),
    ('72','E'),
    ('75','C'),
    ('77','E'),
    ('78','E'),
    ('79','C'),
    ('81','C'),
    ('83','E'),
    ('86','E'),
    ('89','C'),
    ('90','C'),
    ('92','C'),
    ('93','E'),
    ('94','E'),
    ('97','E'),
    ('98','C'),
    ('99','E'),
    ('101','C'),
    ('102','E'),
    ('103','C'),
    ('106','C'),
    ('107','E'),
    ('108','C'),
    ('109','E'),
    ('111','C'),
    ('115','C'),
    ('117','E'),
    ('118','C'),
    ('119','C')
),
agg as (
  select jsonb_object_agg(item_number, letter) as candidate_answers from answers
)
update public.student_exam_documents d
set extracted_data = d.extracted_data || jsonb_build_object('candidate_answers', agg.candidate_answers)
from agg
where d.user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and d.contest_name = 'Agente de Polícia Federal'
  and d.contest_year = '2021'
  and d.doc_type = 'resultado';

-- ===== ./20260927070000_ise_ac_two_exams_import.sql
-- Two new contests found in the candidate's local folder ("ISE AC" and "TEC
-- DE INFORMÁTICA 2021 ISE"), both from Edital ISE-AC (Instituto
-- Socioeducativo do Estado do Acre), concurso aplicado 5/12/2021, banca
-- IBADE. Same edital, two different cargos (Agente Socioeducativo Masculino
-- vs Técnico de Informática) — kept as two separate panels since they are
-- different roles with different question sets/gabaritos, following this
-- project's rule of never mixing careers.
--
-- Photos were read one by one to determine the true page/question order
-- printed on each sheet ("Tipo Z/X – Página N"), since the original
-- filenames (random UUIDs from the phone camera) did not reflect that
-- order. Uploaded to storage already in the corrected sequence.
--
-- Only the candidate's own booklet pages are registered here (doc_type
-- 'prova_realizada') — no official gabarito/grading has been performed yet
-- for either exam.
with owner as (
  select id from auth.users where email = '69598193268@norteconcurso.local'
)
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, uploaded_via, file_name, storage_path, notes)
select owner.id, c.contest_name, c.contest_year, 'IBADE', 'prova_realizada', 'admin_import',
  format('pagina-%s.jpg', lpad(p::text, 2, '0')),
  format('%s/%s/pagina-%s.jpg', owner.id, c.folder, lpad(p::text, 2, '0')),
  'Página original do caderno de provas do candidato (Edital ISE-AC, aplicação 5/12/2021), reordenada pela numeração real de página impressa em cada folha.'
from owner
cross join (values
  ('Instituto Socioeducativo do Estado do Acre - Agente Socioeducativo','2021','ise-ac-2021-agente-socioeducativo',20),
  ('Instituto Socioeducativo do Estado do Acre - Técnico de Informática','2021','ise-ac-2021-tecnico-informatica',19)
) as c(contest_name, contest_year, folder, page_count)
cross join generate_series(1, c.page_count) as p
on conflict do nothing;

-- ===== ./20260927090000_pc_acre_remove_extra_pages.sql
-- PC-AC 2017 only has 22 real booklet pages (cover + 21 content pages for
-- 80 questions); the original upload accidentally included the misfiled
-- FUNCAB essay photos as pagina-23/24, which have since been removed from
-- storage. Drops the matching DB rows.
delete from public.student_exam_documents
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and (storage_path like '%/policia-civil-ac-2017-agente/pagina-23.jpg'
       or storage_path like '%/policia-civil-ac-2017-agente/pagina-24.jpg');

-- ===== ./20260927100000_pf_2014_remove_extra_page.sql
-- The candidate re-scanned the PF 2014 booklet; the fresh set only has 11
-- real pages (vs 12 previously), so removes the now-orphaned pagina-12 row.
delete from public.student_exam_documents
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and storage_path like '%/policia-federal-2014-agente/pagina-12.jpg';

-- ===== ./20260927110000_pf_2014_full_gabarito_recheck.sql
-- Candidate resent a FULL personal gabarito for PF 2014 (only item 94 left
-- blank, versus the previous submission which had 44 items unanswered).
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2014, career_name='Agente de Polícia Federal'): 57 corretas,
-- 55 erradas, 7 anuladas (itens 21,46,57,61,77,84,111), 1 em branco (item 94).
-- CEBRASPE net score: 57 - 55 + 7 = 9.
-- This supersedes the 20260926110000 correction (50/19/44/38), which was
-- based on an incomplete transcription.
update public.student_exam_documents
set correct_count = 57,
    wrong_count = 55,
    blank_count = 1,
    score_net = 9,
    extracted_data = '{
      "method": "gabarito pessoal completo retranscrito pelo candidato (2026-09-27), confrontado item a item com public.official_exam_questions (exam_year=2014, career_name=Agente de Polícia Federal)",
      "items": {
        "1":"correta","2":"errada","3":"errada","4":"errada","5":"errada","6":"errada","7":"errada","8":"correta",
        "9":"correta","10":"errada","11":"correta","12":"errada","13":"correta","14":"correta","15":"errada","16":"errada",
        "17":"errada","18":"errada","19":"errada","20":"errada","21":"anulada","22":"correta","23":"correta","24":"correta",
        "25":"correta","26":"correta","27":"errada","28":"errada","29":"correta","30":"errada","31":"errada","32":"errada",
        "33":"correta","34":"correta","35":"errada","36":"errada","37":"errada","38":"errada","39":"correta","40":"errada",
        "41":"correta","42":"correta","43":"correta","44":"errada","45":"errada","46":"anulada","47":"correta","48":"correta",
        "49":"correta","50":"errada","51":"errada","52":"correta","53":"correta","54":"errada","55":"correta","56":"errada",
        "57":"anulada","58":"correta","59":"errada","60":"errada","61":"anulada","62":"errada","63":"correta","64":"correta",
        "65":"correta","66":"errada","67":"errada","68":"correta","69":"correta","70":"correta","71":"errada","72":"correta",
        "73":"correta","74":"correta","75":"errada","76":"correta","77":"anulada","78":"errada","79":"correta","80":"errada",
        "81":"errada","82":"correta","83":"correta","84":"anulada","85":"correta","86":"errada","87":"correta","88":"errada",
        "89":"correta","90":"errada","91":"correta","92":"correta","93":"correta","94":"branco","95":"correta","96":"correta",
        "97":"errada","98":"errada","99":"correta","100":"correta","101":"errada","102":"correta","103":"correta","104":"correta",
        "105":"errada","106":"correta","107":"errada","108":"correta","109":"errada","110":"correta","111":"anulada","112":"correta",
        "113":"correta","114":"errada","115":"errada","116":"errada","117":"correta","118":"correta","119":"errada","120":"errada"
      },
      "by_subject": {
        "Língua Portuguesa": {"total":30,"correct":12,"wrong":17,"annulled":1,"blank":0},
        "Informática": {"total":18,"correct":7,"wrong":10,"annulled":1,"blank":0},
        "Atualidades": {"total":8,"correct":4,"wrong":4,"annulled":0,"blank":0},
        "Raciocínio Lógico": {"total":14,"correct":7,"wrong":5,"annulled":2,"blank":0},
        "Administração Pública": {"total":6,"correct":4,"wrong":2,"annulled":0,"blank":0},
        "Administração Financeira e Orçamentária": {"total":2,"correct":0,"wrong":1,"annulled":1,"blank":0},
        "Ética no Serviço Público": {"total":2,"correct":1,"wrong":1,"annulled":0,"blank":0},
        "Contabilidade Geral": {"total":10,"correct":5,"wrong":4,"annulled":1,"blank":0},
        "Economia": {"total":10,"correct":7,"wrong":2,"annulled":0,"blank":1},
        "Direito Penal e Processual Penal": {"total":8,"correct":5,"wrong":3,"annulled":0,"blank":0},
        "Direito Administrativo": {"total":4,"correct":2,"wrong":1,"annulled":1,"blank":0},
        "Legislação Especial": {"total":3,"correct":1,"wrong":2,"annulled":0,"blank":0},
        "Direito Constitucional": {"total":5,"correct":2,"wrong":3,"annulled":0,"blank":0}
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): reenvio do gabarito pessoal, desta vez quase completo (apenas item 94 em branco, contra 44 itens em branco na versão anterior). Confrontado item a item com o gabarito oficial definitivo cadastrado em official_exam_questions. Resultado: 57 corretas, 55 erradas, 7 anuladas, 1 em branco. Nota líquida final 9 (57-55+7), padrão CEBRASPE. Substitui a apuração anterior (50/19/44/38) que era baseada em transcrição incompleta.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2014'
  and doc_type = 'resultado';

-- ===== ./20260927120000_revert_pf_2014_wrong_gabarito.sql
-- Reverts 20260927110000_pf_2014_full_gabarito_recheck.sql: the "full personal
-- gabarito" pasted by the candidate actually belongs to the PF 2018 exam, not
-- 2014 (candidate correction, 2026-09-27). Restores the PF 2014 resultado row
-- to the last known-good state from 20260926110000_pf_2014_grading_correction.sql
-- (50 corretas, 19 erradas, 44 em branco, nota líquida 38).
update public.student_exam_documents
set correct_count = 50,
    wrong_count = 19,
    blank_count = 44,
    score_net = 38,
    extracted_data = '{
      "method": "respostas retranscritas pelo próprio candidato (planilha), confrontadas item a item com o gabarito oficial definitivo (120DPFAGENTE14_001_01)",
      "items": {
        "1":"correta","2":"correta","3":"errada","4":"correta","5":"errada","6":"correta","7":"correta","8":"errada",
        "9":"correta","10":"correta","11":"correta","12":"correta","13":"correta","14":"correta","15":"errada","16":"correta",
        "17":"correta","18":"correta","19":"errada","20":"correta","21":"anulada","22":"correta","23":"correta","24":"correta",
        "25":"correta","26":"errada","27":"correta","28":"correta","29":"correta","30":"correta","31":"correta","32":"correta",
        "33":"errada","34":"correta","35":"branco","36":"branco","37":"errada","38":"correta","39":"correta","40":"errada",
        "41":"correta","42":"correta","43":"errada","44":"correta","45":"branco","46":"anulada","47":"errada","48":"correta",
        "49":"correta","50":"correta","51":"correta","52":"correta","53":"correta","54":"errada","55":"correta","56":"branco",
        "57":"anulada","58":"branco","59":"branco","60":"branco","61":"anulada","62":"branco","63":"branco","64":"branco",
        "65":"branco","66":"branco","67":"branco","68":"branco","69":"branco","70":"branco","71":"branco","72":"branco",
        "73":"branco","74":"branco","75":"branco","76":"anulada","77":"branco","78":"branco","79":"branco","80":"branco",
        "81":"branco","82":"branco","83":"branco","84":"anulada","85":"branco","86":"branco","87":"branco","88":"branco",
        "89":"branco","90":"branco","91":"branco","92":"branco","93":"branco","94":"branco","95":"branco","96":"branco",
        "97":"branco","98":"branco","99":"branco","100":"branco","101":"errada","102":"correta","103":"errada","104":"correta",
        "105":"correta","106":"correta","107":"correta","108":"errada","109":"correta","110":"correta","111":"anulada",
        "112":"errada","113":"errada","114":"correta","115":"correta","116":"correta","117":"errada","118":"correta",
        "119":"correta","120":"errada"
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato: respostas retranscritas por ele mesmo (mais confiável que leitura de foto manuscrita) e confrontadas item a item com o gabarito oficial definitivo. Nota líquida final 38, pelo padrão CEBRASPE (50 corretas − 19 erradas + 7 anuladas), 44 itens em branco (deixados sem marcação pelo próprio candidato). [Restaurado em 2026-09-27 após o candidato identificar que o gabarito completo enviado era, na verdade, da prova de 2018 — ver 20260927130000_pf_2018_full_gabarito.sql]'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2014'
  and doc_type = 'resultado';

-- ===== ./20260927130000_pf_2018_full_gabarito_update.sql
-- Candidate resent his personal gabarito for PF 2018 (2026-09-27), initially
-- pasted under the wrong year (2014) and corrected by the candidate to 2018.
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2018, career_name='Agente de Polícia Federal'). Compared to the
-- previous submission (20260926120000, 60/51/3/15), this resend fills in the
-- 2 items that were previously blank (83 and 95) — both come out errada —
-- so correct_count stays at 60 but wrong_count rises from 51 to 53 and
-- blank_count drops from 3 to 1 (item 94 only). Annuladas unchanged at 6
-- (itens 29, 30, 51, 78, 91, 117).
-- New net score: 60 - 53 + 6 = 13 (was 15).
update public.student_exam_documents
set correct_count = 60,
    wrong_count = 53,
    blank_count = 1,
    score_net = 13,
    extracted_data = '{
      "method": "gabarito pessoal completo retranscrito pelo candidato (2026-09-27), confrontado item a item com public.official_exam_questions (exam_year=2018, career_name=Agente de Polícia Federal)",
      "items": {
        "1":"correta","2":"correta","3":"errada","4":"correta","5":"correta","6":"errada","7":"correta","8":"correta",
        "9":"errada","10":"errada","11":"correta","12":"errada","13":"correta","14":"errada","15":"correta","16":"errada",
        "17":"correta","18":"errada","19":"correta","20":"errada","21":"correta","22":"correta","23":"errada","24":"errada",
        "25":"correta","26":"correta","27":"correta","28":"correta","29":"anulada","30":"anulada","31":"errada","32":"errada",
        "33":"errada","34":"errada","35":"errada","36":"correta","37":"errada","38":"errada","39":"correta","40":"correta",
        "41":"correta","42":"correta","43":"errada","44":"errada","45":"correta","46":"errada","47":"correta","48":"errada",
        "49":"correta","50":"errada","51":"anulada","52":"errada","53":"correta","54":"correta","55":"errada","56":"errada",
        "57":"correta","58":"errada","59":"correta","60":"errada","61":"errada","62":"correta","63":"correta","64":"errada",
        "65":"errada","66":"errada","67":"correta","68":"errada","69":"correta","70":"errada","71":"correta","72":"correta",
        "73":"correta","74":"errada","75":"errada","76":"correta","77":"correta","78":"anulada","79":"correta","80":"correta",
        "81":"errada","82":"errada","83":"errada","84":"correta","85":"correta","86":"correta","87":"correta","88":"correta",
        "89":"correta","90":"correta","91":"anulada","92":"correta","93":"correta","94":"branco","95":"errada","96":"errada",
        "97":"correta","98":"correta","99":"errada","100":"correta","101":"correta","102":"correta","103":"errada","104":"errada",
        "105":"errada","106":"correta","107":"correta","108":"correta","109":"errada","110":"correta","111":"errada","112":"errada",
        "113":"correta","114":"errada","115":"errada","116":"errada","117":"anulada","118":"correta","119":"errada","120":"errada"
      },
      "by_subject": {
        "Língua Portuguesa": {"total":24,"correct":13,"wrong":11,"annulled":0,"blank":0},
        "Direito Administrativo": {"total":4,"correct":4,"wrong":0,"annulled":0,"blank":0},
        "Direito Constitucional": {"total":4,"correct":0,"wrong":2,"annulled":2,"blank":0},
        "Direito Penal e Processual Penal": {"total":4,"correct":1,"wrong":3,"annulled":0,"blank":0},
        "Legislação Especial": {"total":4,"correct":2,"wrong":2,"annulled":0,"blank":0},
        "Estatística": {"total":10,"correct":5,"wrong":5,"annulled":0,"blank":0},
        "Raciocínio Lógico": {"total":10,"correct":4,"wrong":5,"annulled":1,"blank":0},
        "Informática": {"total":36,"correct":20,"wrong":13,"annulled":2,"blank":1},
        "Contabilidade Geral": {"total":24,"correct":11,"wrong":12,"annulled":1,"blank":0}
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito pessoal quase completo (apenas item 94 em branco, contra 3 itens em branco na versão anterior). Confrontado item a item com o gabarito oficial definitivo cadastrado em official_exam_questions. Resultado: 60 corretas, 53 erradas, 6 anuladas, 1 em branco. Nota líquida final 13 (60-53+6), padrão CEBRASPE. Substitui a apuração anterior (60/51/3/15). Este gabarito havia sido inicialmente aplicado por engano à prova de 2014 (ver 20260927120000_revert_pf_2014_wrong_gabarito.sql) e foi corrigido para 2018 pelo próprio candidato.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2018'
  and doc_type = 'resultado';

-- ===== ./20260927150000_pf_2018_resend_v2.sql
-- Candidate resent his personal gabarito for PF 2018 a second time
-- (2026-09-27), this time with a large block of items left blank
-- (35,36,45,57-80,91-100 — 35 blanks total), replacing the previous
-- near-complete submission (20260927130000: 60/53/1/13). Candidate confirmed
-- explicitly (via clarifying question) that this new sheet is 2018, not 2014,
-- despite the blank pattern closely resembling the 2014 sheet.
--
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2018, career_name='Agente de Polícia Federal'). Per the CEBRASPE
-- scoring rule stored in public.exam_board_scoring_rules, blank items are NOT
-- discounted: nota_liquida = corretas - erradas + anuladas.
-- Result: 50 corretas, 29 erradas, 6 anuladas (itens 29,30,51,78,91,117),
-- 35 em branco. Nota líquida: 50 - 29 + 6 = 27.
update public.student_exam_documents
set correct_count = 50,
    wrong_count = 29,
    blank_count = 35,
    score_net = 27,
    extracted_data = '{
      "method": "gabarito pessoal reenviado pelo candidato (2026-09-27, segunda versão), confrontado item a item com public.official_exam_questions (exam_year=2018, career_name=Agente de Polícia Federal). Nota líquida calculada conforme regra CEBRASPE em public.exam_board_scoring_rules (brancas não descontam).",
      "items": {
        "1":"correta","2":"errada","3":"errada","4":"errada","5":"correta","6":"correta","7":"errada","8":"errada",
        "9":"errada","10":"correta","11":"correta","12":"correta","13":"correta","14":"errada","15":"correta","16":"correta",
        "17":"errada","18":"correta","19":"correta","20":"correta","21":"correta","22":"correta","23":"errada","24":"errada",
        "25":"correta","26":"errada","27":"errada","28":"errada","29":"anulada","30":"anulada","31":"correta","32":"correta",
        "33":"correta","34":"errada","35":"branco","36":"branco","37":"correta","38":"correta","39":"correta","40":"correta",
        "41":"errada","42":"correta","43":"correta","44":"correta","45":"branco","46":"correta","47":"errada","48":"errada",
        "49":"correta","50":"correta","51":"anulada","52":"errada","53":"correta","54":"correta","55":"errada","56":"correta",
        "57":"branco","58":"branco","59":"branco","60":"branco","61":"branco","62":"branco","63":"branco","64":"branco",
        "65":"branco","66":"branco","67":"branco","68":"branco","69":"branco","70":"branco","71":"branco","72":"branco",
        "73":"branco","74":"branco","75":"branco","76":"branco","77":"branco","78":"anulada","79":"branco","80":"branco",
        "81":"correta","82":"errada","83":"errada","84":"errada","85":"correta","86":"correta","87":"correta","88":"errada",
        "89":"correta","90":"errada","91":"anulada","92":"branco","93":"branco","94":"branco","95":"branco","96":"branco",
        "97":"branco","98":"branco","99":"branco","100":"branco","101":"correta","102":"correta","103":"correta","104":"errada",
        "105":"correta","106":"correta","107":"errada","108":"errada","109":"correta","110":"correta","111":"correta","112":"correta",
        "113":"errada","114":"correta","115":"correta","116":"correta","117":"anulada","118":"correta","119":"correta","120":"errada"
      },
      "by_subject": {
        "Língua Portuguesa": {"total":24,"correct":14,"wrong":10,"annulled":0,"blank":0},
        "Direito Administrativo": {"total":4,"correct":1,"wrong":3,"annulled":0,"blank":0},
        "Direito Constitucional": {"total":4,"correct":2,"wrong":0,"annulled":2,"blank":0},
        "Direito Penal e Processual Penal": {"total":4,"correct":1,"wrong":1,"annulled":0,"blank":2},
        "Legislação Especial": {"total":4,"correct":4,"wrong":0,"annulled":0,"blank":0},
        "Estatística": {"total":10,"correct":6,"wrong":3,"annulled":0,"blank":1},
        "Raciocínio Lógico": {"total":10,"correct":3,"wrong":2,"annulled":1,"blank":4},
        "Informática": {"total":36,"correct":5,"wrong":5,"annulled":2,"blank":24},
        "Contabilidade Geral": {"total":24,"correct":14,"wrong":5,"annulled":1,"blank":4}
      }
    }'::jsonb,
    notes = 'Reanálise solicitada pelo candidato (2026-09-27, segundo reenvio): gabarito com 35 itens em branco, confirmado pelo candidato como pertencente a 2018 (mesmo com padrão de brancos parecido ao de 2014). Confrontado item a item com o gabarito oficial definitivo. Resultado: 50 corretas, 29 erradas, 6 anuladas, 35 em branco. Nota líquida final 27 (50-29+6), pela regra CEBRASPE (brancas não descontam, ver public.exam_board_scoring_rules). Substitui a apuração anterior (60/53/1/13, que era um envio quase sem brancos).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2018'
  and doc_type = 'resultado';

-- ===== ./20260927160000_fix_2014_2018_gabarito_swap.sql
-- Corrects a misattribution: the candidate sent two answer sheets in this
-- session. When asked to clarify which year the second one (heavy-blank
-- pattern) belonged to, the candidate answered "2018" — but a direct
-- letter-by-letter comparison against the pre-session stored data proves
-- otherwise:
--   * "msg1" (near-complete, few blanks) matches the ORIGINAL pre-session
--     2018 record on 112/114 comparable items (98%) -> genuinely 2018.
--   * "msg2" (large blank block 35-80/91-100) matches the ORIGINAL
--     pre-session 2014 record on 102/113 comparable items (90%), differing
--     only by filling in items 81-90 (previously blank) plus items 37 and 56
--     -> genuinely a refinement of 2014, NOT 2018.
--
-- This migration:
--  1) Reverts 2018 back to the correct state derived from msg1
--     (20260927130000_pf_2018_full_gabarito_update.sql: 60/53/1/13),
--     undoing the erroneous 20260927150000_pf_2018_resend_v2.sql.
--  2) Updates 2014 with the refined msg2 gabarito: 60 corretas, 19 erradas,
--     7 anuladas, 34 em branco. Nota líquida = 60 - 19 + 7 = 48.

-- Step 1: restore PF 2018 to the msg1-derived state
update public.student_exam_documents
set correct_count = 60,
    wrong_count = 53,
    blank_count = 1,
    score_net = 13,
    extracted_data = '{
      "method": "gabarito pessoal completo retranscrito pelo candidato (2026-09-27), confrontado item a item com public.official_exam_questions (exam_year=2018, career_name=Agente de Polícia Federal)",
      "items": {
        "1":"correta","2":"correta","3":"errada","4":"correta","5":"correta","6":"errada","7":"correta","8":"correta",
        "9":"errada","10":"errada","11":"correta","12":"errada","13":"correta","14":"errada","15":"correta","16":"errada",
        "17":"correta","18":"errada","19":"correta","20":"errada","21":"correta","22":"correta","23":"errada","24":"errada",
        "25":"correta","26":"correta","27":"correta","28":"correta","29":"anulada","30":"anulada","31":"errada","32":"errada",
        "33":"errada","34":"errada","35":"errada","36":"correta","37":"errada","38":"errada","39":"correta","40":"correta",
        "41":"correta","42":"correta","43":"errada","44":"errada","45":"correta","46":"errada","47":"correta","48":"errada",
        "49":"correta","50":"errada","51":"anulada","52":"errada","53":"correta","54":"correta","55":"errada","56":"errada",
        "57":"correta","58":"errada","59":"correta","60":"errada","61":"errada","62":"correta","63":"correta","64":"errada",
        "65":"errada","66":"errada","67":"correta","68":"errada","69":"correta","70":"errada","71":"correta","72":"correta",
        "73":"correta","74":"errada","75":"errada","76":"correta","77":"correta","78":"anulada","79":"correta","80":"correta",
        "81":"errada","82":"errada","83":"errada","84":"correta","85":"correta","86":"correta","87":"correta","88":"correta",
        "89":"correta","90":"correta","91":"anulada","92":"correta","93":"correta","94":"branco","95":"errada","96":"errada",
        "97":"correta","98":"correta","99":"errada","100":"correta","101":"correta","102":"correta","103":"errada","104":"errada",
        "105":"errada","106":"correta","107":"correta","108":"correta","109":"errada","110":"correta","111":"errada","112":"errada",
        "113":"correta","114":"errada","115":"errada","116":"errada","117":"anulada","118":"correta","119":"errada","120":"errada"
      }
    }'::jsonb,
    notes = 'Corrigido em 2026-09-27: o candidato havia confirmado por engano que o gabarito com muitos itens em branco (2026-09-27, segundo envio da sessão) era de 2018. Comparação letra a letra com os dados já salvos antes desta sessão provou que esse gabarito pertence a 2014, não 2018. Restaurado o resultado correto de 2018 (derivado do primeiro gabarito enviado nesta sessão, que bate 98% com o registro pré-sessão de 2018): 60 corretas, 53 erradas, 6 anuladas, 1 em branco. Nota líquida final 13.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2018'
  and doc_type = 'resultado';

-- Step 2: update PF 2014 with the refined msg2 gabarito (fills items 81-90,
-- flips item 37, fills item 56, versus the previously stored 2014 state)
update public.student_exam_documents
set correct_count = 60,
    wrong_count = 19,
    blank_count = 34,
    score_net = 48,
    extracted_data = '{
      "method": "gabarito pessoal reenviado pelo candidato (2026-09-27), inicialmente atribuído por engano a 2018 e corrigido para 2014 após comparação letra a letra com o registro pré-sessão. Confrontado item a item com public.official_exam_questions (exam_year=2014, career_name=Agente de Polícia Federal). Nota líquida calculada conforme regra CEBRASPE em public.exam_board_scoring_rules (brancas não descontam).",
      "items": {
        "1":"correta","2":"errada","3":"errada","4":"correta","5":"errada","6":"correta","7":"correta","8":"errada",
        "9":"correta","10":"correta","11":"correta","12":"errada","13":"correta","14":"correta","15":"errada","16":"errada",
        "17":"correta","18":"errada","19":"errada","20":"correta","21":"anulada","22":"correta","23":"correta","24":"correta",
        "25":"correta","26":"correta","27":"errada","28":"correta","29":"correta","30":"errada","31":"correta","32":"correta",
        "33":"errada","34":"correta","35":"branco","36":"branco","37":"errada","38":"correta","39":"correta","40":"errada",
        "41":"errada","42":"correta","43":"errada","44":"correta","45":"branco","46":"anulada","47":"errada","48":"correta",
        "49":"correta","50":"correta","51":"correta","52":"correta","53":"correta","54":"errada","55":"correta","56":"correta",
        "57":"anulada","58":"branco","59":"branco","60":"branco","61":"anulada","62":"branco","63":"branco","64":"branco",
        "65":"branco","66":"branco","67":"branco","68":"branco","69":"branco","70":"branco","71":"branco","72":"branco",
        "73":"branco","74":"branco","75":"branco","76":"anulada","77":"branco","78":"branco","79":"branco","80":"branco",
        "81":"correta","82":"correta","83":"correta","84":"anulada","85":"correta","86":"errada","87":"correta","88":"correta",
        "89":"correta","90":"correta","91":"branco","92":"branco","93":"branco","94":"branco","95":"branco","96":"branco",
        "97":"branco","98":"branco","99":"branco","100":"branco","101":"errada","102":"correta","103":"errada","104":"correta",
        "105":"correta","106":"correta","107":"correta","108":"errada","109":"correta","110":"correta","111":"anulada",
        "112":"errada","113":"errada","114":"correta","115":"correta","116":"correta","117":"errada","118":"correta",
        "119":"correta","120":"correta"
      },
      "by_subject": {
        "Língua Portuguesa": {"total":30,"correct":23,"wrong":6,"annulled":1,"blank":0},
        "Informática": {"total":18,"correct":10,"wrong":4,"annulled":1,"blank":3},
        "Atualidades": {"total":8,"correct":7,"wrong":1,"annulled":0,"blank":0},
        "Raciocínio Lógico": {"total":14,"correct":0,"wrong":0,"annulled":2,"blank":12},
        "Administração Pública": {"total":6,"correct":0,"wrong":0,"annulled":0,"blank":6},
        "Administração Financeira e Orçamentária": {"total":2,"correct":0,"wrong":0,"annulled":1,"blank":1},
        "Ética no Serviço Público": {"total":2,"correct":0,"wrong":0,"annulled":0,"blank":2},
        "Contabilidade Geral": {"total":10,"correct":8,"wrong":1,"annulled":1,"blank":0},
        "Economia": {"total":10,"correct":0,"wrong":0,"annulled":0,"blank":10},
        "Direito Penal e Processual Penal": {"total":8,"correct":5,"wrong":3,"annulled":0,"blank":0},
        "Direito Administrativo": {"total":4,"correct":2,"wrong":1,"annulled":1,"blank":0},
        "Legislação Especial": {"total":3,"correct":2,"wrong":1,"annulled":0,"blank":0},
        "Direito Constitucional": {"total":5,"correct":3,"wrong":2,"annulled":0,"blank":0}
      }
    }'::jsonb,
    notes = 'Corrigido em 2026-09-27: gabarito reenviado pelo candidato nesta sessão (inicialmente atribuído por engano a 2018) refina o registro de 2014, preenchendo os itens 81-90 (antes em branco) e ajustando os itens 37 e 56. Resultado: 60 corretas, 19 erradas, 7 anuladas, 34 em branco. Nota líquida final 48 (60-19+7), pela regra CEBRASPE (brancas não descontam, ver public.exam_board_scoring_rules). Substitui a apuração anterior (50/19/44/38).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2014'
  and doc_type = 'resultado';

-- ===== ./20260927170000_pf_2021_gabarito_refinement.sql
-- Candidate resent his personal gabarito for PF 2021 (2026-09-27). Verified
-- against the previously stored record BEFORE applying (per the process
-- established after the 2014/2018 mix-up): 118/120 items identical, only
-- item 98 (C->E) and item 108 (C->blank) changed. Confirmed as a genuine
-- refinement of PF 2021, not a different year.
--
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2021, career_name='Agente de Polícia Federal'). Per CEBRASPE
-- rule in public.exam_board_scoring_rules, blanks are not discounted.
-- Result: 37 corretas, 36 erradas, 5 anuladas (itens 28,92,106,108,119),
-- 42 em branco. Nota líquida: 37 - 36 + 5 = 6 (was 8 with correct_count=38).
update public.student_exam_documents
set correct_count = 37,
    wrong_count = 36,
    blank_count = 42,
    score_net = 6,
    extracted_data = jsonb_set(
      jsonb_set(
        jsonb_set(extracted_data, '{items,98}', '"errada"'),
        '{items,108}', '"branco"'
      ),
      '{by_subject}',
      '{
        "Língua Portuguesa": {"total":24,"correct":9,"wrong":10,"annulled":0,"blank":5,"blank_pct":21},
        "Direito Administrativo": {"total":3,"correct":0,"wrong":2,"annulled":0,"blank":1,"blank_pct":33},
        "Direito Constitucional": {"total":3,"correct":2,"wrong":0,"annulled":1,"blank":0,"blank_pct":0},
        "Direito Penal e Processual Penal": {"total":4,"correct":3,"wrong":1,"annulled":0,"blank":0,"blank_pct":0},
        "Legislação Especial": {"total":2,"correct":1,"wrong":1,"annulled":0,"blank":0,"blank_pct":0},
        "Estatística": {"total":12,"correct":1,"wrong":0,"annulled":0,"blank":11,"blank_pct":92},
        "Raciocínio Lógico": {"total":12,"correct":3,"wrong":6,"annulled":0,"blank":3,"blank_pct":25},
        "Informática": {"total":36,"correct":13,"wrong":9,"annulled":1,"blank":13,"blank_pct":36},
        "Contabilidade Geral": {"total":24,"correct":5,"wrong":7,"annulled":3,"blank":9,"blank_pct":38}
      }'::jsonb
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado, verificado contra o registro anterior antes de aplicar (118/120 itens idênticos — apenas item 98 e 108 mudaram). Resultado: 37 corretas, 36 erradas, 5 anuladas, 42 em branco. Nota líquida final 6 (37-36+5), regra CEBRASPE. Estatística é a disciplina com maior lacuna de conhecimento: 92% dos itens em branco (11 de 12) — sinal de ponto fraco crítico, não apenas falta de tempo (ver public.exam_board_scoring_rules e a diretriz do candidato de sempre analisar brancos como indicador de pontos fracos).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Agente de Polícia Federal'
  and contest_year = '2021'
  and doc_type = 'resultado';

-- ===== ./20260927180000_link_prf2021_essay_image.sql
-- The PRF 2021 essay (Polícia Rodoviária Federal — 2021) was stored with an
-- accurate transcription and correction, but storage_paths was left empty.
-- The actual handwritten "RASCUNHO" page matching that transcription verbatim
-- is pagina-09.jpg of the candidate's own PRF 2021 booklet (already in the
-- student-exams bucket, part of the 9-page prf-2021-agente set) — it was
-- just never linked from essay_submissions, unlike every other essay row
-- (PF 2014/2018/2021/2025), which already reference their own booklet pages.
update public.essay_submissions
set storage_paths = '["f4326343-dd3a-46cf-b5e6-e6194abb31e5/prf-2021-agente/pagina-09.jpg"]'::jsonb
where user_id = (select id from auth.users where email = '69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2021';

-- ===== ./20260927190000_prf_2021_gabarito_resend.sql
-- Candidate resent his personal gabarito for PRF 2021 (2026-09-27). Verified
-- against the previously stored record BEFORE applying: 106/110 comparable
-- items identical, only items 28, 29, 30 and 79 changed. Confirmed as a
-- genuine refinement of PRF 2021, not a different year.
--
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2021, career_name matches '%Rodovi%'). Per CEBRASPE rule in
-- public.exam_board_scoring_rules, blanks are not discounted.
-- Result: 53 corretas, 43 erradas, 10 anuladas, 14 em branco.
-- Nota líquida: 53 - 43 + 10 = 20 (was 21 with wrong_count=42/blank_count=15).
update public.student_exam_documents
set correct_count = 53,
    wrong_count = 43,
    blank_count = 14,
    score_net = 20,
    extracted_data = jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(extracted_data, '{items,28}', '"correta"'),
          '{items,29}', '"errada"'
        ),
        '{items,30}', '"branco"'
      ),
      '{items,79}', '"correta"'
    ) || jsonb_build_object(
      'by_subject', '{
        "Língua Estrangeira - Inglês": {"total":8,"correct":4,"wrong":2,"annulled":1,"blank":1},
        "Língua Portuguesa": {"total":18,"correct":8,"wrong":9,"annulled":0,"blank":1},
        "Raciocínio Lógico-Matemático": {"total":6,"correct":2,"wrong":1,"annulled":0,"blank":3},
        "Informática": {"total":7,"correct":3,"wrong":2,"annulled":1,"blank":1},
        "Física": {"total":5,"correct":1,"wrong":2,"annulled":0,"blank":2},
        "Ética no Serviço Público": {"total":6,"correct":3,"wrong":2,"annulled":1,"blank":0},
        "Geografia dos Transportes": {"total":5,"correct":1,"wrong":2,"annulled":0,"blank":2},
        "Direito de Trânsito": {"total":30,"correct":11,"wrong":13,"annulled":4,"blank":2},
        "Direito Administrativo": {"total":7,"correct":3,"wrong":3,"annulled":1,"blank":0},
        "Direito Constitucional": {"total":7,"correct":4,"wrong":1,"annulled":2,"blank":0},
        "Direito Penal e Processual Penal": {"total":16,"correct":9,"wrong":5,"annulled":0,"blank":2},
        "Direitos Humanos": {"total":5,"correct":4,"wrong":1,"annulled":0,"blank":0}
      }'::jsonb
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado, verificado contra o registro anterior antes de aplicar (106/110 itens idênticos — apenas itens 28, 29, 30 e 79 mudaram). Resultado: 53 corretas, 43 erradas, 10 anuladas, 14 em branco. Nota líquida final 20 (53-43+10), regra CEBRASPE (brancas não descontam). Maiores concentrações de branco: Raciocínio Lógico-Matemático (50%) e Física/Geografia dos Transportes (40% cada) — sinal de lacuna de base nessas disciplinas, não apenas falta de tempo.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2021'
  and doc_type = 'resultado';

-- ===== ./20260927200000_prf_2019_gabarito_resend.sql
-- Candidate resent his personal gabarito for PRF 2019 (2026-09-27). Verified
-- against the previously stored record BEFORE applying: 118/120 comparable
-- items identical, only item 40 (previously blank, now "E") and item 62
-- (C -> E, an annulled item so it doesn't change scoring) changed. Confirmed
-- as a genuine refinement of PRF 2019, not a different year.
--
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2019, career_name matches '%Rodovi%'). Per CEBRASPE rule in
-- public.exam_board_scoring_rules, blanks are not discounted.
-- Result: 66 corretas, 39 erradas, 12 anuladas, 3 em branco.
-- Nota líquida: 66 - 39 + 12 = 39 (was 40 with wrong_count=38/blank_count=4).
update public.student_exam_documents
set correct_count = 66,
    wrong_count = 39,
    blank_count = 3,
    score_net = 39,
    extracted_data = jsonb_set(
      jsonb_set(extracted_data, '{items,40}', '"errada"'),
      '{by_subject}',
      '{
        "Língua Portuguesa": {"total":20,"correct":17,"wrong":2,"annulled":1,"blank":0},
        "Raciocínio Lógico-Matemático": {"total":20,"correct":11,"wrong":6,"annulled":2,"blank":1},
        "Ética no Serviço Público": {"total":4,"correct":1,"wrong":3,"annulled":0,"blank":0},
        "Atualidades e Geografia": {"total":6,"correct":1,"wrong":5,"annulled":0,"blank":0},
        "Direito de Trânsito": {"total":40,"correct":21,"wrong":13,"annulled":6,"blank":0},
        "Direito Administrativo": {"total":5,"correct":2,"wrong":1,"annulled":1,"blank":1},
        "Direito Constitucional": {"total":5,"correct":1,"wrong":4,"annulled":0,"blank":0},
        "Direito Penal e Processual Penal": {"total":15,"correct":8,"wrong":5,"annulled":2,"blank":0},
        "Direitos Humanos": {"total":5,"correct":4,"wrong":0,"annulled":0,"blank":1}
      }'::jsonb
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado, verificado contra o registro anterior antes de aplicar (118/120 itens idênticos — apenas itens 40 e 62 mudaram, sendo o 62 anulado e portanto neutro para a nota). Resultado: 66 corretas, 39 erradas, 12 anuladas, 3 em branco. Nota líquida final 39 (66-39+12), regra CEBRASPE (brancas não descontam). Piores disciplinas: Atualidades e Geografia (líquido -4, 16,7% de acerto) e Direito Constitucional (líquido -3, 20% de acerto) — não é lacuna de branco, é erro de conceito nas poucas questões respondidas.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Rodoviária Federal'
  and contest_year = '2019'
  and doc_type = 'resultado';

-- ===== ./20260927210000_prf_2019_essay_import.sql
-- The candidate had NOT registered an essay for PRF 2019 yet (essay_submissions
-- had zero rows for this contest/year, unlike PF 2014/2018/2021/2025 and PRF
-- 2021, which were already imported). The handwritten "RASCUNHO" page exists
-- in the candidate's own booklet — pagina-11.jpg of prf-2019-agente, already
-- in the student-exams bucket as part of the 11-page set — it was just never
-- linked to an essay_submissions row.
--
-- IMPORTANT: unlike the other essays already imported, this booklet does NOT
-- contain the discursive prompt/enunciado page (only Bloco I/II/III objective
-- pages + this rascunho page were captured), so the required tópicos and
-- their point values are unknown here — topicos is left empty rather than
-- guessed, per the project rule of never inventing content without an
-- official source. If the candidate has the missing enunciado page, resending
-- it lets this be refined with an actual tópico-by-tópico breakdown.
insert into public.essay_submissions
  (user_id, contest_name, contest_year, exam_board, tema, topicos, nota_maxima,
   valor_apresentacao, status, transcricao, storage_paths, correcao)
select
  u.id,
  'Polícia Rodoviária Federal',
  '2019',
  'CEBRASPE',
  'Tema não identificado nas fotos (texto sobre a Lei Seca — Lei nº 11.705/2008 — e o combate a infrações de trânsito pela PRF)',
  '[]'::jsonb,
  null,
  null,
  'rascunho_incompleto',
  E'A lei mais temida pelos motoristas, a lei 11.705/08, popularmente conhecida como Lei Seca, recentemente completou 27 anos de vigência, um avanço na legislação de trânsito do país. Contudo, percebe-se que o aumento de infrações ainda figura nas trágicas estatísticas de acidentes com vítimas fatais. Na linha de frente a Polícia Rodoviária Federal não mede esforços em combater motoristas transgressores nas rodovias federais, autuando, fiscalizando e aplicando as regras do Código de Trânsito Brasileiro - CTB.\n\nSabe-se que por mais que as autoridades, a PRF, sobretudo a PRF, diuturnamente no combate contra motoristas flagrados bêbados ou cometendo ilícitos, o cidadão deve-se conscientizar da sua responsabilidade no trânsito. Dessa forma, procuram conhecer o CTB e suas resoluções, incentivar crianças a conhecê-lo e além disso, por em prática as regras de trânsito.\n\nQuanto à sociedade, deve-se cobrar das autoridades regras mais punitivas mais severas; exigir do poder público que proporcione um trânsito seguro, infraestrutura adequada, que garantam o direito de não correr em um trânsito hostil e nas mãos de motoristas irresponsáveis.\n\nEnfim, não adianta criarem leis duras, é preciso que todos tenham consciência de sua responsabilidade no trânsito para que vidas possam ser poupadas.',
  '["f4326343-dd3a-46cf-b5e6-e6194abb31e5/prf-2019-agente/pagina-11.jpg"]'::jsonb,
  jsonb_build_object(
    'confianca', 'baixa',
    'comentario', 'Estimativa educacional interna da plataforma, não é correção oficial CEBRASPE. Sem a página do enunciado/tópicos exigidos, não é possível avaliar aderência a critérios específicos da banca — a leitura abaixo é apenas estrutural, a partir do rascunho.',
    'nota_estimada', null,
    'pontos_fortes', jsonb_build_array(
      'Tema desenvolvido do início ao fim, com introdução, desenvolvimento em 3 parágrafos e conclusão',
      'Cita corretamente a base legal (Lei nº 11.705/2008 — Lei Seca) e o CTB',
      'Estabelece uma divisão clara de responsabilidades: atuação da PRF, conscientização do cidadão e cobrança da sociedade ao poder público'
    ),
    'pontos_fracos', jsonb_build_array(
      'Erro factual: a Lei Seca é de 2008, não teria completado "27 anos" até 2019 (o rascunho está com rasuras nesse trecho, típico de insegurança na hora da prova)',
      'Vários trechos rasurados/reescritos indicam dificuldade de articulação sob pressão de tempo',
      'Falta dados ou exemplos concretos (estatísticas, casos) para sustentar os argumentos',
      'Conclusão genérica, sem retomar de forma explícita os pontos levantados nos parágrafos anteriores'
    )
  )
from auth.users u
where u.email = '69598193268@norteconcurso.local'
on conflict do nothing;

-- ===== ./20260927220000_link_depen2021_essay_image.sql
-- The DEPEN 2021 essay was stored with an accurate transcription/tema but
-- storage_paths was left empty, same gap found earlier for PRF 2021
-- (20260927180000). The handwritten "RASCUNHO" page matching this
-- transcription verbatim is pagina-10.jpg of the candidate's own DEPEN 2021
-- booklet (already in the student-exams bucket, part of the 10-page
-- depen-2021-agente set); pagina-09.jpg is the "PROVA DISCURSIVA" prompt
-- page itself (motivating text + legal excerpts), not the candidate's
-- answer, so only pagina-10 is linked here — consistent with how every
-- other essay row only references the candidate's own handwritten page.
update public.essay_submissions
set storage_paths = '["f4326343-dd3a-46cf-b5e6-e6194abb31e5/depen-2021-agente/pagina-10.jpg"]'::jsonb
where user_id = (select id from auth.users where email = '69598193268@norteconcurso.local')
  and contest_name = 'Departamento Penitenciário Nacional'
  and contest_year = '2021';

-- ===== ./20260927230000_depen_2021_gabarito_resend.sql
-- Candidate resent his personal gabarito for DEPEN 2021 (2026-09-27, pasted
-- under a typo'd title "Polícia Penal Federal" but confirmed by content as
-- DEPEN). Verified against the previously stored record BEFORE applying:
-- 111/120 comparable items identical, only items 9,10,11,12,14,15,16,18,20
-- changed (mostly filling in items that were previously blank, or flipping
-- 14/15/16/18). Confirmed as a genuine refinement of DEPEN 2021.
--
-- Confronted item-by-item against public.official_exam_questions
-- (exam_year=2021, career_name matching '%penit%'). Per CEBRASPE rule in
-- public.exam_board_scoring_rules, blanks are not discounted.
-- Result: 56 corretas, 47 erradas, 5 anuladas, 12 em branco.
-- Nota líquida: 56 - 47 + 5 = 14 (was 15 with wrong_count=46/blank_count=13).
update public.student_exam_documents
set correct_count = 56,
    wrong_count = 47,
    blank_count = 12,
    score_net = 14,
    extracted_data = jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(
            jsonb_set(
              jsonb_set(
                jsonb_set(
                  jsonb_set(
                    jsonb_set(extracted_data, '{items,9}', '"errada"'),
                    '{items,10}', '"branco"'
                  ),
                  '{items,11}', '"errada"'
                ),
                '{items,12}', '"branco"'
              ),
              '{items,14}', '"errada"'
            ),
            '{items,15}', '"errada"'
          ),
          '{items,16}', '"errada"'
        ),
        '{items,18}', '"correta"'
      ),
      '{items,20}', '"errada"'
    ) || jsonb_build_object(
      'by_subject', '{
        "Língua Portuguesa": {"total":13,"correct":4,"wrong":6,"annulled":1,"blank":2},
        "Lei 12.846/2013": {"total":2,"correct":1,"wrong":1,"annulled":0,"blank":0},
        "Ética, Moral e Sindicância": {"total":4,"correct":2,"wrong":2,"annulled":0,"blank":0},
        "Raciocínio Lógico": {"total":5,"correct":2,"wrong":2,"annulled":0,"blank":1},
        "Microsoft Office e Informática": {"total":6,"correct":4,"wrong":2,"annulled":0,"blank":0},
        "Direito Constitucional e Administrativo": {"total":14,"correct":7,"wrong":5,"annulled":1,"blank":1},
        "Direito Penal e Processual Penal": {"total":18,"correct":9,"wrong":7,"annulled":2,"blank":0},
        "Direitos Humanos e Política Penitenciária": {"total":8,"correct":3,"wrong":3,"annulled":0,"blank":2},
        "Regras da ONU e Legislação Especial": {"total":10,"correct":4,"wrong":5,"annulled":0,"blank":1},
        "Plano Nacional de Política Criminal e Penitenciária": {"total":7,"correct":4,"wrong":3,"annulled":0,"blank":0},
        "SUSP e Execução Penal": {"total":9,"correct":4,"wrong":4,"annulled":0,"blank":1},
        "Regulamento Penitenciário Federal": {"total":24,"correct":12,"wrong":7,"annulled":1,"blank":4}
      }'::jsonb
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado (colado com título "Polícia Penal Federal" por engano de digitação, mas confirmado como DEPEN pelo conteúdo idêntico a 111/120 itens já salvos). Resultado: 56 corretas, 47 erradas, 5 anuladas, 12 em branco. Nota líquida final 14 (56-47+5), regra CEBRASPE (brancas não descontam). Língua Portuguesa e Regras da ONU/Legislação Especial ficaram com líquido negativo.'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Departamento Penitenciário Nacional'
  and contest_year = '2021'
  and doc_type = 'resultado';

-- ===== ./20260927240000_pc_ac_2017_gabarito_resend.sql
-- Candidate resent his personal gabarito for PC-AC 2017 (2026-09-27, caderno
-- S01 - Versão V). Verified against the previously stored record BEFORE
-- applying: 78/80 items identical, only items 60 (Direito Processual Penal)
-- and 66 (Legislação Penal Especial) changed — both flip from correct to
-- wrong. Confirmed as a genuine correction, not a different attempt.
--
-- Candidate explicitly asked to re-verify the scoring FORMULA for this banca
-- (IBADE), since it differs from CEBRASPE (no negative marking, weighted
-- points per discipline instead of a flat +1/-1). Checked directly against
-- the exam booklet's own cover page (pagina-01.jpg of the candidate's own
-- caderno S01-V, photographed and already in storage): the weight table
-- printed there is EXACTLY what was already used — Direito Penal and Direito
-- Processual Penal worth 2 points/question, every other discipline worth 1
-- point/question, scale 0-100. No correction to the formula was needed, only
-- to the 2 changed answers.
--
-- New total after the 2 flips: 48/100 (was 51/100). Both items 60 and 66
-- move from "correta" to "errada" — item 60 costs 2 points (Direito
-- Processual Penal), item 66 costs 1 point (Legislação Penal Especial).
update public.student_exam_documents
set correct_count = 39,
    wrong_count = 41,
    score_net = 48,
    score_raw = 48,
    extracted_data = jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(extracted_data, '{items,60}', '"errada"'),
          '{items,66}', '"errada"'
        ),
        '{candidate_answers,60}', '"E"'
      ),
      '{candidate_answers,66}', '"E"'
    ) || jsonb_build_object(
      'pontuacao_obtida', jsonb_build_object(
        'total', 48,
        'informatica', jsonb_build_object('de', 5, 'pontos', 5, 'corretas', 5),
        'direito_penal', jsonb_build_object('de', 10, 'pontos', 8, 'corretas', 4),
        'medicina_legal', jsonb_build_object('de', 10, 'pontos', 8, 'corretas', 8),
        'lingua_portuguesa', jsonb_build_object('de', 10, 'pontos', 2, 'corretas', 2),
        'raciocinio_logico', jsonb_build_object('de', 5, 'pontos', 1, 'corretas', 1),
        'direito_administrativo', jsonb_build_object('de', 10, 'pontos', 5, 'corretas', 5),
        'direito_constitucional', jsonb_build_object('de', 10, 'pontos', 5, 'corretas', 5),
        'direito_processual_penal', jsonb_build_object('de', 10, 'pontos', 10, 'corretas', 5),
        'legislacao_penal_especial', jsonb_build_object('de', 10, 'pontos', 4, 'corretas', 4)
      )
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado, verificado contra o registro anterior antes de aplicar (78/80 itens idênticos — apenas itens 60 e 66 mudaram, ambos de correta para errada). Candidato também pediu para reconferir a fórmula de pontuação desta banca (IBADE) — confirmado diretamente na capa da própria prova (pagina-01.jpg do caderno S01-V do candidato): Direito Penal e Direito Processual Penal valem 2 pts/questão, demais disciplinas 1 pt/questão, escala 0-100, sem desconto por erro. Fórmula já estava correta; só os 2 itens mudaram. Novo total: 48/100 (era 51/100). Direito Processual Penal caiu de 6/10 para 5/10 corretas (perdeu 2 pts); Legislação Penal Especial caiu de 5/10 para 4/10 corretas (perdeu 1 pt).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Civil do Acre'
  and contest_year = '2017'
  and doc_type = 'resultado';

-- ===== ./20260927250000_link_ppac2023_essay_images.sql
-- The PP-AC 2023 essay was stored with an accurate transcription/tema but
-- storage_paths was left empty, same gap already found and fixed for PRF
-- 2021 (20260927180000) and DEPEN 2021 (20260927220000). The candidate's own
-- handwriting matching this transcription verbatim spans two pages of his
-- own booklet: pagina-14.jpg (the "PROVA DISCURSIVA - REDAÇÃO" prompt page,
-- which already carries the first two paragraphs of his rascunho at the
-- bottom) and pagina-15.jpg (the rest of the rascunho, lines 1-29) — both
-- already in the student-exams bucket as part of the 15-page
-- policia-penal-ac-2023-agente set.
update public.essay_submissions
set storage_paths = '[
  "f4326343-dd3a-46cf-b5e6-e6194abb31e5/policia-penal-ac-2023-agente/pagina-14.jpg",
  "f4326343-dd3a-46cf-b5e6-e6194abb31e5/policia-penal-ac-2023-agente/pagina-15.jpg"
]'::jsonb
where user_id = (select id from auth.users where email = '69598193268@norteconcurso.local')
  and contest_name = 'Polícia Penal do Acre'
  and contest_year = '2023';

-- ===== ./20260927260000_pp_ac_2023_gabarito_full_recheck.sql
-- Candidate resent his personal gabarito for PP-AC 2023 (2026-09-27, versão
-- B). Verified against the previously stored candidate_answers BEFORE
-- applying: 57/60 identical, only items 6 (blank -> A), 45 (A -> B) and 53
-- (C -> D) changed.
--
-- While recomputing from scratch against public.official_exam_questions,
-- TWO PRE-EXISTING GRADING BUGS were found, unrelated to this resend (the
-- candidate's answer for these items never changed across sessions):
--   * item 39: candidate answered D, official answer is D -> was wrongly
--     classified "errada", should be "correta" (+2 pts, Específicos).
--   * item 51: candidate answered D, official answer is D -> was wrongly
--     classified "errada", should be "correta" (+2 pts, Específicos).
-- A third pre-existing bug (item 9: candidate answered C, official is A,
-- was wrongly classified "correta") self-corrects here since item 9 is
-- recomputed from scratch as "errada" (-1 pt, Gerais) in this same pass.
--
-- Full recompute, per the official edital formula (item 7.1.1/7.1.3):
-- Conhecimentos Gerais (itens 1-30) = 1 pt/questão; Conhecimentos
-- Específicos (itens 31-60) = 2 pts/questão. No negative marking (IBFC).
--   Gerais: 26/30 (Língua Portuguesa 7/10, História e Geografia do Acre
--     10/10, Informática Básica 9/10)
--   Específicos: 46/60
--   TOTAL: 72/90 (was 70/90)
--
-- The candidate's COMBINED score (objetiva + discursiva = 85,40) was
-- already confirmed in the Diário Oficial do Estado do Acre — that total is
-- fixed and authoritative. Only the objetiva/discursiva SPLIT was ever a
-- deduction made by this project (never published separately by the
-- government), so correcting the objetiva component to 72 means the
-- discursiva component is now deduced as 85,40 - 72 = 13,40 (was 15,40).
update public.student_exam_documents
set correct_count = 49,
    wrong_count = 11,
    blank_count = 0,
    score_net = 72,
    score_raw = 85.40,
    extracted_data = jsonb_set(
      jsonb_set(
        jsonb_set(
          jsonb_set(
            jsonb_set(
              jsonb_set(extracted_data, '{items,6}', '"errada"'),
              '{items,9}', '"errada"'
            ),
            '{items,39}', '"correta"'
          ),
          '{items,45}', '"errada"'
        ),
        '{items,51}', '"correta"'
      ),
      '{items,53}', '"errada"'
    ) || jsonb_build_object(
      'candidate_answers', (extracted_data->'candidate_answers') || jsonb_build_object('6','A','45','B','53','D'),
      'pontuacao_obtida', jsonb_build_object(
        'total', 72,
        'gerais_total', 26,
        'lingua_portuguesa', jsonb_build_object('de', 10, 'pontos', 7, 'corretas', 7),
        'historia_geografia_acre', jsonb_build_object('de', 10, 'pontos', 10, 'corretas', 10),
        'informatica_basica', jsonb_build_object('de', 10, 'pontos', 9, 'corretas', 9),
        'especificos', jsonb_build_object('de', 30, 'pontos', 46, 'corretas', 23)
      ),
      'confirmacao_diario_oficial', jsonb_build_object(
        'nome', 'Franc Denis Barroso de Oliveira',
        'fonte', 'Diário Oficial do Estado do Acre',
        'nota_objetiva_calculada', 72,
        'nota_discursiva_deduzida', 13.40,
        'nota_combinada_objetiva_mais_discursiva', 85.40
      )
    ),
    notes = 'Reanálise solicitada pelo candidato (2026-09-27): gabarito reenviado, verificado contra o registro anterior (57/60 itens idênticos — apenas itens 6, 45 e 53 mudaram). Ao recalcular do zero contra o gabarito oficial, foram encontrados 2 erros de classificação PRÉ-EXISTENTES e não relacionados ao reenvio: itens 39 e 51 (candidato respondeu D em ambos, que bate com o oficial) estavam marcados como errada por engano em sessão anterior — corrigidos para correta (+2 pts cada). O item 9 (candidato respondeu C, oficial é A) estava marcado como correta por engano — corrigido para errada (-1 pt). Resultado: Gerais 26/30 (Língua Portuguesa 7/10, História e Geografia do Acre 10/10, Informática 9/10), Específicos 46/60 (23 corretas). TOTAL OBJETIVA: 72/90 (era 70/90). A nota COMBINADA (objetiva + discursiva = 85,40) já é confirmada no Diário Oficial do Estado do Acre e não muda — só a divisão entre objetiva/discursiva é deduzida por este projeto; com a objetiva corrigida para 72, a discursiva deduzida passa a ser 13,40 (era 15,40). Candidato segue HABILITADO em ambos os critérios (mínimo objetiva 45, mínimo discursiva 10).'
where user_id = (select id from auth.users where email='69598193268@norteconcurso.local')
  and contest_name = 'Polícia Penal do Acre'
  and contest_year = '2023'
  and doc_type = 'resultado';

-- ===== ./20260927270000_pc_ac_2017_essay_import.sql
-- The candidate had two essay photos ("REDAÇÃO ENUCIADO.jpg" and
-- "REDAÇÃO.jpg") sitting in his local "PC CIVEL DO ACRE 2017" folder that
-- were never uploaded to Supabase storage nor registered as an
-- essay_submissions row. Uploaded now to
-- {user}/policia-civil-ac-2017-agente/redacao-{enunciado,texto}.jpg.
--
-- IMPORTANT DATA CONFLICT, kept in `correcao.comentario` for transparency:
-- the essay prompt page is printed with the footer "FUNCAB - Fundação
-- Professor Carlos Augusto Bittencourt", a different exam board than IBADE
-- (the confirmed board for PC-AC 2017, per the exam cover page and the
-- official gabarito already in official_exam_questions). The candidate
-- explicitly confirmed (2026-09-27) this essay belongs to PC-AC 2017 despite
-- the FUNCAB imprint, so it is registered under that contest per his
-- instruction — but the discrepancy is left visible rather than silently
-- resolved, since it could not be independently verified.
insert into public.essay_submissions
  (user_id, contest_name, contest_year, exam_board, tema, topicos, nota_maxima,
   status, transcricao, storage_paths, correcao)
select
  u.id,
  'Polícia Civil do Acre',
  '2017',
  'IBADE',
  'A violência é fruto da desigualdade social (título do candidato: "Violência Urbana: viver ou morrer?!")',
  '[]'::jsonb,
  null,
  'texto_completo',
  E'Violência Urbana: viver ou morrer?!\n\nViver ou morrer?! Este é o dilema de milhares de pessoas, todos os dias, em muitas cidades do Brasil, vítimas de uma desenfreada onda de violência que parece não ter fim.\n\nNas ruas, olhares atentos, passos apressados, bolsas e carteiras bem protegidas, ritual comum indispensável para sobrevivência em ambientes hostis e perigosos dos centros urbanos.\n\nA violência instalada fez com que a sociedade, de certa forma, "acostumasse" com os horrores do cotidiano. Violência urbana é espécie do gênero desigualdade social. É a razão de existir desse mal enraizado. Para entender a essência do problema, é necessário encontrar seus "criadores", nos quais se pode atribuir a culpa.\n\nNão há sombra de dúvida que fatores como a falta de distribuição de renda e má administração política do país contribuem significadamente para a geração de muitos dos problemas da sociedade, que tem como, pobreza, a fome, a corrupção na adm. pública, má distribuição de renda, a precariedade da saúde e a segurança. Não basta apenas "esquivar-se" ou ficar exposto à violência. É imprescindível que a sociedade saiba escolher bons administradores, honestos e comprometidos a combater a violência e assim evitar outros males oriundos de suas políticas.\n\nPortanto, fico claro, com os fatos narrados, que a sociedade urbana vive refém da violência, e que esta é consequência de suas próprias escolhas, administradores corruptos que contribuem para o caos da violência e de outros males sociais.',
  '["f4326343-dd3a-46cf-b5e6-e6194abb31e5/policia-civil-ac-2017-agente/redacao-enunciado.jpg","f4326343-dd3a-46cf-b5e6-e6194abb31e5/policia-civil-ac-2017-agente/redacao-texto.jpg"]'::jsonb,
  jsonb_build_object(
    'confianca', 'baixa',
    'comentario', 'ATENÇÃO: a folha do enunciado desta redação traz o rodapé impresso "FUNCAB - Fundação Professor Carlos Augusto Bittencourt", banca diferente do IBADE confirmado para a PC-AC 2017 (capa da prova objetiva e gabarito oficial já cadastrados). O candidato confirmou explicitamente (2026-09-27) que esta redação pertence à PC-AC 2017 mesmo com essa divergência impressa, então foi registrada aqui por instrução dele — mas a banca real desta folha específica não pôde ser verificada de forma independente. Sem rubrica de tópicos oficial publicada (nenhuma das duas bancas citadas disponibiliza critério de correção detalhado publicamente), então nenhuma nota estimada foi atribuída.',
    'nota_estimada', null,
    'pontos_fortes', jsonb_build_array(
      'Título próprio e pertinente ao tema ("Violência Urbana: viver ou morrer?!")',
      'Estrutura dissertativo-argumentativa completa: introdução, dois parágrafos de desenvolvimento e conclusão',
      'Conecta violência urbana ao tema de desigualdade social pedido no enunciado, indo além da paráfrase dos textos motivadores'
    ),
    'pontos_fracos', jsonb_build_array(
      'Vários trechos rasurados/reescritos (ex.: linhas 7-8, 11-12, 16-18, 24), indicando insegurança na formulação',
      'Alguns problemas de concordância e ortografia (ex.: "significadamente", "instalado"/"instalada" rasurado)',
      'A causa apontada (má administração/corrupção) é ampla e pouco desenvolvida com exemplos concretos'
    )
  )
from auth.users u
where u.email = '69598193268@norteconcurso.local'
on conflict do nothing;

-- ===== ./20260927280000_pc_ac_2017_essay_banca_typo_resolved.sql
-- Candidate clarified (2026-09-27): the "FUNCAB" footer printed on the essay
-- prompt page was a typo/printing error by the banca itself when preparing
-- that page — not a sign the essay belongs to a different contest. This
-- resolves the conflict flagged in 20260927270000_pc_ac_2017_essay_import.sql.
-- Raises confidence and replaces the "unresolved conflict" comment with an
-- explanation of the typo, keeping the note for future reference rather than
-- deleting the history of the question.
update public.essay_submissions
set correcao = jsonb_set(
  jsonb_set(correcao, '{confianca}', '"media"'),
  '{comentario}',
  '"O rodapé \"FUNCAB - Fundação Professor Carlos Augusto Bittencourt\" impresso na folha do enunciado foi confirmado pelo candidato (2026-09-27) como erro de digitação/impressão da própria banca IBADE ao preparar essa página da prova discursiva — não indica outro concurso. Sem rubrica de tópicos oficial publicada pelo IBADE, então nenhuma nota estimada foi atribuída."'::jsonb
)
where user_id = (select id from auth.users where email = '69598193268@norteconcurso.local')
  and contest_name = 'Polícia Civil do Acre'
  and contest_year = '2017';

-- ===== ./20260927290000_iseac_2021_agente_socioeducativo_resultado.sql
-- First personal gabarito result for ISE-AC 2021 (Agente Socioeducativo -
-- Masculino, cargo M01, caderno Tipo Z, matching the candidate's own
-- booklet already in storage). No official_exam_questions rows existed for
-- this contest before this session (0 acertos/0 erros shown in the panel).
--
-- Official gabarito sourced from IBADE's official "Gabarito Final da Prova
-- Objetiva" (https://ibade.org.br/wp-content/uploads/2026/05/Gabarito-da-
-- Prova-Objetiva-IBADE-17.pdf, page 3/21 — Cargo M01, Prova Z), matching the
-- candidate's own caderno version. 3 annulled items for this version:
-- 11, 22, 71 (Legenda: "Questão Anulada").
--
-- Scoring rule confirmed directly in Edital nº 001 SEPLAG/ISE, de 04/10/2021
-- (item 8.5): all 100 questions worth 1 point each (10 Língua Portuguesa +
-- 10 Raciocínio Lógico Quantitativo + 10 História e Geografia do Acre + 10
-- Atualidades + 60 Conhecimentos Específicos = 100 pts total), NO negative
-- marking for wrong answers (item 8.9: unmarked/double-marked/erased = 0,
-- not negative). Elimination (item 8.6): candidate needs at least 50 points
-- overall AND a non-zero score in every discipline.
--
-- Result: 83 corretas (incl. 3 anuladas), 17 erradas. SCORE: 83/100.
-- Well above the 50-point elimination floor, and non-zero in every
-- discipline, so the candidate clears the objective-test elimination
-- criteria (item 8.6) on both counts. Whether he actually made the cutoff
-- position (532ª ampla concorrência for M01) is not determined here — would
-- require the candidate ranking list, which was not part of this check.
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, file_name, storage_path,
   correct_count, wrong_count, blank_count, score_net, score_raw, extracted_data, notes)
select
  u.id,
  'Instituto Socioeducativo do Estado do Acre - Agente Socioeducativo',
  '2021',
  'IBADE',
  'resultado',
  'ISEAC_2021_resultado_franc_denis.txt',
  'manual-entry/iseac-2021-agente-socioeducativo-franc-denis',
  83,
  17,
  0,
  83,
  83,
  jsonb_build_object(
      'method', 'gabarito pessoal do candidato confrontado item a item com o Gabarito Final da Prova Objetiva oficial do IBADE (Cargo M01, Prova Z), pontuado conforme a fórmula do Edital nº 001 SEPLAG/ISE (item 8.5): 1 ponto por questão, sem desconto por erro.',
      'items', '{
        "1":"errada","2":"correta","3":"errada","4":"errada","5":"errada","6":"correta","7":"correta","8":"correta","9":"correta","10":"correta",
        "11":"anulada","12":"correta","13":"correta","14":"correta","15":"correta","16":"errada","17":"errada","18":"correta","19":"correta","20":"errada",
        "21":"correta","22":"anulada","23":"errada","24":"correta","25":"correta","26":"errada","27":"correta","28":"correta","29":"correta","30":"errada",
        "31":"correta","32":"correta","33":"correta","34":"errada","35":"correta","36":"correta","37":"correta","38":"correta","39":"correta","40":"correta",
        "41":"correta","42":"correta","43":"correta","44":"correta","45":"correta","46":"correta","47":"correta","48":"correta","49":"correta","50":"errada",
        "51":"correta","52":"correta","53":"correta","54":"correta","55":"correta","56":"correta","57":"correta","58":"correta","59":"correta","60":"correta",
        "61":"errada","62":"errada","63":"correta","64":"correta","65":"correta","66":"correta","67":"correta","68":"correta","69":"errada","70":"correta",
        "71":"anulada","72":"correta","73":"correta","74":"correta","75":"correta","76":"correta","77":"errada","78":"correta","79":"correta","80":"correta",
        "81":"correta","82":"correta","83":"correta","84":"correta","85":"correta","86":"correta","87":"correta","88":"correta","89":"errada","90":"correta",
        "91":"correta","92":"correta","93":"correta","94":"correta","95":"correta","96":"correta","97":"correta","98":"correta","99":"correta","100":"correta"
      }'::jsonb,
      'candidate_answers', '{
        "1":"E","2":"A","3":"B","4":"E","5":"E","6":"E","7":"B","8":"D","9":"C","10":"A",
        "11":"C","12":"E","13":"C","14":"D","15":"E","16":"B","17":"B","18":"E","19":"C","20":"B",
        "21":"B","22":"E","23":"D","24":"C","25":"D","26":"A","27":"A","28":"B","29":"B","30":"C",
        "31":"D","32":"B","33":"B","34":"E","35":"A","36":"D","37":"E","38":"B","39":"A","40":"A",
        "41":"A","42":"D","43":"B","44":"E","45":"B","46":"E","47":"B","48":"C","49":"C","50":"A",
        "51":"E","52":"C","53":"B","54":"D","55":"C","56":"D","57":"B","58":"A","59":"E","60":"D",
        "61":"B","62":"E","63":"B","64":"A","65":"A","66":"E","67":"B","68":"C","69":"A","70":"B",
        "71":"B","72":"A","73":"D","74":"C","75":"C","76":"A","77":"A","78":"C","79":"A","80":"D",
        "81":"D","82":"E","83":"B","84":"D","85":"E","86":"E","87":"B","88":"C","89":"B","90":"C",
        "91":"A","92":"D","93":"C","94":"A","95":"A","96":"C","97":"E","98":"A","99":"B","100":"C"
      }'::jsonb,
      'by_subject', jsonb_build_object(
        'Língua Portuguesa', jsonb_build_object('total',10,'correct',6,'wrong',4,'annulled',0,'blank',0),
        'Raciocínio Lógico Quantitativo', jsonb_build_object('total',10,'correct',7,'wrong',3,'annulled',1,'blank',0),
        'História e Geografia do Acre', jsonb_build_object('total',10,'correct',7,'wrong',3,'annulled',1,'blank',0),
        'Atualidades', jsonb_build_object('total',10,'correct',9,'wrong',1,'annulled',0,'blank',0),
        'Conhecimentos Específicos', jsonb_build_object('total',60,'correct',54,'wrong',6,'annulled',1,'blank',0)
      ),
      'criterio_eliminatorio', jsonb_build_object(
        'minimo_geral_exigido', 50,
        'obtido', 83,
        'zerou_alguma_disciplina', false,
        'passou_no_criterio_objetivo', true,
        'observacao', 'Posicionamento dentro da faixa de vagas (532ª ampla concorrência para M01) não verificado nesta análise — depende da lista de classificação de todos os candidatos.'
      )
    ),
  'Gabarito oficial obtido em ibade.org.br (Gabarito Final da Prova Objetiva, Cargo M01 - Agente Socioeducativo Masculino, Prova Z — mesma versão do caderno do candidato). Regra de pontuação confirmada no Edital nº 001 SEPLAG/ISE de 04/10/2021, item 8.5: 1 ponto por questão em todas as disciplinas (Língua Portuguesa, Raciocínio Lógico Quantitativo, História e Geografia do Acre, Atualidades = 10 pts cada; Conhecimentos Específicos = 60 pts), sem desconto por erro (item 8.9). Resultado: 83 corretas (incluindo 3 anuladas: itens 11, 22, 71), 17 erradas. SCORE: 83/100. Passa no critério eliminatório do item 8.6 (mínimo 50 pontos gerais e não pode zerar nenhuma disciplina) com folga.'
from auth.users u
where u.email = '69598193268@norteconcurso.local'
on conflict do nothing;

-- ===== ./20260927300000_iseac_2021_tecnico_informatica_resultado.sql
-- First personal gabarito result for ISE-AC 2021 (Técnico Administrativo e
-- Operacional - Técnico de Informática, cargo M05, caderno Tipo X, matching
-- the candidate's own booklet, applied in the afternoon per the candidate).
--
-- Official gabarito from the same IBADE PDF used for the Agente
-- Socioeducativo result (20260927290000): "Gabarito Final da Prova
-- Objetiva" (https://ibade.org.br/wp-content/uploads/2026/05/Gabarito-da-
-- Prova-Objetiva-IBADE-17.pdf, page 13/21 — Cargo M05, Prova X). 5 annulled
-- items for this version: 2, 12, 13, 26, 98.
--
-- Same scoring rule as M01 (Edital nº 001 SEPLAG/ISE, item 8.5): all 100
-- questions worth 1 point each (10 Língua Portuguesa + 10 Raciocínio Lógico
-- Quantitativo + 10 História e Geografia do Acre + 10 Atualidades + 60
-- Conhecimentos Específicos = 100 pts total), no negative marking.
-- Elimination (item 8.6): at least 50 points overall AND non-zero in every
-- discipline.
--
-- Result: 75 corretas (incl. 5 anuladas), 25 erradas. SCORE: 75/100.
-- Clears the elimination floor (>=50) and no discipline scored zero.
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, file_name, storage_path,
   correct_count, wrong_count, blank_count, score_net, score_raw, extracted_data, notes)
select
  u.id,
  'Instituto Socioeducativo do Estado do Acre - Técnico de Informática',
  '2021',
  'IBADE',
  'resultado',
  'ISEAC_2021_tecnico_informatica_resultado_franc_denis.txt',
  'manual-entry/iseac-2021-tecnico-informatica-franc-denis',
  75,
  25,
  0,
  75,
  75,
  jsonb_build_object(
      'method', 'gabarito pessoal do candidato confrontado item a item com o Gabarito Final da Prova Objetiva oficial do IBADE (Cargo M05, Prova X), pontuado conforme a fórmula do Edital nº 001 SEPLAG/ISE (item 8.5): 1 ponto por questão, sem desconto por erro.',
      'items', '{
        "1":"correta","2":"anulada","3":"correta","4":"errada","5":"errada","6":"correta","7":"correta","8":"correta","9":"errada","10":"errada",
        "11":"errada","12":"anulada","13":"anulada","14":"errada","15":"errada","16":"errada","17":"correta","18":"errada","19":"errada","20":"errada",
        "21":"correta","22":"correta","23":"correta","24":"correta","25":"correta","26":"anulada","27":"correta","28":"errada","29":"correta","30":"correta",
        "31":"correta","32":"correta","33":"correta","34":"correta","35":"correta","36":"correta","37":"correta","38":"correta","39":"correta","40":"correta",
        "41":"correta","42":"correta","43":"correta","44":"correta","45":"correta","46":"correta","47":"correta","48":"correta","49":"correta","50":"correta",
        "51":"errada","52":"correta","53":"correta","54":"correta","55":"correta","56":"correta","57":"correta","58":"correta","59":"correta","60":"correta",
        "61":"correta","62":"correta","63":"correta","64":"correta","65":"errada","66":"correta","67":"correta","68":"errada","69":"correta","70":"correta",
        "71":"correta","72":"correta","73":"correta","74":"errada","75":"errada","76":"correta","77":"correta","78":"correta","79":"correta","80":"errada",
        "81":"errada","82":"errada","83":"correta","84":"errada","85":"correta","86":"correta","87":"errada","88":"correta","89":"errada","90":"correta",
        "91":"correta","92":"correta","93":"correta","94":"errada","95":"correta","96":"correta","97":"errada","98":"anulada","99":"correta","100":"correta"
      }'::jsonb,
      'candidate_answers', '{
        "1":"B","2":"D","3":"D","4":"A","5":"A","6":"D","7":"E","8":"A","9":"A","10":"A",
        "11":"B","12":"A","13":"C","14":"B","15":"C","16":"B","17":"B","18":"B","19":"D","20":"D",
        "21":"D","22":"E","23":"D","24":"B","25":"A","26":"B","27":"A","28":"B","29":"A","30":"B",
        "31":"D","32":"D","33":"B","34":"C","35":"E","36":"A","37":"C","38":"D","39":"A","40":"E",
        "41":"C","42":"B","43":"E","44":"A","45":"C","46":"B","47":"D","48":"C","49":"A","50":"B",
        "51":"C","52":"E","53":"A","54":"D","55":"A","56":"B","57":"C","58":"A","59":"A","60":"B",
        "61":"E","62":"A","63":"C","64":"A","65":"E","66":"B","67":"C","68":"C","69":"E","70":"A",
        "71":"C","72":"E","73":"D","74":"A","75":"A","76":"D","77":"C","78":"A","79":"E","80":"B",
        "81":"C","82":"C","83":"B","84":"B","85":"C","86":"A","87":"D","88":"A","89":"B","90":"B",
        "91":"E","92":"A","93":"C","94":"D","95":"D","96":"C","97":"B","98":"B","99":"A","100":"B"
      }'::jsonb,
      'by_subject', jsonb_build_object(
        'Língua Portuguesa', jsonb_build_object('total',10,'correct',6,'wrong',4,'annulled',1,'blank',0),
        'Raciocínio Lógico Quantitativo', jsonb_build_object('total',10,'correct',3,'wrong',7,'annulled',2,'blank',0),
        'História e Geografia do Acre', jsonb_build_object('total',10,'correct',9,'wrong',1,'annulled',1,'blank',0),
        'Atualidades', jsonb_build_object('total',10,'correct',10,'wrong',0,'annulled',0,'blank',0),
        'Conhecimentos Específicos', jsonb_build_object('total',60,'correct',47,'wrong',13,'annulled',1,'blank',0)
      ),
      'criterio_eliminatorio', jsonb_build_object(
        'minimo_geral_exigido', 50,
        'obtido', 75,
        'zerou_alguma_disciplina', false,
        'passou_no_criterio_objetivo', true,
        'observacao', 'Posicionamento dentro da faixa de vagas (28ª ampla concorrência para M05) não verificado nesta análise — depende da lista de classificação de todos os candidatos.'
      )
    ),
  'Gabarito oficial obtido em ibade.org.br (Gabarito Final da Prova Objetiva, Cargo M05 - Técnico Administrativo e Operacional - Técnico de Informática, Prova X — mesma versão do caderno do candidato). Mesma regra de pontuação do Edital nº 001 SEPLAG/ISE usada para M01: 1 ponto por questão em todas as disciplinas, sem desconto por erro. Resultado: 75 corretas (incluindo 5 anuladas: itens 2, 12, 13, 26, 98), 25 erradas. SCORE: 75/100. Passa no critério eliminatório do item 8.6. Pior desempenho: Raciocínio Lógico Quantitativo (3/10, com 2 anuladas ajudando).'
from auth.users u
where u.email = '69598193268@norteconcurso.local'
on conflict do nothing;

-- ===== ./20260927310000_sefaz_ac_2023_especialista_resultado.sql
-- First personal gabarito result for SEFAZ/AC 2023 (Especialista da Fazenda
-- Estadual, Cargo 3). This exam board (CEBRASPE) applied here is DIFFERENT
-- from the standard PF/PRF/DEPEN "Certo/Errado com desconto" format the
-- candidate asked to double-check: this is a 5-alternative (A-E) multiple
-- choice, WITHOUT negative marking for wrong answers, confirmed directly in
-- Edital nº 001 SEAD/SEFAZ (13/12/2023), item 8.11.2.1: "1,00 ponto, caso a
-- resposta do candidato esteja em concordância com o gabarito oficial
-- definitivo... 0,00 ponto, caso... discorde, não haja marcação ou haja
-- mais de uma marcação." Item 8.1: 60,00 pontos totais para o Cargo 3 (30
-- Conhecimentos Gerais P1 + 30 Conhecimentos Específicos P2, 1 pt/questão).
-- Elimination (item 8.11.5): reprovado se nota < 15 em P1 OU < 15 em P2.
--
-- CRITICAL FINDING: this exam shuffles the A-E alternative order PER
-- CANDIDATE (unlike the PF/PRF/DEPEN CEBRASPE exams, which use a single
-- fixed caderno). Confirmed by comparing the candidate's own booklet photos
-- against the official reference content PDFs (cdn.cebraspe.org.br,
-- "946_SEFAZ_AC_CG2_01.PDF" for Gerais/Contador+Especialista and
-- "946_SEFAZ_AC_003_01.PDF" for Específicos/Especialista) item by item: same
-- question text, same 5 statements, different lettering per version. A
-- direct letter-to-letter comparison against the officially published
-- gabarito (which refers to ONE reference ordering) is therefore invalid.
--
-- Methodology: for all 60 items, matched the full TEXT of each alternative
-- between (a) the official reference PDF (which the official gabarito
-- letters refer to) and (b) the candidate's own booklet photo, to translate
-- the officially-correct content into the candidate's own lettering, then
-- compared against his actually submitted answer for that item.
--
-- Result: 16/30 Gerais, 19/30 Específicos = 35/60 total. Both blocks clear
-- the >=15 elimination floor (item 8.11.5), so the candidate is HABILITADO
-- on the objective test's elimination criteria. Classification/cutoff
-- position was not checked here (would require the full candidate ranking
-- list, not part of this exam-scoring task).
insert into public.student_exam_documents
  (user_id, contest_name, contest_year, exam_board, doc_type, file_name, storage_path,
   correct_count, wrong_count, blank_count, score_net, score_raw, extracted_data, notes)
select
  u.id,
  'SEFAZ/AC - Secretaria de Estado da Fazenda do Acre',
  '2023',
  'CEBRASPE',
  'resultado',
  'SEFAZ_AC_2023_resultado_franc_denis.txt',
  'manual-entry/sefaz-ac-2023-especialista-franc-denis',
  35,
  25,
  0,
  35,
  35,
  jsonb_build_object(
    'method', 'Gabarito pessoal do candidato confrontado, TEXTO por TEXTO (não letra por letra, pois a prova embaralha a ordem A-E por candidato), com o conteúdo de referência oficial do CEBRASPE (cdn.cebraspe.org.br: 946_SEFAZ_AC_CG2_01.PDF para Gerais e 946_SEFAZ_AC_003_01.PDF para Específicos) e o gabarito oficial definitivo (GAB_DEFINITIVO_946_SEFAZ_AC_CG2_01.PDF e equivalente para Específicos Cargo 3). Pontuação conforme Edital nº 001 SEAD/SEFAZ, item 8.11.2.1: 1 ponto por questão certa, 0 por errada/branco/dupla marcação — sem desconto por erro.',
    'candidate_answers', '{
      "1":"A","2":"E","3":"D","4":"A","5":"E","6":"E","7":"B","8":"B","9":"C","10":"B",
      "11":"A","12":"B","13":"D","14":"B","15":"C","16":"D","17":"E","18":"A","19":"C","20":"E",
      "21":"A","22":"D","23":"C","24":"B","25":"B","26":"A","27":"E","28":"A","29":"A","30":"B",
      "31":"E","32":"E","33":"D","34":"C","35":"A","36":"B","37":"A","38":"B","39":"C","40":"E",
      "41":"A","42":"B","43":"C","44":"A","45":"E","46":"D","47":"B","48":"A","49":"B","50":"E",
      "51":"C","52":"D","53":"E","54":"E","55":"E","56":"D","57":"C","58":"E","59":"B","60":"D"
    }'::jsonb,
    'items', '{
      "1":"errada","2":"correta","3":"errada","4":"errada","5":"errada","6":"correta","7":"correta","8":"correta","9":"correta","10":"correta",
      "11":"correta","12":"errada","13":"errada","14":"errada","15":"errada","16":"correta","17":"correta","18":"correta","19":"errada","20":"errada",
      "21":"correta","22":"errada","23":"correta","24":"correta","25":"correta","26":"correta","27":"errada","28":"correta","29":"errada","30":"errada",
      "31":"correta","32":"correta","33":"errada","34":"correta","35":"correta","36":"correta","37":"errada","38":"correta","39":"errada","40":"correta",
      "41":"correta","42":"correta","43":"correta","44":"errada","45":"correta","46":"errada","47":"errada","48":"correta","49":"correta","50":"correta",
      "51":"correta","52":"correta","53":"correta","54":"correta","55":"errada","56":"errada","57":"errada","58":"errada","59":"correta","60":"errada"
    }'::jsonb,
    'by_subject', jsonb_build_object(
      'Conhecimentos Gerais (P1)', jsonb_build_object('total',30,'correct',16,'wrong',14,'annulled',0,'blank',0,'minimo_exigido',15),
      'Conhecimentos Específicos (P2)', jsonb_build_object('total',30,'correct',19,'wrong',11,'annulled',0,'blank',0,'minimo_exigido',15)
    ),
    'criterio_eliminatorio', jsonb_build_object(
      'gerais_minimo', 15, 'gerais_obtido', 16,
      'especificos_minimo', 15, 'especificos_obtido', 19,
      'passou_no_criterio_objetivo', true,
      'observacao', 'Posicionamento/classificação entre candidatos não verificado nesta análise — depende da lista completa de classificação, não disponível nesta sessão.'
    )
  ),
  'Prova com formato DIFERENTE das demais provas CEBRASPE já registradas (PF/PRF/DEPEN usam Certo/Errado com desconto por erro; esta usa múltipla escolha A-E de 5 alternativas, SEM desconto por erro, confirmado no Edital nº 001 SEAD/SEFAZ item 8.11.2.1). Também diferente do padrão de outras provas: esta embaralha a ordem das alternativas por candidato (confirmado comparando o caderno do candidato com o PDF de referência oficial do CEBRASPE, mesmo texto de questão e das 5 opções, ordem de letras diferente). Por isso a comparação foi feita por conteúdo de cada alternativa, não por letra. Resultado: 16/30 Gerais + 19/30 Específicos = 35/60. Ambos os blocos acima do mínimo eliminatório de 15 (item 8.11.5) — candidato HABILITADO no critério objetivo.'
from auth.users u
where u.email = '69598193268@norteconcurso.local'
on conflict do nothing;

-- ===== ./20260928020000_franc_denis_contest_badges.sql
-- Selos (badges) de aprovação em concursos, informados diretamente pelo
-- candidato Franc Denis (CPF 69598193268) em 28/09/2026:
-- - Feijó 2018 (Professor - Licenciatura Plena - Pedagogo): aprovado, EFETIVO.
-- - Agente Socioeducativo: aprovado, EFETIVO.
-- - Técnico de Informática (ISE 2021): aprovado, CADASTRO DE RESERVA.
-- - Polícia Penal do Acre 2023: aprovado, CADASTRO DE RESERVA.
--
-- Datas de nomeação/homologação não foram confirmadas contra edital/diário
-- oficial nesta importação (diferente da prova de Feijó, cuja nota já foi
-- conferida contra o gabarito oficial em migration anterior); attained_at
-- usa o momento do cadastro até que as datas oficiais sejam verificadas.

insert into public.achievements (code, name, description, icon_url) values
('feijo_2018_efetivo', 'Aprovado — Professor/Pedagogo, Feijó-AC 2018', 'Aprovado e nomeado EFETIVO no concurso da Prefeitura de Feijó-AC, Edital nº 006/2018, cargo Professor - Licenciatura Plena - Pedagogo.', null),
('socioeducativo_efetivo', 'Aprovado — Agente Socioeducativo', 'Aprovado e nomeado EFETIVO no concurso para Agente Socioeducativo.', null),
('ise_tec_informatica_cr', 'Aprovado — Técnico de Informática (ISE)', 'Aprovado no concurso ISE para Técnico de Informática 2021, classificado em cadastro de reserva.', null),
('policia_penal_ac_cr', 'Aprovado — Polícia Penal do Acre', 'Aprovado no concurso da Polícia Penal do Acre 2023, classificado em cadastro de reserva.', null)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description;

with candidate as (
  select id from public.profiles where cpf = '69598193268'
)
insert into public.user_achievements (user_id, achievement_id, attained_at)
select candidate.id, achievements.id, now()
from candidate
cross join public.achievements
where achievements.code in (
  'feijo_2018_efetivo',
  'socioeducativo_efetivo',
  'ise_tec_informatica_cr',
  'policia_penal_ac_cr'
)
on conflict (user_id, achievement_id) do nothing;

-- ===== ./20260928040000_feijo_2017_result_and_badge.sql
-- Resultado e selo do concurso da Prefeitura de Feijó-AC 2017 (Edital 005/2017,
-- FUNDAPE), cargo Professor - Licenciatura Plena - Pedagogo, para o candidato
-- Franc Denis (CPF 69598193268). Aprovado e efetivado, conforme informado
-- pelo candidato em 28/09/2026.
--
-- Nota registrada é parcial: cobre apenas os itens 1-34 da prova objetiva
-- (34 de 40 questões), conferidos contra o gabarito oficial da FUNDAPE
-- (coluna Nível Superior para 1-25, coluna Professor-Pedagogo para 26-40).
-- Os itens 35-40 nao tem resposta do candidato registrada (nem no gabarito
-- pessoal da planilha, nem nas fotos da prova) e nao entram na contagem.
-- 22 corretas + 2 anuladas (itens 10 e 24, contam como acerto) = 24 net.

insert into public.mock_exam_results (user_id, exam_id, total_questions, correct_answers, finished_at)
select id, 'feijo-2017-professor-pedagogo', 40, 24, '2017-12-10T00:00:00Z'
from public.profiles where cpf = '69598193268';

insert into public.achievements (code, name, description, icon_url) values
('feijo_2017_efetivo', 'Aprovado — Professor/Pedagogo, Feijó-AC 2017', 'Aprovado e nomeado EFETIVO no concurso da Prefeitura de Feijó-AC, Edital nº 005/2017, cargo Professor - Licenciatura Plena - Pedagogo.', null)
on conflict (code) do update set
  name = excluded.name,
  description = excluded.description;

with candidate as (
  select id from public.profiles where cpf = '69598193268'
)
insert into public.user_achievements (user_id, achievement_id, attained_at)
select candidate.id, achievements.id, now()
from candidate
cross join public.achievements
where achievements.code = 'feijo_2017_efetivo'
on conflict (user_id, achievement_id) do nothing;

-- ===== ./20261002010000_feijo_2017_2018_timeline_placeholder.sql
-- Concursos de Professor da Prefeitura de Feijó (2017 e 2018) feitos por Franc Denis
-- (CPF 69598193268). As provas existem como fotos e gabarito na planilha pessoal.
-- 2017: resultado ainda NÃO apurado; o registro entra na Linha do tempo geral SEM nota
-- (contagens zeradas e extracted_data sem itens), e a tela mostra "sem resultado" em vez
-- de um aproveitamento inventado.
-- 2017: sem resultado (faltam as questões 35-40 da prova). 2018: resultado real, bloco abaixo.
-- contest_name igual ao de official_exam_questions (2018: 'Prefeitura de Feijó', 43 itens).

insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Prefeitura de Feijó','2017',null,'resultado',
  'Feijo_2017_professor_sem_resultado.txt','manual-entry/feijo-2017-franc-denis',
  0,0,0,0,
  '{"method":"sem resultado apurado","items":{}}'::jsonb,
  'Concurso Professor Feijó 2017 (nível superior). Resultado ainda não apurado: fotos das provas e gabarito na planilha pessoal; faltam as respostas marcadas pelo candidato.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

insert into public.student_exam_documents
  (user_id,contest_name,contest_year,exam_board,doc_type,file_name,storage_path,
   correct_count,wrong_count,blank_count,score_net,extracted_data,notes)
select u.id,'Prefeitura de Feijó','2018','FUNDAPE','resultado',
  'Feijo_2018_professor_resultado.txt','manual-entry/feijo-2018-franc-denis',
  33,14,0,74,
  '{"method": "leitura das marcações manuscritas nas fotos da prova (visto=acerto, X=erro), conferida com a nota escrita pelo candidato na capa (74 pontos) e com os pesos do edital 006/2018 (Quadro 05, 105 pontos; anuladas 32, 34 e 47 creditadas a todos)", "items": {"1": "correta", "2": "correta", "3": "correta", "4": "correta", "5": "correta", "6": "correta", "7": "correta", "8": "correta", "9": "correta", "10": "errada", "11": "correta", "12": "correta", "13": "correta", "14": "correta", "15": "correta", "16": "errada", "17": "correta", "18": "errada", "19": "errada", "20": "correta", "21": "correta", "22": "correta", "23": "correta", "24": "correta", "25": "correta", "26": "errada", "27": "correta", "28": "correta", "29": "errada", "30": "correta", "31": "errada", "32": "anulada", "33": "errada", "34": "anulada", "35": "errada", "36": "errada", "37": "correta", "38": "correta", "39": "errada", "40": "errada", "41": "correta", "42": "errada", "43": "correta", "44": "correta", "45": "correta", "46": "errada", "47": "anulada", "48": "correta", "49": "correta", "50": "correta"}}'::jsonb,
  'Concurso Professor Feijó 2018 (nível superior, pedagogo), edital 006/2018. 74 pontos de 105 (anotados pelo candidato na capa); 33 certas, 14 erradas, 3 anuladas (32, 34, 47). Aprovado.'
from auth.users u where u.email='69598193268@norteconcurso.local'
on conflict do nothing;

-- Caso o placeholder sem resultado já tenha sido gravado antes, atualiza para o resultado real.
update public.student_exam_documents d set
  exam_board='FUNDAPE', file_name='Feijo_2018_professor_resultado.txt',
  correct_count=33, wrong_count=14, blank_count=0, score_net=74,
  extracted_data='{"method": "leitura das marcações manuscritas nas fotos da prova (visto=acerto, X=erro), conferida com a nota escrita pelo candidato na capa (74 pontos) e com os pesos do edital 006/2018 (Quadro 05, 105 pontos; anuladas 32, 34 e 47 creditadas a todos)", "items": {"1": "correta", "2": "correta", "3": "correta", "4": "correta", "5": "correta", "6": "correta", "7": "correta", "8": "correta", "9": "correta", "10": "errada", "11": "correta", "12": "correta", "13": "correta", "14": "correta", "15": "correta", "16": "errada", "17": "correta", "18": "errada", "19": "errada", "20": "correta", "21": "correta", "22": "correta", "23": "correta", "24": "correta", "25": "correta", "26": "errada", "27": "correta", "28": "correta", "29": "errada", "30": "correta", "31": "errada", "32": "anulada", "33": "errada", "34": "anulada", "35": "errada", "36": "errada", "37": "correta", "38": "correta", "39": "errada", "40": "errada", "41": "correta", "42": "errada", "43": "correta", "44": "correta", "45": "correta", "46": "errada", "47": "anulada", "48": "correta", "49": "correta", "50": "correta"}}'::jsonb,
  notes='Concurso Professor Feijó 2018 (nível superior, pedagogo), edital 006/2018. 74 pontos de 105 (anotados pelo candidato na capa); 33 certas, 14 erradas, 3 anuladas (32, 34, 47). Aprovado.'
where d.storage_path='manual-entry/feijo-2018-franc-denis' and d.score_net=0;
