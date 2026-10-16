import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CalendarClock, Gavel, Scale } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PenalLawPicker } from "@/components/study/PenalLawPicker";
import type { SourcePenalty } from "@/lib/penalCatalog";
import { PenalSources } from "@/components/study/PenalSources";
import { acreDateKey } from "@/lib/acreTime";
import { Button } from "@/components/ui/button";
import {
  crimeStudyTarget,
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
import { PenalExample } from "@/components/study/PenalExample";
import { dosimetryExamples, remitionExample } from "@/lib/penalExamples";
import { PenalOffenderSelector } from "@/components/study/PenalOffenderSelector";
import {
  INITIAL_OFFENDER,
  offenderLabel,
  recommendedProgression,
  recommendedParole,
  offenderCategoryCompatible,
  policyForOffender,
  type OffenderProfile,
} from "@/lib/penalOffender";
import { PenalCrimeContext } from "@/components/study/PenalCrimeContext";
import {
  crimePolicy,
  policyForSentence,
  compatibleProgression,
  compatibleParole,
  type CrimePolicy,
} from "@/lib/penalPolicy";
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
      "penal-result rounded-xl border-l-4 p-4",
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
  policy,
  extermination,
  setExtermination,
  onSentence,
  offender,
  sourcePenalty,
  onSourcePenalty,
}: {
  crimeId: string;
  setCrimeId: (id: string) => void;
  policy: CrimePolicy;
  extermination: boolean;
  setExtermination: (value: boolean) => void;
  onSentence: (days: number | null) => void;
  offender: OffenderProfile;
  sourcePenalty: SourcePenalty | null;
  onSourcePenalty: (source: SourcePenalty | null) => void;
}) {
  const crime = CRIMES.find((c) => c.id === crimeId);
  const [min, setMin] = useState<Pena>(
    crime ? crime.min : (sourcePenalty?.min ?? { anos: 0, meses: 0, dias: 0 }),
  );
  const [max, setMax] = useState<Pena>(
    crime ? crime.max : (sourcePenalty?.max ?? { anos: 0, meses: 0, dias: 0 }),
  );
  const [circ, setCirc] = useState(0);
  const [fCirc, setFCirc] = useState<Fracao>({ num: 1, den: 8 });
  const [agr, setAgr] = useState(0);
  const [aten, setAten] = useState(0);
  const [fAg, setFAg] = useState<Fracao>({ num: 1, den: 6 });

  const [law, setLaw] = useState(
    crimeStudyTarget(crimeId)?.slug ?? sourcePenalty?.lawSlug ?? "manual",
  );
  const reinc = offender.kind === "recurrent";
  const [violencia, setViolencia] = useState(true);
  const [culposo, setCulposo] = useState(false);
  const [tipoManual, setTipoManual] = useState<"reclusão" | "detenção">(
    sourcePenalty?.tipo ?? "reclusão",
  );
  const pick = (id: string) => {
    setCrimeId(id);
    onSourcePenalty(null);
    setCulposo(false);
    setCirc(0);
    setAgr(0);
    setAten(0);
    setFCirc({ num: 1, den: 8 });
    setFAg({ num: 1, den: 6 });
    const c = CRIMES.find((x) => x.id === id);
    if (c) {
      setLaw(crimeStudyTarget(c.id)!.slug);
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
  const simulation = {
    min,
    max,
    circunstanciasNegativas: circ,
    fracaoCircunstancia: fCirc,
    agravantes: agr + (reinc ? 1 : 0),
    atenuantes: aten,
    fracaoAgravanteAtenuante: fAg,
    aumentos: [],
    diminuicoes: [],
  };
  const lawName =
    law === "codigo-penal"
      ? "Código Penal"
      : law === "drogas"
        ? "Lei 11.343/2006 · Drogas"
        : law === "armas"
          ? "Lei 10.826/2003 · Armas"
          : (sourcePenalty?.lawTitle ?? "Pena informada manualmente");
  let out: ReturnType<typeof dosimetria> | null = null;
  let err = "";
  try {
    out = dosimetria(simulation);
  } catch (e) {
    err = e instanceof Error ? e.message : "Dados inválidos";
  }
  const tipo = crime?.tipo ?? tipoManual;
  useEffect(() => {
    onSentence(out?.final ?? null);
  }, [out?.final, onSentence]);
  const sentencePolicy = policyForOffender(
    policyForSentence(policy, out?.final ?? null, violencia, culposo),
    offender,
  );
  const regime =
    out && crime
      ? regimeInicial(out.final, reinc, tipo, circ === 0 && offender.record !== "bad")
      : null;
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section
        className="penal-sentence-summary min-w-0 rounded-2xl border p-5 lg:col-span-2"
        aria-label="Pena e dados do crime selecionado"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{lawName}</p>
        <h2 className="mt-2 text-lg font-bold">
          {crime?.label ??
            (sourcePenalty
              ? `${sourcePenalty.lawTitle} · ${sourcePenalty.label}`
              : "Simulação de outro crime")}
        </h2>
        {out ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-background p-3">
              <p className="text-xs text-muted-foreground">Pena mínima do exercício</p>
              <p className="mt-1 text-xl font-bold">{formatPena(min)}</p>
            </div>
            <div className="rounded-xl bg-background p-3">
              <p className="text-xs text-muted-foreground">Pena máxima do exercício</p>
              <p className="mt-1 text-xl font-bold">{formatPena(max)}</p>
            </div>
            <div className="rounded-xl bg-background p-3">
              <p className="text-xs text-muted-foreground">Pena simulada após as fases</p>
              <p className="mt-1 text-xl font-bold">{formatPena(diasParaPena(out.final))}</p>
            </div>
          </div>
        ) : (
          <p role="status" className="mt-3 text-sm">
            Confira os limites informados para exibir a pena.
          </p>
        )}
        <p className="mt-3 text-sm text-muted-foreground">
          Espécie: <strong>{tipo}</strong> ·{" "}
          {violencia
            ? "Com violência ou grave ameaça no exercício"
            : "Sem violência ou grave ameaça no exercício"}
          . Confira também multa, qualificadoras e regras especiais no dispositivo. O intervalo
          legal não é a pena definitiva de um caso real.
        </p>
      </section>
      {crimeId === "cp121" && (
        <label className="rounded-xl border bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-100 lg:col-span-2">
          <input
            type="checkbox"
            checked={extermination}
            onChange={(e) => setExtermination(e.target.checked)}
            className="mr-2"
          />
          Homicídio praticado em atividade típica de grupo de extermínio (Lei 8.072, art. 1º, I)
        </label>
      )}
      <section className={card}>
        <h2 className="text-lg font-bold">Dados do crime e das fases</h2>
        {offender.record === "bad" && (
          <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
            Foram informados maus antecedentes. Confira sua valoração no art. 59 e registre as
            circunstâncias pertinentes; a seleção não cria automaticamente uma fração judicial. Não
            duplique a mesma condenação como antecedente e reincidência.
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          Os exemplos usam a redação cadastrada em 12/10/2026. Para fatos anteriores, confira a lei
          aplicável e informe os limites manualmente. Multa e concurso de crimes não são calculados.
        </p>
        <PenalLawPicker
          law={law}
          crimeId={crimeId}
          onLaw={(slug) => {
            const first = CRIMES.find((c) => crimeStudyTarget(c.id)?.slug === slug);
            pick(first?.id ?? "custom");
            if (!first) {
              setMin({ anos: 0, meses: 0, dias: 0 });
              setMax({ anos: 0, meses: 0, dias: 0 });
            }
            setLaw(slug);
          }}
          onCrime={(id) => {
            pick(id);
            if (id === "custom") {
              setMin({ anos: 0, meses: 0, dias: 0 });
              setMax({ anos: 0, meses: 0, dias: 0 });
            }
          }}
          onApply={(source) => {
            pick("custom");
            setMin(source.min);
            setMax(source.max);
            setTipoManual(source.tipo);
            setViolencia(false);
            onSourcePenalty(source);
          }}
        />
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
              onSourcePenalty(null);
              setCrimeId("custom");
            }}
          />
          <PenaInput
            label="Pena máxima"
            value={max}
            onChange={(p) => {
              setMax(p);
              onSourcePenalty(null);
              setCrimeId("custom");
            }}
          />
        </div>
        <details className="rounded-xl border p-3">
          <summary className="cursor-pointer text-sm font-semibold">
            Ajustar circunstâncias, agravantes e atenuantes
          </summary>
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
              2ª fase: outras agravantes (sem contar reincidência)
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
        </details>
        <p className="text-xs text-muted-foreground">
          Causas específicas de aumento e diminuição não estão parametrizadas para esta seleção.
          Consulte o dispositivo completo; a ausência do controle não significa inexistência da
          causa na lei.
        </p>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={culposo}
            disabled={!!crime}
            onChange={(e) => setCulposo(e.target.checked)}
          />{" "}
          Crime culposo (disponível ao informar outro crime)
        </label>
        <div className="flex flex-wrap gap-4 text-sm">
          <p className="text-xs text-muted-foreground">
            {offenderLabel(offender)}:{" "}
            {reinc
              ? "a reincidência entra uma vez na segunda fase, com a fração do exercício. Não a duplique em antecedentes ou outras agravantes"
              : "sem agravante de reincidência informada"}{" "}
            (CP, arts. 61, I, 63–64 e 67).
          </p>
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
                <li
                  key={i}
                  data-phase={i === 0 ? "base" : i === 1 ? "intermediate" : "final"}
                  className="penal-phase rounded-xl border p-3 text-sm"
                >
                  <p className="font-semibold">
                    {p.fase}: <span className="font-mono">{formatPena(diasParaPena(p.dias))}</span>
                  </p>
                  <p className="mt-1 text-muted-foreground">{p.explicacao}</p>
                </li>
              ))}
              {out.passos.length === 2 && (
                <li data-phase="final" className="penal-phase rounded-xl border p-3 text-sm">
                  <p className="font-semibold">
                    3ª fase: sem causas informadas · {formatPena(diasParaPena(out.final))}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    A pena da segunda fase foi mantida porque nenhuma causa de aumento ou diminuição
                    foi selecionada no exercício.
                  </p>
                </li>
              )}
            </ol>
            <Result title="Pena definitiva">
              <p className="text-lg font-bold">{formatPena(diasParaPena(out.final))}</p>
              <p className="text-muted-foreground">
                ({out.final} dias, com ano de 12 meses e mês de 30 dias)
              </p>
            </Result>
            <details className="rounded-xl border p-3">
              <summary className="cursor-pointer text-sm font-semibold">
                Entender o cálculo com exemplos
              </summary>
              <div className="mt-3 space-y-3" aria-label="Exemplos das fases da pena">
                {dosimetryExamples(
                  simulation,
                  out,
                  crime?.label ?? "crime informado manualmente",
                ).map((example, index) => (
                  <PenalExample key={index} example={example} />
                ))}
              </div>
            </details>
            {regime && (
              <Result title="Regime inicial (art. 33, § 2º, do CP)">
                <p className="font-bold">{regime.regime}</p>
                <p className="text-muted-foreground">{regime.nota}</p>
                <p className="mt-2 text-sm">
                  Exemplo: uma pessoa com pena simulada de {formatPena(diasParaPena(out.final))},{" "}
                  {reinc ? "reincidente" : "não reincidente"}, com {tipo} e circunstâncias{" "}
                  {circ === 0 && offender.record !== "bad"
                    ? "sem fatores desfavoráveis informados"
                    : "desfavoráveis informadas"}
                  , recebe neste exercício a indicação “{regime.regime}”. Essa indicação não concede
                  um regime automaticamente.
                </p>
              </Result>
            )}
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
      <PenalCrimeContext policy={sentencePolicy} />
    </div>
  );
}

// ───────── Execução ─────────
function ExecucaoTab({
  remido,
  setRemido,
  policy,
  sentenceDays,
  offender,
}: {
  remido: number;
  setRemido: (days: number) => void;
  policy: CrimePolicy;
  sentenceDays: number | null;
  offender: OffenderProfile;
}) {
  const [manualPena, setManualPena] = useState<Pena | null>(null);
  const pena =
    manualPena ??
    (sentenceDays !== null ? diasParaPena(sentenceDays) : { anos: 0, meses: 0, dias: 0 });
  const setPena = (value: Pena) => setManualPena(value);
  const [inicio, setInicio] = useState(acreDateKey());
  const profileKey = JSON.stringify(offender);
  const suggestedProgression = recommendedProgression(policy, offender);
  const [categoryOverride, setCategoryOverride] = useState<string | null>(null);
  const catId = categoryOverride ?? suggestedProgression.id;
  const setCatId = (value: string) => setCategoryOverride(value);
  const [fracaoManual, setFracaoManual] = useState<Fracao>({ num: 0, den: 0 });
  const [confirmedProfile, setConfirmedProfile] = useState<string | null>(null);
  const [ruleReviewed, setRuleReviewed] = useState(false);
  const regraConfirmada = confirmedProfile === profileKey;
  const setRegraConfirmada = (value: boolean) => {
    setConfirmedProfile(value ? profileKey : null);
    if (!value) setRuleReviewed(false);
  };
  const suggestedParole = recommendedParole(policy, offender, catId);
  const [paroleOverride, setParoleOverride] = useState<string | null>(null);
  const livId = paroleOverride === "vedado" ? "vedado" : suggestedParole.id;
  const setLivId = (value: string) => setParoleOverride(value);
  const specificRecidivism = offender.kind === "recurrent" && offender.specificSpecial;
  useEffect(() => {
    setCategoryOverride(null);
    setParoleOverride(null);
    setConfirmedProfile(null);
    setRuleReviewed(false);
  }, [profileKey]);
  useEffect(() => {
    setConfirmedProfile(null);
    setRuleReviewed(false);
  }, [remido, sentenceDays]);
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
  if (policy.classification === "desconhecido")
    return (
      <section className={card}>
        <h2 className="text-lg font-bold">Execução ainda não parametrizada para esta seleção</h2>
        <p className="text-sm text-muted-foreground">
          A pena pode ser estudada na dosimetria após conferir os limites. Progressão, percentuais e
          livramento exigem enquadramento e regras próprios deste crime; os controles não são
          exibidos sem essa parametrização.
        </p>
      </section>
    );
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className={card}>
        <h2 className="text-lg font-bold">Dados da execução</h2>
        <div className="rounded-xl border border-sky-300 bg-sky-50 p-3 text-sm text-sky-950 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-100">
          <p className="font-bold">{policy.classificationLabel}</p>
          <p className="mt-1 text-xs leading-5">{policy.scope}</p>
        </div>
        {sentenceDays !== null && (
          <Button
            variant="outline"
            onClick={() => {
              setManualPena(null);
              setRegraConfirmada(false);
            }}
          >
            Usar pena simulada: {formatPena(diasParaPena(sentenceDays))}
          </Button>
        )}
        <p className="rounded-xl bg-muted p-3 text-sm">
          <strong>{offenderLabel(offender)}</strong>
          <br />
          {suggestedProgression.note}
          <br />
          {suggestedParole.note}
        </p>
        <PenaInput
          label={manualPena ? "Pena fixada manualmente" : "Pena vinculada à dosimetria"}
          value={pena}
          onChange={(p) => {
            setPena(p);
            setRegraConfirmada(false);
          }}
        />
        <label className="block text-sm font-medium">
          Data-base da primeira progressão (sem interrupções)
          <input
            className={cn(field, "mt-1")}
            type="date"
            value={inicio}
            onChange={(e) => {
              setInicio(e.target.value);
              setRegraConfirmada(false);
            }}
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
            {CATEGORIAS_PROGRESSAO.filter(
              (c) =>
                compatibleProgression(policy, c.id) &&
                offenderCategoryCompatible(policy, offender, c.id),
            ).map((c) => (
              <option
                key={c.id}
                value={c.id}
                disabled={
                  !compatibleProgression(policy, c.id) ||
                  !offenderCategoryCompatible(policy, offender, c.id)
                }
              >
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <p className="text-xs text-muted-foreground">
          Opções incompatíveis com a modalidade selecionada ficam desabilitadas. A fração manual
          exige conferência expressa da lei no tempo; não altera o enquadramento do crime.
        </p>
        {catId === "manual" && (
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">
              Numerador
              <input
                type="number"
                min={1}
                className={field}
                value={fracaoManual.num}
                onChange={(e) => {
                  setFracaoManual({ ...fracaoManual, num: num(e.target.value) });
                  setRegraConfirmada(false);
                }}
              />
            </label>
            <label className="text-sm">
              Denominador
              <input
                type="number"
                min={1}
                className={field}
                value={fracaoManual.den}
                onChange={(e) => {
                  setFracaoManual({ ...fracaoManual, den: num(e.target.value) });
                  setRegraConfirmada(false);
                }}
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
            checked={ruleReviewed}
            disabled={
              !compatibleProgression(policy, catId) ||
              !offenderCategoryCompatible(policy, offender, catId)
            }
            onChange={(e) => {
              setRuleReviewed(e.target.checked);
              if (!e.target.checked) setConfirmedProfile(null);
            }}
          />{" "}
          Conferi a fração e as vedações para o caso de estudo, incluindo a lei no tempo.
        </label>
        {suggestedParole.id !== "vedado" && result.value && result.value.penaDias >= 720 && (
          <label className="block text-sm font-medium">
            Perfil para o livramento condicional (CP, art. 83)
            <select
              className={cn(field, "mt-1")}
              value={livId}
              onChange={(e) => {
                setLivId(e.target.value);
                setRegraConfirmada(false);
              }}
            >
              <option value="vedado">Não calcular: vedação ou dados insuficientes</option>
              {LIVRAMENTO.filter(
                (l) =>
                  l.id === suggestedParole.id &&
                  compatibleParole(policy, l.id, catId, specificRecidivism),
              ).map((l) => (
                <option
                  key={l.id}
                  value={l.id}
                  disabled={
                    !compatibleParole(policy, l.id, catId, specificRecidivism) ||
                    l.id !== suggestedParole.id ||
                    (l.id !== "vedado" && (!result.value || result.value.penaDias < 720))
                  }
                >
                  {l.label}
                </option>
              ))}
            </select>
          </label>
        )}
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium">
            Detração (dias de prisão provisória)
            <input
              className={cn(field, "mt-1")}
              type="number"
              min={0}
              value={detracao}
              onChange={(e) => {
                setDetracao(num(e.target.value));
                setRegraConfirmada(false);
              }}
            />
          </label>
          <label className="text-sm font-medium">
            Dias remidos
            <input
              className={cn(field, "mt-1")}
              type="number"
              min={0}
              value={remido}
              onChange={(e) => {
                setRemido(num(e.target.value));
                setRegraConfirmada(false);
              }}
            />
          </label>
        </div>
        <Button
          className="w-full"
          disabled={
            !ruleReviewed || !result.value || !offenderCategoryCompatible(policy, offender, catId)
          }
          onClick={() => setRegraConfirmada(true)}
        >
          Calcular marcos com este perfil
        </Button>
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
            Confira a fração aplicável e clique em “Calcular marcos com este perfil” para exibir a
            projeção.
          </p>
        )}
        {regraConfirmada &&
          compatibleProgression(policy, catId) &&
          offenderCategoryCompatible(policy, offender, catId) &&
          prog &&
          lc &&
          fim !== undefined &&
          penaDias !== undefined && (
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
              {livId !== "vedado" &&
                penaDias >= 720 &&
                compatibleParole(policy, livId, catId, specificRecidivism) && (
                  <Result
                    title={
                      livId === "vedado" ||
                      !compatibleParole(policy, livId, catId, specificRecidivism) ||
                      penaDias < 720
                        ? "Livramento condicional: não habilitado"
                        : `Livramento condicional: mais de ${liv.fracao.num}/${liv.fracao.den}`
                    }
                  >
                    {penaDias < 2 * 360 ? (
                      <p className="font-semibold text-rose-600">
                        O livramento exige pena igual ou superior a 2 anos (art. 83, caput).
                      </p>
                    ) : livId === "vedado" ||
                      !compatibleParole(policy, livId, catId, specificRecidivism) ? (
                      <p className="font-semibold text-rose-600">
                        O livramento não está habilitado para esta combinação. Confira a vedação, a
                        reincidência específica ou a insuficiência de enquadramento (CP, art. 83;
                        LEP, art. 112).
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
                          Exigido: <strong>{lc.exigidosDias} dias</strong> (mais de {liv.fracao.num}
                          /{liv.fracao.den} de {lc.totalDias}).
                        </p>
                        <p className="mt-1 text-base font-bold">
                          {lc.jaCumprido ? (
                            "Abatimentos informados cobrem a fração exigida."
                          ) : (
                            <>Marco temporal hipotético: {formatBr(lc.data)}</>
                          )}
                        </p>
                        <p className="text-muted-foreground">
                          Exige também requisitos do art. 83, III e IV (comportamento, ausência de
                          falta grave nos últimos 12 meses, trabalho e reparação do dano).
                        </p>
                      </>
                    )}
                  </Result>
                )}
              <PenalExample
                source="execution"
                example={{
                  title: "Como os abatimentos alteram a primeira progressão",
                  scenario: `Imagine uma pena de ${formatPena(pena)} e data-base em ${formatBr(parseDate(inicio))}, com a fração ${cat.fracao.num}/${cat.fracao.den} já conferida para o exercício.`,
                  steps: [
                    `A pena corresponde a ${prog.totalDias} dias pelo calendário. A fração exige ${prog.exigidosDias} dias inteiros.`,
                    `Detração de ${detracao} dias + remição de ${remido} dias = ${prog.abatidosDias} dias abatidos.`,
                    `Requisito temporal restante: máximo entre zero e (${prog.exigidosDias} − ${prog.abatidosDias}) = ${prog.faltamDias} dias.`,
                  ],
                  conclusion: prog.jaCumprido
                    ? "Os abatimentos informados cobrem a fração; isso não concede a progressão."
                    : `Incluindo o dia da data-base, o marco hipotético é ${formatBr(prog.data)}.`,
                  caution:
                    "LEP, art. 112; CP, arts. 10 e 42: não duplique dias já contados. Interrupções e requisitos subjetivos podem alterar a análise.",
                }}
              />
              {livId !== "vedado" &&
                penaDias >= 720 &&
                compatibleParole(policy, livId, catId, specificRecidivism) && (
                  <PenalExample
                    source="execution"
                    example={{
                      title: "Entendendo o livramento condicional",
                      scenario: `No mesmo exercício, a pena é de ${formatPena(pena)} e o perfil de livramento é ${livId === "vedado" ? "vedado" : liv.label}.`,
                      steps:
                        penaDias < 720
                          ? [
                              "A pena informada é inferior a dois anos; o requisito quantitativo do art. 83, caput, não foi atendido.",
                            ]
                          : livId === "vedado" ||
                              !compatibleParole(policy, livId, catId, specificRecidivism)
                            ? [
                                "A hipótese selecionada foi marcada como vedada; alcançar uma fração de tempo não afasta a vedação.",
                              ]
                            : ["v", "via", "vib", "vic", "vid", "vii", "viii"].includes(catId) &&
                                livId !== "doistercos"
                              ? [
                                  "O perfil de hediondo/equiparado não pode ser combinado com a regra comum de 1/3 ou 1/2. Corrija o perfil antes de usar o exemplo.",
                                ]
                              : [
                                  `A expressão “mais de” exige ${lc.exigidosDias} dias, superando a fração ${liv.fracao.num}/${liv.fracao.den} de ${lc.totalDias}.`,
                                  `Depois de ${lc.abatidosDias} dias de abatimentos, restam ${lc.faltamDias} dias para esse requisito temporal.`,
                                ],
                      conclusion:
                        "Tempo cumprido e elegibilidade jurídica são verificações diferentes.",
                      caution:
                        "CP, art. 83, e vedações especiais: comportamento, reincidência específica, reparação do dano e outros requisitos precisam ser analisados.",
                    }}
                  />
                )}
              <Result title="Ao concluir o tempo de pena · penal e execução" tone="warn">
                <p>
                  O marco abaixo é a duração integral do exercício, sem abatimentos ou interrupções.
                  O reconhecimento da extinção da punibilidade cabe ao juízo da execução (LEP, art.
                  66, II).
                </p>
                <p className="mt-2">
                  No processo penal, essa data não é ordem automática de soltura nem decisão sobre
                  outras medidas cautelares. Fiança e prisão preventiva têm requisitos próprios no
                  CPP.
                </p>
                <p className="mt-2">
                  O término não apaga automaticamente a condenação: a aferição de reincidência de um
                  novo fato deve observar o período e as condições do CP, art. 64, I.
                </p>
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
function PrescricaoTab({
  offender,
  sentenceDays,
  crimeId,
}: {
  offender: OffenderProfile;
  sentenceDays: number | null;
  crimeId: string;
}) {
  const [manualPena, setManualPena] = useState<Pena | null>(null);
  const crime = CRIMES.find((c) => c.id === crimeId);
  const [executoria, setExecutoria] = useState(false);
  const pena =
    manualPena ??
    (executoria && sentenceDays !== null
      ? diasParaPena(sentenceDays)
      : !executoria && crime
        ? crime.max
        : { anos: 0, meses: 0, dias: 0 });
  const setPena = (p: Pena) => setManualPena(p);
  useEffect(() => setManualPena(null), [crimeId]);
  const reinc = offender.kind === "recurrent";
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
  if (!crime)
    return (
      <section className={card}>
        <h2 className="font-bold">Prescrição não parametrizada</h2>
        <p className="text-sm text-muted-foreground">
          Este dispositivo exige conferir hipóteses de imprescritibilidade, regras especiais e
          termos iniciais. O painel não presume a aplicação da tabela geral.
        </p>
      </section>
    );
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className={card}>
        <h2 className="text-lg font-bold">Dados</h2>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={executoria}
            onChange={(e) => {
              setExecutoria(e.target.checked);
              setManualPena(null);
            }}
          />{" "}
          Simular pretensão executória pela pena aplicada (o termo inicial deve ser conferido)
        </label>
        <p className="rounded-xl bg-muted p-3 text-sm">
          <strong>{offenderLabel(offender)}.</strong>{" "}
          {executoria && reinc
            ? "Nesta hipótese executória, o prazo aumenta de um terço (CP, art. 110)."
            : "A seleção de reincidência não aumenta o prazo da hipótese punitiva em abstrato."}
        </p>
        {executoria && sentenceDays !== null && (
          <Button variant="outline" onClick={() => setManualPena(null)}>
            Usar pena simulada: {formatPena(diasParaPena(sentenceDays))}
          </Button>
        )}
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
            <PenalExample
              example={{
                title: "Prazo não é declaração de prescrição",
                scenario: `Imagine ${executoria ? "uma pena aplicada" : "uma pena máxima prevista"} de ${formatPena(pena)}, com termo inicial hipotético em ${formatBr(parseDate(termo))}.`,
                steps: r.notas,
                conclusion: `Sem interrupções ou suspensões, a projeção do exercício chega a ${formatBr(data)}.`,
                caution:
                  "CP, arts. 109–117: o termo inicial e a lei aplicável precisam ser conferidos. Uma nova causa interruptiva ou suspensiva muda a conta; esta data não prova extinção da punibilidade.",
              }}
            />
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
            <PenalExample source="lep" example={remitionExample(blocos, diasTrab, conclusao, r)} />
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
  const [crimeId, setCrimeIdState] = useState("cp157");
  const [extermination, setExtermination] = useState(false);
  const [offender, setOffender] = useState<OffenderProfile>(INITIAL_OFFENDER);
  const [sentenceDays, setSentenceDays] = useState<number | null>(6 * 360);
  const [sourcePenalty, setSourcePenalty] = useState<SourcePenalty | null>(null);
  const policy = crimePolicy(crimeId, extermination);
  const setCrimeId = (id: string) => {
    if (id !== crimeId) {
      setExtermination(false);
      setDiasRemidos(0);
      setOffender((profile) => ({ ...profile, specificSpecial: false }));
    }
    setCrimeIdState(id);
  };
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
      <PenalOffenderSelector value={offender} onChange={setOffender} policy={policy} />
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
          <DosimetriaTab
            crimeId={crimeId}
            setCrimeId={setCrimeId}
            policy={policy}
            extermination={extermination}
            setExtermination={setExtermination}
            onSentence={setSentenceDays}
            sourcePenalty={sourcePenalty}
            onSourcePenalty={setSourcePenalty}
            offender={offender}
          />
        </TabsContent>
        <TabsContent value="execucao" forceMount className="mt-5 data-[state=inactive]:hidden">
          <ExecucaoTab
            key={`${crimeId}:${extermination}`}
            remido={diasRemidos}
            setRemido={setDiasRemidos}
            policy={policy}
            sentenceDays={sentenceDays}
            offender={offender}
          />
        </TabsContent>
        <TabsContent value="prescricao" forceMount className="mt-5 data-[state=inactive]:hidden">
          <PrescricaoTab offender={offender} sentenceDays={sentenceDays} crimeId={crimeId} />
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
