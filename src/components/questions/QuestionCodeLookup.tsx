import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Eye, Loader2, LogIn, Search, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/components/auth/AuthStatusProvider";
import { questionCode, isQuestionTable } from "@/lib/questionIdentity";
import "@/styles/question-code-lookup.css";

type PublicQuestion = {
  code: string;
  kind: "multiple_choice" | "certo_errado";
  board: string | null;
  contest: string | null;
  career: string | null;
  year: number | null;
  subject: string | null;
  support_text: string | null;
  stem: string;
  options: Record<string, string>;
  needs_visual: boolean;
};

/**
 * Consulta uma questão pelo código curto (NC-XXXXXXXX).
 * Visitante: lê enunciado e alternativas, sem gabarito e sem responder.
 * Logado: além de ler, abre a questão no Treinador, que já grava a 1ª resposta única,
 * o tempo gasto e a pontuação do ranking.
 */
export function QuestionCodeLookup({
  className,
  variant = "section",
}: {
  className?: string;
  /** "compact": campo discreto de uma linha para a Área do aluno; o resultado abre em um painel flutuante. */
  variant?: "section" | "compact";
}) {
  const { isAuthenticated } = useAuthStatus();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [opening, setOpening] = useState(false);
  const [question, setQuestion] = useState<PublicQuestion | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const search = async (event: React.FormEvent) => {
    event.preventDefault();
    const code = value.trim();
    if (!code || loading) return;
    setLoading(true);
    setMessage(null);
    setQuestion(null);
    try {
      const { data, error } = await supabase.rpc("get_public_question_by_code", { p_code: code });
      if (error) throw error;
      if (!data)
        setMessage("Não encontramos uma questão ativa com esse código. Confira e tente de novo.");
      else setQuestion(data as PublicQuestion);
    } catch (error) {
      console.error("Falha ao consultar questão por código", error);
      setMessage("Não foi possível consultar agora. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  };

  const answer = async () => {
    if (!question || opening) return;
    setOpening(true);
    setMessage(null);
    try {
      const { data, error } = await supabase.rpc("resolve_question_short_code", {
        p_code: question.code,
      });
      if (error) throw error;
      const row = Array.isArray(data) ? data[0] : data;
      if (!row || !isQuestionTable(row.question_table)) throw new Error("code-not-resolved");
      const catalogQuery = questionCode({
        id: row.question_id,
        table: row.question_table,
        source: row.question_table === "curated_question_catalog" ? "curated" : "official",
      });
      await navigate({
        to: "/dashboard/question-trainer",
        search: { catalogQuery, mode: "catalog", limit: "all", go: "1" } as never,
      });
    } catch (error) {
      console.error("Falha ao abrir questão por código", error);
      setMessage("Não foi possível abrir a questão para responder. Tente novamente.");
    } finally {
      setOpening(false);
    }
  };

  const meta = question
    ? [question.subject, question.board, question.contest, question.year]
        .filter(Boolean)
        .join(" · ")
    : "";

  const compact = variant === "compact";
  const resultNode = (
    <div aria-live="polite">
      {message && <p className="qcl__msg">{message}</p>}
      {question && (
        <article
          className="qcl__card"
          role={compact ? "dialog" : undefined}
          aria-label={compact ? "Questão consultada" : undefined}
        >
          {compact && (
            <button
              type="button"
              className="qcl__close"
              aria-label="Fechar"
              onClick={() => setQuestion(null)}
            >
              <X aria-hidden="true" />
            </button>
          )}
          <div className="qcl__meta">
            <code>{question.code}</code>
            <span>{meta}</span>
          </div>
          {question.support_text && <p className="qcl__support">{question.support_text}</p>}
          <p className="qcl__stem">{question.stem}</p>
          {question.needs_visual && (
            <p className="qcl__note">
              Esta questão depende de figura, tabela ou gráfico que não aparece aqui.
            </p>
          )}
          <ol className="qcl__options">
            {Object.entries(question.options).map(([letter, text]) => (
              <li key={letter}>
                <b>{letter}</b>
                <span>{text}</span>
              </li>
            ))}
          </ol>
          <footer className="qcl__foot">
            <span className="qcl__ro">
              <Eye aria-hidden="true" /> Somente leitura · o gabarito não é exibido
            </span>
            {isAuthenticated ? (
              <button type="button" className="qcl__cta" onClick={answer} disabled={opening}>
                {opening ? (
                  <Loader2 className="qcl__spin" aria-hidden="true" />
                ) : (
                  <ArrowRight aria-hidden="true" />
                )}
                Responder esta questão
              </button>
            ) : (
              <Link to="/auth" className="qcl__cta">
                <LogIn aria-hidden="true" /> Entrar para responder
              </Link>
            )}
          </footer>
        </article>
      )}
    </div>
  );

  if (compact) {
    return (
      <div
        className={`qcl-mini ${className ?? ""}`}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setQuestion(null);
            setMessage(null);
          }
        }}
      >
        <form className="qcl-mini__form" onSubmit={search} role="search">
          <label htmlFor="qcl-mini-input" className="qcl__sr">
            Consultar questão por código
          </label>
          <Search aria-hidden="true" />
          <input
            id="qcl-mini-input"
            value={value}
            onChange={(event) => setValue(event.target.value.toUpperCase())}
            placeholder="Código da questão"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={20}
          />
          <button type="submit" disabled={loading || !value.trim()} aria-label="Consultar código">
            {loading ? (
              <Loader2 className="qcl__spin" aria-hidden="true" />
            ) : (
              <ArrowRight aria-hidden="true" />
            )}
          </button>
        </form>
        {(message || question) && (
          <div
            className="qcl-mini__overlay"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setQuestion(null);
                setMessage(null);
              }
            }}
          >
            <div className="qcl-mini__pop">{resultNode}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <section className={`qcl ${className ?? ""}`} aria-labelledby="qcl-title">
      <div className="qcl__inner">
        <header className="qcl__head">
          <span className="qcl__tag">
            <Search aria-hidden="true" /> Consulta por código
          </span>
          <h2 id="qcl-title">Tem o código de uma questão? Digite e leia.</h2>
          <p>
            Cada questão tem um código próprio, como <strong>NC-7K3M9QX2</strong>. Qualquer pessoa
            pode ler o enunciado e as alternativas. Para responder, marcar o tempo e entrar no
            ranking, é preciso ter conta.
          </p>
        </header>

        <form className="qcl__form" onSubmit={search} role="search">
          <label htmlFor="qcl-input" className="qcl__sr">
            Código da questão
          </label>
          <input
            id="qcl-input"
            value={value}
            onChange={(event) => setValue(event.target.value.toUpperCase())}
            placeholder="NC-XXXXXXXX"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={20}
            inputMode="text"
          />
          <button type="submit" disabled={loading || !value.trim()}>
            {loading ? (
              <Loader2 className="qcl__spin" aria-hidden="true" />
            ) : (
              <Search aria-hidden="true" />
            )}
            Consultar
          </button>
        </form>

        {resultNode}
      </div>
    </section>
  );
}
