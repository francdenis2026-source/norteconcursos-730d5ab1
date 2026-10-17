import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Check, FileCheck2, Scale, ShieldCheck } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { PCPR_EXAM, PCPR_TRAINER_SEARCH } from "@/lib/pcprExam";

const FACTS = [
  [FileCheck2, "Formato", "100 questões objetivas por cargo"],
  [Scale, "Base legal", "Conferida nos textos oficiais do Planalto"],
  [CalendarCheck, "Gabarito", "Preliminar da banca (13/10/2026), atualizado quando o definitivo sair"],
  [ShieldCheck, "Correção", "Imediata, com a base legal de cada resposta"],
] as const;

/** Chamada da prova PC-PR 2026: leva ao treinador com a prova inteira (logado) ou ao cadastro (visitante). */
export function PcprExamPromo() {
  const { isAuthenticated } = useAuthStatus();
  const cta = isAuthenticated ? (
    <Link to="/dashboard/question-trainer" search={PCPR_TRAINER_SEARCH} className="btn-brass">
      Resolver a prova agora <ArrowRight />
    </Link>
  ) : (
    <Link to="/auth" search={{ mode: "register" }} className="btn-brass">
      Resolver a prova grátis <ArrowRight />
    </Link>
  );

  return (
    <section id="prova-pcpr" className="hp-section" aria-labelledby="pcpr-title">
      <div className="lp-container">
        <div className="hp-campaign hp-campaign--wide">
          <div className="hp-campaign__main">
            <span className="chip-brass">Prova aplicada em {PCPR_EXAM.appliedOn}</span>
            <h3 id="pcpr-title">
              Prova da Polícia Civil do Paraná: <em>resolva questão por questão</em>
            </h3>
            <p>
              As questões de Direito, Legislação e Direitos Humanos da prova da {PCPR_EXAM.board}{" "}
              já estão no treinador, com base legal conferida e correção na hora.
            </p>
            <ul className="hp-chips" aria-label="Cargos da prova">
              {PCPR_EXAM.roles.map((role) => (
                <li key={role}>
                  <Check /> {role}
                </li>
              ))}
            </ul>
            <div className="hp-hero__ctas">
              {cta}
              <Link to="/desafio-diario" className="btn-glass">
                Ou faça o desafio diário
              </Link>
            </div>
            <small>
              Iniciativa educacional independente, sem vínculo com a Polícia Civil do Paraná nem com
              a FGV. O gabarito usado é o preliminar da banca e pode mudar após os recursos.
            </small>
          </div>
          <dl className="hp-facts" aria-label="Resumo da prova">
            {FACTS.map(([Icon, label, text]) => (
              <div key={label}>
                <Icon aria-hidden="true" />
                <dt>{label}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
