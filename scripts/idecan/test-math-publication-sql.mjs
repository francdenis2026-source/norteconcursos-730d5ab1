// Local PostgreSQL only. Usage: node SCRIPT PGLITE_MODULE PRIVATE_SNAPSHOT_DIRECTORY
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {batch,buildMathSQL} from './build-math-publication-sql.mjs';
const {PGlite}=await import(pathToFileURL(process.argv[2]).href);
const db=new PGlite();
const snapshots=Object.fromEntries(['board_exam_questions','syllabus_topics','syllabus_editions','content_sources'].map(t=>[t,JSON.parse(fs.readFileSync(path.join(process.argv[3],t+'.json')))]));
const sql=fs.readFileSync('supabase/imports/idecan/revisao-integral/aplicar-explicacoes-matematica.sql','utf8');
try{
 assert.equal(await buildMathSQL(db,snapshots),sql);
 await db.exec(`create schema auth; create function auth.uid() returns uuid language sql as $$select null::uuid$$;
 create function public.has_role(uuid,text) returns boolean language sql as $$select false$$;
 create role authenticated; create role anon;`);
 const quote=s=>'"'+s.replaceAll('"','""')+'"';
 for(const [table,rows] of Object.entries(snapshots)){
  const cols=Object.keys(rows[0]);
  const type=k=>['id','syllabus_topic_id','edition_id','source_id'].includes(k)?'uuid':['options','legal_basis'].includes(k)?'jsonb':k==='figure_urls'?'text[]':typeof rows.find(r=>r[k]!=null)?.[k]==='boolean'?'boolean':typeof rows.find(r=>r[k]!=null)?.[k]==='number'?'integer':['created_at','verified_at','law_version_checked_at','checked_at'].includes(k)?'timestamptz':'text';
  await db.exec(`create table public.${table}(${cols.map(k=>`${quote(k)} ${type(k)}`).join(',')},primary key(id));`);
  await db.query(`insert into public.${table} select * from jsonb_populate_recordset(null::public.${table},$1::jsonb)`,[JSON.stringify(rows)]);
 }
 const guard=fs.readFileSync('supabase/migrations/20261021100000_question_import_duplicate_guard.sql','utf8');
 await db.exec(guard.slice(guard.indexOf('create or replace function'),guard.indexOf('-- NOT VALID')));
 await db.exec('create trigger test_import_guard before update on public.board_exam_questions for each row execute function public.guard_question_import_duplicate()');
 const data=JSON.parse(fs.readFileSync('supabase/imports/idecan/revisao-integral/pareceres-matematica.json')).items;
 const last=data.at(-1).id;
 // A conflict late in the batch must roll back every earlier explanation and audit entry.
 await db.query("update board_exam_questions set explanation='Outra revisão' where id=$1",[last]);
 await assert.rejects(db.exec(sql),/modificada desde/);await db.exec('rollback');
 assert.equal((await db.query("select count(*)::int n from board_exam_questions where explanation is not null")).rows[0].n,snapshots.board_exam_questions.filter(q=>q.explanation!=null).length+1);
 assert.equal((await db.query("select to_regclass('public.idecan_pedagogical_review_audit') t")).rows[0].t,null);
 await db.query('update board_exam_questions set explanation=null where id=$1',[last]);
 // Restore expected fixture import guards after the trigger fired in conflict setup.
 const baseline=snapshots.board_exam_questions.find(q=>q.id===last);
 await db.exec('alter table board_exam_questions disable trigger test_import_guard');
 await db.query('update board_exam_questions set import_content_key=$1,import_unique_key=$2 where id=$3',[baseline.import_content_key,baseline.import_unique_key,last]);
 await db.exec('alter table board_exam_questions enable trigger test_import_guard');
 const untouched=(await db.query('select to_jsonb(q) r from board_exam_questions q where not (id=any($1::uuid[])) order by id',[data.map(x=>x.id)])).rows;
 await db.exec(sql);
 const states=(await db.query('select after_data->>\'content_status\' status,count(*)::int n from idecan_pedagogical_review_audit where batch_key=$1 group by 1 order by 1',[batch])).rows;
 assert.deepEqual(states,[{status:'active',n:37},{status:'under_review',n:1}]);
 assert.deepEqual((await db.query('select to_jsonb(q) r from board_exam_questions q where not (id=any($1::uuid[])) order by id',[data.map(x=>x.id)])).rows,untouched);
 for(const item of data){const row=(await db.query('select * from board_exam_questions where id=$1',[item.id])).rows[0];assert.equal(row.explanation,item.explanation);assert.equal(row.official_answer,item.official_answer);assert.equal(row.content_status,item.new_content_status);}
 await db.exec(sql);
 assert.equal((await db.query('select count(*)::int n from idecan_pedagogical_review_audit')).rows[0].n,38);
 await db.query("update board_exam_questions set explanation=explanation||' Outra revisão' where id=$1",[last]);
 await assert.rejects(db.exec(sql),/alterada após o lote/);await db.exec('rollback');
 await db.exec('set role anon');await assert.rejects(db.exec(sql),/administrador postgres/);await db.exec('rollback; reset role');
 console.log('PostgreSQL: 37 explicações ativas, 1 retenção, 235 registros preservados, auditoria, concorrência, idempotência, gabaritos preservados e acesso anon bloqueado.');
}finally{await db.close();}
