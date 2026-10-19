import{readFile}from'node:fs/promises';
import{verifyOfficialExamCapture}from'./prepare-official-exam-sources.mjs';
import{sameReviewRow}from'./publish-question-review.mjs';
const fields=['id','contest_name','role_name','contest_year','exam_board','source_id','status'];
const subset=(row,expected)=>Object.fromEntries(Object.keys(expected).map(k=>[k,row?.[k]]));
const normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
/** Append a missing original exam edition and reviewed sources; no updates to existing rows. */
export async function registerOfficialExamEdition(pack,request,{dryRun=false,readPdf=readFile}={}){
 const{edition,evidence,sources}=pack;
 if(pack.purpose!=='append-verified-exam-edition'||!edition?.id||edition.status!=='active'||!Number.isInteger(edition.contest_year)||edition.contest_year<1900||edition.contest_year>new Date().getFullYear()||!edition.contest_name?.trim()||!edition.role_name?.trim()||!edition.exam_board?.trim()||Object.keys(edition).some(k=>!fields.includes(k))||!evidence?.identity_reviewed||!Number.isInteger(evidence.identity_page)||evidence.identity_page<1||!evidence.identity_reference||!Array.isArray(sources)||sources.length!==3||new Set(sources.map(s=>s.kind)).size!==3)throw Error('Individually reviewed edition identity and three original official documents required');
 const edital=sources.find(s=>s.kind==='edital');if(edital?.row.id!==edition.source_id)throw Error('Edition must reference the reviewed edital');
 const planned=[],urls=new Set(),ids=new Set();
 for(const item of sources){
  await verifyOfficialExamCapture(item,readPdf);
  if(urls.has(item.row.url)||ids.has(item.row.id))throw Error('Distinct source identities required');urls.add(item.row.url);ids.add(item.row.id);
  const current=await request(`content_sources?or=(id.eq.${item.row.id},url.eq.${encodeURIComponent(item.row.url)})&select=*`);
  if(current.length){if(current.length!==1||!sameReviewRow(current[0],item.row))throw Error('Existing source metadata must be preserved');}else planned.push(item.row);
 }
 async function editionState(){
  const rows=await request(`syllabus_editions?contest_year=eq.${edition.contest_year}&select=*`);
  const matches=rows.filter(r=>r.id===edition.id||(normalize(r.contest_name)===normalize(edition.contest_name)&&normalize(r.role_name)===normalize(edition.role_name)));
  if(matches.length>1||(matches.length===1&&!sameReviewRow(subset(matches[0],edition),edition)))throw Error('Existing exam edition identity must be preserved');
  return matches.length===1;
 }
 const exists=await editionState();
 if(dryRun)return{dry_run:true,sources_to_create:planned.map(r=>r.id),edition_to_create:!exists};
 for(const row of planned){await request('content_sources','POST',row);const[actual]=await request(`content_sources?id=eq.${row.id}&select=*`);if(!sameReviewRow(actual,row))throw Error('Source readback mismatch');}
 // Recheck the sources and identity immediately before appending an edition.
 for(const{row}of sources){const[actual]=await request(`content_sources?id=eq.${row.id}&select=*`);if(!sameReviewRow(actual,row))throw Error('Concurrent source revision');}
 const nowExists=await editionState();
 if(!nowExists)await request('syllabus_editions','POST',edition);
 const[actual]=await request(`syllabus_editions?id=eq.${edition.id}&select=*`);if(!sameReviewRow(subset(actual,edition),edition))throw Error('Edition readback mismatch');
 return{dry_run:false,sources_created:planned.length,edition_created:!nowExists,edition_preserved:nowExists};
}
