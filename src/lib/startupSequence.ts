export type StartupStage = 'preparing' | 'intro' | 'ready';

/** Route hydration and optional film form one irreversible startup sequence. */
export function createStartupSequence(homeDocument: boolean, reveal: () => void, publish: (stage: StartupStage) => void = () => {}) {
  let routeReady = false;
  let settled = !homeDocument;
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
    prepareIntro() { return homeDocument && !settled && !revealed; },
    showIntro() {
      if (settled || revealed) return false;
      publish('intro');
      return true;
    },
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
