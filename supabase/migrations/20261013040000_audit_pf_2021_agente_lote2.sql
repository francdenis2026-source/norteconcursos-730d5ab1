-- Auditoria PF 2021 Agente de Polícia Federal — lote 2 (30 itens de
-- Informática, texto idêntico ao já auditado no Papiloscopista PF 2021,
-- mesma banca e mesmo concurso — reaproveitando as mesmas explicações
-- técnicas já verificadas). Itens excluídos pelos mesmos motivos
-- documentados nos lotes de Informática anteriores: 65 (planilha Excel
-- específica), 77 (figura "o gráfico" ausente), 84-85 (código Python/R com
-- indentação corrompida na extração), 92 (já anulado), 95 (sigla "DTL" não
-- padronizada).

update public.official_exam_questions
set review_note=$q$Errado. A sintaxe correta do Google para restringir a busca a um site específico é "site:", não "in": a forma correta seria "crime organizado" site:pf.gov.br.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=61;

update public.official_exam_questions
set review_note=$q$Correto. O Google Chrome possui o recurso "Verificação de Senhas" (Password Checkup), que alerta o usuário quando uma combinação de usuário e senha salva corresponde a credenciais encontradas em vazamentos de dados conhecidos.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=62;

update public.official_exam_questions
set review_note=$q$Errado. O cadeado ao lado da URL no Chrome indica que a conexão está sendo feita via HTTPS (criptografada/segura) — não tem relação com o site ser uma "intranet" interna de alguma organização.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=63;

update public.official_exam_questions
set review_note=$q$Errado. No Linux, o comando "pwd" significa "print working directory" e exibe o caminho do diretório atual — o comando usado para trocar a senha de um usuário é o "passwd".$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=64;

update public.official_exam_questions
set review_note=$q$Correto. O protocolo IP é responsável por especificar o formato dos pacotes (datagramas) que trafegam entre os sistemas finais e os roteadores na Internet.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=66;

update public.official_exam_questions
set review_note=$q$Correto. O modelo TCP/IP (cinco camadas) e o modelo OSI (sete camadas) compartilham as camadas física, de enlace, de rede, de transporte e de aplicação.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=67;

update public.official_exam_questions
set review_note=$q$Errado. O SMTP é usado para o ENVIO de e-mails — não serve para a transferência de dados de formulários em sítios da Internet, função de HTTP/HTTPS.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=68;

update public.official_exam_questions
set review_note=$q$Errado. O IDS serve para DETECTAR tentativas de intrusão — não realiza a limpeza de arquivos maliciosos, função de softwares antivírus/antimalware.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=69;

update public.official_exam_questions
set review_note=$q$Errado. A descrição (dados criptografados, acesso bloqueado, resgate exigido) é a definição de RANSOMWARE, não de "backdoor", que é uma porta de acesso remoto oculta.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=70;

update public.official_exam_questions
set review_note=$q$Errado. "Mais alto nível de flexibilidade e controle sobre os recursos de TI" corresponde ao modelo IaaS, não ao PaaS — no PaaS o provedor já gerencia a infraestrutura, com menos controle para o usuário.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=71;

update public.official_exam_questions
set review_note=$q$Errado. Uma das principais VANTAGENS da cloud computing é a elasticidade: recursos ajustáveis sob demanda, sem renegociar o contrato do zero. O item descreve o oposto.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=72;

update public.official_exam_questions
set review_note=$q$Correto. Na Teoria Geral dos Sistemas, o ajustamento contínuo está associado a fenômenos como entropia (desordem) e homeostasia (reequilíbrio) — conceitos de Ludwig von Bertalanffy.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=73;

update public.official_exam_questions
set review_note=$q$Correto. Sistemas abertos mantêm intercâmbio contínuo (matéria, energia ou informação) com o ambiente, diferentemente dos sistemas fechados.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=74;

update public.official_exam_questions
set review_note=$q$Errado. O modelo espiral de Boehm é justamente DIRIGIDO A RISCOS: cada ciclo inclui análise e mitigação de riscos — essa é sua característica central.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=75;

update public.official_exam_questions
set review_note=$q$Correto. A etapa de "análise e definição de requisitos" é aquela em que restrições e metas do sistema são levantadas junto aos usuários, servindo de base para a especificação técnica.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=76;

update public.official_exam_questions
set review_note=$q$Errado. Um número isolado, sem contexto, é apenas um DADO na hierarquia dado → informação → conhecimento → inteligência; informação é o dado contextualizado.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=78;

update public.official_exam_questions
set review_note=$q$Correto. Roteadores operam na camada de rede (camada 3) do modelo OSI, encaminhando pacotes com base em endereços IP.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=79;

update public.official_exam_questions
set review_note=$q$Correto. TCP e UDP são protocolos da camada de transporte (camada 4) do modelo OSI.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=80;

update public.official_exam_questions
set review_note=$q$Errado. Os bits são empacotados em quadros (frames) na camada de ENLACE (camada 2), não na de transporte.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=81;

update public.official_exam_questions
set review_note=$q$Errado. Uma LAN caracteriza-se pela conectividade entre dispositivos numa área restrita — não é definida por fornecer "conectividade em tempo integral para os serviços de conexão da Internet".$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=82;

update public.official_exam_questions
set review_note=$q$Errado. Metadado descreve características de um arquivo (autor, data, formato) — não o "destino final do arquivo definido pelo emissor", conceito que não corresponde à definição.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=83;

update public.official_exam_questions
set review_note=$q$Correto. Clustering é a tarefa de agrupar objetos de forma que os de um mesmo grupo sejam mais semelhantes entre si do que em relação a outros grupos.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=86;

update public.official_exam_questions
set review_note=$q$Errado. A definição apresentada é de grau de confiança de um intervalo de confiança estatístico — não de entropia da informação, que mede incerteza/aleatoriedade.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=87;

update public.official_exam_questions
set review_note=$q$Errado. Bigdata caracteriza-se por volume, variedade e velocidade, incluindo tipicamente dados não estruturados — não se limita a tabelas relacionais.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=88;

update public.official_exam_questions
set review_note=$q$Errado. Atributos correspondem a COLUNAS; registros correspondem a LINHAS — conceitos independentes, um não determina o outro.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=89;

update public.official_exam_questions
set review_note=$q$Correto. No modelo entidade-relacionamento, uma entidade normalmente representa um objeto do mundo real.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=90;

update public.official_exam_questions
set review_note=$q$Correto. As restrições de integridade de um SGBD garantem que os dados armazenados, consultados e utilizados sejam consistentes e confiáveis.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=91;

update public.official_exam_questions
set review_note=$q$Errado. Hiperchave é um conjunto de atributos que identifica unicamente uma tupla — não "uma tupla que permite recuperar uma relação de uma tabela", definição que inverte o conceito.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=93;

update public.official_exam_questions
set review_note=$q$Correto. Dados estruturados têm formato rígido e predefinido, armazenáveis em campos de tabelas relacionais — diferentemente dos não estruturados.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=94;

update public.official_exam_questions
set review_note=$q$Errado. API é um conjunto de definições e protocolos para integração de software — não "um padrão XML"; APIs podem usar XML, JSON ou outros formatos.$q$
where exam_year=2021 and career_name='Agente de Polícia Federal' and item_number=96;
