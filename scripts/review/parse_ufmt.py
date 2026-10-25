"""Extrator do caderno da UFMT (PJC-MT 2022): 'QUESTÃO NN' + alternativas '[A] ...'; textos-base em 'Instrução: ... questões de NN a MM'."""
import re, pymupdf


def parse_ufmt(pdf):
    t = "\n".join(p.get_text() for p in pymupdf.open(pdf))
    t = re.sub(r"\n\d+ de 25 – CONCURSO PÚBLICO – POLÍCIA JUDICIÁRIA CIVIL\s*\n", "\n", t)
    t = re.sub(r"\nGRUPO [IV]+ – [^\n]*\n", "\n", t)
    parts = re.split(r"\n\s*QUESTÃO (\d{1,2})\s*\n", t)
    items, bases = [], []          # bases: (ini, fim, texto)
    pre = parts[0]
    for k in range(1, len(parts), 2):
        n, body = int(parts[k]), parts[k + 1]
        # texto-base que antecede a próxima questão: começa em 'Instrução:' dentro do corpo
        m = re.search(r"\n\s*(Instrução:[\s\S]*)$", body)
        nxt = None
        if m:
            nxt = m.group(1)
            body = body[:m.start()]
            r = re.search(r"quest[õo]es? (?:de )?(\d{1,2}) (?:a|e) (\d{1,2})|quest[ãa]o (\d{1,2})", nxt)
            if r:
                a = int(r.group(1) or r.group(3)); b = int(r.group(2) or r.group(3)); bases.append((a, b, nxt.strip()))
        opts = {}
        mm = list(re.finditer(r"\n\[([A-E])\]\s*", "\n" + body))
        stem = ("\n" + body)[: mm[0].start()].strip() if mm else body.strip()
        for i, x in enumerate(mm):
            end = mm[i + 1].start() if i + 1 < len(mm) else len("\n" + body)
            opts[x.group(1)] = re.sub(r"\s+", " ", ("\n" + body)[x.end():end]).strip()
        items.append(dict(n=n, page=0, stem=re.sub(r"\s+", " ", stem), options=opts, context=""))
    first = re.search(r"Instrução:[\s\S]*?(?=\n\s*QUESTÃO 01)", pre)
    if first:
        r = re.search(r"quest[õo]es? (?:de )?(\d{1,2}) (?:a|e) (\d{1,2})", first.group(0))
        bases.append((int(r.group(1)), int(r.group(2)), first.group(0).strip()))
    for a, b, txt in bases:
        for it in items:
            if a <= it["n"] <= b:
                it["context"] = txt
    return items
