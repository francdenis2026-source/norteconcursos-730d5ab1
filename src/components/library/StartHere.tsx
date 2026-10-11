import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLegalCourses, useLegalExplanationCoverage } from "@/lib/legalCourses";

/** Leis mais cobradas em concursos policiais, na ordem em que o candidato deve estudar. */
const TOP_LAWS = ["codigo-penal", "codigo-processo-penal", "organizacoes", "drogas", "maria-penha", "lep", "eca", "abuso", "armas", "transito"];
const LAST_KEY = "norte:legal-last";

export type LastLegal = { slug: string; art: string; label: string; title: string };
export const rememberLegal = (v: LastLegal) => {
  try { localStorage.setItem(LAST_KEY, JSON.stringify(v)); } catch { /* sem armazenamento */ }
};

/** "Comece por aqui": continuar de onde parou + as leis que mais caem, com o quanto já está explicado. */
export function StartHere({ userId }: { userId: string }) {
  const courses = useLegalCourses(userId).data;
  const coverage = useLegalExplanationCoverage(userId).data;
  const [last, setLast] = useState<LastLegal | null>(null);
  useEffect(() => {
    try { setLast(JSON.parse(localStorage.getItem(LAST_KEY) ?? "null") as LastLegal | null); } catch { setLast(null); }
  }, []);
  const top = TOP_LAWS.flatMap((slug) => {
    const c = courses?.find((x) => x.slug === slug);
    return c ? [{ c, cov: coverage?.find((x) => x.course_slug === slug) }] : [];
  });
  if (!last && !top.length) return null;
  return (
    <section aria-label="Comece por aqui" className="space-y-3 rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-5 dark:border-indigo-500/30 dark:from-indigo-950/30 dark:via-transparent dark:to-sky-950/20">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-300">Comece por aqui</p>
        <h2 className="text-xl font-black">O que estudar agora</h2>
      </div>
      {last && (
        <Link to="/dashboard/legal-course/$slug" params={{ slug: last.slug }} search={{ art: last.art } as never}
          className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white shadow transition hover:brightness-105">
          <span className="text-2xl" aria-hidden="true">▶️</span>
          <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-white/85">Continue de onde parou</span><span className="block truncate font-black">{last.title} · {last.label}</span></span>
          <span className="font-bold">Continuar →</span>
        </Link>
      )}
      {top.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-bold">📚 Leis mais cobradas em concursos policiais</p>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {top.map(({ c, cov }, i) => (
              <li key={c.slug}>
                <Link to="/dashboard/legal-course/$slug" params={{ slug: c.slug }}
                  className="flex h-full items-center gap-3 rounded-xl border bg-card p-3 transition hover:border-primary hover:shadow">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-indigo-600 text-xs font-black text-white">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{c.title.replace(/ — leitura atualizada$/, "")}</span>
                    <span className="block text-xs text-muted-foreground">{cov && cov.explained > 0 ? `💡 ${cov.explained} de ${cov.total_units} artigos explicados` : cov ? `${cov.total_units} dispositivos · leitura oficial` : "Abrir"}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
