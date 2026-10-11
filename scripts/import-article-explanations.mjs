// Explicit guarded article explanations; previous revisions retained in the package.
import {readFile,writeFile} from 'node:fs/promises';
import {sessionAuthHeaders} from './supabase-session-auth.mjs';
import {validateArticlePackage,checkArticlePreflight,explanationPayload,sameExplanation} from './article-explanation-package.mjs';
const [input,report,mode]=process.argv.slice(2);
if(!input||!report||(mode&&mode!=='--dry-run'))throw Error('Uso: node scripts/import-article-explanations.mjs LOTE RELATORIO [--dry-run]');
const pack=validateArticlePackage(JSON.parse(await readFile(input,'utf8')));
const result={version:pack.version,dry_run:mode==='--dry-run',laws:pack.laws.length,explanations:pack.units.length,published:0,improved:0,preserved:0};
if(mode==='--dry-run'){await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(result);process.exit(0);}
const project=process.env.TASK_SUPABASE_PROJECT,key=process.env.TASK_SUPABASE_KEY,reviewer=process.env.TASK_LIBRARY_REVIEWER;
if(project!=='gkwphadbveiyjcwiiizw'||!key||!/^[0-9a-f-]{36}$/i.test(reviewer??''))throw Error('Defina projeto, chave e revisor na sessão');
const base=`https://${project}.supabase.co/rest/v1/`,auth=sessionAuthHeaders(key);
async function request(path,method='GET',body,prefer){
  const response=await fetch(base+path,{method,headers:{...auth,'Content-Type':'application/json',...(prefer?{Prefer:prefer}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error(`HTTP ${response.status}: ${path.split('?')[0]}`);
  const text=await response.text();return text?JSON.parse(text):null;
}
async function readTable(table){const rows=[],order=table==='legal_unit_explanations'?'unit_id':'id';while(true){const page=await request(`${table}?select=*&order=${order}&limit=200&offset=${rows.length}`);rows.push(...page);if(page.length<200)return rows;}}
const tables=['legal_courses','legal_course_units','legal_unit_explanations','syllabus_topics','syllabus_editions','content_sources'];
const snapshot=Object.fromEntries(await Promise.all(tables.map(async t=>[t,await readTable(t)])));
const roles=await request(`user_roles?select=role&user_id=eq.${reviewer}&role=eq.admin`);if(!roles.length)throw Error('Revisor sem papel administrativo');
checkArticlePreflight(pack,snapshot); // Validate the entire batch before any write.
for(const row of pack.units){
  const payload=explanationPayload(row), old=snapshot.legal_unit_explanations.find(e=>e.unit_id===row.unit_id);
  if(old?.status==='published'&&sameExplanation(old,payload)){result.preserved++;continue;}
  if(!old)await request('legal_unit_explanations?on_conflict=unit_id','POST',{...payload,status:'under_review',authored_by:'codex'},'resolution=ignore-duplicates');
  else if(!sameExplanation(old,payload)){
    const updated=await request(`legal_unit_explanations?unit_id=eq.${row.unit_id}&content_sha256=eq.${row.content_sha256}&updated_at=eq.${encodeURIComponent(row.expected.updated_at)}&status=eq.${row.expected.status}`,'PATCH',{...payload,status:'under_review',authored_by:'codex',reviewed_by:null,reviewed_at:null,updated_at:new Date().toISOString()},'return=representation');
    if(updated?.length!==1||!sameExplanation(updated[0],payload))throw Error('Revisão concorrente; atualização interrompida');
    result.improved++;
  }
  const staged=await request(`legal_unit_explanations?select=*&unit_id=eq.${row.unit_id}`);
  if(staged.length!==1||!sameExplanation(staged[0],payload))throw Error('Conteúdo inserido diverge; não publicar');
  const current=await request(`legal_course_units?select=content_sha256,content_status&id=eq.${row.unit_id}`);
  if(current[0]?.content_sha256!==row.content_sha256||current[0]?.content_status!=='current')throw Error('Fonte alterada durante o lote; não publicar');
  await request(`legal_unit_explanations?unit_id=eq.${row.unit_id}&content_sha256=eq.${row.content_sha256}&status=eq.under_review`,'PATCH',{status:'published',reviewed_by:reviewer,reviewed_at:new Date().toISOString(),updated_at:new Date().toISOString()});
  const applied=await request(`legal_unit_explanations?select=*&unit_id=eq.${row.unit_id}`);
  if(applied[0]?.status!=='published'||!sameExplanation(applied[0],payload)||!applied[0]?.reviewed_by)throw Error('Publicação não confirmada');
  result.published++;
}
result.verified_at=new Date().toISOString();await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(result);
