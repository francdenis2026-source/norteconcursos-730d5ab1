-- Curated (authored) questions for Polícia Federal — Escrivão de Polícia
-- Federal (2025): 30 questões baseadas nos itens REAIS já importados em
-- official_exam_questions (mesmo texto e gabarito oficial do caderno,
-- CEBRASPE), com explicação pedagógica escrita para cada um. Cobre
-- Informática, Contabilidade Geral, Legislação Especial e Arquivologia.

insert into public.curated_question_catalog
  (source_id, syllabus_topic_id, external_item_key, contest_name, contest_year, career_name, exam_board, subject, subtopic, question_text, official_answer, explanation, legal_basis, difficulty, law_version_checked_at)
values
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9a832ef9-27ec-4197-b857-fe8438118d1d', 'pfesc25-info-01',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Informática', 'Comandos de rede: ipconfig (Windows) e ifconfig (Linux)',
  $q$Julgue o item a seguir, com base em noções de informática.
Em distribuições Linux, o comando ipconfig é utilizado para exibir informações de configuração de rede, como endereço IP e máscara de sub-rede; no Windows, o comando ifconfig desempenha a mesma função, permitindo a visualização e configuração de interfaces de rede.$q$,
  'E',
  $q$Errado. O item inverte os sistemas operacionais associados a cada comando: "ipconfig" é o comando utilizado no Windows para exibir a configuração de rede, enquanto "ifconfig" é o comando tradicionalmente utilizado em distribuições Linux (e Unix) para o mesmo fim, sendo essa inversão o erro central da afirmação. Exemplo: um técnico que precisa verificar o endereço IP de uma máquina Windows deve usar "ipconfig" no prompt de comando, e não "ifconfig", que é específico de ambientes Linux/Unix.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9a832ef9-27ec-4197-b857-fe8438118d1d', 'pfesc25-info-02',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Informática', 'Tamanho de endereço IPv6',
  $q$Julgue o item a seguir, com base em noções de informática.
No protocolo IPv6, cada endereço tem 256 bits, que são divididos em duas partes (a primeira define a rede e a segunda identifica o host); esse protocolo elimina o uso de máscaras de sub-rede, substituindo-as por prefixos de rede fixos; por sua vez, o IPv4 utiliza endereços de 32 bits e máscaras de sub-rede variáveis para definir a separação entre rede e host.$q$,
  'E',
  $q$Errado. O erro está no tamanho do endereço IPv6: ele é composto por 128 bits, e não 256 bits como afirma o item, sendo dividido, de fato, em uma porção de rede e uma porção de host (identificador de interface), e utilizando notação de prefixo (como "/64") em vez das máscaras de sub-rede variáveis tradicionalmente associadas ao IPv4, que de fato utiliza endereços de 32 bits. Exemplo: um endereço IPv6 típico, como 2001:0db8:85a3::8a2e:0370:7334, é representado em 128 bits, organizados em 8 grupos de 16 bits cada, e não em 256 bits.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9a832ef9-27ec-4197-b857-fe8438118d1d', 'pfesc25-info-03',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Informática', 'Computação em nuvem — dependência de conexão à Internet',
  $q$Julgue o item a seguir, com base em noções de informática.
A computação em nuvem permite que os usuários acessem recursos computacionais sob demanda, como armazenamento e processamento, sem a necessidade de conexão com a Internet, pois os dados e serviços são armazenados localmente nos dispositivos dos usuários.$q$,
  'E',
  $q$Errado. A característica essencial da computação em nuvem é justamente o oposto do afirmado: os dados e serviços ficam armazenados e processados em servidores remotos, mantidos por provedores de nuvem, sendo o acesso a esses recursos dependente de conexão com a Internet (ou com a rede que interliga o usuário ao provedor), e não armazenados localmente no dispositivo do usuário. Exemplo: um documento salvo em um serviço de nuvem só pode ser acessado, editado ou sincronizado enquanto o dispositivo do usuário estiver conectado à Internet.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9a832ef9-27ec-4197-b857-fe8438118d1d', 'pfesc25-info-04',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Informática', 'Mineração de dados e Big Data — técnicas e infraestrutura',
  $q$Julgue o item a seguir, com base em noções de informática.
A mineração de dados é uma técnica em que se utilizam exclusivamente algoritmos de aprendizado supervisionado para a identificação de padrões em grandes volumes de dados; no contexto de Big Data, a premissa principal é a utilização de bancos de dados relacionais tradicionais, que são suficientes para o enfrentamento dos desafios de volume, variedade e velocidade característicos desse ambiente.$q$,
  'E',
  $q$Errado. O item contém dois erros: a mineração de dados não se restringe a algoritmos de aprendizado supervisionado, empregando também técnicas não supervisionadas (como clusterização) e outras abordagens estatísticas; além disso, o Big Data, justamente por envolver grandes volumes, variedade e velocidade de dados, geralmente exige tecnologias além dos bancos relacionais tradicionais, como bancos NoSQL e arquiteturas distribuídas, que os SGBDs relacionais convencionais não suportam adequadamente sozinhos. Exemplo: a análise de grandes volumes de dados não estruturados de redes sociais, em tempo real, costuma demandar ferramentas de Big Data (como Hadoop ou bancos NoSQL), e não apenas um banco de dados relacional tradicional.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9a832ef9-27ec-4197-b857-fe8438118d1d', 'pfesc25-info-05',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Informática', 'Dados estruturados e não estruturados',
  $q$Julgue o item a seguir, com base em noções de informática.
No contexto de banco de dados, dados estruturados são aqueles que não possuem um formato fixo e são armazenados em sistemas como bancos NoSQL, ao passo que dados não estruturados possuem um formato rígido e são armazenados em tabelas relacionais.$q$,
  'E',
  $q$Errado. O item inverte os conceitos: dados estruturados são aqueles organizados em formato fixo e predefinido, tipicamente armazenados em tabelas de bancos de dados relacionais; dados não estruturados, por sua vez, não seguem um formato rígido e são frequentemente armazenados em bancos NoSQL ou outros repositórios flexíveis, exatamente o oposto do que descreve o item. Exemplo: uma tabela de clientes com colunas fixas (nome, CPF, endereço) contém dados estruturados; já um conjunto de imagens, vídeos ou textos livres, sem esquema fixo, exemplifica dados não estruturados.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9a832ef9-27ec-4197-b857-fe8438118d1d', 'pfesc25-info-06',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Informática', 'Camada de sessão do modelo OSI',
  $q$Julgue o item a seguir, com base em noções de informática.
A camada de sessão do modelo OSI é a principal responsável pela fragmentação e reconstrução de pacotes IP entre sistemas finais na rede.$q$,
  'E',
  $q$Errado. A fragmentação e a reconstrução de pacotes é atribuição da camada de rede (camada 3) do modelo OSI, responsável pelo endereçamento lógico e roteamento dos pacotes entre redes distintas; a camada de sessão (camada 5) tem função diversa, relacionada ao estabelecimento, gerenciamento e encerramento de sessões de comunicação entre aplicações. Exemplo: quando um pacote IP é grande demais para trafegar por determinado enlace de rede, é a camada de rede que realiza sua fragmentação em unidades menores, não a camada de sessão.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9a832ef9-27ec-4197-b857-fe8438118d1d', 'pfesc25-info-07',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Informática', 'Listas em Python — mutabilidade e uso como chave de dicionário',
  $q$Julgue o item a seguir, com base em noções de informática.
Em Python, listas são estruturas de dados imutáveis, o que as torna ideais para serem usadas como chaves de dicionários (dict).$q$,
  'E',
  $q$Errado. Em Python, as listas são estruturas de dados mutáveis (seus elementos podem ser alterados, adicionados ou removidos após a criação), e justamente por essa mutabilidade não podem ser utilizadas como chaves de dicionários, que exigem chaves de tipos imutáveis (como strings, números ou tuplas). Exemplo: tentar usar uma lista como chave de um dicionário Python ("minha_lista = [1, 2]; dicionario[minha_lista] = 'valor'") gera um erro de tipo (TypeError), justamente por a lista ser mutável.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9a832ef9-27ec-4197-b857-fe8438118d1d', 'pfesc25-info-08',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Informática', 'Modelo de serviço em nuvem — plataforma como serviço (PaaS)',
  $q$Julgue o item a seguir, com base em noções de informática.
Em serviços de nuvem, a utilização de plataforma como serviço (PaaS) é mais recomendada para empresas que desejem controlar totalmente o hardware e o sistema operacional utilizados.$q$,
  'E',
  $q$Errado. O modelo PaaS (Plataforma como Serviço) abstrai justamente a gestão de hardware e sistema operacional, entregando ao cliente uma plataforma pronta para desenvolvimento e execução de aplicações, sem que ele precise gerenciar a infraestrutura subjacente; o modelo mais adequado para quem deseja controle total sobre hardware e sistema operacional é o IaaS (Infraestrutura como Serviço). Exemplo: uma empresa que deseja apenas focar no desenvolvimento de uma aplicação, sem se preocupar com servidores ou sistema operacional, deve optar por PaaS; se deseja controlar totalmente a infraestrutura, deve optar por IaaS.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9a832ef9-27ec-4197-b857-fe8438118d1d', 'pfesc25-info-09',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Informática', 'DNS — ausência de criptografia nativa',
  $q$Julgue o item a seguir, com base em noções de informática.
O DNS é responsável por garantir a confidencialidade das comunicações entre cliente e servidor por meio de criptografia ponta a ponta embutida no próprio protocolo desde a sua concepção.$q$,
  'E',
  $q$Errado. O protocolo DNS, em sua concepção original, não possui criptografia embutida, trafegando consultas e respostas em texto claro, o que expõe essas comunicações a riscos de interceptação e manipulação; extensões e protocolos posteriores, como o DNSSEC (que garante integridade e autenticidade, mas não necessariamente confidencialidade) e o DoH/DoT (DNS sobre HTTPS/TLS), foram desenvolvidos justamente para suprir essa lacuna original de segurança. Exemplo: sem o uso de extensões como DoH ou DoT, uma consulta DNS tradicional pode ser interceptada e lida por terceiros na rede, já que não há criptografia nativa no protocolo original.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9a832ef9-27ec-4197-b857-fe8438118d1d', 'pfesc25-info-10',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Informática', 'Princípio da consistência em bancos de dados (ACID)',
  $q$Julgue o item a seguir, com base em noções de informática.
Por princípio, a consistência pressupõe que uma transação inconsistente deve levar o banco de dados de um estado inconsistente para o estado consistente.$q$,
  'E',
  $q$Errado. O princípio da consistência, um dos pilares do modelo ACID em bancos de dados, estabelece que uma transação deve levar o banco de dados de um estado consistente para OUTRO estado igualmente consistente, respeitando todas as regras de integridade definidas, e não partir de um estado inconsistente, o que contraria a própria lógica da propriedade. Exemplo: se uma transação bancária de transferência respeita todas as regras de integridade (o saldo total permanece correto antes e depois da operação), ela preserva a consistência, partindo de um estado válido e chegando a outro estado igualmente válido.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '2bad3633-e4b8-4356-8b3f-ca9e4ce6cd84', 'pfesc25-contab-01',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Contabilidade Geral', 'Fato administrativo permutativo',
  $q$Julgue o item a seguir, com base em noções de contabilidade.
O lançamento a seguir espelha um fato administrativo permutativo, que não afeta a situação patrimonial líquida da entidade: debite: fornecedores; credite: caixa e equivalentes de caixa.$q$,
  'C',
  $q$Certo. O pagamento de uma obrigação (fornecedores) com recursos do caixa é um fato administrativo permutativo, pois apenas troca a composição do patrimônio (reduz simultaneamente um passivo e um ativo em igual valor), sem alterar o patrimônio líquido da entidade, diferentemente dos fatos aumentativos ou diminutivos, que envolvem contas de resultado e, por consequência, afetam o patrimônio líquido. Exemplo: ao pagar uma dívida de R$ 1.000 com fornecedores usando dinheiro do caixa, a empresa reduz o passivo (fornecedores) e o ativo (caixa) no mesmo valor, mantendo inalterado o patrimônio líquido.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '2bad3633-e4b8-4356-8b3f-ca9e4ce6cd84', 'pfesc25-contab-02',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Contabilidade Geral', 'Regime de competência x regime de caixa',
  $q$Julgue o item a seguir, com base em noções de contabilidade.
O regime de escrituração no qual se considera o conjunto completo de eventos que afetam o resultado da entidade em dado exercício social é denominado regime de caixa.$q$,
  'E',
  $q$Errado. O regime descrito no item — que considera todos os eventos que afetam o resultado no período em que ocorrem, independentemente do efetivo recebimento ou pagamento em dinheiro — é o regime de COMPETÊNCIA, e não o regime de caixa, que, ao contrário, reconhece receitas e despesas apenas no momento do efetivo ingresso ou desembolso financeiro, sendo, portanto, mais restrito e menos completo na captação dos eventos econômicos do período. Exemplo: uma venda a prazo realizada em dezembro é reconhecida como receita desse mês pelo regime de competência (mesmo sem recebimento imediato), mas só seria reconhecida no regime de caixa quando o pagamento efetivamente ocorresse.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '2bad3633-e4b8-4356-8b3f-ca9e4ce6cd84', 'pfesc25-contab-03',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Contabilidade Geral', 'Necessidade de documentação comprobatória para escrituração',
  $q$Julgue o item a seguir, com base em noções de contabilidade.
Na ausência de documentação interna ou externa à entidade e de elementos que comprovem ou evidenciem o fato contábil que se pretende registrar, nenhuma escrituração deve ser feita.$q$,
  'C',
  $q$Certo. Um dos princípios básicos da técnica contábil exige que todo registro contábil esteja lastreado em documentação hábil e idônea, interna ou externa à entidade, que comprove a efetiva ocorrência do fato a ser escriturado, de modo que, na ausência de qualquer elemento comprobatório, a escrituração não deve ser realizada, sob pena de comprometer a fidedignidade das demonstrações contábeis. Exemplo: uma despesa só deve ser lançada na contabilidade quando houver nota fiscal, contrato ou outro documento hábil que comprove sua efetiva ocorrência.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '2bad3633-e4b8-4356-8b3f-ca9e4ce6cd84', 'pfesc25-contab-04',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Contabilidade Geral', 'Depreciação, amortização e exaustão — regime de competência',
  $q$Julgue o item a seguir, com base em noções de contabilidade.
Denomina-se depreciação, amortização ou exaustão a perda de valor econômico de ativos em decorrência do seu uso ou do transcurso do tempo, sendo a escrituração desses eventos realizada em regime de competência.$q$,
  'C',
  $q$Certo. A depreciação (bens tangíveis), a amortização (bens intangíveis) e a exaustão (recursos naturais) representam formas de reconhecimento contábil da perda gradual de valor econômico de determinados ativos ao longo de sua vida útil, sendo esses eventos registrados segundo o regime de competência, período a período, independentemente de qualquer desembolso financeiro efetivo associado a eles. Exemplo: a depreciação mensal de uma frota de veículos de uma empresa é lançada contabilmente todo mês, pelo regime de competência, refletindo o desgaste gradual dos veículos pelo uso, sem que haja saída de caixa correspondente a esse lançamento específico.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '2bad3633-e4b8-4356-8b3f-ca9e4ce6cd84', 'pfesc25-contab-05',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Contabilidade Geral', 'Classificação de lançamentos contábeis por fórmula',
  $q$Julgue o item a seguir, com base em noções de contabilidade.
Considere uma conta recebida de um cliente, no valor total de R$ 1.500, sobre o qual incorreram multa e juros que totalizaram 10%, já que o pagamento da conta estava atrasado. Nessas condições, a empresa que recebeu o crédito poderá utilizar um lançamento de terceira fórmula para representar o fato.$q$,
  'E',
  $q$Errado. O recebimento descrito envolve o débito de uma única conta (caixa, pelo valor total recebido com o acréscimo) e o crédito de duas contas (a duplicata ou conta a receber pelo valor original, e a receita de juros/multa pelo acréscimo), configurando um lançamento de SEGUNDA fórmula (uma conta debitada e mais de uma conta creditada), e não de terceira fórmula, que exige múltiplas contas debitadas e múltiplas contas creditadas simultaneamente. Exemplo: debitar "caixa" pelo valor total recebido (R$ 1.650) e creditar, separadamente, "contas a receber" (R$ 1.500) e "receita de juros e multas" (R$ 150) é um lançamento de segunda fórmula, e não de terceira.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '2bad3633-e4b8-4356-8b3f-ca9e4ce6cd84', 'pfesc25-contab-06',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Contabilidade Geral', 'Obrigatoriedade do livro-razão',
  $q$Julgue o item a seguir, com base em noções de contabilidade.
O agrupamento racional de valores em contas de mesma natureza é encontrado no livro-razão, cuja adoção é facultativa.$q$,
  'E',
  $q$Errado. O livro-razão, instrumento contábil que agrupa e organiza os lançamentos por conta, permitindo apurar saldos individuais, é de adoção OBRIGATÓRIA para a escrituração contábil regular das entidades, e não facultativa como afirma o item, sendo exigido tanto pela legislação comercial quanto pelas normas contábeis e fiscais vigentes. Exemplo: uma empresa não pode dispensar a manutenção do livro-razão sob a justificativa de que sua adoção seria meramente opcional, pois se trata de exigência legal para a regularidade da escrituração contábil.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '2bad3633-e4b8-4356-8b3f-ca9e4ce6cd84', 'pfesc25-contab-07',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Contabilidade Geral', 'Classificação de impostos diferidos como não circulantes',
  $q$Julgue o item a seguir, com base em noções de contabilidade.
O montante de impostos diferidos, sejam eles ativos ou passivos, deve ser classificado como não circulante.$q$,
  'C',
  $q$Certo. Conforme as normas contábeis vigentes (CPC 32 – Tributos sobre o Lucro), os ativos e passivos fiscais diferidos devem ser classificados integralmente no grupo do ativo ou passivo não circulante no balanço patrimonial, independentemente da expectativa de realização ou liquidação em curto ou longo prazo, regra que difere do tratamento dado aos demais ativos e passivos, normalmente segregados entre circulante e não circulante conforme o prazo estimado. Exemplo: mesmo que uma diferença temporária que origina um imposto diferido deva reverter em menos de um ano, o ativo ou passivo fiscal diferido correspondente ainda assim é classificado como não circulante no balanço.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '2bad3633-e4b8-4356-8b3f-ca9e4ce6cd84', 'pfesc25-contab-08',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Contabilidade Geral', 'Lei nº 6.404/1976 — aplicação a companhias abertas e fechadas',
  $q$Julgue o item a seguir, com base na Lei nº 6.404/1976.
A Lei nº 6.404/1976 aplica-se às sociedades por ações, quer abertas, quer fechadas.$q$,
  'C',
  $q$Certo. A Lei nº 6.404/1976 (Lei das Sociedades por Ações) disciplina de forma geral as sociedades anônimas brasileiras, aplicando-se tanto às companhias abertas (que negociam valores mobiliários no mercado, sujeitas também à fiscalização da CVM) quanto às companhias fechadas (que não o fazem), ainda que existam disposições específicas aplicáveis apenas a uma ou outra categoria dentro do próprio diploma legal. Exemplo: as regras gerais sobre constituição, órgãos societários e demonstrações financeiras da Lei das S.A. aplicam-se tanto a uma grande companhia aberta listada em bolsa quanto a uma pequena sociedade anônima fechada de capital familiar.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 6.404/1976, art. 1º','url','https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm')),
  'fácil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', 'd5e0bf40-fd0b-4ecf-899c-9fa6e273e97a', 'pfesc25-leg-01',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'ECA — hipóteses de improcedência do pedido de medida socioeducativa (art. 189)',
  $q$Julgue o item a seguir, com base na Lei nº 8.069/1990 (Estatuto da Criança e do Adolescente).
O pedido do Ministério Público para aplicação de medida socioeducativa deverá ser julgado improcedente pela autoridade judiciária nas seguintes hipóteses: comprovação da inexistência do fato; ausência de prova da existência do fato; não caracterização do fato como ato infracional; e falta de prova da participação do adolescente no ato infracional.$q$,
  'C',
  $q$Certo. O art. 189 do Estatuto da Criança e do Adolescente elenca taxativamente as hipóteses em que a autoridade judiciária deve julgar improcedente a representação do Ministério Público para aplicação de medida socioeducativa, protegendo o adolescente contra imposição de medida sem lastro probatório mínimo, seja pela comprovada inexistência do fato, pela falta de provas de sua existência, pela atipicidade da conduta como ato infracional, ou pela ausência de prova da autoria/participação do adolescente. Exemplo: se não houver qualquer prova de que o adolescente participou do ato infracional investigado, o juiz deve julgar improcedente o pedido do Ministério Público, absolvendo-o.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 8.069/1990, art. 189','url','https://www.planalto.gov.br/ccivil_03/leis/l8069.htm')),
  'média', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', 'd5e0bf40-fd0b-4ecf-899c-9fa6e273e97a', 'pfesc25-leg-02',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Drogas — apreensão e alienação de bens utilizados no tráfico',
  $q$Julgue o item a seguir, com base na Lei nº 11.343/2006 (Lei de Drogas).
A apreensão dos meios de transporte e dos maquinários, utensílios, instrumentos e objetos de qualquer natureza utilizados para a prática, habitual ou não, do tráfico ilícito de drogas deve ser imediatamente comunicada pela autoridade de polícia judiciária responsável pela investigação ao juízo competente, que, no prazo de trinta dias, contado dessa comunicação, deve determinar a alienação dos bens apreendidos, excetuadas as armas.$q$,
  'C',
  $q$Certo. A Lei nº 11.343/2006 disciplina procedimento específico para a apreensão de bens utilizados na prática do tráfico de drogas, exigindo comunicação imediata ao juízo competente e estabelecendo prazo para que este determine a alienação desses bens (ressalvadas as armas, que seguem destinação própria), medida que busca dar celeridade ao aproveitamento patrimonial dos bens apreendidos, evitando sua deterioração ou desvalorização durante o curso do processo. Exemplo: um veículo utilizado para transportar drogas e apreendido durante uma investigação deve seguir esse rito de comunicação e posterior alienação judicial, e não permanecer indefinidamente depositado sem destinação.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 11.343/2006, art. 62','url','https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm')),
  'difícil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', 'd5e0bf40-fd0b-4ecf-899c-9fa6e273e97a', 'pfesc25-leg-03',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei de Tortura — regime inicial de cumprimento de pena e exceção do crime omissivo (art. 1º, § 7º)',
  $q$Julgue o item a seguir, com base na Lei nº 9.455/1997.
O condenado por crime de tortura, bem como aquele que se houver omitido em face das condutas que o caracterizam quando tinha o dever de evitá-las ou apurá-las, iniciará o cumprimento da pena em regime fechado.$q$,
  'E',
  $q$Errado. O art. 1º, § 7º, da Lei nº 9.455/1997 determina que o condenado por tortura, em regra, iniciará o cumprimento da pena em regime fechado, mas ressalva expressamente dessa regra a hipótese do § 2º do mesmo artigo — justamente a conduta omissiva de quem tinha o dever de evitar ou apurar a tortura e se omitiu —, de modo que a pessoa condenada por essa modalidade omissiva específica não está sujeita, por força de lei, à obrigatoriedade do regime inicial fechado, ao contrário do que afirma o item ao incluí-la nessa regra. Exemplo: um agente público que se omite, podendo evitar a tortura praticada por terceiro sob sua responsabilidade, é condenado com base no § 2º da lei, e não se sujeita à mesma regra de regime inicial obrigatoriamente fechado aplicável ao autor direto da tortura.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.455/1997, art. 1º, §§ 2º e 7º','url','https://www.planalto.gov.br/ccivil_03/leis/l9455.htm')),
  'difícil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', 'd5e0bf40-fd0b-4ecf-899c-9fa6e273e97a', 'pfesc25-leg-04',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Lei da Carteira de Identidade — presunção de veracidade dos dados (Lei 7.116/1983)',
  $q$Julgue o item a seguir, com base na Lei nº 7.116/1983.
A carteira de identidade fará prova de todos os dados nela incluídos, dispensando a apresentação dos documentos que lhe deram origem ou que nela tenham sido mencionados.$q$,
  'C',
  $q$Certo. A Lei nº 7.116/1983, que assegura validade nacional à Carteira de Identidade, confere a esse documento presunção de veracidade quanto aos dados nele constantes, dispensando, para fins de comprovação de identidade civil, a apresentação adicional dos documentos originários que fundamentaram sua emissão (como certidão de nascimento ou casamento), facilitando a vida do cidadão que já possui o documento definitivo. Exemplo: ao se identificar em uma repartição pública com sua carteira de identidade, o cidadão não precisa, em regra, apresentar também sua certidão de nascimento para comprovar os dados nela contidos.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 7.116/1983','url','https://www.planalto.gov.br/ccivil_03/leis/l7116.htm')),
  'fácil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', 'd5e0bf40-fd0b-4ecf-899c-9fa6e273e97a', 'pfesc25-leg-05',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Competência da Polícia Federal para investigar crimes de repercussão interestadual (Lei 10.446/2002)',
  $q$Julgue o item a seguir, com base na Lei nº 10.446/2002.
Quando houver repercussão interestadual ou internacional que exija repressão uniforme, poderá o Departamento de Polícia Federal proceder à investigação de quaisquer crimes praticados por meio da rede mundial de computadores que difundam conteúdo misógino, definido como aquele que propaga ódio ou aversão às mulheres.$q$,
  'C',
  $q$Certo. A Lei nº 10.446/2002 autoriza a atuação da Polícia Federal, sem prejuízo da competência dos órgãos de segurança pública estaduais, na investigação de determinados crimes de repercussão interestadual ou internacional que exijam repressão uniforme, rol que foi ampliado por alterações legislativas posteriores para abranger também crimes praticados pela internet que difundam conteúdo misógino, dada a gravidade e o alcance nacional/transnacional que esse tipo de conduta pode assumir na rede mundial de computadores. Exemplo: uma campanha de disseminação de conteúdo de ódio contra mulheres, coordenada por diferentes estados por meio da internet, pode justificar a atuação investigativa direta da Polícia Federal, com base nessa competência ampliada.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 10.446/2002, art. 1º','url','https://www.planalto.gov.br/ccivil_03/leis/2002/l10446.htm')),
  'difícil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', 'd5e0bf40-fd0b-4ecf-899c-9fa6e273e97a', 'pfesc25-leg-06',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Estatuto do Desarmamento — dever de comunicação de extravio de arma por empresa de segurança',
  $q$Julgue o item a seguir, com base na Lei nº 10.826/2003 (Estatuto do Desarmamento).
Pratica crime o proprietário de empresa de segurança e transporte de valores que, nas primeiras vinte e quatro horas depois de sofrer perda, furto, roubo ou outra forma de extravio de arma de fogo, acessório ou munição que estejam sob sua guarda, deixa de registrar ocorrência policial e de comunicar o fato à Polícia Federal.$q$,
  'C',
  $q$Certo. O Estatuto do Desarmamento impõe às empresas de segurança privada e de transporte de valores, dada a responsabilidade especial que assumem ao possuir e transportar armamento em maior escala, o dever de comunicar prontamente às autoridades competentes qualquer extravio de arma, acessório ou munição sob sua guarda, tipificando como crime o descumprimento desse dever de comunicação nas primeiras 24 horas, justamente pelo risco que a demora na notificação representa para a segurança pública. Exemplo: se uma empresa de transporte de valores sofre um roubo de armamento e o proprietário simplesmente não comunica o fato às autoridades dentro do prazo legal, ele pode ser responsabilizado criminalmente por essa omissão.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 10.826/2003','url','https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm')),
  'difícil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', 'd5e0bf40-fd0b-4ecf-899c-9fa6e273e97a', 'pfesc25-leg-07',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Legislação Especial', 'Crimes ambientais — ação penal pública incondicionada (Lei 9.605/1998)',
  $q$Julgue o item a seguir, com base na Lei nº 9.605/1998.
Nas infrações penais derivadas de condutas e atividades lesivas ao meio ambiente, a ação penal é pública incondicionada.$q$,
  'C',
  $q$Certo. O art. 26 da Lei nº 9.605/1998 (Lei de Crimes Ambientais) estabelece que a ação penal, nos crimes previstos nessa lei, é pública incondicionada, cabendo ao Ministério Público sua propositura independentemente de representação da vítima ou de qualquer outra condição de procedibilidade, refletindo a relevância do bem jurídico ambiental tutelado, que transcende interesses estritamente individuais. Exemplo: mesmo que a vítima de um dano ambiental específico não manifeste interesse em processar o responsável, o Ministério Público pode, e deve, oferecer denúncia pelo crime ambiental, por se tratar de ação penal pública incondicionada.$q$,
  jsonb_build_array(jsonb_build_object('title','Lei nº 9.605/1998, art. 26','url','https://www.planalto.gov.br/ccivil_03/leis/l9605.htm')),
  'fácil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9b03e052-7360-4ecb-b845-51036dd35528', 'pfesc25-arq-01',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Arquivologia', 'Conceito de acervo',
  $q$Julgue o item a seguir, com base em arquivologia.
Os documentos de uma entidade custodiadora formam um acervo.$q$,
  'C',
  $q$Certo. Em arquivologia, denomina-se acervo o conjunto de documentos de arquivo pertencentes ou custodiados por uma entidade (pública ou privada, física ou jurídica), independentemente de sua fase de vida documental, sendo esse conceito amplamente utilizado para designar o patrimônio arquivístico sob a guarda de uma instituição. Exemplo: o conjunto de documentos administrativos, técnicos e históricos mantidos por um órgão público constitui o acervo arquivístico dessa instituição.$q$,
  '[]'::jsonb,
  'fácil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9b03e052-7360-4ecb-b845-51036dd35528', 'pfesc25-arq-02',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Arquivologia', 'Competência da Comissão Permanente de Avaliação de Documentos',
  $q$Julgue o item a seguir, com base em arquivologia.
Uma das competências da Comissão Permanente de Avaliação de Documentos é organizar os documentos permanentes.$q$,
  'E',
  $q$Errado. A Comissão Permanente de Avaliação de Documentos (CPAD) tem como função principal orientar e realizar o processo de avaliação documental, definindo prazos de guarda e destinação final dos documentos (eliminação ou recolhimento para guarda permanente), e não a organização física ou intelectual dos documentos já classificados como permanentes, tarefa que se relaciona a outras etapas do tratamento arquivístico, como a classificação e a descrição documental. Exemplo: cabe à CPAD decidir, com base em tabela de temporalidade, se determinado conjunto de documentos deve ser eliminado ou recolhido ao arquivo permanente, mas não organizar fisicamente os documentos já custodiados no arquivo permanente.$q$,
  '[]'::jsonb,
  'difícil', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9b03e052-7360-4ecb-b845-51036dd35528', 'pfesc25-arq-03',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Arquivologia', 'Princípios da pertinência e da proveniência',
  $q$Julgue o item a seguir, com base em arquivologia.
Os documentos de arquivo podem ser organizados por assunto, conforme o princípio da pertinência, e por origem, segundo o princípio da proveniência.$q$,
  'C',
  $q$Certo. A arquivologia reconhece diferentes princípios de organização documental: o princípio da pertinência (ou temático) organiza os documentos por assunto, independentemente de sua origem, enquanto o princípio da proveniência, hoje predominante na teoria arquivística, preserva os documentos de acordo com sua origem institucional ou pessoal, mantendo-os agrupados conforme o produtor que os gerou. Exemplo: um arquivo organizado pelo princípio da proveniência mantém juntos todos os documentos produzidos por um mesmo órgão, independentemente do assunto que tratam, ao passo que um arquivo temático reúne documentos de mesmo assunto vindos de fontes diferentes.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9b03e052-7360-4ecb-b845-51036dd35528', 'pfesc25-arq-04',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Arquivologia', 'NOBRADE — Norma Brasileira de Descrição Arquivística',
  $q$Julgue o item a seguir, com base em arquivologia.
A norma arquivística nacional cujo objetivo é permitir o acesso e o intercâmbio de informações em âmbito nacional e internacional é a Norma Brasileira de Descrições Arquivísticas (NOBRADE).$q$,
  'C',
  $q$Certo. A NOBRADE, elaborada com base em normas internacionais de descrição arquivística (como a ISAD(G)), estabelece diretrizes nacionais para a descrição de acervos arquivísticos brasileiros, buscando padronizar essa descrição de forma a facilitar tanto o acesso interno às informações quanto o intercâmbio dessas informações em âmbito nacional e internacional, promovendo maior interoperabilidade entre instituições arquivísticas. Exemplo: um pesquisador estrangeiro que consulta a descrição de um fundo arquivístico brasileiro elaborada segundo a NOBRADE consegue compreendê-la com mais facilidade, dada sua compatibilidade com padrões internacionais de descrição.$q$,
  '[]'::jsonb,
  'média', now()
),
(
  '87604b3b-91fe-4eee-a9ac-7f57540924f8', '9b03e052-7360-4ecb-b845-51036dd35528', 'pfesc25-arq-05',
  'Polícia Federal', 2025, 'Escrivão de Polícia Federal', 'CEBRASPE', 'Arquivologia', 'Plano de destinação como instrumento de avaliação',
  $q$Julgue o item a seguir, com base em arquivologia.
Um dos instrumentos de avaliação de documentos é o plano de destinação de documentos.$q$,
  'C',
  $q$Certo. O plano de destinação de documentos, ao lado de outros instrumentos como a tabela de temporalidade, constitui ferramenta essencial do processo de avaliação documental, orientando, com base em critérios previamente definidos, a destinação final que deve ser dada a cada tipo de documento (eliminação, guarda permanente, transferência, entre outras), após o transcurso de seus prazos de guarda nas fases corrente e intermediária. Exemplo: com base no plano de destinação de uma instituição, é possível definir que determinado tipo de documento administrativo deve ser eliminado após cinco anos, enquanto outro deve ser recolhido ao arquivo permanente por seu valor histórico.$q$,
  '[]'::jsonb,
  'fácil', now()
);
