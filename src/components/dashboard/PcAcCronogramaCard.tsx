import * as React from "react";
import { CalendarClock, Download, CheckCircle2, SlidersHorizontal, CalendarDays, ListChecks, Flag, BookOpen, Video, PenLine, RotateCcw, Trophy, Coffee, Dumbbell, Moon, CalendarCheck2, ExternalLink, LockKeyhole, Pencil, Trash2, ChevronLeft, ChevronRight, Clock, Plus, X } from "lucide-react";
import { Button as AstryxButton } from "@astryxdesign/core/Button";
import { TabList, Tab } from "@astryxdesign/core/TabList";
import { Card } from "@astryxdesign/core/Card";
import { List } from "@astryxdesign/core/List";
import { Item } from "@astryxdesign/core/Item";
import { Badge as AstryxBadge } from "@astryxdesign/core/Badge";
import { Table, proportional } from "@astryxdesign/core/Table";
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog";
import { Layout, LayoutContent, LayoutFooter } from "@astryxdesign/core/Layout";
import { Theme } from "@astryxdesign/core/theme";
import { themes, defaultThemeSlug } from "../../astryx-themes";
import { getActiveTheme } from "@/lib/theme";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";
import { DEFAULT_PCAC_STUDY_CONFIG, PCAC_COMMITMENT_LABEL, PCAC_EXAM_DATE, readPcAcStudyConfig, writePcAcStudyConfig, type PcAcCommitment, type PcAcCommitmentKind, type PcAcStudyPlanConfig, type PcAcWeeklyGridRow } from "@/lib/pcAcreStudyPlan";
import { pcAcBlockPoints } from "@/lib/pcAcreExamWeights";
import { INVESTIGATOR_DISCIPLINE_PESO } from "@/data/pcAcreIdecanRadar";
import { PCAC_ACTIVITY_LABEL, PCAC_PHASE_LABEL, buildPcAcFinalDays, buildPcAcMasterPlan, pcAcDaysBetween, pcAcLastStudyDate, type PcAcActivityType, type PcAcPlanDay, type PcAcPlanWeek } from "@/lib/pcAcreMasterPlan";
import { platformDate } from "@/lib/platformClock";
import { findPcAcStudyResource, pcAcStudyResourceUrl } from "@/lib/pcAcStudyResources";
import "@/styles/pcac-schedule.css";
const CRONOGRAMA_ANCHOR = "pcac-cronograma";
const DAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const WEEKDAY_FULL = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const GRID_DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const GRID_DAY_LETTER = ["D", "S", "T", "Q", "Q", "S", "S"]; // índice = weekday (0 domingo)

const MATERIAL_SHORTCUTS = {
  teoria: { label: "Teoria", icon: BookOpen },
  video: { label: "Vídeo", icon: Video },
  questoes: { label: "Questões", icon: ListChecks },
  simulado: { label: "Simulado", icon: Trophy },
} as const;
type MaterialShortcutType = keyof typeof MATERIAL_SHORTCUTS;

function materialShortcut(activity: { type: PcAcActivityType; subject?: string; topic?: string; detail?: string }) {
  const subject = activity.subject?.trim();
  const topic = activity.topic?.trim();
  if (!subject || !topic) return null;
  const q = encodeURIComponent(topic);
  const discipline = encodeURIComponent(subject);
  const back = encodeURIComponent("/dashboard/pc-acre-edital#pcac-cronograma");
  const type = activity.type as MaterialShortcutType;
  if (!(type in MATERIAL_SHORTCUTS)) return null;
  const href = type === "questoes"
    ? `/dashboard/question-trainer?subject=${discipline}&topic=${q}&back=${back}`
    : type === "simulado"
      ? `/dashboard/mock-exams?studySubject=${discipline}&materialTopic=${q}`
      : type === "video"
        ? `/dashboard/media?tab=assuntos&subject=${discipline}&topic=${q}`
        : `/dashboard/library?collection=subjects&discipline=${discipline}&q=${q}&back=${back}`;
  return { ...MATERIAL_SHORTCUTS[type], href };
}

function MaterialShortcut({ activity }: { activity: { type: PcAcActivityType; subject?: string; topic?: string; detail?: string } }) {
  const shortcut = materialShortcut(activity);
  if (!shortcut) return null;
  const Icon = shortcut.icon;
  return (
    <a
      href={shortcut.href}
      className="pcac-material-shortcut"
      aria-label={`Abrir ${shortcut.label.toLocaleLowerCase("pt-BR")}: ${activity.topic}`}
      title={`Abrir ${shortcut.label}`}
    >
      <Icon aria-hidden="true" className="pcac-material-shortcut__icon" />
      <span>{shortcut.label}</span>
      <ExternalLink aria-hidden="true" className="pcac-material-shortcut__external" />
    </a>
  );
}

const COMMITMENT_KINDS = Object.keys(PCAC_COMMITMENT_LABEL) as PcAcCommitmentKind[];
const COMMITMENT_DEFAULT_MINUTES: Partial<Record<PcAcCommitmentKind, number>> = {
  trabalho: 480,
  "intervalo-trabalho": 60,
  banho: 30,
  descanso: 60,
  deslocamento: 40,
  academia: 90,
  escola: 40,
  medico: 90,
  reuniao: 60,
  emergencia: 120,
};

/** Compromissos do aluno: horários fixos da semana ou de uma data específica que o cronograma
 * precisa respeitar. Ao salvar, o plano é recalculado e o estudo passa a ocupar só os espaços
 * livres do dia. */
function CommitmentsEditor({
  commitments,
  disabled,
  saved,
  onChange,
}: {
  commitments: PcAcCommitment[];
  disabled: boolean;
  saved: boolean;
  onChange: (next: PcAcCommitment[]) => void;
}) {
  const [kind, setKind] = React.useState<PcAcCommitmentKind>("trabalho");
  const [label, setLabel] = React.useState("");
  const [time, setTime] = React.useState("08:00");
  const [endTime, setEndTime] = React.useState("16:00");
  const [repeat, setRepeat] = React.useState<"semana" | "data">("semana");
  const [days, setDays] = React.useState<number[]>([1, 2, 3, 4, 5]);
  const [date, setDate] = React.useState("");
  const [error, setError] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = React.useState<PcAcCommitment | null>(null);

  const pickKind = (next: PcAcCommitmentKind) => {
    setKind(next);
    const defaultMinutes = COMMITMENT_DEFAULT_MINUTES[next] ?? 60;
    const startMinutes = clockToMinutes(time);
    const total = Math.min(23 * 60 + 59, startMinutes + defaultMinutes);
    setEndTime(`${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`);
    if (next === "medico" || next === "reuniao" || next === "emergencia") setRepeat("data");
  };

  const add = () => {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return setError("Informe um horário válido.");
    const startMinutes = clockToMinutes(time);
    const finishMinutes = clockToMinutes(endTime);
    // Plantão que vira a noite (ex.: entra 19:00, sai 07:00): hora final menor ou igual à inicial
    // vira "do dia seguinte" em vez de erro — "igual" é um plantão de 24h.
    const calculatedMinutes = finishMinutes > startMinutes
      ? finishMinutes - startMinutes
      : 24 * 60 - startMinutes + finishMinutes;
    if (calculatedMinutes < 5) return setError("A hora final deve ser pelo menos 5 minutos depois do início.");
    if (repeat === "semana" && !days.length) return setError("Escolha ao menos um dia da semana.");
    if (repeat === "data" && !/^\d{4}-\d{2}-\d{2}$/.test(date)) return setError("Escolha a data do compromisso.");
    setError("");
    const next = {
      id: editingId ?? `c${Date.now().toString(36)}`,
      kind,
      ...(label.trim() ? { label: label.trim() } : {}),
      time,
      minutes: calculatedMinutes,
      ...(repeat === "data" ? { date } : { days: [...days].sort((a, b) => a - b) }),
    };
    onChange(editingId ? commitments.map((item) => item.id === editingId ? next : item) : [...commitments, next]);
    setEditingId(null);
    setLabel("");
  };

  const edit = (commitment: PcAcCommitment) => {
    setEditingId(commitment.id);
    setKind(commitment.kind);
    setLabel(commitment.label ?? "");
    setTime(commitment.time);
    const finishMinutes = clockToMinutes(commitment.time) + commitment.minutes;
    setEndTime(`${String(Math.floor(finishMinutes / 60) % 24).padStart(2, "0")}:${String(finishMinutes % 60).padStart(2, "0")}`);
    setRepeat(commitment.date ? "data" : "semana");
    setDate(commitment.date ?? "");
    setDays(commitment.days ?? [1, 2, 3, 4, 5]);
    setError("");
  };

  return (
    <div className="pcac-commitments">
      {commitments.length > 0 && (
        <ul className="pcac-commitments__list">
          {commitments.map((commitment) => {
            const end = (() => {
              const [h, m] = commitment.time.split(":").map(Number);
              const total = (h ?? 0) * 60 + (m ?? 0) + commitment.minutes;
              return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
            })();
            return (
              <li key={commitment.id} className="pcac-commitments__item">
                <span className="pcac-commitments__time">{commitment.time}–{end}</span>
                <span className="pcac-commitments__name">
                  {commitment.label || PCAC_COMMITMENT_LABEL[commitment.kind]}
                  <small>
                    {commitment.date
                      ? commitment.date.split("-").reverse().join("/")
                      : (commitment.days ?? []).map((day) => DAY_SHORT[day]).join(", ")}
                  </small>
                </span>
                {saved && (
                  <span className="pcac-commitments__lock" title="Compromisso guardado">
                    <LockKeyhole aria-hidden="true" size={14} />
                  </span>
                )}
                <AstryxButton variant="ghost" size="sm" isIconOnly icon={<Pencil />} label={`Editar ${commitment.label || PCAC_COMMITMENT_LABEL[commitment.kind]}`} isDisabled={disabled} onClick={() => edit(commitment)} />
                <AstryxButton variant="ghost" size="sm" isIconOnly icon={<X />} label={`Excluir ${commitment.label || PCAC_COMMITMENT_LABEL[commitment.kind]}`} isDisabled={disabled} onClick={() => setPendingDelete(commitment)} />
              </li>
            );
          })}
        </ul>
      )}
      <div className="pcac-commitments__form">
        <div className="space-y-1">
          <Label htmlFor="commitment-kind">Tipo</Label>
          <select
            id="commitment-kind"
            className="pcac-commitments__select"
            value={kind}
            disabled={disabled}
            onChange={(event) => pickKind(event.target.value as PcAcCommitmentKind)}
          >
            {COMMITMENT_KINDS.map((option) => (
              <option key={option} value={option}>{PCAC_COMMITMENT_LABEL[option]}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="commitment-label">Nome (opcional)</Label>
          <Input id="commitment-label" value={label} disabled={disabled} placeholder="Ex.: plantão, fisioterapia" onChange={(event) => setLabel(event.target.value)} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="commitment-time">Começa às</Label>
          <Input id="commitment-time" type="time" value={time} disabled={disabled} onChange={(event) => setTime(event.target.value)} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="commitment-end">Termina às</Label>
          <Input id="commitment-end" type="time" value={endTime} disabled={disabled} onChange={(event) => setEndTime(event.target.value)} />
          <small className="pcac-commitments__calculated">{Math.max(0, clockToMinutes(endTime) - clockToMinutes(time))} min calculados</small>
        </div>
        <div className="space-y-1">
          <Label htmlFor="commitment-repeat">Quando</Label>
          <select
            id="commitment-repeat"
            className="pcac-commitments__select"
            value={repeat}
            disabled={disabled}
            onChange={(event) => setRepeat(event.target.value as "semana" | "data")}
          >
            <option value="semana">Toda semana</option>
            <option value="data">Só numa data</option>
          </select>
        </div>
        {repeat === "data" ? (
          <div className="space-y-1">
            <Label htmlFor="commitment-date">Data</Label>
            <Input id="commitment-date" type="date" value={date} disabled={disabled} onChange={(event) => setDate(event.target.value)} />
          </div>
        ) : (
          <div className="pcac-commitments__days">
            <p className="mb-2 text-xs font-semibold">Dias</p>
            <div className="flex flex-wrap gap-2">
              {DAY_ORDER.map((day) => (
                <label key={day} className="inline-flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={days.includes(day)}
                    disabled={disabled}
                    onChange={(event) => setDays(event.target.checked ? [...days, day] : days.filter((value) => value !== day))}
                  />
                  {DAY_SHORT[day]}
                </label>
              ))}
            </div>
          </div>
        )}
        <div className="pcac-commitments__submit">
          <AstryxButton variant="secondary" size="sm" icon={<Plus />} label={editingId ? "Guardar edição" : "Adicionar compromisso"} isDisabled={disabled} onClick={add} />
        </div>
      </div>
      <Dialog isOpen={!!pendingDelete} onOpenChange={(open) => { if (!open) setPendingDelete(null); }} width={390} padding={0}>
        {pendingDelete && (
          <section className="pcac-delete-dialog" aria-labelledby="pcac-delete-title" aria-describedby="pcac-delete-description">
            <header className="pcac-delete-dialog__header">
              <div className="pcac-delete-dialog__eyebrow">Ação do cronograma</div>
              <AstryxButton variant="ghost" size="sm" isIconOnly icon={<X />} label="Fechar confirmação" onClick={() => setPendingDelete(null)} />
            </header>
            <div className="pcac-delete-dialog__content">
              <div className="pcac-delete-dialog__hero" aria-hidden="true"><Trash2 /></div>
              <h2 id="pcac-delete-title">Excluir compromisso?</h2>
              <p id="pcac-delete-description" className="pcac-delete-dialog__description">Esta alteração remove o compromisso dos horários usados pelo seu cronograma.</p>
              <div className="pcac-delete-dialog__record">
                <strong>{pendingDelete.label || PCAC_COMMITMENT_LABEL[pendingDelete.kind]}</strong>
                <span>{pendingDelete.time} · {pendingDelete.minutes} min</span>
              </div>
              <div className="pcac-delete-dialog__actions">
                <AstryxButton label="Manter compromisso" variant="secondary" size="sm" onClick={() => setPendingDelete(null)} />
                <AstryxButton label="Excluir" variant="destructive" size="sm" icon={<Trash2 />} onClick={() => { if (editingId === pendingDelete.id) setEditingId(null); onChange(commitments.filter((item) => item.id !== pendingDelete.id)); setPendingDelete(null); }} />
              </div>
            </div>
          </section>
        )}
      </Dialog>
      {error && <p className="pcac-commitments__error" role="alert">{error}</p>}
      <p className="pcac-commitments__hint">
        O estudo nunca é marcado sobre um compromisso: o plano usa só os horários livres do dia. Se um
        dia ficar cheio, as horas da semana continuam as mesmas e se redistribuem nos outros dias.
        Plantão que passa da meia-noite (ex.: entra 19:00, sai 07:00): pode colocar a hora final menor
        que a inicial, conta como virada de dia. Se o plantão continuar depois das 00:00, cadastre
        outro compromisso igual para a data (ou dia da semana) seguinte, das 00:00 até a hora de saída
        — assim o cronograma também não marca estudo na manhã seguinte.
      </p>
    </div>
  );
}

/** Ícone e badge por tipo de atividade — usados no resumo "Hoje" e nas tabelas de dia, para o
 * aluno reconhecer de imediato o tipo de bloco (teoria, questões, pausa, refeição, TAF…). */
const ACTIVITY_ICON: Record<PcAcActivityType, React.ComponentType<{ "aria-hidden"?: boolean; className?: string }>> = {
  teoria: BookOpen,
  video: Video,
  questoes: ListChecks,
  redacao: PenLine,
  revisao: RotateCcw,
  simulado: Trophy,
  descanso: Moon,
  pausa: Coffee,
  rotina: Coffee,
  exercicio: Dumbbell,
  compromisso: CalendarCheck2,
};
const ACTIVITY_BADGE_VARIANT: Record<PcAcActivityType, "info" | "success" | "warning" | "neutral" | "purple" | "teal"> = {
  teoria: "info",
  video: "info",
  questoes: "success",
  redacao: "purple",
  revisao: "teal",
  simulado: "warning",
  descanso: "neutral",
  pausa: "neutral",
  rotina: "neutral",
  exercicio: "warning",
  compromisso: "purple",
};

/** `Table` do Astryx exige `T extends Record<string, unknown>`; nossas interfaces de domínio
 * (`PcAcWeeklyGridRow`, `PcAcPlanActivity`) não declaram índice de string, então tipamos os dois
 * usos aqui uma única vez em vez de espalhar `as unknown as` pelo JSX. */
type AstryxTableColumn<T> = {
  key: string;
  header?: React.ReactNode;
  align?: "start" | "center" | "end";
  width?: ReturnType<typeof proportional>;
  renderCell: (row: T) => React.ReactNode;
};
type AstryxTableComponent<T> = React.FC<{
  data: T[];
  density?: "compact" | "balanced" | "spacious";
  dividers?: "rows" | "columns" | "grid" | "none";
  isStriped?: boolean;
  columns: AstryxTableColumn<T>[];
}>;
const GridTable = Table as unknown as AstryxTableComponent<PcAcWeeklyGridRow>;

const NON_STUDY: ReadonlySet<PcAcActivityType> = new Set(["rotina", "pausa", "exercicio", "descanso", "compromisso"]);
const fmtDateBr = (iso: string) => iso.split("-").reverse().join("/");
const fmtDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h${m ? String(m).padStart(2, "0") : ""}` : `${m}min`;
};
const clockToMinutes = (value?: string) => {
  if (!value) return 0;
  const [h, m] = value.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};
const activityMinutes = (activity: PcAcPlanDay["activities"][number]) =>
  activity.minutes ?? Math.max(0, clockToMinutes(activity.end) - clockToMinutes(activity.start));

/** Resumo de um dia do plano, usado no cartão do dia e no cabeçalho da janela do dia. */
function summarizeDay(day: PcAcPlanDay) {
  const study = day.activities.filter((activity) => !NON_STUDY.has(activity.type));
  return {
    studyMinutes: study.reduce((sum, activity) => sum + activityMinutes(activity), 0),
    subjects: [...new Set(study.map((activity) => activity.subject ?? PCAC_ACTIVITY_LABEL[activity.type]))],
    hasTaf: day.activities.some((activity) => activity.type === "exercicio"),
    start: study[0]?.start,
    end: study.at(-1)?.end,
  };
}

/** Cronograma de estudos único da área do aluno: une a grade semanal por disciplina (peso,
 * horário e dias da semana — mesmo formato do cronograma em papel que serviu de modelo) com a
 * programação semana a semana já existente (teoria, questões, redação, revisão e simulados, até
 * 3 dias antes da prova). Antes eram 3 cartões separados (cronograma, plano de estudos e
 * cronograma horário) — unificados aqui. O plano detalhado agora é gerado para todos os cargos,
 * usando apenas os tópicos oficiais correspondentes a cada especialidade. Configuração salva
 * por usuário e cargo, com sincronização de conta e cache local. */
export function PcAcCronogramaCard({
  cargo,
  userId,
}: {
  cargo: (typeof pcAcVerticalCargos)[number];
  userId: string;
}) {
  const [cfg, setCfg] = React.useState<PcAcStudyPlanConfig>(DEFAULT_PCAC_STUDY_CONFIG);
  const [loadedConfigKey, setLoadedConfigKey] = React.useState("");
  const [mode, setMode] = React.useState(getActiveTheme);
  const [tab, setTab] = React.useState("semanas");
  const [exportError, setExportError] = React.useState("");
  React.useEffect(() => {
    const observer = new MutationObserver(() => setMode(getActiveTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  const [exporting, setExporting] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState<"idle" | "saving" | "saved" | "error">("idle");
  const showDetailedPlan = true;
  const configKey = `${userId}:${cargo.id}`;
  const configLoaded = loadedConfigKey === configKey;

  // Prioriza a configuração remota da conta; o localStorage é cache/fallback para indisponibilidade.
  // Assim o aluno recupera a mesma programação ao entrar noutro dispositivo.
  React.useEffect(() => {
    let active = true;
    const loadConfig = async () => {
      const localConfig = readPcAcStudyConfig(window.localStorage, userId, cargo.id);
      let nextConfig = localConfig;

      if (userId !== "guest") {
        const { data, error } = await supabase
          .from("user_study_plan_configs")
          .select("config")
          .eq("user_id", userId)
          .eq("cargo_id", cargo.id)
          .maybeSingle();

        if (!error && data?.config) {
          const serialized = JSON.stringify(data.config);
          nextConfig = readPcAcStudyConfig(
            { getItem: () => serialized, setItem: () => undefined },
            userId,
            cargo.id,
          );
        } else if (error) {
          console.warn("Não foi possível carregar a configuração remota do cronograma; usando o cache local.", error);
        }
      }

      if (!nextConfig.startDate) {
        const today = platformDate();
        nextConfig = {
          ...nextConfig,
          startDate: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
        };
      }

      if (!active) return;
      writePcAcStudyConfig(window.localStorage, userId, cargo.id, nextConfig);
      setCfg(nextConfig);
      setLoadedConfigKey(configKey);
    };

    if (typeof window !== "undefined") void loadConfig();
    return () => { active = false; };
  }, [configKey, userId, cargo.id]);

  const update = (patch: Partial<PcAcStudyPlanConfig>) => {
    setCfg((prev) => {
      const next = { ...prev, ...patch };
      if (typeof window !== "undefined") writePcAcStudyConfig(window.localStorage, userId, cargo.id, next);
      return next;
    });
  };

  const saveConfiguration = async () => {
    if (!configLoaded || saveStatus === "saving") return;
    setSaveStatus("saving");
    writePcAcStudyConfig(window.localStorage, userId, cargo.id, cfg);
    if (userId === "guest") {
      setSaveStatus("saved");
      window.setTimeout(() => setSaveStatus("idle"), 2800);
      return;
    }
    const { error } = await supabase
      .from("user_study_plan_configs")
      .upsert(
        { user_id: userId, cargo_id: cargo.id, config: cfg, updated_at: new Date().toISOString() },
        { onConflict: "user_id,cargo_id" },
      );
    if (error) {
      console.warn("Não foi possível guardar o cronograma; a cópia local foi mantida.", error);
      setSaveStatus("error");
      return;
    }
    setSaveStatus("saved");
    window.setTimeout(() => setSaveStatus("idle"), 2800);
  };

  // Salva com debounce no Supabase, isolado por user_id + cargo_id e protegido por RLS.
  React.useEffect(() => {
    if (!configLoaded || userId === "guest") return;
    const timer = window.setTimeout(() => {
      void supabase
        .from("user_study_plan_configs")
        .upsert(
          { user_id: userId, cargo_id: cargo.id, config: cfg, updated_at: new Date().toISOString() },
          { onConflict: "user_id,cargo_id" },
        )
        .then(({ error }) => {
          if (error) console.warn("Não foi possível sincronizar o cronograma; a cópia local foi mantida.", error);
        });
    }, 350);
    return () => window.clearTimeout(timer);
  }, [configLoaded, cfg, userId, cargo.id]);

  const todayKey = React.useMemo(() => {
    const today = platformDate();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  }, []);
  const effectiveStartDate = cfg.startDate || todayKey;
  const lastStudyDate = pcAcLastStudyDate(PCAC_EXAM_DATE);
  const daysLeft = pcAcDaysBetween(todayKey, PCAC_EXAM_DATE);
  const effectiveCfg = React.useMemo(() => ({ ...cfg, startDate: effectiveStartDate }), [cfg, effectiveStartDate]);
  const startError = effectiveStartDate > lastStudyDate
    ? `A data inicial deve ser até ${lastStudyDate.split("-").reverse().join("/")}, três dias antes da prova.`
    : "";

  const weeks = React.useMemo(
    () => (showDetailedPlan && configLoaded && !startError
      ? buildPcAcMasterPlan(cfg.days, PCAC_EXAM_DATE, { ...effectiveCfg }, cargo)
      : []),
    [showDetailedPlan, configLoaded, startError, cfg, effectiveStartDate, cargo],
  );

  // A grade semanal do Investigador é extraída de uma semana de referência do próprio plano,
  // nunca de um segundo algoritmo. Prefere uma semana completa; em períodos curtos, usa a mais longa.
  const referenceWeek = React.useMemo(() => {
    if (!weeks.length) return null;
    return weeks.reduce((best, current) => current.days.length > best.days.length ? current : best, weeks[0]!);
  }, [showDetailedPlan, weeks]);

  const grid: PcAcWeeklyGridRow[] = React.useMemo(() => {
    if (!configLoaded || !referenceWeek) return [];

    const byName = new Map<string, { minutes: number; days: Set<number>; ranges: Set<string> }>();
    const toMinutes = (value?: string) => {
      if (!value) return 0;
      const [hours, minutes] = value.split(":").map(Number);
      return (hours ?? 0) * 60 + (minutes ?? 0);
    };

    for (const day of referenceWeek.days) {
      for (const activity of day.activities) {
        if (activity.type === "rotina" || activity.type === "pausa" || activity.type === "exercicio" || activity.type === "descanso") continue;
        const name = activity.subject ??
          (activity.type === "redacao" ? "Redação" :
            activity.type === "simulado" ? "Simulado" :
              activity.type === "revisao" ? "Revisão geral" : undefined);
        if (!name) continue;
        const item = byName.get(name) ?? { minutes: 0, days: new Set<number>(), ranges: new Set<string>() };
        const duration = activity.minutes ?? Math.max(0, toMinutes(activity.end) - toMinutes(activity.start));
        item.minutes += duration;
        item.days.add(day.weekday);
        item.ranges.add(`${activity.start ?? cfg.startTime}–${activity.end ?? cfg.startTime}`);
        byName.set(name, item);
      }
    }

    const idByName = new Map<string, string>();
    for (const block of cargo.blocks) {
      for (const discipline of block.disciplines) idByName.set(discipline.name, discipline.id);
    }

    return [...byName.entries()]
      .map(([name, item]) => {
        const id = idByName.get(name) ?? name;
        return {
          id,
          name,
          peso: (INVESTIGATOR_DISCIPLINE_PESO[id] ?? 1) as 1 | 2,
          totalMinutes: item.minutes,
          days: [...item.days].sort((a, b) => a - b),
          horario: item.ranges.size === 1 ? [...item.ranges][0]! : "variável",
        };
      })
      .sort((a, b) => b.peso - a.peso || b.totalMinutes - a.totalMinutes);
  }, [cargo, cfg, configLoaded, showDetailedPlan, referenceWeek]);

  // Visão imediata "Hoje": destaca, sem precisar trocar de aba, a mesma programação detalhada
  // (horário, disciplina, tópico, pausas, refeições, TAF) do dia corrente dentro do plano gerado.
  const todayPlanDay = React.useMemo(() => {
    for (const week of weeks) {
      const found = week.days.find((day) => day.date === todayKey);
      if (found) return found;
    }
    return null;
  }, [weeks, todayKey]);

  const finalDays = React.useMemo(() => buildPcAcFinalDays(PCAC_EXAM_DATE, effectiveStartDate), [effectiveStartDate]);
  const totalActivities = weeks.reduce((s, w) => s + w.days.reduce((a, d) => a + d.activities.length, 0), 0);

  const exportPdf = async () => {
    setExportError("");
    setExporting(true);
    try {
      const { generatePcAcCronogramaPdf } = await import("@/lib/pcAcreCronogramaPdf");
      await generatePcAcCronogramaPdf({ cargo, cfg: effectiveCfg, grid, weeks, finalDays });
    } catch {
      setExportError("Não foi possível gerar o PDF. Tente novamente.");
    } finally {
      setExporting(false);
    }
  };

  // Semana em foco: começa na semana que contém hoje (ou na primeira) e se mantém ao navegar.
  const [weekIndex, setWeekIndex] = React.useState(0);
  const [openDate, setOpenDate] = React.useState<string | null>(null);
  const planKey = `${configKey}:${weeks.length}:${weeks[0]?.startDate ?? ""}`;
  React.useEffect(() => {
    const current = weeks.findIndex((week) => week.startDate <= todayKey && todayKey <= week.endDate);
    setWeekIndex(Math.max(0, current));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só reposiciona quando o plano muda de forma
  }, [planKey]);
  const activeWeek = weeks[Math.min(weekIndex, weeks.length - 1)];
  const allDays = React.useMemo(() => weeks.flatMap((week) => week.days.map((day) => ({ day, week }))), [weeks]);
  const openIndex = openDate ? allDays.findIndex((entry) => entry.day.date === openDate) : -1;
  const openEntry = openIndex >= 0 ? allDays[openIndex] : undefined;
  const goToDay = (index: number) => {
    const entry = allDays[index];
    if (!entry) return;
    setOpenDate(entry.day.date);
    setWeekIndex(entry.week.weekNumber - 1);
  };

  return (
    <Theme theme={themes[defaultThemeSlug]} mode={mode}>
    <section id={CRONOGRAMA_ANCHOR} className="pcac-schedule" aria-label="Cronograma de estudos">
      <header className="pcac-schedule__header">
        <h2><CalendarClock aria-hidden="true" /> Seu cronograma</h2>
        <p>{daysLeft} dias até a prova · {cfg.weeklyHours}h por semana · {cfg.days.length} dias de estudo</p>
        <nav aria-label="Ações do cronograma">
          <AstryxButton
            label={saveStatus === "saving" ? "Guardando…" : "Guardar configurações"}
            size="sm"
            variant="primary"
            icon={saveStatus === "saved" ? <CheckCircle2 /> : <CalendarCheck2 />}
            clickAction={saveConfiguration}
            isDisabled={!configLoaded || saveStatus === "saving"}
          />
          <AstryxButton label={exporting ? "Gerando PDF…" : "Exportar cronograma em PDF"} size="sm" variant="primary" icon={<Download />} clickAction={exportPdf} isDisabled={!configLoaded || !weeks.length || !!startError || exporting} />
        </nav>
      </header>
      {exportError && <p role="alert">{exportError}</p>}
      {saveStatus === "saved" && <p className="pcac-schedule__save-feedback" role="status"><CheckCircle2 aria-hidden="true" /> Configurações guardadas com sucesso.</p>}
      {saveStatus === "error" && <p className="pcac-schedule__save-feedback pcac-schedule__save-feedback--error" role="alert">Não foi possível guardar na conta. A cópia local foi mantida.</p>}
      <section className="pcac-schedule__body">
        {todayPlanDay && (
          <Card variant="teal" className="pcac-schedule__today">
            <div className="flex flex-wrap items-center justify-between gap-2 px-1 pt-1">
              <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                <CalendarCheck2 aria-hidden="true" className="h-4 w-4" />
                Hoje · {WEEKDAY_FULL[todayPlanDay.weekday]} ({todayPlanDay.date.split("-").reverse().join("/")})
              </p>
              <AstryxBadge variant="info" label={`${todayPlanDay.activities.length} ${todayPlanDay.activities.length === 1 ? "bloco" : "blocos"} planejados`} />
            </div>
            <List density="compact" hasDividers>
              {todayPlanDay.activities.map((activity, index) => {
                const Icon = ACTIVITY_ICON[activity.type];
                return (
                  <Item
                    key={index}
                    startContent={<Icon aria-hidden />}
                    label={
                      <span className="flex items-center gap-2">
                        {activity.start ? `${activity.start}–${activity.end}` : ""} {PCAC_ACTIVITY_LABEL[activity.type]}
                        {activity.subject ? ` · ${activity.subject}` : ""}
                      </span>
                    }
                    description={activity.topic ? `${activity.topic} — ${activity.detail}` : activity.detail}
                    endContent={<AstryxBadge variant={ACTIVITY_BADGE_VARIANT[activity.type]} label={activity.type === "rotina" ? "Rotina" : activity.type === "pausa" ? "Pausa" : PCAC_ACTIVITY_LABEL[activity.type]} />}
                  />
                );
              })}
            </List>
          </Card>
        )}
        <TabList value={tab === "semanas" && !showDetailedPlan ? "grade" : tab} onChange={setTab} role="tablist" layout="fill" hasDivider aria-label="Seções do cronograma">
          <Tab id="schedule-tab-visao" value="visao" label="Personalizar" icon={<SlidersHorizontal />} panelId="schedule-panel-visao" />
          <Tab id="schedule-tab-grade" value="grade" label="Minha semana" icon={<CalendarDays />} panelId="schedule-panel-grade" />
          {showDetailedPlan && <Tab id="schedule-tab-semanas" value="semanas" label="Plano completo" icon={<ListChecks />} panelId="schedule-panel-semanas" />}
          <Tab id="schedule-tab-final" value="final" label="Revisão final" icon={<Flag />} panelId="schedule-panel-final" />
        </TabList>
          <section role="tabpanel" tabIndex={0} id="schedule-panel-visao" aria-labelledby="schedule-tab-visao" hidden={(tab === "semanas" && !showDetailedPlan ? "grade" : tab) !== "visao"} className="pcac-schedule__panel space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="schedule-hours">Horas de estudo por semana</Label>
            <Input
              id="schedule-hours"
              type="number"
              min={1}
              max={80}
              value={cfg.weeklyHours}
              disabled={!configLoaded}
              onChange={(e) => update({ weeklyHours: Math.min(80, Math.max(1, Number(e.target.value) || 1)) })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="schedule-date">Data de início</Label>
            <Input
              id="schedule-date"
              type="date"
              value={effectiveStartDate}
              min={todayKey}
              max={lastStudyDate}
              disabled={!configLoaded}
              onChange={(e) => e.target.value && update({ startDate: e.target.value })}
            />
            {startError && <p role="alert" className="text-xs text-destructive">{startError}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="schedule-time">Começo do estudo</Label>
            <Input
              id="schedule-time"
              type="time"
              value={cfg.startTime}
              disabled={!configLoaded}
              onChange={(e) => e.target.value && update({ startTime: e.target.value })}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <p id="schedule-days-label">Dias de estudo</p>
            <div role="group" aria-labelledby="schedule-days-label" className="flex flex-wrap gap-1.5">
              {DAY_ORDER.map((d) => {
                const on = cfg.days.includes(d);
                return (
                  <AstryxButton
                    key={d}
                    label={DAY_SHORT[d]!}
                    size="sm"
                    variant={on ? "primary" : "secondary"}
                    aria-pressed={on}
                    isDisabled={!configLoaded || (on && cfg.days.length === 1)}
                    onClick={() => {
                      const days = on ? cfg.days.filter((x) => x !== d) : [...cfg.days, d];
                      if (days.length) update({ days });
                    }}
                    icon={on ? <CheckCircle2 /> : undefined}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <details className="pcac-schedule__preferences rounded-xl border p-3">
          <summary className="cursor-pointer text-sm font-bold">Rotina diária, pausas e preparação física</summary>
          <p className="mt-1 text-xs text-muted-foreground">Os horários de refeições e treino são compromissos sugeridos. O sistema evita sobrepor essas atividades aos blocos de estudo.</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1"><Label htmlFor="schedule-breakfast">Café da manhã</Label><Input id="schedule-breakfast" type="time" value={cfg.breakfastTime} disabled={!configLoaded} onChange={(e) => update({ breakfastTime: e.target.value })} /></div>
            <div className="space-y-1"><Label htmlFor="schedule-morning-snack">Lanche da manhã</Label><Input id="schedule-morning-snack" type="time" value={cfg.morningSnackTime} disabled={!configLoaded} onChange={(e) => update({ morningSnackTime: e.target.value })} /></div>
            <div className="space-y-1"><Label htmlFor="schedule-lunch">Almoço</Label><Input id="schedule-lunch" type="time" value={cfg.lunchTime} disabled={!configLoaded} onChange={(e) => update({ lunchTime: e.target.value })} /></div>
            <div className="space-y-1"><Label htmlFor="schedule-afternoon-snack">Lanche da tarde</Label><Input id="schedule-afternoon-snack" type="time" value={cfg.afternoonSnackTime} disabled={!configLoaded} onChange={(e) => update({ afternoonSnackTime: e.target.value })} /></div>
            <div className="space-y-1"><Label htmlFor="schedule-dinner">Jantar</Label><Input id="schedule-dinner" type="time" value={cfg.dinnerTime} disabled={!configLoaded} onChange={(e) => update({ dinnerTime: e.target.value })} /></div>
            <div className="space-y-1"><Label htmlFor="schedule-break-every">Pausa a cada (minutos)</Label><Input id="schedule-break-every" type="number" min={30} max={60} step={10} value={cfg.breakEveryMinutes} disabled={!configLoaded} onChange={(e) => update({ breakEveryMinutes: Math.min(60, Math.max(30, Number(e.target.value) || 50)) })} /></div>
            <div className="space-y-1"><Label htmlFor="schedule-break-duration">Duração da pausa (minutos)</Label><Input id="schedule-break-duration" type="number" min={5} max={15} step={5} value={cfg.breakDurationMinutes} disabled={!configLoaded} onChange={(e) => update({ breakDurationMinutes: Math.min(15, Math.max(5, Number(e.target.value) || 10)) })} /></div>
          </div>
          <div className="mt-4 rounded-lg border p-3">
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={cfg.includeTaf} disabled={!configLoaded} onChange={(e) => update({ includeTaf: e.target.checked })} />
              Incluir preparação física para TAF
            </label>
            {cfg.includeTaf && <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="space-y-1"><Label htmlFor="schedule-taf-time">Horário do treino</Label><Input id="schedule-taf-time" type="time" value={cfg.tafTime} disabled={!configLoaded} onChange={(e) => update({ tafTime: e.target.value })} /></div>
              <div className="space-y-1"><Label htmlFor="schedule-taf-duration">Duração (minutos)</Label><Input id="schedule-taf-duration" type="number" min={30} max={90} step={15} value={cfg.tafDurationMinutes} disabled={!configLoaded} onChange={(e) => update({ tafDurationMinutes: Math.min(90, Math.max(30, Number(e.target.value) || 60)) })} /></div>
              <div className="sm:col-span-2"><p className="mb-2 text-xs font-semibold">Dias de treino</p><div className="flex flex-wrap gap-2">{DAY_ORDER.map((day) => <label key={day} className="inline-flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs"><input type="checkbox" checked={cfg.tafDays.includes(day)} onChange={(e) => update({ tafDays: e.target.checked ? [...cfg.tafDays, day] : cfg.tafDays.filter((value) => value !== day) })} />{DAY_SHORT[day]}</label>)}</div></div>
            </div>}
          </div>
        </details>

        <details className="pcac-schedule__details" open={cfg.commitments.length > 0}>
          <summary>Meus compromissos do dia</summary>
          <div className="pt-3">
            <p className="mb-3 text-xs text-muted-foreground">
              Informe trabalho, intervalo, banho, descanso, deslocamento, academia, consulta médica,
              escola dos filhos, reunião ou uma emergência. Pode ser um horário fixo da semana ou de
              uma data só. A academia aqui é o seu treino livre: se você também marcou o treino de
              TAF acima, os dois convivem no mesmo dia, cada um no seu horário.
            </p>
            <CommitmentsEditor
              commitments={cfg.commitments}
              disabled={!configLoaded}
              saved={saveStatus === "saved"}
              onChange={(commitments) => { setSaveStatus("idle"); update({ commitments }); }}
            />
          </div>
        </details>

        <details className="pcac-schedule__details">
          <summary>Como este cronograma é calculado</summary>
          <div className="pcac-logic pt-3">
            <p>
              O tempo de cada matéria segue o que ela vale na prova objetiva, pelo quadro do edital —
              não o tamanho do conteúdo programático. Para o seu cargo:
            </p>
            <ul className="pcac-logic__blocks">
              {pcAcBlockPoints(cargo).map((block) => (
                <li key={block.title}>
                  <strong>{block.title}</strong>
                  <span>{block.questions} questões · {block.points} pontos · {Math.round(block.share * 100)}% da nota</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">E a rotina de cada dia segue quatro regras:</p>
            <ol className="pcac-logic__rules">
              <li><strong>Revisão espaçada:</strong> todo assunto estudado volta ao plano depois de 1 dia, 1 semana e 1 mês, que é quando a memória começa a falhar.</li>
              <li><strong>Recuperação ativa:</strong> cada dia fecha com um bloco em que você tenta lembrar do conteúdo sem olhar o material — lembrar fixa mais do que reler.</li>
              <li><strong>Questões desde o começo:</strong> a resolução de questões entra junto com a teoria e cresce nas fases seguintes, até o simulado cronometrado do fim de semana.</li>
              <li><strong>Pausas em ciclos:</strong> uma pausa curta a cada bloco de estudo e uma pausa longa a cada quatro ciclos, no ritmo da técnica Pomodoro.</li>
            </ol>
            <p className="pcac-logic__note">
              As semanas são divididas em três fases: base (35%), prática em questões (35%) e revisão
              com simulados (30%). O conteúdo novo encerra três dias antes da prova.
            </p>
          </div>
        </details>


          </section>
          <section role="tabpanel" tabIndex={0} id="schedule-panel-grade" aria-labelledby="schedule-tab-grade" hidden={(tab === "semanas" && !showDetailedPlan ? "grade" : tab) !== "grade"} className="pcac-schedule__panel space-y-5">

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Grade semanal por disciplina
          </p>
          {referenceWeek && (
            <p className="mb-2 text-[11px] text-muted-foreground">
              Derivada da semana {referenceWeek.weekNumber} ({referenceWeek.startDate.split("-").reverse().join("/")} a {referenceWeek.endDate.split("-").reverse().join("/")}) do mesmo plano detalhado.
            </p>
          )}
          {grid.length ? (
            <GridTable
              data={grid}
              density="compact"
              dividers="grid"
              isStriped
              columns={[
                {
                  key: "name",
                  header: "Disciplina",
                  width: proportional(2, { minWidth: 160 }),
                  renderCell: (row) => (
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{row.name}</span>
                      {findPcAcStudyResource(row.name) && (
                        <a href={pcAcStudyResourceUrl(findPcAcStudyResource(row.name)!.courseId)} className="whitespace-nowrap text-[11px] font-semibold text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-300">
                          Estudar teoria
                        </a>
                      )}
                    </span>
                  ),
                },
                { key: "peso", header: "Peso", align: "center", width: proportional(1, { minWidth: 56 }), renderCell: (row) => <strong className="text-primary">{row.peso}</strong> },
                { key: "horario", header: "Horário", align: "center", width: proportional(1, { minWidth: 92 }), renderCell: (row) => <span className="text-muted-foreground">{row.horario}</span> },
                ...GRID_DAY_ORDER.map((weekday) => ({
                  key: `day-${weekday}`,
                  header: GRID_DAY_LETTER[weekday]!,
                  align: "center" as const,
                  width: proportional(1, { minWidth: 32 }),
                  renderCell: (row: PcAcWeeklyGridRow) => (row.days.includes(weekday) ? <strong className="text-primary">×</strong> : null),
                })),
              ]}
            />
          ) : (
            <p className="rounded-lg border px-2.5 py-3 text-center text-xs text-muted-foreground">
              {startError || "Aguarde o carregamento das suas preferências ou escolha os dias de estudo."}
            </p>
          )}
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            A distribuição considera os tópicos do cargo e prioriza conhecimentos específicos. O peso IDECAN é exibido quando há classificação específica disponível.
          </p>
        </div>

          </section>

        {showDetailedPlan && <section role="tabpanel" tabIndex={0} id="schedule-panel-semanas" aria-labelledby="schedule-tab-semanas" hidden={(tab === "semanas" && !showDetailedPlan ? "grade" : tab) !== "semanas"} className="pcac-schedule__panel space-y-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Programação semana a semana
            </p>
            {!weeks.length ? (
              <p className="text-sm text-muted-foreground">
                Faltam poucos dias para a prova — use o período para revisão leve (ver "Últimos dias"
                abaixo) em vez de um plano de semanas completas.
              </p>
            ) : (
              <>
                <p className="mb-2 text-xs text-muted-foreground">
                  {weeks.length} semana{weeks.length === 1 ? "" : "s"} de estudo · {totalActivities}{" "}
                  atividades planejadas · encerra conteúdo novo 3 dias antes da prova.
                </p>
                {activeWeek && (
                  <div className={`pcac-week pcac-week--${((activeWeek.weekNumber - 1) % 5) + 1}`}>
                    <div className="pcac-week__nav">
                      <AstryxButton label="Semana anterior" size="sm" variant="secondary" icon={<ChevronLeft />} isDisabled={weekIndex <= 0} onClick={() => setWeekIndex((value) => Math.max(0, value - 1))} />
                      <div className="pcac-week__title" aria-live="polite">
                        <strong>Semana {activeWeek.weekNumber} de {weeks.length}</strong>
                        <span>{fmtDateBr(activeWeek.startDate)} a {fmtDateBr(activeWeek.endDate)} · {PCAC_PHASE_LABEL[activeWeek.phase]}</span>
                      </div>
                      <AstryxButton label="Próxima semana" size="sm" variant="secondary" icon={<ChevronRight />} isDisabled={weekIndex >= weeks.length - 1} onClick={() => setWeekIndex((value) => Math.min(weeks.length - 1, value + 1))} />
                    </div>
                    <ol className="pcac-week__strip" aria-label="Todas as semanas do plano">
                      {weeks.map((week, index) => (
                        <li key={week.weekNumber}>
                          <button
                            type="button"
                            className={`pcac-week__pip pcac-week--${(index % 5) + 1}`}
                            aria-current={index === weekIndex ? "true" : undefined}
                            aria-label={`Semana ${week.weekNumber}, ${fmtDateBr(week.startDate)} a ${fmtDateBr(week.endDate)}`}
                            title={`${fmtDateBr(week.startDate)} a ${fmtDateBr(week.endDate)} · ${PCAC_PHASE_LABEL[week.phase]}`}
                            onClick={() => setWeekIndex(index)}
                          >
                            {week.weekNumber}
                          </button>
                        </li>
                      ))}
                    </ol>
                    <ul className="pcac-week__days">
                      {activeWeek.days.map((day) => {
                        const summary = summarizeDay(day);
                        const isRest = summary.studyMinutes === 0;
                        return (
                          <li key={day.date}>
                            <button
                              type="button"
                              className="pcac-day-card"
                              data-today={day.date === todayKey ? "true" : undefined}
                              data-rest={isRest ? "true" : undefined}
                              aria-haspopup="dialog"
                              onClick={() => setOpenDate(day.date)}
                            >
                              <span className="pcac-day-card__date">
                                <strong>{DAY_SHORT[day.weekday]}</strong>
                                <span>{day.date.split("-").reverse().slice(0, 2).join("/")}</span>
                                {day.date === todayKey && <em>Hoje</em>}
                              </span>
                              <span className="pcac-day-card__body">
                                {isRest ? (
                                  <span className="pcac-day-card__load">{summary.hasTaf ? "Treino físico / TAF" : "Descanso"}</span>
                                ) : (
                                  <>
                                    <span className="pcac-day-card__load">
                                      <Clock aria-hidden="true" /> {fmtDuration(summary.studyMinutes)} de estudo
                                      {summary.start && ` · ${summary.start}–${summary.end}`}
                                    </span>
                                    <span className="pcac-day-card__subjects">
                                      {summary.subjects.slice(0, 3).join(" · ")}
                                      {summary.subjects.length > 3 && ` · +${summary.subjects.length - 3}`}
                                    </span>
                                    {summary.hasTaf && <span className="pcac-day-card__taf"><Dumbbell aria-hidden="true" /> TAF</span>}
                                  </>
                                )}
                              </span>
                              <ChevronRight aria-hidden="true" className="pcac-day-card__go" />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="pcac-week__hint">Toque em um dia para abrir a cronologia completa, com horários, conteúdos e ações.</p>
                  </div>
                )}
              </>
            )}
          </div>
          </section>}

          <section role="tabpanel" tabIndex={0} id="schedule-panel-final" aria-labelledby="schedule-tab-final" hidden={(tab === "semanas" && !showDetailedPlan ? "grade" : tab) !== "final"} className="pcac-schedule__panel space-y-4">
        <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
            Últimos dias antes da prova
          </p>
          <ul className="mt-2 space-y-1.5">
            {finalDays.map((day) => (
              <li key={day.date} className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground/90">
                  {WEEKDAY_FULL[day.weekday]} ({day.date.split("-").reverse().join("/")}):
                </span>{" "}
                {day.activities[0]?.detail}
              </li>
            ))}
          </ul>
        </div>
          </section>
      </section>
      <Dialog isOpen={!!openEntry} onOpenChange={(open) => { if (!open) setOpenDate(null); }} width={720} maxHeight="86dvh" padding={0}>
        {openEntry && (() => {
          const { day, week } = openEntry;
          const summary = summarizeDay(day);
          return (
            <Layout
              header={
                <DialogHeader
                  title={`${WEEKDAY_FULL[day.weekday]} · ${fmtDateBr(day.date)}`}
                  subtitle={`Semana ${week.weekNumber} · ${PCAC_PHASE_LABEL[week.phase]}${summary.studyMinutes ? ` · ${fmtDuration(summary.studyMinutes)} de estudo` : ""}`}
                  onOpenChange={() => setOpenDate(null)}
                  hasDivider
                />
              }
              content={
                <LayoutContent>
                  <ol className={`pcac-day-timeline pcac-week--${((week.weekNumber - 1) % 5) + 1}`}>
                    {day.activities.map((activity, index) => {
                      const Icon = ACTIVITY_ICON[activity.type];
                      const resource = findPcAcStudyResource(activity.subject);
                      const isStudy = !NON_STUDY.has(activity.type);
                      return (
                        <li key={index} className="pcac-day-timeline__item" data-kind={isStudy ? "study" : activity.type}>
                          <span className="pcac-day-timeline__time">
                            {activity.start ? <><strong>{activity.start}</strong><span>{activity.end}</span></> : <strong>Dia todo</strong>}
                          </span>
                          <span className="pcac-day-timeline__dot"><Icon aria-hidden /></span>
                          <div className="pcac-day-timeline__content">
                            <p className="pcac-day-timeline__head">
                              <AstryxBadge variant={ACTIVITY_BADGE_VARIANT[activity.type]} label={PCAC_ACTIVITY_LABEL[activity.type]} />
                              {activity.subject && <strong>{activity.subject}</strong>}
                              {activity.start && <span>{fmtDuration(activityMinutes(activity))}</span>}
                            </p>
                            {activity.topic && <p className="pcac-day-timeline__topic">{activity.topic}</p>}
                            <p className="pcac-day-timeline__detail">{activity.detail}</p>
                            {isStudy && (resource || materialShortcut(activity)) && (
                              <p className="pcac-day-timeline__actions">
                                <MaterialShortcut activity={activity} />
                                {resource && <a href={pcAcStudyResourceUrl(resource.courseId)}>Abrir aulas</a>}
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </LayoutContent>
              }
              footer={
                <LayoutFooter hasDivider>
                  <div className="pcac-day-dialog__footer">
                    <AstryxButton label="Dia anterior" size="sm" variant="secondary" icon={<ChevronLeft />} isDisabled={openIndex <= 0} onClick={() => goToDay(openIndex - 1)} />
                    <AstryxButton label="Próximo dia" size="sm" variant="secondary" icon={<ChevronRight />} isDisabled={openIndex >= allDays.length - 1} onClick={() => goToDay(openIndex + 1)} />
                  </div>
                </LayoutFooter>
              }
            />
          );
        })()}
      </Dialog>
    </section>
    </Theme>
  );
}

