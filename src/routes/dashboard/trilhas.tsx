import React from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/dashboard/PageHero";
import { GlossaryText } from "@/components/library/GlossaryText";
import { TRACKS, type Track, type TrackLesson } from "@/data/tracks";
import { cn } from "@/lib/utils";
import { useAuthStatus } from "@/hooks/useDashboard";
import { ContentSearchResults } from "@/components/library/ContentSearchResults";

export const Route = createFileRoute("/dashboard/trilhas")({
  component: TracksPage,
  validateSearch: (s: Record<string, unknown>): { t?: string | undefined; l?: string | undefined } => ({
    t: typeof s["t"] === "string" ? s["t"] : undefined,
    l: typeof s["l"] === "string" ? s["l"] : undefined,
  }),
  head: () => ({ meta: [{ title: "Cursos por disciplina | Norte Concursos" }] }),
});

const storeKey = (slug: string) => `trilha-feitas:${slug}`;
function loadDone(slug: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(storeKey(slug)) ?? "[]") as string[];
  } catch {
    return [];
  }
}
function saveDone(slug: string, ids: string[]) {
  try {
    localStorage.setItem(storeKey(slug), JSON.stringify(ids));
  } catch {
    /* sem armazenamento: o progresso só vale nesta visita */
  }
}

function Quiz({ lesson }: { lesson: TrackLesson }) {
  const [picked, setPicked] = React.useState<Record<number, boolean>>({});
  return (
    <section aria-label="Teste rápido" className="space-y-3">
      <h3 className="text-base font-semibold">Teste rápido: certo ou errado?</h3>
      {lesson.quiz.map((item, i) => {
        const p = picked[i];
        return (
          <div key={item.q} className="rounded-lg border p-3 text-sm">
            <p className="leading-6"><GlossaryText text={item.q} /></p>
            <div className="mt-2 flex gap-2">
              {([true, false] as const).map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  disabled={p !== undefined}
                  onClick={() => setPicked((s) => ({ ...s, [i]: v }))}
                  className={cn("rounded-md border px-3 py-1.5 text-sm", p === v && (v === item.a ? "border-emerald-500 bg-emerald-500/10" : "border-rose-500 bg-rose-500/10"))}
                >
                  {v ? "Certo" : "Errado"}
                </button>
              ))}
            </div>
            {p !== undefined && (
              <p className="mt-2 rounded-md bg-muted p-2 text-xs leading-5" role="status">
                <strong>{p === item.a ? "Acertou." : "Não foi dessa vez."}</strong> A afirmação está {item.a ? "certa" : "errada"}. {item.why}
              </p>
            )}
          </div>
        );
      })}
    </section>
  );
}

/** Liga a aula ao restante da plataforma: artigos de lei sobre o tema, dicionário e questões. */
function Complement({ lesson }: { lesson: TrackLesson }) {
  const { user } = useAuthStatus();
  return (
    <section className="space-y-3" aria-label="Material complementar">
      <h3 className="text-base font-semibold">Aprofunde na plataforma</h3>
      <div className="flex flex-wrap gap-2 text-sm">
        <Link to="/dashboard/library" search={{ q: lesson.title, back: undefined }} className="rounded-md border px-3 py-1.5 hover:bg-muted/50">Biblioteca de leis</Link>
        <Link to="/dashboard/dicionario" search={{ q: lesson.title } as never} className="rounded-md border px-3 py-1.5 hover:bg-muted/50">Dicionário</Link>
        <Link to="/dashboard/question-bank" className="rounded-md border px-3 py-1.5 hover:bg-muted/50">Questões</Link>
        <Link to="/dashboard/study-tools" className="rounded-md border px-3 py-1.5 hover:bg-muted/50">Foco e revisão</Link>
      </div>
      {user && user.id !== "demo-user" && <ContentSearchResults query={lesson.title} userId={user.id} />}
    </section>
  );
}

type LessonProps = { lesson: TrackLesson; done: boolean; toggleDone: () => void; onNext?: () => void; onPrev?: () => void };

function Lesson({ lesson, onNext, onPrev, done, toggleDone }: LessonProps) {
  return (
    <article className="surface-card space-y-5 p-5 sm:p-7">
      <header className="border-b pb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{lesson.group}</p>
        <h2 className="mt-1 text-2xl font-bold">{lesson.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">Edital: {lesson.edital}</p>
      </header>
      <section className="space-y-2">
        <h3 className="text-sm font-semibold">Em palavras simples</h3>
        <p className="leading-7"><GlossaryText text={lesson.simples} /></p>
      </section>
      <section className="space-y-2">
        <h3 className="text-sm font-semibold">Pontos-chave</h3>
        <ul className="list-disc space-y-1 pl-5 leading-7">{lesson.pontos.map((p) => <li key={p}><GlossaryText text={p} /></li>)}</ul>
      </section>
      <section className="rounded-xl border-l-4 border-l-emerald-500 bg-card p-4">
        <h3 className="text-sm font-semibold">Exemplo prático</h3>
        <p className="mt-1 leading-7"><GlossaryText text={lesson.exemplo} /></p>
      </section>
      <section className="rounded-xl border-l-4 border-l-amber-500 bg-card p-4">
        <h3 className="text-sm font-semibold">Atenção: onde o candidato erra</h3>
        <ul className="mt-1 list-disc space-y-1 pl-5 leading-7">{lesson.atencao.map((p) => <li key={p}><GlossaryText text={p} /></li>)}</ul>
      </section>
      <Complement lesson={lesson} />
      <Quiz lesson={lesson} key={`q-${lesson.id}`} />
      <footer className="flex flex-wrap items-center gap-2 border-t pt-4">
        <Button variant={done ? "outline" : "default"} onClick={toggleDone}>
          <CheckCircle2 className="mr-1 h-4 w-4" />
          {done ? "Aula concluída" : "Marcar como concluída"}
        </Button>
        <span className="ml-auto flex gap-2">
          {onPrev && <Button variant="ghost" onClick={onPrev}><ChevronLeft className="h-4 w-4" />Anterior</Button>}
          {onNext && <Button variant="outline" onClick={onNext}>Próxima<ChevronRight className="h-4 w-4" /></Button>}
        </span>
      </footer>
    </article>
  );
}

function TracksPage() {
  const { t, l } = Route.useSearch();
  const navigate = useNavigate({ from: "/dashboard/trilhas" });
  const track: Track = TRACKS.find((x) => x.slug === t) ?? TRACKS[0]!;
  const [done, setDone] = React.useState<string[]>([]);
  React.useEffect(() => setDone(loadDone(track.slug)), [track.slug]);
  const index = Math.max(0, track.lessons.findIndex((x) => x.id === l));
  const lesson = track.lessons[index]!;
  const go = (i: number) => void navigate({ search: { t: track.slug, l: track.lessons[i]!.id }, replace: true });
  const toggle = () => {
    const next = done.includes(lesson.id) ? done.filter((x) => x !== lesson.id) : [...done, lesson.id];
    setDone(next);
    saveDone(track.slug, next);
  };
  const groups = [...new Set(track.lessons.map((x) => x.group))];
  const pct = Math.round((done.length / track.lessons.length) * 100);
  return (
    <div className="space-y-5 pb-8">
      <PageHero
        image="study-desk"
        kicker="Cursos por disciplina"
        icon={GraduationCap}
        title={track.title}
        description={`${track.source}. Aulas curtas, com exemplo, pegadinhas e teste rápido, na ordem do edital.`}
      />
      <div className="flex flex-wrap items-center gap-2">
        {TRACKS.map((x) => (
          <Button key={x.slug} size="sm" variant={x.slug === track.slug ? "default" : "outline"} onClick={() => void navigate({ search: { t: x.slug }, replace: true })}>
            {x.discipline}
          </Button>
        ))}
        <Badge variant="secondary" className="ml-auto">{done.length}/{track.lessons.length} aulas · {pct}%</Badge>
      </div>
      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="surface-card space-y-3 p-4 lg:sticky lg:top-4 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto" aria-label="Aulas da trilha">
          {groups.map((g) => (
            <div key={g}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{g}</p>
              <ul className="space-y-1">
                {track.lessons.map(
                  (x, i) =>
                    x.group === g && (
                      <li key={x.id}>
                        <button
                          type="button"
                          onClick={() => go(i)}
                          aria-current={i === index ? "true" : undefined}
                          className={cn("flex w-full items-start gap-2 rounded-lg border p-2 text-left text-sm", i === index ? "border-primary bg-primary/5" : "hover:bg-muted/50")}
                        >
                          <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", done.includes(x.id) ? "text-emerald-600" : "text-muted-foreground/40")} aria-hidden />
                          <span>{x.title}</span>
                        </button>
                      </li>
                    ),
                )}
              </ul>
            </div>
          ))}
        </aside>
        <Lesson
          key={lesson.id}
          lesson={lesson}
          done={done.includes(lesson.id)}
          toggleDone={toggle}
          {...(index < track.lessons.length - 1 ? { onNext: () => go(index + 1) } : {})}
          {...(index > 0 ? { onPrev: () => go(index - 1) } : {})}
        />
      </div>
      <Card>
        <CardContent className="p-4 text-xs text-muted-foreground">
          Material de estudo elaborado a partir do conteúdo programático oficial. Em caso de dúvida, confira a norma ou o pronunciamento citado.
        </CardContent>
      </Card>
    </div>
  );
}
