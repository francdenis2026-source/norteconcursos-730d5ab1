// Pass a separately installed PGlite module path; no production database is contacted.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const { PGlite } = await import(pathToFileURL(process.argv[2]).href);
const directory = 'supabase/imports/idecan/revisao-2026-10-23';
const sql = fs.readFileSync(directory + '/aplicar-primeira-revisao.sql','utf8');
const db = new PGlite();
try {
  const schema = fs.readFileSync('supabase/migrations/20261010100000_private_question_corpora.sql','utf8').split('alter table')[0];
  await db.exec(schema);
  await db.exec(`create schema auth;
    create function auth.uid() returns uuid language sql as $$ select null::uuid $$;
    create function auth.role() returns text language sql as $$ select 'authenticated'::text $$;
    create function public.has_role(uuid,text) returns boolean language sql as $$ select false $$;
    create role anon; create role authenticated; create role service_role;`);
  await db.exec(fs.readFileSync('supabase/migrations/20261010110000_audited_corpus_reviews.sql','utf8'));
  await db.exec(fs.readFileSync('supabase/imports/idecan/pcce_2021_acervo_privado.sql','utf8'));
  // A concurrent edit on a late item must roll back preceding decisions too.
  const pack = JSON.parse(fs.readFileSync('supabase/imports/idecan/pcce_escrivao_2021_corpus.json'));
  const late = pack.candidates[78];
  await db.query("update question_corpus_candidates set payload=payload || '{\"concurrent_note\":\"preserve\"}'::jsonb where id=$1",[late.id]);
  await assert.rejects(db.exec(sql), /Revisão desatualizada/);
  await db.exec('rollback');
  assert.equal((await db.query('select count(*)::int as n from question_corpus_review_audit')).rows[0].n,0);
  assert.equal((await db.query("select count(*)::int as n from question_corpus_candidates where content_status='under_review'")).rows[0].n,200);
  assert.equal((await db.query('select payload from question_corpus_candidates where id=$1',[late.id])).rows[0].payload.concurrent_note,'preserve');
  // Restore only this local fixture to test the clean application.
  await db.query('update question_corpus_candidates set payload=$1::jsonb where id=$2',[JSON.stringify(late.payload),late.id]);
  await db.exec(sql);
  const counts = (await db.query('select content_status,count(*)::int as n from question_corpus_candidates group by content_status order by content_status')).rows;
  assert.deepEqual(counts,[{content_status:'rejected',n:3},{content_status:'reviewed',n:20},{content_status:'under_review',n:177}]);
  assert.equal((await db.query('select count(*)::int as n from question_corpus_review_audit')).rows[0].n,23);
  await db.exec(sql);
  assert.equal((await db.query('select count(*)::int as n from question_corpus_review_audit')).rows[0].n,23);
  assert.equal((await db.query("select count(*)::int as n from question_corpus_candidates where payload ? 'publication'")).rows[0].n,0);
  await db.exec('create role idecan_non_admin; grant usage on schema auth to idecan_non_admin; set role idecan_non_admin');
  await assert.rejects(db.exec(sql), /Administrator required/);
  await db.exec('rollback; reset role');
  console.log('SQL aprovado: 23 auditorias, reexecução idempotente, rollback de conflito, usuário sem privilégio recusado e zero publicações.');
} finally { await db.close(); }
