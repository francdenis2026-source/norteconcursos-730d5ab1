-- Auditoria PF 2021 Escrivão de Polícia Federal — lote 4 (29 itens:
-- Informática 81-96, Contabilidade 97-114, Arquivologia 115-120).
-- Excluídos deste lote:
--   84, 85: código Python/R cujas quebras de linha/indentação foram
--     perdidas na extração do PDF (texto virou uma única linha corrida) —
--     minha própria simulação do código, tentando reconstituir a estrutura,
--     chega a um resultado diferente do gabarito oficial em ambos; sem a
--     formatação original (indentação é semanticamente crítica em Python),
--     não dá para confirmar qual é a leitura correta. Não resolvido por
--     adivinhação.
--   92, 101, 103, 113: já anulados no gabarito oficial.
--   95: a sigla "DTL" não corresponde a nenhuma nomenclatura padrão de SQL —
--     o conjunto de comandos de controle de transação (COMMIT, ROLLBACK,
--     SAVEPOINT) é universalmente chamado de TCL (Transaction Control
--     Language). Gabarito oficial marca Correto; a divergência com a fonte
--     não foi resolvida por adivinhação.
--   97, 98: dependem de um caso hipotético ("a empresa XYZ") não capturado.
--   107: o próprio CPC 00 (Estrutura Conceitual) afirma expressamente que
--     "consistência, embora relacionada à comparabilidade, não é a mesma
--     coisa" — consistência trata do uso dos mesmos métodos pela MESMA
--     entidade ao longo do tempo, não da comparação entre entidades
--     distintas, como o item describe. Gabarito oficial marca Correto;
--     divergência com a fonte não resolvida por adivinhação.

update public.official_exam_questions
set review_note=$q$Errado. O encapsulamento de bits em quadros (frames) ocorre na camada de ENLACE DE DADOS (data link), não na camada de transporte. A camada de transporte trabalha com segmentos (TCP) ou datagramas (UDP), não com quadros.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=81;

update public.official_exam_questions
set review_note=$q$Errado. Uma LAN (rede local) fornece conectividade entre dispositivos dentro de uma área restrita (um escritório, um prédio) — ela não é, por si só, responsável por fornecer "conectividade em tempo integral com a Internet", que depende de um link externo (via roteador/gateway) para fora da rede local.
Exemplo: a LAN conecta os computadores de um escritório entre si; a conexão desses computadores com a internet "lá fora" depende de outro equipamento, o roteador que liga a rede local ao provedor de internet.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=82;

update public.official_exam_questions
set review_note=$q$Errado. Metadados são "dados sobre dados": informações que descrevem características do próprio arquivo (autor, data de criação, tamanho, formato, tipo, histórico de alterações etc.) — eles não têm a função específica de descrever "o destino final do arquivo definido pelo emissor".$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=83;

update public.official_exam_questions
set review_note=$q$Correto. Análise de clustering (agrupamento) é a tarefa de mineração de dados que agrupa objetos de forma que aqueles dentro do mesmo grupo (cluster) sejam mais semelhantes entre si do que em relação a objetos de outros grupos.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=86;

update public.official_exam_questions
set review_note=$q$Errado. Entropia da informação (conceito da Teoria da Informação de Shannon) é uma medida de INCERTEZA/aleatoriedade associada a uma variável — quanto maior a entropia, maior a imprevisibilidade da informação. A descrição do item ("medida de certeza de que o intervalo contém um parâmetro da população") é, na verdade, a definição de nível de confiança/intervalo de confiança em estatística, um conceito diferente.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=87;

update public.official_exam_questions
set review_note=$q$Errado. As aplicações de Big Data se caracterizam por um conjunto mais amplo de propriedades, tradicionalmente descritas pelos "Vs" (volume, velocidade, variedade, veracidade, entre outros), incluindo expressamente dados NÃO estruturados (textos, imagens, vídeos) — não se limitam, portanto, a grandes volumes armazenados em tabelas relacionais.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=88;

update public.official_exam_questions
set review_note=$q$Errado. Atributos (colunas) e registros/tuplas (linhas) são conceitos diferentes numa tabela de banco de dados: o número de atributos não tem relação com o número de registros. Uma tabela com 205 atributos pode ter qualquer número de registros (inclusive zero).$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=89;

update public.official_exam_questions
set review_note=$q$Correto. No modelo entidade-relacionamento (MER), uma entidade normalmente representa um objeto ou conceito do mundo real sobre o qual se deseja armazenar informações (por exemplo, uma pessoa, um produto, um pedido).$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=90;

update public.official_exam_questions
set review_note=$q$Correto. As restrições de integridade em um SGBD (como chaves primárias, chaves estrangeiras e restrições de domínio) garantem que os dados armazenados sejam consistentes e confiáveis ao longo de todas as operações de armazenamento, consulta e atualização.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=91;

update public.official_exam_questions
set review_note=$q$Errado. Hiperchave é um CONJUNTO DE ATRIBUTOS cuja combinação de valores identifica de forma única cada tupla (linha) de uma relação — e não "uma tupla que permite recuperar uma relação de uma tabela", definição que inverte o conceito (hiperchave é formada por atributos, não é ela própria uma tupla).$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=93;

update public.official_exam_questions
set review_note=$q$Correto. Dados estruturados têm formato rígido e predefinido (esquema fixo de colunas e tipos), o que permite seu armazenamento direto em campos de tabelas de bancos de dados relacionais — ao contrário dos dados não estruturados (textos livres, imagens, áudio), que não seguem esse formato rígido.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=94;

update public.official_exam_questions
set review_note=$q$Errado. A equação ampliada do patrimônio deve ser expressa como: ATIVO + DESPESAS + PERDAS = PASSIVO + RECEITAS + GANHOS + PATRIMÔNIO LÍQUIDO — o item inverte a posição de receitas/ganhos e despesas/perdas na fórmula.
Fonte: fundamentos de contabilidade básica — equação patrimonial ampliada (equilíbrio entre contas de natureza devedora e credora, incluindo resultado).$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=99;

update public.official_exam_questions
set review_note=$q$Correto. O livro Razão é o registro contábil que agrupa, conta a conta, todos os lançamentos relativos a cada elemento patrimonial, apresentando os saldos (devedor ou credor) de cada conta representativa do patrimônio da entidade.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=100;

update public.official_exam_questions
set review_note=$q$Errado. Fornecedores e impostos a recolher são contas do PASSIVO, cujos saldos são, por natureza, CREDORES (e não devedores) — representam obrigações da entidade perante terceiros.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=102;

update public.official_exam_questions
set review_note=$q$Errado. A chamada "fórmula complexa" de lançamento contábil é, na classificação tradicional, a QUARTA fórmula (duas ou mais contas devedoras e duas ou mais contas credoras), não a terceira. Além disso, a terceira fórmula é descrita como "duas ou mais contas devedoras e uma conta credora" — o item descreve o oposto (uma devedora, duas ou mais credoras), que corresponde à SEGUNDA fórmula.
Fonte: classificação tradicional das fórmulas de lançamento contábil (1ª: 1D/1C; 2ª: 1D/váriosC; 3ª: váriosD/1C; 4ª/complexa: váriosD/váriosC).$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=104;

update public.official_exam_questions
set review_note=$q$Correto. Pela Estrutura Conceitual (CPC 00), um recurso só se qualifica como ativo se tiver potencial de gerar benefícios econômicos futuros para a entidade; bens sem esse potencial (ou incapazes de gerar tais benefícios) não se enquadram na definição de ativo, mesmo que representem um bem físico.
Fonte oficial: CPC 00 (R2) — Estrutura Conceitual para Relatório Financeiro.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=105;

update public.official_exam_questions
set review_note=$q$Errado. O "custo de liberação" é uma base de mensuração aplicável aos PASSIVOS (não aos ativos em geral): representa o montante que a entidade pagaria para se liberar de uma obrigação — ou seja, o custo de "se livrar" de um passivo, não de baixar um ativo.
Fonte oficial: CPC 00 (R2) / NBC TSP — bases de mensuração (custo de liberação como base de mensuração de passivos).$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=106;

update public.official_exam_questions
set review_note=$q$Correto. A avaliação de recebíveis pelo valor líquido de realização, com os devidos ajustes para refletir perdas estimadas em créditos de liquidação duvidosa (PECLD), é o procedimento contábil correto para que o patrimônio reflita a expectativa real de recebimento.
Fonte: Estrutura Conceitual (CPC 00) e normas sobre instrumentos financeiros/recebíveis — princípio da prudência/representação fidedigna.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=108;

update public.official_exam_questions
set review_note=$q$Errado. A perda estimada com créditos de liquidação duvidosa (PECLD) deve ser reconhecida como despesa em contrapartida a uma conta RETIFICADORA do ativo (uma conta redutora, como "(-) Perdas Estimadas com Créditos de Liquidação Duvidosa"), e não diretamente na própria conta de ativo que representa os recebíveis — isso preserva o valor histórico bruto do recebível, mostrando separadamente a perda estimada.
Exemplo: é como ter uma "etiqueta de desconto" numa conta separada, em vez de simplesmente apagar parte do valor original do recebível — assim dá para ver tanto o valor total quanto a perda estimada.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=109;

update public.official_exam_questions
set review_note=$q$Errado. Adiantamentos a empregados representam um direito da entidade a receber/compensar valores no futuro (quando o empregado prestar os serviços ou quando o adiantamento for descontado), sendo classificados como conta do ATIVO — e não como despesa administrativa na demonstração do resultado.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=110;

update public.official_exam_questions
set review_note=$q$Errado. Deduções sobre vendas (devoluções, abatimentos e impostos incidentes sobre vendas) são itens redutores da RECEITA BRUTA para se chegar à receita líquida — tecnicamente, não são classificadas como "despesas" na demonstração do resultado, mas sim como retificadoras de receita.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=111;

update public.official_exam_questions
set review_note=$q$Correto. Dívidas (passivos financeiros) mantidas com o propósito de negociação no mercado são classificadas, pelas normas contábeis, no PASSIVO CIRCULANTE, independentemente do prazo original de vencimento — a intenção de negociação ativa justifica essa classificação.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=112;

update public.official_exam_questions
set review_note=$q$Correto. Um ativo intangível com vida útil definida está sujeito à amortização, cujo início se dá a partir do momento em que o ativo está disponível para uso (e não necessariamente desde sua aquisição ou desenvolvimento, caso haja intervalo entre esses momentos).
Fonte oficial: CPC 04 — Ativo Intangível.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=114;

update public.official_exam_questions
set review_note=$q$Correto. O princípio da proveniência (respect des fonds) é o princípio fundamental da Arquivologia que determina que os documentos de um mesmo produtor (pessoa física ou jurídica) sejam mantidos agrupados, preservando sua origem e organicidade — é esse princípio que confere ao documento de arquivo sua identidade/singularidade em relação a outros tipos de documentos (como os de biblioteca ou museu).$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=115;

update public.official_exam_questions
set review_note=$q$Errado. A NOBRADE (Norma Brasileira de Descrição Arquivística), baseada na norma internacional ISAD(G), inclui expressamente a descrição multinível como uma de suas características centrais — permitindo descrever o acervo em diferentes níveis (fundo, série, dossiê, item), do geral para o particular. A ausência dessa funcionalidade não é, portanto, uma limitação da norma.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=116;

update public.official_exam_questions
set review_note=$q$Correto. A existência de programas de gestão de documentos pode ser verificada constatando-se a aplicação de planos/códigos de classificação, o uso de tabelas de temporalidade e a existência de uma política arquivística institucional formalizada no órgão.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=117;

update public.official_exam_questions
set review_note=$q$Errado. A classificação de documentos baseada em funções, atividades e tarefas é a classificação FUNCIONAL, não a "estrutural". A classificação ESTRUTURAL, por sua vez, é elaborada a partir da estrutura organizacional (órgãos, departamentos, setores) do produtor dos documentos — o item inverteu os dois tipos de classificação.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=118;

update public.official_exam_questions
set review_note=$q$Correto. Na tabela de temporalidade, os prazos de guarda dos documentos podem ser estabelecidos em uma unidade de tempo determinada (anos) ou, quando não é possível fixar um prazo exato, vinculados à ocorrência de um evento/ação específica (por exemplo, "até a prestação de contas" ou "até o término do contrato").$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=119;

update public.official_exam_questions
set review_note=$q$Errado. Mesmo em sistemas informatizados de gestão arquivística de documentos (SIGAD), a classificação de documentos continua sendo essencial — os metadados complementam e enriquecem a gestão, mas não substituem a necessidade de classificar os documentos segundo um plano/código de classificação, que organiza logicamente o acervo por função/atividade.$q$
where exam_year=2021 and career_name='Escrivão de Polícia Federal' and item_number=120;
