import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {validateRestoration,restoreContexts} from './restore-active-question-context.mjs';
const bytes=Buffer.from('official reviewed PDF');
const make=()=>{const expected={id:'q',content_status:'active',context_review_required:false,official_answer:'C',question_text:'The original item.',question_source_id:'legacy',syllabus_topic_id:'topic',current_syllabus_topic_id:null};const context='A verified shared case with all the facts necessary to decide the original question. '.repeat(3);return {purpose:'active-missing-context',items:[{table:'official_exam_questions',expected,patch:{question_text:`Comando: ${context}\nItem: ${expected.question_text}`,source_page:6,current_syllabus_topic_id:'topic',review_note:'Individual explanation with a concrete contrasting example and an answered exercise. '.repeat(4),legal_basis:[{url:'https://www.planalto.gov.br/law.htm'}],law_version_checked_at:'2026-10-16T00:00:00Z'},evidence:{legal:true,reason:'Recovered shared case, unchanged item and answer.',sources:['https://www.planalto.gov.br/law.htm'],visually_verified:true,context,context_pages:[6],pdf_path:'paper.pdf',pdf_sha256:createHash('sha256').update(bytes).digest('hex'),pdf_source_id:'pdf',pdf_url:'https://cdn.cebraspe.org.br/concursos/exam/arquivos/paper.pdf',contest_identifier:'exam'}}]};};
const fixture=(pack,{invalidBasis=false,concurrent=false,wrongContest=false}={})=>{let writes=0,row=structuredClone(pack.items[0].expected);return {get writes(){return writes;},request:async(path,method='GET',patch)=>{
 if(method==='PATCH'){writes++;row={...row,...patch};return [row];}
 if(path.startsWith('official_exam_questions'))return [{...row,...(concurrent?{review_note:'other account'}:{})}];
 if(path.startsWith('syllabus_topics'))return [{content_status:'current',edition_id:'edition'}];
 if(path.startsWith('syllabus_editions'))return [{status:'active',source_id:'edital'}];
 if(path.includes('id=eq.legacy'))return [{is_official:true,status:'vigente',source_type:'outro',title:'Prova objetiva original',url:'http://www.cebraspe.org.br/concursos/'+(wrongContest?'different':'exam')+'?doc=prova'}];
 if(path.includes('id=eq.pdf'))return [{is_official:true,status:'vigente',source_type:'outro',title:'Prova objetiva PDF',url:pack.items[0].evidence.pdf_url}];
 if(path.includes('id=eq.edital'))return [{is_official:true,status:'vigente',source_type:'edital'}];
 if(path.includes('url=eq.'))return invalidBasis?[]:[{is_official:true,status:'vigente'}];
 throw Error('Unexpected '+path);
 }};};
test('restoration preserves exact original item, answer, status, source and approval flags',()=>{
 const p=make();assert.equal(validateRestoration(p),p);
 for(const [k,v]of Object.entries({official_answer:'E',content_status:'active',question_source_id:'other',legal_audit_completed:true})){const x=make();x.items[0].patch[k]=v;assert.throws(()=>validateRestoration(x));}
 const x=make();x.items[0].patch.question_text+=' changed';assert.throws(()=>validateRestoration(x),/verbatim/);
});
test('wrong contest, changed PDF and concurrent rows prevent any write',async()=>{
 for(const options of [{wrongContest:true},{concurrent:true}]){const p=make(),f=fixture(p,options);await assert.rejects(restoreContexts(p,f.request,async()=>bytes));assert.equal(f.writes,0);}
 const p=make(),f=fixture(p);await assert.rejects(restoreContexts(p,f.request,async()=>Buffer.from('changed')),/PDF changed/);assert.equal(f.writes,0);
});
test('restoration requires full legal preflight and refuses unregistered basis',async()=>{
 const p=make(),f=fixture(p,{invalidBasis:true});await assert.rejects(restoreContexts(p,f.request,async()=>bytes),/not registered/);assert.equal(f.writes,0);
});
test('dry run performs legal/source validation, applied restoration is idempotent',async()=>{
 const p=make(),f=fixture(p);assert.deepEqual((await restoreContexts(p,f.request,async()=>bytes,{dryRun:true})).pending,['q']);assert.equal(f.writes,0);
 assert.deepEqual(await restoreContexts(p,f.request,async()=>bytes),{updated:['q'],preserved:0});assert.equal(f.writes,1);
 assert.deepEqual(await restoreContexts(p,f.request,async()=>bytes),{updated:[],preserved:1});assert.equal(f.writes,1);
});
test('flagged/pending questions, different tables and unverified context use no active restoration',()=>{
 for(const change of [i=>i.expected.content_status='under_review',i=>i.expected.context_review_required=true,i=>i.table='board_exam_questions',i=>i.evidence.visually_verified=false,i=>i.evidence.context_pages=[]]){const p=make();change(p.items[0]);assert.throws(()=>validateRestoration(p));}
});
test('every original field participates in compare-and-set; concurrent write fails readback',async()=>{
 const p=make(),f=fixture(p);let compared=false;
 const request=async(path,method,patch)=>{if(method==='PATCH'){compared=true;for(const key of Object.keys(p.items[0].expected))assert.ok(path.includes(key+'='));return [];}return f.request(path,method,patch);};
 await assert.rejects(restoreContexts(p,request,async()=>bytes),/readback mismatch/);assert.equal(compared,true);
});
test('an invalid legal basis in the last item prevents writes to earlier valid items',async()=>{
 const p=make(),second=structuredClone(p.items[0]);second.expected.id='q2';second.patch.legal_basis=[{url:'https://www.planalto.gov.br/unregistered.htm'}];p.items.push(second);
 const f=fixture(p);let writes=0;const request=async(path,method='GET',patch)=>{
  if(method==='PATCH'){writes++;throw Error('No writes expected');}
  if(path.startsWith('official_exam_questions?id=eq.q2&'))return [second.expected];
  if(path.includes('unregistered.htm'))return [];
  return f.request(path,method,patch);
 };
 await assert.rejects(restoreContexts(p,request,async()=>bytes),/not registered/);assert.equal(writes,0);
});
