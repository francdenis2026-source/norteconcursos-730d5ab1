// Run with NORTE_TEST_DEPS_DIR pointing to an external npm prefix containing @electric-sql/pglite.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(`${process.env.NORTE_TEST_DEPS_DIR ?? process.cwd()}/package.json`);
const { PGlite } = require('@electric-sql/pglite');
const migration = readFileSync(new URL('../supabase/migrations/20261020120000_cross_mode_question_identity.sql', import.meta.url), 'utf8');
const original = readFileSync(new URL('../supabase/migrations/20261012100000_fair_scoring.sql', import.meta.url), 'utf8');
const originalScore = original.slice(original.indexOf('create or replace function public.score_events'), original.indexOf('create or replace function public.get_ranking_section'));
const user = '11111111-1111-1111-1111-111111111111';
const other = '22222222-2222-2222-2222-222222222222';
const question = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
const attempt = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
const fixture = `
create role anon; create role authenticated;
create schema auth;
create table auth.users(id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('app.user_id', true), '')::uuid $$;
insert into auth.users values ('${user}'), ('${other}');
create table official_exam_questions(id uuid primary key, official_answer text, content_status text);
create table board_exam_questions (like official_exam_questions including all);
create table curated_question_catalog (like official_exam_questions including all);
create table question_bank (like official_exam_questions including all);
alter table question_bank add column user_id uuid;
create table question_training_responses(id uuid primary key default gen_random_uuid(),user_id uuid,question_id uuid,question_source text,selected_answer text,official_answer text,is_correct boolean,asked_for_help boolean default false,response_seconds integer default 0,created_at timestamptz default now());
create table simulator_attempts(id uuid primary key,user_id uuid,finished_at timestamptz default now(),duration_seconds int, total_questions int,correct_answers int,wrong_answers int,blank_answers int,accuracy numeric);
create table simulator_responses(id uuid primary key default gen_random_uuid(),user_id uuid,attempt_id uuid references simulator_attempts(id),question_id uuid,question_source text,selected_answer text,official_answer text,is_correct boolean,question_order int,created_at timestamptz default now(),unique(attempt_id,question_order));
create table study_sessions(user_id uuid,study_date date,active_seconds int,started_at timestamptz);
create table flashcard_reviews(user_id uuid,card_id uuid,rating text,reviewed_at timestamptz);
create table user_essays(user_id uuid,body text,created_at timestamptz);
create table user_roles(user_id uuid,role text);
insert into board_exam_questions values('${question}','A','active');
`;
async function db(migrate = true) {
 const pg = new PGlite(); await pg.exec(fixture); await pg.exec(originalScore);
 if(migrate) await pg.exec(migration);
 await pg.exec(`set app.user_id='${user}'`); return pg;
}
async function train(pg, selected='A', seconds=10, table='board_exam_questions') {
 return pg.query(`insert into question_training_responses(user_id,question_id,question_source,question_table,selected_answer,official_answer,is_correct,response_seconds) values($1,$2,'official',$3,$4,'B',false,$5) returning *`,[user,question,table,selected,seconds]);
}
async function startAttempt(pg,total=1,duration=30) {
 await pg.query(`insert into simulator_attempts(id,user_id,duration_seconds,total_questions,correct_answers,wrong_answers,blank_answers,accuracy) values($1,$2,$3,$4,1,0,$4-1,100)`,[attempt,user,duration,total]);
}
async function response(pg,selected='A',order=1,id=question,table='board_exam_questions') {
 return pg.query(`insert into simulator_responses(user_id,attempt_id,question_id,question_source,question_table,selected_answer,official_answer,is_correct,question_order) values($1,$2,$3,'official',$4,$5,'B',false,$6) returning *`,[user,attempt,id,table,selected,order]);
}

test('trainer then simulator: repeated answer remains in attempt but earns no new points',async()=>{
 const pg=await db();try{
 const first=(await train(pg)).rows[0]; assert.equal(first.ranking_first,true); assert.equal(first.is_correct,true); assert.equal(first.official_answer,'A');
 await startAttempt(pg);const repeat=(await response(pg)).rows[0];assert.equal(repeat.ranking_first,false);
 const r=(await pg.query('select * from score_events()')).rows[0];assert.equal(r.qp,3);assert.equal(r.sp,0);
 const summary=(await pg.query('select get_simulator_ranking_result($1) as s',[attempt])).rows[0].s;
 assert.deepEqual(summary,{eligible:0,repeated:1,points:0});
 assert.equal((await pg.query('select count(*)::int as n from simulator_responses')).rows[0].n,1);
 }finally{await pg.close()}
});
test('first wrong or too-fast answer reserves identity; repeating until correct never scores',async()=>{
 for(const seconds of [1,10]){const pg=await db();try{
 await train(pg,'B',seconds);await startAttempt(pg);await response(pg,'A');
 const score=(await pg.query('select * from score_events()')).rows[0];assert.equal(score?.sp??0,0);assert.equal(score?.qp??0,0);
 const history=(await pg.query('select * from get_question_first_answers()')).rows;assert.equal(history.length,1);assert.equal(history[0].selected_answer,'B');
 }finally{await pg.close()}}
});
test('two submissions reserve only one first answer and do not overwrite each other',async()=>{
 const pg=await db();try{
 const rows=await Promise.all([train(pg),train(pg)]);
 assert.equal(rows.flatMap(r=>r.rows).filter(r=>r.ranking_first).length,1);
 assert.equal((await pg.query('select count(*)::int as n from question_first_answers')).rows[0].n,1);
 const id=rows[0].rows[0].id;
 await assert.rejects(pg.query('update question_training_responses set selected_answer=$1 where id=$2',['B',id]),/immutable/);
 }finally{await pg.close()}
});
test('blank is not an answer: later trainer attempt can still reserve first response',async()=>{
 const pg=await db();try{
 await startAttempt(pg);const blank=(await response(pg,null)).rows[0];assert.equal(blank.is_correct,null);assert.equal(blank.ranking_first,false);
 assert.equal((await pg.query('select count(*)::int as n from question_first_answers')).rows[0].n,0);
 assert.equal((await train(pg)).rows[0].ranking_first,true);
 }finally{await pg.close()}
});
test('identical UUIDs in different physical tables are independent',async()=>{
 const pg=await db();try{
 await pg.query(`insert into official_exam_questions values($1,'B','active')`,[question]);
 assert.equal((await train(pg)).rows[0].ranking_first,true);
 assert.equal((await train(pg,'B',10,'official_exam_questions')).rows[0].ranking_first,true);
 assert.equal((await pg.query('select count(*)::int as n from question_first_answers')).rows[0].n,2);
 }finally{await pg.close()}
});
test('migration preserves existing scoring; legacy wrong attempts also prevent new points',async()=>{
 const pg=await db(false);try{
 await pg.query(`insert into question_training_responses(user_id,question_id,question_source,selected_answer,is_correct,response_seconds) values($1,$2,'official','B',false,10)`,[user,question]);
 const before=(await pg.query('select * from score_events()')).rows;
 await pg.exec(migration);const after=(await pg.query('select * from score_events()')).rows;assert.deepEqual(after,before);
 await startAttempt(pg);assert.equal((await response(pg)).rows[0].ranking_first,false);
 }finally{await pg.close()}
});
test('migration refuses ambiguous historical origins instead of guessing',async()=>{
 const pg=await db(false);try{
 await pg.query(`insert into official_exam_questions values($1,'B','active')`,[question]);
 await pg.query(`insert into question_training_responses(user_id,question_id,question_source,selected_answer,is_correct,response_seconds) values($1,$2,'official','A',true,10)`,[user,question]);
 await assert.rejects(pg.exec(migration),/Ambiguous legacy/);
 }finally{await pg.close()}
});
test('100-question attempt retains repeated, new, wrong and blank rows; ranking is separate',async()=>{
 const pg=await db();try{
 // 20 previously answered questions, 60 new correct, 10 new wrong, 10 blanks.
 await startAttempt(pg,100,1200);
 for(let i=0;i<100;i++){
  const id=`${i.toString(16).padStart(8,'0')}-cccc-cccc-cccc-cccccccccccc`;
  await pg.query(`insert into board_exam_questions values($1,'A','active')`,[id]);
  if(i<20)await pg.query(`insert into question_training_responses(user_id,question_id,question_source,question_table,selected_answer,official_answer,is_correct,response_seconds) values($1,$2,'official','board_exam_questions','A','A',true,10)`,[user,id]);
  await response(pg,i>=90?null:i>=80?'B':'A',i+1,id);
 }
 const stats=(await pg.query(`select count(*)::int total, count(selected_answer)::int answered, count(*) filter(where is_correct)::int correct, count(*) filter(where is_correct=false)::int wrong, count(*) filter(where selected_answer is null)::int blank from simulator_responses`)).rows[0];
 assert.deepEqual(stats,{total:100,answered:90,correct:80,wrong:10,blank:10});
 const s=(await pg.query('select get_simulator_ranking_result($1) as s',[attempt])).rows[0].s;
 assert.deepEqual(s,{eligible:70,repeated:20,points:210}); // 60*3 - 10*2 + precision bonus 50
 assert.equal((await pg.query('select * from score_events()')).rows[0].sp,210);
 }finally{await pg.close()}
});
test('history and ranking summaries cannot expose another user',async()=>{
 const pg=await db();try{
 await train(pg);await startAttempt(pg);await response(pg);
 await pg.exec(`set app.user_id='${other}'`);
 assert.equal((await pg.query('select * from get_question_first_answers()')).rows.length,0);
 assert.equal((await pg.query('select get_simulator_ranking_result($1) as s',[attempt])).rows[0].s,null);
 }finally{await pg.close()}
});

test('failed response insert rolls back its first-answer reservation',async()=>{
 const pg=await db();try{
 await pg.exec('alter table question_training_responses add check(response_seconds >= 0)');
 await assert.rejects(train(pg,'A',-1),/check constraint/);
 assert.equal((await pg.query('select count(*)::int as n from question_first_answers')).rows[0].n,0);
 assert.equal((await train(pg)).rows[0].ranking_first,true);
 }finally{await pg.close()}
});
test('authenticated users cannot create or edit first-answer reservations directly',async()=>{
 const pg=await db();try{
 await train(pg);await pg.exec('set role authenticated');
 assert.equal((await pg.query('select count(*)::int as n from question_first_answers')).rows[0].n,1);
 await assert.rejects(pg.query('delete from question_first_answers'),/permission denied/);
 await assert.rejects(pg.query("update question_first_answers set is_correct=false"),/permission denied/);
 await pg.exec('reset role');
 }finally{await pg.close()}
});
