"""Biblioteca das ondas de revisão de conteúdo (official_exam_questions).

Uso (exemplo em wave_pf2014.py): defina um dicionário de decisões por item e chame build_sql().
Ações:
  activate : ativa; regrava question_text com contexto + item recuperados do caderno oficial
  archive  : content_status='archived' (fora da matriz do edital vigente)
  obsolete : content_status='obsolete' (conteúdo preso a produto/versão descontinuada)
  block    : permanece under_review, com nota explicando o motivo
A chave oficial (official_answer) NUNCA é alterada: a pontuação do aluno usa todas as linhas,
independentemente do status (ver get_official_answer_key).
"""
import io, re, sys, os

sys.path.insert(0, os.path.dirname(__file__))
import parse_exam as P

SEP = "-- @@\n"


def q(s):
    assert "$q$" not in s
    return "$q$" + s + "$q$"


def label_and_text(ctx, body):
    has_base = bool(re.search(r"^\s*\d{1,3} ", ctx, re.M)) or len(ctx) > 350
    label = "Texto-base" if has_base else "Comando"
    ctx = re.sub(r"^\s*BLOCO [IVX]+\s*\n", "", ctx.strip("\n"), flags=re.I)
    ctx = re.sub(r"\)\s*\n\(", " ", ctx)  # junta linhas de fonte "(...)\n(...)"
    return (label + ":\n" + ctx + "\n\nItem: " + body) if ctx else ("Item: " + body)


def topic_sql(disc, order, contest_name="Polícia Federal", year=2025, role="Agente de Polícia Federal"):
    return ("(select t.id from public.syllabus_topics t join public.syllabus_editions e on e.id=t.edition_id "
            "where e.contest_name=" + q(contest_name) + " and e.contest_year=%d and e.role_name=" % year + q(role)
            + " and t.discipline=" + q(disc) + " and t.topic_order=%d and t.block_name not ilike '%%Hist%%' limit 1)" % order)


def build_sql(cfg, decisions, out_path, header):
    res = cfg.get("res") or (P.parse(cfg["pdf"]) if cfg.get("pdf") else {})
    w = io.StringIO()
    w.write("-- " + header.replace("\n", "\n-- ") + "\n\n")
    counts = {"activate": 0, "archive": 0, "obsolete": 0, "block": 0}
    where = "exam_year=%d and career_name=%s" % (cfg["year"], q(cfg["career"]))
    for n in sorted(decisions):
        d = decisions[n]
        act, note = d["action"], d["note"]
        counts[act] += 1
        sets = ["review_note=" + q(note)]
        text = d.get("text")
        if act == "activate":
            if text is None or text == "auto":
                r = res.get(n)
                assert r and r["body"], f"item {n}: sem texto no PDF"
                ctx = d.get("ctx", r["context"])
                text = label_and_text(ctx, d.get("body", r["body"]))
            sets.append("question_text=" + q(text))
            sets.append("context_review_required=false")
            sets.append("content_status='active'")
            if d.get("topic"):
                sets.append("current_syllabus_topic_id=" + topic_sql(*d["topic"]))
            if d.get("audit"):
                sets.append("legal_audit_completed=true")
                sets.append("legal_review_required=false")
            if d.get("subject"):
                sets.append("subject=" + q(d["subject"]))
            if d.get("basis"):
                arr = ",".join("jsonb_build_object('title'," + q(t) + ",'url'," + q(u) + ")" for t, u in d["basis"])
                sets.append("legal_basis=jsonb_build_array(" + arr + ")")
                sets.append("law_version_checked_at=now()")
        elif act in ("archive", "obsolete"):
            sets.append("content_status=" + ("'archived'" if act == "archive" else "'obsolete'"))
        elif act == "block":
            if text:
                sets.append("question_text=" + q(text))
        w.write("update public.official_exam_questions set " + ", ".join(sets)
                + " where " + where + " and item_number=%d and content_status='under_review';\n" % n + SEP)
    open(out_path, "w", encoding="utf-8").write(w.getvalue())
    return counts
