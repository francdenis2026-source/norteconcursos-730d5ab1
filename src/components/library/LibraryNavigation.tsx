import { BookOpen, Scale, Shapes, ShieldCheck, Search, SlidersHorizontal, X } from "lucide-react";
import { LIBRARY_AREAS, libraryArea, type LibraryArea } from "@/lib/libraryOrganization";
import type { StudyMaterialSummary } from "@/lib/studyMaterials";

const icons = { all: BookOpen, legislation: ShieldCheck, law: Scale, general: Shapes };
type Props = {
  items: StudyMaterialSummary[]; area: LibraryArea; onArea: (area: LibraryArea) => void;
  query: string; onQuery: (query: string) => void;
  discipline: string; onDiscipline: (value: string) => void; disciplines: [string, StudyMaterialSummary[]][];
  topic: string; onTopic: (value: string) => void; topics: string[];
  contest: string; onContest: (value: string) => void; contests: string[];
  count: number; searchingContent: boolean; onReset: () => void;
};
export function LibraryNavigation(p: Props) {
  const filtered = p.area !== "all" || p.query.trim() !== "" || p.discipline !== "all" || p.topic !== "all" || p.contest !== "all";
  return <section className="library-navigator" aria-label="Pesquisar e organizar a biblioteca">
    <header className="library-navigator__heading">
      <div><p className="library-eyebrow">SEU ACERVO DE ESTUDO</p><h2>Encontre seu próximo assunto</h2><p>Escolha uma área e refine por disciplina. Cada conteúdo no seu lugar.</p></div>
      <span className="library-total"><BookOpen aria-hidden="true" size={16}/>{p.items.length} materiais</span>
    </header>
    <div className="library-area-grid" role="group" aria-label="Áreas de estudo">
      {LIBRARY_AREAS.map(a => {
        const Icon = icons[a.id];
        const count = a.id === "all" ? p.items.length : p.items.filter(item => libraryArea(item) === a.id).length;
        return <button key={a.id} type="button" aria-pressed={p.area === a.id} onClick={() => p.onArea(a.id)} className={`library-area library-tone-${a.tone}`}>
          <span className="library-area__icon"><Icon aria-hidden="true" size={21}/></span>
          <span className="library-area__content"><strong>{a.title}</strong><span>{a.description}</span></span>
          <span className="library-area__count">{count}</span>
        </button>;
      })}
    </div>
    <div className="library-searchbar">
      <Search aria-hidden="true" size={20}/>
      <label className="sr-only" htmlFor="library-search">Pesquisar conteúdo, assunto ou lei</label>
      <input id="library-search" type="search" value={p.query} onChange={e => p.onQuery(e.target.value)} placeholder="Busque um assunto ou lei: CPP, Maria da Penha, 11.340…" />
      {p.query && <button type="button" onClick={() => p.onQuery("")} aria-label="Limpar busca"><X aria-hidden="true" size={18}/></button>}
    </div>
    <div className="library-refine">
      <span className="library-refine__label"><SlidersHorizontal aria-hidden="true" size={16}/>Refinar seleção</span>
      <label>Disciplina<select value={p.discipline} onChange={e => p.onDiscipline(e.target.value)}><option value="all">Todas as disciplinas desta área</option>{p.disciplines.map(([name, list]) => <option key={name} value={name}>{name} ({list.length})</option>)}</select></label>
      <label>Assunto<select value={p.topic} onChange={e => p.onTopic(e.target.value)}><option value="all">Todos os assuntos</option>{p.topics.map(name => <option key={name} value={name}>{name}</option>)}</select></label>
      {p.contests.length > 1 && <label>Concurso<select value={p.contest} onChange={e => p.onContest(e.target.value)}><option value="all">Todos os concursos</option>{p.contests.map(name => <option key={name} value={name}>{name}</option>)}</select></label>}
    </div>
    <footer className="library-navigator__footer">
      <p role="status" aria-live="polite"><strong>{p.count}</strong> {p.count === 1 ? "material encontrado" : "materiais encontrados"}{p.searchingContent ? " · pesquisando também nos textos…" : ""}</p>
      {filtered ? <button type="button" onClick={p.onReset}><X aria-hidden="true" size={14}/>Limpar filtros</button> : <span>Busca por nome ou número, com ou sem acentos</span>}
    </footer>
  </section>;
}
