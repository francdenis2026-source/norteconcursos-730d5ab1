import { Link } from "@tanstack/react-router";
import { ArrowRight, Gift, Crown, Gem, ShieldCheck, Target } from "lucide-react";
import { HomeIntro } from "@/components/landing/HomeIntro";
import { ContestShowcase } from "@/components/landing/ContestShowcase";
import { HomeRankingShowcase } from "@/components/landing/HomeRankingShowcase";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { TESTING_LABEL, TESTING_PHASE } from "@/lib/launch.config";

export function MobileHomepage() {
  return (
    <main className="mobile-homepage mobile-homepage--recomposed" id="conteudo-mobile" tabIndex={-1} aria-label="Norte Concursos para celular">
      <HomeIntro mobile />
      <section id="mobile-concursos" className="sx-section" aria-label="Concursos em foco">
        <ContestShowcase mobile />
      </section>
      <HomeRankingShowcase anchorId="ranking-destaque-mobile" />
      <section id="mobile-planos" className="mobile-plans" aria-labelledby="mobile-plans-title">
        <div className="mobile-homepage__section-head">
          <span>Escolha sua evolução</span>
          <h2 id="mobile-plans-title">Um plano para cada etapa.</h2>
        </div>
        {TESTING_PHASE && (
          <p className="mobile-plans__trial">
            <ShieldCheck aria-hidden="true" /> {TESTING_LABEL} com tudo do Plus, sem cartão.
          </p>
        )}
        <ul className="mobile-plans__list">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <li
              key={plan.id}
              className={`hr-m-card${plan.id === "plus" ? " hr-m-plan-featured" : ""}`}
              data-featured={plan.id === "plus" || undefined}
              data-plan={plan.id}
            >
              <div>
                {plan.id === "plus" ? <Crown className="mobile-plans__icon" aria-hidden="true" /> : plan.id === "premium" ? <Gem className="mobile-plans__icon" aria-hidden="true" /> : plan.price === 0 ? <Gift className="mobile-plans__icon" aria-hidden="true" /> : <Target className="mobile-plans__icon" aria-hidden="true" />}
                <strong>{plan.name}</strong>
                <small>{plan.description}</small>
              </div>
              <span>
                {plan.price === 0 ? "Grátis" : `R$ ${plan.price.toFixed(2).replace(".", ",")}`}
                {plan.price > 0 && <em>/mês</em>}
              </span>
            </li>
          ))}
        </ul>
        <p className="mobile-plans__note">
          Planos pagos em breve; hoje os valores são informativos.
        </p>
        <Link to="/auth" search={{ mode: "register" }} className="mobile-homepage__wide-link">
          Criar conta grátis <ArrowRight />
        </Link>
      </section>
    </main>
  );
}
