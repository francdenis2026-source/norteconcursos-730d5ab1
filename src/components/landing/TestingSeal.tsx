import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";

export function TestingSeal() {
  if (!TESTING_PHASE) return null;
  return (
    <div role="note" className="home-testing">
      <BadgeCheck aria-hidden="true" />
      <p>
        <strong>Acesso aberto · Fase de testes</strong>
        <span>Grátis por {TESTING_DAYS} dias com tudo do plano Plus · depois, planos pagos</span>
      </p>
      <a href="#planos">
        Entenda os planos <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}
