import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const DISMISS_KEY = "norte_install_prompt_dismissed_v1";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Banner discreto de "Instalar app". O Chrome só dispara `beforeinstallprompt`
 * quando o site já atende aos critérios de instalação (manifest + service
 * worker + ícones) — isso acontece hoje sobretudo no Chrome/Android, então o
 * banner aparece automaticamente lá e simplesmente nunca dispara em
 * navegadores que não suportam o recurso (iOS Safari, desktop sem suporte).
 */
export function InstallAppPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      // Só no celular: no desktop o Chrome também dispara esse evento, mas o
      // pedido é especificamente a experiência de instalação mobile.
      if (!window.matchMedia("(max-width: 767px)").matches) return;
      try {
        if (localStorage.getItem(DISMISS_KEY)) return;
      } catch {
        /* sem storage: mostra mesmo assim, só nesta visita */
      }
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const onAppInstalled = () => {
      setVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignora */
    }
    setVisible(false);
  };

  const install = async () => {
    if (!deferredPrompt) return;
    setVisible(false);
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  if (!visible || !deferredPrompt) return null;

  return (
    <div className="install-app-banner" role="dialog" aria-label="Instalar aplicativo">
      <p className="install-app-banner__text">
        Instale o Norte Concurso no seu celular para acesso rápido, em tela cheia.
      </p>
      <div className="install-app-banner__actions">
        <Button size="sm" onClick={install}>
          Instalar
        </Button>
        <Button size="sm" variant="ghost" onClick={dismiss}>
          Agora não
        </Button>
      </div>
    </div>
  );
}
