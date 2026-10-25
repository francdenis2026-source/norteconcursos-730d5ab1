# PJC-MT 2022 (UFMT): Escrivão e Investigador de Polícia, caderno único de 60 questões. Uso: python -X utf8 pc_mt_2022.py [--dry]
# Gabarito definitivo = preliminar de 20/02/2022 com as questões 2 e 10 anuladas (único PROCEDENTE na análise dos recursos).
import datetime, json, os, re, sys
from urllib.parse import quote
import pymupdf
sys.path.insert(0, os.path.dirname(__file__))
import pc_import_lib as L
from pc_rj_2022 import LAW as RJLAW

PL = "https://www.planalto.gov.br/ccivil_03/"
LAW = dict(RJLAW, L7960=("Lei 7.960/1989 – Prisão temporária", PL + "leis/l7960.htm"), JEC=("Lei 9.099/1995 – Juizados Especiais", PL + "leis/l9099.htm"),
           CTB=("Código de Trânsito Brasileiro", PL + "leis/l9503compilado.htm"), ABUSO=("Lei 13.869/2019 – Abuso de autoridade", PL + "_ato2019-2022/2019/lei/l13869.htm"))
T = os.environ["TEMP"] + "/provas/mt/"
B = "https://www.concursos.ufmt.br/Portal/Concursos/PJC2022/"
RAW = ("C E B E A D C B E C  D A  E A C  B E C C A  D D E B A C E B D A  E A A C B  A D C E A  "
       "B B E C A  D E C D B  E C D A C  D D B A B").split()
assert len(RAW) == 60, len(RAW)
KEY = {n: k for n, k in zip(range(1, 61), RAW)}
ANUL = {2, 10}
SUBJ = {}
for a, b, s in [(1, 10, "Língua Portuguesa"), (11, 12, "Princípios de Ética e de Filosofia"), (13, 15, "História e Geografia de Mato Grosso"), (16, 20, "Raciocínio Lógico"),
                (21, 30, "Noções de Informática"), (31, 35, "Noções de Direito Administrativo"), (36, 40, "Noções de Direito Constitucional"), (41, 45, "Noções de Direito Penal"),
                (46, 50, "Noções de Direito Processual Penal"), (51, 55, "Legislação Penal Especial"), (56, 60, "Organização e Estatuto da Polícia Judiciária Civil de MT")]:
    for n in range(a, b + 1):
        SUBJ[n] = s
BASIS = {32: "L14133", 33: "IMPR", 34: "CF", 35: "CF", **{n: "CF" for n in range(36, 41)}, 41: "CP", 42: "CP", 43: "CP", 44: "CP", 45: "CP", 46: "L7960", 47: "CPP", 48: "CPP",
         49: "CPP", 50: "CPP", 51: "ABUSO", 52: "JEC", 53: "CTB", 54: "ECA", 55: "DROG"}
OK = "Resposta conferida com a lei vigente em 13/10/2026 e com o gabarito definitivo da banca."
BLOCK = {
    7: "Retida: depende de uma charge (imagem) que o PDF não traz em texto; falta transcrição visual conferida.",
    14: "Retida: depende de um gráfico (imagem) que o PDF não traz em texto; falta transcrição visual conferida.",
    19: "Retida: as alternativas são diagramas (imagens) que o PDF não traz em texto.",
    31: "Retida: depende da Lei Complementar Estadual 04/1990 (MT), cujo texto vigente não foi conferido em fonte oficial.",
    45: "Retida: a chave (assédio sexual) não pôde ser conferida: o enunciado completo e o julgado de referência não foram verificados contra o texto atual do Código Penal.",
    **{n: "Retida: depende da Lei Complementar Estadual 407/2010 (MT), cujo texto vigente não foi conferido em fonte oficial." for n in range(56, 61)},
}
SPECIAL = {
    2: "Anulada pela banca (recursos procedentes; a troca de voz passiva muda o tempo verbal em quase todas as alternativas).",
    10: "Anulada pela banca (recursos procedentes).",
    22: "Cita Windows 10 (suporte encerrado em 14/10/2025); o conceito segue válido e a resposta não muda.",
    32: "Conferida com a Lei 14.133/2021, art. 6º, XXXII e XXXIII: se o contratado só elabora o projeto executivo é contratação semi-integrada.",
    38: "Conferida com o art. 60, § 1º, da CF: intervenção federal, estado de defesa ou estado de sítio.",
    16: "Conferida por lógica: a negação de (A e B) equivale a (não A) ou (não B).",
    17: "Conferida por lógica: de Maria não é delegada resulta José não é delegado e Pedro é delegado; a alternativa E é verdadeira.",
    20: "Conferida por lógica: a negação de (A então não-B) é (A e B).",
}
mt = json.load(open(T + "mt_items.json", encoding="utf-8"))
anexo = "\n".join(p.get_text() for p in pymupdf.open(T + "anexo3.pdf"))
sq = lambda s: re.sub(r"\s+", " ", s).strip()
ADM = sq(anexo[anexo.index("Noções de Direito Administrativo"): anexo.index("Noções de Direito Constitucional")])
CON = sq(anexo[anexo.index("Noções de Direito Constitucional"): anexo.index("Noções de Direito Penal")])
BASE = dict(year=2022, board="UFMT", state="MT", contest="Polícia Judiciária Civil do Estado de Mato Grosso", prova_url=B + "CADERNO%20PJC.pdf", gab_url=B + "GABARITO%20PJC.pdf",
            notes="Caderno oficial único (Escrivão e Investigador) do Edital 001/2022-SEPLAG/SESP/MT, publicado pela UFMT em 20/02/2022; gabarito definitivo = preliminar com as questões 2 e 10 anuladas.")
EX = {"esc": dict(BASE, key="mt_esc22", role="Escrivão de Polícia", role_type="Escrivão"), "inv": dict(BASE, key="mt_inv22", role="Investigador de Polícia", role_type="Investigador")}
if __name__ == "__main__":
    for k, e in EX.items():
        items = json.loads(json.dumps(mt))
        gab, dec = {}, {}
        for it in items:
            n = it["n"]
            if n == 19:
                it["options"] = {x: f"[diagrama {x} do caderno oficial]" for x in "ABCDE"}
            it["subject"] = SUBJ[n]
            gab[n] = "X" if n in ANUL else KEY[n]
            if n in BLOCK:
                dec[n] = dict(action="block", note=BLOCK[n], subject=SUBJ[n])
                continue
            d = dict(action="activate", note=SPECIAL.get(n, OK), subject=SUBJ[n])
            if n in BASIS:
                d["basis"] = [LAW[BASIS[n]]]
            dec[n] = d
        L.run(e, items, gab, dec, dry="--dry" in sys.argv)
        if "--dry" in sys.argv:
            continue
        c = f"{e['contest']} - {e['role']}"
        now = datetime.datetime.now(datetime.timezone.utc).isoformat()
        ed = L.rest("GET", f"syllabus_editions?select=id&contest_name=eq.{quote(e['contest'])}&role_name=eq.{quote(e['role'])}&contest_year=eq.2022")[0]["id"]
        top = {}
        for j, (disc, body) in enumerate((("Noções de Direito Administrativo", ADM), ("Noções de Direito Constitucional", CON))):
            top[disc] = L.rest("POST", "syllabus_topics?on_conflict=edition_id,discipline,topic_order",
                               [dict(edition_id=ed, block_name="Edital de abertura – Anexo III", discipline=disc, topic_order=30 + j, topic_text=body[:6000], content_status="current")],
                               "resolution=merge-duplicates,return=representation")[0]["id"]
        rows = L.rest("GET", f"official_exam_questions?select=item_number,subject,review_note&contest_name=eq.{quote(c)}&exam_year=eq.2022&content_status=eq.under_review&limit=100")
        n = 0
        for q in rows:
            if q["subject"] not in top or "Retida:" in (q["review_note"] or ""):
                continue
            law = LAW[BASIS[q["item_number"]]]
            note = re.sub(r" Revisada e conferida com a lei, mas só pode ser ativada.*$", "", q["review_note"] or "")
            L.rest("PATCH", f"official_exam_questions?contest_name=eq.{quote(c)}&exam_year=eq.2022&item_number=eq.{q['item_number']}",
                   dict(content_status="active", legal_audit_completed=True, legal_review_required=False, law_version_checked_at=now, legal_basis=[dict(title=law[0], url=law[1])],
                        current_syllabus_topic_id=top[q["subject"]], review_note=note + f" Cotejada com o conteúdo programático ({q['subject']}) do Anexo III do edital."), "return=minimal")
            n += 1
        print(c, "cotejo liberou", n)
