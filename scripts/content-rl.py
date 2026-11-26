#!/usr/bin/env python3
"""Raciocínio Lógico: teoria didática e 45 questões novas com respostas calculadas por programa. python3 scripts/content-rl.py"""
import sys, pathlib, random, math, itertools
from fractions import Fraction as Fr
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import qlib
from qlib import Q, teoria, salvar

rnd = random.Random(20261127)
def many(fn, n, tries=80):
    """executa fn até gerar n questões distintas"""
    got, seen = 0, set()
    for _ in range(tries):
        before = len(qlib.NEW)
        try:
            fn()
        except AssertionError:
            del qlib.NEW[before:]
            continue
        if len(qlib.NEW) > before:
            k = qlib.NEW[-1]["q"]
            if k in seen or any(x["q"] == k for x in qlib.NEW[:-1]):
                qlib.NEW.pop(); continue
            seen.add(k); got += 1
            if got == n: return
    raise SystemExit("não gerou questões suficientes para " + fn.__name__)
def n_(x):
    return (str(int(x)) + ",00" if float(x) == int(x) else f"{float(x):.2f}".replace(".", ","))

# ============================ TEORIA ============================
teoria("rl_prop",
 """<p><b>Em uma frase:</b> proposição é uma frase declarativa que pode ser julgada <b>verdadeira (V)</b> ou <b>falsa (F)</b>. Negar é dizer o contrário.</p>
<div class="exemplo"><b>Analogia:</b> o depoimento de uma testemunha: ou é verdadeiro ou é falso. 'Venha cedo!' e 'Quem chegou?' não são proposições.</div>
<h3>Os conectivos</h3>
<ul><li><b>Não (¬P):</b> inverte o valor.</li><li><b>E (P ∧ Q):</b> verdadeira só se <b>as duas</b> forem verdadeiras.</li><li><b>Ou (P ∨ Q):</b> falsa só se <b>as duas</b> forem falsas.</li></ul>
<h3>Negações que mais caem</h3>
<ul><li><b>¬(P e Q)</b> = ¬P <b>ou</b> ¬Q (De Morgan).</li><li><b>¬(P ou Q)</b> = ¬P <b>e</b> ¬Q.</li>
<li><b>¬(Todo A é B)</b> = <b>Algum</b> A <b>não</b> é B.</li><li><b>¬(Algum A é B)</b> = <b>Nenhum</b> A é B.</li><li><b>¬(Nenhum A é B)</b> = <b>Algum</b> A é B.</li></ul>
<h3>Armadilha</h3>
<p>A negação de 'Todos são' <b>não</b> é 'Nenhum é'. Para negar 'Todos', basta um que não seja.</p>
<h3>Teste rápido</h3><p>Negação de 'O suspeito estava armado e fugiu'? <b>Resposta:</b> O suspeito não estava armado <b>ou</b> não fugiu.</p>""",
 "Negue: 'Todos os agentes participaram do treinamento.' Passo 1: a frase afirma algo sobre <b>todos</b>. Passo 2: para ser falsa, basta <b>um</b> agente que não participou. Passo 3: negação: <b>'Algum agente não participou do treinamento.'</b> (e não 'Nenhum agente participou').",
 "(1) Identifique os conectivos e quantificadores. (2) Troque e↔ou e negue cada parte (De Morgan). (3) Todo ↔ Algum...não; Algum ↔ Nenhum. (4) Teste com um caso concreto.",
 "Negou 'e'? vira 'ou'. Negou 'todo'? vira 'algum não'.")
teoria("rl_cond",
 """<p><b>Em uma frase:</b> a condicional <b>'Se P, então Q'</b> só é falsa quando P é verdadeira e Q é falsa.</p>
<div class="exemplo"><b>Analogia:</b> uma promessa: 'Se o suspeito confessar, o inquérito será arquivado'. Só quebro a promessa se ele confessar e o inquérito não for arquivado.</div>
<h3>Equivalências da condicional (P → Q)</h3>
<ul><li><b>Contrapositiva:</b> 'Se não Q, então não P'. É equivalente.</li><li><b>Ou:</b> '<b>não P</b> ou Q'. É equivalente.</li></ul>
<h3>Negação da condicional</h3>
<p>¬(P → Q) = <b>P e não Q</b>. Mantém o primeiro, nega o segundo, troca 'se...então' por 'e'.</p>
<h3>Não são equivalentes</h3>
<ul><li><b>Recíproca:</b> Q → P.</li><li><b>Inversa:</b> ¬P → ¬Q.</li></ul>
<h3>Bicondicional (P ↔ Q)</h3>
<p>'P se e somente se Q' é verdadeira quando P e Q têm o <b>mesmo valor</b>.</p>
<h3>Teste rápido</h3><p>Equivalente a 'Se o mandado é válido, a busca é legal'? <b>Resposta:</b> 'Se a busca não é legal, o mandado não é válido' (contrapositiva).</p>""",
 "Dê a negação de 'Se o suspeito confessar, então o inquérito será arquivado.' Passo 1: negação da condicional é <b>P e não Q</b>. Passo 2: P = 'o suspeito confessar'; Q = 'o inquérito será arquivado'. Passo 3: negação: <b>'O suspeito confessou e o inquérito não será arquivado.'</b>",
 "(1) Marque P e Q. (2) Condicional: contrapositiva (se não Q, não P) ou 'não P ou Q' são equivalentes. (3) Negação: P e não Q. (4) Recíproca e inversa NÃO são equivalentes.",
 "Condicional só é falsa em V→F. Negação: P e não Q.")
teoria("rl_conj",
 """<p><b>Em uma frase:</b> conjuntos e diagramas de Venn organizam grupos que se sobrepõem para contar elementos sem contar ninguém duas vezes.</p>
<div class="exemplo"><b>Analogia:</b> dois cursos de capacitação com alunos em comum: quem fez os dois não pode ser contado duas vezes.</div>
<h3>A fórmula-chave</h3>
<p><b>n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</b></p>
<ul><li><b>Só A</b> = n(A) − n(A ∩ B).</li><li><b>Nenhum dos dois</b> = total − n(A ∪ B).</li></ul>
<h3>Três conjuntos</h3>
<p>n(A ∪ B ∪ C) = A + B + C − (A∩B) − (A∩C) − (B∩C) + (A∩B∩C)</p>
<h3>Como montar</h3>
<ol><li>Comece pelo centro (interseção tripla).</li><li>Ande para as interseções duplas (subtraindo o centro).</li><li>Depois as partes só de um conjunto.</li><li>Por fim, 'nenhum' = total − união.</li></ol>
<h3>Teste rápido</h3><p>Em 100 policiais, 50 têm curso A, 40 têm curso B e 15 têm os dois. Quantos têm algum curso? <b>Resposta:</b> 50 + 40 − 15 = 75.</p>""",
 "Em 120 ocorrências, 70 envolveram arma de fogo (A), 50 ocorreram à noite (N) e 20 reuniram as duas. Quantas não tiveram nenhuma? Passo 1: união: 70 + 50 − 20 = <b>100</b>. Passo 2: nenhuma = 120 − 100 = <b>20</b>.",
 "(1) Desenhe os círculos. (2) Preencha de dentro para fora (interseção tripla, duplas, só um). (3) Some tudo e compare com o total para achar 'nenhum'.",
 "Quem está nos dois conjuntos aparece duas vezes na soma: subtraia uma vez.")
teoria("rl_comb",
 """<p><b>Em uma frase:</b> análise combinatória conta possibilidades; probabilidade é <b>favoráveis ÷ possíveis</b>.</p>
<div class="exemplo"><b>Analogia:</b> formar uma equipe: se a ordem não importa, é combinação; se há funções diferentes, é arranjo.</div>
<h3>Princípio multiplicativo</h3><p>Etapas independentes: <b>multiplique</b> as opções. 3 camisas × 2 calças = 6.</p>
<h3>Quando usar o quê</h3>
<ul><li><b>Permutação:</b> ordenar todos. n! (5 pessoas em fila: 120).</li><li><b>Arranjo:</b> escolher e <b>ordenar</b> (funções diferentes). A(n,p) = n!/(n−p)!.</li><li><b>Combinação:</b> escolher <b>sem ordem</b> (comissão). C(n,p) = n!/(p!(n−p)!).</li><li><b>Permutação com repetição:</b> n!/(a!·b!...) (anagramas).</li></ul>
<h3>Probabilidade</h3>
<ul><li>P = casos favoráveis ÷ casos possíveis.</li><li>'Pelo menos um' = 1 − P(nenhum).</li><li>Sem reposição: o total diminui a cada retirada.</li></ul>
<h3>Teste rápido</h3><p>Comissão de 3 entre 8: C(8,3) = ? <b>Resposta:</b> 56.</p>""",
 "De 8 policiais, escolher 3 para uma equipe, com um Coordenador, um Relator e um Auxiliar. Passo 1: as funções são <b>diferentes</b>: a ordem importa, é arranjo. Passo 2: A(8,3) = 8 × 7 × 6 = <b>336</b>.",
 "(1) A ordem importa? Sim: arranjo ou permutação. Não: combinação. (2) Há repetição de elementos? Divida pelas repetições. (3) Probabilidade: conte favoráveis e possíveis com o mesmo método.",
 "Funções diferentes: arranjo. Comissão sem função: combinação.")
teoria("rl_seq",
 """<p><b>Em uma frase:</b> sequências seguem uma regra; descobrir a regra é achar o próximo termo. Calendário usa o resto da divisão por 7.</p>
<div class="exemplo"><b>Analogia:</b> as parcelas de uma prestação que sobe R$ 20 por mês: a regra é somar 20.</div>
<h3>Progressão aritmética (PA)</h3>
<ul><li>Soma uma razão r. <b>aₙ = a₁ + (n − 1)·r</b>.</li><li>Soma dos n termos: <b>S = n·(a₁ + aₙ) ÷ 2</b>.</li></ul>
<h3>Progressão geométrica (PG)</h3>
<ul><li>Multiplica por uma razão q. <b>aₙ = a₁ · q^(n−1)</b>.</li></ul>
<h3>Quando não é PA nem PG</h3>
<ul><li>Veja as <b>diferenças</b> entre termos: se elas formam uma PA (2, 4, 6...), a sequência é de 2ª ordem.</li><li>Veja se há dois padrões alternados.</li></ul>
<h3>Calendário</h3>
<p>Uma semana tem 7 dias. Para saber o dia daqui a N dias, divida N por 7 e use o <b>resto</b>: avance o resto no calendário.</p>
<h3>Teste rápido</h3><p>PA com a₁ = 5 e r = 3. Qual é a₁₀? <b>Resposta:</b> 5 + 9·3 = 32.</p>""",
 "Hoje é terça-feira. Que dia da semana será daqui a 100 dias? Passo 1: 100 ÷ 7 = 14, resto <b>2</b>. Passo 2: avance 2 dias a partir de terça. Passo 3: terça → quarta → <b>quinta-feira</b>.",
 "(1) Calcule as diferenças; se constantes, é PA. (2) Calcule as razões; se constantes, é PG. (3) Se as diferenças crescem em PA, siga o padrão. (4) Em calendário, use o resto da divisão por 7.",
 "Resto da divisão por 7 resolve qualquer questão de calendário.")
teoria("rl_pct",
 """<p><b>Em uma frase:</b> porcentagem é uma fração de 100; razão compara duas grandezas; proporção iguala duas razões.</p>
<div class="exemplo"><b>Analogia:</b> 25% é 25 em cada 100, ou 1 em cada 4.</div>
<h3>Fórmulas de bolso</h3>
<ul><li><b>x% de N</b> = N × x ÷ 100.</li><li><b>Aumento de x%:</b> multiplique por <b>(1 + x/100)</b>. <b>Desconto de x%:</b> por <b>(1 − x/100)</b>.</li><li><b>Variações sucessivas:</b> multiplique os fatores. +20% e depois −20%: 1,2 × 0,8 = 0,96 (queda de 4%).</li></ul>
<h3>Regra de três</h3>
<ul><li><b>Simples direta:</b> mais, mais. <b>Inversa:</b> mais, menos (agentes × dias).</li><li><b>Composta:</b> compare cada grandeza com a que tem a incógnita.</li></ul>
<h3>Razão e proporção</h3><p>'5 agentes para cada 2 escrivães' é a razão 5/2. Se há 35 agentes, escrivães = 35 × 2 ÷ 5 = 14.</p>
<h3>Armadilha</h3><p>Aumento de 20% seguido de desconto de 20% <b>não volta</b> ao valor inicial.</p>
<h3>Teste rápido</h3><p>30% de 800? <b>Resposta:</b> 240.</p>""",
 "Um produto de R$ 200,00 sobe 20% e depois cai 20%. Qual é o preço final? Passo 1: após +20%: 200 × 1,2 = <b>240</b>. Passo 2: depois −20%: 240 × 0,8 = <b>192</b>. Passo 3: preço final <b>R$ 192,00</b>, menor que o inicial.",
 "(1) Converta porcentagens em fatores (1,2; 0,8). (2) Multiplique fatores em variações sucessivas. (3) Regra de três: monte a tabela e decida direta ou inversa. (4) Razão: divida e simplifique.",
 "Aumentou 20%? × 1,2. Caiu 20%? × 0,8. Nunca some e subtraia percentuais sucessivos.")

P, Cd, Cj, Cb, Sq, Pc = "rl_prop", "rl_cond", "rl_conj", "rl_comb", "rl_seq", "rl_pct"
FATOS = [("o suspeito estava armado", "o suspeito não estava armado"), ("o mandado é válido", "o mandado não é válido"), ("o agente chegou cedo", "o agente não chegou cedo"),
         ("a perícia foi concluída", "a perícia não foi concluída"), ("a testemunha confirmou o álibi", "a testemunha não confirmou o álibi"), ("o inquérito foi arquivado", "o inquérito não foi arquivado"),
         ("a viatura foi abastecida", "a viatura não foi abastecida"), ("o documento foi assinado", "o documento não foi assinado")]
def cap(s): return s[0].upper() + s[1:] + "."

# ---------------- Proposições e negação ----------------
def neg_ou_e():
    (a, na), (b, nb) = rnd.sample(FATOS, 2); e = rnd.choice([True, False])
    conn, nconn = ("e", "ou") if e else ("ou", "e")
    Q(P, f"Considere a proposição: “{cap(a)[:-1][0].upper()+cap(a)[1:-1]} {conn} {b}.” A negação dessa proposição é:", cap(f"{na} {nconn} {nb}")[0].upper() + cap(f"{na} {nconn} {nb}")[1:],
      [(cap(f"{na} {conn} {nb}")[0].upper() + cap(f"{na} {conn} {nb}")[1:], f"negou as duas partes, mas manteve o '{conn}'; é preciso trocar por '{nconn}'."), (cap(f"{a} {nconn} {b}")[0].upper() + cap(f"{a} {nconn} {b}")[1:], "trocou o conectivo, mas não negou as partes."),
       (cap(f"{na} {nconn} {b}")[0].upper() + cap(f"{na} {nconn} {b}")[1:], "negou só a primeira parte."), (cap(f"{a} {conn} {nb}")[0].upper() + cap(f"{a} {conn} {nb}")[1:], "negou só a segunda parte e manteve o conectivo.")],
      ["Lei de De Morgan: a negação de '" + conn + "' troca o conectivo por '" + nconn + "'.", "E nega cada parte: não-A e não-B, trocando o conectivo.", f"Negação: <b>{na} {nconn} {nb}</b>."],
      "De Morgan: nega as partes e troca e↔ou.", "Negar uma proposição composta.")
many(neg_ou_e, 3)
QUANT = [
 ("todo", "Todos os agentes participaram do treinamento.", "Algum agente não participou do treinamento.",
  [("Nenhum agente participou do treinamento.", "'Nenhum' é forte demais: para negar 'todos' basta um que não tenha participado."), ("Todos os agentes não participaram do treinamento.", "equivale a 'nenhum', e não à negação de 'todos'."), ("Alguns agentes participaram do treinamento.", "é compatível com 'todos': não contradiz a frase."), ("Quase todos os agentes participaram do treinamento.", "não contradiz 'todos' com precisão.")]),
 ("todo", "Todos os documentos foram assinados.", "Algum documento não foi assinado.",
  [("Nenhum documento foi assinado.", "'Nenhum' é forte demais: basta um sem assinatura para negar 'todos'."), ("Todos os documentos deixaram de ser assinados.", "equivale a 'nenhum foi assinado'."), ("Alguns documentos foram assinados.", "é compatível com 'todos'."), ("Muitos documentos foram assinados.", "quantidade vaga que não nega 'todos'.")]),
 ("todo", "Todos os veículos apreendidos estavam regularizados.", "Algum veículo apreendido não estava regularizado.",
  [("Nenhum veículo apreendido estava regularizado.", "'Nenhum' é mais forte que a negação."), ("Todos os veículos apreendidos não estavam regularizados.", "equivale a 'nenhum estava regularizado'."), ("Alguns veículos apreendidos estavam regularizados.", "é compatível com 'todos'."), ("Quase todos os veículos apreendidos estavam regularizados.", "não contradiz 'todos' com precisão.")]),
 ("algum", "Algum documento foi assinado.", "Nenhum documento foi assinado.",
  [("Algum documento não foi assinado.", "'algum não' é compatível com 'algum sim': não nega a frase."), ("Todos os documentos foram assinados.", "reforça a frase, não a nega."), ("Quase todos os documentos foram assinados.", "continua afirmando que algum foi assinado."), ("Alguns documentos foram assinados.", "mantém a afirmação.")]),
 ("algum", "Algum agente participou do treinamento.", "Nenhum agente participou do treinamento.",
  [("Algum agente não participou do treinamento.", "é compatível com a frase original."), ("Todos os agentes participaram do treinamento.", "reforça a frase."), ("Muitos agentes participaram do treinamento.", "continua afirmando que algum participou."), ("Alguns agentes participaram do treinamento.", "mantém a afirmação.")]),
 ("nenhum", "Nenhum veículo foi apreendido na operação.", "Algum veículo foi apreendido na operação.",
  [("Todos os veículos foram apreendidos na operação.", "'todos' é mais forte que a negação de 'nenhum'."), ("Algum veículo não foi apreendido na operação.", "é compatível com 'nenhum foi apreendido'."), ("Nenhum veículo deixou de ser apreendido na operação.", "equivale a 'todos foram apreendidos'."), ("Quase nenhum veículo foi apreendido na operação.", "continua compatível com a frase original.")]),
 ("nenhum", "Nenhum investigador concluiu o curso.", "Algum investigador concluiu o curso.",
  [("Todos os investigadores concluíram o curso.", "'todos' é mais forte que a negação."), ("Algum investigador não concluiu o curso.", "é compatível com 'nenhum concluiu'."), ("Nenhum investigador deixou de concluir o curso.", "equivale a 'todos concluíram'."), ("Quase nenhum investigador concluiu o curso.", "continua compatível com a frase original.")]),
]
_qi = [0]
def neg_quant():
    tipo, frase, right, wr = QUANT[_qi[0] % len(QUANT)]; _qi[0] += 1
    Q(P, f"Considere a proposição: “{frase}” A negação dessa proposição é:", right, wr,
      ["Negação de 'Todo' é 'Algum...não'; de 'Algum' é 'Nenhum'; de 'Nenhum' é 'Algum'.", "Identifique o quantificador da frase.", f"Negação: <b>{right}</b>"],
      "Todo ↔ algum não; algum ↔ nenhum.", "Negar frases com quantificador.")
many(neg_quant, 3)
def valor_logico():
    p, q_ = rnd.choice([True, False]), rnd.choice([True, False]); V = lambda x: "V" if x else "F"
    expr = rnd.choice([("(P ∧ Q) ∨ ¬Q", lambda p, q: (p and q) or (not q)), ("¬P ∨ Q", lambda p, q: (not p) or q), ("P ∧ ¬Q", lambda p, q: p and (not q)), ("¬(P ∨ Q)", lambda p, q: not (p or q))])
    r = expr[1](p, q_)
    Q(P, f"Sabendo que a proposição P é {'verdadeira' if p else 'falsa'} e que a proposição Q é {'verdadeira' if q_ else 'falsa'}, o valor lógico da proposição composta {expr[0]} é:", "verdadeiro" if r else "falso",
      [("verdadeiro" if not r else "falso", "troca o resultado: refaça a tabela."), ("indeterminado, pois faltam dados", "P e Q já têm valor: dá para calcular."), ("verdadeiro apenas se P e Q forem iguais", "a regra depende dos conectivos, não da igualdade de P e Q."), ("contingente", "com P e Q conhecidos, o valor é único.")],
      [f"P = {V(p)} e Q = {V(q_)}.", "Resolva primeiro as negações e os parênteses.", f"Resultado: <b>{'verdadeiro' if r else 'falso'}</b>."],
      "Substitua os valores e resolva de dentro para fora.", "Calcular o valor lógico de uma proposição composta.")
many(valor_logico, 2)
Q(P, "A proposição “O inquérito foi aberto ou o inquérito não foi aberto” é classificada como:", "tautologia, pois é sempre verdadeira.",
  [("contradição, pois é sempre falsa.", "a contradição seria 'foi aberto e não foi aberto'."), ("contingência, pois depende dos fatos.", "um dos dois lados é sempre verdadeiro."), ("proposição simples.", "tem conectivo 'ou': é composta."), ("equivalente à negação de si mesma.", "é sempre verdadeira; sua negação é sempre falsa.")],
  ["A forma é 'P ou não P'.", "Se P é V, o 'ou' é V; se P é F, 'não P' é V.", "Nos dois casos é verdadeira: tautologia."],
  "P ou não P: sempre verdadeira.", "Classificar uma proposição.")

# ---------------- Condicionais e equivalências ----------------
def cond_neg():
    (a, na), (b, nb) = rnd.sample(FATOS, 2)
    A = a[0].upper() + a[1:]
    Q(Cd, f"A negação da proposição “Se {a}, então {b}” é:", f"{A} e {nb}.",
      [(f"Se {na}, então {nb}.", "negou as duas partes mas manteve a condicional: não é a negação."), (f"Se {b}, então {a}.", "é a recíproca, que não é negação."), (f"{A} ou {nb}.", "a negação usa 'e', não 'ou'."), (f"Se {nb}, então {na}.", "é a contrapositiva: equivalente à original, não sua negação.")],
      ["Negação da condicional: <b>P e não Q</b>.", "Mantém a primeira parte e nega a segunda, trocando 'se...então' por 'e'.", f"{A} e {nb}."],
      "¬(P→Q) = P e não Q.", "Negar a condicional.")
many(cond_neg, 3)
def cond_equiv():
    (a, na), (b, nb) = rnd.sample(FATOS, 2)
    Q(Cd, f"Uma proposição equivalente a “Se {a}, então {b}” é:", f"Se {nb}, então {na}.",
      [(f"Se {b}, então {a}.", "é a recíproca, não equivalente."), (f"Se {na}, então {nb}.", "é a inversa, não equivalente."), (f"{a[0].upper()+a[1:]} e {nb}.", "é a negação da condicional."), (f"{a[0].upper()+a[1:]} ou {b}.", "'P ou Q' não é equivalente a 'se P então Q'; o certo seria 'não P ou Q'.")],
      ["Contrapositiva: 'Se não Q, então não P'.", "Nega e inverte as duas partes.", f"Se {nb}, então {na}."],
      "Contrapositiva é a equivalência da condicional.", "Reconhecer a contrapositiva.")
many(cond_equiv, 2)
def cond_ou():
    (a, na), (b, nb) = rnd.sample(FATOS, 2)
    Q(Cd, f"A proposição “Se {a}, então {b}” é equivalente a:", f"{na[0].upper()+na[1:]} ou {b}.",
      [(f"{a[0].upper()+a[1:]} ou {b}.", "faltou negar P."), (f"{na[0].upper()+na[1:]} e {b}.", "o conectivo correto é 'ou'."), (f"{a[0].upper()+a[1:]} e {nb}.", "é a negação da condicional."), (f"{na[0].upper()+na[1:]} ou {nb}.", "negou também Q: não é equivalente.")],
      ["P → Q ≡ ¬P ∨ Q.", "Nega-se o antecedente e liga-se ao consequente por 'ou'.", f"{na[0].upper()+na[1:]} ou {b}."],
      "P → Q ≡ não P ou Q.", "Equivalência com 'ou'.")
many(cond_ou, 1)
def cond_valor():
    p, q_ = rnd.choice([(True, False), (True, True), (False, True), (False, False)])
    r = (not p) or q_
    Q(Cd, f"Se P é {'verdadeira' if p else 'falsa'} e Q é {'verdadeira' if q_ else 'falsa'}, a proposição condicional “Se P, então Q” é:", "verdadeira" if r else "falsa",
      [("falsa" if r else "verdadeira", "a condicional só é falsa quando P é V e Q é F."), ("indeterminada", "com P e Q conhecidos, o valor é único."), ("verdadeira somente se Q for falsa", "a regra não é essa."), ("verdadeira somente se P for verdadeira", "com P falsa a condicional é verdadeira.")],
      ["A condicional só é falsa em <b>V → F</b>.", f"Aqui P = {'V' if p else 'F'} e Q = {'V' if q_ else 'F'}.", f"A condicional é <b>{'verdadeira' if r else 'falsa'}</b>."],
      "Condicional falsa só em V→F.", "Valor lógico da condicional.")
many(cond_valor, 2)

# ---------------- Conjuntos ----------------
def venn2():
    n = rnd.choice([100, 120, 150, 200]); a, b = rnd.randint(30, 80), rnd.randint(30, 70); ab = rnd.randint(8, min(a, b) - 5)
    assert a + b - ab <= n - 5
    uni = a + b - ab; nenhum = n - uni; so_a = a - ab
    kind = rnd.choice(["uniao", "nenhum", "soa"])
    if kind == "uniao":
        Q(Cj, f"Em um grupo de {n} policiais, {a} possuem curso de tiro, {b} possuem curso de direção defensiva e {ab} possuem os dois cursos. O número de policiais que possuem pelo menos um dos cursos é:", str(uni),
          [(str(a + b), "somou sem descontar os que têm os dois cursos."), (str(uni + ab), "somou a interseção em vez de subtrair."), (str(nenhum), "é quem não tem nenhum curso."), (str(so_a), "é só quem tem o curso de tiro.")],
          ["União: n(A ∪ B) = n(A) + n(B) − n(A ∩ B).", f"{a} + {b} − {ab}.", f"<b>{uni}</b>."], "União = soma − interseção.", "Calcular a união de dois conjuntos.")
    elif kind == "nenhum":
        Q(Cj, f"Em um grupo de {n} policiais, {a} possuem curso de tiro, {b} possuem curso de direção defensiva e {ab} possuem os dois cursos. O número de policiais que não possuem nenhum dos dois cursos é:", str(nenhum),
          [(str(n - a - b), "subtraiu sem devolver a interseção (os dois cursos contados duas vezes)."), (str(uni), "é quem tem pelo menos um curso."), (str(n - a), "é quem não tem o curso de tiro."), (str(nenhum + ab), "somou a interseção sem necessidade.")],
          [f"União: {a} + {b} − {ab} = {uni}.", f"Nenhum = total − união = {n} − {uni}.", f"<b>{nenhum}</b>."], "Nenhum = total − união.", "Calcular quem não está em nenhum conjunto.")
    else:
        Q(Cj, f"Em um grupo de {n} policiais, {a} possuem curso de tiro, {b} possuem curso de direção defensiva e {ab} possuem os dois cursos. O número de policiais que possuem APENAS o curso de tiro é:", str(so_a),
          [(str(a), "inclui quem tem também o outro curso."), (str(b - ab), "é quem tem apenas direção defensiva."), (str(a + b - ab), "é a união."), (str(ab), "é a interseção.")],
          [f"Só tiro = n(A) − n(A ∩ B).", f"{a} − {ab}.", f"<b>{so_a}</b>."], "Só A = A − interseção.", "Calcular quem tem apenas um curso.")
many(venn2, 6)
def venn3():
    n = rnd.choice([150, 200]); a, b, c = rnd.randint(50, 80), rnd.randint(40, 70), rnd.randint(30, 60)
    ab, ac, bc, abc = rnd.randint(10, 20), rnd.randint(8, 18), rnd.randint(6, 16), rnd.randint(3, 6)
    uni = a + b + c - ab - ac - bc + abc; assert uni < n
    Q(Cj, f"Em {n} ocorrências, {a} envolveram arma de fogo (A), {b} ocorreram à noite (N) e {c} aconteceram em área rural (R). Houve {ab} com A e N, {ac} com A e R, {bc} com N e R e {abc} com as três características. O número de ocorrências com pelo menos uma das três é:", str(uni),
      [(str(a + b + c), "soma simples: conta várias vezes as ocorrências com mais de uma característica."), (str(a + b + c - ab - ac - bc), "subtraiu as interseções duplas mas esqueceu de somar a tripla."), (str(n - uni), "é quem não tem nenhuma das três."), (str(uni + abc), "somou a interseção tripla duas vezes.")],
      ["Inclusão-exclusão: A + N + R − (A∩N) − (A∩R) − (N∩R) + (A∩N∩R).", f"{a} + {b} + {c} − {ab} − {ac} − {bc} + {abc}.", f"<b>{uni}</b>."],
      "Três conjuntos: soma, subtrai as duplas e soma a tripla.", "Inclusão-exclusão para três conjuntos.")
many(venn3, 2)

# ---------------- Contagem e probabilidade ----------------
def comb_arr():
    n = rnd.randint(6, 10); p = 3; a = math.perm(n, p); c = math.comb(n, p)
    Q(Cb, f"De um grupo de {n} peritos serão escolhidos {p} para ocupar, em uma operação, as funções distintas de coordenador, relator e auxiliar. O número de maneiras de fazer essa escolha é:", str(a),
      [(str(c), "é a combinação: não considera que as funções são diferentes."), (str(n ** p), "permitiria o mesmo perito em mais de uma função."), (str(n * p), "multiplicou n por p."), (str(math.factorial(n)), "é n!, ordenando todos os peritos.")],
      ["Funções diferentes: a ordem importa, é arranjo.", f"A({n},{p}) = {' × '.join(str(n - i) for i in range(p))}.", f"<b>{a}</b>."], "Funções diferentes: arranjo.", "Arranjo A(n, p).")
many(comb_arr, 2)
def comb_comb():
    h, m = rnd.randint(4, 7), rnd.randint(3, 6); k1, k2 = 2, 2; r = math.comb(h, k1) * math.comb(m, k2)
    Q(Cb, f"Uma equipe deve ter {k1} agentes escolhidos entre {h} e {k2} escrivães escolhidos entre {m}. O número de equipes possíveis é:", str(r),
      [(str(math.comb(h + m, k1 + k2)), "ignorou a divisão por categoria: escolheu 4 entre todos."), (str(h * m), "escolheu 1 de cada categoria."), (str(math.comb(h, k1) + math.comb(m, k2)), "somou onde devia multiplicar."), (str(math.perm(h, k1) * math.perm(m, k2)), "usou arranjo: aqui a ordem não importa.")],
      [f"Agentes: C({h},{k1}) = {math.comb(h, k1)}.", f"Escrivães: C({m},{k2}) = {math.comb(m, k2)}.", f"Etapas independentes: {math.comb(h, k1)} × {math.comb(m, k2)} = <b>{r}</b>."], "Escolhas em etapas: multiplique as combinações.", "Combinações em duas etapas.")
many(comb_comb, 2)
def comb_anagrama():
    w = rnd.choice([("PERITO", 6, 1), ("LAUDO", 5, 1), ("PROVA", 5, 1), ("CASAS", 5, 2), ("BATALHA", 7, 2), ("MATERIAL", 8, 2)])
    nome, n, rep = w
    # contagem real de anagramas
    from collections import Counter
    cnt = Counter(nome); r = math.factorial(len(nome))
    for v in cnt.values(): r //= math.factorial(v)
    Q(Cb, f"O número de anagramas da palavra {nome} é:", str(r),
      [(str(math.factorial(len(nome))), "é n! e ignora as letras repetidas."), (str(len(nome) ** 2), "não corresponde ao cálculo."), (str(r * 2), "dobrou o resultado."), (str(math.factorial(len(nome) - 1)), "é (n − 1)!, que não considera todos os arranjos.")],
      [f"{nome} tem {len(nome)} letras.", "Letras repetidas: " + (", ".join(f"{k} ({v}x)" for k, v in cnt.items() if v > 1) or "nenhuma") + ".", f"{len(nome)}! dividido pelas repetições = <b>{r}</b>."], "Anagrama: n! ÷ repetições!.", "Anagramas.")
many(comb_anagrama, 1)
def comb_prob():
    x, y = rnd.randint(3, 7), rnd.randint(3, 7); n = x + y; r = Fr(math.comb(x, 2), math.comb(n, 2))
    Q(Cb, f"Em uma caixa há {x} lacres vermelhos e {y} azuis. Dois lacres são retirados ao acaso, sem reposição. A probabilidade de ambos serem vermelhos é:", f"{r.numerator}/{r.denominator}" if r.denominator != 1 else "1",
      [(f"{Fr(x, n) ** 2}", "tratou como retiradas com reposição."), (f"{Fr(x, n)}", "considerou só a primeira retirada."), (f"{Fr(x * (x - 1), n * n)}", "manteve o total n na segunda retirada."), (f"{Fr(math.comb(y, 2), math.comb(n, 2))}", "é a chance de ambos serem azuis.")],
      [f"1ª retirada: {x}/{n}; 2ª retirada, sem reposição: {x - 1}/{n - 1}.", f"Multiplique: {x}/{n} × {x - 1}/{n - 1}.", f"<b>{r}</b>."], "Sem reposição: o total diminui.", "Probabilidade sem reposição.")
many(comb_prob, 1)

# ---------------- Sequências e calendário ----------------
def seq_pa():
    a1, r, n = rnd.randint(3, 12), rnd.randint(2, 9), rnd.randint(8, 15); an = a1 + (n - 1) * r
    Q(Sq, f"Em uma progressão aritmética, o primeiro termo é {a1} e a razão é {r}. O {n}º termo é:", str(an),
      [(str(a1 + n * r), f"usou {n} razões; o {n}º termo tem {n - 1}."), (str(a1 * r * (n - 1)), "multiplicou em vez de somar."), (str(a1 + (n - 2) * r), f"usou {n - 2} razões."), (str(a1 + r), "é o 2º termo.")],
      ["aₙ = a₁ + (n − 1)·r.", f"a{n} = {a1} + {n - 1} × {r}.", f"<b>{an}</b>."], "n-ésimo termo da PA: a1 + (n−1)·r.", "Termo geral da PA.")
many(seq_pa, 2)
def seq_pg():
    a1, q, n = rnd.choice([2, 3, 5]), rnd.choice([2, 3]), rnd.randint(4, 6); an = a1 * q ** (n - 1)
    Q(Sq, f"Uma progressão geométrica tem primeiro termo {a1} e razão {q}. O {n}º termo é:", str(an),
      [(str(a1 * q ** n), f"usou expoente {n}; é {n - 1}."), (str(a1 + (n - 1) * q), "calculou como PA."), (str(a1 * q * (n - 1)), "multiplicou razão por n − 1."), (str(a1 * q ** (n - 2)), "usou expoente n − 2.")],
      ["aₙ = a₁ · q^(n − 1).", f"a{n} = {a1} × {q}^{n - 1}.", f"<b>{an}</b>."], "PG: expoente n − 1.", "Termo geral da PG.")
many(seq_pg, 2)
def seq_diff():
    a, d0 = rnd.randint(2, 8), rnd.randint(2, 4); t = [a]; d = d0
    for _ in range(4): t.append(t[-1] + d); d += 2
    nxt = t[-1] + d
    Q(Sq, f"Observe a sequência: {', '.join(map(str, t))}, ... O próximo termo é:", str(nxt),
      [(str(t[-1] + (t[-1] - t[-2])), "repetiu a última diferença; ela cresce 2 a cada passo."), (str(t[-1] * 2), "dobrou o último termo: não é o padrão."), (str(t[-1] + 2), "somou só 2."), (str(nxt + 2), "avançou uma diferença a mais.")],
      ["Calcule as diferenças: " + ", ".join(str(t[i + 1] - t[i]) for i in range(len(t) - 1)) + ".", f"As diferenças aumentam 2 a cada passo: a próxima é {d}.", f"{t[-1]} + {d} = <b>{nxt}</b>."], "Diferenças em PA: padrão de 2ª ordem.", "Descobrir a regra por diferenças.")
many(seq_diff, 2)
def seq_cal():
    dias = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"]; i = rnd.randint(0, 6); N = rnd.randint(30, 400)
    Q(Sq, f"Hoje é {dias[i]}. Daqui a {N} dias será:", dias[(i + N) % 7],
      [(dias[(i + N + 1) % 7], "avançou um dia a mais."), (dias[(i + N - 1) % 7], "avançou um dia a menos."), (dias[(i + N // 7) % 7], "usou o quociente em vez do resto."), (dias[i], "supôs que N é múltiplo de 7.")],
      [f"Divida {N} por 7: quociente {N // 7}, resto <b>{N % 7}</b>.", f"Avance {N % 7} dia(s) a partir de {dias[i]}.", f"<b>{dias[(i + N) % 7]}</b>."], "Calendário: use o resto da divisão por 7.", "Calendário pelo resto da divisão por 7.")
many(seq_cal, 2)

# ---------------- Porcentagem, razão e proporção ----------------
def pct_sucessivo():
    p1, p2 = rnd.choice([10, 20, 25, 30]), rnd.choice([10, 20, 25, 40]); v = rnd.choice([100, 200, 400, 500])
    r = v * (1 + p1 / 100) * (1 - p2 / 100)
    Q(Pc, f"O preço de um equipamento, R$ {v},00, sofreu aumento de {p1}% e, em seguida, desconto de {p2}%. O preço final é:", f"R$ {n_(r)}".replace(".", ","),
      [(f"R$ {n_(v * (1 + (p1 - p2) / 100))}", "somou e subtraiu as porcentagens; variações sucessivas se multiplicam."), (f"R$ {n_(v)}", "supôs que aumento e desconto se anulam."), (f"R$ {n_(v * (1 - p2 / 100) * (1 + p1 / 100) + 10)}", "erro de conta."), (f"R$ {n_(v * (1 + p1 / 100))}", "ignorou o desconto.")],
      [f"Aumento de {p1}%: {v} × {1 + p1 / 100:g} = {n_(v * (1 + p1 / 100))}.", f"Desconto de {p2}%: × {1 - p2 / 100:g}.", f"<b>R$ {n_(r)}</b>."], "Variações sucessivas: multiplique os fatores.", "Aumento seguido de desconto.")
many(pct_sucessivo, 2)
def pct_simples():
    N = rnd.choice([400, 500, 800, 1200]); p = rnd.choice([15, 20, 35, 40, 60]); r = N * p // 100
    Q(Pc, f"Em um concurso, {N} candidatos foram inscritos e {p}% não compareceram à prova. O número de candidatos que compareceram é:", str(N - r),
      [(str(r), "é o número de ausentes."), (str(N - p), "subtraiu a porcentagem do total sem converter."), (str(N * (100 - p) // 100 + 10), "erro de conta."), (str(N // p), "dividiu em vez de calcular a porcentagem.")],
      [f"Ausentes: {p}% de {N} = {r}.", f"Compareceram: {N} − {r}.", f"<b>{N - r}</b>."], "Calcule a parte e subtraia do total.", "Porcentagem de um total.")
many(pct_simples, 1)
def regra3():
    a, d1, c = rnd.choice([4, 5, 6]), rnd.choice([6, 8, 10]), rnd.choice([2, 3, 4]); tot = a * d1; x = Fr(tot, c)
    Q(Pc, f"{a} peritos analisam um lote de provas em {d1} dias, no mesmo ritmo. Se fossem {c} peritos, o mesmo lote seria analisado em:", f"{x.numerator}/{x.denominator} dias".replace("/1 dias", " dias") if x.denominator != 1 else f"{x.numerator} dias",
      [(f"{Fr(c * d1, a)} dias".replace("/1 dias", " dias"), "tratou como direta: menos peritos, menos dias — o contrário do correto."), (f"{d1 + c} dias", "somou valores."), (f"{a * c} dias", "multiplicou os dois números de peritos."), (f"{d1} dias", "supôs que o tempo não muda.")],
      ["Mais peritos → menos dias: grandezas inversamente proporcionais.", f"peritos × dias é constante: {a} × {d1} = {tot}.", f"{tot} ÷ {c} = <b>{x}</b> dias."], "Inversa: o produto fica constante.", "Regra de três inversa.")
many(regra3, 1)
def razao():
    p, q_ = rnd.choice([(5, 2), (3, 2), (7, 3), (4, 3)]); k = rnd.randint(5, 9); tot = p * k
    Q(Pc, f"Em uma delegacia, o número de agentes está para o de escrivães na razão de {p} para {q_}. Se há {tot} agentes, o número de escrivães é:", str(q_ * k),
      [(str(tot + q_), "somou a parte menor."), (str(tot - p), "subtraiu a razão."), (str(Fr(tot * p, q_).__int__()), "inverteu a razão."), (str(q_ * k + k), "contou uma parte a mais.")],
      [f"Razão agentes:escrivães = {p}:{q_}.", f"Cada parte vale {tot} ÷ {p} = {k}.", f"Escrivães: {q_} × {k} = <b>{q_ * k}</b>."], "Descubra o valor de uma parte e multiplique.", "Razão e proporção.")
many(razao, 1)
def pct_variacao():
    a, b = rnd.choice([80, 120, 200, 250]), None; b = int(a * rnd.choice([1.25, 1.5, 0.8, 0.75, 1.1])); v = Fr(b - a, a) * 100
    Q(Pc, f"O número de ocorrências passou de {a} para {b}. A variação percentual foi de:", f"{'+' if v > 0 else ''}{n_(v).replace(',00', '')}%",
      [(f"{n_(Fr(b - a, b) * 100).replace(',00', '')}%", "usou o valor final como base; a base é o inicial."), (f"{n_(Fr(b, a) * 100).replace(',00', '')}%", "é a razão final/inicial, não a variação."), (f"{n_(b - a).replace(',00', '')}%", "tomou a diferença absoluta como porcentagem."), (f"{n_(Fr(a, b) * 100).replace(',00', '')}%", "inverteu a razão.")],
      ["Variação = (final − inicial) ÷ inicial.", f"({b} − {a}) ÷ {a} = {n_(Fr(b - a, a)).replace(',00', '')}.", f"<b>{n_(v).replace(',00', '')}%</b>."], "A base é sempre o valor inicial.", "Variação percentual.")
many(pct_variacao, 1)

salvar()
