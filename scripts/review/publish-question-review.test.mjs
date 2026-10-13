import test from 'node:test';
import assert from 'node:assert/strict';
import {validateReview,publishReview,sameReviewRow} from './publish-question-review.mjs';
test('accepts PostgreSQL timestamp formatting without hiding concurrent microsecond changes',()=>{
 assert.equal(sameReviewRow({verified_at:'2026-10-13T00:00:00.258710+00:00'},{verified_at:'2026-10-13T00:00:00.25871Z'}),true);
 assert.equal(sameReviewRow({verified_at:'2026-10-13T00:00:00.258710+00:00'},{verified_at:'2026-10-13T00:00:00.258711+00:00'}),false);
 assert.equal(sameReviewRow({verified_at:'2026-10-13T00:00:00.000000Z',official_answer:'C'},{verified_at:'2026-10-13T00:00:00+00:00',official_answer:'E'}),false);
});
const make=()=>({items:[{table:'official_exam_questions',expected:{id:'q1',content_status:'under_review',official_answer:'E',question_text:'Complete question',context_review_required:false},patch:{content_status:'active',current_syllabus_topic_id:'t1',verified_at:'2026-10-13T00:00:00Z',law_version_checked_at:'2026-10-13T00:00:00Z',legal_basis:[{url:'https://www.planalto.gov.br/law'}]},evidence:{legal:true,reason:'Individually verified',sources:['https://www.planalto.gov.br/law']}}]});
test('forbids changing original answer, incomplete contexts and missing legal sources',()=>{
 const p=make();p.items[0].patch.official_answer='C';assert.throws(()=>validateReview(p));
 const q=make();q.items[0].expected.context_review_required=true;assert.throws(()=>validateReview(q));
 const r=make();r.items[0].patch.legal_basis=[];assert.throws(()=>validateReview(r));
 const s=make();s.items[0].expected.question_text='(A) Stem incorrectly embedded';assert.throws(()=>validateReview(s));
});
test('checks all prior rows before any write',async()=>{
 const p=make();p.items.push({...p.items[0],expected:{...p.items[0].expected,id:'q2'}});
 let writes=0;
 const req=async(path,method)=>{
  if(method==='PATCH'){writes++;return [];}
  if(path.startsWith('official_exam_questions'))return path.includes('q2')?[{...p.items[1].expected,official_answer:'C'}]:[p.items[0].expected];
  if(path.startsWith('syllabus_topics'))return [{edition_id:'e1',content_status:'current'}];
  if(path.startsWith('syllabus_editions'))return [{source_id:'s1',status:'active'}];
  return [{is_official:true,source_type:'edital',status:'vigente'}];
 };
 await assert.rejects(()=>publishReview(p,req),/Concurrent revision/);assert.equal(writes,0);
});
test('reruns preserve the applied review',async()=>{
 const p=make();const desired={...p.items[0].expected,...p.items[0].patch};
 const r=await publishReview(p,async()=>[desired]);assert.equal(r.preserved,1);assert.deepEqual(r.updated,[]);
});
test('refuses a syllabus whose source is a caderno instead of an edital',async()=>{
 const p=make();const req=async path=>path.startsWith('official_exam_questions')?[p.items[0].expected]:path.startsWith('syllabus_topics')?[{edition_id:'e1',content_status:'current'}]:path.startsWith('syllabus_editions')?[{source_id:'s1',status:'active'}]:[{is_official:true,source_type:'outro',status:'vigente'}];
 await assert.rejects(()=>publishReview(p,req),/official active syllabus/);
});
test('duplicate archiving requires matching source, item, answer and syllabus',async()=>{
 const p=make();p.items[0].expected.career_name='Polícia Civil do Acre';
 p.items[0].patch.content_status='archived';p.items[0].evidence.duplicate_of='canonical';p.items[0].evidence.career_alias_verified=true;
 let writes=0;
 const canonical={...p.items[0].expected,id:'canonical',career_name:'Agente de Polícia Civil',official_answer:'C'};
 const req=async(path,method)=>{if(method==='PATCH'){writes++;return [];}return path.includes('canonical')?[canonical]:[p.items[0].expected];};
 await assert.rejects(()=>publishReview(p,req),/Duplicate identity mismatch/);assert.equal(writes,0);
});
