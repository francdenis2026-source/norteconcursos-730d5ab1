import { useSyncExternalStore } from "react";

export const LIGHT_INSIGNIA = "/media/brand/carreiras-marca-claro-hd.webp";
export const DARK_INSIGNIA = "/media/brand/distintivo-carreiras-hd.webp";
const listeners = new Set<() => void>();
let observer: MutationObserver | null = null;

// One observer follows the actual root theme, including manual and cross-tab changes.
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!observer) {
    observer = new MutationObserver(() => listeners.forEach((notify) => notify()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      observer?.disconnect();
      observer = null;
    }
  };
}
const snapshot = () =>
  document.documentElement.classList.contains("dark") ? DARK_INSIGNIA : LIGHT_INSIGNIA;
// Stable SSR output; hydration synchronizes with the head's initial theme before first app paint.
export const usePoliceInsigniaSource = () =>
  useSyncExternalStore(subscribe, snapshot, () => DARK_INSIGNIA);
