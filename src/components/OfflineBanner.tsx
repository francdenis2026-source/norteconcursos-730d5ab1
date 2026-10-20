import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

/** Aviso discreto quando o aparelho perde a conexão; some sozinho ao reconectar. */
export function OfflineBanner() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);
  if (online) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[100] flex items-center justify-center gap-2 border-t bg-background/95 px-4 py-2 text-sm text-foreground shadow-lg backdrop-blur"
    >
      <WifiOff className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>Você está sem conexão. O que já foi salvo continua na sua conta; novas respostas podem não ser registradas.</span>
    </div>
  );
}
