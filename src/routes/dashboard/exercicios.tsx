import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ClipboardCheck, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/button";
import { LockedState } from "@/components/dashboard/PageHero";
import { PracticeSession } from "@/components/library/MaterialPractice";
import { useStudyMaterialList } from "@/lib/studyMaterials";
import { libraryCollection, libraryDiscipline } from "@/lib/libraryOrganization";
import { materialLawSlug } from "@/lib/legalLibrary";
import { authoredMaterialPractice, materialTopic } from "@/lib/materialPractice";
import { shuffled, type Question } from "@/lib/questionFormat";
import "@/styles/student-internal-workspace-system.css";

export const Route = createFileRoute("/dashboard/exercicios")({
  component: MaterialExercisesPage,
  head: () => ({ meta: [{ title: "Exercícios dos materiais | Norte Concurso" }] }),
});

type MaterialRow = {
  id: string;
  slug: string;
  title: string;
  discipline: string;
  topic_label: string | null;
  quiz: { q: string; a: boolean; why: string }[] | null;
  practice_review: unknown;
  law_course_slug: string | null;
};

/** Exercícios autorais dos materiais de UMA disciplina, sem os que o aluno já respondeu no próprio material. */
function useDisciplineExercises(userId: string | undefined, slugs: string[], enabled: boolean) {
  return useQuery({
    queryKey: ["material-exercises", userId, slugs.join(",")],
    enabled: enabled && !!userId && slugs.length > 0,
    staleTime: 60_000,
    queryFn: async () => {
      const [materials, answered] = await Promise.all([
        supabase
          .from("study_materials")
          .select("id,slug,title,discipline,topic_label,quiz,practice_review,law_course_slug")
          .eq("content_status", "active")
          .in("slug", slugs),
        supabase.from("material_practice_responses").select("material_id,item_index").eq("user_id", userId!),
      ]);
      if (materials.error) throw materials.error;
      if (answered.error) throw answered.error;
      const done = new Set((answered.data ?? []).map((r) => `${r.material_id}:${r.item_index}`));
      const idBySlug = new Map<string, string>();
      const questions: Question[] = [];
      let hidden = 0;
      for (const m of (materials.data ?? []) as unknown as MaterialRow[]) {
        idBySlug.set(m.slug, m.id);
        const items = authoredMaterialPractice(
          m.quiz ?? [],
          {
            subject: m.discipline,
            topic: materialTopic(m.discipline, m.topic_label ?? m.title),
            ...(materialLawSlug(m) ? { law: materialLawSlug(m)! } : {}),
          },
          m.slug,
          m.topic_label ?? m.title,
          m.practice_review,
        );
        for (const q of items) {
          const index = Number(q.id.slice(q.id.lastIndexOf(":") + 1));
          if (done.has(`${m.id}:${index}`)) hidden += 1;
          else questions.push(q);
        }
      }
      return { questions, hidden, idBySlug };
    },
  });
}

function MaterialExercisesPage() {
  const { user, isLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const list = useStudyMaterialList(real);
  const [discipline, setDiscipline] = React.useState<string>("");
  const [session, setSession] = React.useState<{ questions: Question[]; id: number } | null>(null);

  const disciplines = React.useMemo(() => {
    const counts = new Map<string, string[]>();
    for (const m of list.data ?? []) {
      if (libraryCollection(m) === "enem") continue;
      const name = libraryDiscipline(m);
      counts.set(name, [...(counts.get(name) ?? []), m.slug]);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));
  }, [list.data]);
  const slugs = disciplines.find(([name]) => name === discipline)?.[1] ?? [];
  const exercises = useDisciplineExercises(user?.id, slugs, !!discipline);

  if (isLoading) return <Loader2 className="mx-auto mt-16 h-6 w-6 animate-spin" aria-label="Carregando" />;
  if (!real)
    return (
      <LockedState
        image="study-desk"
        title={<>Exercícios dos <em>materiais</em></>}
        description="Entre na sua conta para praticar os exercícios dos materiais de estudo."
      />
    );

  const idBySlug = exercises.data?.idBySlug;
  const materialIdOf = (q: Question) => {
    const slug = q.id.split(":").slice(1, -1).join(":");
    return idBySlug?.get(slug);
  };
  return (
    <div className="nc-student-workspace mx-auto max-w-3xl space-y-4 pb-10">
      <header className="workspace-banner">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Material didático</p>
        <h1 className="text-2xl font-black">Exercícios dos materiais</h1>
        <p className="text-sm text-muted-foreground">
          Os exercícios de fixação publicados nos materiais, reunidos por disciplina. O que você já
          respondeu no próprio material não aparece aqui, e nada disso altera o ranking.
        </p>
      </header>
      <label className="block space-y-1 text-sm font-semibold">
        Disciplina
        <select
          className="block min-h-11 w-full rounded-xl border bg-background px-3"
          value={discipline}
          onChange={(e) => {
            setDiscipline(e.target.value);
            setSession(null);
          }}
        >
          <option value="">Escolha uma disciplina…</option>
          {disciplines.map(([name, items]) => (
            <option key={name} value={name}>{name} ({items.length} materiais)</option>
          ))}
        </select>
      </label>
      {list.isPending && <p role="status" className="text-sm text-muted-foreground">Carregando materiais…</p>}
      {discipline && exercises.isPending && <p role="status" className="text-sm text-muted-foreground">Procurando exercícios…</p>}
      {exercises.isError && (
        <p role="alert" className="text-sm">
          Não foi possível carregar os exercícios. <Button variant="outline" size="sm" onClick={() => void exercises.refetch()}>Tentar novamente</Button>
        </p>
      )}
      {exercises.data && (
        <section className="surface-card space-y-3 p-4">
          <p role="status" className="text-sm">
            <strong>{exercises.data.questions.length}</strong> exercícios disponíveis em {discipline}
            {exercises.data.hidden > 0 && ` · ${exercises.data.hidden} já respondidos no material ficam de fora`}.
          </p>
          <Button
            disabled={!exercises.data.questions.length}
            onClick={() => setSession({ questions: shuffled(exercises.data!.questions).slice(0, 20), id: Date.now() })}
          >
            <ClipboardCheck className="mr-2 h-4 w-4" aria-hidden="true" />
            {session ? "Nova bateria" : `Iniciar ${Math.min(20, exercises.data.questions.length)} exercícios`}
          </Button>
          {!exercises.data.questions.length && (
            <p className="text-sm text-muted-foreground">
              Esta disciplina não tem exercícios novos liberados no momento. Matérias normativas só
              entram depois da revisão aprovada.
            </p>
          )}
          {session && (
            <PracticeSession
              key={session.id}
              questions={session.questions}
              userId={user.id}
              authoredKey=""
              materialIdForQuestion={materialIdOf}
            />
          )}
        </section>
      )}
    </div>
  );
}
