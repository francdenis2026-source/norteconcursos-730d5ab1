import { cn } from "@/lib/utils";

/** Plain text stays plain text; preserve lists, verse, formulas and indentation. */
export function QuestionText({ text, className }: { text: string; className?: string }) {
  return <div lang="pt-BR" className={cn("question-readable", className)}>{text}</div>;
}
