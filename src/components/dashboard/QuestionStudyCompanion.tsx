import { BookOpenCheck, ScanText, Sparkles } from "lucide-react";
import "./QuestionStudyCompanion.css";

/** Supporting content stays outside the answer surface and never suggests an answer. */
export function QuestionStudyCompanion({
  subject,
  answered,
}: {
  subject: string;
  answered: boolean;
}) {
  return (
    <section className="question-study-companion" aria-label="Orientação de estudo">
      <div className="question-study-companion__visual" aria-hidden="true">
        <img
          src="/media/hero/painel-aluno-estudo.webp"
          alt=""
          loading="lazy"
          width="1440"
          height="960"
        />
        <span>NORTE CONCURSO · CONSTÂNCIA E PREPARAÇÃO</span>
      </div>
      <div className="question-study-companion__content">
        <span className="question-study-companion__eyebrow">
          <Sparkles size={14} aria-hidden="true" />
          Aprender com cada questão
        </span>
        <h2>
          {answered
            ? "Agora, transforme a resposta em aprendizado."
            : "Seu próximo acerto começa na leitura."}
        </h2>
        <p className="question-study-companion__subject">Em foco: {subject}</p>
        <div>
          <ScanText size={20} aria-hidden="true" />
          <p>
            <strong>{answered ? "Compare seu raciocínio" : "Encontre o ponto central"}</strong>
            {answered
              ? "Confira a explicação e identifique por que a resposta está correta ou incorreta."
              : "Observe o que foi pedido e as palavras que mudam o sentido do enunciado."}
          </p>
        </div>
        <div>
          <BookOpenCheck size={20} aria-hidden="true" />
          <p>
            <strong>{answered ? "Leve uma ideia para a revisão" : "Justifique sua escolha"}</strong>
            {answered
              ? "Resuma com suas palavras o que aprendeu antes de seguir para a próxima questão."
              : "Pense no motivo da sua resposta antes de confirmar. O cronômetro acompanha seu ritmo, sem limite de tempo."}
          </p>
        </div>
      </div>
    </section>
  );
}
