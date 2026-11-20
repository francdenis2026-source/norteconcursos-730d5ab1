import { createFileRoute } from "@tanstack/react-router";
import { PcAcExamMap } from "@/components/dashboard/PcAcExamMap";
import { IdecanTabs } from "@/components/dashboard/IdecanTabs";

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
    <div className="px-page">
      <IdecanTabs />
      <PcAcExamMap hideTitle />
    </div>
  );
}
