import { markActive } from "@/lib/activity";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import questoesPdf from "@/estudo/pdf/Estatistica_PC-AC_Questoes_Franc_DNis_Norte_Concursos.pdf?url";
import gabaritoPdf from "@/estudo/pdf/Estatistica_PC-AC_Gabarito_Franc_DNis_Norte_Concursos.pdf?url";
import { useQueryClient } from "@tanstack/react-query";
import { MOBILE_APP_QUERY } from "@/lib/appScroll";
import {
  PC_AC_STUDY_SAVED_EVENT,
  enqueueStudyAnswer,
  fetchAnsweredAreaQuestions,
  flushStudyAnswers,
  pendingStudyCount,
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
  const navigate = useNavigate();
  // Respostas que o banco já tem (treinador, outro aparelho ou esta área) valem aqui: uma tentativa por questão.
  const postStatus = useCallback(() => {
    frame.current?.contentWindow?.postMessage(
      { ncPending: pendingStudyCount() },
      window.location.origin,
    );
  }, []);
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
      postStatus();
    };
    window.addEventListener(PC_AC_STUDY_SAVED_EVENT, onSaved);
    return () => window.removeEventListener(PC_AC_STUDY_SAVED_EVENT, onSaved);
  }, [queryClient, syncAnswered, postStatus]);
  const [frameH, setFrameH] = useState<number | null>(null);
  useEffect(() => {
    document.documentElement.dataset["studyArea"] = "true";
    return () => {
      delete document.documentElement.dataset["studyArea"];
    };
  }, []);
  useEffect(() => {
    const fit = () => {
      const el = frame.current;
      if (!el) return;
      const box = document.getElementById("dashboard-content");
      // Medida independente da rolagem: topo do quadro com a página no início, até o fim da janela
      // (menos a faixa fixa do desenvolvedor, quando ela existe).
      if (box && window.matchMedia(MOBILE_APP_QUERY).matches) {
        // No celular o painel rola dentro do contêiner: o quadro ocupa exatamente a altura visível dele.
        const offset = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop;
        setFrameH(Math.max(360, Math.floor(box.clientHeight - offset)));
        return;
      }
      const strip = document.querySelector<HTMLElement>(".dev-strip");
      const stripH = strip && getComputedStyle(strip).display !== "none" ? strip.getBoundingClientRect().height : 0;
      const scrolled = (box?.scrollTop ?? 0) + window.scrollY;
      const topStatic = el.getBoundingClientRect().top + scrolled;
      const h = window.innerHeight - topStatic - stripH - 2;
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
      const nav = (event.data as { ncNav?: unknown } | null)?.ncNav;
      if (nav === "/dashboard/study-room") {
        void navigate({ to: "/dashboard/study-room" });
        return;
      }
      const row = parseStudyMessage(event.data);
      if (!row) return;
      markActive(true);
      enqueueStudyAnswer(row);
      postStatus();
      void flushStudyAnswers().finally(postStatus);
    };
    window.addEventListener("message", onMessage);
    void flushStudyAnswers();
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="w-full">
      <style>{`html[data-study-area] .app-footer{display:none!important}html[data-study-area] #dashboard-content,html[data-study-area] .app-content__inner{padding-bottom:0!important;min-height:0!important}@media (min-width:768px){html[data-study-area],html[data-study-area] body{overflow:hidden!important;height:100dvh}}@media (max-width:767px){html[data-study-area] body .app-shell[data-area] #dashboard-content{padding-bottom:calc(92px + env(safe-area-inset-bottom,0px))!important}html[data-study-area] body .app-shell[data-area]:not(#_):not(#_) #dashboard-content,html[data-study-area] body .app-shell[data-area]:not(#_):not(#_) #dashboard-content>.app-content__inner,html[data-study-area] body .app-shell[data-area]:not(#_):not(#_) #dashboard-content>.app-content__inner>*{padding-left:0!important;padding-right:0!important;margin-left:0!important;margin-right:0!important;max-width:none!important;width:100%!important}}`}</style>
      {srcDoc ? (
        <iframe
          ref={frame}
          title="Estudo PC-AC 2026"
          srcDoc={srcDoc}
          onLoad={(event) => {
            // Eventos dentro do iframe não chegam à janela principal: repassa ao detector de atividade
            // para o relógio de estudo não pausar enquanto o aluno usa a área de estudo.
            try {
              const inner = event.currentTarget.contentWindow;
              for (const name of ["mousemove", "mousedown", "keydown", "scroll", "wheel", "touchstart", "pointerdown", "click"]) {
                inner?.addEventListener(name, () => markActive(), { passive: true, capture: true });
              }
            } catch {
              /* iframe inacessível: mantém o comportamento anterior */
            }
            window.dispatchEvent(new Event("resize"));
            sendTheme();
            void flushStudyAnswers().finally(() => {
              void syncAnswered();
              postStatus();
            });
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
