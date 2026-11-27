import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Target, Trophy, Clock3 } from "lucide-react";
import { HeroBackdropClock } from "@/components/landing/HeroBackdropClock";
import { NorteCube } from "@/components/landing/NorteCube";
import { usePlatformQuestionSummary } from "@/hooks/usePlatformQuestionSummary";
import { useDailyChallenge } from "@/hooks/useDailyChallenge";
import { GUEST_DAILY_LIMIT } from "@/lib/guestQuota";

const fmt = (n: number | undefined) => (typeof n === "number" ? n.toLocaleString("pt-BR") : "—");

/** Abertura da homepage no celular: concurso em foco + cubo, título, ações, números e Desafio diário. */
export function MobileHero() {
  const { data } = usePlatformQuestionSummary();
  const daily = useDailyChallenge();
  const dailyBody = (
    <>
          <span className="mhx-daily__head">
            <span className="mhx-daily__icon" aria-hidden="true">
              {daily.done ? <Trophy /> : <Target />}
            </span>
            <span className="mhx-daily__copy">
              <small>
                <i aria-hidden="true" /> Desafio diário
              </small>
              <strong>{daily.title}</strong>
              <em>{daily.description}</em>
            </span>
          </span>
          <span className="mhx-daily__meter" aria-hidden="true">
            {Array.from({ length: daily.limit }, (_, i) => (
              <i key={i} data-on={i < daily.used || undefined} />
            ))}
          </span>
          <span className="mhx-daily__row">
            <span>
              {daily.used} de {daily.limit} respondidas
            </span>
            <span>
              <Clock3 aria-hidden="true" /> Renova em <time>{daily.countdown}</time>
            </span>
          </span>
          <span className="mhx-daily__cta">
            {daily.action} <ArrowRight aria-hidden="true" />
          </span>
    </>
  );
  return (
    <section id="mobile-inicio" className="mhx-hero" aria-labelledby="mhx-title">
      <HeroBackdropClock />
      <div className="mhx-hero__inner">
        <div className="mhx-top">
          <a
            href="#concurso-pcac"
            className="mhx-focus"
            aria-label="Concurso da Polícia Civil do Acre: edital aberto, prova em 24 de janeiro de 2027"
          >
            <span className="mhx-focus__tag">
              <i aria-hidden="true" /> Em foco
            </span>
            <strong>PC-AC 2026</strong>
            <span>Edital aberto · IDECAN</span>
            <span className="mhx-focus__date">
              Prova 24/01/2027 <ArrowRight aria-hidden="true" />
            </span>
          </a>
          <div className="mhx-cube" aria-hidden="true">
            <NorteCube size={0.6} />
          </div>
        </div>

        <span className="mhx-eyebrow">
          <ShieldCheck aria-hidden="true" /> Preparação para carreiras policiais
        </span>
        <h1 id="mhx-title">
          Preparação estratégica para sua carreira <em>policial.</em>
        </h1>
        <p className="mhx-lead">
          Do edital à aprovação: questões por banca, simulados cronometrados e desempenho por
          disciplina, em um único ambiente de estudo.
        </p>
        <div className="mhx-actions">
          <Link to="/auth" search={{ mode: "register" }} className="mhx-btn mhx-btn--primary">
            Criar conta grátis <ArrowRight aria-hidden="true" />
          </Link>
          <a href="#mobile-recursos" className="mhx-btn mhx-btn--ghost">
            Ver a plataforma
          </a>
        </div>
        <dl className="mhx-stats" aria-label="Números da plataforma">
          <div>
            <dd>{fmt(data?.registered)}</dd>
            <dt>Total cadastrado</dt>
          </div>
          <div>
            <dd>{fmt(data?.available)}</dd>
            <dt>Disponíveis para treinar</dt>
          </div>
          <div>
            <dd>{GUEST_DAILY_LIMIT}</dd>
            <dt>Grátis por dia, sem cadastro</dt>
          </div>
        </dl>

        {daily.done ? (
          <Link to="/auth" search={{ mode: "register" }} className="mhx-daily" data-done>
            {dailyBody}
          </Link>
        ) : (
          <Link to="/desafio-diario" className="mhx-daily">
            {dailyBody}
          </Link>
        )}
      </div>
    </section>
  );
}
