import * as React from "react";
import { Info, Layers, MapPin, Star, Target, Lightbulb } from "lucide-react";
import { ACRE_MAP_SHAPES, ACRE_MAP_VIEWBOX } from "@/data/acreMapShapes";
import { ACRE_MICROREGIONS } from "@/data/acreGeography";
import { ACRE_MUNICIPALITY_NOTES, ACRE_MUNICIPALITY_STRATEGY } from "@/data/acreMunicipalityNotes";

type LayerId = "meso" | "micro" | "dev";

const LAYERS: { id: LayerId; label: string; detail: string; note: string }[] = [
  {
    id: "meso",
    label: "Mesorregiões",
    detail: "2 grandes áreas",
    note: "Recorte histórico do IBGE (1989/1990): Vale do Acre e Vale do Juruá.",
  },
  {
    id: "micro",
    label: "Microrregiões",
    detail: "5 áreas",
    note: "Recorte histórico do IBGE. Hoje equivalem às cinco regiões imediatas (IBGE, 2017), com os mesmos municípios.",
  },
  {
    id: "dev",
    label: "Regionais do edital",
    detail: "5 regionais",
    note: "Regionalização de desenvolvimento do conteúdo do edital PC-AC 2026: Alto Acre, Baixo Acre, Purus, Envira e Juruá.",
  },
];

const PALETTES: Record<LayerId, string[]> = {
  meso: ["#3AA0DA", "#E5A248"],
  micro: ["#9B83E8", "#39A6D8", "#70C58A", "#E6A64A", "#D8799D"],
  dev: ["#2FA37A", "#E0813B", "#8E7CD8", "#D9657F", "#3E8FD1"],
};

const SEATS = new Set<string>(ACRE_MICROREGIONS.map((region) => region.name));

type RegionInfo = { micro: string; meso: string; dev: string };
const INFO: Record<string, RegionInfo> = {};
for (const region of ACRE_MICROREGIONS)
  for (const name of region.municipalities)
    INFO[name] = { micro: region.name, meso: region.mesoregion, dev: region.developmentRegion };

const keyOf = (layer: LayerId, info: RegionInfo) => (layer === "meso" ? info.meso : layer === "micro" ? info.micro : info.dev);

const FACTS: { label: string; value: string }[] = [
  { label: "Municípios", value: "22, todos na faixa de fronteira de 150 km (IBGE)" },
  { label: "Capital", value: "Rio Branco (364.756 habitantes no Censo 2022)" },
  { label: "Área", value: "cerca de 164 mil km² (IBGE; o valor varia entre revisões da área territorial)" },
  { label: "Limites", value: "Amazonas (norte), Rondônia (leste), Bolívia (sul e sudeste) e Peru (oeste)" },
];

/** Mapa político do Acre com os 22 municípios, clicável, em três camadas de regionalização. */
export function AcreInteractiveMap() {
  const [layer, setLayer] = React.useState<LayerId>("micro");
  const [selected, setSelected] = React.useState<string | null>(null);
  const [focus, setFocus] = React.useState<string | null>(null);
  const layerInfo = LAYERS.find((item) => item.id === layer)!;

  const groups = React.useMemo(() => {
    const map = new Map<string, string[]>();
    for (const shape of ACRE_MAP_SHAPES) {
      const info = INFO[shape.name];
      if (!info) continue;
      const key = keyOf(layer, info);
      map.set(key, [...(map.get(key) ?? []), shape.name]);
    }
    return [...map.entries()].map(([name, members], index) => ({
      name,
      members,
      color: PALETTES[layer][index % PALETTES[layer].length]!,
    }));
  }, [layer]);
  const colorOf = (municipality: string) => {
    const info = INFO[municipality];
    const group = info && groups.find((item) => item.name === keyOf(layer, info));
    return group?.color ?? "#94a3b8";
  };

  const pick = (name: string) => {
    if (selected === name) {
      setSelected(null);
      setFocus(null);
      return;
    }
    setSelected(name);
    const info = INFO[name];
    setFocus(info ? keyOf(layer, info) : null);
  };
  const changeLayer = (next: LayerId) => {
    setLayer(next);
    const info = selected ? INFO[selected] : undefined;
    setFocus(info ? keyOf(next, info) : null);
  };
  const focused = focus ? groups.find((group) => group.name === focus) : undefined;
  const shown = selected ? INFO[selected] : undefined;
  const selectedShape = ACRE_MAP_SHAPES.find((shape) => shape.name === selected);
  const labelled = new Set<string>([...(focused?.members ?? []), ...(selected ? [selected] : []), ...(focused ? [] : [...SEATS])]);

  return (
    <section className="acre-imap" aria-labelledby="acre-imap-title">
      <div className="acre-geo__section-title">
        <Layers size={17} aria-hidden="true" />
        <div>
          <h3 id="acre-imap-title">Mapa interativo do Acre</h3>
          <p>Escolha uma divisão e toque em um município para ver a que mesorregião, microrregião e regional ele pertence.</p>
        </div>
      </div>

      <div className="acre-imap__tabs" role="group" aria-label="Divisão do mapa">
        {LAYERS.map((item) => (
          <button key={item.id} type="button" aria-pressed={layer === item.id} onClick={() => changeLayer(item.id)}>
            <span>{item.label}</span>
            <small>{item.detail}</small>
          </button>
        ))}
      </div>
      <p className="acre-imap__note">{layerInfo.note}</p>

      <div className="acre-imap__body">
        <div className="acre-imap__map">
          <svg
            viewBox={`0 0 ${ACRE_MAP_VIEWBOX.width} ${ACRE_MAP_VIEWBOX.height}`}
            role="group"
            aria-label="Mapa dos 22 municípios do Acre"
          >
            {ACRE_MAP_SHAPES.map((shape) => {
              const info = INFO[shape.name];
              const inFocus = !focus || (info && keyOf(layer, info) === focus);
              return (
                <path
                  key={shape.ibgeId}
                  d={shape.path}
                  className="acre-imap__shape"
                  data-selected={selected === shape.name || undefined}
                  fill={colorOf(shape.name)}
                  opacity={inFocus ? 1 : 0.3}
                  role="button"
                  tabIndex={0}
                  aria-pressed={selected === shape.name}
                  aria-label={`${shape.name}${info ? `, ${keyOf(layer, info)}` : ""}`}
                  onClick={() => pick(shape.name)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      pick(shape.name);
                    }
                  }}
                >
                  <title>{shape.name}</title>
                </path>
              );
            })}
            {ACRE_MAP_SHAPES.filter((shape) => labelled.has(shape.name)).map((shape) => (
              <text key={shape.ibgeId} x={shape.cx} y={shape.cy} className="acre-imap__label" textAnchor="middle" aria-hidden="true">
                {shape.name}
              </text>
            ))}
          </svg>
          <p className="acre-imap__credit">
            Limites municipais: malha do IBGE (versão em domínio público), simplificada. Escala e posições aproximadas.
          </p>
        </div>

        <div className="acre-imap__side">
          <div className="acre-imap__legend" role="group" aria-label="Grupos da divisão escolhida">
            {groups.map((group) => (
              <button
                key={group.name}
                type="button"
                aria-pressed={focus === group.name}
                onClick={() => {
                  setSelected(null);
                  setFocus(focus === group.name ? null : group.name);
                }}
              >
                <i style={{ backgroundColor: group.color }} aria-hidden="true" />
                <span>{group.name}</span>
                <small>{group.members.length}</small>
              </button>
            ))}
          </div>

          {selected && shown ? (
            <article className="acre-imap__card" aria-live="polite">
              <header>
                <MapPin size={16} aria-hidden="true" />
                <h4>{selected}</h4>
                {SEATS.has(selected) && (
                  <span title="Sede de microrregião">
                    <Star size={12} aria-hidden="true" /> sede
                  </span>
                )}
              </header>
              <dl>
                <div><dt>Mesorregião</dt><dd>{shown.meso}</dd></div>
                <div><dt>Microrregião</dt><dd>{shown.micro}</dd></div>
                <div><dt>Região imediata (IBGE, 2017)</dt><dd>{shown.micro}</dd></div>
                <div><dt>Regional do edital</dt><dd>{shown.dev}</dd></div>
                <div><dt>Código IBGE</dt><dd>{selectedShape?.ibgeId}</dd></div>
              </dl>
              {ACRE_MUNICIPALITY_NOTES[selected] ? (
                <div className="acre-imap__notes">
                  <p><MapPin size={13} aria-hidden="true" /> {ACRE_MUNICIPALITY_NOTES[selected]!.highlight}</p>
                  <p><Target size={13} aria-hidden="true" /> <strong>Na prova:</strong> {ACRE_MUNICIPALITY_NOTES[selected]!.exam}</p>
                </div>
              ) : (
                <p className="acre-imap__plain">Sem destaque específico no edital. Saiba apenas a posição na divisão regional acima.</p>
              )}
              {focused && (
                <p className="acre-imap__group">
                  <strong>{focused.name}</strong> reúne {focused.members.length} municípios:
                  {" "}
                  {focused.members.map((name, index) => (
                    <React.Fragment key={name}>
                      {index > 0 && ", "}
                      <button type="button" onClick={() => pick(name)} aria-pressed={name === selected}>
                        {name}
                      </button>
                    </React.Fragment>
                  ))}
                  .
                </p>
              )}
              {selected === "Capixaba" && (
                <p className="acre-imap__alert">
                  <Info size={14} aria-hidden="true" /> O edital e a SEAD colocam Capixaba no Baixo Acre; o texto original da Lei Complementar nº 126/2003 o relaciona ao Alto Acre.
                </p>
              )}
            </article>
          ) : (
            <article className="acre-imap__card" aria-live="polite">
              <header>
                <Info size={16} aria-hidden="true" />
                <h4>{focused ? focused.name : "O Acre em fatos"}</h4>
              </header>
              {focused ? (
                <p className="acre-imap__group">
                  {focused.members.length} municípios:{" "}
                  {focused.members.map((name, index) => (
                    <React.Fragment key={name}>
                      {index > 0 && ", "}
                      <button type="button" onClick={() => pick(name)}>
                        {name}
                      </button>
                    </React.Fragment>
                  ))}
                  .
                </p>
              ) : (
                <dl>
                  {FACTS.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>
          )}
        </div>
      </div>
      <div className="acre-imap__strategy">
        <h4><Lightbulb size={15} aria-hidden="true" /> Estratégia para memorizar</h4>
        <ul>
          {ACRE_MUNICIPALITY_STRATEGY.map((item) => (
            <li key={item.title}><strong>{item.title}.</strong> {item.text}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
