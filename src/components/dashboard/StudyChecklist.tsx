import * as React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { BookOpen, CheckCircle2, ChevronDown, Loader2, Play, Circle, ClipboardCheck, Clock3, ExternalLink, Repeat2, Route as RouteIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { alertDialog } from "@/lib/confirm";
import { hasAnyResource, loadArsenal, missingMessage } from "@/lib/arsenal";
import { PODCASTS } from "@/data/mediaCatalog";
import { DAY_NAMES, dueReviews, mixSummary, REVIEW_OFFSETS, type BlockKind, type ScheduleDay } from "@/lib/studySchedule";
import { cn } from "@/lib/utils";

export interface CheckRow {
  plan_id: string | null;
  week_start: string;
  block_key: string;
  subject: string;
  kind: string;
  topics: string[];
  minutes: number;
  actual_seconds?: number;
  done_at: string;
}

const KIND_STYLE: Record<BlockKind, string> = {
  Teoria: "border-sky-500/40 bg-sky-500/10",
  Flashcards: "border-cyan-500/40 bg-cyan-500/10",
  Podcast: "border-fuchsia-500/40 bg-fuchsia-500/10",
  Questões: "border-emerald-500/40 bg-emerald-500/10",
  "Revisão de erros": "border-amber-500/40 bg-amber-500/10",
  Redação: "border-violet-500/40 bg-violet-500/10",
  Simulado: "border-rose-500/40 bg-rose-500/10",
};
const inRoom = (k: BlockKind) => k === "Teoria" || k === "Flashcards" || k === "Questões";

/** Parâmetros da sala de estudo: o bloco, o assunto clicado e onde registrar a conclusão. */
function roomSearch(b: ScheduleDay["blocks"][number], topic: string | undefined, planId?: string, weekStart?: string) {
  return {
    subject: b.subject, kind: b.kind, minutes: String(b.minutes), key: b.key,
    ...(topic ? { topic } : {}),
    ...(planId ? { plan: planId } : {}),
    ...(weekStart ? { week: weekStart } : {}),
  };
}

export const fmtMin = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, "0") : ""}` : `${m}min`);

/** Cronograma da semana com horários, assuntos e marcação de "estudado". */
export function WeekChecklist({
  userId, planId, weekStart, schedule, checks, onChange, restDays,
}: {
  userId: string;
  planId: string;
  weekStart: string;
  schedule: ScheduleDay[];
  checks: CheckRow[];
  onChange: () => void;
  hasEssay?: boolean;
  restDays: string[];
}) {
  const [open, setOpen] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState<string | null>(null);
  const [opening, setOpening] = React.useState<string | null>(null);
  const qc = useQueryClient();
  const navigate = useNavigate();

  /** Confere se há conteúdo para o assunto: abre a Sala de estudo se houver, avisa se não houver. */
  async function study(b: ScheduleDay["blocks"][number], topic: string | undefined) {
    setOpening(b.key);
    try {
      const arsenal = await loadArsenal(qc, userId, b.subject, topic ?? "");
      if (!hasAnyResource(arsenal)) {
        await alertDialog({ title: "Ainda sem conteúdo para este assunto", message: missingMessage(b.subject, topic ?? "") });
        return;
      }
      await navigate({ to: "/dashboard/study-room", search: roomSearch(b, topic, planId, weekStart) });
    } catch {
      // Se a checagem falhar (rede), não trava o aluno: abre a sala, que mostra o que houver.
      await navigate({ to: "/dashboard/study-room", search: roomSearch(b, topic, planId, weekStart) });
    } finally {
      setOpening(null);
    }
  }

  /** Ferramentas fora da sala: confere se existe algo antes de redirecionar. */
  async function openOther(b: ScheduleDay["blocks"][number]) {
    if (b.kind === "Podcast" && PODCASTS.length === 0) {
      await alertDialog({ title: "Podcasts em breve", message: "Os episódios em áudio ainda estão sendo produzidos. Assim que forem publicados, eles aparecem na Central de mídia." });
      return;
    }
    if (b.kind === "Simulado") {
      const a = await loadArsenal(qc, userId, "Língua Portuguesa", "").catch(() => null);
      if (a && a.questions === 0) {
        await alertDialog({ title: "Simulado indisponível", message: "Ainda não há questões cadastradas para montar um simulado. Tente novamente em breve." });
        return;
      }
    }
    await navigate({ to: b.href, ...(b.search ? { search: b.search } : {}) });
  }
  const doneKeys = new Set(checks.filter((c) => c.plan_id === planId && c.week_start === weekStart).map((c) => c.block_key));
  const planned = schedule.reduce((n, d) => n + d.minutes, 0);
  const done = schedule.reduce((n, d) => n + d.blocks.filter((b) => doneKeys.has(b.key)).reduce((m, b) => m + b.minutes, 0), 0);
  const pct = planned ? Math.round((100 * done) / planned) : 0;

  async function toggle(day: ScheduleDay, i: number) {
    const b = day.blocks[i]!;
    setBusy(b.key);
    const res = doneKeys.has(b.key)
      ? await supabase.from("study_plan_checks").delete().eq("user_id", userId).eq("plan_id", planId).eq("week_start", weekStart).eq("block_key", b.key)
      : await supabase.from("study_plan_checks").insert({
          user_id: userId, plan_id: planId, week_start: weekStart, block_key: b.key,
          subject: b.subject, kind: b.kind, topics: b.topics, minutes: b.minutes,
        });
    setBusy(null);
    if (res.error) { toast.error("Não foi possível salvar a marcação."); return; }
    onChange();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><ClipboardCheck className="h-5 w-5 text-primary" /> Cronograma da semana</CardTitle>
        <CardDescription>
          Estude no horário indicado e marque cada bloco ao terminar. Toque em um bloco para ver os assuntos e como estudar.
        </CardDescription>
        <div className="space-y-1 pt-2">
          <div className="flex justify-between text-xs font-semibold">
            <span>Progresso da semana</span>
            <span className="tabular-nums">{fmtMin(done)} de {fmtMin(planned)} · {pct}%</span>
          </div>
          <Progress value={pct} className="h-2.5" />
        </div>
        <div className="flex flex-wrap gap-2 pt-1 text-[0.7rem]">
          {(Object.keys(KIND_STYLE) as BlockKind[]).filter((k) => schedule.some((d) => d.blocks.some((b) => b.kind === k))).map((k) => (
            <span key={k} className={cn("rounded-full border px-2.5 py-0.5 font-semibold", KIND_STYLE[k])}>{k}</span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedule.map((d) => {
          const dayDone = d.blocks.length > 0 && d.blocks.every((b) => doneKeys.has(b.key));
          return (
            <section key={d.day} aria-label={DAY_NAMES[d.day]} className="rounded-xl border bg-card p-3">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold">
                  {DAY_NAMES[d.day]}
                  {dayDone && <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-label="Dia concluído" />}
                </h3>
                <span className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground">
                  <Clock3 className="h-3.5 w-3.5" /> {d.blocks[0]?.start}–{d.blocks[d.blocks.length - 1]?.end} · {fmtMin(d.minutes)}
                </span>
              </div>
              <ul className="space-y-2">
                {d.blocks.map((b, i) => {
                  const isDone = doneKeys.has(b.key);
                  const expanded = open === b.key;
                  return (
                    <li key={b.key} className={cn("rounded-lg border", KIND_STYLE[b.kind], isDone && "opacity-70")}>
                      <div className="flex items-start gap-3 p-2.5">
                        <button
                          type="button"
                          onClick={() => void toggle(d, i)}
                          disabled={busy === b.key}
                          aria-pressed={isDone}
                          aria-label={isDone ? `Desmarcar ${b.subject}` : `Marcar ${b.subject} como estudado`}
                          className="mt-0.5 shrink-0"
                        >
                          {isDone ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                        </button>
                        <button type="button" onClick={() => setOpen(expanded ? null : b.key)} aria-expanded={expanded} className="min-w-0 flex-1 text-left">
                          <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                            <span className={cn("font-semibold", isDone && "line-through")}>{b.subject}</span>
                            <span className="text-xs font-bold tabular-nums">{b.start}–{b.end} · {fmtMin(b.minutes)}</span>
                          </span>
                          <span className="block text-[0.7rem] text-muted-foreground">
                            {b.kind}{b.topics.length > 0 ? ` · ${b.topics.join(" · ")}` : ""}
                          </span>
                        </button>
                        <ChevronDown className={cn("mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform", expanded && "rotate-180")} aria-hidden />
                      </div>
                      {expanded && (
                        <div className="space-y-2 border-t border-border/60 px-3 py-2.5 text-xs">
                          {b.topics.length > 0 && (
                            <div>
                              <p className="font-bold uppercase tracking-wide text-muted-foreground">Assuntos</p>
                              <ul className="mt-1 space-y-0.5">
                                {b.topics.map((t) => (
                                  <li key={t}>
                                    {inRoom(b.kind) ? (
                                      <button
                                        type="button"
                                        onClick={() => void study(b, t)}
                                        disabled={opening === b.key}
                                        className="inline-flex items-center gap-1 text-left font-semibold text-primary hover:underline"
                                      >
                                        <BookOpen className="h-3.5 w-3.5 shrink-0" /> {t}
                                      </button>
                                    ) : (
                                      t
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div>
                            <p className="font-bold uppercase tracking-wide text-muted-foreground">Como estudar</p>
                            <p className="mt-1 leading-relaxed">{b.how}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            {inRoom(b.kind) ? (
                              <button
                                type="button"
                                onClick={() => void study(b, b.topics[0])}
                                disabled={opening === b.key}
                                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 font-bold text-primary-foreground hover:opacity-90 disabled:opacity-60"
                              >
                                {opening === b.key ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />} Estudar este assunto
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => void openOther(b)}
                                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                              >
                                Abrir ferramenta <ExternalLink className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
        {restDays.length > 0 && (
          <p className="text-xs text-muted-foreground">Dias de descanso: {restDays.join(", ")}. Descansar também faz parte do plano.</p>
        )}
      </CardContent>
    </Card>
  );
}

/** Histórico do que o aluno marcou como estudado (consulta no próprio painel). */
export function StudyRecord({ checks, planId }: { checks: CheckRow[]; planId: string }) {
  const mine = checks.filter((c) => c.plan_id === planId);
  const total = mine.reduce((n, c) => n + c.minutes, 0);
  const days = new Set(mine.map((c) => c.done_at.slice(0, 10))).size;
  const bySubject = new Map<string, number>();
  for (const c of mine) bySubject.set(c.subject, (bySubject.get(c.subject) ?? 0) + c.minutes);
  const subjects = [...bySubject.entries()].sort((a, b) => b[1] - a[1]);
  const max = subjects[0]?.[1] ?? 1;
  const recent = [...mine].sort((a, b) => b.done_at.localeCompare(a.done_at)).slice(0, 12);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meu registro de estudos</CardTitle>
        <CardDescription>Tudo que você marcou como estudado neste plano.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[["Horas registradas", fmtMin(total)], ["Blocos concluídos", String(mine.length)], ["Dias com estudo", String(days)], ["Tempo cronometrado", fmtMin(Math.round(mine.reduce((n, c) => n + (c.actual_seconds ?? 0), 0) / 60))]].map(([l, v]) => (
            <div key={l} className="rounded-lg bg-muted/60 p-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">{l}</p>
              <p className="text-xl font-black tabular-nums">{v}</p>
            </div>
          ))}
        </div>
        {mine.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nada registrado ainda. Marque os blocos do cronograma ao terminar de estudar.</p>
        ) : (
          <>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Tempo por matéria</p>
              {subjects.map(([name, min]) => (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between text-xs"><span className="font-medium">{name}</span><span className="tabular-nums text-muted-foreground">{fmtMin(min)}</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${(100 * min) / max}%` }} /></div>
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Últimos estudos</p>
              <ul className="divide-y text-sm">
                {recent.map((c) => (
                  <li key={c.week_start + c.block_key + c.done_at} className="flex flex-wrap items-baseline justify-between gap-2 py-1.5">
                    <span>
                      <span className="font-medium">{c.subject}</span>
                      <span className="text-xs text-muted-foreground"> · {c.kind}{c.topics.length ? ` · ${c.topics.join(", ")}` : ""}</span>
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {fmtMin(c.minutes)} · {new Date(c.done_at).toLocaleString("pt-BR", { timeZone: "America/Rio_Branco", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

const STAGE_LABEL = ["24 horas", "7 dias", "30 dias"];

/** Revisão espaçada do dia: assuntos estudados que chegaram na hora de revisar (1, 7 e 30 dias). */
export function ReviewQueue({
  userId, planId, weekStart, checks, onChange,
}: {
  userId: string;
  planId: string;
  weekStart: string;
  checks: CheckRow[];
  onChange: () => void;
}) {
  const [busy, setBusy] = React.useState<string | null>(null);
  const due = React.useMemo(() => dueReviews(checks, planId), [checks, planId]);

  async function complete(subject: string, topic: string, stage: number) {
    setBusy(topic);
    const { error } = await supabase.from("study_plan_checks").insert({
      user_id: userId, plan_id: planId, week_start: weekStart, block_key: `rev-${topic}-${stage}`,
      subject, kind: "Revisão espaçada", topics: [topic], minutes: 5,
    });
    setBusy(null);
    if (error) { toast.error("Não foi possível registrar a revisão."); return; }
    toast.success("Revisão registrada.");
    onChange();
  }

  return (
    <Card className={due.length ? "border-amber-500/50" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Repeat2 className="h-5 w-5 text-amber-600" /> Revisão do dia</CardTitle>
        <CardDescription>
          O que você estudou volta para revisão depois de {REVIEW_OFFSETS.join(", ").replace(/, (\d+)$/, " e $1")} dias. Revisar na hora certa é o que faz o conteúdo ficar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {due.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma revisão pendente. Conforme você marcar blocos de teoria como estudados, os assuntos aparecem aqui na hora certa.
          </p>
        ) : (
          <ul className="divide-y">
            {due.map((r) => (
              <li key={r.topic} className="flex flex-wrap items-center justify-between gap-2 py-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{r.topic}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.subject} · revisão de {STAGE_LABEL[r.stage]}{r.overdueDays > 0 ? ` · atrasada ${r.overdueDays} ${r.overdueDays === 1 ? "dia" : "dias"}` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={busy === r.topic}
                  onClick={() => void complete(r.subject, r.topic, r.stage)}
                  className="rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1 text-xs font-bold hover:bg-amber-500/20"
                >
                  Revisei
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

const CYCLE: [string, string][] = [
  ["Teoria", "leia o material ou assista à videoaula e resuma com suas palavras"],
  ["Flashcards", "no mesmo dia, treine a recuperação ativa"],
  ["Questões", "no dia seguinte, aplique em questões da banca"],
  ["Revisão espaçada", "volte ao assunto em 1, 7 e 30 dias"],
  ["Podcast", "reforce em áudio nos tempos livres (quando houver episódios)"],
  ["Revisão de erros", "refaça o que errou, sem consultar"],
  ["Simulado", "teste tudo em condições de prova"],
];

/** Explica o método e mostra como o tempo desta semana foi dividido. */
export function MethodCard({ schedule, phaseTitle }: { schedule: ScheduleDay[]; phaseTitle: string }) {
  const mix = mixSummary(schedule);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><RouteIcon className="h-5 w-5 text-primary" /> O método do seu plano</CardTitle>
        <CardDescription>
          Estudo de concurso funciona em ciclo: cada assunto passa por todas as etapas abaixo. A divisão do tempo muda conforme a fase ({phaseTitle}).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {CYCLE.map(([name, text], i) => (
            <li key={name} className="flex items-start gap-3 rounded-lg border p-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-black text-primary">{i + 1}</span>
              <span className="text-sm"><strong>{name}</strong><span className="block text-xs text-muted-foreground">{text}</span></span>
            </li>
          ))}
        </ol>
        {mix.total > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Esta semana</p>
            <div className="flex h-3 overflow-hidden rounded-full bg-muted" role="img" aria-label="Divisão do tempo da semana">
              {mix.items.map((it) => (
                <div key={it.kind} className={cn("h-full border-r border-background", KIND_STYLE[it.kind].split(" ")[1]?.replace("/10", "/70"))} style={{ width: `${it.pct}%` }} title={`${it.kind} ${it.pct}%`} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              {mix.items.map((it) => (
                <span key={it.kind}><strong>{it.kind}</strong> <span className="tabular-nums text-muted-foreground">{fmtMin(it.minutes)} · {it.pct}%</span></span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
