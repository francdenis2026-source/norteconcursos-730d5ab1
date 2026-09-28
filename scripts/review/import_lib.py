# Biblioteca comum de importação de provas objetivas (múltipla escolha A-E) para official_exam_questions.
import os, re, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SEP = "-- @@\n"


def q(s):
    assert "$q$" not in s
    return "$q$" + s + "$q$"


LEGAL = re.compile(r"(?i)direito|lei |legisla|constitucional|penal|humanos|org[âa]nica|criminologia|estatuto")
NEEDS_FIG = re.compile(r"(?i)\b(figura|imagem|cartaz|gr[áa]fico|charge|tirinha|mapa|infogr[áa]fico|foto|ilustra)")
LEGAL_TEXT = re.compile(r"(?i)(lei (n\.?[ºo°]|complementar|federal)|c[óo]digo (penal|de processo|civil|de tr[âa]nsito)|constitui[çc][ãa]o federal|CF|art\. ?\d|STF|STJ|s[úu]mula)")
BASEREF = re.compile(r"(?i)\b(texto|fragmento|trecho|poema|charge|cartaz|par[áa]grafo)\b")


def build_exam(e, items, gab, out):
    pu, gu = e["prova_url"], e["gab_url"]
    assert gab, e["key"] + ": gabarito vazio"
    missing_gab = [it["n"] for it in items if it["n"] not in gab]
    extra = [n for n in gab if n > len(items)]
    out.append(f"-- {e['contest']} – {e['role']} ({e['year']}): {len(items)} itens extraídos, {len(gab)} no gabarito; sem gabarito: {missing_gab}; gabarito além dos itens: {extra}\n")
    who = f"{e['contest']} – {e['role']} ({e['year']}, {e['board']})"
    out.append(f"insert into public.content_sources (source_type,title,issuer,url,status,notes) values\n"
               f"('outro',{q('Prova objetiva' + e.get('tipo', ' (Tipo 1)') + ' – ' + who)},{q(e['board'])},{q(pu)},'vigente',{q('Caderno oficial aplicado em ' + e['applied'] + '; publicado pela banca.')}),\n"
               f"('outro',{q('Gabarito oficial definitivo' + e.get('tipo', ' (Tipo 1)') + ' – ' + who)},{q(e['board'])},{q(gu)},'vigente',{q('Gabarito definitivo publicado pela banca; * = questão anulada.')})\n"
               f"on conflict (url) do update set checked_at=now(), status=excluded.status;\n" + SEP)
    ed = f"contest_name={q(e['contest'])} and role_name={q(e['role'])} and contest_year={e['year']}"
    out.append(f"insert into public.syllabus_editions (contest_name,role_name,contest_year,exam_board,source_id,status)\n"
               f"select {q(e['contest'])},{q(e['role'])},{e['year']},{q(e['board'])},id,'active' from public.content_sources where url={q(pu)}\n"
               f"on conflict (contest_name,role_name,contest_year) do update set source_id=excluded.source_id;\n" + SEP)
    subjects = []
    for it in items:
        s = it["subject"] or "Conhecimentos gerais"
        it["subject"] = s
        if s not in subjects:
            subjects.append(s)
    rows = ",".join(f"({q(s)},{i + 1})" for i, s in enumerate(subjects))
    out.append(f"insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)\n"
               f"select ed.id,{q('Histórico ' + str(e['year']))},v.d,v.o,{q('Conteúdo cobrado na prova de ' + str(e['year']) + ' (levantado do caderno); edital a cotejar antes de qualquer publicação.')},'under_review'\n"
               f"from (select id from public.syllabus_editions where {ed}) ed cross join (values {rows}) v(d,o)\n"
               f"on conflict (edition_id,discipline,topic_order) do nothing;\n" + SEP)
    # questões em lotes
    last_base, batch, size = "", [], 0
    stats = dict(ok=0, annulled=0, incomplete=0, gap=0)

    def flush():
        nonlocal batch, size
        if not batch:
            return
        out.append(
            "insert into public.official_exam_questions (question_source_id,answer_key_source_id,syllabus_topic_id,contest_name,exam_year,career_name,exam_board,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note)\n"
            f"select qs.id,gs.id,t.id,{q(e['contest'] + ' – ' + e['role'])},{e['year']},{q(e['role'])},{q(e['board'])},v.n,v.subj,v.txt,v.txt,v.ans,v.pg,v.st,v.legal,v.ctx,v.note\n"
            f"from (values {','.join(batch)}) v(n,subj,txt,ans,pg,st,legal,ctx,note)\n"
            f"join public.content_sources qs on qs.url={q(pu)} join public.content_sources gs on gs.url={q(gu)}\n"
            f"join public.syllabus_editions ed on ed.{ed.replace(' and ', ' and ed.')}\n"
            f"join public.syllabus_topics t on t.edition_id=ed.id and t.discipline=v.subj\n"
            f"on conflict (contest_name,exam_year,item_number) do update set official_answer=excluded.official_answer, question_text=excluded.question_text, raw_extraction=excluded.raw_extraction, subject=excluded.subject, review_note=excluded.review_note;\n" + SEP)
        batch, size = [], 0

    for it in items:
        n = it["n"]
        ans = gab.get(n)
        if not ans:
            continue
        notes = []
        ctx = it["context"]
        if len(ctx) > 250:
            last_base = ctx
        elif not ctx and last_base and BASEREF.search(it["stem"]) and not it.get("gap"):
            ctx = last_base
            notes.append("texto-base herdado do item anterior")
        opts = "\n".join(f"({k}) {it['options'].get(k, '[alternativa não extraída]')}" for k in "ABCDE")
        if it.get("gap"):
            txt = "[Enunciado não extraído do PDF; conferir no caderno oficial.]"
            notes.append("enunciado não extraído")
            stats["gap"] += 1
        else:
            txt = (("Texto-base:\n" + ctx + "\n\n") if ctx else "") + it["stem"] + "\n" + opts
            if len(it["options"]) != 5:
                notes.append("alternativas incompletas no PDF")
                stats["incomplete"] += 1
        status = "under_review"
        if ans == "*":
            ans, status = "X", "annulled"
            stats["annulled"] += 1
        stats["ok"] += 1
        legal = bool(LEGAL.search(it["subject"])) or bool(LEGAL_TEXT.search(txt))
        fig = bool(NEEDS_FIG.search(it["stem"] + " " + ctx)) or it.get("gap") or len(it["options"]) != 5
        note = "Importada do caderno oficial (Tipo 1) e conferida com o gabarito definitivo em 27/09/2026; aguardando revisão de conteúdo."
        if notes:
            note += " Observações: " + "; ".join(notes) + "."
        if fig:
            note += " Pode depender de figura/tabela do caderno."
        row = f"({n},{q(it['subject'])},{q(txt)},{q(ans)},{it['page']},{q(status)},{str(legal).lower()},{str(bool(fig)).lower()},{q(note)})"
        batch.append(row)
        size += len(row)
        if len(batch) >= 8 or size > 20000:
            flush()
    flush()
    print(f"{e['key']:8} {e['role'][:32]:32} itens={len(items)} gab={len(gab)} sem_gab={missing_gab} extra={extra} {stats}")


