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
test('binary formula repairs require explicit format, complete context and evidenced page',()=>{
 const p=make();const i=p.items[0];i.expected.official_answer='E';
 i.patch.question_text='Comando: X tem densidade f(x). Julgue o item.\nItem: P(X=5)>0.';
 assert.throws(()=>validateRepairs(p));
 i.evidence.question_format='certo_errado';i.patch.source_page=4;i.evidence.page=4;
 assert.equal(validateRepairs(p),p);
 i.patch.source_page=6;assert.throws(()=>validateRepairs(p),/page/);
 i.patch.source_page=4;i.patch.question_text='Item: P(X=5)>0.';assert.throws(()=>validateRepairs(p));
});
test('four-option exams preserve their original format and refuse invented options',()=>{
 const p=make();const i=p.items[0];i.patch.question_text='Complete stem (A)a (B)b (C)c (D)d';
 assert.throws(()=>validateRepairs(p));i.evidence.alternative_labels=['A','B','C','D'];assert.equal(validateRepairs(p),p);
 i.patch.question_text+=' (E)invented';assert.throws(()=>validateRepairs(p));
 i.patch.question_text='Complete stem (A)a (B)b (D)d';assert.throws(()=>validateRepairs(p));
});
test('database dry run validates source and current row without mutation',async()=>{const p=make();let writes=0;const req=async(path,method='GET')=>{if(method!=='GET'){writes++;throw Error('Unexpected write');}return path.startsWith('content_sources')?[{is_official:true,source_type:'prova',url:p.items[0].evidence.source_url}]:[p.items[0].expected];};const result=await repairContexts(p,req,async()=>bytes,{dryRun:true});assert.deepEqual(result.pending,['q']);assert.equal(writes,0);});
const figureUrl='https://gkwphadbveiyjcwiiizw.supabase.co/storage/v1/object/public/question-figures/review/figure.png';
const raster=Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),Buffer.from('reviewed graphic')]);
function withFigure(){const p=make();p.items[0].patch.question_text=`![Gráfico original A a E](${figureUrl})\nEscolha a opção.\n(A) Um\n(B) Dois\n(C) Três\n(D) Quatro\n(E) Cinco`;p.items[0].evidence.figures=[{url:figureUrl,path:'figure.png',sha256:createHash('sha256').update(raster).digest('hex')}];return p;}
test('figure restoration verifies public bytes against the reviewed raster before any write',async()=>{const p=withFigure();let writes=0,reads=0;const req=async(path,method)=>{if(method==='PATCH'){writes++;return[];}return path.startsWith('content_sources')?[{is_official:true,source_type:'prova',url:p.items[0].evidence.source_url}]:[p.items[0].expected]};const readPdf=async path=>path==='figure.png'?raster:bytes;assert.equal((await repairContexts(p,req,readPdf,{dryRun:true,readFigure:async url=>{assert.equal(url,figureUrl);reads++;return raster}})).pending.length,1);assert.equal(reads,1);assert.equal(writes,0);await assert.rejects(repairContexts(p,req,readPdf,{readFigure:async()=>Buffer.from('different public image')}),/Public figure differs/);assert.equal(writes,0);});
test('missing figure evidence, unsafe markers and a changed local raster cannot publish context',async()=>{for(const type of['missing','unsafe','local']){const p=withFigure();let writes=0;const req=async()=>{writes++;throw Error('Database must not be called')};if(type==='missing')p.items[0].evidence.figures=[];if(type==='unsafe')p.items[0].patch.question_text=p.items[0].patch.question_text.replace(figureUrl,'https://external.example/graph.png');await assert.rejects(repairContexts(p,req,async path=>path==='figure.png'?Buffer.from('bad local image'):bytes,{readFigure:async()=>raster}));assert.equal(writes,0)}});
