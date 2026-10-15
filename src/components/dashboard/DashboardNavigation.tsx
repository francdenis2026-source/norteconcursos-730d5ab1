import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export type NavigationItem = {
  group: string;
  label: string;
  icon: LucideIcon;
  href: string;
  adminOnly?: boolean;
  soon?: boolean;
};
export function navigationActive(pathname: string, href: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (href === "/dashboard/library" && path.startsWith("/dashboard/legal-course/")) return true;
  return href === "/dashboard" ? path === href : path === href || path.startsWith(`${href}/`);
}

export function DashboardNavigation({
  items,
  pathname,
  collapsed,
  hues,
  onNavigate,
}: {
  items: NavigationItem[];
  pathname: string;
  collapsed: boolean;
  hues: Record<string, string>;
  onNavigate?: () => void;
}) {
  const available = items.filter((item) => !item.soon);
  const groups = [...new Set(available.map((item) => item.group))];
  const activeGroup = available.find((item) => navigationActive(pathname, item.href))?.group;
  const [expanded, setExpanded] = useState<string[]>(() => [activeGroup ?? "Hoje"]);
  useEffect(() => {
    if (activeGroup) setExpanded([activeGroup]);
  }, [activeGroup]);
  function renderLink(item: NavigationItem, label = item.label) {
    const active = navigationActive(pathname, item.href);
    const link = (
      <Link
        to={item.href}
        className="app-nav__link"
        data-active={active}
        aria-current={active ? "page" : undefined}
        aria-label={collapsed ? label : undefined}
        onClick={onNavigate}
      >
        <span className="app-ico" data-hue={hues[item.group] ?? "gold"}>
          <item.icon aria-hidden="true" />
        </span>
        {!collapsed && <span className="app-nav__label">{item.label}</span>}
      </Link>
    );
    return collapsed ? (
      <Tooltip key={item.href}>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    ) : (
      <div key={item.href} className={item.adminOnly ? "app-nav__admin" : undefined}>
        {link}
      </div>
    );
  }
  return (
    <nav className="app-nav scroll-dark" aria-label="Menu principal">
      {groups.map((group) => {
        const entries = available.filter((item) => item.group === group);
        if (collapsed) {
          const representative =
            entries.find((item) => navigationActive(pathname, item.href)) ?? entries[0]!;
          return (
            <div key={group} className="app-nav__compact-group">
              {renderLink(representative, `${group}: ${representative.label}`)}
            </div>
          );
        }
        const open = expanded.includes(group);
        return (
          <section key={group} className="app-nav__section" aria-label={group}>
            <button
              type="button"
              className="app-nav__heading"
              aria-expanded={open}
              onClick={() => setExpanded(open ? [] : [group])}
            >
              <span>{group}</span>
              <ChevronDown aria-hidden="true" data-open={open} />
            </button>
            <div hidden={!open} className="app-nav__entries">
              {entries.map((item) => renderLink(item))}
            </div>
          </section>
        );
      })}
    </nav>
  );
}
