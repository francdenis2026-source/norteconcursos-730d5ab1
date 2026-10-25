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
> & { table?: Question["table"]; career?: string };

const fold = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

/** Dois hashes de 32 bits do texto (FNV-1a e uma variante com outro primo): evita guardar o texto inteiro em cada chave. */
function textDigest(text: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193);
    h2 = Math.imul(h2 + c, 0x5bd1e995) ^ (h2 >>> 13);
  }
  return `${text.length}.${(h1 >>> 0).toString(36)}.${(h2 >>> 0).toString(36)}`;
}

// A chave de cada questão é calculada uma vez: o acervo tem dezenas de milhares de itens e as telas
// recalculam listas a cada filtro ou resposta; sem isto o navegador travava por segundos.
const keyCache = new WeakMap<object, string | null>();

/** Chave de conteúdo de um item de prova; null para o que não deve ser unido (autoral, pessoal, sem texto). */
export function questionContentKey(question: Comparable): string | null {
  if (question.source !== "official") return null;
  const cached = keyCache.get(question);
  if (cached !== undefined) return cached;
  const text = question.text.toLowerCase().replace(/\s+/g, " ").trim();
  const key =
    text.length < 20
      ? null
      : [
          fold(question.contest),
          String(question.year),
          fold(question.board),
          question.answer,
          textDigest(text),
        ].join("|");
  keyCache.set(question, key);
  return key;
}

/**
 * Mantém um representante por item idêntico, na ordem original. `prefer` desempata:
 * o maior valor vence (ex.: o que o aluno já respondeu, ou o do cargo escolhido).
 */
export function dedupeSharedExamItems<T extends Comparable>(
  questions: readonly T[],
  prefer: (question: T) => number = () => 0,
): T[] {
  const groups = validGroups(questions);
  const best = new Map<string, T>();
  for (const [key, members] of groups)
    best.set(
      key,
      members.reduce((top, member) => (prefer(member) > prefer(top) ? member : top)),
    );
  return questions.filter((question) => {
    const key = questionContentKey(question);
    return !key || !groups.has(key) || best.get(key) === question;
  });
}

/**
 * Grupos de itens iguais que contam como duplicata: pelo menos dois cadastros e nenhum cargo repetido.
 * Várias linhas iguais no MESMO cargo (ex.: PC Acre 2017, 11 a 19 linhas) não provam duplicata e ficam como estão.
 */
const groupsCache = new WeakMap<object, Map<string, unknown[]>>();
function validGroups<T extends Comparable>(questions: readonly T[]): Map<string, T[]> {
  const cached = groupsCache.get(questions);
  if (cached) return cached as Map<string, T[]>;
  const all = new Map<string, T[]>();
  for (const question of questions) {
    const key = questionContentKey(question);
    if (key) all.set(key, [...(all.get(key) ?? []), question]);
  }
  for (const [key, members] of all) {
    const careers = members.map((member) => member.career ?? "");
    if (members.length < 2 || careers.some((c) => !c) || new Set(careers).size !== members.length)
      all.delete(key);
  }
  groupsCache.set(questions, all);
  return all;
}

/**
 * Para cada referência (tabela:id), as referências dos demais cadastros do mesmo item.
 * Usado para que uma resposta dada a um cadastro valha para o outro.
 */
export function sharedItemSiblings(questions: readonly Comparable[]): Map<string, string[]> {
  const siblings = new Map<string, string[]>();
  for (const members of validGroups(questions).values()) {
    const refs = members.map((question) =>
      questionRef({
        id: question.id,
        source: question.source,
        ...(question.table ? { table: question.table } : {}),
      }),
    );
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
  for (const members of validGroups(catalog).values()) {
    const holder = members.find((member) => answered.has(keyOf(member)));
    if (!holder) continue;
    const value = answered.get(keyOf(holder))!;
    for (const member of members)
      if (!expanded.has(keyOf(member))) expanded.set(keyOf(member), value);
  }
  return expanded;
}
