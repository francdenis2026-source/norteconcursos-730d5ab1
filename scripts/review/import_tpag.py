# Importa PC-MG Técnico-Assistente (Auxiliar de Perícia) 2026, Cebraspe: 3 eixos numerados em sequência (1-60).
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import parse_ceb_mc as C
import import_lib as L
SP = r"C:\Users\familia\AppData\Local\Temp\claude\C--Users-familia-Desktop-PROVAS-FEITAS-POR-MIM\eea12891-4053-4f7f-9f29-6eb433a8dbb7\scratchpad\csv\ceb"
B = "https://cdn.cebraspe.org.br/concursos/pc_mg_25_tpag/arquivos/"
EIXOS = [("geral", 1, "Eixo Geral"), ("leg", 16, "Eixo Legislação"), ("esp", 31, "Eixo Específico")]
if __name__ == "__main__":
    items, gab = [], {}
    for k, start, nome in EIXOS:
        its = C.parse_ceb_mc(os.path.join(SP, f"tpag__prova_{k}.pdf"), start=start)
        for it in its:
            it["subject"] = nome
        items += its
        gab.update(C.gab_blocks_generic(os.path.join(SP, f"tpag__gab_{k}.pdf")))
    gab = {n: ("*" if v == "X" else v) for n, v in gab.items()}
    print(len(items), "itens;", len(gab), "no gabarito; anuladas:", [n for n, v in gab.items() if v == "*"], "| faltam:", [x["n"] for x in items if x["n"] not in gab][:10],
          "| incompletos:", [x["n"] for x in items if not x.get("gap") and len(x["options"]) != 4][:10], "| lacunas:", [x["n"] for x in items if x.get("gap")])
    e = dict(key="mg_tpag", contest="Polícia Civil de Minas Gerais", role="Técnico-Assistente – Auxiliar de Perícia (TPAG)", year=2026, board="Cebraspe", tipo=" (3 eixos)", n_opts=4,
             prova_url=B + "31AD6B36C6C09518DD76EEECD97707FCCC25AF3CBF9C9643A3A5B739E548A0A6.pdf",
             gab_url=B + "C61D250D6FA81D954109D271929695930BDC2CF6E777C9B9BF32B966811EB72E.pdf", applied="29/03/2026")
    if "--gerar" in sys.argv:
        out = ["-- Importação PC-MG TPAG (Auxiliar de Perícia) 2026, Cebraspe. Gerado por scripts/review/import_tpag.py.\n-- Fontes complementares: eixo Legislação (prova 50D3F9E7..., gabarito 982FAA75...) e eixo Específico (prova 8D683FFE..., gabarito D127CA9D...).\n"]
        L.build_exam(e, items, gab, out)
        open(os.path.join(L.ROOT, "supabase", "migrations", "20260927470000_import_mg_tpag.sql"), "w", encoding="utf-8").write("\n".join(out))
