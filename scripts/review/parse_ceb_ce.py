"""Extrator de cadernos Cebraspe certo/errado com número do item na linha ('31 A nomeação ...').
parse_ceb_ce(pdf) -> [{n, page, command, stem}], gab_ce(pdf) -> {n: 'C'|'E'|'X'}"""
import re, pymupdf
from parse_ceb_mc import gab_blocks_generic as _g


def _lines(pdf):
    out = []
    for pi, p in enumerate(pymupdf.open(pdf)):
        W = p.rect.width
        ls = []
        for b in p.get_text("dict")["blocks"]:
            for l in b.get("lines", []):
                sp = [s for s in l["spans"] if s["text"].strip()]
                if not sp:
                    continue
                t = re.sub(r"\s+", " ", "".join(s["text"] for s in l["spans"])).strip()
                y = l["bbox"][1]
                if y < 45 or y > 800 or re.match(r"^(CEBRASPE|\|\|)", t) or re.fullmatch(r"(?i)(rascunho|espaço livre)", t) or re.match(r"^\d{3}\w*_\d\dN", t):
                    continue
                ls.append((0 if min(s["bbox"][0] for s in sp) < W / 2 - 5 else 1, y, t))
        for c in (0, 1):
            out += [(pi + 1, t) for cc, y, t in sorted([x for x in ls if x[0] == c], key=lambda x: x[1])]
    return out


def parse_ceb_ce(pdf, first=1):
    items, cmd, cur, expected = [], [], None, first
    for pg, t in _lines(pdf):
        m = re.match(r"^(\d{1,3}) (.+)", t)
        if m and expected < int(m.group(1)) <= expected + 2 and not cur is None and False:
            pass
        if m and int(m.group(1)) in (expected, expected + 1):
            while int(m.group(1)) > expected:       # item cujo número não saiu no PDF (fórmulas): lacuna explícita
                items.append(dict(n=expected, page=pg, command=" ".join(cmd).strip(), stem="", gap=True))
                expected += 1
            cur = dict(n=expected, page=pg, command=" ".join(cmd).strip(), stem=m.group(2))
            items.append(cur)
            expected += 1
            continue
        if cur is not None and (not re.search(r"[.?;:!]$", cur["stem"]) or t[:1].islower() or t[:1] in "(“\"-–,"):
            cur["stem"] += " " + t
            continue
        if cur is not None:
            cmd, cur = [], None          # nova instrução: vale para os itens seguintes
        cmd.append(t)
    return items
