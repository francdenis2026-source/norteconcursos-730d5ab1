import fs from "node:fs";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";
import { sessionAuthHeaders } from "./supabase-session-auth.mjs";
export const digest = (text) => crypto.createHash("sha256").update(text).digest("hex");
export function validateCorpus(data) {
  if (!data?.source || !Array.isArray(data.candidates) || !data.candidates.length)
    throw Error("Acervo incompleto");
  const s = data.source,
    seen = new Set();
  if (
    !/^[a-f0-9]{64}$/.test(s.id) ||
    !s.title ||
    !s.publisher ||
    !Number.isInteger(s.page_count) ||
    s.page_count < 1 ||
    !s.raw_text
  )
    throw Error("Fonte inválida");
  for (const c of data.candidates) {
    if (
      c.corpus_id !== s.id ||
      c.id !== digest(s.id + ":" + c.source_key) ||
      seen.has(c.id) ||
      !c.discipline ||
      !Number.isInteger(c.source_page) ||
      c.source_page < 1 ||
      c.source_page > s.page_count ||
      !c.payload?.raw_text ||
      !["under_review", "obsolete", "rejected", "duplicate", "reviewed"].includes(c.content_status)
    )
      throw Error("Candidato inválido");
    seen.add(c.id);
    const q = c.payload.publication;
    if (!q) continue;
    const r = c.payload.individual_review;
    if (
      c.content_status !== "reviewed" ||
      r?.publication_approved !== true ||
      r.context_complete !== true ||
      r.answer_verified !== true ||
      !r.explanation ||
      !q.syllabus_topic_id ||
      !q.question_text ||
      !/^[ABCDE]$/.test(q.official_answer) ||
      q.is_original !== false ||
      q.content_status !== "active"
    )
      throw Error("Publicação sem revisão individual");
    const labels = Array.from(q.question_text.matchAll(/^\(([ABCDE])\)/gm), (m) => m[1]).join("");
    if (!["ABCD", "ABCDE"].includes(labels) || !labels.includes(q.official_answer))
      throw Error("Alternativas incompletas ou gabarito incompatível");
    if (
      q.question_text
        .split(/^\([ABCDE]\)/m)
        .slice(1)
        .some((text) => !text.trim())
    )
      throw Error("Alternativa sem conteúdo; recupere a figura antes da publicação");
    const legal =
      c.payload.legal_review_required ||
      /direito|legisla/i.test(c.discipline + " " + q.subject) ||
      /\b(Código Penal|Constituição|STF|STJ|Súmula|Lei n)/i.test(q.question_text);
    if (
      legal &&
      (!r.legal_current ||
        !Number.isFinite(Date.parse(q.law_version_checked_at)) ||
        Date.parse(q.law_version_checked_at) > Date.now() ||
        !q.legal_basis?.length ||
        q.legal_basis.some(
          (b) =>
            !/^https:\/\/([\w-]+\.)*(planalto\.gov\.br|stf\.jus\.br|stj\.jus\.br)\//.test(
              b.url ?? "",
            ),
        ))
    )
      throw Error("Publicação jurídica sem fonte oficial vigente");
    const normativeKinds = new Set(c.payload.normative_review_required ?? []);
    if (/contabilidade|normas? contábeis/i.test(c.discipline + " " + q.subject) || /\bNBC\s+(TG|TSP|PG|TA)\b/i.test(q.question_text))
      normativeKinds.add("accounting");
    if (/redação oficial|manual de redação/i.test(c.discipline + " " + q.subject))
      normativeKinds.add("official_writing");
    for (const kind of normativeKinds) {
      if (!["accounting", "official_writing"].includes(kind))
        throw Error("Categoria de revisão normativa desconhecida");
      const evidence = r.normative_evidence?.filter((e) => e.kind === kind) ?? [];
      if (!evidence.length || evidence.some((e) => {
        let host;
        try { const url = new URL(e.url); if (url.protocol !== "https:") return true; host = url.hostname; } catch { return true; }
        const official = kind === "accounting"
          ? /(^|\.)cfc\.org\.br$/.test(host)
          : /(^|\.)planalto\.gov\.br$|(^|\.)gov\.br$/.test(host);
        return !official || e.verified !== true || !e.scope?.trim() ||
          !Number.isFinite(Date.parse(e.checked_at)) || Date.parse(e.checked_at) > Date.now();
      })) throw Error("Publicação normativa sem conferência oficial individual");
    }
  }
  return data;
}
export async function run(input, report, mode) {
  if (mode && mode !== "--dry-run") throw Error("Modo inválido");
  const data = validateCorpus(JSON.parse(fs.readFileSync(input, "utf8")));
  const result = {
    catalogued: data.candidates.length,
    reviewed: data.candidates.filter((c) => c.content_status === "reviewed").length,
    approved: data.candidates.filter((c) => c.payload.publication).length,
    excluded: data.candidates.filter((c) =>
      ["obsolete", "rejected", "duplicate"].includes(c.content_status),
    ).length,
    dry_run: mode === "--dry-run",
    complete: false,
  };
  const save = () => fs.writeFileSync(report, JSON.stringify(result, null, 2));
  save();
  if (result.dry_run) {
    result.complete = true;
    save();
    return result;
  }
  const project = process.env.TASK_SUPABASE_PROJECT,
    key = process.env.TASK_SUPABASE_KEY;
  if (!/^[a-z]{20}$/.test(project ?? "") || !key)
    throw Error("Defina credenciais somente no ambiente da sessão");
  const base = `https://${project}.supabase.co/rest/v1`;
  const request = async (path, options = {}) => {
    const res = await fetch(base + path, {
      ...options,
      headers: {
        ...sessionAuthHeaders(key),
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok) throw Error(`Supabase HTTP ${res.status}`);
    return res.status === 204 ? null : res.json();
  };
  const topics = await request(
    "/syllabus_topics?select=id,edition_id&content_status=eq.current&limit=1000",
  );
  const editions = await request("/syllabus_editions?select=id&status=eq.active&limit=1000");
  for (const c of data.candidates.filter((c) => c.payload.publication)) {
    const t = topics.find((t) => t.id === c.payload.publication.syllabus_topic_id);
    if (!t || !editions.some((e) => e.id === t.edition_id)) throw Error("Tópico sem edital ativo");
  }
  const insert = async (table, rows, conflict) =>
    request(`/${table}?on_conflict=${conflict}`, {
      method: "POST",
      headers: { Prefer: "resolution=ignore-duplicates,return=representation" },
      body: JSON.stringify(rows),
    });
  const existingSource = await request(
    "/question_corpus_sources?id=eq." + data.source.id + "&select=*",
  );
  if (existingSource.length && digest(existingSource[0].raw_text) !== digest(data.source.raw_text))
    throw Error("Texto fonte divergente");
  await insert("question_corpus_sources", [data.source], "id");
  result.inserted_candidates = 0;
  for (let i = 0; i < data.candidates.length; i += 40) {
    const created = await insert(
      "question_corpus_candidates",
      data.candidates.slice(i, i + 40),
      "id",
    );
    result.inserted_candidates += created.length;
    save();
  }
  const stored = await request(
    "/question_corpus_candidates?corpus_id=eq." + data.source.id + "&select=*&limit=1000",
  );
  if (
    stored.length !== data.candidates.length ||
    stored.some(
      (c) =>
        !data.candidates.some((x) => x.id === c.id && x.payload.raw_text === c.payload.raw_text),
    )
  )
    throw Error("Leitura de confirmação diverge");
  // Existing reviews are authoritative. A rerun cannot publish a candidate whose review has changed.
  validateCorpus({ source: data.source, candidates: stored });
  const approved = stored
    .filter(
      (c) =>
        c.content_status === "reviewed" &&
        c.payload.individual_review?.publication_approved &&
        c.payload.publication,
    )
    .map((c) => c.payload.publication);
  // Register each checked legal authority separately from the private publisher source.
  const authorities = new Map();
  for (const q of approved)
    for (const b of q.legal_basis ?? []) {
      if (
        !/^https:\/\/([\w-]+\.)*(planalto\.gov\.br|stf\.jus\.br|stj\.jus\.br)\//.test(b.url ?? "")
      )
        continue;
      authorities.set(b.url, {
        source_type: /st[fj]\.jus\.br/.test(b.url) ? "jurisprudencia" : "lei",
        title: b.title || "Fonte oficial conferida",
        issuer: /stf\.jus\.br/.test(b.url)
          ? "Supremo Tribunal Federal"
          : /stj\.jus\.br/.test(b.url)
            ? "Superior Tribunal de Justiça"
            : "Presidência da República",
        url: b.url,
        is_official: true,
        status: "em_revisao",
        checked_at: q.law_version_checked_at,
        notes:
          "Dispositivos citados conferidos na revisão individual. Esta conferência não certifica a íntegra de toda a norma.",
      });
    }
  if (authorities.size) await insert("content_sources", [...authorities.values()], "url");
  const sourceUrl = "urn:sha256:" + data.source.id;
  await insert(
    "content_sources",
    [
      {
        source_type: "outro",
        title: data.source.title,
        issuer: data.source.publisher,
        url: sourceUrl,
        is_official: false,
        status: "em_revisao",
        notes:
          "Apostila particular de " +
          data.source.publication_year +
          " fornecida pelo usuário. Respostas da editora; não é caderno nem gabarito definitivo oficial da banca. Extrações privadas ficam no acervo de revisão.",
      },
    ],
    "url",
  );
  const source = (
    await request("/content_sources?url=eq." + encodeURIComponent(sourceUrl) + "&select=id")
  )[0];
  result.inserted_questions = 0;
  for (const q of approved) {
    const created = await insert(
      "curated_question_catalog",
      [{ ...q, source_id: source.id }],
      "source_id,external_item_key",
    );
    result.inserted_questions += created.length;
  }
  const published = await request(
    "/curated_question_catalog?source_id=eq." +
      source.id +
      "&select=id,external_item_key,content_status&limit=1000",
  );
  result.confirmed_candidates = stored.length;
  result.confirmed_questions = published.length;
  result.confirmed_active = published.filter((q) => q.content_status === "active").length;
  result.complete = published.length === approved.length;
  save();
  if (!result.complete) throw Error("Publicação parcial; retome com o mesmo acervo");
  return result;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [input, report, mode] = process.argv.slice(2);
  if (!input || !report)
    throw Error(
      "Uso: node scripts/import-question-corpus.mjs ACERVO_JSON RELATORIO_JSON [--dry-run]",
    );
  console.log(JSON.stringify(await run(input, report, mode)));
}
