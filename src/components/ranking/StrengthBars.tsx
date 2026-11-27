import "@/styles/ranking-strengths.css";

export type Strength = { s: string; pct: number; n: number; c?: number };

/** Aceita só o formato esperado vindo do banco. */
export function parseStrengths(v: unknown): Strength[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x): x is Strength => !!x && typeof x.s === "string" && Number.isFinite(x.pct) && Number.isFinite(x.n))
    .map((x) => ({ s: x.s.trim(), pct: Math.max(0, Math.min(100, Math.round(x.pct))), n: Math.max(0, Math.round(x.n)), c: Number.isFinite(x.c) ? Math.max(0, Math.round(x.c as number)) : undefined }))
    .filter((x) => x.s);
}

const tone = (p: number) => (p >= 80 ? "hi" : p >= 60 ? "mid" : "lo");

/** Pontos fortes: disciplinas com maior aproveitamento, uma linha por disciplina. */
export function StrengthBars({ items, compact = false, title = "Pontos fortes" }: { items: Strength[]; compact?: boolean; title?: string }) {
  if (!items.length) return null;
  return (
    <span className="rks" data-compact={compact || undefined}>
      <span className="rks__title">{title}</span>
      <span className="rks__list">
        {items.map((x) => (
          <span className="rks__row" key={x.s} title={x.c === undefined ? `${x.s}: ${x.pct}% de acerto em ${x.n} questões` : `${x.s}: ${x.c} acertos em ${x.n} questões (${x.pct}%)`} data-tone={tone(x.pct)}>
            <span className="rks__name">{x.s}</span>
            <span className="rks__bar" aria-hidden="true"><i style={{ width: `${x.pct}%` }} /></span>
            <b className="rks__pct">{x.pct}%</b>
            {!compact && <small className="rks__n">{x.c === undefined ? `${x.n} q.` : `${x.c}/${x.n}`}</small>}
          </span>
        ))}
      </span>
    </span>
  );
}
