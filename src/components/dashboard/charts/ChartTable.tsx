import { BarChart3, Table2 } from "lucide-react";

/** Tabela equivalente ao gráfico: todos os valores legíveis sem depender da dica. */
export function ChartTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: Array<Array<string | number>>;
}) {
  return (
    <div className="ncx-table-wrap">
      <table className="ncx-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={j}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Alterna entre gráfico e tabela. */
export function ViewToggle({
  view,
  onChange,
}: {
  view: "chart" | "table";
  onChange: (view: "chart" | "table") => void;
}) {
  return (
    <div className="ncx-viewtoggle" role="group" aria-label="Modo de exibição">
      <button type="button" aria-pressed={view === "chart"} onClick={() => onChange("chart")}>
        <BarChart3 aria-hidden="true" /> Gráfico
      </button>
      <button type="button" aria-pressed={view === "table"} onClick={() => onChange("table")}>
        <Table2 aria-hidden="true" /> Tabela
      </button>
    </div>
  );
}
