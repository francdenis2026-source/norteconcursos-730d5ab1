import * as React from "react";
import { Users } from "lucide-react";
import { useOnlinePresence } from "@/hooks/useOnlinePresence";
import { usePlatformSignupPulse } from "@/hooks/usePlatformSignupPulse";
import "@/styles/home-live-stats.css";

/** Número que "sobe" até o valor real na primeira exibição e a cada mudança (sem animação com movimento reduzido). */
function useCountUp(target: number | null, duration = 900) {
  const [shown, setShown] = React.useState<number | null>(target === null ? null : 0);
  const from = React.useRef(0);
  React.useEffect(() => {
    if (target === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(target);
      from.current = target;
      return;
    }
    const start = performance.now();
    const origin = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(origin + (target - origin) * eased);
      setShown(v);
      from.current = v;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return shown;
}

const fmt = (n: number) => new Intl.NumberFormat("pt-BR").format(n);

/**
 * Painel de telemetria do topo da homepage: visitantes online agora (ao vivo) e total de cadastrados.
 * Duas linhas compactas, números em fonte monoespaçada com contagem animada, ponto de transmissão com
 * onda e barras de sinal. Públicos, sem login e sem nenhum dado pessoal.
 */
export function HomeLiveStats() {
  const presence = useOnlinePresence();
  const signups = usePlatformSignupPulse();
  const online = presence.state === "ready" ? presence.count : null;
  const registered = !signups.isLoading ? signups.count : null;
  const onlineShown = useCountUp(online, 700);
  const registeredShown = useCountUp(registered, 1100);
  const live = online !== null && online > 0;

  return (
    <div className="hls" aria-label="Plataforma ao vivo">
      <p className="hls__row" data-live={live || undefined} data-state={presence.state} role="status">
        <span className="hls__dot" aria-hidden="true" />
        <b className="hls__num">{onlineShown === null ? "—" : fmt(onlineShown)}</b>
        <span className="hls__label">online agora</span>
        <span className="hls__bars" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <span className="sr-only">
          {online === null ? "Presença indisponível" : `${fmt(online)} ${online === 1 ? "visitante online" : "visitantes online"} agora`}
        </span>
      </p>
      <p className="hls__row" data-kind="users" role="status">
        <Users className="hls__icon" aria-hidden="true" />
        <b className="hls__num">{registeredShown === null ? "—" : fmt(registeredShown)}</b>
        <span className="hls__label">cadastrados</span>
        {signups.pulseKey > 0 && (
          <span key={signups.pulseKey} className="hls__toast" aria-live="polite">+1</span>
        )}
        <span className="sr-only">
          {registered === null ? "Total de cadastrados indisponível" : `${fmt(registered)} usuários cadastrados na plataforma`}
        </span>
      </p>
    </div>
  );
}
