import type * as React from "react";

export type TooltipRow = {
  label: string;
  value: React.ReactNode;
  /** Cor da série (token CSS). Aparece como traço curto, nunca no texto. */
  color?: string;
};

/**
 * Dica dos gráficos do painel: o valor em destaque, o nome da série em segundo plano,
 * identificada por um traço curto na cor da série.
 */
export function ChartTooltipCard({ title, rows }: { title: React.ReactNode; rows: TooltipRow[] }) {
  return (
    <div className="ncx-tooltip" role="presentation">
      <p className="ncx-tooltip__title">{title}</p>
      <ul>
        {rows.map((row) => (
          <li key={row.label}>
            <i style={{ background: row.color ?? "transparent" }} aria-hidden="true" />
            <strong>{row.value}</strong>
            <span>{row.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
