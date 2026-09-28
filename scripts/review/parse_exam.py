"""Extrator de cadernos CEBRASPE (2 colunas): item -> (contexto, corpo).
Layout calibrado no caderno PF 2014:
  rótulo de item : numérico, size 7-9.2, x < 40
  corpo do item  : x >= 46.4 logo após um rótulo de item
  comando        : x < 40, size ~10 ('Julgue os itens ...')
  texto-base     : x ~46.0 / ~81.2, size ~10; rótulo de linha: size < 6.6, numérico
"""
import pymupdf, re, sys, json


def lines_of(page):
    W = page.rect.width
    recs = []
    for b in page.get_text("dict")["blocks"]:
        for l in b.get("lines", []):
            spans = [s for s in l["spans"] if s["text"].strip()]
            if not spans:
                continue
            x0 = min(s["bbox"][0] for s in spans)
            col = 0 if x0 < W / 2 - 5 else 1
            recs.append(dict(col=col, y=l["bbox"][1], y1=l["bbox"][3], x=x0 - (W / 2 - 21.4 if col else 0),
                             sz=spans[0]["size"], text="".join(s["text"] for s in l["spans"]).strip(),
                             page=page.number + 1))
    return recs


def read(path, first_page=0):
    d = pymupdf.open(path)
    seq = []
    for pg in range(first_page, len(d)):
        recs = [r for r in lines_of(d[pg]) if 40 < r["y"] < 800 and not r["text"].startswith("||")
                and not re.match(r"^(CESPE|CEBRASPE)\b", r["text"])]
        for col in (0, 1):
            def key(r):
                isl = re.fullmatch(r"\d{1,3}", r["text"]) and 7 <= r["sz"] <= 9.2 and r["x"] < 40
                return (r["y"] - (4 if isl else 0), r["x"])
            seq.extend(sorted([r for r in recs if r["col"] == col], key=key))
    # descarta o preâmbulo (tudo antes de 'PROVA OBJETIVA') e marcadores soltos
    idx = next((i for i, r in enumerate(seq) if re.fullmatch(r"-*\s*PROVA OBJETIVA\s*-*", r["text"].strip().upper())), -1)
    seq = seq[idx + 1:] if idx >= 0 else seq
    return [r for r in seq if r["text"] not in ("•", "-") and not r["text"].lower().startswith("espaço livre")]


def _norm(t):
    return re.sub(r'[^a-z0-9]', '', t.lower())


def build(seq, anchors=None, body_x=(46.4, 62), single_kind=False):
    # rótulos de linha por (página, coluna)
    labels = {}
    for r in seq:
        if r["sz"] < 6.6 and re.fullmatch(r"\d{1,3}", r["text"]):
            labels.setdefault((r["page"], r["col"]), []).append((r["y"], r["text"]))

    def label_for(r):
        for (y, t) in labels.get((r["page"], r["col"]), []):
            if r["y"] - 4 <= y <= r["y"] + 9:
                return t
        return ""

    items, groups = {}, []
    mode, cur, buf = "ctx", None, []
    for r in seq:
        t = r["text"]
        if r["sz"] < 6.6:
            if not re.fullmatch(r"\d{1,3}", t) and mode == "ctx":
                buf.append(("src", "(" + t + ")"))
            continue
        m = re.match(r"^(\d{1,3})(?:\s+(.*))?$", t)
        expected = (max(items) + 1) if items else 1
        if m and 7 <= r["sz"] <= 9.6 and r["x"] < 40 and (int(m.group(1)) == expected or (not m.group(2) and re.fullmatch(r"\d{1,3}", t))):
            if buf:
                groups.append(buf)
                buf = []
            cur = int(m.group(1))
            items[cur] = dict(body=[m.group(2)] if m.group(2) else [], group=len(groups) - 1)
            mode = "item"
            continue
        if mode == "item" and anchors and cur in anchors:
            done = len(_norm(" ".join(items[cur]["body"]))) >= 0.985 * len(_norm(anchors[cur]))
            if not done:
                items[cur]["body"].append(t)
                continue
        elif mode == "item" and body_x[0] <= r["x"] <= body_x[1]:
            items[cur]["body"].append(t)
            continue
        mode = "ctx"
        kind = "base" if (single_kind or r["x"] >= 40) else "cmd"
        buf.append((kind, (label_for(r).rjust(3) + " " if kind == "base" else "") + t))
    return items, groups


def group_text(groups, carry=True, single_kind=False):
    """Resolve o contexto final de cada grupo (carrega o texto-base se o comando cita 'texto')."""
    resolved, last_base = [], []
    for g in groups:
        base = [x for k, x in g if k == "base"] + [x for k, x in g if k == "src"]
        cmd = [x for k, x in g if k == "cmd" and x.strip().upper() != "RASCUNHO"]
        big = sum(len(x) for x in base) >= 350 if single_kind else bool(base)
        if single_kind and not big:
            cmd, base = base + cmd, []
        if base and (big or not single_kind):
            last_base = base
            lines = base + cmd
        else:
            cmdtxt = " ".join(cmd).lower()
            if carry and last_base and re.search(r"\btexto\b|precedente|acima|anterior", cmdtxt):
                lines = last_base + cmd
            else:
                lines = cmd
        resolved.append("\n".join(lines))
    return resolved


def parse(path, first_page=0, anchors=None, body_x=(46.4, 62), single_kind=False):
    seq = read(path, first_page)
    items, groups = build(seq, anchors, body_x, single_kind)
    ctx = group_text(groups, single_kind=single_kind)
    res = {}
    for n, it in items.items():
        g = it["group"]
        res[n] = dict(context=ctx[g] if 0 <= g < len(ctx) else "", body=" ".join(it["body"]))
    return res


if __name__ == "__main__":
    res = parse(sys.argv[1])
    sys.stdout.reconfigure(encoding="utf-8")
    ns = sorted(res)
    print(len(ns), "itens", ns[:3], "...", ns[-3:])
    for n in [int(x) for x in sys.argv[2:]] or ns[:3]:
        print(f"===== ITEM {n}\n--- contexto:\n{res[n]['context']}\n--- corpo: {res[n]['body']}")
