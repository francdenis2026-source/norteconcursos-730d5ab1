import type * as React from "react";

export type TooltipRow = {
  label: string;
  value: React.ReactNode;
  /** Cor do marcador; use tokens CSS, por exemplo "var(--sh2-green)". */
  color?: string;
};

/**
 * Conteúdo de dica dos gráficos do painel, no tema da plataforma.
 * Recebe linhas já formatadas para não depender do formato interno do Recharts.
 */
export function ChartTooltipCard({ title, rows }: { title: React.ReactNode; rows: TooltipRow[] }) {
  return (
    <div className="ncx-tooltip" role="presentation">
      <p className="ncx-tooltip__title">{title}</p>
      <ul>
        {rows.map((row) => (
          <li key={row.label}>
            {row.color && <i style={{ background: row.color }} aria-hidden="true" />}
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
