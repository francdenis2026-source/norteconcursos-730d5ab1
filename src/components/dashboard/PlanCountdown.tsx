import { useEffect, useState } from "react";
import { Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";

function parts(ms: number) {
  const t = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(t / 86400),
    h: Math.floor((t % 86400) / 3600),
    m: Math.floor((t % 3600) / 60),
    s: t % 60,
    over: ms <= 0,
  };
}

/** Relógio ao vivo até `endsAt`. Só começa a contar depois de montar (evita divergência SSR). */
function useRemaining(endsAt: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now === null ? null : parts(new Date(endsAt).getTime() - now);
}

const two = (n: number) => String(n).padStart(2, "0");

/** Versão compacta, para faixas e avisos: "12d 04:31:09". */
export function PlanCountdownInline({ endsAt }: { endsAt: string }) {
  const r = useRemaining(endsAt);
  if (!r) return null;
  if (r.over) return <strong>encerrado</strong>;
  return (
    <strong
      className="tabular-nums"
      aria-label={`Faltam ${r.d} dias, ${r.h} horas e ${r.m} minutos`}
    >
      {r.d}d {two(r.h)}:{two(r.m)}:{two(r.s)}
    </strong>
  );
}

/** Versão curta para a barra superior: "29d 06h". */
export function PlanCountdownShort({ endsAt }: { endsAt: string }) {
  const r = useRemaining(endsAt);
  if (!r) return null;
  if (r.over) return <strong>encerrado</strong>;
  return (
    <strong className="tabular-nums">
      {r.d}d {two(r.h)}h
    </strong>
  );
}

/** Versão completa: quatro blocos (dias, horas, minutos, segundos) e data de término. */
export function PlanCountdown({
  endsAt,
  planName,
  className,
}: {
  endsAt: string;
  planName: string;
  className?: string;
}) {
  const r = useRemaining(endsAt);
  const urgent = !!r && !r.over && r.d < 3;
  const end = new Date(endsAt).toLocaleString("pt-BR", { dateStyle: "long", timeStyle: "short" });

  const cells = r
    ? [
        ["Dias", String(r.d)],
        ["Horas", two(r.h)],
        ["Min", two(r.m)],
        ["Seg", two(r.s)],
      ]
    : [];

  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-card p-4",
        urgent && "border-amber-500/60",
        className,
      )}
      aria-label={`Tempo restante do plano ${planName}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          <Hourglass className="h-4 w-4 text-primary" aria-hidden /> Tempo restante · {planName}
        </p>
        <p className="text-xs text-muted-foreground">Termina em {end}</p>
      </div>

      {r?.over ? (
        <p className="mt-3 text-sm font-semibold text-amber-600">Período do plano encerrado.</p>
      ) : (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:max-w-md" role="timer" aria-live="off">
          {cells.map(([label, value]) => (
            <div key={label} className="rounded-lg bg-muted/60 py-2 text-center">
              <div
                className={cn(
                  "text-2xl font-black tabular-nums leading-none sm:text-3xl",
                  urgent && "text-amber-600",
                )}
              >
                {value}
              </div>
              <div className="mt-1 text-[0.62rem] font-semibold uppercase tracking-widest text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
