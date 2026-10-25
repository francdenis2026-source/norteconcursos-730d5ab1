// Repair the CTB's existing PCDF edition pointer only; retain source history and dates.
import {readFile,writeFile} from 'node:fs/promises';
import {isDeepStrictEqual} from 'node:util';
import {sessionAuthHeaders} from '../supabase-session-auth.mjs';
import {usableSyllabusSource,sameExplanation,explanationPayload} from '../article-explanation-package.mjs';
const root=process.argv[2];if(!root)throw Error('Evidence folder required');
const project=process.env.TASK_SUPABASE_PROJECT,key=process.env.TASK_SUPABASE_KEY;
if(project!=='gkwphadbveiyjcwiiizw'||!key)throw Error('Authorized session required');
const read=async t=>JSON.parse(await readFile(`${root}/before/${t}.json`,'utf8'));
const course=(await read('legal_courses')).find(c=>c.slug==='transito');
const topic=(await read('syllabus_topics')).find(t=>t.id===course.syllabus_topic_id);
const expected=(await read('syllabus_editions')).find(e=>e.id===topic.edition_id);
const source=(await read('content_sources')).find(s=>s.id==='bf11c280-41e9-4e27-a06b-f3b0f4c32c34');
if(expected.contest_name!=='Polícia Civil do Distrito Federal'||expected.role_name!=='Delegado de Polícia'||expected.contest_year!==2026||!usableSyllabusSource(source))throw Error('Scope or registered official source invalid');
async function request(path,method='GET',body){
 const r=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
 if(!r.ok)throw Error(`Database HTTP ${r.status}`);return r.json();
}
const [current]=await request(`syllabus_editions?id=eq.${expected.id}&select=*`);
const [registered]=await request(`content_sources?id=eq.${source.id}&select=*`);
if(!isDeepStrictEqual(registered,source))throw Error('Source changed since snapshot; review again');
const desired={...expected,source_id:source.id};
let repaired=false;
if(!isDeepStrictEqual(current,desired)){
 if(!isDeepStrictEqual(current,expected))throw Error('Concurrent edition change');
 const filters=Object.entries(expected).map(([k,v])=>v===null?`${k}=is.null`:`${k}=eq.${encodeURIComponent(typeof v==='object'?JSON.stringify(v):String(v))}`).join('&');
 const rows=await request(`syllabus_editions?${filters}`,'PATCH',{source_id:source.id});
 if(rows.length!==1||!isDeepStrictEqual(rows[0],desired))throw Error('Edition repair readback mismatch');repaired=true;
}
const [confirmed]=await request(`syllabus_editions?id=eq.${expected.id}&select=*`);if(!isDeepStrictEqual(confirmed,desired))throw Error('Edition changed after repair');
const pack=JSON.parse(await readFile('docs/library/article-explanations-ctb-lote-01-2026-10-13.json','utf8'));
const interrupted=JSON.parse(await readFile(`${root}/interrupted-publication-readback.json`,'utf8'));
const withdrawn=[];
for(const actualAtStop of interrupted){
 const row=pack.units.find(r=>r.unit_id===actualAtStop.unit_id);
 if(isDeepStrictEqual(actualAtStop,row.expected))continue;
 const [actual]=await request(`legal_unit_explanations?unit_id=eq.${row.unit_id}&select=*`);
 if(!isDeepStrictEqual(actual,actualAtStop)||actual.status!=='published'||!sameExplanation(actual,explanationPayload(row)))throw Error('Concurrent partial review; do not withdraw');
 const result=await request(`legal_unit_explanations?unit_id=eq.${row.unit_id}&status=eq.published&updated_at=eq.${encodeURIComponent(actual.updated_at)}`,'PATCH',{status:'under_review',reviewed_by:null,reviewed_at:null,updated_at:new Date().toISOString()});
 if(result.length!==1||result[0].status!=='under_review'||!sameExplanation(result[0],explanationPayload(row)))throw Error('Review withdrawal mismatch');
 withdrawn.push(row.unit_key);
}
const report={verified_at:new Date().toISOString(),table:'syllabus_editions',expected,applied:desired,changed_fields:['source_id'],repair_applied:repaired,source,source_original_checked_at_preserved:true,notes:'Existing registered official retified edital verified in the database; current PDF requests returned 403, so no new full syllabus certification is claimed. Eight early approvals withdrawn for reapproval under the repaired binding.',partial_approvals_withdrawn:withdrawn};
await writeFile(`${root}/edital-source-repair.json`,JSON.stringify(report,null,2)+'\n');console.log({repair_applied:repaired,source_id:source.id,partial_approvals_withdrawn:withdrawn.length});
