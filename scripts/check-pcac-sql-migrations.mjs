import assert from 'node:assert/strict';
import fs from 'node:fs';
import { PGlite } from '@electric-sql/pglite';

const dir = 'supabase/migrations';
const migrations = fs.readdirSync(dir)
  .filter(name => /^2026112130(?:6[7-9]|7[0-9]|8[0-7])00_.*\.sql$/.test(name))
  .sort();
assert.equal(migrations.length, 21, 'Expected 21 PC-AC migrations from versions 067 to 087, inclusive');
const db = new PGlite();
await db.exec(`create table public.study_materials (
  slug text primary key, contest_name text, title text, summary text, body_md text, quiz jsonb not null default '[]'::jsonb, practice_review jsonb, updated_at timestamptz
)`);
await db.exec(`create table public.curated_question_catalog (
  id uuid primary key default gen_random_uuid(), external_item_key text,
  content_status text, verified_at timestamptz, law_version_checked_at timestamptz
)`);
try {
  let checked = 0;
  for (const name of migrations) {

    if (name.startsWith('20261121308700_')) {
      const cases = [
        ['pcac-2026-constitucional-constituicao-acre-policia-civil', 3],
        ['pcac-2026-constituicao-seguranca-publica-art144-acre', 5],
      ];
      for (const [slug, index] of cases) {
        const items = Array.from({ length: 8 }, (_, i) => ({
          q: 'Example question ' + (i + 1),
          a: true,
          why: 'Legacy explanation for item ' + (i + 1),
        }));
        items[index - 1].q = 'O Instituto Socioeducativo integra o rol atual de órgãos de segurança pública.';
        await db.query(
          'insert into public.study_materials (slug, contest_name, body_md, quiz) values ($1, $2, $3, $4::jsonb)',
          [slug, 'PC-AC 2026', 'QUESTÃO DE ABERTURA — padrão IDECAN (autoral)', JSON.stringify(items)],
        );
      }
    }
    const sql = fs.readFileSync(dir + '/' + name, 'utf8');
    assert.ok(!sql.includes('("pcac-2026-'), 'Invalid identifier literals in ' + name);
    await db.exec(sql);
    checked++;
  }
  assert.equal(checked, 21);
  const corrected = await db.query("select slug, quiz, body_md from public.study_materials where contest_name='PC-AC 2026' order by slug");
  assert.equal(corrected.rows.length, 2);
  for (const row of corrected.rows) {
    const index = row.slug.includes('constitucional-constituicao-acre') ? 2 : 4;
    assert.equal(row.quiz[index].a, false, 'ADI 7466 gabarito must be false');
    assert.match(row.quiz[index].why, /ADI 7[.]466/, 'Must explain STF ruling');
    assert.match(row.body_md, /ADI 7[.]466/);
    assert.ok(!row.body_md.includes('QUESTÃO DE ABERTURA'));
  }
  // A migration is safe to re-run: it must not duplicate its legal correction.
  const before = corrected.rows.map(row => ({ slug: row.slug, quiz: row.quiz, body_md: row.body_md }));
  await db.exec(fs.readFileSync(dir + '/20261121308700_correct_adi7466_acre_constitution_and_lesson_labels.sql', 'utf8'));
  const rerun = await db.query("select slug, quiz, body_md from public.study_materials where contest_name='PC-AC 2026' order by slug");
  assert.deepEqual(rerun.rows.map(row => ({ slug: row.slug, quiz: row.quiz, body_md: row.body_md })), before);
  console.log('PC-AC PostgreSQL migrations checked:', checked);
} finally {
  await db.close();
}
