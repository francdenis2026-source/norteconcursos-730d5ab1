// In-memory PostgreSQL only; no credentials or production connection.
import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {pathToFileURL} from 'node:url';
const {PGlite}=await import(pathToFileURL(process.env.GUEST_SQL_TEST_MODULE).href);
const db=new PGlite();
try {
 await db.exec(`create role anon;create role authenticated;create schema auth;
 create function auth.uid() returns uuid language sql stable as $$select null::uuid$$;
 create function public.has_role(uuid,text) returns boolean language sql stable as $$select false$$;
 create table syllabus_editions(id uuid primary key,status text);create table syllabus_topics(id uuid primary key,edition_id uuid,content_status text);
 create table official_exam_questions(id uuid primary key,syllabus_topic_id uuid,current_syllabus_topic_id uuid,contest_name text,career_name text,career_category text,exam_board text,exam_year integer,subject text,question_text text,official_answer text,content_status text,context_review_required boolean,legal_review_required boolean,legal_audit_completed boolean,legal_basis jsonb,law_version_checked_at timestamptz,review_note text);
 create function get_current_acre_date() returns date language sql stable as $$select coalesce(nullif(current_setting('fixture.acre_day',true),''),'2026-10-18')::date$$;
 insert into syllabus_editions values('00000000-0000-0000-0000-000000000001','active');
 insert into syllabus_topics values('00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','current');
 insert into official_exam_questions select lpad(i::text,32,'0')::uuid,'00000000-0000-0000-0000-000000000001',null,'Polícia Federal','Agente de Polícia','Polícia Federal','CEBRASPE',2026,'Matemática','Julgue a afirmação matemática independente de teste número '||i||'.',case when i%2=0 then 'C' else 'E' end,'active',false,false,true,'[]'::jsonb,null,repeat('Explicação matemática didática para o item apresentado. ',3) from generate_series(1,50)i;`);
 const basis=await readFile('supabase/migrations/20261004140000_platform_audit_fixes.sql','utf8');
 await db.exec(basis.slice(basis.indexOf('create or replace function public.has_verified_question_basis'),basis.indexOf('create or replace function public.get_daily_guest_questions')));
 for(const file of ['20261015010000_balanced_daily_guest_questions.sql','20261015020000_security_ce_daily_guest_questions.sql','20261019060000_repair_daily_guest_gaps.sql'])await db.exec(await readFile('supabase/migrations/'+file,'utf8'));
 const get=async(limit=10)=>(await db.query('select id,question_text from get_daily_guest_questions($1)',[limit])).rows;
 const first=await get();assert.equal(first.length,10);assert.deepEqual(await get(),first);
 const archived=first.slice(0,3).map(q=>q.id),good=first.slice(3).map(q=>q.id);
 await db.query("update official_exam_questions set content_status='archived' where id=any($1::uuid[])",[archived]);
 const repaired=await get();assert.equal(repaired.length,10);assert.ok(good.every(id=>repaired.some(q=>q.id===id)));assert.ok(repaired.every(q=>!archived.includes(q.id)));
 assert.equal(new Set(repaired.map(q=>q.id)).size,10);assert.deepEqual(await get(),repaired);
 assert.deepEqual(await get(1),repaired.slice(0,1));assert.equal((await get(50)).length,10);assert.equal((await get(-1)).length,0);
 // The same item must not move out of its valid, published position.
 const positions=(await db.query("select question_id,position from daily_guest_question_items where day='2026-10-18' order by position")).rows;
 assert.deepEqual(positions.slice(3).map(q=>q.question_id),good);
 await db.exec("select set_config('fixture.acre_day','2026-10-19',false)");
 const tomorrow=await get();assert.equal(tomorrow.length,10);assert.ok(tomorrow.every(q=>!repaired.some(old=>old.id===q.id)));
 // Newly quarantined items are replaced even when a caller only asks for one.
 await db.query("update official_exam_questions set context_review_required=true where id=$1",[tomorrow[8].id]);
 await get(1);assert.equal((await get()).length,10);assert.ok((await get()).every(q=>q.id!==tomorrow[8].id));
 await db.exec('set role anon');assert.equal((await get()).length,10);
 await assert.rejects(()=>db.query('select * from daily_guest_question_items'));
 console.log('PASS SQL: ten reviewed items; replace archived/context-retained slots; preserve seven IDs and positions; stable calls; shared quota cap; Acre rollover; private history');
}finally{await db.close();}
