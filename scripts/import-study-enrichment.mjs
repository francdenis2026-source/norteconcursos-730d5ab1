import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const [input, report, mode] = process.argv.slice(2);
if (!input || !report || (mode && mode !== "--dry-run"))
  throw Error(
    "Uso: node scripts/import-study-enrichment.mjs ARQUIVO_JSON RELATORIO_JSON [--dry-run]",
  );
const rows = JSON.parse(await readFile(input, "utf8")),
  seen = new Set();
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  sha = /^[a-f0-9]{64}$/;
const hosts = new Set([
  "www.planalto.gov.br",
  "portal.stf.jus.br",
  "noticias.stf.jus.br",
  "www.stj.jus.br",
  "scon.stj.jus.br",
  "processo.stj.jus.br",
  "www.rfc-editor.org",
  "www.gnu.org",
  "cartilha.cert.br",
  "support.microsoft.com",
  "learn.microsoft.com",
  "help.libreoffice.org",
  "www.cpc.org.br",
  "www.cfc.org.br",
  "man7.org",
]);
const text = (value) => typeof value === "string" && value.trim().length > 0;
if (!Array.isArray(rows) || !rows.length) throw Error("Acervo vazio");
for (const row of rows) {
  if (
    !uuid.test(row.id) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(row.version) ||
    !sha.test(row.source_body_sha256) ||
    !text(row.material_slug) ||
    seen.has(row.material_slug) ||
    !Number.isFinite(Date.parse(row.checked_at)) ||
    Date.parse(row.checked_at) > Date.now()
  )
    throw Error("Identificação ou conferência inválida");
  if (
    Object.keys(row).some(
      (k) =>
        ![
          "id",
          "material_slug",
          "version",
          "source_body_sha256",
          "content",
          "sources",
          "checked_at",
        ].includes(k),
    )
  )
    throw Error("Campo de publicação não autorizado");
  seen.add(row.material_slug);
  const cases = row.content?.cases,
    illustrations = row.content?.illustrations;
  if (
    !Array.isArray(cases) ||
    !cases.length ||
    !Array.isArray(illustrations) ||
    !illustrations.length ||
    !Array.isArray(row.sources)
  )
    throw Error("Conteúdo incompleto");
  const ids = new Set();
  for (const c of cases) {
    if (
      !["id", "title", "scenario", "question", "conclusion", "pitfall"].every((k) => text(c[k])) ||
      ids.has(c.id) ||
      !Array.isArray(c.steps) ||
      c.steps.length < 2 ||
      !c.steps.every(text) ||
      !text(c.variation?.scenario) ||
      !text(c.variation?.answer) ||
      !Array.isArray(c.articles) ||
      !c.articles.every(text)
    )
      throw Error("Caso sem resolução ou variação");
    ids.add(c.id);
  }
  const entry = (e) => text(e?.label) && Number.isFinite(e?.value) && e.value >= 0;
  for (const illustration of illustrations) {
    if (
      !["truth", "venn", "probability", "flow", "ledger", "matrix"].includes(illustration.kind) ||
      !text(illustration.title) ||
      !text(illustration.caption)
    )
      throw Error("Ilustração inválida");
    if (
      illustration.kind === "flow" &&
      (!Array.isArray(illustration.nodes) ||
        illustration.nodes.length < 2 ||
        illustration.nodes.length > 5 ||
        !illustration.nodes.every(text))
    )
      throw Error("Ilustração inválida");
    if (
      illustration.kind === "ledger" &&
      (!text(illustration.account) ||
        !["devedora", "credora"].includes(illustration.nature) ||
        !Array.isArray(illustration.debits) ||
        !Array.isArray(illustration.credits) ||
        (!illustration.debits.length && !illustration.credits.length) ||
        !illustration.debits.every(entry) ||
        !illustration.credits.every(entry))
    )
      throw Error("Ilustração inválida");
    if (
      illustration.kind === "matrix" &&
      (!Array.isArray(illustration.cells) ||
        illustration.cells.length !== 9 ||
        !illustration.cells.every(text) ||
        illustration.cells.filter((c) => c === "?").length !== 1 ||
        !text(illustration.answer))
    )
      throw Error("Ilustração inválida");
  }
  const urls = new Set();
  for (const s of row.sources) {
    const u = new URL(s.url);
    if (
      !text(s.title) ||
      !sha.test(s.sha256) ||
      !Number.isFinite(Date.parse(s.checked_at)) ||
      Date.parse(s.checked_at) > Date.now() ||
      u.protocol !== "https:" ||
      u.username ||
      u.password ||
      !hosts.has(u.hostname) ||
      urls.has(s.url)
    )
      throw Error("Fonte não primária ou sem evidência de conferência");
    urls.add(s.url);
  }
}
const result = {
  materials: rows.length,
  cases: rows.reduce((n, r) => n + r.content.cases.length, 0),
  inserted: 0,
  preserved: 0,
  dry_run: mode === "--dry-run",
};
if (!result.dry_run) {
  const project = process.env.TASK_SUPABASE_PROJECT,
    key = process.env.TASK_SUPABASE_KEY,
    reviewer = process.env.TASK_LIBRARY_REVIEWER;
  if (!/^[a-z]{20}$/.test(project ?? "") || !key || !uuid.test(reviewer ?? ""))
    throw Error("Defina projeto, chave e revisor autorizado na sessão");
  const request = async (path, options = {}) => {
    const r = await fetch(`https://${project}.supabase.co/rest/v1${path}`, {
      ...options,
      headers: { apikey: key, "Content-Type": "application/json", ...options.headers },
    });
    if (!r.ok) throw Error(`Supabase HTTP ${r.status}`);
    const raw = await r.text();
    return raw ? JSON.parse(raw) : null;
  };
  const all = async (table) => {
    const out = [];
    while (true) {
      const page = await request(`/${table}?select=*&order=id&limit=200&offset=${out.length}`);
      if (!page.length) return out;
      out.push(...page);
    }
  };
  const materials = await all("study_materials"),
    existing = await all("study_material_enrichments");
  const equal = (a, b) =>
    a === b ||
    (!!a &&
      !!b &&
      typeof a === "object" &&
      typeof b === "object" &&
      Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every((k) => equal(a[k], b[k])));
  const matches = (actual, expected) =>
    actual &&
    Object.keys(expected).every((k) =>
      k === "checked_at"
        ? Date.parse(actual[k]) === Date.parse(expected[k])
        : equal(actual[k], expected[k]),
    );
  // Validate the entire batch before the first write; published revisions are immutable.
  for (const row of rows) {
    const material = materials.find((m) => m.slug === row.material_slug);
    if (
      !material ||
      material.content_status !== "active" ||
      createHash("sha256").update(material.body_md).digest("hex") !== row.source_body_sha256
    )
      throw Error(`Material alterado ou não publicado: ${row.material_slug}`);
    if (
      /direito|legisla/i.test(material.discipline) &&
      (!row.sources.some((s) => new URL(s.url).hostname === "www.planalto.gov.br") ||
        row.content.cases.some((c) => !c.articles.length))
    )
      throw Error("Exemplo jurídico sem dispositivo ou fonte");
    const found = existing.find(
      (e) =>
        e.id === row.id || (e.material_slug === row.material_slug && e.version === row.version),
    );
    if (found && (!matches(found, row) || !["active", "under_review"].includes(found.status)))
      throw Error("Revisão existente diverge; crie nova versão");
  }
  for (const row of rows) {
    let found = existing.find((e) => e.id === row.id);
    if (!found) {
      const inserted = await request(
        "/study_material_enrichments?on_conflict=material_slug,version",
        {
          method: "POST",
          headers: { Prefer: "resolution=ignore-duplicates,return=representation" },
          body: JSON.stringify({ ...row, status: "under_review" }),
        },
      );
      result.inserted += inserted.length;
      [found] = await request(`/study_material_enrichments?id=eq.${row.id}&select=*`);
    } else result.preserved++;
    if (!matches(found, row)) throw Error("Leitura posterior divergente");
    if (found.status === "under_review")
      await request(`/study_material_enrichments?id=eq.${row.id}&status=eq.under_review`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({
          status: "active",
          reviewed_by: reviewer,
          reviewed_at: new Date().toISOString(),
        }),
      });
  }
}
await writeFile(report, JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result));
