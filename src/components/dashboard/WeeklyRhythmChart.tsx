import { ArrowRight, CalendarDays, Clock3, Sparkles, TrendingUp } from "lucide-react";

type StudyDay = { date: string; seconds: number };

type WeeklyRhythmChartProps = {
  days: StudyDay[];
  onSelectDay: (date: string, trigger: HTMLButtonElement) => void;
  onOpenHistory: (trigger: HTMLButtonElement) => void;
  formatDuration: (seconds: number) => string;
};

/** Gráfico semanal com dados reais das sessões registradas no horário do Acre. */
export function WeeklyRhythmChart({
  days,
  onSelectDay,
  onOpenHistory,
  formatDuration,
}: WeeklyRhythmChartProps) {
  const total = days.reduce((sum, day) => sum + day.seconds, 0);
  const activeDays = days.filter((day) => day.seconds >= 60).length;
  const average = activeDays ? Math.round(total / activeDays) : 0;
  const peak = days.reduce<StudyDay | null>(
    (best, day) => (day.seconds > (best?.seconds ?? 0) ? day : best),
    null,
  );
  const scale = Math.max(3600, ...days.map((day) => day.seconds));
  const chartPoints = days.map((day, index) => ({
    ...day,
    x: 34 + index * 112,
    y: 184 - (day.seconds / scale) * 132,
  }));
  const firstPoint = chartPoints[0] ?? { x: 34, y: 184 };
  const lastPoint = chartPoints[chartPoints.length - 1] ?? firstPoint;
  const linePath = chartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = chartPoints.length
    ? `${linePath} L ${lastPoint.x} 188 L ${firstPoint.x} 188 Z`
    : "";
  const averageY = 184 - (average / scale) * 132;
  const peakDate = peak
    ? new Date(`${peak.date}T12:00:00Z`).toLocaleDateString("pt-BR", {
        weekday: "long",
        timeZone: "UTC",
      })
    : null;

  return (
    <div className="student-home__rhythm">
      <div className="student-home__rhythm-main">
        <div className="student-home__rhythm-metrics" aria-label="Resumo da semana">
          <div className="student-home__rhythm-metric student-home__rhythm-metric--primary">
            <span><Clock3 aria-hidden="true" /> Tempo estudado</span>
            <strong>{formatDuration(total)}</strong>
            <small>nos últimos 7 dias</small>
          </div>
          <div className="student-home__rhythm-metric">
            <span><CalendarDays aria-hidden="true" /> Dias ativos</span>
            <strong>{activeDays}<small> / 7</small></strong>
            <small>com pelo menos 1 min de estudo</small>
          </div>
          <div className="student-home__rhythm-metric">
            <span><TrendingUp aria-hidden="true" /> Média por dia ativo</span>
            <strong>{formatDuration(average)}</strong>
            <small>considerando dias com estudo</small>
          </div>
        </div>

        <div className="student-home__rhythm-chart">
          <div className="student-home__rhythm-chart-head">
            <div>
              <strong>Atividade diária</strong>
              <span>Distribuição do seu tempo de estudo</span>
            </div>
            <span className="student-home__rhythm-period">ÚLTIMOS 7 DIAS</span>
          </div>

          <div className="student-home__rhythm-plot">
            <div className="student-home__rhythm-axis" aria-hidden="true">
              <span>{formatDuration(scale)}</span>
              <span>{formatDuration(Math.round(scale / 2))}</span>
              <span>0 min</span>
            </div>
            <svg
              viewBox="0 0 706 204"
              preserveAspectRatio="none"
              role="img"
              aria-label={`Gráfico de atividade dos últimos sete dias. Total: ${formatDuration(total)}.`}
            >
              <defs>
                <linearGradient id="weekly-rhythm-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--rhythm-accent)" stopOpacity=".34" />
                  <stop offset="100%" stopColor="var(--rhythm-accent)" stopOpacity=".015" />
                </linearGradient>
                <linearGradient id="weekly-rhythm-line" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="var(--rhythm-accent-soft)" />
                  <stop offset="100%" stopColor="var(--rhythm-accent)" />
                </linearGradient>
              </defs>
              {[52, 96, 140, 184].map((y) => (
                <line
                  key={y}
                  x1="30"
                  x2="706"
                  y1={y}
                  y2={y}
                  className="student-home__rhythm-gridline"
                />
              ))}
              {average > 0 && (
                <>
                  <line
                    x1="30"
                    x2="706"
                    y1={averageY}
                    y2={averageY}
                    className="student-home__rhythm-average"
                  />
                  <text x="700" y={Math.max(14, averageY - 7)} textAnchor="end" className="student-home__rhythm-average-label">
                    MÉDIA
                  </text>
                </>
              )}
              {areaPath && <path d={areaPath} fill="url(#weekly-rhythm-area)" />}
              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="url(#weekly-rhythm-line)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              )}
              {chartPoints.map((point) => (
                <g key={point.date}>
                  <circle cx={point.x} cy={point.y} r="8" className="student-home__rhythm-point-halo" />
                  <circle cx={point.x} cy={point.y} r="4.5" className="student-home__rhythm-point" />
                </g>
              ))}
            </svg>
          </div>

          <div className="student-home__rhythm-days" aria-label="Detalhes por dia">
            {days.map((day) => {
              const date = new Date(`${day.date}T12:00:00Z`);
              const weekday = date
                .toLocaleDateString("pt-BR", { weekday: "short", timeZone: "UTC" })
                .replace(".", "");
              return (
                <button
                  type="button"
                  key={day.date}
                  className="student-home__rhythm-day"
                  data-active={day.seconds >= 60 || undefined}
                  aria-label={`${weekday}, ${day.date.split("-").reverse().join("/")}: ${formatDuration(day.seconds)}. Ver detalhes do dia.`}
                  onClick={(event) => onSelectDay(day.date, event.currentTarget)}
                >
                  <span>{weekday}</span>
                  <strong>{day.date.slice(8, 10)}</strong>
                  <small>{day.seconds ? formatDuration(day.seconds) : "—"}</small>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="student-home__rhythm-insights" aria-label="Leitura do seu ritmo">
        <div className="student-home__rhythm-insights-heading">
          <span><Sparkles aria-hidden="true" /></span>
          <div>
            <strong>Leitura da semana</strong>
            <small>Resumo baseado nos seus registros</small>
          </div>
        </div>
        <div className="student-home__rhythm-peak">
          <span>Seu dia de maior dedicação</span>
          {peak && peak.seconds > 0 ? (
            <>
              <strong>{peakDate}</strong>
              <b>{formatDuration(peak.seconds)}</b>
            </>
          ) : (
            <strong>Seus primeiros estudos aparecerão aqui</strong>
          )}
        </div>
        <div className="student-home__rhythm-consistency">
          <div>
            <span>Frequência de estudo</span>
            <strong>{activeDays}/7 dias</strong>
          </div>
          <div
            className="student-home__rhythm-progress"
            role="progressbar"
            aria-label="Frequência de estudo na semana"
            aria-valuemin={0}
            aria-valuemax={7}
            aria-valuenow={activeDays}
          >
            <i style={{ width: `${(activeDays / 7) * 100}%` }} />
          </div>
          <small>
            {activeDays === 7
              ? "Você manteve uma rotina diária nesta semana."
              : activeDays > 0
                ? `Você registrou estudo em ${activeDays} de 7 dias.`
                : "Comece com um período curto e construa sua rotina."}
          </small>
        </div>
        <button
          type="button"
          className="student-home__rhythm-history"
          onClick={(event) => onOpenHistory(event.currentTarget)}
        >
          Ver histórico completo <ArrowRight aria-hidden="true" />
        </button>
      </aside>
    </div>
  );
}
