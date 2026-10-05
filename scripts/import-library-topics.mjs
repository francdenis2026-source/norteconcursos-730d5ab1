import { readFile, writeFile } from 'node:fs/promises';

const [input, report, mode] = process.argv.slice(2);
if (!input || !report || (mode && mode !== '--dry-run')) throw new Error('Uso: node scripts/import-library-topics.mjs ARQUIVO_JSON RELATORIO_JSON [--dry-run]');
const rows = JSON.parse(await readFile(input, 'utf8'));
const ids = new Set();
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/;
for (const row of rows) {
  if (!uuid.test(row.id) || !uuid.test(row.edition_id) || ids.has(row.id)) throw new Error('Identificador inválido ou duplicado');
  ids.add(row.id);
  if (row.content_status !== 'current' || !Number.isInteger(row.topic_order) || row.topic_order < 1) throw new Error('Tópico não vigente');
  for (const field of ['discipline', 'block_name', 'topic_text']) if (!row[field]?.trim()) throw new Error(`Campo ausente: ${field}`);
  const url = new URL(row._source_url);
  if (url.protocol !== 'https:' || url.hostname !== 'cdn.cebraspe.org.br' || url.username || url.password || !row._pages?.length || row._pages.some(p => !Number.isInteger(p) || p < 1)) throw new Error('Evidência de edital inválida');
}
const result = { validated: rows.length, inserted: 0, preserved: 0, dry_run: mode === '--dry-run' };
if (!result.dry_run) {
  const project = process.env.TASK_SUPABASE_PROJECT;
  const key = process.env.TASK_SUPABASE_KEY;
  if (!/^[a-z]{20}$/.test(project ?? '') || !key) throw new Error('Defina TASK_SUPABASE_PROJECT e TASK_SUPABASE_KEY na sessão');
  const request = async (path, options = {}) => {
    const response = await fetch(`https://${project}.supabase.co/rest/v1${path}`, { ...options, headers: { apikey: key, 'Content-Type': 'application/json', ...options.headers } });
    if (!response.ok) throw new Error(`Supabase HTTP ${response.status}`);
    return response.json();
  };
  const editions = await request('/syllabus_editions?select=id&status=eq.active&limit=1000');
  const existing = await request('/syllabus_topics?select=*&limit=1000');
  const records = rows.map(({ _source_url, _pages, ...record }) => record);
  // Validate every conflict before inserting; never replace a reviewed topic.
  for (const row of records) {
    if (!editions.some(e => e.id === row.edition_id)) throw new Error('Edital inativo');
    const found = existing.find(t => t.id === row.id || (t.edition_id === row.edition_id && t.discipline === row.discipline && t.topic_order === row.topic_order));
    if (found && Object.keys(row).some(k => found[k] !== row[k])) throw new Error('Tópico existente diverge; revisão manual necessária');
  }
  for (const row of records) {
    const inserted = await request('/syllabus_topics?on_conflict=id', { method: 'POST', headers: { Prefer: 'resolution=ignore-duplicates,return=representation' }, body: JSON.stringify(row) });
    result.inserted += inserted.length;
    result.preserved += inserted.length ? 0 : 1;
    const actual = await request(`/syllabus_topics?id=eq.${row.id}&select=*`);
    if (actual.length !== 1 || Object.keys(row).some(k => actual[0][k] !== row[k])) throw new Error('Conferência do tópico falhou');
  }
}
await writeFile(report, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result));
