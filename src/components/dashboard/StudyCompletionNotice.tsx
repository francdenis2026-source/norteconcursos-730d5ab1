import { CheckCircle2 } from "lucide-react";

type StudyCompletionNoticeProps = {
  kind: "simulado" | "trainer";
};

/**
 * Mensagem breve e consistente exibida quando o estudante conclui uma etapa.
 * Não pressupõe que o resultado já foi salvo: a tela de cada fluxo informa isso.
 */
export function StudyCompletionNotice({ kind }: StudyCompletionNoticeProps) {
  const copy =
    kind === "simulado"
      ? {
          title: "Parabéns por concluir o simulado.",
          description:
            "Seu próximo passo é transformar o resultado em aprendizado. Confira o resumo abaixo e identifique o que vale revisar.",
          label: "Simulado concluído",
        }
      : {
          title: "Boa dedicação: treino concluído.",
          description:
            "Cada sessão ajuda a construir consistência. Confira seu aproveitamento e escolha o melhor próximo passo para continuar.",
          label: "Treinamento concluído",
        };

  return (
    <section
      role="status"
      aria-live="polite"
      aria-label={copy.label}
      className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20"
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-5 text-foreground">{copy.title}</p>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{copy.description}</p>
      </div>
    </section>
  );
}
