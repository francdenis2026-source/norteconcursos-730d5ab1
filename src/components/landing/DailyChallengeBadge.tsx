import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, Flame, Target, Trophy } from "lucide-react";
import { formatCountdown, secondsUntilAcreMidnight } from "@/lib/acreTime";
import {
  GUEST_DAILY_LIMIT,
  getAcreDateKey,
  getGuestRemainingToday,
  onAcreDayChange,
} from "@/lib/guestQuota";

/** Destaque editorial do desafio diário na homepage, com dados reais da cota gratuita. */
export function DailyChallengeBadge() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [seconds, setSeconds] = useState<number | null>(null);

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
    const tick = () => {
      const left = secondsUntilAcreMidnight();
      setSeconds(left);
      if (left >= 86_399) {
        void getAcreDateKey(true)
          .then(() => getGuestRemainingToday())
          .then(setRemaining);
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const left = remaining ?? GUEST_DAILY_LIMIT;
  const used = GUEST_DAILY_LIMIT - left;
  const done = remaining !== null && remaining <= 0;
  const started = used > 0 && !done;
  const countdown = seconds === null ? "--:--:--" : formatCountdown(seconds);
  const title = done
    ? "Você concluiu o desafio de hoje."
    : started
      ? `Você já respondeu ${used} de ${GUEST_DAILY_LIMIT} questões.`
      : `${GUEST_DAILY_LIMIT} questões gratuitas hoje.`;
  const description = done
    ? "Nova rodada à meia-noite, no horário do Acre."
    : "Certo ou errado, com comentários. Sem cadastro.";
  const action = done ? "Conhecer a plataforma" : started ? "Continuar desafio" : "Começar desafio";

  const content = (
    <>
      <span className="sx-daily__icon" aria-hidden="true">
        {done ? <Trophy /> : <Target />}
      </span>
      <span className="sx-daily__copy">
        <span className="sx-daily__eyebrow">
          <i aria-hidden="true" /> Desafio diário
        </span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <span className="sx-daily__meta">
        <span className="sx-daily__track" aria-hidden="true">
          <span style={{ width: `${(used / GUEST_DAILY_LIMIT) * 100}%` }} />
        </span>
        <span className="sx-daily__row">
          <span>
            <Flame aria-hidden="true" /> {used} de {GUEST_DAILY_LIMIT} respondidas
          </span>
          <span>
            <Clock3 aria-hidden="true" /> Renova em <time>{countdown}</time>
          </span>
        </span>
      </span>
      <span className="sx-daily__cta">
        {action} <ArrowRight aria-hidden="true" />
      </span>
    </>
  );

  return done ? (
    <Link to="/auth" search={{ mode: "register" }} className="sx-daily" data-done>
      {content}
    </Link>
  ) : (
    <Link to="/desafio-diario" className="sx-daily">
      {content}
    </Link>
  );
}
