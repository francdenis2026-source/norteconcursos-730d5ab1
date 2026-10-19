import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Check, FileCheck2, Scale, ShieldCheck } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { PCPR_EXAM, PCPR_TRAINER_SEARCH } from "@/lib/pcprExam";
import { usePcprAvailability } from "@/hooks/usePcprAvailability";

const FACTS = [
  [
    FileCheck2,
    "Prova original",
    "100 itens por cargo; a disponibilidade na plataforma pode ser parcial",
  ],
  [Scale, "Base legal", "Conferida nos textos oficiais do Planalto"],
  [
    CalendarCheck,
    "Gabarito",
    "Preliminar da banca (13/10/2026), atualizado quando o definitivo sair",
  ],
  [ShieldCheck, "Correção", "Imediata, com a base legal de cada resposta"],
] as const;

/** Chamada da prova PC-PR 2026: leva ao treinador com a prova inteira (logado) ou ao cadastro (visitante). */
export function PcprExamPromo() {
  const { isAuthenticated } = useAuthStatus();
  const { counts, checkedAt, loading } = usePcprAvailability();
  const cta = isAuthenticated ? (
    <Link
      to="/dashboard/question-trainer"
      search={PCPR_TRAINER_SEARCH}
      className="home-button home-button--primary"
    >
      Resolver prova de Agente <ArrowRight />
    </Link>
  ) : (
    <Link to="/auth" search={{ mode: "register" }} className="home-button home-button--primary">
      Resolver a prova grátis <ArrowRight />
    </Link>
  );

  return (
    <article
      id="prova-pcpr"
      className="home-opportunity home-opportunity--pcpr"
      aria-labelledby="pcpr-title"
    >
      <div className="home-opportunity__header">
        <div className="home-opportunity__image home-pcpr-hero">
          <img
            src="/media/hero/pcpr-capa.webp"
            alt="Capa PCPR — Polícia Civil do Paraná, com brasão dourado e identidade Norte Concursos"
            loading="lazy"
            decoding="async"
            width="1672"
            height="940"
          />
        </div>
        <div className="home-opportunity__intro">
          <div className="home-opportunity__identity">
            <span className="home-eyebrow">Prova disponível · PCPR {PCPR_EXAM.year}</span>
            <span className="home-exam-icon">
              <FileCheck2 aria-hidden="true" />
            </span>
          </div>
          <h3 id="pcpr-title">Polícia Civil do Paraná</h3>
          <p>
            Prova {PCPR_EXAM.board} · {PCPR_EXAM.appliedOn}. Treine com correção imediata.
          </p>
        </div>
      </div>
      <div className="home-opportunity__body">
        <details className="home-exam-details">
          <summary>Detalhes da prova</summary>
          <p>
            Resolva questão por questão da prova da {PCPR_EXAM.board}, aplicada em{" "}
            {PCPR_EXAM.appliedOn}. Direito, Legislação e Direitos Humanos no treinador, com base
            legal conferida e correção imediata.
          </p>
          <ul className="home-exam-roles" aria-label="Cargos da prova">
            {PCPR_EXAM.roles.map((role, index) => (
              <li key={role}>
                <Check aria-hidden="true" />
                <span>
                  {isAuthenticated ? (
                    <Link
                      to="/dashboard/question-trainer"
                      search={{ ...PCPR_TRAINER_SEARCH, career: role }}
                      className="underline underline-offset-2"
                    >
                      {role}
                    </Link>
                  ) : (
                    role
                  )}
                  :{" "}
                  {counts
                    ? `${counts[index]} disponíveis de 100 originais`
                    : loading
                      ? "conferindo disponibilidade…"
                      : "disponibilidade não confirmada"}
                </span>
              </li>
            ))}
          </ul>
          <p>
            {checkedAt
              ? `Conferência de ${checkedAt}. Confira a quantidade atual ao iniciar o treino.`
              : "Disponibilidade do acervo elegível por cargo."}{" "}
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
          <Link to="/desafio-diario" className="home-text-link">
            Ou faça o desafio diário
            <ArrowRight />
          </Link>
          <small>
            Iniciativa educacional independente, sem vínculo com a Polícia Civil do Paraná nem com a
            FGV. Gabarito preliminar da banca, sujeito a alterações após os recursos.
          </small>
        </div>
      </div>
    </article>
  );
}
