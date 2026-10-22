import fs from "node:fs";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";
import { parseBoardImport, planBoardImport } from "../../src/lib/questionImport.ts";

const sha256 = (text) => crypto.createHash("sha256").update(text).digest("hex");
const countBy = (rows, key) => Object.fromEntries(
  [...new Set(rows.map(key))].sort().map((value) => [value, rows.filter((q) => key(q) === value).length]),
);
export function sourceKind(value) {
  const url = new URL(value);
  if (!/(^|\.)idecan\.org\.br$/.test(url.hostname)) return "mirror";
  if (/GABARITO_OFICIAL_DEFINITIVO/i.test(url.search)) return "placeholder";
  if (/Concurso\.aspx$/i.test(url.pathname)) return "contest_page";
  return "official_link_not_reverified";
}

/** Audits files only. No network, database mutations, activation or prediction. */
export function auditCorpus(input) {
  const rows = parseBoardImport(input);
  if (rows.some((q) => q.board.trim().toUpperCase() !== "IDECAN"))
    throw Error("O lote deve conter somente questões da IDECAN.");
  const plan = planBoardImport(rows, []);
  const groups = new Map();
  for (const q of plan.ready.filter((item) => item.official_answer !== "X")) {
    const key = JSON.stringify([q.contest_name, q.career_name, q.exam_year, q.exam_type]);
    const group = groups.get(key) ?? [];
    group.push(q);
    groups.set(key, group);
  }
  const exams = [...groups.values()].map((items) => {
    const q = items[0];
    // Explicit scope: military/bombeiro content must not masquerade as Polícia Civil.
    const civilPolice = /polícia civil/i.test(q.contest_name + " " + q.career_name);
    const subjects = countBy(items, (item) => item.subject);
    return {
      contest: q.contest_name, career: q.career_name, year: q.exam_year, booklet: q.exam_type,
      comparison_scope: civilPolice ? "policia_civil" : "seguranca_complementar",
      retained_items: items.length,
      original_exam_items: null,
      subjects: Object.entries(subjects).map(([subject, count]) => ({
        subject, count, share_of_retained_items: Number((count / items.length * 100).toFixed(2)),
      })),
      sources: [...new Set(items.map((item) => item.source_url))].map((url) => ({ url, kind: sourceKind(url) })),
      answer_keys: [...new Set(items.map((item) => item.answer_key_url))].map((url) => ({ url, kind: sourceKind(url) })),
      declared_answer_key_status: countBy(items, (item) => item.answer_key_status ?? "missing"),
      legal_review_metadata: countBy(items, (item) => item.legal_review?.status ?? "missing"),
      syllabus_topic_links: items.filter((item) => item.syllabus_topic_id).length,
      item_numbers: items.map((item) => item.item_number).sort((a, b) => a - b),
    };
  });
  return {
    schema_version: 1,
    input_sha256: sha256(JSON.stringify(input)),
    official_directory: "https://concurso.idecan.org.br/editais?status=concluidos",
    scope: "Local import file; not the production database or a representative IDECAN sample",
    online_verification_performed: false,
    database_import_performed: false,
    publication_approved: false,
    received_items: rows.length,
    retained_items: plan.ready.filter((item) => item.official_answer !== "X").length,
    annulled_items: plan.ready.filter((item) => item.official_answer === "X").length,
    duplicates: plan.duplicates,
    conflicts: plan.conflicts,
    issues: plan.issues,
    civil_police_items: exams.filter((e) => e.comparison_scope === "policia_civil").reduce((n, e) => n + e.retained_items, 0),
    exams,
  };
}

export function renderReport(report) {
  return `# IDECAN — inventário local para preparação da PC-AC\n\n` +
    `Lote: **${report.received_items} itens**, ${report.exams.length} cadernos; **${report.civil_police_items} itens de Polícia Civil**. ` +
    `Duplicidades no arquivo: ${report.duplicates}; conflitos de posição/gabarito: ${report.conflicts}. ` +
    `Anuladas fora da análise: ${report.annulled_items}. Essas contagens não confirmam carga no banco de produção.\n\n` +
    `## Limites da análise\n\n` +
    `A amostra foi selecionada em importações anteriores e é incompleta. Percentuais abaixo usam somente os itens retidos de cada caderno; não são pesos do edital, incidência de toda a banca nem probabilidade de cobrança na PC-AC. Não há denominador oficial integral validado. Não somar carreiras como provas independentes de concursos diferentes.\n\n` +
    `Nesta auditoria não houve acesso aos PDFs oficiais, reconferência de gabaritos, importação no Supabase ou autorização de publicação. Metadados antigos foram inventariados, não certificados.\n\n` +
    report.exams.map((exam) => `## ${exam.contest} — ${exam.booklet}\n\n` +
      `${exam.retained_items} itens retidos; escopo: ${exam.comparison_scope === "policia_civil" ? "Polícia Civil, comparação prioritária" : "segurança pública complementar, analisar separadamente"}.\n\n` +
      `| Disciplina declarada no lote | Itens | % do caderno retido |\n| --- | ---: | ---: |\n` +
      exam.subjects.map((s) => `| ${s.subject} | ${s.count} | ${s.share_of_retained_items.toFixed(2)}% |`).join("\n") +
      `\n\nFontes do caderno:\n\n` + exam.sources.map((s) => `- ${s.url} — \`${s.kind}\``).join("\n") +
      `\n\nReferências de gabarito:\n\n` + exam.answer_keys.map((s) => `- ${s.url} — \`${s.kind}\``).join("\n") +
      `\n\nRevisão declarada: ${Object.entries(exam.legal_review_metadata).map(([k, v]) => `${k}: ${v}`).join("; ")}. ` +
      `Vínculos a tópicos de edital neste JSON: ${exam.syllabus_topic_links}.\n`).join("\n") +
    `\n## Próxima coleta e critérios de entrada\n\n` +
    `1. Consultar [concursos concluídos da IDECAN](${report.official_directory}); priorizar Polícia Civil, depois Polícia Penal/perícia e, em separado, PM/bombeiros. Conferir banca, instituição, cargo, ano e caderno no próprio documento.\n` +
    `2. Arquivar PDF original da prova, edital/retificações e gabarito definitivo com URL oficial, data de coleta e SHA-256. Página de concurso não substitui arquivo de gabarito; URL genérica/placeholder precisa ser resolvida.\n` +
    `3. Extrair enunciado, alternativas, textos e figuras com página/número de origem. Manter anuladas no registro histórico, fora dos treinos. Comparar versões de caderno e bloquear gabaritos conflitantes.\n` +
    `4. Classificar disciplina, tópico e forma de cobrança mediante revisão; registrar legislação estadual para não transferir regras de SC/MG ao Acre. Não inferir tópicos ou estilo apenas pelo rótulo da disciplina.\n` +
    `5. Usar o importador existente em \`under_review\`. Para ativar, cumprir CONTENT_GOVERNANCE.md: tópico de edital, fonte oficial, vigência e revisão individual. \`sem_alteracao_localizada\` não comprova revisão jurídica concluída.\n` +
    `6. Só calcular incidência por assunto após conferir a cobertura dos cadernos e a taxonomia. Comparar anos/cargos separadamente e explicitar exclusões. Orientação de estudo para PC-AC é uma hipótese pedagógica, sujeita ao edital oficial.\n\n` +
    `Reproduzir: \`node --import ./scripts/alias.mjs scripts/idecan/audit-corpus.mjs\`.\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const input = process.argv[2] ?? "supabase/imports/idecan/idecan_questions.json";
  const output = process.argv[3] ?? "supabase/imports/idecan/auditoria-local";
  const report = auditCorpus(JSON.parse(fs.readFileSync(input, "utf8")));
  fs.writeFileSync(`${output}.json`, JSON.stringify(report, null, 2) + "\n");
  fs.writeFileSync(`${output}.md`, renderReport(report));
  console.log(JSON.stringify({ retained: report.retained_items, exams: report.exams.length, duplicates: report.duplicates, conflicts: report.conflicts, report: `${output}.md` }));
  if (report.conflicts) process.exitCode = 1;
}
