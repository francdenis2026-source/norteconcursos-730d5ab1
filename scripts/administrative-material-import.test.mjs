import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { matchesPracticeReview } from '../src/lib/materialPracticeReview.ts';
import { parseQuestion, questionAnswers } from '../src/lib/questionFormat.ts';
import { parseDidacticProvenance } from '../src/lib/didacticQuestion.ts';
const root = new URL('../supabase/imports/administrativo-materiais-2026-10-24/', import.meta.url);
const materials = JSON.parse(readFileSync(new URL('materials-package.json', root)));
const questions = JSON.parse(readFileSync(new URL('questions-package.json', root)));
const rows = materials.rows;
test('all 26 documents route to a single active administrative material without parallel duplicate routes', () => {
 const routes=JSON.parse(readFileSync(new URL('input-routing.json',root)));
 assert.equal(routes.length,26);
 assert.equal(new Set(routes.map(r=>r.document_sha256)).size,26);
 assert.equal(rows.filter(r=>r.kind==='new').length,2);
 assert.equal(rows.filter(r=>r.kind==='update').length,7);
 const slugs=new Set(rows.map(r=>r.material.slug));
 assert.equal(slugs.size,9);
 for(const r of routes) assert.ok(slugs.has(r.material_slug));
 for(const r of rows) {
  assert.equal(r.material.discipline,'Direito Administrativo');
  assert.equal(r.material.content_status,'active');
  assert.ok(!/AlfaCon|Igor Maciel|Strauss e Leite/.test(r.material.body_md));
 }
});
test('all nine exercise batteries pass the real approval validator, with valid existing items retained',()=>{
 for(const r of rows){
  const m=r.material;
  assert.equal(m.quiz.length,20);
  assert.ok(matchesPracticeReview(m.quiz,m.practice_review,m.slug));
  if(r.kind==='update'){
   const retained=m.quiz.filter((q,i)=>['q','a','why'].every(k=>q[k]===r.expected_material.quiz[i][k]));
   assert.ok(retained.length>=17);
   assert.equal(m.practice_review.items.length,20);
   assert.ok(m.practice_review.sources.every(s=>s.sha256&&s.checked_at));
   assert.deepEqual(m.flashcards,r.expected_material.flashcards);
  }
 }
});
test('worked examples remain tied to the final body and preserve previous cases',()=>{
 for(const r of rows){
  assert.equal(r.enrichment.source_body_sha256,createHash('sha256').update(r.material.body_md).digest('hex'));
  const previous=r.expected_active_enrichments.flatMap(e=>e.content.cases);
  assert.deepEqual(r.enrichment.content.cases.slice(0,previous.length),previous);
  assert.equal(r.enrichment.content.cases.length,previous.length+1);
  for(const c of r.enrichment.content.cases){assert.ok(c.steps.length>=2);assert.ok(c.variation.answer);}
 }
});
test('current rules replace the specific outdated assertions identified in the supplied documents',()=>{
 const agent=rows.find(r=>r.material.slug.startsWith('servidores-')).material.body_md;
 assert.match(agent,/ADI 2\.135/);
 assert.match(agent,/qualquer natureza/);
 assert.match(agent,/preservação do regime/);
 const procurement=rows.find(r=>r.material.slug.includes('licitacoes')).material.body_md;
 assert.match(procurement,/30\/12\/2023/);
 assert.match(procurement,/não comprometer a formulação/);
 assert.match(procurement,/procedimentos auxiliares/);
});
test('all extracted candidates are classified, with pending and obsolete items excluded from training',()=>{
 assert.equal(questions.rows.length,159);
 assert.equal(questions.rows.filter(r=>r.question).length,69);
 assert.equal(new Set(questions.rows.map(r=>r.audit.document_sha256+':'+r.audit.item_number)).size,159);
 for(const r of questions.rows){
  if(['needs_review','obsolete'].includes(r.audit.review_status)){
   assert.equal(r.question,null);assert.equal(r.audit.current_answer,null);assert.equal(r.audit.question_id,null);
  }
  if(r.question){
   const q=r.question;
   assert.equal(q.subject,'Direito Administrativo');assert.equal(q.exam_board,'Material didático');assert.equal(q.is_original,false);
   assert.ok(parseDidacticProvenance(q.didactic_provenance));
   assert.equal(q.syllabus_topic_id,materials.syllabus_topic.id);
   assert.ok(questionAnswers({text:q.question_text}).includes(q.official_answer));
   assert.ok(q.explanation.length>100);
   assert.ok(q.legal_basis.every(s=>s.url.startsWith('https://www.planalto.gov.br/')));
   assert.ok(!/^\((CESPE|FCC|FGV)/.test(q.question_text));
   const parsed=parseQuestion(q.question_text);
   if(parsed.options.length) assert.ok(parsed.options.length>=4);
  }
 }
});
