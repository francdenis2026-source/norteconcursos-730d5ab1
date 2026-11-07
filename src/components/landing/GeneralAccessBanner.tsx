import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PartyPopper, ShieldCheck, Sparkles, X } from "lucide-react";
import { TESTING_LABEL, TESTING_PHASE } from "@/lib/launch.config";

const DISMISS_KEY = "nc-general-access-dismissed:revoke-licenses-6m-2026-11";

/** Faixa de vidro no topo da home: anuncia a liberação geral (licenças pagas revogadas). */
export function GeneralAccessBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!TESTING_PHASE) return;
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === "true");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (!TESTING_PHASE || dismissed) return null;

  const close = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      /* localStorage indisponível (modo privado, etc.) — fecha só nesta sessão */
    }
  };

  return (
    <aside className="general-access" role="complementary" aria-label="Liberação geral da plataforma">
      <div className="home-container general-access__inner">
        <span className="general-access__icon" aria-hidden="true">
          <PartyPopper />
        </span>
        <div className="general-access__text">
          <span className="general-access__tag">
            <Sparkles aria-hidden="true" /> Plataforma liberada
          </span>
          <strong className="general-access__headline">
            Revogamos as licenças pagas: {TESTING_LABEL} de Plus grátis para todo mundo.
          </strong>
          <span className="general-access__summary">
            <ShieldCheck aria-hidden="true" /> Vale para quem já tem conta e para quem vai se cadastrar agora — sem cartão, sem cobrança.
          </span>
        </div>
        <Link to="/auth" search={{ mode: "register" }} className="general-access__cta">
          Criar conta grátis <ArrowRight aria-hidden="true" />
        </Link>
        <button type="button" className="general-access__close" onClick={close} aria-label="Fechar aviso">
          <X aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
