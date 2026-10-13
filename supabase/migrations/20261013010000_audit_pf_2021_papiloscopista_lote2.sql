-- Auditoria PF 2021 Papiloscopista Policial Federal — lote 2 (37 itens de
-- Informática, Biologia/Física Aplicada à Papiloscopia, autossuficientes de
-- conhecimento técnico geral, sem dependência de fonte legal). Itens 1-18
-- e 37-60 (Língua Portuguesa, Estatística, Raciocínio Lógico) dependem de
-- texto-base/enunciado não capturado. Item 65 depende de uma planilha
-- Excel específica; item 77 de "o gráfico" (figura ausente). Itens 84-85
-- (código Python/R) têm indentação perdida na extração do PDF, tornando o
-- resultado ambíguo — mesmo problema já documentado no Escrivão lote4.
-- Item 95 usa a sigla não padronizada "DTL" (SQL usa DML/DDL/DCL/TCL) —
-- mesma exclusão do Escrivão lote4. Item 100 (balsas lipídicas/coronavírus)
-- fica de fora por exigir confirmação virológica mais específica do que o
-- texto permite verificar com segurança. Itens 103-104 (gêmeos) e 107-120
-- (física/química) dependem de "o texto", "a figura" ou "a reação/equação
-- apresentada" não capturados na importação.

update public.official_exam_questions
set review_note=$q$Errado. A sintaxe correta do Google para restringir a busca a um site específico é "site:", não "in": a forma correta seria "crime organizado" site:pf.gov.br. O operador "in" não existe para essa finalidade no Google.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=61;

update public.official_exam_questions
set review_note=$q$Correto. O Google Chrome possui o recurso "Verificação de Senhas" (Password Checkup), integrado ao gerenciador de senhas do navegador, que alerta o usuário quando uma combinação de usuário e senha salva corresponde a credenciais encontradas em vazamentos de dados conhecidos.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=62;

update public.official_exam_questions
set review_note=$q$Errado. O cadeado (cinza ou colorido) ao lado da URL no Chrome indica que a conexão com o site está sendo feita via HTTPS (criptografada/segura) — não tem relação com o site ser uma "intranet" interna de alguma organização. O domínio gov.br, público, também exibe esse cadeado.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=63;

update public.official_exam_questions
set review_note=$q$Errado. No Linux, o comando "pwd" significa "print working directory" e serve para exibir o caminho do diretório atual — o comando usado para trocar a senha de um usuário é o "passwd".$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=64;

update public.official_exam_questions
set review_note=$q$Correto. O protocolo IP (Internet Protocol) é responsável por especificar o formato dos pacotes (datagramas) que trafegam entre os sistemas finais e os roteadores na Internet.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=66;

update public.official_exam_questions
set review_note=$q$Correto. O modelo de referência TCP/IP (versão de cinco camadas) e o modelo OSI (de sete camadas) compartilham as camadas física, de enlace, de rede, de transporte e de aplicação — a diferença está nas duas camadas extras do OSI (sessão e apresentação), absorvidas pela camada de aplicação no TCP/IP.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=67;

update public.official_exam_questions
set review_note=$q$Errado. O SMTP é o protocolo usado para o ENVIO de e-mails entre servidores — não serve para a transferência de dados de formulários em sítios da Internet, função desempenhada por protocolos como HTTP/HTTPS.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=68;

update public.official_exam_questions
set review_note=$q$Errado. O IDS (Intrusion Detection System) serve para DETECTAR tentativas de intrusão e atividades suspeitas — ele não realiza a limpeza/remoção de arquivos maliciosos já presentes em uma máquina. Essa função é desempenhada por softwares antivírus/antimalware.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=69;

update public.official_exam_questions
set review_note=$q$Errado. A descrição apresentada (dados criptografados, acesso bloqueado, exigência de resgate) é a definição clássica de RANSOMWARE, não de "backdoor". Backdoor é um mecanismo que permite acesso remoto não autorizado e oculto a um sistema, sem necessariamente envolver criptografia de dados ou pedido de resgate.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=70;

update public.official_exam_questions
set review_note=$q$Errado. A descrição de "mais alto nível de flexibilidade e controle de gerenciamento sobre os recursos de TI" corresponde ao modelo IaaS (Infrastructure as a Service), não ao PaaS. No PaaS, o provedor já gerencia a infraestrutura subjacente, oferecendo uma plataforma pronta para desenvolver aplicações, com MENOS controle sobre a infraestrutura.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=71;

update public.official_exam_questions
set review_note=$q$Errado. Uma das principais VANTAGENS da cloud computing é justamente a elasticidade/escalabilidade: os recursos computacionais podem ser ajustados sob demanda, sem precisar renegociar o contrato do zero. O item descreve o oposto do que realmente acontece.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=72;

update public.official_exam_questions
set review_note=$q$Correto. Na Teoria Geral dos Sistemas, o ajustamento contínuo de um sistema às mudanças de seu ambiente está associado a fenômenos como a entropia (tendência à desordem) e a homeostasia (tendência ao reequilíbrio) — conceitos clássicos dessa teoria, de Ludwig von Bertalanffy.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=73;

update public.official_exam_questions
set review_note=$q$Correto. Na Teoria Geral dos Sistemas, sistemas abertos são aqueles que mantêm intercâmbio contínuo (de matéria, energia ou informação) com o ambiente em que estão inseridos — diferentemente dos sistemas fechados.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=74;

update public.official_exam_questions
set review_note=$q$Errado. O modelo espiral de Boehm é justamente um modelo DIRIGIDO A RISCOS: cada ciclo inclui uma etapa explícita de análise e mitigação de riscos antes de avançar para a próxima iteração — essa é sua característica central. A afirmação de que ele "não é dirigido a riscos" está incorreta.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=75;

update public.official_exam_questions
set review_note=$q$Correto. Nos métodos clássicos de desenvolvimento de sistemas, a etapa de "análise e definição de requisitos" é aquela em que restrições, metas e necessidades do sistema são levantadas junto aos usuários, servindo de base para a especificação técnica do sistema.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=76;

update public.official_exam_questions
set review_note=$q$Errado. Um número isolado, sem contexto que lhe atribua significado, é considerado apenas um DADO na hierarquia clássica dado → informação → conhecimento → inteligência. Informação é o dado já processado e contextualizado — um número sozinho, sem esse contexto, não é informação.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=78;

update public.official_exam_questions
set review_note=$q$Correto. Roteadores são dispositivos de rede que operam na camada de rede (camada 3) do modelo de referência OSI, encaminhando pacotes com base em endereços lógicos (IP) entre redes diferentes.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=79;

update public.official_exam_questions
set review_note=$q$Correto. TCP e UDP são ambos protocolos da camada de transporte (camada 4) do modelo OSI.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=80;

update public.official_exam_questions
set review_note=$q$Errado. Os bits são empacotados em quadros (frames/dataframes) na camada de ENLACE (camada 2) do modelo OSI, não na camada de transporte. A camada de transporte trabalha com segmentos; a de rede, com pacotes; a de enlace, com quadros.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=81;

update public.official_exam_questions
set review_note=$q$Errado. Uma LAN (rede local) caracteriza-se pela conectividade entre dispositivos dentro de uma área geográfica restrita (um prédio, um escritório) — ela não é definida por fornecer "conectividade em tempo integral para os serviços de conexão da Internet", que é uma função de outros elementos de rede (como roteadores e provedores de acesso).$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=82;

update public.official_exam_questions
set review_note=$q$Errado. Metadado é "dado sobre o dado": informação que descreve características de um arquivo (autor, data de criação, formato, tamanho etc.) — não descreve o "destino final do arquivo definido pelo emissor da mensagem e proprietário do arquivo", conceito que não corresponde à definição de metadado.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=83;

update public.official_exam_questions
set review_note=$q$Correto. Análise de clustering (agrupamento) é a tarefa de mineração de dados que consiste em agrupar objetos de forma que os de um mesmo grupo sejam mais semelhantes entre si do que em relação aos de outros grupos.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=86;

update public.official_exam_questions
set review_note=$q$Errado. A definição apresentada ("medida de certeza de que o intervalo contém um parâmetro da população") é de nível/grau de confiança de um intervalo de confiança estatístico — não de entropia da informação, que mede o grau de incerteza/aleatoriedade de uma variável ou mensagem.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=87;

update public.official_exam_questions
set review_note=$q$Errado. Aplicações de bigdata caracterizam-se por grande volume, variedade e velocidade de dados (os "V"s do bigdata), incluindo tipicamente dados NÃO estruturados e semiestruturados — não se limitam a "dados armazenados em tabelas relacionais".$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=88;

update public.official_exam_questions
set review_note=$q$Errado. Atributos de uma tabela de banco de dados correspondem às COLUNAS (campos); registros correspondem às LINHAS (tuplas). O número de atributos não determina o número de registros — são conceitos independentes.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=89;

update public.official_exam_questions
set review_note=$q$Correto. No modelo entidade-relacionamento (MER), uma entidade normalmente representa um objeto do mundo real (pessoa, lugar, coisa, evento) sobre o qual se deseja manter informações.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=90;

update public.official_exam_questions
set review_note=$q$Correto. As restrições de integridade de um SGBD (chave primária, chave estrangeira, domínio etc.) existem justamente para garantir que os dados armazenados, consultados e utilizados sejam consistentes e confiáveis.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=91;

update public.official_exam_questions
set review_note=$q$Errado. Hiperchave é um conjunto de um ou mais atributos que, tomados coletivamente, identificam de forma única uma tupla (linha) em uma relação — não é "uma tupla que permite recuperar uma relação de uma tabela", definição que inverte o conceito.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=93;

update public.official_exam_questions
set review_note=$q$Correto. Dados estruturados têm formato rígido e predefinido, organizados em campos de tabelas de bancos de dados relacionais — diferentemente dos dados não estruturados (texto livre, imagens, vídeos), que não seguem um modelo fixo.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=94;

update public.official_exam_questions
set review_note=$q$Errado. API (Application Programming Interface) é um conjunto de definições e protocolos para construção e integração de software — não é "um padrão XML". APIs podem usar XML, JSON ou outros formatos para trocar dados, mas XML não define o que é uma API.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=96;

update public.official_exam_questions
set review_note=$q$Errado. Os principais elementos químicos que constituem a matéria viva (bioelementos) são carbono (C), hidrogênio (H), oxigênio (O), nitrogênio (N), fósforo (P) e enxofre (S) — não o argônio (Ar), que é um gás nobre, quimicamente inerte, sem papel biológico estrutural conhecido.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=97;

update public.official_exam_questions
set review_note=$q$Correto. O magnésio é um íon essencial envolvido na formação de tecidos (ossos e dentes), no metabolismo de carboidratos (como cofator enzimático) e na regulação da excitabilidade neuromuscular.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=98;

update public.official_exam_questions
set review_note=$q$Errado. Entre as organelas citadas, apenas a MITOCÔNDRIA possui material genético (DNA) próprio (DNA mitocondrial, herdado por via materna, usado em análises de ancestralidade/história evolutiva). O complexo (aparelho) de Golgi não possui DNA próprio.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=99;

update public.official_exam_questions
set review_note=$q$Correto. A placenta é formada por uma parte de origem fetal (o córion viloso) e uma parte de origem materna (a decídua basal, camada do endométrio).$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=101;

update public.official_exam_questions
set review_note=$q$Errado. Nos eucariontes, o ciclo de Krebs (ciclo dos ácidos tricarboxílicos) ocorre na MATRIZ MITOCONDRIAL — não "nos ribossomos livres no citosol", local onde ocorre a síntese de proteínas, não o metabolismo oxidativo da respiração celular.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=102;

update public.official_exam_questions
set review_note=$q$Correto. O princípio da superposição de ondas (base das ondas estacionárias) depende da linearidade da equação de onda: quando a equação é linear, a soma de duas soluções também é solução, permitindo que as ondas se sobreponham sem se destruir.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=105;

update public.official_exam_questions
set review_note=$q$Errado. Nem ondas mecânicas nem ondas eletromagnéticas transportam matéria — ambas transportam apenas energia; nas ondas mecânicas, as partículas do meio oscilam em torno de uma posição de equilíbrio, sem deslocamento líquido de matéria ao longo da propagação.$q$
where exam_year=2021 and career_name='Papiloscopista Policial Federal' and item_number=106;
