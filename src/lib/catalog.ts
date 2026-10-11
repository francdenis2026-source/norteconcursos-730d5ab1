export function isMissingQuestionTable(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? error.code : undefined;
  return code === "42P01" || code === "PGRST205";
}

export async function fetchAllRows<T>(
  fetchPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>,
  pageSize = 500,
): Promise<T[]> {
  const rows: T[] = [];
  for (let offset = 0; ; offset += pageSize) {
    const { data, error } = await fetchPage(offset, offset + pageSize - 1);
    if (error) throw error;
    if (!data?.length) return rows;
    rows.push(...data);
    // Keep going even after a short page: the server may cap below pageSize.
    // Advance by rows actually returned rather than skipping unseen records.
    offset += data.length - pageSize;
  }
}
