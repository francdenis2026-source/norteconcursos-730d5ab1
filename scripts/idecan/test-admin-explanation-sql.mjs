import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {PGlite}=await import(process.argv[2]?pathToFileURL(process.argv[2]).href:'@electric-sql/pglite');
const dir=new URL('../../supabase/imports/idecan/explicacoes-administracao-2026-10-23/',import.meta.url);
const pack=JSON.parse(readFileSync(new URL('explicacoes.json',dir),'utf8'));
const sql=readFileSync(new URL('aplicar-cinco-explicacoes.sql',dir),'utf8');
async function fixture(){
 const db=new PGlite();
 await db.exec(`create role anon;create role authenticated;
 create table board_exam_questions(id uuid primary key,board text,contest_name text,career_name text,exam_year integer,exam_type text,item_number integer,subject text,stem text,options jsonb,official_answer text,needs_visual boolean default false,legal_review_required boolean default false,legal_basis jsonb default '[]',explanation text,content_status text,syllabus_topic_id uuid,verified_at timestamptz default now());`);
 for(const x of pack.items){
 const row={id:`00000000-0000-4000-8000-0000000000${x.identity.item_number}`, ...x.identity, subject:x.subject,stem:x.original_stem,options:x.original_options,official_answer:x.historical_answer,content_status:x.identity.item_number===64?'active':'under_review'};
 await db.query(`insert into board_exam_questions(id,board,contest_name,career_name,exam_year,exam_type,item_number,subject,stem,options,official_answer,content_status)
 select id,board,contest_name,career_name,exam_year,exam_type,item_number,subject,stem,options,official_answer,content_status from jsonb_populate_record(null::board_exam_questions,$1::jsonb)`,[JSON.stringify(row)]);
 }
 return db;
}
let db=await fixture();
try{
 const before=(await db.query('select to_jsonb(q) as row from board_exam_questions q order by item_number')).rows;
 await db.exec(sql);
 const after=(await db.query('select to_jsonb(q) as row from board_exam_questions q order by item_number')).rows;
 for(let i=0;i<5;i++){
 const {explanation,...untouched}=after[i].row;const {explanation:old,...original}=before[i].row;
 assert.deepEqual(untouched,original);assert.equal(explanation,pack.items[i].explanation);
 }
 assert.equal((await db.query('select count(*)::int as n from idecan_admin_explanation_audit')).rows[0].n,5);
 await db.exec(sql);assert.equal((await db.query('select count(*)::int as n from idecan_admin_explanation_audit')).rows[0].n,5);
 console.log('PASS five explanations, exact preservation of all other fields and idempotent audit');
}finally{await db.close();}
for(const [label,mutation] of [
 ['existing explanation',"update board_exam_questions set explanation='Revisão de outro autor' where item_number=68"],
 ['changed stem',"update board_exam_questions set stem=stem||' alterado' where item_number=68"],
 ['changed answer',"update board_exam_questions set official_answer='A' where item_number=68"],
 ['blocked status',"update board_exam_questions set content_status='obsolete' where item_number=68"],
 ['legal review required',"update board_exam_questions set legal_review_required=true where item_number=68"]]){
 db=await fixture();try{
 await db.exec(mutation);await assert.rejects(db.exec(sql));await db.exec('rollback');
 assert.equal((await db.query('select count(*)::int as n from board_exam_questions where item_number<68 and explanation is not null')).rows[0].n,0);
 assert.equal((await db.query("select to_regclass('public.idecan_admin_explanation_audit') as t")).rows[0].t,null);
 console.log('PASS whole-batch rollback for',label);
 }finally{await db.close();}
}
