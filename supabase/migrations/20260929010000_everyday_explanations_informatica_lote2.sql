-- Explicações do dia a dia: Informática, lote 2 — PF 2018, itens 70-85
-- (nuvem SaaS/PaaS/IaaS, teoria de sistemas, internet/multimídia, banco
-- de dados/ER, mineração de dados). Conteúdo técnico verificado por
-- conhecimento de domínio, sem dependência de legislação.

-- 70: usar um webmail pronto (sem gerenciar servidor/SO) é SaaS, não PaaS (PaaS é pra quem desenvolve/hospeda aplicações, não pra só usar um software pronto).
update public.official_exam_questions set review_note=$q$Errado. Quando você só USA um serviço de email pronto (tipo Gmail ou Office 365), sem se preocupar com servidor, sistema operacional ou infraestrutura por trás, isso é SaaS (Software como Serviço) — o software inteiro já vem pronto pra usar. PaaS é outra coisa: uma plataforma pra quem quer DESENVOLVER e hospedar suas próprias aplicações, não pra simplesmente consumir um software já pronto.
Exemplo: usar o Gmail é como alugar um apartamento mobiliado e pronto pra morar (SaaS) — bem diferente de alugar um terreno com infraestrutura básica pra você construir sua própria casa do jeito que quiser (PaaS).$q$
where exam_year=2018 and item_number=70 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 71: armazenamento de arquivos e uso de recursos de rede compartilhados (impressoras, servidores) é território de infraestrutura básica — IaaS.
update public.official_exam_questions set review_note=$q$Correto. Guardar arquivos e compartilhar recursos básicos de rede (impressoras, servidores de arquivo) é justamente o tipo de necessidade que a Infraestrutura como Serviço (IaaS) resolve — ela fornece os componentes de infraestrutura crua (armazenamento, rede, processamento), deixando a organização livre pra configurar como quiser em cima disso.
Exemplo: é como alugar um galpão vazio com energia e água instaladas (a infraestrutura básica) pra guardar suas próprias caixas e organizar do seu jeito — você não está comprando um serviço pronto, só a estrutura de base.$q$
where exam_year=2018 and item_number=71 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 72: re-hosting ("lift and shift") de sistemas legados de mainframe pra IaaS é uma prática real e recomendada de migração.
update public.official_exam_questions set review_note=$q$Correto. "Re-hosting" (também chamado de "lift and shift") é justamente a estratégia de pegar um sistema antigo, feito originalmente pra rodar num mainframe, e movê-lo pra uma infraestrutura de nuvem (IaaS) com o mínimo de mudanças possível — uma abordagem comum e reconhecida pra modernizar sistemas legados sem reescrever tudo do zero.
Exemplo: é como mudar de casa levando os móveis exatamente como estão, sem reformar nada antes — resolve o problema de "onde morar" rápido, mesmo que depois seja preciso adaptar os móveis ao novo espaço.$q$
where exam_year=2018 and item_number=72 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 73: teoria geral dos sistemas (Bertalanffy) busca princípios unificadores que atravessam várias ciências — descrição clássica e correta.
update public.official_exam_questions set review_note=$q$Correto. A Teoria Geral dos Sistemas foi criada justamente com essa ambição: encontrar padrões e princípios que se repetem em sistemas de áreas bem diferentes — biologia, engenharia, administração — mostrando que existe uma lógica comum "por trás" de campos científicos que pareciam isolados um do outro.
Exemplo: o conceito de "feedback" (retroalimentação) explica tanto o termostato de uma casa quanto o controle hormonal do corpo humano — a mesma ideia central se aplica em áreas completamente diferentes, unindo ciências que pareciam não ter nada a ver.$q$
where exam_year=2018 and item_number=73 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 74: quem "navega" pela internet coletando páginas é o CRAWLER (robô/spider); o indexador organiza depois o que foi coletado — o item trocou as funções.
update public.official_exam_questions set review_note=$q$Errado. O item descreve o CRAWLER (também chamado de "robô" ou "spider") — é ele que navega sozinho pela internet, visitando páginas e coletando conteúdo. O INDEXADOR entra depois: ele organiza tudo que o crawler trouxe, montando o "catálogo" (índice) que a busca vai consultar. O item trocou as funções dos dois.
Exemplo: é a diferença entre o funcionário que sai catalogando os livros de uma biblioteca andando pelas estantes (o crawler) e o bibliotecário que organiza esses livros num sistema de fichas pra facilitar a busca depois (o indexador) — funções complementares, mas diferentes.$q$
where exam_year=2018 and item_number=74 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 75: transferência por fluxo CONTÍNUO não usa blocos com cabeçalho — isso é característica do modo BLOCO, um modo diferente de transferência.
update public.official_exam_questions set review_note=$q$Errado. O item descreve o modo BLOCO de transferência (dados divididos em blocos, cada um com seu cabeçalho de controle) — mas chama isso de "fluxo contínuo". No modo de fluxo contínuo (stream), os dados são enviados como um fluxo seguido, sem essa divisão formal em blocos com cabeçalho — são dois modos de transferência diferentes, e o item confundiu as descrições.
Exemplo: é a diferença entre assistir a um vídeo em streaming (um fluxo contínuo, sem "pacotes visíveis" pro usuário) e baixar um arquivo grande dividido em pedaços numerados, cada um com sua própria "etiqueta de controle" — mecanismos diferentes de entregar dados.$q$
where exam_year=2018 and item_number=75 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 76: áudio, vídeo e metadados de uma aplicação multimídia são normalmente empacotados juntos num "contêiner" (MP4, MKV) pra manter a sincronização na entrega.
update public.official_exam_questions set review_note=$q$Correto. Mesmo que áudio e vídeo sejam produzidos e processados separadamente, na hora de transmitir ou guardar tudo junto, eles são "empacotados" dentro de um formato contêiner (como MP4 ou MKV) — isso garante que o áudio e o vídeo cheguem sincronizados no destino, sem um "atrasar" em relação ao outro.
Exemplo: é como embalar separadamente o áudio e a imagem de um filme, mas colocar os dois na mesma caixa de envio com instruções de como remontar — sem essa caixa comum, os dois poderiam se perder ou chegar dessincronizados.$q$
where exam_year=2018 and item_number=76 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 79: conhecimento pressupõe compreensão/internalização da informação — mais complexo que a informação em si (hierarquia clássica dado→informação→conhecimento).
update public.official_exam_questions set review_note=$q$Correto. Informação é só o dado organizado de um jeito que faz sentido (ex.: "chove hoje"); conhecimento é um passo além — exige que alguém compreenda, relacione com outras informações e internalize aquilo de um jeito que passa a orientar decisões (ex.: "porque sei que chove, vou levar guarda-chuva"). Por isso o conhecimento é considerado mais complexo.
Exemplo: ler "a temperatura caiu 10 graus" é informação; entender que isso significa "preciso me agasalhar mais" e agir com base nisso é conhecimento — envolve um processamento a mais.$q$
where exam_year=2018 and item_number=79 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 80: levantamento de requisitos = entender o problema junto com o usuário; projeto = descrição computacional (arquitetura, linguagem, SGBD) — divisão clássica do ciclo de desenvolvimento.
update public.official_exam_questions set review_note=$q$Correto. São duas fases bem distintas de um projeto de sistema: primeiro, o levantamento de requisitos garante que desenvolvedores e usuários entendam exatamente o mesmo problema (sem essa etapa, corre-se o risco de construir a coisa errada). Depois, na fase de projeto, decide-se COMO construir tecnicamente a solução — que arquitetura usar, em qual linguagem programar, qual banco de dados escolher.
Exemplo: é a diferença entre entender exatamente o que um cliente quer numa reforma (levantamento) e depois decidir os materiais, a planta e o cronograma da obra (projeto) — a segunda etapa só faz sentido depois da primeira estar bem clara.$q$
where exam_year=2018 and item_number=80 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 81: cardinalidade n (produto) para 1 (tipo de produto) significa que CADA tipo de produto pode se associar a VÁRIOS produtos, não só 1 — o item inverte a direção da cardinalidade.
update public.official_exam_questions set review_note=$q$Errado. O "1" fica do lado de "tipo de produto" e o "n" do lado de "produto" — isso significa que cada PRODUTO está ligado a só 1 tipo, mas cada TIPO DE PRODUTO pode estar ligado a VÁRIOS produtos (o "n"). O item inverteu a leitura da cardinalidade, dizendo que um tipo só pode ter 1 produto associado.
Exemplo: pense em "categoria de livro" (tipo de produto) e "livro" (produto) — uma categoria como "romance" claramente tem vários livros associados a ela, não só um. Quem tem o "1" é o livro (cada livro pertence a só uma categoria).$q$
where exam_year=2018 and item_number=81 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 82: num relacionamento 1:N, o modelo relacional NÃO funde as duas tabelas — mantém as duas separadas e usa uma chave estrangeira do lado "N".
update public.official_exam_questions set review_note=$q$Errado. Transformar um relacionamento 1:N (um-para-muitos) num modelo relacional NÃO junta as duas tabelas numa só — cada entidade continua com sua própria tabela, e o que se faz é colocar a chave da entidade do lado "1" como uma chave estrangeira dentro da tabela do lado "N". Fundir tabelas geraria repetição de dados desnecessária.
Exemplo: numa loja, "categoria" e "produto" continuam sendo tabelas separadas — só se adiciona uma coluna "código da categoria" na tabela de produtos, apontando pra categoria correspondente. Não faz sentido juntar tudo numa tabela só, repetindo o nome da categoria em cada produto.$q$
where exam_year=2018 and item_number=82 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 83: chave primária é única DENTRO de cada tabela — duas tabelas diferentes podem perfeitamente ter uma coluna-chave com o mesmo NOME sem nenhum problema semântico.
update public.official_exam_questions set review_note=$q$Errado. Não há problema nenhum em duas entidades diferentes terem uma chave primária com o mesmo NOME ("código") — a exigência de unicidade da chave primária vale só DENTRO de cada tabela (não pode haver dois produtos com o mesmo código, por exemplo), não entre tabelas diferentes. O nome da coluna é só um rótulo; cada tabela tem seu próprio espaço de valores.
Exemplo: é perfeitamente normal duas tabelas diferentes (funcionários e clientes) terem, cada uma, uma coluna chamada "id" — são "ids" completamente independentes, um não interfere no outro.$q$
where exam_year=2018 and item_number=83 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 84: examinar características e atribuir classes com aprendizado supervisionado é a definição-padrão de classificação em ML.
update public.official_exam_questions set review_note=$q$Correto. Esse é o processo clássico de classificação em aprendizado de máquina: o algoritmo aprende, a partir de exemplos já rotulados (aprendizado supervisionado), a examinar as características de um novo objeto e decidir a qual classe/categoria ele pertence.
Exemplo: é como treinar um sistema com milhares de fotos já marcadas como "gato" ou "cachorro", e depois pedir pra ele olhar uma foto nova e dizer a qual das duas categorias ela pertence — isso é classificação.$q$
where exam_year=2018 and item_number=84 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 85: definição-padrão de Big Data (volume, variedade, velocidade).
update public.official_exam_questions set review_note=$q$Correto. Big Data descreve exatamente isso: tecnologias criadas pra lidar com volumes de dados gigantescos, vindos de fontes muito variadas (texto, imagem, sensores, redes sociais), processados e analisados em alta velocidade — coisa que ferramentas tradicionais de banco de dados não dão conta de fazer bem.
Exemplo: as recomendações de vídeos de uma plataforma de streaming analisam, em tempo real, o comportamento de milhões de usuários diferentes, cruzando tipos variados de dados (histórico, avaliações, tempo assistido) — é um exemplo típico de aplicação de Big Data no dia a dia.$q$
where exam_year=2018 and item_number=85 and career_name='Agente de Polícia Federal' and official_answer='C';
