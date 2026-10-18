import { useEffect } from "react";
import { MOBILE_APP_QUERY } from "@/lib/appScroll";
import { useElementScrollRestoration, useLocation } from "@tanstack/react-router";

/** Keep the authenticated shell inside the visible viewport, including iOS keyboards. */
export function useMobileAppShell() {
  const location = useLocation();
  const restored = useElementScrollRestoration({ id: "dashboard-content" });
  const restoreY = restored?.scrollY;
  useEffect(() => {
    if (!restoreY || !window.matchMedia(MOBILE_APP_QUERY).matches) return;
    const content = document.getElementById("dashboard-content");
    if (!content) return;
    // Route components may render a short loading state before their content.
    // Wait for enough height instead of losing a cached position to clamping.
    let frame = 0;
    const stop = () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointerdown", stop, true);
      window.removeEventListener("wheel", stop, true);
      window.removeEventListener("keydown", stop, true);
    };
    const restore = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (content.scrollHeight - content.clientHeight >= restoreY) {
          content.scrollTop = restoreY;
          stop();
        }
      });
    };
    const observer = new ResizeObserver(restore);
    observer.observe(content);
    if (content.firstElementChild) observer.observe(content.firstElementChild);
    window.addEventListener("pointerdown", stop, true);
    window.addEventListener("wheel", stop, true);
    window.addEventListener("keydown", stop, true);
    const timeout = window.setTimeout(stop, 5000);
    restore();
    return () => { stop(); window.clearTimeout(timeout); };
  }, [location.href, location.state.__TSR_key, restoreY]);
  useEffect(() => {
    const root = document.documentElement;
    const mobile = window.matchMedia(MOBILE_APP_QUERY);
    const viewport = window.visualViewport;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!mobile.matches) {
          delete root.dataset["mobileApp"];
          delete root.dataset["appKeyboard"];
          root.style.removeProperty("--app-viewport-height");
          root.style.removeProperty("--app-viewport-top");
          return;
        }
        root.dataset["mobileApp"] = "true";
        // Pinch zoom must remain under the browser's control.
        if (viewport && viewport.scale !== 1) return;
        const height = viewport?.height ?? window.innerHeight;
        root.style.setProperty("--app-viewport-height", `${height}px`);
        root.style.setProperty("--app-viewport-top", `${viewport?.offsetTop ?? 0}px`);
        const active = document.activeElement;
        const editing = active instanceof HTMLElement &&
          active.matches('input, textarea, [contenteditable="true"]');
        root.dataset["appKeyboard"] = String(editing && window.innerHeight - height > 120);
      });
    };
    update();
    mobile.addEventListener("change", update);
    window.addEventListener("resize", update);
    viewport?.addEventListener("resize", update);
    viewport?.addEventListener("scroll", update);
    document.addEventListener("focusin", update);
    document.addEventListener("focusout", update);
    return () => {
      cancelAnimationFrame(frame);
      mobile.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      viewport?.removeEventListener("resize", update);
      viewport?.removeEventListener("scroll", update);
      document.removeEventListener("focusin", update);
      document.removeEventListener("focusout", update);
      delete root.dataset["mobileApp"];
      delete root.dataset["appKeyboard"];
      root.style.removeProperty("--app-viewport-height");
      root.style.removeProperty("--app-viewport-top");
    };
  }, []);
}
