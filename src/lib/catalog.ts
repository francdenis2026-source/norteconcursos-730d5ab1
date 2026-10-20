export function isMissingQuestionTable(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? error.code : undefined;
  return code === "42P01" || code === "PGRST205";
}

/**
 * Lê uma tabela inteira em páginas. Depois da primeira página cheia, as seguintes são pedidas em
 * lotes paralelos (antes eram uma por vez: um acervo de dezenas de milhares de linhas esperava
 * dezenas de idas e voltas ao banco). A ordem é preservada e o resultado é o mesmo da leitura
 * sequencial: se alguma página vier incompleta, o lote para ali e a leitura segue de onde as linhas
 * realmente terminaram, página a página, como antes.
 */
export async function fetchAllRows<T>(
  fetchPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>,
  pageSize = 500,
  concurrency = 4,
): Promise<T[]> {
  const rows: T[] = [];
  let offset = 0;
  let parallel = false;
  for (;;) {
    const starts: number[] = Array.from(
      { length: parallel ? concurrency : 1 },
      (_, i) => offset + i * pageSize,
    );
    const results: Array<{ data: T[] | null; error: unknown }> = await Promise.all(
      starts.map((from: number) => fetchPage(from, from + pageSize - 1)),
    );
    parallel = false;
    for (let i = 0; i < results.length; i++) {
      const { data, error } = results[i]!;
      if (error) throw error;
      if (!data?.length) return rows;
      rows.push(...data);
      const next = starts[i]! + data.length;
      if (data.length < pageSize) {
        // Página curta: o servidor limitou o lote; continua daqui, sem pular linhas.
        offset = next;
        break;
      }
      offset = next;
      parallel = i === results.length - 1;
    }
  }
}

/** Retry without an optional support join only for schema compatibility errors. */
export function isMissingQuestionSupport(error: unknown): boolean {
  if (!error || typeof error !== "object" || !("code" in error)) return false;
  return ["PGRST200", "PGRST204", "42703"].includes(String(error.code));
}
