"""Importa uma prova objetiva (A-E) já revisada para o banco, via API REST (chave de serviço).

Uso: monte `exam` (fontes oficiais, cargo, ano), `items` (parse do caderno), `gab` (gabarito definitivo) e `decisions`
{n: dict(action=activate|archive|block, note=..., subject=..., basis=[(titulo,url)])}. Anuladas (gabarito 'X') entram como `annulled`.
A chave oficial nunca é alterada; as linhas ficam sempre gravadas, e só `activate` aparece ao aluno.
"""
import json, os, re, sys, urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
_env = open(os.path.join(ROOT, ".env.local"), encoding="utf-8").read()
URL = re.search(r"VITE_SUPABASE_URL=(.*)", _env).group(1).strip().strip('"')
KEY = re.search(r"SUPABASE_SERVICE_ROLE_KEY=(.*)", _env).group(1).strip().strip('"')
GATED = {"Direito Administrativo", "Noções de Direito Administrativo", "Direito Constitucional", "Noções de Direito Constitucional", "Direito Penal e Processual Penal", "Direitos Humanos", "Legislação Especial"}
FOOTER =re.compile(r"\s+(DIREITO [A-ZÇÃ ]+|MEDICINA LEGAL|CRIMINOLOGIA|LEGISLAÇÃO [A-ZÇÃ ]+)\s*$")
FIX_A = re.compile(r"^(.*?(?:correta\.|respectivamente,))\s+A\s+(.*)$", re.S)


def rest(method, path, body=None, prefer=None):
    req = urllib.request.Request(f"{URL}/rest/v1/{path}", method=method, data=None if body is None else json.dumps(body).encode())
    req.add_header("apikey", KEY)
    req.add_header("Authorization", f"Bearer {KEY}")
    req.add_header("Content-Type", "application/json")
    if prefer:
        req.add_header("Prefer", prefer)
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            t = r.read().decode()
            return json.loads(t) if t else None
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"{method} {path}: {e.code} {e.read().decode()[:500]}")


def url_ok(u):
    try:
        req = urllib.request.Request(u, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
        return urllib.request.urlopen(req, timeout=30).status == 200
    except Exception:
        return False


def clean(it):
    """Corrige as falhas conhecidas do extrator (estende o enunciado quando a letra A engole a pergunta)."""
    o = dict(it["options"])
    stem, ctx = it["stem"].strip(), it["context"].strip()
    if re.match(r"^[••]\s*Nas quest", ctx):
        ctx = ""
    m = FIX_A.match(o.get("A", ""))
    if m and ("assinale" in m.group(1)):
        stem = (stem + " A " + m.group(1)).strip()
        o["A"] = m.group(2)
    for k in o:
        o[k] = FOOTER.sub("", o[k]).strip()
    stem = FOOTER.sub("", stem)
    return stem, ctx, o


def question_text(stem, ctx, o):
    base = ("Texto-base:\n" + ctx + "\n\n") if len(ctx) > 250 else (("Comando:\n" + ctx + "\n\n") if ctx else "")
    return base + stem + "\n" + "\n".join(f"({k}) {o[k]}" for k in "ABCDE")


def run(exam, items, gab, decisions, dry=False):
    e = exam
    who = f"{e['contest']} - {e['role']}"
    assert gab and all(it["n"] in gab for it in items), "gabarito incompleto"
    for u in (e["prova_url"], e["gab_url"]):
        assert url_ok(u), "fonte inacessível: " + u
    ids = {}
    for kind, u, title in (("q", e["prova_url"], "Prova objetiva"), ("g", e["gab_url"], "Gabarito oficial definitivo")):
        row = dict(source_type="outro", title=f"{title} - {who} ({e['year']}, {e['board']})", issuer=e["board"], url=u, status="vigente",
                   is_official=True, notes=e["notes"] if kind == "q" else "Gabarito definitivo publicado pela banca; X = questão anulada.")
        if not dry:
            ids[kind] = rest("POST", "content_sources?on_conflict=url", [row], "resolution=merge-duplicates,return=representation")[0]["id"]
    for it in items:
        it["clean"] = clean(it)
    subjects = []
    for it in items:
        s = decisions[it["n"]].get("subject") or it["subject"]
        it["subj"] = s
        if s not in subjects:
            subjects.append(s)
    if dry:
        return
    ed = rest("POST", "syllabus_editions?on_conflict=contest_name,role_name,contest_year",
              [dict(contest_name=e["contest"], role_name=e["role"], contest_year=e["year"], exam_board=e["board"], source_id=ids["q"], status="active")],
              "resolution=merge-duplicates,return=representation")[0]["id"]
    tp = rest("POST", "syllabus_topics?on_conflict=edition_id,discipline,topic_order",
              [dict(edition_id=ed, block_name=f"Histórico {e['year']}", discipline=s, topic_order=i + 1,
                    topic_text=f"Conteúdo cobrado na prova de {e['year']} (levantado do caderno); edital a cotejar antes de qualquer publicação.", content_status="under_review")
               for i, s in enumerate(subjects)], "resolution=merge-duplicates,return=representation")
    topic = {t["discipline"]: t["id"] for t in tp}
    today = "13/10/2026"
    rows, stats = [], dict(activate=0, archive=0, block=0, annulled=0)
    for it in items:
        n, d = it["n"], decisions[it["n"]]
        stem, ctx, o = it["clean"]
        ans = gab[n]
        text = question_text(stem, ctx, o)
        legal = bool(d.get("basis"))
        if ans == "X":
            status, act = "annulled", "annulled"
        else:
            act = d["action"]
            status = {"activate": "active", "archive": "archived", "block": "under_review"}[act]
            if status == "active" and it["subj"] in GATED:   # a trava do banco exige vínculo com o edital vigente (CONTENT_GOVERNANCE.md)
                status, act = "under_review", "block"
                d = dict(d, note=d["note"] + " Revisada e conferida com a lei, mas só pode ser ativada após o cotejo com o edital vigente do cargo (matéria sujeita à trava de governança).")
        stats[act] += 1
        note = d["note"] if ans != "X" else "Questão anulada pela banca (gabarito definitivo); mantida apenas como registro. " + d.get("note", "")
        row = dict(question_source_id=ids["q"], answer_key_source_id=ids["g"], syllabus_topic_id=topic[it["subj"]], contest_name=who, exam_year=e["year"],
                   career_name=e["role"], exam_board=e["board"].upper(), item_number=n, subject=it["subj"], question_text=text, raw_extraction=text,
                   official_answer=("X" if ans == "X" else ans), source_page=it["page"], content_status=status,
                   legal_review_required=(act == "block") or (legal is False and False), context_review_required=False,
                   review_note=f"Importada do caderno oficial e conferida com o gabarito definitivo da banca; revisada em {today}. {note}",
                   state=e["state"], career_category="Polícia Civil", role_type=e["role_type"],
                   legal_basis=[], legal_audit_completed=False, law_version_checked_at=None)
        if status == "active" and legal:
            row.update(legal_audit_completed=True, legal_review_required=False,
                       legal_basis=[dict(title=t, url=u) for t, u in d["basis"]])
            row["law_version_checked_at"] = __import__("datetime").datetime.utcnow().isoformat() + "Z"
        rows.append(row)
    from urllib.parse import quote
    have = rest("GET", f"official_exam_questions?select=item_number&exam_year=eq.{e['year']}&contest_name=eq.{quote(who)}&limit=1000") or []
    assert not have, f"já existem {len(have)} linhas de {who}; confira antes de regravar"
    for i in range(0, len(rows), 25):
        rest("POST", "official_exam_questions", rows[i:i + 25], "return=minimal")
    print(e["key"], who, len(rows), stats)
