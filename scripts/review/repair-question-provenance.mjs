import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {sameReviewRow} from './publish-question-review.mjs';
import {sessionAuthHeaders} from '../supabase-session-auth.mjs';

export function validateProvenance(pack){
 if(!Array.isArray(pack.items)||!pack.items.length)throw Error('Empty provenance repairs');
 const seen=new Set();
 for(const {expected,patch,evidence} of pack.items){
  if(!expected?.id||seen.has(expected.id))throw Error('Distinct original rows required');seen.add(expected.id);
  if(Object.keys(patch).some(k=>!['question_source_id','answer_key_source_id','source_page','review_note','verified_at'].includes(k)))throw Error('Provenance repair cannot alter content, answer or status');
  if(!patch.question_source_id||!patch.answer_key_source_id||!patch.review_note||!Number.isFinite(Date.parse(patch.verified_at)))throw Error('Complete provenance decision required');
  if(!evidence?.visually_verified||!evidence.reason||evidence.item_number!==expected.item_number||evidence.official_answer!==expected.official_answer||evidence.page!==(patch.source_page??expected.source_page)||!Number.isInteger(evidence.page)||evidence.page<1)throw Error('Item, answer and page must match visual evidence');
  for(const kind of ['prova','gabarito']){
   const e=evidence[kind];if(!e?.path||!/^[a-f0-9]{64}$/.test(e.sha256||'')||new URL(e.url).protocol!=='https:')throw Error('Official PDF evidence required');
  }
 }
 return pack;
}

export async function repairProvenance(pack,request,readPdf=readFile,{dryRun=false}={}){
 validateProvenance(pack);const pending=[];
 for(const item of pack.items){
  const {expected,patch,evidence}=item;
  for(const [kind,id] of [['prova',patch.question_source_id],['gabarito',patch.answer_key_source_id]]){
   const e=evidence[kind],bytes=await readPdf(e.path);if(createHash('sha256').update(bytes).digest('hex')!==e.sha256)throw Error('Reviewed PDF changed');
   const [source]=await request(`content_sources?id=eq.${id}&select=*`);
   const title=kind==='prova'?/^Prova objetiva/i:/^Gabarito.*definitivo/i;
   if(!source?.is_official||source.source_type!=='outro'||source.status!=='vigente'||source.url!==e.url||!title.test(source.title||''))throw Error('Official specific source mismatch');
  }
  const [actual]=await request(`official_exam_questions?id=eq.${expected.id}&select=*`);
  if(sameReviewRow(actual,{...expected,...patch}))continue;
  if(!sameReviewRow(actual,expected))throw Error('Concurrent provenance revision');
  const candidates=await request(`official_exam_questions?question_source_id=eq.${patch.question_source_id}&item_number=eq.${expected.item_number}&career_name=eq.${encodeURIComponent(expected.career_name)}&select=id`);
  if(candidates.some(q=>q.id!==expected.id))throw Error('Canonical question already exists');
  pending.push(item);
 }
 const result={updated:[],preserved:pack.items.length-pending.length};
 if(dryRun)return {...result,dry_run:true,pending:pending.map(i=>i.expected.id)};
 for(const {expected,patch} of pending){
  const filters=Object.entries(expected).map(([k,v])=>v===null?`${k}=is.null`:`${k}=eq.${encodeURIComponent(typeof v==='object'?JSON.stringify(v):String(v))}`).join('&');
  const rows=await request('official_exam_questions?'+filters,'PATCH',patch);
  const [actual]=await request(`official_exam_questions?id=eq.${expected.id}&select=*`);
  if(rows.length!==1||!sameReviewRow(actual,{...expected,...patch}))throw Error('Provenance readback mismatch');result.updated.push(expected.id);
 }
 return result;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const [input,report,mode]=process.argv.slice(2);if(!input||!report||(mode&&mode!=='--dry-run'))throw Error('Usage: PROVENANCE_PACK REPORT [--dry-run]');
 const pack=validateProvenance(JSON.parse(await readFile(input,'utf8')));let result={dry_run:true,reviewed:pack.items.length};
 if(mode!=='--dry-run'){
  const key=process.env.TASK_SUPABASE_KEY,project=process.env.TASK_SUPABASE_PROJECT;if(!key||project!=='gkwphadbveiyjcwiiizw')throw Error('Session credentials required');
  const request=async(path,method='GET',body)=>{const r=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error('Database HTTP '+r.status);return r.json();};
  result={dry_run:false,...await repairProvenance(pack,request)};
 }
 await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}
