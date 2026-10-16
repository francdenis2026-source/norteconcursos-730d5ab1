import { BadgeCheck } from "lucide-react";
import { TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";

/** Selo público: a plataforma está aberta e gratuita durante a fase de testes. */
export function TestingSeal() {
  if (!TESTING_PHASE) return null;
  return (
    <div role="note" className="hp-note">
      <BadgeCheck aria-hidden />
      <div>
        <strong>Acesso aberto · Fase de testes</strong>
        <span>Grátis por {TESTING_DAYS} dias no plano Essencial, depois planos pagos.</span>
      </div>
    </div>
  );
}
