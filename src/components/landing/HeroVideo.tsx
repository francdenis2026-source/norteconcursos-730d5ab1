import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import introArtwork from "@/assets/auth/carreiras-composicao.webp";
import introBadge from "@/assets/auth/distintivo.webp";
import { claimDocumentIntro } from "@/lib/documentIntro";
import "@/styles/intro-frame.css";
import { useEffect, useRef, useState } from "react";

/** Plays once, then removes the video and reveals the homepage photograph. */
export function HeroVideo({
  onIntroChange,
  onIntroSettled,
}: {
  onIntroChange: (playing: boolean) => void;
  /** A introdução acabou, foi pulada ou nem vai tocar: a hero está pronta para o que entra depois dela. */
  onIntroSettled?: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  // Touch layouts use the smaller video in the artwork area, alongside or below the copy.
  const [compact, setCompact] = useState(false);
  const [phase, setPhase] = useState<"image" | "ready" | "playing" | "fading">("image");
  const finishRef = useRef<() => void>(() => {});
  const retryRef = useRef<() => void>(() => {});
  const eligible = useRef<boolean | null>(null);

  useEffect(() => {
    if (eligible.current === null) {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      eligible.current = claimDocumentIntro(document.documentElement, navigation?.name ?? window.location.href);
    }
    if (!eligible.current) {
      onIntroSettled?.();
      return;
    }

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string; downlink?: number };
      }
    ).connection;
    // Conexão claramente lenta: a introdução chegaria tarde demais e "apareceria" por cima da página
    // já lida, então ela nem começa (a hero aparece de imediato).
    const slow =
      /(^|-)2g$/.test(connection?.effectiveType ?? "") ||
      (connection?.downlink !== undefined && connection.downlink > 0 && connection.downlink < 0.7);
    // Plays on phones and tablets too; only data saver, slow networks and reduced motion keep the still image.
    const start = () => {
      if (!connection?.saveData && !slow && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCompact(matchMedia("(max-width: 1100px)").matches);
        setLoadVideo(true);
      } else onIntroSettled?.();
    };
    // The one-time document loader must finish before the five-second film starts.
    if (document.documentElement.dataset["norteBoot"] === "ready") start();
    else window.addEventListener("norte:boot-ready", start, { once: true });
    return () => window.removeEventListener("norte:boot-ready", start);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadVideo) return;
    const element = video.current;
    if (!element) return;
    let active = true;
    let finished = false;
    let fadeTimer = 0;
    let playbackTimer = 0;
    const finish = () => {
      if (!active || finished) return;
      finished = true;
      window.clearTimeout(loadTimer);
      window.clearTimeout(playbackTimer);
      element.pause();
      setPhase("fading");
      onIntroChange(false);
      onIntroSettled?.();
      fadeTimer = window.setTimeout(() => {
        if (active) {
          setPhase("image");
          setLoadVideo(false);
        }
      }, 320);
    };
    finishRef.current = finish;
    const started = () => {
      if (finished) return;
      window.clearTimeout(loadTimer);
      setPhase("playing");
      onIntroChange(true);
      // Never leave the visitor behind an intro stalled by the connection.
      if (!playbackTimer) playbackTimer = window.setTimeout(finish, 9000);
    };
    const loadTimer = window.setTimeout(finish, 8000);
    element.addEventListener("playing", started);
    element.addEventListener("ended", finish);
    element.addEventListener("error", finish);
    // Safari/iPad needs the DOM properties set before play, not only React's attribute.
    element.muted = true;
    element.defaultMuted = true;
    element.playsInline = true;
    element.setAttribute("webkit-playsinline", "");
    const play = () => {
      if (!active || finished) return;
      void element.play().catch((error: unknown) => {
        if (!active || finished) return;
        if (error instanceof DOMException && error.name === "NotAllowedError") {
          window.clearTimeout(loadTimer);
          setPhase("ready");
          onIntroChange(false);
          onIntroSettled?.();
        } else finish();
      });
    };
    retryRef.current = play;
    element.load();
    play();
    return () => {
      active = false;
      window.clearTimeout(loadTimer);
      window.clearTimeout(playbackTimer);
      window.clearTimeout(fadeTimer);
      element.removeEventListener("playing", started);
      element.removeEventListener("ended", finish);
      element.removeEventListener("error", finish);
      element.pause();
      finishRef.current = () => {};
      retryRef.current = () => {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadVideo, onIntroChange]);

  return (
    <>
      <img
        className="home-hero__image"
        src="/media/hero/hero-norte-recorte.webp"
        alt=""
        aria-hidden="true"
        width={1208}
        height={1302}
        fetchPriority="high"
      />
      {loadVideo && phase === "ready" && (
        <button type="button" className="home-intro-start" onClick={() => retryRef.current()}>
          <Play aria-hidden="true" /> Ver introdução
        </button>
      )}
      {loadVideo && (
        <div className="home-intro tactical-intro" data-phase={phase} aria-label="Introdução Norte Concursos">
          <div className="tactical-intro__frame">
            <img className="tactical-intro__art" src={introArtwork} alt="" aria-hidden="true" width={1440} height={600} />
            <header className="tactical-intro__heading">
              <span className="tactical-intro__brand">NORTE <span>CONCURSOS</span></span>
              <span className="tactical-intro__edition"><ShieldCheck size={13} aria-hidden="true" /> Carreiras policiais</span>
            </header>
            <div className="tactical-intro__body">
              <aside className="tactical-intro__identity" aria-hidden="true">
                <img src={introBadge} alt="" width={768} height={811} />
                <span>Direção. Disciplina. Conquista.</span>
              </aside>
              <div className="tactical-intro__screen">
                <video
                  ref={video}
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  aria-hidden="true"
                >
                  <source
                    src={`/media/hero/hero-intro${compact ? "-mobile" : ""}.mp4`}
                    type="video/mp4"
                  />
                  <source
                    src={`/media/hero/hero-intro${compact ? "-mobile" : ""}.webm`}
                    type="video/webm"
                  />
                </video>
              </div>
            </div>
            <footer className="tactical-intro__footer">
              <span className="tactical-intro__caption">Sua preparação tem um norte.</span>
              {phase === "playing" && (
                <button type="button" onClick={() => finishRef.current()}>
                  Pular introdução <ArrowRight size={14} aria-hidden="true" />
                </button>
              )}
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
