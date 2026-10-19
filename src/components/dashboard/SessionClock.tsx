import { useEffect, useSyncExternalStore } from "react";
import { Link } from "@tanstack/react-router";
import { Timer } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { fmtClock, getStudyToday, startStudyClock, stopStudyClock, flushStudyClock, subscribeStudyClock } from "@/lib/studyClock";

/**
 * Tempo do aluno na plataforma HOJE (dia do Acre). Soma o tempo ativo com a plataforma visível,
 * mesmo ao trocar de seção, de aba ou recarregar. Clicar abre o histórico em Desempenho.
 */
export function SessionClock({ userId }: { userId: string }) {
  useEffect(() => {
    startStudyClock(userId);
    return () => { void flushStudyClock(); stopStudyClock(); };
  }, [userId]);
  const today = useSyncExternalStore(subscribeStudyClock, getStudyToday, () => 0);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to="/dashboard/performance"
          hash="tempo"
          className="app-streak"
          role="timer"
          aria-label={`Tempo na plataforma hoje: ${fmtClock(today)}`}
        >
          <Timer />
          <span className="tabular">{fmtClock(today)}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="app-session-tooltip">
        Tempo ativo hoje · Acre. Clique para ver o histórico.
      </TooltipContent>
    </Tooltip>
  );
}
