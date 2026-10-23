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

const fix=readFileSync(new URL('corrigir-anotacao-nao-juridica.sql',dir),'utf8');
const ids=['e68a5855-328a-4c42-8921-b0795d49c9e0','c7150109-0ab2-48bb-82ef-999b5d7ce52a','1486cc61-6e76-4f54-b0db-516c437275f5','61235d9c-6458-4b3a-a543-1121f367ac5d','d5ccfd98-dd53-4838-b1f9-fb8772aa3f8b'];
const marker=[{title:'Questão de teoria da Administração; sem legislação diretamente aplicável'}];
async function prepared(){
 const db=await fixture();
 for(let i=0;i<5;i++)await db.query('update board_exam_questions set id=$1,content_status=$2,legal_basis=$3 where item_number=$4',[ids[i],'active',JSON.stringify(marker),64+i]);
 return db;
}
let db=await prepared();
try{
 const before=(await db.query('select to_jsonb(q) as row from board_exam_questions q order by item_number')).rows;
 await assert.rejects(db.exec(sql));await db.exec('rollback');
 await db.exec(fix);await db.exec(fix);
 const after=(await db.query('select to_jsonb(q) as row from board_exam_questions q order by item_number')).rows;
 for(let i=0;i<5;i++){
  const {legal_basis,...unchanged}=after[i].row;const {legal_basis:old,...original}=before[i].row;
  assert.deepEqual(unchanged,original);assert.deepEqual(legal_basis,[]);
 }
 await db.exec(sql);await db.exec(fix);await db.exec(sql);
 assert.equal((await db.query('select count(*)::int as n from idecan_admin_metadata_audit')).rows[0].n,5);
 assert.equal((await db.query('select count(*)::int as n from idecan_admin_explanation_audit')).rows[0].n,5);
 assert.equal((await db.query("select count(*)::int as n from board_exam_questions where explanation is not null and content_status='active'")).rows[0].n,5);
 console.log('PASS exact real-world marker failure reproduced; audited normalization then original SQL applies all five; both idempotent');
}finally{await db.close();}
for(const [label,mutation] of [
 ['real legal reference',`update board_exam_questions set legal_basis='[{"title":"Lei","url":"https://www.planalto.gov.br/"}]' where item_number=68`],
 ['additional marker field',`update board_exam_questions set legal_basis='[{"title":"Questão de teoria da Administração; sem legislação diretamente aplicável","url":"https://www.planalto.gov.br/"}]' where item_number=68`],
 ['changed status',"update board_exam_questions set content_status='under_review' where item_number=68"],
 ['new explanation',"update board_exam_questions set explanation='Revisão existente' where item_number=68"]]){
 db=await prepared();try{
 await db.exec(mutation);await assert.rejects(db.exec(fix));await db.exec('rollback');
 const {rows}=await db.query('select legal_basis from board_exam_questions where item_number<68');
 assert(rows.every(x=>JSON.stringify(x.legal_basis)===JSON.stringify(marker)));
 console.log('PASS normalization whole-batch rollback:',label);
 }finally{await db.close();}
}
