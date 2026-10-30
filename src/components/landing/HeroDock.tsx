import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BadgeCheck, Clock, Library, ShieldCheck } from "lucide-react";
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

  const left = remaining ?? GUEST_DAILY_LIMIT;
  const used = GUEST_DAILY_LIMIT - left;
  const done = remaining !== null && remaining <= 0;
  const cta = done ? "Criar conta" : used > 0 ? "Continuar" : "Responder agora";

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
            <strong>Acesso liberado</strong>
            <span>{TESTING_DAYS} dias de acesso Plus</span>
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
      <section className="hx-dock__cell hx-dock__cell--pulse hx-dock__cell--radar" aria-label="Radar de concursos: Polícia Civil do Acre">
        <span className="hx-dock__radar-icon" aria-hidden="true"><ShieldCheck /></span>
        <div className="hx-dock__radar-copy">
          <span className="hx-dock__live">RADAR DE CONCURSOS · PC ACRE</span>
          <strong>Comissão formada. Edital aguardado.</strong>
          <small>Decreto 11.966/2026 · comissão instituída em 22/10. Edital previsto para 2026, sem data oficial.</small>
          <a href="https://legis.ac.gov.br/detalhar/6903" target="_blank" rel="noopener noreferrer" className="hx-dock__radar-source">
            Ver publicação oficial <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
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
