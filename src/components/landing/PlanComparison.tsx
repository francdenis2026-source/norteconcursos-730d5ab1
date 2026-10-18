import { Check, Minus } from "lucide-react";
import { PLAN_ROWS, planValue } from "@/lib/planPresentation";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { TESTING_DAYS, TESTING_PHASE, TESTING_TIER } from "@/lib/launch.config";

/** Tabela lado a lado: mostra de uma vez o que muda de um plano para o outro. */
export function PlanComparison() {
  return (
    <div className="home-compare" role="region" aria-label="Comparação entre os planos" tabIndex={0}>
      <table>
        <caption>Compare os planos</caption>
        <thead>
          <tr>
            <th scope="col">Recurso</th>
            {SUBSCRIPTION_PLANS.map((plan) => (
              <th key={plan.id} scope="col" className={plan.id === TESTING_TIER ? "is-trial" : undefined}>
                {plan.name}
                {TESTING_PHASE && plan.id === TESTING_TIER && (
                  <small>grátis por {TESTING_DAYS} dias</small>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PLAN_ROWS.map(([key, label]) => (
            <tr key={key}>
              <th scope="row">{label}</th>
              {SUBSCRIPTION_PLANS.map((plan) => {
                const value = planValue(key, plan.features[key]);
                return (
                  <td key={plan.id} className={plan.id === TESTING_TIER ? "is-trial" : undefined}>
                    {value ? (
                      <>
                        <Check aria-hidden="true" />
                        <span>{value === "Incluído" ? <span className="sr-only">Incluído</span> : value}</span>
                      </>
                    ) : (
                      <>
                        <Minus aria-hidden="true" />
                        <span className="sr-only">Não incluído</span>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
