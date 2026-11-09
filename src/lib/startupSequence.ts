export type StartupStage = 'preparing' | 'ready';

/** Reveal the application as soon as its route has hydrated; no intro media blocks startup. */
export function createStartupSequence(_homeDocument: boolean, reveal: () => void, publish: (stage: StartupStage) => void = () => {}) {
  // Single state object: avoids stale closure bindings across hot updates.
  const state = { routeReady: false, revealed: false };
  const complete = () => {
    if (state.revealed || !state.routeReady) return;
    state.revealed = true;
    publish('ready');
    reveal();
  };
  return {
    routeReady(pathname: string) {
      void pathname;
      state.routeReady = true;
      complete();
    },
    prepareIntro() { return false; },
    showIntro() { return false; },
    settleIntro() { complete(); },
    forceReveal() { state.routeReady = true; complete(); },
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
