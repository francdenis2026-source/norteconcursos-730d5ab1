import { useState } from "react";
import { literalExercises, matchesLiteralAnswer, type LiteralExercise } from "@/lib/legalLiteralPractice";

function Exercise({ exercise, number }: { exercise: LiteralExercise; number: number }) {
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  // Keep enough context to locate the rule without rendering an entire code article repeatedly.
  const hideDuplicate = (text: string) => text.replace(new RegExp(exercise.answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "[outra ocorrência omitida]");
  const before = hideDuplicate(exercise.before.slice(-260));
  const after = hideDuplicate(exercise.after.slice(0, 260));
  return <article className="rounded-xl border border-indigo-500/40 bg-indigo-500/5 p-4">
    <h4 className="font-semibold">Complete a expressão {number}</h4>
    <p className="mt-3 whitespace-pre-wrap text-sm leading-7">{exercise.before.length > 260 ? "…" : ""}{before}<strong className="mx-1 rounded bg-indigo-500/15 px-3 py-1">[lacuna]</strong>{after}{exercise.after.length > 260 ? "…" : ""}</p>
    <label className="mt-3 block text-sm">Expressão da lei<input value={answer} disabled={revealed} onChange={event => setAnswer(event.target.value)} maxLength={300} autoComplete="off" className="mt-1 block w-full rounded-lg border bg-background p-2" /></label>
    {!revealed ? <button type="button" disabled={!answer.trim()} onClick={() => setRevealed(true)} className="mt-3 rounded-lg border px-3 py-2 text-sm disabled:opacity-50">Conferir resposta</button> : <div className="mt-3 rounded-lg bg-background p-3" role="status"><p className="font-semibold">{matchesLiteralAnswer(answer, exercise.answer) ? "Correspondência literal correta." : "Compare com a expressão original:"}</p><p className="mt-2">{exercise.answer}</p><p className="mt-2 text-xs text-muted-foreground">Este exercício confere a expressão; a interpretação depende do dispositivo completo.</p><button type="button" className="mt-2 text-sm underline" onClick={() => {setAnswer(""); setRevealed(false);}}>Tentar novamente</button></div>}
  </article>;
}

export function LegalLiteralPractice({ source, label }: { source: string; label: string }) {
  const [selected, setSelected] = useState(0);
  const exercises = literalExercises(source);
  if (!exercises.length) return null;
  const exercise = exercises[selected] ?? exercises[0]!;
  return <section className="space-y-3" aria-label={`Fixação literal de ${label}`}><h3 className="font-semibold">Fixação específica · {label}</h3><p className="text-sm text-muted-foreground">Recupere as expressões do texto vigente antes de conferir. Exercícios de leitura literal, separados das questões de banca e da avaliação de domínio.</p><div className="flex gap-2" role="group" aria-label="Escolher exercício literal">{exercises.map((_, index) => <button type="button" key={index} aria-pressed={selected === index} onClick={() => setSelected(index)} className="rounded-lg border px-3 py-2 text-sm">Expressão {index + 1}</button>)}</div><Exercise key={`${label}:${exercise.before.length}`} exercise={exercise} number={selected + 1} /></section>;
}
