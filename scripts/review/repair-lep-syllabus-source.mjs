// Correct only the PF Delegado edition source pointer, preserving all other fields.
import {readFile,writeFile} from 'node:fs/promises';
import {isDeepStrictEqual} from 'node:util';
import {sessionAuthHeaders} from '../supabase-session-auth.mjs';
import {usableSyllabusSource} from '../article-explanation-package.mjs';
const root=process.argv[2],project=process.env.TASK_SUPABASE_PROJECT,key=process.env.TASK_SUPABASE_KEY;
if(!root||project!=='gkwphadbveiyjcwiiizw'||!key)throw Error('Authorized session and evidence required');
const read=async t=>JSON.parse(await readFile(`${root}/before/${t}.json`,'utf8'));
const course=(await read('legal_courses')).find(c=>c.slug==='lep');
const topic=(await read('syllabus_topics')).find(t=>t.id===course.syllabus_topic_id);
const expected=(await read('syllabus_editions')).find(e=>e.id===topic.edition_id);
const source=(await read('content_sources')).find(s=>s.id==='e48e61a0-ecf6-4140-b431-e9dba7b40b67');
if(expected.id!=='fcc0cb59-2b57-4b21-8156-bca2312a1200'||expected.contest_name!=='Polícia Federal'||expected.role_name!=='Delegado de Polícia Federal'||expected.contest_year!==2025||!usableSyllabusSource(source))throw Error('Scope or official source mismatch');
async function request(path,method='GET',body){
 const r=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
 if(!r.ok)throw Error(`Database HTTP ${r.status}`);return r.json();
}
const [current]=await request(`syllabus_editions?id=eq.${expected.id}&select=*`);
const [registered]=await request(`content_sources?id=eq.${source.id}&select=*`);
if(!isDeepStrictEqual(registered,source))throw Error('Registered source changed; inspect again');
const desired={...expected,source_id:source.id};let repaired=false;
if(!isDeepStrictEqual(current,desired)){
 if(!isDeepStrictEqual(current,expected))throw Error('Concurrent edition change; no overwrite');
 const filters=Object.entries(expected).map(([k,v])=>v===null?`${k}=is.null`:`${k}=eq.${encodeURIComponent(typeof v==='object'?JSON.stringify(v):String(v))}`).join('&');
 const rows=await request(`syllabus_editions?${filters}`,'PATCH',{source_id:source.id});
 if(rows.length!==1||!isDeepStrictEqual(rows[0],desired))throw Error('Repair readback mismatch');repaired=true;
}
const [confirmed]=await request(`syllabus_editions?id=eq.${expected.id}&select=*`);
if(!isDeepStrictEqual(confirmed,desired))throw Error('Edition changed after repair');
const report={verified_at:new Date().toISOString(),table:'syllabus_editions',expected,applied:desired,changed_fields:['source_id'],repair_applied:repaired,source,source_original_checked_at_preserved:true,notes:'Existing PF Delegado 2025 edition incorrectly pointed to a test booklet. Corrected only its source_id to the already registered official edital updated to retification 4. Fresh PDF request returned 403; source verification date of 4/10/2026 preserved, without claiming a fresh full syllabus audit. Importer rejected the package before any explanation write.'};
await writeFile(`${root}/edital-source-repair.json`,JSON.stringify(report,null,2)+'\n');console.log({repair_applied:repaired,source_id:source.id});
