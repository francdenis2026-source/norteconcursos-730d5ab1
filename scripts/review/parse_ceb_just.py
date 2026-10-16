"""Extrator das matrizes do Cebraspe 'prova + gabarito preliminar com justificativas' (PC-PE 2023/2024).
Texto corrido: 'Questão N', enunciado, alternativas 'A ...' a 'E ...', depois '||JUSTIFICATIVAS||' e '||X|| - ... _CORRETA/_INCORRETA'.
parse_ceb_just(pdf) -> [{n, stem, options{A..E}, just{A..E}, context}]; os textos-base ('Texto 1A1-I') são anexados às questões que os citam."""
import re, pymupdf


def parse_ceb_just(pdf):
    raw = "\n".join(p.get_text() for p in pymupdf.open(pdf))
    raw = re.sub(r"\n\s*CEBRASPE – PCPE – Edital: 2023[^\n]*\n", "\n", raw)
    raw = re.sub(r"\n\s*\*?\s*(?:Espaço livre|Rascunho)[^\n]*\n", "\n", raw, flags=re.I)
    parts = re.split(r"\n\s*Quest[ãa]o (\d{1,3})\s*\n", "\n" + raw)
    texts = {}                       # 'Texto 1A1-I' -> corpo
    items = []
    for k in range(1, len(parts), 2):
        n, body = int(parts[k]), parts[k + 1]
        pre = parts[k - 1] if k == 1 else ""
        # textos-base que aparecem DEPOIS das justificativas da questão anterior (antes da próxima 'Questão')
        mt = re.search(r"\n\s*(Texto [0-9A-Z]+-[IVX]+\s*\n[\s\S]*)$", body)
        trailing = None
        if mt:
            trailing = mt.group(1); body = body[:mt.start()]
        for m in re.finditer(r"(Texto [0-9A-Z]+-[IVX]+)\s*\n([\s\S]*?)(?=\n\s*Texto [0-9A-Z]+-[IVX]+\s*\n|$)", trailing or ""):
            texts[m.group(1)] = m.group(2).strip()
        head, _, just = body.partition("||JUSTIFICATIVAS||")
        mm = list(re.finditer(r"(?m)^([A-E]) (?=\S)", head))
        seq = []
        for x in mm:                  # só a sequência A..E crescente
            if len(seq) < 5 and x.group(1) == "ABCDE"[len(seq)]:
                seq.append(x)
        stem = head[: seq[0].start()] if seq else head
        opts = {}
        for i, x in enumerate(seq):
            end = seq[i + 1].start() if i + 1 < len(seq) else len(head)
            opts[x.group(1)] = re.sub(r"\s+", " ", head[x.end():end]).strip()
        jj = {}
        for x in re.finditer(r"\|\|([A-E])\|\|\s*-\s*([\s\S]*?)(?=\|\|[A-E]\|\||\Z)", just):
            jj[x.group(1)] = re.sub(r"\s+", " ", x.group(2)).strip(" */")
        items.append(dict(n=n, page=0, stem=re.sub(r"\s+", " ", stem).strip(), options=opts, just=jj, context=""))
    # textos-base iniciais (antes da primeira questão)
    first = parts[0]
    for m in re.finditer(r"(Texto [0-9A-Z]+-[IVX]+)\s*\n([\s\S]*?)(?=\n\s*Texto [0-9A-Z]+-[IVX]+\s*\n|$)", first):
        texts[m.group(1)] = m.group(2).strip()
    for it in items:
        refs = re.findall(r"[Tt]exto ([0-9A-Z]+-[IVX]+)", it["stem"])
        it["context"] = "\n\n".join(f"Texto {r}\n{texts['Texto ' + r]}" for r in dict.fromkeys(refs) if "Texto " + r in texts)
    return items
