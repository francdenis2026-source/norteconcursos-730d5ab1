import { useEffect } from "react";

/** A single delegated listener; pointer lighting never causes a React render. */
export function useHomeMicroInteractions() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".home");
    if (!root) return;
    const enabled = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)",
    );
    const selector =
      ".home-opportunity, .home-plan, .home-preparation__info, .daily-badge, .question-count-badge, .home-plans__signal";
    let active: HTMLElement | null = null;
    let frame = 0;
    let point = { x: 0, y: 0 };
    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      active?.removeAttribute("data-home-pointer");
      active?.style.removeProperty("--spot-x");
      active?.style.removeProperty("--spot-y");
      active = null;
    };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== "mouse") return clear();
      const next =
        event.target instanceof Element ? event.target.closest<HTMLElement>(selector) : null;
      if (next !== active) {
        clear();
        active = next;
      }
      if (!active) return;
      point = { x: event.clientX, y: event.clientY };
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (!active) return;
          const box = active.getBoundingClientRect();
          active.style.setProperty("--spot-x", `${point.x - box.left}px`);
          active.style.setProperty("--spot-y", `${point.y - box.top}px`);
          active.dataset["homePointer"] = "true";
        });
    };
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", clear);
    enabled.addEventListener("change", clear);
    return () => {
      clear();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", clear);
      enabled.removeEventListener("change", clear);
    };
  }, []);
}
