"""Build the audited PF official-exam question import migration.

The source PDFs are intentionally kept out of git. Download the official PF
booklets and final answer keys into ``tmp/pdfs`` before running this script.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

import pdfplumber
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / "tmp" / "pdfs"
OUTPUT = ROOT / "supabase" / "migrations" / "20260926050000_pf_official_exam_question_import.sql"


@dataclass(frozen=True)
class Exam:
    year: int
    question_files: tuple[str, ...]
    answer_files: tuple[str, ...]
    question_url: str
    answer_url: str


EXAMS = (
    Exam(
        2014,
        ("pf-2014-prova.pdf",),
        ("pf-2014-gabarito.pdf",),
        "https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos/provas-e-gabaritos-de-concursos-anteriores/agente-de-policia-federal-2014/Prova%20de%20APF.PDF/view",
        "https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos/provas-e-gabaritos-de-concursos-anteriores/agente-de-policia-federal-2014/Gabarito%20Definitivo.PDF/view",
    ),
    Exam(
        2018,
        ("pf-2018-prova.pdf",),
        ("pf-2018-gabarito.pdf",),
        "https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos/provas-e-gabaritos-de-concursos-anteriores/concurso-carreira-policial-2018/agente/matriz_408_dgppf012__pag_9.pdf/view",
        "https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos/provas-e-gabaritos-de-concursos-anteriores/concurso-carreira-policial-2018/agente/gabarito-objetiva.pdf/view",
    ),
    Exam(
        2021,
        ("pf-2021-prova.pdf",),
        ("pf-2021-gabarito.pdf",),
        "https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos/provas-e-gabaritos-de-concursos-anteriores/concurso-carreira-policial-2021/agente-de-policia-federal/prova_cargo_2_agente_de_polcia_federal.pdf/view",
        "https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos/provas-e-gabaritos-de-concursos-anteriores/concurso-carreira-policial-2021/agente-de-policia-federal/gab_definitivo_apf.pdf/view",
    ),
    Exam(
        2025,
        ("pf-2025-bloco-i.pdf", "pf-2025-bloco-ii.pdf", "pf-2025-especificos.pdf"),
        ("pf-2025-gabarito-bloco-i.pdf", "pf-2025-gabarito-bloco-ii.pdf", "pf-2025-gabarito.pdf"),
        "https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos/provas-e-gabaritos-de-concursos-anteriores/concurso-carreira-policial-2025/provas-objetivas/cadernos-de-prova",
        "https://www.gov.br/pf/pt-br/acesso-a-informacao/servidores/concursos/provas-e-gabaritos-de-concursos-anteriores/concurso-carreira-policial-2025/provas-objetivas/gabaritos/gabaritos-definitivos",
    ),
)


RANGES = {
    2014: (
        (1, 24, "Língua Portuguesa"), (25, 30, "Língua Portuguesa"),
        (31, 48, "Informática"), (49, 56, "Atualidades"),
        (57, 70, "Raciocínio Lógico"), (71, 76, "Administração Pública"),
        (77, 78, "Administração Financeira e Orçamentária"),
        (79, 80, "Ética no Serviço Público"), (81, 90, "Contabilidade Geral"),
        (91, 100, "Economia"), (101, 108, "Direito Penal e Processual Penal"),
        (109, 112, "Direito Administrativo"), (113, 115, "Legislação Especial"),
        (116, 120, "Direito Constitucional"),
    ),
    2018: (
        (1, 24, "Língua Portuguesa"), (25, 28, "Direito Administrativo"),
        (29, 32, "Direito Constitucional"), (33, 36, "Direito Penal e Processual Penal"),
        (37, 40, "Legislação Especial"), (41, 50, "Estatística"),
        (51, 60, "Raciocínio Lógico"), (61, 96, "Informática"),
        (97, 120, "Contabilidade Geral"),
    ),
    2021: (
        (1, 24, "Língua Portuguesa"), (25, 27, "Direito Administrativo"),
        (28, 30, "Direito Constitucional"), (31, 34, "Direito Penal e Processual Penal"),
        (35, 36, "Legislação Especial"), (37, 48, "Estatística"),
        (49, 60, "Raciocínio Lógico"), (61, 96, "Informática"),
        (97, 120, "Contabilidade Geral"),
    ),
    2025: (
        (1, 10, "Língua Portuguesa"), (11, 16, "Noções de Direito Administrativo"),
        (17, 22, "Noções de Direito Constitucional"),
        (23, 28, "Direito Penal e Processual Penal"), (29, 34, "Direitos Humanos"),
        (35, 44, "Legislação Especial"), (45, 52, "Estatística"),
        (53, 60, "Raciocínio Lógico"), (61, 96, "Informática"),
        (97, 120, "Contabilidade Geral"),
    ),
}

LEGAL_SUBJECTS = {
    "Noções de Direito Administrativo", "Noções de Direito Constitucional",
    "Direito Administrativo", "Direito Constitucional",
    "Direito Penal e Processual Penal", "Direitos Humanos", "Legislação Especial",
}

# Items whose statement depends on a passage, table, figure, code listing or
# shared scenario that is not safely represented by a single extracted sentence.
CONTEXT_DEPENDENT_2025 = set(range(1, 9)) | set(range(45, 61)) | {81, 91, 92, 107, 108, 109, 110}


def sql(value: str | None) -> str:
    if value is None:
        return "null"
    return "'" + value.replace("'", "''") + "'"


def subject_for(year: int, item: int) -> str:
    for first, last, subject in RANGES[year]:
        if first <= item <= last:
            return subject
    raise ValueError(f"No subject mapping for {year}/{item}")


def extract_answer_key(paths: tuple[Path, ...]) -> dict[int, str]:
    answers: dict[int, str] = {}
    for path in paths:
        with pdfplumber.open(path) as pdf:
            words = pdf.pages[0].extract_words()
        rows: dict[float, list[dict]] = {}
        for word in words:
            rows.setdefault(round(float(word["top"]), 1), []).append(word)
        ordered = [(top, sorted(row, key=lambda w: float(w["x0"]))) for top, row in sorted(rows.items())]
        for index, (_, row) in enumerate(ordered[:-1]):
            if not row or row[0]["text"] != "Item":
                continue
            numbers = [int(w["text"]) for w in row[1:] if str(w["text"]).isdigit() and 1 <= int(w["text"]) <= 120]
            next_row = ordered[index + 1][1]
            if not next_row or next_row[0]["text"] != "Gabarito":
                continue
            marks = [str(w["text"]).strip().upper() for w in next_row[1:] if str(w["text"]).strip().upper() in {"C", "E", "X"}]
            if len(numbers) != len(marks):
                raise ValueError(f"Answer-key row mismatch in {path.name}: {len(numbers)} items, {len(marks)} marks")
            answers.update(dict(zip(numbers, marks)))
    return answers


def clean_statement(segment: str, item: int) -> tuple[str, str, bool]:
    segment = re.sub(rf"^\s*{item}\s+", "", segment, count=1)
    segment = re.sub(r"\|\|[^\n]+\|\|", " ", segment)
    segment = re.sub(r"(?m)^\s*(?:CESPE\s*\||CEBRASPE\s*[–-]).*$", " ", segment)
    raw = re.sub(r"\s+", " ", segment).strip()
    lines = [re.sub(r"\s+", " ", line).strip() for line in segment.splitlines() if line.strip()]
    kept: list[str] = []
    hypothetical = bool(lines and ("Situação hipotética" in lines[0] or "situação hipotética" in lines[0]))
    assertion_seen = False
    for line in lines:
        if kept and re.match(r"^(?:Texto\s|Julgue\b|Ainda\b|Com referência\b|No que se refere\b|Acerca\b|A respeito\b)", line):
            break
        kept.append(line)
        assertion_seen = assertion_seen or "Assertiva:" in line or "Nessa situação" in line or "Nessa hipótese" in line
        if re.search(r"[.!?][\"”']?$", line):
            if not hypothetical or assertion_seen:
                break
    statement = re.sub(r"\s+", " ", " ".join(kept)).strip()
    needs_review = len(statement) < 35 or hypothetical or bool(re.search(r"\b(texto|tabela|figura|gráfico|diagrama|precedente|acima|apresentad[oa])\b", statement, re.I))
    return statement, raw, needs_review


def extract_questions(paths: tuple[Path, ...]) -> dict[int, tuple[str, str, int, bool]]:
    questions: dict[int, tuple[str, str, int, bool]] = {}
    expected = 1
    page_offset = 0
    for path in paths:
        reader = PdfReader(path)
        for page_number, page in enumerate(reader.pages, start=1):
            text = page.extract_text() or ""
            if expected == 1 and "PROVA OBJETIVA" in text:
                text = text[text.find("PROVA OBJETIVA"):]
            matches = list(re.finditer(r"(?m)^\s*(\d{1,3})\s+", text))
            for index, match in enumerate(matches):
                number = int(match.group(1))
                if number != expected:
                    continue
                end = len(text)
                for candidate in matches[index + 1:]:
                    if int(candidate.group(1)) == expected + 1:
                        end = candidate.start()
                        break
                statement, raw, needs_review = clean_statement(text[match.start():end], number)
                questions[number] = (statement, raw, page_offset + page_number, needs_review)
                expected += 1
        page_offset += len(reader.pages)
    if expected != 121:
        missing = [number for number in range(1, 121) if number not in questions]
        raise ValueError(f"Question extraction stopped at {expected - 1}; missing {missing}")
    return questions


def build() -> None:
    required = {name for exam in EXAMS for name in (*exam.question_files, *exam.answer_files)}
    missing = sorted(name for name in required if not (PDF_DIR / name).exists())
    if missing:
        raise FileNotFoundError(f"Missing official PDFs: {', '.join(missing)}")

    rows: list[tuple] = []
    source_values: list[str] = []
    for exam in EXAMS:
        answers = extract_answer_key(tuple(PDF_DIR / name for name in exam.answer_files))
        questions = extract_questions(tuple(PDF_DIR / name for name in exam.question_files))
        if set(answers) != set(range(1, 121)):
            raise ValueError(f"Final key for {exam.year} does not contain items 1-120: {sorted(set(range(1,121)) - set(answers))}")
        source_values.extend((
            f"('outro','Prova objetiva PF - Agente - {exam.year}','Polícia Federal / CEBRASPE',{sql(exam.question_url)},'vigente','Caderno oficial usado para extração auditável de itens.')",
            f"('outro','Gabarito definitivo PF - Agente - {exam.year}','Polícia Federal / CEBRASPE',{sql(exam.answer_url)},'vigente','Gabarito oficial definitivo; X identifica item anulado.')",
        ))
        for item in range(1, 121):
            statement, raw, page, extraction_review = questions[item]
            answer = answers[item]
            subject = subject_for(exam.year, item)
            legal = subject in LEGAL_SUBJECTS
            context_dependent = extraction_review or (exam.year == 2025 and item in CONTEXT_DEPENDENT_2025)
            if answer == "X":
                status = "annulled"
                note = "Item anulado no gabarito oficial definitivo; não é exibido aos estudantes."
            elif exam.year == 2014 and subject == "Atualidades":
                status = "obsolete"
                note = "Conteúdo temporal de 2014; preservado apenas para auditoria histórica."
            elif exam.year < 2025:
                status = "under_review"
                note = "Item histórico aguardando confronto individual com o edital PF 2025 e fontes vigentes."
            elif legal:
                status = "under_review"
                note = "Conteúdo jurídico aguardando validação individual no Planalto ou tribunal competente."
            elif context_dependent:
                status = "under_review"
                note = "O item depende de texto, tabela, figura ou cenário compartilhado; requer revisão do material de apoio."
            else:
                status = "active"
                note = "Item oficial de 2025, não jurídico, autossuficiente e conferido no gabarito definitivo."
            rows.append((exam.year, item, subject, statement, raw, answer, page, status, legal, context_dependent, note))

    header = """-- Audited import of official PF Agent exams supplied by the student.
-- Historical and legal items are quarantined until the reviews required by
-- CONTENT_GOVERNANCE.md are complete. Annulled items are never published.

insert into public.content_sources (source_type,title,issuer,url,status,notes) values
""" + ",\n".join(source_values) + "\non conflict (url) do update set checked_at=now(),status=excluded.status,notes=excluded.notes;\n\n"

    schema = """-- Complete historical disciplines represented in the official 2014 syllabus.
with historical as (
  select id from public.syllabus_editions
  where contest_name='Polícia Federal' and role_name='Agente de Polícia Federal' and contest_year=2014
)
insert into public.syllabus_topics (edition_id,block_name,discipline,topic_order,topic_text,content_status)
select historical.id,'Histórico',d.discipline,1,d.topic_text,'current'
from historical cross join (values
  ('Atualidades','Temas nacionais e internacionais contemporâneos à aplicação de 2014; material temporal não reutilizável automaticamente.'),
  ('Administração Pública','Teorias administrativas, organização, cultura e gestão pública previstas na edição histórica.'),
  ('Administração Financeira e Orçamentária','Orçamento público e princípios orçamentários previstos na edição histórica.'),
  ('Ética no Serviço Público','Ética, deveres e conduta do servidor previstos na edição histórica.'),
  ('Economia','Microeconomia e estruturas de mercado previstas na edição histórica.')
) d(discipline,topic_text)
on conflict (edition_id,discipline,topic_order) do update set topic_text=excluded.topic_text;

create table if not exists public.official_exam_questions (
  id uuid primary key default gen_random_uuid(),
  question_source_id uuid not null references public.content_sources(id),
  answer_key_source_id uuid not null references public.content_sources(id),
  syllabus_topic_id uuid not null references public.syllabus_topics(id),
  contest_name text not null default 'Polícia Federal',
  exam_year integer not null,
  career_name text not null default 'Agente de Polícia Federal',
  exam_board text not null default 'CEBRASPE',
  item_number integer not null check (item_number between 1 and 120),
  subject text not null,
  question_text text not null,
  raw_extraction text not null,
  official_answer text not null check (official_answer in ('C','E','X')),
  source_page integer not null,
  content_status text not null check (content_status in ('active','under_review','annulled','obsolete','revoked','archived')),
  legal_review_required boolean not null default false,
  context_review_required boolean not null default false,
  legal_basis jsonb not null default '[]'::jsonb,
  law_version_checked_at timestamptz,
  review_note text not null,
  verified_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (exam_year,item_number)
);

alter table public.official_exam_questions enable row level security;
drop policy if exists "Students read active official exam questions" on public.official_exam_questions;
create policy "Students read active official exam questions" on public.official_exam_questions
  for select to authenticated using (content_status='active');
drop policy if exists "Admins manage all official exam questions" on public.official_exam_questions;
create policy "Admins manage all official exam questions" on public.official_exam_questions
  for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create index if not exists idx_official_exam_questions_filters
  on public.official_exam_questions(content_status,exam_year,subject,item_number);

-- Correct a typographical reference in the active syllabus without changing scope.
update public.syllabus_topics
set topic_text=replace(topic_text,'Lei nº 9.545/1997','Lei nº 9.455/1997')
where discipline='Legislação Especial' and topic_text like '%Lei nº 9.545/1997%';

"""

    value_lines: list[str] = []
    for year, item, subject, statement, raw, answer, page, status, legal, context, note in rows:
        value_lines.append(
            "(" + ",".join((
                str(year), str(item), sql(subject), sql(statement), sql(raw), sql(answer), str(page),
                sql(status), "true" if legal else "false", "true" if context else "false", sql(note),
            )) + ")"
        )

    insert = """with imported(exam_year,item_number,subject,question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,context_review_required,review_note) as (values
""" + ",\n".join(value_lines) + """
), editions as (
  select id,contest_year from public.syllabus_editions
  where contest_name='Polícia Federal' and role_name='Agente de Polícia Federal' and contest_year in (2014,2018,2021,2025)
), resolved as (
  select imported.*, question_source.id question_source_id, answer_source.id answer_key_source_id, topic.id syllabus_topic_id
  from imported
  join editions on editions.contest_year=imported.exam_year
  join public.syllabus_topics topic on topic.edition_id=editions.id and topic.discipline=imported.subject and topic.topic_order=1
  join public.content_sources question_source on question_source.title='Prova objetiva PF - Agente - ' || imported.exam_year
  join public.content_sources answer_source on answer_source.title='Gabarito definitivo PF - Agente - ' || imported.exam_year
)
insert into public.official_exam_questions (
  question_source_id,answer_key_source_id,syllabus_topic_id,exam_year,item_number,subject,
  question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,
  context_review_required,review_note
)
select question_source_id,answer_key_source_id,syllabus_topic_id,exam_year,item_number,subject,
  question_text,raw_extraction,official_answer,source_page,content_status,legal_review_required,
  context_review_required,review_note
from resolved
on conflict (exam_year,item_number) do update set
  question_source_id=excluded.question_source_id,
  answer_key_source_id=excluded.answer_key_source_id,
  syllabus_topic_id=excluded.syllabus_topic_id,
  subject=excluded.subject,
  question_text=excluded.question_text,
  raw_extraction=excluded.raw_extraction,
  official_answer=excluded.official_answer,
  source_page=excluded.source_page,
  content_status=excluded.content_status,
  legal_review_required=excluded.legal_review_required,
  context_review_required=excluded.context_review_required,
  review_note=excluded.review_note,
  verified_at=now();

-- Guardrail: no annulled or unverified legal item may remain active.
update public.official_exam_questions set content_status='annulled'
where official_answer='X';
update public.official_exam_questions set content_status='under_review'
where legal_review_required and (jsonb_array_length(legal_basis)=0 or law_version_checked_at is null)
  and content_status='active';
"""

    OUTPUT.write_text(header + schema + insert, encoding="utf-8")
    counts: dict[str, int] = {}
    for row in rows:
        counts[row[7]] = counts.get(row[7], 0) + 1
    print(f"Wrote {OUTPUT.relative_to(ROOT)} with {len(rows)} items: {counts}")


if __name__ == "__main__":
    build()
