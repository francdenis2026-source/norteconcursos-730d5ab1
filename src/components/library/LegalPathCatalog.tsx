import { Link } from "@tanstack/react-router";
import { BookOpen, ChevronDown, Layers, ArrowUpRight } from "lucide-react";
import { useLegalCourses } from "@/lib/legalCourses";
import { LEGAL_LIBRARY, materialLawSlug } from "@/lib/legalLibrary";
import { compareLawChronology, compareMaterialRevision, LAW_CHRONOLOGY, lawChronologyLabel } from "@/lib/legalChronology";
import { libraryTone } from "@/lib/libraryOrganization";
import type { StudyMaterialSummary } from "@/lib/studyMaterials";
import { matchingLibraryLaws, libraryLawResultTitle } from "@/lib/librarySearch";
import { LibrarySearchMatch } from "./LibrarySearchMatch";

export function LegalPathCatalog({ userId, materials, query = "", searching = false }: { userId: string; materials: StudyMaterialSummary[]; searching: boolean; query?: string }) {
  const { data, isPending, isError, refetch } = useLegalCourses(userId);
  const lawMatches = matchingLibraryLaws(query);
  if (isPending) return <p role="status" className="text-sm text-muted-foreground">Carregando percursos de legislação…</p>;
  if (isError) return <p role="alert" className="rounded-xl border p-4 text-sm">Não foi possível carregar os percursos. <button className="cursor-pointer underline" onClick={() => void refetch()}>Tentar novamente</button></p>;
  const courses = (data ?? []).filter(course => materials.some(material => materialLawSlug(material) === course.slug)).sort(compareLawChronology);
  if (!courses.length) return null;
  const groups = [...new Set(courses.map(c => LEGAL_LIBRARY.find(e => e.slug === c.slug)?.group ?? "Outras normas"))];
  return <section className="space-y-5" aria-label="Estudo por lei">
    <header className="library-section-heading">
      <span className="library-heading-icon"><BookOpen aria-hidden="true" size={21}/></span>
      <div><p className="library-eyebrow">LEITURA E APLICAÇÃO</p><h2>Leis organizadas por área</h2><p>Dentro de cada área, da alteração mais recente à mais antiga. Abra um guia para estudar exemplos e fixar.</p></div>
      <span className="library-total">{courses.length} diplomas</span>
    </header>
    {groups.map((group, index) => {
      const entries = courses.filter(c => (LEGAL_LIBRARY.find(e => e.slug === c.slug)?.group ?? "Outras normas") === group);
      return <details key={group} open={searching || groups.length === 1 || index === 0} className={`library-subject library-tone-${libraryTone(group)}`}>
        <summary className="library-subject__heading">
          <span className="library-subject__icon"><Layers aria-hidden="true" size={20}/></span>
          <span className="min-w-0 flex-1"><h3>{group}</h3><span>{entries.length} {entries.length === 1 ? "diploma" : "diplomas"} · do mais atualizado ao mais antigo</span></span>
          <span className="library-subject__badge">Leis e guias</span>
          <ChevronDown aria-hidden="true" size={19} className="library-subject__chevron"/>
        </summary>
        <div className="library-law-grid">{entries.map(course => {
          const related = materials.filter(material => materialLawSlug(material) === course.slug && material.slug !== course.material_slug).sort(compareMaterialRevision);
          const chronology = LAW_CHRONOLOGY[course.slug];
          const matched = lawMatches.includes(course.slug);
          return <article key={course.id} className={`library-law-card ${matched ? "library-law-match" : ""}`}>
            <div className="library-law-card__top"><span className="library-law-tag">{matched ? "Correspondência da busca" : "Texto oficial + prática"}</span><BookOpen aria-hidden="true" size={17}/></div>
            <h4><LibrarySearchMatch text={libraryLawResultTitle(course.slug)} query={query}/></h4>
            {matched && <span className="sr-only">Lei correspondente à busca</span>}
            <p className="library-law-date">{lawChronologyLabel(course.slug)}</p>
            <p className="library-law-meta">{course.overview.current_units} dispositivos vigentes · {course.overview.chapters.length} blocos</p>
            <Link to="/dashboard/library/$slug" params={{slug: course.material_slug}} className="library-study-button">Estudar: guia, exemplos e flashcards<ArrowUpRight aria-hidden="true" size={16}/></Link>
            <Link to="/dashboard/legal-course/$slug" params={{slug: course.slug}} className="library-reading-link">Leitura integral e revisão por dispositivo</Link>
            {chronology && <a href={chronology.source_url} target="_blank" rel="noopener noreferrer" className="library-source-link">Conferir ato oficial desta data</a>}
            {related.length > 0 && <details className="library-deep-links"><summary>Aprofundamentos ({related.length})</summary><ul>{related.map(material => <li key={material.slug}><Link to="/dashboard/library/$slug" params={{slug: material.slug}}><LibrarySearchMatch text={material.title} query={query}/></Link></li>)}</ul></details>}
          </article>;
        })}</div>
      </details>;
    })}
  </section>;
}
