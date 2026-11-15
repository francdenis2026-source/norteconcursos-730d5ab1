import { createFileRoute } from "@tanstack/react-router";
import { PcAcExamMap } from "@/components/dashboard/PcAcExamMap";

export const Route = createFileRoute("/dashboard/mapa-idecan")({
  component: () => (
    <div className="mx-auto w-full max-w-6xl">
      <PcAcExamMap />
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Mapa da prova IDECAN | Norte Concursos" },
      {
        name: "description",
        content:
          "Mapa interativo da prova objetiva da PC-AC 2026: questões por bloco e disciplina e assuntos mais prováveis.",
      },
    ],
  }),
});
