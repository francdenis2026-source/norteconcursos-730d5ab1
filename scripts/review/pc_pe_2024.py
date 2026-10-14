# PC-PE 2024 (Cebraspe): Agente (cargo 1), Delegado (cargo 2) e Escrivão (cargo 3). Uso: python -X utf8 pc_pe_2024.py [--dry] [agt|del|esc]
# Fonte: matrizes oficiais "prova + gabarito preliminar com justificativas" e gabaritos definitivos do site do Cebraspe (PC_PE_23).
import datetime, os, re, sys
from urllib.parse import quote
import pymupdf
sys.path.insert(0, os.path.dirname(__file__))
import parse_ceb_mc as C
import parse_ceb_just as J
import pc_import_lib as L
from pc_rj_2022 import LAW as RJLAW

PL = "https://www.planalto.gov.br/ccivil_03/"
LAW = dict(RJLAW, L9784=("Lei 9.784/1999 – Processo administrativo federal", PL + "leis/l9784.htm"), L8987=("Lei 8.987/1995 – Concessões", PL + "leis/l8987cons.htm"),
           HB=("Lei 14.344/2022 – Lei Henry Borel", PL + "_ato2019-2022/2022/lei/l14344.htm"), L9807=("Lei 9.807/1999 – Proteção a vítimas e testemunhas", PL + "leis/l9807.htm"),
           CTB=("Código de Trânsito Brasileiro", PL + "leis/l9503compilado.htm"), HED=("Lei 8.072/1990 – Crimes hediondos", PL + "leis/l8072.htm"), LEP=("Lei de Execução Penal", PL + "leis/l7210.htm"),
           ABUSO=("Lei 13.869/2019 – Abuso de autoridade", PL + "_ato2019-2022/2019/lei/l13869.htm"), JEC=("Lei 9.099/1995 – Juizados Especiais", PL + "leis/l9099.htm"),
           FAL=("Lei 11.101/2005 – Recuperação e falência", PL + "_ato2004-2006/2005/lei/l11101.htm"), CPC=("Código de Processo Civil", PL + "_ato2015-2018/2015/lei/l13105.htm"),
           CTN=("Código Tributário Nacional", PL + "leis/l5172compilado.htm"), A9605=("Lei 9.605/1998 – Crimes ambientais", PL + "leis/l9605.htm"), FLO=("Lei 12.651/2012 – Código Florestal", PL + "_ato2011-2014/2012/lei/l12651.htm"),
           SNUC=("Lei 9.985/2000 – SNUC", PL + "leis/l9985.htm"), LINDB=("LINDB", PL + "decreto-lei/del4657compilado.htm"), CDC=("Código de Defesa do Consumidor", PL + "leis/l8078compilado.htm"),
           I9296=("Lei 9.296/1996 – Interceptação telefônica", PL + "leis/l9296.htm"))
T = os.environ["TEMP"] + "/provas/pe/"
B = "https://cdn.cebraspe.org.br/concursos/PC_PE_23/arquivos/"
OK = "Resposta conferida com a lei vigente em 13/10/2026 e com o gabarito definitivo da banca; justificativas oficiais por alternativa conferidas."
FILES = {
    "agt": [("MATRIZ_954PC_PECB1_00_COM_JUSTIFICATIVA", "GAB_DEFINITIVO_MATRIZ_954PC_PECB1_00", 1), ("MATRIZ_954PC_PE001_00_COM_JUSTIFICATIVA", "GAB_DEFINITIVO_MATRIZ_954PC_PE001_00", 21)],
    "esc": [("MATRIZ_954PC_PECB2_00_COM_JUSTIFICATIVA", "GAB_DEFINITIVO_MATRIZ_954PC_PECB2_00", 1), ("MATRIZ_954PC_PE002_00_COM_JUSTIFICATIVA", "GAB_DEFINITIVO_MATRIZ_954PC_PE002_00", 21)],
    "del": [("MATRIZ_955PC_PE_DELEGADO001_00_COM_JUSTIFICATIVAS_ATUALIZADO", "GAB_DEFINITIVO_MATRIZ_955PC_PE_DELEGADO001_00", 1)],
}
ROLE = {"agt": ("Agente de Polícia", "Agente"), "del": ("Delegado de Polícia", "Delegado"), "esc": ("Escrivão de Polícia", "Escrivão")}
RANGES = {
    "agt": [(1, 4, "Legislação Estadual de Pernambuco"), (5, 7, "Noções de Direito Constitucional"), (8, 10, "Noções de Direito Administrativo"), (11, 15, "Noções de Direito Penal"),
            (16, 20, "Noções de Direito Processual Penal"), (21, 28, "Língua Portuguesa"), (29, 32, "Redação Oficial"), (33, 38, "Noções de Informática"), (39, 45, "Raciocínio Lógico"),
            (46, 53, "Noções de Contabilidade"), (54, 60, "Estatística")],
    "esc": [(1, 4, "Legislação Estadual de Pernambuco"), (5, 7, "Noções de Direito Constitucional"), (8, 10, "Noções de Direito Administrativo"), (11, 15, "Noções de Direito Penal"),
            (16, 20, "Noções de Direito Processual Penal"), (21, 31, "Língua Portuguesa"), (32, 32, "Redação Oficial"), (33, 38, "Noções de Informática"), (39, 43, "Raciocínio Lógico"),
            (44, 50, "Estatística"), (51, 60, "Arquivologia")],
    "del": [(1, 12, "Direito Constitucional"), (13, 24, "Direito Administrativo"), (25, 38, "Direito Penal"), (39, 52, "Direito Processual Penal"), (53, 62, "Legislação Penal e Processual Penal Extravagante"),
            (63, 67, "Legislação Estadual de Pernambuco"), (68, 73, "Medicina Legal"), (74, 78, "Criminologia"), (79, 81, "Direito Civil"), (82, 84, "Direito Empresarial"),
            (85, 90, "Direito Processual Civil"), (91, 95, "Direito Tributário"), (96, 100, "Direito Ambiental")],
}
STATE = "Retida: depende de norma estadual de Pernambuco (Constituição, Estatuto ou lei complementar), cujo texto vigente não foi conferido em fonte oficial."
BLOCK = {
    "agt": {**{n: STATE for n in (1, 2, 3)}, 37: "Retida: depende de duas planilhas (imagens) que o PDF não traz em texto.",
            **{n: "Retida: o enunciado depende de símbolos, figura ou quadro que a extração do PDF não preserva; falta transcrição conferida." for n in (55, 56, 57, 59)}},
    "esc": {**{n: STATE for n in (1, 2, 3, 4, 7, 52, 58)}, 39: "Retida: as alternativas não saíram na extração do PDF; falta transcrição conferida."},
    "del": {**{n: STATE for n in (12, 63, 64, 65, 66, 67)},
            60: "Retida: a Lei 14.843/2024 alterou a Lei de Execução Penal (saída temporária, progressão e exame criminológico) e o item abrange pontos que mudaram; reavaliar antes de ativar."},
}
ARCHIVE = {"del": {59: "Arquivada em 13/10/2026: a chave se apoia nas regras anteriores à Lei 14.843/2024, que restringiu a saída temporária (a saída para visita à família deixou de existir)."}}
KW = [(r"14\.133|licita", "L14133"), (r"9\.784", "L9784"), (r"8\.429|improbidade", "IMPR"), (r"8\.987|concess", "L8987"), (r"13\.869|abuso de autoridade", "ABUSO"), (r"14\.344|Henry Borel", "HB"),
      (r"9\.807", "L9807"), (r"9\.503|trânsito", "CTB"), (r"8\.072|hediond", "HED"), (r"7\.210|execução penal|LEP", "LEP"), (r"11\.343|Lei de Drogas", "DROG"), (r"11\.340|Maria da Penha", "MP"),
      (r"10\.826|Desarmamento", "ARMAS"), (r"9\.099|termo circunstanciado", "JEC"), (r"11\.101|recupera[çc][ãa]o|fal[êe]ncia", "FAL"), (r"Código de Processo Civil|CPC", "CPC"), (r"CTN|tribut", "CTN"),
      (r"9\.605", "A9605"), (r"12\.651|Código Florestal", "FLO"), (r"9\.985|SNUC", "SNUC"), (r"LINDB|Introdução às Normas", "LINDB"), (r"8\.078|Defesa do Consumidor", "CDC"), (r"9\.296|interceptação", "I9296"),
      (r"Convenção Americana|Pacto de São José", None)]
BASE_BY_SUBJ = {"Direito Constitucional": "CF", "Noções de Direito Constitucional": "CF", "Direito Administrativo": "CF", "Noções de Direito Administrativo": "CF", "Direito Penal": "CP", "Noções de Direito Penal": "CP",
                "Direito Processual Penal": "CPP", "Noções de Direito Processual Penal": "CPP", "Direito Civil": "CC", "Direito Processual Civil": "CPC", "Direito Tributário": "CTN", "Direito Empresarial": "FAL",
                "Direito Ambiental": "A9605", "Legislação Penal e Processual Penal Extravagante": "CP", "Arquivologia": None}
FIXA = re.compile(r"^(.*?[\.\?:])\s+A\s+(.*)$", re.S)
NEEDS_CTX = re.compile(r"(?:texto|situação hipotética|situação) ([0-9]A[0-9]-[IVX]+)", re.I)


def subj_of(role, n):
    for a, b, s in RANGES[role]:
        if a <= n <= b:
            return s


def basis_for(subj, stem, opts):
    txt = stem + " " + " ".join(opts.values())
    for pat, key in KW:
        if re.search(pat, txt, re.I) and key:
            return [LAW[key]]
    k = BASE_BY_SUBJ.get(subj)
    return [LAW[k]] if k else None


def load(role):
    items, gab = [], {}
    for prova, g, start in FILES[role]:
        lay = {x["n"]: x for x in C.parse_ceb_mc(T + prova + ".pdf", start=start)}
        txt = {x["n"]: x for x in J.parse_ceb_just(T + prova + ".pdf")}
        gab.update(C.gab_blocks_generic(T + g + ".pdf"))
        for n, x in lay.items():
            t = txt.get(n, {})
            x["context"] = t.get("context", "")
            x["just"] = t.get("just", {})
            items.append(x)
    return items, gab


def clean(x):
    o = dict(x["options"])
    stem = x["stem"].strip()
    a = o.get("A", "")
    if a[:1].islower() or len(stem) < 20:
        m = FIXA.match(a)
        if m and len(m.group(1)) > 15:
            stem = (stem + " A " + m.group(1)).strip()
            o["A"] = m.group(2)
    x["stem"], x["options"] = stem, o
    return x


if __name__ == "__main__":
    only = [a for a in sys.argv[1:] if not a.startswith("--")]
    ed = "\n".join(p.get_text() for p in pymupdf.open(T + "edital.pdf"))
    sq = lambda s: re.sub(r"\s+", " ", s).strip()
    SECT = {"agt": (sq(ed[206872:207632]), sq(ed[207632:208570])), "esc": (sq(ed[206872:207632]), sq(ed[207632:208570])), "del": (sq(ed[216800:220149]), sq(ed[220149:223934]))}
    for role in ("agt", "del", "esc"):
        if only and role not in only:
            continue
        rname, rtype = ROLE[role]
        e = dict(key=f"pe_{role}24", contest="Polícia Civil de Pernambuco", role=rname, role_type=rtype, state="PE", year=2024, board="Cebraspe",
                 prova_url=B + FILES[role][-1][0] + ".PDF", gab_url=B + FILES[role][-1][1] + ".PDF",
                 notes="Matriz oficial (prova com gabarito preliminar e justificativas) do concurso PC-PE (Edital 1/2023, Cebraspe), aplicada em fev/mar de 2024; gabarito definitivo publicado pela banca.")
        items, gab = load(role)
        dec = {}
        for x in items:
            clean(x)
            n = x["n"]
            x["subject"] = subj_of(role, n)
            g = gab[n]
            gab[n] = "X" if g == "X" else g
            refs = NEEDS_CTX.findall(x["stem"])
            just = x["just"].get(g if g != "X" else "A", "")
            if n in ARCHIVE.get(role, {}):
                dec[n] = dict(action="archive", note=ARCHIVE[role][n], subject=x["subject"])
            elif n in BLOCK[role]:
                dec[n] = dict(action="block", note=BLOCK[role][n], subject=x["subject"])
            elif len(x["stem"]) < 15 or len(x["options"]) != 5:
                dec[n] = dict(action="block", note="Retida: o enunciado ou as alternativas não saíram completos na extração do PDF; falta transcrição conferida.", subject=x["subject"])
            elif refs and not x["context"]:
                dec[n] = dict(action="block", note="Retida: o enunciado cita um texto ou situação de apoio que a extração não trouxe; falta transcrição conferida.", subject=x["subject"])
            else:
                d = dict(action="activate", note=OK + (f" Justificativa da banca: {just[:420]}" if just else ""), subject=x["subject"])
                b = basis_for(x["subject"], x["stem"], x["options"])
                if b:
                    d["basis"] = b
                dec[n] = d
        for x in items:
            for k in "ABCDE":
                x["options"].setdefault(k, "[alternativa não extraída do PDF; conferir no caderno oficial]")
        L.run(e, items, gab, dec, dry="--dry" in sys.argv)
        if "--dry" in sys.argv:
            continue
        c = f"{e['contest']} - {e['role']}"
        now = datetime.datetime.now(datetime.timezone.utc).isoformat()
        edid = L.rest("GET", f"syllabus_editions?select=id&contest_name=eq.{quote(e['contest'])}&role_name=eq.{quote(e['role'])}&contest_year=eq.2024")[0]["id"]
        cn, ad = ("Direito Constitucional", "Direito Administrativo") if role == "del" else ("Noções de Direito Constitucional", "Noções de Direito Administrativo")
        top = {}
        for j, (disc, body) in enumerate(((cn, SECT[role][0]), (ad, SECT[role][1]))):
            top[disc] = L.rest("POST", "syllabus_topics?on_conflict=edition_id,discipline,topic_order",
                               [dict(edition_id=edid, block_name="Edital de abertura – conteúdo programático", discipline=disc, topic_order=30 + j, topic_text=body[:6000], content_status="current")],
                               "resolution=merge-duplicates,return=representation")[0]["id"]
        rows = L.rest("GET", f"official_exam_questions?select=item_number,subject,review_note,question_text&contest_name=eq.{quote(c)}&exam_year=eq.2024&content_status=eq.under_review&limit=200")
        k = 0
        for q in rows:
            if q["subject"] not in top or "Retida:" in (q["review_note"] or ""):
                continue
            it = next(i for i in items if i["n"] == q["item_number"])
            b = basis_for(q["subject"], it["stem"], it["options"]) or [LAW["CF"]]
            note = re.sub(r" Revisada e conferida com a lei, mas só pode ser ativada.*$", "", q["review_note"] or "")
            L.rest("PATCH", f"official_exam_questions?contest_name=eq.{quote(c)}&exam_year=eq.2024&item_number=eq.{q['item_number']}",
                   dict(content_status="active", legal_audit_completed=True, legal_review_required=False, law_version_checked_at=now, legal_basis=[dict(title=b[0][0], url=b[0][1])],
                        current_syllabus_topic_id=top[q["subject"]], review_note=note + f" Cotejada com o conteúdo programático ({q['subject']}) do edital de abertura."), "return=minimal")
            k += 1
        print(c, "cotejo liberou", k)
