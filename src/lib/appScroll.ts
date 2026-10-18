export const MOBILE_APP_QUERY = "(max-width: 767px), (max-width: 1023px) and (hover: none) and (pointer: coarse)";

/** Pages scroll inside the mobile shell and in the document on desktop. */
export function scrollAppToTop(behavior: ScrollBehavior = "smooth") {
  const content = document.getElementById("dashboard-content");
  if (content && window.matchMedia(MOBILE_APP_QUERY).matches) {
    content.scrollTo({ top: 0, behavior });
  } else {
    window.scrollTo({ top: 0, behavior });
  }
}
