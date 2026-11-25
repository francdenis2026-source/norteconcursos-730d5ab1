import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/estudo-pc-acre")({
  component: EstudoPcAcre,
  head: () => ({
    meta: [
      { title: "Estudo PC-AC | Norte Concursos" },
      {
        name: "description",
        content:
          "Área de estudo da Polícia Civil do Acre 2026: questões, teoria, cronograma e treino no estilo IDECAN.",
      },
    ],
  }),
});

function EstudoPcAcre() {
  return (
    <div className="px-page">
      <iframe
        title="Estudo PC-AC 2026"
        src="/estudo-pc-acre/index.html"
        className="h-[calc(100vh-140px)] min-h-[760px] w-full border-0"
      />
    </div>
  );
}
