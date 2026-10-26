/** Synchronous event preserves the click's user activation for the Fullscreen API. */
export const READING_WORKSPACE_EVENT = "norte:reading-workspace";
export const READING_FULLSCREEN_EXIT = "norte:reading-fullscreen-exit";
export function setReadingWorkspace(active: boolean) {
  document.dispatchEvent(new CustomEvent(READING_WORKSPACE_EVENT, { detail: { active } }));
}
