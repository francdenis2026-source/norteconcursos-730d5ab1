import * as React from "react";
import { ExternalLink, Info, Layers, MapPin, Network } from "lucide-react";
import {
  ACRE_CURRENT_IBGE_REGIONS,
  ACRE_EDITAL_REGIONS,
  ACRE_GEOGRAPHY_SOURCES,
  ACRE_MESOREGIONS,
  ACRE_MICROREGIONS,
} from "@/data/acreGeography";
import "@/styles/acre-geography-study.css";

const REGION_COLORS = ["#9B83E8", "#39A6D8", "#70C58A", "#E6A64A", "#D8799D"];

function AcreSchematicMap() {
  return (
    <figure className="acre-geo-map">
      <svg
        viewBox="0 0 620 350"
        role="img"
        aria-labelledby="acre-map-title acre-map-description"
        className="acre-geo-map__svg"
      >
        <title id="acre-map-title">Esquema de localização das cinco microrregiões históricas do Acre</title>
        <desc id="acre-map-description">
          Ilustração esquemática do estado do Acre com marcadores aproximados para Cruzeiro do Sul,
          Tarauacá, Sena Madureira, Rio Branco e Brasiléia. Não representa limites municipais.
        </desc>
        <defs>
          <linearGradient id="acre-map-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#173E42" />
            <stop offset="100%" stopColor="#102A35" />
          </linearGradient>
          <filter id="acre-map-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity=".25" />
          </filter>
        </defs>
        <path
          d="M42 102 L78 67 L137 72 L164 52 L221 64 L267 81 L301 102 L338 106 L369 128 L410 141 L454 155 L502 177 L540 205 L518 235 L485 246 L462 275 L425 290 L397 311 L360 300 L331 319 L296 304 L267 282 L228 278 L197 259 L168 245 L144 218 L115 208 L93 179 L66 154 L49 126 Z"
          fill="url(#acre-map-fill)"
          stroke="#C6D5D8"
          strokeWidth="3"
          strokeLinejoin="round"
          filter="url(#acre-map-shadow)"
        />
        <path d="M83 121 C180 130 240 164 330 175 S455 200 495 224" fill="none" stroke="#72B9C3" strokeWidth="2" strokeDasharray="6 7" opacity=".55" />
        {[
          { x: 145, y: 135, label: "Cruzeiro do Sul", color: REGION_COLORS[0], tx: 76, ty: 111 },
          { x: 268, y: 165, label: "Tarauacá", color: REGION_COLORS[1], tx: 230, ty: 140 },
          { x: 367, y: 196, label: "Sena Madureira", color: REGION_COLORS[2], tx: 328, ty: 171 },
          { x: 478, y: 220, label: "Rio Branco", color: REGION_COLORS[3], tx: 455, ty: 194 },
          { x: 408, y: 282, label: "Brasiléia", color: REGION_COLORS[4], tx: 378, ty: 260 },
        ].map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="13" fill={point.color} stroke="#fff" strokeWidth="3" />
            <circle cx={point.x} cy={point.y} r="4" fill="#101820" />
            <text x={point.tx} y={point.ty} fill="#fff" fontSize="13" fontWeight="700">
              {point.label}
            </text>
          </g>
        ))}
        <text x="42" y="337" fill="currentColor" fontSize="10" opacity=".65">
          Esquema ilustrativo · marcadores aproximados · sem limites municipais
        </text>
      </svg>
      <figcaption>
        O desenho ajuda a memorizar a distribuição geral das microrregiões. Para limites e
        cartografia oficial, consulte o mapa do IBGE nas fontes ao final.
      </figcaption>
    </figure>
  );
}

export function AcreGeographyStudy() {
  return (
    <section className="acre-geo" aria-labelledby="acre-geo-title">
      <header className="acre-geo__intro">
        <div>
          <span className="acre-geo__eyebrow"><MapPin size={14} /> Geografia regional · PC-AC 2026</span>
          <h2 id="acre-geo-title">Mesorregiões, microrregiões e municípios</h2>
          <p>
            O Acre possui 22 municípios. No recorte geográfico tradicional do IBGE (1989/1990),
            eles foram organizados em duas mesorregiões e cinco microrregiões.
          </p>
        </div>
        <div className="acre-geo__stats" aria-label="Resumo da divisão regional tradicional">
          <div><strong>2</strong><span>mesorregiões</span></div>
          <div><strong>5</strong><span>microrregiões</span></div>
          <div><strong>22</strong><span>municípios</span></div>
        </div>
      </header>

      <div className="acre-geo__map-layout">
        <div className="acre-geo__map-panel">
          <div className="acre-geo__section-title">
            <Layers size={17} />
            <h3>Distribuição espacial</h3>
          </div>
          <AcreSchematicMap />
        </div>
        <div className="acre-geo__meso-panel">
          <div className="acre-geo__section-title">
            <Network size={17} />
            <h3>As duas mesorregiões</h3>
          </div>
          {ACRE_MESOREGIONS.map((meso, index) => (
            <article className="acre-geo__meso-card" key={meso.id} style={{ "--acre-region": index === 0 ? "#D8799D" : "#9B83E8" } as React.CSSProperties}>
              <div className="acre-geo__meso-heading">
                <strong>{meso.name}</strong>
                <span>{meso.microregions.length} microrregiões · {meso.municipalityCount} municípios</span>
              </div>
              <p>{meso.microregions.join(" · ")}</p>
            </article>
          ))}
          <p className="acre-geo__micro-note">
            <Info size={15} /> Vale do Acre reúne Brasiléia, Rio Branco e Sena Madureira. Vale do
            Juruá reúne Cruzeiro do Sul e Tarauacá.
          </p>
        </div>
      </div>

      <div className="acre-geo__section-title">
        <MapPin size={17} />
        <h3>As cinco microrregiões e seus municípios</h3>
      </div>
      <div className="acre-geo__micro-grid">
        {ACRE_MICROREGIONS.map((micro, index) => (
          <article
            className="acre-geo__micro-card"
            key={micro.id}
            style={{ "--acre-region": REGION_COLORS[index] } as React.CSSProperties}
          >
            <div className="acre-geo__micro-head">
              <span className="acre-geo__micro-index">0{index + 1}</span>
              <div>
                <h4>{micro.name}</h4>
                <span>{micro.mesoregion}</span>
              </div>
              <strong>{micro.municipalities.length}</strong>
            </div>
            <p>{micro.municipalities.join(" · ")}</p>
          </article>
        ))}
      </div>

      <section className="acre-geo__current">
        <div className="acre-geo__section-title">
          <Info size={17} />
          <h3>Atenção: o IBGE atualizou a divisão regional em 2017</h3>
        </div>
        <p>
          As mesorregiões e microrregiões geográficas de 1989/1990 deixaram de ser o recorte
          regional vigente do IBGE. Em 2017, foram substituídas por regiões geográficas
          intermediárias e imediatas. O Acre passou a ter duas regiões intermediárias e cinco
          regiões imediatas. A composição municipal das cinco regiões imediatas corresponde aos
          mesmos agrupamentos das antigas microrregiões, mas a nomenclatura oficial mudou.
        </p>
        <div className="acre-geo__current-grid">
          {ACRE_CURRENT_IBGE_REGIONS.map((region) => (
            <article key={region.id}>
              <span>Região Geográfica Intermediária</span>
              <h4>{region.name}</h4>
              <strong>{region.municipalityCount} municípios</strong>
              <ul>
                {region.immediateRegions.map((immediate) => (
                  <li key={immediate.name}>
                    <span>Região Imediata de {immediate.name}</span>
                    <small>{immediate.municipalities} municípios</small>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <a
          className="acre-geo__official-map"
          href="https://educa.ibge.gov.br/images/mapas/pdf/estados-acre.pdf"
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={14} /> Abrir mapa oficial do Acre no IBGE
        </a>
      </section>

      <details className="acre-geo__edital">
        <summary>Ver as regionais de desenvolvimento usadas no edital PC-AC 2026</summary>
        <p>
          Não confunda os nomes das antigas microrregiões do IBGE com a regionalização de
          desenvolvimento apresentada no conteúdo do edital. Os agrupamentos abaixo são a
          referência de estudo para a prova:
        </p>
        <div className="acre-geo__edital-grid">
          {ACRE_EDITAL_REGIONS.map((region) => (
            <article key={region.name}>
              <strong>{region.name}</strong>
              <span>{region.municipalities.length} municípios</span>
              <p>{region.municipalities.join(" · ")}</p>
            </article>
          ))}
        </div>
        <div className="acre-geo__warning">
          <strong>Ponto de atenção — Capixaba:</strong> o edital PC-AC 2026 e a tabela territorial
          da SEAD colocam Capixaba no Baixo Acre. O texto original da Lei Complementar estadual
          nº 126/2003 o relaciona ao Alto Acre. Para responder à questão conforme a classificação
          expressa no edital, memorize Capixaba no Baixo Acre e conheça a divergência normativa.
        </div>
      </details>

      <section className="acre-geo__sources">
        <h3>Fontes para aprofundamento</h3>
        <ul>
          {ACRE_GEOGRAPHY_SOURCES.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.label} <ExternalLink size={12} />
              </a>
            </li>
          ))}
        </ul>
        <small>Conteúdo revisado em 12/11/2026 · recorte histórico e divisão vigente identificados separadamente.</small>
      </section>
    </section>
  );
}
