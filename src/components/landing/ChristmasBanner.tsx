import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Gift, X } from "lucide-react";
import { isChristmasSeason } from "@/lib/christmas.config";

const DISMISS_KEY = "nc-christmas-dismissed:2026";

/** Banner flutuante de Natal (canto da tela). Some automaticamente fora de 1/12 a 6/1. */
export function ChristmasBanner() {
  const [active, setActive] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!isChristmasSeason()) return;
    setActive(true);
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === "true");
    } catch {
      setDismissed(false);
    }
  }, []);

  // Abre expandido e recolhe sozinho para a etiqueta, igual ao selo Beta.
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setOpen(false), 8000);
    return () => window.clearTimeout(timer);
  }, [open]);

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
    <aside className="xmas-fab" data-open={open} aria-label="Aviso de Natal">
      {open ? (
        <div className="xmas-fab__card" role="status">
          <span className="xmas-fab__icon" aria-hidden="true">
            <Gift />
          </span>
          <div className="xmas-fab__text">
            <strong>Natal de estudos: comece 2027 aprovado.</strong>
            <span>Crie sua conta grátis e entre no próximo ano treinando com direção.</span>
            <Link to="/auth" search={{ mode: "register" }} className="xmas-fab__cta">
              Criar conta grátis <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <button type="button" className="xmas-fab__close" onClick={close} aria-label="Fechar aviso">
            <X aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button type="button" className="xmas-fab__chip" onClick={() => setOpen(true)} aria-label="Ver aviso de Natal">
          <Gift aria-hidden="true" />
          Natal
        </button>
      )}
    </aside>
  );
}
