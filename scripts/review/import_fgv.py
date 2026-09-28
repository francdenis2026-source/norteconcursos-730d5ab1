# Importa provas objetivas da FGV (caderno tipo 1 + gabarito definitivo) para official_exam_questions,
# todas como 'under_review' (nada vai para o aluno antes da revisão de conteúdo).
# Gera supabase/migrations/20260927430000_import_fgv_pc_2024_2025.sql
import os, re, sys, json
sys.path.insert(0, os.path.dirname(__file__))
import pymupdf
import parse_fgv as F

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SP = r"C:\Users\familia\AppData\Local\Temp\claude\C--Users-familia-Desktop-PROVAS-FEITAS-POR-MIM\eea12891-4053-4f7f-9f29-6eb433a8dbb7\scratchpad\csv\fgv"
BASE = "https://conhecimento.fgv.br/sites/default/files/concursos/"
SEP = "-- @@\n"


def q(s):
    assert "$q$" not in s
    return "$q$" + s + "$q$"


def gab_pairs(pdf, start_re, stop_re):
    """Gabarito em pares 'número / letra' em linhas alternadas, por seção."""
    d = pymupdf.open(pdf)
    lines = [l.strip() for p in d for l in p.get_text().splitlines() if l.strip()]
    res, on, i = {}, False, 0
    while i < len(lines):
        l = lines[i]
        if re.search(start_re, l):
            on = True
        elif re.search(stop_re, l):
            on = False
        elif on and re.fullmatch(r"\d{1,3}", l) and i + 1 < len(lines) and re.fullmatch(r"[A-E*]", lines[i + 1]):
            res[int(l)] = lines[i + 1]
            i += 1
        i += 1
    return res


def gab_blocks(pdf, tipo):
    """Gabarito da ACADEPOL/SC: bloco de 20 números seguido de 20 letras."""
    d = pymupdf.open(pdf)
    lines = [l.strip() for p in d for l in p.get_text().splitlines() if l.strip()]
    res, on, nums, lets = {}, False, [], []
    for l in lines:
        m = re.search(r"TIPO\s+(\d)", l)
        if m:
            on = int(m.group(1)) == tipo
            nums, lets = [], []
            continue
        if not on:
            continue
        if re.fullmatch(r"\d{1,3}", l):
            if lets:                       # começou um novo bloco de números
                nums, lets = [], []
            nums.append(int(l))
        elif re.fullmatch(r"[A-E*]", l):
            lets.append(l)
            if len(lets) == len(nums):
                res.update(dict(zip(nums, lets)))
                nums, lets = [], []
    return res


EXAMS = [
    dict(key="sc_del", contest="Polícia Civil de Santa Catarina", role="Delegado de Polícia", year=2024, board="FGV",
         prova="delegado-objetivacns100-tipo-1.pdf", pfile="fgv_sc__delegado-objetivacns100-tipo-1.pdf",
         gab="pcscdelegado2024_gabarito_definitivo_20240220.pdf", gfile="fgv_sc__gabarito_definitivo.pdf",
         gparse=lambda p: gab_blocks(p, 1), applied="28/01/2024"),
    dict(key="mg_del", contest="Polícia Civil de Minas Gerais", role="Delegado de Polícia Substituto", year=2025, board="FGV",
         prova="delegado-de-policia-substitutocns101-tipo-1.pdf", pfile="fgv_mg1__delegado-de-policia-substitutocns101-tipo-1.pdf",
         gab="gabaritodefinitivo_pcgmpdelegado.pdf", gfile="fgv_mg1__gabaritodefinitivo_pcgmpdelegado.pdf",
         gparse=lambda p: gab_pairs(p, r"Prova Tipo 1", r"Prova Tipo [2-4]"), applied="26/01/2025"),
    dict(key="mg_leg", contest="Polícia Civil de Minas Gerais", role="Médico-Legista", year=2025, board="FGV",
         prova="medico-legistacns201-tipo-1.pdf", pfile="fgv_mg2__medico-legistacns201-tipo-1.pdf",
         gab="gabaritodefinitivo_pcgmpmedico-002.pdf", gfile="fgv_mg2__gabaritodefinitivo_pcgmpmedico-002.pdf",
         gparse=lambda p: gab_pairs(p, r"Prova Tipo 1", r"Prova Tipo [2-4]"), applied="26/01/2025"),
    dict(key="mg_per1", contest="Polícia Civil de Minas Gerais", role="Perito Criminal – Área I", year=2025, board="FGV",
         prova="perito-criminal-area-icns301-tipo-1.pdf", pfile="fgv_mg3__perito-criminal-area-icns301-tipo-1.pdf",
         gab="gabaritodefinitivo_pcgmperito1-002pcmg.pdf", gfile="fgv_mg3__gabaritodefinitivo_pcgmperito1-002pcmg.pdf",
         gparse=lambda p: gab_pairs(p, r"Área I - 1\s*$", r"Área I - [2-4]|Área II - "), applied="26/01/2025"),
    dict(key="mg_per2", contest="Polícia Civil de Minas Gerais", role="Perito Criminal – Área II", year=2025, board="FGV",
         prova="perito-criminal-area-iicns302-tipo-1.pdf", pfile="fgv_mg3__perito-criminal-area-iicns302-tipo-1.pdf",
         gab="gabaritodefinitivo_pcgmperito1-002pcmg.pdf", gfile="fgv_mg3__gabaritodefinitivo_pcgmperito1-002pcmg.pdf",
         gparse=lambda p: gab_pairs(p, r"Área II - 1\s*$", r"Área II - [2-4]|Área I - "), applied="26/01/2025"),
    dict(key="mg_inv", contest="Polícia Civil de Minas Gerais", role="Investigador de Polícia I", year=2025, board="FGV",
         prova="investigador-de-policia-icns401-tipo-1.pdf", pfile="fgv_mg4__investigador-de-policia-icns401-tipo-1.pdf",
         gab="gabaritodefinitivo_pcgmpinvestigador.pdf", gfile="fgv_mg4__gabaritodefinitivo_pcgmpinvestigador.pdf",
         gparse=lambda p: gab_pairs(p, r"Prova Tipo 1", r"Prova Tipo [2-4]"), applied="26/01/2025"),
    dict(key="pi_del", contest="Polícia Civil do Piauí", role="Delegado de Polícia Civil", year=2026, board="FGV",
         prova="delegado-de-policia-cns100-tipo-1.pdf", pfile="fgv_pi__delegado-de-policia-cns100-tipo-1.pdf",
         gab="pcpi-delegado-gabarito-definitivo.pdf", gfile="fgv_pi__pcpi-delegado-gabarito-definitivo.pdf",
         gparse=lambda p: gab_pairs(p, r"^Delegado de Polícia - 1 - ", r" - \d - Turno"), applied="24/01/2026"),
    dict(key="pi_inv", contest="Polícia Civil do Piauí", role="Oficial Investigador", year=2026, board="FGV",
         prova="oficial-investigador-cns100-tipo-1.pdf", pfile="fgv_pi__oficial-investigador-cns100-tipo-1.pdf",
         gab="pc-pi-investigador-e-perito-2025.pdf", gfile="fgv_pi__pc-pi-investigador-e-perito-2025.pdf",
         gparse=lambda p: gab_pairs(p, r"^Oficial Investigador - 1 - ", r" - \d - Turno"), applied="25/01/2026"),
]
LEGAL = re.compile(r"(?i)direito|lei |legisla|constitucional|penal|humanos|org[âa]nica|criminologia|estatuto")
NEEDS_FIG = re.compile(r"(?i)\b(figura|imagem|cartaz|gr[áa]fico|charge|tirinha|mapa|infogr[áa]fico|foto|ilustra)")
BASEREF = re.compile(r"(?i)\b(texto|fragmento|trecho|poema|charge|cartaz|par[áa]grafo)\b")


def build_exam(e, out):
    items = F.parse_fgv(os.path.join(SP, e["pfile"]))
    gab = e["gparse"](os.path.join(SP, e["gfile"]))
    pu, gu = BASE + e["prova"], BASE + e["gab"]
    assert gab, e["key"] + ": gabarito vazio"
    missing_gab = [it["n"] for it in items if it["n"] not in gab]
    extra = [n for n in gab if n > len(items)]
    out.append(f"-- {e['contest']} – {e['role']} ({e['year']}): {len(items)} itens extraídos, {len(gab)} no gabarito; sem gabarito: {missing_gab}; gabarito além dos itens: {extra}\n")
    who = f"{e['contest']} – {e['role']} ({e['year']}, {e['board']})"
    out.append(f"insert into public.content_sources (source_type,title,issuer,url,status,notes) values\n"
               f"('outro',{q('Prova objetiva (Tipo 1) – ' + who)},{q(e['board'])},{q(pu)},'vigente',{q('Caderno oficial aplicado em ' + e['applied'] + '; publicado pela banca.')}),\n"
               f"('outro',{q('Gabarito oficial definitivo (Tipo 1) – ' + who)},{q(e['board'])},{q(gu)},'vigente',{q('Gabarito definitivo publicado pela banca; * = questão anulada.')})\n"
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
        legal = bool(LEGAL.search(it["subject"]))
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


if __name__ == "__main__":
    only = set(sys.argv[1:])
    for e in EXAMS:
        if only and e["key"] not in only:
            continue
        out = ["-- Importação das provas objetivas da FGV (PC-SC 2024 e PC-MG 2025). Gerado por scripts/review/import_fgv.py.\n"]
        build_exam(e, out)
        path = os.path.join(ROOT, "supabase", "migrations", f"20260927430{EXAMS.index(e)}00_import_{e['key']}.sql")
        open(path, "w", encoding="utf-8").write("\n".join(out))
