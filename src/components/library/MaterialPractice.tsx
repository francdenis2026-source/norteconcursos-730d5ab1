import { DidacticSourceNotice } from "@/components/dashboard/DidacticSourceNotice";
import { isPracticeOfficialSource } from "@/lib/materialPracticeReview";
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { Button } from "@/components/ui/button";
import { QuestionFigures } from "@/components/dashboard/QuestionFigures";
import { QuestionSupportText } from "@/components/library/QuestionSupportText";
import { QuestionText } from "@/components/dashboard/QuestionText";
import { parseQuestion, shuffled, type Answer, type Question } from "@/lib/questionFormat";
import {
  materialPracticePool,
  authoredMaterialPractice,
  mergeMaterialPractice,
  materialPracticeSearch,
  type MaterialPracticeScope,
} from "@/lib/materialPractice";

export function MaterialPractice({
  userId,
  scope,
  label,
  authoredQuiz = [],
  authoredKey = label,
  authoredReview,
}: {
  userId: string;
  scope: MaterialPracticeScope;
  label: string;
  authoredQuiz?: { q: string; a: boolean; why: string }[] | undefined;
  authoredKey?: string | undefined;
  authoredReview?: unknown;
}) {
  const { catalog, loading, error, reload } = useQuestionCatalog(
    userId,
    !!userId && userId !== "demo-user",
  );
  const catalogPool = useMemo(() => materialPracticePool(catalog, scope), [catalog, scope]);
  const authored = useMemo(
    () => authoredMaterialPractice(authoredQuiz, scope, authoredKey, label, authoredReview),
    [authoredQuiz, scope, authoredKey, label, authoredReview],
  );
  const pool = useMemo(() => mergeMaterialPractice(catalogPool, authored), [catalogPool, authored]);
  const [session, setSession] = useState<{ questions: Question[]; id: number } | null>(null);
  const search = materialPracticeSearch(scope);
  return (
    <section
      className="surface-card min-w-0 space-y-4 p-4 sm:p-5"
      aria-label={`Praticar: ${label}`}
    >
      <header className="space-y-1">
        <h3 className="font-bold">Praticar: {label}</h3>
        <p className="text-sm text-muted-foreground">
          Bateria de até 20 questões do assunto, sem repetir itens para completar a quantidade.
        </p>
      </header>
      {loading && !authored.length ? (
        <p role="status">Conferindo questões disponíveis…</p>
      ) : error && !authored.length ? (
        <div role="alert">
          <p>Não foi possível carregar as questões.</p>
          <Button variant="outline" onClick={() => void reload()}>
            Tentar novamente
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm" role="status">
            <strong>{pool.length}</strong> itens disponíveis neste recorte.
            {authored.length > 0 && (
              <span className="mt-1 block text-xs text-muted-foreground">
                {authored.length} exercícios autorais do material ·{" "}
                {loading ? "consultando o acervo…" : `${catalogPool.length} questões do acervo`}. O
                link abaixo explora o acervo separado.
              </span>
            )}
            {error && authored.length > 0 && (
              <span role="status" className="mt-1 block text-xs">
                O acervo está indisponível; os exercícios do material continuam disponíveis.
              </span>
            )}
            {pool.length < 20 && " A cobertura de 20 questões ainda não foi atingida."}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              disabled={!pool.length}
              onClick={() => setSession({ questions: shuffled(pool).slice(0, 20), id: Date.now() })}
            >
              {session ? "Nova bateria" : `Iniciar ${Math.min(20, pool.length)} questões`}
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard/question-trainer" search={search}>
                Explorar questões deste assunto
              </Link>
            </Button>
          </div>
          {!pool.length && (
            <p className="text-sm text-muted-foreground">
              Não há questões elegíveis identificadas para este assunto. O filtro permanece
              específico; continue com a leitura e a explicação.
            </p>
          )}
        </>
      )}
      <p className="text-xs text-muted-foreground">
        Fixação nesta visita. Para salvar tentativas no histórico, use o treinador completo.
      </p>
      {session && <PracticeSession key={session.id} questions={session.questions} />}
    </section>
  );
}
function PracticeSession({ questions }: { questions: Question[] }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const correct = questions.filter((q, i) => answers[i] === q.answer).length;
  const [finished, setFinished] = useState(false);
  if (finished)
    return (
      <div role="status" className="rounded-xl border bg-muted/40 p-4">
        <h4 className="font-bold">
          Resultado: {correct} de {questions.length}
        </h4>
        <p className="mt-2 text-sm">
          Exercício de fixação desta visita. Para registrar tentativas no histórico da plataforma,
          use o treinador completo.
        </p>
        <Button
          className="mt-3"
          variant="outline"
          onClick={() => {
            setIndex(0);
            setAnswers({});
            setFinished(false);
          }}
        >
          Refazer bateria
        </Button>
      </div>
    );
  const q = questions[index]!;
  const parsed = parseQuestion(q.text);
  const options = parsed.options.length
    ? parsed.options
    : [
        { letter: "C" as const, text: "Certo" },
        { letter: "E" as const, text: "Errado" },
      ];
  const picked = answers[index];
  return (
    <div className="min-w-0 space-y-4 border-t pt-4">
      <p className="text-xs text-muted-foreground">
        Questão {index + 1} de {questions.length} · {q.board}
        {q.year ? ` · ${q.year}` : ""}
      </p>
      <DidacticSourceNotice provenance={q.didacticProvenance} />
      {parsed.base && (
        <aside className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border bg-muted/40 p-3 text-sm">
          <strong>{parsed.baseLabel}</strong>
          <QuestionSupportText text={parsed.base} citesLines={/linhas?\s+\d+/i.test(q.text)} />
        </aside>
      )}
      <QuestionText text={parsed.stem} />
      <QuestionFigures urls={q.figures} illustrations={parsed.illustrations} />
      <div className="space-y-2">
        {options.map((o) => (
          <button
            type="button"
            key={o.letter}
            disabled={!!picked}
            onClick={() => setAnswers((a) => ({ ...a, [index]: o.letter }))}
            className={`flex min-h-11 w-full gap-3 rounded-xl border p-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${picked && o.letter === q.answer ? "border-emerald-500 bg-emerald-500/10" : picked === o.letter ? "border-rose-500 bg-rose-500/10" : "hover:bg-muted"}`}
          >
            <strong>{o.letter}</strong>
            <span className="min-w-0 break-words">
              <QuestionText text={o.text} />
            </span>
          </button>
        ))}
      </div>
      {picked && (
        <div role="status" className="space-y-3 rounded-xl border bg-muted/40 p-4">
          <p className="font-semibold">
            {picked === q.answer ? "Resposta correta." : `Resposta correta: ${q.answer}.`}
          </p>
          <QuestionText text={q.explanation} />
          {q.legalBasis
            .filter((b) => b.url && isPracticeOfficialSource(b.url))
            .map((b) => (
              <a
                key={`${b.url}:${b.artigo}`}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm underline"
              >
                Conferir fonte oficial{b.artigo ? ` · ${b.artigo}` : ""}
              </a>
            ))}
          <Button
            onClick={() =>
              index + 1 === questions.length ? setFinished(true) : setIndex(index + 1)
            }
          >
            {index + 1 === questions.length ? "Ver resultado" : "Próxima questão"}
          </Button>
        </div>
      )}
    </div>
  );
}
