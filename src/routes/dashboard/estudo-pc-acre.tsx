import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import questoesPdf from "@/estudo/pdf/Estatistica_PC-AC_Questoes_Franc_DNis_Norte_Concursos.pdf?url";
import gabaritoPdf from "@/estudo/pdf/Estatistica_PC-AC_Gabarito_Franc_DNis_Norte_Concursos.pdf?url";
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
      { property: "og:title", content: "Estudo PC-AC | Norte Concursos" },
      {
        property: "og:description",
        content: "Questões, teoria e acompanhamento da preparação para a Polícia Civil do Acre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

  // Tema do site (classe "dark" em <html>): enviado ao iframe ao carregar e a cada troca na barra.
  const frame = useRef<HTMLIFrameElement>(null);
  const sendTheme = useCallback(() => {
    frame.current?.contentWindow?.postMessage(
      { ncDark: document.documentElement.classList.contains("dark") },
      window.location.origin,
    );
  }, []);
  useEffect(() => {
    const observer = new MutationObserver(sendTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [sendTheme]);

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
          ref={frame}
          title="Estudo PC-AC 2026"
          srcDoc={srcDoc}
          onLoad={sendTheme}
          allow="clipboard-write; web-share"
          allowFullScreen
          className="block h-[calc(100dvh-140px)] min-h-0 w-full border-0"
        />
      ) : (
        <p className="p-6 text-sm text-muted-foreground" role="status">
          Carregando a área de estudo…
        </p>
      )}
      <section className="mt-6 rounded-xl border bg-card p-4" aria-label="Materiais em PDF">
        <h2 className="mb-2 text-lg font-semibold">Estatística em PDF</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          288 questões de Estatística para imprimir ou estudar fora da tela. O gabarito fica em
          arquivo separado.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            className="rounded-lg border px-4 py-2 text-sm font-semibold"
            href={questoesPdf}
            target="_blank"
            rel="noopener"
          >
            Questões (PDF)
          </a>
          <a
            className="rounded-lg border px-4 py-2 text-sm font-semibold"
            href={gabaritoPdf}
            target="_blank"
            rel="noopener"
          >
            Gabarito e explicações (PDF)
          </a>
        </div>
      </section>
      <PcAcStudyPerformance />
    </div>
  );
}
