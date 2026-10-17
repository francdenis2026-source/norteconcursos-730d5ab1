import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

/** A short, optional introduction. The page stays usable during playback and on failure. */
export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [status, setStatus] = useState<"poster" | "playing" | "paused" | "ended" | "error">(
    "poster",
  );

  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    if (!saveData && !matchMedia("(prefers-reduced-motion: reduce)").matches) setLoadVideo(true);
  }, []);

  useEffect(() => {
    if (!loadVideo) return;
    const element = video.current;
    if (!element) return;
    let active = true;
    element.load();
    void element.play().catch(() => {
      if (active) setStatus("paused");
    });
    return () => {
      active = false;
      element.pause();
    };
  }, [loadVideo]);

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    if (status === "playing") {
      element.pause();
      setStatus("paused");
    } else if (!loadVideo) {
      setLoadVideo(true);
    } else {
      if (element.ended) element.currentTime = 0;
      if (status === "error") element.load();
      void element.play().catch(() => setStatus("error"));
    }
  };
  const label =
    status === "playing"
      ? "Pausar introdução"
      : status === "ended"
        ? "Rever introdução"
        : "Assistir à introdução";
  const Icon = status === "playing" ? Pause : status === "ended" ? RotateCcw : Play;

  return (
    <figure className="home-film">
      <div className="home-film__screen">
        <video
          ref={video}
          poster="/media/hero/hero-intro-poster.webp"
          muted
          playsInline
          preload={loadVideo ? "metadata" : "none"}
          aria-hidden="true"
          onPlaying={() => setStatus("playing")}
          onEnded={() => setStatus("ended")}
          onError={() => setStatus("error")}
        >
          {loadVideo && (
            <>
              <source src="/media/hero/hero-intro.webm" type="video/webm" />
              <source src="/media/hero/hero-intro.mp4" type="video/mp4" />
            </>
          )}
        </video>
      </div>
      <figcaption>
        <span>
          {status === "error"
            ? "A apresentação não carregou. Tente novamente."
            : "Sua próxima conquista começa aqui."}
          <small>Introdução Norte · 5 segundos</small>
        </span>
        <button type="button" onClick={toggle} aria-label={label}>
          <Icon aria-hidden="true" />
          <span>{status === "playing" ? "Pausar" : status === "ended" ? "Rever" : "Assistir"}</span>
        </button>
      </figcaption>
    </figure>
  );
}
