import { useState } from "react";
import { legalTextParts, LEGAL_HIGHLIGHT_LABELS, type LegalHighlightKind } from "@/lib/legalHighlights";
import { Markdown } from "./Markdown";

export function LegalStudyText({text}: {text:string}) {
  return <>{legalTextParts(text).map((part,index)=>part.kind
    ? <mark key={index} className={`legal-highlight legal-highlight-${part.kind}`} title={LEGAL_HIGHLIGHT_LABELS[part.kind]}>{part.text}</mark>
    : part.text)}</>;
}

/** Shared by every legal course, annex and legal guide; source stays untouched. */
export function LegalStudyReading({source,markdown=false}: {source:string;markdown?:boolean}) {
  const [highlighted,setHighlighted]=useState(true);
  return <section className="space-y-3" aria-label="Leitura com grifos de estudo">
    <div className="legal-highlight-controls no-print">
      <button type="button" aria-pressed={highlighted} className="cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold" onClick={()=>setHighlighted(value=>!value)}>{highlighted?"Grifos ativados · desativar":"Ativar grifos de estudo"}</button>
      {highlighted&&<ul className="flex flex-wrap gap-2 text-xs" aria-label="Legenda dos grifos">{(Object.keys(LEGAL_HIGHLIGHT_LABELS) as LegalHighlightKind[]).map(kind=><li key={kind}><span className={`legal-highlight legal-highlight-${kind}`}>{LEGAL_HIGHLIGHT_LABELS[kind]}</span></li>)}</ul>}
      <p className="text-xs text-muted-foreground">Grifos automáticos de apoio à leitura. Leia o contexto inteiro e tente explicar a regra sem consultar.</p>
    </div>
    {markdown?<Markdown source={source} renderText={highlighted?text=><LegalStudyText text={text}/>:undefined}/>:<div className="whitespace-pre-wrap break-words text-base leading-8">{highlighted?<LegalStudyText text={source}/>:source}</div>}
  </section>;
}
