import { PoliceInsignia } from "@/components/brand/PoliceInsignia";
import { HomeRail } from "@/components/landing/HomeRail";
import { PLAN_ROWS, planValue, FAQ } from "@/lib/planPresentation";
import { Link } from "@tanstack/react-router";
import { PlanComparison } from "@/components/landing/PlanComparison";
import { ArrowUpRight, Check, ChevronDown, Clock, Info, Minus, Plus } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import {
  PAYMENTS_ENABLED,
  PAYMENTS_NOTICE,
  SOON_LABEL,
  TESTING_DAYS,
  TESTING_PHASE,
  TESTING_TIER,
} from "@/lib/launch.config";
import { Hint } from "@/components/ui/hint";

/** Uma foto por plano (do acervo da plataforma), enquadrada no rosto e no assunto de cada cena. */
const PLAN_IMAGES: Record<
  string,
  { src: string; position: string; width?: number; height?: number }
> = {
  free: { src: "/media/hero/pro/plano-1.webp", position: "50% 42%", width: 1200, height: 500 },
  essential: { src: "/media/hero/pro/plano-2.webp", position: "70% 40%", width: 1200, height: 500 },
  plus: {
    src: "/media/hero/pro/plano-3.webp",
    position: "72% 40%",
    width: 1200,
    height: 500,
  },
  premium: {
    src: "/media/hero/pro/plano-4.webp",
    position: "50% 42%",
    width: 1200,
    height: 500,
  },
};

export function PlansSection() {
  return (
    <section
      id="planos"
      className="home-section home-plans home-plans--insignia"
      aria-labelledby="planos-title"
    >
      <div className="home-container">
        <div className="home-plans__intro">
          <div className="home-heading">
            <span className="home-eyebrow home-signal">Seu ritmo. Seu plano.</span>
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
          <aside className="home-plans__signal" aria-label="Condições do teste gratuito">
            <PoliceInsignia
              className="home-plans__insignia"
              alt=""
              width={96}
              height={116}
              loading="lazy"
              decoding="async"
            />
            <span className="home-plans__signal-icon">
              <Clock aria-hidden="true" />
            </span>
            <div>
              <strong>
                {TESTING_PHASE ? `${TESTING_DAYS} dias para testar` : "Planos para cada fase"}
              </strong>
              <p>
                <Check aria-hidden="true" /> Sem cartão e sem cobrança durante o teste
              </p>
              <p>
                <Check aria-hidden="true" /> Estude no seu ritmo e mude quando quiser
              </p>
            </div>
          </aside>
        </div>
        <HomeRail className="home-plans__grid" label="Planos de estudo">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const testing = TESTING_PHASE && plan.id === TESTING_TIER;
            return (
              <article
                key={plan.id}
                data-plan={plan.id}
                className={`home-plan${testing ? " home-plan--featured" : ""}`}
              >
                {PLAN_IMAGES[plan.id] && (
                  <div className="home-plan__media" aria-hidden="true">
                    <img
                      src={PLAN_IMAGES[plan.id]!.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={PLAN_IMAGES[plan.id]!.width ?? 960}
                      height={PLAN_IMAGES[plan.id]!.height ?? 640}
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
                <p className="home-plan__annual" aria-hidden={!plan.annualPrice}>
                  {plan.annualPrice
                    ? `ou R$ ${plan.annualPrice.toFixed(0)}/ano · 2 meses grátis`
                    : ""}
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
                  <Hint content={PAYMENTS_NOTICE}>
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="home-button home-button--disabled"
                    >
                      {SOON_LABEL}
                      <Clock aria-hidden="true" />
                    </button>
                  </Hint>
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
        </HomeRail>
        <details className="home-plan-comparison">
          <summary>
            <span>
              Compare todos os recursos<span>Veja o que muda entre os planos</span>
            </span>
            <ChevronDown aria-hidden="true" />
          </summary>
          <PlanComparison />
        </details>
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
          <div className="home-faq__intro">
            <span className="home-eyebrow home-signal">Sem dúvidas no caminho</span>
            <h3>Antes de começar</h3>
            <div className="home-faq__scene" aria-hidden="true">
              <img
                className="home-faq__art"
                src="/media/hero/faq-agentes-recorte.webp"
                alt=""
                width={1000}
                height={816}
                loading="lazy"
                decoding="async"
              />
            </div>
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
