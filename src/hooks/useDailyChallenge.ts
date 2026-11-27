import { useEffect, useState } from "react";
import { formatCountdown, secondsUntilAcreMidnight } from "@/lib/acreTime";
import {
  GUEST_DAILY_LIMIT,
  getAcreDateKey,
  getGuestRemainingToday,
  onAcreDayChange,
} from "@/lib/guestQuota";

/** Estado do Desafio diário grátis (cota do dia no horário do Acre) para os cartões da homepage. */
export function useDailyChallenge() {
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
  return {
    limit: GUEST_DAILY_LIMIT,
    used,
    done,
    started,
    countdown: seconds === null ? "--:--:--" : formatCountdown(seconds),
    title: done
      ? "Você concluiu o desafio de hoje."
      : started
        ? `Você já respondeu ${used} de ${GUEST_DAILY_LIMIT} questões.`
        : `${GUEST_DAILY_LIMIT} questões gratuitas hoje.`,
    description: done
      ? "Nova rodada à meia-noite, no horário do Acre."
      : "Certo ou errado, com comentários. Sem cadastro.",
    action: done ? "Conhecer a plataforma" : started ? "Continuar desafio" : "Começar desafio",
  };
}
