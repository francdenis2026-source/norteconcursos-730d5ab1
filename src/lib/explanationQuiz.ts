import { explanationPractice } from "./explanationPractice";
export type ExplanationQuizItem = { text: string; correct: boolean; why: string };

/** Reuse the author's explicit yes/no answer; never assign a key to a heading or invent a negation. */
export function buildExplanationQuiz(prova: string[], seed: string): ExplanationQuizItem[] {
  const items: ExplanationQuizItem[] = [];
  for (const note of prova) {
    const pair = explanationPractice(note);
    if (!pair || !/^(?:A\s|O\s|As\s|Os\s|Toda\b|Todo\b|Todas\b|Todos\b|É(?=\s)|Pode\b|Podem\b|Há(?=\s)|Uma\b|Um\b)/u.test(pair.question)) continue;
    const answer = pair.answer.match(/^(Sim|Não)(?=[,;:.\s]|$)/u);
    if (!answer) continue;
    items.push({text: pair.question.slice(0, -1) + ".", correct: answer[1] === "Sim", why: pair.answer});
  }
  const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  return items.sort((a, b) => hash(seed + a.text) - hash(seed + b.text));
}
