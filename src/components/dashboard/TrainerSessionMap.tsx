import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  CircleDot,
  Lock,
  SkipForward,
} from "lucide-react";
import { trainerReachableIndex, trainerTally } from "@/lib/trainerSession";
export function TrainerSessionMap({
  total,
  index,
  results,
  saving,
  onSelect,
}: {
  total: number;
  index: number;
  results: readonly (string | null | undefined)[];
  saving: boolean;
  onSelect: (index: number) => void;
}) {
  const [page, setPage] = useState(Math.floor(index / 20));
  useEffect(() => setPage(Math.floor(index / 20)), [index]);
  const pages = Math.max(1, Math.ceil(total / 20));
  const current = Math.min(page, pages - 1);
  const frontier = trainerReachableIndex(results, total);
  const { correct, wrong, skipped, remaining } = trainerTally(results, total);
  return (
    <div className="trainer-map-content">
      <span className="trainer-panel-kicker">ACOMPANHAMENTO</span>
      <h2>Sua sessão</h2>
      <div className="trainer-map-progress">
        <strong>
          {correct + wrong}
          <small> / {total}</small>
        </strong>
        <span>respondidas</span>
        <progress
          value={correct + wrong}
          max={Math.max(1, total)}
          aria-label="Progresso da sessão"
        />
      </div>
      <dl className="trainer-map-stats">
        <div>
          <dt>
            <CheckCircle2 aria-hidden="true" />
            Acertos
          </dt>
          <dd>{correct}</dd>
        </div>
        <div>
          <dt>
            <XCircle aria-hidden="true" />
            Erros
          </dt>
          <dd>{wrong}</dd>
        </div>
        <div>
          <dt>
            <SkipForward aria-hidden="true" />
            Puladas
          </dt>
          <dd>{skipped}</dd>
        </div>
        <div>
          <dt>
            <CircleDot aria-hidden="true" />
            Ainda não visitadas
          </dt>
          <dd>{remaining}</dd>
        </div>
      </dl>
      <h3>Mapa de questões</h3>
      <nav className="trainer-question-grid" aria-label="Navegar pelas questões da sessão">
        {Array.from({ length: Math.max(0, Math.min(20, total - current * 20)) }, (_, offset) => {
          const i = current * 20 + offset;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Ir para questão ${i + 1}${results[i] === "ok" ? ", correta" : results[i] === "err" ? ", incorreta" : results[i] === "skipped" ? ", pulada" : ""}`}
              aria-current={i === index ? "step" : undefined}
              data-result={results[i] ?? "pending"}
              disabled={saving || i > frontier}
              onClick={() => onSelect(i)}
            >
              {i + 1}
            </button>
          );
        })}
      </nav>
      {pages > 1 && (
        <div className="trainer-map-pages">
          <button
            type="button"
            aria-label="Página anterior do mapa"
            disabled={current === 0}
            onClick={() => setPage(current - 1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <span>
            {current + 1} de {pages}
          </span>
          <button
            type="button"
            aria-label="Próxima página do mapa"
            disabled={current >= pages - 1}
            onClick={() => setPage(current + 1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
      <p className="trainer-map-note">
        <Lock aria-hidden="true" />
        Responda ou pule para avançar. Volte às questões puladas pelo mapa; elas também ficam em
        Estudar depois.
      </p>
    </div>
  );
}
