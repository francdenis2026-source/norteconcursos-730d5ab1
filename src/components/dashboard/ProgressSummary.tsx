import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Target, Trophy, TrendingUp } from "lucide-react";
import type { PerformanceOverview } from "@/hooks/usePerformanceOverview";
import { progressSummary, type ProgressPeriod } from "@/lib/progressSummary";
import { platformDate } from "@/lib/platformClock";
import { practiceSearch } from "@/lib/practiceLink";

export function ProgressSummary({ overview }: { overview: PerformanceOverview }) {
  const [period, setPeriod] = useState<ProgressPeriod>(30);
  const data = progressSummary(overview.responses, overview.attempts, period, platformDate());
  const training = overview.available.training;
  const completeActivity = training && overview.available.simulators;
  const percentage = data.accuracy ?? 0;
  return (
    <section
      aria-labelledby="progress-summary-title"
      className="rounded-2xl border bg-card p-4 sm:p-6 space-y-5"
      data-testid="progress-summary"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="progress-summary-title" className="text-xl font-bold">
            Seu progresso
          </h2>
          <p className="text-sm text-muted-foreground">
            Resultados da sua prática no período, no horário do Acre.
          </p>
        </div>
        <div role="group" aria-label="Período do progresso" className="flex rounded-xl border p-1">
          {([7, 30, "all"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={period === value}
              onClick={() => setPeriod(value)}
              className={`min-h-11 rounded-lg px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${period === value ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              {value === "all" ? "Tudo" : `${value} dias`}
            </button>
          ))}
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true" className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
          <div className="flex items-center gap-4 rounded-xl bg-muted/40 p-4">
            <div className="relative h-24 w-24 shrink-0">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-border"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  pathLength="100"
                  strokeDasharray={`${training ? percentage : 0} 100`}
                  strokeLinecap="round"
                  className="text-primary"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                {training && data.accuracy !== null ? `${data.accuracy}%` : "—"}
              </span>
            </div>
            <div>
              <p className="font-semibold">Aproveitamento</p>
              <p className="text-sm text-muted-foreground">
                {training
                  ? `${data.correct} ${data.correct === 1 ? "acerto" : "acertos"} em ${data.answered} ${data.answered === 1 ? "questão nova" : "questões novas"}`
                  : "Respostas indisponíveis"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Dias com prática" value={completeActivity ? data.days : "—"} />
            <Stat
              label="Simulados concluídos"
              value={overview.available.simulators ? data.simulators : "—"}
            />
            <div className="col-span-2 rounded-xl border p-3 text-sm">
              <TrendingUp className="mb-1 h-4 w-4 text-primary" aria-hidden="true" />
              <p className="font-semibold">Evolução dos acertos</p>
              <p className="text-muted-foreground">
                {training && data.evolution !== null
                  ? `${data.evolution > 0 ? "+" : ""}${data.evolution.toLocaleString("pt-BR")} pontos percentuais entre as duas metades do período (${data.earlier} e ${data.later} questões).`
                  : !training
                    ? "Respostas indisponíveis nesta atualização."
                    : "Disponível com pelo menos 5 questões novas em cada metade do período."}
              </p>
            </div>
          </div>
        </div>
        {training && data.best && (
          <div className="rounded-xl border p-4">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="h-4 w-4 text-primary" aria-hidden="true" />
              Maior aproveitamento no período
            </p>
            <p className="mt-1 font-semibold">{data.best.subject}</p>
            <p className="text-sm text-muted-foreground">
              {data.best.accuracy}% · {data.best.correct}/{data.best.total} acertos. Indicador
              relativo à sua amostra, sem atestar domínio.
            </p>
          </div>
        )}
        <div>
          <h3 className="flex items-center gap-2 font-semibold">
            <Target className="h-4 w-4 text-primary" aria-hidden="true" />
            Pontos a fortalecer
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Disciplinas abaixo de 60% de acerto, com pelo menos 5 questões novas no período.
          </p>
          {training && data.weak.length > 0 ? (
            <ul className="mt-3 grid gap-3 lg:grid-cols-2">
              {data.weak.map((subject) => (
                <li
                  key={subject.subject}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-muted/30 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold break-words">{subject.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {subject.accuracy}% · {subject.correct}/{subject.total} acertos
                    </p>
                  </div>
                  <Link
                    to="/dashboard/question-trainer"
                    search={practiceSearch(subject.subject)}
                    aria-label={`Treinar ${subject.subject}`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border bg-card px-3 text-sm font-semibold hover:bg-muted"
                  >
                    Treinar <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 rounded-xl bg-muted/40 p-4 text-sm">
              {!training
                ? "A consulta de respostas está indisponível. Tente atualizar os indicadores."
                : !data.answered
                  ? "Ainda não há questões novas respondidas neste período. Seu histórico completo continua disponível abaixo."
                  : "Nenhuma disciplina atende a esse critério neste período. Continue praticando para ampliar a amostra."}
            </p>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Acertos consideram somente a primeira resposta a cada questão no treinador; repetições
        contam como atividade. Dias com prática incluem respostas e simulados concluídos. Resultados
        dos simulados ficam separados do aproveitamento do treinador. Os atalhos respeitam os
        limites do seu plano.
      </p>
    </section>
  );
}
function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border p-3">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
