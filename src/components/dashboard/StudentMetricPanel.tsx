import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock, ListChecks, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { acreDateKey } from "@/lib/acreTime";
import {
  summarizeTraining,
  summarizeStudyTime,
  type TrainingRecord,
  type ActivityRecord,
} from "@/lib/studentDashboard";
import { fmtHuman } from "@/lib/studyClock";

export type StudentMetric = "questions" | "accuracy" | "today" | "week";
const definitions = {
  questions: {
    title: "Questões resolvidas",
    description: "Seu histórico de primeiras respostas no treinador.",
    icon: ListChecks,
  },
  accuracy: {
    title: "Taxa de acerto",
    description: "Seu aproveitamento nas primeiras respostas, por disciplina.",
    icon: CheckCircle2,
  },
  today: {
    title: "Tempo ativo hoje",
    description:
      "Seu tempo de estudo de hoje, somando as sessões sem duplicar o relógio do aparelho.",
    icon: Clock,
  },
  week: {
    title: "Estudo nesta semana",
    description: "Seu tempo ativo nos últimos sete dias, incluindo hoje.",
    icon: TrendingUp,
  },
};
const duration = (n: number) => (n > 0 ? fmtHuman(n) : "0 min");
const count = (n: number) => n.toLocaleString("pt-BR");
const dateLabel = (date: string) => `${date.slice(8, 10)}/${date.slice(5, 7)}`;

export function StudentMetricPanel({
  metric,
  userName,
  training,
  activity,
  live,
  now,
  loading,
  error,
  onRetry,
  onClose,
  returnFocus,
}: {
  metric: StudentMetric | null;
  userName: string;
  training: TrainingRecord[] | undefined;
  activity: ActivityRecord[] | undefined;
  live: number;
  now: Date;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  onClose: () => void;
  returnFocus: HTMLElement | null;
}) {
  const definition = metric ? definitions[metric] : null;
  return (
    <Dialog
      open={!!metric}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {definition && (
        <DialogContent
          className="student-metric-panel"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            returnFocus?.focus();
          }}
        >
          <header className="student-metric-panel__header">
            <span className="student-metric-panel__icon">
              <definition.icon aria-hidden="true" />
            </span>
            <div>
              <p className="student-metric-panel__owner">{userName} · Minha preparação</p>
              <DialogTitle>{definition.title}</DialogTitle>
              <DialogDescription>{definition.description}</DialogDescription>
            </div>
          </header>
          {error ? (
            <div role="alert" className="student-metric-panel__state">
              <p>
                Não foi possível conferir esta métrica. Os dados indisponíveis não foram tratados
                como zero.
              </p>
              <button type="button" onClick={onRetry}>
                Tentar novamente
              </button>
            </div>
          ) : loading ? (
            <p role="status" className="student-metric-panel__state">
              Conferindo seus registros…
            </p>
          ) : (
            metric && (
              <StudentMetricDetails
                metric={metric}
                training={training ?? []}
                activity={activity ?? []}
                live={live}
                now={now}
              />
            )
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}

/** All views share the exact summary functions used by the dashboard cards. */
export function StudentMetricDetails({
  metric,
  training,
  activity,
  live,
  now,
}: {
  metric: StudentMetric;
  training: TrainingRecord[];
  activity: ActivityRecord[];
  live: number;
  now: Date;
}) {
  const today = acreDateKey(now);
  if (metric === "questions" || metric === "accuracy") {
    const stats = summarizeTraining(training, null, today);
    const first = new Map<string, TrainingRecord>();
    for (const row of [...training].sort(
      (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at) || a.id.localeCompare(b.id),
    )) {
      const key = JSON.stringify([row.question_source, row.question_id]);
      if (row.question_id && typeof row.is_correct === "boolean" && !first.has(key))
        first.set(key, row);
    }
    const recent = [...first.values()]
      .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
      .slice(0, 10);
    return (
      <div className="student-metric-panel__body" data-metric={metric}>
        <div className="student-metric-panel__summary">
          <div>
            <span>
              {metric === "questions" ? "Questões distintas resolvidas" : "Aproveitamento geral"}
            </span>
            <strong>
              {metric === "questions"
                ? count(stats.total)
                : stats.accuracy === null
                  ? "—"
                  : `${stats.accuracy}%`}
            </strong>
            <p>
              {metric === "questions"
                ? `${count(stats.today)} respondidas hoje`
                : `${count(stats.correct)} acertos em ${count(stats.total)} questões`}
            </p>
          </div>
          <dl>
            <div>
              <dt>Acertos</dt>
              <dd>{count(stats.correct)}</dd>
            </div>
            <div>
              <dt>Erros</dt>
              <dd>{count(stats.wrong)}</dd>
            </div>
          </dl>
        </div>
        {!stats.total ? (
          <p className="student-metric-panel__empty">
            Você ainda não tem respostas registradas no treinador. Resolva sua primeira questão para
            acompanhar esta métrica.
          </p>
        ) : (
          <>
            <section
              aria-label={
                metric === "accuracy" ? "Acertos por disciplina" : "Questões por disciplina"
              }
            >
              <h3>
                {metric === "accuracy" ? "Acertos por disciplina" : "Questões por disciplina"}
              </h3>
              <div className="student-metric-panel__subjects">
                {stats.subjects.map((s) => (
                  <div key={s.subject}>
                    <div>
                      <strong>{s.subject}</strong>
                      <span>
                        {metric === "accuracy" ? `${s.accuracy}%` : `${count(s.total)} questões`}
                      </span>
                    </div>
                    <progress
                      aria-label={`${s.subject}: ${s.accuracy}% de acertos`}
                      value={s.correct}
                      max={s.total}
                    />
                    <p>
                      {count(s.correct)} acertos · {count(s.total - s.correct)} erros ·{" "}
                      {count(s.total)} respondidas
                    </p>
                  </div>
                ))}
              </div>
            </section>
            {metric === "questions" && (
              <section aria-label="Últimas questões respondidas">
                <h3>Últimas questões respondidas</h3>
                <ul className="student-metric-panel__history">
                  {recent.map((r) => (
                    <li key={JSON.stringify([r.question_source, r.question_id])}>
                      <div>
                        <strong>{r.subject || "Sem disciplina identificada"}</strong>
                        <span>
                          {new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "America/Rio_Branco",
                          }).format(new Date(r.created_at))}{" "}
                          · Acre
                        </span>
                      </div>
                      <span data-correct={r.is_correct}>{r.is_correct ? "Acertou" : "Errou"}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
        <footer>
          <p>
            O reforço não altera sua primeira resposta. Resultados de simulados ficam na área de
            simulados.
          </p>
          <Link to="/dashboard/question-trainer">
            {metric === "accuracy" ? "Praticar questões" : "Abrir treinador"}
            <ArrowRight aria-hidden="true" />
          </Link>
        </footer>
      </div>
    );
  }
  const time = summarizeStudyTime(activity, live, now);
  const activeDays = time.days.filter((d) => d.seconds > 0).length;
  const peak = Math.max(1, ...time.days.map((d) => d.seconds));
  const todayRows = activity.filter(
    (r) => r.study_date === today && Number.isFinite(r.active_seconds) && r.active_seconds > 0,
  );
  const savedToday = todayRows.reduce((sum, r) => sum + r.active_seconds, 0);
  return (
    <div className="student-metric-panel__body" data-metric={metric}>
      <div className="student-metric-panel__summary">
        <div>
          <span>
            {metric === "today"
              ? `Hoje, ${dateLabel(today)} · Acre`
              : `${dateLabel(time.days[0]?.date ?? today)} a ${dateLabel(today)} · Acre`}
          </span>
          <strong>{duration(metric === "today" ? time.today : time.week)}</strong>
          <p>Tempo ativo de estudo</p>
        </div>
        <Clock aria-hidden="true" />
      </div>
      {metric === "today" ? (
        <>
          <dl className="student-metric-panel__facts">
            <div>
              <dt>Tempo sincronizado de hoje</dt>
              <dd>{duration(savedToday)}</dd>
            </div>
            <div>
              <dt>Sessões com atividade registrada hoje</dt>
              <dd>{count(todayRows.length)}</dd>
            </div>
          </dl>
          <section>
            <h3>Como o tempo é contado</h3>
            <p>
              O relógio considera sua atividade na plataforma. O total de hoje usa o maior valor
              entre as sessões sincronizadas e o relógio deste aparelho, sem somá-los duas vezes.
            </p>
            <p>
              O dia renova à meia-noite do Acre. O registro sincronizado pode levar até um minuto
              para atualizar.
            </p>
          </section>
          {!time.today && (
            <p className="student-metric-panel__empty">Ainda não há tempo ativo registrado hoje.</p>
          )}
        </>
      ) : (
        <>
          <dl className="student-metric-panel__facts">
            <div>
              <dt>Dias com atividade</dt>
              <dd>{activeDays} de 7</dd>
            </div>
            <div>
              <dt>Média por dia no período</dt>
              <dd>{duration(Math.round(time.week / 7))}</dd>
            </div>
          </dl>
          <section aria-label="Tempo por dia">
            <h3>Tempo por dia</h3>
            <ol className="student-metric-panel__days">
              {time.days.map((d) => (
                <li key={d.date}>
                  <span>
                    {dateLabel(d.date)}
                    {d.date === today ? " · Hoje" : ""}
                  </span>
                  <progress
                    aria-label={`Tempo em ${dateLabel(d.date)}: ${duration(d.seconds)}`}
                    value={d.seconds}
                    max={peak}
                  />
                  <strong>{duration(d.seconds)}</strong>
                </li>
              ))}
            </ol>
          </section>
          {!time.week && (
            <p className="student-metric-panel__empty">
              Ainda não há atividade registrada neste período.
            </p>
          )}
        </>
      )}
    </div>
  );
}
