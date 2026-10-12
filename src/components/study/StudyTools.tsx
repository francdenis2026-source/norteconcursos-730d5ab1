import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpenText, Calculator, CalendarDays, Cpu, Dices, Gavel, Link2, Network, NotebookPen, Percent, Receipt, Sigma, Table2, Wallet, X, Keyboard, Languages, Shapes, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { arranjo, calc, combinacao, describe, fat, fmt, parseNumbers, regraDeTres, truthTable } from "@/lib/studyTools";
import {
  BYTE_UNITS, baseConvert, cidr, convertBytes, depreciacaoLinear, escorePadrao, jurosCompostos, liquidez, pontoEquilibrio,
  proximoDiaUtil, somarPrazo, venn,
} from "@/lib/disciplineTools";
import { formatBr, parseDate } from "@/lib/penalCalc";
import { GRAVIDADES, type Gravidade } from "@/data/ctbPanel";
import { cn } from "@/lib/utils";

/** Cada disciplina tem o seu conjunto de ferramentas; o painel muda conforme a matéria em estudo. */
export type ToolsArea = "portugues" | "raciocinio" | "estatistica" | "contabilidade" | "informatica" | "penal" | "direito" | "transito" | "general";

type ToolId =
  | "calc" | "stats" | "normal" | "comb" | "tres" | "truth" | "venn" | "notes" | "penal" | "prazo" | "multa"
  | "crase" | "conjuncoes" | "pontuacao" | "contab" | "bases" | "bytes" | "cidr" | "atalhos";

const TOOLS: Record<ToolId, { label: string; icon: typeof Calculator }> = {
  calc: { label: "Calculadora", icon: Calculator },
  stats: { label: "Estatística", icon: Sigma },
  normal: { label: "Curva normal", icon: Waves },
  comb: { label: "Combinatória", icon: Dices },
  tres: { label: "Proporção", icon: Percent },
  truth: { label: "Tabela-verdade", icon: Table2 },
  venn: { label: "Conjuntos", icon: Shapes },
  notes: { label: "Anotações", icon: NotebookPen },
  penal: { label: "Calculadora penal", icon: Gavel },
  prazo: { label: "Prazos", icon: CalendarDays },
  multa: { label: "Multa e pontos", icon: Receipt },
  crase: { label: "Crase", icon: Languages },
  conjuncoes: { label: "Conjunções", icon: Link2 },
  pontuacao: { label: "Pontuação", icon: BookOpenText },
  contab: { label: "Índices e cálculos", icon: Wallet },
  bases: { label: "Bases numéricas", icon: Cpu },
  bytes: { label: "Unidades de dados", icon: Cpu },
  cidr: { label: "Redes (CIDR)", icon: Network },
  atalhos: { label: "Atalhos", icon: Keyboard },
};

const BY_AREA: Record<ToolsArea, ToolId[]> = {
  portugues: ["crase", "conjuncoes", "pontuacao", "notes"],
  raciocinio: ["truth", "venn", "comb", "tres", "calc", "notes"],
  estatistica: ["stats", "normal", "comb", "calc", "notes"],
  contabilidade: ["contab", "tres", "calc", "notes"],
  informatica: ["bases", "bytes", "cidr", "atalhos", "notes"],
  penal: ["penal", "prazo", "notes"],
  direito: ["prazo", "notes"],
  transito: ["multa", "prazo", "notes"],
  general: ["notes"],
};

const AREA_TITLE: Record<ToolsArea, string> = {
  portugues: "Ferramentas de Português",
  raciocinio: "Ferramentas de Raciocínio Lógico",
  estatistica: "Ferramentas de Estatística",
  contabilidade: "Ferramentas de Contabilidade",
  informatica: "Ferramentas de Informática",
  penal: "Ferramentas de Direito Penal",
  direito: "Ferramentas de Direito",
  transito: "Ferramentas de Trânsito",
  general: "Ferramentas de estudo",
};

/** Escolhe o conjunto de ferramentas pela disciplina (ou assunto) em estudo. */
export function toolsAreaFor(subject: string): ToolsArea {
  const s = subject.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  if (/portugu|redacao|redacao oficial/.test(s)) return "portugues";
  if (/estatistica/.test(s)) return "estatistica";
  if (/raciocinio|logico|matematica/.test(s)) return "raciocinio";
  if (/contabil|financeira|custos/.test(s)) return "contabilidade";
  if (/informatica|tecnologia da informacao|computacao|redes/.test(s)) return "informatica";
  if (/transito|\bctb\b|contran/.test(s)) return "transito";
  if (/penal|processual|execucao|armas|drogas|\beca\b|contravenc|crime|hediond|tortura|maria da penha|abuso|\blep\b|codigo penal|antifaccao|organizac/.test(s)) return "penal";
  if (/direito|legisla|constitucional|administrativo|humanos|\blei\b|ordem juridica|etica/.test(s)) return "direito";
  return "general";
}

const inputCls = "w-full rounded-lg border bg-background px-3 py-2 text-sm";
const cardCls = "rounded-xl border bg-card p-3";
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => <label className="block text-xs font-medium text-muted-foreground">{label}{children}</label>;
const Row = ({ k, v }: { k: string; v: React.ReactNode }) => <div className="flex justify-between gap-3 py-1.5 text-sm"><dt className="text-muted-foreground">{k}</dt><dd className="break-all text-right font-mono font-semibold">{v}</dd></div>;
const num = (v: string) => (v.trim() === "" ? NaN : Number(v.replace(",", ".")));

// ───────── Calculadora compacta (só nas disciplinas que usam) ─────────
const KEYS = ["(", ")", "%", "C", "7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ",", "^", "+", "√(", "π", "!", "="];
function CalculatorTool() {
  const [expr, setExpr] = useState("");
  const [history, setHistory] = useState<{ e: string; r: string }[]>([]);
  const [error, setError] = useState("");
  const result = useMemo(() => { if (!expr.trim()) return ""; try { return fmt(calc(expr)); } catch { return ""; } }, [expr]);
  const press = (k: string) => {
    setError("");
    if (k === "C") return setExpr("");
    if (k === "=") {
      try {
        const r = fmt(calc(expr));
        setHistory((h) => [{ e: expr, r }, ...h].slice(0, 4));
        setExpr(r.replace(/\./g, ""));
      } catch (e) { setError(e instanceof Error ? e.message : "Expressão inválida"); }
      return;
    }
    setExpr((x) => x + k);
  };
  return (
    <div className="space-y-2">
      <input className={cn(inputCls, "font-mono")} value={expr} onChange={(e) => { setExpr(e.target.value); setError(""); }} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); press("="); } }} placeholder="2+3×4, (5+1)^2, sqrt(81), 20%…" aria-label="Expressão" />
      <div className="min-h-9 rounded-lg bg-muted/50 px-3 py-1 text-right font-mono text-xl font-bold" aria-live="polite">{error ? <span className="text-sm text-rose-600">{error}</span> : result || "0"}</div>
      <div className="grid grid-cols-4 gap-1.5">
        {KEYS.map((k) => (
          <button key={k} type="button" onClick={() => press(k)} className={cn("rounded-md border py-1.5 text-sm font-semibold transition hover:bg-muted active:scale-95", k === "=" && "border-0 bg-primary text-primary-foreground hover:bg-primary/90", "÷×−+^".includes(k) && "bg-muted/60", k === "C" && "text-rose-600")}>{k}</button>
        ))}
      </div>
      {history.length > 0 && <ul className="space-y-0.5 text-xs">{history.map((h, i) => <li key={`${h.e}-${i}`}><button type="button" className="flex w-full justify-between gap-2 rounded px-2 py-0.5 text-left hover:bg-muted" onClick={() => setExpr(h.e)}><span className="truncate font-mono text-muted-foreground">{h.e}</span><span className="font-mono font-semibold">= {h.r}</span></button></li>)}</ul>}
      <p className="text-[11px] text-muted-foreground">Também aceita sqrt( ), abs( ), ln( ), log( ), sin( ), cos( ), tan( ) em graus.</p>
    </div>
  );
}

// ───────── Estatística ─────────
function StatsTool() {
  const [text, setText] = useState("2 3 3 5 12");
  const d = useMemo(() => describe(parseNumbers(text)), [text]);
  return (
    <div className="space-y-3">
      <Field label="Dados (separe por espaço ou ponto e vírgula; vírgula decimal)"><textarea className={cn(inputCls, "mt-1 min-h-16 font-mono")} value={text} onChange={(e) => setText(e.target.value)} /></Field>
      {d ? (
        <dl className={cn(cardCls, "divide-y")}>
          <Row k="Quantidade (n)" v={fmt(d.n)} /><Row k="Soma" v={fmt(d.sum)} /><Row k="Média" v={fmt(d.mean)} /><Row k="Mediana" v={fmt(d.median)} />
          <Row k="Moda" v={d.modes.length ? d.modes.map((m) => fmt(m)).join(", ") : "sem moda"} />
          <Row k="Mínimo / máximo" v={`${fmt(d.min)} / ${fmt(d.max)}`} /><Row k="Amplitude" v={fmt(d.range)} />
          <Row k="Variância populacional" v={fmt(d.varPop)} /><Row k="Desvio padrão populacional" v={fmt(d.sdPop)} />
          <Row k="Variância amostral" v={Number.isNaN(d.varSample) ? "—" : fmt(d.varSample)} /><Row k="Desvio padrão amostral" v={Number.isNaN(d.sdSample) ? "—" : fmt(d.sdSample)} />
          <Row k="Coeficiente de variação" v={Number.isNaN(d.cv) ? "—" : `${fmt(d.cv * 100, 6)}%`} />
        </dl>
      ) : <p className="text-sm text-muted-foreground">Digite ao menos um número.</p>}
    </div>
  );
}

function NormalTool() {
  const [mu, setMu] = useState("70"), [sd, setSd] = useState("10"), [x, setX] = useState("85");
  let out: ReturnType<typeof escorePadrao> | null = null;
  let err = "";
  try { out = escorePadrao(num(x), num(mu), num(sd)); if (Number.isNaN(out.z)) throw new Error("Preencha os três campos"); } catch (e) { err = e instanceof Error ? e.message : "Valores inválidos"; out = null; }
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2"><Field label="Média (μ)"><input className={inputCls} value={mu} onChange={(e) => setMu(e.target.value)} /></Field><Field label="Desvio (σ)"><input className={inputCls} value={sd} onChange={(e) => setSd(e.target.value)} /></Field><Field label="Valor (x)"><input className={inputCls} value={x} onChange={(e) => setX(e.target.value)} /></Field></div>
      {err ? <p className="text-sm text-rose-600">{err}</p> : out && <dl className={cn(cardCls, "divide-y")}><Row k="Escore padrão z" v={fmt(out.z, 6)} /><Row k="P(X ≤ x)" v={`${fmt(out.abaixo * 100, 5)}%`} /><Row k="P(X > x)" v={`${fmt(out.acima * 100, 5)}%`} /></dl>}
      <div className={cn(cardCls, "text-xs leading-5")}><p className="font-semibold">Regra empírica (68-95-99,7)</p><p>μ ± 1σ: cerca de 68% · μ ± 2σ: cerca de 95% · μ ± 3σ: cerca de 99,7%.</p>{!err && Number.isFinite(num(sd)) && <p className="mt-1 font-mono">{fmt(num(mu) - num(sd))} a {fmt(num(mu) + num(sd))} · {fmt(num(mu) - 2 * num(sd))} a {fmt(num(mu) + 2 * num(sd))} · {fmt(num(mu) - 3 * num(sd))} a {fmt(num(mu) + 3 * num(sd))}</p>}</div>
    </div>
  );
}

// ───────── Raciocínio lógico ─────────
function CombTool() {
  const [n, setN] = useState("5"), [k, setK] = useState("2");
  const N = Number(n), K = Number(k);
  let out: [string, string][] = [];
  let err = "";
  try { out = [["n!", fat(N).toLocaleString("pt-BR")], ["Arranjo A(n,k)", arranjo(N, K).toLocaleString("pt-BR")], ["Combinação C(n,k)", combinacao(N, K).toLocaleString("pt-BR")]]; } catch (e) { err = e instanceof Error ? e.message : "Valores inválidos"; }
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2"><Field label="n (total)"><input className={inputCls} type="number" min={0} value={n} onChange={(e) => setN(e.target.value)} /></Field><Field label="k (escolhidos)"><input className={inputCls} type="number" min={0} value={k} onChange={(e) => setK(e.target.value)} /></Field></div>
      {err ? <p className="text-sm text-rose-600">{err}</p> : <dl className={cn(cardCls, "divide-y")}>{out.map(([a, b]) => <Row key={a} k={a} v={b} />)}</dl>}
      <p className="text-xs text-muted-foreground">A ordem importa? Arranjo. Não importa? Combinação. Probabilidade = casos favoráveis ÷ casos possíveis.</p>
    </div>
  );
}

function ProportionTool() {
  const [a, setA] = useState("4"), [b, setB] = useState("12"), [c, setC] = useState("6");
  const [inv, setInv] = useState(true);
  const [pv, setPv] = useState("200"), [pp, setPp] = useState("15");
  let x = "";
  try { x = fmt(regraDeTres(Number(a), Number(b), Number(c), inv)); } catch (e) { x = e instanceof Error ? e.message : "—"; }
  const pct = (Number(pv) * Number(pp)) / 100;
  return (
    <div className="space-y-3">
      <section className={cardCls}>
        <h4 className="text-sm font-bold">Regra de três</h4><p className="text-xs text-muted-foreground">A está para B assim como C está para X.</p>
        <div className="mt-2 grid grid-cols-3 gap-2">{([["A", a, setA], ["B", b, setB], ["C", c, setC]] as const).map(([l, v, set]) => <Field key={l} label={l}><input className={inputCls} type="number" value={v} onChange={(e) => set(e.target.value)} /></Field>)}</div>
        <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={inv} onChange={(e) => setInv(e.target.checked)} /> Inversamente proporcionais</label>
        <p className="mt-2 text-lg font-bold">X = <span className="font-mono">{x}</span></p>
      </section>
      <section className={cardCls}>
        <h4 className="text-sm font-bold">Porcentagem</h4>
        <div className="mt-2 grid grid-cols-2 gap-2"><Field label="Valor"><input className={inputCls} type="number" value={pv} onChange={(e) => setPv(e.target.value)} /></Field><Field label="Percentual (%)"><input className={inputCls} type="number" value={pp} onChange={(e) => setPp(e.target.value)} /></Field></div>
        <p className="mt-2 text-sm">{pp}% de {pv} = <strong className="font-mono">{fmt(pct)}</strong> · acréscimo: <strong className="font-mono">{fmt(Number(pv) + pct)}</strong> · desconto: <strong className="font-mono">{fmt(Number(pv) - pct)}</strong></p>
      </section>
    </div>
  );
}

function TruthTool() {
  const [src, setSrc] = useState("p→q");
  let table: ReturnType<typeof truthTable> | null = null;
  let err = "";
  try { table = truthTable(src); } catch (e) { err = e instanceof Error ? e.message : "Expressão inválida"; }
  return (
    <div className="space-y-3">
      <input className={cn(inputCls, "font-mono text-base")} value={src} onChange={(e) => setSrc(e.target.value)} aria-label="Proposição composta" />
      <div className="flex flex-wrap gap-1.5">
        {["¬", "∧", "∨", "→", "↔", "⊻", "(", ")", "p", "q", "r"].map((s) => <button key={s} type="button" className="min-w-8 rounded-md border px-2 py-0.5 font-mono text-sm hover:bg-muted" onClick={() => setSrc((v) => v + s)}>{s}</button>)}
        <button type="button" className="rounded-md border px-2 py-0.5 text-sm text-rose-600 hover:bg-muted" onClick={() => setSrc("")}>limpar</button>
      </div>
      {err ? <p className="text-sm text-rose-600">{err}</p> : table && (
        <>
          <div className="overflow-x-auto rounded-xl border"><table className="w-full text-center text-sm"><thead className="bg-muted/60"><tr>{table.vars.map((v) => <th key={v} className="px-3 py-1 font-mono">{v}</th>)}<th className="px-3 py-1">Resultado</th></tr></thead><tbody>{table.rows.map((r, i) => <tr key={i} className="border-t">{r.values.map((v, j) => <td key={j} className="px-3 py-0.5 font-mono">{v ? "V" : "F"}</td>)}<td className={cn("px-3 py-0.5 font-mono font-bold", r.result ? "text-emerald-600" : "text-rose-600")}>{r.result ? "V" : "F"}</td></tr>)}</tbody></table></div>
          <p className="text-sm">Classificação: <strong className="capitalize">{table.kind}</strong></p>
        </>
      )}
      <p className="text-[11px] text-muted-foreground">¬ não · ∧ e · ∨ ou · → se…então · ↔ se e somente se · ⊻ ou exclusivo. Aceita também ~ ! &amp; | -&gt; &lt;-&gt;.</p>
    </div>
  );
}

function VennTool() {
  const [a, setA] = useState("18"), [b, setB] = useState("15"), [i, setI] = useState("8"), [u, setU] = useState("30");
  let out: ReturnType<typeof venn> | null = null;
  let err = "";
  try { out = venn(num(a), num(b), num(i), u.trim() === "" ? undefined : num(u)); if ([a, b, i].some((v) => Number.isNaN(num(v)))) throw new Error("Preencha n(A), n(B) e a interseção"); } catch (e) { err = e instanceof Error ? e.message : "Valores inválidos"; out = null; }
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2"><Field label="n(A)"><input className={inputCls} value={a} onChange={(e) => setA(e.target.value)} /></Field><Field label="n(B)"><input className={inputCls} value={b} onChange={(e) => setB(e.target.value)} /></Field><Field label="n(A ∩ B)"><input className={inputCls} value={i} onChange={(e) => setI(e.target.value)} /></Field><Field label="Total do universo (opcional)"><input className={inputCls} value={u} onChange={(e) => setU(e.target.value)} /></Field></div>
      {err ? <p className="text-sm text-rose-600">{err}</p> : out && (
        <>
          <svg viewBox="0 0 260 140" className="w-full rounded-xl border bg-card" role="img" aria-label="Diagrama de Venn">
            <circle cx="100" cy="70" r="52" className="fill-sky-400/30 stroke-sky-600" /><circle cx="160" cy="70" r="52" className="fill-amber-400/30 stroke-amber-600" />
            <text x="72" y="74" textAnchor="middle" className="fill-foreground text-[14px] font-bold">{out.onlyA}</text><text x="130" y="74" textAnchor="middle" className="fill-foreground text-[14px] font-bold">{out.inter}</text><text x="188" y="74" textAnchor="middle" className="fill-foreground text-[14px] font-bold">{out.onlyB}</text>
            <text x="100" y="22" textAnchor="middle" className="fill-sky-700 text-[10px]">A</text><text x="160" y="22" textAnchor="middle" className="fill-amber-700 text-[10px]">B</text>
          </svg>
          <dl className={cn(cardCls, "divide-y")}><Row k="Só em A" v={out.onlyA} /><Row k="Só em B" v={out.onlyB} /><Row k="Em A e B" v={out.inter} /><Row k="União (A ∪ B)" v={out.union} />{out.outside !== undefined && <Row k="Em nenhum" v={out.outside} />}</dl>
          <p className="text-[11px] text-muted-foreground">n(A ∪ B) = n(A) + n(B) − n(A ∩ B). Comece sempre pela interseção.</p>
        </>
      )}
    </div>
  );
}

// ───────── Contabilidade ─────────
function AccountingTool() {
  const [ac, setAc] = useState("200"), [pc, setPc] = useState("100"), [est, setEst] = useState("50"), [rlp, setRlp] = useState("40"), [pnc, setPnc] = useState("60");
  const [custo, setCusto] = useState("12000"), [res, setRes] = useState("2000"), [vida, setVida] = useState("5");
  const [cf, setCf] = useState("10000"), [preco, setPreco] = useState("50"), [cv, setCv] = useState("30");
  const [cap, setCap] = useState("1000"), [taxa, setTaxa] = useState("10"), [per, setPer] = useState("2");
  const safe = <T,>(f: () => T): T | string => { try { return f(); } catch (e) { return e instanceof Error ? e.message : "Valores inválidos"; } };
  const liq = safe(() => liquidez(num(ac), num(pc), num(est), num(rlp), num(pnc)));
  const dep = safe(() => depreciacaoLinear(num(custo), num(res), num(vida)));
  const pe = safe(() => pontoEquilibrio(num(cf), num(preco), num(cv)));
  const jc = jurosCompostos(num(cap), num(taxa), num(per));
  const err = (v: unknown) => typeof v === "string" ? <p className="mt-2 text-sm text-rose-600">{v}</p> : null;
  const inp = (l: string, v: string, set: (s: string) => void) => <Field label={l}><input className={inputCls} value={v} onChange={(e) => set(e.target.value)} /></Field>;
  return (
    <div className="space-y-3">
      <section className={cardCls}><h4 className="text-sm font-bold">Liquidez</h4>
        <div className="mt-2 grid grid-cols-2 gap-2">{inp("Ativo circulante", ac, setAc)}{inp("Passivo circulante", pc, setPc)}{inp("Estoques", est, setEst)}{inp("Realizável a longo prazo", rlp, setRlp)}{inp("Passivo não circulante", pnc, setPnc)}</div>
        {err(liq)}{typeof liq !== "string" && <dl className="mt-2 divide-y"><Row k="Corrente (AC ÷ PC)" v={fmt(liq.corrente, 5)} /><Row k="Seca ((AC − estoques) ÷ PC)" v={fmt(liq.seca, 5)} /><Row k="Geral ((AC + RLP) ÷ (PC + PNC))" v={Number.isNaN(liq.geral) ? "—" : fmt(liq.geral, 5)} /></dl>}
      </section>
      <section className={cardCls}><h4 className="text-sm font-bold">Depreciação linear</h4>
        <div className="mt-2 grid grid-cols-3 gap-2">{inp("Custo", custo, setCusto)}{inp("Residual", res, setRes)}{inp("Vida útil (anos)", vida, setVida)}</div>
        {err(dep)}{typeof dep !== "string" && <dl className="mt-2 divide-y"><Row k="Por ano" v={fmt(dep.anual)} /><Row k="Por mês" v={fmt(dep.mensal)} /><Row k="Taxa anual" v={`${fmt(dep.taxa * 100, 5)}%`} /></dl>}
      </section>
      <section className={cardCls}><h4 className="text-sm font-bold">Ponto de equilíbrio</h4>
        <div className="mt-2 grid grid-cols-3 gap-2">{inp("Custos fixos", cf, setCf)}{inp("Preço unitário", preco, setPreco)}{inp("Custo variável unit.", cv, setCv)}</div>
        {err(pe)}{typeof pe !== "string" && <dl className="mt-2 divide-y"><Row k="Margem de contribuição unit." v={fmt(pe.margem)} /><Row k="Ponto de equilíbrio (unidades)" v={fmt(pe.unidades)} /><Row k="Índice da margem" v={`${fmt(pe.indiceMargem * 100, 5)}%`} /></dl>}
      </section>
      <section className={cardCls}><h4 className="text-sm font-bold">Juros compostos x simples</h4>
        <div className="mt-2 grid grid-cols-3 gap-2">{inp("Capital", cap, setCap)}{inp("Taxa (% por período)", taxa, setTaxa)}{inp("Períodos", per, setPer)}</div>
        {Number.isFinite(jc.montante) && <dl className="mt-2 divide-y"><Row k="Montante (compostos)" v={fmt(jc.montante)} /><Row k="Juros (compostos)" v={fmt(jc.juros)} /><Row k="Montante (simples)" v={fmt(jc.simples)} /></dl>}
      </section>
    </div>
  );
}

// ───────── Informática ─────────
function BasesTool() {
  const [text, setText] = useState("255"), [base, setBase] = useState<2 | 8 | 10 | 16>(10);
  let out: ReturnType<typeof baseConvert> | null = null;
  let err = "";
  try { out = baseConvert(text, base); } catch (e) { err = e instanceof Error ? e.message : "Valor inválido"; }
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_8rem] gap-2"><Field label="Número"><input className={cn(inputCls, "font-mono")} value={text} onChange={(e) => setText(e.target.value)} /></Field><Field label="Base de entrada"><select className={inputCls} value={base} onChange={(e) => setBase(Number(e.target.value) as 2 | 8 | 10 | 16)}><option value={2}>Binário (2)</option><option value={8}>Octal (8)</option><option value={10}>Decimal (10)</option><option value={16}>Hexadecimal (16)</option></select></Field></div>
      {err ? <p className="text-sm text-rose-600">{err}</p> : out && <dl className={cn(cardCls, "divide-y")}><Row k="Binário" v={out.bin} /><Row k="Octal" v={out.oct} /><Row k="Decimal" v={out.dec} /><Row k="Hexadecimal" v={out.hex} /></dl>}
    </div>
  );
}
function BytesTool() {
  const [v, setV] = useState("1"), [u, setU] = useState<(typeof BYTE_UNITS)[number]>("GB"), [bin, setBin] = useState(true);
  let out: ReturnType<typeof convertBytes> | null = null;
  let err = "";
  try { out = convertBytes(num(v), u, bin); } catch (e) { err = e instanceof Error ? e.message : "Valor inválido"; }
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_6rem] gap-2"><Field label="Valor"><input className={inputCls} value={v} onChange={(e) => setV(e.target.value)} /></Field><Field label="Unidade"><select className={inputCls} value={u} onChange={(e) => setU(e.target.value as (typeof BYTE_UNITS)[number])}>{BYTE_UNITS.map((x) => <option key={x}>{x}</option>)}</select></Field></div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={bin} onChange={(e) => setBin(e.target.checked)} /> Base 1024 (1 KB = 1024 B). Desmarcado: base 1000.</label>
      {err ? <p className="text-sm text-rose-600">{err}</p> : out && <dl className={cn(cardCls, "divide-y")}>{BYTE_UNITS.map((x) => <Row key={x} k={x} v={fmt(out[x], 8)} />)}</dl>}
    </div>
  );
}
function CidrTool() {
  const [ip, setIp] = useState("192.168.1.10"), [p, setP] = useState("24");
  let out: ReturnType<typeof cidr> | null = null;
  let err = "";
  try { out = cidr(ip, Number(p)); } catch (e) { err = e instanceof Error ? e.message : "Valor inválido"; }
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_5rem] gap-2"><Field label="Endereço IPv4"><input className={cn(inputCls, "font-mono")} value={ip} onChange={(e) => setIp(e.target.value)} /></Field><Field label="Prefixo /"><input className={inputCls} value={p} onChange={(e) => setP(e.target.value)} /></Field></div>
      {err ? <p className="text-sm text-rose-600">{err}</p> : out && <dl className={cn(cardCls, "divide-y")}><Row k="Máscara" v={out.mask} /><Row k="Rede" v={out.network} /><Row k="Broadcast" v={out.broadcast} /><Row k="Primeiro host" v={out.first} /><Row k="Último host" v={out.last} /><Row k="Hosts utilizáveis" v={out.hosts.toLocaleString("pt-BR")} /></dl>}
      <p className="text-[11px] text-muted-foreground">Hosts utilizáveis = 2^(32 − prefixo) − 2 (a rede e o broadcast não recebem host).</p>
    </div>
  );
}
const ATALHOS: { grupo: string; itens: [string, string][] }[] = [
  { grupo: "Windows", itens: [["Ctrl + C / X / V", "Copiar, recortar, colar"], ["Ctrl + Z / Y", "Desfazer, refazer"], ["Alt + Tab", "Alternar entre janelas"], ["Win + D", "Mostrar a área de trabalho"], ["Win + E", "Abrir o Explorador de Arquivos"], ["Win + L", "Bloquear o computador"], ["Ctrl + Shift + Esc", "Gerenciador de Tarefas"], ["F2", "Renomear"], ["Shift + Delete", "Excluir sem passar pela lixeira"]] },
  { grupo: "Editor de texto", itens: [["Ctrl + B / I / U", "Negrito, itálico, sublinhado"], ["Ctrl + A", "Selecionar tudo"], ["Ctrl + F", "Localizar"], ["Ctrl + S", "Salvar"], ["Ctrl + P", "Imprimir"], ["F7", "Verificar ortografia"], ["Ctrl + Enter", "Quebra de página"]] },
  { grupo: "Planilha", itens: [["F2", "Editar a célula"], ["F4", "Alternar referência absoluta e relativa"], ["Ctrl + ;", "Inserir a data atual"], ["Alt + =", "Autosoma"], ["Ctrl + Home", "Ir para a célula A1"]] },
];
function ShortcutsTool() {
  const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();
  return (
    <div className="space-y-3">
      <input className={inputCls} placeholder="Buscar atalho ou ação…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar atalho" />
      {ATALHOS.map((g) => { const items = g.itens.filter(([k, d]) => !s || `${k} ${d}`.toLowerCase().includes(s)); return items.length ? <section key={g.grupo} className={cardCls}><h4 className="text-sm font-bold">{g.grupo}</h4><dl className="mt-1 divide-y">{items.map(([k, d]) => <div key={k} className="grid grid-cols-[9rem_1fr] gap-2 py-1.5 text-sm"><dt className="font-mono text-xs font-semibold">{k}</dt><dd>{d}</dd></div>)}</dl></section> : null; })}
    </div>
  );
}

// ───────── Português ─────────
const CRASE_STEPS: { q: string; sim?: string; nao?: string; fimSim?: string; fimNao?: string }[] = [
  { q: "A palavra depois do “a” é feminina e admite o artigo “a”? (a casa, a escola, a reunião)", sim: "1", fimNao: "Não há crase. Antes de palavra masculina, verbo, pronome pessoal ou de tratamento (Vossa Excelência) e palavras no plural sem artigo, o “a” é só preposição." },
  { q: "O termo anterior exige a preposição “a”? (ir a, chegar a, referir-se a, entregar a, assistir a o filme…)", sim: "2", fimNao: "Não há crase: sem a preposição, o “a” é apenas o artigo (Vi a reunião)." },
  { q: "Troque a palavra feminina por uma masculina. Aparece “ao”? (Fui à escola → Fui ao colégio)", fimSim: "Há crase: preposição “a” + artigo “a”. Use o acento grave: à.", fimNao: "Não há crase: o teste do “ao” falhou, então não há fusão da preposição com o artigo." },
];
function CraseTool() {
  const [step, setStep] = useState(0);
  const [end, setEnd] = useState<string | null>(null);
  const s = CRASE_STEPS[step]!;
  const answer = (yes: boolean) => {
    if (yes) { if (s.fimSim) return setEnd(s.fimSim); setStep(Number(s.sim)); }
    else setEnd(s.fimNao ?? "Não há crase.");
  };
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Responda às perguntas na ordem para decidir se usa o acento grave.</p>
      {end ? (
        <div className="space-y-3"><p className={cn(cardCls, "text-sm font-medium")}>{end}</p><Button size="sm" variant="outline" onClick={() => { setStep(0); setEnd(null); }}>Testar outra frase</Button></div>
      ) : (
        <div className={cn(cardCls, "space-y-3")}><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Pergunta {step + 1} de {CRASE_STEPS.length}</p><p className="text-sm font-medium leading-6">{s.q}</p><div className="flex gap-2"><Button size="sm" onClick={() => answer(true)}>Sim</Button><Button size="sm" variant="outline" onClick={() => answer(false)}>Não</Button></div></div>
      )}
      <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground"><li>Antes de verbo nunca há crase.</li><li>Há crase em horas determinadas (às 8 horas) e em “à moda de”, “à vista”.</li><li>“Vou a Brasília” (sem crase); “Vou à Bahia” (com crase): troque por “Volto de…” e veja se aparece “da”.</li></ul>
    </div>
  );
}
const CONJUNCOES: { valor: string; exemplos: string; nota: string }[] = [
  { valor: "Adição", exemplos: "e, nem, além disso, bem como", nota: "Somam ideias." },
  { valor: "Oposição (adversativas)", exemplos: "mas, porém, contudo, todavia, entretanto, no entanto", nota: "Contrariam a ideia anterior." },
  { valor: "Concessão", exemplos: "embora, ainda que, mesmo que, conquanto, apesar de que", nota: "Admitem um obstáculo que não impede (pedem subjuntivo)." },
  { valor: "Causa", exemplos: "porque, já que, visto que, uma vez que, como (no início)", nota: "Indicam o motivo." },
  { valor: "Conclusão", exemplos: "portanto, logo, assim, por isso, pois (depois do verbo)", nota: "Indicam consequência lógica." },
  { valor: "Explicação", exemplos: "pois (antes do verbo), porque, que", nota: "Justificam o que foi dito." },
  { valor: "Condição", exemplos: "se, caso, desde que, contanto que, a menos que", nota: "Indicam requisito." },
  { valor: "Finalidade", exemplos: "para que, a fim de que", nota: "Indicam objetivo." },
  { valor: "Tempo", exemplos: "quando, enquanto, assim que, logo que, depois que", nota: "Situam no tempo." },
  { valor: "Alternância", exemplos: "ou, ora… ora, seja… seja", nota: "Apresentam opções." },
  { valor: "Consequência", exemplos: "de modo que, tanto que, tão… que", nota: "Mostram o efeito da intensidade." },
  { valor: "Comparação", exemplos: "como, tal qual, assim como, mais… do que", nota: "Comparam elementos." },
];
function ConjunctionsTool() {
  const [q, setQ] = useState("");
  const s = q.trim().toLowerCase();
  const rows = CONJUNCOES.filter((c) => !s || `${c.valor} ${c.exemplos}`.toLowerCase().includes(s));
  return (
    <div className="space-y-3">
      <input className={inputCls} placeholder="Digite a conjunção (ex.: embora) ou o valor (ex.: causa)" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar conjunção" />
      {rows.map((c) => <section key={c.valor} className={cardCls}><h4 className="text-sm font-bold">{c.valor}</h4><p className="mt-1 text-sm font-medium">{c.exemplos}</p><p className="mt-1 text-xs text-muted-foreground">{c.nota}</p></section>)}
      {!rows.length && <p className="text-sm text-muted-foreground">Nenhuma conjunção encontrada.</p>}
      <p className="text-[11px] text-muted-foreground">Na reescrita de frases, trocar a conjunção por outra de valor diferente muda o sentido.</p>
    </div>
  );
}
function PunctuationTool() {
  const cards: [string, string[]][] = [
    ["Vírgula: use", ["Separar itens de uma enumeração", "Isolar aposto, vocativo e expressões explicativas", "Isolar adjunto adverbial deslocado e orações intercaladas", "Depois de oração adverbial que vem antes da principal"]],
    ["Vírgula: não use", ["Entre sujeito e verbo", "Entre verbo e complemento na ordem direta", "Entre o nome e o complemento nominal"]],
    ["Outros sinais", ["Ponto e vírgula: separa itens longos ou orações já pontuadas", "Dois-pontos: anunciam enumeração, explicação ou citação", "Travessão e parênteses: isolam informação intercalada"]],
    ["Cuidado", ["Oração adjetiva explicativa vem entre vírgulas; a restritiva, não", "A vírgula pode mudar o sentido: “Não, espere” x “Não espere”"]],
  ];
  return <div className="space-y-3">{cards.map(([t, items]) => <section key={t} className={cardCls}><h4 className="text-sm font-bold">{t}</h4><ul className="mt-1 list-disc space-y-1 pl-5 text-sm">{items.map((i) => <li key={i}>{i}</li>)}</ul></section>)}</div>;
}

// ───────── Direito: prazos, multa e calculadora penal ─────────
function DeadlineTool() {
  const [inicio, setInicio] = useState(() => new Date().toISOString().slice(0, 10));
  const [dias, setDias] = useState("10");
  const [excluir, setExcluir] = useState(true), [uteis, setUteis] = useState(false);
  let fim: number | null = null;
  let err = "";
  try { fim = somarPrazo(inicio, Number(dias), { excluirInicio: excluir, diasUteis: uteis }); } catch (e) { err = e instanceof Error ? e.message : "Dados inválidos"; }
  const prorrogado = fim === null ? null : proximoDiaUtil(fim);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2"><Field label="Data de início (ciência ou intimação)"><input className={inputCls} type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} /></Field><Field label="Prazo (dias)"><input className={inputCls} type="number" min={0} value={dias} onChange={(e) => setDias(e.target.value)} /></Field></div>
      <label className="flex items-start gap-2 text-sm"><input className="mt-1" type="checkbox" checked={excluir} onChange={(e) => setExcluir(e.target.checked)} /> Excluir o dia do começo e incluir o do vencimento (regra usual de prazos processuais; ex.: CPP, art. 798, § 1º)</label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={uteis} onChange={(e) => setUteis(e.target.checked)} /> Contar só dias úteis (sem sábados e domingos)</label>
      {err ? <p className="text-sm text-rose-600">{err}</p> : fim !== null && prorrogado !== null && (
        <dl className={cn(cardCls, "divide-y")}><Row k="Último dia do prazo" v={`${formatBr(fim)} (${new Date(fim).toLocaleDateString("pt-BR", { weekday: "long", timeZone: "UTC" })})`} />{prorrogado !== fim && <Row k="Se cair em fim de semana, prorroga para" v={formatBr(prorrogado)} />}</dl>
      )}
      <p className="text-[11px] text-muted-foreground">Feriados e suspensões de prazo não são considerados. Para a contagem de pena, o dia do começo conta (CP, art. 10); desmarque a primeira opção.</p>
    </div>
  );
}
function FineTool() {
  const [g, setG] = useState<Gravidade>("gravissima");
  const [fator, setFator] = useState("1");
  const base = GRAVIDADES[g];
  const f = Number(fator) || 1;
  const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2"><Field label="Gravidade"><select className={inputCls} value={g} onChange={(e) => setG(e.target.value as Gravidade)}>{(Object.keys(GRAVIDADES) as Gravidade[]).map((k) => <option key={k} value={k}>{GRAVIDADES[k].label}</option>)}</select></Field><Field label="Fator da infração"><select className={inputCls} value={fator} onChange={(e) => setFator(e.target.value)}>{[1, 2, 3, 5, 10].map((x) => <option key={x} value={x}>{x === 1 ? "Sem fator" : `${x} vezes`}</option>)}</select></Field></div>
      <dl className={cn(cardCls, "divide-y")}><Row k="Valor-base" v={brl(base.multa)} /><Row k="Multa" v={brl(base.multa * f)} /><Row k="Pontos na CNH" v={base.pontos} /></dl>
      <Button asChild variant="outline" size="sm"><Link to="/dashboard/ctb">Abrir o Painel do CTB (infrações, suspensão, prazos)</Link></Button>
      <p className="text-[11px] text-muted-foreground">Valores-base do art. 258 e pontos do art. 259 do CTB, conforme o Painel do CTB. O fator multiplica a multa quando o artigo da infração o prevê.</p>
    </div>
  );
}
function PenalLink() {
  return (
    <div className="space-y-3 text-sm">
      <p>Dosimetria em três fases, regime inicial, progressão, livramento condicional, prescrição, detração e remição, com os critérios do Código Penal e da Lei de Execução Penal.</p>
      <Button asChild><Link to="/dashboard/calculadora-penal">Abrir a calculadora penal</Link></Button>
      <p className="text-xs text-muted-foreground">A calculadora abre em outra tela: o relógio de estudo fica em pausa e você volta pelo botão no topo.</p>
    </div>
  );
}

// ───────── Anotações ─────────
function NotesTool({ storageKey }: { storageKey: string }) {
  const [text, setText] = useState("");
  useEffect(() => { try { setText(localStorage.getItem(`foco-notas:${storageKey}`) ?? ""); } catch { /* sem armazenamento */ } }, [storageKey]);
  const save = (v: string) => { setText(v); try { localStorage.setItem(`foco-notas:${storageKey}`, v); } catch { /* sem armazenamento */ } };
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
  const current = ids.includes(tool) ? tool : ids[0]!;
  return (
    <aside className="fixed bottom-0 right-0 top-[4.25rem] z-[62] flex w-full max-w-sm flex-col border-l bg-background shadow-2xl" aria-label={AREA_TITLE[area]}>
      <header className="flex items-center justify-between gap-2 border-b bg-gradient-to-r from-indigo-50 to-fuchsia-50 px-4 py-2 dark:from-indigo-950/40 dark:to-fuchsia-950/30">
        <p className="text-sm font-bold">{AREA_TITLE[area]}</p>
        <Button size="sm" variant="ghost" onClick={onClose} aria-label="Fechar ferramentas"><X className="h-4 w-4" /></Button>
      </header>
      {ids.length > 1 && (
        <div className="flex gap-1 overflow-x-auto border-b px-2 py-2">
          {ids.map((id) => { const Icon = TOOLS[id].icon; return (
            <button key={id} type="button" onClick={() => setTool(id)} aria-pressed={current === id} className={cn("flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold", current === id ? "bg-primary text-primary-foreground" : "hover:bg-muted")}><Icon className="h-3.5 w-3.5" /> {TOOLS[id].label}</button>
          ); })}
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4">
        {current === "calc" && <CalculatorTool />}
        {current === "stats" && <StatsTool />}
        {current === "normal" && <NormalTool />}
        {current === "comb" && <CombTool />}
        {current === "tres" && <ProportionTool />}
        {current === "truth" && <TruthTool />}
        {current === "venn" && <VennTool />}
        {current === "contab" && <AccountingTool />}
        {current === "bases" && <BasesTool />}
        {current === "bytes" && <BytesTool />}
        {current === "cidr" && <CidrTool />}
        {current === "atalhos" && <ShortcutsTool />}
        {current === "crase" && <CraseTool />}
        {current === "conjuncoes" && <ConjunctionsTool />}
        {current === "pontuacao" && <PunctuationTool />}
        {current === "prazo" && <DeadlineTool />}
        {current === "multa" && <FineTool />}
        {current === "penal" && <PenalLink />}
        {current === "notes" && <NotesTool storageKey={notesKey} />}
      </div>
    </aside>
  );
}
