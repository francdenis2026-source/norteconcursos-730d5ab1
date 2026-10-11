// Guarded correction of a reviewed case; the prior version stays in the batch.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {isDeepStrictEqual} from 'node:util';
import {sessionAuthHeaders} from '../supabase-session-auth.mjs';
const [input,report,mode]=process.argv.slice(2);if(!input||!report||(mode&&mode!=='--dry-run'))throw Error('Usage: BATCH REPORT [--dry-run]');
const rows=JSON.parse(await readFile(input,'utf8')),seen=new Set();
for(const r of rows){if(seen.has(r.expected.id)||r.expected.status!=='active'||!r.content?.cases?.length||!r.content.illustrations?.length||!r.reason)throw Error('Invalid correction');seen.add(r.expected.id);}
const result={dry_run:mode==='--dry-run',corrected:0,preserved:0};
if(!result.dry_run){
 const project=process.env.TASK_SUPABASE_PROJECT,key=process.env.TASK_SUPABASE_KEY,reviewer=process.env.TASK_LIBRARY_REVIEWER;if(project!=='gkwphadbveiyjcwiiizw'||!key||!/^[a-f0-9-]{36}$/.test(reviewer??''))throw Error('Session required');
 async function request(path,method='GET',body){const res=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});if(!res.ok)throw Error(`HTTP ${res.status}`);return res.json();}
 if(!(await request(`user_roles?user_id=eq.${reviewer}&role=eq.admin&select=role`)).length)throw Error('Reviewer role unavailable');
 const unchanged=(actual,expected)=>isDeepStrictEqual(Object.fromEntries(Object.entries(actual??{}).filter(([k])=>!['content','checked_at','reviewed_by','reviewed_at'].includes(k))),Object.fromEntries(Object.entries(expected).filter(([k])=>!['content','checked_at','reviewed_by','reviewed_at'].includes(k))));
 const alreadyApplied=(actual,r)=>unchanged(actual,r.expected)&&isDeepStrictEqual(actual.content,r.content)&&actual.reviewed_by===reviewer&&Number.isFinite(Date.parse(actual.reviewed_at));
 const actuals=new Map();
 for(const r of rows){
  const [actual]=await request(`study_material_enrichments?id=eq.${r.expected.id}&select=*`);actuals.set(r.expected.id,actual);
  if(alreadyApplied(actual,r))continue;
  if(!isDeepStrictEqual(actual,r.expected))throw Error('Concurrent case review; no write');
  const [m]=await request(`study_materials?slug=eq.${encodeURIComponent(actual.material_slug)}&select=body_md,content_status`);
  if(m?.content_status!=='active'||createHash('sha256').update(m.body_md).digest('hex')!==r.material_body_sha256)throw Error('Source material changed; no write');
 }
 for(const r of rows){
  const actual=actuals.get(r.expected.id);if(alreadyApplied(actual,r)){result.preserved++;continue;}
  const now=new Date().toISOString(),patch={content:r.content,checked_at:now,reviewed_by:reviewer,reviewed_at:now};
  const saved=await request(`study_material_enrichments?id=eq.${actual.id}&status=eq.active&checked_at=eq.${encodeURIComponent(actual.checked_at)}&source_body_sha256=eq.${actual.source_body_sha256}`,'PATCH',patch);
  if(saved.length!==1||!alreadyApplied(saved[0],r)||Date.parse(saved[0].checked_at)!==Date.parse(now)||Date.parse(saved[0].reviewed_at)!==Date.parse(now))throw Error('Case read-back differs');result.corrected++;
 }
 result.verified_at=new Date().toISOString();
}
await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(result);
