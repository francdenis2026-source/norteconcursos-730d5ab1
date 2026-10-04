"""Extrator de cadernos e gabaritos da FGV (questões de múltipla escolha A-E).
Layout: 2 colunas; número da questão sozinho na linha; alternativas '(A) ...' na margem da coluna;
linhas de continuação das alternativas recuadas (~14 pt).
parse_fgv(pdf)             -> lista de dicts {n, page, subject, context, stem, options{A..E}}
parse_fgv_gab(pdf, tipo=1) -> {n: letra | '*'}   ('*' = questão anulada)
"""
import pymupdf, re, sys
from fgv_key import answer_token

OPT = re.compile(r"^\(([A-E])\)\s*")


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
                if y0 < 50 or y0 > 780:        # cabeçalho/rodapé
                    continue
                col = 0 if x0 < W / 2 - 5 else 1
                base = 43 if col == 0 else 312
                ls.append((col, y0, x0 - base, t))
        for col in (0, 1):
            for c, y, ind, t in sorted([x for x in ls if x[0] == col], key=lambda x: x[1]):
                out.append((pi + 1, ind, t))
    return out


SKIP_HEAD = re.compile(r"(?i)^(m[óo]dulo|conhecimentos|espec[íi]ficos|b[áa]sicos|comuns|grupo|prova|caderno)")


def subject_from(pre, prev):
    """Título da matéria = último grupo de linhas curtas (sem pontuação final) antes do item; junta títulos quebrados."""
    groups, g = [], []
    for t in pre:
        head = len(t) < 80 and not t.endswith((".", ":", "?", ";", ",")) and not re.match(r"^\d", t) and not re.match(r"^\(", t)
        if head:
            g.append(t)
        else:
            if g: groups.append(g)
            g = []
    if g:
        groups.append(g)
    cands = []
    for grp in groups:
        keep = [x for x in grp if not SKIP_HEAD.match(x) and not re.match(r"(?i)^(texto|figura|tabela|quadro)", x)]
        if keep and sum(len(x) for x in keep) < 110:
            cands.append(" ".join(keep))
    return cands[-1] if cands else prev


def parse_fgv(pdf):
    lines = _lines(pdf)
    items, cur, pre, expected, subject = [], None, [], 1, ""
    last_opt = None
    for pg, ind, t in lines:
        if re.fullmatch(r"(?i)(rascunho|espaço livre)", t) or re.search(r"PÁGINA \d+", t):
            continue
        if re.fullmatch(r"\d{1,3}", t) and int(t) in (expected, expected + 1) and ind < 6:
            if int(t) == expected + 1:      # número não extraído do PDF: registra lacuna
                items.append(dict(n=expected, page=pg, context="", subject=subject, stem="", options={}, gap=True))
                expected += 1
            if expected == 1:               # descarta a capa de instruções: começa após 'Boa sorte'/'MÓDULO I'/'GRUPO 1'
                idx = max([i for i, x in enumerate(pre) if re.search(r"(?i)boa sorte|^m[óo]dulo i|^grupo 1", x)] or [-1])
                pre = pre[idx + 1:]
            subject = subject_from(pre, subject)
            subject = re.sub(r"(?i)^\s*((m[óo]dulo [ivx]+\s*-\s*)?conhecimentos\s+(b[áa]sicos|espec[íi]ficos(\s+(b[áa]sicos|avan[çc]ados))?)|grupo\s*\d)\s*", "", subject).strip() or subject
            ctxt = " ".join(pre).strip()
            if len(ctxt) < 140 and subject and subject in ctxt:      # só cabeçalhos: não é texto-base
                ctxt = ""
            cur = dict(n=expected, page=pg, context=ctxt, subject=subject, stem="", options={})
            items.append(cur)
            pre, expected, last_opt = [], expected + 1, None
            continue
        if cur is None:
            pre.append(t)
            continue
        m = OPT.match(t)
        if m and ind < 6:
            cur["options"][m.group(1)] = OPT.sub("", t)
            last_opt = m.group(1)
            continue
        if last_opt is None:
            cur["stem"] = (cur["stem"] + " " + t).strip()
        elif ind >= 6:                      # continuação (recuada) da alternativa
            cur["options"][last_opt] += " " + t
        elif last_opt != "E":               # linha na margem no meio das alternativas
            cur["options"][last_opt] += " " + t
        else:                               # depois da E, na margem: contexto do próximo item
            pre.append(t)
            cur = dict(cur)
            items[-1] = cur
            cur = None
            last_opt = None
    return items


def parse_fgv_gab(pdf, tipo=1):
    d = pymupdf.open(pdf)
    lines = []
    for p in d:
        lines += [l.strip() for l in p.get_text().splitlines() if l.strip()]
    res, on, i = {}, False, 0
    while i < len(lines):
        l = lines[i]
        m = re.search(r"Prova Tipo (\d)", l)
        if m:
            on = int(m.group(1)) == tipo
            i += 1
            continue
        if on and re.fullmatch(r"\d{1,3}", l) and i + 1 < len(lines) and re.fullmatch(r"[A-E]\*{0,3}|\*", lines[i + 1]):
            token = answer_token(lines[i + 1])
            res[int(l)] = "*" if token == "X" else token
            i += 2
            continue
        i += 1
    return res


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    it = parse_fgv(sys.argv[1])
    print(len(it), "itens; opções incompletas:", [x["n"] for x in it if len(x["options"]) != 5][:30])
    a = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    for x in it[a - 1:a + 1]:
        print(x["n"], "| subj:", x["subject"], "| ctx:", x["context"][:100], "\n  stem:", x["stem"][:170], "\n  ", {k: v[:45] for k, v in x["options"].items()})
