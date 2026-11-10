import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import "@/styles/news-banner.css";

const DISMISS_KEY = "nc-news-banner-dismissed:pcac-edital-001-2026-11";
const MOBILE_DISMISS_KEY = `${DISMISS_KEY}:mobile`;

export function NewsBanner() {
  const [dismissed, setDismissed] = useState(true);
  const [dismissKey, setDismissKey] = useState(DISMISS_KEY);

  useEffect(() => {
    const key = window.matchMedia("(max-width: 767px)").matches
      ? MOBILE_DISMISS_KEY
      : DISMISS_KEY;
    setDismissKey(key);
    try {
      setDismissed(window.localStorage.getItem(key) === "true");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  const close = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(dismissKey, "true");
    } catch {
      /* Browser storage unavailable: dismiss only for this visit. */
    }
  };

  return (
    <aside className="acre-banner" aria-label="Aviso sobre o edital da Polícia Civil do Acre">
      <div className="acre-banner__inner">
        {/* Bandeira do Acre: campo amarelo em diagonal com a estrela vermelha; o verde é o próprio cartão. */}
        <span className="acre-banner__flag" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M12 1.6l2.47 7.6h7.99l-6.46 4.7 2.47 7.6L12 16.8l-6.47 4.7L8 13.9 1.54 9.2h7.99z" />
          </svg>
        </span>
        <div className="acre-banner__text">
          <span className="acre-banner__tag">Novo edital · Polícia Civil do Acre</span>
          <strong className="acre-banner__headline">Saiu o edital da PC-AC!</strong>
          <span className="acre-banner__summary">
            Confira vagas, cargos e datas e organize sua preparação.
          </span>
        </div>
        <a
          className="acre-banner__link"
          href="/media/editais/edital-pcac-001-2026-norte-concursos-v2.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultar o edital da Polícia Civil do Acre em PDF (abre em nova aba)"
        >
          Ver edital <ArrowUpRight aria-hidden="true" />
        </a>
        <button
          type="button"
          className="acre-banner__close"
          onClick={close}
          aria-label="Dispensar aviso do edital"
        >
          <X aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
