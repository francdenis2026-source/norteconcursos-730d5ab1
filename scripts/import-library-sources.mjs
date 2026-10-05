import { readFile, writeFile } from 'node:fs/promises';
const [input, report, mode] = process.argv.slice(2);
if (!input || !report || (mode && mode !== '--dry-run')) throw new Error('Uso: node scripts/import-library-sources.mjs ARQUIVO_JSON RELATORIO_JSON [--dry-run]');
const rows = JSON.parse(await readFile(input, 'utf8'));
const seen = new Set();
for (const row of rows) {
  const url = new URL(row.url);
  if (url.protocol !== 'https:' || url.username || url.password || !['www.planalto.gov.br', 'cdn.cebraspe.org.br', 'portal.stf.jus.br', 'noticias.stf.jus.br'].includes(url.hostname) || seen.has(row.url)) throw new Error('Fonte não oficial ou duplicada');
  seen.add(row.url);
  if (!row.title || !row.issuer || row.is_official !== true || !Number.isFinite(Date.parse(row.checked_at)) || !['lei', 'decreto', 'edital', 'jurisprudencia'].includes(row.source_type)) throw new Error('Metadados inválidos');
}
const result = { validated: rows.length, inserted: 0, preserved: 0, dry_run: mode === '--dry-run' };
if (!result.dry_run) {
  const project = process.env.TASK_SUPABASE_PROJECT, key = process.env.TASK_SUPABASE_KEY;
  if (!/^[a-z]{20}$/.test(project ?? '') || !key) throw new Error('Defina TASK_SUPABASE_PROJECT e TASK_SUPABASE_KEY');
  for (const { _sha256_html, ...row } of rows) {
    const response = await fetch(`https://${project}.supabase.co/rest/v1/content_sources?on_conflict=url`, { method: 'POST', headers: { apikey: key, 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=representation' }, body: JSON.stringify(row) });
    if (!response.ok) throw new Error(`Supabase HTTP ${response.status}`);
    const inserted = await response.json(); result.inserted += inserted.length; result.preserved += inserted.length ? 0 : 1;
  }
}
await writeFile(report, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result));
