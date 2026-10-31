import { Link } from '@tanstack/react-router';
import { CalendarClock, Sparkles, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const sections = [
  { key: 'coach', href: '/dashboard/study-coach', label: 'Meu plano', detail: 'Rotina e disponibilidade', icon: Sparkles },
  { key: 'schedule', href: '/dashboard/cronograma', label: 'Agenda', detail: 'Tópicos e execução do dia', icon: CalendarClock },
  { key: 'diagnosis', href: '/dashboard/study-plan', label: 'Minha evolução', detail: 'Prioridades pelos resultados', icon: BarChart3 },
] as const;

export function StudyPlanningNav({ active }: { active: typeof sections[number]['key'] }) {
  return (
    <nav aria-label="Planejamento de estudos" className="study-planning-nav grid gap-2 rounded-2xl border bg-card p-3 sm:grid-cols-2 xl:grid-cols-3">
      {sections.map(({ key, href, label, detail, icon: Icon }) => (
        <Link key={key} to={href} data-control-tone={{coach:'gold',schedule:'sky',diagnosis:'violet'}[key]} aria-current={key === active ? 'page' : undefined}
          className={cn('flex items-start gap-3 rounded-xl border p-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary', key === active ? 'border-primary/30 bg-primary/10' : 'border-transparent hover:bg-muted')}>
          <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span><span className="block text-sm font-semibold">{label}</span><span className="mt-1 block text-xs text-muted-foreground">{detail}</span></span>
        </Link>
      ))}
    </nav>
  );
}
