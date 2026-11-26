#!/usr/bin/env python3
"""Gera questões de Probabilidade e Tendência central com respostas calculadas (Fraction), para equilibrar o banco
conforme a incidência medida nas provas IDECAN (ver scripts/idecan-incidence.py). Idempotente.
Depois: python3 scripts/build-pcac-area-catalog.py"""
import json, pathlib, random, math
from fractions import Fraction as Fr

HTML = pathlib.Path(__file__).resolve().parent.parent / "src/estudo/estudo-pc-acre.html"
rnd = random.Random(20261126)
NEW = []

def dec(x, nd=None):
    """número no formato brasileiro (vírgula), sem zeros inúteis."""
    if isinstance(x, Fr): x = float(x)
    s = f"{x:.{nd}f}" if nd is not None else (f"{x:.4f}".rstrip("0").rstrip("."))
    return s.replace(".", ",")

def fr(x):
    x = Fr(x)
    return str(x.numerator) if x.denominator == 1 else f"{x.numerator}/{x.denominator}"

def pct(x):
    return dec(float(x) * 100, 1).rstrip("0").rstrip(",") + "%" if float(x * 100) != int(float(x) * 100) else f"{int(float(x) * 100)}%"

def Q(t, q, right, wrongs, steps, dica, pede):
    """wrongs: lista de (texto, motivo); só entra se distinto da certa e entre si; precisa de 4."""
    seen, ws = {right}, []
    for w in wrongs:
        if w[0] not in seen:
            seen.add(w[0]); ws.append(w)
    if len(ws) < 4:
        return False
    ws = ws[:4]
    pos = (len(NEW) * 2 + 3) % 5
    ops = [w[0] for w in ws]; ops.insert(pos, right)
    L = "ABCDE"[pos]
    why = " ".join(f"{'ABCDE'[k]} ({o}): {dict(ws)[o]}" for k, o in enumerate(ops) if k != pos)
    exp = " ".join(f"Passo {i+1}: {s}" for i, s in enumerate(steps)) + f" Resposta: <b>{L}</b>."
    NEW.append({"t": t, "q": q, "ops": ops, "c": pos, "exp": exp, "dica": dica, "ps": [pede, steps + [f"Resposta: <b>{L}</b>."], why]})
    return True

ITENS = ["lacres", "envelopes de evidência", "mandados", "veículos apreendidos", "documentos", "celulares periciados", "fichas de ocorrência", "armas cautelares"]
CORES = [("vermelhos", "azuis", "verdes"), ("brancos", "pretos", "cinzas"), ("amarelos", "azuis", "vermelhos")]

# ======================= PROBABILIDADE =======================
P = "probabilidade"
# 1) favorável ÷ total (urna)
for _ in range(5):
    a, b, c = rnd.randint(2, 7), rnd.randint(2, 7), rnd.randint(2, 7); n = a + b + c
    item = rnd.choice(ITENS); cor = rnd.choice(CORES)
    Q(P, f"Uma caixa guarda {n} {item}: {a} {cor[0]}, {b} {cor[1]} e {c} {cor[2]}. Retirando um ao acaso, a probabilidade de ele ser {cor[0][:-1] if cor[0].endswith('s') else cor[0]} é:",
      fr(Fr(a, n)),
      [(fr(Fr(a, b + c)), "dividiu pelos que NÃO são dessa cor; o denominador é o total."), (fr(Fr(n - a, n)), "é a probabilidade de NÃO ser dessa cor."),
       (fr(Fr(a, a + b)), "usou só duas cores no total."), (fr(Fr(b, n)), "trocou a cor pedida.")],
      [f"Total de {item}: {a} + {b} + {c} = <b>{n}</b>.", f"Favoráveis (cor pedida): <b>{a}</b>.", f"P = favoráveis ÷ total = {a}/{n}" + (f" = <b>{fr(Fr(a, n))}</b> (simplificada)." if Fr(a, n).denominator != n else ".")],
      "P = favoráveis ÷ total.", "Probabilidade clássica numa urna.")
# 2) complementar "pelo menos um"
for _ in range(5):
    n = rnd.choice([2, 3]); p = rnd.choice([Fr(1, 10), Fr(2, 10), Fr(3, 10), Fr(1, 5), Fr(1, 4)])
    q_ = 1 - p
    right = 1 - q_ ** n
    Q(P, f"Em {n} rondas independentes, a chance de encontrar um veículo suspeito em cada uma é {pct(p)}. A probabilidade de encontrar o veículo em pelo menos uma das rondas é:",
      pct(right),
      [(pct(p ** n), f"é a chance de encontrar em TODAS as rondas."), (pct(n * p), "somou as chances, o que ignora a sobreposição e pode passar de 100%."), (pct(q_ ** n), "é a chance de NÃO encontrar em nenhuma ronda."), (pct(p), "considerou só uma ronda.")],
      [f"'Pelo menos uma' = 1 − P(nenhuma).", f"P(não encontrar em uma ronda) = 1 − {pct(p)} = {pct(q_)}. Em {n} rondas independentes: {pct(q_)}<sup>{n}</sup> = <b>{pct(q_ ** n)}</b>.", f"P(pelo menos uma) = 100% − {pct(q_ ** n)} = <b>{pct(right)}</b>."],
      "Pelo menos um = 1 − P(nenhum).", "Probabilidade de ao menos um sucesso.")
# 3) eventos independentes E
for _ in range(4):
    pa, pb = rnd.choice([Fr(1, 2), Fr(3, 5), Fr(2, 5), Fr(1, 4), Fr(3, 4)]), rnd.choice([Fr(1, 2), Fr(1, 3), Fr(2, 3), Fr(1, 5)])
    Q(P, f"A chance de um perito concluir o laudo no prazo é {fr(pa)} e a de outro concluir o seu no prazo é {fr(pb)}, de forma independente. A probabilidade de ambos concluírem no prazo é:",
      fr(pa * pb),
      [(fr(pa + pb), "somou; 'e' entre eventos independentes pede multiplicação."), (fr(pa + pb - pa * pb), "é a fórmula do 'ou' (união), não do 'e'."), (fr(pa / pb), "dividiu em vez de multiplicar."), (fr(abs(pa - pb)), "subtraiu as chances.")],
      ["A palavra <b>'ambos'</b> indica 'e': os dois eventos juntos.", "Eventos independentes: P(A e B) = P(A) × P(B).", f"{fr(pa)} × {fr(pb)} = <b>{fr(pa * pb)}</b>."],
      "'E' entre independentes: multiplique.", "Probabilidade da interseção de eventos independentes.")
# 4) união com interseção
for _ in range(5):
    tot = 100; a = rnd.choice([40, 45, 50, 55, 60]); b = rnd.choice([30, 35, 40]); ab = rnd.choice([10, 15, 20])
    right = Fr(a + b - ab, tot)
    Q(P, f"Em {tot} ocorrências, {a} envolveram arma de fogo, {b} ocorreram à noite e {ab} reuniram as duas características. Sorteando uma ocorrência, a probabilidade de ela ter arma de fogo OU ter ocorrido à noite é:",
      pct(right),
      [(pct(Fr(a + b, tot)), "somou sem descontar a interseção, contando duas vezes quem tem as duas características."), (pct(Fr(ab, tot)), "é só a interseção (as duas juntas)."), (pct(Fr(a, tot)), "considerou apenas arma de fogo."), (pct(Fr(a + b + ab, tot)), "somou a interseção em vez de subtrair.")],
      [f"Regra do 'ou': <b>P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</b>.", f"P(A) = {a}%, P(B) = {b}%, P(A ∩ B) = {ab}%.", f"{a}% + {b}% − {ab}% = <b>{pct(right)}</b>."],
      "'Ou' = soma menos a interseção.", "Probabilidade da união de eventos.")
# 5) condicional por tabela
for _ in range(5):
    h_c, h_s, m_c, m_s = rnd.randint(2, 6), rnd.randint(2, 6), rnd.randint(2, 6), rnd.randint(2, 6)
    tot = h_c + h_s + m_c + m_s; com = h_c + m_c
    Q(P, f"Entre {tot} policiais, {h_c + h_s} são homens e {m_c + m_s} são mulheres. Têm curso de tiro avançado {h_c} homens e {m_c} mulheres. Sorteando um policial que tem o curso, a probabilidade de ser mulher é:",
      fr(Fr(m_c, com)),
      [(fr(Fr(m_c, tot)), "dividiu pelo total geral; o 'dado que tem o curso' reduz o universo."), (fr(Fr(m_c + m_s, tot)), "é a chance de ser mulher sem considerar o curso."), (fr(Fr(m_c, m_c + m_s)), "dividiu pelas mulheres; o universo é quem tem o curso."), (fr(Fr(h_c, com)), "é a chance de ser homem entre os que têm o curso.")],
      [f"O 'dado que' vira o <b>denominador</b>: quem tem o curso = {h_c} + {m_c} = <b>{com}</b>.", f"Favoráveis: mulheres com curso = <b>{m_c}</b>.", f"P(mulher | curso) = {m_c}/{com}" + (f" = <b>{fr(Fr(m_c, com))}</b>." if Fr(m_c, com).denominator != com else ".")],
      "'Dado que' = universo reduzido.", "Probabilidade condicional.")
# 6) binomial exatamente k de 3
for _ in range(5):
    p = rnd.choice([Fr(1, 2), Fr(1, 3), Fr(2, 5), Fr(1, 5)]); k = rnd.choice([1, 2])
    right = math.comb(3, k) * p ** k * (1 - p) ** (3 - k)
    Q(P, f"Cada tentativa de abordagem tem probabilidade {fr(p)} de sucesso, de forma independente. Em 3 tentativas, a probabilidade de exatamente {k} sucesso{'s' if k > 1 else ''} é:",
      fr(right),
      [(fr(p ** k * (1 - p) ** (3 - k)), "esqueceu o número de combinações C(3, k)."), (fr(math.comb(3, k) * p ** k), "ignorou a probabilidade de falha nas demais tentativas."), (fr(Fr(k, 3)), "dividiu k por 3, o que não leva em conta p."), (fr(math.comb(3, k) * (1 - p) ** k * p ** (3 - k)), "trocou sucesso e falha.")],
      ["Binomial: <b>P(k) = C(n,k) · p<sup>k</sup> · (1 − p)<sup>n − k</sup></b>.", f"n = 3, k = {k}, p = {fr(p)}, 1 − p = {fr(1 - p)}. C(3,{k}) = <b>{math.comb(3, k)}</b>.", f"{math.comb(3, k)} × ({fr(p)})<sup>{k}</sup> × ({fr(1 - p)})<sup>{3 - k}</sup> = <b>{fr(right)}</b>."],
      "Binomial: C(n,k)·p^k·(1−p)^(n−k).", "Probabilidade binomial para n = 3.")
# 7) sem reposição (duas retiradas)
for _ in range(4):
    x, y = rnd.randint(3, 6), rnd.randint(2, 5); n = x + y
    right = Fr(math.comb(x, 2), math.comb(n, 2))
    Q(P, f"Um pátio tem {n} veículos apreendidos: {x} furtados e {y} adulterados. Dois veículos são vistoriados ao acaso, sem reposição. A probabilidade de ambos serem furtados é:",
      fr(right),
      [(fr(Fr(x, n) ** 2), "tratou como retiradas com reposição; aqui o total diminui."), (fr(Fr(x, n)), "considerou só a primeira retirada."), (fr(Fr(x * (x - 1), n * n)), "manteve o denominador n na segunda retirada; ele cai para n − 1."), (fr(Fr(math.comb(y, 2), math.comb(n, 2))), "calculou a chance de ambos serem adulterados.")],
      [f"1ª retirada: {x}/{n}. 2ª retirada (sem reposição): {x - 1}/{n - 1}.", f"Multiplique: {x}/{n} × {x - 1}/{n - 1}.", f"= {x * (x - 1)}/{n * (n - 1)} = <b>{fr(right)}</b>."],
      "Sem reposição: o total diminui a cada retirada.", "Probabilidade sem reposição.")
# 8) valor esperado
for _ in range(4):
    vals = rnd.sample([1, 2, 3, 4, 5, 10], 3); pr = rnd.choice([(Fr(1, 2), Fr(3, 10), Fr(1, 5)), (Fr(1, 5), Fr(1, 2), Fr(3, 10)), (Fr(2, 5), Fr(2, 5), Fr(1, 5))])
    e = sum(v * p for v, p in zip(vals, pr))
    Q(P, f"O número de laudos entregues por dia é {vals[0]}, {vals[1]} ou {vals[2]}, com probabilidades {fr(pr[0])}, {fr(pr[1])} e {fr(pr[2])}, respectivamente. O valor esperado de laudos por dia é:",
      dec(e, 1),
      [(dec(Fr(sum(vals), 3), 1), "fez a média simples dos valores, ignorando as probabilidades."), (dec(sum(pr), 1), "somou as probabilidades, que dá 1."), (dec(sum(vals), 1), "somou os valores sem ponderar."), (dec(e + 1, 1), "erro de conta: confira cada produto valor × probabilidade.")],
      ["Valor esperado: <b>E(X) = Σ x · P(x)</b>.", "Multiplique cada valor por sua probabilidade: " + " + ".join(f"{v} × {fr(p)}" for v, p in zip(vals, pr)) + ".", f"Soma: <b>{dec(e, 1)}</b>."],
      "E(X) = soma de valor × probabilidade.", "Valor esperado de variável discreta.")
# 9) dois dados
for s_ in (5, 6, 8, 9):
    cnt = sum(1 for i in range(1, 7) for j in range(1, 7) if i + j == s_)
    Q(P, f"Dois dados honestos são lançados. A probabilidade de a soma das faces ser {s_} é:", fr(Fr(cnt, 36)),
      [(fr(Fr(1, 6)) if cnt != 6 else fr(Fr(1, 12)), "contou os resultados de forma errada; liste os pares (a, b)."), (fr(Fr(1, 12)) if cnt != 3 else fr(Fr(1, 9)), "contagem errada dos pares possíveis."), (fr(Fr(1, 36)), "contou um único par."), (fr(Fr(cnt, 12)), "usou 12 como total; o espaço amostral tem 6 × 6 = 36 pares.")],
      ["Espaço amostral: 6 × 6 = <b>36</b> pares.", f"Pares com soma {s_}: " + ", ".join(f"({i},{j})" for i in range(1, 7) for j in range(1, 7) if i + j == s_) + f" → <b>{cnt}</b> pares.", f"P = {cnt}/36" + (f" = <b>{fr(Fr(cnt, 36))}</b>." if Fr(cnt, 36).denominator != 36 else ".")],
      "Dois dados: 36 pares possíveis.", "Probabilidade com dois dados.")

# ======================= TENDÊNCIA CENTRAL =======================
T = "tendencia"
for _ in range(4):
    v = [rnd.randint(2, 15) for _ in range(rnd.choice([5, 6]))]; m = Fr(sum(v), len(v))
    Q(T, f"Os tempos, em dias, de {len(v)} perícias foram: {', '.join(map(str, v))}. A média aritmética é:", dec(m, 2),
      [(dec(Fr(sum(v), len(v) + 1), 2), "dividiu por n + 1."), (dec(sum(v), 2), "é só a soma, sem dividir."), (dec(sorted(v)[len(v) // 2], 2), "é um valor central, não a média."), (dec(max(v) - min(v), 2), "é a amplitude, não a média.")],
      [f"Some os valores: {' + '.join(map(str, v))} = <b>{sum(v)}</b>.", f"Quantidade de valores: <b>{len(v)}</b>.", f"Média = {sum(v)} ÷ {len(v)} = <b>{dec(m, 2)}</b>."],
      "Média = soma ÷ quantidade.", "Média aritmética simples.")
for _ in range(4):
    n = rnd.choice([5, 7, 9]); v = [rnd.randint(3, 40) for _ in range(n)]; s_ = sorted(v); med = s_[n // 2]
    Q(T, f"Os valores {', '.join(map(str, v))} representam o número de atendimentos em {n} plantões. A mediana é:", str(med),
      [(str(s_[0]), "é o menor valor."), (str(v[n // 2]), "pegou o do meio SEM ordenar antes."), (dec(Fr(sum(v), n), 1), "é a média, não a mediana."), (str(s_[-1]), "é o maior valor.")],
      [f"<b>Ordene</b> os valores: {', '.join(map(str, s_))}.", f"São {n} valores (ímpar): a mediana é o do meio, o {(n + 1) // 2}º.", f"Mediana = <b>{med}</b>."],
      "Mediana: ordene antes de escolher o do meio.", "Mediana com quantidade ímpar.")
for _ in range(3):
    v = sorted(rnd.sample(range(2, 30), 6)); med = Fr(v[2] + v[3], 2)
    Q(T, f"Seis processos tiveram os prazos, em dias: {', '.join(map(str, rnd.sample(v, 6)))}. A mediana desses prazos é:", dec(med, 1),
      [(dec(Fr(sum(v), 6), 1), "é a média."), (str(v[2]), "usou só o terceiro valor; com n par é a média dos dois centrais."), (str(v[3]), "usou só o quarto valor; com n par é a média dos dois centrais."), (dec(v[-1] - v[0], 1), "é a amplitude.")],
      [f"Ordene: {', '.join(map(str, v))}.", f"Com 6 valores (par) há dois centrais: {v[2]} e {v[3]}.", f"Mediana = ({v[2]} + {v[3]}) ÷ 2 = <b>{dec(med, 1)}</b>."],
      "n par: média dos dois centrais.", "Mediana com quantidade par.")
for _ in range(3):
    pesos = [rnd.choice([1, 2, 3]) for _ in range(3)]; notas = [rnd.randint(5, 10) for _ in range(3)]
    mp = Fr(sum(n * p for n, p in zip(notas, pesos)), sum(pesos))
    Q(T, f"Num teste, as notas {notas[0]}, {notas[1]} e {notas[2]} têm pesos {pesos[0]}, {pesos[1]} e {pesos[2]}, nessa ordem. A média ponderada é:", dec(mp, 2),
      [(dec(Fr(sum(notas), 3), 2), "fez a média simples, ignorando os pesos."), (dec(Fr(sum(n * p for n, p in zip(notas, pesos)), 3), 2), "dividiu por 3 (número de notas); deve dividir pela soma dos pesos."), (dec(sum(n * p for n, p in zip(notas, pesos)), 2), "é só a soma dos produtos, sem dividir."), (dec(mp + 1, 2), "erro de conta: confira os produtos.")],
      ["Média ponderada = <b>Σ(valor × peso) ÷ Σ pesos</b>.", " + ".join(f"{n}×{p}" for n, p in zip(notas, pesos)) + f" = <b>{sum(n * p for n, p in zip(notas, pesos))}</b>; soma dos pesos = <b>{sum(pesos)}</b>.", f"{sum(n * p for n, p in zip(notas, pesos))} ÷ {sum(pesos)} = <b>{dec(mp, 2)}</b>."],
      "Ponderada: divida pela soma dos pesos.", "Média ponderada.")
for _ in range(4):
    n = rnd.choice([4, 5]); m0 = rnd.randint(8, 14); dm = rnd.choice([1, 2, 3]); x = (m0 + dm) * (n + 1) - m0 * n
    Q(T, f"A média de {n} valores é {m0}. Um novo valor é incluído e a média passa a ser {m0 + dm}. O valor incluído é:", str(x),
      [(str(m0 + dm), "é a nova média, não o valor incluído."), (str(m0 * n), "é a soma antes da inclusão."), (str((m0 + dm) * (n + 1)), "é a soma depois da inclusão; falta subtrair a soma anterior."), (str(x - dm), "erro de conta na diferença das somas.")],
      [f"Soma antes: {m0} × {n} = <b>{m0 * n}</b>.", f"Soma depois: {m0 + dm} × {n + 1} = <b>{(m0 + dm) * (n + 1)}</b>.", f"Valor incluído = {(m0 + dm) * (n + 1)} − {m0 * n} = <b>{x}</b>."],
      "Média × quantidade = soma. Diferença das somas = valor novo.", "Valor que falta pela média.")
for _ in range(3):
    k = rnd.choice([3, 5, 10]); m0 = rnd.randint(6, 12)
    Q(T, f"A média dos tempos de resposta de uma equipe é {m0} minutos. Se o tempo de cada resposta for aumentado em {k} minutos, a nova média será:", str(m0 + k),
      [(str(m0 * k), "multiplicou; somar uma constante soma a mesma constante à média."), (str(m0), "somar constante muda a média."), (str(m0 + k * 2), "somou a constante duas vezes."), (str(m0 - k), "subtraiu em vez de somar.")],
      ["Somar uma constante a todos os valores <b>soma a mesma constante à média</b>.", f"Nova média = {m0} + {k} = <b>{m0 + k}</b>."],
      "Somar k a todos: a média soma k.", "Efeito de somar constante na média.")
for _ in range(3):
    f = [rnd.randint(1, 6) for _ in range(3)]; x = [rnd.choice(a) for a in ([1, 2], [3, 4], [5, 6, 7])]
    tot = sum(a * b for a, b in zip(x, f)); n = sum(f)
    Q(T, f"Em {n} operações, houve {x[0]} apreensão em {f[0]} delas, {x[1]} apreensões em {f[1]} e {x[2]} apreensões em {f[2]}. O número médio de apreensões por operação é:", dec(Fr(tot, n), 2),
      [(dec(Fr(sum(x), 3), 2), "média simples dos valores distintos, ignorando as frequências."), (dec(tot, 2), "é o total de apreensões, sem dividir por n."), (dec(Fr(tot, 3), 2), "dividiu por 3 classes em vez de por n."), (dec(Fr(tot, n) + 1, 2), "erro de conta.")],
      [f"Multiplique cada valor pela frequência: " + " + ".join(f"{a}×{b}" for a, b in zip(x, f)) + f" = <b>{tot}</b>.", f"Total de operações: {' + '.join(map(str, f))} = <b>{n}</b>.", f"Média = {tot} ÷ {n} = <b>{dec(Fr(tot, n), 2)}</b>."],
      "Com frequências: Σ(valor × freq) ÷ Σ freq.", "Média de dados agrupados.")

def main():
    html = HTML.read_text(encoding="utf-8")
    a = html.index("const DATA = ") + len("const DATA = ")
    data, end = json.JSONDecoder().raw_decode(html[a:])
    have = {q["q"] for q in data["questions"]}
    est = next(s for s in data["subjects"] if s["id"] == "estatistica")
    added = 0
    for n in NEW:
        if n["q"] in have:
            continue
        have.add(n["q"]); data["questions"].append(n); est["qs"].append(len(data["questions"]) - 1); added += 1
    HTML.write_text(html[:a] + json.dumps(data, ensure_ascii=False) + html[a + end:], encoding="utf-8")
    print("geradas:", len(NEW), "| novas:", added, "| total:", len(data["questions"]))

if __name__ == "__main__":
    main()
