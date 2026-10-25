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

export function LawText({ text }: { text: string }) {
  const parts = React.useMemo(() => splitLawMentions(text), [text]);
  if (parts.length === 1 && !parts[0]!.law) return <>{text}</>;
  return (
    <TooltipProvider delayDuration={120}>
      {parts.map((part, index) =>
        part.law ? (
          <LawMention key={index} law={part.law}>
            {part.text}
          </LawMention>
        ) : (
          <React.Fragment key={index}>{part.text}</React.Fragment>
        ),
      )}
    </TooltipProvider>
  );
}
