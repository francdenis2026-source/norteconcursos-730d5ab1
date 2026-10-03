-- Auditoria PF 2021 Escrivão de Polícia Federal — lote 3 (18 itens de
-- Informática, itens 61-80, autossuficientes de conhecimento técnico geral,
-- sem dependência de fonte legal). Itens 56-60 (Raciocínio Lógico, conjuntos
-- P1/P2/P3 de um argumento não capturado), 65 (depende de uma planilha
-- Excel específica não reproduzida no texto) e 77 (depende de "o gráfico",
-- uma figura não capturada) ficaram de fora por dependerem de material
-- visual/contextual ausente da importação.

update public.official_exam_questions
set review_note=$q$Errado. A sintaxe correta do Google para restringir a busca a um site específico é "site:", não "in": a forma correta seria "crime organizado" site:pf.gov.br. O operador "in" não existe para essa finalidade no Google.
Exemplo: é como confundir o comando certo de um aplicativo com outro parecido — "site:" é o operador que limita a pesquisa a um domínio; "in" simplesmente não faz isso no Google.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=61;

update public.official_exam_questions
set review_note=$q$Correto. O Google Chrome possui o recurso "Verificação de Senhas" (Password Checkup), integrado ao gerenciador de senhas do navegador, que alerta o usuário quando uma combinação de usuário e senha salva corresponde a credenciais encontradas em vazamentos de dados conhecidos.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=62;

update public.official_exam_questions
set review_note=$q$Errado. O cadeado (cinza ou colorido) ao lado da URL no Chrome indica que a conexão com o site está sendo feita via HTTPS (criptografada/segura) — não tem relação com o site ser uma "intranet" interna de alguma organização. Um site público acessado via HTTPS normal (como o gov.br) também exibe esse cadeado.
Exemplo: o cadeado está dizendo "essa conexão é segura/criptografada", não "você está numa rede interna" — são conceitos diferentes.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=63;

update public.official_exam_questions
set review_note=$q$Errado. No Linux, o comando "pwd" significa "print working directory" e serve para exibir o caminho do diretório atual — o comando usado para trocar a senha de um usuário é o "passwd".
Exemplo: "pwd" mostra "onde você está" no sistema de arquivos; "passwd" é quem troca a senha — são comandos completamente diferentes, apesar dos nomes parecidos.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=64;

update public.official_exam_questions
set review_note=$q$Correto. O protocolo IP (Internet Protocol) é responsável por especificar o formato dos pacotes (datagramas) que trafegam entre os sistemas finais e os roteadores na Internet, além de definir o esquema de endereçamento lógico (endereços IP).$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=66;

update public.official_exam_questions
set review_note=$q$Correto. O modelo de referência TCP/IP (em sua versão de cinco camadas, usada didaticamente) e o modelo OSI (de sete camadas) compartilham as camadas física, de enlace (ou acesso à rede), de rede, de transporte e de aplicação — a diferença está nas duas camadas extras do OSI (sessão e apresentação), que no TCP/IP ficam absorvidas pela camada de aplicação.
Fonte: modelo de 5 camadas da Internet (Kurose & Ross) comparado ao modelo OSI de 7 camadas — conteúdo técnico consolidado de redes de computadores.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=67;

update public.official_exam_questions
set review_note=$q$Errado. O SMTP (Simple Mail Transfer Protocol) é o protocolo usado para o ENVIO de e-mails entre servidores — não serve para a transferência de dados de formulários em sítios da Internet, função desempenhada por protocolos como HTTP/HTTPS.
Exemplo: SMTP é o "carteiro" que entrega e-mails de um servidor a outro; preencher e enviar um formulário num site usa outro protocolo, o HTTP/HTTPS.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=68;

update public.official_exam_questions
set review_note=$q$Errado. O IDS (Intrusion Detection System) serve para DETECTAR tentativas de intrusão e atividades suspeitas em uma rede ou sistema — ele não realiza a limpeza/remoção de arquivos maliciosos já presentes em uma máquina. Essa função é desempenhada por softwares antivírus/antimalware.
Exemplo: o IDS é como um alarme que avisa que algo suspeito está acontecendo; quem efetivamente "limpa a sujeira" (remove o malware) é o antivírus, não o IDS.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=69;

update public.official_exam_questions
set review_note=$q$Errado. A descrição apresentada (dados criptografados, acesso bloqueado, exigência de resgate para liberação) é a definição clássica de RANSOMWARE, não de "backdoor". Backdoor é um mecanismo que permite acesso remoto não autorizado e oculto a um sistema, sem necessariamente envolver criptografia de dados ou pedido de resgate.
Exemplo: ransomware "sequestra" seus arquivos e cobra resgate; backdoor é uma "porta dos fundos" escondida que alguém usa para entrar no seu sistema sem você perceber — são ameaças diferentes.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=70;

update public.official_exam_questions
set review_note=$q$Errado. A descrição de "mais alto nível de flexibilidade e controle de gerenciamento sobre os recursos de TI" corresponde ao modelo IaaS (Infrastructure as a Service), não ao PaaS (Platform as a Service). No PaaS, o provedor já gerencia a infraestrutura subjacente, oferecendo ao usuário uma plataforma pronta para desenvolver aplicações, com MENOS controle sobre a infraestrutura (em troca de mais praticidade).
Exemplo: no IaaS você aluga "o terreno e os tijolos" e controla tudo; no PaaS você já recebe "a casa pronta para decorar" — tem menos trabalho, mas também menos controle sobre a estrutura.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=71;

update public.official_exam_questions
set review_note=$q$Errado. Uma das principais VANTAGENS da cloud computing é justamente a elasticidade/escalabilidade: os recursos computacionais podem ser ajustados (aumentados ou reduzidos) sob demanda, de acordo com a necessidade, sem precisar renegociar o contrato do zero. O item descreve o oposto do que realmente acontece.
Exemplo: na nuvem, se sua empresa cresce e precisa de mais capacidade, basta "aumentar o plano" quase na hora — não é preciso esperar nova contratação, como o item sugere.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=72;

update public.official_exam_questions
set review_note=$q$Correto. Na Teoria Geral dos Sistemas, o ajustamento contínuo de um sistema às mudanças de seu ambiente está associado a fenômenos como a entropia (tendência à desordem/degradação) e a homeostasia (tendência ao reequilíbrio, mantendo a estabilidade do sistema) — conceitos clássicos dessa teoria, originada com Ludwig von Bertalanffy.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=73;

update public.official_exam_questions
set review_note=$q$Correto. Na Teoria Geral dos Sistemas, sistemas abertos são aqueles que mantêm intercâmbio contínuo (de matéria, energia ou informação) com o ambiente em que estão inseridos — diferentemente dos sistemas fechados, que não trocam recursos com o ambiente externo.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=74;

update public.official_exam_questions
set review_note=$q$Errado. O modelo espiral de Boehm é justamente um modelo DIRIGIDO A RISCOS: cada ciclo da espiral inclui uma etapa explícita de análise e mitigação de riscos antes de avançar para a próxima iteração — essa é sua característica central e o diferencia de modelos lineares como o cascata. A afirmação de que ele "não é dirigido a riscos" está incorreta.
Fonte: Barry Boehm, modelo em espiral de desenvolvimento de software (conteúdo técnico consolidado de engenharia de software).$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=75;

update public.official_exam_questions
set review_note=$q$Correto. Nos métodos clássicos de desenvolvimento de sistemas (como o modelo cascata), a etapa de "análise e definição de requisitos" é aquela em que restrições, metas e necessidades do sistema são levantadas junto aos usuários, servindo de base para a especificação técnica do sistema a ser construído.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=76;

update public.official_exam_questions
set review_note=$q$Errado. Um número isolado, sem contexto que lhe atribua significado (por exemplo, a que grandeza ou situação ele se refere), é considerado apenas um DADO na hierarquia clássica dado → informação → conhecimento → inteligência. Informação é o dado já processado e contextualizado, de forma a ter significado para quem o recebe — um número sozinho, sem esse contexto, não é informação.
Exemplo: "1.789" sozinho não diz nada; "1.789 prisões realizadas em 2024" já é uma informação, porque tem contexto.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=78;

update public.official_exam_questions
set review_note=$q$Correto. Roteadores são dispositivos de rede que operam na camada de rede (camada 3) do modelo de referência OSI, sendo responsáveis por encaminhar pacotes com base em endereços lógicos (endereços IP) entre redes diferentes.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=79;

update public.official_exam_questions
set review_note=$q$Correto. TCP (orientado à conexão, com controle de erros e entrega garantida) e UDP (sem conexão, mais rápido, sem garantias de entrega) são ambos protocolos da camada de transporte (camada 4) do modelo OSI.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=80;
