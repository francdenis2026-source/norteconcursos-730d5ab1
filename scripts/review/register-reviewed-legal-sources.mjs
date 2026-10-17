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
    const primary=pernambuco
      ? url.hostname==='legis.alepe.pe.gov.br' && url.pathname==='/texto.aspx' && /^\d+$/.test(url.searchParams.get('id')||'') && ['TEXTOATUALIZADO','TEXTOORIGINAL'].includes(url.searchParams.get('tipo')) && ['lei','decreto','constituicao'].includes(row.source_type)
      : district
      ? ['sinj.df.gov.br','www.sinj.df.gov.br'].includes(url.hostname) && url.pathname.startsWith('/sinj/Norma/') && ['lei','decreto'].includes(row.source_type)
      : url.hostname==='www.planalto.gov.br' && row.source_type==='lei';
    if (url.protocol!=='https:' || !primary || !row.is_official || row.status!=='vigente' || !row.id || ids.has(row.id) || urls.has(row.url) || !evidence?.reviewed || evidence.url!==row.url || !evidence.path || !/^[a-f0-9]{64}$/.test(evidence.sha256||'') || !row.notes?.includes(evidence.sha256) || !Number.isFinite(Date.parse(row.checked_at)) || Date.parse(row.checked_at)>Date.now() || row.checked_at!==evidence.captured_at) throw Error(district?'Dated individual SINJ district review required':'Dated individual Planalto review required');
    const bytes=await readCapture(evidence.path);
    if (createHash('sha256').update(bytes).digest('hex')!==evidence.sha256 || !/<html[\s>]/i.test(bytes.toString('latin1'))) throw Error('Reviewed capture changed');
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
