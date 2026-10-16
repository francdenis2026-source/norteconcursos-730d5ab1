import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {sameReviewRow} from './publish-question-review.mjs';

// Technical references only. Legal sources continue through the Planalto workflow.
const hosts=new Set(['nvlpubs.nist.gov','www.who.int','bvsms.saude.gov.br','www.gov.br']);
export async function registerReferenceSources(pack,request,{dryRun=false,readCapture=readFile}={}) {
  if(!Array.isArray(pack.items)||!pack.items.length)throw Error('Individual references required');
  const planned=[],ids=new Set(),urls=new Set();
  for(const {row,evidence} of pack.items) {
    const url=new URL(row?.url);
    if(url.protocol!=='https:'||!hosts.has(url.hostname)||!row?.id||ids.has(row.id)||urls.has(row.url)||!['manual','outro'].includes(row.source_type)||!row.is_official||row.status!=='vigente'||!evidence?.reviewed||evidence.url!==row.url||!evidence.path||!['pdf','html'].includes(evidence.format)||!/^[a-f0-9]{64}$/.test(evidence.sha256||'')||!row.notes?.includes(evidence.sha256)||row.checked_at!==evidence.captured_at||!Number.isFinite(Date.parse(row.checked_at))||Date.parse(row.checked_at)>Date.now())throw Error('Reviewed dated official technical reference required');
    const bytes=await readCapture(evidence.path);
    if(createHash('sha256').update(bytes).digest('hex')!==evidence.sha256||(evidence.format==='pdf'?!bytes.subarray(0,4).equals(Buffer.from('%PDF')):!/<html[\s>]/i.test(bytes.toString('latin1'))))throw Error('Reference capture changed');
    ids.add(row.id);urls.add(row.url);
    const existing=await request(`content_sources?or=(id.eq.${row.id},url.eq.${encodeURIComponent(row.url)})&select=*`);
    if(existing.length){if(existing.length!==1||!sameReviewRow(existing[0],row))throw Error('Existing reference must be preserved');}
    else planned.push(row);
  }
  const result={reviewed:pack.items.length,created:0,preserved:pack.items.length-planned.length};
  if(dryRun)return{...result,dry_run:true,pending:planned.length};
  for(const row of planned){await request('content_sources','POST',row);const actual=await request(`content_sources?id=eq.${row.id}&select=*`);if(actual.length!==1||!sameReviewRow(actual[0],row))throw Error('Reference readback mismatch');result.created++;}
  return result;
}
