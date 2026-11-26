#!/usr/bin/env python3
"""Cadastra as questões da Área de estudo PC-AC no catálogo do treinador.

1) Dá a cada questão um identificador estável (`u`, UUID derivado de assunto + enunciado) dentro de
   src/estudo/estudo-pc-acre.html, para a área e o banco falarem da mesma questão.
2) Gera os SQLs de carga em supabase/imports/pcac-area/ (tabela board_exam_questions, mesma da IDECAN),
   só com o conteúdo do cargo de Oficial Investigador (a mesma regra de src/estudo/estudo-pc-acre.html).
Idempotente: rodar de novo mantém os mesmos ids e SQLs.
"""
import hashlib, json, re, uuid, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = ROOT / "src/estudo/estudo-pc-acre.html"
OUT = ROOT / "supabase/imports/pcac-area"
CHUNK = 45

FORA_DO_CARGO = {"port_red", "cont_pericia", "ti_leis", "ti_ia"}
DISCIPLINA = {  # id da área -> (nome no catálogo, disciplina na matriz do edital)
    "port": ("Língua Portuguesa", "Língua Portuguesa"),
    "rl": ("Raciocínio Lógico", "Raciocínio Lógico"),
    "info": ("Noções de Informática", "Noções de Informática"),
    "acre": ("Realidade do Acre", "Realidade do Acre (étnica, social, geográfica, cultural, política e econômica)"),
    "contabilidade": ("Contabilidade Geral e Análise Financeira", "Contabilidade Geral e Análise Financeira"),
    "estatistica": ("Estatística", "Estatística"),
    "arquivologia": ("Arquivologia", "Arquivologia"),
    "ti": ("Tecnologia da Informação e Segurança da Informação", "Tecnologia da Informação e Segurança da Informação"),
    "analise": ("Análise de Dados e Informações", "Análise de Dados e Informações"),
    "adm": ("Noções de Administração", "Noções de Administração"),
}
CONTEST = "PC-AC 2026 — questão autoral"
URL = "https://norteconcursos.xyz/dashboard/estudo-pc-acre"

def plain(t):
    t = re.sub(r"<[^>]+>", "", str(t or ""))
    return t.replace("&nbsp;", " ").replace("&amp;", "&").strip()

def dq(t):  # literal entre $q$ ... $q$
    assert "$q$" not in t
    return "$q$" + t + "$q$"

def main():
    html = HTML.read_text(encoding="utf-8")
    a = html.index("const DATA = ") + len("const DATA = ")
    data, end = json.JSONDecoder().raw_decode(html[a:])
    qs = data["questions"]
    for q in qs:
        q["u"] = str(uuid.UUID(hashlib.md5(f"pcac-area|{q['t']}|{q['q']}".encode()).hexdigest()))
    HTML.write_text(html[:a] + json.dumps(data, ensure_ascii=False) + html[a + end:], encoding="utf-8")

    topic_name = {t["id"]: t["nome"] for t in data["topics"]}
    topic_sub = {}
    for s in data["subjects"]:
        for t in s.get("topics") or []:
            topic_sub[t["id"]] = s["id"]
            topic_name[t["id"]] = t["nome"]
    for t in data["topics"]:
        topic_sub[t["id"]] = "estatistica"
    topic_sub["comb"] = "rl"  # análise combinatória e progressões: Raciocínio Lógico no edital

    rows = []
    for i, q in enumerate(qs):
        if q["t"] in FORA_DO_CARGO:
            continue
        sid = topic_sub[q["t"]]
        subj, disc = DISCIPLINA[sid]
        letters = "ABCDE"
        opts = {letters[k]: plain(o) for k, o in enumerate(q["ops"])}
        expl = plain(q.get("exp"))
        if q.get("dica"):
            expl += "\n\nMacete: " + plain(q["dica"])
        rows.append((i + 1, q["u"], subj, disc, topic_name[q["t"]], plain(q["q"]), opts, letters[q["c"]], expl))

    for old in OUT.glob("*.sql"):
        if old.name[:3] in ("97-", "98-"):  # correções manuais: preservar
            continue
        old.unlink()
    head = ("with ed as (select t.id, t.discipline from public.syllabus_topics t "
            "join public.syllabus_editions e on e.id = t.edition_id "
            "where e.contest_name = 'Polícia Civil do Acre' and e.role_name = 'Oficial Investigador de Polícia' and e.contest_year = 2026)\n"
            "insert into public.board_exam_questions (id, board, contest_name, career_name, exam_year, exam_date, exam_type, item_number, subject, "
            "support_text, stem, options, official_answer, needs_visual, legal_review_required, law_version_checked_at, legal_basis, state, "
            "career_category, source_url, answer_key_url, review_note, explanation, difficulty, content_status, tested_topic, syllabus_topic_id) values\n")
    n_files = 0
    for start in range(0, len(rows), CHUNK):
        part = rows[start:start + CHUNK]
        vals = []
        for (item, u, subj, disc, topic, stem, opts, ans, expl) in part:
            vals.append(
                f"('{u}'::uuid,'IDECAN',{dq(CONTEST)},'Oficial Investigador',2026,null,'Autoral',{item},{dq(subj)},null,{dq(stem)},"
                f"{dq(json.dumps(opts, ensure_ascii=False))}::jsonb,'{ans}',false,false,null,'[]'::jsonb,'AC','Polícia Civil','{URL}','{URL}',"
                f"{dq('Questão autoral da Área de estudo PC-AC (não é transcrição de prova). Disciplina e assunto conforme o Anexo III do Edital 001/2026 SEAD/PCAC.')},"
                f"{dq(expl)},'média','active',{dq(topic)},(select id from ed where discipline = {dq(disc)}))"
            )
        n_files += 1
        (OUT / f"{n_files:02d}-questoes-{start + 1:03d}-a-{start + len(part):03d}.sql").write_text(
            f"-- Área de estudo PC-AC: questões {start + 1} a {start + len(part)} de {len(rows)} (parte {n_files}). Idempotente.\n" + head + ",\n".join(vals) + "\non conflict do nothing;\n",
            encoding="utf-8")
    (OUT / "99-conferir.sql").write_text(
        "-- Resultado esperado: total = %d, sem_topico = 0 (todas ligadas à matriz do edital).\n"
        "select count(*) as total, count(*) filter (where syllabus_topic_id is null) as sem_topico\n"
        "from public.board_exam_questions where contest_name = %s and content_status = 'active';\n" % (len(rows), dq(CONTEST)), encoding="utf-8")
    print(f"{len(rows)} questões, {n_files} arquivos SQL em {OUT}")

main()
