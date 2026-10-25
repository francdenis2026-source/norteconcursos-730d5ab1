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
    update();
    window.addEventListener("scroll", update, { passive: true });
    content?.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      content?.removeEventListener("scroll", update);
    };
  }, []);
  return header;
}
