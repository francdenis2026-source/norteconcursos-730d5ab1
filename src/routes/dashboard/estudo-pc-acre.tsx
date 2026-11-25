import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PcAcStudyPerformance } from "@/components/estudo/PcAcStudyPerformance";
import { enqueueStudyAnswer, flushStudyAnswers, parseStudyMessage } from "@/lib/pcAcStudyBridge";

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
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const row = parseStudyMessage(event.data);
      if (!row) return;
      enqueueStudyAnswer(row);
      void flushStudyAnswers();
    };
    window.addEventListener("message", onMessage);
    void flushStudyAnswers();
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="px-page">
      <iframe
        title="Estudo PC-AC 2026"
        src="/estudo-pc-acre/index.html"
        className="h-[calc(100vh-140px)] min-h-[760px] w-full border-0"
      />
      <PcAcStudyPerformance />
    </div>
  );
}
