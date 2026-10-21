import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import "@/styles/offline-notice.css";

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
      className="offline-notice"
    >
      <WifiOff className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span><strong>Você está sem conexão.</strong> Seu progresso confirmado permanece salvo. Reconecte-se para registrar novas respostas.</span>
    </div>
  );
}
