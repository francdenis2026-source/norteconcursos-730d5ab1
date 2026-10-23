/** Execute the read-only report against mixed states and placeholder explanations.
 * node scripts/idecan/test-admin-diagnostic.mjs /path/to/pglite/dist/index.js
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {PGlite}=await import(process.argv[2]?pathToFileURL(process.argv[2]).href:'@electric-sql/pglite');
const db=new PGlite();
try {
 await db.exec(`
 create table board_exam_questions(board text,content_status text,explanation text);
 create table curated_question_catalog(exam_board text,content_status text,explanation text);
 create table official_exam_questions(exam_board text,content_status text,explanation text);
 create table question_corpus_sources(id integer,publisher text,title text,metadata jsonb);
 create table question_corpus_candidates(corpus_id integer,content_status text);
 insert into board_exam_questions values
 ('IDECAN','active',null),
 ('IDECAN','active','Importado do caderno oficial. Exemplo: não deve contar.'),
 ('IDECAN','active','Solução individual. Erro comum: x. Exemplo prático: y.'),
 ('IDECAN','under_review','Solução retida. Exemplo: y.'),
 ('FGV','active','Solução de outra banca. Exemplo: y.');
 insert into curated_question_catalog values ('IDECAN','active','Solução individual sem exemplo.');
 insert into official_exam_questions values ('IDECAN','obsolete','Solução histórica. Exemplo: y.');
 insert into question_corpus_sources values (1,'IDECAN',null,null),(2,'Outra banca',null,null);
 insert into question_corpus_candidates values (1,'reviewed'),(1,'draft'),(2,'reviewed');
 `);
 const sql=readFileSync(new URL('../../supabase/imports/idecan/explicacoes-administracao-2026-10-23/diagnostico-somente-leitura.sql',import.meta.url),'utf8');
 await db.exec('begin read only');
 const {rows}=await db.query(sql);await db.exec('commit');
 const d=rows[0].diagnostico;
 assert.deepEqual(d.resumo_publico,{registros:6,ativas:4,ativas_com_explicacao:2,ativas_sem_explicacao:2,ativas_com_explicacao_e_exemplo_textual:1});
 assert.equal(d.catalogos_publicos.length,3);
 assert.equal(d.acervo_privado_por_estado.reduce((n,r)=>n+r.quantidade,0),2);
 assert.equal((await db.query('select count(*) as n from board_exam_questions')).rows[0].n,5);
 console.log('PASS diagnostic executes in read-only transaction; isolates bank/states, excludes placeholders and keeps private counts separate');
} finally {await db.close();}
