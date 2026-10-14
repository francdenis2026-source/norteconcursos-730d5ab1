import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CalendarClock, Gavel, Scale } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PenalSources } from "@/components/study/PenalSources";
import { acreDateKey } from "@/lib/acreTime";
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
  remicaoPorBlocos,
  addDays,
  addPena,
  type Fracao,
  type Pena,
} from "@/lib/penalCalc";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/calculadora-penal")({
  component: PenalCalculatorPage,
  head: () => ({ meta: [{ title: "Calculadora penal | Norte Concurso" }] }),
});

const field =
  "w-full min-h-11 rounded-xl border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary";
const card = "min-w-0 rounded-2xl border bg-card space-y-4 p-5 shadow-sm md:p-6";
const num = (v: string) => Number(v);
function calculate<T>(fn: () => T): { value: T | null; error: string } {
  try {
    return { value: fn(), error: "" };
  } catch (error) {
    return { value: null, error: error instanceof Error ? error.message : "Confira os dados." };
  }
}

function PenaInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Pena;
  onChange: (p: Pena) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-1 text-sm font-medium">{label}</legend>
      <div className="grid grid-cols-3 gap-2">
        {(["anos", "meses", "dias"] as const).map((k) => (
          <label key={k} className="text-xs text-muted-foreground">
            {k}
            <input
              className={field}
              type="number"
              min={0}
              max={k === "meses" ? 11 : k === "dias" ? 29 : 1000}
              step={1}
              value={value[k]}
              onChange={(e) => onChange({ ...value, [k]: num(e.target.value) })}
            />
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
function FracaoSelect({
  value,
  onChange,
  label,
}: {
  value: Fracao;
  onChange: (f: Fracao) => void;
  label: string;
}) {
  return (
    <label className="text-sm font-medium">
      {label}
      <select
        className={cn(field, "mt-1")}
        value={fracKey(value)}
        onChange={(e) => onChange(FRACOES.find((f) => f.label === e.target.value)!.value)}
      >
        {FRACOES.map((f) => (
          <option key={f.label} value={f.label}>
            {f.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const Result = ({
  title,
  children,
  tone = "primary",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "primary" | "warn";
}) => (
  <div
    className={cn(
      "rounded-xl border-l-4 p-4",
      tone === "primary"
        ? "border-l-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/20"
        : "border-l-amber-500 bg-amber-50 dark:bg-amber-950/20",
    )}
  >
    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
    <div className="mt-1 text-sm leading-6">{children}</div>
  </div>
);

// ───────── Dosimetria ─────────
function DosimetriaTab({
  crimeId,
  setCrimeId,
}: {
  crimeId: string;
  setCrimeId: (id: string) => void;
}) {
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
  const [violencia, setViolencia] = useState(true);
  const [culposo, setCulposo] = useState(false);
  const [tipoManual, setTipoManual] = useState<"reclusão" | "detenção">("reclusão");
  const pick = (id: string) => {
    setCrimeId(id);
    setCulposo(false);
    const c = CRIMES.find((x) => x.id === id);
    if (c) {
      setMin(c.min);
      setMax(c.max);
      setTipoManual(c.tipo);
      setViolencia(
        [
          "cp121",
          "cp121q",
          "cp129",
          "cp147",
          "cp157",
          "cp158",
          "cp213",
          "cp217a",
          "cp329",
        ].includes(c.id),
      );
    }
  };
  let out: ReturnType<typeof dosimetria> | null = null;
  let err = "";
  try {
    out = dosimetria({
      min,
      max,
      circunstanciasNegativas: circ,
      fracaoCircunstancia: fCirc,
      agravantes: agr,
      atenuantes: aten,
      fracaoAgravanteAtenuante: fAg,
      aumentos: aum,
      diminuicoes: dim,
    });
  } catch (e) {
    err = e instanceof Error ? e.message : "Dados inválidos";
  }
  const tipo = crime?.tipo ?? tipoManual;
  const regime = out ? regimeInicial(out.final, reinc, tipo, circ === 0) : null;
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className={card}>
        <h2 className="text-lg font-bold">Dados do crime e das fases</h2>
        <p className="text-sm text-muted-foreground">
          Os exemplos usam a redação cadastrada em 12/10/2026. Para fatos anteriores, confira a lei
          aplicável e informe os limites manualmente. Multa e concurso de crimes não são calculados.
        </p>
        <label className="block text-sm font-medium">
          Crime (preceito do texto compilado)
          <select
            className={cn(field, "mt-1")}
            value={crimeId}
            onChange={(e) => pick(e.target.value)}
          >
            {CRIMES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
            <option value="custom">Outro crime: informar a pena</option>
          </select>
        </label>
        {!crime && (
          <label className="block text-sm font-medium">
            Espécie da pena
            <select
              className={cn(field, "mt-1")}
              value={tipoManual}
              onChange={(e) => setTipoManual(e.target.value as "reclusão" | "detenção")}
            >
              <option value="reclusão">Reclusão</option>
              <option value="detenção">Detenção</option>
            </select>
          </label>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <PenaInput
            label="Pena mínima"
            value={min}
            onChange={(p) => {
              setMin(p);
              setCrimeId("custom");
            }}
          />
          <PenaInput
            label="Pena máxima"
            value={max}
            onChange={(p) => {
              setMax(p);
              setCrimeId("custom");
            }}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            1ª fase: circunstâncias judiciais desfavoráveis
            <input
              className={cn(field, "mt-1")}
              type="number"
              min={0}
              max={8}
              value={circ}
              onChange={(e) => setCirc(num(e.target.value))}
            />
          </label>
          <FracaoSelect
            label="Fração por circunstância (sobre o intervalo)"
            value={fCirc}
            onChange={setFCirc}
          />
          <label className="text-sm font-medium">
            2ª fase: agravantes
            <input
              className={cn(field, "mt-1")}
              type="number"
              min={0}
              value={agr}
              onChange={(e) => setAgr(num(e.target.value))}
            />
          </label>
          <label className="text-sm font-medium">
            2ª fase: atenuantes
            <input
              className={cn(field, "mt-1")}
              type="number"
              min={0}
              value={aten}
              onChange={(e) => setAten(num(e.target.value))}
            />
          </label>
          <FracaoSelect label="Fração por agravante/atenuante" value={fAg} onChange={setFAg} />
        </div>
        {(
          [
            ["Causas de aumento (3ª fase)", aum, setAum],
            ["Causas de diminuição (3ª fase)", dim, setDim],
          ] as const
        ).map(([title, list, set]) => (
          <div key={title} className="space-y-2">
            <p className="text-sm font-medium">{title}</p>
            <div className="flex flex-wrap gap-2">
              {list.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  className="rounded-full border bg-muted px-3 py-1 text-sm"
                  onClick={() => set(list.filter((_, j) => j !== i))}
                  aria-label={`Remover ${fracKey(f)}`}
                >
                  {fracKey(f)} ✕
                </button>
              ))}
              {FRACOES.map((f) => (
                <button
                  key={f.label}
                  type="button"
                  className="rounded-full border px-3 py-1 text-sm hover:bg-muted"
                  disabled={list.length >= 10}
                  onClick={() => set([...list, f.value])}
                >
                  + {f.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={culposo} onChange={(e) => setCulposo(e.target.checked)} />{" "}
          Crime culposo (disponível ao informar outro crime)
        </label>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={reinc} onChange={(e) => setReinc(e.target.checked)} />{" "}
            Réu reincidente
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={violencia}
              disabled={!!crime}
              onChange={(e) => setViolencia(e.target.checked)}
            />{" "}
            Crime com violência ou grave ameaça
          </label>
        </div>
      </section>
      <section className={card}>
        <h2 className="text-lg font-bold">Resultado, fase por fase</h2>
        {err && <p className="text-sm text-rose-600">{err}</p>}
        {out && (
          <>
            <ol className="space-y-2">
              {out.passos.map((p, i) => (
                <li key={i} className="rounded-xl border p-3 text-sm">
                  <p className="font-semibold">
                    {p.fase}: <span className="font-mono">{formatPena(diasParaPena(p.dias))}</span>
                  </p>
                  <p className="mt-1 text-muted-foreground">{p.explicacao}</p>
                </li>
              ))}
            </ol>
            <Result title="Pena definitiva">
              <p className="text-lg font-bold">{formatPena(diasParaPena(out.final))}</p>
              <p className="text-muted-foreground">
                ({out.final} dias, com ano de 12 meses e mês de 30 dias)
              </p>
            </Result>
            {regime && (
              <Result title="Regime inicial (art. 33, § 2º, do CP)">
                <p className="font-bold">{regime.regime}</p>
                <p className="text-muted-foreground">{regime.nota}</p>
              </Result>
            )}
            <Result title="Outros benefícios a estudar" tone="warn">
              <ul className="list-disc space-y-1 pl-5">
                {beneficios(out.final, violencia, culposo).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Result>
          </>
        )}
        <p className="text-xs text-muted-foreground">
          Frações por circunstância (1/8 do intervalo) e por agravante/atenuante (1/6) seguem a
          prática dos tribunais, e não texto de lei: o juiz fundamenta cada valor. A compensação
          numérica não decide preponderância (art. 67), confissão e reincidência, nem bis in idem.
          As causas da terceira fase são simuladas sucessivamente; sua cumulação depende da norma e
          do art. 68, parágrafo único. Frações de dia são desprezadas (CP, art. 11).
        </p>
      </section>
    </div>
  );
}

// ───────── Execução ─────────
function ExecucaoTab({ remido, setRemido }: { remido: number; setRemido: (days: number) => void }) {
  const [pena, setPena] = useState<Pena>({ anos: 6, meses: 0, dias: 0 });
  const [inicio, setInicio] = useState(acreDateKey());
  const [catId, setCatId] = useState("manual");
  const [fracaoManual, setFracaoManual] = useState<Fracao>({ num: 1, den: 6 });
  const [regraConfirmada, setRegraConfirmada] = useState(false);
  const [livId, setLivId] = useState("terco");
  const [detracao, setDetracao] = useState(0);

  const cat = CATEGORIAS_PROGRESSAO.find((c) => c.id === catId) ?? {
    id: "manual",
    label: "Fração informada",
    fracao: fracaoManual,
    livramentoVedado: false,
  };
  const liv = LIVRAMENTO.find((l) => l.id === livId) ?? LIVRAMENTO[0]!;
  const result = calculate(() => {
    const ms = parseDate(inicio);
    return {
      prog: marcoExecucao(ms, pena, cat.fracao, detracao, remido),
      lc: marcoExecucao(ms, pena, liv.fracao, detracao, remido, true),
      fim: addDays(addPena(ms, pena), -1),
      penaDias: penaParaDias(pena),
    };
  });
  const { prog, lc, fim, penaDias } = result.value ?? {};
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className={card}>
        <h2 className="text-lg font-bold">Dados da execução</h2>
        <PenaInput label="Pena total a cumprir" value={pena} onChange={setPena} />
        <label className="block text-sm font-medium">
          Data-base da primeira progressão (sem interrupções)
          <input
            className={cn(field, "mt-1")}
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium">
          Fração para a progressão (LEP, art. 112)
          <select
            className={cn(field, "mt-1")}
            value={catId}
            onChange={(e) => {
              setCatId(e.target.value);
              setRegraConfirmada(false);
            }}
          >
            <option value="manual">Informar a fração aplicável ao exercício</option>
            {CATEGORIAS_PROGRESSAO.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        {catId === "manual" && (
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              Numerador
              <input
                type="number"
                min={1}
                className={field}
                value={fracaoManual.num}
                onChange={(e) => setFracaoManual({ ...fracaoManual, num: num(e.target.value) })}
              />
            </label>
            <label className="text-sm">
              Denominador
              <input
                type="number"
                min={1}
                className={field}
                value={fracaoManual.den}
                onChange={(e) => setFracaoManual({ ...fracaoManual, den: num(e.target.value) })}
              />
            </label>
          </div>
        )}
        <p className="rounded-xl bg-muted p-3 text-sm">
          O catálogo reflete o texto cadastrado em 12/10/2026. A data do fato, a reincidência
          específica e a lei mais benéfica podem alterar a fração. Não há escolha automática da lei
          no tempo.
        </p>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={regraConfirmada}
            onChange={(e) => setRegraConfirmada(e.target.checked)}
          />{" "}
          Conferi a fração e as vedações para o caso de estudo, incluindo a lei no tempo.
        </label>
        <label className="block text-sm font-medium">
          Perfil para o livramento condicional (CP, art. 83)
          <select
            className={cn(field, "mt-1")}
            value={livId}
            onChange={(e) => setLivId(e.target.value)}
          >
            <option value="vedado">Livramento vedado para a hipótese estudada</option>
            {LIVRAMENTO.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium">
            Detração (dias de prisão provisória)
            <input
              className={cn(field, "mt-1")}
              type="number"
              min={0}
              value={detracao}
              onChange={(e) => setDetracao(num(e.target.value))}
            />
          </label>
          <label className="text-sm font-medium">
            Dias remidos
            <input
              className={cn(field, "mt-1")}
              type="number"
              min={0}
              value={remido}
              onChange={(e) => setRemido(num(e.target.value))}
            />
          </label>
        </div>
        <p className="text-xs text-muted-foreground">
          Não informe como detração dias já incluídos no período contado a partir da data-base. O
          tempo remido é computado como pena cumprida (LEP, art. 128), e a detração está no art. 42
          do CP. Use a aba Remição para calcular os dias remidos.
        </p>
      </section>
      <section className={card}>
        <h2 className="text-lg font-bold">Projeção do requisito temporal</h2>
        {result.error && (
          <p role="alert" className="text-sm text-destructive">
            {result.error}
          </p>
        )}
        {!regraConfirmada && (
          <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
            Confira e confirme a fração aplicável para exibir a projeção.
          </p>
        )}
        {regraConfirmada && prog && lc && fim !== undefined && penaDias !== undefined && (
          <>
            <Result
              title={`Progressão de regime: ${cat.fracao.num}/${cat.fracao.den} (${(fracaoValor(cat.fracao) * 100).toFixed(2).replace(".", ",")}%)`}
            >
              <p>
                Exigido: <strong>{prog.exigidosDias} dias</strong> de {prog.totalDias}. Abatidos
                (detração e remição): {prog.abatidosDias}.
              </p>
              <p className="mt-1 text-base font-bold">
                {prog.jaCumprido ? (
                  "Abatimentos informados cobrem a fração exigida."
                ) : (
                  <>Marco temporal hipotético: {formatBr(prog.data)}</>
                )}
              </p>
              <p className="text-muted-foreground">
                Também exige mérito: boa conduta carcerária e, quando for o caso, exame
                criminológico (art. 112, § 1º).
              </p>
            </Result>
            <Result
              title={
                livId === "vedado"
                  ? "Livramento condicional: vedado"
                  : `Livramento condicional: mais de ${liv.fracao.num}/${liv.fracao.den}`
              }
            >
              {penaDias < 2 * 360 ? (
                <p className="font-semibold text-rose-600">
                  O livramento exige pena igual ou superior a 2 anos (art. 83, caput).
                </p>
              ) : livId === "vedado" ||
                CATEGORIAS_PROGRESSAO.find((c) => c.id === catId)?.livramentoVedado ? (
                <p className="font-semibold text-rose-600">
                  A hipótese selecionada veda o livramento. Consulte a regra específica (LEP, art.
                  112, VI, a, b, d e VIII).
                </p>
              ) : ["v", "via", "vib", "vic", "vid", "vii", "viii"].includes(catId) &&
                livId !== "doistercos" ? (
                <p className="text-sm text-destructive">
                  O perfil de hediondo/equiparado não admite usar a regra comum de 1/3 ou 1/2.
                  Confira o art. 83, V, inclusive a vedação por reincidência específica.
                </p>
              ) : (
                <>
                  <p>
                    Exigido: <strong>{lc.exigidosDias} dias</strong> (mais de {liv.fracao.num}/
                    {liv.fracao.den} de {lc.totalDias}).
                  </p>
                  <p className="mt-1 text-base font-bold">
                    {lc.jaCumprido ? (
                      "Abatimentos informados cobrem a fração exigida."
                    ) : (
                      <>Marco temporal hipotético: {formatBr(lc.data)}</>
                    )}
                  </p>
                  <p className="text-muted-foreground">
                    Exige também requisitos do art. 83, III e IV (comportamento, ausência de falta
                    grave nos últimos 12 meses, trabalho e reparação do dano).
                  </p>
                </>
              )}
            </Result>
            <Result title="Último dia da pena total informada (sem abatimentos)">
              <p className="font-bold">{formatBr(fim)}</p>
              <p className="text-muted-foreground">
                Contagem pelo calendário comum (CP, art. 10), incluindo o dia do começo.
              </p>
            </Result>
          </>
        )}
        {prog?.limiteQuarentaAnos && (
          <Result title="Limite de 40 anos" tone="warn">
            <p>
              O limite de cumprimento do art. 75 não reduz a base de cálculo dos benefícios: foi
              mantida a pena total, conforme a distinção da Súmula 715/STF. O limite aplicável
              também depende da lei no tempo; esta ferramenta não realiza unificação.
            </p>
          </Result>
        )}
        <p className="flex gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden /> A fração incide aqui sobre a
          pena total, na primeira progressão. Nas progressões seguintes, o juízo da execução
          considera a pena remanescente. Falta grave interrompe o prazo e pode revogar até 1/3 do
          tempo remido (arts. 112, § 6º, e 127).
        </p>
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
  const result = calculate(() => {
    const r = prescricao(penaParaDias(pena), {
      executoria,
      reincidente: reinc,
      reduzPelaIdade: idade,
      violenciaSexualContraMulher: sexual,
    });
    return {
      r,
      data: addDays(addPena(parseDate(termo), { anos: 0, meses: r.meses, dias: 0 }), -1),
    };
  });
  const { r, data } = result.value ?? {};
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className={card}>
        <h2 className="text-lg font-bold">Dados</h2>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={executoria}
            onChange={(e) => setExecutoria(e.target.checked)}
          />{" "}
          Simular pretensão executória pela pena aplicada (o termo inicial deve ser conferido)
        </label>
        <PenaInput
          label={executoria ? "Pena aplicada" : "Pena máxima cominada ao crime"}
          value={pena}
          onChange={setPena}
        />
        <label className="block text-sm font-medium">
          Termo inicial do prazo
          <input
            className={cn(field, "mt-1")}
            type="date"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
          />
        </label>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={reinc} onChange={(e) => setReinc(e.target.checked)} />{" "}
            Condenado reincidente (aumenta 1/3 só na prescrição da pretensão executória)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={idade} onChange={(e) => setIdade(e.target.checked)} />{" "}
            Menor de 21 anos ao tempo do crime ou maior de 70 na sentença
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={sexual} onChange={(e) => setSexual(e.target.checked)} />{" "}
            Crime envolve violência sexual contra a mulher
          </label>
        </div>
      </section>
      <section className={card}>
        <h2 className="text-lg font-bold">Resultado</h2>
        {result.error && (
          <p role="alert" className="text-sm text-destructive">
            {result.error}
          </p>
        )}
        {r && data !== undefined && (
          <>
            <Result title="Prazo prescricional">
              <p className="text-lg font-bold">
                {r.meses % 12 === 0 ? `${r.meses / 12} anos` : `${r.meses} meses`}
              </p>
            </Result>
            <Result title="Marco hipotético (sem interrupções ou suspensões)">
              <p className="text-lg font-bold">{formatBr(data)}</p>
            </Result>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {r.notas.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </>
        )}
        <p className="flex gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden /> O cálculo não considera as
          causas interruptivas e suspensivas (CP, arts. 116 e 117), nem o termo inicial de cada
          espécie (arts. 111 e 112). A data não declara extinta a punibilidade. Não calcula
          prescrição retroativa ou intercorrente, multa, medida de segurança, nem crimes
          imprescritíveis. Na executória, confira o Tema 788/STF e sua modulação.
        </p>
      </section>
    </div>
  );
}

// ───────── Remição ─────────
function RemicaoTab({ onApply }: { onApply: (days: number) => void }) {
  const [blocos, setBlocos] = useState(10);
  const [diasTrab, setDiasTrab] = useState(90);
  const [conclusao, setConclusao] = useState(false);
  const result = calculate(() => remicaoPorBlocos(blocos, diasTrab, conclusao));
  const r = result.value;
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className={card}>
        <h2 className="text-lg font-bold">Remição por estudo e trabalho</h2>
        <label className="block text-sm font-medium">
          Blocos de 12 horas de estudo conferidos
          <input
            className={cn(field, "mt-1")}
            type="number"
            min={0}
            step={1}
            value={blocos}
            onChange={(e) => setBlocos(num(e.target.value))}
          />
        </label>
        <p className="text-sm text-muted-foreground">
          Cada bloco deve conter 12 horas de frequência escolar distribuídas em pelo menos 3 dias.
          Só o total de horas e dias não comprova essa distribuição; informe os blocos efetivamente
          conferidos.
        </p>
        <label className="block text-sm font-medium">
          Dias de trabalho reconhecíveis
          <input
            className={cn(field, "mt-1")}
            type="number"
            min={0}
            step={1}
            value={diasTrab}
            onChange={(e) => setDiasTrab(num(e.target.value))}
          />
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={conclusao}
            onChange={(e) => setConclusao(e.target.checked)}
          />{" "}
          Conclusão certificada de ensino fundamental, médio ou superior durante o cumprimento da
          pena (LEP, art. 126, §5º)
        </label>
        <p className="text-xs text-muted-foreground">
          A cumulação pressupõe horários compatíveis. Leitura, aprovação em exames e perda de dias
          remidos exigem regras próprias e não entram nesta conta.
        </p>
      </section>
      <section className={card}>
        <h2 className="text-lg font-bold">Memória do cálculo</h2>
        {result.error && (
          <p role="alert" className="text-destructive">
            {result.error}
          </p>
        )}
        {r && (
          <>
            <Result title="Dias remidos estimados">
              <p className="text-3xl font-bold">{r.total} dias</p>
            </Result>
            <ul className="space-y-3 text-sm">
              <li>
                Estudo: {r.estudo} blocos × 1 dia = <strong>{r.estudo} dias</strong>
              </li>
              <li>
                Conclusão certificada: 1/3, desprezada a fração ={" "}
                <strong>{r.acrescimoConclusao} dias</strong>
              </li>
              <li>
                Trabalho: {diasTrab} ÷ 3, desprezada a fração = <strong>{r.trabalho} dias</strong>
              </li>
            </ul>
            <Button onClick={() => onApply(r.total)}>Levar resultado para Execução</Button>
          </>
        )}
        <p className="text-xs text-muted-foreground">
          O reconhecimento depende do juízo da execução. O tempo remido conta como cumprido (art.
          128); a perda por falta grave depende de decisão (art. 127).
        </p>
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
  const [diasRemidos, setDiasRemidos] = useState(0);
  const [crimeId, setCrimeId] = useState("cp157");
  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-8">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#081c30] via-[#123653] to-[#155e75] p-6 text-white md:p-9">
        <Scale
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 text-white/5"
        />
        <div className="relative max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-200">
            Laboratório de direito penal
          </span>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">Calculadora penal</h1>
          <p className="mt-3 text-sm leading-6 text-slate-200 md:text-base">
            Explore a pena passo a passo, compare critérios e consulte os dispositivos que sustentam
            cada cálculo.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <a href="#penal-sources">Consultar legislação e súmulas</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/dashboard/edital">Conferir meu edital</Link>
            </Button>
          </div>
        </div>
      </section>
      <p className="flex items-start gap-3 rounded-2xl border bg-muted/40 p-4 text-sm text-muted-foreground">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        Simulação para estudo. Frações, datas e benefícios dependem da lei aplicável ao fato, dos
        requisitos legais e das decisões pertinentes. Os exemplos legais têm conferência registrada
        em 12/10/2026; consulte a fonte e o edital antes de usá-los.
      </p>
      <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)}>
        <TabsList
          className="grid h-auto w-full grid-cols-2 gap-1 rounded-2xl bg-muted p-1.5 lg:grid-cols-4"
          aria-label="Calculadoras penais"
        >
          {TABS.map(({ id, label, icon: Icon }) => (
            <TabsTrigger
              key={id}
              value={id}
              className="min-h-12 whitespace-normal gap-2 rounded-xl px-2 py-3 text-xs sm:text-sm"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="dosimetria" forceMount className="mt-5 data-[state=inactive]:hidden">
          <DosimetriaTab crimeId={crimeId} setCrimeId={setCrimeId} />
        </TabsContent>
        <TabsContent value="execucao" forceMount className="mt-5 data-[state=inactive]:hidden">
          <ExecucaoTab remido={diasRemidos} setRemido={setDiasRemidos} />
        </TabsContent>
        <TabsContent value="prescricao" forceMount className="mt-5 data-[state=inactive]:hidden">
          <PrescricaoTab />
        </TabsContent>
        <TabsContent value="remicao" forceMount className="mt-5 data-[state=inactive]:hidden">
          <RemicaoTab
            onApply={(days) => {
              setDiasRemidos(days);
              setTab("execucao");
            }}
          />
        </TabsContent>
      </Tabs>
      <PenalSources tab={tab} crimeId={crimeId} />
    </div>
  );
}
