# Importa a prova objetiva P1 do PC-DF Delegado 2026 (Cebraspe, itens Certo/Errado com justificativa da banca).
import os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
import pymupdf
import parse_ceb_mc as C
import import_lib as L

SP = r"C:\Users\familia\AppData\Local\Temp\claude\C--Users-familia-Desktop-PROVAS-FEITAS-POR-MIM\eea12891-4053-4f7f-9f29-6eb433a8dbb7\scratchpad\csv\ceb"


def parse_ce_just(pdf):
    d = pymupdf.open(pdf)
    lines = []
    for pi, p in enumerate(d):
        for l in p.get_text().splitlines():
            t = re.sub(r"\s+", " ", l).strip()
            if t and not re.match(r"^CEBRASPE\b", t) and not re.fullmatch(r"(?i)(rascunho|espaço livre)", t):
                lines.append((pi + 1, t))
    items, pre, ctx, expected = [], [], "", 1
    cur, mode = None, None
    for pg, t in lines:
        if re.match(r"^--\s*PROVA OBJETIVA", t):
            pre = []
            continue
        m = re.match(r"^(\d{1,3})(?: (?=\S).*)?$", t)
        if mode in (None, "pre") and m and int(m.group(1)) == expected:
            if pre:
                ctx = " ".join(pre).strip()
            pre = []
            cur = dict(n=expected, page=pg, context=ctx, subject="Conhecimentos do cargo de Delegado", stem=t[len(m.group(1)):].strip(), options={}, ce=True, just="")
            items.append(cur)
            expected += 1
            mode = "stem"
            continue
        if mode == "stem":
            if t.startswith("JUSTIFICATIVA"):
                mode = "just"
                cur["just"] = re.sub(r"^JUSTIFICATIVA\s*[-–]\s*", "", t)
            else:
                cur["stem"] += " " + t
            continue
        if mode == "just":
            if "<FimJust>" in t:
                cur["just"] += " " + t.replace("<FimJust>", "").strip()
                mode = "pre"
            else:
                cur["just"] += " " + t
            continue
        pre.append(t)
    for it in items:
        it["just"] = it["just"].strip()
    return items


if __name__ == "__main__":
    e = dict(key="df_del", contest="Polícia Civil do Distrito Federal", role="Delegado de Polícia", year=2026, board="Cebraspe", tipo=" (P1)",
             prova_url="https://cdn.cebraspe.org.br/concursos/pc_df_26_delegado/arquivos/710BA7293977732DDD213CAE2E329E52507C348D3E446135F8978861CDA880F1.pdf",
             gab_url="https://cdn.cebraspe.org.br/concursos/pc_df_26_delegado/arquivos/793E15AB2B5B357F2DD614A0ACAEE093B9DFE97618931164855D005CDFF89841.pdf",
             applied="05/07/2026")
    items = parse_ce_just(os.path.join(SP, "df__prova_gab_prelim.pdf"))
    gab = C.gab_blocks_generic(os.path.join(SP, "df__gab_definitivo.pdf"))
    gab = {n: ("*" if v == "X" else v) for n, v in gab.items()}
    print(len(items), "itens;", len(gab), "no gabarito; anuladas:", [n for n, v in gab.items() if v == "*"],
          "| sem gabarito:", [x["n"] for x in items if x["n"] not in gab][:10], "| gabarito além:", [n for n in gab if n > len(items)][:10])
    if "--gerar" in sys.argv:
        out = ["-- Importação PC-DF Delegado 2026 (Cebraspe). Gerado por scripts/review/import_df.py.\n"]
        L.build_exam(e, items, gab, out)
        open(os.path.join(L.ROOT, "supabase", "migrations", "20260927460000_import_df_del.sql"), "w", encoding="utf-8").write("\n".join(out))
