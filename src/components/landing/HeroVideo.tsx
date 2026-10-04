import { useEffect, useRef, useState } from "react";

/**
 * Vídeo de fundo da hero (≈0,3 MB). Só entra depois da página carregada e nunca em celular,
 * com economia de dados ou com "reduzir movimento"; nesses casos fica a imagem de fundo.
 * Pausa quando a hero sai da tela.
 */
export function HeroVideo() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(max-width: 767px)").matches) return;
    const start = () => setOn(true);
    if (document.readyState === "complete") {
      const t = window.setTimeout(start, 300);
      return () => window.clearTimeout(t);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!on || !el) return;
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? void el.play().catch(() => {}) : el.pause()));
    io.observe(el);
    return () => io.disconnect();
  }, [on]);

  if (!on) return null;
  return (
    <video
      ref={ref}
      className="lp-hero__video"
      data-ready={ready}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onCanPlay={() => setReady(true)}
    >
      <source src="/media/hero/hero-loop.webm" type="video/webm" />
      <source src="/media/hero/hero-loop.mp4" type="video/mp4" />
    </video>
  );
}
