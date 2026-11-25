import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PcAcStudyPerformance } from "@/components/estudo/PcAcStudyPerformance";
import { enqueueStudyAnswer, flushStudyAnswers, parseStudyMessage } from "@/lib/pcAcStudyBridge";

export const Route = createFileRoute("/dashboard/estudo-pc-acre")({
  component: EstudoPcAcre,
  validateSearch: (search: Record<string, unknown>) => {
    const value = search["area"];
    return {
      area: typeof value === "string" && /^[a-z0-9_-]{1,40}$/i.test(value) ? value : undefined,
    };
  },
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
  const { area } = Route.useSearch();
  const [html, setHtml] = useState<string | null>(null);

  // O HTML da área sai de public/ e entra só depois do login, pela própria rota protegida.
  useEffect(() => {
    let alive = true;
    void import("@/estudo/estudo-pc-acre.html?raw").then((mod) => {
      if (alive) setHtml(mod.default);
    });
    return () => {
      alive = false;
    };
  }, []);

  const srcDoc = useMemo(() => {
    if (!html) return null;
    if (!area) return html;
    const safe = JSON.stringify(area);
    return html.replace("<head>", `<head><script>window.__AREA__=${safe};</script>`);
  }, [html, area]);

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
      {srcDoc ? (
        <iframe
          title="Estudo PC-AC 2026"
          srcDoc={srcDoc}
          allow="clipboard-write; web-share"
          className="h-[calc(100vh-140px)] min-h-[760px] w-full border-0"
        />
      ) : (
        <p className="p-6 text-sm text-muted-foreground" role="status">
          Carregando a área de estudo…
        </p>
      )}
      <PcAcStudyPerformance />
    </div>
  );
}
