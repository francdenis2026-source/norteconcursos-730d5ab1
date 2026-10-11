import {isDeepStrictEqual} from 'node:util';
export const explanationFields=['unit_id','content_sha256','simples','pontos','atencao','exemplo','prova','termos','remissoes'];
export function explanationPayload(row) {return Object.fromEntries(explanationFields.map(k=>[k,row[k]??[]]));}
export function sameExplanation(actual, expected) {return explanationFields.every(k=>isDeepStrictEqual(actual[k],expected[k]));}
export function validateArticlePackage(pack) {
  const sha=/^[a-f0-9]{64}$/, uuid=/^[0-9a-f-]{36}$/i, ids=new Set(), laws=new Map();
  if(!pack.units?.length||!pack.laws?.length||!Number.isFinite(Date.parse(pack.checked_at))||Date.parse(pack.checked_at)>Date.now())throw Error('Lote inválido');
  for(const law of pack.laws){const url=new URL(law.source_url);if(laws.has(law.slug)||url.hostname!=='www.planalto.gov.br'||url.protocol!=='https:'||!sha.test(law.source_sha256)||!Number.isFinite(Date.parse(law.source_checked_at))||Date.parse(law.source_checked_at)>Date.now())throw Error('Fonte inválida');laws.set(law.slug,law);}
  for(const row of pack.units){
    if(ids.has(row.unit_id)||!uuid.test(row.unit_id)||!sha.test(row.content_sha256)||!laws.has(row.course_slug))throw Error('Dispositivo inválido');ids.add(row.unit_id);
    if(!['simples','exemplo'].every(k=>typeof row[k]==='string'&&row[k].trim().length>=20)||!['pontos','atencao','prova','termos','remissoes'].every(k=>Array.isArray(row[k]))||!['pontos','atencao','prova'].every(k=>row[k].length&&row[k].every(v=>typeof v==='string'&&v.trim())))throw Error('Explicação incompleta');
    if(['status','reviewed_by','reviewed_at'].some(k=>k in row))throw Error('Publicação definida apenas pelo importador');
  }
  for(const law of laws.values())for(const ref of law.additional_sources??[]){const url=new URL(ref.url);if(url.protocol!=='https:'||url.hostname!=='www.planalto.gov.br'||!sha.test(ref.sha256)||!Number.isFinite(Date.parse(ref.checked_at))||Date.parse(ref.checked_at)>Date.now())throw Error('Fonte adicional inválida');}
  for(const law of laws.values())if(pack.units.filter(r=>r.course_slug===law.slug).length!==law.units)throw Error('Cobertura incompleta do lote');
  return pack;
}
export function checkArticlePreflight(pack, snapshot){
  validateArticlePackage(pack);
  for(const law of pack.laws){
    const course=snapshot.legal_courses.find(c=>c.slug===law.slug&&c.status==='active');
    const current=snapshot.legal_course_units.filter(u=>u.course_id===course?.id&&u.content_status==='current');
    const authored=pack.units.filter(r=>r.course_slug===law.slug);
    for(const ref of law.additional_sources??[])if(!snapshot.content_sources.some(s=>s.url===ref.url&&s.is_official&&s.status==='vigente'))throw Error('Fonte adicional não cadastrada');
    if(law.scope_type==='targeted_correction'){
      if(current.length!==law.course_current_units||!Array.isArray(law.target_unit_keys)||law.target_unit_keys.length!==law.units||new Set(law.target_unit_keys).size!==law.units||!authored.every(r=>law.target_unit_keys.includes(r.unit_key)&&current.some(u=>u.id===r.unit_id)))throw Error(`Correção incompleta: ${law.slug}`);
    }else if(law.scope_type&&law.scope_type!=='complete_path')throw Error('Escopo desconhecido');
    else if(current.length!==law.units||!current.every(u=>authored.some(r=>r.unit_id===u.id)))throw Error(`Cobertura mudou: ${law.slug}`);
  }
  for(const row of pack.units){
    const course=snapshot.legal_courses.find(c=>c.id===row.course_id&&c.slug===row.course_slug&&c.status==='active');
    const law=pack.laws.find(l=>l.slug===row.course_slug);
    const unit=snapshot.legal_course_units.find(u=>u.id===row.unit_id&&u.course_id===row.course_id&&u.unit_key===row.unit_key&&u.content_status==='current'&&u.content_sha256===row.content_sha256);
    const topic=snapshot.syllabus_topics.find(t=>t.id===row.syllabus_topic_id&&t.edition_id===row.edition_id&&t.content_status==='current');
    const edition=snapshot.syllabus_editions.find(e=>e.id===row.edition_id&&e.status==='active');
    const source=snapshot.content_sources.find(s=>s.url===law.source_url&&s.is_official&&s.status==='vigente');
    const old=snapshot.legal_unit_explanations.find(e=>e.unit_id===row.unit_id);
    if(!course||course.syllabus_topic_id!==row.syllabus_topic_id||course.source_url!==law.source_url||!unit||!topic||!edition||!source)throw Error(`Vínculo ou texto mudou: ${row.course_slug}/${row.unit_key}`);
    if(old&&!sameExplanation(old,explanationPayload(row))&&(!row.expected||!isDeepStrictEqual(old,row.expected)))throw Error(`Preserve a revisão existente: ${row.unit_id}`);
    if(!old&&row.expected)throw Error('Revisão anterior desapareceu');
    if(old&&!['published','under_review'].includes(old.status))throw Error('Estado inesperado');
  }
}
