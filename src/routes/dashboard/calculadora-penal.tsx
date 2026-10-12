import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CalendarClock, Gavel, Scale } from "lucide-react";
import { PageHero } from "@/components/dashboard/PageHero";
import { Button } from "@/components/ui/button";
import {
  CATEGORIAS_PROGRESSAO,
  CRIMES,
  LIVRAMENTO,
  beneficios,
  diasParaPena,
  dosimetria,
  formatBr,
  formatPena,
  fracaoValor,
  marcoExecucao,
  parseDate,
  penaParaDias,
  prescricao,
  regimeInicial,
  remicao,
  addPena,
  type Fracao,
  type Pena,
} from "@/lib/penalCalc";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/calculadora-penal")({
  component: PenalCalculatorPage,
  head: () => ({ meta: [{ title: "Calculadora penal | Norte Concurso" }] }),
});

const field = "w-full rounded-lg border bg-background px-3 py-2 text-sm";
const card = "surface-card space-y-4 p-5";
const num = (v: string) => (Number.isFinite(Number(v)) ? Math.max(0, Number(v)) : 0);

function PenaInput({ label, value, onChange }: { label: string; value: Pena; onChange: (p: Pena) => void }) {
  return (
    <fieldset>
      <legend className="mb-1 text-sm font-medium">{label}</legend>
      <div className="grid grid-cols-3 gap-2">
        {(["anos", "meses", "dias"] as const).map((k) => (
          <label key={k} className="text-xs text-muted-foreground">
            {k}
            <input className={field} type="number" min={0} value={value[k]} onChange={(e) => onChange({ ...value, [k]: num(e.target.value) })} />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const FRACOES: { label: string; value: Fracao }[] = [
  { label: "1/8", value: { num: 1, den: 8 } },
  { label: "1/6", value: { num: 1, den: 6 } },
  { label: "1/5", value: { num: 1, den: 5 } },
  { label: "1/4", value: { num: 1, den: 4 } },
  { label: "1/3", value: { num: 1, den: 3 } },
  { label: "1/2", value: { num: 1, den: 2 } },
  { label: "2/3", value: { num: 2, den: 3 } },
];
const fracKey = (f: Fracao) => `${f.num}/${f.den}`;
function FracaoSelect({ value, onChange, label }: { value: Fracao; onChange: (f: Fracao) => void; label: string }) {
  return (
    <label className="text-sm font-medium">
      {label}
      <select className={cn(field, "mt-1")} value={fracKey(value)} onChange={(e) => onChange(FRACOES.find((f) => f.label === e.target.value)!.value)}>
        {FRACOES.map((f) => <option key={f.label} value={f.label}>{f.label}</option>)}
      </select>
    </label>
  );
}

const Result = ({ title, children, tone = "primary" }: { title: string; children: React.ReactNode; tone?: "primary" | "warn" }) => (
  <div className={cn("rounded-xl border-l-4 p-4", tone === "primary" ? "border-l-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/20" : "border-l-amber-500 bg-amber-50 dark:bg-amber-950/20")}>
    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
    <div className="mt-1 text-sm leading-6">{children}</div>
  </div>
);

// ───────── Dosimetria ─────────
function DosimetriaTab() {
  const [crimeId, setCrimeId] = useState("cp157");
  const crime = CRIMES.find((c) => c.id === crimeId);
  const [min, setMin] = useState<Pena>(crime ? crime.min : { anos: 0, meses: 0, dias: 0 });
  const [max, setMax] = useState<Pena>(crime ? crime.max : { anos: 0, meses: 0, dias: 0 });
  const [circ, setCirc] = useState(0);
  const [fCirc, setFCirc] = useState<Fracao>({ num: 1, den: 8 });
  const [agr, setAgr] = useState(0);
  const [aten, setAten] = useState(0);
  const [fAg, setFAg] = useState<Fracao>({ num: 1, den: 6 });
  const [aum, setAum] = useState<Fracao[]>([]);
  const [dim, setDim] = useState<Fracao[]>([]);
  const [reinc, setReinc] = useState(false);
  const [violencia, setViolencia] = useState(false);
  const pick = (id: string) => {
    setCrimeId(id);
    const c = CRIMES.find((x) => x.id === id);
    if (c) { setMin(c.min); setMax(c.max); }
  };
  let out: ReturnType<typeof dosimetria> | null = null;
  let err = "";
  try { out = dosimetria({ min, max, circunstanciasNegativas: circ, fracaoCircunstancia: fCirc, agravantes: agr, atenuantes: aten, fracaoAgravanteAtenuante: fAg, aumentos: aum, diminuicoes: dim }); } catch (e) { err = e instanceof Error ? e.message : "Dados inválidos"; }
  const tipo = crime?.tipo ?? "reclusão";
  const regime = out ? regimeInicial(out.final, reinc, tipo) : null;
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className={card}>
        <h2 className="text-lg font-bold">Dados do crime e das fases</h2>
        <label className="block text-sm font-medium">Crime (preceito do texto compilado)
          <select className={cn(field, "mt-1")} value={crimeId} onChange={(e) => pick(e.target.value)}>
            {CRIMES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            <option value="custom">Outro crime: informar a pena</option>
          </select>
        </label>
        <div className="grid gap-3 sm:grid-cols-2"><PenaInput label="Pena mínima" value={min} onChange={(p) => { setMin(p); setCrimeId("custom"); }} /><PenaInput label="Pena máxima" value={max} onChange={(p) => { setMax(p); setCrimeId("custom"); }} /></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">1ª fase: circunstâncias judiciais desfavoráveis<input className={cn(field, "mt-1")} type="number" min={0} max={8} value={circ} onChange={(e) => setCirc(num(e.target.value))} /></label>
          <FracaoSelect label="Fração por circunstância (sobre o intervalo)" value={fCirc} onChange={setFCirc} />
          <label className="text-sm font-medium">2ª fase: agravantes<input className={cn(field, "mt-1")} type="number" min={0} value={agr} onChange={(e) => setAgr(num(e.target.value))} /></label>
          <label className="text-sm font-medium">2ª fase: atenuantes<input className={cn(field, "mt-1")} type="number" min={0} value={aten} onChange={(e) => setAten(num(e.target.value))} /></label>
          <FracaoSelect label="Fração por agravante/atenuante" value={fAg} onChange={setFAg} />
        </div>
        {([["Causas de aumento (3ª fase)", aum, setAum], ["Causas de diminuição (3ª fase)", dim, setDim]] as const).map(([title, list, set]) => (
          <div key={title} className="space-y-2">
            <p className="text-sm font-medium">{title}</p>
            <div className="flex flex-wrap gap-2">
              {list.map((f, i) => <button key={i} type="button" className="rounded-full border bg-muted px-3 py-1 text-sm" onClick={() => set(list.filter((_, j) => j !== i))} aria-label={`Remover ${fracKey(f)}`}>{fracKey(f)} ✕</button>)}
              {FRACOES.map((f) => <button key={f.label} type="button" className="rounded-full border px-3 py-1 text-sm hover:bg-muted" onClick={() => set([...list, f.value])}>+ {f.label}</button>)}
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={reinc} onChange={(e) => setReinc(e.target.checked)} /> Réu reincidente</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={violencia} onChange={(e) => setViolencia(e.target.checked)} /> Crime com violência ou grave ameaça</label>
        </div>
      </section>
      <section className={card}>
        <h2 className="text-lg font-bold">Resultado, fase por fase</h2>
        {err && <p className="text-sm text-rose-600">{err}</p>}
        {out && (
          <>
            <ol className="space-y-2">
              {out.passos.map((p, i) => (
                <li key={i} className="rounded-xl border p-3 text-sm"><p className="font-semibold">{p.fase}: <span className="font-mono">{formatPena(diasParaPena(p.dias))}</span></p><p className="mt-1 text-muted-foreground">{p.explicacao}</p></li>
              ))}
            </ol>
            <Result title="Pena definitiva">
              <p className="text-lg font-bold">{formatPena(diasParaPena(out.final))}</p>
              <p className="text-muted-foreground">({out.final} dias, com ano de 12 meses e mês de 30 dias)</p>
            </Result>
            {regime && <Result title="Regime inicial (art. 33, § 2º, do CP)"><p className="font-bold">{regime.regime}</p><p className="text-muted-foreground">{regime.nota}</p></Result>}
            <Result title="Outros benefícios a estudar" tone="warn"><ul className="list-disc space-y-1 pl-5">{beneficios(out.final, violencia).map((b) => <li key={b}>{b}</li>)}</ul></Result>
          </>
        )}
        <p className="text-xs text-muted-foreground">Frações por circunstância (1/8 do intervalo) e por agravante/atenuante (1/6) seguem a prática dos tribunais, e não texto de lei: o juiz fundamenta cada valor. O regime pode ser agravado por circunstâncias do art. 59.</p>
      </section>
    </div>
  );
}

// ───────── Execução ─────────
function ExecucaoTab() {
  const [pena, setPena] = useState<Pena>({ anos: 6, meses: 0, dias: 0 });
  const [inicio, setInicio] = useState("2026-01-01");
  const [catId, setCatId] = useState("base");
  const [livId, setLivId] = useState("terco");
  const [detracao, setDetracao] = useState(0);
  const [remido, setRemido] = useState(0);
  const cat = CATEGORIAS_PROGRESSAO.find((c) => c.id === catId)!;
  const liv = LIVRAMENTO.find((l) => l.id === livId)!;
  const ms = parseDate(inicio);
  const prog = useMemo(() => marcoExecucao(ms, pena, cat.fracao, detracao, remido), [ms, pena, cat, detracao, remido]);
  const lc = useMemo(() => marcoExecucao(ms, pena, liv.fracao, detracao, remido, true), [ms, pena, liv, detracao, remido]);
  const fim = addPena(ms, pena);
  const penaDias = penaParaDias(pena);
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className={card}>
        <h2 className="text-lg font-bold">Dados da execução</h2>
        <PenaInput label="Pena total a cumprir" value={pena} onChange={setPena} />
        <label className="block text-sm font-medium">Início do cumprimento (data da prisão ou do trânsito)<input className={cn(field, "mt-1")} type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} /></label>
        <label className="block text-sm font-medium">Perfil para a progressão (LEP, art. 112)
          <select className={cn(field, "mt-1")} value={catId} onChange={(e) => setCatId(e.target.value)}>{CATEGORIAS_PROGRESSAO.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select>
        </label>
        <label className="block text-sm font-medium">Perfil para o livramento condicional (CP, art. 83)
          <select className={cn(field, "mt-1")} value={livId} onChange={(e) => setLivId(e.target.value)}>{LIVRAMENTO.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}</select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium">Detração (dias de prisão provisória)<input className={cn(field, "mt-1")} type="number" min={0} value={detracao} onChange={(e) => setDetracao(num(e.target.value))} /></label>
          <label className="text-sm font-medium">Dias remidos<input className={cn(field, "mt-1")} type="number" min={0} value={remido} onChange={(e) => setRemido(num(e.target.value))} /></label>
        </div>
        <p className="text-xs text-muted-foreground">O tempo remido é computado como pena cumprida (LEP, art. 128), e a detração está no art. 42 do CP. Use a aba Remição para calcular os dias remidos.</p>
      </section>
      <section className={card}>
        <h2 className="text-lg font-bold">Marcos calculados</h2>
        <Result title={`Progressão de regime: ${cat.fracao.num}/${cat.fracao.den} (${(fracaoValor(cat.fracao) * 100).toFixed(2).replace(".", ",")}%)`}>
          <p>Exigido: <strong>{prog.exigidosDias} dias</strong> de {prog.totalDias}. Abatidos (detração e remição): {prog.abatidosDias}.</p>
          <p className="mt-1 text-base font-bold">{prog.jaCumprido ? "Requisito objetivo já atingido." : <>Data prevista: {formatBr(prog.data)}</>}</p>
          <p className="text-muted-foreground">Também exige mérito: boa conduta carcerária e, quando for o caso, exame criminológico (art. 112, § 1º).</p>
        </Result>
        <Result title={`Livramento condicional: mais de ${liv.fracao.num}/${liv.fracao.den}`}>
          {penaDias < 2 * 360 ? <p className="font-semibold text-rose-600">O livramento exige pena igual ou superior a 2 anos (art. 83, caput).</p> : CATEGORIAS_PROGRESSAO.find((c) => c.id === catId)?.livramentoVedado ? <p className="font-semibold text-rose-600">O perfil escolhido para a progressão veda o livramento condicional (art. 112, VI, a, b, d e VIII).</p> : (
            <>
              <p>Exigido: <strong>{lc.exigidosDias} dias</strong> (mais de {liv.fracao.num}/{liv.fracao.den} de {lc.totalDias}).</p>
              <p className="mt-1 text-base font-bold">{lc.jaCumprido ? "Requisito objetivo já atingido." : <>Data prevista: {formatBr(lc.data)}</>}</p>
              <p className="text-muted-foreground">Exige também requisitos do art. 83, III e IV (comportamento, ausência de falta grave nos últimos 12 meses, trabalho e reparação do dano).</p>
            </>
          )}
        </Result>
        <Result title="Término da pena (sem benefícios)"><p className="font-bold">{formatBr(fim)}</p><p className="text-muted-foreground">Contagem pelo calendário comum (CP, art. 10), incluindo o dia do começo.</p></Result>
        {(prog.limiteQuarentaAnos) && <Result title="Limite de 40 anos" tone="warn"><p>O tempo de cumprimento não pode ultrapassar 40 anos (CP, art. 75). A conta acima já considerou o limite na unificação.</p></Result>}
        <p className="flex gap-2 text-xs text-muted-foreground"><AlertTriangle className="h-4 w-4 shrink-0" aria-hidden /> A fração incide aqui sobre a pena total, na primeira progressão. Nas progressões seguintes, o juízo da execução considera a pena remanescente. Falta grave interrompe o prazo e pode revogar até 1/3 do tempo remido (arts. 112, § 6º, e 127).</p>
      </section>
    </div>
  );
}

// ───────── Prescrição ─────────
function PrescricaoTab() {
  const [pena, setPena] = useState<Pena>({ anos: 4, meses: 0, dias: 0 });
  const [executoria, setExecutoria] = useState(false);
  const [reinc, setReinc] = useState(false);
  const [idade, setIdade] = useState(false);
  const [sexual, setSexual] = useState(false);
  const [termo, setTermo] = useState("2020-01-01");
  const r = prescricao(penaParaDias(pena), { executoria, reincidente: reinc, reduzPelaIdade: idade, violenciaSexualContraMulher: sexual });
  const data = addPena(parseDate(termo), { anos: 0, meses: r.meses, dias: 0 });
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className={card}>
        <h2 className="text-lg font-bold">Dados</h2>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={executoria} onChange={(e) => setExecutoria(e.target.checked)} /> Já há sentença condenatória transitada (prescrição da pretensão executória, pela pena aplicada)</label>
        <PenaInput label={executoria ? "Pena aplicada" : "Pena máxima cominada ao crime"} value={pena} onChange={setPena} />
        <label className="block text-sm font-medium">Termo inicial do prazo<input className={cn(field, "mt-1")} type="date" value={termo} onChange={(e) => setTermo(e.target.value)} /></label>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={reinc} onChange={(e) => setReinc(e.target.checked)} /> Condenado reincidente (aumenta 1/3 só na prescrição da pretensão executória)</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={idade} onChange={(e) => setIdade(e.target.checked)} /> Menor de 21 anos ao tempo do crime ou maior de 70 na sentença</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={sexual} onChange={(e) => setSexual(e.target.checked)} /> Crime envolve violência sexual contra a mulher</label>
        </div>
      </section>
      <section className={card}>
        <h2 className="text-lg font-bold">Resultado</h2>
        <Result title="Prazo prescricional"><p className="text-lg font-bold">{r.meses % 12 === 0 ? `${r.meses / 12} anos` : `${r.meses} meses`}</p></Result>
        <Result title="Prescreve em (sem interrupções ou suspensões)"><p className="text-lg font-bold">{formatBr(data)}</p></Result>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">{r.notas.map((n) => <li key={n}>{n}</li>)}</ul>
        <p className="flex gap-2 text-xs text-muted-foreground"><AlertTriangle className="h-4 w-4 shrink-0" aria-hidden /> O cálculo não considera as causas interruptivas e suspensivas (CP, arts. 116 e 117), nem o termo inicial de cada espécie (arts. 111 e 112). Eles mudam a data real.</p>
      </section>
    </div>
  );
}

// ───────── Remição ─────────
function RemicaoTab() {
  const [horas, setHoras] = useState(120);
  const [diasEstudo, setDiasEstudo] = useState(20);
  const [diasTrab, setDiasTrab] = useState(90);
  const [conclusao, setConclusao] = useState(false);
  const r = remicao(horas, diasEstudo, diasTrab, conclusao);
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className={card}>
        <h2 className="text-lg font-bold">Remição de pena (LEP, art. 126)</h2>
        <label className="block text-sm font-medium">Horas de frequência escolar<input className={cn(field, "mt-1")} type="number" min={0} value={horas} onChange={(e) => setHoras(num(e.target.value))} /></label>
        <label className="block text-sm font-medium">Em quantos dias distintos essas horas foram cumpridas<input className={cn(field, "mt-1")} type="number" min={0} value={diasEstudo} onChange={(e) => setDiasEstudo(num(e.target.value))} /></label>
        <label className="block text-sm font-medium">Dias de trabalho<input className={cn(field, "mt-1")} type="number" min={0} value={diasTrab} onChange={(e) => setDiasTrab(num(e.target.value))} /></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={conclusao} onChange={(e) => setConclusao(e.target.checked)} /> Concluiu ensino fundamental, médio ou superior durante a pena (acréscimo de 1/3 sobre o estudo)</label>
      </section>
      <section className={card}>
        <h2 className="text-lg font-bold">Resultado</h2>
        <Result title="Dias remidos"><p className="text-2xl font-bold">{r.total}</p></Result>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Estudo: 1 dia a cada 12 horas, divididas em no mínimo 3 dias: <strong>{r.estudo}</strong>{!r.estudoValido && <span className="text-rose-600"> (as horas não foram divididas em 3 dias, então não contam)</span>}</li>
          <li>Acréscimo por conclusão de curso (1/3 sobre a remição por estudo): <strong>{r.acrescimoConclusao}</strong></li>
          <li>Trabalho: 1 dia a cada 3 dias trabalhados: <strong>{r.trabalho}</strong></li>
        </ul>
        <p className="text-xs text-muted-foreground">O tempo remido conta como pena cumprida para todos os efeitos (art. 128). Em falta grave, o juiz pode revogar até 1/3 do tempo remido (art. 127). Leve o total para a aba Execução.</p>
      </section>
    </div>
  );
}

const TABS = [
  { id: "dosimetria", label: "Dosimetria e regime", icon: Gavel },
  { id: "execucao", label: "Progressão e livramento", icon: CalendarClock },
  { id: "prescricao", label: "Prescrição", icon: Scale },
  { id: "remicao", label: "Remição", icon: CalendarClock },
] as const;

function PenalCalculatorPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("dosimetria");
  return (
    <div className="space-y-5 pb-8">
      <PageHero
        image="exam-hall"
        kicker="Ferramentas jurídicas"
        icon={Gavel}
        title={<>Calculadora <em>penal</em></>}
        description="Dosimetria em três fases, regime inicial, progressão, livramento condicional, prescrição e remição, com os critérios do Código Penal e da Lei de Execução Penal."
        actions={<Button asChild variant="outline" className="hero-btn-secondary"><Link to="/dashboard/library">Biblioteca de leis</Link></Button>}
      />
      <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-100">
        Ferramenta de estudo. Valores conferidos no texto compilado do Planalto (conforme a Biblioteca de leis) em 12/10/2026; as leis mudam com frequência, então confirme a redação vigente. Ela não substitui o cálculo do juízo da execução nem o parecer de um advogado.
      </p>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Calculadoras">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)} className={cn("flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold", tab === id ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted")}>
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>
      {tab === "dosimetria" && <DosimetriaTab />}
      {tab === "execucao" && <ExecucaoTab />}
      {tab === "prescricao" && <PrescricaoTab />}
      {tab === "remicao" && <RemicaoTab />}
    </div>
  );
}
