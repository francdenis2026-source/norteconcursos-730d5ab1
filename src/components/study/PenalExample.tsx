import { Lightbulb } from "lucide-react";
import type { PenalExample as Example } from "@/lib/penalExamples";

export function PenalExample({
  example,
  source = "cp",
}: {
  example: Example;
  source?: "cp" | "lep" | "execution";
}) {
  return (
    <article className="min-w-0 rounded-2xl border border-cyan-200 bg-cyan-50/50 p-4 dark:border-cyan-900 dark:bg-cyan-950/20">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cyan-800 dark:text-cyan-200">
        <Lightbulb aria-hidden className="h-4 w-4" />
        Exemplo com seus dados
      </p>
      <h3 className="mt-2 text-sm font-bold">{example.title}</h3>
      <p className="mt-2 text-sm leading-6">{example.scenario}</p>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
        {example.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p className="mt-3 rounded-xl bg-background/70 p-3 text-sm font-semibold">
        {example.conclusion}
      </p>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">{example.caution}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-xs">
        {source !== "lep" && (
          <a
            href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Conferir no Código Penal
          </a>
        )}
        {source !== "cp" && (
          <a
            href="https://www.planalto.gov.br/ccivil_03/leis/l7210.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Conferir na LEP
          </a>
        )}
      </div>
    </article>
  );
}
