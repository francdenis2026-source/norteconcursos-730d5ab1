// Explicit reviewed source transition. Preserve the complete prior metadata.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {reviewRowFilters,sameReviewRow} from './publish-question-review.mjs';
import {sessionAuthHeaders} from '../supabase-session-auth.mjs';
const [input,report,mode]=process.argv.slice(2);
if(!input||!report||(mode&&mode!=='--dry-run'))throw Error('Usage: SOURCE_REVIEW REPORT [--dry-run]');
const pack=JSON.parse(await readFile(input,'utf8'));
const url=new URL(pack.expected.url);
if(url.protocol!=='https:'||url.hostname!=='www.planalto.gov.br'||!pack.expected.is_official||!['vigente','parcialmente_revogado'].includes(pack.patch.status)||!/^[a-f0-9]{64}$/.test(pack.sha256)||!pack.patch.notes.includes(pack.sha256)||!Number.isFinite(Date.parse(pack.patch.checked_at))||Date.parse(pack.patch.checked_at)>Date.now()||Object.keys(pack.patch).some(k=>!['status','checked_at','notes'].includes(k)))throw Error('Invalid source review');
if(pack.expected.status==='em_revisao'&&!pack.capture_path)throw Error('Source promotion requires a reviewed capture');
if(pack.capture_path){
 const bytes=await readFile(pack.capture_path);
 if(createHash('sha256').update(bytes).digest('hex')!==pack.sha256||!/<html[\s>]/i.test(bytes.toString('latin1')))throw Error('Reviewed source capture changed');
}
const result={dry_run:mode==='--dry-run',updated:false,preserved:false};
if(!result.dry_run){
 const key=process.env.TASK_SUPABASE_KEY,project=process.env.TASK_SUPABASE_PROJECT;if(!key||project!=='gkwphadbveiyjcwiiizw')throw Error('Session required');
 async function request(path,method='GET',body){const r=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(`HTTP ${r.status}`);return r.json();}
 const [actual]=await request(`content_sources?id=eq.${pack.expected.id}&select=*`),desired={...pack.expected,...pack.patch};
 if(sameReviewRow(actual,desired))result.preserved=true;
 else{
  if(!sameReviewRow(actual,pack.expected))throw Error('Concurrent source revision; no write');
  const rows=await request(`content_sources?${reviewRowFilters('content_sources',pack.expected)}`,'PATCH',pack.patch);
  if(rows.length!==1||!sameReviewRow(rows[0],desired))throw Error('Source read-back mismatch');result.updated=true;
 }
 result.verified_at=new Date().toISOString();
}
await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(result);
