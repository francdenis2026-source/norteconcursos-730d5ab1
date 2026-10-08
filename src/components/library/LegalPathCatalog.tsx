import { Link } from "@tanstack/react-router";
import { useLegalCourses } from "@/lib/legalCourses";
import { LEGAL_GROUPS, LEGAL_LIBRARY, materialLawSlug } from "@/lib/legalLibrary";
import type { StudyMaterialSummary } from "@/lib/studyMaterials";

export function LegalPathCatalog({ userId, materials, searching }: { userId: string; materials: StudyMaterialSummary[]; searching: boolean }) {
  const { data, isPending, isError, refetch } = useLegalCourses(userId);
  if (isPending) return <p role="status" className="text-sm text-muted-foreground">Carregando percursos de legislação…</p>;
  if (isError) return <p role="alert" className="rounded-xl border p-4 text-sm">Não foi possível carregar os percursos. <button className="underline" onClick={() => void refetch()}>Tentar novamente</button></p>;
  const visible = (data ?? []).filter(course => materials.some(material => materialLawSlug(material) === course.slug));
  if (!visible.length) return null;
  return <section className="space-y-4" aria-label="Estudo por lei">
    <header className="rounded-2xl border bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Leitura · aplicação · recuperação ativa</p>
      <h2 className="mt-2 text-xl font-bold">Uma lei por vez. Um caminho completo de estudo.</h2>
      <p className="mt-2 text-sm text-muted-foreground">Comece pelo guia, resolva os casos, responda aos cartões sem consultar e aprofunde a leitura dos dispositivos oficiais. Atualizações e vigência acompanham cada material. Confira também o recorte do seu edital.</p>
    </header>
    {LEGAL_GROUPS.map((group, index) => {
      const courses = visible.filter(course => LEGAL_LIBRARY.find(entry => entry.slug === course.slug)?.group === group);
      if (!courses.length) return null;
      return <details key={group} open={searching || index === 0} className="rounded-2xl border bg-card p-5">
        <summary className="cursor-pointer text-lg font-bold">{group} <span className="text-sm font-normal text-muted-foreground">· {courses.length} diplomas</span></summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{courses.map(course => {
          const related = materials.filter(material => materialLawSlug(material) === course.slug && material.slug !== course.material_slug);
          return <article key={course.id} className="flex flex-col rounded-xl border p-4">
            <h3 className="font-semibold">{course.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{course.overview.current_units} dispositivos vigentes · {course.overview.chapters.length} blocos de leitura</p>
            <Link to="/dashboard/library/$slug" params={{slug: course.material_slug}} className="mt-4 rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground">Estudar: guia, exemplos e flashcards</Link>
            <Link to="/dashboard/legal-course/$slug" params={{slug:course.slug}} className="mt-3 text-sm underline">Leitura integral e revisão por dispositivo</Link>
            {related.length > 0 && <details className="mt-3 text-sm"><summary className="cursor-pointer">Aprofundamentos ({related.length})</summary><ul className="mt-2 space-y-2">{related.map(material => <li key={material.slug}><Link to="/dashboard/library/$slug" params={{slug:material.slug}} className="underline">{material.title}</Link></li>)}</ul></details>}
          </article>;
        })}</div>
      </details>;
    })}
  </section>;
}
