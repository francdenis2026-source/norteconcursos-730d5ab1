import { useState } from "react";
import { STUDY_PERIODS, studyPeriodSummary, type StudyPeriod } from "@/lib/dailyStudyActivity";
import { DailyStudyActivity } from "@/components/dashboard/DailyStudyActivity";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock, ListChecks, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { acreDateKey } from "@/lib/acreTime";
import {
  summarizeTraining,
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
  selectedDate,
  userName,
  userId,
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
  selectedDate: string | null;
  userName: string;
  userId: string;
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
  const [selection, setSelection] = useState<{
    key: string;
    period: StudyPeriod;
    day: string;
  } | null>(null);
  const today = acreDateKey(now);
  const selectionKey = `${userId}:${metric}:${selectedDate}`;
  const active =
    selection?.key === selectionKey
      ? selection
      : {
          key: selectionKey,
          period: metric === "week" ? ("7d" as const) : ("day" as const),
          day: selectedDate ?? today,
        };
  const setPeriod = (period: StudyPeriod) => setSelection({ ...active, period });
  const setDay = (day: string) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(day) && day <= today) setSelection({ ...active, day });
  };
  const timeMetric = metric === "today" || metric === "week";
  const definition = timeMetric
    ? active.period === "day"
      ? {
          ...definitions.today,
          title:
            active.day === today
              ? "Tempo ativo hoje"
              : `Tempo ativo em ${active.day.split("-").reverse().join("/")}`,
          description: "Seu tempo e suas atividades na data selecionada, no horário do Acre.",
        }
      : active.period === "7d" && active.day === today
        ? definitions.week
        : {
            ...definitions.week,
            title: `Histórico de estudo · ${STUDY_PERIODS.find((p) => p.value === active.period)?.label}`,
            description: "Tempo ativo e atividades no período selecionado, no horário do Acre.",
          }
    : metric
      ? definitions[metric]
      : null;
  return (
    <Dialog
      open={!!metric}
      onOpenChange={(open) => {
        if (!open) {
          setSelection(null);
          onClose();
        }
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
                userId={userId}
                selectedDate={active.day}
                period={active.period}
                onPeriodChange={setPeriod}
                onDayChange={setDay}
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
  userId,
  selectedDate,
  period,
  onPeriodChange,
  onDayChange,
  training,
  activity,
  live,
  now,
}: {
  metric: StudentMetric;
  userId: string;
  selectedDate: string | null;
  period: StudyPeriod;
  onPeriodChange: (period: StudyPeriod) => void;
  onDayChange: (day: string) => void;
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
  const day = selectedDate ?? today;
  const isToday = day === today;
  const time = studyPeriodSummary(activity, live, today, day, period);
  const peak = Math.max(1, ...time.buckets.map((d) => d.seconds));
  const dayRows = activity.filter(
    (r) => r.study_date === day && Number.isFinite(r.active_seconds) && r.active_seconds > 0,
  );
  const savedDay = dayRows.reduce((sum, r) => sum + r.active_seconds, 0);
  const fullDate = (date: string) => date.split("-").reverse().join("/");
  return (
    <div className="student-metric-panel__body" data-metric={metric}>
      <div className="study-period-controls">
        <div
          role="group"
          aria-label="Período do histórico"
          className="study-period-controls__options"
        >
          {STUDY_PERIODS.map((p) => (
            <button
              key={p.value}
              type="button"
              aria-pressed={period === p.value}
              onClick={() => onPeriodChange(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <label>
          {period === "day" ? "Data" : "Até a data"}
          <input
            aria-label="Data final do histórico"
            type="date"
            value={day}
            max={today}
            onChange={(event) => onDayChange(event.target.value)}
          />
        </label>
      </div>
      <div className="student-metric-panel__summary">
        <div>
          <span>
            {period === "day"
              ? `${isToday ? "Hoje, " : ""}${fullDate(day)} · Acre`
              : `${fullDate(time.days[0]?.date ?? day)} a ${fullDate(day)} · Acre`}
          </span>
          <strong>{duration(time.total)}</strong>
          <p>Tempo ativo de estudo</p>
        </div>
        <Clock aria-hidden="true" />
      </div>
      {period === "day" ? (
        <>
          <dl className="student-metric-panel__facts">
            <div>
              <dt>Tempo sincronizado do dia</dt>
              <dd>{duration(savedDay)}</dd>
            </div>
            <div>
              <dt>Sessões com atividade no dia</dt>
              <dd>{count(dayRows.length)}</dd>
            </div>
          </dl>
          <section>
            <h3>Como o tempo é contado</h3>
            <p>
              {isToday
                ? "O relógio considera sua atividade na plataforma. O total de hoje usa o maior valor entre as sessões sincronizadas e o relógio deste aparelho, sem somá-los duas vezes."
                : "Este total considera apenas as sessões sincronizadas na data selecionada. O tempo de hoje não é incluído neste histórico."}
            </p>
            <p>
              O dia renova à meia-noite do Acre. O registro sincronizado pode levar até um minuto
              para atualizar.
            </p>
          </section>
        </>
      ) : (
        <>
          <dl className="student-metric-panel__facts">
            <div>
              <dt>Dias com atividade</dt>
              <dd>
                {time.activeDays} de {time.days.length}
              </dd>
            </div>
            <div>
              <dt>Média por dia no período</dt>
              <dd>{duration(time.average)}</dd>
            </div>
          </dl>
          <section aria-label={time.monthly ? "Tempo por mês" : "Tempo por dia"}>
            <h3>{time.monthly ? "Tempo por mês" : "Tempo por dia"}</h3>
            {time.monthly && (
              <p className="daily-study-activity__note">
                Os meses nas extremidades incluem somente os dias dentro do intervalo exibido acima.
              </p>
            )}
            <ol className="student-metric-panel__days">
              {time.buckets.map((d) => (
                <li key={d.date}>
                  <span>
                    {time.monthly
                      ? `${d.date.slice(5, 7)}/${d.date.slice(2, 4)}`
                      : `${dateLabel(d.date)}${d.date === today ? " · Hoje" : ""}`}
                  </span>
                  <progress
                    aria-label={`Tempo em ${d.date}: ${duration(d.seconds)}`}
                    value={d.seconds}
                    max={peak}
                  />
                  <strong>{duration(d.seconds)}</strong>
                </li>
              ))}
            </ol>
          </section>
        </>
      )}
      {!time.total && (
        <p className="student-metric-panel__empty">
          Não há tempo ativo registrado {period === "day" ? "neste dia" : "neste período"}.
        </p>
      )}
      <DailyStudyActivity
        key={`${userId}:${period}:${day}`}
        userId={userId}
        day={day}
        period={period}
      />
    </div>
  );
}
