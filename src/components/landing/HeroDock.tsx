import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BadgeCheck, Clock, Library } from "lucide-react";
import { usePlatformQuestionSummary } from "@/hooks/usePlatformQuestionSummary";
import { formatCountdown, secondsUntilAcreMidnight } from "@/lib/acreTime";
import { GUEST_DAILY_LIMIT, getGuestRemainingToday, onAcreDayChange } from "@/lib/guestQuota";
import { TESTING_DAYS, TESTING_PHASE } from "@/lib/launch.config";

/** Faixa de vidro na base do hero (desktop/tablet): acesso, banco de questões e desafio diário. */
export function HeroDock() {
  const { data } = usePlatformQuestionSummary();
  const [remaining, setRemaining] = useState<number | null>(null);
  const [seconds, setSeconds] = useState<number | null>(null);
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
  useEffect(() => {
    const tick = () => setSeconds(secondsUntilAcreMidnight());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const left = remaining ?? GUEST_DAILY_LIMIT;
  const used = GUEST_DAILY_LIMIT - left;
  const done = remaining !== null && remaining <= 0;
  const cta = done ? "Criar conta" : used > 0 ? "Continuar" : "Responder agora";

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
export function HeaderQuestionStats() {
  const { data } = usePlatformQuestionSummary();
  const fmt = (n: number) => n.toLocaleString("pt-BR");
  return (
    <a
      href="#plataforma"
      className="hx-stats"
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
