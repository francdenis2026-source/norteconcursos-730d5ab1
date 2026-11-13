import { useEffect } from "react";

const REVEAL_SELECTOR =
  ".desktop-homepage :is(.sx-head, .sx-hero__copy, .sx-hero__panel, .sx-card, .sx-exam, .home-ranking__heading, .home-ranking__card, .home-plans__intro, .home-plan, .hp-promo__copy, .hp-promo__card, .hd__media, .hd__copy)";

/** Efeitos da home no desktop: só a revelação ao rolar (sem luz ou inclinação que sigam o mouse). */
export function HomeDesktopFx() {
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!wide.matches) return;
    const root = document.documentElement;
    root.classList.add("hfx");

    const revealed = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    let io: IntersectionObserver | null = null;
    if (calm.matches || !("IntersectionObserver" in window)) {
      revealed.forEach((el) => el.classList.add("hfx-in"));
    } else {
      revealed.forEach((el) => {
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        el.style.setProperty("--hfx-i", String(Math.max(0, siblings.indexOf(el))));
        el.classList.add("hfx-reveal");
      });
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("hfx-in");
            io?.unobserve(e.target);
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      revealed.forEach((el) => io?.observe(el));
    }

    return () => {
      io?.disconnect();
      root.classList.remove("hfx");
      revealed.forEach((el) => el.classList.remove("hfx-reveal", "hfx-in"));
    };
  }, []);

  return null;
}
