import { useEffect, useState } from "react";
import { useAuthStatus } from "@/hooks/useDashboard";
import { useLegalCourses, useLegalUnits, type LegalUnit } from "@/lib/legalCourses";
import { CRIMES, crimeStudyTarget, type Pena } from "@/lib/penalCalc";
import { custodialUnits, suggestCustodialPenalty, type SourcePenalty } from "@/lib/penalCatalog";
import { Button } from "@/components/ui/button";
import { isStudySourceUrl } from "@/lib/studySourceUrl";
const field =
  "mt-1 min-h-11 min-w-0 w-full max-w-full rounded-xl border bg-background px-3 py-2 text-sm";

export function PenalLawPicker({
  law,
  crimeId,
  onLaw,
  onCrime,
  onApply,
}: {
  law: string;
  crimeId: string;
  onLaw: (slug: string) => void;
  onCrime: (id: string) => void;
  onApply: (source: SourcePenalty) => void;
}) {
  const { user } = useAuthStatus();
  const userId = user?.id !== "demo-user" ? user?.id : undefined;
  const courses = useLegalCourses(userId);
  const active = (courses.data ?? []).filter((c) => !!c.syllabus_topic_id);
  const course = active.find((c) => c.slug === law);
  const presets = CRIMES.filter((c) => crimeStudyTarget(c.id)?.slug === law);
  const [browse, setBrowse] = useState(false);
  const [unitKey, setUnitKey] = useState("");
  useEffect(() => {
    setUnitKey("");
    setBrowse(false);
  }, [law]);
  const units = useLegalUnits(browse || !presets.length ? course?.id : undefined, userId);
  const rows = custodialUnits(units.data ?? []);
  const selected = rows.find((u) => u.unit_key === unitKey);
  const known = new Set(["codigo-penal", "drogas", "armas"]);
  return (
    <div className="space-y-3">
      <label className="block min-w-0 text-sm font-medium">
        Lei do crime
        <select className={field} value={law} onChange={(e) => onLaw(e.target.value)}>
          <optgroup label="Cálculo rápido parametrizado">
            <option value="codigo-penal">Código Penal</option>
            <option value="drogas">Lei de Drogas</option>
            <option value="armas">Estatuto do Desarmamento</option>
          </optgroup>
          <optgroup label="Legislação do acervo · conferir dispositivo">
            {active
              .filter((c) => !known.has(c.slug))
              .map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.title}
                </option>
              ))}
          </optgroup>
          <option value="manual">Outra lei: informar os limites</option>
        </select>
      </label>
      {courses.isLoading && (
        <p role="status" className="text-xs">
          Carregando leis disponíveis…
        </p>
      )}
      {courses.isError && (
        <p role="alert" className="text-xs">
          Não foi possível consultar o acervo.{" "}
          <button className="underline" onClick={() => void courses.refetch()}>
            Tentar novamente
          </button>
        </p>
      )}
      {presets.length > 0 && (
        <label className="block min-w-0 text-sm font-medium">
          Crime parametrizado
          <select
            className={field}
            value={crimeId}
            onChange={(e) => {
              onCrime(e.target.value);
              if (e.target.value === "custom") setBrowse(true);
            }}
          >
            {presets.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
            <option value="custom">Outro dispositivo desta lei</option>
          </select>
        </label>
      )}
      {presets.length > 0 && (
        <button
          className="text-xs text-primary underline"
          onClick={() => setBrowse((v) => !v)}
          aria-expanded={browse}
        >
          Consultar outros dispositivos desta lei
        </button>
      )}
      {(browse || !presets.length) && course && (
        <div className="space-y-3 rounded-xl border p-3">
          <p className="text-xs text-muted-foreground">
            Dispositivos com menção a pena privativa de liberdade no texto cadastrado. A menção pode
            pertencer a outra modalidade; confira o preceito antes de usar os valores.
          </p>
          {units.isLoading && (
            <p role="status" className="text-sm">
              Carregando dispositivos…
            </p>
          )}
          {units.isError && (
            <p role="alert" className="text-sm">
              Não foi possível carregar os dispositivos.{" "}
              <button className="underline" onClick={() => void units.refetch()}>
                Tentar novamente
              </button>
            </p>
          )}
          {!units.isLoading && !units.isError && !rows.length && (
            <p className="text-sm text-muted-foreground">
              Não há preceito com pena privativa identificado nesta lei. Ela continua disponível
              para consulta na biblioteca.
            </p>
          )}
          {rows.length > 0 && (
            <label className="block min-w-0 text-sm font-medium">
              Dispositivo da lei
              <select
                className={field}
                value={unitKey}
                onChange={(e) => {
                  setUnitKey(e.target.value);
                  onCrime("custom");
                }}
              >
                <option value="">Selecione um artigo</option>
                {rows.map((u) => (
                  <option key={u.id} value={u.unit_key}>
                    {u.label} · {u.chapter}
                  </option>
                ))}
              </select>
            </label>
          )}
          {selected && (
            <SourceConfirmation
              key={`${law}:${unitKey}`}
              unit={selected}
              law={course.slug}
              title={course.title}
              checked={course.checked_at}
              onApply={onApply}
            />
          )}
          {isStudySourceUrl(course.source_url) && (
            <a
              href={course.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-primary underline"
            >
              Conferir a fonte oficial · revisão registrada {course.checked_at?.slice(0, 10)}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
function SourceConfirmation({
  unit,
  law,
  title,
  checked,
  onApply,
}: {
  unit: LegalUnit;
  law: string;
  title: string;
  checked: string;
  onApply: (s: SourcePenalty) => void;
}) {
  const suggestion = suggestCustodialPenalty(unit.body_text);
  const [min, setMin] = useState<Pena>(suggestion?.min ?? { anos: 0, meses: 0, dias: 0 });
  const [max, setMax] = useState<Pena>(suggestion?.max ?? { anos: 0, meses: 0, dias: 0 });
  const [tipo, setTipo] = useState<"reclusão" | "detenção">(suggestion?.tipo ?? "reclusão");
  const [confirmed, setConfirmed] = useState(false);
  const valid = (p: Pena) =>
    [p.anos, p.meses, p.dias].every((n) => Number.isSafeInteger(n) && n >= 0) &&
    p.anos <= 1000 &&
    p.meses < 12 &&
    p.dias < 30;
  const days = (p: Pena) => p.anos * 360 + p.meses * 30 + p.dias;
  return (
    <div className="space-y-3">
      <details open>
        <summary className="cursor-pointer text-sm font-semibold">
          Ler {unit.label} antes de calcular
        </summary>
        <blockquote className="mt-2 max-h-64 overflow-y-auto whitespace-pre-wrap break-words rounded-lg bg-muted/40 p-3 text-sm leading-6">
          {unit.body_text}
        </blockquote>
      </details>
      <p className="text-xs text-muted-foreground">
        {suggestion
          ? "Sugestão textual dos limites do caput. Confirme a modalidade e a lei no tempo."
          : "Os limites não puderam ser sugeridos com segurança. Informe-os após conferir a modalidade."}{" "}
        O enquadramento e os benefícios desta seleção ainda não são automatizados.
      </p>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        {(
          [
            ["Mínima", min, setMin],
            ["Máxima", max, setMax],
          ] as const
        ).map(([label, value, set]) => (
          <fieldset key={label} className="min-w-0">
            <legend className="text-xs font-semibold">Pena {label.toLowerCase()} conferida</legend>
            <div className="grid grid-cols-3 gap-2">
              {(["anos", "meses", "dias"] as const).map((k) => (
                <label key={k} className="text-xs">
                  {k}
                  <input
                    className={field}
                    type="number"
                    min={0}
                    max={k === "anos" ? 1000 : k === "meses" ? 11 : 29}
                    value={value[k]}
                    onChange={(e) => {
                      set({ ...value, [k]: Number(e.target.value) });
                      setConfirmed(false);
                    }}
                  />
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <label className="block text-xs">
        Espécie da pena
        <select
          className={field}
          value={tipo}
          onChange={(e) => {
            setTipo(e.target.value as typeof tipo);
            setConfirmed(false);
          }}
        >
          <option value="reclusão">Reclusão</option>
          <option value="detenção">Detenção</option>
        </select>
      </label>
      <label className="flex items-start gap-2 text-xs leading-5">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        Conferi que este dispositivo define o crime do exercício, os limites, a modalidade, a
        vigência e as ressalvas jurisprudenciais. O texto integral pode conter remissões e outras
        penas.
      </label>
      <Button
        className="h-auto min-h-10 max-w-full whitespace-normal"
        disabled={
          !confirmed || !valid(min) || !valid(max) || days(min) <= 0 || days(max) < days(min)
        }
        onClick={() =>
          onApply({
            lawSlug: law,
            lawTitle: title,
            unitKey: unit.unit_key,
            label: unit.label,
            min,
            max,
            tipo,
            checkedAt: checked,
          })
        }
      >
        Usar os limites conferidos neste exercício
      </Button>
    </div>
  );
}
