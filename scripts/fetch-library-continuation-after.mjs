// Read-only post-publication snapshots; the original baseline remains untouched.
import {writeFile} from 'node:fs/promises';
import {sessionAuthHeaders} from './supabase-session-auth.mjs';
const project=process.env.TASK_SUPABASE_PROJECT,key=process.env.TASK_SUPABASE_KEY;
if(project!=='gkwphadbveiyjcwiiizw'||!key)throw Error('Defina projeto e chave na sessão');
const folder='outputs/library-continuation-2026-10-11';
await Promise.all(['study_materials','legal_courses','study_material_enrichments'].map(async table=>{
  const rows=[];
  while(true){
    let page;
    for(let attempt=0;;attempt++){
      try{
        const response=await fetch(`https://${project}.supabase.co/rest/v1/${table}?select=*&order=id&limit=200&offset=${rows.length}`,{headers:sessionAuthHeaders(key),signal:AbortSignal.timeout(30000)});
        if(!response.ok)throw Error(`HTTP ${response.status}`);
        page=await response.json();break;
      }catch(error){if(attempt===2)throw error;}
    }
    rows.push(...page);if(page.length<200)break;
  }
  await writeFile(`${folder}/${table}-after.json`,JSON.stringify(rows,null,2)+'\n');
  console.log(table,rows.length);
}));
