import { ExternalLink, Flag, HelpCircle, Landmark, Newspaper, Target } from "lucide-react";
import { ACRE_FACT_GROUPS, type AcreFactGroup } from "@/data/acreStrategicFacts";

const GROUP_STYLE: Record<AcreFactGroup["id"], { icon: typeof Flag; tone: string }> = {
  poder: { icon: Landmark, tone: "#7C6BD6" },
  questao: { icon: Flag, tone: "#C8841C" },
  imprensa: { icon: Newspaper, tone: "#2F8FBF" },
  banca: { icon: Target, tone: "#D8799D" },
};

/** Nomes, cargos e datas que as bancas costumam cobrar sobre o Acre, com fonte e divergências. */
export function AcreStrategicFacts({ groups }: { groups?: AcreFactGroup["id"][] }) {
  const shown = ACRE_FACT_GROUPS.filter((group) => !groups || groups.includes(group.id));
  if (!shown.length) return null;
  return (
    <section className="acre-radar" aria-labelledby="acre-radar-title">
      <header className="acre-radar__head">
        <HelpCircle aria-hidden="true" size={20} />
        <div>
          <h2 id="acre-radar-title">Radar de provas: nomes, cargos e datas</h2>
          <p>O que as bancas já perguntaram ou podem perguntar sobre o Acre. Cada resposta traz a fonte; leia o alerta de divergência.</p>
        </div>
      </header>
      <div className="acre-radar__groups">
        {shown.map((group) => {
          const { icon: Icon, tone } = GROUP_STYLE[group.id];
          return (
            <article key={group.id} className="acre-radar__group" style={{ "--rd": tone } as React.CSSProperties}>
              <header>
                <span><Icon aria-hidden="true" size={16} /></span>
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.intro}</p>
                </div>
              </header>
              <ul>
                {group.facts.map((fact) => (
                  <li key={fact.question}>
                    <details>
                      <summary>{fact.question}</summary>
                      <p className="acre-radar__answer">{fact.answer}</p>
                      {fact.care && <p className="acre-radar__care">Atenção: {fact.care}</p>}
                      <p className="acre-radar__src">
                        {fact.sources.map((source) => (
                          <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                            {source.label} <ExternalLink aria-hidden="true" size={11} />
                          </a>
                        ))}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <p className="acre-radar__note">Conferido em 13/11/2026. Cargos mudam: confira a data a que a questão se refere.</p>
    </section>
  );
}
