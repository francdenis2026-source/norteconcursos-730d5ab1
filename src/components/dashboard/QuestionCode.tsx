// Código permanente da questão, com cópia em um toque. Serve para o aluno
// informar exatamente qual item tem problema (ver src/lib/questionIdentity.ts).
import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function QuestionCode({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  if (!code) return null;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Navegadores sem permissão de área de transferência: seleção manual do texto.
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
        toast.error("Não foi possível copiar. Selecione e copie o código manualmente.");
        return;
      }
    }
    setCopied(true);
    toast.success(`Código ${code} copiado.`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={() => void copy()}
      title="Copiar o código desta questão"
      aria-label={`Código da questão ${code}. Toque para copiar.`}
      data-question-code={code}
      className={cn(
        "inline-flex min-h-7 items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] font-semibold tracking-wide text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      <span className="select-all">{code}</span>
      {copied ? (
        <Check className="h-3 w-3 text-emerald-600" aria-hidden="true" />
      ) : (
        <Copy className="h-3 w-3" aria-hidden="true" />
      )}
    </button>
  );
}
