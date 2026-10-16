# PC-SE 2021 (Cebraspe, certo/errado): Agente de Polícia Judiciária (cargo 1) e Escrivão de Polícia (cargo 2), conhecimentos específicos.
# Uso: python -X utf8 pc_se_2021.py [--dry]. Conhecimentos gerais (texto-base de Português) ficam para uma etapa própria.
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
import parse_ceb_ce as P
from parse_ceb_mc import gab_blocks_generic as G
import pc_import_lib as L
from pc_rj_2022 import LAW

D = os.environ["TEMP"] + "/provas/se/"
B = "https://cdn.cebraspe.org.br/concursos/PC_SE_21/arquivos/"
PL = "https://www.planalto.gov.br/ccivil_03/"
LAW = dict(LAW, LAV=("Lei 9.613/1998 – Lavagem de dinheiro (texto compilado)", PL + "leis/l9613.htm"),
           ABUSO=("Lei 13.869/2019 – Abuso de autoridade", PL + "_ato2019-2022/2019/lei/l13869.htm"))
BASE = dict(year=2021, board="Cebraspe", state="SE", contest="Polícia Civil do Estado de Sergipe",
            notes="Caderno oficial de conhecimentos específicos (Edital PC/SE 2021) aplicado em 19/09/2021; publicado pela banca. Cargos 1 e 2 conforme a ordem do edital (Agente, Escrivão).")
EX = {
    "605_PCSE_001_01": dict(BASE, key="se_agente21", role="Agente de Polícia Judiciária", role_type="Agente",
                            prova_url=B + "605_PCSE_001_01.PDF", gab_url=B + "GAB_DEFINITIVO_605_PCSE_001_01.PDF"),
    "605_PCSE_002_01": dict(BASE, key="se_escrivao21", role="Escrivão de Polícia", role_type="Escrivão",
                            prova_url=B + "605_PCSE_002_01.PDF", gab_url=B + "GAB_DEFINITIVO_605_PCSE_002_01.PDF"),
}
RANGES = [(31, 40, "Direito Administrativo", None), (41, 50, "Direito Constitucional", "CF"), (51, 55, "Direito Processual Penal", "CPP"),
          (56, 58, "Direito Penal", "CP"), (59, 62, "Direito Processual Penal", "CPP"), (63, 64, "Legislação Penal Especial", "DROG"),
          (65, 67, "Legislação Penal Especial", "LAV"), (68, 70, "Legislação Penal Especial", "ABUSO"), (71, 78, "Estatística", None),
          (79, 86, "Contabilidade", None), (87, 94, "Informática", None), (95, 100, "Medicina Legal", None)]
OK = "Resposta conferida com a lei vigente em 13/10/2026 e com o gabarito definitivo."
NOTE = {
    59: ("block", "Retida: a chave (E) diverge da leitura do art. 13-B do CPP, que permite ao delegado requisitar diretamente dados de localização; conferir com a banca."),
    63: ("block", "Retida: o STF (RE 635.659, 2024) mudou a natureza do porte para consumo (art. 28 da Lei 11.343); a pergunta sobre a pena precisa ser reavaliada."),
    64: ("block", "Retida: o STF (RE 635.659, 2024) mudou a natureza do porte para consumo (art. 28 da Lei 11.343); a pena de prestação de serviços precisa ser reavaliada."),
    83: ("block", "Retida: depende do CPC 27 e das normas contábeis de custo de aquisição; não recotejada com o texto vigente."),
    32: ("block", "Retida: depende da Lei Estadual 2.148/1977 (Sergipe), cujo texto vigente não foi conferido em fonte oficial."),
    34: ("block", "Retida: depende da Lei Estadual 2.148/1977 (Sergipe) e do prazo do estágio probatório; texto vigente não conferido."),
    33: ("block", "Retida: depende da Lei Estadual 2.148/1977 (Sergipe); texto vigente não conferido."),
}
for n in range(71, 79):
    NOTE[n] = ("block", "Retida: o enunciado depende de fórmulas e símbolos que a extração do PDF não preserva; falta transcrição conferida com o caderno oficial.")
for n in (87, 88, 89, 92):
    NOTE[n] = ("activate", OK + " Conceito mantido; o item cita produto/versão (Windows 10, Office 365) que mudou de nome ou perdeu suporte, sem alterar a resposta.")


def decide(n1):
    for a, b, subj, law in RANGES:
        if a <= n1 <= b:
            act, note = NOTE.get(n1, ("activate", OK))
            d = dict(action=act, note=note, subject=subj)
            if n1 == 96: d["subject"] = "Direito da Criança e do Adolescente"; law = "ECA"
            if law and act == "activate": d["basis"] = [LAW[law]]
            return d


if __name__ == "__main__":
    allit = {f: P.parse_ceb_ce(D + f + ".pdf", 31) for f in EX}
    c1 = {x["stem"]: x["n"] for x in allit["605_PCSE_001_01"] if x["stem"]}
    for f, e in EX.items():
        items, gab = allit[f], G(D + "GAB_DEFINITIVO_" + f + ".pdf")
        dec = {}
        for it in items:
            it["ce"], it["subject"] = True, ""
            n1 = c1.get(it["stem"])
            if f.endswith("002_01") and n1 is None:
                n1 = 71 if it["n"] == 67 else None          # estatística única do cargo 2
            if it.get("gap"):
                dec[it["n"]] = dict(action="block", note=NOTE[74][1] if 74 in NOTE else NOTE[71][1], subject="Estatística")
            elif n1 is None:
                dec[it["n"]] = dict(action="activate", note=OK + " Arquivologia: conceitos e normas conferidos com a legislação arquivística (Lei 8.159/1991 e normas do CONARQ).", subject="Arquivologia")
            else:
                dec[it["n"]] = decide(n1)
            it["subject"] = dec[it["n"]]["subject"]
        L.run(e, items, gab, dec, dry="--dry" in sys.argv)
