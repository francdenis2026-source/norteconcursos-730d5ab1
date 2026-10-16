"""Baixa e extrai os cadernos (Tipo 1) e gabaritos definitivos do PC-AM 2022 (FGV). Saída: %TEMP%/provas/am/am_items.json"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(__file__))
import parse_fgv as F, gab_fgv_blocks as G
D = os.environ["TEMP"] + "/provas/am/"
B = "https://conhecimento.fgv.br/sites/default/files/concursos/"
CFG = {"del": ("ns001_-_delegado_de_policia_-_4a_classe_prova_objetivans001_tipo_1.pdf", "pcam2021e01_gabarito_definitivo.pdf", "Delegado"),
       "esc": ("escrivao_de_policia_-_4a_classens200_tipo_1.pdf", "pcam2021e02_gabarito_definitivo.pdf", "Escriv"),
       "inv": ("investigador_de_policia_-_4a_classens100_tipo_1.pdf", "pcam2021e02_gabarito_definitivo.pdf", "Investigador")}
os.makedirs(D, exist_ok=True)
out = {}
for k, (p, g, r) in CFG.items():
    for f in (p, g):
        if not os.path.exists(D + f):
            subprocess.run(["curl", "-sL", "-o", D + f, B + f], check=True)
    items, gb = F.parse_fgv(D + p), G.gab_for(D + g, r, 1)
    for x in items:
        x["ans"] = gb.get(x["n"])
    out[k] = items
json.dump(out, open(D + "am_items.json", "w", encoding="utf-8"), ensure_ascii=False)
print({k: len(v) for k, v in out.items()})
