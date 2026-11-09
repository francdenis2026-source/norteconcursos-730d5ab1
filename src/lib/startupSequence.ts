export type StartupStage = 'preparing' | 'ready';

/** Reveal the application as soon as its route has hydrated; no intro media blocks startup. */
export function createStartupSequence(_homeDocument: boolean, reveal: () => void, publish: (stage: StartupStage) => void = () => {}) {
  let routeReady = false;
  // The cinematic intro was removed: the loader ends as soon as the route hydrates.
  let settled = true;
  let revealed = false;
  const complete = () => {
    if (revealed || !routeReady || !settled) return;
    revealed = true;
    publish('ready');
    reveal();
  };
  return {
    routeReady(pathname: string) {
      routeReady = true;
      if (pathname !== '/') settled = true;
      complete();
    },
    prepareIntro() { return false; },
    showIntro() { return false; },
    settleIntro() { settled = true; complete(); },
    forceReveal() { settled = true; routeReady = true; complete(); },
  };
}

const sequences = new WeakMap<Document, ReturnType<typeof createStartupSequence>>();

export function finishInitialLoading() {
  if (typeof document === 'undefined' || document.documentElement.dataset['norteBoot'] === 'ready') return;
  document.documentElement.dataset['norteBoot'] = 'ready';
  document.documentElement.dataset['norteStartupStage'] = 'ready';
  window.dispatchEvent(new Event('norte:boot-ready'));
}

export function documentStartup() {
  let sequence = sequences.get(document);
  if (!sequence) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    let homeDocument = false;
    try { homeDocument = new URL(navigation?.name ?? window.location.href).pathname === '/'; } catch { /* reveal without film */ }
    sequence = createStartupSequence(homeDocument, finishInitialLoading, stage => {
      document.documentElement.dataset['norteStartupStage'] = stage;
    });
    sequences.set(document, sequence);
  }
  // A watchdog or error boundary may already have revealed the application.
  if (document.documentElement.dataset['norteBoot'] === 'ready') sequence.forceReveal();
  return sequence;
}
