import { useQuery } from "@tanstack/react-query";
import { LockKeyhole, BookOpen, Info } from "lucide-react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useLegalCourses } from "@/lib/legalCourses";
import { supabase } from "@/integrations/supabase/client";
import { crimeStudyTarget } from "@/lib/penalCalc";
import type { CrimePolicy } from "@/lib/penalPolicy";
import { legalStudyCaveat } from "@/lib/legalStudyCaveats";
import { acreDate } from "@/lib/acreTime";
import { isStudySourceUrl } from "@/lib/studySourceUrl";
import { cn } from "@/lib/utils";

export function PenalCrimeContext({ policy }: { policy: CrimePolicy }) {
  const { user } = useAuthStatus();
  const courses = useLegalCourses(user?.id !== "demo-user" ? user?.id : undefined);
  const target = crimeStudyTarget(policy.crimeId);
  const course = courses.data?.find((c) => c.slug === target?.slug && !!c.syllabus_topic_id);
  const reading = useQuery({
    queryKey: ["penal-crime-reading", user?.id, course?.id, target?.art],
    enabled: !!course && !!target,
    staleTime: 300_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("legal_course_units")
        .select("label,body_text")
        .eq("course_id", course!.id)
        .eq("unit_key", target!.art)
        .eq("content_status", "current")
        .abortSignal(AbortSignal.timeout(15_000))
        .maybeSingle();
      if (error) throw error;
      return data as { label: string; body_text: string } | null;
    },
  });
  const notes = [
    target && legalStudyCaveat(target.slug, target.art),
    policy.classification === "hediondo" || policy.classification === "equiparado"
      ? legalStudyCaveat("hediondos", "art-2")
      : null,
    ...(target?.slug === "armas"
      ? [legalStudyCaveat("armas", "art-14"), legalStudyCaveat("armas", "art-21")]
      : []),
    ...(target?.slug === "drogas"
      ? [legalStudyCaveat("drogas", "art-44"), legalStudyCaveat("drogas", "art-33")]
      : []),
  ]
    .filter((note) => !!note)
    .filter(
      (note, index, all) => all.findIndex((candidate) => candidate.title === note.title) === index,
    );
  return (
    <section
      className="min-w-0 rounded-2xl border bg-card p-5 lg:col-span-2"
      aria-label="Enquadramento e vedações do crime"
    >
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-bold">Enquadramento e limites jurídicos</h2>
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-bold",
            policy.classification === "comum"
              ? "border-sky-300 bg-sky-100 text-sky-950 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100"
              : "border-amber-300 bg-amber-100 text-amber-950 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100",
          )}
        >
          {policy.classificationLabel}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6">{policy.scope}</p>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        {policy.classificationNote} Síntese do perfil cadastrado: confira a data do fato e a lei
        mais benéfica. A pena em anos não define sozinha a elegibilidade.
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        Abra uma indicação para ler as condições. Saída temporária (“saidinha”) e permissão de saída
        com escolta são diferentes; monitoração depende das hipóteses legais e da decisão judicial.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {policy.rules.map((rule) => (
          <details
            key={rule.title}
            className={cn(
              "rounded-xl border-l-4 p-4",
              rule.state === "vedado"
                ? "border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-100"
                : rule.state === "nao-avaliado"
                  ? "border-slate-300 bg-slate-100 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  : "border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-100",
            )}
          >
            <summary className="cursor-pointer list-none">
              <span className="flex items-center gap-2 text-sm font-bold">
                {rule.state === "vedado" ? (
                  <LockKeyhole aria-hidden className="h-4 w-4" />
                ) : (
                  <Info aria-hidden className="h-4 w-4" />
                )}
                {rule.title}
              </span>
              <span className="mt-2 block text-xs font-semibold">{rule.label}</span>
              <span className="mt-2 block text-[11px] opacity-80">Ver condições e fundamento</span>
            </summary>
            <p className="mt-2 text-xs leading-5">{rule.explanation}</p>
            <p className="mt-3 text-xs font-medium">{rule.reference}</p>
          </details>
        ))}
      </div>
      <details className="mt-5 rounded-xl border p-4">
        <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <BookOpen aria-hidden className="h-4 w-4" />
          Ler a redação jurídica cadastrada e as ressalvas
        </summary>
        {courses.isError && (
          <p role="alert" className="mt-3 text-sm">
            Não foi possível consultar a lei.{" "}
            <button className="underline" onClick={() => void courses.refetch()}>
              Tentar novamente
            </button>
          </p>
        )}
        {reading.isLoading && (
          <p role="status" className="mt-3 text-sm">
            Carregando o dispositivo…
          </p>
        )}
        {reading.isError && (
          <p role="alert" className="mt-3 text-sm">
            Não foi possível carregar o dispositivo.{" "}
            <button className="underline" onClick={() => void reading.refetch()}>
              Tentar novamente
            </button>
          </p>
        )}
        {reading.data && course && (
          <>
            <h3 className="mt-4 font-semibold">
              {course.title} · {reading.data.label}
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Conferência registrada:{" "}
              {course.checked_at
                ? acreDate(course.checked_at).toLocaleDateString("pt-BR", {
                    timeZone: "America/Rio_Branco",
                  })
                : "não informada"}
              . O artigo completo pode conter modalidades diferentes da seleção.
            </p>
            {policy.needsJudicialReading && (
              <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
                O texto legislativo abaixo deve ser lido com as ressalvas jurisprudenciais desta
                seção. Trechos literais sobre prisão, fiança ou regime podem ter sido afastados pelo
                STF.
              </p>
            )}
            <blockquote className="mt-3 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-xl border bg-muted/40 p-4 text-sm leading-7">
              {reading.data.body_text}
            </blockquote>
            {isStudySourceUrl(course.source_url) && (
              <a
                className="mt-3 inline-block text-sm text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
                href={course.source_url}
              >
                Conferir texto oficial
              </a>
            )}
          </>
        )}
        {!reading.isLoading && !reading.isError && !reading.data && (
          <p className="mt-3 text-sm text-muted-foreground">
            Texto não disponível para esta seleção. Identifique a lei e consulte a fonte antes de
            utilizar um perfil manual.
          </p>
        )}
        <div className="mt-4 space-y-4">
          {notes.map((note) => (
            <article key={note.title} className="text-sm">
              <h3 className="font-semibold">{note.title}</h3>
              <p className="mt-1 leading-6 text-muted-foreground">{note.explanation}</p>
              {isStudySourceUrl(note.source) && (
                <a
                  href={note.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary underline"
                >
                  Fonte da ressalva
                </a>
              )}
            </article>
          ))}
        </div>
      </details>
    </section>
  );
}
