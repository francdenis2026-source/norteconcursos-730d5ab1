import { Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Gift, Crown, Gem, LifeBuoy, Lock, Mail, MapPin, MessageCircle, ShieldCheck, Target } from "lucide-react";
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
      <footer className="mf" aria-label="Rodapé">
        <div className="mf__hero">
          <img src="/media/hero/careers-team.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <strong className="mf__brand">
            NORTE <span>CONCURSOS</span>
          </strong>
          <p>Preparação séria para carreiras policiais.</p>
        </div>
        <nav className="mf__links" aria-label="Institucional">
          <Link to="/suporte"><LifeBuoy aria-hidden="true" /> Suporte</Link>
          <Link to="/privacy"><Lock aria-hidden="true" /> Privacidade</Link>
          <Link to="/terms"><FileText aria-hidden="true" /> Termos</Link>
        </nav>
        <address className="mf__contact">
          <a href="mailto:francdenis2026@gmail.com" data-tone="mail" aria-label="Enviar e-mail para francdenis2026@gmail.com">
            <Mail aria-hidden="true" /> <span>E-mail</span>
          </a>
          <a
            href="https://wa.me/5568992031340"
            target="_blank"
            rel="noopener noreferrer"
            data-tone="whats"
            aria-label="Conversar pelo WhatsApp: (68) 99203-1340 (abre em nova aba)"
          >
            <MessageCircle aria-hidden="true" /> <span>WhatsApp</span>
          </a>
          <a
            className="mf__address"
            href="https://www.google.com/maps/search/?api=1&query=Rua+Joel+Fereira+de+Sousa%2C+Bela+Vista%2C+Feij%C3%B3%2C+Acre"
            target="_blank"
            rel="noopener noreferrer"
            data-tone="map"
          >
            <MapPin aria-hidden="true" /> <span>R. Joel Fereira de Sousa, Bela Vista · Feijó, AC · 69960-000</span>
          </a>
        </address>
        <small className="mf__copy">© 2026 Norte Concursos · Feijó-AC</small>
      </footer>
    </main>
  );
}
