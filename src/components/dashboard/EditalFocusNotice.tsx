import * as React from "react";
import { Link } from "@tanstack/react-router";
import { useAuthStatus } from "@/hooks/useDashboard";
import { readActiveStudyEdition } from "@/lib/activeStudyEdition";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";

type Action = { label: string; to: "/dashboard/edital" | "/dashboard/my-contest"; primary?: boolean };

/** Aviso padrão "edital ativo": compacto, colorido e legível no celular. */
export function EditalFocusNotice({
  title,
  description,
  edital,
  actions,
}: {
  title: string;
  description: string;
  edital?: string | undefined;
  actions: Action[];
}) {
  // "Abrir meu edital" vai direto ao programa do edital em foco, não ao catálogo com todos os concursos.
  const { user } = useAuthStatus();
  const [editionId, setEditionId] = React.useState<string | null>(null);
  React.useEffect(() => {
    setEditionId(readActiveStudyEdition(user?.id)?.id ?? null);
  }, [user?.id]);
  return (
    <section className="nc-focus-notice" role="status" aria-label={title}>
      <header className="nc-focus-notice__head">
        <span className="nc-focus-notice__icon" aria-hidden="true"><Lock /></span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </header>
      {edital && (
        <p className="nc-focus-notice__edital">
          <ShieldCheck aria-hidden="true" />
          <span><small>Edital em foco</small><strong>{edital}</strong></span>
        </p>
      )}
      <div className="nc-focus-notice__actions">
        {actions.map((a) => (
          a.to === "/dashboard/edital" && editionId ? (
            <Link key={a.to} to={a.to} search={{ edition: editionId }} data-primary={a.primary ? "true" : undefined}>
              {a.label}
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <Link key={a.to} to={a.to} data-primary={a.primary ? "true" : undefined}>
              {a.label}
              <ArrowRight aria-hidden="true" />
            </Link>
          )
        ))}
      </div>
    </section>
  );
}
