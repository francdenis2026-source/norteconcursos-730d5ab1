# Importa provas do Cebraspe (múltipla escolha) -> official_exam_questions (under_review).
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import parse_ceb_mc as C
import import_lib as L

SP = r"C:\Users\familia\AppData\Local\Temp\claude\C--Users-familia-Desktop-PROVAS-FEITAS-POR-MIM\eea12891-4053-4f7f-9f29-6eb433a8dbb7\scratchpad\csv\ceb"
EXAMS = [
    dict(key="ce_del", contest="Polícia Civil do Ceará", role="Delegado de Polícia Civil", year=2025, board="Cebraspe", tipo="",
         pfile="ce__084_PC_CE_001_01.pdf", gfile="ce__Gab_Definitivo_084_PC_CE_001_01.pdf",
         prova_url="https://cdn.cebraspe.org.br/concursos/pc_ce_25_delegado/arquivos/084_PC_CE_001_01.pdf",
         gab_url="https://cdn.cebraspe.org.br/concursos/pc_ce_25_delegado/arquivos/Gab_Definitivo_084_PC_CE_001_01.pdf",
         applied="25/05/2025", subject="Conhecimentos do cargo de Delegado"),
]
if __name__ == "__main__":
    only = set(sys.argv[1:])
    for i, e in enumerate(EXAMS):
        if only and e["key"] not in only:
            continue
        items = C.parse_ceb_mc(os.path.join(SP, e["pfile"]))
        for it in items:
            it["subject"] = e["subject"]
        gab = C.gab_blocks_generic(os.path.join(SP, e["gfile"]))
        gab = {n: ("*" if v == "X" else v) for n, v in gab.items()}
        out = ["-- Importação de provas do Cebraspe. Gerado por scripts/review/import_ceb.py.\n"]
        L.build_exam(e, items, gab, out)
        path = os.path.join(L.ROOT, "supabase", "migrations", f"20260927440{i}00_import_{e['key']}.sql")
        open(path, "w", encoding="utf-8").write("\n".join(out))
