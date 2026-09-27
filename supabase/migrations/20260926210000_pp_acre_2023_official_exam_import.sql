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
on conflict (exam_year,item_number) do update set
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
