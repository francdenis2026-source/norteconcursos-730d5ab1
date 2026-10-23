/** Lightweight bus so any page can tell the tactical crosshair "acerto" or "erro" happened,
 * without the crosshair needing to know about questions, quizzes or trainers. */
export type AimFeedbackType = "hit" | "miss";

const EVENT_NAME = "norte:aim-feedback";

export function dispatchAimFeedback(type: AimFeedbackType) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<AimFeedbackType>(EVENT_NAME, { detail: type }));
}

export function onAimFeedback(handler: (type: AimFeedbackType) => void) {
  if (typeof window === "undefined") return () => {};
  const listener = (event: Event) => handler((event as CustomEvent<AimFeedbackType>).detail);
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
