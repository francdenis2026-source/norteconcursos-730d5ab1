import { useRef, useState } from "react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, CheckCircle2, Layers, ListChecks, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Flashcard, QuizItem } from "@/lib/studyMaterials";

const HUES = [250, 160, 30, 310, 200];

/** Copia os flashcards revisados do material para o baralho do aluno (sem duplicar se já copiou). */
function SaveToDeck({
  cards,
  slug,
  subject,
  topic,
}: {
  cards: Flashcard[];
  slug: string;
  subject: string;
  topic: string;
}) {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  async function save() {
    setState("busy");
    const { data } = await supabase.auth.getSession();
    const uid = data.session?.user.id;
    if (!uid) {
      toast.error("Entre na sua conta para salvar os cartões.");
      setState("idle");
      return;
    }
    const rows = cards.map((c, i) => ({
      user_id: uid,
      subject,
      topic,
      front: c.f,
      back: c.b,
      source: "library",
      source_key: `${slug}:${i}`,
    }));
    const { error } = await supabase
      .from("flashcards")
      .upsert(rows, { onConflict: "user_id,source_key", ignoreDuplicates: true });
    if (error) {
      toast.error("Não foi possível salvar os cartões.");
      setState("idle");
      return;
    }
    toast.success("Cartões salvos. Eles entram na sua revisão de hoje.");
    setState("done");
  }
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
      <Button size="sm" variant="outline" disabled={state !== "idle"} onClick={() => void save()}>
        <Layers className="h-4 w-4" />{" "}
        {state === "done" ? "Salvos no baralho" : "Salvar no meu baralho"}
      </Button>
      {state === "done" && (
        <Link to="/dashboard/flashcards" className="font-semibold text-primary hover:underline">
          Ir revisar
        </Link>
      )}
    </div>
  );
}

export function StudyPractice({
  flashcards,
  quiz,
  slug,
  subject,
  topic,
  onQuizComplete,
}: {
  flashcards: Flashcard[];
  quiz: QuizItem[];
  slug?: string;
  subject?: string;
  topic?: string;
  onQuizComplete?: ((answers: boolean[]) => void) | undefined;
}) {
  const [tab, setTab] = useState<"cards" | "quiz">(flashcards.length ? "cards" : "quiz");
  if (!flashcards.length && !quiz.length) return null;
  return (
    <section className="surface-card practice no-print" aria-label="Fixação">
      <div className="practice__tabs" role="group" aria-label="Modo de estudo">
        {flashcards.length > 0 && (
          <button type="button" aria-pressed={tab === "cards"} onClick={() => setTab("cards")}>
            <Layers /> Flashcards ({flashcards.length})
          </button>
        )}
        {quiz.length > 0 && (
          <button type="button" aria-pressed={tab === "quiz"} onClick={() => setTab("quiz")}>
            <ListChecks /> Certo ou Errado ({quiz.length})
          </button>
        )}
      </div>
      {tab === "cards" ? <Cards cards={flashcards} /> : <Quiz items={quiz} onComplete={onQuizComplete} />}
      {tab === "cards" && slug && subject && (
        <SaveToDeck cards={flashcards} slug={slug} subject={subject} topic={topic ?? ""} />
      )}
    </section>
  );
}

function Cards({ cards }: { cards: Flashcard[] }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const go = (n: number) => {
    setFlipped(false);
    setI((i + n + cards.length) % cards.length);
  };
  const card = cards[i]!;
  return (
    <>
      <button
        type="button"
        className="fc"
        style={{ "--h": HUES[i % HUES.length] } as React.CSSProperties}
        aria-pressed={flipped}
        onClick={() => setFlipped(!flipped)}
      >
        <span className="fc__in">
          <span className="fc__face">
            <small>Pergunta · toque para virar</small>
            <strong>{card.f}</strong>
          </span>
          <span className="fc__face fc__face--back">
            <small>Resposta</small>
            <p>{card.b}</p>
          </span>
        </span>
      </button>
      <div className="practice__bar">
        <Button variant="outline" size="sm" onClick={() => go(-1)} aria-label="Anterior">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="practice__dots" aria-label={`Carta ${i + 1} de ${cards.length}`}>
          {cards.map((_, n) => (
            <i key={n} className={n === i ? "is-on" : ""} />
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={() => go(1)} aria-label="Próxima">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}

function Quiz({ items, onComplete }: { items: QuizItem[]; onComplete?: ((answers: boolean[]) => void) | undefined }) {
  const completed = useRef(false);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(() => items.map(() => null));
  const score = answers.filter((a, n) => a === items[n]!.a).length;

  if (i >= items.length) {
    return (
      <div className="library-empty">
        <CheckCircle2 className="h-10 w-10 text-brass" />
        <p className="font-semibold">
          Você acertou {score} de {items.length}
        </p>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => {
            completed.current = false;
            setAnswers(items.map(() => null));
            setI(0);
          }}
        >
          <RotateCcw className="h-4 w-4" /> Refazer
        </Button>
      </div>
    );
  }

  const item = items[i]!;
  const given = answers[i];
  const pick = (v: boolean) => setAnswers(answers.map((a, n) => (n === i ? v : a)));
  const cls = (v: boolean) =>
    given === null ? "" : v === item.a ? "is-right" : given === v ? "is-wrong" : "";
  return (
    <>
      <p className="quiz-q">{item.q}</p>
      <div className="quiz-opts">
        <button
          type="button"
          disabled={given !== null}
          className={cls(true)}
          onClick={() => pick(true)}
        >
          Certo
        </button>
        <button
          type="button"
          disabled={given !== null}
          className={cls(false)}
          onClick={() => pick(false)}
        >
          Errado
        </button>
      </div>
      {given !== null && (
        <p className="quiz-why">
          <strong>{given === item.a ? "Acertou. " : "Errou. "}</strong>
          {item.why}
        </p>
      )}
      <div className="practice__bar">
        <div className="practice__dots">
          {answers.map((a, n) => (
            <i
              key={n}
              className={
                a === null ? (n === i ? "is-on" : "") : a === items[n]!.a ? "is-ok" : "is-bad"
              }
            />
          ))}
        </div>
        <Button disabled={given === null} onClick={() => { if (i === items.length - 1 && !completed.current && answers.every(answer => answer !== null)) { completed.current = true; onComplete?.(answers as boolean[]); } setI(i + 1); }} className="gap-2">
          {i === items.length - 1 ? "Ver resultado" : "Próxima"} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
