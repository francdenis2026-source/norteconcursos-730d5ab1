// Install PGlite outside the checkout, then pass its module path as the first argument.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { stagingSql } from './prepare-staging.mjs';
const { PGlite } = await import(pathToFileURL(process.argv[2]).href);
const db = new PGlite();
try {
  const schema = fs.readFileSync('supabase/migrations/20261010100000_private_question_corpora.sql', 'utf8').split('alter table')[0];
  await db.exec(schema);
  const packs = ['inspetor', 'escrivao'].map((career) => JSON.parse(fs.readFileSync(`supabase/imports/idecan/pcce_${career}_2021_corpus.json`)));
  const sql = stagingSql(packs);
  assert.equal(sql, fs.readFileSync('supabase/imports/idecan/pcce_2021_acervo_privado.sql', 'utf8'));
  await db.exec(sql);
  const counts = () => db.query('select content_status,count(*)::int as n from question_corpus_candidates group by content_status order by content_status');
  assert.deepEqual((await counts()).rows, [{ content_status: 'under_review', n: 200 }]);
  await db.exec(sql);
  assert.deepEqual((await counts()).rows, [{ content_status: 'under_review', n: 200 }]);
  const candidate = packs[0].candidates[0];
  await db.query("update question_corpus_candidates set content_status='reviewed',payload=payload || '{\"review_note\":\"revisão posterior preservada\"}'::jsonb where id=$1", [candidate.id]);
  await db.exec(sql);
  const saved = (await db.query('select content_status,payload from question_corpus_candidates where id=$1', [candidate.id])).rows[0];
  assert.equal(saved.content_status, 'reviewed');
  assert.equal(saved.payload.review_note, 'revisão posterior preservada');
  const changed = structuredClone(packs);
  changed[1].source.raw_text += ' alteração indevida';
  await assert.rejects(db.exec(stagingSql(changed)), /Fonte existente divergente/);
  await db.exec('rollback');
  const conflicting = structuredClone(packs);
  conflicting[0].candidates[0].payload.raw_text += ' alteração indevida';
  await assert.rejects(db.exec(stagingSql(conflicting)), /Candidato existente divergente/);
  await db.exec('rollback');
  assert.equal((await db.query('select count(*)::int as n from question_corpus_candidates')).rows[0].n, 200);
  console.log('PostgreSQL/PGlite: carga de 200, reexecução idempotente, revisão preservada e conflitos bloqueados.');
} finally {
  await db.close();
}
