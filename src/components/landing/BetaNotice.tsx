import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "@/styles/beta-notice.css";

/**
 * Selo "Beta" na home. Começa sempre recolhido (só a etiqueta): o aviso não abre sozinho,
 * para não cobrir o título e os botões de entrada. Quem quiser lê ao clicar; ele recolhe
 * sozinho depois de alguns segundos.
 */
export function BetaNotice() {
  const [open, setOpen] = useState(false);

  // Aviso discreto: recolhe sozinho para a etiqueta "Beta" depois de alguns segundos.
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setOpen(false), 7000);
    return () => window.clearTimeout(timer);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <aside className="beta-notice" data-open={open} aria-label="Aviso de versão beta">
      {open ? (
        <div className="beta-notice__card" role="status">
          <div className="beta-notice__text">
            <p className="beta-notice__title">
              Versão beta <span className="beta-notice__tag">Protótipo</span>
            </p>
            <p>
              Projeto independente desenvolvido por <strong>Franc D’nis</strong>, de Feijó (AC).
              Algumas funções podem falhar enquanto a plataforma evolui.
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
