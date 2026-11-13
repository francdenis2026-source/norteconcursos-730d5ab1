import * as React from "react";
import { ExternalLink, Info, MapPin } from "lucide-react";
import { AcreInteractiveMap } from "@/components/dashboard/AcreInteractiveMap";
import {
  ACRE_CURRENT_IBGE_REGIONS,
  ACRE_EDITAL_REGIONS,
  ACRE_GEOGRAPHY_SOURCES,
  ACRE_MESOREGIONS,
  ACRE_MICROREGIONS,
} from "@/data/acreGeography";
import "@/styles/acre-geography-study.css";

const REGION_COLORS = ["#9B83E8", "#39A6D8", "#70C58A", "#E6A64A", "#D8799D"];

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

      <AcreInteractiveMap />

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
