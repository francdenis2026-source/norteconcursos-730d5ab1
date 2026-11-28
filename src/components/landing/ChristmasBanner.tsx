import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Gift, X } from "lucide-react";
import { isChristmasSeason } from "@/lib/christmas.config";

const DISMISS_KEY = "nc-christmas-dismissed:2026";

/** Faixa sazonal de Natal no topo da home. Some automaticamente fora de 1/12 a 6/1. */
export function ChristmasBanner() {
  const [active, setActive] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!isChristmasSeason()) return;
    setActive(true);
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === "true");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (!active || dismissed) return null;

  const close = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      /* localStorage indisponível (modo privado, etc.) — fecha só nesta sessão */
    }
  };

  return (
    <aside className="xmas-banner" role="complementary" aria-label="Aviso de Natal">
      <div className="home-container xmas-banner__inner">
        <span className="xmas-banner__icon" aria-hidden="true">
          <Gift />
        </span>
        <div className="xmas-banner__text">
          <strong className="xmas-banner__headline">
            Natal de estudos: comece 2027 aprovado.
          </strong>
          <span className="xmas-banner__summary">
            Crie sua conta grátis agora e entre no próximo ano já treinando com direção.
          </span>
        </div>
        <Link to="/auth" search={{ mode: "register" }} className="xmas-banner__cta">
          Criar conta grátis <ArrowRight aria-hidden="true" />
        </Link>
        <button type="button" className="xmas-banner__close" onClick={close} aria-label="Fechar aviso">
          <X aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
