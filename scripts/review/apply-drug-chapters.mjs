// Change chapter metadata only after source-text corrections; preserve identities.
import {readFile,writeFile} from 'node:fs/promises';
import {isDeepStrictEqual as equal} from 'node:util';
import {sessionAuthHeaders} from '../supabase-session-auth.mjs';
const [input,textInput,report,mode]=process.argv.slice(2);
if(!input||!textInput||!report||(mode&&mode!=='--dry-run'))throw Error('Usage: apply-drug-chapters.mjs CHAPTERS TEXT_CORRECTIONS REPORT [--dry-run]');
const pack=JSON.parse(await readFile(input,'utf8')),text=JSON.parse(await readFile(textInput,'utf8'));
const ids=new Set();
for(const row of pack.units){
 if(ids.has(row.expected.id)||row.expected.course_id!==pack.law.expected.id||row.expected.content_status!=='current'||!row.chapter||!row.chapter.startsWith('TÍTULO'))throw Error('Invalid chapter');
 ids.add(row.expected.id);
}
if(pack.law.expected.slug!=='drogas'||pack.units.length!==84||text.laws.length!==1||text.laws[0].expected.id!==pack.law.expected.id)throw Error('Wrong scope');
const result={dry_run:mode==='--dry-run',proposed:84,changed:0,preserved:0};
if(!result.dry_run){
 const project=process.env.TASK_SUPABASE_PROJECT,key=process.env.TASK_SUPABASE_KEY;
 if(project!=='gkwphadbveiyjcwiiizw'||!key)throw Error('Session project/key required');
 async function request(path,method='GET',body){
  let response;
  for(let attempt=0;;attempt++){
   try{response=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});break;}
   catch(error){if(method!=='GET'||attempt===2)throw error;}
  }
  if(!response.ok)throw Error(`HTTP ${response.status}: ${path.split('?')[0]}`);
  return response.json();
 }
 const [course]=await request(`legal_courses?id=eq.${pack.law.expected.id}&select=*`);
 if(!course||course.status!=='active'||course.source_sha256!==pack.law.expected.source_sha256||course.source_url!==pack.law.source_url)throw Error('Course changed');
 const current=await request(`legal_course_units?course_id=eq.${course.id}&content_status=eq.current&order=position,unit_key&select=*&limit=1000`);
 if(current.length!==84)throw Error('Current scope changed');
 const transitions=new Map();
 for(const row of pack.units){
  const correction=text.changes.find(c=>c.expected.id===row.expected.id);
  const before={...row.expected,...(correction?{body_text:correction.body_text,content_sha256:correction.content_sha256}:{})};
  const after={...before,chapter:row.chapter};
  const actual=current.find(u=>u.id===before.id);
  if(!equal(actual,before)&&!equal(actual,after))throw Error(`Concurrent change: ${row.unit_key}`);
  transitions.set(before.id,{before,after});
 }
 for(const row of pack.units){
  const {before,after}=transitions.get(row.expected.id);
  if(equal(current.find(u=>u.id===before.id),after)){result.preserved++;continue;}
  const applied=await request(`legal_course_units?id=eq.${before.id}&course_id=eq.${course.id}&unit_key=eq.${row.unit_key}&content_sha256=eq.${before.content_sha256}&content_status=eq.current&position=eq.${before.position}&chapter=eq.${encodeURIComponent(before.chapter)}`,'PATCH',{chapter:after.chapter});
  if(applied.length!==1||!equal(applied[0],after))throw Error('Chapter update not confirmed');
  result.changed++;
 }
 const readback=await request(`legal_course_units?course_id=eq.${course.id}&content_status=eq.current&order=position,unit_key&select=*&limit=1000`);
 if(readback.length!==84||!readback.every(u=>equal(u,transitions.get(u.id)?.after)))throw Error('Readback differs');
 const counts=new Map();for(const u of readback)counts.set(u.chapter,(counts.get(u.chapter)||0)+1);
 const overview={...course.overview,chapters:[...counts].map(([title,count])=>({title,count}))};
 const desired={...pack.law.expected,overview};
 if(!equal(course,desired)){
  if(!equal(course,pack.law.expected))throw Error('Concurrent overview update');
  const rows=await request(`legal_courses?id=eq.${course.id}&source_sha256=eq.${course.source_sha256}&checked_at=eq.${encodeURIComponent(course.checked_at)}&overview=eq.${encodeURIComponent(JSON.stringify(course.overview))}`,'PATCH',{overview});
  if(rows.length!==1||!equal(rows[0],desired))throw Error('Overview update not confirmed');
 }
 result.blocks=counts.size;result.readback_verified=true;result.verified_at=new Date().toISOString();
}
await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(result);
