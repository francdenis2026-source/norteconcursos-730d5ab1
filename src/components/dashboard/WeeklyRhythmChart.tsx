import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, CalendarDays, Clock3, Flame, TrendingUp } from "lucide-react";
import { ChartTooltipCard } from "@/components/dashboard/charts/ChartTooltip";
import { dayLabel, prefersReducedMotion, shortDuration } from "@/lib/dashboardTrends";

type StudyDay = { date: string; seconds: number };

const RANGES = [
  [7, "7 dias"],
  [14, "14 dias"],
  [30, "30 dias"],
] as const;
type Range = (typeof RANGES)[number][0];

type WeeklyRhythmChartProps = {
  /** Até 30 dias, do mais antigo ao mais recente, no horário do Acre. */
  days: StudyDay[];
  onSelectDay: (date: string, trigger: HTMLElement) => void;
  onOpenHistory: (trigger: HTMLButtonElement) => void;
  formatDuration: (seconds: number) => string;
};

/** Ritmo de estudo com dados reais das sessões registradas, em 7, 14 ou 30 dias. */
export function WeeklyRhythmChart({
  days: allDays,
  onSelectDay,
  onOpenHistory,
  formatDuration,
}: WeeklyRhythmChartProps) {
  const [range, setRange] = React.useState<Range>(7);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const plotRef = React.useRef<HTMLDivElement>(null);
  const days = React.useMemo(() => allDays.slice(-range), [allDays, range]);
  const total = days.reduce((sum, day) => sum + day.seconds, 0);
  const activeDays = days.filter((day) => day.seconds >= 60).length;
  const average = activeDays ? Math.round(total / activeDays) : 0;
  const peak = days.reduce<StudyDay | null>(
    (best, day) => (day.seconds > (best?.seconds ?? 0) ? day : best),
    null,
  );
  let streak = 0;
  for (let i = days.length - 1; i >= 0 && days[i]!.seconds >= 60; i--) streak++;
  const data = days.map((day) => ({ ...day, minutes: Math.round(day.seconds / 60) }));
  const peakDate = peak
    ? new Date(`${peak.date}T12:00:00Z`).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        timeZone: "UTC",
      })
    : null;
  const todayKey = days[days.length - 1]?.date;

  return (
    <div className="ncx-rhythm">
      <div className="ncx-toolbar">
        <dl className="ncx-stats" aria-label="Resumo do período">
          <div>
            <dt>
              <Clock3 aria-hidden="true" /> Tempo estudado
            </dt>
            <dd>{formatDuration(total)}</dd>
          </div>
          <div>
            <dt>
              <CalendarDays aria-hidden="true" /> Dias ativos
            </dt>
            <dd>
              {activeDays}
              <small>/{range}</small>
            </dd>
          </div>
          <div>
            <dt>
              <TrendingUp aria-hidden="true" /> Média por dia ativo
            </dt>
            <dd>{formatDuration(average)}</dd>
          </div>
        </dl>
        <div className="ncx-segmented" role="group" aria-label="Período do gráfico">
          {RANGES.map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={range === value}
              onClick={() => setRange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <figure className="ncx-plot" ref={plotRef}>
        <figcaption className="sr-only">
          Minutos estudados por dia nos últimos {range} dias. Total: {formatDuration(total)}.
          Clique em uma barra para ver o dia.
        </figcaption>
        <ResponsiveContainer width="100%" height="100%" minHeight={224}>
          <BarChart
            data={data}
            margin={{ top: 14, right: 8, bottom: 0, left: -6 }}
            barCategoryGap={range === 30 ? "18%" : "28%"}
            onMouseLeave={() => setHovered(null)}
          >
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              interval={range === 30 ? 4 : range === 14 ? 1 : 0}
              tickFormatter={(value: string) => (range === 7 ? dayLabel(value) : value.slice(8, 10))}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              tickMargin={8}
            />
            <YAxis
              width={46}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              tickFormatter={(value: number) => shortDuration(value * 60)}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            />
            <Tooltip
              cursor={{ fill: "var(--foreground)", fillOpacity: 0.05, radius: 8 }}
              wrapperStyle={{ outline: "none" }}
              content={({ active, payload }) => {
                const point = payload?.[0]?.payload as (StudyDay & { minutes: number }) | undefined;
                if (!active || !point) return null;
                const diff = average ? point.seconds - average : 0;
                return (
                  <ChartTooltipCard
                    title={new Date(`${point.date}T12:00:00Z`).toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      timeZone: "UTC",
                    })}
                    rows={[
                      {
                        label: "Tempo ativo",
                        value: point.seconds ? formatDuration(point.seconds) : "Sem estudo",
                        color: "var(--sh2-gold)",
                      },
                      ...(average && point.seconds
                        ? [
                            {
                              label: "Em relação à média",
                              value: `${diff >= 0 ? "+" : "−"}${formatDuration(Math.abs(diff))}`,
                            },
                          ]
                        : []),
                    ]}
                  />
                );
              }}
            />
            {average > 0 && (
              <ReferenceLine
                y={Math.round(average / 60)}
                stroke="var(--sh2-gold)"
                strokeDasharray="5 5"
                strokeOpacity={0.7}
                label={{
                  value: `média ${shortDuration(average)}`,
                  position: "insideTopRight",
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                }}
              />
            )}
            <Bar
              dataKey="minutes"
              name="Minutos"
              radius={[6, 6, 2, 2]}
              maxBarSize={44}
              cursor="pointer"
              animationDuration={420}
                    isAnimationActive={!prefersReducedMotion()}
              onMouseEnter={(_, index) => setHovered(index)}
              onClick={(_, index) => {
                const day = data[index];
                if (day && plotRef.current) onSelectDay(day.date, plotRef.current);
              }}
            >
              {data.map((day, index) => (
                <Cell
                  key={day.date}
                  fill={
                    day.date === peak?.date && peak.seconds > 0
                      ? "var(--sh2-gold)"
                      : "color-mix(in oklab, var(--sh2-gold) 55%, var(--card))"
                  }
                  fillOpacity={hovered === null || hovered === index ? 1 : 0.55}
                  stroke={day.date === todayKey ? "var(--sh2-gold)" : "none"}
                  strokeWidth={day.date === todayKey ? 1.5 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </figure>

      {range === 7 && (
        <div className="ncx-days" aria-label="Detalhes por dia">
          {days.map((day) => (
            <button
              type="button"
              key={day.date}
              data-active={day.seconds >= 60 || undefined}
              data-today={day.date === todayKey || undefined}
              aria-label={`${dayLabel(day.date)}: ${formatDuration(day.seconds)}. Ver detalhes do dia.`}
              onClick={(event) => onSelectDay(day.date, event.currentTarget)}
            >
              <span>{dayLabel(day.date)}</span>
              <strong>{day.seconds ? shortDuration(day.seconds) : "—"}</strong>
            </button>
          ))}
        </div>
      )}

      <footer className="ncx-foot">
        <p>
          {peak && peak.seconds > 0 ? (
            <>
              <Flame aria-hidden="true" /> Maior dedicação: <strong>{peakDate}</strong> ·{" "}
              {formatDuration(peak.seconds)}
              {streak > 1 && <> · {streak} dias seguidos</>}
            </>
          ) : (
            "Seus primeiros estudos aparecerão aqui."
          )}
        </p>
        <button type="button" className="ncx-link" onClick={(event) => onOpenHistory(event.currentTarget)}>
          Histórico completo <ArrowRight aria-hidden="true" />
        </button>
      </footer>
    </div>
  );
}
