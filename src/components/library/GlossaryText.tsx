import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { annotate, type GlossaryEntry } from "@/lib/glossary";

function Term({ entry, children }: { entry: GlossaryEntry; children: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen} delayDuration={150}>
      <TooltipTrigger asChild>
        <button type="button" onClick={() => setOpen((v) => !v)} className="cursor-help rounded-sm border-0 bg-transparent p-0 font-inherit text-inherit underline decoration-dotted decoration-primary/70 underline-offset-4 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" aria-label={`${children}: ver significado`}>
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs space-y-1.5 border bg-popover p-3 text-left text-popover-foreground shadow-lg">
        <p className="text-sm font-semibold">{entry.term}{entry.area ? <span className="ml-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{entry.area}</span> : null}</p>
        <p className="text-xs leading-5">{entry.meaning}</p>
        {entry.synonyms?.length ? <p className="text-xs"><span className="font-semibold">Também: </span>{entry.synonyms.join(", ")}</p> : null}
        {entry.example ? <p className="text-xs italic text-muted-foreground">Ex.: {entry.example}</p> : null}
        <Link to="/dashboard/dicionario" search={{ q: entry.term } as never} className="inline-block text-xs font-medium text-primary underline">Abrir no dicionário</Link>
      </TooltipContent>
    </Tooltip>
  );
}

/** Texto comum com verbetes do dicionário sublinhados; ao passar o mouse (ou tocar) mostra significado, sinônimos e exemplo. */
export function GlossaryText({ text }: { text: string }) {
  const parts = useMemo(() => annotate(text), [text]);
  if (parts.length === 1 && !parts[0]!.entry) return <>{text}</>;
  return (
    <TooltipProvider>
      {parts.map((p, i) => (p.entry ? <Term key={i} entry={p.entry}>{p.text}</Term> : <span key={i}>{p.text}</span>))}
    </TooltipProvider>
  );
}
