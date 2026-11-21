import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ClipboardCheck, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Button } from "@/components/ui/button";
import { LockedState } from "@/components/dashboard/PageHero";
import { ExerciseCard } from "@/components/library/ExerciseCard";
import { useQuestionCatalog } from "@/hooks/useQuestionCatalog";
import { mergeExercises, exerciseDisciplines, exerciseTopics, filterExercises } from "@/lib/exerciseCenter";
import { useStudyMaterialList } from "@/lib/studyMaterials";
import { libraryCollection, libraryDiscipline } from "@/lib/libraryOrganization";
import { materialLawSlug } from "@/lib/legalLibrary";
import { authoredMaterialPractice, materialTopic } from "@/lib/materialPractice";
import type { Question } from "@/lib/questionFormat";
import "@/styles/student-internal-workspace-system.css";

export const Route = createFileRoute("/dashboard/exercicios")({
  component: MaterialExercisesPage,
  head: () => ({ meta: [{ title: "Central de exercícios | Norte Concurso" }] }),
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
  const catalog = useQuestionCatalog(user?.id, real);
  const [discipline, setDiscipline] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [index, setIndex] = React.useState(0);

  // Disciplinas: as do banco de questões somadas às dos materiais (sem repetir nomes).
  const disciplines = React.useMemo(() => {
    const names = new Set(exerciseDisciplines(catalog.catalog).map((d) => d.name));
    for (const m of list.data ?? []) if (libraryCollection(m) !== "enem") names.add(libraryDiscipline(m));
    return [...names].sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [catalog.catalog, list.data]);
  const slugs = React.useMemo(
    () => (list.data ?? []).filter((m) => libraryCollection(m) !== "enem" && libraryDiscipline(m) === discipline).map((m) => m.slug),
    [list.data, discipline],
  );
  const authored = useDisciplineExercises(user?.id, slugs, !!discipline);

  const items = React.useMemo(() => {
    // O subject bruto do material pode diferir do nome da disciplina: normaliza para o escolhido.
    const own = (authored.data?.questions ?? []).map((q) => ({ ...q, subject: discipline }));
    return mergeExercises(own, filterExercises(catalog.catalog, discipline, ""));
  }, [authored.data, catalog.catalog, discipline]);
  const topics = React.useMemo(() => exerciseTopics(items, discipline), [items, discipline]);
  const visible = React.useMemo(() => filterExercises(items, discipline, topic), [items, discipline, topic]);
  const current = visible[Math.min(index, Math.max(0, visible.length - 1))];

  if (isLoading) return <Loader2 className="mx-auto mt-16 h-6 w-6 animate-spin" aria-label="Carregando" />;
  if (!real)
    return (
      <LockedState
        image="study-desk"
        title={<>Central de <em>exercícios</em></>}
        description="Entre na sua conta para praticar os exercícios da plataforma."
      />
    );

  const loading = !!discipline && (authored.isPending || catalog.loading);
  const selectClass = "block min-h-11 w-full rounded-xl border bg-background px-3";
  return (
    <div className="nc-student-workspace w-full space-y-4 pb-10">
      <header className="workspace-banner">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Material didático</p>
        <h1 className="text-2xl font-black">Central de exercícios</h1>
        <p className="text-sm text-muted-foreground">
          Escolha a disciplina e o assunto, tente resolver e abra a resposta com o passo a passo quando quiser.
          Nada aqui altera o ranking.
        </p>
      </header>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block space-y-1 text-sm font-semibold">
          Disciplina
          <select
            className={selectClass}
            value={discipline}
            onChange={(e) => {
              setDiscipline(e.target.value);
              setTopic("");
              setIndex(0);
            }}
          >
            <option value="">Escolha uma disciplina…</option>
            {disciplines.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
        <label className="block space-y-1 text-sm font-semibold">
          Assunto
          <select
            className={selectClass}
            value={topic}
            disabled={!discipline || loading}
            onChange={(e) => {
              setTopic(e.target.value);
              setIndex(0);
            }}
          >
            <option value="">Todos os assuntos</option>
            {topics.map((t) => <option key={t.name} value={t.name}>{t.name} ({t.count})</option>)}
          </select>
        </label>
      </div>
      {(list.isPending || loading) && <p role="status" className="text-sm text-muted-foreground">Procurando exercícios…</p>}
      {(authored.isError || catalog.error) && (
        <p role="alert" className="text-sm">
          Não foi possível carregar todos os exercícios.{" "}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void authored.refetch();
              catalog.reload();
            }}
          >
            Tentar novamente
          </Button>
        </p>
      )}
      {!discipline && <p className="text-sm text-muted-foreground">Escolha uma disciplina para começar.</p>}
      {discipline && !loading && !visible.length && (
        <p role="status" className="text-sm text-muted-foreground">
          Não há exercícios liberados para esta seleção no momento.
        </p>
      )}
      {current && (
        <section className="surface-card p-4">
          <ExerciseCard
            question={current}
            position={visible.indexOf(current) + 1}
            total={visible.length}
            onPrev={() => setIndex((i) => Math.max(0, i - 1))}
            onNext={() => setIndex((i) => Math.min(visible.length - 1, i + 1))}
          />
        </section>
      )}
    </div>
  );
}
