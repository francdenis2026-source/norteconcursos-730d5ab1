import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {sameReviewRow} from './publish-question-review.mjs';
import {sessionAuthHeaders} from '../supabase-session-auth.mjs';
const kinds=new Set(['edital','prova','gabarito']);
const filter=row=>Object.entries(row).map(([k,v])=>v===null?`${k}=is.null`:`${k}=eq.${encodeURIComponent(typeof v==='object'?JSON.stringify(v):String(v))}`).join('&');
export async function verifyOfficialExamCapture({row,evidence,kind},readPdf=readFile) {
  if(!kinds.has(kind)||!row?.id||!row.is_official||row.status!=='vigente'||row.source_type!==(kind==='edital'?'edital':'outro')||!Number.isFinite(Date.parse(row.checked_at))||Date.parse(row.checked_at)>Date.now())throw Error('Invalid official source');
  const url=new URL(row.url),catalog=new URL(evidence?.catalog_url??'');
  const cebraspeApi=url.hostname==='cdn.cebraspe.org.br'&&catalog.hostname==='apis.cebraspe.org.br'&&/^\/cebraspe\/eventos\/[a-z0-9_]+$/i.test(catalog.pathname);
  const ufmt=url.hostname==='www.concursos.ufmt.br'&&catalog.hostname===url.hostname&&catalog.pathname==='/Portal/noticias.asp'&&/^\d+$/.test(catalog.searchParams.get('NOTICIA')||'')&&[...catalog.searchParams.keys()].length===1&&url.pathname.startsWith('/Portal/Concursos/PJC2022/')&&!url.search&&![url,catalog].some(u=>u.username||u.password||u.port);
  if(url.protocol!=='https:'||catalog.protocol!=='https:'||(!ufmt&&!['ibade.org.br','www.ibade.org.br','cdn.cebraspe.org.br','www.cebraspe.org.br'].includes(url.hostname))||(!cebraspeApi&&catalog.hostname!==url.hostname)||!url.pathname.toLowerCase().endsWith('.pdf')||!evidence?.visually_verified||!evidence.pdf_path||!/^[a-f0-9]{64}$/.test(evidence.sha256||'')||!row.notes?.includes(evidence.sha256))throw Error('Reviewed official PDF and catalog required');
  if(ufmt){
   if(!evidence.catalog_path||!/^[a-f0-9]{64}$/.test(evidence.catalog_sha256||''))throw Error('Captured UFMT catalog required');
   const captured=await readPdf(evidence.catalog_path);
   if(createHash('sha256').update(captured).digest('hex')!==evidence.catalog_sha256)throw Error('Official UFMT catalog changed');
   const html=captured.toString('utf8').replace(/<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'');
   const listed=[...html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi)].some(m=>{try{const link=new URL(m[1].replace(/&amp;/g,'&'),catalog);return link.origin===url.origin&&decodeURIComponent(link.pathname)===decodeURIComponent(url.pathname)&&!link.search&&!link.username&&!link.password;}catch{return false;}});
   if(!/CONCURSO=204\b/.test(html)||!listed)throw Error('PDF not listed in the official UFMT PJC2022 notice');
   // This PDF is the preliminary key. Its final force depends on the separate
   // official 02/03/2022 notice annulling 2 and 10; never certify it in isolation.
   if(kind==='gabarito'){
    const c=evidence.final_key_confirmation;
    if(!c?.visually_verified||c.url!=='https://www.concursos.ufmt.br/Portal/Concursos/PJC2022/COMUNICADO%20ALTERA%c3%87%c3%83O%20DE%20GABARITO%20-%20PJC.pdf'||c.publication_date!=='2022-03-02'||JSON.stringify(c.annulled_items)!=='[2,10]'||!c.path||!/^[a-f0-9]{64}$/.test(c.sha256||'')||!row.notes.includes(c.sha256))throw Error('UFMT final key requires the reviewed changes notice');
    const confirmation=await readPdf(c.path);
    if(createHash('sha256').update(confirmation).digest('hex')!==c.sha256||confirmation.subarray(0,4).toString()!=='%PDF')throw Error('UFMT final key confirmation changed');
   }
  }
  if(cebraspeApi){
   if(!evidence.catalog_path||!/^[a-f0-9]{64}$/.test(evidence.catalog_sha256||''))throw Error('Captured official catalog required');
   const captured=await readPdf(evidence.catalog_path);
   if(createHash('sha256').update(captured).digest('hex')!==evidence.catalog_sha256)throw Error('Official catalog changed');
   const data=JSON.parse(captured.toString('utf8')),event=catalog.pathname.split('/').at(-1).toLowerCase();
   const files=[...(data.arquivosEdital||[]),...(data.arquivosGabarito||[])];
   if(String(data.eventoURL).toLowerCase()!==event||!url.pathname.toLowerCase().startsWith(`/concursos/${event}/arquivos/`)||!files.some(f=>f.nomeArquivo===decodeURIComponent(url.pathname.split('/').at(-1))))throw Error('PDF not listed in the official event catalog');
  }
  const bytes=await readPdf(evidence.pdf_path);if(createHash('sha256').update(bytes).digest('hex')!==evidence.sha256||!bytes.subarray(0,4).equals(Buffer.from('%PDF')))throw Error('Source PDF changed');
}
export async function prepareExamSources(pack,request,{dryRun=false,readPdf=readFile}={}) {
 if(!Array.isArray(pack.sources)||pack.sources.length!==3||new Set(pack.sources.map(s=>s.kind)).size!==3)throw Error('Exactly one caderno, final key and edital required');
 const planned=[];
 for(const item of pack.sources){
  const {row,evidence,expected,kind}=item;
  await verifyOfficialExamCapture(item,readPdf);
  const [actual]=await request(`content_sources?url=eq.${encodeURIComponent(row.url)}&select=*`);
  if(actual&&sameReviewRow(actual,row))continue;
  if(actual&&!sameReviewRow(actual,expected))throw Error('Concurrent source revision');
  if(!actual&&expected)throw Error('Expected source disappeared');
  if(actual)throw Error('Existing source metadata must be reviewed separately');
  planned.push(item);
 }
 const {expected,source_id}=pack.edition??{};
 if(!expected?.id||!pack.sources.some(s=>s.kind==='edital'&&s.row.id===source_id))throw Error('Edition must point to the reviewed edital');
 const [actual]=await request(`syllabus_editions?id=eq.${expected.id}&select=*`);
 const desired={...expected,source_id};
 if(!sameReviewRow(actual,expected)&&!sameReviewRow(actual,desired))throw Error('Concurrent edition revision');
 if(dryRun)return{dry_run:true,sourcesToCreate:planned.map(s=>s.row.id),editionToRepair:!sameReviewRow(actual,desired)};
 for(const {row}of planned){
  await request('content_sources','POST',row);
  const [readback]=await request(`content_sources?id=eq.${row.id}&select=*`);
  if(!sameReviewRow(readback,row))throw Error('Source readback mismatch');
 }
 if(!sameReviewRow(actual,desired)){
  const rows=await request(`syllabus_editions?${filter(expected)}`,'PATCH',{source_id});
  if(rows.length!==1||!sameReviewRow(rows[0],desired))throw Error('Edition readback mismatch');
 }
 return{dry_run:false,createdSources:planned.map(s=>s.row.id),editionSource:source_id};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const[input,output,mode]=process.argv.slice(2);if(!input||!output||(mode&&mode!=='--dry-run'))throw Error('Usage: PACK REPORT [--dry-run]');
 const key=process.env.TASK_SUPABASE_KEY,project=process.env.TASK_SUPABASE_PROJECT;if(!key||project!=='gkwphadbveiyjcwiiizw')throw Error('Authorized session required');
 const request=async(path,method='GET',body)=>{const r=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(`Database HTTP ${r.status}`);return r.json();};
 const result=await prepareExamSources(JSON.parse(await readFile(input,'utf8')),request,{dryRun:mode==='--dry-run'});await writeFile(output,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}
