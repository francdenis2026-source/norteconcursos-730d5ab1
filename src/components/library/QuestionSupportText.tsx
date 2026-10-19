import { useMemo, useState } from "react";
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
  const [view, setView] = useState<"auto" | "lines" | "flow">("auto");
  const mode = numbered ? (view === "auto" ? (citesLines ? "lines" : "flow") : view) : "flow";
  return (
    <div className="space-y-2">
      {numbered && (
        <div className="flex flex-wrap items-center gap-2 text-xs" role="group" aria-label="Forma de leitura do texto">
          {([["flow", "Parágrafos"], ["lines", "Linhas numeradas"]] as const).map(([id, label]) => (
            <button key={id} type="button" aria-pressed={mode === id} onClick={() => setView(id)} className={cn("rounded-full border px-3 py-1 font-semibold", mode === id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted")}>{label}</button>
          ))}
          {citesLines && mode !== "lines" && <span className="text-muted-foreground">O enunciado cita linhas: use as linhas numeradas.</span>}
        </div>
      )}
      {mode === "lines" ? (
        <ol lang="pt-BR" className="mx-auto max-w-[72ch] space-y-0.5 font-serif text-[15px] leading-7">
          {lines.map((l, i) => (
            <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-2">
              <span className="select-none text-right font-mono text-[11px] leading-7 text-muted-foreground">{l.n ?? ""}</span>
              <span>{l.text}</span>
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
            if (kind === "dialogue") return <p key={i} className="pl-6 -indent-3 text-justify [hyphens:auto]">{p}</p>;
            return <p key={i} className="indent-8 text-justify [hyphens:auto] [text-wrap:pretty]">{p}</p>;
          })}
        </div>
      )}
    </div>
  );
}
