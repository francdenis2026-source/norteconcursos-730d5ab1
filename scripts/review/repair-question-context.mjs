import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {sameReviewRow} from './publish-question-review.mjs';
import {extractQuestionIllustrations} from '../../src/lib/questionMedia.ts';
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
    const labels=evidence.alternative_labels || ['A','B','C','D','E'];
    if (!binary && (!Array.isArray(labels) || !['ABCD','ABCDE'].includes(labels.join('')) || !labels.includes(expected.official_answer))) throw Error('Verified alternative labels required');
    const support=evidence.support_expected;
    const shared=binary && support?.id===expected.support_text_id && typeof support?.body==='string' && support.body.length>=100 && support.body===evidence.reviewed_context && support.contest_name===expected.contest_name && support.exam_year===expected.exam_year && support.exam_board===expected.exam_board && !('question_text' in patch);
    const complete=binary? shared || /^Comando:\s*\S[\s\S]+\nItem:\s*\S[\s\S]+$/.test(text || ''): labels.every(letter=>(text || '').includes(`(${letter})`)) && !['A','B','C','D','E'].some(letter=>!labels.includes(letter) && (text || '').includes(`(${letter})`));
    if(support && !shared)throw Error('Verified shared context must match the original item and exam');
    if (!text || !complete || text.trimStart().startsWith('(A)')) throw Error('Complete stem and alternatives required');
    const media=extractQuestionIllustrations(text);
    if (/^\s*!\[/m.test(media.text)) throw Error('Unsupported or malformed figure marker');
    const figures=evidence.figures||[];
    if (!Array.isArray(figures)||figures.length!==media.illustrations.length||figures.length>10||new Set(figures.map(f=>f.url)).size!==figures.length) throw Error('Every figure requires distinct reviewed evidence');
    for (const image of media.illustrations) {
      const f=figures.find(f=>f.url===image.url);
      if(!f?.path||!/^[a-f0-9]{64}$/.test(f.sha256||'')) throw Error('Reviewed figure capture required');
    }
    if (patch.source_page!==undefined && (!Number.isInteger(patch.source_page) || patch.source_page!==evidence.page)) throw Error('Corrected page must match visual evidence');
    if (patch.context_review_required!==false || !patch.review_note || !Number.isFinite(Date.parse(patch.verified_at))) throw Error('Explicit context decision required');
  }
  return pack;
}

async function readPublicFigure(url) {
  const response=await fetch(url,{redirect:'error',signal:AbortSignal.timeout(30000)});
  if(!response.ok||Number(response.headers.get('content-length')||0)>5242880)throw Error('Public figure unavailable or too large');
  const bytes=Buffer.from(await response.arrayBuffer());
  if(bytes.length>5242880)throw Error('Public figure too large');
  return bytes;
}
async function verifySharedContext(evidence,request) {
  if(!evidence.support_expected)return;
  const [actual]=await request(`question_support_texts?id=eq.${evidence.support_expected.id}&select=*`);
  if(!sameReviewRow(actual,evidence.support_expected))throw Error('Concurrent shared context revision');
}
export async function repairContexts(pack,request,readPdf=readFile,{dryRun=false,readFigure=readPublicFigure}={}) {
  validateRepairs(pack);
  const pending=[];
  for(const item of pack.items) {
    const {expected,patch,evidence}=item;
    const bytes=await readPdf(evidence.pdf_path);
    if(createHash('sha256').update(bytes).digest('hex')!==evidence.pdf_sha256) throw Error('Reviewed PDF changed');
    for(const f of evidence.figures||[]) {
      const local=await readPdf(f.path);
      const raster=local.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||local.subarray(0,3).equals(Buffer.from([255,216,255]))||(local.subarray(0,4).toString()==='RIFF'&&local.subarray(8,12).toString()==='WEBP');
      if(!raster||local.length>5242880||createHash('sha256').update(local).digest('hex')!==f.sha256)throw Error('Reviewed figure changed or invalid');
      const published=await readFigure(f.url);
      if(createHash('sha256').update(published).digest('hex')!==f.sha256)throw Error('Public figure differs from reviewed capture');
    }
    const [source]=await request(`content_sources?id=eq.${expected.question_source_id}&select=*`);
    // Legacy cadernos use the schema's "outro" category; require the
    // registered title to identify a prova as well as the exact PDF URL.
    const isCaderno=source?.source_type==='prova' || (source?.source_type==='outro' && /^Prova objetiva/i.test(source.title || ''));
    if (!source?.is_official || !isCaderno || source.url!==evidence.source_url || (patch.source_page ?? expected.source_page)!==evidence.page) throw Error('Official caderno/page mismatch');
    await verifySharedContext(evidence,request);
    const [actual]=await request(`official_exam_questions?id=eq.${expected.id}&select=*`);
    if (sameReviewRow(actual,{...expected,...patch}))continue;
    if (!sameReviewRow(actual,expected))throw Error(`Concurrent repair: ${expected.id}`);
    pending.push(item);
  }
  const result={repaired:[],preserved:pack.items.length-pending.length};
  if(dryRun)return {...result,dry_run:true,pending:pending.map(i=>i.expected.id)};
  for(const {expected,patch,evidence} of pending) {
    await verifySharedContext(evidence,request);
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
