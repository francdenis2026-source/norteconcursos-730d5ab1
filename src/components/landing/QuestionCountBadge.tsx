import { BookOpenCheck, ArrowUpRight } from "lucide-react";

export function QuestionCountBadge() {
  return (
    <a href="#plataforma" className="question-count-badge">
      <span className="question-count-icon" aria-hidden="true">
        <BookOpenCheck />
      </span>
      <span className="question-count-content">
        <span className="question-count-eyebrow">Seu próximo nível começa aqui</span>
        <span className="question-count-main">
          <span>Mais de</span>
          <strong>5 mil</strong>
          <span>questões</span>
        </span>
        <span className="question-count-detail">
          Oficiais e autorais • preparação direcionada
        </span>
      </span>
      <ArrowUpRight className="question-count-arrow" aria-hidden="true" />
    </a>
  );
}
