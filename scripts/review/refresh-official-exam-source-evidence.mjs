import {readFile} from 'node:fs/promises';
import {verifyOfficialExamCapture} from './prepare-official-exam-sources.mjs';
import {sameReviewRow,reviewRowFilters} from './publish-question-review.mjs';

/** Separate, explicit evidence review of an already registered official PDF.
 * Only append notes and advance checked_at; never rewrite source identity,
 * publication status, title, URL, issuer, or any question/edition binding.
 */
export async function refreshExamSourceEvidence(pack,request,{dryRun=false,readPdf=readFile}={}) {
 if(pack.purpose!=='official-exam-evidence-refresh'||!Array.isArray(pack.items)||!pack.items.length)throw Error('Explicit source evidence review required');
 const pending=[],ids=new Set(),urls=new Set();
 for(const item of pack.items){
  const {expected,row,kind}=item;
  if(!expected?.id||row?.id!==expected.id||ids.has(row.id)||urls.has(row.url))throw Error('Distinct existing source identities required');
  ids.add(row.id);urls.add(row.url);
  const keys=new Set([...Object.keys(expected),...Object.keys(row)]);
  if([...keys].some(k=>!['notes','checked_at'].includes(k)&&!sameReviewRow({[k]:expected[k]},{[k]:row[k]})))throw Error('Evidence refresh cannot alter source identity or status');
  if(typeof row.notes!=='string'||!row.notes.startsWith(expected.notes?expected.notes+'\n':'')||row.notes===expected.notes||!Number.isFinite(Date.parse(expected.checked_at))||Date.parse(row.checked_at)<Date.parse(expected.checked_at))throw Error('Prior notes and review date must be preserved');
  const title=kind==='edital'?/^Edital/i:kind==='prova'?/^Prova objetiva/i:/^Gabarito.*definitivo/i;
  if(!title.test(row.title||''))throw Error('Source must identify the reviewed document kind');
  await verifyOfficialExamCapture(item,readPdf);
  const current=await request(`content_sources?url=eq.${encodeURIComponent(row.url)}&select=*`);
  if(current.length!==1)throw Error('Existing source disappeared or is ambiguous');
  if(sameReviewRow(current[0],row))continue;
  if(!sameReviewRow(current[0],expected))throw Error('Concurrent source evidence revision');
  pending.push(item);
 }
 const result={reviewed:pack.items.length,preserved:pack.items.length-pending.length,updated:[]};
 if(dryRun)return{...result,dry_run:true,pending:pending.map(i=>i.row.id)};
 for(const {expected,row}of pending){
  const patch={notes:row.notes,checked_at:row.checked_at};
  const rows=await request(`content_sources?${reviewRowFilters('content_sources',expected)}`,'PATCH',patch);
  const [actual]=await request(`content_sources?id=eq.${row.id}&select=*`);
  if(rows.length!==1||!sameReviewRow(rows[0],row)||!sameReviewRow(actual,row))throw Error('Source evidence readback mismatch');
  result.updated.push(row.id);
 }
 return result;
}
