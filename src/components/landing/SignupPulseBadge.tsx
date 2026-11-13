import { usePlatformSignupPulse } from "@/hooks/usePlatformSignupPulse";
import "@/styles/signup-pulse.css";

/**
 * Selo público (sem login) com o total de usuários cadastrados na plataforma e uma
 * animação discreta — um chip "+1 novo cadastro" que aparece e some sozinho — toda
 * vez que alguém se cadastra em qualquer lugar do site, em tempo real.
 */
export function SignupPulseBadge() {
  const { count, isLoading, pulseKey } = usePlatformSignupPulse();
  const available = !isLoading && count !== null;
  const formatted = new Intl.NumberFormat("pt-BR", {
    notation: (count ?? 0) >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(count ?? 0);

  return (
    <span className="home-signups" data-available={available} role="status">
      <i className="home-signups__dot" aria-hidden="true" />
      <span aria-hidden="true">
        {available ? (
          <>
            <strong>{formatted}</strong> cadastrados
          </>
        ) : (
          "Carregando…"
        )}
      </span>
      <span className="sr-only">
        {available ? `${formatted} usuários cadastrados na plataforma` : "Carregando total de cadastrados"}
      </span>
      {pulseKey > 0 && (
        <span key={pulseKey} className="home-signups__toast" aria-live="polite">
          +1 novo cadastro
        </span>
      )}
    </span>
  );
}
