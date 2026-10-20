import { Play } from "lucide-react";
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
  const [phase, setPhase] = useState<"image" | "ready" | "playing" | "fading">("image");
  const finishRef = useRef<() => void>(() => {});
  const retryRef = useRef<() => void>(() => {});

  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    // Plays on phones and tablets too; only data saver and reduced motion keep the still image.
    if (!saveData && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLoadVideo(true);
    } else onIntroSettled?.();
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
    const loadTimer = window.setTimeout(finish, 5000);
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
        src="/media/hero/hero-norte-impacto.webp"
        alt=""
        aria-hidden="true"
        width={1774}
        height={887}
        fetchPriority="high"
      />
      {loadVideo && phase === "ready" && (
        <button type="button" className="home-intro-start" onClick={() => retryRef.current()}>
          <Play aria-hidden="true" /> Ver introdução
        </button>
      )}
      {loadVideo && (
        <div className="home-intro" data-phase={phase}>
          <video
            ref={video}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
          >
            <source src="/media/hero/hero-intro.mp4" type="video/mp4" />
            <source src="/media/hero/hero-intro.webm" type="video/webm" />
          </video>
          {phase === "playing" && (
            <button type="button" onClick={() => finishRef.current()}>
              Pular introdução <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
