import { useEffect, useState } from "react";
import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Botão discreto para compartilhar o material de estudo.
 * Usa o compartilhamento nativo do aparelho quando disponível; caso contrário copia o link.
 */
export function ShareStudyButton({ title }: { title: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2500);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function share() {
    // Link público da plataforma (home), para abrir em redes sociais sem exigir login.
    const url = `${window.location.origin}/`;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("error");
    }
  }

  const label =
    status === "copied" ? "Link copiado" : status === "error" ? "Não foi possível compartilhar" : "Compartilhar";

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => void share()}
      aria-label="Compartilhar este material"
      title={label}
      className="h-8 gap-1.5 px-2 text-xs font-medium text-muted-foreground hover:text-foreground"
    >
      {status === "copied" ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Share2 className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="hidden sm:inline" aria-live="polite">
        {label}
      </span>
    </Button>
  );
}
