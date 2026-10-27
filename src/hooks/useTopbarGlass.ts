import { useEffect, useRef } from "react";

/** Desktop scrolls the document; touch layouts scroll the content pane. */
export function useTopbarGlass() {
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const content = document.getElementById("dashboard-content");
    const update = () => {
      const value = window.scrollY > 8 || (content?.scrollTop ?? 0) > 8 ? "true" : "false";
      if (header.current && header.current.dataset["scrolled"] !== value)
        header.current.dataset["scrolled"] = value;
    };
    let idle: number | undefined;
    const dock = () => {
      const nav = document.querySelector<HTMLElement>(".app-bottom-nav");
      if (!nav) return;
      nav.dataset["scrolling"] = "true";
      window.clearTimeout(idle);
      idle = window.setTimeout(() => { nav.dataset["scrolling"] = "false"; }, 220);
    };
    const onScroll = () => { update(); dock(); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    content?.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      content?.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
    };
  }, []);
  return header;
}
