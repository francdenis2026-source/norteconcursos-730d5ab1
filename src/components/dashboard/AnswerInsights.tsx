import * as React from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { NvChart } from "@/components/dashboard/charts/NvChart";
import { useChartHeight } from "@/components/dashboard/WeeklyRhythmChart";
import { ChartTable, ViewToggle } from "@/components/dashboard/charts/ChartTable";
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
export type Period = (typeof PERIODS)[number][0];
type Bucket = { label: string; acertos: number; erros: number };

/** Paleta validada (CVD): acerto em verde-água, erro em laranja. Nunca vermelho × verde. */
const OK = "var(--cat-green)";
const ERR = "var(--cat-red)";
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

export function AnswerInsights({
  rows,
  today,
  period,
}: {
  rows: TrainingRecord[];
  today: string;
  period: Period;
}) {
  const [view, setView] = React.useState<"chart" | "table">("chart");
  const height = useChartHeight();
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
    () => data.buckets.map((b) => ({ ...b, total: b.acertos + b.erros })),
    [data.buckets],
  );
  const rate = data.total ? Math.round((data.acertos / data.total) * 100) : null;
  const periodLabel = (PERIODS.find(([id]) => id === period)?.[1] ?? "").toLowerCase();

  return (
    <div className="ncx-panel">
      <dl className="nv-summary nv-summary--four">
        <div>
          <dt>Respondidas</dt>
          <dd>{data.total.toLocaleString("pt-BR")}</dd>
        </div>
        <div>
          <dt>
            <i className="ncx-key" style={{ background: OK }} aria-hidden="true" />
            Acertos
          </dt>
          <dd>{data.acertos.toLocaleString("pt-BR")}</dd>
        </div>
        <div>
          <dt>
            <i className="ncx-key" style={{ background: ERR }} aria-hidden="true" />
            Erros
          </dt>
          <dd>{data.erros.toLocaleString("pt-BR")}</dd>
        </div>
        <div>
          <dt>Aproveitamento</dt>
          <dd>{rate === null ? "—" : `${rate}%`}</dd>
        </div>
      </dl>

      {data.total === 0 ? (
        <p className="ncx-empty">
          Sem respostas em {periodLabel}. Resolva questões no treinador para ver seus acertos e
          erros aqui.
        </p>
      ) : view === "chart" ? (
        <figure className="nv-figure">
          <figcaption className="nv-legend">
            <span>
              <i style={{ background: OK }} /> Acertos
            </span>
            <span>
              <i style={{ background: ERR }} /> Erros
            </span>
            <span>
              <i data-line style={{ background: "var(--cat-amber)" }} /> Aproveitamento (%)
            </span>
          </figcaption>
          {/* Aproveitamento numa faixa própria (escala 0–100%), alinhada às barras: um eixo por gráfico. */}
          <NvChart
            data={chartData.map((b) => ({
              label: b.label,
              title: b.label,
              line: b.total ? Math.round((b.acertos / b.total) * 100) : null,
            }))}
            line={{ key: "p", label: "Aproveitamento", color: "var(--cat-amber)" }}
            height={64}
            ticks={[0, 100]}
            band={{ from: 70, to: 100 }}
            format={(v) => `${Math.round(v)}%`}
            labelEvery={0}
            ariaLabel={`Aproveitamento por período, ${periodLabel}`}
          />
          <NvChart
            data={chartData.map((b) => ({
              label: b.label,
              title: b.label,
              bars: [b.acertos, b.erros],
              extra: [
                {
                  label: "Aproveitamento",
                  value: b.total ? `${Math.round((b.acertos / b.total) * 100)}%` : "—",
                  color: "var(--cat-amber)",
                },
              ],
            }))}
            bars={[
              { key: "ok", label: "Acertos", color: OK },
              { key: "err", label: "Erros", color: ERR },
            ]}
            height={height - 40}
            format={(v) => `${Math.round(v)}`}
            labelEvery={chartData.length > 14 ? 3 : 1}
            ariaLabel={`Acertos e erros por período, ${periodLabel}`}
          />
        </figure>
      ) : (
        <ChartTable
          caption={`Acertos e erros, ${periodLabel}`}
          columns={["Período", "Acertos", "Erros", "Aproveitamento"]}
          rows={[...chartData]
            .filter((b) => b.total > 0)
            .reverse()
            .map((b) => [
              b.label,
              b.acertos,
              b.erros,
              `${Math.round((b.acertos / b.total) * 100)}%`,
            ])}
        />
      )}

      {data.total > 0 && (
        <section className="ncx-meters" aria-label={`Aproveitamento por disciplina, ${periodLabel}`}>
          <h3>Por disciplina</h3>
          <ul>
            {data.subjects.slice(0, 5).map((entry) => {
              const total = entry.acertos + entry.erros;
              const pct = Math.round((entry.acertos / total) * 100);
              const low = total >= 5 && pct < 60;
              return (
                <li key={entry.subject}>
                  <Link
                    to="/dashboard/question-trainer"
                    search={{ subject: entry.subject }}
                    aria-label={`Treinar ${entry.subject}: ${pct}% de acerto em ${total} questões${low ? ", precisa de reforço" : ""}`}
                  >
                    <span className="ncx-meters__name" title={entry.subject}>
                      {entry.subject}
                    </span>
                    <span className="ncx-meters__bar" aria-hidden="true">
                      <i style={{ width: `${pct}%` }} />
                    </span>
                    <span className="ncx-meters__value">
                      <b>{pct}%</b>
                      <small>
                        {entry.acertos}/{total}
                      </small>
                    </span>
                    {low ? (
                      <span className="ncx-flag">
                        <AlertTriangle aria-hidden="true" /> Reforçar
                      </span>
                    ) : (
                      <ArrowRight className="ncx-meters__go" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <footer className="ncx-footer">
        {data.total > 0 ? <ViewToggle view={view} onChange={setView} /> : <span />}
        <Link to="/dashboard/performance" className="ncx-link">
          {data.subjects.length > 5 ? `Todas as ${data.subjects.length} disciplinas` : "Desempenho completo"}{" "}
          <ArrowRight aria-hidden="true" />
        </Link>
      </footer>
    </div>
  );
}
