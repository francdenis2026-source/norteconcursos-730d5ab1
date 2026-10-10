import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Check, ExternalLink, FastForward, Pause, Play, Plus, SkipForward, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { CronoConfig, TopicProgress } from "@/lib/cronograma";
import { EMPTY_PROGRESS } from "@/lib/cronograma";
import { discColor, KINDS, stepLink, stepMinutes, type DayStep } from "@/lib/cronogramaDia";
import type { TheoryTarget } from "@/lib/cronogramaTeoria";
import { cn } from "@/lib/utils";

type Mark = "done" | "skip";
interface Run {
  i: number; // etapa atual
  endsAt: number | null; // quando o cronômetro zera (null = pausado)
  left: number; // segundos restantes quando pausado
  marks: Record<string, Mark>;
  secondsDone: number; // tempo de estudo realmente concluído
}

const pad = (n: number) => String(n).padStart(2, "0");
const mmss = (s: number) => `${pad(Math.floor(Math.max(0, s) / 60))}:${pad(Math.max(0, s) % 60)}`;
const initial = (steps: DayStep[]): Run => ({ i: 0, endsAt: null, left: (steps[0]?.minutes ?? 0) * 60, marks: {}, secondsDone: 0 });

function beep() {
  try {
    const ctx = new AudioContext();
    [0, 0.25, 0.5].forEach((t, k) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = 660 + k * 220;
      g.gain.setValueAtTime(0.0001, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t + 0.2);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + t);
      o.stop(ctx.currentTime + t + 0.22);
    });
  } catch { /* sem áudio: segue só o aviso visual */ }
}

function Ring({ total, left, stroke }: { total: number; left: number; stroke: string }) {
  const r = 88, c = 2 * Math.PI * r;
  const frac = total > 0 ? Math.min(1, Math.max(0, left / total)) : 0;
  return (
    <svg viewBox="0 0 200 200" className="h-56 w-56 -rotate-90" aria-hidden="true">
      <circle cx="100" cy="100" r={r} className="fill-none stroke-muted" strokeWidth="12" />
      <circle cx="100" cy="100" r={r} className={cn("fill-none transition-[stroke-dashoffset] duration-300", stroke)} strokeWidth="12"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - frac)} />
    </svg>
  );
}

export function DayRun({ planId, dateKey, title, cfg, steps, progress, setTopic, theoryOf, onClose }: {
  planId: string; dateKey: string; title: string; cfg: CronoConfig; steps: DayStep[];
  progress: Record<string, TopicProgress>; setTopic: (topicId: string, patch: Partial<TopicProgress>) => void;
  theoryOf: (nome: string, topic: string) => TheoryTarget; onClose: () => void;
}) {
  const key = `crono-run:${planId}:${dateKey}`;
  const [run, setRun] = React.useState<Run>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? "null") as Run | null;
      if (saved && saved.i <= steps.length) return saved;
    } catch { /* sem armazenamento: começa do zero */ }
    return initial(steps);
  });
  const [now, setNow] = React.useState(() => Date.now());
  const [logging, setLogging] = React.useState(false);
  const [qtde, setQtde] = React.useState("");
  const [acertos, setAcertos] = React.useState("");
  const alerted = React.useRef(false);

  React.useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(run)); } catch { /* ignora */ }
  }, [key, run]);
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  const finished = run.i >= steps.length;
  const step = steps[run.i];
  const meta = KINDS[step?.kind ?? "pausa"];
  const left = run.endsAt ? Math.ceil((run.endsAt - now) / 1000) : run.left;
  const total = (step?.minutes ?? 0) * 60;
  const overtime = !!step && run.endsAt !== null && left <= 0;

  // fim do tempo: aviso sonoro + notificação (uma vez por etapa); a próxima etapa só começa quando o candidato mandar
  React.useEffect(() => {
    if (!overtime || alerted.current) return;
    alerted.current = true;
    beep();
    try {
      if (Notification.permission === "granted") new Notification("Tempo da etapa acabou", { body: `${meta.label} · ${step?.nome}` });
    } catch { /* sem notificações */ }
  }, [overtime, meta.label, step?.nome]);
  React.useEffect(() => { alerted.current = false; }, [run.i]);
  React.useEffect(() => {
    if (!step) return;
    const prev = document.title;
    document.title = `${run.endsAt ? "⏱" : "⏸"} ${mmss(left)} · ${meta.label}`;
    return () => { document.title = prev; };
  }, [left, step, meta.label, run.endsAt]);

  const start = () => {
    try { if (Notification.permission === "default") void Notification.requestPermission(); } catch { /* ignora */ }
    setRun((r) => ({ ...r, endsAt: Date.now() + r.left * 1000 }));
  };
  const pause = () => setRun((r) => ({ ...r, endsAt: null, left: Math.max(0, Math.ceil(((r.endsAt ?? Date.now()) - Date.now()) / 1000)) }));
  const add5 = () => setRun((r) => (r.endsAt ? { ...r, endsAt: r.endsAt + 300_000 } : { ...r, left: r.left + 300 }));
  const go = (mark: Mark) => {
    if (!step) return;
    setRun((r) => {
      const spent = mark === "done" ? (step.kind === "pausa" ? 0 : step.minutes * 60) : 0;
      const i = r.i + 1;
      return { i, endsAt: null, left: (steps[i]?.minutes ?? 0) * 60, marks: { ...r.marks, [step.id]: mark }, secondsDone: r.secondsDone + spent };
    });
    setLogging(false); setQtde(""); setAcertos("");
  };
  const complete = () => {
    if (step?.topicId && (step.kind === "questoes" || step.kind === "teoria")) setLogging(true);
    else go("done");
  };
  const saveLog = () => {
    if (step?.topicId) {
      const cur = progress[step.topicId] ?? EMPTY_PROGRESS;
      if (step.kind === "questoes") {
        const q = Math.max(0, Math.floor(Number(qtde) || 0));
        setTopic(step.topicId, { qtde: cur.qtde + q, acertos: cur.acertos + Math.min(q, Math.max(0, Math.floor(Number(acertos) || 0))) });
      }
    }
    go("done");
  };

  const doneSteps = steps.filter((s) => run.marks[s.id] === "done" && s.kind !== "pausa").length;
  const studySteps = steps.filter((s) => s.kind !== "pausa").length;
  const plannedStudy = stepMinutes(steps, ["teoria", "flashcards", "questoes", "erros", "simulado", "redacao"]);
  const clock = new Date(now).toLocaleTimeString("pt-BR", { timeZone: "America/Rio_Branco", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const weekday = new Date(`${dateKey}T12:00:00Z`).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", timeZone: "UTC" });
  const next = steps[run.i + 1];
  const link = step && step.kind !== "teoria" ? stepLink(step) : null;
  const theory = step?.kind === "teoria" ? theoryOf(step.nome, step.topic ?? step.nome) : null;
  const dc = step?.discId ? discColor(cfg, step.discId) : null;

  const reset = () => { setRun(initial(steps)); setLogging(false); };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-background">
      <div className={cn("bg-gradient-to-br text-white shadow-lg transition-colors duration-500", finished ? "from-emerald-500 to-teal-600" : meta.bg)}>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">Painel do dia · {title}</p>
            <p className="truncate text-lg font-black first-letter:uppercase">{weekday}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-3xl font-black tabular-nums leading-none">{clock}</p>
            <p className="text-[11px] text-white/80">horário do Acre</p>
          </div>
          <Button variant="secondary" size="icon" onClick={onClose} aria-label="Sair do painel do dia"><X className="h-4 w-4" /></Button>
        </div>
        <div className="mx-auto max-w-5xl px-4 pb-3">
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span>{doneSteps} de {studySteps} etapas</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/25"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${studySteps ? (100 * doneSteps) / studySteps : 0}%` }} /></div>
            <span>{Math.round(run.secondsDone / 60)} / {plannedStudy} min</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {finished ? (
            <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 text-center dark:from-emerald-950/30 dark:to-teal-950/30">
              <p className="text-5xl">🏁</p>
              <h2 className="mt-2 text-2xl font-black">Dia de estudo concluído!</h2>
              <p className="mt-1 text-muted-foreground">{doneSteps} de {studySteps} etapas · {Math.round(run.secondsDone / 60)} minutos de estudo focado.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Button onClick={onClose}>Voltar ao cronograma</Button>
                <Button variant="outline" onClick={reset}>Refazer o dia</Button>
              </div>
            </div>
          ) : step && (
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full px-3 py-1 text-sm font-black", meta.soft)}>{meta.emoji} {meta.label}</span>
                {dc && step.kind !== "pausa" && <span className={cn("rounded-full px-3 py-1 text-xs font-bold", dc.chip)}>{step.nome}</span>}
                <span className="ml-auto text-xs text-muted-foreground">Etapa {run.i + 1} de {steps.length} · {step.minutes} min</span>
              </div>
              <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                <div className="relative shrink-0">
                  <Ring total={total} left={Math.max(0, left)} stroke={meta.ring} />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <p className={cn("font-mono text-5xl font-black tabular-nums", overtime && "animate-pulse text-rose-500")}>{overtime ? "00:00" : mmss(left)}</p>
                      <p className="text-xs text-muted-foreground">{overtime ? "tempo esgotado" : run.endsAt ? "em andamento" : "pausado"}</p>
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">{meta.guide}</p>
                  {step.topic && <p className={cn("rounded-lg border-l-4 bg-muted/50 p-3 text-sm font-semibold", dc?.border)}>🎯 {step.topic}</p>}
                  {theory && (
                    <div className="space-y-1.5">
                      <Link to={theory.to as never} params={theory.params as never} search={theory.search as never}
                        className={cn("inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-bold text-white shadow", meta.bg)}>
                        <ExternalLink className="h-4 w-4" /> {theory.direct ? "Abrir o material deste assunto" : "Procurar a teoria deste assunto"}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {theory.direct ? `📌 ${theory.label}` : "Sem material específico: abre a Biblioteca já pesquisando o assunto."} Lá você tem o botão <b>Voltar ao painel do dia</b>; o cronômetro continua.
                      </p>
                    </div>
                  )}
                  {link && (
                    <Link to={link.to as never} search={link.search as never} target="_blank" rel="noreferrer"
                      className={cn("inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-bold text-white shadow", meta.bg)}>
                      <ExternalLink className="h-4 w-4" /> Abrir {meta.label.toLowerCase()} (nova aba)
                    </Link>
                  )}
                </div>
              </div>

              {logging ? (
                <div className="mt-5 rounded-xl border bg-muted/40 p-4">
                  {step.kind === "questoes" ? (
                    <>
                      <p className="text-sm font-bold">Registrar questões feitas (opcional)</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                        <Input aria-label="Quantas questões" type="number" min={0} className="w-24" placeholder="Feitas" value={qtde} onChange={(e) => setQtde(e.target.value)} />
                        <Input aria-label="Quantas acertou" type="number" min={0} className="w-24" placeholder="Acertos" value={acertos} onChange={(e) => setAcertos(e.target.value)} />
                        <Button onClick={saveLog}><Check className="mr-1 h-4 w-4" /> Salvar e seguir</Button>
                        <Button variant="ghost" onClick={() => go("done")}>Pular registro</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-bold">O que você concluiu neste conteúdo?</p>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                        {([["video", "Vídeo"], ["pdf", "PDF"], ["podcast", "Podcast"]] as const).map(([k, label]) => (
                          <label key={k} className="flex items-center gap-1.5">
                            <Checkbox checked={!!progress[step.topicId!]?.[k]} onCheckedChange={(v) => setTopic(step.topicId!, { [k]: !!v })} />{label}
                          </label>
                        ))}
                        <Button onClick={() => go("done")}><Check className="mr-1 h-4 w-4" /> Seguir</Button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {run.endsAt ? (
                    <Button variant="outline" onClick={pause}><Pause className="mr-1 h-4 w-4" /> Pausar</Button>
                  ) : (
                    <Button onClick={start} className={cn("bg-gradient-to-r text-white", meta.bg)}><Play className="mr-1 h-4 w-4" /> {run.left < total ? "Retomar" : "Iniciar etapa"}</Button>
                  )}
                  <Button variant="outline" onClick={add5}><Plus className="mr-1 h-4 w-4" /> 5 min</Button>
                  <Button variant={overtime ? "default" : "outline"} onClick={complete}><FastForward className="mr-1 h-4 w-4" /> Concluir etapa</Button>
                  <Button variant="ghost" onClick={() => go("skip")}><SkipForward className="mr-1 h-4 w-4" /> Pular</Button>
                </div>
              )}
              {next && !logging && (
                <p className="mt-4 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                  Depois: <b>{KINDS[next.kind].emoji} {KINDS[next.kind].label}{next.kind !== "pausa" && ` · ${next.nome}`}</b> ({next.minutes} min)
                </p>
              )}
            </div>
          )}
        </div>

        <ol className="space-y-1.5" aria-label="Etapas do dia">
          {steps.map((s, i) => {
            const m = KINDS[s.kind];
            const mark = run.marks[s.id];
            const current = i === run.i && !finished;
            return (
              <li key={s.id} className={cn("flex items-center gap-2 rounded-xl border p-2 text-sm", current && "border-2 border-primary bg-primary/5", mark === "done" && "opacity-60")}>
                <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg text-base", m.soft)}>{mark === "done" ? "✅" : mark === "skip" ? "⏭️" : m.emoji}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{m.label}{s.kind !== "pausa" && s.discId ? ` · ${s.nome}` : s.kind === "pausa" ? "" : ""}</span>
                  {s.topic && <span className="block truncate text-xs text-muted-foreground">{s.topic}</span>}
                </span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{s.minutes} min</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
