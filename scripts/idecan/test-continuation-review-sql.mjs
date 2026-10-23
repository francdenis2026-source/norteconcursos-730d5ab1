// PGlite is installed separately; pass its module path. No production writes.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const { PGlite } = await import(pathToFileURL(process.argv[2]).href);
const db = new PGlite();
const root = 'supabase/imports/idecan';
const manifest = JSON.parse(fs.readFileSync(`${root}/continuacao-2026-10-23/partes/manifesto.json`));
const parts = manifest.parts.map((p) => fs.readFileSync(`${root}/continuacao-2026-10-23/partes/${p.file}`, 'utf8'));
const sql = fs.readFileSync(`${root}/continuacao-2026-10-23/aplicar-continuacao.sql`,'utf8');
try {
  await db.exec(fs.readFileSync('supabase/migrations/20261010100000_private_question_corpora.sql','utf8').split('alter table')[0]);
  await db.exec(`create schema auth;
    create function auth.uid() returns uuid language sql as $$ select null::uuid $$;
    create function auth.role() returns text language sql as $$ select 'authenticated'::text $$;
    create function public.has_role(uuid,text) returns boolean language sql as $$ select false $$;
    create role anon; create role authenticated; create role service_role;`);
  await db.exec(fs.readFileSync('supabase/migrations/20261010110000_audited_corpus_reviews.sql','utf8'));
  await db.exec(fs.readFileSync(`${root}/pcce_2021_acervo_privado.sql`,'utf8'));
  await db.exec(fs.readFileSync(`${root}/revisao-2026-10-23/aplicar-primeira-revisao.sql`,'utf8'));
  const clerk=JSON.parse(fs.readFileSync(`${root}/revisao-2026-10-23/pcce_escrivao_2021_revisado.json`));
  const late=clerk.candidates[99];
  await db.query("update question_corpus_candidates set payload=payload || '{\"concurrent_note\":\"preserve\"}'::jsonb where id=$1",[late.id]);
  await assert.rejects(db.exec(sql),/Revisão desatualizada/);
  await db.exec('rollback');
  assert.equal((await db.query('select count(*)::int n from question_corpus_review_audit')).rows[0].n,23);
  assert.equal((await db.query("select count(*)::int n from question_corpus_candidates where content_status='under_review'")).rows[0].n,177);
  assert.equal((await db.query('select payload from question_corpus_candidates where id=$1',[late.id])).rows[0].payload.concurrent_note,'preserve');
  await db.query('update question_corpus_candidates set payload=$1::jsonb where id=$2',[JSON.stringify(late.payload),late.id]);
  // A later legitimate note on a previous decision must also remain untouched.
  await db.query("update question_corpus_candidates set payload=payload || '{\"earlier_review_note\":\"keep\"}'::jsonb where id=$1",[clerk.candidates[0].id]);
  const earlier=(await db.query("select id,content_status,payload from question_corpus_candidates where content_status<>'under_review' order by id")).rows;
  // Earlier parts commit; a conflict rolls back only the last part.
  await db.query("update question_corpus_candidates set payload=payload || '{\"concurrent_note\":\"preserve\"}'::jsonb where id=$1",[late.id]);
  for (const part of parts.slice(0,-1)) await db.exec(part);
  const committed = (await db.query('select count(*)::int n from question_corpus_review_audit')).rows[0].n;
  await assert.rejects(db.exec(parts.at(-1)),/Revisão desatualizada/);
  await db.exec('rollback');
  assert.equal((await db.query('select count(*)::int n from question_corpus_review_audit')).rows[0].n,committed);
  assert.equal(committed,200-manifest.parts.at(-1).decisions);
  await db.query('update question_corpus_candidates set payload=$1::jsonb where id=$2',[JSON.stringify(late.payload),late.id]);
  for (const part of parts) await db.exec(part);
  await db.exec(fs.readFileSync(`${root}/continuacao-2026-10-23/partes/verificar.sql`,'utf8'));
  const states=(await db.query('select content_status,count(*)::int n from question_corpus_candidates group by content_status order by content_status')).rows;
  assert.deepEqual(states,[{content_status:'obsolete',n:5},{content_status:'rejected',n:3},{content_status:'reviewed',n:192}]);
  assert.equal((await db.query('select count(*)::int n from question_corpus_review_audit')).rows[0].n,200);
  for (const row of earlier) assert.deepEqual((await db.query('select id,content_status,payload from question_corpus_candidates where id=$1',[row.id])).rows[0],row);
  for (const part of parts) await db.exec(part);
  assert.equal((await db.query('select count(*)::int n from question_corpus_review_audit')).rows[0].n,200);
  assert.equal((await db.query("select count(*)::int n from question_corpus_candidates where payload ? 'publication'")).rows[0].n,0);
  await db.exec('create role idecan_non_admin; grant usage on schema auth to idecan_non_admin; set role idecan_non_admin');
  await assert.rejects(db.exec(sql),/Administrator required/);
  await db.exec('rollback; reset role');
  console.log('SQL da continuação: 177 decisões, 23 anteriores preservadas, auditoria total 200, reexecução idempotente, conflito com rollback e zero publicações.');
} finally { await db.close(); }
