import { BadgeCheck } from "lucide-react";
import { TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";

/** Selo público: a plataforma está aberta e gratuita durante a fase de testes. */
export function TestingSeal() {
  if (!TESTING_PHASE) return null;
  return (
    <div
      role="note"
      className="mb-3 inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-0.5 rounded-full border border-amber-400/45 bg-amber-400/10 py-1.5 pl-2.5 pr-4 backdrop-blur"
    >
      <BadgeCheck className="h-4 w-4 shrink-0 text-amber-400" aria-hidden />
      <strong className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-amber-300">
        Acesso aberto · Fase de testes
      </strong>
      <span className="text-xs text-white/80">
        Grátis por {TESTING_DAYS} dias no plano Essencial · depois, planos pagos
      </span>
    </div>
  );
}
