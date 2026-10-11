// Register independently fetched official evidence; never overwrite existing sources.
import {readFile,writeFile} from 'node:fs/promises';
import {sessionAuthHeaders} from './supabase-session-auth.mjs';
const [input,report,mode]=process.argv.slice(2);
if(!input||!report||(mode&&mode!=='--dry-run'))throw Error('Uso: node scripts/register-reviewed-sources.mjs FONTES RELATORIO [--dry-run]');
const rows=JSON.parse(await readFile(input,'utf8'));
for(const r of rows){const u=new URL(r.url);const official=u.hostname==='www.planalto.gov.br'||u.hostname==='processo.stj.jus.br'&&r.source_type==='jurisprudencia'&&r.issuer==='STJ';if(u.protocol!=='https:'||!official||!r.is_official||r.status!=='vigente'||!r.title||!Number.isFinite(Date.parse(r.checked_at))||Date.parse(r.checked_at)>Date.now())throw Error('Fonte inválida');}
const result={dry_run:mode==='--dry-run',registered:0,preserved:0};
if(!result.dry_run){
 const key=process.env.TASK_SUPABASE_KEY,project=process.env.TASK_SUPABASE_PROJECT;if(!key||project!=='gkwphadbveiyjcwiiizw')throw Error('Defina a sessão do projeto');
 async function request(path,method='GET',body){const response=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',Prefer:'resolution=ignore-duplicates'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(`HTTP ${response.status}`);const text=await response.text();return text?JSON.parse(text):null;}
 for(const row of rows){const path=`content_sources?url=eq.${encodeURIComponent(row.url)}&select=*`,existing=await request(path);if(existing.length){if(!existing[0].is_official||existing[0].status!=='vigente')throw Error('Fonte existente exige revisão');result.preserved++;continue;}await request('content_sources?on_conflict=url','POST',row);const [saved]=await request(path);if(saved?.id!==row.id||saved?.url!==row.url||saved?.notes!==row.notes||!saved?.is_official||saved?.status!=='vigente')throw Error('Leitura da fonte divergente');result.registered++;}
}
await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(result);
