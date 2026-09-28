"""Extrator de cadernos do Cebraspe de múltipla escolha (formato 'Questão N' + alternativas 'A ... E ...').
Layout: cabeçalho 'Questão N' (size 11, recuado); alternativas iniciadas por letra maiúscula na margem;
continuação da alternativa recuada ~14 pt. Duas colunas.
parse_ceb_mc(pdf)  -> lista de dicts {n, page, subject, context, stem, options{A..E}}
gab_blocks_generic(pdf) -> {n: letra | 'X'}  (gabarito em blocos de 20 números + 20 letras; X = anulada)
"""
import pymupdf, re, sys

OPT = re.compile(r"^([A-E])\s+(?=\S)")


def _lines(pdf):
    d = pymupdf.open(pdf)
    out = []
    for pi, p in enumerate(d):
        W = p.rect.width
        ls = []
        for b in p.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                sp = [s for s in l["spans"] if s["text"].strip()]
                if not sp:
                    continue
                x0 = min(s["bbox"][0] for s in sp)
                y0 = l["bbox"][1]
                t = re.sub(r"\s+", " ", "".join(s["text"] for s in l["spans"])).strip()
                if y0 < 40 or y0 > 800 or re.match(r"^CEBRASPE\b", t) or re.fullmatch(r"(?i)(rascunho|espaço livre)", t):
                    continue
                col = 0 if x0 < W / 2 - 5 else 1
                base = 28.4 if col == 0 else 28.4 + (W / 2 - 21.4)
                ls.append((col, y0, x0 - base, t, sp[0]["size"]))
        for col in (0, 1):
            for c, y, ind, t, sz in sorted([x for x in ls if x[0] == col], key=lambda x: x[1]):
                out.append((pi + 1, ind, t, sz))
    return out


def parse_ceb_mc(pdf, start=1):
    lines = _lines(pdf)
    items, cur, pre, expected, last = [], None, [], start, None
    for pg, ind, t, sz in lines:
        m = re.fullmatch(r"Quest[ãa]o (\d{1,3})", t)
        if m and int(m.group(1)) in (expected, expected + 1):
            if int(m.group(1)) == expected + 1:
                items.append(dict(n=expected, page=pg, context="", subject="", stem="", options={}, gap=True))
                expected += 1
            cur = dict(n=expected, page=pg, context=" ".join(pre).strip(), subject="", stem="", options={})
            items.append(cur)
            pre, expected, last = [], expected + 1, None
            continue
        if re.match(r"^--\s*CONHECIMENTOS", t):
            pre = []
            continue
        if cur is None:
            pre.append(t)
            continue
        mo = OPT.match(t)
        if mo and ind < 6 and (last is None or "ABCDE".index(mo.group(1)) == "ABCDE".index(last) + 1) and (last is not None or mo.group(1) == "A"):
            cur["options"][mo.group(1)] = OPT.sub("", t)
            last = mo.group(1)
            continue
        if last is None:
            cur["stem"] = (cur["stem"] + " " + t).strip()
        elif ind >= 6 or last != "E":
            cur["options"][last] += " " + t
        else:                               # depois da E, na margem: contexto do próximo item
            pre.append(t)
            cur = None
            last = None
    return items


def gab_blocks_generic(pdf):
    d = pymupdf.open(pdf)
    toks = [l.strip() for p in d for l in p.get_text().splitlines() if l.strip()]
    res, nums, lets = {}, [], []
    for l in toks:
        if re.fullmatch(r"0+", l):
            continue
        if re.fullmatch(r"\d{1,3}", l):
            if lets:
                nums, lets = [], []
            nums.append(int(l))
        elif re.fullmatch(r"[A-EX]", l):
            lets.append(l)
            if len(lets) == len(nums):
                res.update(dict(zip(nums, lets)))
                nums, lets = [], []
    return {n: v for n, v in res.items() if n >= 1}


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    it = parse_ceb_mc(sys.argv[1])
    print(len(it), "itens; incompletos:", [x["n"] for x in it if not x.get("gap") and len(x["options"]) != 5][:30], "lacunas:", [x["n"] for x in it if x.get("gap")])
    a = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    for x in it[a - 1:a + 1]:
        print(x["n"], "| ctx:", x["context"][:100], "\n  stem:", x["stem"][:160], "\n  ", {k: v[:40] for k, v in x["options"].items()})
