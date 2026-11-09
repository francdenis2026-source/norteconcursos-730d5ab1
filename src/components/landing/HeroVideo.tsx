import { useEffect } from "react";
import { documentStartup } from "@/lib/startupSequence";

/**
 * Static hero artwork. The old cinematic intro video was removed so it can
 * never delay the first usable homepage or download media before the visitor
 * has chosen to play anything.
 */
export function HeroVideo({
  onIntroChange,
  onIntroSettled,
}: {
  onIntroChange: (playing: boolean) => void;
  onIntroSettled?: () => void;
}) {
  useEffect(() => {
    documentStartup().settleIntro();
    onIntroChange(false);
    onIntroSettled?.();
    // Startup notifications are intentionally sent once when the hero mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <img
      className="home-hero__image"
      src="/media/hero/hero-norte-recorte.webp"
      alt=""
      aria-hidden="true"
      width={1208}
      height={1302}
      fetchPriority="high"
      decoding="async"
    />
  );
}
