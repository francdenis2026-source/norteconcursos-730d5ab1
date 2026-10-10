import { readFile, writeFile } from 'node:fs/promises';
import { sessionAuthHeaders } from './supabase-session-auth.mjs';
import { isDeepStrictEqual } from 'node:util';

const [input, report, mode] = process.argv.slice(2);
if (!input || !report || (mode && mode !== '--dry-run')) {
  throw new Error('Uso: node scripts/import-library-materials.mjs ARQUIVO_JSON RELATORIO_JSON [--dry-run]');
}
const records = JSON.parse(await readFile(input, 'utf8'));
const slugs = new Set();
for (const row of records) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug) || slugs.has(row.slug)) throw new Error('Slug inválido ou duplicado');
  slugs.add(row.slug);
  for (const key of ['title', 'discipline', 'topic_label', 'body_md', 'source_note', 'contest_name']) {
    if (typeof row[key] !== 'string' || !row[key].trim()) throw new Error(`Campo ausente: ${key}`);
  }
  if (!Number.isInteger(row.syllabus_topic_order) || !Number.isFinite(Date.parse(row.law_version_checked_at))) throw new Error('Classificação ou data inválida');
  // Complementary reading is not an active question set for the associated edital.
  if (row._supplemental_scope) {
    if (typeof row._supplemental_scope !== 'string' || !row.source_note.includes(row._supplemental_scope) || row.quiz?.length !== 0) throw new Error('Leitura complementar não pode publicar questões sem cobertura de edital');
  } else if (row.quiz?.length !== 8) throw new Error('Prática incompleta');
  if (row.flashcards?.length !== 4) throw new Error('Prática incompleta');
  if (row.quiz.some(q => typeof q.a !== 'boolean' || !q.q || !q.why)) throw new Error('Questão inválida');
  if (row.flashcards.some(c => !c.f || !c.b)) throw new Error('Cartão inválido');
  if (row.legal_basis.some(s => !s.title || !/^https:\/\//.test(s.url))) throw new Error('Fonte inválida');
}
const result = { validated: records.length, inserted: 0, preserved: 0, dry_run: mode === '--dry-run' };
if (!result.dry_run) {
  const project = process.env.TASK_SUPABASE_PROJECT;
  const key = process.env.TASK_SUPABASE_KEY;
  const reviewer = process.env.TASK_LIBRARY_REVIEWER;
  if (!/^[a-z]{20}$/.test(project ?? '') || !key || !reviewer) throw new Error('Defina TASK_SUPABASE_PROJECT, TASK_SUPABASE_KEY e TASK_LIBRARY_REVIEWER na sessão');
  const base = `https://${project}.supabase.co/rest/v1`;
  const request = async (path, options = {}) => {
    const response = await fetch(base + path, { ...options, headers: { ...sessionAuthHeaders(key), 'Content-Type': 'application/json', ...options.headers } });
    if (!response.ok) throw new Error(`Supabase HTTP ${response.status}`);
    return response.status === 204 ? null : response.json();
  };
  const topics = await request('/syllabus_topics?select=id,discipline,topic_order,content_status,edition_id&content_status=eq.current&limit=1000');
  const editions = await request('/syllabus_editions?select=id,status&status=eq.active&limit=1000');
  // Check the exact fields used by the existing library; retain existing rows on retry.
  for (const row of records) {
    if (!topics.some(t => t.id === row._syllabus_topic_id && t.edition_id === row._syllabus_edition_id && t.topic_order === row.syllabus_topic_order && editions.some(e => e.id === t.edition_id))) throw new Error(`Tópico não vigente: ${row.slug}`);
  }
  const existing = [];
  for (let offset = 0;;) {
    const page = await request(`/study_materials?select=*&order=id&limit=200&offset=${offset}`);
    if (!page.length) break;
    existing.push(...page); offset += page.length;
  }
  const materialData = row => {
    const { _syllabus_topic_id, _syllabus_edition_id, _supplemental_scope, ...material } = row;
    return material;
  };
  const matches = (actual, expected) => !!actual && Object.keys(expected).every(k =>
    k === 'law_version_checked_at' ? Date.parse(actual[k]) === Date.parse(expected[k]) : isDeepStrictEqual(actual[k], expected[k]));
  for (const row of records) {
    const found = existing.find(r => r.slug === row.slug);
    if (found && (!matches(found, materialData(row)) || !['active','under_review'].includes(found.content_status))) throw new Error(`Material existente diverge: ${row.slug}; não será sobrescrito`);
  }
  for (const row of records) {
    const material = materialData(row);
    if (!existing.some(r => r.slug === row.slug)) {
      const inserted = await request('/study_materials?on_conflict=slug', {
        method: 'POST', headers: { Prefer: 'resolution=ignore-duplicates,return=representation' },
        body: JSON.stringify({ ...material, content_status: 'under_review' }),
      });
      result.inserted += inserted.length;
      result.preserved += inserted.length === 0 ? 1 : 0;
    } else result.preserved++;
    const [actual] = await request(`/study_materials?slug=eq.${row.slug}&select=*`);
    if (!matches(actual, material)) throw new Error(`Leitura posterior diverge: ${row.slug}`);
    if (actual.content_status === 'under_review') await request(`/study_materials?id=eq.${actual.id}&content_status=eq.under_review`, {
      method: 'PATCH', headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({content_status:'active',reviewed_by:reviewer,reviewed_at:new Date().toISOString()}),
    });
    else if (actual.content_status !== 'active') throw new Error('Material arquivado não será republicado automaticamente');
  }
}
await writeFile(report, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result));
