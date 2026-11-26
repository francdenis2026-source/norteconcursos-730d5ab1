import * as React from "react";

/**
 * Gráfico próprio em SVG (sem biblioteca), no padrão visual NextVita.
 * - Mede a largura real (ResizeObserver) e desenha em pixels: texto nunca estica.
 * - Barras (simples ou empilhadas) com cantos arredondados no topo, crescendo de baixo para cima.
 * - Linha suave (monotônica) que se desenha ao aparecer, com área em degradê e anel pulsando no fim.
 * - Cruz ao apontar (mouse, dedo ou setas do teclado), pílula de valor no eixo e dica escura.
 * - Um eixo só: medidas de outra escala vão apenas para a dica.
 */

export type NvSeries = { key: string; label: string; color: string };
export type NvPoint = {
  label: string;
  /** Rótulo completo para a dica e leitores de tela. */
  title: string;
  bars?: number[];
  line?: number | null;
  /** Linhas extras só para a dica (outras escalas), já formatadas. */
  extra?: Array<{ label: string; value: string; color?: string }>;
};

type Props = {
  data: NvPoint[];
  bars?: NvSeries[];
  line?: NvSeries & { area?: boolean };
  height?: number;
  format: (value: number) => string;
  /** Marcas do eixo y (valores no domínio dos dados). */
  ticks?: number[];
  goal?: { value: number; label: string };
  band?: { from: number; to: number; label?: string };
  ariaLabel: string;
  onSelect?: (index: number) => void;
  /** Mostra 1 rótulo do eixo x a cada N pontos. */
  labelEvery?: number;
  /** Curva suave (padrão) ou segmentos retos, melhor para poucos pontos. */
  smooth?: boolean;
};

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

function useWidth<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [width, setWidth] = React.useState(0);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry!.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen]);
  return seen;
}

/** Curva monotônica (Fritsch–Carlson): suave e sem ultrapassar os pontos. */
export function monotonePath(points: Array<[number, number]>) {
  const n = points.length;
  if (!n) return "";
  if (n === 1) return `M${points[0]![0]},${points[0]![1]}`;
  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = points[i + 1]![0] - points[i]![0];
    slope[i] = (points[i + 1]![1] - points[i]![1]) / (dx[i] || 1);
  }
  const t: number[] = [slope[0]!];
  for (let i = 1; i < n - 1; i++) {
    const a = slope[i - 1]!;
    const b = slope[i]!;
    t[i] = a * b <= 0 ? 0 : (3 * (dx[i - 1]! + dx[i]!)) / ((2 * dx[i]! + dx[i - 1]!) / a + (dx[i]! + 2 * dx[i - 1]!) / b);
  }
  t[n - 1] = slope[n - 2]!;
  let d = `M${points[0]![0]},${points[0]![1]}`;
  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = points[i]!;
    const [x1, y1] = points[i + 1]!;
    const h = (x1 - x0) / 3;
    d += `C${x0 + h},${y0 + h * t[i]!},${x1 - h},${y1 - h * t[i + 1]!},${x1},${y1}`;
  }
  return d;
}

export function NvChart({
  data,
  bars = [],
  line,
  height = 220,
  format,
  ticks,
  goal,
  band,
  ariaLabel,
  onSelect,
  labelEvery = 1,
  smooth = true,
}: Props) {
  const [wrapRef, width] = useWidth<HTMLDivElement>();
  const seen = useInView(wrapRef);
  const [active, setActive] = React.useState<number | null>(null);
  const uid = React.useId().replace(/:/g, "");

  const padL = 44;
  const padR = 12;
  const padT = 14;
  const padB = labelEvery > 0 ? 26 : 6;
  const innerW = Math.max(0, width - padL - padR);
  const innerH = height - padT - padB;
  const n = data.length;

  const maxData = Math.max(
    1,
    ...data.map((d) => (d.bars ?? []).reduce((s, v) => s + Math.max(0, v), 0)),
    ...data.map((d) => d.line ?? 0),
    goal?.value ?? 0,
    band?.to ?? 0,
  );
  const yTicks = ticks?.length ? ticks : niceTicks(maxData);
  const yMax = Math.max(maxData, yTicks.at(-1) ?? maxData);
  const y = (v: number) => padT + innerH - (Math.max(0, v) / yMax) * innerH;
  const step = n ? innerW / n : 0;
  const cx = (i: number) => padL + step * i + step / 2;
  const barW = Math.max(4, Math.min(24, step * 0.56));
  // Rótulos do eixo x nunca se encostam: afina conforme a largura real.
  const every = labelEvery > 0 ? Math.max(labelEvery, Math.ceil(46 / Math.max(1, step))) : 0;

  const linePts = line
    ? data
        .map((d, i) => (d.line === null || d.line === undefined ? null : ([cx(i), y(d.line)] as [number, number])))
        .filter((p): p is [number, number] => !!p)
    : [];
  const linePath = smooth
    ? monotonePath(linePts)
    : linePts.map(([px, py], k) => `${k ? "L" : "M"}${px},${py}`).join("");
  const last = linePts.at(-1);
  const areaPath =
    line?.area && linePts.length > 1
      ? `${linePath}L${last![0]},${padT + innerH}L${linePts[0]![0]},${padT + innerH}Z`
      : "";

  const pick = (clientX: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect || !n) return;
    const i = Math.floor((clientX - rect.left - padL) / (step || 1));
    setActive(Math.min(n - 1, Math.max(0, i)));
  };
  const point = active === null ? null : data[active];
  const activeValue =
    point && (line ? point.line : (point.bars ?? []).reduce((s, v) => s + v, 0));

  return (
    <div
      ref={wrapRef}
      className="nv-chart"
      data-seen={seen || undefined}
      style={{ height }}
      tabIndex={0}
      role="group"
      aria-label={`${ariaLabel}. Use as setas para percorrer os dias.`}
      onPointerMove={(e) => pick(e.clientX)}
      onPointerDown={(e) => pick(e.clientX)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
      onClick={() => active !== null && onSelect?.(active)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          setActive((a) => {
            const base = a ?? (e.key === "ArrowRight" ? -1 : n);
            return Math.min(n - 1, Math.max(0, base + (e.key === "ArrowRight" ? 1 : -1)));
          });
        } else if (e.key === "Enter" && active !== null) onSelect?.(active);
        else if (e.key === "Escape") setActive(null);
      }}
      onBlur={() => setActive(null)}
    >
      {width > 0 && (
        <svg width={width} height={height} aria-hidden="true">
          <defs>
            {line?.area && (
              <linearGradient id={`area-${uid}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={line.color} stopOpacity={0.28} />
                <stop offset="100%" stopColor={line.color} stopOpacity={0} />
              </linearGradient>
            )}
          </defs>
          {/* grade */}
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={padL} x2={width - padR} y1={y(t)} y2={y(t)} className="nv-grid" />
              <text x={padL - 8} y={y(t)} dy="0.32em" textAnchor="end" className="nv-axis">
                {format(t)}
              </text>
            </g>
          ))}
          {band && (
            <g>
              <rect x={padL} width={innerW} y={y(band.to)} height={Math.max(0, y(band.from) - y(band.to))} className="nv-band" />
              {band.label && (
                <text x={padL + 6} y={y(band.to) + 12} className="nv-axis">
                  {band.label}
                </text>
              )}
            </g>
          )}
          {/* barras */}
          {data.map((d, i) => {
            let acc = 0;
            const parts = d.bars ?? [];
            const top = parts.reduce((s, v) => s + Math.max(0, v), 0);
            return (
              <g
                key={i}
                className="nv-bars"
                style={{ transitionDelay: `${i * 30}ms`, transformOrigin: `${cx(i)}px ${padT + innerH}px` }}
                opacity={active === null || active === i ? 1 : 0.55}
              >
                {parts.map((v, k) => {
                  if (v <= 0) return null;
                  const y0 = y(acc);
                  acc += v;
                  const y1 = y(acc);
                  const h = Math.max(0, y0 - y1);
                  const isTop = acc === top;
                  const r = isTop ? Math.min(4, barW / 2, h) : 0;
                  const x = cx(i) - barW / 2;
                  const gap = k > 0 ? 1 : 0;
                  return (
                    <path
                      key={k}
                      fill={bars[k]?.color}
                      d={roundedTop(x, y1, barW, Math.max(0, h - gap), r)}
                    />
                  );
                })}
              </g>
            );
          })}
          {goal && (
            <g>
              <line x1={padL} x2={width - padR} y1={y(goal.value)} y2={y(goal.value)} className="nv-goal" />
              <text x={width - padR} y={y(goal.value) - 6} textAnchor="end" className="nv-axis">
                {goal.label}
              </text>
            </g>
          )}
          {/* linha */}
          {line && linePts.length > 0 && (
            <g>
              {areaPath && <path d={areaPath} fill={`url(#area-${uid})`} className="nv-area" />}
              <path d={linePath} fill="none" stroke={line.color} strokeWidth={2} strokeLinecap="round" pathLength={1} className="nv-line" />
              {last && (
                <g>
                  <circle cx={last[0]} cy={last[1]} r={4} fill={line.color} className="nv-pulse" style={{ transformOrigin: `${last[0]}px ${last[1]}px` }} />
                  <circle cx={last[0]} cy={last[1]} r={4} fill={line.color} stroke="var(--nv-card)" strokeWidth={2} />
                </g>
              )}
            </g>
          )}
          {/* eixo x */}
          {data.map((d, i) =>
            every > 0 && ((n - 1 - i) % every === 0) ? (
              <text key={i} x={cx(i)} y={height - 8} textAnchor="middle" className="nv-axis" data-active={active === i || undefined}>
                {d.label}
              </text>
            ) : null,
          )}
          {/* cruz */}
          {active !== null && point && (
            <g className="nv-cross">
              <line x1={cx(active)} x2={cx(active)} y1={padT} y2={padT + innerH} />
              {activeValue !== null && activeValue !== undefined && (
                <>
                  <line x1={padL} x2={width - padR} y1={y(activeValue)} y2={y(activeValue)} />
                  <g transform={`translate(${padL - 4}, ${y(activeValue)})`}>
                    <rect x={-40} y={-10} width={40} height={20} rx={10} className="nv-pill" />
                    <text x={-20} dy="0.32em" textAnchor="middle" className="nv-pill-text">
                      {format(activeValue)}
                    </text>
                  </g>
                </>
              )}
              {line && point.line !== null && point.line !== undefined && (
                <circle cx={cx(active)} cy={y(point.line)} r={5} fill={line.color} stroke="var(--nv-card)" strokeWidth={2} />
              )}
            </g>
          )}
        </svg>
      )}
      {active !== null && point && width > 0 && (
        <div
          className="nv-tip"
          role="status"
          style={{
            left: Math.min(Math.max(cx(active), 90), width - 90),
            top: 0,
          }}
        >
          <p>{point.title}</p>
          <ul>
            {(point.bars ?? []).map((v, k) => (
              <li key={k}>
                <i style={{ background: bars[k]?.color }} />
                <span>{bars[k]?.label}</span>
                <b>{format(v)}</b>
              </li>
            ))}
            {line && point.line !== null && point.line !== undefined && (
              <li>
                <i data-line style={{ background: line.color }} />
                <span>{line.label}</span>
                <b>{format(point.line)}</b>
              </li>
            )}
            {point.extra?.map((x) => (
              <li key={x.label}>
                <i data-line style={{ background: x.color ?? "transparent" }} />
                <span>{x.label}</span>
                <b>{x.value}</b>
              </li>
            ))}
          </ul>
        </div>
      )}
      <span className="sr-only" aria-live="polite">
        {point
          ? `${point.title}: ${[
              ...(point.bars ?? []).map((v, k) => `${bars[k]?.label} ${format(v)}`),
              ...(line && point.line != null ? [`${line.label} ${format(point.line)}`] : []),
              ...(point.extra ?? []).map((x) => `${x.label} ${x.value}`),
            ].join(", ")}`
          : ""}
      </span>
      <style>{`.nv-chart{--nv-ease:${EASE}}`}</style>
    </div>
  );
}

function roundedTop(x: number, yTop: number, w: number, h: number, r: number) {
  if (h <= 0) return "";
  const rr = Math.min(r, h);
  return `M${x},${yTop + h}V${yTop + rr}Q${x},${yTop} ${x + rr},${yTop}H${x + w - rr}Q${x + w},${yTop} ${x + w},${yTop + rr}V${yTop + h}Z`;
}

export function niceTicks(max: number, count = 4) {
  const raw = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw || 1)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  return Array.from({ length: Math.ceil(max / step) + 1 }, (_, i) => +(i * step).toFixed(6));
}

/** Minilinha dos cartões: mesma cor da categoria, desenho animado e ponto final pulsando. */
export function NvSparkline({ values, color, height = 40 }: { values: number[]; color: string; height?: number }) {
  const [ref, width] = useWidth<HTMLSpanElement>();
  const seen = useInView(ref);
  const uid = React.useId().replace(/:/g, "");
  const max = Math.max(1, ...values);
  const pts = values.map(
    (v, i) =>
      [
        3 + (i * Math.max(0, width - 6)) / Math.max(1, values.length - 1),
        4 + (height - 8) * (1 - Math.max(0, v) / max),
      ] as [number, number],
  );
  const d = monotonePath(pts);
  const last = pts.at(-1);
  return (
    <span ref={ref} className="nv-spark" data-seen={seen || undefined} style={{ height }} aria-hidden="true">
      {width > 0 && pts.length > 1 && (
        <svg width={width} height={height}>
          <defs>
            <linearGradient id={`sp-${uid}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={`${d}L${last![0]},${height}L${pts[0]![0]},${height}Z`} fill={`url(#sp-${uid})`} className="nv-area" />
          <path d={d} fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" pathLength={1} className="nv-line" />
          <circle cx={last![0]} cy={last![1]} r={3} fill={color} className="nv-pulse" style={{ transformOrigin: `${last![0]}px ${last![1]}px` }} />
          <circle cx={last![0]} cy={last![1]} r={3} fill={color} />
        </svg>
      )}
    </span>
  );
}
