import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {sameReviewRow} from './publish-question-review.mjs';
import {sessionAuthHeaders} from '../supabase-session-auth.mjs';

export function validateRepairs(pack) {
  if (!Array.isArray(pack.items) || !pack.items.length) throw Error('Empty repairs');
  const ids=new Set();
  for (const {expected,patch,evidence} of pack.items) {
    if (!expected?.id || ids.has(expected.id) || expected.content_status!=='under_review') throw Error('Pending distinct questions required');
    ids.add(expected.id);
    if (Object.keys(patch).some(k=>!['question_text','source_page','context_review_required','review_note','verified_at'].includes(k))) throw Error('Repair cannot publish or alter answers, sources or raw extraction');
    if (!evidence?.reason || !evidence.visually_verified || !/^[a-f0-9]{64}$/.test(evidence.pdf_sha256 || '') || !evidence.pdf_path || !evidence.source_url || !Number.isInteger(evidence.page) || evidence.page<1) throw Error('Visual PDF evidence required');
    const text=patch.question_text || expected.question_text;
    const binary=['C','E'].includes(expected.official_answer) && evidence.question_format==='certo_errado';
    const complete=binary? /^Comando:\s*\S[\s\S]+\nItem:\s*\S[\s\S]+$/.test(text || ''): ['A','B','C','D','E'].every(letter=>(text || '').includes(`(${letter})`));
    if (!text || !complete || text.trimStart().startsWith('(A)')) throw Error('Complete stem and alternatives required');
    if (patch.source_page!==undefined && (!Number.isInteger(patch.source_page) || patch.source_page!==evidence.page)) throw Error('Corrected page must match visual evidence');
    if (patch.context_review_required!==false || !patch.review_note || !Number.isFinite(Date.parse(patch.verified_at))) throw Error('Explicit context decision required');
  }
  return pack;
}

export async function repairContexts(pack,request,readPdf=readFile) {
  validateRepairs(pack);
  const pending=[];
  for(const item of pack.items) {
    const {expected,patch,evidence}=item;
    const bytes=await readPdf(evidence.pdf_path);
    if(createHash('sha256').update(bytes).digest('hex')!==evidence.pdf_sha256) throw Error('Reviewed PDF changed');
    const [source]=await request(`content_sources?id=eq.${expected.question_source_id}&select=*`);
    // Legacy cadernos use the schema's "outro" category; require the
    // registered title to identify a prova as well as the exact PDF URL.
    const isCaderno=source?.source_type==='prova' || (source?.source_type==='outro' && /^Prova objetiva/i.test(source.title || ''));
    if (!source?.is_official || !isCaderno || source.url!==evidence.source_url || (patch.source_page ?? expected.source_page)!==evidence.page) throw Error('Official caderno/page mismatch');
    const [actual]=await request(`official_exam_questions?id=eq.${expected.id}&select=*`);
    if (sameReviewRow(actual,{...expected,...patch}))continue;
    if (!sameReviewRow(actual,expected))throw Error(`Concurrent repair: ${expected.id}`);
    pending.push(item);
  }
  const result={repaired:[],preserved:pack.items.length-pending.length};
  for(const {expected,patch} of pending) {
    const filters=Object.entries(expected).map(([k,v])=>v===null?`${k}=is.null`:`${k}=eq.${encodeURIComponent(typeof v==='object'?JSON.stringify(v):String(v))}`).join('&');
    const rows=await request(`official_exam_questions?${filters}`,'PATCH',patch);
    if (rows.length!==1 || !sameReviewRow(rows[0],{...expected,...patch}))throw Error(`Repair readback mismatch: ${expected.id}`);
    result.repaired.push(expected.id);
  }
  return result;
}

if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  const [input,report,mode]=process.argv.slice(2);
  if(!input || !report || (mode && mode!=='--dry-run'))throw Error('Usage: REPAIRS REPORT [--dry-run]');
  const pack=validateRepairs(JSON.parse(await readFile(input,'utf8')));
  let result={dry_run:true,reviewed:pack.items.length};
  if(mode!=='--dry-run') {
    const key=process.env.TASK_SUPABASE_KEY,project=process.env.TASK_SUPABASE_PROJECT;
    if(!key || project!=='gkwphadbveiyjcwiiizw')throw Error('Session credentials required');
    const request=async(path,method='GET',body)=>{
      const r=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
      if(!r.ok)throw Error(`Database HTTP ${r.status}`);return r.json();
    };
    result={dry_run:false,...await repairContexts(pack,request)};
  }
  await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}
