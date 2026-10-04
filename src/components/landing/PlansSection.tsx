import { PLAN_ROWS, planValue, FAQ } from "@/lib/planPresentation";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { PAYMENTS_ENABLED, TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";

export function PlansSection() {
  return (
    <section
      id="planos"
      className="lp-section"
      style={{ background: "var(--ink-deep)" }}
      aria-labelledby="planos-title"
    >
      <div className="lp-container space-y-10">
        <div className="max-w-3xl" data-reveal>
          <span className="lp-kicker">Planos</span>
          <h2 id="planos-title" className="lp-h2">
            Comece grátis. <em>Evolua quando fizer sentido.</em>
          </h2>
          <p className="lp-lead">
            {TESTING_PHASE
              ? `Fase de testes: por ${TESTING_DAYS} dias todo mundo estuda com os recursos do plano Essencial, de graça. Depois, a conta segue no plano Gratuito.`
              : "Escolha o plano que acompanha o seu ritmo de estudo."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {SUBSCRIPTION_PLANS.map((plan) => {
            const testing = TESTING_PHASE && plan.id === "essential";
            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-5 backdrop-blur ${
                  plan.isPopular
                    ? "border-amber-400/60 bg-amber-400/[0.07]"
                    : "border-white/12 bg-white/[0.04]"
                }`}
              >
                {(testing || plan.isPopular) && (
                  <span className="absolute -top-3 left-5 rounded-full bg-amber-400 px-3 py-0.5 text-[0.66rem] font-bold uppercase tracking-wider text-black">
                    {testing ? "Grátis no teste" : "Mais escolhido"}
                  </span>
                )}
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="mt-1 min-h-10 text-sm text-white/65">{plan.description}</p>
                <p className="mt-4 text-3xl font-black text-white">
                  {plan.price === 0 ? "Grátis" : `R$ ${plan.price.toFixed(2).replace(".", ",")}`}
                  {plan.price > 0 && (
                    <span className="text-sm font-medium text-white/55"> /mês</span>
                  )}
                </p>
                {plan.price > 0 && !PAYMENTS_ENABLED && (
                  <p className="mt-1 text-xs text-amber-300">
                    {testing
                      ? `Grátis por ${TESTING_DAYS} dias · cobrança em breve`
                      : "Disponível em breve"}
                  </p>
                )}
                <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                  {PLAN_ROWS.map(([key, label]) => {
                    const v = planValue(key, plan.features[key]);
                    return (
                      <li
                        key={key}
                        className={`flex items-start gap-2 ${v ? "text-white/90" : "text-white/35"}`}
                      >
                        {v ? (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden />
                        ) : (
                          <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                        )}
                        <span>
                          {label}
                          {v && <span className="text-white/60"> · {v}</span>}
                          {!v && <span className="sr-only"> (não incluído)</span>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  to="/auth"
                  search={{ mode: "register" }}
                  className={`${plan.price === 0 || testing ? "btn-brass" : "btn-glass"} mt-6 justify-center`}
                >
                  {plan.price === 0
                    ? "Criar conta grátis"
                    : testing
                      ? "Testar grátis"
                      : "Começar grátis e evoluir depois"}
                  <ArrowRight />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="grid gap-3 md:grid-cols-2" data-reveal>
          {FAQ.map(([q, a]) => (
            <details
              key={q}
              className="group rounded-xl border border-white/12 bg-white/[0.03] p-4 text-white"
            >
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                {q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
