import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Target,
} from "lucide-react";
import { DailyChallengeBadge } from "@/components/landing/DailyChallengeBadge";
import { ContestShowcase } from "@/components/landing/ContestShowcase";
import { HomeRankingShowcase } from "@/components/landing/HomeRankingShowcase";
import { HeaderQuestionStats } from "@/components/landing/HeroDock";
import { HeroBadge } from "@/components/landing/HeroBadge";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { TESTING_LABEL, TESTING_PHASE } from "@/lib/launch.config";
import { GUEST_DAILY_LIMIT } from "@/lib/guestQuota";
import { TacticalClockBackdrop } from "@/components/brand/TacticalClockBackdrop";

export function MobileHomepage() {
  return (
    <main className="mobile-homepage mobile-homepage--recomposed" id="conteudo-mobile" tabIndex={-1} aria-label="Norte Concursos para celular">
      <section id="mobile-inicio" className="mobile-homepage__hero">
        <div className="mobile-homepage__hero-media">
          <TacticalClockBackdrop />
          <img className="mobile-homepage__portrait" src="/media/hero/hero-norte-recorte.webp" alt="Agente de segurança pública" width={1208} height={1302} fetchPriority="high" decoding="async" />
          <div className="mobile-homepage__hero-shade" aria-hidden="true" />
          <HeroBadge />
        </div>
        <div className="mobile-homepage__hero-copy">
          <span className="mobile-homepage__eyebrow">
            <span /> Preparação para carreiras policiais
          </span>
          <div className="mobile-homepage__glass">
            <h1>
              Seu próximo passo começa <em>com direção.</em>
            </h1>
            <p className="mobile-homepage__hero-lead">
              Questões, editais e simulados para transformar seu estudo em preparação real.
            </p>
            <HeaderQuestionStats mobile />
            <Link to="/auth" search={{ mode: "register" }} className="mobile-homepage__primary">
              Começar minha preparação <ArrowRight aria-hidden="true" />
            </Link>
            <a href="#mobile-recursos" className="mobile-homepage__secondary">
              Ver como funciona <ChevronRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section className="mobile-homepage__daily">
        <div>
          <span className="mobile-homepage__eyebrow">
            <span /> Ritmo diário
          </span>
          <h2>Estude um pouco hoje. Chegue mais forte na prova.</h2>
          <p>
            {GUEST_DAILY_LIMIT} questões por dia, sem cadastro, com comentários para você entender cada
            resposta.
          </p>
        </div>
        <DailyChallengeBadge />
      </section>
      <section id="mobile-recursos" className="mobile-homepage__resources">
        <div className="mobile-homepage__section-head">
          <span>O que você encontra</span>
          <h2>Uma rotina que cabe no seu objetivo.</h2>
        </div>
        <div id="mobile-ferramentas" className="mobile-homepage__cards" aria-label="Recursos da plataforma">
          <article>
            <BookOpenCheck aria-hidden="true" />
            <strong>Treinador de questões</strong>
            <p>Pratique por banca, cargo e disciplina.</p>
          </article>
          <article>
            <Target aria-hidden="true" />
            <strong>Plano de estudos</strong>
            <p>Saiba o que revisar e qual é o próximo passo.</p>
          </article>
          <article>
            <ShieldCheck aria-hidden="true" />
            <strong>Conteúdo confiável</strong>
            <p>Fontes oficiais e revisões identificadas.</p>
          </article>
        </div>
        <Link to="/auth" search={{ mode: "register" }} className="mobile-homepage__wide-link">
          Conhecer a plataforma <ArrowRight aria-hidden="true" />
        </Link>
      </section>
      <section id="mobile-concursos" className="mobile-homepage__contests">
        <div className="mobile-homepage__section-head">
          <span>Concursos em foco</span>
          <h2>Treine para a prova que importa.</h2>
        </div>
        <ContestShowcase mobile />
      </section>
      <HomeRankingShowcase anchorId="ranking-destaque-mobile" />
      <section id="mobile-planos" className="mobile-plans" aria-labelledby="mobile-plans-title">
        <div className="mobile-homepage__section-head">
          <span>Planos</span>
          <h2 id="mobile-plans-title">Comece grátis. Evolua no seu ritmo.</h2>
        </div>
        {TESTING_PHASE && (
          <p className="mobile-plans__trial">
            <ShieldCheck aria-hidden="true" /> {TESTING_LABEL} com tudo do Plus, sem cartão.
          </p>
        )}
        <ul className="mobile-plans__list">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <li key={plan.id} data-featured={plan.id === "plus" || undefined}>
              <div>
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
      <section className="mobile-homepage__closing">
        <CheckCircle2 aria-hidden="true" />
        <div>
          <strong>Preparação sem improviso.</strong>
          <p>Escolha sua carreira e comece pelo diagnóstico.</p>
        </div>
        <Link to="/auth" search={{ mode: "register" }}>
          Criar conta
        </Link>
      </section>
      <footer className="mobile-homepage__footer">
        <strong className="mobile-homepage__footer-brand">
          NORTE <span>CONCURSOS</span>
        </strong>
        <nav className="mobile-homepage__footer-nav" aria-label="Institucional">
          <Link to="/suporte">Suporte</Link>
          <Link to="/privacy">Privacidade</Link>
          <Link to="/terms">Termos de uso</Link>
        </nav>
        <address className="mobile-homepage__footer-contact">
          <a href="mailto:francdenis2026@gmail.com" aria-label="Enviar e-mail para francdenis2026@gmail.com">
            <Mail aria-hidden="true" /> francdenis2026@gmail.com
          </a>
          <a
            href="https://wa.me/5568992031340"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar pelo WhatsApp: (68) 99203-1340 (abre em nova aba)"
          >
            <MessageCircle aria-hidden="true" /> (68) 99203-1340
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Rua+Joel+Fereira+de+Sousa%2C+Bela+Vista%2C+Feij%C3%B3%2C+Acre"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin aria-hidden="true" /> R. Joel Fereira de Sousa, Bela Vista · Feijó, AC · 69960-000
          </a>
        </address>
        <small className="mobile-homepage__footer-copy">
          <span>© 2026 Norte Concursos</span>
          <span>
            Dev. <strong>Franc D'nis</strong> · Feijó-AC, Brasil
          </span>
        </small>
      </footer>
    </main>
  );
}
