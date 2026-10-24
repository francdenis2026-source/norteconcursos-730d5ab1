import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {authoredMaterialPractice,materialTopic} from '../src/lib/materialPractice.ts';
import {matchesPracticeReview} from '../src/lib/materialPracticeReview.ts';
const dir=new URL('../supabase/imports/constitucional-continuacao-2026-10-24/',import.meta.url);
const load=n=>JSON.parse(fs.readFileSync(new URL(n,dir),'utf8'));
const p=load('package.json');
test('all 34 uploaded documents are routed once; existing subjects are complemented',()=>{
 const routes=load('input-routing.json');
 assert.equal(routes.length,34);assert.equal(new Set(routes.map(r=>r.file)).size,34);
 assert.equal(routes.reduce((n,r)=>n+r.pages,0),197);
 assert.equal(p.rows.filter(r=>r.kind==='new').length,12);
 assert.deepEqual(p.rows.filter(r=>r.kind==='update').map(r=>r.material.slug).sort(),[
 'constitucional-direitos-politicos-elegibilidade','constitucional-nacionalidade-medidas-retirada','constitucional-principios-fundamentais-federacao-republica']);
 assert.ok(routes.every(r=>r.reuse==='themes_only_independent_wording'));
});
test('all fifteen final practice snapshots unlock exactly twenty exercises in their own scope',()=>{
 for(const r of p.rows){
  const m=r.material;
  assert.ok(matchesPracticeReview(m.quiz,m.practice_review,m.slug),m.slug);
  const scope={subject:m.discipline,topic:materialTopic(m.discipline,m.topic_label)};
  assert.equal(authoredMaterialPractice(m.quiz,scope,m.slug,m.topic_label,m.practice_review).length,20,m.slug);
  const changed=structuredClone(m.quiz);changed[0].a=!changed[0].a;
  assert.equal(authoredMaterialPractice(changed,scope,m.slug,m.topic_label,m.practice_review).length,0);
 }
});
test('new worked-case versions bind the exact published text and retain all prior cases',()=>{
 for(const r of p.rows){
  assert.equal(createHash('sha256').update(r.material.body_md).digest('hex'),r.enrichment.source_body_sha256);
  const cases=r.enrichment.content.cases;
  assert.equal(cases.length,new Set(cases.map(c=>c.id)).size);
  assert.ok(cases.every(c=>c.scenario && c.question && c.steps.length>=2 && c.conclusion && c.pitfall && c.variation.answer && c.variation.scenario && c.articles.length));
  if(r.kind==='new') assert.equal(cases.length,2);
  else {
   const prior=r.expected_active_enrichments.toSorted((a,b)=>b.checked_at.localeCompare(a.checked_at))[0];
   assert.deepEqual(cases.slice(0,prior.content.cases.length),prior.content.cases);
   assert.equal(cases.length,prior.content.cases.length+2);
  }
 }
});
test('the three existing modules preserve question count and retain the unchanged exercises',()=>{
 for(const r of p.rows.filter(r=>r.kind==='update')){
  if(r.material.slug.includes('principios')){
   assert.deepEqual(r.material.quiz.slice(0,12),r.expected_material.quiz.slice(0,12));
   assert.equal(r.material.quiz.length,20);
  }else if(r.material.slug.includes('nacionalidade')){
   for(let i=0;i<20;i++) if(![0,2,15].includes(i)) assert.deepEqual(r.material.quiz[i],r.expected_material.quiz[i]);
   assert.equal(r.material.quiz.length,20);
  }else assert.deepEqual(r.material.quiz,r.expected_material.quiz);
 }
});
test('publication is transactional, concurrency guarded and never inserts a duplicate public-catalog row',()=>{
 const sql=fs.readFileSync(new URL('01-publish-constitutional-continuation.sql',dir),'utf8');
 assert.ok(sql.includes('pg_advisory_xact_lock') && sql.includes('for update') && sql.includes('expected_material,updated_at'));
 assert.ok(!/insert\s+into\s+(?:public\.)?(?:question_bank|curated_question_catalog|official_exam_questions|board_exam_questions)/i.test(sql));
 assert.ok(sql.trim().endsWith('commit;'));
 assert.equal(p.global_catalog_insertions,0);
 for(const r of p.rows.filter(r=>r.kind==='new')) assert.ok(!/AlfaCon|Lei do Direito Autoral nº 9.610|Referências Bibliográficas/.test(r.material.body_md));
});
