import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useLegalCourses } from "@/lib/legalCourses";
import { LEGAL_GROUPS, LEGAL_LIBRARY, materialLawSlug } from "@/lib/legalLibrary";
import { compareLawChronology, compareMaterialRevision, LAW_CHRONOLOGY, lawChronologyLabel } from "@/lib/legalChronology";
import type { StudyMaterialSummary } from "@/lib/studyMaterials";

export function LegalPathCatalog({ userId, materials }: { userId: string; materials: StudyMaterialSummary[]; searching: boolean }) {
  const { data, isPending, isError, refetch } = useLegalCourses(userId);
  const [area, setArea] = useState("all");
  if (isPending) return <p role="status" className="text-sm text-muted-foreground">Carregando percursos de legislação…</p>;
  if (isError) return <p role="alert" className="rounded-xl border p-4 text-sm">Não foi possível carregar os percursos. <button className="underline" onClick={() => void refetch()}>Tentar novamente</button></p>;
  const visible = (data ?? []).filter(course => materials.some(material => materialLawSlug(material) === course.slug)).sort(compareLawChronology);
  if (!visible.length) return null;
  const courses = visible.filter(course => area === "all" || LEGAL_LIBRARY.find(entry => entry.slug === course.slug)?.group === area);
  return <section className="space-y-4" aria-label="Estudo por lei">
    <header className="rounded-2xl border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Mais recente → mais antiga</p>
      <h2 className="mt-2 text-xl font-bold">Legislação em ordem cronológica de atualização</h2>
      <p className="mt-2 text-sm text-muted-foreground">A ordem considera a data do ato alterador mais recente identificado no texto oficial; na ausência de alteração, usa a data do diploma original. A data de conferência do material é indicada separadamente. Confira a vigência e o recorte do seu edital.</p>
      <label className="mt-4 block text-sm font-medium">Área da lei
        <select value={area} onChange={event => setArea(event.target.value)} className="mt-1 block w-full rounded-lg border bg-background p-2 sm:max-w-md">
          <option value="all">Todas as áreas · ordem cronológica</option>
          {LEGAL_GROUPS.map(group => <option key={group} value={group}>{group}</option>)}
        </select>
      </label>
    </header>
    <p className="text-sm text-muted-foreground">{courses.length} diplomas neste filtro · do mais atualizado ao mais antigo.</p>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{courses.map(course => {
      const related = materials.filter(material => materialLawSlug(material) === course.slug && material.slug !== course.material_slug).sort(compareMaterialRevision);
      const chronology = LAW_CHRONOLOGY[course.slug];
      const group = LEGAL_LIBRARY.find(entry => entry.slug === course.slug)?.group;
      return <article key={course.id} className="flex flex-col rounded-xl border bg-card p-4">
        <p className="mb-2 text-xs font-semibold text-primary">{group}</p>
        <h3 className="font-semibold">{course.title}</h3>
        <p className="mt-2 text-sm font-medium">{lawChronologyLabel(course.slug)}</p>
        {chronology && <a href={chronology.source_url} target="_blank" rel="noopener noreferrer" className="mt-1 text-xs underline">Conferir ato oficial desta data</a>}
        <p className="mt-2 text-xs text-muted-foreground">{course.overview.current_units} dispositivos vigentes · {course.overview.chapters.length} blocos de leitura</p>
        <Link to="/dashboard/library/$slug" params={{slug: course.material_slug}} className="mt-4 rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground">Estudar: guia, exemplos e flashcards</Link>
        <Link to="/dashboard/legal-course/$slug" params={{slug:course.slug}} className="mt-3 text-sm underline">Leitura integral e revisão por dispositivo</Link>
        {related.length > 0 && <details className="mt-3 text-sm"><summary className="cursor-pointer">Aprofundamentos ({related.length})</summary><ul className="mt-2 space-y-2">{related.map(material => <li key={material.slug}><Link to="/dashboard/library/$slug" params={{slug:material.slug}} className="underline">{material.title}</Link></li>)}</ul></details>}
      </article>;
    })}</div>
    {!courses.length && <p className="rounded-xl border p-4 text-sm">Nenhuma lei desta área combina com a busca. Selecione outra área ou todas as áreas.</p>}
  </section>;
}
