import { useCallback, useEffect, useState } from "react";
import { Maximize, Minimize } from "lucide-react";

type FullscreenDocument = Document & {
  webkitFullscreenEnabled?: boolean;
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => void;
};
type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => void;
};

function supportsFullscreen() {
  if (typeof document === "undefined") return false;
  const doc = document as FullscreenDocument;
  return Boolean(doc.fullscreenEnabled || doc.webkitFullscreenEnabled);
}

function isFullscreen() {
  const doc = document as FullscreenDocument;
  return Boolean(doc.fullscreenElement || doc.webkitFullscreenElement);
}

/** Alterna a tela cheia do navegador via Fullscreen API (com fallback -webkit).
 * Fica oculto quando a API não existe, como no Safari do iPhone — lá o usuário
 * já tem a alternativa de instalar o app (modo standalone do manifest). */
export function FullscreenToggle() {
  const [supported, setSupported] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setSupported(supportsFullscreen());
    setActive(isFullscreen());
    const onChange = () => setActive(isFullscreen());
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  const toggle = useCallback(() => {
    const doc = document as FullscreenDocument;
    const el = document.documentElement as FullscreenElement;
    if (isFullscreen()) {
      if (doc.exitFullscreen) void doc.exitFullscreen().catch(() => {});
      else doc.webkitExitFullscreen?.();
    } else if (el.requestFullscreen) {
      void el.requestFullscreen().catch(() => {});
    } else {
      el.webkitRequestFullscreen?.();
    }
  }, []);

  if (!supported) return null;

  return (
    <button
      type="button"
      className="home-fullscreen-toggle"
      onClick={toggle}
      aria-label={active ? "Sair da tela cheia" : "Ativar tela cheia"}
      aria-pressed={active}
    >
      {active ? <Minimize aria-hidden="true" /> : <Maximize aria-hidden="true" />}
    </button>
  );
}
