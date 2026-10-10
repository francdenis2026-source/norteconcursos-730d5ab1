import * as React from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Layers, Search, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  accuracy, discStats, effectiveWeight, EMPTY_PROGRESS, topicDone,
  type CronoConfig, type CronoDisc, type TopicProgress,
} from "@/lib/cronograma";
import { discColor } from "@/lib/cronogramaDia";
import type { TheoryTarget } from "@/lib/cronogramaTeoria";
import { cn } from "@/lib/utils";

type Filter = "todos" | "pendentes" | "andamento" | "concluidos";
type Status = "novo" | "andamento" | "concluido";
const FILTERS: [Filter, string][] = [["todos", "Todos"], ["pendentes", "Pendentes"], ["andamento", "Em andamento"], ["concluidos", "Concluídos"]];

const statusOf = (p: TopicProgress): Status =>
  topicDone(p) ? "concluido" : p.video || p.pdf || p.podcast || p.qtde > 0 ? "andamento" : "novo";
const STATUS_UI: Record<Status, { label: string; cls: string }> = {
  novo: { label: "Não iniciado", cls: "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-200" },
  andamento: { label: "Em andamento", cls: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200" },
  concluido: { label: "Concluído", cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200" },
};

const chip = "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition hover:brightness-95";

export function TheoryButton({ target }: { target: TheoryTarget }) {
  return (
    <Link to={target.to as never} params={target.params as never} search={target.search as never}
      title={target.direct ? target.label : "Não há material específico: abre a Biblioteca já pesquisando este assunto"}
      className={cn(chip, target.kind === "busca" ? "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-200" : "bg-sky-600 text-white")}>
      {target.kind === "busca" ? <Search className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
      {target.kind === "material" ? "Estudar o material" : target.kind === "edital" ? "Estudar no edital" : "Procurar teoria"}
    </Link>
  );
}

function Actions({ nome, topic, theoryOf }: { nome: string; topic: string; theoryOf: (nome: string, topic: string) => TheoryTarget }) {
  const t = theoryOf(nome, topic);
  return (
    <span className="flex flex-wrap items-center gap-1.5">
      <TheoryButton target={t} />
      <Link to="/dashboard/question-trainer" search={{ area: nome, go: "1" } as never} className={cn(chip, "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200")}><Target className="h-3 w-3" />Questões</Link>
      <Link to="/dashboard/flashcards" search={{ subject: nome } as never} className={cn(chip, "bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-200")}><Layers className="h-3 w-3" />Flashcards</Link>
      {t.direct && <span className="max-w-64 truncate text-[11px] text-muted-foreground" title={t.label}>↳ {t.label}</span>}
    </span>
  );
}

/** Aba Conteúdo: o que estudar agora, filtros por situação e cada assunto com status, teoria direta e registro. */
export function ContentTab({ cfg, progress, setTopic, theoryOf }: {
  cfg: CronoConfig; progress: Record<string, TopicProgress>;
  setTopic: (topicId: string, patch: Partial<TopicProgress>) => void;
  theoryOf: (nome: string, topic: string) => TheoryTarget;
}) {
  const [filter, setFilter] = React.useState<Filter>("todos");
  const [query, setQuery] = React.useState("");

  const focus = React.useMemo(() => {
    const rows = cfg.discs.flatMap((d) => {
      const t = d.topicos.find((x) => !topicDone(progress[x.id]));
      return t ? [{ d, t, w: effectiveWeight(d, discStats(d, progress)) }] : [];
    });
    return rows.sort((a, b) => b.w - a.w).slice(0, 3);
  }, [cfg.discs, progress]);
  const focusIds = new Set(focus.map((f) => f.t.id));
  const q = query.trim().toLowerCase();

  const visible = (d: CronoDisc) =>
    d.topicos.map((t, i) => ({ t, i, p: progress[t.id] ?? EMPTY_PROGRESS })).filter(({ t, p }) => {
      const st = statusOf(p);
      if (filter === "pendentes" && st === "concluido") return false;
      if (filter === "andamento" && st !== "andamento") return false;
      if (filter === "concluidos" && st !== "concluido") return false;
      return !q || t.t.toLowerCase().includes(q) || d.nome.toLowerCase().includes(q);
    });

  return (
    <div className="space-y-4">
      {focus.length > 0 && (
        <div className="rounded-2xl border-2 border-sky-300 bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 p-4 dark:from-sky-950/30 dark:via-indigo-950/20 dark:to-violet-950/30">
          <p className="font-black">🎯 Estude agora, nesta ordem</p>
          <p className="text-xs text-muted-foreground">O próximo conteúdo de cada disciplina que mais precisa de você (peso, o que falta e desempenho).</p>
          <ol className="mt-3 space-y-2">
            {focus.map(({ d, t }, i) => (
              <li key={t.id} className={cn("space-y-2 rounded-xl border-l-4 bg-white/80 p-3 text-sm dark:bg-white/5", discColor(cfg, d.id).border)}>
                <p><span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-full bg-indigo-600 text-xs font-black text-white">{i + 1}</span>
                  <span className={cn("mr-2 rounded-full px-2 py-0.5 text-xs font-bold", discColor(cfg, d.id).chip)}>{d.nome}</span>{t.t}</p>
                <Actions nome={d.nome} topic={t.t} theoryOf={theoryOf} />
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-48 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label="Buscar conteúdo" className="pl-9" placeholder="Buscar assunto ou disciplina" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="flex gap-1.5" role="tablist" aria-label="Situação">
          {FILTERS.map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={filter === id} onClick={() => setFilter(id)}
              className={cn("rounded-full px-3 py-1.5 text-xs font-semibold", filter === id ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>{label}</button>
          ))}
        </div>
      </div>

      {cfg.discs.map((d) => {
        const s = discStats(d, progress);
        const acc = accuracy(s);
        const rows = visible(d);
        if ((q || filter !== "todos") && !rows.length) return null;
        const col = discColor(cfg, d.id);
        return (
          <details key={d.id} open={focus[0]?.d.id === d.id || !!q} className={cn("overflow-hidden rounded-xl border border-l-4 bg-card", col.border)}>
            <summary className="flex cursor-pointer flex-wrap items-center gap-2 p-3">
              <span className={cn("rounded-full px-3 py-1 text-sm font-bold", col.chip)}>{d.nome}</span>
              <span className="min-w-24 flex-1"><span className="block h-1.5 overflow-hidden rounded-full bg-muted"><span className={cn("block h-full rounded-full", col.bar)} style={{ width: `${s.total ? (100 * s.done) / s.total : 0}%` }} /></span></span>
              <Badge className={d.peso === 2 ? "bg-orange-500 hover:bg-orange-500" : ""} variant={d.peso === 2 ? "default" : "secondary"}>Peso {d.peso}</Badge>
              <span className="text-xs text-muted-foreground">{s.done}/{s.total} · {acc === null ? "sem questões" : `${acc}% de acertos`}</span>
            </summary>
            <ol className="space-y-2 border-t p-3">
              {rows.map(({ t, i, p }) => {
                const st = statusOf(p);
                const a = accuracy(p);
                const reviewDue = st === "concluido" && (!p.revPdf || !p.revQuestoes);
                const ck = (label: string, key: keyof TopicProgress) => (
                  <label className="flex items-center gap-1 text-xs"><Checkbox checked={!!p[key]} onCheckedChange={(v) => setTopic(t.id, { [key]: !!v })} />{label}</label>
                );
                return (
                  <li key={t.id} className={cn("space-y-2 rounded-lg border p-3 text-sm", st === "concluido" && "border-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/20", focusIds.has(t.id) && "ring-2 ring-indigo-400")}>
                    <div className="flex flex-wrap items-start gap-2">
                      <span className={cn("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-black text-white", col.bar)}>{i + 1}</span>
                      <p className="min-w-0 flex-1 font-medium">{t.t}</p>
                      {focusIds.has(t.id) && <Badge className="bg-indigo-600 hover:bg-indigo-600">▶ Próximo</Badge>}
                      <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-bold", STATUS_UI[st].cls)}>{STATUS_UI[st].label}</span>
                      {reviewDue && <span className="rounded-full bg-fuchsia-100 px-2.5 py-0.5 text-[11px] font-bold text-fuchsia-800 dark:bg-fuchsia-500/20 dark:text-fuchsia-200">Revisar</span>}
                    </div>
                    <Actions nome={d.nome} topic={t.t} theoryOf={theoryOf} />
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-2">
                      <span className="flex gap-3">{ck("Vídeo", "video")}{ck("PDF", "pdf")}{ck("Podcast", "podcast")}</span>
                      <span className="flex items-center gap-1 text-xs">Questões
                        <Input aria-label="Quantidade de questões" type="number" min={0} className="h-7 w-16" value={p.qtde || ""} onChange={(e) => setTopic(t.id, { qtde: Number(e.target.value) })} />
                        acertos
                        <Input aria-label="Acertos" type="number" min={0} className="h-7 w-16" value={p.acertos || ""} onChange={(e) => setTopic(t.id, { acertos: Number(e.target.value) })} />
                        <b className="w-10 tabular-nums">{a === null ? "—" : `${a}%`}</b>
                      </span>
                      <span className="flex gap-3 text-xs"><span className="text-muted-foreground">Revisão:</span>{ck("Aula/PDF", "revPdf")}{ck("Questões", "revQuestoes")}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </details>
        );
      })}
    </div>
  );
}
