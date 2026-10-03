import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { formatCountdown, secondsUntilAcreMidnight } from "@/lib/acreTime";
import { GUEST_DAILY_LIMIT, getAcreDateKey, getGuestRemainingToday, onAcreDayChange } from "@/lib/guestQuota";

/**
 * Selo de destaque no topo da hero: chama o visitante para o Desafio diário
 * (10 questões oficiais grátis, sem cadastro). Mostra quantas ele ainda tem hoje
 * e uma contagem regressiva até a renovação, à meia-noite do horário do Acre.
 */
export function DailyChallengeBadge() {
  const { isAuthenticated } = useAuthStatus();
  const [remaining, setRemaining] = useState<number | null>(null);
  // Só depois de montar: o servidor e o navegador contariam segundos diferentes (hydration).
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
      // Virou o dia: força a data do servidor e renova a contagem das questões.
      if (left >= 86_399) void getAcreDateKey(true).then(() => getGuestRemainingToday()).then(setRemaining);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Quem já tem conta não precisa do convite "sem cadastro". Aparece de imediato para
  // visitantes (sem esperar a checagem de login), para não empurrar o texto da hero.
  if (isAuthenticated) return null;

  const left = remaining ?? GUEST_DAILY_LIMIT;
  const used = GUEST_DAILY_LIMIT - left;
  const done = remaining !== null && remaining <= 0;
  const started = used > 0 && !done;
  const countdown = seconds === null ? "--:--:--" : formatCountdown(seconds);

  const title = done
    ? "Desafio de hoje concluído"
    : started
      ? `Faltam ${left} de ${GUEST_DAILY_LIMIT} questões hoje`
      : `${GUEST_DAILY_LIMIT} questões oficiais grátis hoje`;
  const hint = done
    ? "Nova rodada à meia-noite do Acre"
    : "Sem cadastro · renova todo dia, horário do Acre";

  const content = (
    <>
      <span className="daily-badge__live">
        <span className="daily-badge__pulse" aria-hidden="true" />
        Desafio de hoje
      </span>
      <span className="daily-badge__main">
        <strong>{title}</strong>
        <small>{hint}</small>
      </span>
      <span className="daily-badge__dots" aria-hidden="true">
        {Array.from({ length: GUEST_DAILY_LIMIT }, (_, i) => (
          <i key={i} data-done={i < used} style={{ ["--i" as string]: i }} />
        ))}
      </span>
      <span className="daily-badge__timer" aria-hidden="true">
        <Clock /> Renova em <time>{countdown}</time>
      </span>
      <span className="daily-badge__cta">
        {done ? "Criar conta e treinar sem limite" : started ? "Continuar" : "Responder agora"}
        <ArrowRight aria-hidden="true" />
      </span>
    </>
  );

  const label = `${title}. ${hint}.`;

  return done ? (
    <Link to="/auth" search={{ mode: "register" }} className="daily-badge" aria-label={label}>
      {content}
    </Link>
  ) : (
    <Link to="/desafio-diario" className="daily-badge" aria-label={label}>
      {content}
    </Link>
  );
}
