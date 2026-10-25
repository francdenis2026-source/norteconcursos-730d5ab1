import { READING_WORKSPACE_EVENT, READING_FULLSCREEN_EXIT } from "@/lib/readingWorkspace";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MOBILE_APP_QUERY } from "@/lib/appScroll";

/** Native fullscreen where allowed; the same workspace layout works without it. */
export function useWorkspaceFullscreen(observerOnly = false) {
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const native = useRef(false);
  const reading = useRef(false);
  const expandedBeforeReading = useRef(false);
  const pending = useRef(false);
  const mounted = useRef(true);
  const scroll = useRef<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const settleTimer = useRef<number | null>(null);
  // O navegador anima a entrada/saída da tela cheia nativa (redimensionando a janela aos poucos).
  // Enquanto isso, a troca de layout (fixed, 100dvh) e os painéis com desfoque (backdrop-filter)
  // seriam recalculados a cada quadro dessa animação, o que aparecia como um "piscar" de falha.
  // Este marcador congela transições e desfoque até a troca de tela cheia se acomodar.
  const beginTransition = useCallback(() => {
    document.documentElement.dataset["workspaceFocusTransition"] = "true";
    if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      delete document.documentElement.dataset["workspaceFocusTransition"];
      settleTimer.current = null;
    }, 400);
  }, []);
  const endTransition = useCallback(() => {
    if (settleTimer.current !== null) {
      window.clearTimeout(settleTimer.current);
      settleTimer.current = null;
    }
    delete document.documentElement.dataset["workspaceFocusTransition"];
  }, []);
  const enter = useCallback(() => {
    if (observerOnly) { document.dispatchEvent(new Event("norte:workspace-enter")); return; }
    if (activeRef.current) return;
    returnFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const content = document.getElementById("dashboard-content");
    scroll.current = window.matchMedia(MOBILE_APP_QUERY).matches
      ? (content?.scrollTop ?? 0)
      : window.scrollY;
    beginTransition();
    activeRef.current = true;
    setActive(true);
    if (
      !document.fullscreenElement &&
      document.fullscreenEnabled &&
      document.documentElement.requestFullscreen
    ) {
      pending.current = true;
      void document.documentElement
        .requestFullscreen()
        .then(() => {
          pending.current = false;
          native.current = document.fullscreenElement === document.documentElement;
          if ((!mounted.current || !activeRef.current) && native.current) {
            native.current = false;
            void document.exitFullscreen().catch(() => {});
          }
        })
        .catch(() => {
          pending.current = false;
        });
    }
  }, [beginTransition, observerOnly]);
  const exit = useCallback(() => {
    if (observerOnly) { document.dispatchEvent(new Event("norte:workspace-exit")); return; }
    if (!activeRef.current) return;
    scroll.current = document.getElementById("dashboard-content")?.scrollTop ?? 0;
    beginTransition();
    activeRef.current = false;
    setActive(false);
    if (native.current && document.fullscreenElement === document.documentElement) {
      native.current = false;
      void document.exitFullscreen().catch(() => {});
    }
  }, [beginTransition, observerOnly]);
  useLayoutEffect(() => {
    if (observerOnly) return;
    if (active) {
      document.documentElement.dataset["workspaceFocus"] = "true";
      if (scroll.current !== null)
        document
          .getElementById("dashboard-content")
          ?.scrollTo({ top: scroll.current, behavior: "instant" });
    } else {
      delete document.documentElement.dataset["workspaceFocus"];
      if (scroll.current !== null) {
        if (window.matchMedia(MOBILE_APP_QUERY).matches)
          document
            .getElementById("dashboard-content")
            ?.scrollTo({ top: scroll.current, behavior: "instant" });
        else window.scrollTo({ top: scroll.current, behavior: "instant" });
        const previous = returnFocus.current;
        const target =
          previous?.isConnected && previous.getClientRects().length
            ? previous
            : document.querySelector<HTMLElement>(
                window.matchMedia(MOBILE_APP_QUERY).matches
                  ? ".app-mobile-bar button"
                  : ".workspace-fullscreen-trigger",
              );
        target?.focus({ preventScroll: true });
      }
    }
    document.dispatchEvent(new CustomEvent("norte:workspace-state", { detail: active }));
  }, [active, observerOnly]);
  useEffect(() => {
    if (observerOnly) {
      const sync = () => setActive(document.documentElement.dataset["workspaceFocus"] === "true");
      sync(); document.addEventListener("norte:workspace-state", sync);
      return () => document.removeEventListener("norte:workspace-state", sync);
    }
    document.addEventListener("norte:workspace-enter", enter);
    document.addEventListener("norte:workspace-exit", exit);
    mounted.current = true;
    const change = () => {
      if (document.fullscreenElement === document.documentElement && pending.current)
        native.current = true;
      else if (!document.fullscreenElement && native.current) {
        native.current = false;
        if (reading.current) document.dispatchEvent(new Event(READING_FULLSCREEN_EXIT));
        else exit();
      }
      // A troca de tela cheia nativa terminou: o layout pode voltar a animar normalmente.
      endTransition();
    };
    const key = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !reading.current &&
        activeRef.current &&
        !Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"], [role="menu"]')).some((node) => node.getAttribute("data-state") !== "closed" && node.getClientRects().length > 0)
      )
        exit();
    };
    const readingChange = (event: Event) => {
      const next = (event as CustomEvent<{ active: boolean }>).detail.active;
      if (next === reading.current) return;
      reading.current = next;
      if (next) {
        expandedBeforeReading.current = activeRef.current;
        document.documentElement.dataset["readingFocus"] = "true";
        enter();
      } else {
        delete document.documentElement.dataset["readingFocus"];
        if (!expandedBeforeReading.current) exit();
      }
    };
    document.addEventListener(READING_WORKSPACE_EVENT, readingChange);
    document.addEventListener("fullscreenchange", change);
    window.addEventListener("keydown", key, true);
    return () => {
      document.removeEventListener("norte:workspace-enter", enter);
      document.removeEventListener("norte:workspace-exit", exit);
      mounted.current = false;
      activeRef.current = false;
      delete document.documentElement.dataset["workspaceFocus"];
      endTransition();
      document.removeEventListener(READING_WORKSPACE_EVENT, readingChange);
      delete document.documentElement.dataset["readingFocus"];
      document.removeEventListener("fullscreenchange", change);
      window.removeEventListener("keydown", key, true);
      if (native.current && document.fullscreenElement === document.documentElement)
        void document.exitFullscreen().catch(() => {});
    };
  }, [enter, exit, endTransition, observerOnly]);
  return { active, enter, exit };
}
