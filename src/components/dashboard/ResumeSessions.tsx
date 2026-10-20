// "Continuar de onde parou": treino ou simulado em andamento neste navegador, com o que já foi
// acertado, errado, pulado e o que falta. As respostas já confirmadas ficam no histórico da conta;
// o marcador local só guarda a posição e a lista de questões da sessão (src/lib/sessionResume.ts).
import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Clock3, PlayCircle, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { platformNow } from "@/lib/platformClock";
import { readInProgressSessions, type ResumeSession } from "@/lib/sessionResume";

function minutes(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h${String(m).padStart(2, "0")}min` : `${m}min`;
}

export function ResumeSessions({
  userId,
  only,
  skipRoute,
  className,
}: {
  userId: string | undefined;
  /** Mostra só um tipo (ex.: no treinador, só o treino). */
  only?: ResumeSession["kind"];
  /** Rota atual do treinador: sessão salva com os mesmos filtros já é retomada pela própria tela. */
  skipRoute?: string;
  className?: string;
}) {
  const [sessions, setSessions] = React.useState<ResumeSession[]>([]);
  React.useEffect(() => {
    if (!userId) return;
    const load = () => {
      try {
        setSessions(readInProgressSessions(localStorage, userId, platformNow()));
      } catch {
        setSessions([]);
      }
    };
    load();
    window.addEventListener("storage", load);
    window.addEventListener("focus", load);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("focus", load);
    };
  }, [userId]);
  const visible = sessions.filter(
    (s) =>
      (!only || s.kind === only) &&
      !(
        skipRoute &&
        s.kind === "trainer" &&
        JSON.stringify(Object.entries(s.search).sort(([a], [b]) => a.localeCompare(b))) ===
          skipRoute
      ),
  );
  if (!visible.length) return null;
  return (
    <section aria-label="Sessões em andamento" className={className ?? "space-y-3"}>
      {visible.map((s) => {
        const done = s.kind === "trainer" ? s.answered + s.skipped : s.answered;
        return (
          <article
            key={`${s.kind}:${s.title}`}
            className="rounded-2xl border border-primary/30 bg-primary/5 p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  {s.kind === "trainer" ? "Treino em andamento" : "Prova em andamento"}
                </p>
                <h2 className="mt-1 break-words text-base font-bold">{s.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Você parou na questão {s.position} de {s.total}.
                </p>
              </div>
              <Button asChild>
                <Link to={s.to} search={s.search as never}>
                  <PlayCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  {s.unsavedResult ? "Salvar resultado" : "Continuar"}
                </Link>
              </Button>
            </div>
            <Progress
              className="mt-3 h-2"
              value={s.total ? (done / s.total) * 100 : 0}
              aria-label="Progresso da sessão"
            />
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
              {s.kind === "trainer" ? (
                <>
                  <Item label="Acertos" value={s.correct ?? 0} />
                  <Item label="Erros" value={s.wrong ?? 0} />
                  <Item label="Puladas" value={s.skipped} icon />
                  <Item label="Faltam" value={s.remaining} />
                </>
              ) : (
                <>
                  <Item label="Respondidas" value={s.answered} />
                  <Item label="Puladas" value={s.skipped} icon />
                  <Item label="Em branco" value={s.remaining} />
                  <div>
                    <dt className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock3 className="h-3 w-3" aria-hidden="true" /> Tempo
                    </dt>
                    <dd className="font-bold">
                      {s.unsavedResult || (s.secondsLeft ?? 0) <= 0
                        ? "encerrado"
                        : minutes(s.secondsLeft ?? 0)}
                    </dd>
                  </div>
                </>
              )}
            </dl>
            {s.kind === "simulator" && (
              <p className="mt-2 text-xs text-muted-foreground">
                {s.unsavedResult || (s.secondsLeft ?? 0) <= 0
                  ? "O prazo terminou: abra a prova para finalizar e registrar o resultado."
                  : "O relógio da prova continua correndo enquanto você está fora. O gabarito só aparece na entrega."}
              </p>
            )}
          </article>
        );
      })}
    </section>
  );
}

function Item({ label, value, icon }: { label: string; value: number; icon?: boolean }) {
  return (
    <div>
      <dt className="flex items-center gap-1 text-xs text-muted-foreground">
        {icon && <SkipForward className="h-3 w-3" aria-hidden="true" />}
        {label}
      </dt>
      <dd className="font-bold">{value}</dd>
    </div>
  );
}
