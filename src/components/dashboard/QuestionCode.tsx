// Código permanente da questão, com cópia em um toque. Serve para o aluno
// informar exatamente qual item tem problema (ver src/lib/questionIdentity.ts).
import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { questionCode, type QuestionReference } from "@/lib/questionIdentity";
import { cn } from "@/lib/utils";

export function QuestionCode({
  question,
  className,
}: {
  question: QuestionReference;
  className?: string;
}) {
  const code = questionCode(question);
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Navegadores sem permissão de área de transferência: cópia por seleção temporária.
      const field = document.createElement("textarea");
      field.value = code;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      field.remove();
      if (!ok) {
        toast.error("Não foi possível copiar. Selecione o código exibido.");
        return;
      }
    }
    setCopied(true);
    toast.success("Código da questão copiado.");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={() => void copy()}
      title="Copiar o código desta questão"
      aria-label={`Copiar código da questão ${code}`}
      data-question-code={code}
      className={cn(
        "my-1 flex min-h-11 max-w-full items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-left text-xs text-foreground transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      <span className="min-w-0 break-all font-mono">{code}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      )}
    </button>
  );
}
