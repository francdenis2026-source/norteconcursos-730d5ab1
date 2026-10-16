import {readFile, writeFile} from 'node:fs/promises';
import {isDeepStrictEqual} from 'node:util';
import {pathToFileURL} from 'node:url';
import {sessionAuthHeaders} from '../supabase-session-auth.mjs';

const tables = new Set(['official_exam_questions','curated_question_catalog','board_exam_questions']);
const allowed = new Set(['content_status','legal_basis','law_version_checked_at','verified_at','review_note','explanation','current_syllabus_topic_id','syllabus_topic_id','legal_audit_completed','legal_review_required','context_review_required']);
// PostgreSQL omits trailing fractional zeroes in timestamptz responses.
// Preserve microsecond precision: Date parsing would silently round it away.
export function sameReviewRow(a,b) {
  const normalize=row=>row && Object.fromEntries(Object.entries(row).map(([key,value])=>{
    if (['created_at','verified_at','law_version_checked_at'].includes(key) && typeof value==='string') {
      value=value.replace(/Z$/, '+00:00').replace(/\.(\d+)(?=[+-]\d{2}:\d{2}$)/,(_,fraction)=>{
        const digits=fraction.replace(/0+$/,''); return digits?`.${digits}`:'';
      });
    }
    return [key,value];
  }));
  return isDeepStrictEqual(normalize(a),normalize(b));
}
export function validateReview(pack) {
  if (!Array.isArray(pack.items) || !pack.items.length) throw Error('Empty review');
  const ids = new Set();
  for (const item of pack.items) {
    const {table,expected,patch,evidence} = item;
    const id = `${table}:${expected?.id}`;
    if (!tables.has(table) || ids.has(id) || expected?.content_status !== 'under_review') throw Error('Invalid or repeated question');
    ids.add(id);
    if (Object.keys(patch).some(key=>!allowed.has(key))) throw Error('Original text/answer/source cannot be overwritten');
    if (!['active','archived','obsolete'].includes(patch.content_status)) throw Error('Explicit decision required');
    if (!evidence?.reason || !Array.isArray(evidence.sources) || !evidence.sources.length) throw Error('Individual evidence required');
    for (const url of evidence.sources) if (new URL(url).protocol !== 'https:') throw Error('HTTPS evidence required');
    if (!Number.isFinite(Date.parse(patch.verified_at)) || Date.parse(patch.verified_at)>Date.now()) throw Error('Invalid review date');
    if (patch.content_status==='active') {
      if (!(patch.current_syllabus_topic_id || patch.syllabus_topic_id || expected.syllabus_topic_id)) throw Error('Syllabus required');
      if (evidence.legal && (!patch.legal_basis?.length || !patch.law_version_checked_at)) throw Error('Current legal basis required');
      if (expected.needs_visual || expected.context_review_required) throw Error('Context/visual must be repaired in a separately audited operation');
      if ((expected.question_text || '').trimStart().startsWith('(A)')) throw Error('Stem embedded in an option must be repaired before publication');
      if (/TEXTO VERBATIM.*NÃO CONFIRMADO/.test(expected.question_text || '')) throw Error('Placeholder cannot be published');
    }
  }
  return pack;
}

export async function publishReview(pack, request) {
  validateReview(pack);
  // Preflight the entire batch before the first write. Reruns preserve already applied reviews.
  const pending=[];
  for (const item of pack.items) {
    const {table,expected,patch}=item;
    const [actual]=await request(`${table}?id=eq.${expected.id}&select=*`);
    if (sameReviewRow(actual,{...expected,...patch})) continue;
    if (!sameReviewRow(actual,expected)) throw Error(`Concurrent revision: ${table}/${expected.id}`);
    if (item.evidence.duplicate_of) {
      if (patch.content_status!=='archived' || pack.items.some(i=>i.table===table && i.expected.id===item.evidence.duplicate_of)) throw Error('Canonical duplicate cannot also be archived');
      const [canonical]=await request(`${table}?id=eq.${item.evidence.duplicate_of}&select=*`);
      const identity=['question_source_id','answer_key_source_id','item_number','question_text','official_answer','syllabus_topic_id','exam_year','contest_name'];
      const aliases={'Polícia Civil do Acre':'Agente de Polícia Civil','Polícia Penal do Acre':'Agente de Polícia Penal'};
      const careerMatches=canonical && (canonical.career_name===expected.career_name || (item.evidence.career_alias_verified && aliases[expected.career_name]===canonical.career_name));
      if (!canonical || !careerMatches || !['active','under_review'].includes(canonical.content_status) || identity.some(k=>!isDeepStrictEqual(canonical[k],expected[k]))) throw Error('Duplicate identity mismatch');
    }
    if (patch.content_status==='active') {
      const topicId=patch.current_syllabus_topic_id || patch.syllabus_topic_id || expected.syllabus_topic_id;
      const [topic]=await request(`syllabus_topics?id=eq.${topicId}&select=*`);
      const [edition]=await request(`syllabus_editions?id=eq.${topic?.edition_id}&select=*`);
      const [source]=await request(`content_sources?id=eq.${edition?.source_id}&select=*`);
      if (topic?.content_status!=='current' || edition?.status!=='active' || !source?.is_official || source.source_type!=='edital' || source.status!=='vigente') throw Error('Verified official active syllabus required');
      for (const basis of patch.legal_basis || []) {
        const sources=await request(`content_sources?url=eq.${encodeURIComponent(basis.url)}&select=id,is_official,status`);
        if (!sources.some(s=>s.is_official && ['vigente','parcialmente_revogado'].includes(s.status))) throw Error(`Official basis not registered: ${basis.url}`);
      }
    }
    pending.push(item);
  }
  const result={reviewed:pack.items.length,updated:[],preserved:pack.items.length-pending.length};
  for (const {table,expected,patch} of pending) {
    // Filter every original field to avoid overwriting another account's simultaneous work.
    const filters=Object.entries(expected).map(([k,v])=>v===null?`${k}=is.null`:`${k}=eq.${encodeURIComponent(k==='figure_urls'&&Array.isArray(v)?`{${v.map(x=>JSON.stringify(x)).join(',')}}`:typeof v==='object'?JSON.stringify(v):String(v))}`).join('&');
    const rows=await request(`${table}?${filters}`,'PATCH',patch);
    if (rows.length!==1 || !sameReviewRow(rows[0],{...expected,...patch})) throw Error(`Readback mismatch: ${expected.id}`);
    result.updated.push(expected.id);
  }
  return result;
}

if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  const [input,report,mode]=process.argv.slice(2);
  if (!input || !report || (mode && mode!=='--dry-run')) throw Error('Usage: REVIEW_PACK REPORT [--dry-run]');
  const pack=validateReview(JSON.parse(await readFile(input,'utf8')));
  let result={dry_run:true,reviewed:pack.items.length};
  if (mode!=='--dry-run') {
    const key=process.env.TASK_SUPABASE_KEY,project=process.env.TASK_SUPABASE_PROJECT;
    if (!key || project!=='gkwphadbveiyjcwiiizw') throw Error('Project/session credentials required');
    const request=async(path,method='GET',body)=>{
      const res=await fetch(`https://${project}.supabase.co/rest/v1/${path}`,{method,headers:{...sessionAuthHeaders(key),'Content-Type':'application/json',Prefer:'return=representation'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
      if (!res.ok) throw Error(`Database HTTP ${res.status}`);
      return res.json();
    };
    result={dry_run:false,...await publishReview(pack,request),verified_at:new Date().toISOString()};
  }
  await writeFile(report,JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result));
}
