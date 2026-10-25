// Texto de questão (enunciado, alternativa, comentário) com a disposição certa para cada conteúdo.
// A regra de layout fica em questionTextLayout(); o estilo, em .q-text (src/styles.css).
import { LawText } from "@/components/dashboard/LawText";
import "@/styles/reading-typography.css";
import * as React from "react";
import { questionTextLayout } from "@/lib/questionText";
import { cn } from "@/lib/utils";

export function QuestionProse({
  text,
  as: Tag = "p",
  className,
  layout,
}: {
  text: string;
  as?: "p" | "span" | "div";
  className?: string;
  /** Alternativas e itens curtos forçam "short" para nunca serem justificados. */
  layout?: "short";
}) {
  const kind = React.useMemo(() => layout ?? questionTextLayout(text), [layout, text]);
  return (
    <Tag lang="pt-BR" data-layout={kind} className={cn("q-text", className)}>
      <LawText text={text} />
    </Tag>
  );
}
