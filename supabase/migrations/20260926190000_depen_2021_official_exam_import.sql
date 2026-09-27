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
on conflict (exam_year,item_number) do update set
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
