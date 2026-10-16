import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {sameReviewRow} from './publish-question-review.mjs';

/** Append individually reviewed Planalto captures; never replace existing metadata. */
export async function registerReviewedLegalSources(pack, request, {dryRun=false, readCapture=readFile}={}) {
  if (!Array.isArray(pack.items) || !pack.items.length) throw Error('Reviewed sources required');
  const planned=[], urls=new Set(), ids=new Set();
  for (const {row,evidence} of pack.items) {
    const url=new URL(row?.url);
    if (url.protocol!=='https:' || url.hostname!=='www.planalto.gov.br' || row.source_type!=='lei' || !row.is_official || row.status!=='vigente' || !row.id || ids.has(row.id) || urls.has(row.url) || !evidence?.reviewed || evidence.url!==row.url || !evidence.path || !/^[a-f0-9]{64}$/.test(evidence.sha256||'') || !row.notes?.includes(evidence.sha256) || !Number.isFinite(Date.parse(row.checked_at)) || Date.parse(row.checked_at)>Date.now() || row.checked_at!==evidence.captured_at) throw Error('Dated individual Planalto review required');
    const bytes=await readCapture(evidence.path);
    if (createHash('sha256').update(bytes).digest('hex')!==evidence.sha256 || !/<html[\s>]/i.test(bytes.toString('latin1'))) throw Error('Reviewed capture changed');
    ids.add(row.id); urls.add(row.url);
    const current=await request(`content_sources?or=(id.eq.${row.id},url.eq.${encodeURIComponent(row.url)})&select=*`);
    if (current.length) {
      if (current.length!==1 || !sameReviewRow(current[0],row)) throw Error('Existing source metadata must be preserved');
    } else planned.push(row);
  }
  const result={reviewed:pack.items.length,created:0,preserved:pack.items.length-planned.length};
  if(dryRun) return {...result,dry_run:true,pending:planned.length};
  for(const row of planned) {
    // Database URL uniqueness protects against another account inserting after preflight.
    await request('content_sources','POST',row);
    const actual=await request(`content_sources?id=eq.${row.id}&select=*`);
    if(actual.length!==1 || !sameReviewRow(actual[0],row)) throw Error('Source readback mismatch');
    result.created++;
  }
  return result;
}
