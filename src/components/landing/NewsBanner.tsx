import { useEffect, useState } from "react";
import { ArrowUpRight, Bell, X } from "lucide-react";

const DISMISS_KEY = "nc-news-banner-dismissed:pcac-edital-001-2026-11";

export function NewsBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === "true");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  const close = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      /* Browser storage unavailable: dismiss only for this visit. */
    }
  };

  return (
    <aside className="news-banner news-banner--floating" aria-label="Aviso sobre o edital da Polícia Civil do Acre">
      <div className="news-banner__inner">
        <span className="news-banner__icon" aria-hidden="true"><Bell /></span>
        <div className="news-banner__text">
          <span className="news-banner__tag">NOVO EDITAL · PC ACRE</span>
          <strong className="news-banner__headline">Saiu o edital da Polícia Civil do Acre!</strong>
          <span className="news-banner__summary">Confira as informações e organize sua preparação.</span>
        </div>
        <a
          className="news-banner__link"
          href="/media/editais/edital-pcac-001-2026-norte-concursos-v2.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultar o edital da Polícia Civil do Acre em PDF (abre em nova aba)"
        >
          Ver edital <ArrowUpRight aria-hidden="true" />
        </a>
        <button type="button" className="news-banner__close" onClick={close} aria-label="Dispensar aviso do edital">
          <X aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
