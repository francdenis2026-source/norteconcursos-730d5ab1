import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
            "Confira o resumo e identifique o que vale revisar.",
          label: "Simulado concluído",
        }
      : {
          title: "Boa dedicação: treino concluído.",
          description:
            "Confira seu aproveitamento e escolha o próximo passo.",
          label: "Treinamento concluído",
        };

  return (
    <section
      role="status"
      aria-live="polite"
      aria-label={copy.label}
      className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-emerald-200/80 bg-emerald-50/70 px-3 py-2 dark:border-emerald-900/60 dark:bg-emerald-950/20"
    >
      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
      <p className="min-w-0 flex-1 text-sm leading-5 text-foreground">
        <strong className="font-semibold">{copy.title}</strong>{" "}
        <span className="text-muted-foreground">{copy.description}</span>
      </p>
      <Link
        to={kind === "simulado" ? "/dashboard/mock-exams" : "/dashboard/question-trainer"}
        className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-300"
      >
        {kind === "simulado" ? "Voltar aos simulados" : "Voltar às questões"}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
