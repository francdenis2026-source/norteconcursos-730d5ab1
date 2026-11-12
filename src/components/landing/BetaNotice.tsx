import { useEffect, useState } from "react";
import { FlaskConical, X } from "lucide-react";
import "@/styles/beta-notice.css";

const SEEN_KEY = "nc-beta-notice-seen:2026-11";

/** Selo "Beta" de vidro na home: abre sozinho na primeira visita e depois fica recolhido. */
export function BetaNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(SEEN_KEY) !== "true") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(SEEN_KEY, "true");
    } catch {
      /* localStorage indisponível — recolhe só nesta visita */
    }
  };

  return (
    <aside className="beta-notice" data-open={open} aria-label="Aviso de versão beta">
      {open ? (
        <div className="beta-notice__card" role="status">
          <span className="beta-notice__icon" aria-hidden="true">
            <FlaskConical />
          </span>
          <div className="beta-notice__text">
            <p className="beta-notice__title">
              Plataforma em fase beta <span className="beta-notice__tag">Protótipo</span>
            </p>
            <p>
              Este é um protótipo construído e mantido por uma única pessoa. Alguma função pode
              falhar ou aparecer desajustada enquanto evoluímos. Obrigado pela paciência.
            </p>
          </div>
          <button type="button" className="beta-notice__close" onClick={close} aria-label="Recolher aviso">
            <X aria-hidden="true" />
          </button>
        </div>
      ) : (
        <button type="button" className="beta-notice__chip" onClick={() => setOpen(true)} aria-label="Ver aviso de versão beta">
          <span className="beta-notice__dot" aria-hidden="true" />
          Beta
        </button>
      )}
    </aside>
  );
}
