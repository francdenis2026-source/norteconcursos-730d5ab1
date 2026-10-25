/** The navigation entry keeps the document's original URL across SPA route changes. */
export function claimDocumentIntro(
  root: Pick<HTMLElement, 'dataset'>,
  initialUrl: string,
): boolean {
  if (root.dataset['norteIntroConsumed'] === 'true') return false;
  root.dataset['norteIntroConsumed'] = 'true';
  try { return new URL(initialUrl).pathname === '/'; }
  catch { return false; }
}
