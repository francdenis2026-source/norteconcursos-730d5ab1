import { useOnlinePresence } from "@/hooks/useOnlinePresence";
import { studyPresenceLabel } from "@/lib/studyPresence";

/** The shared root connection includes anonymous visitors and signed-in browsers on all routes. */
export function StudyPresence() {
  const presence = useOnlinePresence();
  const available = presence.state === "ready" && presence.count !== null;
  const count = presence.count ?? 0;
  const formatted = new Intl.NumberFormat("pt-BR", {
    notation: count >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(count);
  const status = presence.state === "connecting" ? "Conectando presença" : "Presença indisponível";
  return (
    <span
      className="home-presence"
      data-available={available}
      data-active={available && count > 0}
      data-state={presence.state}
      role="status"
      aria-label={available ? studyPresenceLabel(count) : status}
      title={
        available
          ? `${studyPresenceLabel(count)}. Navegadores com uma aba visível da plataforma, com ou sem login. Abas do mesmo navegador contam uma vez.`
          : "A conexão de presença está sendo restabelecida. A contagem aparecerá assim que estiver disponível."
      }
    >
      <i className="home-presence__dot" aria-hidden="true" />
      <span aria-hidden="true">
        {available ? (
          <>
            <strong>{formatted}</strong>
            <span className="home-presence__full">
              {" "}
              {count === 1 ? "visitante online" : "visitantes online"}
            </span>
            <span className="home-presence__short"> online</span>
          </>
        ) : (
          <>
            <span className="home-presence__full">{status}</span>
            <span className="home-presence__short">
              {presence.state === "connecting" ? "Conectando…" : "Indisponível"}
            </span>
          </>
        )}
      </span>
    </span>
  );
}
