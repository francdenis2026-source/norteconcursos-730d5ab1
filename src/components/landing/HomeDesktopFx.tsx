import { useEffect } from "react";

const CARD_SELECTOR = ".desktop-homepage :is(.sx-card, .sx-exam, .home-ranking__card, .home-plan, .hp-promo__card)";
const REVEAL_SELECTOR =
  ".desktop-homepage :is(.sx-head, .sx-hero__copy, .sx-hero__panel, .sx-card, .sx-exam, .home-ranking__heading, .home-ranking__card, .home-plans__intro, .home-plan, .hp-promo__copy, .hp-promo__card, .hd__media, .hd__copy)";

/** Efeitos da home no desktop: holofote no fundo, cards que reagem ao mouse e revelação ao rolar. */
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

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        root.style.setProperty("--hfx-x", `${e.clientX}px`);
        root.style.setProperty("--hfx-y", `${e.clientY}px`);
        const card = (e.target as Element | null)?.closest?.(CARD_SELECTOR) as HTMLElement | null;
        if (!card) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--hfx-cx", `${(x * 100).toFixed(1)}%`);
        card.style.setProperty("--hfx-cy", `${(y * 100).toFixed(1)}%`);
        if (!calm.matches) {
          card.style.setProperty("--hfx-rx", `${((0.5 - y) * 5).toFixed(2)}deg`);
          card.style.setProperty("--hfx-ry", `${((x - 0.5) * 6).toFixed(2)}deg`);
        }
      });
    };
    const onLeave = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(CARD_SELECTOR) as HTMLElement | null;
      if (!card || card.contains(e.relatedTarget as Node | null)) return;
      card.style.removeProperty("--hfx-rx");
      card.style.removeProperty("--hfx-ry");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      io?.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
      root.classList.remove("hfx");
      revealed.forEach((el) => el.classList.remove("hfx-reveal", "hfx-in"));
    };
  }, []);

  return <div className="hfx-spotlight" aria-hidden="true" />;
}
