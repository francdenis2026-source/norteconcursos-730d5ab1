# Cotejo do PC-AM 2022 com o conteúdo programático dos editais de abertura da FGV; libera as questões revisadas de matérias sujeitas à trava.
import datetime, os, re, sys
from urllib.parse import quote
import pymupdf
sys.path.insert(0, os.path.dirname(__file__))
import pc_import_lib as L
from pc_am_2022 import LAW, LEGAL_BASIS

T = os.environ["TEMP"] + "/provas/am/"
NOW = datetime.datetime.now(datetime.timezone.utc).isoformat()
sq = lambda s: re.sub(r"\s+", " ", s).strip()
d = "\n".join(p.get_text() for p in pymupdf.open(T + "ed_del.pdf"))
m = "\n".join(p.get_text() for p in pymupdf.open(T + "ed_dem.pdf"))


def cut(t, start, stop_re, frm=0):
    i = t.index(start, frm)
    j = re.search(stop_re, t[i + len(start):])
    return sq(t[i: i + len(start) + (j.start() if j else 6000)])


NEXT = r"NOÇÕES DE [A-ZÇÃ ]{6,}:|CONHECIMENTOS|➢"
c_idx = [x.start() for x in re.finditer("NOÇÕES DE DIREITO CONSTITUCIONAL:", m)]
a_idx = [x.start() for x in re.finditer("NOÇÕES DE DIREITO ADMINISTRATIVO:", m)]
SEC = {
    "Delegado de Polícia": {k: cut(d, f"{k.upper()}:", r"➢") for k in ("Direito Constitucional", "Direito Administrativo", "Direitos Humanos")},
    "Investigador de Polícia": {"Noções de Direito Constitucional": cut(m, "NOÇÕES DE DIREITO CONSTITUCIONAL:", NEXT, c_idx[0]),
                                "Noções de Direito Administrativo": cut(m, "NOÇÕES DE DIREITO ADMINISTRATIVO:", NEXT, a_idx[0])},
    "Escrivão de Polícia": {"Noções de Direito Constitucional": cut(m, "NOÇÕES DE DIREITO CONSTITUCIONAL:", NEXT, c_idx[1] if len(c_idx) > 1 else c_idx[0]),
                            "Noções de Direito Administrativo": cut(m, "NOÇÕES DE DIREITO ADMINISTRATIVO:", NEXT, a_idx[1] if len(a_idx) > 1 else a_idx[0])},
}
KEY = {"Delegado de Polícia": "del", "Escrivão de Polícia": "esc", "Investigador de Polícia": "inv"}
for role, secs in SEC.items():
    c = f"Polícia Civil do Estado do Amazonas - {role}"
    ed = L.rest("GET", f"syllabus_editions?select=id&contest_name=eq.{quote('Polícia Civil do Estado do Amazonas')}&role_name=eq.{quote(role)}&contest_year=eq.2022")[0]["id"]
    topics = {}
    for k, (disc, body) in enumerate(secs.items()):
        topics[disc] = L.rest("POST", "syllabus_topics?on_conflict=edition_id,discipline,topic_order",
                              [dict(edition_id=ed, block_name="Edital de abertura – conteúdo programático", discipline=disc, topic_order=30 + k, topic_text=body[:6000], content_status="current")],
                              "resolution=merge-duplicates,return=representation")[0]["id"]
    rows = L.rest("GET", f"official_exam_questions?select=item_number,subject,review_note&contest_name=eq.{quote(c)}&exam_year=eq.2022&content_status=eq.under_review&limit=200")
    n = 0
    for q in rows:
        if q["subject"] not in topics or "Retida:" in (q["review_note"] or ""):
            continue
        law = LAW[LEGAL_BASIS.get((KEY[role], q["item_number"]), "CF")]
        note = re.sub(r" Revisada e conferida com a lei, mas só pode ser ativada.*$", "", q["review_note"] or "")
        L.rest("PATCH", f"official_exam_questions?contest_name=eq.{quote(c)}&exam_year=eq.2022&item_number=eq.{q['item_number']}",
               dict(content_status="active", legal_audit_completed=True, legal_review_required=False, law_version_checked_at=NOW,
                    legal_basis=[dict(title=law[0], url=law[1])], current_syllabus_topic_id=topics[q["subject"]],
                    review_note=note + f" Cotejada com o conteúdo programático ({q['subject']}) do edital de abertura da FGV."), "return=minimal")
        n += 1
    print(role, "liberadas:", n, "de", len(rows))
