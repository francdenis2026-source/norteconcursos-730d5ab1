# Cotejo com o edital: grava o conteúdo programático oficial (Administrativo e Constitucional) e libera as questões revisadas.
# Uso: python -X utf8 pc_cotejo_edital.py. Lê os editais de %TEMP%/provas (ceb/rj_edital.pdf, se/se_edital.pdf).
import os, re, sys
from urllib.parse import quote
import pymupdf
sys.path.insert(0, os.path.dirname(__file__))
import pc_import_lib as L
from pc_rj_2022 import LAW

T = os.environ["TEMP"] + "/provas/"
NOW = __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat()


def text(p):
    return "\n".join(x.get_text() for x in pymupdf.open(p))


def squeeze(s):
    return re.sub(r"\s+", " ", s).strip()


rj = text(T + "ceb/rj_edital.pdf")
a0 = rj.index("DIREITO ADMINISTRATIVO\n") if "DIREITO ADMINISTRATIVO\n" in rj else 177227
a0 = 177227; c0 = 191844
c1 = rj.index("DIREITO ", c0 + 30) if "DIREITO " in rj[c0 + 30:] else c0 + 12000
se = text(T + "se/se_edital.pdf")
SRC = {  # (contest, ano, edição) -> (texto adm, texto const)
    "Polícia Civil do Estado do Rio de Janeiro - Delegado de Polícia": (squeeze(rj[a0:c0]), squeeze(rj[c0:c1])),
    "Polícia Civil do Estado de Sergipe - Agente de Polícia Judiciária": (squeeze(se[141224:142669]), squeeze(se[142669:se.index("NOÇÕES DE DIREITO PENAL", 142669)])),
    "Polícia Civil do Estado de Sergipe - Escrivão de Polícia": (squeeze(se[149020:150465]), squeeze(se[150465:se.index("NOÇÕES DE DIREITO PENAL", 150465)])),
}
# fora do cotejo (ficam em revisão): norma estadual sem texto conferido, ou assunto que o edital não lista
HOLD = {"Polícia Civil do Estado do Rio de Janeiro - Delegado de Polícia": {48, 69, 71, 75}}
STATE_LAW = re.compile(r"Lei Estadual n.º 2\.148|estágio probatório")


def basis_for(txt, subj):
    out = [LAW["CF"]]
    if re.search(r"licita|pregão|14\.133", txt, re.I): out.append(LAW["L14133"])
    if re.search(r"improbidade", txt, re.I): out.append(LAW["IMPR"])
    if re.search(r"mandado de segurança", txt, re.I): out.append(LAW["MS"])
    if re.search(r"LGPD|transparência ativa", txt, re.I): out += [LAW["LAI"], LAW["LGPD"]]
    if re.search(r"LINDB|Introdução às Normas", txt, re.I): out.append(LAW["LINDB"])
    return [dict(title=t, url=u) for t, u in out]


for contest, (adm, con) in SRC.items():
    year = 2022 if "Janeiro" in contest else 2021
    base = contest.rsplit(" - ", 1)[0]
    role = contest.rsplit(" - ", 1)[1]
    ed = L.rest("GET", f"syllabus_editions?select=id&contest_name=eq.{quote(base)}&role_name=eq.{quote(role)}&contest_year=eq.{year}")[0]["id"]
    topics = {}
    for disc, order, body in (("Direito Administrativo", 20, adm), ("Direito Constitucional", 21, con)):
        r = L.rest("POST", "syllabus_topics?on_conflict=edition_id,discipline,topic_order",
                   [dict(edition_id=ed, block_name="Edital de abertura – conteúdo programático", discipline=disc, topic_order=order,
                         topic_text=body[:6000], content_status="current")], "resolution=merge-duplicates,return=representation")
        topics[disc] = r[0]["id"]
    rows = L.rest("GET", f"official_exam_questions?select=item_number,subject,question_text&contest_name=eq.{quote(contest)}&exam_year=eq.{year}&content_status=eq.under_review&subject=in.({quote('Direito Administrativo')},{quote('Direito Constitucional')})&limit=200")
    n = 0
    for q in rows:
        if q["item_number"] in HOLD.get(contest, set()) or STATE_LAW.search(q["question_text"]):
            continue
        L.rest("PATCH", f"official_exam_questions?contest_name=eq.{quote(contest)}&exam_year=eq.{year}&item_number=eq.{q['item_number']}",
               dict(content_status="active", legal_audit_completed=True, legal_review_required=False, law_version_checked_at=NOW,
                    legal_basis=basis_for(q["question_text"], q["subject"]), current_syllabus_topic_id=topics[q["subject"]],
                    review_note=f"Revisada em 13/10/2026 (lei vigente e gabarito definitivo) e cotejada com o conteúdo programático do Edital nº 1 de abertura do concurso ({q['subject']})."),
               "return=minimal")
        n += 1
    print(contest, "liberadas:", n, "retidas:", len(rows) - n)
