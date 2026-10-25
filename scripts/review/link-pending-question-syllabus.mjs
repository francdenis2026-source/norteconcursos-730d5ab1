import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {sameReviewRow,reviewRowFilters} from './publish-question-review.mjs';
/** Repair only a pending question's current syllabus pointer. Never approve it. */
export async function linkPendingSyllabus(pack,request,{dryRun=false,readPdf=readFile}={}) {
 const {expected,patch,evidence,expected_topic:topic,expected_edition:edition,expected_source:source}=pack;
 if(pack.table!=='official_exam_questions'||expected?.content_status!=='under_review'||!topic?.id||topic.content_status!=='current'||topic.discipline!==expected.subject||topic.edition_id!==edition?.id||edition.status!=='active'||edition.source_id!==source?.id||!source.is_official||source.source_type!=='edital'||source.status!=='vigente')throw Error('Pending original and verified matching syllabus required');
 if(Object.keys(patch||{}).sort().join(',')!=='current_syllabus_topic_id,review_note'||patch.current_syllabus_topic_id!==topic.id||!patch.review_note?.startsWith(expected.review_note||'')||patch.review_note.length<(expected.review_note||'').length+100)throw Error('Only current pointer and appended pending note may change');
 if(!evidence?.visually_verified||evidence.url!==source.url||!evidence.pdf_path||!/^[a-f0-9]{64}$/.test(evidence.sha256||'')||!Number.isInteger(evidence.page)||evidence.page<1||!evidence.reference||!topic.topic_text.includes(evidence.reference)||!evidence.reason||!source.notes?.includes(evidence.sha256))throw Error('Specific captured official syllabus evidence required');
 const pdf=await readPdf(evidence.pdf_path);
 if(pdf.subarray(0,4).toString()!=='%PDF'||createHash('sha256').update(pdf).digest('hex')!==evidence.sha256)throw Error('Reviewed PDF changed');
 // Compare every registered field before writing; preserve another account's changes.
 for(const [table,expectedRow]of [['syllabus_topics',topic],['syllabus_editions',edition],['content_sources',source]]){
  const [actual]=await request(`${table}?id=eq.${expectedRow.id}&select=*`);
  if(!sameReviewRow(actual,expectedRow))throw Error('Concurrent syllabus/source revision');
 }
 const [actual]=await request(`official_exam_questions?id=eq.${expected.id}&select=*`);
 if(sameReviewRow(actual,{...expected,...patch}))return{updated:0,preserved:1,dry_run:dryRun};
 if(!sameReviewRow(actual,expected))throw Error('Concurrent question revision');
 if(dryRun)return{updated:0,pending:1,dry_run:true};
 const rows=await request('official_exam_questions?'+reviewRowFilters('official_exam_questions',expected),'PATCH',patch);
 const [readback]=await request(`official_exam_questions?id=eq.${expected.id}&select=*`);
 if(rows.length!==1||!sameReviewRow(rows[0],{...expected,...patch})||!sameReviewRow(readback,{...expected,...patch}))throw Error('Pending link readback mismatch');
 return{updated:1,preserved:0,dry_run:false};
}
