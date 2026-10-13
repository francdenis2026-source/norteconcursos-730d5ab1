import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {validateRepairs,repairContexts} from './repair-question-context.mjs';
const bytes=Buffer.from('reviewed PDF');
const make=()=>({items:[{expected:{id:'q',question_source_id:'s',source_page:5,content_status:'under_review',question_text:'Complete stem (A)a (B)b (C)c (D)d (E)e',official_answer:'D',raw_extraction:'Original',context_review_required:true},patch:{context_review_required:false,review_note:'Visual match',verified_at:'2026-10-13T00:00:00Z'},evidence:{reason:'Complete original statement',visually_verified:true,pdf_sha256:createHash('sha256').update(bytes).digest('hex'),pdf_path:'local.pdf',source_url:'https://cdn.cebraspe.org.br/prova.pdf',page:5}}]});
test('repairs cannot activate, overwrite the original answer or retain a broken stem',()=>{
 for(const key of ['content_status','official_answer','raw_extraction']){const p=make();p.items[0].patch[key]='changed';assert.throws(()=>validateRepairs(p));}
 const p=make();p.items[0].patch.question_text='(A) Missing stem (B)b (C)c (D)d (E)e';assert.throws(()=>validateRepairs(p));
});
test('changed PDF and concurrent edits prevent writes',async()=>{
 let writes=0;const p=make();const req=async(path,method)=>{
  if(method==='PATCH'){writes++;return [];}
  if(path.startsWith('content_sources'))return [{is_official:true,source_type:'prova',url:p.items[0].evidence.source_url}];
  return [{...p.items[0].expected,official_answer:'C'}];
 };
 await assert.rejects(repairContexts(p,req,async()=>Buffer.from('changed')),/PDF changed/);
 await assert.rejects(repairContexts(p,req,async()=>bytes),/Concurrent repair/);
 assert.equal(writes,0);
});
test('an applied repair is preserved on rerun',async()=>{
 const p=make();const req=async(path,method)=>{
  assert.notEqual(method,'PATCH');
  return path.startsWith('content_sources')?[{is_official:true,source_type:'prova',url:p.items[0].evidence.source_url}]:[{...p.items[0].expected,...p.items[0].patch}];
 };
 assert.deepEqual(await repairContexts(p,req,async()=>bytes),{repaired:[],preserved:1});
});
