let anchor: { server: number; monotonic: number } | null = null;
const monotonicNow = () => typeof performance === 'undefined' ? Date.now() : performance.now();
/** Anchor to the server, then advance without relying on changes to the device clock. */
export function synchronizeClock(server: number, roundTrip = 0, monotonic = monotonicNow()) {
  if (!Number.isFinite(server) || !Number.isFinite(roundTrip) || roundTrip < 0 || roundTrip > 30_000) return;
  anchor = { server: server + roundTrip / 2, monotonic };
}
export function platformNow(monotonic = monotonicNow()): number {
  return anchor ? anchor.server + Math.max(0, monotonic - anchor.monotonic) : Date.now();
}
export function platformDate(): Date { return new Date(platformNow()); }
