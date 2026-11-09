import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  Compass,
  FileSearch,
  LineChart,
  Map as MapIcon,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HeroBackdropClock } from "@/components/landing/HeroBackdropClock";
import { PcacBanner } from "@/components/landing/PcacBanner";
import { DailyChallengeBadge } from "@/components/landing/DailyChallengeBadge";
import { usePlatformQuestionSummary } from "@/hooks/usePlatformQuestionSummary";
import { GUEST_DAILY_LIMIT } from "@/lib/guestQuota";
import "@/styles/home-saas.css";

const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MapIcon,
    title: "Edital organizado",
    text: "O conteúdo programático vira tópicos claros para estudar e acompanhar.",
  },
  {
    icon: BrainCircuit,
    title: "Questões por banca",
    text: "Pratique por disciplina, assunto e organizadora, com correção comentada.",
  },
  {
    icon: Trophy,
    title: "Simulados",
    text: "Treine tempo e estratégia em uma experiência próxima da prova.",
  },
  {
    icon: Compass,
    title: "Plano de estudos",
    text: "Prioridades e revisões ajustadas ao seu edital e à sua rotina.",
  },
  {
    icon: FileSearch,
    title: "Caderno de erros",
    text: "Seus erros viram metas de revisão, sem perder nenhum ponto fraco.",
  },
  {
    icon: LineChart,
    title: "Desempenho",
    text: "Acertos, ritmo e lacunas para decidir onde concentrar o esforço.",
  },
];

const fmt = (n: number | undefined) => (typeof n === "number" ? n.toLocaleString("pt-BR") : "—");

/** Abertura única da homepage (hero, desafio diário e recursos), compartilhada por desktop e celular. */
export function HomeIntro({ mobile = false }: { mobile?: boolean }) {
  const { data } = usePlatformQuestionSummary();
  const ids = mobile
    ? {
        hero: "mobile-inicio",
        platform: "mobile-recursos",
        tools: "mobile-ferramentas",
        title: "sx-title-m",
      }
    : { hero: "inicio", platform: "plataforma", tools: "ferramentas", title: "home-hero-title" };

  return (
    <>
      <section id={ids.hero} className="sx-band" aria-labelledby={ids.title}>
        <HeroBackdropClock />
        <div className="sx sx-hero">
          <div className="sx-hero__copy">
            <span className="sx-eyebrow">
              <ShieldCheck aria-hidden="true" /> Preparação para carreiras policiais
            </span>
            <h1 id={ids.title}>
              Preparação estratégica para sua carreira <em>policial.</em>
            </h1>
            <p className="sx-lead">
              Editais organizados, questões por banca, simulados e desempenho em um único ambiente
              de estudo.
            </p>
            <div className="sx-actions">
              <Link to="/auth" search={{ mode: "register" }} className="sx-btn sx-btn--primary">
                Criar conta grátis <ArrowRight aria-hidden="true" />
              </Link>
              <a href={`#${ids.platform}`} className="sx-btn sx-btn--ghost">
                Ver a plataforma
              </a>
            </div>
            <dl className="sx-stats" aria-label="Números da plataforma">
              <div>
                <dt>Total cadastrado</dt>
                <dd>{fmt(data?.registered)}</dd>
              </div>
              <div>
                <dt>Disponíveis para treinar</dt>
                <dd>{fmt(data?.available)}</dd>
              </div>
              <div>
                <dt>Grátis por dia, sem cadastro</dt>
                <dd>{GUEST_DAILY_LIMIT}</dd>
              </div>
            </dl>
          </div>
          <div className="sx-hero__panel">
            <DailyChallengeBadge />
          </div>
        </div>
      </section>
      <PcacBanner mobile={mobile} />

      <section
        id={ids.platform}
        className="sx sx-features"
        aria-labelledby={`${ids.title}-features`}
      >
        <header className="sx-head">
          <div>
            <span className="sx-eyebrow">A plataforma</span>
            <h2 id={`${ids.title}-features`}>Do edital à prova, em um só lugar.</h2>
          </div>
          <Link to="/auth" search={{ mode: "register" }} className="sx-btn sx-btn--ghost">
            Experimentar grátis <ArrowRight aria-hidden="true" />
          </Link>
        </header>
        <ul id={ids.tools} className="sx-grid">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="sx-card">
              <span className="sx-card__icon">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
