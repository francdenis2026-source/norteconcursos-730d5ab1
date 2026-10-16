import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {sameReviewRow} from './publish-question-review.mjs';

/** Record a useful analysis without certifying or releasing missing context. */
export async function annotatePendingContext(pack,request,{dryRun=false,readPdf=readFile}={}) {
  if(!Array.isArray(pack.items)||!pack.items.length)throw Error('Individual pending analyses required');
  const ids=new Set(),planned=[];
  for(const {expected,patch,evidence} of pack.items) {
    if(!expected?.id||ids.has(expected.id)||expected.content_status!=='under_review'||expected.context_review_required!==true||!patch?.review_note||patch.review_note.length<300||!patch.review_note.includes(expected.review_note||'')||Object.keys(patch).some(k=>!['review_note','verified_at'].includes(k))||!Number.isFinite(Date.parse(patch.verified_at))||Date.parse(patch.verified_at)>Date.now()||!evidence?.reason||evidence.reviewed!==true||!evidence.pdf_path||!/^[a-f0-9]{64}$/.test(evidence.sha256||'')||!Number.isInteger(evidence.page)||evidence.page!==expected.source_page)throw Error('Analysis must preserve the pending context and original history');
    ids.add(expected.id);
    const bytes=await readPdf(evidence.pdf_path);
    if(!bytes.subarray(0,4).equals(Buffer.from('%PDF'))||createHash('sha256').update(bytes).digest('hex')!==evidence.sha256)throw Error('Reviewed caderno changed');
    const [source]=await request(`content_sources?id=eq.${expected.question_source_id}&select=*`);
    if(!source?.is_official||source.url!==evidence.source_url||!/^Prova objetiva/i.test(source.title||''))throw Error('Official original caderno required');
    const [actual]=await request(`official_exam_questions?id=eq.${expected.id}&select=*`);
    if(sameReviewRow(actual,{...expected,...patch}))continue;
    if(!sameReviewRow(actual,expected))throw Error('Concurrent pending analysis');
    planned.push({expected,patch});
  }
  const result={reviewed:pack.items.length,annotated:0,preserved:pack.items.length-planned.length};
  if(dryRun)return{...result,dry_run:true,pending:planned.length};
  for(const {expected,patch}of planned){
    const filter=Object.entries(expected).map(([k,v])=>v===null?`${k}=is.null`:`${k}=eq.${encodeURIComponent(typeof v==='object'?JSON.stringify(v):String(v))}`).join('&');
    const rows=await request(`official_exam_questions?${filter}`,'PATCH',patch);
    if(rows.length!==1||!sameReviewRow(rows[0],{...expected,...patch}))throw Error('Pending analysis readback mismatch');
    result.annotated++;
  }
  return result;
}
