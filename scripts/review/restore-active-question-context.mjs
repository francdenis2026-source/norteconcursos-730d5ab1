import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {publishReview,validateReview,sameReviewRow,reviewRowFilters} from './publish-question-review.mjs';
import {sessionAuthHeaders} from '../supabase-session-auth.mjs';

const contextFields=new Set(['question_text','source_page']);
const legalPack=items=>({purpose:'explanation-improvement',items:items.map(i=>({...i,patch:Object.fromEntries(Object.entries(i.patch).filter(([k])=>!contextFields.has(k)))}))});
export function validateRestoration(pack) {
  if(pack.purpose!=='active-missing-context' || !pack.items?.length)throw Error('Explicit missing-context restoration required');
  for(const {table,expected,patch,evidence} of pack.items){
    // This workflow handles legacy active stems whose missing context was not
    // flagged. Flagged/pending questions retain the separate repair workflow.
    if(table!=='official_exam_questions' || expected.content_status!=='active' || expected.context_review_required!==false)throw Error('Unflagged active original required');
    if(!['C','E'].includes(expected.official_answer) || expected.question_text.startsWith('Comando:'))throw Error('Original isolated binary item required');
    if(!evidence.visually_verified || typeof evidence.context!=='string' || evidence.context.length<100 || !/^[a-f0-9]{64}$/.test(evidence.pdf_sha256||'') || !evidence.pdf_path || !evidence.pdf_source_id)throw Error('Visual context and PDF evidence required');
    if(!Array.isArray(evidence.context_pages) || !evidence.context_pages.length || evidence.context_pages.some(p=>!Number.isInteger(p)||p<1) || !Number.isInteger(patch.source_page) || patch.source_page<1)throw Error('Context and item pages required');
    if(patch.question_text!==`Comando: ${evidence.context}\nItem: ${expected.question_text}`)throw Error('Original item must remain verbatim after restored command');
    if(!/^[a-z0-9_]+$/.test(evidence.contest_identifier||'') || new URL(evidence.pdf_url).protocol!=='https:')throw Error('Official contest identifier required');
  }
  validateReview(legalPack(pack.items));
  return pack;
}
export async function restoreContexts(pack,request,readPdf=readFile,{dryRun=false}={}) {
  validateRestoration(pack);const pending=[];
  for(const item of pack.items){
    const {expected,patch,evidence}=item;
    const bytes=await readPdf(evidence.pdf_path);
    if(createHash('sha256').update(bytes).digest('hex')!==evidence.pdf_sha256)throw Error('Reviewed PDF changed');
    const [legacy]=await request(`content_sources?id=eq.${expected.question_source_id}&select=*`);
    const [pdf]=await request(`content_sources?id=eq.${evidence.pdf_source_id}&select=*`);
    const segment=`/concursos/${evidence.contest_identifier}`;
    const caderno=s=>s?.is_official && s.status==='vigente' && (s.source_type==='prova'||(s.source_type==='outro'&&/^Prova objetiva/i.test(s.title||'')));
    const sameContest=u=>{const path=new URL(u).pathname.toLowerCase();return path===segment || path.startsWith(segment+'/');};
    if(!caderno(legacy)||!caderno(pdf)||pdf.url!==evidence.pdf_url||!sameContest(legacy.url)||!sameContest(pdf.url))throw Error('Registered official cadernos must identify the same contest');
    const [actual]=await request(`official_exam_questions?id=eq.${expected.id}&select=*`);
    if(sameReviewRow(actual,{...expected,...patch}))continue;
    if(!sameReviewRow(actual,expected))throw Error('Concurrent context revision');
    pending.push(item);
  }
  // Validate ALL existing topics, active edital sources and legal bases before
  // any text write. No approval flag, answer, source ID or status can change.
  if(pending.length)await publishReview(legalPack(pending),request,{dryRun:true});
  const result={updated:[],preserved:pack.items.length-pending.length};
  if(dryRun)return {...result,dry_run:true,pending:pending.map(i=>i.expected.id)};
  for(const {expected,patch} of pending){
    const rows=await request('official_exam_questions?'+reviewRowFilters('official_exam_questions',expected),'PATCH',patch);
    if(rows.length!==1||!sameReviewRow(rows[0],{...expected,...patch}))throw Error('Restoration readback mismatch');
    result.updated.push(expected.id);
  }
  return result;
}
if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href){
  const [input,report,mode]=process.argv.slice(2);
  if(!input||!report||(mode&&mode!=='--dry-run'))throw Error('Usage: PACK REPORT [--dry-run]');
  const pack=validateRestoration(JSON.parse(await readFile(input,'utf8')));
  const key=process.env.TASK_SUPABASE_KEY,project=process.env.TASK_SUPABASE_PROJECT;
  if(!key||project!=='gkwphadbveiyjcwiiizw')throw Error('Session credentials required');
  const request=async(path,method='GET',body)=>{const r=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error('Database HTTP '+r.status);return r.json();};
  const result={dry_run:mode==='--dry-run',...await restoreContexts(pack,request,readFile,{dryRun:mode==='--dry-run'}),checked_at:new Date().toISOString()};
  await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}
