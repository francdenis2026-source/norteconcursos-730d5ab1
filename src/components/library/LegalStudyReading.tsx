import { useEffect, useState } from "react";
import { legalTextParts, LEGAL_HIGHLIGHT_LABELS, type LegalHighlightKind } from "@/lib/legalHighlights";
import { Markdown } from "./Markdown";
import { LegalRefText } from "./LegalRefText";
import { paragraphMatches } from "@/lib/legalRefs";

export function LegalStudyText({text}: {text:string}) {
  return <>{legalTextParts(text).map((part,index)=>part.kind
    ? <mark key={index} className={`legal-highlight legal-highlight-${part.kind}`} title={LEGAL_HIGHLIGHT_LABELS[part.kind]}>{part.text}</mark>
    : <LegalRefText key={index} text={part.text}/>)}</>;
}

/** Shared by every legal course, annex and legal guide; source stays untouched. */
export function LegalStudyReading({source,markdown=false,highlightPar}: {source:string;markdown?:boolean;highlightPar?:string|undefined}) {
  const [highlighted,setHighlighted]=useState(true);
  // link com ?par=16: leva o olho direto ao parágrafo citado
  useEffect(()=>{ if(highlightPar) document.querySelector('[data-par-hit]')?.scrollIntoView({block:'center',behavior:'smooth'}); },[highlightPar,source]);
  return <section className="space-y-3" aria-label="Leitura com grifos de estudo">
    <div className="legal-highlight-controls no-print">
      <button type="button" aria-pressed={highlighted} className="cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold" onClick={()=>setHighlighted(value=>!value)}>{highlighted?"Grifos ativados · desativar":"Ativar grifos de estudo"}</button>
      {highlighted&&<ul className="flex flex-wrap gap-2 text-xs" aria-label="Legenda dos grifos">{(Object.keys(LEGAL_HIGHLIGHT_LABELS) as LegalHighlightKind[]).map(kind=><li key={kind}><span className={`legal-highlight legal-highlight-${kind}`}>{LEGAL_HIGHLIGHT_LABELS[kind]}</span></li>)}</ul>}
      <p className="text-xs text-muted-foreground">Grifos automáticos de apoio à leitura. Leia o contexto inteiro e tente explicar a regra sem consultar.</p>
    </div>
    {markdown?<Markdown source={source} renderText={highlighted?text=><LegalStudyText text={text}/>:undefined}/>:<div className="space-y-4 break-words text-base leading-8">{source.split(/\n{2,}/).map((para,i)=>{const hit=!!highlightPar&&paragraphMatches(para,highlightPar);return <p key={i} {...(hit?{"data-par-hit":"true"}:{})} className={`whitespace-pre-wrap ${hit?"-mx-2 rounded-xl bg-amber-100 px-2 py-1 ring-2 ring-amber-400 dark:bg-amber-500/20":""}`}>{highlighted?<LegalStudyText text={para}/>:<LegalRefText text={para}/>}</p>;})}</div>}
  </section>;
}
