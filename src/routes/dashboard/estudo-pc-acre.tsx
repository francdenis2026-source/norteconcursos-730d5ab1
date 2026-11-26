import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import questoesPdf from "@/estudo/pdf/Estatistica_PC-AC_Questoes_Franc_DNis_Norte_Concursos.pdf?url";
import gabaritoPdf from "@/estudo/pdf/Estatistica_PC-AC_Gabarito_Franc_DNis_Norte_Concursos.pdf?url";
import { useQueryClient } from "@tanstack/react-query";
import {
  PC_AC_STUDY_SAVED_EVENT,
  enqueueStudyAnswer,
  fetchAnsweredAreaQuestions,
  flushStudyAnswers,
  parseStudyMessage,
} from "@/lib/pcAcStudyBridge";

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
    const data = JSON.stringify({
      area: area ?? null,
      pdf: { questoes: questoesPdf, gabarito: gabaritoPdf },
    });
    return html.replace(
      "<head>",
      `<head><script>window.__PC__=${data.replace(/</g, "\\u003c")};</script>`,
    );
  }, [html, area]);

  // Tema do site (classe "dark" em <html>): enviado ao iframe ao carregar e a cada troca na barra.
  const frame = useRef<HTMLIFrameElement>(null);
  const queryClient = useQueryClient();
  // Respostas que o banco já tem (treinador, outro aparelho ou esta área) valem aqui: uma tentativa por questão.
  const syncAnswered = useCallback(async () => {
    const rows = await fetchAnsweredAreaQuestions();
    if (rows)
      frame.current?.contentWindow?.postMessage({ ncAnswered: rows }, window.location.origin);
  }, []);
  useEffect(() => {
    const onSaved = () => {
      // O desempenho geral (painel, métricas do dia, histórico) passa a enxergar a resposta na hora.
      void queryClient.invalidateQueries({
        predicate: (q) => {
          const k = String(q.queryKey[0] ?? "");
          return (
            k === "student-home" ||
            k === "question-locked-answers" ||
            /performance|training|ranking|activity|answers/i.test(k)
          );
        },
      });
      void syncAnswered();
    };
    window.addEventListener(PC_AC_STUDY_SAVED_EVENT, onSaved);
    return () => window.removeEventListener(PC_AC_STUDY_SAVED_EVENT, onSaved);
  }, [queryClient, syncAnswered]);
  const [frameH, setFrameH] = useState<number | null>(null);
  useEffect(() => {
    const fit = () => {
      const el = frame.current;
      if (!el) return;
      const box = document.getElementById("dashboard-content");
      // Medida independente da rolagem: posição do quadro dentro do contêiner + altura visível dele.
      let h: number;
      if (box) {
        const offset = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop;
        h = box.clientHeight - offset - 8;
      } else {
        h = window.innerHeight - el.getBoundingClientRect().top - 8;
      }
      setFrameH(Math.max(420, Math.floor(h)));
    };
    fit();
    const timers = [100, 300, 700].map((t) => window.setTimeout(fit, t));
    const box = document.getElementById("dashboard-content");
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(fit) : null;
    if (box) ro?.observe(box);
    window.addEventListener("resize", fit);
    document.addEventListener("fullscreenchange", fit);
    document.addEventListener("norte:workspace-state", fit);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      ro?.disconnect();
      window.removeEventListener("resize", fit);
      document.removeEventListener("fullscreenchange", fit);
      document.removeEventListener("norte:workspace-state", fit);
    };
  }, [srcDoc]);
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
    <div className="w-full">
      {srcDoc ? (
        <iframe
          ref={frame}
          title="Estudo PC-AC 2026"
          srcDoc={srcDoc}
          onLoad={() => {
            window.dispatchEvent(new Event("resize"));
            sendTheme();
            void flushStudyAnswers().finally(() => void syncAnswered());
          }}
          allow="clipboard-write; web-share"
          allowFullScreen
          className="block min-h-0 w-full border-0"
          style={{ height: frameH ?? "calc(100dvh - 140px)" }}
        />
      ) : (
        <p className="p-6 text-sm text-muted-foreground" role="status">
          Carregando a área de estudo…
        </p>
      )}
    </div>
  );
}
