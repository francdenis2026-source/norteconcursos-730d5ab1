import "./QuestionCountBadge.css";
import { ArrowUpRight } from "lucide-react";
import { usePlatformQuestionSummary } from "@/hooks/usePlatformQuestionSummary";

export function QuestionCountBadge() {
  const { data } = usePlatformQuestionSummary();
  const format = (n: number) => n.toLocaleString("pt-BR");
  const ratio = data && data.registered > 0 ? Math.min(1, data.available / data.registered) : null;

  return (
    <a href="#plataforma" className="question-count-badge">
      <span className="question-count-head">
        <span className="question-count-eyebrow">Banco de questões</span>
        <ArrowUpRight className="question-count-arrow" aria-hidden="true" />
      </span>
      <span className="question-count-content">
        <span className="question-count-main">
          <strong>{data ? format(data.available) : "Questões"}</strong>
          <span>
            {data
              ? data.available === 1
                ? "questão disponível para treinar"
                : "questões disponíveis para treinar"
              : "para sua preparação"}
          </span>
        </span>
        {ratio !== null && (
          <span className="question-count-meter" role="presentation">
            <span
              className="question-count-meter__fill"
              style={{ width: `${Math.round(ratio * 100)}%` }}
            />
          </span>
        )}
        <span className="question-count-detail">
          {data ? (
            <>
              <span className="question-count-registered">
                <strong>{format(data.registered)}</strong>
                <span>
                  {data.registered === 1 ? "cadastrada no total" : "cadastradas no total"}
                </span>
              </span>
              <span className="question-count-sources">Questões oficiais e autorais</span>
            </>
          ) : (
            "Oficiais e autorais · liberação após revisão"
          )}
        </span>
      </span>
    </a>
  );
}
