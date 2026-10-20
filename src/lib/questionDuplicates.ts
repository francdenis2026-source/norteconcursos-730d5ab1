// Itens idênticos cadastrados mais de uma vez para a MESMA prova.
//
// Exemplo real: a PC-PR 2026 (FGV) aplicou 64 itens comuns a Agente e
// Papiloscopista. Cada cargo tem a sua linha em board_exam_questions, com o
// mesmo item, o mesmo gabarito e o mesmo texto. Sem filtro de cargo, o
// treinador listava as duas e o aluno via a mesma questão duas vezes.
//
// Duas linhas só são o mesmo item quando concordam em prova (concurso + ano +
// banca), gabarito E texto completo (inclui o texto de apoio e as alternativas).
// Itens diferentes que apenas compartilham um texto de apoio têm enunciados
// diferentes e, por isso, nunca são unidos.
import type { Question } from "./questionFormat";
import { questionRef } from "./questionIdentity";

type Comparable = Pick<
  Question,
  "id" | "source" | "contest" | "year" | "board" | "answer" | "text"
> & { table?: Question["table"] };

const fold = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

/** Chave de conteúdo de um item de prova; null para o que não deve ser unido (autoral, pessoal, sem texto). */
export function questionContentKey(question: Comparable): string | null {
  if (question.source !== "official") return null;
  const text = fold(question.text);
  if (text.length < 20) return null;
  return JSON.stringify([
    fold(question.contest),
    String(question.year),
    fold(question.board),
    question.answer,
    text,
  ]);
}

/**
 * Mantém um representante por item idêntico, na ordem original. `prefer` desempata:
 * o maior valor vence (ex.: o que o aluno já respondeu, ou o do cargo escolhido).
 */
export function dedupeSharedExamItems<T extends Comparable>(
  questions: readonly T[],
  prefer: (question: T) => number = () => 0,
): T[] {
  const best = new Map<string, T>();
  for (const question of questions) {
    const key = questionContentKey(question);
    if (!key) continue;
    const current = best.get(key);
    if (!current || prefer(question) > prefer(current)) best.set(key, question);
  }
  return questions.filter((question) => {
    const key = questionContentKey(question);
    return !key || best.get(key) === question;
  });
}

/**
 * Para cada referência (tabela:id), as referências dos demais cadastros do mesmo item.
 * Usado para que uma resposta dada a um cadastro valha para o outro.
 */
export function sharedItemSiblings(questions: readonly Comparable[]): Map<string, string[]> {
  const groups = new Map<string, string[]>();
  for (const question of questions) {
    const key = questionContentKey(question);
    if (!key) continue;
    groups.set(key, [...(groups.get(key) ?? []), questionRef(question)]);
  }
  const siblings = new Map<string, string[]>();
  for (const refs of groups.values()) {
    if (refs.length < 2) continue;
    for (const ref of refs)
      siblings.set(
        ref,
        refs.filter((other) => other !== ref),
      );
  }
  return siblings;
}

/**
 * Uma resposta dada a um cadastro vale para os cadastros idênticos do mesmo item:
 * quem respondeu a questão do Agente já respondeu a do Papiloscopista.
 * `locked` é indexado por `chave(question)`; devolve um mapa novo e só acrescenta chaves ausentes.
 */
export function expandAnsweredBySiblings<V>(
  answered: ReadonlyMap<string, V>,
  catalog: readonly Comparable[],
  keyOf: (question: Comparable) => string,
): Map<string, V> {
  const expanded = new Map(answered);
  const groups = new Map<string, Comparable[]>();
  for (const question of catalog) {
    const content = questionContentKey(question);
    if (content) groups.set(content, [...(groups.get(content) ?? []), question]);
  }
  for (const members of groups.values()) {
    if (members.length < 2) continue;
    const holder = members.find((member) => answered.has(keyOf(member)));
    if (!holder) continue;
    const value = answered.get(keyOf(holder))!;
    for (const member of members)
      if (!expanded.has(keyOf(member))) expanded.set(keyOf(member), value);
  }
  return expanded;
}
