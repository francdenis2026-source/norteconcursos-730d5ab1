// Texto de questão com as leis citadas pelo número destacadas: ao passar o mouse (ou tocar / focar com o
// teclado) aparece um cartão com o nome da lei. Só identifica a norma (src/lib/lawNames.ts).
import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { lawTitle, splitLawMentions, type LawName } from "@/lib/lawNames";

function LawIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-primary"
    >
      <path d="M16 4v22M9 26h14" />
      <path d="M6 9h20" />
      <path d="M6 9l-4 9a4.5 4.5 0 0 0 8 0L6 9z" />
      <path d="M26 9l-4 9a4.5 4.5 0 0 0 8 0L26 9z" />
      <circle cx="16" cy="6" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LawMention({ law, children }: { law: LawName; children: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Tooltip open={open} onOpenChange={setOpen} delayDuration={120}>
      <TooltipTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          data-law={`${law.kind}:${law.number}`}
          aria-label={`${children}: ${law.name}`}
          onClick={() => setOpen((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen((value) => !value);
            }
          }}
          className="cursor-help rounded-sm underline decoration-primary/60 decoration-dotted underline-offset-4 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[18rem] border bg-popover p-3 text-left text-popover-foreground shadow-lg"
      >
        <div className="flex items-start gap-3">
          <LawIcon />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {lawTitle(law)}
            </p>
            <p className="mt-0.5 text-sm font-semibold leading-snug">{law.name}</p>
            <p className="mt-1.5 text-[11px] leading-4 text-muted-foreground">
              Identificação da norma citada. Confira a redação vigente na fonte oficial.
            </p>
            {law.sourceUrl && (
              <a
                href={law.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-1 inline-block text-[11px] font-medium text-primary underline"
              >
                Abrir no Planalto
              </a>
            )}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

// Algumas questões (ex.: substituição de sinônimo com o termo sublinhado no enunciado) só fazem
// sentido com sublinhado/negrito/itálico preservados. O texto de uma questão nunca é HTML completo
// (sem dangerouslySetInnerHTML): reconhecemos só estas tags fechadas corretamente — <u>, <b>/<strong>,
// <i>/<em> — e a marcação **negrito**, e renderizamos como elementos React de verdade.
type MarkupSegment = { tag: "u" | "b" | "i" | null; text: string };
const MARKUP_RE =
  /<u>([\s\S]*?)<\/u>|<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>|<(?:i|em)>([\s\S]*?)<\/(?:i|em)>|\*\*([^*]+?)\*\*/gi;

function splitMarkup(text: string): MarkupSegment[] {
  const segments: MarkupSegment[] = [];
  let last = 0;
  MARKUP_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = MARKUP_RE.exec(text))) {
    if (match.index > last) segments.push({ tag: null, text: text.slice(last, match.index) });
    const [, u, b, i, bold] = match;
    segments.push({ tag: u !== undefined ? "u" : b !== undefined || bold !== undefined ? "b" : "i", text: u ?? b ?? i ?? bold ?? "" });
    last = MARKUP_RE.lastIndex;
  }
  if (last < text.length) segments.push({ tag: null, text: text.slice(last) });
  return segments;
}

function LawAwareText({ text }: { text: string }) {
  const parts = React.useMemo(() => splitLawMentions(text), [text]);
  if (parts.length === 1 && !parts[0]!.law) return <>{text}</>;
  return (
    <>
      {parts.map((part, index) =>
        part.law ? (
          <LawMention key={index} law={part.law}>
            {part.text}
          </LawMention>
        ) : (
          <React.Fragment key={index}>{part.text}</React.Fragment>
        ),
      )}
    </>
  );
}

export function LawText({ text }: { text: string }) {
  const segments = React.useMemo(() => splitMarkup(text), [text]);
  return (
    <TooltipProvider delayDuration={120}>
      {segments.map((segment, index) => {
        const inner = <LawAwareText key={index} text={segment.text} />;
        if (segment.tag === "u") return <u key={index}>{inner}</u>;
        if (segment.tag === "b") return <strong key={index}>{inner}</strong>;
        if (segment.tag === "i") return <em key={index}>{inner}</em>;
        return <React.Fragment key={index}>{inner}</React.Fragment>;
      })}
    </TooltipProvider>
  );
}
