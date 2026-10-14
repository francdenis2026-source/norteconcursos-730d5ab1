"""Compara official_answer do banco com o gabarito oficial definitivo baixado do site da banca. Uso: python -X utf8 check_gab_db.py"""
import os, re, sys, urllib.request
from urllib.parse import quote
sys.path.insert(0, os.path.dirname(__file__))
import pc_import_lib as L
import parse_ceb_mc as C
import import_fgv as F

D = os.environ["TEMP"] + "/provas/gab/"
FG = "https://conhecimento.fgv.br/sites/default/files/concursos/"
CHECKS = [  # (contest_name no banco, ano, url do gabarito, função -> {n: letra|'*'|'X'})
    ("Polícia Civil do Ceará – Delegado de Polícia Civil", 2025, "https://cdn.cebraspe.org.br/concursos/pc_ce_25_delegado/arquivos/Gab_Definitivo_084_PC_CE_001_01.pdf", C.gab_blocks_generic),
    ("Polícia Civil de Minas Gerais – Delegado de Polícia Substituto", 2025, FG + "gabaritodefinitivo_pcgmpdelegado.pdf", lambda p: F.gab_pairs(p, r"Prova Tipo 1", r"Prova Tipo [2-4]")),
    ("Polícia Civil de Minas Gerais – Investigador de Polícia I", 2025, FG + "gabaritodefinitivo_pcgmpinvestigador.pdf", lambda p: F.gab_pairs(p, r"Prova Tipo 1", r"Prova Tipo [2-4]")),
    ("Polícia Civil de Minas Gerais – Médico-Legista", 2025, FG + "gabaritodefinitivo_pcgmpmedico-002.pdf", lambda p: F.gab_pairs(p, r"Prova Tipo 1", r"Prova Tipo [2-4]")),
    ("Polícia Civil de Santa Catarina – Delegado de Polícia", 2024, FG + "pcscdelegado2024_gabarito_definitivo_20240220.pdf", lambda p: F.gab_blocks(p, 1)),
    ("Polícia Civil do Piauí – Delegado de Polícia Civil", 2026, FG + "pcpi-delegado-gabarito-definitivo.pdf", lambda p: F.gab_pairs(p, r"Delegado de Polícia - 1 -", r"Delegado de Polícia - [2-9] -")),
]


def fetch(u):
    f = D + re.sub(r"\W", "_", u)[-80:] + ".pdf"
    if not os.path.exists(f):
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        open(f, "wb").write(urllib.request.urlopen(req, timeout=60).read())
    return f


if __name__ == "__main__":
    for contest, year, url, parse in CHECKS:
        try:
            off = parse(fetch(url))
        except Exception as e:
            print("FALHA", contest, str(e)[:80]); continue
        rows = L.rest("GET", f"official_exam_questions?select=item_number,official_answer,content_status&contest_name=eq.{quote(contest)}&exam_year=eq.{year}&limit=300")
        bad = []
        for r in rows:
            o = off.get(r["item_number"])
            o = "X" if o in ("*", "X") else o
            if o is None:
                bad.append((r["item_number"], r["official_answer"], "sem gabarito oficial")); continue
            if o != r["official_answer"]:
                bad.append((r["item_number"], r["official_answer"], o))
        print(f"{contest[:60]} {year}: banco={len(rows)} oficial={len(off)} divergentes={len(bad)}", bad[:12])
