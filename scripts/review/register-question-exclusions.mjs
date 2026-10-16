import {sameReviewRow} from './publish-question-review.mjs';
const fields=['edition_id','original_item','exclusion_type','reason','replacement_source_id'];
const project=row=>Object.fromEntries(fields.map(k=>[k,row?.[k]]));
/** Append exclusions without replacing another reviewer's decisions. */
export async function registerQuestionExclusions(pack,request,{dryRun=false}={}) {
 if(!Array.isArray(pack.items)||!pack.items.length)throw Error('Explicit exclusions required');
 const planned=[],seen=new Set();
 for(const {row,expected_question:expected} of pack.items){
  const key=row?.edition_id+':'+row?.original_item;
  if(seen.has(key)||!row?.edition_id||!row.original_item||!['revoked','replaced','obsolete','time_bound','outside_active_edital'].includes(row.exclusion_type)||!row.reason||!row.replacement_source_id||Object.keys(row).some(k=>!fields.includes(k))||!expected?.id||expected.content_status!=='under_review'||!row.original_item.includes(expected.id))throw Error('Invalid individual exclusion');
  seen.add(key);
  const path=`syllabus_exclusions?edition_id=eq.${row.edition_id}&original_item=eq.${encodeURIComponent(row.original_item)}&select=*`;
  const existing=await request(path);
  if(existing.length){if(existing.length!==1||!sameReviewRow(project(existing[0]),row))throw Error('Concurrent exclusion');continue;}
  const [question]=await request(`official_exam_questions?id=eq.${expected.id}&select=*`);
  if(!sameReviewRow(question,expected))throw Error('Concurrent question revision');
  const [edition]=await request(`syllabus_editions?id=eq.${row.edition_id}&select=id`);
  const [source]=await request(`content_sources?id=eq.${row.replacement_source_id}&select=id,is_official,status`);
  if(!edition||!source?.is_official||!['vigente','parcialmente_revogado'].includes(source.status))throw Error('Official source and edition required');
  planned.push({row,path});
 }
 const result={reviewed:pack.items.length,created:0,preserved:pack.items.length-planned.length};
 if(dryRun)return{...result,dry_run:true,pending:planned.length};
 for(const {row,path}of planned){
  // The unique edition/item constraint also rejects a simultaneous insert.
  await request('syllabus_exclusions','POST',row);
  const actual=await request(path);
  if(actual.length!==1||!sameReviewRow(project(actual[0]),row))throw Error('Exclusion readback mismatch');result.created++;
 }
 return result;
}
