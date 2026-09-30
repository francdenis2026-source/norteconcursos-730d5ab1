import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";

export function readImport(inputDir) {
  const documents = JSON.parse(fs.readFileSync(path.join(inputDir, "documentos.json"), "utf8"));
  const candidates = fs
    .readFileSync(path.join(inputDir, "candidatos.jsonl"), "utf8")
    .trim()
    .split("\n")
    .filter(Boolean)
    .map(JSON.parse);
  const ids = new Set();
  const docIds = new Set(documents.map((d) => d.id));
  if (docIds.size !== documents.length) throw new Error("Documento duplicado no manifesto");
  const batch = ["primeiro-lote-26-questoes.json", "segundo-lote-22-questoes.json"].flatMap(
    (name) => {
      const batchFile = path.join(inputDir, name);
      return fs.existsSync(batchFile) ? JSON.parse(fs.readFileSync(batchFile, "utf8")) : [];
    },
  );
  const reviews = new Map(batch.map((r) => [r.source_id + ":" + r.source_item_number, r]));
  const rows = candidates.map((r) => {
    if (!/^[a-f0-9]{64}$/.test(r.id) || ids.has(r.id) || !docIds.has(r.source_drive_id))
      throw new Error("Identificador inválido, repetido ou sem fonte");
    if (
      r.publishable !== false ||
      !["under_review", "obsolete", "rejected", "duplicate"].includes(r.content_status)
    )
      throw new Error("Importação contém status não permitido");
    ids.add(r.id);
    const review = reviews.get(r.source_drive_id + ":" + r.source_item_number);
    const payload = structuredClone(r);
    if (review) {
      payload.answer_candidate = review.official_answer;
      payload.law_version_checked_at = "2026-09-30";
      payload.individual_text_review = {
        result: "texto_e_gabarito_compativeis_com_fonte_oficial",
        historical_answer: review.official_answer,
        current_answer: review.official_answer,
        legal_basis: review.legal_basis,
        explanation: review.explanation,
        checked_at: "2026-09-30",
        publication_blockers: [
          "conferencia_visual_do_pdf_pendente",
          "contexto_e_duplicatas_semanticas_pendentes",
        ],
      };
      payload.catalog_external_item_key = review.external_item_key;
    }
    return { id: r.id, drive_id: r.source_drive_id, payload, content_status: r.content_status };
  });
  const sources = documents.map((d) => {
    const raw = JSON.parse(
      fs.readFileSync(path.join(inputDir, "textos-extraidos", d.id + ".json"), "utf8"),
    );
    if (typeof raw.text !== "string" || !raw.text.length) throw new Error("Texto fonte ausente");
    // O manifesto foi calculado sobre texto com quebras CR removidas.
    if (
      crypto.createHash("sha256").update(raw.text.replace(/\r/g, "")).digest("hex") !==
      d.text_sha256
    )
      throw new Error("Texto fonte alterado: " + d.id);
    return { drive_id: d.id, metadata: d, raw_text: raw.text };
  });
  return { documents: sources, candidates: rows };
}

export function* chunks(rows, maxBytes = 1500000) {
  let chunk = [],
    bytes = 2;
  for (const row of rows) {
    const size = Buffer.byteLength(JSON.stringify(row)) + 1;
    if (chunk.length && bytes + size > maxBytes) {
      yield chunk;
      chunk = [];
      bytes = 2;
    }
    chunk.push(row);
    bytes += size;
  }
  if (chunk.length) yield chunk;
}

async function main() {
  const [inputDir, reportFile, mode] = process.argv.slice(2);
  if (!inputDir || !reportFile)
    throw new Error("Uso: node scripts/import-drive-review.mjs INPUT REPORT [--dry-run]");
  const data = readImport(inputDir);
  const expected = { documents: data.documents.length, candidates: data.candidates.length };
  if (mode === "--dry-run") {
    fs.writeFileSync(reportFile, JSON.stringify({ expected, live: false }, null, 2));
    console.log(JSON.stringify(expected));
    return;
  }
  const token = process.env.TASK_SUPABASE_PAT;
  const project = process.env.TASK_SUPABASE_PROJECT;
  if (!token || !project || !/^[a-z]{20}$/.test(project))
    throw new Error("Defina TASK_SUPABASE_PAT e TASK_SUPABASE_PROJECT");
  const request = async (query, parameters = [], readOnly = false) => {
    const response = await fetch(`https://api.supabase.com/v1/projects/${project}/database/query`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, parameters, read_only: readOnly }),
      signal: AbortSignal.timeout(60000),
    });
    if (!response.ok)
      throw new Error(
        `Falha HTTP ${response.status}; lote pode ser retomado sem sobrescrever revisões`,
      );
    return response.json();
  };
  const report = {
    project,
    started_at: new Date().toISOString(),
    expected,
    batches: [],
    complete: false,
  };
  const save = () => fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  save();
  for (const [name, rows] of Object.entries(data)) {
    let processed = 0,
      inserted = 0;
    const columns =
      name === "documents"
        ? "drive_id text,metadata jsonb,raw_text text"
        : "id text,drive_id text,payload jsonb,content_status text";
    const fields =
      name === "documents" ? "drive_id,metadata,raw_text" : "id,drive_id,payload,content_status";
    const table =
      name === "documents" ? "drive_question_import_documents" : "drive_question_import_candidates";
    for (const chunk of chunks(rows)) {
      if (
        name === "documents" &&
        chunk.length === 1 &&
        Buffer.byteLength(JSON.stringify(chunk)) > 1500000
      ) {
        const doc = chunk[0];
        const added = await request(
          "with added as(insert into public.drive_question_import_documents(drive_id,metadata,raw_text) values($1,$2::jsonb,'') on conflict do nothing returning 1) select count(*)::int as inserted from added",
          [doc.drive_id, JSON.stringify(doc.metadata)],
        );
        inserted += added[0].inserted;
        let prefix = "",
          offset = 0;
        for (let start = 0; start < doc.raw_text.length; start += 200000) {
          let end = Math.min(start + 200000, doc.raw_text.length);
          // Não dividir pares UTF-16; PostgreSQL mede comprimento em caracteres.
          if (end < doc.raw_text.length && /[\uD800-\uDBFF]/.test(doc.raw_text[end - 1])) end--;
          const part = doc.raw_text.slice(start, end);
          const checksum = crypto.createHash("md5").update(prefix).digest("hex");
          await request(
            "update public.drive_question_import_documents set raw_text=raw_text||$2 where drive_id=$1 and length(raw_text)=$3::int and md5(raw_text)=$4",
            [doc.drive_id, part, offset, checksum],
          );
          prefix += part;
          offset += Array.from(part).length;
          start = end - 200000;
        }
        const checked = await request(
          "select md5(raw_text) as checksum from public.drive_question_import_documents where drive_id=$1",
          [doc.drive_id],
          true,
        );
        if (checked[0]?.checksum !== crypto.createHash("md5").update(doc.raw_text).digest("hex"))
          throw new Error("Integridade do documento grande não confirmada");
        processed++;
        report.batches.push({
          table,
          processed,
          inserted: added[0].inserted,
          large_document_verified: true,
        });
        save();
        console.log(JSON.stringify({ table, processed, total: rows.length, inserted }));
        continue;
      }
      const result = await request(
        `with added as(insert into public.${table}(${fields}) select ${fields} from jsonb_to_recordset($1::jsonb) as x(${columns}) on conflict do nothing returning 1) select count(*)::int as inserted from added`,
        [JSON.stringify(chunk)],
      );
      const n = result[0].inserted;
      inserted += n;
      processed += chunk.length;
      report.batches.push({ table, processed, inserted: n });
      save();
      console.log(JSON.stringify({ table, processed, total: rows.length, inserted }));
    }
  }
  report.verification = await request(
    `select (select count(*)::int from public.drive_question_import_documents) as documents,(select count(*)::int from public.drive_question_import_candidates) as candidates,(select count(*)::int from public.drive_question_import_candidates where payload->>'publishable' is distinct from 'false') as invalid_publishable,(select md5(string_agg(id,',' order by id)) from public.drive_question_import_candidates) as ids_md5,(select md5(string_agg(drive_id||':'||md5(raw_text),',' order by drive_id collate "C")) from public.drive_question_import_documents) as documents_md5`,
    [],
    true,
  );
  const verified = report.verification[0];
  const idsMd5 = crypto
    .createHash("md5")
    .update(
      data.candidates
        .map((r) => r.id)
        .sort()
        .join(","),
    )
    .digest("hex");
  // Ordenação explícita ASCII coincide com COLLATE C do PostgreSQL.
  const asciiDocsMd5 = crypto
    .createHash("md5")
    .update(
      data.documents
        .toSorted((a, b) => (a.drive_id < b.drive_id ? -1 : 1))
        .map((r) => r.drive_id + ":" + crypto.createHash("md5").update(r.raw_text).digest("hex"))
        .join(","),
    )
    .digest("hex");
  if (
    verified.documents !== expected.documents ||
    verified.candidates !== expected.candidates ||
    verified.invalid_publishable !== 0 ||
    verified.ids_md5 !== idsMd5 ||
    verified.documents_md5 !== asciiDocsMd5
  )
    throw new Error("Contagens, textos ou IDs divergentes; confira o relatório");
  report.complete = true;
  report.finished_at = new Date().toISOString();
  save();
  console.log("IMPORTACAO_ADMINISTRATIVA_CONFIRMADA");
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href)
  main().catch((e) => {
    console.error(e.message);
    process.exitCode = 1;
  });
