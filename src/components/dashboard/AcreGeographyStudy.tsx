import * as React from "react";
import { ExternalLink, Info, Map, MapPin, Network, ZoomIn } from "lucide-react";
import {
  ACRE_CURRENT_IBGE_REGIONS,
  ACRE_EDITAL_REGIONS,
  ACRE_GEOGRAPHY_SOURCES,
  ACRE_MESOREGIONS,
  ACRE_MICROREGIONS,
} from "@/data/acreGeography";
import "@/styles/acre-geography-study.css";

const REGION_COLORS = ["#9B83E8", "#39A6D8", "#70C58A", "#E6A64A", "#D8799D"];

const ACRE_MAPS = [
  {
    id: "municipios",
    label: "Municípios",
    detail: "22 municípios",
    title: "Mapa político dos 22 municípios",
    description: "Veja os limites municipais e a localização de cada município acreano.",
    src: "/media/acre/acre-municipios.webp",
    width: 640,
    height: 403,
    alt: "Mapa político do Acre com os limites e nomes dos 22 municípios.",
    legend: [{ color: "#718096", label: "Limites municipais e identificação dos 22 municípios" }],
    note: "Use este mapa para localizar os municípios e relacionar cada nome à sua posição no território estadual.",
  },
  {
    id: "mesorregioes",
    label: "Mesorregiões",
    detail: "2 áreas históricas",
    title: "As duas mesorregiões tradicionais",
    description: "O mapa numera as duas grandes áreas do recorte histórico do IBGE.",
    src: "/media/acre/acre-mesorregioes.webp",
    width: 650,
    height: 365,
    alt: "Mapa do Acre com duas mesorregiões históricas: Vale do Acre em azul, identificado pelo número 1, e Vale do Juruá em vermelho, identificado pelo número 2.",
    legend: [
      { color: "#079FE2", label: "1 · Vale do Acre — 14 municípios" },
      { color: "#F01824", label: "2 · Vale do Juruá — 8 municípios" },
    ],
    note: "A numeração segue a imagem: 1 corresponde ao Vale do Acre (porção sudeste) e 2 ao Vale do Juruá (porção noroeste). É a divisão histórica em mesorregiões, não a nomenclatura regional vigente do IBGE.",
  },
  {
    id: "agrupamentos",
    label: "Regionais",
    detail: "3 grandes grupos",
    title: "Agrupamentos regionais do Acre",
    description: "Esta representação reúne as regionais em três grandes conjuntos territoriais.",
    src: "/media/acre/acre-regionais-amplas.webp",
    width: 640,
    height: 361,
    alt: "Mapa regional do Acre: Juruá/Tarauacá-Envira em azul, Baixo Acre e Purus em laranja, e Alto Acre em verde.",
    legend: [
      { color: "#36A9DE", label: "Juruá / Tarauacá-Envira" },
      { color: "#F29B4B", label: "Baixo Acre e Purus" },
      { color: "#36A653", label: "Alto Acre" },
    ],
    note: "Atenção: este mapa agrupa as áreas em três conjuntos. O quadro do edital apresentado abaixo detalha cinco regionais de desenvolvimento; não confunda os dois recortes.",
  },
] as const;

type AcreMapId = (typeof ACRE_MAPS)[number]["id"];

function AcreMapGallery() {
  const [activeMapId, setActiveMapId] = React.useState<AcreMapId>("municipios");
  const [imageError, setImageError] = React.useState(false);
  const activeMap = ACRE_MAPS.find((mapItem) => mapItem.id === activeMapId) ?? ACRE_MAPS[0];

  const selectMap = (mapId: AcreMapId) => {
    setActiveMapId(mapId);
    setImageError(false);
  };

  return (
    <section className="acre-geo__map-gallery" aria-labelledby="acre-geo-map-title">
      <div className="acre-geo__section-title">
        <Map size={17} aria-hidden="true" />
        <div>
          <h3 id="acre-geo-map-title">Mapas para estudar a divisão territorial</h3>
          <p>Alterne entre o mapa municipal, a divisão histórica e os agrupamentos regionais.</p>
        </div>
      </div>

      <div className="acre-geo__map-tabs" role="group" aria-label="Selecionar mapa do Acre">
        {ACRE_MAPS.map((mapItem) => (
          <button
            key={mapItem.id}
            type="button"
            className={`acre-geo__map-tab${activeMapId === mapItem.id ? " is-active" : ""}`}
            aria-pressed={activeMapId === mapItem.id}
            onClick={() => selectMap(mapItem.id)}
          >
            <span>{mapItem.label}</span>
            <small>{mapItem.detail}</small>
          </button>
        ))}
      </div>

      <div className="acre-geo__map-viewer" aria-live="polite">
        <div className="acre-geo__map-viewer-head">
          <div>
            <h4>{activeMap.title}</h4>
            <p>{activeMap.description}</p>
          </div>
          <a
            className="acre-geo__map-open"
            href={activeMap.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir ${activeMap.title} em tamanho original`}
          >
            <ZoomIn size={15} aria-hidden="true" />
            Ampliar mapa
          </a>
        </div>

        {imageError ? (
          <div className="acre-geo__map-error" role="alert">
            Não foi possível carregar esta imagem. Atualize a página ou abra o mapa em tamanho original.
          </div>
        ) : (
          <figure className="acre-geo__map-figure">
            <img
              key={activeMap.src}
              src={activeMap.src}
              width={activeMap.width}
              height={activeMap.height}
              alt={activeMap.alt}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
            />
            <figcaption>{activeMap.note}</figcaption>
          </figure>
        )}

        <div className="acre-geo__map-legend" aria-label="Legenda do mapa">
          {activeMap.legend.map((item) => (
            <span className="acre-geo__map-legend-item" key={item.label}>
              <i style={{ backgroundColor: item.color }} aria-hidden="true" />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </section>
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

      <AcreMapGallery />

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
