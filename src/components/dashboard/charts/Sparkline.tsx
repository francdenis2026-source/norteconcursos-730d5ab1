import * as React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartTooltipCard } from "./ChartTooltip";
import { dayLabel } from "@/lib/dashboardTrends";

export type SparkPoint = { date: string; value: number | null };

/**
 * Minigráfico de tendência para os indicadores do topo.
 * Decorativo para leitores de tela: o valor principal e o resumo ficam no botão.
 */
export function Sparkline({
  points,
  color,
  format,
  label,
}: {
  points: SparkPoint[];
  color: string;
  format: (value: number) => string;
  label: string;
}) {
  const id = React.useId().replace(/:/g, "");
  const hasData = points.some((p) => (p.value ?? 0) > 0);
  return (
    <span className="ncx-spark" aria-hidden="true" data-empty={!hasData || undefined}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 4, right: 2, bottom: 2, left: 2 }}>
          <defs>
            <linearGradient id={`spark-${id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.32} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
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
                      color,
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
            strokeWidth={2}
            fill={`url(#spark-${id})`}
            connectNulls
            dot={false}
            activeDot={{ r: 3.5, strokeWidth: 2, stroke: "var(--card)", fill: color }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </span>
  );
}
