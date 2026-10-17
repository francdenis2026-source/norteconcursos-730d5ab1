import { PLAN_ROWS, planValue, FAQ } from "@/lib/planPresentation";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { PAYMENTS_ENABLED, TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";

export function PlansSection() {
  return (
    <section id="planos" className="home-section home-plans" aria-labelledby="planos-title">
      <div className="home-container">
        <div className="home-heading">
          <span className="home-eyebrow">Seu ritmo. Seu plano.</span>
          <h2 id="planos-title">
            Comece grátis.
            <br />
            <em>Evolua quando fizer sentido.</em>
          </h2>
          <p>
            {TESTING_PHASE
              ? `Por ${TESTING_DAYS} dias, estude com os recursos do plano Essencial gratuitamente. Depois, sua conta segue no plano Gratuito.`
              : "Escolha o plano que acompanha o seu ritmo de estudo."}
          </p>
        </div>
        <div className="home-plans__grid">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const testing = TESTING_PHASE && plan.id === "essential";
            return (
              <article
                key={plan.id}
                className={`home-plan${testing ? " home-plan--featured" : ""}`}
              >
                <div className="home-plan__top">
                  <h3>{plan.name}</h3>
                  {(testing || plan.isPopular) && (
                    <span className="home-tag">
                      {testing ? "Grátis no teste" : "Mais escolhido"}
                    </span>
                  )}
                </div>
                <p className="home-plan__description">{plan.description}</p>
                <p className="home-plan__price">
                  {plan.price === 0 ? (
                    "Grátis"
                  ) : (
                    <>
                      <span>R$</span> {plan.price.toFixed(2).replace(".", ",")}
                      <small>/mês</small>
                    </>
                  )}
                </p>
                <p className="home-plan__availability">
                  {plan.price === 0
                    ? "Para começar e continuar estudando"
                    : !PAYMENTS_ENABLED
                      ? testing
                        ? `Grátis por ${TESTING_DAYS} dias · cobrança em breve`
                        : "Disponível em breve"
                      : "Escolha o plano ideal para você"}
                </p>
                <details className="home-plan__features">
                  <summary>
                    O que está incluído
                    <Plus aria-hidden="true" />
                  </summary>
                  <ul>
                    {PLAN_ROWS.slice(0, 6).map(([key, label]) => {
                      const value = planValue(key, plan.features[key]);
                      return (
                        <li key={key} className={value ? "" : "is-unavailable"}>
                          {value ? <Check aria-hidden="true" /> : <Minus aria-hidden="true" />}
                          <span>
                            {label}
                            {value && <small> · {value}</small>}
                            {!value && <span className="sr-only"> (não incluído)</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </details>
                <Link
                  to="/auth"
                  search={{ mode: "register" }}
                  className={`home-button ${plan.price === 0 || testing ? "home-button--primary" : "home-button--secondary"}`}
                >
                  {plan.price === 0
                    ? "Criar conta grátis"
                    : testing
                      ? "Testar grátis"
                      : "Começar grátis"}
                  <ArrowUpRight />
                </Link>
              </article>
            );
          })}
        </div>
        <div className="home-faq">
          <div>
            <span className="home-eyebrow">Sem dúvidas no caminho</span>
            <h3>Antes de começar</h3>
          </div>
          <div className="home-faq__list">
            {FAQ.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <Plus aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
