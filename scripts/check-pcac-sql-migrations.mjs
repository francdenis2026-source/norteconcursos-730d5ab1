import assert from 'node:assert/strict';
import fs from 'node:fs';
import { PGlite } from '@electric-sql/pglite';

const migrations = [
  '20261121306700_expand_pcac_archivology_and_administration_lessons.sql',
  '20261121306800_expand_pcac_teamwork_digital_preservation_and_spreadsheets.sql',
  '20261121306900_expand_pcac_planning_records_management_data_linkage.sql',
  '20261121307000_expand_pcac_decision_control_and_records_access.sql',
  '20261121307100_clarify_pcac_financial_analysis_lesson_scopes.sql',
];
const db = new PGlite();
await db.exec(`create table public.study_materials (
  slug text primary key,
  title text,
  summary text,
  body_md text,
  updated_at timestamptz
)`);
let checked = 0;
try {
  for (const name of migrations) {
    const sql = fs.readFileSync('supabase/migrations/' + name, 'utf8');
    assert.ok(!sql.includes('("pcac-2026-'), 'Invalid identifier literals in ' + name);
    await db.exec(sql);
    checked++;
  }
  assert.equal(checked, migrations.length);
  console.log('Parsed and executed PC-AC SQL migrations:', checked);
} finally {
  await db.close();
}
