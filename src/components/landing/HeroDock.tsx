import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Activity, ArrowRight, ArrowUpRight, BadgeCheck, Clock, Library, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { usePlatformQuestionSummary } from "@/hooks/usePlatformQuestionSummary";
import { useOnlinePresence } from "@/hooks/useOnlinePresence";
import { formatCountdown, secondsUntilAcreMidnight } from "@/lib/acreTime";
import { GUEST_DAILY_LIMIT, getGuestRemainingToday, onAcreDayChange } from "@/lib/guestQuota";
import { TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";

/** Faixa de vidro na base do hero (desktop/tablet): acesso, banco de questões e desafio diário. */
export function HeroDock() {
  const { data } = usePlatformQuestionSummary();
  const presence = useOnlinePresence();
  const [remaining, setRemaining] = useState<number | null>(null);
  const [seconds, setSeconds] = useState<number | null>(null);
  const [pulseIndex, setPulseIndex] = useState(0);
  const [pulsePaused, setPulsePaused] = useState(false);
  const fmt = (n: number) => n.toLocaleString("pt-BR");

  useEffect(() => {
    let alive = true;
    const load = () => void getGuestRemainingToday().then((n) => alive && setRemaining(n));
    load();
    const stop = onAcreDayChange(load);
    return () => {
      alive = false;
      stop();
    };
  }, []);

  const left = remaining ?? GUEST_DAILY_LIMIT;
  const used = GUEST_DAILY_LIMIT - left;
  const done = remaining !== null && remaining <= 0;
  const cta = done ? "Criar conta" : used > 0 ? "Continuar" : "Responder agora";

  const pulseItems = [
    {
      eyebrow: "COMUNIDADE EM TEMPO REAL",
      title: presence.state === "ready" && presence.count !== null
        ? `${fmt(presence.count)} ${presence.count === 1 ? "pessoa online" : "pessoas online"}`
        : "Comunidade Norte Concurso",
      detail: presence.state === "ready"
        ? "Presença anônima de navegadores conectados"
        : "Aguardando dados de presença em tempo real",
      href: "#plataforma",
    },
    {
      eyebrow: "ACERVO DA PLATAFORMA",
      title: data ? `${fmt(data.available)} questões disponíveis` : "Explore o banco de questões",
      detail: data
        ? `${fmt(data.registered)} cadastradas · atualização automática`
        : "Concursos, disciplinas e bancas organizadas",
      href: "#plataforma",
    },
    {
      eyebrow: "DICA DE PREPARAÇÃO",
      title: "Revise os erros antes de avançar",
      detail: "Reforçar pontos fracos é um passo importante na preparação",
      href: "/auth",
    },
    {
      eyebrow: "DESAFIO DIÁRIO",
      title: remaining === null ? "Questões grátis sem cadastro" : `${left} de ${GUEST_DAILY_LIMIT} questões disponíveis`,
      detail: `Renova em ${seconds === null ? "--:--:--" : formatCountdown(seconds)} · horário do Acre`,
      href: done ? "/auth" : "/desafio-diario",
    },
  ] as const;

  useEffect(() => {
    if (pulsePaused || (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const id = window.setInterval(() => setPulseIndex((index) => (index + 1) % pulseItems.length), 6500);
    return () => window.clearInterval(id);
  }, [pulsePaused, pulseItems.length]);

  const pulse = pulseItems[pulseIndex] ?? pulseItems[0];
  useEffect(() => {
    const tick = () => setSeconds(secondsUntilAcreMidnight());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const daily = (
    <>
        <div>
          <span className="hx-dock__live">
            <i aria-hidden="true" /> Desafio de hoje
          </span>
          <strong>{GUEST_DAILY_LIMIT} questões grátis, sem cadastro</strong>
          <small>
            <Clock aria-hidden="true" /> Renova em{" "}
            <time>{seconds === null ? "--:--:--" : formatCountdown(seconds)}</time>
          </small>
        </div>
        <span className="hx-dock__cta">
          {cta} <ArrowRight aria-hidden="true" />
        </span>
    </>
  );

  return (
    <div className="hx-dock" aria-label="Comece sua preparação">
      {TESTING_PHASE && (
        <div className="hx-dock__cell hx-dock__cell--access" role="note">
          <BadgeCheck aria-hidden="true" />
          <div>
            <strong>Acesso aberto · Fase de testes</strong>
            <span>Grátis por {TESTING_DAYS} dias com tudo do Plus</span>
          </div>
          <a href="#planos">
            Planos <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      )}
      <a href="#plataforma" className="hx-dock__cell hx-dock__cell--bank">
        <div className="hx-dock__stat">
          <strong>{data ? fmt(data.available) : "—"}</strong>
          <span>questões para treinar</span>
        </div>
        <div className="hx-dock__stat hx-dock__stat--muted">
          <strong>{data ? fmt(data.registered) : "—"}</strong>
          <span>cadastradas</span>
        </div>
      </a>
      <section
        className="hx-dock__cell hx-dock__cell--pulse"
        aria-label="Norte Pulse — sua preparação em movimento"
        onMouseEnter={() => setPulsePaused(true)}
        onMouseLeave={() => setPulsePaused(false)}
      >
        <span className="hx-dock__pulse-mark" aria-hidden="true"><i /></span>
        <div className="hx-dock__pulse-copy">
          <span className="hx-dock__live"><Activity aria-hidden="true" /> NORTE PULSE · {pulse.eyebrow}</span>
          <strong>{pulse.title}</strong>
          <small>{pulse.detail}</small>
          <div className="hx-dock__pulse-controls" aria-label="Navegação do Norte Pulse">
            <button type="button" onClick={() => setPulseIndex((i) => (i + pulseItems.length - 1) % pulseItems.length)} aria-label="Informação anterior"><ChevronLeft aria-hidden="true" /></button>
            <span className="hx-dock__pulse-count">{pulseIndex + 1} / {pulseItems.length}</span>
            <button type="button" onClick={() => setPulseIndex((i) => (i + 1) % pulseItems.length)} aria-label="Próxima informação"><ChevronRight aria-hidden="true" /></button>
            <button type="button" onClick={() => setPulsePaused((v) => !v)} aria-label={pulsePaused ? "Retomar atualização automática" : "Pausar atualização automática"} aria-pressed={pulsePaused}>{pulsePaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}</button>
          </div>
        </div>
        <a href={pulse.href} className="hx-dock__pulse-action" aria-label={`Acessar: ${pulse.title}`}>Explorar <ArrowRight aria-hidden="true" /></a>
      </section>
      {done ? (
        <Link to="/auth" search={{ mode: "register" }} className="hx-dock__cell hx-dock__cell--daily">
          {daily}
        </Link>
      ) : (
        <Link to="/desafio-diario" className="hx-dock__cell hx-dock__cell--daily">
          {daily}
        </Link>
      )}
    </div>
  );
}

/** Pílula de vidro no cabeçalho (desktop): total de questões da plataforma e quantas há para responder. */
export function HeaderQuestionStats({ mobile = false }: { mobile?: boolean }) {
  const { data } = usePlatformQuestionSummary();
  const fmt = (n: number) => n.toLocaleString("pt-BR");
  return (
    <a
      href="#plataforma"
      className={mobile ? "hx-stats hx-stats--mobile" : "hx-stats"}
      aria-label={
        data
          ? `${fmt(data.registered)} questões na plataforma, ${fmt(data.available)} disponíveis para responder`
          : "Banco de questões da plataforma"
      }
    >
      <Library aria-hidden="true" />
      <span>
        <strong>{data ? fmt(data.registered) : "—"}</strong> na plataforma
      </span>
      <i aria-hidden="true" />
      <span>
        <strong>{data ? fmt(data.available) : "—"}</strong> para responder
      </span>
    </a>
  );
}
