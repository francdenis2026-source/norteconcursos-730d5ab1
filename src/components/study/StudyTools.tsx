import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calculator, Dices, Gavel, NotebookPen, Percent, Sigma, Table2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { arranjo, calc, combinacao, describe, fat, fmt, parseNumbers, regraDeTres, truthTable } from "@/lib/studyTools";
import { cn } from "@/lib/utils";

export type ToolsArea = "math" | "law" | "general";

type ToolId = "calc" | "stats" | "comb" | "tres" | "truth" | "notes" | "penal";
const TOOLS: Record<ToolId, { label: string; icon: typeof Calculator }> = {
  calc: { label: "Calculadora", icon: Calculator },
  stats: { label: "Estatística", icon: Sigma },
  comb: { label: "Combinatória", icon: Dices },
  tres: { label: "Proporção", icon: Percent },
  truth: { label: "Tabela-verdade", icon: Table2 },
  notes: { label: "Anotações", icon: NotebookPen },
  penal: { label: "Calculadora penal", icon: Gavel },
};
const BY_AREA: Record<ToolsArea, ToolId[]> = {
  math: ["calc", "stats", "comb", "tres", "truth", "notes"],
  law: ["penal", "calc", "notes"],
  general: ["calc", "notes"],
};

/** Escolhe o conjunto de ferramentas pela disciplina em estudo. */
export function toolsAreaFor(subject: string): ToolsArea {
  const s = subject.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  if (/raciocinio|logico|estatistica|matematica|contabilidade|financeira|custos/.test(s)) return "math";
  if (/direito|legisla|constitucional|administrativo|penal|processual|humanos|lei|eca|armas|drogas|transito|ctb/.test(s)) return "law";
  return "general";
}

const inputCls = "w-full rounded-lg border bg-background px-3 py-2 text-sm";
const cardCls = "rounded-xl border bg-card p-3";

// ───────── Calculadora ─────────
const KEYS: string[][] = [
  ["(", ")", "%", "C"],
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "−"],
  ["0", ",", "^", "+"],
  ["√(", "π", "!", "="],
];

function CalculatorTool() {
  const [expr, setExpr] = useState("");
  const [history, setHistory] = useState<{ e: string; r: string }[]>([]);
  const [error, setError] = useState("");
  const result = useMemo(() => {
    if (!expr.trim()) return "";
    try { return fmt(calc(expr)); } catch { return ""; }
  }, [expr]);
  const press = (k: string) => {
    setError("");
    if (k === "C") return setExpr("");
    if (k === "=") {
      try {
        const r = fmt(calc(expr));
        setHistory((h) => [{ e: expr, r }, ...h].slice(0, 6));
        setExpr(r.replace(/\./g, ""));
      } catch (e) { setError(e instanceof Error ? e.message : "Expressão inválida"); }
      return;
    }
    setExpr((x) => x + k);
  };
  return (
    <div className="space-y-3">
      <input
        className={cn(inputCls, "font-mono text-lg")}
        value={expr}
        onChange={(e) => { setExpr(e.target.value); setError(""); }}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); press("="); } }}
        placeholder="Digite: 2+3×4, (5+1)^2, sqrt(81), 20%…"
        aria-label="Expressão"
        inputMode="text"
      />
      <div className="min-h-8 rounded-lg bg-muted/50 px-3 py-1.5 text-right font-mono text-2xl font-bold" aria-live="polite">{error ? <span className="text-base text-rose-600">{error}</span> : result || "0"}</div>
      <div className="grid grid-cols-4 gap-2">
        {KEYS.flat().map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => press(k)}
            className={cn("rounded-lg border py-3 text-lg font-semibold transition hover:bg-muted active:scale-95", k === "=" && "border-0 bg-primary text-primary-foreground hover:bg-primary/90", "÷×−+^".includes(k) && "bg-muted/60", k === "C" && "text-rose-600")}
          >
            {k}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Também aceita sqrt( ), abs( ), ln( ), log( ), sin( ), cos( ), tan( ) em graus. Use Enter para calcular.</p>
      {history.length > 0 && (
        <ul className="space-y-1 text-sm">
          {history.map((h, i) => (
            <li key={`${h.e}-${i}`}>
              <button type="button" className="flex w-full justify-between gap-2 rounded px-2 py-1 text-left hover:bg-muted" onClick={() => setExpr(h.e)}>
                <span className="truncate font-mono text-muted-foreground">{h.e}</span>
                <span className="font-mono font-semibold">= {h.r}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ───────── Estatística ─────────
function StatsTool() {
  const [text, setText] = useState("2 3 3 5 12");
  const d = useMemo(() => describe(parseNumbers(text)), [text]);
  const rows: [string, string][] = d
    ? [
        ["Quantidade (n)", fmt(d.n)], ["Soma", fmt(d.sum)], ["Média", fmt(d.mean)], ["Mediana", fmt(d.median)],
        ["Moda", d.modes.length ? d.modes.map((m) => fmt(m)).join(", ") : "sem moda"],
        ["Mínimo / máximo", `${fmt(d.min)} / ${fmt(d.max)}`], ["Amplitude", fmt(d.range)],
        ["Variância populacional", fmt(d.varPop)], ["Desvio padrão populacional", fmt(d.sdPop)],
        ["Variância amostral", Number.isNaN(d.varSample) ? "—" : fmt(d.varSample)],
        ["Desvio padrão amostral", Number.isNaN(d.sdSample) ? "—" : fmt(d.sdSample)],
        ["Coeficiente de variação", Number.isNaN(d.cv) ? "—" : `${fmt(d.cv * 100, 6)}%`],
      ]
    : [];
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Dados (separe por espaço, vírgula decimal ou ponto e vírgula)
        <textarea className={cn(inputCls, "mt-1 min-h-20 font-mono")} value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      {d ? (
        <dl className={cn(cardCls, "divide-y text-sm")}>
          {rows.map(([k, v]) => <div key={k} className="flex justify-between gap-3 py-1.5"><dt className="text-muted-foreground">{k}</dt><dd className="font-mono font-semibold">{v}</dd></div>)}
        </dl>
      ) : <p className="text-sm text-muted-foreground">Digite ao menos um número.</p>}
    </div>
  );
}

// ───────── Combinatória ─────────
function CombTool() {
  const [n, setN] = useState("5");
  const [k, setK] = useState("2");
  const N = Number(n), K = Number(k);
  let out: [string, string][] = [];
  let err = "";
  try {
    out = [["n!", fat(N).toLocaleString("pt-BR")], ["Arranjo A(n,k)", arranjo(N, K).toLocaleString("pt-BR")], ["Combinação C(n,k)", combinacao(N, K).toLocaleString("pt-BR")], ["Permutação de n", fat(N).toLocaleString("pt-BR")]];
  } catch (e) { err = e instanceof Error ? e.message : "Valores inválidos"; }
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <label className="text-sm">n (total)<input className={inputCls} type="number" min={0} value={n} onChange={(e) => setN(e.target.value)} /></label>
        <label className="text-sm">k (escolhidos)<input className={inputCls} type="number" min={0} value={k} onChange={(e) => setK(e.target.value)} /></label>
      </div>
      {err ? <p className="text-sm text-rose-600">{err}</p> : <dl className={cn(cardCls, "divide-y text-sm")}>{out.map(([a, b]) => <div key={a} className="flex justify-between gap-3 py-1.5"><dt className="text-muted-foreground">{a}</dt><dd className="break-all font-mono font-semibold">{b}</dd></div>)}</dl>}
      <p className="text-xs text-muted-foreground">Ordem importa? Use arranjo. Ordem não importa? Use combinação. Probabilidade = casos favoráveis ÷ casos possíveis.</p>
    </div>
  );
}

// ───────── Proporção e porcentagem ─────────
function ProportionTool() {
  const [a, setA] = useState("4"), [b, setB] = useState("12"), [c, setC] = useState("6");
  const [inv, setInv] = useState(true);
  const [pv, setPv] = useState("200"), [pp, setPp] = useState("15");
  const [v1, setV1] = useState("80"), [v2, setV2] = useState("100");
  let x = "";
  try { x = fmt(regraDeTres(Number(a), Number(b), Number(c), inv)); } catch (e) { x = e instanceof Error ? e.message : "—"; }
  const pct = (Number(pv) * Number(pp)) / 100;
  const variation = Number(v1) !== 0 ? ((Number(v2) - Number(v1)) / Math.abs(Number(v1))) * 100 : NaN;
  return (
    <div className="space-y-4">
      <section className={cardCls}>
        <h4 className="text-sm font-bold">Regra de três</h4>
        <p className="mt-1 text-xs text-muted-foreground">A está para B assim como C está para X.</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {([["A", a, setA], ["B", b, setB], ["C", c, setC]] as const).map(([l, v, set]) => <label key={l} className="text-xs">{l}<input className={inputCls} type="number" value={v} onChange={(e) => set(e.target.value)} /></label>)}
        </div>
        <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={inv} onChange={(e) => setInv(e.target.checked)} /> Grandezas inversamente proporcionais</label>
        <p className="mt-2 text-lg font-bold">X = <span className="font-mono">{x}</span></p>
      </section>
      <section className={cardCls}>
        <h4 className="text-sm font-bold">Porcentagem de um valor</h4>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className="text-xs">Valor<input className={inputCls} type="number" value={pv} onChange={(e) => setPv(e.target.value)} /></label>
          <label className="text-xs">Percentual (%)<input className={inputCls} type="number" value={pp} onChange={(e) => setPp(e.target.value)} /></label>
        </div>
        <p className="mt-2 text-sm">{pp}% de {pv} = <strong className="font-mono">{fmt(pct)}</strong> · com acréscimo: <strong className="font-mono">{fmt(Number(pv) + pct)}</strong> · com desconto: <strong className="font-mono">{fmt(Number(pv) - pct)}</strong></p>
      </section>
      <section className={cardCls}>
        <h4 className="text-sm font-bold">Variação percentual</h4>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className="text-xs">Valor inicial<input className={inputCls} type="number" value={v1} onChange={(e) => setV1(e.target.value)} /></label>
          <label className="text-xs">Valor final<input className={inputCls} type="number" value={v2} onChange={(e) => setV2(e.target.value)} /></label>
        </div>
        <p className="mt-2 text-sm">Variação: <strong className="font-mono">{Number.isNaN(variation) ? "—" : `${fmt(variation, 8)}%`}</strong></p>
      </section>
    </div>
  );
}

// ───────── Tabela-verdade ─────────
function TruthTool() {
  const [src, setSrc] = useState("p→q");
  let table: ReturnType<typeof truthTable> | null = null;
  let err = "";
  try { table = truthTable(src); } catch (e) { err = e instanceof Error ? e.message : "Expressão inválida"; }
  return (
    <div className="space-y-3">
      <input className={cn(inputCls, "font-mono text-lg")} value={src} onChange={(e) => setSrc(e.target.value)} aria-label="Proposição composta" />
      <div className="flex flex-wrap gap-1.5">
        {["¬", "∧", "∨", "→", "↔", "⊻", "(", ")", "p", "q", "r"].map((s) => <button key={s} type="button" className="min-w-9 rounded-md border px-2 py-1 font-mono text-sm hover:bg-muted" onClick={() => setSrc((x) => x + s)}>{s}</button>)}
        <button type="button" className="rounded-md border px-2 py-1 text-sm text-rose-600 hover:bg-muted" onClick={() => setSrc("")}>limpar</button>
      </div>
      {err ? <p className="text-sm text-rose-600">{err}</p> : table && (
        <>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-center text-sm">
              <thead className="bg-muted/60"><tr>{table.vars.map((v) => <th key={v} className="px-3 py-1.5 font-mono">{v}</th>)}<th className="px-3 py-1.5">Resultado</th></tr></thead>
              <tbody>{table.rows.map((r, i) => <tr key={i} className="border-t">{r.values.map((v, j) => <td key={j} className="px-3 py-1 font-mono">{v ? "V" : "F"}</td>)}<td className={cn("px-3 py-1 font-mono font-bold", r.result ? "text-emerald-600" : "text-rose-600")}>{r.result ? "V" : "F"}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="text-sm">Classificação: <strong className="capitalize">{table.kind}</strong></p>
        </>
      )}
      <p className="text-xs text-muted-foreground">Símbolos: ¬ (não), ∧ (e), ∨ (ou), → (se…então), ↔ (se e somente se), ⊻ (ou exclusivo). Aceita também ~ ! &amp; | -&gt; &lt;-&gt;.</p>
    </div>
  );
}

// ───────── Anotações ─────────
function NotesTool({ storageKey }: { storageKey: string }) {
  const [text, setText] = useState("");
  useEffect(() => {
    try { setText(localStorage.getItem(`foco-notas:${storageKey}`) ?? ""); } catch { /* sem armazenamento */ }
  }, [storageKey]);
  const save = (v: string) => {
    setText(v);
    try { localStorage.setItem(`foco-notas:${storageKey}`, v); } catch { /* sem armazenamento */ }
  };
  return (
    <div className="space-y-2">
      <textarea className={cn(inputCls, "min-h-64")} value={text} onChange={(e) => save(e.target.value)} placeholder="Escreva aqui o que quer lembrar desta aula. As notas ficam salvas neste aparelho." aria-label="Minhas anotações" />
      <p className="text-xs text-muted-foreground">Salvo automaticamente neste navegador.</p>
    </div>
  );
}

// ───────── Painel ─────────
export function StudyToolsPanel({ area, notesKey, onClose }: { area: ToolsArea; notesKey: string; onClose: () => void }) {
  const ids = BY_AREA[area];
  const [tool, setTool] = useState<ToolId>(ids[0]!);
  return (
    <aside className="fixed bottom-0 right-0 top-[4.25rem] z-[62] flex w-full max-w-md flex-col border-l bg-background shadow-2xl" aria-label="Ferramentas de estudo">
      <header className="flex items-center justify-between gap-2 border-b px-4 py-2">
        <p className="font-semibold">Ferramentas de estudo</p>
        <Button size="sm" variant="ghost" onClick={onClose} aria-label="Fechar ferramentas"><X className="h-4 w-4" /></Button>
      </header>
      <div className="flex gap-1 overflow-x-auto border-b px-2 py-2">
        {ids.map((id) => {
          const Icon = TOOLS[id].icon;
          return (
            <button key={id} type="button" onClick={() => setTool(id)} aria-pressed={tool === id} className={cn("flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium", tool === id ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
              <Icon className="h-4 w-4" /> {TOOLS[id].label}
            </button>
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tool === "calc" && <CalculatorTool />}
        {tool === "stats" && <StatsTool />}
        {tool === "comb" && <CombTool />}
        {tool === "tres" && <ProportionTool />}
        {tool === "truth" && <TruthTool />}
        {tool === "notes" && <NotesTool storageKey={notesKey} />}
        {tool === "penal" && (
          <div className="space-y-3 text-sm">
            <p>Calcule dosimetria, regime inicial, progressão, livramento condicional, prescrição, detração e remição, com os critérios do Código Penal e da Lei de Execução Penal.</p>
            <Button asChild><Link to="/dashboard/calculadora-penal">Abrir a calculadora penal</Link></Button>
          </div>
        )}
      </div>
    </aside>
  );
}
