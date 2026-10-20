import { useMemo, useState } from "react";
import { LawText } from "@/components/dashboard/LawText";
import { classifySupportBlock, parseSupportLines, reflowParagraphs } from "@/lib/questionText";
import { cn } from "@/lib/utils";

/**
 * Texto de apoio de uma questão, organizado para leitura. Textos de prova trazem numeração de linhas no PDF;
 * ela é separada do texto, e o aluno escolhe entre ler em parágrafos ou ver as linhas numeradas
 * (necessárias quando o enunciado cita "linha 12" ou "linhas 5 a 7").
 */
export function QuestionSupportText({ text, citesLines }: { text: string; citesLines: boolean }) {
  const { lines, numbered } = useMemo(() => parseSupportLines(text), [text]);
  const paragraphs = useMemo(() => reflowParagraphs(lines.map((l) => l.text)), [lines]);
  const [view, setView] = useState<"auto" | "lines" | "flow" | "original">("auto");
  const structured = /```|\t|\|[^\n]+\||(?:^|\n)\s*(?:SELECT |def |function |const |<\/?\w)|[∑∫√]/i.test(text);
  const verse = /poema|poesia|estrofe/i.test(text) && text.includes("\n");
  const mode = view !== "auto" ? view : structured || verse ? "original" : numbered && citesLines ? "lines" : "flow";
  return (
    <div className="space-y-2">
      {(numbered || text.includes("\n")) && (
        <div className="flex flex-wrap items-center gap-2 text-xs" role="group" aria-label="Forma de leitura do texto">
          {([["flow", "Parágrafos"], ...(numbered ? [["lines", "Linhas numeradas"] as const] : []), ["original", "Formatação original"]] as const).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={mode === id} onClick={() => setView(id)} className={cn("rounded-full border px-3 py-1 font-semibold", mode === id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted")}>{label}</button>
          ))}
          {citesLines && mode !== "lines" && <span className="text-muted-foreground">O enunciado cita linhas: use as linhas numeradas.</span>}
        </div>
      )}
      {mode === "original" ? (
        <div lang="pt-BR" className="question-readable overflow-x-auto font-serif">{text}</div>
      ) : mode === "lines" ? (
        <ol lang="pt-BR" className="mx-auto max-w-[72ch] space-y-0.5 font-serif text-[15px] leading-7">
          {lines.map((l, i) => (
            <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-2">
              <span className="select-none text-right font-mono text-[11px] leading-7 text-muted-foreground">{l.n ?? ""}</span>
              <span className="min-w-0 [overflow-wrap:anywhere]">{l.text}</span>
            </li>
          ))}
        </ol>
      ) : (
        <div
          lang="pt-BR"
          className="mx-auto max-w-[68ch] space-y-3 font-serif text-[15px] leading-7 text-foreground sm:text-base sm:leading-8"
        >
          {paragraphs.map((p, i) => {
            const kind = classifySupportBlock(p, i);
            if (kind === "title") return <p key={i} className="pt-1 text-center font-sans text-sm font-bold uppercase tracking-wide">{p}</p>;
            if (kind === "source") return <p key={i} className="text-right font-sans text-xs leading-5 text-muted-foreground">{p}</p>;
            if (kind === "dialogue") return <p key={i} className="pl-4 -indent-2 text-left [overflow-wrap:anywhere]"><LawText text={p} /></p>;
            return <p key={i} className={cn("text-left [overflow-wrap:anywhere]", p.length > 240 && "sm:text-justify sm:[hyphens:auto] sm:[text-wrap:pretty]")}><LawText text={p} /></p>;
          })}
        </div>
      )}
    </div>
  );
}
