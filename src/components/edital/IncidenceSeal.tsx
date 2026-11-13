import { ShieldCheck } from "lucide-react";
import { TIER_STYLE } from "@/lib/editalRadar";
import { SEAL_LABEL, type Incidence } from "@/lib/topicIncidence";
import { cn } from "@/lib/utils";

/** Selo da chance de o assunto cair na prova. Toque/clique mostra a base da estimativa (funciona no celular). */
export function IncidenceSeal({
  incidence,
  expanded,
  onToggle,
  edital,
}: {
  incidence: Incidence;
  expanded: boolean;
  onToggle: () => void;
  /** Nome do edital, quando o selo aparece fora da página do próprio edital. */
  edital?: string;
}) {
  // Matéria sem base suficiente: não há o que indicar assunto a assunto.
  if (incidence.tier === "amostra") return null;
  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-label={`${edital ? `${edital}: ` : ""}${SEAL_LABEL[incidence.tier]}. ${expanded ? "Ocultar" : "Ver"} a base da estimativa`}
      onClick={(event) => {
        // O selo fica dentro de um item expansível: tocar nele não deve abrir nem fechar o item.
        event.preventDefault();
        event.stopPropagation();
        onToggle();
      }}
      className={cn(
        "incidence-seal inline-flex items-center gap-1 rounded-full border border-current/20 px-2.5 py-0.5 text-[11px] font-bold leading-none",
        TIER_STYLE[incidence.tier],
      )}
    >
      {incidence.tier !== "nunca" && <ShieldCheck aria-hidden="true" className="h-3 w-3" />}
      {edital ? `${edital} · ` : ""}
      {SEAL_LABEL[incidence.tier]}
    </button>
  );
}
