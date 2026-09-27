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
on conflict (exam_year,item_number) do update set
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
