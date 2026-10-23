import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { acreDateKey } from "@/lib/acreTime";
import type {
  PerformanceOverview,
  SimulatorActivity,
  TrainingActivity,
} from "@/hooks/usePerformanceOverview";

const EMERALD = "#10b981";
const ROSE = "#f43f5e";
const AMBER = "#f59e0b";
const SKY = "#0ea5e9";
const VIOLET = "#8b5cf6";
const GOLD = "var(--brass)";

const TOOLTIP_STYLE = {
  backgroundColor: "var(--popover)",
  color: "var(--popover-foreground)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  fontSize: 12,
  padding: "8px 12px",
  boxShadow: "0 12px 28px rgb(0 0 0 / 18%)",
};
/* Recharts uses separate inline styles for the tooltip label and each
   value/name row. Without these, dark-mode popovers inherit black text. */
const TOOLTIP_LABEL_STYLE = {
  color: "var(--popover-foreground)",
  fontWeight: 700,
};
const TOOLTIP_ITEM_STYLE = {
  color: "var(--popover-foreground)",
  fontWeight: 600,
};
const AXIS_TICK = { fill: "var(--muted-foreground)", fontSize: 11 };

function ChartCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-[200px] pt-0">{children}</CardContent>
    </Card>
  );
}

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex h-full items-center justify-center text-center text-xs text-muted-foreground">
      {message}
    </div>
  );
}

function weekMondayKey(iso: string): string {
  const dt = new Date(`${acreDateKey(new Date(iso))}T00:00:00`);
  const day = dt.getDay();
  dt.setDate(dt.getDate() + ((day === 0 ? -6 : 1) - day));
  return dt.toISOString().slice(0, 10);
}

function dayLabel(key: string): string {
  const [, m, d] = key.split("-");
  return `${d}/${m}`;
}

const WEEKS = 8;
const DAYS = 14;

export function PerformanceChartsGrid({ overview }: { overview: PerformanceOverview }) {
  const { trainer, responses, attempts, available } = overview;

  const accuracyData = React.useMemo(() => {
    if (!trainer.totalAnswered) return [];
    const wrong = trainer.totalAnswered - trainer.totalCorrect;
    return [
      { name: "Acertos", value: trainer.totalCorrect },
      { name: "Erros", value: wrong },
    ].filter((d) => d.value > 0);
  }, [trainer.totalAnswered, trainer.totalCorrect]);

  const evolutionData = React.useMemo(
    () => buildWeeklyEvolution(responses, WEEKS),
    [responses],
  );

  const subjectData = React.useMemo(
    () =>
      trainer.bySubject
        .filter((s) => s.total > 0)
        .sort((a, b) => b.total - a.total)
        .slice(0, 6)
        .map((s) => ({ subject: s.subject, accuracy: s.accuracy, total: s.total }))
        .sort((a, b) => b.accuracy - a.accuracy),
    [trainer.bySubject],
  );

  const bancaData = React.useMemo(() => buildBancaData(attempts), [attempts]);

  const activityData = React.useMemo(() => buildDailyActivity(responses, DAYS), [responses]);

  const goal = React.useMemo(() => readDailyGoal(), []);
  const todayCount = activityData.length ? activityData[activityData.length - 1]!.total : 0;
  const goalPercent = goal > 0 ? Math.min(100, Math.round((todayCount / goal) * 100)) : 0;
  const goalData = [{ name: "meta", value: goalPercent, fill: GOLD }];

  return (
    <div className="performance-charts grid gap-4 xl:grid-cols-4">
      <ChartCard
        title="Acertos x erros"
        description="Treinador, 1ª resposta de cada questão"
        className="xl:col-span-1"
      >
        {!available.training || accuracyData.length === 0 ? (
          <EmptyChart message="Responda questões no Treinador para ver este gráfico." />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={accuracyData}
                dataKey="value"
                nameKey="name"
                innerRadius="62%"
                outerRadius="90%"
                paddingAngle={2}
                strokeWidth={0}
              >
                {accuracyData.map((d) => (
                  <Cell key={d.name} fill={d.name === "Acertos" ? EMERALD : ROSE} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                labelStyle={TOOLTIP_LABEL_STYLE}
                itemStyle={TOOLTIP_ITEM_STYLE}
                formatter={(value: number, name: string) => [`${value} questões`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
        <p className="-mt-[108px] text-center text-xl font-black">
          {trainer.totalAnswered ? `${trainer.accuracy}%` : ""}
        </p>
      </ChartCard>

      <ChartCard
        title="Evolução do aproveitamento"
        description="Aproveitamento médio por semana (Treinador)"
        className="xl:col-span-2"
      >
        {!available.training || evolutionData.every((d) => d.accuracy === null) ? (
          <EmptyChart message="Ainda não há semanas suficientes com questões respondidas." />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evolutionData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="evolutionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GOLD} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={GOLD} stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={AXIS_TICK} axisLine={false} tickLine={false} />
              <YAxis
                tick={AXIS_TICK}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                width={36}
              />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                labelStyle={TOOLTIP_LABEL_STYLE}
                itemStyle={TOOLTIP_ITEM_STYLE}
                formatter={(value: number | null) =>
                  value === null ? ["sem dados", "Aproveitamento"] : [`${value}%`, "Aproveitamento"]
                }
              />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke={GOLD}
                strokeWidth={2.5}
                fill="url(#evolutionGradient)"
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        title="Meta diária"
        description={`${todayCount}/${goal} questões hoje`}
        className="xl:col-span-1"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={goalData}
            innerRadius="62%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "var(--muted)" }} />
          </RadialBarChart>
        </ResponsiveContainer>
        <p className="-mt-[108px] text-center text-xl font-black">{goalPercent}%</p>
      </ChartCard>

      <ChartCard
        title="Desempenho por disciplina"
        description="Disciplinas com mais questões respondidas no Treinador"
        className="xl:col-span-2"
      >
        {!available.training || subjectData.length === 0 ? (
          <EmptyChart message="Responda questões no Treinador para ver este gráfico." />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={subjectData}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
            >
              <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={AXIS_TICK}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="subject"
                tick={AXIS_TICK}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                labelStyle={TOOLTIP_LABEL_STYLE}
                itemStyle={TOOLTIP_ITEM_STYLE}
                formatter={(value: number, _n, p) => [
                  `${value}% (${p.payload.total} questões)`,
                  "Aproveitamento",
                ]}
              />
              <Bar dataKey="accuracy" radius={[0, 6, 6, 0]} barSize={14}>
                {subjectData.map((d) => (
                  <Cell
                    key={d.subject}
                    fill={d.accuracy < 50 ? ROSE : d.accuracy < 75 ? AMBER : EMERALD}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        title="Desempenho por banca/concurso"
        description="Aproveitamento médio dos simulados filtrados por concurso"
        className="xl:col-span-2"
      >
        {!available.simulators || bancaData.length === 0 ? (
          <EmptyChart message="Faça simulados filtrando por um concurso para ver este gráfico." />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bancaData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                tick={AXIS_TICK}
                axisLine={false}
                tickLine={false}
                interval={0}
                tickFormatter={(v: string) => (v.length > 12 ? `${v.slice(0, 11)}…` : v)}
              />
              <YAxis
                tick={AXIS_TICK}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
                width={36}
              />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                labelStyle={TOOLTIP_LABEL_STYLE}
                itemStyle={TOOLTIP_ITEM_STYLE}
                formatter={(value: number, _n, p) => [
                  `${value}% · ${p.payload.count} simulado${p.payload.count === 1 ? "" : "s"}`,
                  p.payload.label,
                ]}
              />
              <Bar dataKey="accuracy" radius={[6, 6, 0, 0]} barSize={28} fill={SKY}>
                {bancaData.map((d, i) => (
                  <Cell key={d.label} fill={i % 2 === 0 ? SKY : VIOLET} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}

function buildWeeklyEvolution(responses: TrainingActivity[], weeks: number) {
  const byWeek = new Map<string, { correct: number; total: number }>();
  for (const r of responses) {
    const key = weekMondayKey(r.created_at);
    const entry = byWeek.get(key) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (r.is_correct) entry.correct += 1;
    byWeek.set(key, entry);
  }
  const currentMonday = weekMondayKey(new Date().toISOString());
  const keys: string[] = [];
  const cursor = new Date(`${currentMonday}T00:00:00`);
  for (let i = 0; i < weeks; i++) {
    keys.unshift(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() - 7);
  }
  return keys.map((key) => {
    const entry = byWeek.get(key);
    return {
      label: dayLabel(key),
      accuracy: entry && entry.total > 0 ? Math.round((entry.correct / entry.total) * 100) : null,
    };
  });
}

function buildDailyActivity(responses: TrainingActivity[], days: number) {
  const byDay = new Map<string, number>();
  for (const r of responses) {
    const key = acreDateKey(new Date(r.created_at));
    byDay.set(key, (byDay.get(key) ?? 0) + 1);
  }
  const keys: string[] = [];
  const cursor = new Date(`${acreDateKey()}T00:00:00`);
  for (let i = 0; i < days; i++) {
    keys.unshift(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() - 1);
  }
  return keys.map((key) => ({ label: dayLabel(key), total: byDay.get(key) ?? 0 }));
}

function buildBancaData(attempts: SimulatorActivity[]) {
  const byBanca = new Map<string, { sum: number; count: number }>();
  for (const a of attempts) {
    const label = a.contest_filter?.trim();
    if (!label) continue;
    const entry = byBanca.get(label) ?? { sum: 0, count: 0 };
    entry.sum += a.accuracy;
    entry.count += 1;
    byBanca.set(label, entry);
  }
  return Array.from(byBanca.entries())
    .map(([label, { sum, count }]) => ({
      label,
      count,
      accuracy: Math.round(sum / count),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

const GOALS_STORAGE_KEY = "norte_study_goals";
function readDailyGoal(): number {
  try {
    const raw = localStorage.getItem(GOALS_STORAGE_KEY);
    if (!raw) return 20;
    const parsed = JSON.parse(raw) as { questionsPerDay?: number };
    return parsed.questionsPerDay && parsed.questionsPerDay > 0 ? parsed.questionsPerDay : 20;
  } catch {
    return 20;
  }
}
