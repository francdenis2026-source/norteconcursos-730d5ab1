import test from 'node:test';
import assert from 'node:assert/strict';
import {validateReview,publishReview,sameReviewRow,reviewRowFilters} from './publish-question-review.mjs';
test('CAS keeps PostgreSQL figure arrays separate from JSONB arrays and preserves escaping',()=>{
 const expected={id:'q1',figure_urls:[],legal_basis:[],options:{A:'text'},support_text:null};
 const filters=new URLSearchParams(reviewRowFilters('board_exam_questions',expected));
 assert.equal(filters.get('figure_urls'),'eq.{}');
 assert.equal(filters.get('legal_basis'),'eq.[]');
 assert.equal(filters.get('options'),'eq.{"A":"text"}');
 assert.equal(filters.get('support_text'),'is.null');
 const urls=['https://example.test/a,b.png','https://example.test/a"b\\c.png'];
 assert.equal(new URLSearchParams(reviewRowFilters('board_exam_questions',{figure_urls:urls})).get('figure_urls'),'eq.{"https://example.test/a,b.png","https://example.test/a\\"b\\\\c.png"}');
 assert.throws(()=>reviewRowFilters('board_exam_questions',{figure_urls:[{}]}),/figure URL array/);
});
test('a concurrent image update aborts the batch before writing',async()=>{
 const p=make();p.items[0].table='board_exam_questions';p.items[0].expected.figure_urls=[];p.items[0].patch.syllabus_topic_id=p.items[0].patch.current_syllabus_topic_id;delete p.items[0].patch.current_syllabus_topic_id;
 let writes=0;
 await assert.rejects(()=>publishReview(p,async(path,method)=>{
  if(method==='PATCH')writes++;
  return [{...p.items[0].expected,figure_urls:['https://example.test/new.png']}];
 }),/Concurrent revision/);
 assert.equal(writes,0);
});
test('accepts PostgreSQL timestamp formatting without hiding concurrent microsecond changes',()=>{
 assert.equal(sameReviewRow({verified_at:'2026-10-13T00:00:00.258710+00:00'},{verified_at:'2026-10-13T00:00:00.25871Z'}),true);
 assert.equal(sameReviewRow({verified_at:'2026-10-13T00:00:00.258710+00:00'},{verified_at:'2026-10-13T00:00:00.258711+00:00'}),false);
 assert.equal(sameReviewRow({verified_at:'2026-10-13T00:00:00.000000Z',official_answer:'C'},{verified_at:'2026-10-13T00:00:00+00:00',official_answer:'E'}),false);
});
const make=()=>({items:[{table:'official_exam_questions',expected:{id:'q1',content_status:'under_review',official_answer:'E',question_text:'Complete question',context_review_required:false},patch:{content_status:'active',current_syllabus_topic_id:'t1',verified_at:'2026-10-13T00:00:00Z',law_version_checked_at:'2026-10-13T00:00:00Z',legal_basis:[{url:'https://www.planalto.gov.br/law'}]},evidence:{legal:true,reason:'Individually verified',sources:['https://www.planalto.gov.br/law']}}]});
test('active explanation reviews may repair a legal reference without changing identity, status or approval flags',async()=>{
 const p=make();p.purpose='explanation-improvement';const i=p.items[0];
 i.expected.content_status='active';i.expected.syllabus_topic_id='t1';
 i.patch={review_note:'Individual legal explanation with a checked source. '.repeat(6),legal_basis:[{url:'https://www.planalto.gov.br/law'}],law_version_checked_at:'2026-10-13T00:00:00Z'};
 assert.equal(validateReview(p),p);
 const confirmed=structuredClone(p);confirmed.items[0].patch.current_syllabus_topic_id='t1';
 assert.equal(validateReview(confirmed),confirmed);
 const moved=structuredClone(p);moved.items[0].patch.current_syllabus_topic_id='different-topic';
 assert.throws(()=>validateReview(moved),/preserve the existing syllabus topic/);
 const bad=structuredClone(p);bad.items[0].patch.legal_audit_completed=true;
 assert.throws(()=>validateReview(bad),/identity or publication status/);
 const missing=structuredClone(p);missing.items[0].patch.legal_basis=[];
 assert.throws(()=>validateReview(missing),/legal basis/);
 let writes=0;
 const request=async(path,method)=>{
  if(method==='PATCH'){writes++;return [];}
  if(path.startsWith('official_exam_questions'))return [i.expected];
  if(path.startsWith('syllabus_topics'))return [{edition_id:'e1',content_status:'current'}];
  if(path.startsWith('syllabus_editions'))return [{source_id:'s1',status:'active'}];
  if(path.includes('?url='))return [];
  return [{is_official:true,source_type:'edital',status:'vigente'}];
 };
 await assert.rejects(()=>publishReview(p,request),/basis not registered/);
 assert.equal(writes,0);
});
test('forbids changing original answer, incomplete contexts and missing legal sources',()=>{
 const p=make();p.items[0].patch.official_answer='C';assert.throws(()=>validateReview(p));
 const q=make();q.items[0].expected.context_review_required=true;assert.throws(()=>validateReview(q));
 const r=make();r.items[0].patch.legal_basis=[];assert.throws(()=>validateReview(r));
 const s=make();s.items[0].expected.question_text='(A) Stem incorrectly embedded';assert.throws(()=>validateReview(s));
});
test('archived commentary can improve without activating an item or changing its answer or legal-check date',async()=>{
 const p=make();p.purpose='explanation-improvement';const i=p.items[0];
 i.expected.content_status='archived';i.expected.syllabus_topic_id='t1';
 i.expected.law_version_checked_at='2026-10-13T00:00:00Z';
 i.patch={review_note:'Pedagogical commentary; preliminary answer preserved and final key still pending. '.repeat(5),law_version_checked_at:i.expected.law_version_checked_at,legal_basis:[{url:'https://www.planalto.gov.br/law'}]};
 assert.equal(validateReview(p),p);
 for(const field of ['content_status','official_answer','verified_at','legal_review_required']){
  const bad=structuredClone(p);bad.items[0].patch[field]=field==='content_status'?'active':field==='official_answer'?'C':true;assert.throws(()=>validateReview(bad));
 }
 const pending=structuredClone(p);pending.items[0].expected.content_status='under_review';assert.throws(()=>validateReview(pending));
 let row=structuredClone(i.expected),writes=0;
 const request=async(path,method,patch)=>{
  if(method==='PATCH'){writes++;row={...row,...patch};return [row];}
  if(path.startsWith('official_exam_questions'))return [row];
  if(path.startsWith('syllabus_topics'))return [{edition_id:'e1',content_status:'current'}];
  if(path.startsWith('syllabus_editions'))return [{source_id:'s1',status:'active'}];
  return [{is_official:true,source_type:'edital',status:'vigente'}];
 };
 assert.equal((await publishReview(p,request,{dryRun:true})).pending.length,1);assert.equal(writes,0);
 assert.equal((await publishReview(p,request)).updated.length,1);assert.equal(row.content_status,'archived');assert.equal(row.official_answer,'E');assert.equal(row.law_version_checked_at,i.expected.law_version_checked_at);
 assert.equal((await publishReview(p,request)).preserved,1);
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
test('classification changes require review and a matching official topic before writes',async()=>{
 const p=make();p.items[0].patch.subject='Raciocínio Lógico';assert.throws(()=>validateReview(p),/classified subject/);
 p.items[0].evidence.classification_reviewed=true;assert.equal(validateReview(p),p);
 let writes=0;const req=async(path,method)=>{if(method==='PATCH'){writes++;return [];}return path.startsWith('official_exam_questions')?[p.items[0].expected]:path.startsWith('syllabus_topics')?[{edition_id:'e1',content_status:'current',discipline:'Direito Penal'}]:path.startsWith('syllabus_editions')?[{source_id:'s1',status:'active'}]:[{is_official:true,source_type:'edital',status:'vigente'}];};
 await assert.rejects(()=>publishReview(p,req),/subject must match/);assert.equal(writes,0);
});
test('pending-review CLI dry run reads current database and syllabus without writing',async()=>{
 const {mkdtemp,writeFile,readFile,rm}=await import('node:fs/promises');const {tmpdir}=await import('node:os');const {join}=await import('node:path');const {spawnSync}=await import('node:child_process');const {fileURLToPath}=await import('node:url');const dir=await mkdtemp(join(tmpdir(),'question-review-cli-'));
 try{const p=make(),input=join(dir,'pack.json'),report=join(dir,'report.json'),calls=join(dir,'calls.json'),mock=join(dir,'fetch.mjs');await writeFile(input,JSON.stringify(p));await writeFile(mock,`import{writeFileSync}from'node:fs';const calls=[];globalThis.fetch=async(url,options)=>{calls.push({url:String(url),method:options.method});writeFileSync(${JSON.stringify(calls)},JSON.stringify(calls));if(options.method!=='GET')throw Error('Dry run attempted write');const path=new URL(url).pathname;const rows=path.endsWith('/official_exam_questions')?[${JSON.stringify(p.items[0].expected)}]:path.endsWith('/syllabus_topics')?[{edition_id:'e',content_status:'current'}]:path.endsWith('/syllabus_editions')?[{source_id:'s',status:'active'}]:[{id:'s',is_official:true,source_type:'edital',status:'vigente'}];return new Response(JSON.stringify(rows),{status:200});};`);const child=spawnSync(process.execPath,['--import',mock,fileURLToPath(new URL('./publish-question-review.mjs',import.meta.url)),input,report,'--dry-run'],{env:{...process.env,TASK_SUPABASE_KEY:'test-session',TASK_SUPABASE_PROJECT:'gkwphadbveiyjcwiiizw'},encoding:'utf8'});assert.equal(child.status,0,child.stderr);const result=JSON.parse(await readFile(report));assert.deepEqual(result.pending,['q1']);assert.deepEqual(result.updated,[]);const requests=JSON.parse(await readFile(calls));assert.equal(requests.length,5);assert.ok(requests.every(r=>r.method==='GET'));
 }finally{await rm(dir,{recursive:true,force:true});}
});

function restorationPack() {
 const shared={contest_name:'Polícia Civil do Estado do Paraná',exam_year:2026,board:'FGV',item_number:1,stem:'Original shared stem',options:{A:'One',B:'Two'},official_answer:'A',support_text:null,legal_basis:[],law_version_checked_at:null,needs_visual:false,legal_review_required:false};
 const expected={...shared,id:'papilo-1',career_name:'Papiloscopista Policial',content_status:'archived',syllabus_topic_id:'t1',verified_at:'2026-10-16T00:00:00Z'};
 return {purpose:'pcpr-papiloscopista-restoration',items:[{table:'board_exam_questions',expected,patch:{content_status:'active'},evidence:{reason:'Explicitly authorized status restoration with active shared counterpart',legal:false,sources:['https://example.test/paper.pdf'],restore_expected:{...shared,id:'agente-1',career_name:'Agente de Polícia Judiciária',content_status:'active'}}}]};
}
function restorationRequest(pack,{changedCanonical=false,changeBeforeWrite=false}={}) {
 let row=structuredClone(pack.items[0].expected),reads=0,writes=0;
 const request=async(path,method,patch)=>{
  if(method==='PATCH'){writes++;assert.deepEqual(patch,{content_status:'active'});row={...row,...patch};return [row];}
  if(path.startsWith('board_exam_questions')){
   if(path.includes('agente-1')){reads++;return [{...pack.items[0].evidence.restore_expected,...(changedCanonical || (changeBeforeWrite&&reads>1)?{official_answer:'B'}:{})}];}
   return [row];
  }
  if(path.startsWith('syllabus_topics'))return [{edition_id:'e1',content_status:'current'}];
  if(path.startsWith('syllabus_editions'))return [{source_id:'s1',status:'active'}];
  return [{is_official:true,source_type:'edital',status:'vigente'}];
 };
 return {request,writes:()=>writes};
}
test('restoration is restricted to the authorized Papiloscopista items and status only',()=>{
 const pack=restorationPack();assert.equal(validateReview(pack),pack);
 for(const change of [p=>delete p.purpose,p=>p.items[0].expected.career_name='Delegado de Polícia',p=>p.items[0].expected.item_number=51,p=>p.items[0].patch.review_note='overwrite audit',p=>p.items.push({...p.items[0],expected:{...p.items[0].expected,id:'duplicate-item'}})]){
  const bad=structuredClone(pack);change(bad);assert.throws(()=>validateReview(bad));
 }
});
test('restoration dry-run, write and retry preserve text, audit dates and canonical rows',async()=>{
 const pack=restorationPack(),port=restorationRequest(pack);
 const dry=await publishReview(pack,port.request,{dryRun:true});assert.equal(dry.pending.length,1);assert.equal(port.writes(),0);
 const result=await publishReview(pack,port.request);assert.deepEqual(result.updated,['papilo-1']);assert.equal(port.writes(),1);
 const again=await publishReview(pack,port.request);assert.equal(again.preserved,1);assert.equal(port.writes(),1);
});
test('restoration rechecks the shared active item both before batch and before writing',async()=>{
 for(const options of [{changedCanonical:true},{changeBeforeWrite:true}]){
  const pack=restorationPack(),port=restorationRequest(pack,options);
  await assert.rejects(()=>publishReview(pack,port.request),/changed or mismatched/);assert.equal(port.writes(),0);
 }
});

test('restoring a previously verified board status preserves original comments and review dates',async()=>{
 const p=make();p.purpose='restore-reviewed-status';const item=p.items[0];item.table='board_exam_questions';
 item.expected={...item.expected,content_status:'archived',syllabus_topic_id:'t1',verified_at:'2026-10-13T00:00:00Z',law_version_checked_at:'2026-10-13T00:00:00Z',legal_basis:[{url:'https://www.planalto.gov.br/law'}],explanation:'Previously reviewed explanation',needs_visual:false};
 item.patch={content_status:'active'};item.evidence.previous_review_verified=true;
 assert.equal(validateReview(p),p);
 const changed=structuredClone(p);changed.items[0].patch.explanation='Changed';assert.throws(()=>validateReview(changed),/preserve every reviewed field/);
 const noDate=structuredClone(p);delete noDate.items[0].expected.verified_at;assert.throws(()=>validateReview(noDate),/Existing verified review/);
 const noBasis=structuredClone(p);noBasis.items[0].expected.legal_basis=[];assert.throws(()=>validateReview(noBasis),/legal basis/);
 let writes=0;
 const request=async(path,method,patch)=>{
  if(method==='PATCH'){writes++;assert.deepEqual(patch,{content_status:'active'});return [{...item.expected,...patch}];}
  if(path.startsWith('board_exam_questions'))return [item.expected];
  if(path.startsWith('syllabus_topics'))return [{edition_id:'e1',content_status:'current'}];
  if(path.startsWith('syllabus_editions'))return [{source_id:'s1',status:'active'}];
  if(path.includes('?url='))return [{is_official:true,status:'vigente'}];
  return [{is_official:true,source_type:'edital',status:'vigente'}];
 };
 await publishReview(p,request,{dryRun:true});assert.equal(writes,0);await publishReview(p,request);assert.equal(writes,1);
});

test('official commentary uses the existing review_note column; board explanations remain supported',()=>{
 const p=make();p.items[0].patch.explanation='Substantive commentary. '.repeat(15);assert.throws(()=>validateReview(p),/must use review_note/);
 const board=structuredClone(p);board.items[0].table='board_exam_questions';board.items[0].patch.syllabus_topic_id=board.items[0].patch.current_syllabus_topic_id;delete board.items[0].patch.current_syllabus_topic_id;assert.equal(validateReview(board),board);
});

test('board subject correction uses its real syllabus column and still checks topic discipline',async()=>{
 const p=make(),i=p.items[0];i.table='board_exam_questions';i.patch.subject='Direito Constitucional';delete i.patch.current_syllabus_topic_id;i.patch.syllabus_topic_id='t1';i.evidence.classification_reviewed=true;
 assert.equal(validateReview(p),p);
 const bad=structuredClone(p);bad.items[0].patch.current_syllabus_topic_id='t1';assert.throws(()=>validateReview(bad),/must use syllabus_topic_id/);
 let writes=0;const req=async(path,method)=>{if(method==='PATCH'){writes++;return[];}if(path.startsWith('board_exam_questions'))return[i.expected];if(path.startsWith('syllabus_topics'))return[{edition_id:'e',content_status:'current',discipline:'Wrong discipline'}];if(path.startsWith('syllabus_editions'))return[{source_id:'s',status:'active'}];return[{is_official:true,source_type:'edital',status:'vigente'}];};
 await assert.rejects(publishReview(p,req),/match verified topic discipline/);assert.equal(writes,0);
});
