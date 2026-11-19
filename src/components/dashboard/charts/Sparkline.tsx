import * as React from "react";
import { Area, AreaChart, ReferenceDot, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltipCard } from "./ChartTooltip";
import { dayLabel } from "@/lib/dashboardTrends";

export type SparkPoint = { date: string; value: number | null };

/**
 * Minigráfico de tendência dos indicadores: linha neutra (contexto) e o ponto de hoje no acento.
 * Decorativo para leitores de tela: o valor principal e o resumo ficam no botão.
 */
export function Sparkline({
  points,
  format,
  label,
}: {
  points: SparkPoint[];
  format: (value: number) => string;
  label: string;
}) {
  const color = "var(--viz-muted)";
  const last = points.at(-1);
  const id = React.useId().replace(/:/g, "");
  const hasData = points.some((p) => (p.value ?? 0) > 0);
  return (
    <span className="ncx-spark" aria-hidden="true" data-empty={!hasData || undefined}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 4, right: 2, bottom: 2, left: 2 }}>
          <defs>
            <linearGradient id={`spark-${id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.14} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Tooltip
            cursor={{ stroke: color, strokeOpacity: 0.35, strokeDasharray: "3 3" }}
            wrapperStyle={{ outline: "none", zIndex: 5 }}
            allowEscapeViewBox={{ x: false, y: true }}
            content={({ active, payload }) => {
              const point = payload?.[0]?.payload as SparkPoint | undefined;
              if (!active || !point) return null;
              return (
                <ChartTooltipCard
                  title={dayLabel(point.date)}
                  rows={[
                    {
                      label,
                      value: point.value === null ? "—" : format(point.value),
                      color: "var(--viz-time)",
                    },
                  ]}
                />
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#spark-${id})`}
            connectNulls
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--viz-surface)", fill: "var(--viz-time)" }}
            isAnimationActive={false}
          />
          {last && last.value !== null && (
            <ReferenceDot
              x={points.length - 1}
              y={last.value}
              r={4}
              fill="var(--viz-time)"
              stroke="var(--viz-surface)"
              strokeWidth={2}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </span>
  );
}
