#!/usr/bin/env python3
"""Contabilidade Geral e Análise Financeira: teoria didática e 35 questões novas. python3 scripts/content-cont.py"""
import sys, pathlib, random
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import qlib
from qlib import Q, teoria, salvar
rnd = random.Random(20261128)
def br(x):
    return f"R$ {x:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
def many(fn, n, tries=80):
    got = 0
    for _ in range(tries):
        before = len(qlib.NEW)
        try: fn()
        except AssertionError:
            del qlib.NEW[before:]; continue
        k = qlib.NEW[-1]["q"]
        if sum(1 for x in qlib.NEW if x["q"] == k) > 1:
            qlib.NEW.pop(); continue
        got += 1
        if got == n: return
    raise SystemExit("poucas questões: " + fn.__name__)

teoria("cont_mf",
 """<p><b>Em uma frase:</b> matemática financeira calcula o valor do dinheiro no tempo: juros, taxas, montante e descontos.</p>
<div class="exemplo"><b>Analogia:</b> juros são o 'aluguel' do dinheiro: quem toma emprestado paga pelo tempo de uso.</div>
<h3>Juros simples</h3>
<ul><li>Incidem sempre sobre o <b>capital inicial</b>. <b>J = C · i · n</b>. <b>M = C + J = C(1 + i·n)</b>.</li><li>Cresce em <b>progressão aritmética</b> (reta).</li></ul>
<h3>Juros compostos</h3>
<ul><li>Incidem sobre o capital <b>mais</b> os juros acumulados ('juros sobre juros'). <b>M = C · (1 + i)^n</b>. Juros = M − C.</li><li>Cresce em <b>progressão geométrica</b> (curva).</li></ul>
<h3>Atenção às unidades</h3>
<p>Taxa e tempo devem estar na <b>mesma unidade</b>: taxa ao mês com tempo em meses. Em <b>1 período</b> os dois regimes dão o mesmo valor; depois, o composto supera o simples.</p>
<h3>Desconto de título</h3>
<ul><li><b>Desconto comercial (por fora):</b> D = N · i · n, sobre o <b>valor nominal</b> (N). Valor atual: N − D.</li><li><b>Desconto racional (por dentro):</b> sobre o valor atual.</li></ul>
<h3>Taxas</h3>
<ul><li><b>Taxa nominal:</b> declarada. <b>Taxa efetiva:</b> a que realmente incide no período de capitalização. <b>Taxas equivalentes:</b> geram o mesmo montante (juros compostos: (1+i_a) = (1+i_m)^12).</li></ul>
<h3>Teste rápido</h3><p>R$ 1.000 a 2% ao mês, juros simples, 5 meses. Juros? <b>Resposta:</b> 1.000 × 0,02 × 5 = R$ 100.</p>""",
 "Aplicam-se R$ 2.000,00 a 3% ao mês por 4 meses. Calcule o montante em juros simples e em juros compostos. Passo 1 (<b>simples</b>): J = 2.000 × 0,03 × 4 = <b>240</b>; M = 2.240. Passo 2 (<b>composto</b>): M = 2.000 × (1,03)^4 = 2.000 × 1,1255 ≈ <b>2.251,02</b>. Passo 3: o composto rende mais, porque os juros passam a render juros.",
 "(1) Anote C, i, n e confira as unidades. (2) Simples: J = C·i·n. (3) Composto: M = C(1+i)^n. (4) Desconto por fora: D = N·i·n; valor atual = N − D.",
 "Simples: juros sobre o inicial. Composto: juros sobre juros.")
teoria("cont_dem",
 """<p><b>Em uma frase:</b> as demonstrações contábeis resumem a situação da entidade: o Balanço mostra o patrimônio em uma data; a DRE mostra o resultado de um período.</p>
<div class="exemplo"><b>Analogia:</b> o balanço é uma foto; a DRE é um filme do período.</div>
<h3>Balanço Patrimonial (BP)</h3>
<ul><li><b>Ativo</b> = <b>Passivo + Patrimônio Líquido</b>.</li><li><b>Ativo circulante:</b> caixa, bancos, estoques, clientes (realizáveis em até 12 meses). <b>Não circulante:</b> realizável a longo prazo, investimentos, imobilizado, intangível.</li><li><b>Passivo circulante:</b> obrigações até 12 meses (fornecedores, salários). <b>Não circulante:</b> obrigações de longo prazo.</li></ul>
<h3>DRE (Demonstração do Resultado do Exercício)</h3>
<ol><li>Receita Bruta</li><li>(−) Deduções (impostos sobre vendas, devoluções) = <b>Receita Líquida</b></li><li>(−) Custo das Mercadorias Vendidas (CMV) = <b>Lucro Bruto</b></li><li>(−) Despesas operacionais = <b>Resultado operacional</b></li><li>Após impostos sobre o lucro: <b>Lucro (ou prejuízo) líquido</b></li></ol>
<h3>Regimes</h3>
<ul><li><b>Competência:</b> receitas e despesas entram no resultado quando <b>ocorrem</b>, independentemente do pagamento.</li><li><b>Caixa:</b> só quando há recebimento ou pagamento.</li></ul>
<h3>DFC</h3>
<ul><li>Demonstração dos Fluxos de Caixa: entradas e saídas de dinheiro por atividades operacionais, de investimento e de financiamento.</li></ul>
<h3>Teste rápido</h3><p>Receita bruta 1.000; deduções 100; CMV 400. Lucro bruto? <b>Resposta:</b> 1.000 − 100 − 400 = 500.</p>""",
 "Uma loja vendeu R$ 50.000 no mês, com R$ 5.000 de deduções, CMV de R$ 20.000 e despesas operacionais de R$ 12.000. Passo 1: receita líquida = 50.000 − 5.000 = <b>45.000</b>. Passo 2: lucro bruto = 45.000 − 20.000 = <b>25.000</b>. Passo 3: resultado operacional = 25.000 − 12.000 = <b>13.000</b>.",
 "(1) Monte a DRE de cima para baixo. (2) Ativo = Passivo + PL. (3) Competência: reconheça quando ocorre o fato, e não quando se paga.",
 "Balanço = foto; DRE = filme. Competência ignora o caixa.")
teoria("cont_conc",
 """<p><b>Em uma frase:</b> patrimônio é o conjunto de bens, direitos e obrigações de uma entidade; a equação patrimonial é <b>Ativo = Passivo + Patrimônio Líquido</b>.</p>
<div class="exemplo"><b>Analogia:</b> o que você tem (ativo) foi pago com dinheiro de terceiros (passivo) ou com o seu próprio (PL).</div>
<h3>Conceitos</h3>
<ul><li><b>Ativo:</b> recursos controlados que trazem benefícios futuros (bens e direitos): caixa, estoques, veículos, valores a receber.</li><li><b>Passivo:</b> obrigações exigíveis (dívidas com fornecedores, bancos, salários).</li><li><b>Patrimônio Líquido (PL):</b> o que sobra para os donos: <b>PL = Ativo − Passivo</b>. Contém capital social, reservas e lucros acumulados.</li></ul>
<h3>Situação líquida</h3>
<ul><li>PL positivo: ativo maior que o passivo. PL zero: igual. <b>PL negativo (passivo a descoberto):</b> as dívidas superam os bens.</li></ul>
<h3>Bens, direitos e obrigações</h3>
<ul><li><b>Bens:</b> coisas que se possui (móveis, imóveis, estoque). <b>Direitos:</b> valores a receber. <b>Obrigações:</b> valores a pagar.</li></ul>
<h3>Princípios e regimes (noções)</h3>
<ul><li><b>Entidade:</b> o patrimônio da empresa não se confunde com o dos sócios. <b>Continuidade:</b> presume-se que a entidade seguirá operando. <b>Competência:</b> reconhece fatos quando ocorrem.</li></ul>
<h3>Teste rápido</h3><p>Ativo de R$ 80.000 e passivo de R$ 50.000. Qual o PL? <b>Resposta:</b> R$ 30.000.</p>""",
 "Uma empresa tem: caixa 10.000; estoque 30.000; veículo 60.000; fornecedores a pagar 25.000; empréstimo 35.000. Qual é o PL? Passo 1: ativo = 10.000 + 30.000 + 60.000 = <b>100.000</b>. Passo 2: passivo = 25.000 + 35.000 = <b>60.000</b>. Passo 3: PL = ativo − passivo = 100.000 − 60.000 = <b>40.000</b>.",
 "(1) Some o ativo (bens e direitos). (2) Some o passivo (obrigações). (3) PL = Ativo − Passivo. (4) Passivo maior que ativo: PL negativo.",
 "A = P + PL. O que sobra depois de pagar tudo é do dono.")
teoria("cont_escrit",
 """<p><b>Em uma frase:</b> escrituração é o registro ordenado dos fatos contábeis pelo <b>método das partidas dobradas</b>: todo débito tem um crédito de igual valor.</p>
<div class="exemplo"><b>Analogia:</b> uma balança: todo lançamento põe o mesmo peso nos dois pratos.</div>
<h3>Partidas dobradas</h3>
<ul><li>Para cada lançamento: <b>total de débitos = total de créditos</b>.</li><li>Contas de <b>ativo</b> e de <b>despesa</b> têm saldo <b>devedor</b>. Contas de <b>passivo, patrimônio líquido e receita</b> têm saldo <b>credor</b>.</li><li>Aumenta o ativo: <b>debita</b>. Diminui o ativo: <b>credita</b>. Aumenta o passivo: <b>credita</b>. Diminui o passivo: <b>debita</b>.</li></ul>
<h3>Exemplos de lançamentos</h3>
<ul><li>Compra de mercadoria à vista: <b>D</b> Estoque / <b>C</b> Caixa.</li><li>Venda a prazo: <b>D</b> Clientes / <b>C</b> Receita de vendas.</li><li>Pagamento de salários: <b>D</b> Despesa com salários / <b>C</b> Caixa.</li></ul>
<h3>Livros</h3>
<ul><li><b>Livro Diário:</b> registra os fatos em ordem cronológica. <b>Livro Razão:</b> agrupa os lançamentos por conta.</li><li><b>Balancete de verificação:</b> lista os saldos das contas para conferir se débitos = créditos.</li></ul>
<h3>Teste rápido</h3><p>Compra de móveis à vista por R$ 2.000. Qual o lançamento? <b>Resposta:</b> D Móveis e utensílios / C Caixa, R$ 2.000.</p>""",
 "Registre: a empresa comprou R$ 3.000 de mercadorias a prazo. Passo 1: as mercadorias (estoque, ativo) aumentam: <b>debita Estoque</b>. Passo 2: a dívida com fornecedor (passivo) aumenta: <b>credita Fornecedores</b>. Passo 3: débito = crédito = 3.000. O lançamento fecha.",
 "(1) Identifique as duas contas envolvidas. (2) Ativo e despesa: debitam ao aumentar. Passivo, PL e receita: creditam ao aumentar. (3) Confira débito = crédito.",
 "Aumento de ativo: débito. Aumento de passivo e receita: crédito.")
teoria("cont_contas",
 """<p><b>Em uma frase:</b> contas patrimoniais (ativo, passivo e PL) mostram a situação; contas de resultado (receitas, despesas e custos) mostram o desempenho do período.</p>
<div class="exemplo"><b>Analogia:</b> as contas patrimoniais são o saldo da sua conta bancária; as de resultado são o extrato de entradas e saídas do mês.</div>
<h3>Contas patrimoniais</h3>
<ul><li>Ativo (caixa, bancos, estoques, clientes, imobilizado), Passivo (fornecedores, empréstimos, salários a pagar) e PL (capital social, reservas, lucros acumulados). <b>Permanecem</b> de um exercício para o outro.</li></ul>
<h3>Contas de resultado</h3>
<ul><li><b>Receitas:</b> aumentam o PL (vendas, receitas financeiras). <b>Despesas:</b> reduzem o PL (salários, aluguel). <b>Custos:</b> gastos para produzir ou comprar o que se vende (CMV).</li><li>São <b>encerradas</b> ao final do exercício, na apuração do resultado: o lucro ou prejuízo vai para o PL.</li></ul>
<h3>Despesa × custo × investimento</h3>
<ul><li><b>Custo:</b> ligado ao produto vendido. <b>Despesa:</b> ligada à administração e às vendas. <b>Investimento:</b> gasto que gera benefício futuro (vira ativo).</li></ul>
<h3>Plano de contas</h3>
<p>Lista organizada de todas as contas, com códigos. Facilita o registro padronizado.</p>
<h3>Teste rápido</h3><p>Aluguel pago do escritório é conta de: <b>Resposta:</b> despesa (resultado).</p>""",
 "Classifique: salários da administração; duplicatas a receber; capital social; receita de vendas; empréstimo bancário. Passo 1: salários da administração: <b>despesa</b> (resultado). Passo 2: duplicatas a receber: <b>ativo</b> (patrimonial). Passo 3: capital social: <b>PL</b>. Passo 4: receita de vendas: <b>receita</b> (resultado). Passo 5: empréstimo: <b>passivo</b>.",
 "(1) Pergunta-chave: a conta é saldo (patrimonial) ou movimento do período (resultado)? (2) Resultado: receitas, despesas e custos. (3) Ao fim do exercício as contas de resultado são encerradas.",
 "Patrimonial permanece; de resultado encerra no exercício.")
teoria("cont_mov",
 """<p><b>Em uma frase:</b> analisar movimentações financeiras é organizar entradas e saídas, conferir com o extrato e identificar padrões atípicos.</p>
<div class="exemplo"><b>Analogia:</b> é seguir o caminho do dinheiro: de onde veio, para onde foi, em que valor e quando.</div>
<h3>Organização</h3>
<ul><li>Registrar <b>data, valor, origem, destino e descrição</b> de cada movimento.</li><li><b>Conciliação bancária:</b> comparar o controle interno com o extrato do banco e explicar as diferenças (cheques não compensados, tarifas).</li><li><b>Fluxo de caixa:</b> entradas − saídas em cada período.</li></ul>
<h3>Padrões a observar</h3>
<ul><li><b>Movimentações recorrentes:</b> repetidas (salário, aluguel).</li><li><b>Fracionamento:</b> dividir um valor grande em várias operações menores, às vezes para fugir de controles.</li><li><b>Atípicas:</b> incompatíveis com o perfil (valor, horário, frequência).</li><li><b>Cruzamento:</b> relacionar movimentações de contas distintas, com destinos em comum.</li></ul>
<h3>Cuidados</h3>
<ul><li>Atipicidade é <b>indício</b>, não prova de crime.</li></ul>
<h3>Teste rápido</h3><p>Dividir R$ 50 mil em 10 depósitos de R$ 5 mil é: <b>Resposta:</b> fracionamento (padrão suspeito).</p>""",
 "Uma conta recebe 10 depósitos de R$ 4.900 em dois dias, e logo transfere tudo para uma única conta. Passo 1: os valores são iguais e próximos de um limite de controle: <b>fracionamento</b>. Passo 2: o destino único mostra <b>concentração</b>. Passo 3: cruzar com outras contas e com o perfil do titular. Passo 4: é um <b>indício</b> a investigar, sem concluir crime só por isso.",
 "(1) Organize: data, valor, origem, destino. (2) Concilie com o extrato. (3) Procure padrões: recorrência, fracionamento, concentração. (4) Trate como indício e confirme.",
 "Fracionamento e concentração são sinais; indício não é prova.")
teoria("cont_banco",
 """<p><b>Em uma frase:</b> o sistema bancário movimenta dinheiro por meios como PIX, TED e boleto; saber a origem e o destino dos recursos é essencial na análise.</p>
<div class="exemplo"><b>Analogia:</b> cada transferência é uma carta com remetente e destinatário: o extrato guarda as duas pontas.</div>
<h3>Meios de pagamento</h3>
<ul><li><b>PIX:</b> transferência instantânea, disponível todos os dias, a qualquer hora.</li><li><b>TED:</b> transferência eletrônica entre bancos, para valores de qualquer montante.</li><li><b>Boleto:</b> cobrança com código de barras. <b>Cartão de débito:</b> desconta na hora. <b>Cartão de crédito:</b> paga depois (fatura).</li></ul>
<h3>Extrato bancário</h3>
<ul><li>Mostra data, descrição, valor e saldo. <b>Crédito</b> = entrada na conta; <b>débito</b> = saída (visão do cliente).</li><li>Informa o <b>CPF/CNPJ</b>, o banco e a agência do outro lado, o que permite rastrear origem e destino.</li></ul>
<h3>Conceitos</h3>
<ul><li><b>Juros do cheque especial e do cartão rotativo</b> são altos.</li><li><b>Lavagem de dinheiro:</b> ocultar a origem ilícita de recursos (ocultação, dissimulação e integração).</li><li><b>COAF:</b> órgão que recebe comunicações de operações suspeitas.</li></ul>
<h3>Teste rápido</h3><p>Qual transferência é instantânea e funciona 24 horas por dia? <b>Resposta:</b> PIX.</p>""",
 "No extrato de um investigado: 'CRÉD PIX 2.000,00 – FULANO (CPF ***.123.456-**)'. Passo 1: é um <b>crédito</b>: entrada de R$ 2.000. Passo 2: a <b>origem</b> é Fulano, identificado pelo CPF parcial. Passo 3: peça ao banco os dados completos do remetente. Passo 4: cruze a origem com outras contas e datas.",
 "(1) No extrato do cliente: crédito entra; débito sai. (2) Identifique origem e destino pelos CPF/CNPJ e bancos. (3) PIX: instantâneo; TED: entre bancos. (4) Operação suspeita: comunicação ao COAF.",
 "Crédito entra; débito sai. PIX é instantâneo.")

MF, DM, CC, ES, CT, MV, BK = "cont_mf", "cont_dem", "cont_conc", "cont_escrit", "cont_contas", "cont_mov", "cont_banco"
# ---------- Matemática financeira (6, calculadas)
def j_simples():
    C, i, n = rnd.choice([1000, 2000, 5000, 8000]), rnd.choice([1, 2, 3, 4]), rnd.choice([4, 5, 6, 8, 10]); J = C * i * n / 100; M = C + J
    k = rnd.choice(["J", "M"])
    if k == "J":
        Q(MF, f"Um capital de {br(C)} é aplicado a juros simples, à taxa de {i}% ao mês, durante {n} meses. Os juros obtidos são de:", br(J),
          [(br(M), "é o montante (capital + juros)."), (br(C * ((1 + i / 100) ** n) - C), "calculou com juros compostos."), (br(C * i / 100), "considerou só um mês."), (br(J + C * i / 100), "somou um mês a mais.")],
          ["Juros simples: J = C · i · n.", f"J = {C} × {i / 100:g} × {n}.", f"<b>{br(J)}</b>."], "J = C·i·n.", "Calcular juros simples.")
    else:
        Q(MF, f"Um capital de {br(C)} é aplicado a juros simples, à taxa de {i}% ao mês, durante {n} meses. O montante no fim do período é:", br(M),
          [(br(J), "são só os juros; faltou somar o capital."), (br(C * ((1 + i / 100) ** n)), "calculou com juros compostos."), (br(C + C * i / 100), "considerou só um mês."), (br(M + C * i / 100), "somou um mês a mais.")],
          [f"Juros: J = {C} × {i / 100:g} × {n} = {br(J)}.", "Montante: M = C + J.", f"<b>{br(M)}</b>."], "M = C + J.", "Calcular o montante em juros simples.")
many(j_simples, 3)
def j_comp():
    C, i, n = rnd.choice([1000, 2000, 5000]), rnd.choice([10, 20]), rnd.choice([2, 3]); M = C * (1 + i / 100) ** n; Msimp = C * (1 + i * n / 100)
    Q(MF, f"Um capital de {br(C)} é aplicado a juros compostos, à taxa de {i}% ao ano, por {n} anos. O montante ao final do período é:", br(M),
      [(br(Msimp), "calculou com juros simples."), (br(C * (1 + i / 100) * n), "multiplicou por n, em vez de elevar a potência."), (br(M - C), "são os juros, sem o capital."), (br(C * (1 + i / 100) ** (n + 1)), "usou um período a mais.")],
      ["Juros compostos: M = C · (1 + i)^n.", f"M = {C} × (1 + {i / 100:g})^{n}.", f"<b>{br(M)}</b>."], "M = C(1+i)^n.", "Calcular o montante em juros compostos.")
many(j_comp, 2)
def desc():
    N, i, n = rnd.choice([2000, 5000, 10000]), rnd.choice([2, 3, 4]), rnd.choice([2, 3, 4, 5]); D = N * i * n / 100
    Q(MF, f"Um título de valor nominal {br(N)} é descontado {n} meses antes do vencimento, com desconto comercial simples (por fora) à taxa de {i}% ao mês. O valor do desconto é:", br(D),
      [(br(N - D), "é o valor atual (nominal menos desconto)."), (br(N * i / 100), "considerou só um mês."), (br(N * (1 + i * n / 100)), "usou como se fosse juros sobre o nominal."), (br(D + N * i / 100), "somou um mês a mais.")],
      ["Desconto comercial: D = N · i · n.", f"D = {N} × {i / 100:g} × {n}.", f"<b>{br(D)}</b>."], "Desconto por fora: D = N·i·n.", "Calcular desconto comercial.")
many(desc, 1)
# ---------- Demonstrações (3)
Q(DM, "Em uma empresa, a receita bruta foi de R$ 100.000, as deduções somaram R$ 10.000 e o custo das mercadorias vendidas foi de R$ 50.000. O lucro bruto é de:", "R$ 40.000,00",
  [("R$ 50.000,00", "é a receita bruta menos o CMV, sem as deduções."), ("R$ 90.000,00", "é a receita líquida."), ("R$ 60.000,00", "é a receita bruta menos as deduções e depois somou algo."), ("R$ 10.000,00", "são as deduções.")],
  ["Receita líquida = 100.000 − 10.000 = 90.000.", "Lucro bruto = receita líquida − CMV.", "90.000 − 50.000 = <b>40.000</b>."], "Lucro bruto = receita líquida − CMV.", "Calcular o lucro bruto.")
Q(DM, "No regime de competência, uma venda realizada em dezembro, com recebimento previsto para janeiro, deve ser reconhecida como receita:", "em dezembro, mês em que a venda ocorreu.",
  [("em janeiro, mês do recebimento.", "isso é o regime de caixa."), ("apenas quando o cliente pagar integralmente.", "isso ignora a competência."), ("no mês em que a nota for arquivada.", "o arquivamento não define o reconhecimento."), ("no próximo exercício social.", "não há motivo para adiar.")],
  ["Competência: reconhece-se quando o fato ocorre.", "A venda ocorreu em dezembro.", "O recebimento em janeiro não altera o mês da receita."], "Competência: quando ocorre; caixa: quando paga.", "Aplicar o regime de competência.")
Q(DM, "No Balanço Patrimonial, o ativo circulante é composto por bens e direitos:", "realizáveis, em regra, em até doze meses.",
  [("realizáveis somente após doze meses.", "isso é o ativo não circulante."), ("que nunca serão convertidos em dinheiro.", "não há essa classificação."), ("de propriedade dos sócios.", "isso se relaciona ao PL."), ("de natureza apenas tributária.", "o circulante inclui caixa, estoques e clientes.")],
  ["Circulante significa de curto prazo.", "O prazo de referência é de doze meses.", "Inclui caixa, bancos, estoques e valores a receber."], "Circulante: até 12 meses.", "Classificar o ativo circulante.")
# ---------- Conceitos (5)
Q(CC, "A equação fundamental do patrimônio é:", "Ativo = Passivo + Patrimônio Líquido.",
  [("Ativo = Passivo − Patrimônio Líquido.", "o sinal está trocado."), ("Passivo = Ativo + Patrimônio Líquido.", "inverte a equação."), ("Patrimônio Líquido = Ativo + Passivo.", "o PL é a diferença, não a soma."), ("Ativo = Receita − Despesa.", "isso se refere ao resultado.")],
  ["O ativo é financiado por capital de terceiros (passivo) e capital próprio (PL).", "A soma das duas fontes é igual ao ativo.", "A = P + PL."], "A = P + PL.", "Equação patrimonial.")
Q(CC, "Uma empresa tem ativo de R$ 120.000 e passivo exigível de R$ 80.000. Seu patrimônio líquido é de:", "R$ 40.000,00",
  [("R$ 200.000,00", "somou ativo e passivo."), ("R$ 80.000,00", "é o próprio passivo."), ("R$ 120.000,00", "é o ativo."), ("R$ 0,00", "o PL só seria zero se ativo e passivo fossem iguais.")],
  ["PL = Ativo − Passivo.", "120.000 − 80.000.", "PL = <b>40.000</b>."], "PL = A − P.", "Calcular o patrimônio líquido.")
Q(CC, "Quando o passivo exigível supera o valor do ativo, diz-se que a entidade apresenta:", "situação líquida negativa (passivo a descoberto).",
  [("situação líquida positiva.", "ocorreria se o ativo superasse o passivo."), ("situação líquida nula.", "ocorreria se fossem iguais."), ("lucro operacional.", "lucro é um resultado, não a situação líquida."), ("reserva de capital.", "é conta do PL.")],
  ["PL = Ativo − Passivo.", "Se o passivo é maior, o PL fica negativo.", "Chama-se passivo a descoberto."], "Passivo > ativo: PL negativo.", "Situação líquida negativa.")
Q(CC, "São exemplos de ‘direitos’ de uma empresa, no ativo:", "duplicatas a receber e valores depositados em banco.",
  [("fornecedores a pagar e empréstimos.", "são obrigações (passivo)."), ("capital social e reservas.", "são contas do PL."), ("salários a pagar e impostos a recolher.", "são obrigações."), ("despesas de aluguel.", "são contas de resultado.")],
  ["Direitos são valores que a empresa tem a receber ou dispõe.", "Duplicatas a receber e depósitos bancários são direitos.", "As demais opções são obrigações, PL ou resultado."], "Direitos: a receber ou disponíveis.", "Reconhecer direitos.")
Q(CC, "O princípio contábil da entidade estabelece que:", "o patrimônio da empresa não se confunde com o patrimônio pessoal dos sócios.",
  [("a empresa só pode existir enquanto os sócios viverem.", "isso é o oposto da continuidade."), ("os bens dos sócios fazem parte do ativo da empresa.", "o princípio os separa."), ("os fatos devem ser registrados apenas quando pagos.", "isso é o regime de caixa."), ("o lucro pertence exclusivamente aos credores.", "não é o princípio.")],
  ["A contabilidade trata a empresa como entidade distinta.", "Separa o patrimônio dela do patrimônio dos sócios.", "Esse é o princípio da entidade."], "Entidade: empresa ≠ sócios.", "Princípio da entidade.")
# ---------- Escrituração (4)
Q(ES, "No método das partidas dobradas, em todo lançamento contábil:", "o total dos débitos é igual ao total dos créditos.",
  [("o total dos débitos é sempre maior que o dos créditos.", "são sempre iguais."), ("só se debita, nunca se credita.", "sempre há débito e crédito."), ("o crédito é lançado só no passivo.", "não é regra."), ("o débito é sempre uma despesa.", "débito pode ser ativo, despesa ou redução de passivo.")],
  ["Todo fato afeta pelo menos duas contas.", "Uma é debitada e outra creditada, com o mesmo valor.", "Débitos = créditos."], "Partidas dobradas: D = C.", "Princípio das partidas dobradas.")
Q(ES, "A compra de mercadorias à vista, no valor de R$ 5.000, é registrada contabilmente com:", "débito em Estoques e crédito em Caixa.",
  [("débito em Caixa e crédito em Estoques.", "inverteu: o caixa diminui."), ("débito em Fornecedores e crédito em Estoques.", "não houve compra a prazo."), ("débito em Receita e crédito em Caixa.", "compra não é receita."), ("crédito em Estoques e crédito em Caixa.", "falta um débito.")],
  ["Os estoques aumentam: debita Estoques.", "O caixa diminui: credita Caixa.", "D Estoques / C Caixa, 5.000."], "Aumenta o ativo: débito. Diminui o ativo: crédito.", "Lançamento de compra à vista.")
Q(ES, "O livro contábil em que os fatos são registrados em ordem cronológica, dia a dia, é o:", "Livro Diário.",
  [("Livro Razão.", "agrupa os lançamentos por conta."), ("Balancete de verificação.", "lista saldos para conferência."), ("Livro Caixa.", "registra movimentações de caixa."), ("Livro de Atas.", "registra deliberações.")],
  ["Cronológico = em ordem de data.", "O Diário registra os lançamentos na ordem em que ocorrem.", "O Razão reúne por conta."], "Diário = cronológico; Razão = por conta.", "Livro Diário.")
Q(ES, "Em um balancete de verificação, a soma dos saldos devedores deve ser:", "igual à soma dos saldos credores.",
  [("maior que a dos credores.", "só se houver erro."), ("menor que a dos credores.", "só se houver erro."), ("igual ao lucro do período.", "não tem essa relação."), ("sempre igual a zero em cada conta.", "as contas têm saldos diversos.")],
  ["O balancete confere o método das partidas dobradas.", "Se todos os lançamentos foram corretos, débitos = créditos.", "Diferença indica erro."], "Balancete: débitos = créditos.", "Função do balancete.")
# ---------- Contas (6)
Q(CT, "A conta ‘Salários e Ordenados’ da administração é classificada como:", "conta de resultado (despesa).",
  [("conta patrimonial do ativo.", "não é bem nem direito."), ("conta patrimonial do passivo.", "o passivo é a obrigação 'salários a pagar'."), ("conta do patrimônio líquido.", "não é capital nem reserva."), ("conta de receita.", "salário é gasto, não receita.")],
  ["Salários são um gasto do período.", "Gastos de administração são despesas.", "Despesa é conta de resultado."], "Despesa: conta de resultado.", "Classificar a conta de salários.")
Q(CT, "A conta ‘Fornecedores’, representando dívidas com compra a prazo de mercadorias, é uma conta:", "patrimonial do passivo.",
  [("patrimonial do ativo.", "ativo são bens e direitos."), ("de receita.", "não é receita."), ("de despesa.", "a compra de mercadoria é custo, não a dívida."), ("do patrimônio líquido.", "não é capital nem reserva.")],
  ["Fornecedores é uma obrigação a pagar.", "Obrigações pertencem ao passivo.", "É conta patrimonial."], "Obrigação: passivo.", "Classificar a conta fornecedores.")
Q(CT, "Ao final do exercício social, as contas de resultado (receitas e despesas) são:", "encerradas, e o lucro ou prejuízo é transferido ao patrimônio líquido.",
  [("mantidas com os mesmos saldos no exercício seguinte.", "quem se mantém são as patrimoniais."), ("transferidas para o ativo.", "o resultado vai ao PL."), ("excluídas sem registro.", "são apuradas, não simplesmente excluídas."), ("somadas ao passivo exigível.", "o resultado vai ao PL.")],
  ["As contas de resultado medem o período.", "No fim do exercício, são apuradas e encerradas.", "O resultado (lucro ou prejuízo) vai para o PL."], "Resultado encerra e vai para o PL.", "Encerramento das contas de resultado.")
Q(CT, "A conta ‘Receita de Vendas’ aumenta o patrimônio líquido quando:", "é reconhecida pela entidade, na apuração do resultado.",
  [("é registrada como dívida.", "dívida é passivo."), ("a empresa compra mercadorias.", "compra é troca de ativos, sem receita."), ("a empresa paga fornecedores.", "pagamento é redução de ativo e de passivo."), ("o patrimônio líquido é distribuído.", "distribuição reduz o PL.")],
  ["Receita é um aumento do PL por atividade da empresa.", "Ao ser reconhecida, entra no resultado.", "O lucro final aumenta o PL."], "Receita aumenta o PL; despesa reduz.", "Efeito da receita no PL.")
Q(CT, "Entre as alternativas, a que apresenta apenas contas patrimoniais é:", "Caixa, Fornecedores e Capital Social.",
  [("Caixa, Receita de Vendas e Capital Social.", "Receita de Vendas é conta de resultado."), ("Aluguel (despesa), Estoques e Fornecedores.", "Aluguel é despesa."), ("Salários (despesa), Caixa e Capital Social.", "Salários é despesa."), ("Receita de Vendas, Despesa de Juros e Caixa.", "as duas primeiras são de resultado.")],
  ["Patrimoniais: ativo, passivo e PL.", "Caixa (ativo), Fornecedores (passivo) e Capital Social (PL).", "As demais opções misturam contas de resultado."], "Patrimonial = ativo, passivo, PL.", "Identificar contas patrimoniais.")
Q(CT, "O gasto com a compra das mercadorias que a empresa revende, apropriado ao resultado quando elas são vendidas, é denominado:", "custo das mercadorias vendidas (CMV).",
  [("despesa financeira.", "relaciona-se a juros e tarifas."), ("receita operacional.", "é entrada, não gasto."), ("investimento.", "é gasto que gera benefício futuro e vira ativo."), ("patrimônio líquido.", "é conta do PL.")],
  ["O custo está ligado ao produto vendido.", "A mercadoria comprada fica em estoque e, quando vendida, vira CMV.", "O CMV é deduzido da receita para achar o lucro bruto."], "Mercadoria vendida: CMV.", "Conceito de CMV.")
# ---------- Movimentações (5)
Q(MV, "A conciliação bancária consiste em:", "comparar os registros da empresa com o extrato do banco e explicar as diferenças.",
  [("transferir saldos entre contas da empresa.", "isso é transferência."), ("calcular os juros de uma aplicação.", "isso é matemática financeira."), ("cancelar movimentos suspeitos automaticamente.", "não é função da conciliação."), ("fechar a conta no banco.", "não é conciliação.")],
  ["Duas fontes: controle interno e extrato.", "Compara-se uma com a outra.", "As diferenças são explicadas (cheques não compensados, tarifas)."], "Conciliar = comparar e explicar diferenças.", "Conceito de conciliação bancária.")
Q(MV, "A divisão de um valor elevado em várias operações menores, feitas em curto intervalo, com o aparente objetivo de evitar controles, é conhecida como:", "fracionamento.",
  [("conciliação.", "é comparação de registros."), ("amortização.", "é o pagamento gradual de dívida."), ("capitalização.", "é a incorporação de juros ao capital."), ("depreciação.", "é a perda de valor de bens.")],
  ["O valor é repartido em partes menores.", "O objetivo pode ser fugir de limites de controle.", "Isso é fracionamento."], "Fracionar = dividir para fugir do controle.", "Reconhecer o fracionamento.")
Q(MV, "Em uma análise, ao se perceber que várias contas diferentes enviam recursos, em pequenos valores, a uma única conta de destino, o analista deve:", "tratar o padrão como indício, cruzar as informações e buscar outras evidências.",
  [("concluir imediatamente que houve crime.", "o padrão é indício; é preciso confirmar."), ("ignorar o padrão, por ser comum.", "o padrão merece investigação."), ("apagar os registros de origem.", "isso destruiria evidências."), ("alterar o saldo para equilibrar a conta.", "adulterar registros é inadmissível.")],
  ["Concentração de recursos é padrão a investigar.", "Isso é indício, não prova.", "Cruze com outras bases para confirmar."], "Padrão atípico = indício, não prova.", "Conduta diante de padrão atípico.")
Q(MV, "Para organizar movimentações financeiras com fins de análise, o conjunto mínimo de dados a registrar de cada operação é:", "data, valor, origem, destino e descrição.",
  [("apenas o valor.", "faltam data, origem e destino."), ("apenas a cor do cartão utilizado.", "não é dado relevante."), ("somente o nome do banco.", "é insuficiente."), ("apenas o horário.", "é insuficiente.")],
  ["Para rastrear um movimento é preciso saber quando, quanto, de onde e para onde.", "Também uma descrição para contexto.", "Isso forma a base da análise."], "Data, valor, origem, destino, descrição.", "Dados mínimos de uma movimentação.")
Q(MV, "A movimentação recorrente, em análise financeira, é aquela que:", "se repete com regularidade, como salário ou aluguel mensal.",
  [("ocorre uma única vez na vida.", "isso é pontual."), ("não tem valor definido.", "não é critério."), ("é sempre ilícita.", "recorrência é comum em atividades lícitas."), ("só ocorre à noite.", "horário não define recorrência.")],
  ["Recorrente é o que se repete.", "Exemplos: salário, aluguel, assinatura.", "A recorrência ajuda a separar o comum do atípico."], "Recorrente = periódica.", "Conceito de movimentação recorrente.")
# ---------- Sistema bancário (6)
Q(BK, "A transferência PIX caracteriza-se por:", "ser instantânea e estar disponível todos os dias, a qualquer hora.",
  [("só funcionar em dias úteis, em horário comercial.", "o PIX funciona 24 horas, todos os dias."), ("demorar dias para ser concluída.", "é instantânea."), ("exigir sempre a presença na agência.", "é eletrônica."), ("só poder ser feita entre contas do mesmo banco.", "funciona entre instituições diferentes.")],
  ["O PIX é um meio de pagamento instantâneo.", "Funciona 24 horas por dia, todos os dias.", "Entre instituições diferentes."], "PIX: instantâneo, 24h.", "Características do PIX.")
Q(BK, "Em um extrato bancário, um lançamento a crédito indica:", "uma entrada de recursos na conta do cliente.",
  [("uma saída de recursos da conta do cliente.", "isso é débito."), ("o encerramento da conta.", "não é o significado."), ("o pagamento de tarifas.", "tarifas são débitos."), ("a existência de dívida.", "não é o significado.")],
  ["Na visão do cliente, crédito é dinheiro entrando.", "Débito é dinheiro saindo.", "Resposta: entrada."], "Extrato: crédito entra; débito sai.", "Interpretar o extrato.")
Q(BK, "A análise de um extrato bancário permite identificar a origem e o destino de recursos porque, em regra, o extrato informa:", "o valor, a data e a identificação (como CPF/CNPJ e instituição) da outra parte da operação.",
  [("apenas o saldo final da conta.", "o extrato traz cada movimento."), ("a senha do titular.", "dados sigilosos não constam."), ("o endereço residencial de todas as partes.", "não consta em regra."), ("a cor do cartão do titular.", "não consta.")],
  ["O extrato lista cada movimentação.", "Cada linha pode trazer a identificação da contraparte.", "Isso permite rastrear origem e destino."], "Extrato traz data, valor e contraparte.", "Utilidade do extrato.")
Q(BK, "O crime de lavagem de dinheiro consiste em:", "ocultar ou dissimular a origem de bens e valores obtidos por meio de infração penal.",
  [("pagar impostos fora do prazo.", "isso é inadimplência."), ("emitir cheques sem fundos por distração.", "não é lavagem."), ("trocar moeda estrangeira em casa de câmbio autorizada.", "é operação lícita."), ("depositar o salário na conta pessoal.", "é operação lícita.")],
  ["O dinheiro tem origem ilícita.", "A lavagem tenta ocultar ou disfarçar essa origem.", "Para parecer dinheiro lícito."], "Lavagem = disfarçar a origem ilícita.", "Conceito de lavagem de dinheiro.")
Q(BK, "O órgão que recebe, examina e identifica comunicações de operações financeiras suspeitas no Brasil é o:", "COAF (Conselho de Controle de Atividades Financeiras).",
  [("IBGE.", "produz estatísticas oficiais."), ("INSS.", "cuida da previdência social."), ("Procon.", "protege o consumidor."), ("Anatel.", "regula telecomunicações.")],
  ["Bancos e outras entidades comunicam operações suspeitas.", "O órgão que recebe e analisa essas comunicações é o COAF.", "IBGE, INSS e Anatel têm outras funções."], "COAF = unidade de inteligência financeira.", "Função do COAF.")
Q(BK, "No cartão de crédito, o pagamento apenas do valor mínimo da fatura implica, em regra:", "incidência de juros elevados (rotativo) sobre o saldo restante.",
  [("quitação total da dívida.", "o mínimo não quita."), ("ausência de qualquer encargo.", "há juros sobre o saldo."), ("desconto automático de 50% do saldo.", "não há desconto."), ("cancelamento do cartão pelo banco.", "não é consequência automática.")],
  ["O mínimo paga só parte da fatura.", "O que sobra vira dívida com juros.", "Os juros do rotativo são altos."], "Pagar só o mínimo: juros altos.", "Efeito do pagamento mínimo.")
salvar()
