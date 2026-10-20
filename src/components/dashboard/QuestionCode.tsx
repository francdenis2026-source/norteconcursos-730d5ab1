import { Copy } from "lucide-react";
import { toast } from "sonner";
import { questionCode, type QuestionReference } from "@/lib/questionIdentity";

export function QuestionCode({ question }: { question: QuestionReference }) {
  const code = questionCode(question);
  return (
    <button
      type="button"
      className="my-2 flex min-h-11 max-w-full items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-left text-xs text-foreground hover:bg-muted"
      aria-label={`Copiar código da questão ${code}`}
      onClick={() => void navigator.clipboard.writeText(code).then(
        () => toast.success("Código da questão copiado."),
        () => toast.error("Não foi possível copiar. Selecione o código exibido."),
      )}
    >
      <span className="min-w-0 break-all font-mono">{code}</span>
      <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </button>
  );
}
