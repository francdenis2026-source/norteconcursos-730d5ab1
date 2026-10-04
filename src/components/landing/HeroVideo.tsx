import { useEffect, useRef, useState } from "react";

/**
 * Abertura em vídeo da hero (≈0,25 MB): toca inteira a cada visita/recarga (também no
 * celular, na íntegra, sem corte) e, ao terminar, desfaz o fade para a imagem fixa de
 * fundo — é aí que o `onDone` avisa o componente pai para revelar os textos da hero.
 * Com economia de dados ou com "reduzir movimento" o vídeo nem baixa: fica só a imagem,
 * e os textos aparecem imediatamente.
 */
export function HeroVideo({ onDone }: { onDone?: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [done, setDone] = useState(false);

  const finish = () => {
    setDone(true);
    onDone?.();
  };

  useEffect(() => {
    const el = ref.current;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!el || saveData || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    let loaded = document.readyState === "complete";
    // AbortError = o navegador pausou por economia de energia; o observador retoma quando a hero aparecer.
    const play = () => void el.play().catch((e: unknown) => (e as Error).name !== "AbortError" && finish());
    const onLoad = () => {
      loaded = true;
      play();
    };
    let timer = 0;
    if (loaded) timer = window.setTimeout(play, 150);
    else window.addEventListener("load", onLoad, { once: true });
    // Pausa fora da tela e retoma ao voltar (até terminar).
    const io = new IntersectionObserver(([e]) => {
      if (!loaded || el.ended) return;
      if (e?.isIntersecting) play();
      else el.pause();
    });
    io.observe(el);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      io.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      className="lp-hero__video"
      data-done={done}
      poster="/media/hero/hero-intro-poster.webp"
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      onEnded={finish}
      onError={finish}
    >
      <source src="/media/hero/hero-intro.webm" type="video/webm" />
      <source src="/media/hero/hero-intro.mp4" type="video/mp4" />
    </video>
  );
}
