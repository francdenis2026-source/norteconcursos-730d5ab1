import * as React from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  BookOpen,
  BookOpenCheck,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  Clock,
  Download,
  GraduationCap,
  PlayCircle,
  ScanSearch,
  Scale,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuthStatus } from "@/hooks/useDashboard";
import {
  pcAcVerticalCargos,
  pcAcInstitutionalLaws,
  type PcAcVerticalCargoId,
  type PcAcVerticalDiscipline,
} from "@/data/pcAcreVerticalizado";
import {
  pcAcVerticalCargo,
  pcAcVerticalCounts,
  pcAcVerticalDisciplineCounts,
  pcAcVerticalItemId,
  pcAcVerticalTopicStatus,
  readPcAcVerticalProgress,
  writePcAcVerticalProgress,
  type PcAcVerticalStatus,
} from "@/lib/pcAcreVerticalizado";
import { pcAcVerticalTopicGroups } from "@/lib/pcAcreTopicStructure";
import { pcAcDisciplineLink } from "@/lib/pcAcreVerticalLinks";
import {
  DEFAULT_PCAC_STUDY_CONFIG,
  PCAC_EXAM_DATE,
  buildPcAcStudyWeek,
  pcAcDaysUntilExam,
  readPcAcStudyConfig,
  writePcAcStudyConfig,
  type PcAcStudyPlanConfig,
} from "@/lib/pcAcreStudyPlan";
import { useMediaCatalog } from "@/lib/mediaStore";
import { relatedVideos } from "@/lib/relatedVideos";
import {
  INVESTIGATOR_FOCUS,
  INVESTIGATOR_RADAR,
  PCAC_IDECAN_PRIORITY,
} from "@/data/pcAcreIdecanRadar";
import {
  PCAC_ACTIVITY_LABEL,
  PCAC_PHASE_LABEL,
  buildPcAcFinalDays,
  buildPcAcMasterPlan,
  type PcAcPlanWeek,
} from "@/lib/pcAcreMasterPlan";
import { buildPcAcHourlyPlan } from "@/lib/pcAcreHourlyPlan";
import "@/styles/pcac-edital.css";

const LEGISLACAO_INSTITUCIONAL_ANCHOR = "pcac-legislacao-institucional";
const CRONOGRAMA_ANCHOR = "pcac-cronograma";
const PLANO_ESTUDOS_ANCHOR = "pcac-plano-estudos";
const CRONOGRAMA_HORARIO_ANCHOR = "pcac-cronograma-horario";
const DAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

const PCAC_DISCIPLINE_GUIDE: Record<string, string> = {
  "Língua Portuguesa": "Interpretação, tipologia textual, coesão, coerência, sintaxe, concordância, regência, crase, pontuação e reescrita.",
  "Raciocínio Lógico": "Proposições, conectivos, equivalências, negações, argumentação, conjuntos, análise combinatória, probabilidade e gráficos.",
  "Raciocínio Lógico-Matemático": "Lógica proposicional, porcentagem, razão, proporção, conjuntos, sequências, combinatória, probabilidade e interpretação de dados.",
  "Informática": "Windows e Linux, editores de texto, planilhas, internet, e-mail, nuvem, segurança da informação e redes.",
  "Tecnologia da Informação": "Segurança cibernética, malware, phishing, autenticação, criptografia, redes, LGPD, crimes digitais e resposta a incidentes.",
  "Direito Penal": "Aplicação da lei penal, teoria do crime, concurso de pessoas, penas, crimes contra a pessoa, patrimônio e administração pública.",
  "Direito Processual Penal": "Inquérito, ação penal, competência, provas, prisões, medidas cautelares, procedimentos, recursos e cadeia de custódia.",
  "Direito Constitucional": "Princípios fundamentais, direitos e garantias, organização do Estado, poderes, segurança pública e controle de constitucionalidade.",
  "Direito Administrativo": "Atos, poderes, agentes públicos, organização administrativa, responsabilidade civil, licitações, contratos e improbidade.",
  "Legislação Institucional": "Lei Orgânica Nacional das Polícias Civis, legislação da PC-AC, estatuto dos servidores, deveres, direitos e regime disciplinar.",
  "Direitos Humanos": "Tratados, dignidade, igualdade, grupos vulneráveis, uso da força, segurança pública e proteção internacional.",
  "Contabilidade": "Patrimônio, escrituração, contas, demonstrações contábeis, análise financeira e princípios de contabilidade.",
  "Estatística": "População e amostra, tabelas, gráficos, medidas de posição, dispersão, probabilidade e análise de dados.",
  "Arquivologia": "Gestão documental, classificação, avaliação, protocolo, arquivo corrente, intermediário e permanente.",
  "Análise de Dados e Informações": "Coleta, tratamento, validação, indicadores, correlação, visualização e interpretação para investigação.",
  "Administração": "Funções administrativas, planejamento, organização, direção, controle, gestão pública e processos.",
  "Realidade do Acre": "História, formação territorial, Revolução Acreana, geografia, economia, cultura, povos indígenas e segurança pública.",
  "Criminalística": "Local de crime, vestígios, cadeia de custódia, documentação pericial e métodos de investigação.",
  "Medicina Legal": "Traumatologia, tanatologia, sexologia, toxicologia, identificação e psicopatologia forense.",
  "Ciências Forenses": "Vestígios, identificação, perícia, genética, química, balística, documentoscopia e cadeia de custódia.",
};

export const Route = createFileRoute("/dashboard/pc-acre-edital")({
  component: PcAcreEditalVerticalizadoPage,
  validateSearch: (s: Record<string, unknown>): { cargo?: string | undefined; view?: string | undefined } => ({
    cargo: typeof s["cargo"] === "string" ? s["cargo"] : undefined,
    view: typeof s["view"] === "string" ? s["view"] : undefined,
  }),
  head: () => ({ meta: [{ title: "Edital verticalizado PC-AC | Norte Concurso" }] }),
});

const STATUS_CYCLE: Array<PcAcVerticalStatus | undefined> = [undefined, "a-estudar", "estudado"];

function nextStatus(current: PcAcVerticalStatus | undefined) {
  const index = STATUS_CYCLE.indexOf(current);
  return STATUS_CYCLE[(index + 1) % STATUS_CYCLE.length];
}

function StatusButton({
  status,
  onClick,
  size = "default",
}: {
  status: PcAcVerticalStatus | undefined;
  onClick: () => void;
  size?: "default" | "sm";
}) {
  const label =
    status === "estudado" ? "Estudado" : status === "a-estudar" ? "A estudar" : "Pendente";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!status}
      aria-label={`Checklist: ${label}`}
      title={label}
      className={
        "pcac-status-control inline-flex shrink-0 items-center justify-center rounded-md border font-bold transition-colors " +
        (size === "sm" ? "h-6 w-6 " : "h-8 w-8 ") +
        (status === "estudado"
          ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
          : status === "a-estudar"
            ? "border-amber-500/50 bg-amber-500/15 text-amber-700 dark:text-amber-400"
            : "border-muted-foreground/30 bg-muted/40 text-muted-foreground")
      }
    >
      {status === "estudado" && <CheckCircle2 className="h-3 w-3" />}
      {status !== "estudado" && <span className="h-2.5 w-2.5 rounded-sm border border-current/60" aria-hidden="true" />}
      <span className="sr-only">{label}</span>
    </button>
  );
}

/** Liga o assunto ao material que já existe na plataforma (teoria e questões por disciplina)
 * ou, quando o assunto é só legislação institucional, aponta para a seção abaixo na própria
 * página. Assuntos sem correspondência confiável não recebem link. */
function DisciplineStudyLinks({
  disciplineId,
  cargoId,
}: {
  disciplineId: string;
  cargoId: PcAcVerticalCargoId;
}) {
  const link = pcAcDisciplineLink(disciplineId);
  const { catalog } = useMediaCatalog();
  const videos = link?.subjects?.flatMap((subject) => relatedVideos(catalog, subject, "*", 2)).slice(0, 3) ?? [];
  if (!link && !videos.length) return null;
  const linkClass =
    "inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10";
  const back = `/dashboard/pc-acre-edital?cargo=${cargoId}`;
  if (link?.anchor)
    return (
      <div className="pcac-discipline-actions flex flex-wrap gap-1.5">
        <a href={`#${link.anchor}`} className={linkClass}>
          <Scale className="h-3 w-3" aria-hidden="true" />
          Ver leis institucionais abaixo
        </a>
      </div>
    );
  return (
    <div className="pcac-discipline-actions flex flex-wrap gap-1.5">
      {link?.subjects?.map((subject) => (
        <React.Fragment key={subject}>
          <Link
            to="/dashboard/library"
            search={{ collection: "subjects", discipline: subject, back }}
            className={linkClass}
          >
            <BookOpen className="h-3 w-3" aria-hidden="true" />
            Teoria{link.subjects!.length > 1 ? `: ${subject}` : ""}
          </Link>
          <Link to="/dashboard/question-trainer" search={{ subject, back }} className={linkClass}>
            <BrainCircuit className="h-3 w-3" aria-hidden="true" />
            Questões{link.subjects!.length > 1 ? `: ${subject}` : ""}
          </Link>
          {videos.length === 0 && (
            <Link
              to="/dashboard/media"
              search={{ subject, tab: "videos" }}
              className="pcac-video-link inline-flex items-center gap-1 rounded-md border border-rose-500/30 bg-rose-500/5 px-2.5 py-1 text-[11px] font-semibold text-rose-600 transition-colors hover:bg-rose-500/10"
            >
              <PlayCircle className="h-3 w-3" aria-hidden="true" />
              Vídeos{link.subjects!.length > 1 ? `: ${subject}` : ""}
            </Link>
          )}
        </React.Fragment>
      ))}
      {videos.map((video) => {
        const href = video.id.startsWith("PL") ? "https://www.youtube.com/playlist?list=" + video.id : "https://www.youtube.com/watch?v=" + video.id;
        return (
          <a key={video.id} href={href} target="_blank" rel="noreferrer" className="pcac-video-link inline-flex items-center gap-1 rounded-md border border-rose-500/30 bg-rose-500/5 px-2.5 py-1 text-[11px] font-semibold text-rose-600 transition-colors hover:bg-rose-500/10">
            <PlayCircle className="h-3 w-3" aria-hidden="true" />
            Vídeo{video.channel ? " · " + video.channel : ""}
          </a>
        );
      })}
    </div>
  );
}

/** Uma disciplina do edital: cabeçalho com nome, selo de progresso e links de estudo, e — quando
 * o Anexo III detalha itens de conteúdo programático — a lista de itens, cada um com seu próprio
 * clique para marcar "a estudar"/"estudado". */
function DisciplineAccordionItem({
  block,
  discipline,
  cargoId,
  progress,
  onToggleTopic,
}: {
  block: string;
  discipline: PcAcVerticalDiscipline;
  cargoId: PcAcVerticalCargoId;
  progress: Record<string, PcAcVerticalStatus>;
  onToggleTopic: (
    disciplineId: string,
    topicIndex: number | undefined,
    subtopicIndex?: number,
    forcedStatus?: PcAcVerticalStatus | null,
  ) => void;
}) {
  const counts = pcAcVerticalDisciplineCounts(block, discipline, progress);
  const groups = pcAcVerticalTopicGroups(discipline);
  const hasTopics = groups.length > 0;
  const value = `${block}::${discipline.id}`;

  const header = (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-left">
      <span className="text-sm font-semibold">{discipline.name}</span>
      <Badge
        variant="outline"
        className={
          "shrink-0 text-[10px] " +
          (counts.estudado === counts.total && counts.total > 0
            ? "border-emerald-500/50 text-emerald-700 dark:text-emerald-400"
            : "")
        }
      >
        {counts.estudado}/{counts.total}
      </Badge>
    </div>
  );

  const extras = (
    <div className="mt-2 space-y-2 border-t border-border/60 pt-2">
      <div className="rounded-md border border-primary/20 bg-primary/5 p-2.5">
        <p className="text-[10px] font-bold uppercase tracking-wide text-primary">Conteúdo cobrado</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{PCAC_DISCIPLINE_GUIDE[discipline.name] ?? discipline.note ?? "Consulte os itens detalhados do edital nesta disciplina."}</p>
      </div>
      <DisciplineStudyLinks disciplineId={discipline.id} cargoId={cargoId} />
    </div>
  );

  if (!hasTopics) {
    return (
      <li className={`pcac-discipline-item pcac-discipline-${discipline.id} flex items-start gap-2 rounded-lg border bg-background/60 p-3`}>
        <span onClick={(event) => event.stopPropagation()} className="shrink-0">
          <StatusButton
            status={progress[pcAcVerticalItemId(block, discipline.id)]}
            onClick={() => onToggleTopic(discipline.id, undefined)}
          />
        </span>
        <div className="min-w-0 flex-1">
          {header}
          {extras}
        </div>
      </li>
    );
  }

  return (
    <li className={`pcac-discipline-item pcac-discipline-${discipline.id} rounded-lg border bg-background/60`}>
      <Accordion type="single" collapsible>
        <AccordionItem value={value} className="border-0">
          <AccordionTrigger onClick={(event) => event.stopPropagation()} className="px-3 py-2.5 hover:no-underline">{header}</AccordionTrigger>
          <AccordionContent className="px-3 pb-3">
            {extras}
            <ul className="mt-2 space-y-1.5">
              {groups.map((group, i) => {
                const units = group.subtopics.length ? group.subtopics : [group.title];
                const statuses = units.map((_, j) =>
                  pcAcVerticalTopicStatus(
                    progress,
                    block,
                    discipline.id,
                    i,
                    group.subtopics.length ? j : undefined,
                  ),
                );
                const groupStatus: PcAcVerticalStatus | undefined = statuses.every((status) => status === "estudado")
                  ? "estudado"
                  : statuses.some(Boolean)
                    ? "a-estudar"
                    : undefined;
                const nextGroupStatus = groupStatus === "estudado" ? undefined : groupStatus === "a-estudar" ? "estudado" : "a-estudar";
                return (
                  <li key={i} className="rounded-md border border-border/60 bg-muted/20 p-2">
                    <details open={group.subtopics.length === 0} className="group/topic">
                      <summary className="flex cursor-pointer list-none items-start gap-2 [&::-webkit-details-marker]:hidden">
                      <span onClick={(event) => event.stopPropagation()} className="shrink-0">
                        <StatusButton
                          size="sm"
                          status={groupStatus}
                          onClick={() => units.forEach((_, j) => onToggleTopic(discipline.id, i, group.subtopics.length ? j : undefined, nextGroupStatus ?? null))}
                        />
                      </span>
                      <span className="min-w-0 flex-1 break-words text-xs font-semibold leading-relaxed text-foreground/90">{group.title}</span>
                      {group.subtopics.length > 0 && (
                        <span className="shrink-0 rounded-md border border-primary/20 px-2 py-1 text-[10px] font-bold text-primary group-open/topic:bg-primary/10">
                          <span className="group-open/topic:hidden">Ver subitens</span>
                          <span className="hidden group-open/topic:inline">Ocultar subitens</span>
                        </span>
                      )}
                      </summary>
                    {group.subtopics.length > 0 && (
                      <ul className="mt-1.5 space-y-1 border-l-2 border-primary/20 pl-2.5">
                        {group.subtopics.map((subtopic, j) => (
                          <li key={j} className="flex items-start gap-2 rounded border border-border/50 bg-background/60 px-2 py-1.5">
                            <StatusButton
                              size="sm"
                              status={statuses[j]}
                              onClick={() => onToggleTopic(discipline.id, i, j)}
                            />
                            <span className="min-w-0 flex-1 break-words text-xs leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">{subtopic}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    </details>
                  </li>
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </li>
  );
}

/** Cronograma de estudos adaptado à data da prova e à disponibilidade do aluno: calcula a semana
 * a partir do peso de cada disciplina do Anexo III (específicas pesam mais que básicas) e deixa
 * exportar em PDF estilizado. Configuração salva neste navegador, por cargo. */
function PcAcStudyPlanCard({
  cargo,
  userId,
}: {
  cargo: (typeof pcAcVerticalCargos)[number];
  userId: string;
}) {
  const [cfg, setCfg] = React.useState<PcAcStudyPlanConfig>(DEFAULT_PCAC_STUDY_CONFIG);
  const [exporting, setExporting] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setCfg(readPcAcStudyConfig(window.localStorage, userId, cargo.id));
  }, [userId, cargo.id]);

  const update = (patch: Partial<PcAcStudyPlanConfig>) => {
    setCfg((prev) => {
      const next = { ...prev, ...patch };
      if (typeof window !== "undefined") writePcAcStudyConfig(window.localStorage, userId, cargo.id, next);
      return next;
    });
  };

  const week = React.useMemo(() => buildPcAcStudyWeek(cargo, cfg), [cargo, cfg]);
  const daysLeft = pcAcDaysUntilExam(PCAC_EXAM_DATE);
  const totalMinutes = Object.values(week).reduce(
    (s, blocks) => s + blocks.reduce((a, b) => a + b.minutes, 0),
    0,
  );

  const exportPdf = async () => {
    setExporting(true);
    try {
      const { generatePcAcCronogramaPdf } = await import("@/lib/pcAcreCronogramaPdf");
      await generatePcAcCronogramaPdf(cargo, cfg, week);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Card id={CRONOGRAMA_ANCHOR} className="pcac-edital-card pcac-edital-cronograma scroll-mt-20">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarClock className="h-5 w-5 text-primary" />
              Cronograma de estudos para a prova
            </CardTitle>
            <CardDescription>
              Ajustado à data da prova e ao tempo que você tem disponível. Exporte em PDF quando
              quiser.
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-sm">
            {daysLeft} dias até a prova ({PCAC_EXAM_DATE.split("-").reverse().join("/")})
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Horas de estudo por semana</Label>
            <Input
              type="number"
              min={1}
              max={80}
              value={cfg.weeklyHours}
              onChange={(e) => update({ weeklyHours: Math.min(80, Math.max(1, Number(e.target.value) || 1)) })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Começo do estudo</Label>
            <Input
              type="time"
              value={cfg.startTime}
              onChange={(e) => e.target.value && update({ startTime: e.target.value })}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Dias de estudo</Label>
            <div className="flex flex-wrap gap-1.5">
              {DAY_ORDER.map((d) => {
                const on = cfg.days.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      const days = on ? cfg.days.filter((x) => x !== d) : [...cfg.days, d];
                      if (days.length) update({ days });
                    }}
                    className={
                      "rounded-full px-3 py-1 text-xs font-semibold transition-colors " +
                      (on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")
                    }
                  >
                    {DAY_SHORT[d]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
          <p className="text-xs text-muted-foreground">
            {cfg.days.length} dia{cfg.days.length === 1 ? "" : "s"} por semana ·{" "}
            {Math.round(totalMinutes / 60)}h{totalMinutes % 60 ? String(totalMinutes % 60).padStart(2, "0") : ""}{" "}
            distribuídas entre as disciplinas do Anexo III.
          </p>
          <Button variant="secondary" onClick={() => void exportPdf()} disabled={exporting}>
            <Download className="mr-2 h-4 w-4" />
            {exporting ? "Gerando…" : "Exportar cronograma em PDF"}
          </Button>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {DAY_ORDER.filter((d) => cfg.days.includes(d)).map((d) => (
            <div key={d} className="rounded-lg border bg-background/60 p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][d]}
              </p>
              <ul className="mt-2 space-y-1.5">
                {(week[d] ?? []).map((block, i) => (
                  <li key={i} className="flex items-start justify-between gap-2 text-xs">
                    <span className="text-foreground/90">{block.discipline}</span>
                    <span className="shrink-0 font-semibold text-muted-foreground">
                      {block.start}–{block.end}
                    </span>
                  </li>
                ))}
                {!(week[d] ?? []).length && (
                  <li className="text-xs text-muted-foreground">Sem blocos neste dia.</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const WEEKDAY_FULL = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

/** Plano de estudos completo: semana a semana e dia a dia, organizado pela ordem de relevância
 * já marcada para o Investigador (ver "Foco recomendado" e "Onde concentrar seu tempo" acima),
 * cobrindo teoria, questões, redação e simulados até 3 dias antes da prova. Reaproveita os
 * mesmos dias de estudo configurados no cronograma de horários, para os dois ficarem
 * consistentes. */
function PcAcMasterPlanCard({
  cargoLabel,
  cargoId,
  userId,
}: {
  cargoLabel: string;
  cargoId: PcAcVerticalCargoId;
  userId: string;
}) {
  const [exporting, setExporting] = React.useState(false);
  const [days, setDays] = React.useState<number[]>(DEFAULT_PCAC_STUDY_CONFIG.days);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setDays(readPcAcStudyConfig(window.localStorage, userId, cargoId).days);
  }, [userId, cargoId]);
  const weeks = React.useMemo(() => buildPcAcMasterPlan(days), [days]);
  const finalDays = React.useMemo(() => buildPcAcFinalDays(), []);
  const totalActivities = weeks.reduce((s, w) => s + w.days.reduce((a, d) => a + d.activities.length, 0), 0);

  const exportPdf = async () => {
    setExporting(true);
    try {
      const { generatePcAcMasterPlanPdf } = await import("@/lib/pcAcreMasterPlanPdf");
      await generatePcAcMasterPlanPdf(cargoLabel, weeks, finalDays);
    } finally {
      setExporting(false);
    }
  };

  const phaseWeeks = (phase: PcAcPlanWeek["phase"]) => weeks.filter((w) => w.phase === phase);

  return (
    <Card id={PLANO_ESTUDOS_ANCHOR} className="pcac-edital-card pcac-edital-master-plan scroll-mt-20">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-5 w-5 text-primary" />
              Plano de estudos completo
            </CardTitle>
            <CardDescription>
              Semana a semana e dia a dia até 3 dias antes da prova, por ordem de relevância da
              banca IDECAN — com teoria, questões, redação e simulados. Usa os mesmos dias de
              estudo do cronograma acima.
            </CardDescription>
          </div>
          <Button variant="secondary" onClick={() => void exportPdf()} disabled={exporting || !weeks.length}>
            <Download className="mr-2 h-4 w-4" />
            {exporting ? "Gerando…" : "Exportar plano em PDF"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!weeks.length ? (
          <p className="text-sm text-muted-foreground">
            Faltam poucos dias para a prova — use o período para revisão leve (ver "Últimos dias"
            abaixo) em vez de um plano de semanas completas.
          </p>
        ) : (
          <>
            <p className="text-xs text-muted-foreground">
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
                        <div key={week.weekNumber} className="rounded-lg border bg-background/60 p-3">
                          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                            Semana {week.weekNumber} · {week.startDate.split("-").reverse().join("/")} a{" "}
                            {week.endDate.split("-").reverse().join("/")}
                          </p>
                          <div className="mt-2 grid gap-2 sm:grid-cols-2">
                            {week.days.map((day) => (
                              <div key={day.date} className="rounded-md border border-dashed bg-muted/20 p-2">
                                <p className="text-[11px] font-semibold text-foreground/90">
                                  {WEEKDAY_FULL[day.weekday]} · {day.date.split("-").reverse().join("/")}
                                </p>
                                <ul className="mt-1 space-y-1">
                                  {day.activities.map((activity, i) => (
                                    <li key={i} className="text-[11px] leading-relaxed text-muted-foreground">
                                      <span className="font-semibold text-primary">
                                        {PCAC_ACTIVITY_LABEL[activity.type]}:
                                      </span>{" "}
                                      {activity.detail}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
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
      </CardContent>
    </Card>
  );
}

/** Cronograma horário detalhado: 05:00–22:00, todos os dias, a partir de segunda-feira
 * 09/11/2026, com treino físico (05:00–06:00 e 17:30–19:00) e intervalos de descanso marcados.
 * Complementa o plano de estudos completo acima (aquele diz o que estudar e em que ordem; este
 * diz a que hora exata). */
function PcAcHourlyPlanCard({ cargoLabel }: { cargoLabel: string }) {
  const [exporting, setExporting] = React.useState(false);
  const weeks = React.useMemo(() => buildPcAcHourlyPlan(), []);
  const finalDays = React.useMemo(() => buildPcAcFinalDays(), []);

  const exportPdf = async () => {
    setExporting(true);
    try {
      const { generatePcAcHourlyPlanPdf } = await import("@/lib/pcAcreHourlyPlanPdf");
      await generatePcAcHourlyPlanPdf(cargoLabel, weeks, finalDays);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Card id={CRONOGRAMA_HORARIO_ANCHOR} className="pcac-edital-card pcac-edital-hourly-plan scroll-mt-20">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-5 w-5 text-primary" />
              Cronograma horário detalhado
            </CardTitle>
            <CardDescription>
              Das 05:00 às 22:00, todos os dias, a partir de segunda-feira (09/11), com treino
              físico (05:00–06:00 e 17:30–19:00), refeições e intervalos marcados. Sábado é dia
              de simulado completo; domingo é descanso ativo, reduzido de propósito.
            </CardDescription>
          </div>
          <Button variant="secondary" onClick={() => void exportPdf()} disabled={exporting || !weeks.length}>
            <Download className="mr-2 h-4 w-4" />
            {exporting ? "Gerando…" : "Exportar cronograma horário em PDF"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-3 text-xs text-muted-foreground">
          Cada semana tem 1 ou 2 disciplinas fixas — a semana inteira gira em torno delas, do
          jeito que muda é só a atividade (teoria → questões → revisão → redação). Treino físico
          entra todos os dias, às 05:00–06:00 e 17:30–19:00, e o estudo efetivo fica em torno de
          8h30 por dia — um cronograma exaustivo rende menos do que um sustentável, por isso
          domingo foi reservado para descanso ativo.
        </p>
        <Accordion type="multiple" defaultValue={weeks[0] ? [`semana-${weeks[0].weekNumber}`] : []}>
          {weeks.map((week) => (
            <AccordionItem key={week.weekNumber} value={`semana-${week.weekNumber}`}>
              <AccordionTrigger className="text-left text-sm">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">
                    Semana {week.weekNumber} · {week.startDate.split("-").reverse().join("/")} a{" "}
                    {week.endDate.split("-").reverse().join("/")}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {week.focusSubjects.join(" + ")}
                  </Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="multiple">
                  {week.days.map((day) => (
                    <AccordionItem key={day.date} value={day.date}>
                      <AccordionTrigger className="text-left text-xs">
                        {["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][day.weekday]}{" "}
                        · {day.date.split("-").reverse().join("/")}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1">
                          {day.blocks.map((block, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs">
                              <span className="shrink-0 font-mono text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                                {block.start}–{block.end}
                              </span>
                              <span className="text-muted-foreground">
                                <span className="font-semibold text-foreground/90">{PCAC_ACTIVITY_LABEL[block.type]}:</span> {block.label}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="text-xs text-muted-foreground">
          {weeks.length} semana{weeks.length === 1 ? "" : "s"}, hora a hora, até 3 dias antes da
          prova.
        </p>
      </CardContent>
    </Card>
  );
}

function PcAcreEditalVerticalizadoPage() {
  const { user } = useAuthStatus();
  const userId = user?.id ?? "guest";
  const search = useSearch({ strict: false }) as { cargo?: string; view?: string };
  const cargoParam = search.cargo;
  const digitalView = search.view === "digital";
  const navigate = useNavigate();
  const cargo = pcAcVerticalCargo(cargoParam);
  const [clockNow, setClockNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const timer = window.setInterval(() => setClockNow(new Date()), 1_000);
    return () => window.clearInterval(timer);
  }, []);
  const examDate = new Date("2027-01-24T00:00:00-03:00");
  const remainingMs = Math.max(0, examDate.getTime() - clockNow.getTime());
  const daysToExam = Math.floor(remainingMs / 86_400_000);
  const hoursToExam = Math.floor((remainingMs % 86_400_000) / 3_600_000);
  const minutesToExam = Math.floor((remainingMs % 3_600_000) / 60_000);
  const secondsToExam = Math.floor((remainingMs % 60_000) / 1_000);
  const pad = (value: number) => String(value).padStart(2, "0");

  const [progress, setProgress] = React.useState<Record<string, PcAcVerticalStatus>>({});

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setProgress(readPcAcVerticalProgress(window.localStorage, userId, cargo.id));
  }, [userId, cargo.id]);

  const toggle = (
    block: string,
    disciplineId: string,
    topicIndex?: number,
    subtopicIndex?: number,
    forcedStatus?: PcAcVerticalStatus | null,
  ) => {
    const itemId = pcAcVerticalItemId(block, disciplineId, topicIndex, subtopicIndex);
    setProgress((prev) => {
      const next = { ...prev };
      const nextValue = forcedStatus === undefined ? nextStatus(prev[itemId]) : forcedStatus;
      if (nextValue) next[itemId] = nextValue;
      else delete next[itemId];
      // Ao marcar um subtópico novo, remove o status legado do tópico-pai.
      if (topicIndex !== undefined && subtopicIndex !== undefined) {
        delete next[pcAcVerticalItemId(block, disciplineId, topicIndex)];
      }
      if (typeof window !== "undefined")
        writePcAcVerticalProgress(window.localStorage, userId, cargo.id, next);
      return next;
    });
  };

  const counts = pcAcVerticalCounts(cargo, progress);
  const percent = counts.total ? Math.round((counts.estudado / counts.total) * 100) : 0;

  const exportPdf = async () => {
    const { generatePcAcVerticalPdf } = await import("@/lib/pcAcreVerticalPdf");
    await generatePcAcVerticalPdf(cargo, progress);
  };

  if (digitalView) {
    return (
      <div className="pcac-edital-page pcac-digital-fullscreen -mt-4 space-y-3 pb-6">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-primary/30 border-l-4 border-l-cyan-400 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-3 text-white shadow-sm">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-cyan-200"><BookOpenCheck className="h-3.5 w-3.5 text-amber-300" /> Área do aluno · edital digital</p>
            <h1 className="mt-1 text-xl font-black tracking-tight">Edital digital PC-AC 2026</h1>
            <p className="mt-0.5 text-xs text-slate-300">Marque tópicos por cargo e acompanhe seu progresso dentro da plataforma.</p>
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <div className="text-right text-[10px] leading-tight text-slate-300"><strong className="block text-slate-100">Inscrições</strong>11/11 a 14/12/2026</div>
            <div className="h-7 w-px bg-white/15" />
            <div className="text-right text-[10px] leading-tight text-slate-300"><strong className="block text-slate-100">Prova objetiva</strong>24/01/2027</div>
            <div className="rounded-lg border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-center"><strong className="block text-lg leading-none text-amber-200">{daysToExam}</strong><span className="text-[9px] font-bold uppercase tracking-wide text-amber-100">dias restantes</span></div>
          </div>
          <Button size="sm" variant="outline" className="shrink-0 border-white/20 bg-white/5 text-white hover:bg-white/10" onClick={() => void navigate({ to: "/dashboard/pc-acre-edital", search: { cargo: cargo.id } })}>Voltar ao edital verticalizado</Button>
        </div>
        <Card className="overflow-hidden border-primary/20">
          <CardContent className="p-0">
            <iframe title="Edital digital PC-AC 2026" src="/pcac-edital-digital/index.html" className="h-[calc(100vh-140px)] min-h-[760px] w-full border-0" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pcac-edital-page space-y-5 pb-10">
      <PageHero
        image="careers-team"
        kicker="ÁREA PROFISSIONAL · PC DO ACRE"
        icon={ShieldCheck}
        title="Edital verticalizado — PC-AC 001/2026"
        description="Marque o que já estudou, acompanhe o progresso por cargo e exporte seu edital verticalizado em PDF. Conteúdo organizado a partir do Edital nº 001 SEAD/PCAC, banca IDECAN."
        actions={
          <div className="flex max-w-[760px] flex-wrap items-center justify-end gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-slate-950/20 px-2.5 py-1.5 text-[10px] leading-tight text-slate-200">
              <span><strong className="block text-[9px] uppercase tracking-wide text-slate-400">Edital lançado</strong>06/11/2026</span>
              <span className="h-6 w-px bg-white/15" />
              <span><strong className="block text-[9px] uppercase tracking-wide text-slate-400">Prova</strong>24/01/2027</span>
              <span className="h-6 w-px bg-white/15" />
              <span className="text-center"><strong className="block text-[9px] uppercase tracking-wide text-amber-300">Faltam</strong><span className="font-black tabular-nums text-amber-200">{daysToExam}d {pad(hoursToExam)}:{pad(minutesToExam)}:{pad(secondsToExam)}</span></span>
            </div>
            <Button variant="outline" asChild>
              <Link to="/dashboard/inteligencia-idecan">
                <ScanSearch className="mr-2 h-4 w-4" />
                Raio-X da banca
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={`#${CRONOGRAMA_ANCHOR}`}>
                <CalendarClock className="mr-2 h-4 w-4" />
                Cronograma de estudos
              </a>
            </Button>
            <Button variant="secondary" onClick={() => void exportPdf()}>
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        }
      >
        <div className="page-hero__stats">
          <HeroStat icon={Users} label="Vagas" value={cargo.vagas} />
          <HeroStat icon={BookOpenCheck} label="Disciplinas" value={counts.total} />
          <HeroStat icon={CheckCircle2} label="Estudado" value={`${percent}%`} />
        </div>
      </PageHero>

      <Card className="pcac-edital-card pcac-edital-cargos">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Escolha o cargo
          </CardTitle>
        </CardHeader>
        <CardContent
          className="grid grid-cols-2 gap-2 pt-4 sm:grid-cols-3 lg:grid-cols-6"
          role="group"
          aria-label="Escolha o cargo"
        >
          {pcAcVerticalCargos.map((item) => {
            const active = item.id === cargo.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  void navigate({
                    to: "/dashboard/pc-acre-edital",
                    search: { cargo: item.id as PcAcVerticalCargoId },
                  })
                }
                className={
                  "flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors " +
                  (active
                    ? "border-primary bg-primary/10 text-foreground"
                    : item.id === "investigador"
                      ? "border-amber-400/70 bg-amber-400/10 text-foreground hover:bg-amber-400/15"
                      : "border-border bg-background/50 text-foreground hover:bg-muted/60")
                }
              >
                <span className="text-xs font-bold leading-snug">{item.label}</span>
                {item.id === "investigador" && <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-amber-700 dark:text-amber-300">Foco recomendado</span>}
                <span className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-0.5">
                    <Users className="h-3 w-3" aria-hidden="true" />
                    {item.vagas}
                  </span>
                  <span className="inline-flex items-center gap-0.5">
                    <Wallet className="h-3 w-3" aria-hidden="true" />
                    {item.salario}
                  </span>
                </span>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {cargo.id === "investigador" && (
        <Card className="pcac-edital-card border-amber-400/60 bg-gradient-to-br from-amber-400/10 via-card to-card">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base">Foco recomendado: Oficial Investigador</CardTitle>
                <CardDescription>O cargo concentra 74 vagas e seis disciplinas específicas. Organize sua semana pelo núcleo abaixo.</CardDescription>
              </div>
              <Badge className="bg-amber-500 text-slate-950">74 vagas</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {["Português e Raciocínio Lógico", "Penal, Processual Penal e Constitucional", "Contabilidade, Estatística e Dados", "Arquivologia e Tecnologia da Informação"].map((focus, index) => (
              <div key={focus} className="rounded-lg border border-amber-400/30 bg-background/60 p-3">
                <span className="text-[10px] font-black uppercase tracking-wide text-amber-700 dark:text-amber-300">Etapa {index + 1}</span>
                <p className="mt-1 text-sm font-semibold">{focus}</p>
              </div>
            ))}
          </CardContent>
          <CardContent className="border-t border-amber-400/20 pt-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold">Assuntos para ganhar tempo</p>
                <p className="text-xs text-muted-foreground">Prioridade estratégica cruzando o edital PC-AC com o padrão observado em provas policiais da IDECAN, incluindo PC-SC 2026. É orientação de estudo, não alteração do conteúdo oficial.</p>
              </div>
              <Badge variant="outline">IDECAN · 2026</Badge>
            </div>
            <div className="grid gap-2 lg:grid-cols-2">
              {INVESTIGATOR_FOCUS.map((item, index) => (
                <div key={item.subject} className="rounded-lg border bg-background/60 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div><span className="mr-1 text-xs font-black text-muted-foreground">{index + 1}.</span><span className="text-sm font-semibold">{item.subject}</span></div>
                    <Badge variant={item.priority === "Muito alta" ? "default" : "outline"}>{item.priority}</Badge>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.topics}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Link to="/dashboard/question-trainer" search={{ subject: item.filter }} className="rounded-md border px-2 py-1 text-[11px] font-semibold text-primary hover:bg-primary/10">Treinar questões</Link>
                    <Link to="/dashboard/library" search={{ collection: "subjects", discipline: item.filter }} className="rounded-md border px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:bg-muted">Abrir teoria</Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardContent className="border-t border-amber-400/20 pt-4">
            <div className="mb-3">
              <p className="text-sm font-bold">Radar de incidência para começar</p>
              <p className="text-xs text-muted-foreground">Mapeamento orientativo: edital PC-AC cruzado com o padrão de provas policiais da IDECAN disponível na plataforma, incluindo PC-SC 2026. Use para priorizar revisões; não substitui o conteúdo oficial.</p>
            </div>
            <div className="grid gap-2 lg:grid-cols-2">
              {INVESTIGATOR_RADAR.map((item, index) => (
                <div key={item.subject} className="rounded-lg border bg-background/60 p-3">
                  <div className="flex items-start justify-between gap-2"><span className="text-sm font-semibold">{index + 1}. {item.subject}</span><Badge variant={item.priority === "Muito alta" ? "default" : "outline"}>{item.priority}</Badge></div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.topics}</p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Base: {item.evidence}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {cargo.exam && (
        <Card className="pcac-edital-card pcac-edital-overview">
          <CardHeader>
            <CardTitle className="text-base">Como será a seleção</CardTitle>
            <CardDescription>Resumo do edital para {cargo.label}.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border bg-muted/20 p-3 text-sm"><strong>{cargo.exam.objectiveQuestions} questões</strong><span className="mt-1 block text-xs text-muted-foreground">prova objetiva · {cargo.exam.objectivePoints} pontos</span></div>
            <div className="rounded-lg border bg-muted/20 p-3 text-sm"><strong>60 específicas · peso {cargo.exam.specificWeight}</strong><span className="mt-1 block text-xs text-muted-foreground">24 básicas + 16 jurídicas</span></div>
            <div className="rounded-lg border bg-muted/20 p-3 text-sm"><strong>Prova discursiva</strong><span className="mt-1 block text-xs text-muted-foreground">{cargo.exam.discursive}</span></div>
          </CardContent>
        </Card>
      )}

      {cargo.locations && (
        <Card className="pcac-edital-card pcac-edital-locations">
          <CardHeader>
            <CardTitle className="text-base">Distribuição das vagas por município</CardTitle>
            <CardDescription>{cargo.vagas} vagas no total, conforme o Anexo I do edital.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {cargo.locations.map((location) => (
              <div key={location.name} className="rounded-lg border bg-background/60 p-2.5 text-sm">
                <strong>{location.name}</strong>
                <span className="mt-1 block text-xs text-muted-foreground">{location.vacancies} vaga{location.vacancies === 1 ? "" : "s"}{location.pcd ? ` · ${location.pcd} PcD` : ""}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="pcac-edital-card pcac-priority-card">
        <CardHeader>
          <CardTitle className="text-base">Onde concentrar seu tempo</CardTitle>
          <CardDescription>
            Ordem de estudo baseada no histórico recente da IDECAN em concursos policiais. Comece pelo topo e avance conforme o seu progresso.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2 sm:grid-cols-2">
          {PCAC_IDECAN_PRIORITY.map((item, index) => (
            <div key={item.subject} className="rounded-lg border bg-background/60 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{index + 1}. {item.subject}</span>
                <Badge variant={item.level === "Muito alta" ? "default" : "outline"}>{item.level}</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{item.reason}</p>
              <div className="mt-2 flex gap-2">
                <Link to="/dashboard/question-trainer" search={{ subject: item.filter }} className="rounded-md border px-2 py-1 text-[11px] font-semibold text-primary hover:bg-primary/10">Treinar</Link>
                <Link to="/dashboard/library" search={{ collection: "subjects", discipline: item.filter }} className="rounded-md border px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:bg-muted">Estudar teoria</Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="pcac-edital-card pcac-edital-content">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">
                {cargo.label} · {cargo.vagas} vagas · {cargo.salario}
              </CardTitle>
              <CardDescription>
                Toque em "Pendente" para alternar entre Pendente → A estudar → Estudado. O progresso
                fica salvo neste navegador.
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              {counts.estudado}/{counts.total} estudado
            </Badge>
          </div>
          <Progress value={percent} className="mt-3" />
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={cargo.blocks.map((b) => b.title)}>
            {cargo.blocks.map((block) => (
              <AccordionItem key={block.title} value={block.title}>
                <AccordionTrigger className="text-left">{block.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {block.disciplines.map((discipline) => (
                      <DisciplineAccordionItem
                        key={discipline.id}
                        block={block.title}
                        discipline={discipline}
                        cargoId={cargo.id}
                        progress={progress}
                        onToggleTopic={(disciplineId, topicIndex, subtopicIndex, forcedStatus) =>
                          toggle(block.title, disciplineId, topicIndex, subtopicIndex, forcedStatus)
                        }
                      />
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <PcAcStudyPlanCard cargo={cargo} userId={userId} />

      {cargo.id === "investigador" && (
        <>
          <PcAcMasterPlanCard cargoLabel={cargo.label} cargoId={cargo.id} userId={userId} />
          <PcAcHourlyPlanCard cargoLabel={cargo.label} />
        </>
      )}

      <Card id={LEGISLACAO_INSTITUCIONAL_ANCHOR} className="pcac-edital-card pcac-edital-laws scroll-mt-20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Scale className="h-5 w-5 text-primary" />
            Legislação institucional
          </CardTitle>
          <CardDescription>
            As leis exigidas no bloco "Legislação Institucional" do edital, com resumo e pontos
            principais para revisão rápida.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple">
            {pcAcInstitutionalLaws.map((law) => (
              <AccordionItem key={law.id} value={law.id}>
                <AccordionTrigger className="text-left">
                  <span className="flex items-center gap-2">
                    {law.title}
                    {!law.verified && (
                      <Badge variant="outline" className="shrink-0 text-[10px] font-normal">
                        conteúdo a confirmar
                      </Badge>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{law.ementa}</p>
                  {law.resumo.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        Resumo
                      </p>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                        {law.resumo.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {law.pontosPrincipais.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        Pontos principais
                      </p>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                        {law.pontosPrincipais.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {law.nota && (
                    <p className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-3 text-xs text-muted-foreground">
                      {law.nota}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
