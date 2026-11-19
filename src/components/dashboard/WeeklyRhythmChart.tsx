import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
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
  const data = buckets.map((b) => ({ ...b, minutes: Math.round(b.seconds / 60) }));
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
        <figure className="ncx-figure ncx-figure--fill" ref={plotRef}>
          <figcaption className="sr-only">
            Evolução dos minutos de estudo por {unit}, últimos {buckets.length} {plural}. Total{" "}
            {formatDuration(total)}. Use o botão Tabela para ler todos os valores.
          </figcaption>
          <ResponsiveContainer width="100%" height="100%" minHeight={240}>
            <AreaChart
              data={data}
              margin={{ top: 22, right: 8, bottom: 0, left: 0 }}
              onClick={(state) => {
                const i = Number((state as { activeTooltipIndex?: number | string } | null)?.activeTooltipIndex);
                const b = Number.isFinite(i) ? data[i] : undefined;
                if (b && plotRef.current) onSelect(b.key, plotRef.current);
              }}
            >
              <defs>
                <linearGradient id="ncx-time-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--viz-time)" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="var(--viz-time)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--viz-grid)" strokeWidth={1} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={{ stroke: "var(--viz-axis)" }}
                interval={buckets.length > 14 ? 4 : 0}
                tick={{ fill: "var(--viz-muted)", fontSize: 11 }}
                tickMargin={8}
                padding={{ left: 8, right: 8 }}
              />
              <YAxis
                width={44}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                ticks={ticks}
                domain={[0, ticks.at(-1) ?? "auto"]}
                tickFormatter={(v: number) => shortDuration(v * 60)}
                tick={{ fill: "var(--viz-muted)", fontSize: 11 }}
              />
              <Tooltip
                cursor={{ stroke: "var(--viz-axis)", strokeWidth: 1 }}
                wrapperStyle={{ outline: "none" }}
                content={({ active: on, payload }) => {
                  const p = payload?.[0]?.payload as (StudyBucket & { minutes: number }) | undefined;
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
                        ...(average && p.seconds
                          ? [{ label: "Média do período", value: formatDuration(average), color: "var(--viz-muted)" }]
                          : []),
                      ]}
                    />
                  );
                }}
              />
              {average > 0 && (
                <ReferenceLine
                  y={Math.round(average / 60)}
                  stroke="var(--viz-muted)"
                  strokeWidth={1}
                  label={{
                    value: `média ${shortDuration(average)}`,
                    position: "insideTopRight",
                    fill: "var(--viz-muted)",
                    fontSize: 11,
                    dy: -14,
                  }}
                />
              )}
              <Area
                type="monotone"
                dataKey="minutes"
                name="Tempo ativo"
                stroke="var(--viz-time)"
                strokeWidth={2}
                fill="url(#ncx-time-fill)"
                dot={buckets.length <= 14 ? { r: 3, strokeWidth: 2, stroke: "var(--viz-surface)", fill: "var(--viz-time)" } : false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--viz-surface)", fill: "var(--viz-time)", cursor: "pointer" }}
                isAnimationActive={!prefersReducedMotion()}
                animationDuration={480}
              />
              {peak && peak.seconds > 0 && (
                <ReferenceDot
                  x={data.find((d) => d.key === peak.key)?.label ?? ""}
                  y={Math.round(peak.seconds / 60)}
                  r={0}
                  label={{
                    value: shortDuration(peak.seconds),
                    position: "top",
                    offset: 10,
                    className: "ncx-direct-label",
                  }}
                />
              )}
            </AreaChart>
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
