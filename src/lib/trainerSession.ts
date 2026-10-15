/** Keep the announced session within the available catalog and first-answer allowance. */
export function trainerSessionSize(
  available: number,
  requested: string | number,
  remaining?: number,
): number {
  const size = Number(requested);
  const desired = Number.isSafeInteger(size) && size > 0 ? Math.min(size, 50) : 20;
  const stock = Number.isFinite(available) ? Math.max(0, Math.floor(available)) : 0;
  const allowance =
    remaining === undefined
      ? stock
      : Number.isFinite(remaining)
        ? Math.max(0, Math.floor(remaining))
        : 0;
  return Math.min(stock, desired, allowance);
}
