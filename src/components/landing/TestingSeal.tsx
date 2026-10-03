import { BadgeCheck } from "lucide-react";
import { TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";

/** Selo público: a plataforma está aberta e gratuita durante a fase de testes. */
export function TestingSeal() {
  if (!TESTING_PHASE) return null;
  return (
    <div
      role="note"
      className="mb-3 inline-flex max-w-full items-center gap-3 rounded-xl border border-amber-400/50 bg-amber-400/10 px-3.5 py-2 text-left backdrop-blur"
    >
      <BadgeCheck className="h-6 w-6 shrink-0 text-amber-400" aria-hidden />
      <span className="leading-tight">
        <strong className="block text-xs font-bold uppercase tracking-widest text-amber-300">
          Acesso aberto · Fase de testes
        </strong>
        <span className="text-sm text-white/85">
          Plataforma gratuita por {TESTING_DAYS} dias, no plano Essencial. Depois, planos liberados.
        </span>
      </span>
    </div>
  );
}
