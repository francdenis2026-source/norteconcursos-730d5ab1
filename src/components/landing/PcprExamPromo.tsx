import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Check, FileCheck2, Scale, ShieldCheck } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { PCPR_EXAM, PCPR_TRAINER_SEARCH } from "@/lib/pcprExam";

/** Chamada comercial da prova PC-PR 2026: leva ao treinador filtrado (logado) ou ao cadastro (visitante). */
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
    <section id="prova-pcpr" className="lp-section lp-pcpr" aria-labelledby="pcpr-title">
      <div className="lp-container lp-pcpr__layout">
        <div className="lp-pcpr__content" data-reveal>
          <span className="lp-pcpr__live">
            <span aria-hidden="true" /> Prova aplicada em {PCPR_EXAM.appliedOn}
          </span>
          <h2 id="pcpr-title" className="lp-h2">
            Prova da Polícia Civil do Paraná: <em>resolva questão por questão.</em>
          </h2>
          <p className="lp-lead">
            As questões de Direito, Legislação e Direitos Humanos da prova da {PCPR_EXAM.board} já
            estão no treinador, com base legal conferida no texto oficial e correção na hora.
          </p>
          <ul className="lp-pcpr__roles" aria-label="Cargos da prova">
            {PCPR_EXAM.roles.map((role) => (
              <li key={role}>
                <Check /> {role}
              </li>
            ))}
          </ul>
          <div className="lp-pcpr__actions">
            {cta}
            <Link to="/desafio-diario" className="btn-glass">
              Ou faça o desafio diário
            </Link>
          </div>
          <p className="lp-pcpr__disclaimer">
            Iniciativa educacional independente, sem vínculo com a Polícia Civil do Paraná nem com a
            FGV. O gabarito usado é o preliminar da banca e pode mudar após os recursos.
          </p>
        </div>
        <aside className="lp-pcpr__card" data-reveal aria-label="Resumo da prova">
          <header>
            <span>Polícia Civil do Paraná</span>
            <strong>Concurso 2026 · {PCPR_EXAM.board}</strong>
          </header>
          <dl>
            <div>
              <FileCheck2 aria-hidden="true" />
              <dt>Formato</dt>
              <dd>100 questões objetivas por cargo</dd>
            </div>
            <div>
              <Scale aria-hidden="true" />
              <dt>Base legal</dt>
              <dd>Conferida nos textos oficiais do Planalto</dd>
            </div>
            <div>
              <CalendarCheck aria-hidden="true" />
              <dt>Gabarito</dt>
              <dd>Preliminar da banca (13/10/2026), atualizado quando o definitivo sair</dd>
            </div>
            <div>
              <ShieldCheck aria-hidden="true" />
              <dt>Correção</dt>
              <dd>Imediata, com a base legal de cada resposta</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
