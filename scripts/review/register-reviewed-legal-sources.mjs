import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {sameReviewRow} from './publish-question-review.mjs';

/** Append reviewed primary legal captures; never replace existing metadata. */
export async function registerReviewedLegalSources(pack, request, {dryRun=false, readCapture=readFile}={}) {
  if (!Array.isArray(pack.items) || !pack.items.length) throw Error('Reviewed sources required');
  const planned=[], urls=new Set(), ids=new Set();
  for (const {row,evidence} of pack.items) {
    const url=new URL(row?.url);
    // Federal law retains the Planalto-only rule. District captures require an
    // explicit jurisdiction and the official SINJ norm route, never any .gov URL.
    const district=pack.jurisdiction==='DF';
    const pernambuco=pack.jurisdiction==='PE';
    const rondonia=pack.jurisdiction==='RO';
    const anvisa=pack.jurisdiction==='BR-ANVISA';
    const piaui=pack.jurisdiction==='PI';
    const matogrosso=pack.jurisdiction==='MT';
    const cfc=pack.jurisdiction==='BR-CFC';
    const roStatute=pack.jurisdiction==='RO-LC68';
    const roStatutePath='/media/sapl/public/anexonormajuridica/1992/20/lei_complementar_no_68_-_alterada_ate_lc_no_1.001_-_05.11.2018..docx';
    const mtPath='/norma-juridica/urn:lex:br;mato.grosso:estadual:lei.complementar:2010-06-30;407/compilado';
    const mtQuery=u=>u.searchParams.get('exibirAnotacao')==='1'&&u.searchParams.get('marcoHistorico')==='2026-10-17'&&[...u.searchParams].length===2&&!u.username&&!u.password&&!u.port;
    const primary=roStatute
      ? url.hostname==='sapl.al.ro.leg.br' && url.pathname===roStatutePath && !url.search && !url.username && !url.password && !url.port && row.source_type==='lei'
      : cfc
      ? url.hostname==='www1.cfc.org.br' && ['/sisweb/SRE/docs/NBCTG27(R4)_rev18.pdf','/sisweb/SRE/docs/NBCTG23(R2)_rev13.pdf'].includes(url.pathname) && !url.search && !url.username && !url.password && !url.port && row.source_type==='outro'
      : matogrosso
      ? url.hostname==='www.al.mt.gov.br' && url.pathname===mtPath && mtQuery(url) && row.source_type==='lei'
      : piaui
      ? url.hostname==='sapl.al.pi.leg.br' && url.pathname==='/ta/59/text' && !url.search && !url.username && !url.password && !url.port && row.source_type==='lei'
      : anvisa
      ? url.hostname==='bvsms.saude.gov.br' && url.pathname==='/bvs/saudelegis/anvisa/2018/rdc0222_28_03_2018.pdf' && !url.search && !url.username && !url.password && !url.port && row.source_type==='outro'
      : rondonia
      ? url.hostname==='www.al.ro.leg.br' && url.pathname==='/downloads/constituicao-do-estado-de-rondonia' && !url.search && row.source_type==='constituicao'
      : pernambuco
      ? url.hostname==='legis.alepe.pe.gov.br' && url.pathname==='/texto.aspx' && /^\d+$/.test(url.searchParams.get('id')||'') && ['TEXTOATUALIZADO','TEXTOORIGINAL'].includes(url.searchParams.get('tipo')) && ['lei','decreto','constituicao'].includes(row.source_type)
      : district
      ? ['sinj.df.gov.br','www.sinj.df.gov.br'].includes(url.hostname) && url.pathname.startsWith('/sinj/Norma/') && ['lei','decreto'].includes(row.source_type)
      : url.hostname==='www.planalto.gov.br' && row.source_type==='lei';
    if (url.protocol!=='https:' || !primary || !row.is_official || row.status!=='vigente' || !row.id || ids.has(row.id) || urls.has(row.url) || !evidence?.reviewed || evidence.url!==row.url || !evidence.path || !/^[a-f0-9]{64}$/.test(evidence.sha256||'') || !row.notes?.includes(evidence.sha256) || !Number.isFinite(Date.parse(row.checked_at)) || Date.parse(row.checked_at)>Date.now() || row.checked_at!==evidence.captured_at) throw Error(district?'Dated individual SINJ district review required':'Dated individual Planalto review required');
    const bytes=await readCapture(evidence.path);
    if (createHash('sha256').update(bytes).digest('hex')!==evidence.sha256 || (roStatute ? bytes.subarray(0,2).toString()!=='PK' : rondonia||anvisa||cfc ? bytes.subarray(0,4).toString()!=='%PDF' : matogrosso ? !bytes.toString('utf8').includes('<turbo-frame id="norma-juridica-compilado-2026-10-17"') : !/<html[\s>]/i.test(bytes.toString('latin1')))) throw Error('Reviewed capture changed');
    if(roStatute){
      const modifiers={1158:'/media/sapl/public/normajuridica/2022/10487/lc_no_1158-22.pdf',5348:'/media/sapl/public/normajuridica/2022/10728/l5348.pdf',1306:'/media/sapl/public/normajuridica/2025/13188/lc1306.pdf'};
      if(!evidence.current_effect_reviewed || evidence.norm!=='LC 68/1992' || evidence.compilation!=='LC 1001/2018' || !row.notes.includes('LC 1306/2025') || !evidence.reviewed_articles?.length || evidence.reviewed_articles.some(a=>!['160','161','163','164','165','181','192'].includes(a)) || JSON.stringify(evidence.amendments?.map(c=>c.num).sort())!==JSON.stringify(Object.keys(modifiers).sort()))throw Error('Scoped LC68 review and later amendments required');
      for(const c of evidence.amendments){
        const u=new URL(c.url),b=await readCapture(c.path);
        if(!c.reviewed || u.protocol!=='https:' || u.hostname!=='sapl.al.ro.leg.br' || u.pathname!==modifiers[c.num] || u.search || u.username || u.password || u.port || createHash('sha256').update(b).digest('hex')!==c.sha256 || b.subarray(0,4).toString()!=='%PDF')throw Error('LC68 official amendment capture changed');
      }
    }
    if(cfc){
      const expectedItems=url.pathname.includes('TG27')?['50','51','53']:['36','38'];
      if(!evidence.current_effect_reviewed || JSON.stringify(evidence.reviewed_articles)!==JSON.stringify(expectedItems) || !evidence.revision31_reviewed || !row.notes.includes('2027'))throw Error('Scoped CFC estimate review and transition required');
      for(const [kind,c] of Object.entries({history:evidence.history_capture,transition:evidence.transition_capture})){
        if(!c?.path || !/^[a-f0-9]{64}$/.test(c.sha256||''))throw Error('CFC history and transition captures required');
        const u=new URL(c.url),b=await readCapture(c.path);
        if(u.protocol!=='https:' || u.hostname!=='www1.cfc.org.br' || u.username || u.password || u.port || createHash('sha256').update(b).digest('hex')!==c.sha256)throw Error('CFC supporting capture changed');
        if(kind==='transition' ? u.pathname!=='/sisweb/SRE/docs/RevisaoNBC31.pdf'||b.subarray(0,4).toString()!=='%PDF' : u.pathname!=='/sisweb/SRE/detalhes_sre.aspx'||u.searchParams.get('codigo')!==(url.pathname.includes('TG27')?'2017/NBCTG27(R4)':'2017/NBCTG23(R2)')||!/em vigor:<\/b>[\s\S]*?<font[^>]*>SIM<\/font>/.test(b.toString('utf8')))throw Error('Official CFC history or transition required');
      }
    }
    if(matogrosso){
      const required=['464','494','540','565','575','597','679','691','694','702','736','737','787','803','831','851','853'];
      if(!evidence.current_effect_reviewed||evidence.norm!=='LC 407/2010'||!row.notes.includes(evidence.norm)||!evidence.reviewed_articles?.length||evidence.reviewed_articles.some(a=>!['2','3','7','8','10','16','19','20','63','141','142','143','144','157'].includes(a))||!Array.isArray(evidence.amendments)||JSON.stringify(evidence.amendments.map(a=>a.num).sort())!==JSON.stringify(required))throw Error('Scoped LC407 review and complete amendment captures required');
      for(const c of evidence.amendments){
        const u=new URL(c.url),b=await readCapture(c.path);
        if(!c.reviewed||u.protocol!=='https:'||u.hostname!=='www.al.mt.gov.br'||!new RegExp('^/norma-juridica/urn:lex:br;mato\\.grosso:estadual:lei\\.complementar:\\d{4}-\\d{2}-\\d{2};'+c.num+'/compilado$').test(u.pathname)||!mtQuery(u)||createHash('sha256').update(b).digest('hex')!==c.sha256||!b.toString('utf8').includes('<turbo-frame'))throw Error('Official amendment evidence changed or unreviewed');
      }
    }
    if(piaui&&(!evidence.current_effect_reviewed||evidence.norm!=='LC 37/2004'||!row.notes.includes(evidence.norm)||!Array.isArray(evidence.reviewed_articles)||!evidence.reviewed_articles.length||evidence.reviewed_articles.some(a=>!['62','63','71'].includes(a))||!bytes.toString('utf8').includes('dptt15181')||!bytes.toString('utf8').includes('Lei Complementar nº 318')))throw Error('Individually reviewed current SAPL PI excerpts required');
    if(anvisa&&(!evidence.current_effect_reviewed||!Array.isArray(evidence.reviewed_articles)||!evidence.reviewed_articles.length||evidence.reviewed_articles.some(a=>!['11','13','43'].includes(a))||evidence.norm!=='RDC 222/2018'||!row.notes.includes(evidence.norm)))throw Error('Individually reviewed RDC 222/2018 excerpts required');
    if(rondonia&&(!evidence.current_effect_reviewed||!Array.isArray(evidence.reviewed_articles)||!evidence.reviewed_articles.length||evidence.compilation!=='EC 179/2026'||!row.notes.includes(evidence.compilation)))throw Error('Individually reviewed current ALE-RO compilation required');
    if(pernambuco){
      const text=bytes.toString('utf8');
      if(!evidence.current_effect_reviewed||!evidence.reviewed_articles?.length||!text.includes('id="divTexto"')||/Página não encontrada/.test(text))throw Error('Reviewed ALEPE legal body required');
      if(url.searchParams.get('tipo')==='TEXTOORIGINAL'){
        const ref=evidence.reference_capture;
        if(!ref?.path||!/^[a-f0-9]{64}$/.test(ref.sha256||''))throw Error('Original ALEPE text requires checked update history');
        const capture=await readCapture(ref.path);
        if(createHash('sha256').update(capture).digest('hex')!==ref.sha256||!capture.toString('utf8').includes('Não consta atualização.'))throw Error('ALEPE update history changed or has amendments');
      }
    }
    ids.add(row.id); urls.add(row.url);
    const current=await request(`content_sources?or=(id.eq.${row.id},url.eq.${encodeURIComponent(row.url)})&select=*`);
    if (current.length) {
      if (current.length!==1 || !sameReviewRow(current[0],row)) throw Error('Existing source metadata must be preserved');
    } else planned.push(row);
  }
  const result={reviewed:pack.items.length,created:0,preserved:pack.items.length-planned.length};
  if(dryRun) return {...result,dry_run:true,pending:planned.length};
  for(const row of planned) {
    // Database URL uniqueness protects against another account inserting after preflight.
    await request('content_sources','POST',row);
    const actual=await request(`content_sources?id=eq.${row.id}&select=*`);
    if(actual.length!==1 || !sameReviewRow(actual[0],row)) throw Error('Source readback mismatch');
    result.created++;
  }
  return result;
}
