import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckSquare } from "lucide-react";

/** Destaque do edital verticalizado da PC-AC logo no topo da área do aluno, para acesso
 * imediato — reaproveita o padrão visual do spotlight de prova (ver PcprExamSpotlight). */
export function PcAcreEditalSpotlight() {
  return (
    <section
      className="pcpr-spot pcpr-spot--notice no-print"
      aria-label="Edital verticalizado da Polícia Civil do Acre"
    >
      <img
        className="pcpr-spot__art"
        src="/media/editais/edital-pcac-001-2026-capa.jpg"
        alt="Capa do Edital PC-AC 001/2026"
        width={180}
        height={254}
        loading="lazy"
        decoding="async"
      />
      <div className="pcpr-spot__summary">
        <div>
          <h2>PC-AC 2026 · Edital verticalizado</h2>
          <p>139 vagas, 6 cargos · Marque o que já estudou e exporte em PDF.</p>
        </div>
        <Link to="/dashboard/pc-acre-edital" className="pcpr-spot__cta">
          <CheckSquare aria-hidden="true" className="mr-1 inline h-4 w-4" />
          Abrir agora <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
