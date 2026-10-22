import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, FileCheck2, Scale, ShieldCheck } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { PCSC_EXAM, PCSC_TRAINER_SEARCH } from "@/lib/pcscExam";
import { usePcscAvailability } from "@/hooks/usePcscAvailability";

const FACTS = [
  [
    FileCheck2,
    "Prova original",
    `${PCSC_EXAM.itemsOriginal} itens; a disponibilidade pode ser parcial`,
  ],
  [Scale, "Base legal", "Conferida nos textos oficiais do Planalto"],
  [CalendarCheck, "Gabarito", "Definitivo da banca IDECAN"],
  [ShieldCheck, "Correção", "Imediata, com a base legal de cada resposta"],
] as const;

/**
 * Chamada da prova PC-SC (Agente), aplicada pela IDECAN em 2026 — a mesma banca escolhida
 * para a PC do Acre. Leva ao treinador com a prova inteira (logado) ou ao cadastro (visitante).
 */
export function PcscExamPromo() {
  const { isAuthenticated } = useAuthStatus();
  const { counts, checkedAt, loading } = usePcscAvailability();
  const count = counts?.[0];

  const cta = isAuthenticated ? (
    <Link
      to="/dashboard/question-trainer"
      search={PCSC_TRAINER_SEARCH}
      className="home-button home-button--primary"
    >
      Resolver prova da PC-SC <ArrowRight />
    </Link>
  ) : (
    <Link to="/auth" search={{ mode: "register" }} className="home-button home-button--primary">
      Resolver a prova grátis <ArrowRight />
    </Link>
  );

  return (
    <article
      id="prova-pcsc"
      className="home-opportunity home-opportunity--pcsc"
      aria-labelledby="pcsc-title"
    >
      <div className="home-opportunity__header">
        <div className="home-opportunity__image">
          <img
            src="/media/hero/pcsc-capa.webp"
            alt="Capa PC-SC — Polícia Civil de Santa Catarina, identidade Norte Concursos"
            loading="lazy"
            decoding="async"
            width="1672"
            height="941"
          />
        </div>
        <div className="home-opportunity__intro">
          <div className="home-opportunity__identity">
            <span className="home-eyebrow home-signal">
              Prova IDECAN {PCSC_EXAM.year} · mesma banca da PC-AC
            </span>
            <span className="home-exam-icon">
              <FileCheck2 aria-hidden="true" />
            </span>
          </div>
          <h3 id="pcsc-title">Polícia Civil de Santa Catarina</h3>
          <p>{PCSC_EXAM.board} · Agente de Polícia Civil.</p>
        </div>
      </div>
      <div className="home-opportunity__body">
        <details className="home-exam-details">
          <summary>Detalhes da prova</summary>
          <p>
            A PC-SC aplicou sua prova de Agente em 2026 pela <strong>IDECAN</strong> — a mesma banca
            já escolhida para o próximo concurso da <strong>Polícia Civil do Acre</strong>. Treine
            com questões reais dessa banca, com correção imediata e base legal conferida, como
            preparação direta para a PC-AC.
          </p>
          <p>
            {checkedAt
              ? `Conferência de ${checkedAt}. Confira a quantidade atual ao iniciar o treino.`
              : "Disponibilidade do acervo elegível por sessão."}{" "}
            {count != null
              ? `${count} de ${PCSC_EXAM.itemsOriginal} itens originais disponíveis.`
              : loading
                ? "Conferindo disponibilidade…"
                : "Disponibilidade não confirmada."}{" "}
            Questões arquivadas não entram no treino. A seleção pode ser parcial.
          </p>
          <dl>
            {FACTS.map(([Icon, label, text]) => (
              <div key={label}>
                <dt>
                  <Icon aria-hidden="true" />
                  {label}
                </dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </details>
        <div className="home-opportunity__bottom">
          {cta}
          <small>
            Iniciativa educacional independente, sem vínculo com a Polícia Civil de Santa Catarina,
            com o Governo do Acre nem com a IDECAN. Treino preparatório com prova real da mesma
            banca; não garante questões idênticas no concurso da PC-AC.
          </small>
        </div>
      </div>
    </article>
  );
}
