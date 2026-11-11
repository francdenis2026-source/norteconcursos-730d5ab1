import * as React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CheckCircle2, Target, XCircle } from "lucide-react";
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

const GREEN = "#34c27a";
const ROSE = "#f0527a";
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
  // Mesma regra do restante do painel: vale a primeira resposta de cada questão.
  const first = React.useMemo(() => {
    const seen = new Set<string>();
    return rows
      .map((row) => ({ ...row, time: Date.parse(row.created_at) }))
      .filter((row) => Number.isFinite(row.time) && typeof row.is_correct === "boolean")
      .sort((a, b) => a.time - b.time || a.id.localeCompare(b.id))
      .filter((row) => {
        const key = `${row.question_source}:${row.question_id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((row) => ({ ...row, day: acreDateKey(new Date(row.time)) }));
  }, [rows]);
  const data = React.useMemo(() => build(first, period, today), [first, period, today]);
  const rate = data.total ? Math.round((data.acertos / data.total) * 100) : null;
  const periodLabel = (PERIODS.find(([id]) => id === period)?.[1] ?? "").toLowerCase();

  return (
    <div className="sh2-insights">
      <div className="sh2-insights__tabs" role="tablist" aria-label="Período">
        {PERIODS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={period === id}
            onClick={() => setPeriod(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="sh2-insights__kpis">
        <span data-tone="blue">
          <Target aria-hidden="true" />
          <small>Respondidas</small>
          <strong>{data.total.toLocaleString("pt-BR")}</strong>
        </span>
        <span data-tone="green">
          <CheckCircle2 aria-hidden="true" />
          <small>Acertos</small>
          <strong>{data.acertos.toLocaleString("pt-BR")}</strong>
        </span>
        <span data-tone="rose">
          <XCircle aria-hidden="true" />
          <small>Erros</small>
          <strong>{data.erros.toLocaleString("pt-BR")}</strong>
        </span>
        <span data-tone="gold">
          <small>Aproveitamento</small>
          <strong>{rate === null ? "—" : `${rate}%`}</strong>
        </span>
      </div>
      {data.total === 0 ? (
        <p className="sh2-insights__empty">
          Sem respostas em {periodLabel}. Resolva questões no treinador para ver seus acertos e
          erros aqui.
        </p>
      ) : (
        <div className="sh2-insights__grid">
          <figure className="sh2-insights__chart">
            <figcaption>
              {period === "session" ? "Questão a questão" : "Acertos e erros por período"}
              <span>
                <i style={{ background: GREEN }} /> Acertos <i style={{ background: ROSE }} /> Erros
              </span>
            </figcaption>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={data.buckets}
                margin={{ top: 8, right: 4, bottom: 0, left: -18 }}
                barCategoryGap="22%"
              >
                <CartesianGrid vertical={false} stroke="currentColor" strokeOpacity={0.12} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "currentColor", fontSize: 11, opacity: 0.8 }}
                  minTickGap={6}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "currentColor", fontSize: 11, opacity: 0.8 }}
                />
                <Tooltip
                  cursor={{ fill: "currentColor", fillOpacity: 0.06 }}
                  contentStyle={{
                    background: "#131a2c",
                    border: "1px solid #33405e",
                    borderRadius: 10,
                    color: "#fff",
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#fff", fontWeight: 700 }}
                />
                <Bar
                  dataKey="acertos"
                  name="Acertos"
                  stackId="a"
                  fill={GREEN}
                  radius={[0, 0, 3, 3]}
                />
                <Bar dataKey="erros" name="Erros" stackId="a" fill={ROSE} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </figure>
          <div className="sh2-insights__subjects">
            <h3>Por disciplina · {periodLabel}</h3>
            <ul>
              {data.subjects.slice(0, 6).map((entry) => {
                const total = entry.acertos + entry.erros;
                const pct = Math.round((entry.acertos / total) * 100);
                return (
                  <li key={entry.subject}>
                    <div>
                      <strong title={entry.subject}>{entry.subject}</strong>
                      <span>
                        {entry.acertos} acertos · {entry.erros} erros · <b>{pct}%</b>
                      </span>
                    </div>
                    <span className="sh2-insights__bar" role="img" aria-label={`${pct}% de acerto`}>
                      <i style={{ width: `${pct}%` }} />
                    </span>
                  </li>
                );
              })}
            </ul>
            {data.subjects.length > 6 && (
              <p>Mais {data.subjects.length - 6} disciplinas em Desempenho.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
