import * as React from "react";
import { ArrowRight } from "lucide-react";
import { NvChart } from "@/components/dashboard/charts/NvChart";
import { ChartTable, ViewToggle } from "@/components/dashboard/charts/ChartTable";
import { minuteTicks, shortDuration, type StudyBucket } from "@/lib/dashboardTrends";

type WeeklyRhythmChartProps = {
  buckets: StudyBucket[];
  /** Meta diária do cronograma, em segundos (só por dia). */
  goalSeconds?: number | null;
  unit: "dia" | "mês";
  onSelect: (key: string, trigger: HTMLElement) => void;
  onOpenHistory: (trigger: HTMLButtonElement) => void;
  formatDuration: (seconds: number) => string;
};

export function useChartHeight(panelRef?: React.RefObject<HTMLElement | null>) {
  const [h, setH] = React.useState(164);
  const base = React.useRef(164);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const set = () => {
      base.current = mq.matches ? 128 : 164;
      setH((cur) => Math.max(cur, base.current));
    };
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  // Ocupa o espaço vazio do cartão: altura do gráfico = altura atual + folga entre o painel e o corpo.
  React.useEffect(() => {
    const panel = panelRef?.current;
    const body = panel?.parentElement;
    if (!panel || !body || typeof ResizeObserver === "undefined") return;
    let raf = 0;
    const fit = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cs = getComputedStyle(body);
        const inner = body.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        setH((cur) => {
          const next = Math.round(Math.min(window.matchMedia("(max-width: 640px)").matches ? base.current : 340, Math.max(base.current, cur + (inner - panel.offsetHeight))));
          return Math.abs(next - cur) >= 4 ? next : cur;
        });
      });
    };
    const ro = new ResizeObserver(fit);
    ro.observe(body);
    fit();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [panelRef]);
  return h;
}

/** Horas de estudo: barras azuis por período, linha laranja de média móvel e meta tracejada. */
export function WeeklyRhythmChart({
  buckets,
  goalSeconds,
  unit,
  onSelect,
  onOpenHistory,
  formatDuration,
}: WeeklyRhythmChartProps) {
  const [view, setView] = React.useState<"chart" | "table">("chart");
  const plotRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const height = useChartHeight(panelRef);
  const total = buckets.reduce((sum, b) => sum + b.seconds, 0);
  const active = buckets.filter((b) => b.seconds >= 60);
  const average = active.length ? Math.round(total / active.length) : 0;
  const win = buckets.length > 14 ? 7 : 3;
  const data = buckets.map((b, i) => {
    const slice = buckets.slice(Math.max(0, i - win + 1), i + 1);
    const avg = slice.reduce((s, x) => s + x.seconds, 0) / slice.length;
    return {
      label: b.label,
      title: b.fullLabel,
      bars: [Math.round(b.seconds / 60)],
      line: avg > 0 ? Math.round(avg / 60) : null,
    };
  });
  const goalMin = goalSeconds ? Math.round(goalSeconds / 60) : null;
  const ticks = minuteTicks(Math.max(...data.map((d) => d.bars[0] ?? 0), goalMin ?? 0, 30));

  return (
    <div className="ncx-panel" ref={panelRef}>
      <dl className="nv-summary">
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
        <figure className="nv-figure" ref={plotRef}>
          <figcaption className="nv-legend">
            <span>
              <i style={{ background: "var(--cat-blue)" }} /> Tempo ativo
            </span>
            <span>
              <i data-line style={{ background: "var(--cat-amber)" }} /> Média ({win} {unit === "dia" ? "dias" : "meses"})
            </span>
            {goalMin && (
              <span>
                <i data-dash /> Meta do cronograma
              </span>
            )}
          </figcaption>
          <NvChart
            data={data}
            bars={[{ key: "t", label: "Tempo ativo", color: "var(--cat-blue)" }]}
            line={{ key: "m", label: "Média", color: "var(--cat-amber)" }}
            height={height}
            ticks={ticks}
            smooth={buckets.length > 14}
            {...(goalMin ? { goal: { value: goalMin, label: `meta ${shortDuration(goalMin * 60)}` } } : {})}
            format={(v) => shortDuration(v * 60)}
            labelEvery={buckets.length > 14 ? 5 : 1}
            ariaLabel={`Horas de estudo por ${unit}, últimos ${buckets.length}`}
            onSelect={(i) => {
              const b = buckets[i];
              if (b && plotRef.current) onSelect(b.key, plotRef.current);
            }}
          />
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
