import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BUILD_ID } from "@/build-info";

const CHECK_INTERVAL_MS = 10 * 60 * 1000;

/**
 * Banner discreto de "nova versão disponível". Um SPA instalado como app
 * (sem barra de navegador, sem botão de recarregar) pode ficar aberto por
 * dias sem nunca buscar o HTML/bundle novo de um deploy mais recente — a
 * navegação é toda client-side, então nada força isso sozinho. Aqui a gente
 * compara periodicamente o BUILD_ID embutido neste bundle com o que está
 * publicado agora em /version.json; se mudou, oferece recarregar.
 */
export function UpdateAvailablePrompt() {
  const [visible, setVisible] = useState(false);
  const checkingRef = useRef(false);

  useEffect(() => {
    // BUILD_ID "dev" é o placeholder usado fora de um build real (dev local,
    // sandbox) — nesse caso não há deploy pra detectar, então nem checa.
    if (BUILD_ID === "dev") return;

    const checkForUpdate = async () => {
      if (checkingRef.current || document.hidden) return;
      checkingRef.current = true;
      try {
        const res = await fetch(`/version.json?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as { buildId?: string };
          if (data.buildId && data.buildId !== BUILD_ID) setVisible(true);
        }
      } catch {
        /* sem rede agora: tenta de novo no próximo ciclo */
      } finally {
        checkingRef.current = false;
      }
    };

    void checkForUpdate();
    const interval = window.setInterval(checkForUpdate, CHECK_INTERVAL_MS);
    const onVisible = () => {
      if (!document.hidden) void checkForUpdate();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="update-app-banner" role="status" aria-label="Nova versão disponível">
      <p className="update-app-banner__text">
        Uma nova versão do Norte Concurso está disponível.
      </p>
      <div className="update-app-banner__actions">
        <Button size="sm" onClick={() => window.location.reload()}>
          Atualizar
        </Button>
      </div>
    </div>
  );
}
