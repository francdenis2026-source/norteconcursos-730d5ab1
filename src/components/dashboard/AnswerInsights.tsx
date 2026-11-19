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
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Percent, Target, XCircle } from "lucide-react";
import { ChartTooltipCard } from "@/components/dashboard/charts/ChartTooltip";
import { prefersReducedMotion } from "@/lib/dashboardTrends";
import type { TrainingRecord } from "@/lib/studentDashboard";
import { acreDateKey, acreHour } from "@/lib/acreTime";
import { canonicalSubject } from "@/lib/subjects";

const PERIODS = [
  ["session", "Última sessão"],
  ["day", "Hoje"],
  ["week", "7 dias"],
  ["month", "30 dias"],
  ["months", "12 meses"],
  ["years", "Anos"],
] as const;
type Period = (typeof PERIODS)[number][0];
type Bucket = { label: string; acertos: number; erros: number };

const GREEN = "var(--sh2-green)";
const ROSE = "var(--sh2-rose)";
const GOLD = "var(--sh2-gold)";
/** Respostas com mais de 30 min de intervalo contam como sessões diferentes. */
const SESSION_GAP_MS = 30 * 60_000;
const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const WEEKDAYS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

/** Dias anteriores a partir da data do Acre, sem depender do fuso do aparelho. */
function dayKeys(today: string, count: number) {
  const base = Date.parse(`${today}T12:00:00Z`);
  return Array.from({ length: count }, (_, i) =>
    new Date(base - (count - 1 - i) * 86_400_000).toISOString().slice(0, 10),
  );
}

function build(
  rows: Array<TrainingRecord & { day: string; time: number }>,
  period: Period,
  today: string,
) {
  const add = (map: Map<string, Bucket>, id: string, label: string, ok: boolean) => {
    const bucket = map.get(id) ?? { label, acertos: 0, erros: 0 };
    if (ok) bucket.acertos++;
    else bucket.erros++;
    map.set(id, bucket);
  };
  const map = new Map<string, Bucket>();
  let selected = rows;
  if (period === "session") {
    let start = rows.length - 1;
    while (start > 0 && rows[start]!.time - rows[start - 1]!.time <= SESSION_GAP_MS) start--;
    selected = rows.slice(Math.max(0, start));
    selected.forEach((row, i) => add(map, String(i), String(i + 1), row.is_correct));
  } else if (period === "day") {
    selected = rows.filter((row) => row.day === today);
    const hours = selected.map((row) => acreHour(new Date(row.time)));
    if (hours.length)
      for (let h = Math.min(...hours); h <= Math.max(...hours); h++)
        map.set(String(h), { label: `${h}h`, acertos: 0, erros: 0 });
    selected.forEach((row) => {
      const h = acreHour(new Date(row.time));
      add(map, String(h), `${h}h`, row.is_correct);
    });
  } else if (period === "week" || period === "month") {
    const keys = dayKeys(today, period === "week" ? 7 : 30);
    for (const key of keys) {
      const weekday = WEEKDAYS[new Date(`${key}T12:00:00Z`).getUTCDay()] ?? "";
      const label =
        period === "week" ? `${weekday} ${key.slice(8)}` : `${key.slice(8)}/${key.slice(5, 7)}`;
      map.set(key, { label, acertos: 0, erros: 0 });
    }
    selected = rows.filter((row) => map.has(row.day));
    selected.forEach((row) => add(map, row.day, "", row.is_correct));
  } else if (period === "months") {
    const year = Number(today.slice(0, 4));
    const month = Number(today.slice(5, 7));
    for (let i = 11; i >= 0; i--) {
      const date = new Date(Date.UTC(year, month - 1 - i, 1));
      const key = date.toISOString().slice(0, 7);
      map.set(key, {
        label: `${MONTHS[date.getUTCMonth()] ?? ""}/${key.slice(2, 4)}`,
        acertos: 0,
        erros: 0,
      });
    }
    selected = rows.filter((row) => map.has(row.day.slice(0, 7)));
    selected.forEach((row) => add(map, row.day.slice(0, 7), "", row.is_correct));
  } else {
    const first = Number((rows[0]?.day ?? today).slice(0, 4));
    for (let y = first; y <= Number(today.slice(0, 4)); y++)
      map.set(String(y), { label: String(y), acertos: 0, erros: 0 });
    selected.forEach((row) => add(map, row.day.slice(0, 4), row.day.slice(0, 4), row.is_correct));
  }
  const subjects = new Map<string, { subject: string; acertos: number; erros: number }>();
  for (const row of selected) {
    const subject = canonicalSubject(row.subject) || "Sem disciplina identificada";
    const entry = subjects.get(subject) ?? { subject, acertos: 0, erros: 0 };
    if (row.is_correct) entry.acertos++;
    else entry.erros++;
    subjects.set(subject, entry);
  }
  const acertos = selected.filter((row) => row.is_correct).length;
  return {
    buckets: [...map.values()],
    total: selected.length,
    acertos,
    erros: selected.length - acertos,
    subjects: [...subjects.values()].sort(
      (a, b) => b.acertos + b.erros - (a.acertos + a.erros) || a.subject.localeCompare(b.subject),
    ),
  };
}

export function AnswerInsights({ rows, today }: { rows: TrainingRecord[]; today: string }) {
  const [period, setPeriod] = React.useState<Period>("week");
  const [hidden, setHidden] = React.useState<Record<"acertos" | "erros" | "taxa", boolean>>({
    acertos: false,
    erros: false,
    taxa: false,
  });
  // Mesma regra do restante do painel: vale a primeira resposta de cada questão.
  const first = React.useMemo(() => {
    const seen = new Set<string>();
    return rows
      .map((row) => ({ ...row, time: Date.parse(row.created_at) }))
      .filter((row) =>
        Number.isFinite(row.time) &&
        typeof row.is_correct === "boolean" &&
        !!row.question_id?.trim() &&
        !!row.question_source?.trim()
      )
      .sort((a, b) => a.time - b.time || a.id.localeCompare(b.id))
      .filter((row) => {
        const key = JSON.stringify([row.question_source, row.question_id]);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((row) => ({ ...row, day: acreDateKey(new Date(row.time)) }));
  }, [rows]);
  // Respostas com data futura ou relógio incorreto não entram nos períodos do relatório.
  const eligible = React.useMemo(() => first.filter((row) => row.day <= today), [first, today]);
  const data = React.useMemo(() => build(eligible, period, today), [eligible, period, today]);
  const chartData = React.useMemo(
    () =>
      data.buckets.map((bucket) => {
        const total = bucket.acertos + bucket.erros;
        return { ...bucket, taxa: total ? Math.round((bucket.acertos / total) * 100) : null };
      }),
    [data.buckets],
  );
  const rate = data.total ? Math.round((data.acertos / data.total) * 100) : null;
  const periodLabel = (PERIODS.find(([id]) => id === period)?.[1] ?? "").toLowerCase();
  const toggle = (key: keyof typeof hidden) => setHidden((h) => ({ ...h, [key]: !h[key] }));
  const series = [
    { key: "acertos", label: "Acertos", color: GREEN },
    { key: "erros", label: "Erros", color: ROSE },
    { key: "taxa", label: "Aproveitamento", color: GOLD },
  ] as const;

  return (
    <div className="ncx-answers">
      <div className="ncx-toolbar">
        <dl className="ncx-stats ncx-stats--four" aria-label={`Resumo de ${periodLabel}`}>
          <div data-tone="blue">
            <dt>
              <Target aria-hidden="true" /> Respondidas
            </dt>
            <dd>{data.total.toLocaleString("pt-BR")}</dd>
          </div>
          <div data-tone="green">
            <dt>
              <CheckCircle2 aria-hidden="true" /> Acertos
            </dt>
            <dd>{data.acertos.toLocaleString("pt-BR")}</dd>
          </div>
          <div data-tone="rose">
            <dt>
              <XCircle aria-hidden="true" /> Erros
            </dt>
            <dd>{data.erros.toLocaleString("pt-BR")}</dd>
          </div>
          <div data-tone="gold">
            <dt>
              <Percent aria-hidden="true" /> Aproveitamento
            </dt>
            <dd>{rate === null ? "—" : `${rate}%`}</dd>
          </div>
        </dl>
      </div>
      <div className="ncx-segmented ncx-segmented--wide" role="group" aria-label="Filtrar desempenho por período">
        {PERIODS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={period === id}
            onClick={() => setPeriod(id)}
          >
            {label}
          </button>
        ))}
      </div>
      {data.total === 0 ? (
        <p className="ncx-empty">
          Sem respostas em {periodLabel}. Resolva questões no treinador para ver seus acertos e
          erros aqui.
        </p>
      ) : (
        <>
          <figure className="ncx-plot">
            <figcaption className="ncx-plot__head">
              <span>{period === "session" ? "Questão a questão" : "Acertos, erros e aproveitamento"}</span>
              <span className="ncx-legend" role="group" aria-label="Mostrar ou ocultar séries">
                {series.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    aria-pressed={!hidden[item.key]}
                    onClick={() => toggle(item.key)}
                  >
                    <i style={{ background: item.color }} aria-hidden="true" data-line={item.key === "taxa" || undefined} />
                    {item.label}
                  </button>
                ))}
              </span>
            </figcaption>
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 4, bottom: 0, left: -14 }}
                barCategoryGap="26%"
              >
                <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  tickMargin={8}
                  minTickGap={8}
                />
                <YAxis
                  yAxisId="n"
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <YAxis
                  yAxisId="p"
                  orientation="right"
                  domain={[0, 100]}
                  ticks={[0, 50, 100]}
                  hide={hidden.taxa}
                  width={34}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: number) => `${value}%`}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: "var(--foreground)", fillOpacity: 0.05, radius: 8 }}
                  wrapperStyle={{ outline: "none" }}
                  content={({ active, payload, label }) => {
                    const point = payload?.[0]?.payload as
                      | (Bucket & { taxa: number | null })
                      | undefined;
                    if (!active || !point) return null;
                    const total = point.acertos + point.erros;
                    return (
                      <ChartTooltipCard
                        title={period === "session" ? `Questão ${label}` : String(label)}
                        rows={[
                          { label: "Acertos", value: point.acertos, color: GREEN },
                          { label: "Erros", value: point.erros, color: ROSE },
                          {
                            label: "Aproveitamento",
                            value: total ? `${point.taxa}%` : "—",
                            color: GOLD,
                          },
                        ]}
                      />
                    );
                  }}
                />
                {!hidden.acertos && (
                  <Bar
                    yAxisId="n"
                    dataKey="acertos"
                    name="Acertos"
                    stackId="a"
                    fill={GREEN}
                    maxBarSize={40}
                    radius={hidden.erros ? [6, 6, 2, 2] : [0, 0, 2, 2]}
                    animationDuration={420}
                    isAnimationActive={!prefersReducedMotion()}
                  />
                )}
                {!hidden.erros && (
                  <Bar
                    yAxisId="n"
                    dataKey="erros"
                    name="Erros"
                    stackId="a"
                    fill={ROSE}
                    maxBarSize={40}
                    radius={[6, 6, 0, 0]}
                    animationDuration={420}
                    isAnimationActive={!prefersReducedMotion()}
                  />
                )}
                {!hidden.taxa && period !== "session" && (
                  <Line
                    yAxisId="p"
                    type="monotone"
                    dataKey="taxa"
                    name="Aproveitamento"
                    stroke={GOLD}
                    strokeWidth={2.25}
                    connectNulls
                    dot={{ r: 3, strokeWidth: 0, fill: GOLD }}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--card)", fill: GOLD }}
                    animationDuration={420}
                    isAnimationActive={!prefersReducedMotion()}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </figure>
          <div className="ncx-subjects">
            <h3>Por disciplina · {periodLabel}</h3>
            <ul>
              {data.subjects.slice(0, 5).map((entry) => {
                const total = entry.acertos + entry.erros;
                const pct = Math.round((entry.acertos / total) * 100);
                return (
                  <li key={entry.subject}>
                    <Link
                      to="/dashboard/question-trainer"
                      search={{ subject: entry.subject }}
                      aria-label={`Treinar ${entry.subject}: ${pct}% de acerto em ${total} questões`}
                    >
                      <span className="ncx-subjects__name" title={entry.subject}>
                        {entry.subject}
                      </span>
                      <span className="ncx-subjects__meter" aria-hidden="true">
                        <i style={{ width: `${pct}%` }} />
                      </span>
                      <span className="ncx-subjects__value">
                        <b data-low={pct < 60 || undefined}>{pct}%</b>
                        <small>
                          {entry.acertos}/{total}
                        </small>
                      </span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            {data.subjects.length > 5 && (
              <Link to="/dashboard/performance" className="ncx-link">
                Mais {data.subjects.length - 5} disciplinas em Desempenho <ArrowRight aria-hidden="true" />
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
