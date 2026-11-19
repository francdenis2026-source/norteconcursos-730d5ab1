import * as React from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight } from "lucide-react";
import { ChartTooltipCard } from "@/components/dashboard/charts/ChartTooltip";
import { ChartTable, ViewToggle } from "@/components/dashboard/charts/ChartTable";
import {
  minuteTicks,
  prefersReducedMotion,
  shortDuration,
  type StudyBucket,
} from "@/lib/dashboardTrends";

type WeeklyRhythmChartProps = {
  buckets: StudyBucket[];
  /** "dia" para 7 e 30 dias; "mês" para 12 meses. */
  unit: "dia" | "mês";
  onSelect: (key: string, trigger: HTMLElement) => void;
  onOpenHistory: (trigger: HTMLButtonElement) => void;
  formatDuration: (seconds: number) => string;
};

/**
 * Tempo ativo por período: uma série, colunas finas, média como referência.
 * Só o pico recebe rótulo direto; os demais valores ficam na dica e na tabela.
 */
export function WeeklyRhythmChart({
  buckets,
  unit,
  onSelect,
  onOpenHistory,
  formatDuration,
}: WeeklyRhythmChartProps) {
  const [view, setView] = React.useState<"chart" | "table">("chart");
  const plotRef = React.useRef<HTMLDivElement>(null);
  const total = buckets.reduce((sum, b) => sum + b.seconds, 0);
  const active = buckets.filter((b) => b.seconds >= 60);
  const average = active.length ? Math.round(total / active.length) : 0;
  const peak = buckets.reduce<StudyBucket | null>(
    (best, b) => (b.seconds > (best?.seconds ?? 0) ? b : best),
    null,
  );
  // Média móvel (3 períodos; 7 em 30 dias) para mostrar a tendência por cima das barras.
  const win = buckets.length > 14 ? 7 : 3;
  const data = buckets.map((b, i) => {
    const slice = buckets.slice(Math.max(0, i - win + 1), i + 1);
    return {
      ...b,
      minutes: Math.round(b.seconds / 60),
      trend: Math.round(slice.reduce((s2, x) => s2 + x.seconds, 0) / slice.length / 60),
    };
  });
  const plural = unit === "dia" ? "dias" : "meses";
  const ticks = minuteTicks(Math.max(...data.map((d) => d.minutes), Math.round(average / 60), 30));

  return (
    <div className="ncx-panel">
      <dl className="ncx-summary">
        <div>
          <dt>Tempo total</dt>
          <dd>{formatDuration(total)}</dd>
        </div>
        <div>
          <dt>{unit === "dia" ? "Dias com estudo" : "Meses com estudo"}</dt>
          <dd>
            {active.length}
            <span> de {buckets.length}</span>
          </dd>
        </div>
        <div>
          <dt>Média por {unit} ativo</dt>
          <dd>{formatDuration(average)}</dd>
        </div>
      </dl>

      {view === "chart" ? (
        <figure className="ncx-figure" ref={plotRef}>
          <figcaption className="ncx-legend" aria-hidden="true">
            <span><i style={{ background: "var(--viz-time)" }} /> Tempo ativo</span>
            <span><i data-line style={{ background: "var(--viz-trend)" }} /> Tendência</span>
          </figcaption>
          <p className="sr-only">
            Evolução dos minutos de estudo por {unit}, últimos {buckets.length} {plural}. Total{" "}
            {formatDuration(total)}. Use o botão Tabela para ler todos os valores.
          </p>
          <ResponsiveContainer width="100%" height={196}>
            <ComposedChart
              data={data}
              margin={{ top: 8, right: 6, bottom: 0, left: 0 }}
              barCategoryGap="28%"
              onClick={(state) => {
                const i = Number((state as { activeTooltipIndex?: number | string } | null)?.activeTooltipIndex);
                const b = Number.isFinite(i) ? data[i] : undefined;
                if (b && plotRef.current) onSelect(b.key, plotRef.current);
              }}
            >
              <defs>
                <linearGradient id="ncx-time-bar" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--viz-time)" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="var(--viz-time)" stopOpacity={0.35} />
                </linearGradient>
                <filter id="ncx-glow" x="-20%" y="-50%" width="140%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--viz-grid)" strokeWidth={1} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={{ stroke: "var(--viz-axis)" }}
                interval={buckets.length > 14 ? 4 : 0}
                tick={{ fill: "var(--viz-muted)", fontSize: 11 }}
                tickMargin={6}
              />
              <YAxis
                width={40}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                ticks={ticks}
                domain={[0, ticks.at(-1) ?? "auto"]}
                tickFormatter={(v: number) => shortDuration(v * 60)}
                tick={{ fill: "var(--viz-muted)", fontSize: 11 }}
              />
              <Tooltip
                cursor={{ fill: "var(--viz-hover)" }}
                wrapperStyle={{ outline: "none" }}
                content={({ active: on, payload }) => {
                  const p = payload?.[0]?.payload as (StudyBucket & { minutes: number; trend: number }) | undefined;
                  if (!on || !p) return null;
                  return (
                    <ChartTooltipCard
                      title={p.fullLabel}
                      rows={[
                        {
                          label: "Tempo ativo",
                          value: p.seconds ? formatDuration(p.seconds) : "Sem estudo",
                          color: "var(--viz-time)",
                        },
                        { label: `Tendência (${win} ${unit === "dia" ? "dias" : "meses"})`, value: formatDuration(p.trend * 60), color: "var(--viz-trend)" },
                      ]}
                    />
                  );
                }}
              />
              <Bar
                dataKey="minutes"
                name="Tempo ativo"
                fill="url(#ncx-time-bar)"
                radius={[4, 4, 0, 0]}
                maxBarSize={18}
                cursor="pointer"
                isAnimationActive={!prefersReducedMotion()}
                animationDuration={420}
              />
              <Line
                type="monotone"
                dataKey="trend"
                name="Tendência"
                stroke="var(--viz-trend)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--viz-surface)", fill: "var(--viz-trend)" }}
                filter="url(#ncx-glow)"
                isAnimationActive={!prefersReducedMotion()}
                animationDuration={600}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </figure>
      ) : (
        <ChartTable
          caption={`Tempo ativo por ${unit}`}
          columns={[unit === "dia" ? "Dia" : "Mês", "Tempo ativo"]}
          rows={[...buckets].reverse().map((b) => [b.fullLabel, b.seconds ? formatDuration(b.seconds) : "—"])}
        />
      )}

      <footer className="ncx-footer">
        <ViewToggle view={view} onChange={setView} />
        <button type="button" className="ncx-link" onClick={(e) => onOpenHistory(e.currentTarget)}>
          Histórico completo <ArrowRight aria-hidden="true" />
        </button>
      </footer>
    </div>
  );
}
