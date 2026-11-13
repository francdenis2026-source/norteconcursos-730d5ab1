import * as React from "react";
import { BarChart3, Leaf, MapPin } from "lucide-react";
import { ACRE_MAP_SHAPES, ACRE_MAP_VIEWBOX } from "@/data/acreMapShapes";
import { ACRE_RESEX, ACRE_TOTAL_HECTARES } from "@/data/acreResex";
import "@/styles/acre-indigenous-resex.css";

const fmt = (value: number) => Math.round(value).toLocaleString("pt-BR");

/** Mapa das Resex federais por município e gráfico de áreas (dados do CNUC/MMA). */
export function AcreResexMap() {
  const [selected, setSelected] = React.useState<string>("all");
  const mapped = ACRE_RESEX.filter((resex) => resex.municipalities.length);
  const chosen = ACRE_RESEX.find((resex) => resex.id === selected);
  const sizeOf = (resex: (typeof ACRE_RESEX)[number]) => resex.area ?? resex.legalArea ?? 0;
  const maxArea = Math.max(...ACRE_RESEX.map(sizeOf));
  const totalArea = ACRE_RESEX.reduce((sum, resex) => sum + sizeOf(resex), 0);

  const coverage = (municipality: string) => mapped.filter((resex) => resex.municipalities.includes(municipality));
  const fillOf = (municipality: string) => {
    const list = coverage(municipality);
    if (!list.length) return { fill: "var(--muted)", opacity: 1 };
    if (chosen) return list.includes(chosen) ? { fill: chosen.color, opacity: 1 } : { fill: "var(--muted)", opacity: 1 };
    return { fill: list[0]!.color, opacity: 0.55 + Math.min(list.length - 1, 2) * 0.22 };
  };
  const coveredMunicipalities = chosen
    ? chosen.municipalities
    : [...new Set(mapped.flatMap((resex) => resex.municipalities))].sort((a, b) => a.localeCompare(b, "pt-BR"));

  return (
    <section className="ari ari--resex" aria-labelledby="acre-resex-title">
      <header className="ari__head">
        <Leaf aria-hidden="true" size={20} />
        <div>
          <h2 id="acre-resex-title">Mapa das reservas extrativistas</h2>
          <p>Resex federais do Acre e os municípios que elas alcançam. Escolha uma reserva para destacá-la.</p>
        </div>
      </header>

      <div className="ari__chips" role="group" aria-label="Escolher reserva">
        <button type="button" aria-pressed={selected === "all"} onClick={() => setSelected("all")}>Todas</button>
        {ACRE_RESEX.map((resex) => (
          <button
            key={resex.id}
            type="button"
            aria-pressed={selected === resex.id}
            style={{ "--c": resex.color } as React.CSSProperties}
            onClick={() => setSelected(resex.id)}
          >
            <i aria-hidden="true" /> {resex.name}
          </button>
        ))}
      </div>

      <div className="ari__grid">
        <figure className="ari__map">
          <svg viewBox={`0 0 ${ACRE_MAP_VIEWBOX.width} ${ACRE_MAP_VIEWBOX.height}`} role="img" aria-label="Mapa do Acre com os municípios alcançados pelas reservas extrativistas federais">
            {ACRE_MAP_SHAPES.map((shape) => {
              const style = fillOf(shape.name);
              return <path key={shape.ibgeId} d={shape.path} fill={style.fill} fillOpacity={style.opacity} className="ari__shape"><title>{shape.name}</title></path>;
            })}
            {ACRE_MAP_SHAPES.filter((shape) => coveredMunicipalities.includes(shape.name)).map((shape) => (
              <text key={shape.ibgeId} x={shape.cx} y={shape.cy} className="ari__label" textAnchor="middle" aria-hidden="true">{shape.name}</text>
            ))}
          </svg>
          <figcaption>
            Cores mostram a reserva; tons mais fortes indicam município com mais de uma. Limites municipais: malha do IBGE, simplificada; o mapa indica municípios, não o contorno real das reservas.
          </figcaption>
        </figure>

        <div className="ari__side">
          <article className="ari__card" aria-live="polite">
            <h3><MapPin size={15} aria-hidden="true" /> {chosen ? `Resex ${chosen.name}` : "Todas as Resex federais"}</h3>
            {chosen ? (
              <dl>
                <div><dt>Criação</dt><dd>{chosen.created} · {chosen.act}</dd></div>
                {sizeOf(chosen) ? <div><dt>Área</dt><dd>{chosen.area ? `${fmt(chosen.area)} ha (geoprocessamento)${chosen.legalArea ? `; ${fmt(chosen.legalArea)} ha no ato legal` : ""}` : `${fmt(sizeOf(chosen))} ha (ato legal)`}</dd></div> : null}
                <div><dt>Municípios</dt><dd>{chosen.municipalities.length ? chosen.municipalities.join(", ") : "sem dado oficial no CNUC"}</dd></div>
              </dl>
            ) : (
              <p>
                As cinco reservas somam cerca de <strong>{fmt(totalArea)} ha</strong>, perto de{" "}
                <strong>{((totalArea / ACRE_TOTAL_HECTARES) * 100).toFixed(0)}% do território</strong> do Estado. Alcançam{" "}
                {coveredMunicipalities.length} municípios.
              </p>
            )}
            {chosen?.note && <p className="ari__care">{chosen.note}</p>}
          </article>
        </div>
      </div>

      <div className="ari__chart" role="group" aria-label="Área das reservas extrativistas em hectares">
        <h3><BarChart3 size={15} aria-hidden="true" /> Tamanho das reservas (hectares)</h3>
        <ul>
          {[...ACRE_RESEX].sort((a, b) => sizeOf(b) - sizeOf(a)).map((resex) => (
            <li key={resex.id} style={{ "--c": resex.color } as React.CSSProperties}>
              <span>{resex.name}</span>
              <div className="ari__bar" aria-hidden="true"><i style={{ width: `${(sizeOf(resex) / maxArea) * 100}%` }} /></div>
              <strong>{fmt(sizeOf(resex))}{resex.area ? "" : "*"}</strong>
            </li>
          ))}
        </ul>
      </div>
      <p className="ari__note">Fonte: CNUC/MMA (relatórios de 12/11/2026), áreas por geoprocessamento. * Alto Juruá: área do decreto de criação (sem relatório no CNUC).</p>
    </section>
  );
}
