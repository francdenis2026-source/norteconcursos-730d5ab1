import { Button } from "@/components/ui/button";
import { offenderLabel, type OffenderProfile } from "@/lib/penalOffender";
import type { CrimePolicy } from "@/lib/penalPolicy";

export function PenalOffenderSelector({
  value,
  onChange,
  policy,
}: {
  value: OffenderProfile;
  onChange: (profile: OffenderProfile) => void;
  policy: CrimePolicy;
}) {
  const special = policy.classification === "hediondo" || policy.classification === "equiparado";
  return (
    <section
      className="rounded-2xl border border-sky-300 bg-sky-50/60 p-4 dark:border-sky-800 dark:bg-sky-950/30"
      aria-label="Perfil penal da pessoa"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold">Perfil da pessoa no exercício</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            A seleção vale para dosimetria, regime, execução e prescrição.
          </p>
        </div>
        <div className="flex gap-2" role="group" aria-label="Primariedade ou reincidência">
          <Button
            type="button"
            aria-pressed={value.kind === "primary"}
            variant={value.kind === "primary" ? "default" : "outline"}
            onClick={() =>
              onChange({
                ...value,
                kind: "primary",
                previousIntent: "unknown",
                specificSpecial: false,
              })
            }
          >
            Primário
          </Button>
          <Button
            type="button"
            aria-pressed={value.kind === "recurrent"}
            variant={value.kind === "recurrent" ? "default" : "outline"}
            onClick={() => onChange({ ...value, kind: "recurrent" })}
          >
            Reincidente
          </Button>
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="text-sm font-medium">
          Antecedentes para o exercício
          <select
            className="mt-1 min-h-11 w-full rounded-xl border bg-background px-3 text-sm"
            value={value.record}
            onChange={(e) =>
              onChange({ ...value, record: e.target.value as OffenderProfile["record"] })
            }
          >
            <option value="unknown">Não informado</option>
            <option value="good">Bons antecedentes confirmados</option>
            <option value="bad">Maus antecedentes — exige análise própria</option>
          </select>
        </label>
        {value.kind === "recurrent" && (
          <label className="text-sm font-medium">
            Natureza da condenação anterior
            <select
              className="mt-1 min-h-11 w-full rounded-xl border bg-background px-3 text-sm"
              value={value.previousIntent}
              onChange={(e) =>
                onChange({
                  ...value,
                  previousIntent: e.target.value as OffenderProfile["previousIntent"],
                })
              }
            >
              <option value="unknown">Não informada</option>
              <option value="intentional">Crime doloso</option>
              <option value="culpable">Crime culposo</option>
            </select>
          </label>
        )}
      </div>
      <label className="mt-3 flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={value.specificSpecial}
          disabled={value.kind !== "recurrent" || !special}
          onChange={(e) => onChange({ ...value, specificSpecial: e.target.checked })}
        />
        Reincidência específica em hediondo/equiparado, juridicamente conferida
      </label>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        <strong>Selecionado: {offenderLabel(value)}.</strong> Reincidência exige os pressupostos dos
        arts. 63 e 64 do CP, incluindo condenação anterior transitada antes do novo fato e período
        depurador. Antecedentes e reincidência são verificações diferentes. A ferramenta não
        verifica histórico criminal.
      </p>
    </section>
  );
}
