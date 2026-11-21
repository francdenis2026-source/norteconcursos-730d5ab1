import assert from 'node:assert/strict';
import fs from 'node:fs';
import { PGlite } from '@electric-sql/pglite';

const dir = 'supabase/migrations';
const migrations = fs.readdirSync(dir)
  .filter(name => /^2026112130(?:6[7-9]|7[0-9]|8[0-6])00_.*\.sql$/.test(name))
  .sort();
assert.equal(migrations.length, 20, 'Expected 20 PC-AC migrations from versions 067 to 086, inclusive');
const db = new PGlite();
await db.exec(`create table public.study_materials (
  slug text primary key, title text, summary text, body_md text, updated_at timestamptz
)`);
await db.exec(`create table public.curated_question_catalog (
  id uuid primary key default gen_random_uuid(), external_item_key text,
  content_status text, verified_at timestamptz, law_version_checked_at timestamptz
)`);
try {
  let checked = 0;
  for (const name of migrations) {
    const sql = fs.readFileSync(dir + '/' + name, 'utf8');
    assert.ok(!sql.includes('("pcac-2026-'), 'Invalid identifier literals in ' + name);
    await db.exec(sql);
    checked++;
  }
  assert.equal(checked, 20);
  console.log('PC-AC PostgreSQL migrations checked:', checked);
} finally {
  await db.close();
}
