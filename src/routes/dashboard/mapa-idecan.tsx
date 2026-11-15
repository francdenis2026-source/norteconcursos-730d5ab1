import { createFileRoute } from "@tanstack/react-router";
import { PcAcExamMap } from "@/components/dashboard/PcAcExamMap";
import { IdecanTabs } from "@/components/dashboard/IdecanTabs";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";

const VAGAS = pcAcVerticalCargos.reduce((total, cargo) => total + cargo.vagas, 0);

export const Route = createFileRoute("/dashboard/mapa-idecan")({
  component: MapaIdecan,
  head: () => ({
    meta: [
      { title: "Mapa IDECAN | Norte Concursos" },
      {
        name: "description",
        content:
          "Mapa interativo da prova objetiva da PC-AC 2026: questões por bloco e disciplina e assuntos mais prováveis.",
      },
    ],
  }),
});

function MapaIdecan() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-3">
      <header className="idx-band">
        <div className="idx-band__id">
          <p className="idx-band__kicker">Mapa IDECAN</p>
          <h1>Prova da PC-AC 2026</h1>
          <p className="idx-band__sub">
            Edital nº 001 SEAD/PCAC · escolha o cargo e veja o peso de cada disciplina.
          </p>
        </div>
        <ul className="idx-band__facts" aria-label="Dados do concurso">
          <li>
            <b>{VAGAS}</b>
            <span>vagas</span>
          </li>
          <li>
            <b>{pcAcVerticalCargos.length}</b>
            <span>cargos</span>
          </li>
          <li>
            <b>24/01/2027</b>
            <span>prova objetiva</span>
          </li>
        </ul>
      </header>
      <IdecanTabs />
      <PcAcExamMap hideTitle />
    </div>
  );
}
