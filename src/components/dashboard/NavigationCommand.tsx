import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CornerDownLeft, History, SearchX, ShieldCheck, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { activeNavigation, navigationKey } from '@/lib/dashboardNavigation';
import { navigationDetails, recentNavigation, searchNavigation } from '@/lib/navigationSearch';
import type { NavigationItem } from './DashboardNavigation';
import artwork from '@/assets/auth/carreiras-composicao.webp';
import '@/styles/navigation-command.css';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavigationItem[];
  userId: string;
  pathname: string;
  search: Record<string, unknown>;
  onNavigate: (item: NavigationItem) => void;
};
function readRecent(key: string): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]');
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string').slice(0, 3) : [];
  } catch { return []; }
}
export function NavigationCommand({ open, onOpenChange, items, userId, pathname, search, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const [recentKeys, setRecentKeys] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const storageKey = `norte:navigation-recent:${userId}`;
  useEffect(() => {
    if (!open) return;
    setQuery(''); setGroup('all'); setRecentKeys(readRecent(storageKey));
  }, [open, storageKey]);
  const current = activeNavigation(items, pathname, search);
  const groups = [...new Set(items.map(item => item.group))];
  const filtered = searchNavigation(items, query, group);
  const browse = !query.trim() && group === 'all';
  const recent = browse ? recentNavigation(items, recentKeys) : [];
  const recommendedPaths = ['/dashboard/question-trainer', '/dashboard/mock-exams', '/dashboard/edital'];
  const quick = browse ? items.filter(item => !item.soon && recommendedPaths.includes(item.href) && !recent.includes(item)) : [];
  const rest = browse ? filtered.filter(item => !recent.includes(item) && !quick.includes(item)) : filtered;
  const select = (item: NavigationItem) => {
    if (item.soon) return;
    const keys = [navigationKey(item), ...recentKeys.filter(key => key !== navigationKey(item))].slice(0, 3);
    try { localStorage.setItem(storageKey, JSON.stringify(keys)); } catch { /* Navigation also works without storage. */ }
    setRecentKeys(keys);
    onNavigate(item);
  };
  const clear = () => { setQuery(''); setGroup('all'); input.current?.focus(); };
  const row = (item: NavigationItem) => (
    <CommandItem key={navigationKey(item)} value={navigationKey(item)} disabled={!!item.soon} onSelect={() => select(item)} className="nav-command__item">
      <span className="nav-command__icon"><item.icon aria-hidden="true" /></span>
      <span className="nav-command__text"><strong>{item.label}</strong><span>{navigationDetails(item).description}</span></span>
      {item.soon ? <span className="nav-command__badge">Em breve</span> : current === item ? <span className="nav-command__badge">Atual</span> : <ArrowRight className="nav-command__arrow" aria-hidden="true" />}
    </CommandItem>
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="navigation-command" onOpenAutoFocus={event => {
        event.preventDefault(); previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        input.current?.focus();
      }} onCloseAutoFocus={event => { event.preventDefault(); if (previousFocus.current?.isConnected) previousFocus.current.focus({ preventScroll: true }); }}>
        <header className="nav-command__hero">
          <img src={artwork} alt="" aria-hidden="true" width={1440} height={600} />
          <div className="nav-command__hero-copy">
            <span><ShieldCheck size={14} aria-hidden="true" /> Central de navegação</span>
            <DialogTitle>Navegue com direção.</DialogTitle>
            <DialogDescription>Encontre conteúdo, ferramentas e seu próximo passo.</DialogDescription>
          </div>
          <DialogClose asChild><button type="button" className="nav-command__close" aria-label="Fechar busca"><X size={18} /></button></DialogClose>
        </header>
        <Command shouldFilter={false} className="nav-command" label="Áreas da plataforma">
          <div className="nav-command__search">
            <CommandInput ref={input} value={query} onValueChange={setQuery} placeholder="Busque: edital, questões…" aria-label="Buscar área, ferramenta ou conteúdo" />
            {query && <button type="button" onClick={() => { setQuery(''); input.current?.focus(); }} aria-label="Limpar termo da busca"><X size={16} /></button>}
          </div>
          <div className="nav-command__body">
            <nav className="nav-command__categories" aria-label="Filtrar por categoria">
              <span className="nav-command__category-title">Explorar por área</span>
              {['all', ...groups].map(category => <button key={category} type="button" aria-pressed={group === category} onClick={() => setGroup(category)}>
                <span>{category === 'all' ? 'Todas as áreas' : category}</span>
                <span aria-hidden="true">{category === 'all' ? items.length : items.filter(item => item.group === category).length}</span>
              </button>)}
            </nav>
            <div className="nav-command__results">
              <div className="nav-command__result-meta"><span>{query.trim() ? 'Resultados da busca' : group === 'all' ? 'Encontre seu próximo passo' : group}</span><span aria-live="polite" role="status">{filtered.length} {filtered.length === 1 ? 'área' : 'áreas'}</span></div>
              <CommandList className="nav-command__list">
                <CommandEmpty><SearchX size={28} aria-hidden="true" /><strong>Nenhum destino encontrado</strong><span>Tente outro termo ou escolha uma categoria.</span><button type="button" onClick={clear}>Limpar busca e filtros</button></CommandEmpty>
                {recent.length > 0 && <CommandGroup heading={<span><History size={12} aria-hidden="true" /> Acessos recentes</span>}>{recent.map(row)}</CommandGroup>}
                {quick.length > 0 && <CommandGroup heading="Atalhos para estudar">{quick.map(row)}</CommandGroup>}
                {groups.map(category => {
                  const entries = rest.filter(item => item.group === category);
                  return entries.length ? <CommandGroup key={category} heading={category}>{entries.map(row)}</CommandGroup> : null;
                })}
              </CommandList>
            </div>
          </div>
        </Command>
        <footer className="nav-command__footer"><span><kbd>↑</kbd><kbd>↓</kbd> navegar <kbd><CornerDownLeft size={11} /></kbd> abrir <kbd>Esc</kbd> fechar</span><span>Toque em uma área para abrir</span><span>NORTE CONCURSOS</span></footer>
      </DialogContent>
    </Dialog>
  );
}
