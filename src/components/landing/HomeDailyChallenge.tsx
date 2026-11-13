import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock3, Flame, MessageSquareText, RefreshCw, UserPlus } from "lucide-react";
import { formatCountdown, secondsUntilAcreMidnight } from "@/lib/acreTime";
import { GUEST_DAILY_LIMIT, getGuestRemainingToday, onAcreDayChange } from "@/lib/guestQuota";

/** Área do Desafio diário na home do desktop; a cota e a virada do dia vêm das mesmas fontes do selo. */
export function HomeDailyChallenge() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [seconds, setSeconds] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () => void getGuestRemainingToday().then((n) => alive && setRemaining(n));
    load();
    const stop = onAcreDayChange(load);
    const tick = () => setSeconds(secondsUntilAcreMidnight());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => {
      alive = false;
      stop();
      window.clearInterval(id);
    };
  }, []);

  const left = remaining ?? GUEST_DAILY_LIMIT;
  const used = GUEST_DAILY_LIMIT - left;
  const done = remaining !== null && remaining <= 0;
  const countdown = seconds === null ? "--:--:--" : formatCountdown(seconds);

  return (
    <section id="desafio-diario-home" className="hd" aria-labelledby="hd-title">
      <div className="hd__inner">
        <div className="hd__copy">
          <span className="hd__tag">
            <Flame aria-hidden="true" /> Desafio diário · grátis
          </span>
          <h2 id="hd-title">
            {done ? (
              <>Desafio de hoje <em>concluído.</em></>
            ) : (
              <>{GUEST_DAILY_LIMIT} questões por dia. <em>Sem cadastro.</em></>
            )}
          </h2>
          <p>
            {done
              ? "Você respondeu todas as questões de hoje. Crie sua conta gratuita para continuar treinando e guardar o seu progresso."
              : "Todo dia, as mesmas questões para todos os candidatos. Responda, veja o comentário de cada item e descubra como você está antes de criar a conta."}
          </p>
          <div
            className="hd__progress"
            role="img"
            aria-label={`${used} de ${GUEST_DAILY_LIMIT} questões respondidas hoje`}
          >
            <div className="hd__dots">
              {Array.from({ length: GUEST_DAILY_LIMIT }, (_, i) => (
                <i key={i} data-on={i < used} />
              ))}
            </div>
            <span>
              <strong>{used}</strong> de {GUEST_DAILY_LIMIT} respondidas hoje
            </span>
          </div>
          <ul className="hd__perks">
            <li><CheckCircle2 aria-hidden="true" /> Questões de provas oficiais</li>
            <li><MessageSquareText aria-hidden="true" /> Comentário em cada item</li>
            <li><RefreshCw aria-hidden="true" /> Renova à meia-noite (horário do Acre)</li>
          </ul>
          <div className="hd__actions">
            {!done && (
              <Link to="/desafio-diario" className="hd__primary">
                {used > 0 ? "Continuar desafio" : "Começar desafio"} <ArrowRight aria-hidden="true" />
              </Link>
            )}
            <Link to="/auth" search={{ mode: "register" }} className={done ? "hd__primary" : "hd__ghost"}>
              <UserPlus aria-hidden="true" /> Criar conta grátis
            </Link>
          </div>
        </div>
        <div className="hd__media">
          <img src="/media/hero/exam-simulator.webp" alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <div className="hd__clock" aria-label={`Novas questões em ${countdown}`}>
            <Clock3 aria-hidden="true" />
            <span>
              <small>Novas questões em</small>
              <strong>{countdown}</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
