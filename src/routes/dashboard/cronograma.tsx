import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft, BookOpen, CalendarClock, Layers, Loader2, Mic, NotebookPen, Plus, Sparkles, Target, Trash2, Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockedState, PageHero } from "@/components/dashboard/PageHero";
import { MODELOS_CRONOGRAMA, type ModeloCronograma } from "@/data/cronogramaModelos";
import {
  accuracy, buildWeek, discStats, isGenericDiscipline, EMPTY_PROGRESS, nextTopic, topicDone,
  type CronoConfig, type CronoDisc, type TopicProgress,
} from "@/lib/cronograma";
import { confirmDialog } from "@/lib/confirm";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/cronograma")({ component: CronogramaPage });

interface Plan {
  id: string;
  name: string;
  model_id: string | null;
  custom: boolean;
  exam_date: string | null;
  config: CronoConfig;
}

const DAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const uid = () => Math.random().toString(36).slice(2, 8);
const fmtH = (min: number) => `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, "0") : ""}`;

function discsFromModel(m: ModeloCronograma): CronoDisc[] {
  return m.disciplinas.map((d, i) => ({
    id: `d${i}`, nome: d.nome, peso: d.peso, topicos: d.topicos.map((t, j) => ({ id: `d${i}.${j}`, t })),
  }));
}

/** Catálogo para o cronograma personalizado: todas as disciplinas dos modelos, sem repetir. */
const CATALOGO = (() => {
  const map = new Map<string, ModeloCronograma["disciplinas"][number]>();
  for (const m of MODELOS_CRONOGRAMA)
    for (const d of m.disciplinas) if (!isGenericDiscipline(d.nome) && (!map.has(d.nome) || d.topicos.length > map.get(d.nome)!.topicos.length)) map.set(d.nome, d);
  return [...map.values()].sort((a, b) => a.nome.localeCompare(b.nome));
})();

function CronogramaPage() {
  const { user, isLoading } = useAuthStatus();
  const real = !!user && user.id !== "demo-user";
  const [plans, setPlans] = React.useState<Plan[] | null>(null);
  const [openId, setOpenId] = React.useState<string | "new" | null>(null);

  const load = React.useCallback(async () => {
    const { data } = await supabase.from("cronograma_plans").select("*").order("updated_at", { ascending: false });
    setPlans((data ?? []) as Plan[]);
  }, []);
  React.useEffect(() => {
    if (!isLoading && real) void load();
  }, [isLoading, real, load]);

  if (isLoading || (real && !plans))
    return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>;
  if (!real)
    return <LockedState image="study-desk" title={<>Meu <em>cronograma</em></>} description="Entre na sua conta para montar e acompanhar o seu cronograma de estudos por edital." />;

  const open = plans!.find((p) => p.id === openId);
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero image="study-desk" size="sm" kicker="Hoje" icon={CalendarClock} title={<>Meu <em>cronograma</em></>}
        description="Escolha um modelo de edital ou monte o seu. A semana se ajusta ao que você já estudou e ao seu desempenho." />
      {openId === "new" ? (
        <NewPlan userId={user!.id} onBack={() => setOpenId(null)} onCreated={async (id) => { await load(); setOpenId(id); }} />
      ) : open ? (
        <PlanView key={open.id} plan={open} userId={user!.id} onBack={() => setOpenId(null)}
          onChange={(p) => setPlans((all) => all!.map((x) => (x.id === p.id ? p : x)))}
          onDeleted={async () => { setOpenId(null); await load(); }} />
      ) : (
        <PlanList plans={plans!} onOpen={setOpenId} />
      )}
    </div>
  );
}

function PlanList({ plans, onOpen }: { plans: Plan[]; onOpen: (id: string | "new") => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {plans.map((p) => (
        <button key={p.id} type="button" onClick={() => onOpen(p.id)} className="rounded-xl border bg-card p-4 text-left transition hover:border-primary">
          <p className="font-bold">{p.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {p.config.discs.length} disciplinas · {p.config.weeklyHours} h/semana · {p.custom ? "Personalizado" : "Modelo do edital"}
            {p.exam_date && ` · prova ${p.exam_date.split("-").reverse().join("/")}`}
          </p>
        </button>
      ))}
      <button type="button" onClick={() => onOpen("new")} className="flex items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary">
        <Plus className="h-4 w-4" /> Novo cronograma
      </button>
    </div>
  );
}

function SettingsFields({ cfg, onChange }: { cfg: Pick<CronoConfig, "days" | "startTime" | "weeklyHours">; onChange: (p: Partial<CronoConfig>) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <Label>Horas de estudo por semana</Label>
        <Input type="number" min={1} max={80} value={cfg.weeklyHours} onChange={(e) => onChange({ weeklyHours: Math.min(80, Math.max(1, Number(e.target.value) || 1)) })} />
      </div>
      <div className="space-y-1.5">
        <Label>Começo do estudo</Label>
        <Input type="time" value={cfg.startTime} onChange={(e) => e.target.value && onChange({ startTime: e.target.value })} />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label>Dias de estudo</Label>
        <div className="flex flex-wrap gap-1.5">
          {DAY_ORDER.map((d) => {
            const on = cfg.days.includes(d);
            return (
              <button key={d} type="button" aria-pressed={on}
                onClick={() => { const days = on ? cfg.days.filter((x) => x !== d) : [...cfg.days, d]; if (days.length) onChange({ days }); }}
                className={cn("rounded-full px-3 py-1 text-xs font-semibold", on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                {DAY_SHORT[d]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NewPlan({ userId, onBack, onCreated }: { userId: string; onBack: () => void; onCreated: (id: string) => void }) {
  const [model, setModel] = React.useState<ModeloCronograma | "custom" | null>(null);
  const [name, setName] = React.useState("");
  const [examDate, setExamDate] = React.useState("");
  const [cfg, setCfg] = React.useState({ weeklyHours: 15, startTime: "19:00", days: [1, 2, 3, 4, 5, 6] });
  const [picked, setPicked] = React.useState<Set<string>>(new Set());
  const [saving, setSaving] = React.useState(false);

  const choose = (m: ModeloCronograma | "custom") => {
    setModel(m);
    setName(m === "custom" ? "Meu cronograma" : `${m.orgao} — ${m.cargo}`);
  };

  const create = async () => {
    if (!model) return;
    const discs: CronoDisc[] = model === "custom"
      ? CATALOGO.filter((d) => picked.has(d.nome)).map((d, i) => ({
          id: `d${i}`, nome: d.nome, peso: d.peso, topicos: d.topicos.map((t, j) => ({ id: `d${i}.${j}`, t })),
        }))
      : discsFromModel(model);
    if (!discs.length) {
      toast.error("Escolha ao menos uma disciplina.");
      return;
    }
    setSaving(true);
    const { data, error } = await supabase.from("cronograma_plans").insert({
      user_id: userId, name: name.trim() || "Meu cronograma", model_id: model === "custom" ? null : model.id,
      custom: model === "custom", exam_date: examDate || null, config: { ...cfg, discs },
    }).select("id").single();
    setSaving(false);
    if (error || !data) {
      toast.error("Não foi possível criar o cronograma. Tente novamente.");
      return;
    }
    onCreated(data.id as string);
  };

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={model ? () => setModel(null) : onBack}><ArrowLeft className="mr-1 h-4 w-4" /> Voltar</Button>
      {!model ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Modelos de edital</CardTitle>
              <CardDescription>Disciplinas e conteúdo programático prontos. Você ajusta pesos, dias e horas depois.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {MODELOS_CRONOGRAMA.map((m) => (
                <button key={m.id} type="button" onClick={() => choose(m)} className="rounded-xl border p-3 text-left transition hover:border-primary">
                  <p className="text-sm font-bold">{m.orgao} — {m.cargo}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.banca} · {m.nivel} · {m.metodo} · {m.questoes} questões · edital {m.ano}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.disciplinas.length} disciplinas · {m.disciplinas.reduce((s, d) => s + d.topicos.length, 0)} conteúdos</p>
                </button>
              ))}
            </CardContent>
          </Card>
          <button type="button" onClick={() => choose("custom")} className="flex w-full items-center gap-3 rounded-xl border border-dashed p-4 text-left hover:border-primary">
            <Sparkles className="h-5 w-5 text-primary" />
            <span><span className="block text-sm font-bold">Montar do zero (personalizável)</span>
              <span className="text-xs text-muted-foreground">Escolha as disciplinas e edite tudo: pesos, conteúdos, dias e horas.</span></span>
          </button>
        </>
      ) : (
        <Card>
          <CardHeader><CardTitle>{model === "custom" ? "Cronograma personalizado" : `${model.orgao} — ${model.cargo}`}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Nome</Label><Input value={name} maxLength={120} onChange={(e) => setName(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Data da prova (opcional)</Label><Input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} /></div>
            </div>
            <SettingsFields cfg={cfg} onChange={(p) => setCfg((c) => ({ ...c, ...p }))} />
            {model === "custom" && (
              <div className="space-y-1.5">
                <Label>Disciplinas</Label>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {CATALOGO.map((d) => (
                    <label key={d.nome} className="flex items-center gap-2 text-sm">
                      <Checkbox checked={picked.has(d.nome)} onCheckedChange={(v) => setPicked((s) => { const n = new Set(s); if (v) n.add(d.nome); else n.delete(d.nome); return n; })} />
                      {d.nome}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <Button onClick={create} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Criar cronograma</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function PlanView({ plan, userId, onBack, onChange, onDeleted }: {
  plan: Plan; userId: string; onBack: () => void; onChange: (p: Plan) => void; onDeleted: () => void;
}) {
  const [progress, setProgress] = React.useState<Record<string, TopicProgress> | null>(null);
  const [studiedMin, setStudiedMin] = React.useState<number | null>(null);
  const timers = React.useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const cfg = plan.config;

  React.useEffect(() => {
    void supabase.from("cronograma_progress").select("*").eq("plan_id", plan.id).then(({ data }) => {
      const m: Record<string, TopicProgress> = {};
      for (const r of (data ?? []) as Record<string, unknown>[])
        m[r["topic_id"] as string] = {
          video: !!r["video"], pdf: !!r["pdf"], podcast: !!r["podcast"], qtde: Number(r["qtde"]), acertos: Number(r["acertos"]),
          revPdf: !!r["rev_pdf"], revQuestoes: !!r["rev_questoes"],
        };
      setProgress(m);
    });
    const since = new Date(Date.now() - 6 * 864e5).toISOString().slice(0, 10);
    void supabase.from("study_sessions").select("active_seconds").eq("user_id", userId).gte("study_date", since)
      .then(({ data }) => setStudiedMin(Math.round(((data ?? []) as { active_seconds: number }[]).reduce((s, r) => s + r.active_seconds, 0) / 60)));
    return () => Object.values(timers.current).forEach(clearTimeout);
  }, [plan.id, userId]);

  const setTopic = (topicId: string, patch: Partial<TopicProgress>) => {
    setProgress((cur) => {
      const next = { ...(cur ?? {}) };
      const p = { ...(next[topicId] ?? EMPTY_PROGRESS), ...patch };
      p.qtde = Math.max(0, Math.floor(p.qtde));
      p.acertos = Math.min(Math.max(0, Math.floor(p.acertos)), p.qtde);
      next[topicId] = p;
      clearTimeout(timers.current[topicId]);
      timers.current[topicId] = setTimeout(() => {
        void supabase.from("cronograma_progress").upsert({
          plan_id: plan.id, user_id: userId, topic_id: topicId, video: p.video, pdf: p.pdf, podcast: p.podcast,
          qtde: p.qtde, acertos: p.acertos, rev_pdf: p.revPdf, rev_questoes: p.revQuestoes, updated_at: new Date().toISOString(),
        }).then(({ error }) => error && toast.error("Não foi possível salvar o progresso."));
      }, 500);
      return next;
    });
  };

  const save = async (patch: Partial<Plan>) => {
    const next = { ...plan, ...patch };
    onChange(next);
    const { error } = await supabase.from("cronograma_plans").update({
      name: next.name, exam_date: next.exam_date, custom: next.custom, config: next.config, updated_at: new Date().toISOString(),
    }).eq("id", plan.id);
    if (error) toast.error("Não foi possível salvar as alterações.");
  };
  const setCfg = (p: Partial<CronoConfig>) => save({ config: { ...cfg, ...p } });
  const setDisc = (id: string, p: Partial<CronoDisc>) => setCfg({ discs: cfg.discs.map((d) => (d.id === id ? { ...d, ...p } : d)) });

  const remove = async () => {
    if (!(await confirmDialog({ title: "Excluir cronograma?", message: "O cronograma e todo o progresso dele serão apagados.", confirmLabel: "Excluir" }))) return;
    const { error } = await supabase.from("cronograma_plans").delete().eq("id", plan.id);
    if (error) {
      toast.error("Não foi possível excluir.");
      return;
    }
    onDeleted();
  };

  if (!progress)
    return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-label="Carregando" /></div>;

  const all = cfg.discs.map((d) => ({ d, s: discStats(d, progress) }));
  const done = all.reduce((s, x) => s + x.s.done, 0);
  const total = all.reduce((s, x) => s + x.s.total, 0);
  const pct = total ? Math.round((100 * done) / total) : 0;
  const week = buildWeek(cfg, progress);
  const next = nextTopic(cfg, progress);
  const daysLeft = plan.exam_date ? Math.ceil((new Date(`${plan.exam_date}T12:00:00`).getTime() - Date.now()) / 864e5) : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="mr-1 h-4 w-4" /> Meus cronogramas</Button>
        <Button variant="ghost" size="sm" className="text-destructive" onClick={remove}><Trash2 className="mr-1 h-4 w-4" /> Excluir</Button>
      </div>
      <Card>
        <CardContent className="grid gap-4 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <div>
            <p className="text-lg font-black">{plan.name}</p>
            <div className="mt-2 flex items-center gap-2"><Progress value={pct} className="h-2" /><span className="text-sm font-bold tabular-nums">{pct}%</span></div>
            <p className="mt-1 text-xs text-muted-foreground">{done} de {total} conteúdos concluídos</p>
          </div>
          <Stat label="Estudado (7 dias)" value={studiedMin === null ? "…" : fmtH(studiedMin)} sub={`meta ${cfg.weeklyHours} h`} />
          <Stat label="Prova" value={daysLeft === null ? "—" : daysLeft >= 0 ? `${daysLeft} dias` : "passou"} sub={plan.exam_date ? plan.exam_date.split("-").reverse().join("/") : "sem data"} />
        </CardContent>
      </Card>
      {next && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm">
          <Target className="h-4 w-4 text-primary" />
          <span className="min-w-0 flex-1"><b>Próximo passo:</b> {next.d.nome} — {next.t.t}</span>
          <ToolLinks nome={next.d.nome} />
        </div>
      )}
      <Tabs defaultValue="semana">
        <TabsList className="grid w-full grid-cols-3"><TabsTrigger value="semana">Semana</TabsTrigger><TabsTrigger value="conteudo">Conteúdo</TabsTrigger><TabsTrigger value="ajustes">Ajustes</TabsTrigger></TabsList>

        <TabsContent value="semana" className="space-y-3">
          <p className="text-xs text-muted-foreground">Tempo por disciplina = peso × o que falta × reforço para desempenho abaixo de 70%. Mude o progresso e a semana se reorganiza.</p>
          {DAY_ORDER.filter((d) => week[d]).map((d) => (
            <Card key={d}>
              <CardHeader className="pb-2"><CardTitle className="text-base">{DAY_SHORT[d]} <span className="text-xs font-normal text-muted-foreground">· {fmtH(week[d]!.reduce((s, b) => s + b.minutes, 0))}</span></CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {week[d]!.map((b, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-2 rounded-lg border p-2 text-sm">
                    <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">{b.start} – {b.end}</span>
                    <span className="min-w-0 flex-1 font-semibold">{b.nome}{b.first && <Badge variant="secondary" className="ml-2">1ª vez</Badge>}</span>
                    <ToolLinks nome={b.nome} />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="conteudo" className="space-y-3">
          {all.map(({ d, s }) => {
            const acc = accuracy(s);
            return (
              <details key={d.id} className="rounded-xl border bg-card">
                <summary className="flex cursor-pointer flex-wrap items-center gap-2 p-3">
                  <span className="min-w-0 flex-1 font-bold">{d.nome}</span>
                  <Badge variant={d.peso === 2 ? "default" : "secondary"}>Peso {d.peso}</Badge>
                  <span className="text-xs text-muted-foreground">{s.done}/{s.total} · {acc === null ? "sem questões" : `${acc}% de acertos`}</span>
                </summary>
                <div className="space-y-2 border-t p-3">
                  <ToolLinks nome={d.nome} />
                  {d.topicos.map((t, i) => {
                    const p = progress[t.id] ?? EMPTY_PROGRESS;
                    const a = accuracy(p);
                    const ck = (label: string, key: keyof TopicProgress) => (
                      <label className="flex items-center gap-1 text-xs"><Checkbox checked={!!p[key]} onCheckedChange={(v) => setTopic(t.id, { [key]: !!v })} />{label}</label>
                    );
                    return (
                      <div key={t.id} className={cn("rounded-lg border p-2 text-sm", topicDone(p) && "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20")}>
                        <p><span className="mr-1 text-muted-foreground">{i + 1}.</span>{t.t}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                          <span className="flex gap-3">{ck("Vídeo", "video")}{ck("PDF", "pdf")}{ck("Podcast", "podcast")}</span>
                          <span className="flex items-center gap-1 text-xs">Questões
                            <Input aria-label="Quantidade de questões" type="number" min={0} className="h-7 w-16" value={p.qtde || ""} onChange={(e) => setTopic(t.id, { qtde: Number(e.target.value) })} />
                            acertos
                            <Input aria-label="Acertos" type="number" min={0} className="h-7 w-16" value={p.acertos || ""} onChange={(e) => setTopic(t.id, { acertos: Number(e.target.value) })} />
                            <b className="w-10 tabular-nums">{a === null ? "—" : `${a}%`}</b>
                          </span>
                          <span className="flex gap-3 text-xs"><span className="text-muted-foreground">Revisão:</span>{ck("Aula/PDF", "revPdf")}{ck("Questões", "revQuestoes")}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </TabsContent>

        <TabsContent value="ajustes" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Rotina</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label>Nome</Label><Input defaultValue={plan.name} maxLength={120} onBlur={(e) => e.target.value.trim() && e.target.value !== plan.name && void save({ name: e.target.value.trim() })} /></div>
                <div className="space-y-1.5"><Label>Data da prova</Label><Input type="date" value={plan.exam_date ?? ""} onChange={(e) => void save({ exam_date: e.target.value || null })} /></div>
              </div>
              <SettingsFields cfg={cfg} onChange={setCfg} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Disciplinas e pesos</CardTitle>
              <CardDescription>
                Peso 2 = maior peso no edital ou mais difícil (ganha mais tempo).{" "}
                {plan.custom ? "Neste cronograma você também pode adicionar ou remover disciplinas e conteúdos." : "Quer mexer nas disciplinas e conteúdos? Torne o cronograma personalizável."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {cfg.discs.map((d) => (
                <div key={d.id} className="flex flex-wrap items-center gap-2 rounded-lg border p-2 text-sm">
                  <span className="min-w-0 flex-1 font-semibold">{d.nome}</span>
                  <div className="flex gap-1">
                    {([1, 2] as const).map((w) => (
                      <button key={w} type="button" aria-pressed={d.peso === w} onClick={() => setDisc(d.id, { peso: w })}
                        className={cn("rounded-full px-3 py-1 text-xs font-semibold", d.peso === w ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>Peso {w}</button>
                    ))}
                  </div>
                  {plan.custom && (
                    <Button variant="ghost" size="icon" aria-label={`Remover ${d.nome}`} onClick={() => setCfg({ discs: cfg.discs.filter((x) => x.id !== d.id) })}><Trash2 className="h-4 w-4" /></Button>
                  )}
                </div>
              ))}
              {plan.custom ? <CustomEditor cfg={cfg} setCfg={setCfg} /> : (
                <Button variant="outline" size="sm" onClick={() => void save({ custom: true })}>Tornar personalizável</Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CustomEditor({ cfg, setCfg }: { cfg: CronoConfig; setCfg: (p: Partial<CronoConfig>) => void }) {
  const [disc, setDisc] = React.useState("");
  const [topicDisc, setTopicDisc] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const addDisc = () => {
    const nome = disc.trim();
    if (!nome || cfg.discs.some((d) => d.nome.toLowerCase() === nome.toLowerCase())) return;
    const cat = CATALOGO.find((c) => c.nome.toLowerCase() === nome.toLowerCase());
    const id = `d${uid()}`;
    setCfg({ discs: [...cfg.discs, { id, nome: cat?.nome ?? nome, peso: cat?.peso ?? 1, topicos: (cat?.topicos ?? []).map((t, j) => ({ id: `${id}.${j}`, t })) }] });
    setDisc("");
  };
  const addTopic = () => {
    const t = topic.trim();
    const target = topicDisc || cfg.discs[0]?.id;
    if (!t || !target) return;
    setCfg({ discs: cfg.discs.map((d) => (d.id === target ? { ...d, topicos: [...d.topicos, { id: `${d.id}.${uid()}`, t }] } : d)) });
    setTopic("");
  };
  return (
    <div className="space-y-3 border-t pt-3">
      <div className="flex gap-2">
        <Input list="cronograma-catalogo" placeholder="Adicionar disciplina (ex.: Direito Penal)" value={disc} onChange={(e) => setDisc(e.target.value)} />
        <datalist id="cronograma-catalogo">{CATALOGO.map((c) => <option key={c.nome} value={c.nome} />)}</datalist>
        <Button variant="outline" onClick={addDisc}><Plus className="h-4 w-4" /></Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <select aria-label="Disciplina do conteúdo" className="h-10 rounded-md border bg-background px-2 text-sm" value={topicDisc || cfg.discs[0]?.id || ""} onChange={(e) => setTopicDisc(e.target.value)}>
          {cfg.discs.map((d) => <option key={d.id} value={d.id}>{d.nome}</option>)}
        </select>
        <Input className="min-w-48 flex-1" placeholder="Adicionar conteúdo" value={topic} onChange={(e) => setTopic(e.target.value)} />
        <Button variant="outline" onClick={addTopic}><Plus className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg bg-muted/50 px-4 py-2 text-center">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-xl font-black tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

/** Atalhos para as ferramentas da plataforma já filtradas pela disciplina. */
function ToolLinks({ nome }: { nome: string }) {
  const cls = "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold hover:bg-primary hover:text-primary-foreground";
  return (
    <span className="flex flex-wrap gap-1.5">
      <Link to="/dashboard/library" className={cls}><BookOpen className="h-3 w-3" />Teoria</Link>
      <Link to="/dashboard/question-trainer" search={{ area: nome, go: "1" }} className={cls}><Target className="h-3 w-3" />Questões</Link>
      <Link to="/dashboard/flashcards" search={{ subject: nome }} className={cls}><Layers className="h-3 w-3" />Flashcards</Link>
      <Link to="/dashboard/media" className={cls}><Mic className="h-3 w-3" />Podcast</Link>
      <Link to="/dashboard/errors" className={cls}><NotebookPen className="h-3 w-3" />Erros</Link>
      <Link to="/dashboard/mock-exams" className={cls}><Trophy className="h-3 w-3" />Simulado</Link>
    </span>
  );
}
