import * as React from "react";
import { CalendarClock, Download, CheckCircle2, SlidersHorizontal, CalendarDays, ListChecks, Flag } from "lucide-react";
import { Button as AstryxButton } from "@astryxdesign/core/Button";
import { TabList, Tab } from "@astryxdesign/core/TabList";
import { Theme } from "@astryxdesign/core/theme";
import { themes, defaultThemeSlug } from "../../astryx-themes";
import { getActiveTheme } from "@/lib/theme";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";
import { DEFAULT_PCAC_STUDY_CONFIG, PCAC_EXAM_DATE, buildPcAcStudyWeek, buildPcAcWeeklyGrid, readPcAcStudyConfig, writePcAcStudyConfig, type PcAcStudyPlanConfig, type PcAcWeeklyGridRow } from "@/lib/pcAcreStudyPlan";
import { INVESTIGATOR_DISCIPLINE_PESO } from "@/data/pcAcreIdecanRadar";
import { PCAC_ACTIVITY_LABEL, PCAC_PHASE_LABEL, buildPcAcFinalDays, buildPcAcMasterPlan, pcAcDaysBetween, pcAcLastStudyDate, type PcAcPlanWeek } from "@/lib/pcAcreMasterPlan";
import { generateStudyPlanPdf } from "@/lib/studyPlanPdf";
import { platformDate } from "@/lib/platformClock";
import "@/styles/pcac-schedule.css";
const CRONOGRAMA_ANCHOR = "pcac-cronograma";
const DAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const WEEKDAY_FULL = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const GRID_DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const GRID_DAY_LETTER = ["D", "S", "T", "Q", "Q", "S", "S"]; // índice = weekday (0 domingo)

/** Cronograma de estudos único da área do aluno: une a grade semanal por disciplina (peso,
 * horário e dias da semana — mesmo formato do cronograma em papel que serviu de modelo) com a
 * programação semana a semana já existente (teoria, questões, redação, revisão e simulados, até
 * 3 dias antes da prova). Antes eram 3 cartões separados (cronograma, plano de estudos e
 * cronograma horário) — unificados aqui a pedido do Franc, porque estavam fragmentados demais
 * para ficar "bem organizado". A grade semanal vale para qualquer cargo; a programação
 * semana a semana é específica do Investigador (única com ordem de prioridade IDECAN montada).
 * Configuração salva neste navegador, por cargo. */
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
  const [tab, setTab] = React.useState("grade");
  const [exportError, setExportError] = React.useState("");
  React.useEffect(() => {
    const observer = new MutationObserver(() => setMode(getActiveTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  const [exporting, setExporting] = React.useState(false);
  const showDetailedPlan = cargo.id === "investigador";
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
      ? buildPcAcMasterPlan(cfg.days, PCAC_EXAM_DATE, { startDate: effectiveStartDate, startTime: cfg.startTime, weeklyHours: cfg.weeklyHours })
      : []),
    [showDetailedPlan, configLoaded, startError, cfg.days, cfg.startTime, cfg.weeklyHours, effectiveStartDate],
  );

  // A grade semanal do Investigador é extraída de uma semana de referência do próprio plano,
  // nunca de um segundo algoritmo. Prefere uma semana completa; em períodos curtos, usa a mais longa.
  const referenceWeek = React.useMemo(() => {
    if (!showDetailedPlan || !weeks.length) return null;
    return weeks.reduce((best, current) => current.days.length > best.days.length ? current : best, weeks[0]!);
  }, [showDetailedPlan, weeks]);

  const grid: PcAcWeeklyGridRow[] = React.useMemo(() => {
    if (!configLoaded) return [];
    if (!showDetailedPlan) {
      const simpleWeek = buildPcAcStudyWeek(cargo, cfg);
      return buildPcAcWeeklyGrid(cargo, simpleWeek, {});
    }
    if (!referenceWeek) return [];

    const byName = new Map<string, { minutes: number; days: Set<number>; ranges: Set<string> }>();
    const toMinutes = (value?: string) => {
      if (!value) return 0;
      const [hours, minutes] = value.split(":").map(Number);
      return (hours ?? 0) * 60 + (minutes ?? 0);
    };

    for (const day of referenceWeek.days) {
      for (const activity of day.activities) {
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

  const exportBrandedPdf = async () => {
    setExportError("");
    setExporting(true);
    try { await generateStudyPlanPdf(
      {
        startDate: effectiveStartDate,
        examDate: PCAC_EXAM_DATE,
        studyDays: cfg.days,
        weeklyHours: cfg.weeklyHours,
        startTime: cfg.startTime,
      },
      weeks.map((week) => ({
        week: week.weekNumber,
        startDate: week.startDate,
        endDate: week.endDate,
        events: week.days.flatMap((day) => day.activities.map((activity, index) => ({
          id: `${day.date}-${index}`,
          date: day.date,
          start: activity.start ?? cfg.startTime,
          end: activity.end ?? cfg.startTime,
          kind: activity.type === "teoria" ? "teoria" : activity.type === "questoes" ? "questoes" : activity.type === "revisao" ? "revisao" : activity.type === "redacao" ? "redacao" : activity.type === "simulado" ? "simulado" : "descanso",
          ...(activity.subject ? { discipline: activity.subject } : {}),
          ...(activity.topic ? { topic: activity.topic } : {}),
          phase: week.phase === "fundamentos" ? "base" : week.phase,
          generated: true as const,
        }))),
      })),
      `Plano de estudos · ${cargo.label}`,
    ); } catch { setExportError("Não foi possível gerar o PDF Norte. Tente novamente."); } finally { setExporting(false); }
  };

  const phaseWeeks = (phase: PcAcPlanWeek["phase"]) => weeks.filter((w) => w.phase === phase);

  return (
    <Theme theme={themes[defaultThemeSlug]} mode={mode}>
    <section id={CRONOGRAMA_ANCHOR} className="pcac-schedule" aria-label="Cronograma de estudos">
      <header className="pcac-schedule__header">
        <h2><CalendarClock aria-hidden="true" /> Seu cronograma</h2>
        <p>{daysLeft} dias até a prova · {cfg.weeklyHours}h por semana · {cfg.days.length} dias de estudo</p>
        <nav aria-label="Exportar cronograma">
          <AstryxButton label="Exportar PDF" size="sm" variant="primary" icon={<Download />} clickAction={exportPdf} isDisabled={!configLoaded || !!startError || exporting} />
          <AstryxButton label="PDF Norte + QR" size="sm" icon={<Download />} clickAction={exportBrandedPdf} isDisabled={!configLoaded || !weeks.length || !!startError || exporting} />
        </nav>
      </header>
      {exportError && <p role="alert">{exportError}</p>}
      <section className="pcac-schedule__body">
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
          <div className="pcac-schedule__table">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-2.5 py-2 text-left font-semibold">Disciplina</th>
                  <th className="px-2 py-2 text-center font-semibold">Peso</th>
                  <th className="px-2 py-2 text-center font-semibold">Horário</th>
                  {GRID_DAY_ORDER.map((weekday) => (
                    <th key={weekday} className="px-1.5 py-2 text-center font-semibold" title={WEEKDAY_FULL[weekday]}>
                      {GRID_DAY_LETTER[weekday]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grid.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 1 ? "bg-muted/30" : undefined}>
                    <td className="px-2.5 py-1.5">{row.name}</td>
                    <td className="px-2 py-1.5 text-center font-semibold text-primary">{row.peso}</td>
                    <td className="px-2 py-1.5 text-center text-muted-foreground">{row.horario}</td>
                    {GRID_DAY_ORDER.map((weekday) => (
                      <td key={weekday} className="px-1.5 py-1.5 text-center font-bold text-primary">
                        {row.days.includes(weekday) ? "×" : ""}
                      </td>
                    ))}
                  </tr>
                ))}
                {!grid.length && (
                  <tr>
                    <td colSpan={10} className="px-2.5 py-3 text-center text-muted-foreground">
                      {startError || "Aguarde o carregamento das suas preferências ou escolha os dias de estudo."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            Peso 2 = disciplina de maior incidência na banca IDECAN e maior dificuldade. Peso 1 = demais disciplinas.
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
                <Accordion type="multiple" defaultValue={[`fase-fundamentos`]}>
                  {(["fundamentos", "pratica", "revisao"] as const).map((phase) => {
                    const items = phaseWeeks(phase);
                    if (!items.length) return null;
                    return (
                      <AccordionItem key={phase} value={`fase-${phase}`}>
                        <AccordionTrigger className="text-left">
                          <span className="flex items-center gap-2">
                            {PCAC_PHASE_LABEL[phase]}
                            <Badge variant="outline" className="text-[10px]">
                              {items.length} semana{items.length === 1 ? "" : "s"}
                            </Badge>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3">
                          {items.map((week) => (
                            <div key={week.weekNumber} className={`pcac-week-card pcac-week-card--${((week.weekNumber - 1) % 5) + 1} rounded-lg border bg-background/60 p-3`}>
                              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                Semana {week.weekNumber} · {week.startDate.split("-").reverse().join("/")} a{" "}
                                {week.endDate.split("-").reverse().join("/")}
                              </p>
                              <div className="overflow-x-auto rounded-md border">
                                <table className="w-full border-collapse text-xs">
                                  <thead>
                                    <tr className="bg-muted/60">
                                      <th className="px-2.5 py-1.5 text-left font-semibold">Dia</th>
                                      <th className="px-2.5 py-1.5 text-left font-semibold">Atividade</th>
                                      <th className="px-2.5 py-1.5 text-left font-semibold">Disciplina</th>
                                      <th className="px-2.5 py-1.5 text-left font-semibold">Tópico / instrução</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {week.days.flatMap((day, di) =>
                                      day.activities.map((activity, ai) => (
                                        <tr
                                          key={`${day.date}-${ai}`}
                                          className={di % 2 === 1 ? "bg-muted/20 align-top" : "align-top"}
                                        >
                                          {ai === 0 && (
                                            <td
                                              className="whitespace-nowrap border-t px-2.5 py-1.5 font-semibold text-foreground/90"
                                              rowSpan={day.activities.length}
                                            >
                                              {(WEEKDAY_FULL[day.weekday] ?? "Dia").slice(0, 3)} ·{" "}
                                              {day.date.split("-").reverse().slice(0, 2).join("/")}
                                            </td>
                                          )}
                                          <td className="border-t px-2.5 py-1.5 font-semibold text-primary">
                                            {PCAC_ACTIVITY_LABEL[activity.type]}
                                            {activity.start && <span className="block font-normal text-muted-foreground">{activity.start}–{activity.end}</span>}
                                          </td>
                                          <td className="border-t px-2.5 py-1.5 text-foreground/90">
                                            {activity.subject ?? "—"}
                                          </td>
                                          <td className="border-t px-2.5 py-1.5 text-muted-foreground">
                                            {activity.topic ? (
                                              <>
                                                <span className="text-foreground/90">{activity.topic}</span>{" "}
                                                <span>— {activity.detail}</span>
                                              </>
                                            ) : (
                                              activity.detail
                                            )}
                                          </td>
                                        </tr>
                                      )),
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
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
    </section>
    </Theme>
  );
}

