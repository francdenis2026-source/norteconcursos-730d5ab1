export const MOBILE_APP_QUERY =
  "(max-width: 767px), (max-width: 1023px) and (hover: none) and (pointer: coarse)";

export function usesWorkspaceScroll() {
  return document.documentElement.dataset['workspaceFocus'] === 'true' || window.matchMedia(MOBILE_APP_QUERY).matches;
}

/** Pages scroll inside the mobile shell and in the document on desktop. */
export function scrollAppToTop(behavior: ScrollBehavior = "smooth") {
  const content = document.getElementById("dashboard-content");
  if (content && usesWorkspaceScroll()) {
    content.scrollTo({ top: 0, behavior });
  } else {
    window.scrollTo({ top: 0, behavior });
  }
}

/** Focus a study section inside the active scroll container, below the app header. */
export function scrollAppToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  const content = document.getElementById("dashboard-content");
  if (content && usesWorkspaceScroll()) {
    content.scrollTo({
      top: Math.max(
        0,
        content.scrollTop +
          target.getBoundingClientRect().top -
          content.getBoundingClientRect().top -
          12,
      ),
      behavior: "auto",
    });
  } else {
    const header = document.querySelector(".app-topbar");
    const offset = Math.max(0, header?.getBoundingClientRect().bottom ?? 0) + 12;
    window.scrollTo({
      top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset),
      behavior: "auto",
    });
  }
  target.focus({ preventScroll: true });
  return true;
}
