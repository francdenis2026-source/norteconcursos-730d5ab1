import test from 'node:test';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';
import {validateProvenance,repairProvenance} from './repair-question-provenance.mjs';
const bytes=Buffer.from('visually reviewed PDF'),sha256=createHash('sha256').update(bytes).digest('hex');
const make=()=>({items:[{expected:{id:'q',question_source_id:'old',answer_key_source_id:'old-gab',source_page:1,item_number:21,career_name:'Técnico',official_answer:'B',content_status:'under_review',raw_extraction:'original'},patch:{question_source_id:'new',answer_key_source_id:'new-gab',review_note:'Specific caderno and key checked',verified_at:'2026-10-14T00:00:00Z'},evidence:{reason:'Wrong axis repaired',visually_verified:true,item_number:21,official_answer:'B',page:1,prova:{path:'prova.pdf',url:'https://cdn.cebraspe.org.br/prova.pdf',sha256},gabarito:{path:'gab.pdf',url:'https://cdn.cebraspe.org.br/gab.pdf',sha256}}}]});
const sources=path=>[{source_type:'outro',is_official:true,status:'vigente',title:path.includes('new-gab')?'Gabarito oficial definitivo':'Prova objetiva',url:path.includes('new-gab')?'https://cdn.cebraspe.org.br/gab.pdf':'https://cdn.cebraspe.org.br/prova.pdf'}];
test('provenance repair cannot change answer, raw content or publication state',()=>{
 for(const field of ['official_answer','raw_extraction','question_text','content_status']){const p=make();p.items[0].patch[field]='changed';assert.throws(()=>validateProvenance(p));}
 const p=make();p.items[0].evidence.official_answer='A';assert.throws(()=>validateProvenance(p));
});
test('concurrent rows, wrong PDFs and wrong source links prevent mutations',async()=>{
 const p=make();let writes=0;const req=async(path,method)=>{if(method==='PATCH'){writes++;return [];}return path.startsWith('content_sources')?sources(path):[{...p.items[0].expected,review_note:'new reviewer'}];};
 await assert.rejects(repairProvenance(p,req,async()=>bytes),/Concurrent/);
 await assert.rejects(repairProvenance(p,req,async()=>Buffer.from('other')),/PDF changed/);
 await assert.rejects(repairProvenance(p,async()=>[{...sources('')[0],url:'https://wrong.test'}],async()=>bytes),/source mismatch/);assert.equal(writes,0);
});
test('already repaired records are preserved and duplicates stop the batch',async()=>{
 const p=make();const req=async(path,method)=>{assert.notEqual(method,'PATCH');return path.startsWith('content_sources')?sources(path):[{...p.items[0].expected,...p.items[0].patch}];};
 assert.deepEqual(await repairProvenance(p,req,async()=>bytes),{updated:[],preserved:1});
 await assert.rejects(repairProvenance(p,async(path,method)=>{assert.notEqual(method,'PATCH');return path.startsWith('content_sources')?sources(path):path.includes('select=id')?[{id:'canonical'}]:[p.items[0].expected];},async()=>bytes),/Canonical/);
});
