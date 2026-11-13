import * as React from "react";
import { ExternalLink, Flame, Scale, Siren, UserSearch } from "lucide-react";
import type { Career, LegalMapData, LegalNode } from "@/data/legalMaps";
import "./legal-map.css";

const PRIORITY_LABEL = { 3: "Prioridade alta", 2: "Prioridade média", 1: "Prioridade básica" } as const;
const years = (n: number) => (n < 1 ? `${Math.round(n * 12)} m` : `${n} a`);

/** Mapa interativo de uma disciplina jurídica: ramos, régua de penas, filtros por cargo e exemplo de cada item. */
export function LegalMapExplorer({ map }: { map: LegalMapData }) {
  const [branchId, setBranchId] = React.useState<string>("all");
  const [career, setCareer] = React.useState<"all" | Career>("all");
  const [onlyTop, setOnlyTop] = React.useState(false);
  const [openId, setOpenId] = React.useState<string | null>(null);

  const visible = React.useMemo(
    () =>
      map.branches
        .filter((b) => branchId === "all" || b.id === branchId)
        .map((b) => ({
          ...b,
          nodes: b.nodes.filter((n) => (career === "all" || n.careers.includes(career)) && (!onlyTop || n.priority === 3)),
        }))
        .filter((b) => b.nodes.length > 0),
    [map, branchId, career, onlyTop],
  );
  const total = visible.reduce((sum, b) => sum + b.nodes.length, 0);
  const ruler = map.chart
    ? visible.flatMap((b) => b.nodes.filter((n): n is LegalNode & { max: number } => n.max !== undefined).map((n) => ({ n, color: b.color })))
    : [];
  const top = Math.max(1, ...ruler.map((r) => r.n.max));
  const jump = (id: string) => {
    setOpenId(id);
    requestAnimationFrame(() => document.getElementById(`lm-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  return (
    <section className="lmap" aria-labelledby={`lmap-${map.id}`}>
      <header className="lmap__head">
        <span className="lmap__icon" aria-hidden="true"><Scale size={20} /></span>
        <div>
          <h2 id={`lmap-${map.id}`}>{map.title}</h2>
          <p>{map.intro}</p>
        </div>
      </header>

      <div className="lmap__filters">
        <div className="lmap__chips" role="group" aria-label="Grupos">
          <button type="button" aria-pressed={branchId === "all"} onClick={() => setBranchId("all")}>Todos</button>
          {map.branches.map((b) => (
            <button key={b.id} type="button" aria-pressed={branchId === b.id} onClick={() => setBranchId(b.id)} style={{ "--c": b.color } as React.CSSProperties}>
              <i aria-hidden="true" /> {b.title}
            </button>
          ))}
        </div>
        <div className="lmap__chips" role="group" aria-label="Cargo e prioridade">
          <button type="button" aria-pressed={career === "all"} onClick={() => setCareer("all")}>Todos os cargos</button>
          <button type="button" aria-pressed={career === "delegado"} onClick={() => setCareer("delegado")}><Siren size={14} aria-hidden="true" /> Delegado</button>
          <button type="button" aria-pressed={career === "investigador"} onClick={() => setCareer("investigador")}><UserSearch size={14} aria-hidden="true" /> Investigador</button>
          <button type="button" aria-pressed={onlyTop} onClick={() => setOnlyTop((v) => !v)}><Flame size={14} aria-hidden="true" /> Só prioridade alta</button>
        </div>
      </div>

      {ruler.length > 0 && (
        <figure className="lmap__ruler">
          <figcaption>{map.chart} · clique em uma barra para abrir o item</figcaption>
          <ul>
            {ruler.map(({ n, color }) => (
              <li key={n.id}>
                <button type="button" onClick={() => jump(n.id)} style={{ "--c": color } as React.CSSProperties} aria-label={`${n.title}: pena máxima ${years(n.max)}`}>
                  <span className="lmap__ruler-name">{n.title}</span>
                  <span className="lmap__bar"><span style={{ left: `${((n.min ?? 0) / top) * 100}%`, width: `${Math.max(1.5, ((n.max - (n.min ?? 0)) / top) * 100)}%` }} /></span>
                  <span className="lmap__ruler-val">{n.min !== undefined && n.min !== n.max ? `${years(n.min)}–${years(n.max)}` : years(n.max)}</span>
                </button>
              </li>
            ))}
          </ul>
        </figure>
      )}

      <p className="lmap__count" role="status">{total} {total === 1 ? "item" : "itens"} na seleção de estudo</p>
      {visible.length === 0 && <p className="lmap__empty">Nenhum item com esses filtros. Remova um filtro para ver o mapa.</p>}

      {visible.map((b) => (
        <div key={b.id} className="lmap__branch" style={{ "--c": b.color } as React.CSSProperties}>
          <h3><i aria-hidden="true" /> {b.title}</h3>
          <p className="lmap__summary">{b.summary}</p>
          <ul className="lmap__nodes">
            {b.nodes.map((n) => {
              const open = openId === n.id;
              return (
                <li key={n.id} id={`lm-${n.id}`} className="lmap__node" data-open={open || undefined}>
                  <button type="button" aria-expanded={open} onClick={() => setOpenId(open ? null : n.id)}>
                    <strong>{n.title}</strong>
                    <span className="lmap__ref">{n.ref}</span>
                    <span className="lmap__tags">
                      <em data-p={n.priority}>{PRIORITY_LABEL[n.priority]}</em>
                      {n.hediondo && <em data-k="hediondo">Hediondo</em>}
                      {n.changed && <em data-k="changed">Alterado em 2025/26</em>}
                      {n.check === "secundaria" && <em data-k="check">Fonte secundária</em>}
                    </span>
                  </button>
                  {open && (
                    <div className="lmap__detail">
                      <p><b>Regra / pena:</b> {n.rule}</p>
                      <p><b>Exemplo:</b> {n.example}</p>
                      {n.watch && <p className="lmap__watch"><b>Atenção:</b> {n.watch}</p>}
                      {n.changed && <p><b>Alteração:</b> {n.changed}</p>}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <footer className="lmap__foot">
        <p>
          Fontes: {map.sources.map((s, i) => (
            <React.Fragment key={s.url}>{i > 0 && " · "}<a href={s.url} target="_blank" rel="noopener noreferrer">{s.label} <ExternalLink size={12} aria-hidden="true" /></a></React.Fragment>
          ))}
        </p>
        <p>Conferido em {map.checkedOn.split("-").reverse().join("/")}. A prioridade é uma avaliação editorial de estudo, não estatística oficial de prova. Confira sempre o texto vigente antes de citar.</p>
      </footer>
    </section>
  );
}
