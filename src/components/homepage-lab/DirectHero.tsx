import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Intro, LiveEntry } from "./HeroParts";
import type { HeroFixture } from "./fixtures";
const PATHS = [
  [
    "questoes",
    "Questões",
    "Comece praticando.",
    "Treine por disciplina, banca e cargo, com correção imediata.",
  ],
  [
    "edital",
    "Edital",
    "Entenda o que estudar.",
    "Encontre os assuntos do edital e organize suas prioridades.",
  ],
  [
    "simulados",
    "Simulados",
    "Prepare o ritmo da prova.",
    "Pratique tempo e estratégia e acompanhe os resultados.",
  ],
] as const;
export function DirectHero({ fixture }: { fixture: HeroFixture }) {
  const [path, setPath] = useState("questoes");
  return (
    <section className="lab-hero lab-direct" aria-label="Abertura Direta">
      <div className="lab-direct-grid">
        <Intro fixture={fixture} />
        <Tabs.Root value={path} onValueChange={setPath} className="lab-path">
          <span className="lab-eyebrow">Escolha por onde começar</span>
          <Tabs.List aria-label="Caminhos de preparação">
            {PATHS.map(([id, label]) => (
              <Tabs.Trigger key={id} value={id}>
                {label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {PATHS.map(([id, , title, text]) => (
            <Tabs.Content key={id} value={id}>
              <h2>{title}</h2>
              <p>{text}</p>
              <Link to="/auth" search={{ mode: "register" }}>
                Criar conta e começar <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
      <LiveEntry />
    </section>
  );
}
