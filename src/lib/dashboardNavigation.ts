export interface NavigationTarget {
  href: string;
  search?: Record<string, string>;
}
export function navigationActive(pathname: string, href: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (href === "/dashboard/library" && path.startsWith("/dashboard/legal-course/")) return true;
  // Trilhas e materiais de disciplina pertencem à área de disciplinas.
  if (href === "/dashboard/disciplinas" && path === "/dashboard/trilhas") return true;
  return href === "/dashboard" ? path === href : path === href || path.startsWith(`${href}/`);
}
export function navigationKey(item: NavigationTarget) {
  return item.href + JSON.stringify(item.search ?? {});
}
/** A tab-specific destination takes precedence over its parent page. */
export function activeNavigation<T extends NavigationTarget>(
  items: T[],
  pathname: string,
  rawSearch: Record<string, unknown> = {},
) {
  // Os artigos de lei (legal-course) pertencem à coleção de legislação do menu.
  const search =
    pathname.startsWith("/dashboard/legal-course/") && rawSearch["collection"] === undefined
      ? { ...rawSearch, collection: "laws" }
      : rawSearch;
  return items
    .filter(
      (item) =>
        navigationActive(pathname, item.href) &&
        Object.entries(item.search ?? {}).every(
          ([key, value]) => String(search[key] ?? "") === value,
        ),
    )
    .sort(
      (a, b) =>
        Object.keys(b.search ?? {}).length - Object.keys(a.search ?? {}).length ||
        b.href.length - a.href.length,
    )[0];
}
