import { useEffect, useRef, useState } from "react";
import "@/styles/reading-typography.css";
import { legalTextParts, LEGAL_HIGHLIGHT_LABELS, type LegalHighlightKind } from "@/lib/legalHighlights";
import { Markdown } from "./Markdown";
import { LegalRefText } from "./LegalRefText";
import { paragraphMatches } from "@/lib/legalRefs";
import { libraryMatchParts } from "@/lib/librarySearch";

export function LegalStudyText({text}: {text:string}) {
  return <>{legalTextParts(text).map((part,index)=>part.kind
    ? <mark key={index} className={`legal-highlight legal-highlight-${part.kind}`} title={LEGAL_HIGHLIGHT_LABELS[part.kind]}>{part.text}</mark>
    : <LegalRefText key={index} text={part.text}/>)}</>;
}

export function LegalSearchText({text, query, highlighted}: {text: string; query?: string | undefined; highlighted: boolean}) {
  const read = (value: string) => highlighted ? <LegalStudyText text={value} /> : <LegalRefText text={value} />;
  return query ? <>{libraryMatchParts(text, query).map((part, i) => part.match
    ? <mark key={i} data-search-hit="true" className="library-search-match">{part.text}</mark>
    : <span key={i}>{read(part.text)}</span>)}</> : read(text);
}

/** Shared by every legal course, annex and legal guide; source stays untouched. */
export function LegalStudyReading({source,markdown=false,highlightPar,searchQuery}: {source:string;markdown?:boolean;highlightPar?:string|undefined;searchQuery?:string|undefined}) {
  const [highlighted,setHighlighted]=useState(true);
  const reading = useRef<HTMLElement>(null);
  // link com ?par=16: leva o olho direto ao parágrafo citado
  useEffect(()=>{ if(highlightPar) document.querySelector('[data-par-hit]')?.scrollIntoView({block:'center',behavior:'smooth'}); },[highlightPar,source]);
  useEffect(() => { if (searchQuery && !highlightPar) reading.current?.querySelector('[data-search-hit]')?.scrollIntoView({block:'center',behavior:'smooth'}); }, [searchQuery, source, highlightPar]);
  return <section ref={reading} className="legal-reading-surface space-y-3" aria-label="Leitura com grifos de estudo">
    <div className="legal-highlight-controls no-print">
      <button type="button" aria-pressed={highlighted} className="cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold" onClick={()=>setHighlighted(value=>!value)}>{highlighted?"Grifos ativados · desativar":"Ativar grifos de estudo"}</button>
      {highlighted&&<ul className="flex flex-wrap gap-2 text-xs" aria-label="Legenda dos grifos">{(Object.keys(LEGAL_HIGHLIGHT_LABELS) as LegalHighlightKind[]).map(kind=><li key={kind}><span className={`legal-highlight legal-highlight-${kind}`}>{LEGAL_HIGHLIGHT_LABELS[kind]}</span></li>)}</ul>}
      <p className="text-xs text-muted-foreground">Grifos automáticos de apoio à leitura. Leia o contexto inteiro e tente explicar a regra sem consultar.</p>
    </div>
    {markdown?<Markdown source={source} renderText={text=><LegalSearchText text={text} query={searchQuery} highlighted={highlighted}/>} />:<div className="reading-text legal-reading-prose break-words">{source.split(/\n{2,}/).map((para,i)=>{const hit=!!highlightPar&&paragraphMatches(para,highlightPar);return <p key={i} {...(hit?{"data-par-hit":"true"}:{})} className={`legal-reading-paragraph ${hit?"-mx-2 rounded-xl bg-amber-100 px-2 py-1 ring-2 ring-amber-400 dark:bg-amber-500/20":""}`}>{<LegalSearchText text={para} query={searchQuery} highlighted={highlighted}/>}</p>;})}</div>}
  </section>;
}
