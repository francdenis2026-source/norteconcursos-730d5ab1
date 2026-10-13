import { Flame } from "lucide-react";
import { CARGO_GROUPS, CARGO_LABEL, HEAT_LABEL, countFor, heatOf, type ArtStat, type CargoGroup } from "@/lib/cobrancas";
import { COBRANCA_QUESTIONS, COBRANCA_UPDATED } from "@/lib/cobrancaData";
import { cn } from "@/lib/utils";

const HEAT_CLASS = {
  alta: "bg-rose-100 text-rose-900 ring-rose-300 dark:bg-rose-950/50 dark:text-rose-100 dark:ring-rose-500/40",
  media: "bg-amber-100 text-amber-950 ring-amber-300 dark:bg-amber-950/50 dark:text-amber-100 dark:ring-amber-500/40",
  baixa: "bg-sky-100 text-sky-900 ring-sky-200 dark:bg-sky-950/40 dark:text-sky-100 dark:ring-sky-500/30",
} as const;

/** Selo compacto para a lista de artigos: chama + quantidade de questões no cargo escolhido. */
export function CobrancaBadge({ stat, group }: { stat: ArtStat | undefined; group: CargoGroup | "all" }) {
  const n = countFor(stat, group);
  const heat = heatOf(n);
  if (!heat) return null;
  return (
    <span className={cn("ml-auto inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ring-1", HEAT_CLASS[heat])} title={`${HEAT_LABEL[heat]}: ${n} ${n === 1 ? "questão" : "questões"} das provas da plataforma citam este artigo${group === "all" ? "" : ` (${CARGO_LABEL[group]})`}`}>
      <Flame className="h-3 w-3" aria-hidden /> {n}
    </span>
  );
}

/** Cartão no topo do artigo: quanto ele é cobrado, por cargo, e em quais provas. */
export function CobrancaCard({ stat, group }: { stat: ArtStat | undefined; group: CargoGroup | "all" }) {
  if (!stat) {
    return (
      <p className="rounded-xl border border-dashed p-3 text-xs text-muted-foreground">
        Nenhuma questão das provas da plataforma foi ligada a este artigo ({COBRANCA_QUESTIONS} questões analisadas). Isso não quer dizer que nunca caia: o levantamento cresce a cada prova nova.
      </p>
    );
  }
  const n = countFor(stat, group);
  const heat = heatOf(stat.n) ?? "baixa";
  const groups = CARGO_GROUPS.filter((g) => (stat.g[g] ?? 0) > 0).sort((a, b) => (stat.g[b] ?? 0) - (stat.g[a] ?? 0));
  const inferred = stat.n - stat.r;
  return (
    <section className={cn("space-y-2 rounded-xl border-l-4 p-3", heat === "alta" ? "border-l-rose-500 bg-rose-50/70 dark:bg-rose-950/20" : heat === "media" ? "border-l-amber-500 bg-amber-50/70 dark:bg-amber-950/20" : "border-l-sky-500 bg-sky-50/70 dark:bg-sky-950/20")} aria-label="Cobrança em provas">
      <div className="flex flex-wrap items-center gap-2">
        <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ring-1", HEAT_CLASS[heat])}><Flame className="h-3.5 w-3.5" aria-hidden /> {HEAT_LABEL[heat]}</span>
        <p className="text-sm font-semibold">{stat.n} {stat.n === 1 ? "questão" : "questões"} das provas citam este artigo{group !== "all" && <span className="font-normal text-muted-foreground"> · {n} para {CARGO_LABEL[group]}</span>}</p>
      </div>
      <ul className="flex flex-wrap gap-1.5 text-xs">
        {groups.map((g) => <li key={g} className={cn("rounded-full border px-2 py-0.5", group === g && "border-primary bg-primary/10 font-bold")}>{CARGO_LABEL[g]}: <strong>{stat.g[g]}</strong></li>)}
      </ul>
      {stat.c.length > 0 && <p className="text-xs text-muted-foreground">Exemplos de provas: {stat.c.join("; ")}.</p>}
      <p className="text-[11px] text-muted-foreground">Levantamento de {COBRANCA_UPDATED}{stat.r > 0 ? `: ${stat.r} ${stat.r === 1 ? "questão cita" : "questões citam"} o artigo expressamente` : ""}{inferred > 0 ? `${stat.r > 0 ? " e" : ":"} ${inferred} ${inferred === 1 ? "foi ligada" : "foram ligadas"} pelo conteúdo do enunciado (indício, com margem de erro)` : ""}.</p>
    </section>
  );
}

/** Seletor do cargo: o destaque da lei muda conforme a carreira do aluno. */
export function CargoSelect({ value, onChange }: { value: CargoGroup | "all"; onChange: (v: CargoGroup | "all") => void }) {
  return (
    <label className="block text-sm">Destacar o que cai para o cargo
      <select className="mt-1 w-full rounded-lg border bg-background p-2" value={value} onChange={(e) => onChange(e.target.value as CargoGroup | "all")}>
        <option value="all">Todos os cargos</option>
        {CARGO_GROUPS.map((g) => <option key={g} value={g}>{CARGO_LABEL[g]}</option>)}
      </select>
    </label>
  );
}
