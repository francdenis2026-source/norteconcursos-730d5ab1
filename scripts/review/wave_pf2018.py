# Onda 2 (parte 3): PF 2018 (Agente). Gera supabase/migrations/20260927410100_pf_2018_review_wave.sql
import os, sys, re, json
sys.path.insert(0, os.path.dirname(__file__))
import wave_lib as W
import parse_exam as P

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PDF = r"C:\Users\familia\Desktop\PROVAS FEITAS POR MIM\POLICIA FEDERAL\2018\MATRIZ_408_DGPPF012__PAG_9.PDF"
ANCH = os.environ.get("PF2018_JSON")
anchors = None
if ANCH and os.path.exists(ANCH):
    s = re.sub(r",\s*([}\]])", r"\1", open(ANCH, encoding="utf-8").read())
    anchors = {r["n"]: r["t"] for r in json.loads(s)["rows"]}
RES = P.parse(PDF, anchors=anchors)
CFG = dict(year=2018, career="Agente de Polícia Federal", pdf=PDF, res=RES)

B = "https://www.planalto.gov.br/ccivil_03/"
DL200 = ("Decreto-Lei nº 200/1967", B + "decreto-lei/del0200.htm")
L9605 = ("Lei nº 9.605/1998 – Crimes Ambientais", B + "leis/l9605.htm")
L6404 = ("Lei nº 6.404/1976 – texto compilado", B + "leis/l6404compilada.htm")
D = {}

# ---- Língua Portuguesa
PT = "Texto-base e item recuperados do caderno oficial (CEBRASPE, PF 2018); gabarito definitivo conferido. Matéria compatível com o edital PF 2025 (Língua Portuguesa)."
for n in list(range(1, 9)) + list(range(12, 17)):
    D[n] = dict(action="activate", note=PT, topic=("Língua Portuguesa", 1))
CTX12 = RES[17]["context"]
QUOTE = " O ministro, acreditava eu, escrevia eruditamente sobre o cálculo diferencial: é um matemático, não um poeta."
D[17] = dict(action="activate", note=PT, topic=("Língua Portuguesa", 2), ctx=CTX12,
             body="Mantendo-se a correção gramatical e os sentidos originais do texto, o seu sexto parágrafo poderia ser assim reescrito: Perguntei, entretanto, se ele era realmente poeta. Sabia que são dois irmãos e que ambos adquiriram renome nas letras." + QUOTE)
for n in range(18, 25):
    D[n] = dict(action="activate", note=PT, topic=("Língua Portuguesa", 2), ctx=CTX12)
for n in (9, 10, 11):
    D[n] = dict(action="block", note="Bloqueado (27/09/2026): o item cita o Manual de Redação da Presidência (2.ª ed., 2002) e a regra não foi recotejada com a edição vigente (3.ª ed., 2018). A chave oficial continua valendo para a pontuação.")

# ---- Direito administrativo e legislação especial
D[25] = dict(action="activate", audit=True, topic=("Noções de Direito Administrativo", 1), basis=[DL200],
             note="Conferido no texto compilado do Decreto-Lei 200/1967 (Planalto, 27/09/2026): art. 4º — a Administração Federal compreende a direta (Presidência e Ministérios) e a indireta (autarquias, empresas públicas, sociedades de economia mista e fundações públicas). Gabarito C confere.")
D[26] = dict(action="activate", audit=True, topic=("Noções de Direito Administrativo", 1), basis=[DL200],
             note="Conferido no Decreto-Lei 200/1967 (Planalto, 27/09/2026): art. 4º, II, e art. 10, §1º — atribuir a execução a entidade fora da administração direta é descentralização, não desconcentração (distribuição interna de competências). Gabarito E confere.")
D[40] = dict(action="activate", audit=True, topic=("Legislação Especial", 2), basis=[L9605],
             ctx="Em cada um dos itens que se seguem, é apresentada uma situação hipotética, seguida de uma assertiva a ser julgada com base em disposições das Leis n.os 9.605/1998, 11.343/2006 e 13.445/2017.",
             body="Em operação da Polícia Federal, um cidadão foi flagrado tentando pescar em local interditado por órgão federal. O pescador argumentou que, apesar da tentativa, não obteve êxito na pesca. Nessa situação, mesmo sem o sucesso pretendido, o pescador responderá por crime previsto na lei que tipifica os crimes ambientais.",
             note="Conferido no texto compilado da Lei 9.605/1998 (Planalto, 27/09/2026): art. 34 pune pescar em lugares interditados por órgão competente e art. 36 considera pesca todo ato tendente a capturar espécimes; o êxito não é exigido. Gabarito C confere.")

# ---- Estatística
ES = "Estatística"
CTX41 = ("Determinado órgão governamental estimou que a probabilidade p de um ex-condenado voltar a ser condenado por algum crime no prazo de 5 anos, contados a partir da data da libertação, seja igual a 0,25. "
         "Essa estimativa foi obtida com base em um levantamento por amostragem aleatória simples de 1.875 processos judiciais, aplicando-se o método da máxima verossimilhança a partir da distribuição de Bernoulli.\n"
         "Sabendo que P(Z < 2) = 0,975, em que Z representa a distribuição normal padrão, julgue os itens que se seguem, em relação a essa situação hipotética.")
CTX45 = ("Um pesquisador estudou a relação entre a taxa de criminalidade (Y) e a taxa de desocupação da população economicamente ativa (X) em determinada região do país. "
         "Esse pesquisador aplicou um modelo de regressão linear simples na forma Y = bX + a + ε, em que b representa o coeficiente angular, a é o intercepto do modelo e ε denota o erro aleatório com média zero e variância σ². "
         "A tabela a seguir representa a análise de variância (ANOVA) proporcionada por esse modelo. Tabela (fonte de variação; graus de liberdade; soma de quadrados): modelo, 1, 225; erro, 899, 175; total, 900, 400.\n"
         "A respeito dessa situação hipotética, julgue os próximos itens, sabendo que b > 0 e que o desvio padrão amostral da variável X é igual a 2.")
CTX48 = ("O valor diário (em R$ mil) apreendido de contrabando em determinada região do país é uma variável aleatória W que segue distribuição normal com média igual a R$ 10 mil e desvio padrão igual a R$ 4 mil.\n"
         "Nessa situação hipotética,")
D[41] = dict(action="activate", ctx=CTX41, topic=(ES, 3), note="P(exatamente 1 em 4) = 4×0,25×0,75³ ≈ 0,42, superior a 0,4. Gabarito C confere.")
D[42] = dict(action="activate", ctx=CTX41, topic=(ES, 4), note="Erro padrão = √(0,25×0,75/1.875) = √0,0001 = 0,01. Gabarito C confere.")
D[43] = dict(action="activate", ctx=CTX41, topic=(ES, 4), note="IC de 95% ≈ 0,25 ± 2×0,01 = 0,25 ± 0,02, e não ± 0,05. Gabarito E confere.")
D[44] = dict(action="activate", ctx=CTX41, topic=(ES, 4), note="A estimativa de máxima verossimilhança da média de X é n·p̂ = 1.000×0,25 = 250, não superior a 300. Gabarito E confere.")
D[45] = dict(action="activate", ctx=CTX45, topic=(ES, 4), note="R² = 225/400 = 0,5625; com b > 0, r = 0,75. Gabarito C confere.")
D[46] = dict(action="activate", ctx=CTX45, topic=(ES, 4), note="σ² estimada = SQE/gl = 175/899 ≈ 0,19, inferior a 0,5. Gabarito E confere.")
D[47] = dict(action="activate", ctx=CTX45, topic=(ES, 4), note="s_Y = √(400/900) ≈ 0,667; b = r·s_Y/s_X = 0,75×0,667/2 = 0,25. Gabarito C confere.")
D[48] = dict(action="activate", ctx=CTX48, topic=(ES, 3), body="se W1 e W2 forem duas cópias independentes e identicamente distribuídas como W, então a soma W1 + W2 seguirá distribuição normal com média igual a R$ 20 mil e desvio padrão igual a R$ 8 mil.",
             note="A soma tem média 20 e desvio padrão √(16+16) ≈ 5,66, e não 8. Gabarito E confere.")
D[49] = dict(action="activate", ctx=CTX48, topic=(ES, 3), body="P(W > R$ 10 mil) = 0,5.", note="A normal é simétrica em torno da média 10. Gabarito C confere.")
D[50] = dict(action="activate", ctx=CTX48, topic=(ES, 3), body="a razão (W − 20)/√4 segue distribuição normal padrão.", note="A padronização usaria a média 10 e o desvio padrão 4; (W−20)/2 tem média −5. Gabarito E confere.")

# ---- Raciocínio lógico
RL1, RL2 = ("Raciocínio Lógico", 1), ("Raciocínio Lógico", 2)
CTX51 = ("As proposições P, Q e R a seguir referem-se a um ilícito penal envolvendo João, Carlos, Paulo e Maria:\nP: “João e Carlos não são culpados”.\nQ: “Paulo não é mentiroso”.\nR: “Maria é inocente”.\n"
         "Considerando que ~X representa a negação da proposição X, julgue os itens a seguir.")
D[52] = dict(action="activate", ctx=CTX51, topic=RL1, body="A proposição “Se Paulo é mentiroso então Maria é culpada.” pode ser representada simbolicamente por (~Q)↔(~R).", note="A condicional correta seria (~Q)→(~R); o bicondicional muda o sentido. Símbolo conferido na imagem do caderno. Gabarito E confere.")
D[53] = dict(action="activate", ctx=CTX51, topic=RL1, body="Se ficar comprovado que apenas um dos quatro envolvidos no ilícito penal é culpado, então a proposição simbolizada por (~P)→(~Q)∨R será verdadeira.", note="Com um só culpado, ou Maria é inocente (R verdadeira) ou ~P é falsa: a condicional é sempre verdadeira. Gabarito C confere.")
D[54] = dict(action="activate", ctx=CTX51, topic=RL1, body="Independentemente de quem seja culpado, a proposição {P→(~Q)}→{Q∨[(~Q)∨R]} será sempre verdadeira, isto é, será uma tautologia.", note="O consequente Q∨~Q∨R é tautologia, logo a condicional é sempre verdadeira. Gabarito C confere.")
D[55] = dict(action="activate", ctx=CTX51, topic=RL1, body="As proposições P∧(~Q)→(~R) e R→[Q∧(~P)] são equivalentes.", note="Com P falso, Q falso e R verdadeiro, a primeira é verdadeira e a segunda é falsa: não são equivalentes. Gabarito E confere.")
D[56] = dict(action="activate", ctx=CTX51, topic=RL1, note="Com P, Q e R falsas, Maria é culpada e João ou Carlos também: ao menos dois culpados. Gabarito C confere.")
CTX57 = ("Em um aeroporto, 30 passageiros que desembarcaram de determinado voo e que estiveram nos países A, B ou C, nos quais ocorre uma epidemia infecciosa, foram selecionados para ser examinados. "
         "Constatou-se que exatamente 25 dos passageiros selecionados estiveram em A ou em B, nenhum desses 25 passageiros esteve em C e 6 desses 25 passageiros estiveram em A e em B.\nCom referência a essa situação hipotética, julgue os itens que se seguem.")
D[57] = dict(action="activate", ctx=CTX57, topic=RL2, note="|A| = 25 + 6 − 11 = 20, mais de 15. Gabarito C confere.")
D[58] = dict(action="activate", ctx=CTX57, topic=RL2, body="Se 2 dos 30 passageiros selecionados forem escolhidos ao acaso, então a probabilidade de esses 2 passageiros terem estado em 2 desses países é inferior a 1/30.", note="P = C(6,2)/C(30,2) = 15/435 = 1/29, maior que 1/30. Gabarito E confere.")
D[59] = dict(action="activate", ctx=CTX57, topic=RL2, note="C(30,2) − C(25,2) = 435 − 300 = 135, superior a 100. Gabarito C confere.")
D[60] = dict(action="activate", ctx=CTX57, topic=RL2, note="Com 25 passageiros em A∪B (6 em ambos) e ao menos metade de homens em A, em B e em C (5 pessoas), há no máximo 15 mulheres em A∪B e 2 em C: o total pode chegar a 17, então 'no máximo 14' não se conclui. Gabarito E confere.")

# ---- Informática
INF = "Informática"
def inf(n, t, note, **kw):
    D[n] = dict(action="activate", topic=(INF, t), note=note, **kw)
inf(61, 2, "172.20.1.1 é endereço IPv4 privado (faixa 172.16.0.0–172.31.255.255), não de servidor na Internet pública. Gabarito E confere.")
inf(62, 2, "O proxy da rede local intermedia acessos à intranet e à Internet. Gabarito C confere.")
inf(64, 2, "WHOIS consulta registro de domínios, não resolve URLs em endereços IP (função do DNS). Gabarito E confere.")
inf(65, 3, "Firewalls e ativos corporativos podem bloquear o acesso remoto; a afirmação de que ocorre a despeito deles é falsa. Gabarito E confere.")
inf(66, 3, "A resposta eficaz ao ransomware é restaurar os dados de backups; quebrar por força bruta a criptografia aplicada é inviável na prática. Gabarito E confere.")
inf(67, 3, "Códigos maliciosos se propagam por anexos, mídias removíveis e outras vias. Gabarito C confere.")
inf(68, 3, "Na autenticação em dois fatores os fatores podem vir em qualquer ordem (conhecimento, posse, inerência). Gabarito E confere.")
inf(69, 3, "Superexposição de dados pessoais facilita furto e falsificação de identidade. Gabarito C confere.")
inf(70, 5, "Item sobre modelos de nuvem (SaaS x IaaS). Gabarito E confere.")
inf(71, 5, "Armazenamento de arquivos e recursos de rede compartilhados em nuvem. Gabarito C confere.")
inf(72, 5, "Re-hosting em IaaS é indicado para aplicações legadas. Gabarito C confere.")
inf(73, 4, "A teoria geral dos sistemas busca princípios unificadores entre as ciências. Gabarito C confere.")
inf(74, 2, "O indexador organiza a base de dados; quem navega e coleta páginas é o rastreador (crawler). Gabarito E confere.")
inf(75, 2, "Descrição incorreta da transferência de arquivos por fluxo contínuo. Gabarito E confere.")
inf(76, 2, "Fluxos multimídia (áudio, vídeo, metadados) podem ser tratados em separado. Gabarito C confere.")
inf(79, 4, "Conhecimento pressupõe compreensão e internalização da informação. Gabarito C confere.")
inf(80, 4, "Levantamento de requisitos e projeto são fases do desenvolvimento de sistemas. Gabarito C confere.")
ER = ("Diagrama entidade-relacionamento: entidade “produto” (atributos: preço, descrição e código, este como chave) ligada por um relacionamento (losango) à entidade “tipo de produto” "
      "(atributos: descrição e código, chave), com cardinalidade n do lado de produto e 1 do lado de tipo de produto.\nConsiderando o modelo entidade-relacionamento (ER) precedente, julgue os seguintes itens, relativos a banco de dados.")
inf(81, 4, "Pela cardinalidade n:1, um tipo de produto pode se associar a vários produtos. Gabarito E confere.", ctx=ER)
inf(82, 4, "A fusão de tabelas na transformação ER→relacional aplica-se a relacionamentos 1:1; aqui (n:1) não é necessária. Gabarito E confere.", ctx=ER)
inf(83, 4, "Cada entidade tem sua própria chave; chaves com o mesmo nome em entidades distintas são válidas. Gabarito E confere.", ctx=ER)
inf(84, 4, "Atribuir classes a objetos por algoritmos supervisionados é classificação. Gabarito C confere.")
inf(85, 4, "Big data: grande volume, variedade e velocidade. Gabarito C confere.")
inf(86, 4, "Definição clássica de mineração de dados. Gabarito C confere.")
inf(87, 2, "Comutadores de pacotes encaminham pacotes entre enlaces. Gabarito C confere.")
inf(88, 2, "LANs sem fio, satélite e HFC usam canais de difusão. Gabarito C confere.")
inf(89, 2, "Classificação de redes por abrangência: LAN, MAN, WAN. Gabarito C confere.")
inf(90, 2, "A camada de transporte fornece comunicação lógica entre processos em hospedeiros diferentes. Gabarito C confere.")
inf(92, 2, "O UDP não estabelece conexão nem apresentação prévia entre remetente e destinatário. Gabarito E confere.")
inf(93, 5, "Em R, x + y soma elemento a elemento e imprime [1] 4 14 18, não 36. Gabarito E confere.",
    ctx="Julgue os próximos itens, relativos a noções de programação Python e R.",
    body='Considere o programa a seguir, escrito em R.\nx <- c (3, 5, 7)\ny <- c (1, 9, 11)\nprint (x + y)\nApós a execução do programa, será obtido o seguinte resultado.\n[1]  36')
inf(95, 5, "Em Python, if 5 > 2 exige dois-pontos e usa indentação, não chaves: erro de sintaxe. Gabarito E confere.",
    ctx="Julgue os próximos itens, relativos a noções de programação Python e R.",
    body='Considere o programa a seguir, na linguagem Python.\nif 5 > 2\n    {\n        print("True!")\n    }\nA sintaxe do programa está correta e, quando executado, ele apresentará o seguinte resultado.\nTrue!')
inf(96, 5, "letras == [...] compara em vez de atribuir (NameError), e o bloco com chaves é inválido em Python. Gabarito E confere.",
    ctx="Julgue os próximos itens, relativos a noções de programação Python e R.",
    body='Considere o programa a seguir, na linguagem Python.\nletras == ["P", "F"]\nfor x in letras\n  {\n    print(x)\n  }\nA sintaxe do programa está correta e, quando executado, ele apresentará o seguinte resultado.\nPF')
OBS = "Arquivado como obsoleto (27/09/2026): item preso a produto/versão ({x}); o edital PF 2025 cobra o tema de forma genérica. A chave oficial continua usada na pontuação."
D[63] = dict(action="obsolete", note=OBS.format(x="Windows Defender, hoje Microsoft Defender"))
D[77] = dict(action="obsolete", note=OBS.format(x="PowerPoint 2013 e BrOffice, hoje LibreOffice"))
D[94] = dict(action="block", text='Item: Considere o programa a seguir, escrito em R.\nx <- TRUE\ny <- FALSE\nprint (x?y)   [operador lógico perdido na extração do PDF]\nApós a execução do programa, será obtido o seguinte resultado.\n[1] FALSE',
             note="Bloqueado (27/09/2026): o operador lógico entre x e y não sobrevive à extração do PDF e a imagem do caderno não o distingue (& daria FALSE; | daria TRUE); sem a expressão exata não dá para conferir o gabarito E. A chave oficial continua valendo para a pontuação.")

# ---- Contabilidade geral
CG = "Contabilidade Geral"
def ct(n, t, note, **kw):
    D[n] = dict(action="activate", topic=(CG, t), note=note, **kw)
CTX97 = "Considerando que a contabilidade é a ciência que estuda os fenômenos patrimoniais sob o aspecto da finalidade organizacional, julgue os itens a seguir, no que se refere a conceitos, objetivos e finalidades da contabilidade."
ct(97, 1, "Conceito de contabilidade patrimonial: seu objeto é o patrimônio da entidade. Gabarito C confere.", ctx=CTX97)
ct(98, 1, "Patrimônio é o conjunto de bens, direitos e obrigações; a diferença entre ativos e passivos é o patrimônio líquido. Gabarito E confere.", ctx=CTX97)
ct(99, 1, "A contabilidade é ciência social aplicada, não exata. Gabarito E confere.", ctx=CTX97)
CTX100 = ("Nas demonstrações contábeis de determinada empresa, foram selecionadas as contas a seguir, reunidas em quatro grupos, e seus respectivos saldos.\n"
          "grupo 1: caixa e equivalentes R$ 10.000; créditos contra clientes R$ 350.000; estoques para revenda R$ 250.000; veículos R$ 120.000.\n"
          "grupo 2: duplicatas descontadas R$ 100.000; fornecedores R$ 80.000; salários e encargos a pagar R$ 50.000.\n"
          "grupo 3: capital social R$ 400.000; reservas de lucros R$ 100.000.\n"
          "grupo 4: depreciação R$ 15.000; vendas líquidas R$ 2.000.000; salários e encargos R$ 450.000.\nCom base nessas informações, julgue os seguintes itens.")
ct(100, 2, "Grupo 1 = 730.000 = grupo 2 (230.000) + grupo 3 (500.000): o rol fecha; o item é errado. Gabarito E confere.", ctx=CTX100)
ct(101, 1, "Fato modificativo altera o patrimônio líquido e se registra em conta de resultado (grupo 4). Gabarito C confere.", ctx=CTX100)
ct(102, 1, "Crédito no ativo, débito no passivo e em despesa: fato misto. Gabarito C confere.", ctx=CTX100)
ct(103, 1, "Estoques em trânsito têm saldo devedor. Gabarito E confere.")
ct(104, 1, "Estoques em trânsito não integram o disponível (ativo circulante, estoques). Gabarito E confere.")
ct(105, 1, "A compra de mercadorias gera contrapartida em fornecedores ou caixa/equivalentes. Gabarito C confere.")
ct(106, 1, "Compra à vista de veículo: uma conta devedora e uma credora, primeira fórmula de lançamento. Gabarito C confere.")
ct(107, 1, "Pelo regime de competência, o aluguel utilizado no exercício é despesa dele, ainda que pago depois. Gabarito C confere.")
ct(108, 1, "O adiantamento de cliente é passivo (crédito) contra caixa, mas o item invoca regime de caixa, quando a apuração segue a competência. Gabarito E confere.")
CTX109 = ("Determinada sociedade comercial realizou, no período corrente, as transações apresentadas a seguir: (i) apropriou a terceira cota anual cheia de depreciação de um veículo, originalmente adquirido por R$ 60.000, com vida útil estimada em 5 anos; "
          "a empresa considera valor residual de 10% para todos os seus bens e o método de depreciação é o da soma dos dígitos dos anos; (ii) descontou, no banco onde mantém conta, uma duplicata a vencer em 60 dias, cujo valor nominal, de R$ 100.000, gerou um crédito de R$ 97.000 na conta-corrente; "
          "(iii) vendeu mercadorias por R$ 10.000, líquido de tributos, realizando a baixa dos estoques correspondentes, no valor de R$ 5.500.\nNessa situação hipotética,")
ct(109, 2, "Resultado com mercadorias = 10.000 − 5.500 = 4.500. Gabarito C confere.", ctx=CTX109, body="a venda de mercadorias gerou um resultado com mercadorias de R$ 4.500.")
ct(110, 2, "Os R$ 3.000 de encargos do desconto são apropriados ao resultado pelo regime de competência (ao longo dos 60 dias), não integralmente no momento do desconto. Gabarito E confere.", ctx=CTX109, body="a empresa, no momento do desconto do título, contabilizou despesa com encargos financeiros de R$ 3.000.")
ct(111, 2, "Soma dos dígitos (5 anos = 15): 3ª cota = 3/15 × (60.000 − 6.000) = 10.800. Gabarito C confere.", ctx=CTX109, body="a depreciação do veículo gerou um crédito de R$ 10.800 na conta de depreciação acumulada.")
ct(112, 2, "O balancete de verificação não detecta todos os erros (por exemplo, lançamentos equivalentes a débito e crédito equivocados). Gabarito E confere.")
CTX115 = ("Considere os dados da tabela a seguir, retirados da contabilidade de determinada sociedade empresarial, com valores em reais (R$): caixa e equivalentes 10.000; duplicatas a receber 80.000; estoques 50.000; máquinas 100.000; terrenos 160.000; marcas e patentes 100.000; "
          "fornecedores 200.000; duplicatas descontadas 40.000; salários e encargos a pagar 200.000; capital social 150.000; vendas de mercadorias 1.000.000; custo das mercadorias vendidas 600.000; despesas administrativas 90.000; despesas comerciais 160.000; "
          "despesas financeiras 33.000; outras despesas 41.000; IR e CSLL 26.000.\nCom base nessas informações, julgue os itens que se seguem.")
ct(115, 2, "Ativo = 10 + 80 + 50 + 100 + 160 + 100 = R$ 500.000 (duplicatas descontadas tratadas como passivo). Gabarito C confere.", ctx=CTX115)
ct(116, 2, "Lucro bruto = 1.000.000 − 600.000 = 400.000, não 50.000. Gabarito E confere.", ctx=CTX115)
ct(118, 3, "Lei 6.404/76 (Planalto compilado): aplica-se a todas as companhias, com ações negociadas ou não em bolsa. Gabarito C confere.", basis=[L6404],
   ctx="Com base no disposto na Lei n.º 6.404/1976 e suas alterações e na Norma Brasileira de Contabilidade – NBC TSP Estrutura Conceitual/2016, julgue os itens subsecutivos.")
for n in (113, 114):
    D[n] = dict(action="block", note="Bloqueado (27/09/2026): item de doutrina contábil (modelos de balancete de verificação) sem fonte oficial conferida nesta revisão. A chave oficial continua valendo para a pontuação.")
for n in (119, 120):
    D[n] = dict(action="block", note="Bloqueado (27/09/2026): a NBC TSP Estrutura Conceitual foi revisada (R1, 13/11/2025, após a prova); é preciso conferir o texto vigente antes de publicar. A chave oficial continua valendo para a pontuação.")

if __name__ == "__main__":
    out = os.path.join(ROOT, "supabase", "migrations", "20260927410100_pf_2018_review_wave.sql")
    c = W.build_sql(CFG, D, out, "Onda 2 (parte 3): PF 2018 (Agente). Gerado por scripts/review/wave_pf2018.py.\nTextos recuperados do caderno oficial (CEBRASPE 2018); leis conferidas em 27/09/2026.")
    print(c, sum(c.values()), "de 103")
    print("sem decisão:", [n for n in range(1, 121) if n not in D])
