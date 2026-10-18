import { PLAN_ROWS, planValue, FAQ } from "@/lib/planPresentation";
import { Link } from "@tanstack/react-router";
import { PlanComparison } from "@/components/landing/PlanComparison";
import { ArrowUpRight, Check, Clock, Info, Minus, Plus } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import {
  PAYMENTS_ENABLED,
  PAYMENTS_NOTICE,
  SOON_LABEL,
  TESTING_DAYS,
  TESTING_PHASE,
  TESTING_TIER,
} from "@/lib/launch.config";

/** Uma foto por plano (do acervo da plataforma), enquadrada no rosto e no assunto de cada cena. */
const PLAN_IMAGES: Record<string, { src: string; position: string }> = {
  free: { src: "/media/hero/painel-aluno-estudo.webp", position: "55% 28%" },
  essential: { src: "/media/hero/exam-hall.webp", position: "90% 32%" },
  plus: { src: "/media/hero/meu-concurso-seguranca-publica.webp", position: "82% 30%" },
  premium: { src: "/media/hero/careers-team.webp", position: "78% 25%" },
};

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
              ? `Por ${TESTING_DAYS} dias, use tudo do plano Plus gratuitamente (só a análise das suas provas é exclusiva do Premium). Depois, sua conta segue no plano Gratuito.`
              : "Escolha o plano que acompanha o seu ritmo de estudo."}
          </p>
        </div>
        <div className="home-plans__grid">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const testing = TESTING_PHASE && plan.id === TESTING_TIER;
            return (
              <article
                key={plan.id}
                className={`home-plan${testing ? " home-plan--featured" : ""}`}
              >
                {PLAN_IMAGES[plan.id] && (
                  <div className="home-plan__media" aria-hidden="true">
                    <img
                      src={PLAN_IMAGES[plan.id]!.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={960}
                      height={640}
                      style={{ objectPosition: PLAN_IMAGES[plan.id]!.position }}
                    />
                  </div>
                )}
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
                {plan.annualPrice ? (
                  <p className="home-plan__annual">
                    ou R$ {plan.annualPrice.toFixed(0)}/ano · 2 meses grátis
                  </p>
                ) : null}
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
                    {PLAN_ROWS.slice(0, 8).map(([key, label]) => {
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
                {plan.price > 0 && !PAYMENTS_ENABLED ? (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="home-button home-button--disabled"
                    title={PAYMENTS_NOTICE}
                  >
                    {SOON_LABEL}
                    <Clock aria-hidden="true" />
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    search={{ mode: "register" }}
                    className={`home-button ${plan.price === 0 ? "home-button--primary" : "home-button--secondary"}`}
                  >
                    {plan.price === 0 ? "Criar conta grátis" : "Começar grátis"}
                    <ArrowUpRight />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
        <PlanComparison />
        {!PAYMENTS_ENABLED && (
          <p className="home-plans__notice" role="note">
            <Info aria-hidden="true" />
            <span>
              Pagamentos ainda não ativados. Os planos Essencial, Plus e Premium serão liberados em
              breve; por enquanto, o acesso é gratuito, em fase de testes.
            </span>
          </p>
        )}
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
