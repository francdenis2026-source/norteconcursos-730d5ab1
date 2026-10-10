import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { sessionAuthHeaders } from './supabase-session-auth.mjs';

export function validateLawReview(packageData) {
 const hostnames=new Set(['www.planalto.gov.br','planalto.gov.br','portal.stf.jus.br','noticias.stf.jus.br','www.stj.jus.br','processo.stj.jus.br','scon.stj.jus.br']);
 const checkUrl=value=>{const url=new URL(value);if(url.protocol!=='https:'||url.username||url.password||!hostnames.has(url.hostname))throw Error('Fonte não oficial');};
 const checkReview=review=>{
  if(!review?.scope||!Array.isArray(review.sources)||!review.sources.length||!Array.isArray(review.changes)||!Array.isArray(review.corrections)||!Number.isFinite(Date.parse(review.checked_at))||Date.parse(review.checked_at)>Date.now()+300000)throw Error('Conferência incompleta');
  for(const source of review.sources){checkUrl(source.url);if(!source.title||(source.sha256&&!/^[a-f0-9]{64}$/.test(source.sha256)))throw Error('Evidência inválida');}
  for(const change of review.changes){checkUrl(change.url);if(!change.title||!change.summary||!change.vigency||!['effective','future','reference','expired'].includes(change.state)||!Array.isArray(change.articles))throw Error('Vigência não revisada');}
 };
 if(!packageData.version||!Array.isArray(packageData.materials)||!packageData.materials.length||!Array.isArray(packageData.courses)||!Array.isArray(packageData.enrichments))throw Error('Pacote incompleto');
 const slugs=new Set();
 const uuid=/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/;
 for(const row of packageData.materials){
  if(!/^[a-z0-9-]+$/.test(row.slug)||slugs.has(row.slug)||!/^[a-f0-9]{64}$/.test(row.expected?.body_sha256)||row.expected.content_status!=='active')throw Error('Material duplicado ou sem precondição');slugs.add(row.slug);
  if(!uuid.test(row.expected.id)||!row.expected.title||!Number.isFinite(Date.parse(row.expected.updated_at))||!Number.isFinite(Date.parse(row.patch.law_version_checked_at)))throw Error('Precondição incompleta');
  if(Object.keys(row.patch).some(k=>!['body_md','quiz','flashcards','legal_basis','source_note','title','summary','law_version_checked_at','legal_review'].includes(k)))throw Error('Campo de publicação não permitido');
  if(!row.patch.body_md?.trim())throw Error('Texto vazio');checkReview(row.patch.legal_review);
  if(row.patch.quiz?.some(q=>!q.q||!q.why||typeof q.a!=='boolean')||row.patch.flashcards?.some(c=>!c.f||!c.b))throw Error('Prática incompleta');
 }
 const courseIds=new Set();
 for(const row of packageData.courses){
  if(!uuid.test(row.id)||courseIds.has(row.id)||row.expected?.id!==row.id||row.expected.status!=='active'||!row.expected.overview||!Number.isFinite(Date.parse(row.expected.checked_at))||!/^[a-f0-9]{64}$/.test(row.patch.source_sha256)||Object.keys(row.patch).some(k=>!['checked_at','source_sha256','legal_review'].includes(k)))throw Error('Curso sem precondição ou duplicado');
  courseIds.add(row.id);checkReview(row.patch.legal_review);
 }
 for(const row of packageData.enrichments)if(Object.keys(row.patch).some(k=>k!=='source_body_sha256')||!/^[a-f0-9]{64}$/.test(row.patch.source_body_sha256))throw Error('Exemplos não podem ser sobrescritos');
 return {materials:slugs.size,courses:packageData.courses.length,enrichments:packageData.enrichments.length};
}

export function matchesReviewPatch(actual,patch){
 const equal=(a,b)=>a===b||!!a&&!!b&&typeof a==='object'&&typeof b==='object'&&Object.keys(a).length===Object.keys(b).length&&Object.keys(a).every(k=>equal(a[k],b[k]));
 return !!actual&&Object.keys(patch).every(k=>['checked_at','law_version_checked_at'].includes(k)?Date.parse(actual[k])===Date.parse(patch[k]):equal(actual[k],patch[k]));
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const [input,report,mode]=process.argv.slice(2);if(!input||!report||(mode&&mode!=='--dry-run'))throw Error('Uso: node scripts/apply-library-law-review.mjs PACOTE_JSON RELATORIO_JSON [--dry-run]');
 const packageData=JSON.parse(await readFile(input,'utf8'));const result={...validateLawReview(packageData),dry_run:mode==='--dry-run'};
 if(!result.dry_run){
  const project=process.env.TASK_SUPABASE_PROJECT,key=process.env.TASK_SUPABASE_KEY,reviewer=process.env.TASK_LIBRARY_REVIEWER;
  if(!/^[a-z]{20}$/.test(project??'')||!key||!/^[a-f0-9-]{36}$/.test(reviewer??''))throw Error('Defina projeto, chave e revisor na sessão');
  const response=await fetch(`https://${project}.supabase.co/rest/v1/rpc/apply_library_law_review`,{method:'POST',headers:{...sessionAuthHeaders(key),'Content-Type':'application/json'},body:JSON.stringify({p_package:packageData,p_reviewer:reviewer})});
  if(!response.ok){const error=await response.json().catch(()=>({}));throw Error(`Publicação abortada: HTTP ${response.status}; ${error.message??'verifique o relatório de concorrência'}`);}
  Object.assign(result,await response.json());
  const read=async table=>{
   const rows=[];
   for(let offset=0;;){const res=await fetch(`https://${project}.supabase.co/rest/v1/${table}?select=*&order=id&offset=${offset}&limit=200`,{headers:sessionAuthHeaders(key)});if(!res.ok)throw Error(`Leitura posterior falhou: ${table} HTTP ${res.status}`);const page=await res.json();if(!page.length)return rows;rows.push(...page);offset+=page.length;}
  };
  for(const [table,targets,field] of [['study_materials',packageData.materials,'slug'],['legal_courses',packageData.courses,'id'],['study_material_enrichments',packageData.enrichments,'id']]){
   const rows=await read(table);if(targets.some(row=>!matchesReviewPatch(rows.find(actual=>actual[field]===row[field]),row.patch)))throw Error(`Leitura posterior diverge: ${table}`);
  }
  result.readback_verified=true;
 }
 await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}
