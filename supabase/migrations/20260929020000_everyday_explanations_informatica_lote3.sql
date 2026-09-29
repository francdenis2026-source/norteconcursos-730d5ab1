-- Explicações do dia a dia: Informática, lote 3 — PF 2018 (itens 86-96,
-- mineração de dados/redes/Python/R) e PF 2021 (itens 61-68, internet e
-- redes de computadores). Verificado por conhecimento de domínio.

-- 86: definição clássica de mineração de dados (Fayyad): padrões válidos, novos, úteis e compreensíveis.
update public.official_exam_questions set review_note=$q$Correto. É a definição clássica usada na área: mineração de dados é o processo de vasculhar grandes volumes de dados em busca de padrões que sejam VÁLIDOS (realmente existem, não é coincidência), NOVOS (não óbvios), ÚTEIS (servem pra alguma decisão) e, no fim, COMPREENSÍVEIS (uma pessoa consegue entender o padrão encontrado).
Exemplo: descobrir que "clientes que compram fraldas às sextas-feiras também costumam comprar cerveja" é um padrão de mineração de dados clássico — não óbvio à primeira vista, mas útil pra decisões de marketing, e fácil de entender depois de descoberto.$q$
where exam_year=2018 and item_number=86 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 87: switch de pacotes encaminha o pacote que chega numa porta de entrada pra uma porta de saída — definição padrão.
update public.official_exam_questions set review_note=$q$Correto. É exatamente essa a função de um comutador (switch) de pacotes: receber um pacote de dados chegando por uma "porta" e decidir por qual outra porta ele deve seguir viagem, até chegar ao destino — é assim que TVs, notebooks e celulares conseguem se conectar entre si e à internet.
Exemplo: é como um funcionário dos Correios que recebe uma carta numa esteira e decide pra qual caminhão (saída) ela deve ir, com base no endereço — sem esse encaminhamento, a carta nunca chegaria ao destino certo.$q$
where exam_year=2018 and item_number=87 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 88: LAN sem fio, satélite e redes HFC são exemplos clássicos de meios de DIFUSÃO (broadcast) — todo mundo "ouve" o mesmo sinal compartilhado.
update public.official_exam_questions set review_note=$q$Correto. Redes sem fio, por satélite e HFC (cabo híbrido de fibra e coaxial) compartilham o mesmo "meio físico" entre vários usuários ao mesmo tempo — é a definição de um canal de difusão (broadcast), onde o sinal chega a todo mundo conectado àquele meio, diferente de uma ligação ponto a ponto exclusiva entre só dois dispositivos.
Exemplo: uma antena de Wi-Fi transmite o sinal pra todo mundo que está no alcance dela ao mesmo tempo — é como uma rádio, que qualquer aparelho sintonizado consegue captar, diferente de um cabo de rede ligado direto entre dois computadores só.$q$
where exam_year=2018 and item_number=88 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 89: classificação padrão de redes por abrangência: LAN/MAN/WAN.
update public.official_exam_questions set review_note=$q$Correto. É a classificação mais básica de redes por tamanho de área coberta: LAN cobre um espaço pequeno (uma casa, um escritório); MAN cobre uma cidade; WAN cobre distâncias grandes, como um país ou o mundo todo (a própria internet é uma WAN gigante).
Exemplo: a rede Wi-Fi da sua casa é uma LAN; a rede de câmeras de trânsito de uma prefeitura cobrindo a cidade toda seria uma MAN; e a conexão entre a matriz de uma empresa em São Paulo e uma filial em Tóquio é uma WAN.$q$
where exam_year=2018 and item_number=89 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 90: protocolos de transporte (TCP/UDP) rodam nos sistemas finais (não em roteadores) e conectam processos de aplicação entre hospedeiros diferentes.
update public.official_exam_questions set review_note=$q$Correto. Protocolos de transporte (como TCP e UDP) não rodam dentro dos roteadores no meio do caminho — eles rodam nos próprios computadores das pontas (sistema final), garantindo que um programa específico (como seu navegador) converse com o programa certo do outro lado (o servidor do site), mesmo estando em máquinas diferentes.
Exemplo: é como o sistema de "ramais" de uma empresa — a rede telefônica te conecta ao prédio certo, mas é o ramal (camada de transporte) que garante que você fale com a pessoa certa dentro daquele prédio, não com qualquer uma.$q$
where exam_year=2018 and item_number=90 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 92: DNS realmente usa UDP, mas UDP NÃO tem "apresentação" (handshake) prévio — isso é característica do TCP, não do UDP.
update public.official_exam_questions set review_note=$q$Errado. A primeira parte está certa (DNS usa UDP), mas a segunda inventa uma característica que não existe no UDP: ele é "sem conexão", ou seja, manda os dados direto, sem nenhum aperto de mão (handshake) prévio entre remetente e destinatário. Esse tipo de "apresentação antes de mandar dados" é justamente a marca registrada do TCP, o protocolo concorrente do UDP.
Exemplo: UDP é como jogar um bilhete pela janela, torcendo pra chegar — rápido, mas sem combinar nada antes. TCP é como ligar antes pra combinar um horário de entrega, confirmando que a outra pessoa está pronta pra receber.$q$
where exam_year=2018 and item_number=92 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 93: x+y em R soma elemento a elemento (vetorial): (3+1,5+9,7+11)=(4,14,18), não a soma total 36.
update public.official_exam_questions set review_note=$q$Errado. Em R, somar dois vetores (x+y) soma posição por posição, não junta tudo num total só: 3+1=4, 5+9=14, 7+11=18 — o resultado seria "4 14 18", um vetor com 3 números, não o número único 36 (que seria a soma de TODOS os valores juntos, uma conta diferente).
Exemplo: é como somar duas listas de compras item por item (pão+pão, leite+leite), não juntar tudo numa única conta final — o resultado continua sendo uma lista, não um número só.$q$
where exam_year=2018 and item_number=93 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 95: Python não usa chaves {} nem dispensa os dois-pontos — o código tem erro de sintaxe, não roda e não imprime nada.
update public.official_exam_questions set review_note=$q$Errado. Esse código tem dois erros de sintaxe em Python: falta o dois-pontos depois da condição ("if 5 > 2:") e Python não usa chaves { } pra marcar blocos de código — ele usa indentação (espaços no início da linha). Com esses erros, o programa não roda de jeito nenhum, dá erro de sintaxe antes mesmo de tentar executar — não imprime "True!" como o item afirma.
Exemplo: é como escrever uma receita de bolo em português misturando gramática de outro idioma no meio — mesmo que o sentido pareça claro pra você, a receita "não compila" do jeito que está, precisa seguir as regras certas daquele idioma.$q$
where exam_year=2018 and item_number=95 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 96: "==" é comparação (não atribuição), falta o dois-pontos no for, e usa chaves em vez de indentação — múltiplos erros de sintaxe, o código não roda.
update public.official_exam_questions set review_note=$q$Errado. Esse código tem vários problemas: "==" compara valores, não atribui (pra criar a lista seria preciso um "=" só); falta o dois-pontos no fim do "for x in letras"; e de novo aparecem chaves { } no lugar da indentação que Python exige. Com tantos erros de sintaxe juntos, o programa nem chega a rodar — não imprime "PF" nem nada.
Exemplo: é como confundir "=" (que guarda um valor numa caixa) com "==" (que só pergunta se duas coisas são iguais, sem guardar nada) — um erro clássico de quem está começando a programar.$q$
where exam_year=2018 and item_number=96 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 61 (2021): sintaxe correta pra restringir busca a um site é "site:", não "in".
update public.official_exam_questions set review_note=$q$Errado. O operador certo do Google pra restringir a busca a um site específico é "site:" (por exemplo, site:pf.gov.br), não "in". A forma correta da busca completa seria "crime organizado" site:pf.gov.br — juntando as aspas (pra frase exata) com o operador certo de restrição de domínio.
Exemplo: é a mesma lógica de filtrar resultados numa busca de loja online por "categoria: eletrônicos" — cada operador tem sua própria palavra-chave certa, trocar por outra palavra parecida ("in" em vez de "site:") simplesmente não funciona.$q$
where exam_year=2021 and item_number=61 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 64: comando "pwd" no Linux mostra o diretório atual (Print Working Directory); trocar senha é "passwd".
update public.official_exam_questions set review_note=$q$Errado. "pwd" significa "print working directory" — ele só mostra em qual pasta você está no momento, dentro do terminal. O comando pra trocar senha no Linux é outro: "passwd" (com dois "s"). São comandos parecidos no nome, mas com funções completamente diferentes.
Exemplo: é fácil confundir os dois por causa do nome parecido — "pwd" é tipo perguntar "onde estou?" (localização), enquanto "passwd" é "mudar minha chave de entrada" (senha). Bem diferentes na prática.$q$
where exam_year=2021 and item_number=64 and career_name='Agente de Polícia Federal' and official_answer='E';

-- 66: protocolo IP define o formato dos pacotes que circulam entre roteadores e sistemas finais.
update public.official_exam_questions set review_note=$q$Correto. O protocolo IP é responsável por definir como um pacote de dados deve ser "empacotado" (formato, endereçamento) pra poder viajar pela rede, passando por roteadores até chegar ao destino final — é a base do endereçamento que faz a internet funcionar.
Exemplo: é como o padrão de formato de um envelope de carta (onde vai o remetente, o destinatário, o selo) — sem esse padrão comum, o sistema de encaminhamento dos Correios (ou da internet) não saberia como processar as remessas.$q$
where exam_year=2021 and item_number=66 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 67: as 5 camadas do modelo TCP/IP e as correspondentes do OSI (física, enlace, rede, transporte, aplicação) coincidem — o OSI só desmembra a camada de aplicação em 3 (sessão, apresentação, aplicação).
update public.official_exam_questions set review_note=$q$Correto. O modelo TCP/IP (na versão de 5 camadas) e o modelo OSI compartilham as camadas física, de enlace, de rede e de transporte com o mesmo papel — a diferença fica só no topo: o OSI separa em 3 camadas (sessão, apresentação e aplicação) o que o TCP/IP resume numa camada de aplicação só.
Exemplo: é como duas formas de organizar as etapas de uma entrega — ambas concordam nas etapas de "empacotar, endereçar, transportar", só que uma delas detalha mais as etapas finais de "receber e abrir o pacote" do que a outra.$q$
where exam_year=2021 and item_number=67 and career_name='Agente de Polícia Federal' and official_answer='C';

-- 68: SMTP é protocolo de EMAIL, não serve pra transferência de dados de formulários ao navegar em sites (isso é papel do HTTP/HTTPS).
update public.official_exam_questions set review_note=$q$Errado. SMTP é o protocolo usado especificamente pra ENVIAR emails — não tem nada a ver com preencher e enviar formulários enquanto você navega num site. Quem cuida da transferência de dados de formulários na web é o HTTP (ou HTTPS, sua versão segura), o protocolo por trás da navegação comum.
Exemplo: usar SMTP pra enviar um formulário de site seria como tentar mandar um pacote pelos Correios usando o sistema de uma transportadora de cargas diferente — cada protocolo foi feito pra um tipo específico de "entrega".$q$
where exam_year=2021 and item_number=68 and career_name='Agente de Polícia Federal' and official_answer='E';
