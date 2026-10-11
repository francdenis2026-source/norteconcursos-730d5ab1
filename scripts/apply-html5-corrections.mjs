import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {isDeepStrictEqual} from 'node:util';
import {sessionAuthHeaders} from './supabase-session-auth.mjs';
const [input,report,mode]=process.argv.slice(2);
if(!input||!report||(mode&&mode!=='--dry-run'))throw Error('Uso: node scripts/apply-html5-corrections.mjs LOTE RELATORIO [--dry-run]');
const pack=JSON.parse(await readFile(input,'utf8')),hash=v=>createHash('sha256').update(v).digest('hex');
pack.status_changes??=[];
const ids=new Set();
for(const row of [...pack.changes.map(r=>({...r.expected,body_text:r.body_text,content_sha256:r.content_sha256})),...pack.additions.map(r=>r.unit)]){
 if(ids.has(row.id)||hash(row.body_text)!==row.content_sha256||row.content_status!=='current'||!pack.laws.some(l=>l.expected.id===row.course_id))throw Error('Dispositivo inválido');ids.add(row.id);
}
for(const r of pack.status_changes){if(ids.has(r.expected.id)||r.content_status!=='excluded'||hash(r.body_text)!==r.content_sha256||!pack.laws.some(l=>l.expected.id===r.expected.course_id))throw Error('Exclusão inválida');ids.add(r.expected.id);}
const result={dry_run:mode==='--dry-run',corrected:0,added:0,excluded:0,preserved:0,proposed_changes:pack.changes.length,proposed_additions:pack.additions.length};
if(!result.dry_run){
 const project=process.env.TASK_SUPABASE_PROJECT,key=process.env.TASK_SUPABASE_KEY;
 if(project!=='gkwphadbveiyjcwiiizw'||!key)throw Error('Defina projeto e chave na sessão');
 async function request(path,method='GET',body,prefer){const r=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',...(prefer?{Prefer:prefer}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(`HTTP ${r.status}: ${path.split('?')[0]}`);const text=await r.text();return text?JSON.parse(text):null;}
 const courses=await request('legal_courses?select=*&status=eq.active'),current=new Map(),existingAdditions=new Set();
 for(const law of pack.laws){
  const c=courses.find(c=>c.id===law.expected.id);if(!c||c.source_url!==law.source_url||c.source_sha256!==law.expected.source_sha256||c.syllabus_topic_id!==law.expected.syllabus_topic_id)throw Error('Fonte ou vínculo alterado');
  const [topic]=await request(`syllabus_topics?id=eq.${c.syllabus_topic_id}&content_status=eq.current&select=edition_id`);
  if(!topic||(await request(`syllabus_editions?id=eq.${topic.edition_id}&status=eq.active&select=id`)).length!==1)throw Error('Edital inativo');
  if(!(await request(`content_sources?url=eq.${encodeURIComponent(law.source_url)}&is_official=eq.true&status=in.(vigente,parcialmente_revogado)&select=id`)).length)throw Error('Fonte não cadastrada');
 }
 // Preflight the whole batch before any mutation.
 for(const row of pack.changes){const [u]=await request(`legal_course_units?id=eq.${row.expected.id}&select=*`);if(!u||(!isDeepStrictEqual(u,row.expected)&&u.body_text!==row.body_text))throw Error('Dispositivo alterado por outra revisão');current.set(u.id,u);}
 for(const row of pack.additions){const existing=await request(`legal_course_units?course_id=eq.${row.unit.course_id}&unit_key=eq.${row.unit.unit_key}&select=*`);if(existing.length&&!isDeepStrictEqual(existing[0],row.unit))throw Error('Artigo recuperado por outra revisão');if(existing.length)existingAdditions.add(row.unit.id);}
 for(const row of pack.status_changes){const [u]=await request(`legal_course_units?id=eq.${row.expected.id}&select=*`);const expected={...row.expected,body_text:row.body_text,content_sha256:row.content_sha256,content_status:'excluded'};if(!isDeepStrictEqual(u,row.expected)&&!isDeepStrictEqual(u,expected))throw Error('Dispositivo a excluir mudou');}
 for(const row of pack.changes){const u=current.get(row.expected.id);if(u.body_text===row.body_text){result.preserved++;continue;}const law=pack.laws.find(l=>l.expected.id===u.course_id);await request('rpc/apply_reviewed_legal_unit_correction','POST',{p_unit:u.id,p_expected_sha:u.content_sha256,p_source_sha:law.expected.source_sha256,p_body:row.body_text});const [applied]=await request(`legal_course_units?id=eq.${u.id}&select=*`);if(!isDeepStrictEqual(applied,{...u,body_text:row.body_text,content_sha256:row.content_sha256}))throw Error('Correção divergente');result.corrected++;}
 for(const row of pack.additions){if(existingAdditions.has(row.unit.id)){result.preserved++;continue;}await request('legal_course_units?on_conflict=course_id,unit_key','POST',row.unit,'resolution=ignore-duplicates');const [u]=await request(`legal_course_units?course_id=eq.${row.unit.course_id}&unit_key=eq.${row.unit.unit_key}&select=*`);if(!isDeepStrictEqual(u,row.unit))throw Error('Inclusão divergente');result.added++;}
 for(const row of pack.status_changes){const expected={...row.expected,body_text:row.body_text,content_sha256:row.content_sha256,content_status:'excluded'};const [existing]=await request(`legal_course_units?id=eq.${row.expected.id}&select=*`);if(!isDeepStrictEqual(existing,expected)){const applied=await request(`legal_course_units?id=eq.${row.expected.id}&content_sha256=eq.${row.expected.content_sha256}&content_status=eq.current`,'PATCH',{body_text:row.body_text,content_sha256:row.content_sha256,content_status:'excluded'},'return=representation');if(applied?.length!==1||!isDeepStrictEqual(applied[0],expected))throw Error('Exclusão divergente');result.excluded++;}}
 for(const id of new Set([...pack.additions.map(r=>r.unit.course_id),...pack.status_changes.map(r=>r.expected.course_id)])){
  const [c]=await request(`legal_courses?id=eq.${id}&select=*`);
  const us=await request(`legal_course_units?course_id=eq.${id}&select=chapter,content_status&order=position,unit_key&limit=1000`);
  if(us.length>=1000)throw Error('Paginação necessária antes de atualizar o resumo');
  const counts=new Map();for(const u of us)if(u.content_status==='current')counts.set(u.chapter,(counts.get(u.chapter)??0)+1);
  const overview={...c.overview,current_units:us.filter(u=>u.content_status==='current').length,excluded_units:us.filter(u=>u.content_status==='excluded').length,chapters:[...counts].map(([title,count])=>({title,count}))};
  if(!isDeepStrictEqual(c.overview,overview)){
   const rows=await request(`legal_courses?id=eq.${id}&source_sha256=eq.${c.source_sha256}&checked_at=eq.${encodeURIComponent(c.checked_at)}&overview->>current_units=eq.${c.overview.current_units}`,'PATCH',{overview},'return=representation');
   if(rows?.length!==1||!isDeepStrictEqual(rows[0].overview,overview))throw Error('Resumo alterado por outra revisão');
  }
 }
 // Existing explanation hashes are deliberately NOT rebound: stale teaching
 // remains inaccessible until a separate pedagogical review is published.
 result.readback_verified=true;result.verified_at=new Date().toISOString();
}
await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(result);
