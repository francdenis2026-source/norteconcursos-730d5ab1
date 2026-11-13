import { ArrowDown, GitCompare, GraduationCap, Layers } from "lucide-react";
import { ACRE_CURRENT_IBGE_REGIONS, ACRE_MESOREGIONS, ACRE_MICROREGIONS } from "@/data/acreGeography";

const STEPS = [
  { level: "Município", text: "A menor unidade: 22 no Acre." },
  { level: "Região Imediata", text: "Reúne municípios que se atendem mutuamente: compras, trabalho, saúde, educação e serviços públicos do dia a dia." },
  { level: "Região Intermediária", text: "Junta várias imediatas em torno de um polo maior, que organiza a rede de cidades." },
  { level: "Estado", text: "Divisão política: o Acre inteiro." },
] as const;

/** Explica, em linguagem simples, a divisão regional do IBGE de 2017 e como ela se liga ao recorte antigo e ao do edital. */
export function AcreIbgeDivision() {
  return (
    <section className="acre-ibge" aria-labelledby="acre-ibge-title">
      <header className="acre-ibge__head">
        <Layers aria-hidden="true" size={20} />
        <div>
          <h3 id="acre-ibge-title">A nova divisão regional do IBGE, explicada</h3>
          <p>O que mudou em 2017, para que serve e como cai em prova.</p>
        </div>
      </header>

      <div className="acre-ibge__lead">
        <p>
          Em <strong>1989/1990</strong> o IBGE dividia o país em <strong>mesorregiões</strong> e <strong>microrregiões</strong>. Em <strong>2017</strong>,
          depois de décadas de mudanças nas cidades e nas estradas, passou a usar <strong>regiões geográficas intermediárias</strong> e{" "}
          <strong>imediatas</strong> (133 e 510 no Brasil). São divisões de estatística e planejamento, não de governo: não criam
          municípios nem mudam limites.
        </p>
      </div>

      <ol className="acre-ibge__steps" aria-label="Como as divisões se encaixam">
        {STEPS.map((step, index) => (
          <li key={step.level}>
            <b>{step.level}</b>
            <span>{step.text}</span>
            {index < STEPS.length - 1 && <ArrowDown size={14} aria-hidden="true" className="acre-ibge__arrow" />}
          </li>
        ))}
      </ol>

      <div className="acre-ibge__table" role="table" aria-label="Antes e depois no Acre">
        <div role="row" className="acre-ibge__row acre-ibge__row--head">
          <span role="columnheader">Recorte antigo (1989/90)</span>
          <span role="columnheader">Recorte vigente (2017)</span>
          <span role="columnheader">Municípios</span>
        </div>
        {ACRE_MESOREGIONS.map((meso) => {
          const current = ACRE_CURRENT_IBGE_REGIONS.find((region) => region.name === (meso.name === "Vale do Acre" ? "Rio Branco" : "Cruzeiro do Sul"));
          return (
            <div key={meso.id} className="acre-ibge__group" role="rowgroup">
              <div role="row" className="acre-ibge__row acre-ibge__row--main">
                <span role="cell"><small>Mesorregião</small>{meso.name}</span>
                <span role="cell"><small>Região Intermediária</small>{current?.name}</span>
                <span role="cell"><strong>{meso.municipalityCount}</strong></span>
              </div>
              {meso.microregions.map((microName) => {
                const micro = ACRE_MICROREGIONS.find((item) => item.name === microName);
                const immediate = current?.immediateRegions.find((item) => item.name === microName);
                return (
                  <div key={microName} role="row" className="acre-ibge__row">
                    <span role="cell"><small>Microrregião</small>{microName}</span>
                    <span role="cell"><small>Região Imediata</small>{microName}</span>
                    <span role="cell">{immediate?.municipalities ?? micro?.municipalities.length}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <ul className="acre-ibge__points">
        <li><GitCompare size={14} aria-hidden="true" /> <span><strong>No Acre os grupos de municípios são os mesmos</strong>: só os nomes mudaram. Em outros estados, a composição mudou bastante; não generalize.</span></li>
        <li><GitCompare size={14} aria-hidden="true" /> <span><strong>Não confunda com as regionais do edital</strong>: Alto Acre, Baixo Acre, Purus, Envira e Juruá são regionais de desenvolvimento do governo estadual (5 grupos, finalidade de planejamento), e não divisão do IBGE.</span></li>
        <li><GraduationCap size={14} aria-hidden="true" /> <span><strong>Na prova</strong>: leia o enunciado. Se citar “mesorregião” ou “microrregião”, vale o recorte antigo (2 e 5); se citar “intermediária” ou “imediata”, vale o de 2017 (2 e 5); se citar Alto/Baixo Acre, Purus, Envira ou Juruá, são as regionais do edital.</span></li>
      </ul>
      <p className="acre-ibge__note">Fonte: IBGE, Divisão Regional do Brasil em Regiões Geográficas Imediatas e Intermediárias (2017), listada nas fontes desta área.</p>
    </section>
  );
}
