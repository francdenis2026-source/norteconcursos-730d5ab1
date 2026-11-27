import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

const uid = "00000000-0000-4000-8000-000000000001";
const other = "00000000-0000-4000-8000-000000000002";

async function fixture() {
  const db = new PGlite();
  await db.exec(`
    create role anon; create role authenticated;
    create schema auth;
    create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
    create table user_roles(user_id uuid, role text);
    create table question_training_responses(id uuid, user_id uuid, question_id uuid, question_table text, question_source text, subject text, selected_answer text, is_correct boolean, created_at timestamptz, response_seconds integer);
    create table pcac_study_responses(id uuid,user_id uuid,question_key text,subject_name text,selected text,is_correct boolean,answered_at timestamptz,response_seconds integer);
    create table simulator_responses(id uuid,user_id uuid,question_id uuid,question_table text,question_source text,subject text,selected_answer text,is_correct boolean,created_at timestamptz);
    create table material_practice_responses(id uuid,user_id uuid,material_id uuid,item_index integer,selected_answer text,is_correct boolean,created_at timestamptz,response_seconds integer);
    create table study_materials(id uuid,discipline text);
    create table profiles(id uuid);
    create table fixture_scores(user_id uuid,qp integer,sp integer,fp integer,ep integer,qn integer,qc integer);
    create function score_events(_since timestamptz default '-infinity') returns table(user_id uuid,qp integer,sp integer,fp integer,ep integer,qn integer,qc integer) language sql as $$
      with qa as (select * from fixture_scores), sm as (select * from fixture_scores where false),
      users as (select user_id from qa union select user_id from sm)
      select u.user_id,qa.qp,qa.sp,qa.fp,qa.ep,
        coalesce(qa.n, 0) + coalesce(sm.n, 0), coalesce(qa.c, 0) + coalesce(sm.c, 0)
      from users u left join (select *,qn n,qc c from qa) qa using(user_id)
      left join (select *,qn n,qc c from sm) sm using(user_id)
    $$;
    insert into profiles values('${uid}'),('${other}');
    insert into fixture_scores values('${uid}',123,7,2,0,207,147);
    select set_config('request.jwt.claim.sub','${uid}',false);
  `);
  await db.exec(await readFile(new URL('../supabase/migrations/20261127064000_recorded_ranking_accuracy.sql', import.meta.url), 'utf8'));
  return db;
}

test("all disciplines appear, including one recorded answer; over 200 answers have exact weighted accuracy", async () => {
  const db = await fixture();
  try {
    await db.exec(`insert into question_training_responses
      select lpad(i::text,32,'0')::uuid,'${uid}',lpad(i::text,32,'0')::uuid,'board_exam_questions','board',
      case when i<=200 then 'Direito Penal' else 'Disciplina '||i end,'A',i<=150,'2026-11-27'::timestamptz+i*interval '5 seconds',5 from generate_series(1,207)i;`);
    const rows = (await db.query(`select get_ranking_strengths('${uid}') data`)).rows[0].data;
    assert.equal(rows.length, 8);
    assert.equal(rows.reduce((s,r)=>s+r.n,0),207);
    assert.equal(rows.reduce((s,r)=>s+r.c,0),150);
    assert.deepEqual(rows.find(r=>r.s==='Direito Penal'),{s:'Direito Penal',n:200,c:150,pct:75});
    const score=(await db.query('select * from score_events()')).rows[0];
    assert.equal(score.qn,207); assert.equal(score.qc,150);
    assert.equal(score.qp,123); assert.equal(score.sp,7);
  } finally { await db.close(); }
});

test("repeat errors and later successes do not distort first-answer accuracy across trainer and simulator", async () => {
  const db=await fixture();
  try {
    await db.exec(`insert into question_training_responses values('${uid}','${uid}','${uid}','board_exam_questions','board','Direito Penal','A',false,'2026-11-25',5),('${other}','${uid}','${uid}','board_exam_questions','board','Direito Penal','B',true,'2026-11-26',5);
      insert into simulator_responses values('${uid}','${uid}','${uid}','board_exam_questions','board','Direito Penal','B',true,'2026-11-27');`);
    assert.deepEqual((await db.query(`select get_ranking_strengths('${uid}') data`)).rows[0].data,[{s:'Direito Penal',n:1,c:0,pct:0}]);
  } finally { await db.close(); }
});

test("blank and ungraded items are excluded; PC-AC and library recorded results count with real subjects",async()=>{
  const db=await fixture();
  try {
    await db.exec(`insert into question_training_responses values('${uid}','${uid}','${uid}',null,'board','Direito Penal',null,false,'2026-11-25',5),('${other}','${uid}','${other}',null,'board','Direito Penal','A',null,'2026-11-25',5);
      insert into pcac_study_responses values('${uid}','${uid}','pcac1','Noções de Direito Constitucional','A',true,'2026-11-25',0),('${other}','${uid}','pcac2','Direito Constitucional','B',false,'2026-11-25',0);
      insert into study_materials values('${uid}','Estatística');
      insert into material_practice_responses values('${uid}','${uid}','${uid}',0,'C',true,'2026-11-25',5);`);
    const rows=(await db.query(`select get_ranking_strengths('${uid}') data`)).rows[0].data;
    assert.equal(rows.length,2);
    assert.deepEqual(rows.find(r=>r.s==='Direito Constitucional'),{s:'Direito Constitucional',n:2,c:1,pct:50});
    assert.deepEqual(rows.find(r=>r.s==='Estatística'),{s:'Estatística',n:1,c:1,pct:100});
  } finally { await db.close(); }
});

test("private answers remain inaccessible to anonymous callers; aggregates exclude admins",async()=>{
  const db=await fixture();
  try {
    await db.exec(`insert into user_roles values('${other}','admin');`);
    assert.deepEqual((await db.query(`select get_ranking_strengths('${other}') data`)).rows[0].data,[]);
    await db.exec('set role anon');
    await assert.rejects(db.query(`select get_ranking_strengths('${uid}')`));
    await assert.rejects(db.query('select * from _ranking_recorded_answers(null)'));
  } finally {await db.close();}
});