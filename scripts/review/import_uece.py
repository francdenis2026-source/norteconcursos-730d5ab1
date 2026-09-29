# Importa a prova do Oficial Investigador de Polícia (PC-CE, UECE-CEV 2025), caderno/gabarito 1.
import os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
import pymupdf
import import_lib as L

SP = r"C:\Users\familia\AppData\Local\Temp\claude\C--Users-familia-Desktop-PROVAS-FEITAS-POR-MIM\eea12891-4053-4f7f-9f29-6eb433a8dbb7\scratchpad\csv\cev"
HDR = re.compile(r"(?i)^(GOVERNO DO ESTADO|CONCURSO P[ÚU]BLICO PARA|PROVA OBJETIVA REALIZADA|O n[úu]mero do gabarito|P[áa]gina \d+)")


def parse_uece(pdf):
    d = pymupdf.open(pdf)
    lines = []
    for pi, p in enumerate(d):
        for l in p.get_text().splitlines():
            t = re.sub(r"\s+", " ", l).strip()
            if t and not HDR.match(t) and not re.search(r"P[áa]gina \d+\s*$", t):
                lines.append((pi + 1, t))
    items, cur, pre, expected, last, subject = [], None, [], 1, None, "Conhecimentos do cargo"
    for pg, t in lines:
        if re.fullmatch(r"R ?A ?S ?C ?U ?N ?H ?O", t):
            continue
        if re.fullmatch(r"[A-ZÁÂÃÉÊÍÓÔÕÚÇ ,\-–/]{8,60}", t) and not re.match(r"^\d", t):
            subject = t.title().replace(" De ", " de ").replace(" Do ", " do ").replace(" Da ", " da ").replace(" E ", " e ")
            continue
        m = re.match(r"^(\d{2})\.\s+(.*)", t)
        if m and int(m.group(1)) == expected:
            cur = dict(n=expected, page=pg, context=" ".join(pre).strip(), subject=subject, stem=m.group(2), options={})
            items.append(cur)
            pre, expected, last = [], expected + 1, None
            continue
        if cur is None:
            pre.append(t)
            continue
        mo = re.match(r"^([A-E])\)\s+(.*)", t)
        if mo and (last is None and mo.group(1) == "A" or last and "ABCDE".index(mo.group(1)) == "ABCDE".index(last) + 1):
            cur["options"][mo.group(1)] = mo.group(2)
            last = mo.group(1)
            continue
        if last is None:
            cur["stem"] += " " + t
        elif last == "E" and re.match(r"^\d{2}\s", t):     # linha numerada de novo texto-base
            pre.append(t)
            cur = None
            last = None
        elif last == "E" and not t.endswith((".", "?", ")", ";", ":", "!", "”")) and False:
            pre.append(t)
        else:
            cur["options"][last] += " " + t
    return items


def gab1(pdf):
    d = pymupdf.open(pdf)
    toks = [l.strip() for p in d for l in p.get_text().splitlines() if l.strip()]
    on, nums, lets, res = False, [], [], {}
    for l in toks:
        if re.fullmatch(r"GABARITO DEFINITIVO \d", l):
            on = l.endswith("1")
            nums, lets = [], []
            continue
        if not on:
            continue
        if re.fullmatch(r"\d{2}", l):
            if lets:
                nums, lets = [], []
            nums.append(int(l))
        elif re.fullmatch(r"[A-EX]", l):
            lets.append(l)
            if len(lets) == len(nums):
                res.update(dict(zip(nums, lets)))
                nums, lets = [], []
    return {n: ("*" if v == "X" else v) for n, v in res.items()}


if __name__ == "__main__":
    e = dict(key="ce_oip", contest="Polícia Civil do Ceará", role="Oficial Investigador de Polícia", year=2025, board="UECE-CEV", tipo=" (Gabarito 1)",
             prova_url="https://www.cev.uece.br/wp-content/uploads/2025/08/oippcceg1.pdf",
             gab_url="https://www.cev.uece.br/wp-content/uploads/2025/08/comunicado1432025cev.pdf", applied="03/08/2025")
    items = parse_uece(os.path.join(SP, "oippcceg1.pdf"))
    gab = gab1(os.path.join(SP, "com143.pdf"))
    print(len(items), "itens;", len(gab), "no gabarito; anuladas:", [n for n, v in gab.items() if v == "*"],
          "| incompletos:", [x["n"] for x in items if len(x["options"]) != 5][:20])
    if "--gerar" in sys.argv:
        out = ["-- Importação PC-CE Oficial Investigador 2025 (UECE-CEV). Gerado por scripts/review/import_uece.py.\n"]
        L.build_exam(e, items, gab, out)
        open(os.path.join(L.ROOT, "supabase", "migrations", "20260927450000_import_ce_oip.sql"), "w", encoding="utf-8").write("\n".join(out))
