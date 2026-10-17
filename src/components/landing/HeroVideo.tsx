import { useEffect, useRef, useState } from "react";

/** Plays once, then removes the video and reveals the original hero photograph. */
export function HeroVideo({ onIntroChange }: { onIntroChange: (playing: boolean) => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [phase, setPhase] = useState<"image" | "playing" | "fading">("image");
  const finishRef = useRef<() => void>(() => {});

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
    element.load();
    void element.play().catch(finish);
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
    };
  }, [loadVideo, onIntroChange]);

  return (
    <>
      <img
        className="home-hero__image"
        src="/media/hero/landing-hero.webp"
        alt=""
        aria-hidden="true"
        width={1672}
        height={941}
        fetchPriority="high"
      />
      {loadVideo && (
        <div className="home-intro" data-phase={phase}>
          <video ref={video} muted playsInline preload="auto" aria-hidden="true">
            <source src="/media/hero/hero-intro.webm" type="video/webm" />
            <source src="/media/hero/hero-intro.mp4" type="video/mp4" />
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
