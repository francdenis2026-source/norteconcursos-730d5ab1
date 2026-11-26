"""Biblioteca comum para acrescentar teoria e questões autorais à área de estudo PC-AC (idempotente).
Uso: from qlib import Q, teoria, salvar. Depois: python3 scripts/build-pcac-area-catalog.py"""
import hashlib, json, pathlib

HTML = pathlib.Path(__file__).resolve().parent.parent / "src/estudo/estudo-pc-acre.html"
NEW, THEORY = [], {}

def Q(t, q, right, wrongs, steps, dica, pede):
    """t = id do assunto; wrongs = 4 tuplas (texto, motivo); steps = passos; pede = o que a questão pede."""
    assert len(wrongs) == 4, q[:60]
    assert len({right, *[w[0] for w in wrongs]}) == 5, "alternativas repetidas: " + q[:60]
    pos = int(hashlib.md5(q.encode()).hexdigest(), 16) % 5
    ops = [w[0] for w in wrongs]; ops.insert(pos, right); L = "ABCDE"[pos]
    why = " ".join(f"{'ABCDE'[k]} ({o}): {dict(wrongs)[o]}" for k, o in enumerate(ops) if k != pos)
    exp = " ".join(f"Passo {i+1}: {s}" for i, s in enumerate(steps)) + f" Resposta: <b>{L}</b>."
    NEW.append({"t": t, "q": q, "ops": ops, "c": pos, "exp": exp, "dica": dica, "ps": [pede, steps + [f"Resposta: <b>{L}</b>."], why]})

def teoria(tid, teoria_html, exemplo, receita, macete):
    THEORY[tid] = {"teoria": teoria_html, "exemplo": exemplo, "receita": receita, "macete": macete}

def salvar():
    html = HTML.read_text(encoding="utf-8")
    a = html.index("const DATA = ") + len("const DATA = ")
    data, end = json.JSONDecoder().raw_decode(html[a:])
    owner = {}
    for sj in data["subjects"]:
        for t in sj.get("topics") or []:
            owner[t["id"]] = sj
    for t in data["topics"]:
        owner.setdefault(t["id"], next(s for s in data["subjects"] if s["id"] == "estatistica"))
    tops = {t["id"]: t for sj in data["subjects"] for t in (sj.get("topics") or [])}
    tops.update({t["id"]: t for t in data["topics"]})
    have = {q["q"] for q in data["questions"]}
    added = 0
    for n in NEW:
        assert n["t"] in owner, "assunto inexistente: " + n["t"]
        if n["q"] in have:
            continue
        have.add(n["q"]); data["questions"].append(n); owner[n["t"]]["qs"].append(len(data["questions"]) - 1); added += 1
    for tid, v in THEORY.items():
        assert tid in tops, "assunto inexistente: " + tid
        tops[tid].update(v)
    HTML.write_text(html[:a] + json.dumps(data, ensure_ascii=False) + html[a + end:], encoding="utf-8")
    print(f"questões novas: {added} (geradas {len(NEW)}) | teorias: {len(THEORY)} | total de questões: {len(data['questions'])}")
