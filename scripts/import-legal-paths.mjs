import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { sessionAuthHeaders } from './supabase-session-auth.mjs';

const [input, report, mode] = process.argv.slice(2);
if (!input || !report || (mode && mode !== '--dry-run')) throw new Error('Uso: node scripts/import-legal-paths.mjs PACOTE_JSON RELATORIO_JSON [--dry-run]');
const { courses, units } = JSON.parse(await readFile(input, 'utf8'));
const ids = new Set(), slugs = new Set(), unitIds = new Set(), unitKeys = new Set();
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/;
const hash = /^[0-9a-f]{64}$/;
if (!Array.isArray(courses) || !courses.length || !Array.isArray(units) || !units.length) throw new Error('Pacote incompleto');
for (const course of courses) {
  const url = new URL(course.source_url);
  if (url.protocol !== 'https:' || url.hostname !== 'www.planalto.gov.br' || url.username || url.password) throw new Error('Fonte jurídica inválida');
  if (!uuid.test(course.id) || !uuid.test(course.syllabus_topic_id) || ids.has(course.id) || slugs.has(course.slug) || !hash.test(course.source_sha256) || !Number.isFinite(Date.parse(course.checked_at))) throw new Error('Curso inválido ou duplicado');
  if (Object.hasOwn(course, 'status') || Object.hasOwn(course, 'reviewed_by') || Object.hasOwn(course, 'reviewed_at')) throw new Error('Revisão deve ser definida pelo importador');
  if (!course.overview?.objectives?.length || !course.overview.editorial_scope || !course.material_slug) throw new Error('Pedagogia ou vínculo ausente');
  ids.add(course.id); slugs.add(course.slug);
}
for (const unit of units) {
  const key = `${unit.course_id}/${unit.unit_key}`;
  if (!uuid.test(unit.id) || unitIds.has(unit.id) || unitKeys.has(key) || !ids.has(unit.course_id) || !Number.isInteger(unit.position) || !unit.label || !unit.chapter || !unit.body_text || !['current','excluded'].includes(unit.content_status)) throw new Error('Dispositivo inválido ou duplicado');
  if (createHash('sha256').update(unit.body_text).digest('hex') !== unit.content_sha256) throw new Error('Texto alterado sem conferência');
  if (!unit.recall?.prompts?.length || !unit.recall?.checklist?.length) throw new Error('Recuperação incompleta');
  unitIds.add(unit.id); unitKeys.add(key);
}
for (const course of courses) {
  const rows = units.filter(unit => unit.course_id === course.id);
  if (rows.filter(row => row.content_status === 'current').length !== course.overview.current_units || rows.filter(row => row.content_status === 'excluded').length !== course.overview.excluded_units) throw new Error('Cobertura divergente');
}
const result = { courses: courses.length, units: units.length, inserted_courses: 0, inserted_units: 0, preserved_courses: 0, dry_run: mode === '--dry-run' };
if (!result.dry_run) {
  const project = process.env.TASK_SUPABASE_PROJECT, key = process.env.TASK_SUPABASE_KEY, reviewer = process.env.TASK_LIBRARY_REVIEWER;
  if (!/^[a-z]{20}$/.test(project ?? '') || !key || !uuid.test(reviewer ?? '')) throw new Error('Defina projeto, chave e revisor autorizado na sessão');
  const request = async (path, options = {}) => {
    const response = await fetch(`https://${project}.supabase.co/rest/v1${path}`, { ...options, headers: { ...sessionAuthHeaders(key), 'Content-Type': 'application/json', ...options.headers } });
    if (!response.ok) throw new Error(`Supabase HTTP ${response.status}`);
    return response.status === 204 ? null : response.json();
  };
  const topics = await request('/syllabus_topics?select=id,edition_id&content_status=eq.current&limit=1000');
  const editions = await request('/syllabus_editions?select=id&status=eq.active&limit=1000');
  const sources = await request('/content_sources?select=url,is_official&limit=1000');
  const materials = await request('/study_materials?select=slug&content_status=eq.active&limit=1000');
  const existing = await request('/legal_courses?select=*&limit=1000');
  const equal = (a,b) => {
    if (a === b) return true;
    if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;
    return Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(k => equal(a[k], b[k]));
  };
  const matches = (actual, expected) => !!actual && Object.keys(expected).every(k => k === 'checked_at' ? Date.parse(actual[k]) === Date.parse(expected[k]) : equal(actual[k], expected[k]));
  // Complete preflight before the first database mutation.
  for (const course of courses) {
    const topic = topics.find(row => row.id === course.syllabus_topic_id);
    if (!topic || !editions.some(row => row.id === topic.edition_id) || !sources.some(row => row.url === course.source_url && row.is_official) || !materials.some(row => row.slug === course.material_slug)) throw new Error('Fonte, resumo ou edital não vigente');
    const found = existing.find(row => row.id === course.id || row.slug === course.slug);
    if (found && !matches(found, course)) throw new Error(`Curso já revisado diverge: ${course.slug}; não será sobrescrito`);
    if (found && !['active','under_review'].includes(found.status)) throw new Error('Curso arquivado não será republicado automaticamente');
  }
  for (const course of courses) {
    let found = existing.find(row => row.id === course.id);
    if (!found) {
      const inserted = await request('/legal_courses?on_conflict=id', { method:'POST', headers:{Prefer:'resolution=ignore-duplicates,return=representation'}, body:JSON.stringify({...course,status:'under_review'}) });
      result.inserted_courses += inserted.length;
      [found] = await request(`/legal_courses?id=eq.${course.id}&select=*`);
      if (!matches(found,course)) throw new Error('Conflito concorrente no curso');
    } else result.preserved_courses++;
    const expected = units.filter(row => row.course_id === course.id);
    for (let start=0; start<expected.length; start+=40) {
      const inserted = await request('/legal_course_units?on_conflict=course_id,unit_key', { method:'POST', headers:{Prefer:'resolution=ignore-duplicates,return=representation'}, body:JSON.stringify(expected.slice(start,start+40)) });
      result.inserted_units += inserted.length;
    }
    const actual = [];
    for (let start=0;;) {
      const page = await request(`/legal_course_units?course_id=eq.${course.id}&select=*&order=position&offset=${start}&limit=200`);
      if (!page.length) break;
      actual.push(...page); start += page.length;
    }
    if (actual.length !== expected.length || expected.some(row => !matches(actual.find(a=>a.id===row.id),row))) throw new Error(`Leitura posterior diverge: ${course.slug}`);
    // Publication follows complete readback; existing reviewer and date remain untouched.
    if (found.status === 'under_review') await request(`/legal_courses?id=eq.${course.id}&status=eq.under_review`, {method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({status:'active',reviewed_by:reviewer,reviewed_at:new Date().toISOString()})});
    else if (found.status !== 'active') throw new Error('Curso arquivado não será republicado automaticamente');
  }
}
await writeFile(report, JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
