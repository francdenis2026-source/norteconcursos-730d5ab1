import { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { activeNavigation, navigationKey } from '@/lib/dashboardNavigation';
import { studentSections, studentGroupLabel, studentNavigationSegment } from '@/lib/studentNavigation';
import type { NavigationItem } from './DashboardNavigation';

/** Secondary destinations live in the workspace, never in expanding sidebar groups. */
export function StudentSectionNavigation({ items, pathname, search }: { items: NavigationItem[]; pathname: string; search: Record<string, unknown> }) {
  const current = activeNavigation(items, pathname, search);
  const section = studentSections(items).find(section => section.group === current?.group);
  const nav = useRef<HTMLElement>(null);
  const activeKey = current ? navigationKey(current) : '';
  useEffect(() => {
    const node = nav.current;
    const active = node?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!node || !active) return;
    // Reveal a selected chip without scrolling the page or resetting content restoration.
    if (active.offsetLeft < node.scrollLeft) node.scrollLeft = active.offsetLeft - 12;
    else if (active.offsetLeft + active.offsetWidth > node.scrollLeft + node.clientWidth)
      node.scrollLeft = active.offsetLeft + active.offsetWidth - node.clientWidth + 12;
  }, [activeKey]);
  // Planning pages already render StudyPlanningNav. ENEM has its own workspace.
  if (!section || section.group === 'Planejamento' || section.entries.length < 2) return null;
  return <nav ref={nav} className="workspace-section-nav no-print" aria-label={`${studentGroupLabel(section.group)}: páginas da área`}>
    {section.entries.map((item, index) => <span className="workspace-section-nav__item" key={navigationKey(item)}>
      {studentNavigationSegment(item.href) && studentNavigationSegment(item.href) !== studentNavigationSegment(section.entries[index - 1]?.href ?? '') && <span className="workspace-section-nav__segment">{studentNavigationSegment(item.href)}</span>}
      <Link to={item.href} search={item.search ?? {}} aria-current={navigationKey(item) === activeKey ? 'page' : undefined}>
      <item.icon aria-hidden="true" /><span>{item.label}</span>
    </Link></span>)}
  </nav>;
}
