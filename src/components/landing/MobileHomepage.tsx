import { Link } from "@tanstack/react-router";
import { ArrowRight, Gift, Crown, Gem, ShieldCheck, Target } from "lucide-react";
import { FEATURES } from "@/components/landing/HomeIntro";
import { MobileHero } from "@/components/landing/MobileHero";
import { PcacBanner } from "@/components/landing/PcacBanner";
import "@/styles/mobile-home-v3.css";
import { ContestShowcase } from "@/components/landing/ContestShowcase";
import { HomeRankingShowcase } from "@/components/landing/HomeRankingShowcase";
import { QuestionCodeLookup } from "@/components/questions/QuestionCodeLookup";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { TESTING_LABEL, TESTING_PHASE } from "@/lib/launch.config";

export function MobileHomepage() {
  return (
    <main className="mobile-homepage mobile-homepage--recomposed mhx" id="conteudo-mobile" tabIndex={-1} aria-label="Norte Concursos para celular">
      <MobileHero />
      <PcacBanner mobile />
      <section id="mobile-recursos" className="mhx-section mhx-features" aria-labelledby="mhx-feat-title">
        <header className="mhx-sec-head">
          <span>A plataforma</span>
          <h2 id="mhx-feat-title">Do edital à prova, em um só lugar.</h2>
        </header>
        <ul id="mobile-ferramentas" className="mhx-grid">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <span className="mhx-grid__icon">
                <Icon aria-hidden="true" />
              </span>
              <strong>{title}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ul>
        <Link to="/auth" search={{ mode: "register" }} className="mhx-btn mhx-btn--ghost mhx-wide">
          Experimentar grátis <ArrowRight aria-hidden="true" />
        </Link>
      </section>
      <section id="mobile-concursos" className="sx-section" aria-label="Concursos em foco">
        <ContestShowcase mobile />
      </section>
      <QuestionCodeLookup />
      <HomeRankingShowcase anchorId="ranking-destaque-mobile" />
      <section id="mobile-planos" className="mhx-section mhx-plans" aria-labelledby="mobile-plans-title">
        <header className="mhx-sec-head">
          <span>Escolha sua evolução</span>
          <h2 id="mobile-plans-title">Um plano para cada etapa.</h2>
        </header>
        {TESTING_PHASE && (
          <p className="mhx-plans__trial">
            <ShieldCheck aria-hidden="true" /> {TESTING_LABEL} com tudo do Plus, sem cartão.
          </p>
        )}
        <ul className="mhx-plans__list">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <li key={plan.id} data-featured={plan.id === "plus" || undefined} data-plan={plan.id}>
              <span className="mhx-plans__icon">
                {plan.id === "plus" ? <Crown aria-hidden="true" /> : plan.id === "premium" ? <Gem aria-hidden="true" /> : plan.price === 0 ? <Gift aria-hidden="true" /> : <Target aria-hidden="true" />}
              </span>
              <span className="mhx-plans__text">
                <strong>{plan.name}</strong>
                <small>{plan.description}</small>
              </span>
              <span className="mhx-plans__price">
                {plan.price === 0 ? "Grátis" : `R$ ${plan.price.toFixed(2).replace(".", ",")}`}
                {plan.price > 0 && <em>/mês</em>}
              </span>
            </li>
          ))}
        </ul>
        <p className="mhx-plans__note">Planos pagos em breve; hoje os valores são informativos.</p>
        <Link to="/auth" search={{ mode: "register" }} className="mhx-btn mhx-btn--primary mhx-wide">
          Criar conta grátis <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
