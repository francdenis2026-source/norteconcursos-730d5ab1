import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useLegalCourses } from "@/lib/legalCourses";

export function LegalPathCatalog({ userId }: { userId: string }) {
  const { data, isPending, isError, refetch } = useLegalCourses(userId);
  const [search, setSearch] = useState("");
  if (isPending) return <p role="status" className="text-sm text-muted-foreground">Carregando percursos de legislação…</p>;
  if (isError) return <p role="alert" className="rounded-xl border p-4 text-sm">Não foi possível carregar os percursos. <button className="underline" onClick={() => void refetch()}>Tentar novamente</button></p>;
  if (!data?.length) return null;
  return <section className="rounded-2xl border bg-card p-5" aria-label="Percursos de legislação">
    <h2 className="text-xl font-bold">Legislação: da leitura à revisão</h2>
    <p className="mt-2 text-sm text-muted-foreground">35 percursos com texto oficial organizado por dispositivos, recuperação ativa, questões de aplicação e revisões programadas. Escolha a lei e acompanhe o que leu e o que precisa retomar.</p>
    <details className="mt-4"><summary className="cursor-pointer font-semibold">Explorar os {data.length} percursos</summary>
    <label className="mt-3 block text-sm">Buscar lei ou concurso<input type="search" value={search} onChange={event => setSearch(event.target.value)} className="mt-1 w-full rounded-lg border bg-background p-2" /></label>
    <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {data.filter(course => `${course.title} ${course.overview.contest}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())).map(course => <Link key={course.id} to="/dashboard/legal-course/$slug" params={{ slug: course.slug }} className="rounded-xl border p-3 transition-colors hover:border-primary focus-visible:outline focus-visible:outline-primary">
        <strong className="block text-sm">{course.title}</strong>
        <span className="mt-1 block text-xs text-muted-foreground">{course.overview.current_units} dispositivos para leitura · {course.overview.chapters.length} blocos</span>
      </Link>)}
    </div>
    </details>
  </section>;
}
