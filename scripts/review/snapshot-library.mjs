// Read-only, immutable snapshot for article-level editorial coverage.
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { sessionAuthHeaders } from '../supabase-session-auth.mjs';
import { collectSnapshotRows } from './snapshot-pages.mjs';
const [folder] = process.argv.slice(2);
const project = process.env.TASK_SUPABASE_PROJECT, key = process.env.TASK_SUPABASE_KEY;
if (!folder || project !== 'gkwphadbveiyjcwiiizw' || !key) throw Error('Pasta, projeto e chave de sessão necessários');
const destination = resolve(folder);
await mkdir(destination, {recursive: true});
const tables = ['study_materials','study_material_enrichments','legal_courses','legal_course_units','legal_unit_explanations','syllabus_topics','syllabus_editions','content_sources'];
for (const table of tables) {
  const order = table === 'legal_unit_explanations' ? 'unit_id' : 'id';
  const rows = await collectSnapshotRows(order, async params => {
    let page;
    for (let attempt = 0; ; attempt++) {
      try {
        const response = await fetch(`https://${project}.supabase.co/rest/v1/${table}?${params}`, {headers: sessionAuthHeaders(key), signal: AbortSignal.timeout(30000)});
        if (!response.ok) throw Error(`${table}: HTTP ${response.status}`);
        page = await response.json(); break;
      } catch (error) { if (attempt === 2) throw error; }
    }
    return page;
  });
  await writeFile(resolve(destination, `${table}.json`), JSON.stringify(rows, null, 2)+'\n', {flag: 'wx'});
  console.log(table, rows.length);
}
