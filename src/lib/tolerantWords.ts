// Casamento de palavras tolerante, compartilhado pelas buscas da plataforma: aceita plural/singular,
// um erro de digitação e ignora palavras de frase natural ("quero a lei sobre armas").
export const SEARCH_FILLER = new Set([
  "de", "da", "do", "das", "dos", "n", "no", "numero", "num", "e", "a", "o", "as", "os", "em",
  "na", "nas", "nos", "para", "por", "com", "sobre", "que", "qual", "quais", "como", "quero",
  "preciso", "uma", "um", "ao", "pela", "pelo", "artigo", "art", "tema", "assunto", "estudar",
  "ver", "buscar", "procurar", "achar", "encontrar", "aprender", "materia", "conteudo",
]);

const plain = (text: string) =>
  text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Um erro de digitação: letra a mais, a menos, trocada ou duas letras invertidas. */
export function withinOneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (i === a.length && i === b.length) return true;
  const same = (x: string, y: string) => x.slice(i) === y.slice(i);
  return (
    a.slice(i + 1) === b.slice(i + 1) || // troca
    a.slice(i + 1) === b.slice(i) || // sobra em a
    a.slice(i) === b.slice(i + 1) || // sobra em b
    (a.length === b.length &&
      (same(a, b) ||
        (a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2))))
  );
}

/** Palavra digitada casa com uma palavra do texto: igual, plural/singular, parte dela ou com um erro. */
export function wordMatches(token: string, words: string[], haystack: string): boolean {
  if (token.length <= 3) return words.includes(token);
  if (haystack.includes(token)) return true;
  if (token.length < 5) return false;
  return words.some((w) => {
    if (w.length < 4) return false;
    let k = 0;
    while (k < token.length && k < w.length && token[k] === w[k]) k++;
    return k >= Math.max(4, Math.min(token.length, w.length) - 1) || (w.length >= 5 && withinOneEdit(token, w));
  });
}

/** Busca tolerante: todas as palavras significativas casam (ou metade, com 2+ palavras, se `partial`). */
export function looseMatch(text: string, query: string, partial = false): boolean {
  const all = plain(query).split(" ").filter(Boolean);
  const tokens = all.filter((t) => !(SEARCH_FILLER.has(t) && all.length > 1));
  if (!tokens.length) return false;
  const haystack = plain(text);
  const words = haystack.split(" ");
  const hit = tokens.filter((t) => wordMatches(t, words, haystack)).length;
  return partial ? tokens.length >= 2 && hit / tokens.length >= 0.5 : hit === tokens.length;
}
