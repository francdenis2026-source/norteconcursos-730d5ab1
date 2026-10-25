import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";

export function TestingSeal() {
  if (!TESTING_PHASE) return null;
  return (
    <div role="note" className="home-testing">
      <span className="home-testing__status home-signal">
        <BadgeCheck aria-hidden="true" />
        <strong>Acesso aberto · Fase de testes</strong>
      </span>
      <span className="home-testing__detail">
        Grátis por {TESTING_DAYS} dias com tudo do plano Plus · depois, planos pagos
      </span>
      <a href="#planos" className="home-testing__link">
        Entenda os planos <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}
