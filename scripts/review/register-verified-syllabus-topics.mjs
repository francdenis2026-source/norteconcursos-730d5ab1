import{readFile}from'node:fs/promises';import{createHash}from'node:crypto';
import{sameReviewRow}from'./publish-question-review.mjs';
const fields=['id','edition_id','block_name','discipline','topic_order','topic_text','content_status'];
const subset=(row,expected)=>Object.fromEntries(Object.keys(expected).map(k=>[k,row?.[k]]));
/** Insert only missing, individually checked topics; never update an existing slot. */
export async function registerVerifiedTopics(pack,request,{dryRun=false,readPdf=readFile}={}){
 const {expected_edition:edition,expected_source:source,evidence,items}=pack;
 if(!edition?.id||edition.status!=='active'||edition.source_id!==source?.id||!source.is_official||source.source_type!=='edital'||source.status!=='vigente'||!evidence?.visually_verified||evidence.url!==source.url||!evidence.pdf_path||!/^[a-f0-9]{64}$/.test(evidence.sha256||'')||!Array.isArray(items)||!items.length)throw Error('Reviewed official active syllabus required');
 const bytes=await readPdf(evidence.pdf_path);if(!bytes.subarray(0,4).equals(Buffer.from('%PDF'))||createHash('sha256').update(bytes).digest('hex')!==evidence.sha256)throw Error('Reviewed syllabus PDF changed');
 const [actualEdition]=await request(`syllabus_editions?id=eq.${edition.id}&select=*`);
 const [actualSource]=await request(`content_sources?id=eq.${source.id}&select=*`);
 if(!sameReviewRow(actualEdition,edition)||!sameReviewRow(actualSource,source))throw Error('Concurrent syllabus/source revision');
 const current=await request(`syllabus_topics?edition_id=eq.${edition.id}&select=*`),planned=[],slots=new Set(),ids=new Set();
 for(const {row,page,reference}of items){
  const slot=row?.discipline+':'+row?.topic_order;
  if(!row?.id||ids.has(row.id)||slots.has(slot)||row.edition_id!==edition.id||row.content_status!=='current'||!row.block_name||!row.discipline||!Number.isInteger(row.topic_order)||row.topic_order<1||!row.topic_text||Object.keys(row).some(k=>!fields.includes(k))||!Number.isInteger(page)||page<1||!reference)throw Error('Individual evidenced topic required');
  ids.add(row.id);slots.add(slot);
  const existing=current.filter(r=>r.id===row.id||(r.discipline===row.discipline&&r.topic_order===row.topic_order));
  if(existing.length){if(existing.length!==1||!sameReviewRow(subset(existing[0],row),row))throw Error('Existing topic slot must be preserved');continue;}
  if(current.some(r=>r.topic_text===row.topic_text))throw Error('Matching topic already exists');
  planned.push(row);
 }
 const result={reviewed:items.length,created:0,preserved:items.length-planned.length};if(dryRun)return{...result,dry_run:true,pending:planned.length};
 for(const row of planned){await request('syllabus_topics','POST',row);const [actual]=await request(`syllabus_topics?id=eq.${row.id}&select=*`);if(!sameReviewRow(subset(actual,row),row))throw Error('Topic readback mismatch');result.created++;}
 return result;
}
