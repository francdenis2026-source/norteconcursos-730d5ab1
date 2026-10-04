import * as React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, BookOpenCheck, BrainCircuit, CalendarDays, CheckCircle2, ChevronDown, GraduationCap, Layers, ListChecks,
  PenLine, PlayCircle, Sparkles, Timer,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { EnemVideos } from "@/components/enem/EnemVideos";
import { COMPETENCIAS, ENEM_AREAS, ENEM_FACTS, type EnemArea } from "@/data/enem";
import { useMediaCatalog } from "@/lib/mediaStore";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/enem")({
  head: () => ({ meta: [{ title: "Área ENEM | Norte Concurso" }] }),
  component: EnemPage,
});

const KEY = "norte_enem_check";

function useChecks() {
  const [state, setState] = React.useState<Record<string, true>>({});
  React.useEffect(() => {
    try { setState(JSON.parse(localStorage.getItem(KEY) ?? "{}") as Record<string, true>); } catch { setState({}); }
  }, []);
  const toggle = (k: string) =>
    setState((prev) => {
      const next = { ...prev };
      if (next[k]) delete next[k]; else next[k] = true;
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* sem armazenamento */ }
      return next;
    });
  return { state, toggle };
}

/** Quantas questões de ENEM existem no banco (0 enquanto ainda não foram importadas). */
function useEnemQuestionCount() {
  const [n, setN] = React.useState<number | null>(null);
  React.useEffect(() => {
    let alive = true;
    void Promise.all(
      ["curated_question_catalog", "official_exam_questions"].map((table) =>
        supabase.from(table).select("id", { count: "exact", head: true }).ilike("contest_name", "%enem%").eq("content_status", "active"),
      ),
    ).then((r) => alive && setN(r.reduce((s, x) => s + (x.count ?? 0), 0))).catch(() => alive && setN(0));
    return () => { alive = false; };
  }, []);
  return n;
}

function EnemPage() {
  const [tab, setTab] = React.useState("visao");
  const [subject, setSubject] = React.useState("Matemática");
  const { catalog } = useMediaCatalog();
  const checks = useChecks();
  const questions = useEnemQuestionCount();

  const allTopics = ENEM_AREAS.flatMap((a) => a.subjects.flatMap((s) => s.topics.map((t) => `${s.name}|${t}`)));
  const done = allTopics.filter((k) => checks.state[k]).length;
  const videoCount = Object.entries(catalog.topicVideos).filter(([k]) => k.startsWith("ENEM")).reduce((n, [, t]) => n + Object.values(t).reduce((m, l) => m + l.length, 0), 0);
  const watch = (name: string) => { setSubject(name); setTab("videos"); };

  return (
    <div className="space-y-6">
      <PageHero
        image="journey"
        kicker="ENEM"
        icon={GraduationCap}
        title={<>Área <em>ENEM</em></>}
        description="Estude por área do conhecimento, assista a videoaulas gratuitas, treine a redação e acompanhe seu checklist."
        actions={<Button asChild className="hero-btn-primary gap-2"><Link to="/dashboard/study-tools"><Timer className="h-4 w-4" /> Sessão de foco</Link></Button>}
      >
        <div className="page-hero__stats">
          <HeroStat icon={Layers} label="Áreas" value={4} />
          <HeroStat icon={PlayCircle} label="Videoaulas" value={videoCount} />
          <HeroStat icon={ListChecks} label="Assuntos revisados" value={`${done}/${allTopics.length}`} />
          <HeroStat icon={BrainCircuit} label="Questões ENEM" value={questions ?? "—"} />
        </div>
      </PageHero>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="visao" className="gap-1.5"><Layers className="h-4 w-4 !text-sky-500" /> Visão geral</TabsTrigger>
          <TabsTrigger value="videos" className="gap-1.5"><PlayCircle className="h-4 w-4 !text-rose-500" /> Videoaulas</TabsTrigger>
          <TabsTrigger value="redacao" className="gap-1.5"><PenLine className="h-4 w-4 !text-orange-500" /> Redação</TabsTrigger>
          <TabsTrigger value="questoes" className="gap-1.5"><BrainCircuit className="h-4 w-4 !text-emerald-500" /> Questões</TabsTrigger>
          <TabsTrigger value="checklist" className="gap-1.5"><ListChecks className="h-4 w-4 !text-violet-500" /> Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="visao" className="mt-5 space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {ENEM_FACTS.map((f) => (
              <div key={f.label} className="rounded-xl border bg-card p-4">
                <p className="text-xs font-semibold text-muted-foreground">{f.label}</p>
                <p className="mt-1 text-2xl font-black">{f.value}</p>
                <p className="text-xs text-muted-foreground">{f.hint}</p>
              </div>
            ))}
          </div>
          <p className="flex items-start gap-2 text-xs text-muted-foreground"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0" /> Dia 1: Linguagens, Ciências Humanas e Redação. Dia 2: Ciências da Natureza e Matemática. Datas e regras oficiais: confira sempre o edital do INEP.</p>
          <div className="grid gap-4 lg:grid-cols-2">
            {ENEM_AREAS.map((area) => <AreaCard key={area.id} area={area} state={checks.state} onWatch={watch} />)}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-5">
          <EnemVideos subject={subject} onSubject={setSubject} />
        </TabsContent>

        <TabsContent value="redacao" className="mt-5 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><PenLine className="h-5 w-5" /> As 5 competências da redação</CardTitle>
              <CardDescription>Cada competência vale de 0 a 200 pontos, somando 1000. Use como roteiro de revisão antes de entregar o texto.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {COMPETENCIAS.map((c) => (
                <div key={c.n} className="rounded-xl border p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-400/20 font-mono text-sm font-bold text-amber-600">C{c.n}</span>
                    <p className="text-sm font-semibold leading-snug">{c.title}</p>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {c.tips.map((t) => <li key={t} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {t}</li>)}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="gap-2"><Link to="/dashboard/essays"><PenLine className="h-4 w-4" /> Escrever no caderno de redação</Link></Button>
            <Button variant="outline" className="gap-2" onClick={() => watch("Redação")}><PlayCircle className="h-4 w-4" /> Ver videoaulas de redação</Button>
          </div>
        </TabsContent>

        <TabsContent value="questoes" className="mt-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg"><BrainCircuit className="h-5 w-5" /> Questões do ENEM</CardTitle>
              <CardDescription>Treino com correção imediata, usando o mesmo treinador da plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions && questions > 0 ? (
                <>
                  <p className="text-sm">Há <b>{questions.toLocaleString("pt-BR")}</b> questões do ENEM disponíveis no banco.</p>
                  <Button asChild className="gap-2"><Link to="/dashboard/question-trainer" search={{ contest: "ENEM" }}>Treinar questões do ENEM <ArrowRight className="h-4 w-4" /></Link></Button>
                </>
              ) : (
                <div className="rounded-xl border border-dashed p-6 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-amber-500" />
                  <p className="mt-2 font-semibold">Banco de questões do ENEM em preparação</p>
                  <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">As provas anteriores do INEP estão sendo cadastradas com gabarito e área. Quando estiverem prontas, o botão de treino aparece aqui e o filtro “Concurso: ENEM” funciona no treinador.</p>
                </div>
              )}
              <p className="text-xs text-muted-foreground">Enquanto isso, use as videoaulas e o checklist para organizar os estudos.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="mt-5">
          <Checklist state={checks.state} toggle={checks.toggle} done={done} total={allTopics.length} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const HUE_BAR: Record<EnemArea["hue"], string> = {
  rose: "bg-rose-500", orange: "bg-orange-500", emerald: "bg-emerald-500", sky: "bg-sky-500", violet: "bg-violet-500", teal: "bg-teal-500", gold: "bg-amber-400",
};

function AreaCard({ area, state, onWatch }: { area: EnemArea; state: Record<string, true>; onWatch: (s: string) => void }) {
  const { catalog } = useMediaCatalog();
  return (
    <Card className="overflow-hidden">
      <div className={cn("h-1.5", HUE_BAR[area.hue])} />
      <CardHeader className="pb-3">
        <CardTitle className="text-base leading-snug">{area.name}</CardTitle>
        <CardDescription className="flex flex-wrap gap-2">
          <Badge variant="secondary">Dia {area.day}</Badge>
          <Badge variant="outline">{area.questions} questões</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {area.subjects.map((s) => {
          const done = s.topics.filter((t) => state[`${s.name}|${t}`]).length;
          const pct = Math.round((100 * done) / s.topics.length);
          const videos = Object.values(catalog.topicVideos[s.videoKey] ?? {}).reduce((n, l) => n + l.length, 0);
          return (
            <div key={s.name} className="flex items-center gap-3 rounded-xl border p-3">
              <SubjectIcon subject={s.name} className="h-8 w-8 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate font-semibold">{s.name}</span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{done}/{s.topics.length}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"><div className={cn("h-full rounded-full transition-all", HUE_BAR[area.hue])} style={{ width: `${pct}%` }} /></div>
              </div>
              {videos > 0 && (
                <Button size="sm" variant="outline" className="shrink-0 gap-1.5" onClick={() => onWatch(s.name === "Artes, Educação Física e Tecnologias" ? "Língua Portuguesa" : s.name)}>
                  <PlayCircle className="h-4 w-4" /> {videos}
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function Checklist({ state, toggle, done, total }: { state: Record<string, true>; toggle: (k: string) => void; done: number; total: number }) {
  const pct = total ? Math.round((100 * done) / total) : 0;
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-wrap items-center justify-between gap-2 text-lg">
          <span className="flex items-center gap-2"><BookOpenCheck className="h-5 w-5" /> Checklist de assuntos</span>
          <Badge variant="outline">{done} de {total} · {pct}%</Badge>
        </CardTitle>
        <CardDescription>Assuntos mais cobrados em cada matéria. Marque o que já estudou. Fica salvo neste navegador.</CardDescription>
        <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-500 transition-all" style={{ width: `${pct}%` }} /></div>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        {ENEM_AREAS.flatMap((a) => a.subjects).map((s) => {
          const n = s.topics.filter((t) => state[`${s.name}|${t}`]).length;
          return (
            <details key={s.name} className="group rounded-xl border bg-card open:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center gap-2.5 px-3.5 py-3 [&::-webkit-details-marker]:hidden">
                <SubjectIcon subject={s.name} className="h-7 w-7" />
                <span className="flex-1 text-sm font-semibold">{s.name}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums", n === s.topics.length ? "bg-emerald-500/15 text-emerald-600" : "bg-muted text-muted-foreground")}>{n}/{s.topics.length}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="space-y-1.5 border-t px-3.5 py-3">
                {s.topics.map((t) => (
                  <label key={t} className="flex cursor-pointer items-start gap-2.5 text-sm">
                    <input type="checkbox" checked={!!state[`${s.name}|${t}`]} onChange={() => toggle(`${s.name}|${t}`)} className="mt-0.5 h-4 w-4 shrink-0 accent-amber-500" />
                    <span className={cn(state[`${s.name}|${t}`] && "text-muted-foreground line-through")}>{t}</span>
                  </label>
                ))}
              </div>
            </details>
          );
        })}
      </CardContent>
    </Card>
  );
}
