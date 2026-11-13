import * as React from "react";
import { BarChart3, ExternalLink, Lightbulb, Users } from "lucide-react";
import { ACRE_MAP_SHAPES, ACRE_MAP_VIEWBOX } from "@/data/acreMapShapes";
import {
  ACRE_INDIGENOUS_BY_MUNICIPALITY,
  ACRE_INDIGENOUS_FACTS,
  ACRE_INDIGENOUS_SHARE,
  ACRE_INDIGENOUS_SHARE_STATE,
  ACRE_INDIGENOUS_SOURCES,
  ACRE_INDIGENOUS_TOTAL_2010,
  ACRE_INDIGENOUS_TOTAL_2022,
  ACRE_PEOPLES,
} from "@/data/acreIndigenous";
import "@/styles/acre-indigenous-resex.css";

type Metric = "count" | "share";
const fmt = (value: number) => value.toLocaleString("pt-BR");

/** Povos indígenas do Acre: municípios com mais indígenas (Censo 2022), mapa, gráficos e povos. */
export function AcreIndigenousStudy() {
  const [metric, setMetric] = React.useState<Metric>("count");
  const data: Record<string, number> = metric === "count" ? ACRE_INDIGENOUS_BY_MUNICIPALITY : ACRE_INDIGENOUS_SHARE;
  const ranking = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const max = ranking[0]?.[1] ?? 1;
  const shade = (name: string) => {
    const value = data[name];
    if (value === undefined) return null;
    return 0.18 + 0.82 * Math.sqrt(value / max);
  };
  const label = (value: number) => (metric === "count" ? fmt(value) : `${value.toLocaleString("pt-BR")}%`);
  const growth = Math.round(((ACRE_INDIGENOUS_TOTAL_2022 - ACRE_INDIGENOUS_TOTAL_2010) / ACRE_INDIGENOUS_TOTAL_2010) * 100);

  return (
    <section className="ari ari--ind" aria-labelledby="acre-ind-title">
      <header className="ari__head">
        <Users aria-hidden="true" size={20} />
        <div>
          <h2 id="acre-ind-title">Povos indígenas: onde estão e quantos são</h2>
          <p>Censo 2022 do IBGE: o Acre tem {fmt(ACRE_INDIGENOUS_TOTAL_2022)} pessoas indígenas, {growth}% a mais que em 2010.</p>
        </div>
      </header>

      <div className="ari__stats">
        <div><strong>{fmt(ACRE_INDIGENOUS_TOTAL_2022)}</strong><span>indígenas em 2022</span></div>
        <div><strong>{ACRE_INDIGENOUS_SHARE_STATE.toLocaleString("pt-BR")}%</strong><span>da população do Estado</span></div>
        <div><strong>+{growth}%</strong><span>desde 2010</span></div>
        <div><strong>13º</strong><span>entre os estados</span></div>
      </div>

      <div className="ari__chips" role="group" aria-label="Medida do gráfico e do mapa">
        <button type="button" aria-pressed={metric === "count"} onClick={() => setMetric("count")}>Número de indígenas</button>
        <button type="button" aria-pressed={metric === "share"} onClick={() => setMetric("share")}>% da população do município</button>
      </div>

      <div className="ari__grid">
        <figure className="ari__map">
          <svg viewBox={`0 0 ${ACRE_MAP_VIEWBOX.width} ${ACRE_MAP_VIEWBOX.height}`} role="img" aria-label="Mapa do Acre com a população indígena por município">
            {ACRE_MAP_SHAPES.map((shape) => {
              const opacity = shade(shape.name);
              return (
                <path key={shape.ibgeId} d={shape.path} className="ari__shape" fill={opacity === null ? "var(--muted)" : "#c2527c"} fillOpacity={opacity ?? 1}>
                  <title>{`${shape.name}${data[shape.name] !== undefined ? `: ${label(data[shape.name]!)}` : ": sem valor na fonte"}`}</title>
                </path>
              );
            })}
            {ACRE_MAP_SHAPES.filter((shape) => ranking.slice(0, 6).some(([name]) => name === shape.name)).map((shape) => (
              <text key={shape.ibgeId} x={shape.cx} y={shape.cy} className="ari__label" textAnchor="middle" aria-hidden="true">{shape.name}</text>
            ))}
          </svg>
          <figcaption>Quanto mais forte a cor, maior o valor. Municípios em cinza não têm valor na fonte consultada.</figcaption>
        </figure>

        <div className="ari__chart ari__chart--ind">
          <h3><BarChart3 size={15} aria-hidden="true" /> {metric === "count" ? "Municípios com mais indígenas" : "Municípios onde os indígenas pesam mais"}</h3>
          <ul>
            {ranking.slice(0, 10).map(([name, value], index) => (
              <li key={name} style={{ "--c": "#c2527c" } as React.CSSProperties}>
                <span><b>{index + 1}</b> {name}</span>
                <div className="ari__bar" aria-hidden="true"><i style={{ width: `${(value / max) * 100}%` }} /></div>
                <strong>{label(value)}</strong>
              </li>
            ))}
          </ul>
          {metric === "share" && <p className="ari__note">Média do Estado: {ACRE_INDIGENOUS_SHARE_STATE.toLocaleString("pt-BR")}%. Só aparecem os dez municípios acima da média.</p>}
        </div>
      </div>

      <div className="ari__tip">
        <Lightbulb size={16} aria-hidden="true" />
        <p>
          <strong>Na prova:</strong> o maior número é de Feijó (4.436); o maior peso relativo é de Santa Rosa do Purus (63,9% da população). Santa Rosa, Jordão e Marechal Thaumaturgo estão no Vale do Juruá e no Purus: todos fora do Baixo Acre.
        </p>
      </div>

      <div className="ari__facts">
        {ACRE_INDIGENOUS_FACTS.map((fact) => (
          <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
        ))}
      </div>

      <div className="ari__peoples">
        <h3>Povos e famílias linguísticas</h3>
        <p>O Acre abriga povos das famílias Pano, Aruak e Arawá. Alguns dos mais citados:</p>
        <ul>
          {ACRE_PEOPLES.map((people) => (
            <li key={people.name}><strong>{people.name}</strong><span>{people.note}</span></li>
          ))}
        </ul>
      </div>

      <p className="ari__care">
        Atenção: os números municipais vêm de reportagens que reproduzem o IBGE; o total de 31.694 aparece como 31.699 em uma delas. Seis municípios (Mâncio Lima, Rodrigues Alves, Acrelândia, Bujari, Plácido de Castro e Senador Guiomard) ficaram sem valor absoluto. Confirme na tabela do IBGE.
      </p>
      <p className="ari__src">
        {ACRE_INDIGENOUS_SOURCES.map((source) => (
          <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <ExternalLink size={11} aria-hidden="true" /></a>
        ))}
      </p>
    </section>
  );
}
