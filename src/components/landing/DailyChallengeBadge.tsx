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
      : `${GUEST_DAILY_LIMIT} questões gratuitas para testar seus conhecimentos.`;
  const description = done
    ? "Sua próxima rodada será liberada à meia-noite, no horário do Acre."
    : "Questões de certo ou errado para manter seu ritmo de preparação.";
  const action = done ? "Conhecer a plataforma" : started ? "Continuar desafio" : "Começar desafio";

  const content = (
    <>
      <span className="daily-badge__emblem" aria-hidden="true">
        {done ? <Trophy /> : <Target />}
      </span>
      <span className="daily-badge__copy">
        <span className="daily-badge__eyebrow">
          <span className="daily-badge__signal" />
          DESAFIO DIÁRIO <span className="daily-badge__eyebrow-separator">/</span> TREINO GRATUITO
        </span>
        <strong className="daily-badge__title">{title}</strong>
        <small className="daily-badge__description">{description}</small>
      </span>
      <span className="daily-badge__details">
        <span className="daily-badge__progress-label">
          <Flame aria-hidden="true" /> Seu ritmo de hoje
        </span>
        <span className="daily-badge__progress-track" aria-hidden="true">
          <span style={{ width: `${(used / GUEST_DAILY_LIMIT) * 100}%` }} />
        </span>
        <span className="daily-badge__progress-count">{used} de {GUEST_DAILY_LIMIT} respondidas</span>
        <span className="daily-badge__renewal"><Clock3 aria-hidden="true" /> Nova rodada em <time>{countdown}</time></span>
      </span>
      <span className="daily-badge__cta">
        <span>{action}</span><ArrowRight aria-hidden="true" />
      </span>
    </>
  );

  return done ? (
    <Link to="/auth" search={{ mode: "register" }} className="daily-badge daily-badge--featured daily-challenge-home">
      {content}
    </Link>
  ) : (
    <Link to="/desafio-diario" className="daily-badge daily-badge--featured daily-challenge-home">
      {content}
    </Link>
  );
}
