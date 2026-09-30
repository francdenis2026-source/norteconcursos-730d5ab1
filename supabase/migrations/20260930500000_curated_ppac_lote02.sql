-- Curated (authored) questions for Polícia Penal do Acre (edital 2023),
-- lote 02: 30 questões cobrindo as 4 disciplinas do edital com subtemas
-- inéditos. Original content only.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-11',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'LEP — assistência à saúde do preso (art. 14)',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
A assistência à saúde do preso e do internado, de caráter preventivo e curativo, compreenderá atendimento médico, farmacêutico e odontológico, devendo o preso ser encaminhado a unidade hospitalar quando o estabelecimento penal não estiver aparelhado para prestar a assistência necessária.$q$,
  'C',
  $q$Certo. O art. 14 da Lei de Execução Penal assegura ao preso assistência à saúde integral, abrangendo tanto medidas preventivas quanto curativas nas áreas médica, farmacêutica e odontológica, prevendo expressamente a possibilidade de encaminhamento a unidade hospitalar externa quando a estrutura interna do estabelecimento penal for insuficiente para o atendimento necessário. Exemplo: um preso que necessite de cirurgia não realizável na unidade de saúde do presídio deve ser encaminhado a hospital da rede pública ou conveniada.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, art. 14','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-12',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'LEP — classificação dos condenados (art. 5º)',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
Os condenados serão classificados, segundo os seus antecedentes e personalidade, para orientar a individualização da execução penal, cabendo à Comissão Técnica de Classificação elaborar o programa individualizador do cumprimento da pena.$q$,
  'C',
  $q$Certo. O art. 5º da Lei de Execução Penal consagra o princípio da individualização executória da pena, determinando a classificação dos condenados a partir de critérios técnicos relacionados aos antecedentes e à personalidade de cada um, tarefa atribuída à Comissão Técnica de Classificação, que elabora o programa individualizador voltado ao acompanhamento da execução penal de forma personalizada. Exemplo: dois condenados pelo mesmo crime podem receber tratamentos e encaminhamentos distintos na execução da pena, conforme suas características individuais avaliadas pela comissão.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, art. 5º','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-13',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'LEP — sanções disciplinares (art. 53)',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
Constituem sanções disciplinares, entre outras, a advertência verbal, a repreensão, a suspensão ou restrição de direitos, o isolamento na própria cela ou em local adequado, e a inclusão no regime disciplinar diferenciado.$q$,
  'C',
  $q$Certo. O art. 53 da Lei de Execução Penal elenca as sanções disciplinares aplicáveis ao condenado em razão da prática de falta disciplinar, graduadas conforme a gravidade da infração, desde medidas mais brandas (advertência verbal, repreensão) até a mais grave (regime disciplinar diferenciado), devendo sua aplicação observar o devido processo legal disciplinar. Exemplo: uma falta leve pode ser punida apenas com advertência verbal, enquanto uma falta grave qualificada pode ensejar a inclusão do preso no regime disciplinar diferenciado.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, art. 53','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-14',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'Código Penal — ingresso de aparelho de comunicação em presídio (art. 349-A)',
  $q$Julgue o item a seguir, com base no Código Penal.
Ingressar, promover, intermediar, auxiliar ou facilitar a entrada de aparelho telefônico de comunicação móvel, de rádio ou similar, sem autorização legal, em estabelecimento prisional, é conduta tipificada como crime, independentemente de a entrega chegar efetivamente às mãos do preso destinatário.$q$,
  'C',
  $q$Certo. O art. 349-A do Código Penal criminaliza especificamente a introdução não autorizada de aparelhos de comunicação em estabelecimentos prisionais, em razão do risco que essa prática representa para a segurança pública, permitindo que presos mantenham comunicação com o ambiente externo para fins ilícitos, sendo a consumação do crime independente da efetiva posse do aparelho pelo destinatário pretendido. Exemplo: uma pessoa flagrada arremessando um celular por cima do muro de um presídio comete o crime, ainda que o aparelho não chegue a ser recolhido por nenhum preso.$q$,
  jsonb_build_array(jsonb_build_object('title','Código Penal, art. 349-A','url','https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-15',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'Lei Henry Borel — violência contra criança e adolescente (Lei 14.344/2022)',
  $q$Julgue o item a seguir, com base na Lei nº 14.344/2022 (Lei Henry Borel).
A Lei Henry Borel institui mecanismos para prevenção e repressão à violência doméstica e familiar praticada contra a criança e o adolescente, prevendo, entre outras medidas, a possibilidade de afastamento do agressor do lar e o encaminhamento da vítima e de testemunhas a atendimento multidisciplinar.$q$,
  'C',
  $q$Certo. A Lei nº 14.344/2022, criada em resposta a casos de grande repercussão de violência doméstica contra crianças, estabelece um sistema de proteção específico para vítimas menores de idade, inspirado, em parte, na sistemática da Lei Maria da Penha, prevendo medidas protetivas como o afastamento do agressor do lar e o encaminhamento a serviços de atendimento especializado para a vítima e eventuais testemunhas. Exemplo: identificados sinais de violência doméstica contra uma criança, a autoridade competente pode determinar o afastamento imediato do agressor da residência familiar, com base nessa lei.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 14.344/2022','url','https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14344.htm')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-16',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'Lei de Drogas — associação para o tráfico (art. 35)',
  $q$Julgue o item a seguir, com base na Lei nº 11.343/2006 (Lei de Drogas).
Associarem-se duas ou mais pessoas para o fim de praticar, reiteradamente ou não, os crimes de tráfico de drogas configura crime autônomo em relação ao próprio tráfico, com pena específica prevista na lei.$q$,
  'C',
  $q$Certo. O art. 35 da Lei nº 11.343/2006 tipifica a associação para o tráfico como delito próprio e autônomo, distinto do crime de tráfico em si (art. 33), exigindo a reunião estável de duas ou mais pessoas com a finalidade específica de praticar, ainda que uma única vez, os crimes de tráfico previstos na lei, sendo, por isso, dispensável a habitualidade para a configuração do tipo. Exemplo: duas pessoas que se reúnem previamente e organizam a compra e futura distribuição de drogas podem responder tanto pelo tráfico consumado quanto, autonomamente, pela associação para o tráfico.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.343/2006, art. 35','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm')),
  'difícil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-17',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'LEP — trabalho externo do preso (arts. 36-37)',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
A prestação de trabalho externo, autorizada pela direção do estabelecimento, é admissível para os presos em regime fechado somente em serviços ou obras públicas, dependendo de aptidão, disciplina e responsabilidade, além do cumprimento mínimo de um sexto da pena.$q$,
  'C',
  $q$Certo. Os arts. 36 e 37 da Lei de Execução Penal disciplinam o trabalho externo como benefício restrito, no regime fechado, a serviços ou obras públicas, exigindo cumprimento mínimo de fração da pena (um sexto), além de avaliação de aptidão, disciplina e responsabilidade do preso, medida que busca equilibrar a ressocialização com a manutenção da segurança e do controle sobre o condenado ainda em regime mais rigoroso. Exemplo: um preso em regime fechado, com bom comportamento e que já cumpriu um sexto da pena, pode ser autorizado a trabalhar em obra pública fora do estabelecimento, sob supervisão.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, arts. 36-37','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'difícil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-18',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'LEP — saída temporária (arts. 122-123)',
  $q$Julgue o item a seguir, com base na Lei nº 7.210/1984 (Lei de Execução Penal).
Os condenados que cumprem pena em regime semiaberto poderão obter autorização para saída temporária do estabelecimento, sem vigilância direta, nos casos de visita à família, frequência a curso, ou participação em atividades que concorram para o retorno ao convívio social, observados os requisitos legais.$q$,
  'C',
  $q$Certo. Os arts. 122 e 123 da Lei de Execução Penal regulam a saída temporária, benefício exclusivo dos presos em regime semiaberto, concedido sem escolta e mediante requisitos objetivos (tempo mínimo de cumprimento de pena) e subjetivos (bom comportamento carcerário), destinado a finalidades específicas que favoreçam a reaproximação familiar e social do condenado, sob compromisso de retorno na data estabelecida. Exemplo: um preso em regime semiaberto pode obter saída temporária para visitar a família durante o período de festas de fim de ano, mediante autorização judicial.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.210/1984, arts. 122-123','url','https://www.planalto.gov.br/ccivil_03/leis/l7210.htm')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-19',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'Lei de Tortura — aumento de pena para agente público (art. 1º, § 4º, II)',
  $q$Julgue o item a seguir, com base na Lei nº 9.455/1997.
A pena do crime de tortura é aumentada de um sexto até um terço se o crime é cometido por agente público, majorante que se aplica também aos agentes de segurança penitenciária no exercício de suas funções.$q$,
  'C',
  $q$Certo. O art. 1º, § 4º, inciso II, da Lei nº 9.455/1997 prevê causa de aumento de pena específica quando o crime de tortura é cometido por agente público, categoria que abrange os agentes de segurança penitenciária no exercício de suas atribuições funcionais, refletindo a maior reprovabilidade da conduta praticada por quem detém posição de autoridade e responsabilidade especial sobre pessoas sob sua guarda. Exemplo: um agente penitenciário que pratica tortura contra um preso sob sua custódia tem a pena majorada em razão dessa condição funcional.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.455/1997, art. 1º, § 4º, II','url','https://www.planalto.gov.br/ccivil_03/leis/l9455.htm')),
  'difícil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '64465d5e-79da-4411-b83b-1532df64ace5', 'ppac23-esp-20',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Conhecimentos Específicos', 'Vedação a penas cruéis (art. 5º, XLVII e XLIX, CF)',
  $q$Julgue o item a seguir, com base na Constituição Federal de 1988.
Não haverá penas de morte, salvo em caso de guerra declarada, de caráter perpétuo, de trabalhos forçados, de banimento, ou cruéis, sendo assegurado aos presos o respeito à integridade física e moral.$q$,
  'C',
  $q$Certo. O art. 5º, incisos XLVII e XLIX, da Constituição Federal veda expressamente determinadas modalidades de pena consideradas incompatíveis com a dignidade da pessoa humana (morte, exceto em guerra declarada; caráter perpétuo; trabalhos forçados; banimento; ou cruéis) e assegura a todo preso o respeito à sua integridade física e moral, princípio que deve orientar diretamente a atuação dos agentes responsáveis pela custódia de pessoas privadas de liberdade. Exemplo: a submissão de um preso a condições de confinamento que comprometam gravemente sua integridade física viola diretamente essa garantia constitucional.$q$,
  jsonb_build_array(jsonb_build_object('title','Constituição Federal, art. 5º, XLVII e XLIX','url','https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-09',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Acre — extensão territorial e concentração populacional',
  $q$Julgue o item a seguir, com base na geografia do Acre.
O Acre é um dos estados de menor extensão territorial e população da região Norte do Brasil, tendo Rio Branco como seu principal polo populacional e econômico.$q$,
  'C',
  $q$Certo. Em comparação com os demais estados da região Norte, o Acre possui território e população relativamente reduzidos, característica que, somada à sua localização de fronteira, molda aspectos importantes de sua organização administrativa e econômica, concentrando-se em Rio Branco a maior parte da atividade urbana, administrativa e de serviços do estado. Exemplo: enquanto Rio Branco concentra grande parte da população acreana, os demais municípios do interior apresentam densidade populacional bem menor.$q$,
  jsonb_build_array(jsonb_build_object('title','Geografia do Acre — Território e população','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-10',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Herança cultural da migração nordestina',
  $q$Julgue o item a seguir, com base na história e cultura do Acre.
A cultura acreana é fortemente marcada pela herança da migração nordestina do ciclo da borracha, refletida em manifestações populares, na culinária regional e nas tradições orais transmitidas pelas comunidades seringueiras.$q$,
  'C',
  $q$Certo. O grande fluxo migratório de nordestinos atraídos pelo ciclo da borracha deixou marcas profundas na formação cultural do Acre, influenciando manifestações populares, festas tradicionais, hábitos alimentares e a própria identidade das comunidades ribeirinhas e seringueiras, que preservam até hoje elementos culturais herdados desses migrantes e de sua fusão com populações locais e indígenas. Exemplo: festas populares e pratos típicos do Acre frequentemente refletem essa mescla de influências nordestinas e amazônicas.$q$,
  jsonb_build_array(jsonb_build_object('title','História e Cultura do Acre — Migração nordestina','url','https://www.gov.br/acre/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-11',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Emancipação política do Acre (1962)',
  $q$Julgue o item a seguir, com base na história do Acre.
O Acre, inicialmente incorporado como território federal após o Tratado de Petrópolis, foi elevado à condição de estado da federação em 1962, passando a ter autonomia política plena equiparada aos demais estados brasileiros.$q$,
  'C',
  $q$Certo. Após sua incorporação ao Brasil em 1903, o Acre permaneceu por décadas sob a condição de território federal, administrado diretamente pela União, até que, em 1962, foi elevado à categoria de estado, adquirindo autonomia política, capacidade de auto-organização e representação própria no Congresso Nacional, equiparando-se juridicamente aos demais entes federativos. Exemplo: somente a partir de 1962 o Acre passou a eleger governador próprio, com autonomia administrativa e legislativa característica dos estados-membros da federação.$q$,
  jsonb_build_array(jsonb_build_object('title','História do Acre — Elevação à condição de estado (1962)','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', '8a2a9188-be7b-4701-9656-b09d49f9d59b', 'ppac23-hist-12',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'História e Geografia do Acre', 'Rede hidrográfica do Acre',
  $q$Julgue o item a seguir, com base na geografia do Acre.
Rios como o Acre, o Iaco e o Envira integram a rede hidrográfica do estado, historicamente utilizados como vias de penetração, povoamento e escoamento da produção extrativista na região.$q$,
  'C',
  $q$Certo. A ocupação e o desenvolvimento do território acreano estiveram historicamente associados à navegação fluvial, sendo rios como o Acre, o Iaco e o Envira, entre outros da bacia amazônica, importantes vias de acesso ao interior da floresta, utilizadas tanto para o povoamento quanto para o transporte da produção extrativista, como a borracha e a castanha, em uma época de infraestrutura terrestre praticamente inexistente. Exemplo: comunidades ribeirinhas ao longo desses rios ainda hoje dependem, em grande medida, do transporte fluvial para acesso a serviços e escoamento de produção.$q$,
  jsonb_build_array(jsonb_build_object('title','Geografia do Acre — Rede hidrográfica','url','https://www.gov.br/acre/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-07',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Painel de Controle e Configurações do Windows',
  $q$Julgue o item a seguir, com base em noções de informática.
O Painel de Controle (ou, nas versões mais recentes, o aplicativo Configurações) do Windows permite ao usuário gerenciar aspectos do sistema, como contas de usuário, dispositivos conectados, rede e opções de acessibilidade.$q$,
  'C',
  $q$Certo. O Painel de Controle, progressivamente substituído pelo aplicativo Configurações nas versões mais recentes do Windows, centraliza o acesso às principais opções de personalização e administração do sistema operacional, incluindo o gerenciamento de contas de usuário, a configuração de redes, a instalação e remoção de programas, e o ajuste de opções de acessibilidade. Exemplo: um usuário pode acessar o aplicativo Configurações para alterar a senha de sua conta de usuário no Windows.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Sistema operacional Windows','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-08',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Atalho de impressão (Ctrl+P)',
  $q$Julgue o item a seguir, com base em noções de informática.
Em praticamente todos os aplicativos de edição e visualização de documentos, o atalho de teclado Ctrl+P aciona o comando de impressão, abrindo a janela de configuração da impressão do documento em edição ou visualização.$q$,
  'C',
  $q$Certo. O atalho Ctrl+P é um padrão amplamente adotado entre diferentes sistemas operacionais e aplicativos para acionar rapidamente a função de impressão, abrindo uma janela onde o usuário pode definir parâmetros como número de cópias, impressora de destino e intervalo de páginas a serem impressas. Exemplo: ao editar um relatório em um processador de texto, o usuário pode pressionar Ctrl+P para abrir diretamente a janela de impressão do documento.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Atalhos de teclado','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-09',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Redes de computadores — LAN e WAN',
  $q$Julgue o item a seguir, com base em noções de informática.
Uma rede local (LAN) conecta dispositivos situados em uma área geográfica restrita, como um mesmo prédio, enquanto uma rede de longa distância (WAN) conecta dispositivos situados em áreas geograficamente distantes, sendo a internet o maior exemplo de rede WAN.$q$,
  'C',
  $q$Certo. As redes de computadores são classificadas, entre outros critérios, conforme sua abrangência geográfica: a LAN (Local Area Network) conecta dispositivos próximos entre si, tipicamente dentro de um mesmo edifício ou campus, enquanto a WAN (Wide Area Network) conecta dispositivos em regiões geográficas distantes, sendo a internet o exemplo mais amplo e conhecido desse tipo de rede. Exemplo: a rede interna de computadores de um presídio conectados entre si é uma LAN, enquanto o acesso desses computadores à internet os conecta a uma WAN.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Redes de computadores','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-10',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Correio eletrônico — anexos de arquivo',
  $q$Julgue o item a seguir, com base em noções de informática.
Os anexos de e-mail permitem o envio de arquivos junto à mensagem eletrônica, havendo, em regra, limite de tamanho estabelecido pelo provedor de e-mail para o envio desses arquivos anexados.$q$,
  'C',
  $q$Certo. Os serviços de correio eletrônico permitem, além do envio de texto na mensagem, a inclusão de arquivos anexados, mas essa funcionalidade é limitada por um tamanho máximo estabelecido por cada provedor, de modo que arquivos muito grandes podem precisar ser compactados, divididos ou enviados por meio de serviços alternativos de compartilhamento de arquivos, como links de armazenamento em nuvem. Exemplo: um documento digitalizado muito grande pode não ser possível de anexar diretamente a um e-mail, sendo necessário compartilhar um link de acesso ao arquivo hospedado em nuvem.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Correio eletrônico','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-11',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Protocolo HTTPS',
  $q$Julgue o item a seguir, com base em noções de informática.
O protocolo HTTPS acrescenta uma camada de criptografia à comunicação entre o navegador e o servidor do site acessado, em relação ao protocolo HTTP, contribuindo para a proteção de dados transmitidos, como senhas e informações de pagamento.$q$,
  'C',
  $q$Certo. O HTTPS (HTTP Secure) incorpora criptografia por meio de certificados digitais à comunicação estabelecida entre o navegador do usuário e o servidor do site acessado, protegendo os dados transmitidos contra interceptação por terceiros, sendo especialmente relevante em páginas que envolvem transmissão de informações sensíveis, como senhas, dados bancários e informações pessoais. Exemplo: sites que exibem um cadeado ao lado do endereço no navegador indicam, em regra, o uso do protocolo HTTPS, sinalizando conexão segura.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Protocolos de segurança na internet','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-12',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Organização de arquivos em pastas',
  $q$Julgue o item a seguir, com base em noções de informática.
Em um sistema operacional, arquivos são organizados hierarquicamente em pastas (ou diretórios), que podem conter subpastas e arquivos, permitindo estruturar o armazenamento de dados de forma lógica e organizada.$q$,
  'C',
  $q$Certo. A estrutura hierárquica de pastas e subpastas é o modelo padrão de organização de arquivos adotado pelos sistemas operacionais modernos, permitindo ao usuário categorizar e localizar documentos de forma sistemática, facilitando tarefas de busca, backup e manutenção da organização do armazenamento digital. Exemplo: uma pasta chamada "Processos" pode conter subpastas organizadas por ano, dentro das quais estão armazenados os arquivos referentes a cada processo específico.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Organização de arquivos','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-13',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Recurso "localizar e substituir" (Ctrl+H)',
  $q$Julgue o item a seguir, com base em noções de informática.
O recurso "localizar e substituir", acionado pelo atalho Ctrl+H em processadores de texto, permite localizar todas as ocorrências de um termo específico no documento e substituí-las, individualmente ou em massa, por outro termo definido pelo usuário.$q$,
  'C',
  $q$Certo. A funcionalidade de localizar e substituir, presente na maioria dos processadores de texto e planilhas eletrônicas, é acionada, em regra, pelo atalho Ctrl+H, permitindo a busca rápida por um termo específico dentro do documento e sua substituição automática, seja de forma pontual (uma ocorrência por vez) ou em massa (todas as ocorrências de uma vez), o que economiza tempo em edições extensas. Exemplo: ao perceber que digitou incorretamente o nome de uma pessoa diversas vezes ao longo de um relatório, o usuário pode usar Ctrl+H para corrigir todas as ocorrências simultaneamente.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Edição de textos','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c68782fd-7a3e-4c32-86dc-cffa31000f57', 'ppac23-info-14',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Informática Básica', 'Autenticação de dois fatores',
  $q$Julgue o item a seguir, com base em noções de informática.
A autenticação de dois fatores adiciona uma camada extra de segurança ao processo de login, exigindo, além da senha, uma segunda forma de verificação, como um código enviado ao celular do usuário, dificultando o acesso não autorizado mesmo que a senha seja descoberta por terceiros.$q$,
  'C',
  $q$Certo. A autenticação de dois fatores (2FA) combina algo que o usuário sabe (senha) com algo que o usuário possui (dispositivo que recebe um código temporário) ou é (biometria), elevando significativamente a segurança do acesso a sistemas e contas, pois a mera descoberta da senha por um invasor não é suficiente para comprometer a conta protegida por esse mecanismo adicional. Exemplo: mesmo que um criminoso descubra a senha de e-mail de uma vítima, sem acesso ao código de verificação enviado ao celular dela, não conseguirá completar o login se a autenticação de dois fatores estiver ativada.$q$,
  jsonb_build_array(jsonb_build_object('title','Noções de Informática — Segurança de acesso','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-07',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Figuras de linguagem — hipérbole',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
A hipérbole consiste no exagero proposital de uma ideia ou característica, com finalidade expressiva ou enfática, sendo comumente empregada tanto na linguagem cotidiana quanto em textos literários.$q$,
  'C',
  $q$Certo. A hipérbole é figura de linguagem que amplia deliberadamente a dimensão real de um fato, sentimento ou característica, com o objetivo de produzir maior impacto expressivo no interlocutor, sendo recurso frequente tanto na fala informal do dia a dia quanto em textos literários e publicitários, para reforçar uma ideia. Exemplo: a expressão "já disse isso mil vezes" é uma hipérbole, pois evidentemente não se trata de uma quantidade literal, mas de uma ênfase exagerada sobre a repetição.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Figuras de linguagem','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-08',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Concordância de "meio" — advérbio e numeral',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Quando "meio" funciona como advérbio, equivalente a "um pouco", permanece invariável, não concordando em gênero com o adjetivo que modifica, como em "ela ficou meio triste"; quando funciona como numeral (metade), concorda normalmente, como em "meia laranja".$q$,
  'C',
  $q$Certo. A palavra "meio" apresenta comportamento gramatical distinto conforme sua classe: como advérbio (modificando adjetivo, com sentido de "um pouco"), é invariável, não devendo concordar em gênero, ao passo que, como numeral (indicando metade de algo), flexiona normalmente em gênero e número, concordando com o substantivo a que se refere. Exemplo: "ela está meio cansada" (advérbio, invariável) versus "comi meia maçã" (numeral, concordando com o substantivo feminino "maçã").$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Concordância de "meio"','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-09',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Pontuação — isolamento do aposto por vírgulas',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
O aposto, termo que explica, esclarece ou detalha outro termo da oração, deve ser isolado por vírgulas (ou, alternativamente, por travessões ou parênteses), independentemente de sua posição na frase.$q$,
  'C',
  $q$Certo. O aposto é termo acessório que amplia ou explica a referência de outro elemento da oração, devendo ser sempre isolado por sinais de pontuação (vírgulas, travessões ou parênteses), esteja ele no meio, no início ou no final da frase, regra que contribui para a clareza da leitura ao demarcar visualmente essa informação adicional. Exemplo: "O diretor do presídio, um servidor experiente, autorizou a visita" apresenta o aposto "um servidor experiente" corretamente isolado por vírgulas.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Pontuação e aposto','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-10',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Coesão sequencial — conectivos de adição',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Conectivos como "além disso", "ademais" e "outrossim" têm função de adição, introduzindo informação que se soma ao que já foi dito anteriormente no texto, reforçando o argumento ou acrescentando novo dado relevante.$q$,
  'C',
  $q$Certo. Os conectivos de adição estabelecem relação de soma entre as ideias de um texto, indicando que a informação seguinte se acrescenta à anterior sem contradizê-la, reforçando a argumentação e contribuindo para a progressão coesa do raciocínio apresentado. Exemplo: "O servidor cumpriu todas as suas obrigações; ademais, apresentou desempenho acima da média" utiliza o conectivo "ademais" para acrescentar informação positiva à ideia anterior.$q$,
  jsonb_build_array(jsonb_build_object('title','Linguística textual — Conectivos de adição','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-11',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Uso de "onde" e "aonde"',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Emprega-se "aonde" com verbos que exprimem movimento e regem a preposição "a" (como "ir" e "chegar"), e "onde" com verbos que não indicam movimento ou não regem essa preposição.$q$,
  'C',
  $q$Certo. A distinção entre "onde" (lugar em que algo está ou ocorre, sem ideia de movimento) e "aonde" (lugar para onde se dirige algo ou alguém, com verbos de movimento que regem a preposição "a") é frequentemente cobrada em provas de português, exigindo atenção ao verbo empregado na oração para o emprego correto de cada forma. Exemplo: "Onde você mora?" (sem movimento) versus "Aonde você vai?" (com movimento, verbo "ir" regendo a preposição "a").$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — "Onde" e "aonde"','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-12',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Regência nominal — "apto a"',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
O adjetivo "apto" rege a preposição "a" quando indica capacidade ou habilitação para algo, como em "apto a exercer a função".$q$,
  'C',
  $q$Certo. Assim como diversos outros adjetivos de capacidade ou habilitação, "apto" exige, na norma-padrão, complemento nominal introduzido pela preposição "a", regência frequentemente exigida em documentos oficiais que atestam capacitação de servidores ou candidatos para determinada função. Exemplo: "O candidato foi considerado apto ao exercício do cargo" emprega corretamente a regência do adjetivo "apto" com a preposição "a".$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Regência nominal','url','https://www.gov.br/mdh/pt-br')),
  'fácil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-13',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Concordância verbal com expressões partitivas',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
Com expressões partitivas como "a maioria de" e "a maior parte de" seguidas de substantivo no plural, a concordância verbal pode ser feita tanto no singular (concordando com o núcleo da expressão) quanto no plural (concordando com o substantivo que a acompanha), sendo ambas as formas aceitas pela norma-padrão.$q$,
  'C',
  $q$Certo. As expressões partitivas seguidas de substantivo plural admitem dupla possibilidade de concordância verbal na norma-padrão: a concordância gramatical estrita, com o núcleo singular da expressão ("a maioria"), ou a concordância atrativa, com o substantivo plural que a acompanha, sendo ambas consideradas corretas pelos gramáticos e bancas examinadoras. Exemplo: tanto "a maioria dos servidores concordou" quanto "a maioria dos servidores concordaram" são construções aceitas pela norma-padrão.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Concordância com expressões partitivas','url','https://www.gov.br/mdh/pt-br')),
  'difícil', now()
),
(
  'e6c254c2-85f0-40ed-adcc-34447edd4660', 'c665f894-1650-4c5c-a080-341ecd3910a1', 'ppac23-port-14',
  'Polícia Penal do Acre', 2023, 'Agente de Polícia Penal', 'IBFC', 'Língua Portuguesa', 'Discurso direto e discurso indireto',
  $q$Julgue o item a seguir, com base na norma-padrão da Língua Portuguesa.
No discurso direto, as falas das personagens são reproduzidas literalmente, geralmente introduzidas por verbos de elocução e sinalizadas por travessão ou aspas; no discurso indireto, a fala é reproduzida pelo narrador, sem reprodução literal, com adaptações de tempo verbal e de pessoa gramatical.$q$,
  'C',
  $q$Certo. O discurso direto preserva a literalidade das falas, marcadas graficamente por travessão ou aspas e introduzidas por verbos de elocução (dizer, afirmar, perguntar), enquanto o discurso indireto integra a fala à narração sem reprodução literal, exigindo ajustes de tempo verbal, pessoa gramatical e, muitas vezes, de pronomes e advérbios, para adequar a fala relatada à perspectiva do narrador. Exemplo: "Ele disse: 'Eu vou embora agora'" (discurso direto) equivale, em discurso indireto, a "Ele disse que iria embora naquele momento", com as devidas adaptações verbais e pronominais.$q$,
  jsonb_build_array(jsonb_build_object('title','Gramática normativa — Discurso direto e indireto','url','https://www.gov.br/mdh/pt-br')),
  'média', now()
);
