import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {sessionAuthHeaders} from './supabase-session-auth.mjs';
const [input,report,mode]=process.argv.slice(2);
if(!input||!report||(mode&&mode!=='--dry-run'))throw Error('Uso: node scripts/apply-legal-unit-correction.mjs PACOTE_JSON RELATORIO_JSON [--dry-run]');
const payload=JSON.parse(await readFile(input,'utf8'));
if(Object.keys(payload).sort().join(',')!=='p_body,p_expected_sha,p_source_sha,p_unit'||!/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(payload.p_unit)||![payload.p_expected_sha,payload.p_source_sha].every(value=>/^[a-f0-9]{64}$/.test(value))||typeof payload.p_body!=='string'||!payload.p_body.trim())throw Error('Correção sem identidade, texto ou precondição válida');
const result={units:1,dry_run:mode==='--dry-run'};
if(!result.dry_run){
 const project=process.env.TASK_SUPABASE_PROJECT,key=process.env.TASK_SUPABASE_KEY;
 if(!/^[a-z]{20}$/.test(project??'')||!key)throw Error('Defina projeto e chave na sessão');
 const request=async(path,body)=>{const response=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{...(body?{method:'POST',body:JSON.stringify(body)}:{}),headers:{...sessionAuthHeaders(key),'Content-Type':'application/json'}});if(!response.ok)throw Error(`Correção abortada: HTTP ${response.status}`);const raw=await response.text();return raw?JSON.parse(raw):null;};
 await request('rpc/apply_reviewed_legal_unit_correction',payload);
 const [unit]=await request(`legal_course_units?id=eq.${payload.p_unit}&select=id,body_text,content_sha256,content_status`);
 if(unit?.body_text!==payload.p_body||unit.content_status!=='current'||unit.content_sha256!==createHash('sha256').update(payload.p_body).digest('hex'))throw Error('Leitura posterior divergente');
 result.readback_verified=true;
}
await writeFile(report,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
