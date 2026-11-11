import { PcAcCronogramaCard } from "@/components/dashboard/PcAcCronogramaCard";
import * as React from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  BookOpen,
  BookOpenCheck,
  BrainCircuit,
  CalendarClock,
  ChevronDown,
  CheckCircle2,
  Download,
  PlayCircle,
  ScanSearch,
  Share2,
  Scale,
  ShieldCheck,
  Users,
  GraduationCap,
} from "lucide-react";
import { findPcAcStudyResource, pcAcStudyResourceUrl } from "@/lib/pcAcStudyResources";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStatus } from "@/hooks/useDashboard";
import { supabase } from "@/integrations/supabase/client";
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
import { PCAC_EXAM_DATE } from "@/lib/pcAcreStudyPlan";
import { useMediaCatalog } from "@/lib/mediaStore";
import { relatedVideos } from "@/lib/relatedVideos";
import {
  INVESTIGATOR_FOCUS,
  INVESTIGATOR_RADAR,
  PCAC_IDECAN_PRIORITY,
} from "@/data/pcAcreIdecanRadar";
import "@/styles/pcac-edital.css";
import { platformDate } from "@/lib/platformClock";

const LEGISLACAO_INSTITUCIONAL_ANCHOR = "pcac-legislacao-institucional";
const CRONOGRAMA_ANCHOR = "pcac-cronograma";

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
  discipline,
  cargoId,
}: {
  discipline: PcAcVerticalDiscipline;
  cargoId: PcAcVerticalCargoId;
}) {
  const link = pcAcDisciplineLink(discipline.id);
  // Curso autoral da plataforma correspondente a esta disciplina do Anexo III, quando existe.
  // Fica junto da própria matéria, que é onde o aluno procura o material — não no cronograma.
  const course = findPcAcStudyResource(discipline.name);
  const { catalog } = useMediaCatalog();
  const videos = link?.subjects?.flatMap((subject) => relatedVideos(catalog, subject, "*", 2)).slice(0, 3) ?? [];
  const topicVideos = link?.subjects
    ?.flatMap((subject) =>
      (discipline.topics ?? []).flatMap((topic) =>
        relatedVideos(catalog, subject, topic, 2)
          .filter((video) => video.topic !== "*")
          .map((video) => ({ ...video, editalTopic: topic })),
      ),
    )
    .filter((video, index, all) => all.findIndex((item) => item.id === video.id) === index)
    .slice(0, 24) ?? [];
  if (!link && !course && !videos.length && !topicVideos.length) return null;
  const linkClass =
    "inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10";
  const courseChip = course ? (
    <a
      href={pcAcStudyResourceUrl(course.courseId)}
      className="inline-flex items-center gap-1 rounded-md border border-emerald-600/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300"
      title="Aulas autorais em revisão editorial; consulte o programa do cargo para confirmar a abrangência."
    >
      <GraduationCap className="h-3 w-3" aria-hidden="true" />
      Aulas Norte: {course.label}
    </a>
  ) : null;
  const back = `/dashboard/pc-acre-edital?cargo=${cargoId}`;
  if (link?.anchor)
    return (
      <div className="pcac-discipline-actions flex flex-wrap gap-1.5">
        <a href={`#${link.anchor}`} className={linkClass}>
          <Scale className="h-3 w-3" aria-hidden="true" />
          Ver leis institucionais abaixo
        </a>
        {courseChip}
      </div>
    );
  return (
    <div className="pcac-discipline-actions space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {courseChip}
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
      {topicVideos.length > 0 && (
        <details className="rounded-md border border-rose-500/20 bg-rose-500/[0.03] px-2.5 py-2">
          <summary className="cursor-pointer text-[11px] font-bold text-rose-700 dark:text-rose-300">
            Videoteca por assunto · {topicVideos.length} aulas encontradas
          </summary>
          <ul className="mt-2 grid gap-1.5">
            {topicVideos.map((video) => {
              const href = video.id.startsWith("PL") ? "https://www.youtube.com/playlist?list=" + video.id : "https://www.youtube.com/watch?v=" + video.id;
              return (
                <li key={`${video.editalTopic}:${video.id}`}>
                  <a href={href} target="_blank" rel="noreferrer" className="flex min-w-0 items-start gap-2 rounded-md border border-rose-500/15 bg-background/70 px-2 py-1.5 text-[11px] hover:bg-rose-500/10">
                    <PlayCircle className="mt-0.5 h-3 w-3 shrink-0 text-rose-600" aria-hidden="true" />
                    <span className="min-w-0">
                      <strong className="block truncate font-semibold">{video.title}</strong>
                      <small className="block truncate text-muted-foreground">{video.editalTopic} · {video.channel ?? "YouTube"}</small>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </details>
      )}
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
      <DisciplineStudyLinks discipline={discipline} cargoId={cargoId} />
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

function PcAcreEditalVerticalizadoPage() {
  const { user } = useAuthStatus();
  const userId = user?.id ?? "guest";
  const search = useSearch({ strict: false }) as { cargo?: string; view?: string };
  const cargoParam = search.cargo;
  const digitalView = search.view === "digital";
  const workspaceRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const node = workspaceRef.current;
    if (!node) return;
    const resize = () => node.style.setProperty("--pcac-available-height", `${Math.max(320, window.innerHeight - node.getBoundingClientRect().top - 12)}px`);
    const observer = new ResizeObserver(resize);
    observer.observe(document.documentElement);
    if (node.parentElement) observer.observe(node.parentElement);
    const shell = node.closest(".app-shell");
    const chromeObserver = new MutationObserver(resize);
    if (shell) chromeObserver.observe(shell, { attributes: true, attributeFilter: ["data-focus-mode", "class"] });
    document.addEventListener("fullscreenchange", resize);
    window.addEventListener("resize", resize);
    resize();
    return () => { observer.disconnect(); chromeObserver.disconnect(); document.removeEventListener("fullscreenchange", resize); window.removeEventListener("resize", resize); };
  }, [digitalView]);
  const [editalTab, setEditalTab] = React.useState(() =>
    typeof window !== "undefined" && window.location.hash === "#pcac-cronograma" ? "cronograma" : typeof window !== "undefined" && window.location.hash === "#pcac-legislacao-institucional" ? "leis" : "resumo",
  );
  React.useEffect(() => {
    const syncHash = () => {
      if (window.location.hash === "#pcac-cronograma") setEditalTab("cronograma");
      if (window.location.hash === "#pcac-legislacao-institucional") setEditalTab("leis");
    };
    window.addEventListener("hashchange", syncHash);
    syncHash();
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);
  const [shareFeedback, setShareFeedback] = React.useState("");
  const shareDigitalEdital = async () => {
    const url = new URL("/dashboard/pc-acre-edital?view=digital", window.location.origin).href;
    const data = { title: "Edital digital PC-AC 2026", text: "Consulte o edital digital PC-AC 2026", url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareFeedback("Link copiado!");
      } else {
        window.prompt("Copie o link do edital digital:", url);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      window.prompt("Copie o link do edital digital:", url);
    }
  };
  const navigate = useNavigate();
  const cargo = pcAcVerticalCargo(cargoParam);
  const [clockNow, setClockNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const timer = window.setInterval(() => setClockNow(new Date()), 1_000);
    return () => window.clearInterval(timer);
  }, []);
  const examDate = new Date(`${PCAC_EXAM_DATE}T00:00:00-05:00`);
  const remainingMs = Math.max(0, examDate.getTime() - clockNow.getTime());
  const daysToExam = Math.floor(remainingMs / 86_400_000);

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
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
            <Button size="sm" variant="outline" className="border-cyan-300/50 bg-cyan-400/15 text-white hover:bg-cyan-400/25" onClick={() => void shareDigitalEdital()} aria-label="Compartilhar edital digital">
              <Share2 className="mr-2 h-4 w-4" />{shareFeedback || "Compartilhar"}
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10" onClick={() => void navigate({ to: "/dashboard/pc-acre-edital", search: { cargo: cargo.id } })}>Voltar ao edital verticalizado</Button>
          </div>
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
    <div ref={workspaceRef} className="pcac-edital-page pcac-compact-workspace">
      <header className="pcac-command-bar">
        <svg className="pcac-command-bar__flag" viewBox="0 0 50 35" role="img" aria-label="Bandeira do Acre">
          <rect width="50" height="35" fill="#f5da25" />
          <path d="M0 35L50 0V35Z" fill="#078348" />
          <path d="M11 3.8l1.9 5.8h6.1l-4.9 3.6 1.9 5.8-5-3.6-5 3.6 1.9-5.8-4.9-3.6h6.1Z" fill="#ce2935" />
        </svg>
        <div className="pcac-command-bar__title">
          <span>POLÍCIA CIVIL DO ACRE · IDECAN</span>
          <h1>Edital PC-AC <small>001/2026</small></h1>
        </div>
        <label className="pcac-command-bar__cargo">
          <span>Seu cargo</span>
          <select value={cargo.id} onChange={(event) => void navigate({ to: "/dashboard/pc-acre-edital", search: { cargo: event.target.value as PcAcVerticalCargoId } })}>
            {pcAcVerticalCargos.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <div className="pcac-command-bar__actions">
          <Button variant="outline" asChild><Link to="/dashboard/inteligencia-idecan"><ScanSearch aria-hidden="true" className="h-4 w-4" /> Raio-X</Link></Button>
          <Button variant="secondary" onClick={() => void exportPdf()}><Download aria-hidden="true" className="h-4 w-4" /> PDF</Button>
        </div>
      </header>
      <div className="pcac-metrics" aria-label="Resumo do cargo e da preparação">
        <span><Users aria-hidden="true" /> <strong>{cargo.vagas}</strong> vagas · {cargo.salario}</span>
        <span><CheckCircle2 aria-hidden="true" /> <strong>{percent}%</strong> estudado</span>
        <span><CalendarClock aria-hidden="true" /> Prova 24/01/2027 · <strong>{daysToExam} dias</strong></span>
      </div>

      <Tabs
        value={editalTab}
        onValueChange={(next) => {
          setEditalTab(next);
          const url = new URL(window.location.href);
          url.hash = next === "cronograma" ? CRONOGRAMA_ANCHOR : next === "leis" ? LEGISLACAO_INSTITUCIONAL_ANCHOR : "";
          window.history.replaceState(window.history.state, "", url);
        }}
        className="pcac-edital-tabs pcac-astrix-section-tabs"
      >
        <TabsList className="pcac-edital-tabs__list" aria-label="Navegação pelas seções do edital">
          <TabsTrigger value="resumo"><BookOpenCheck aria-hidden="true" className="h-4 w-4" /> Visão geral</TabsTrigger>
          <TabsTrigger value="conteudo"><CheckCircle2 aria-hidden="true" className="h-4 w-4" /> Conteúdo e progresso</TabsTrigger>
          <TabsTrigger value="cronograma"><CalendarClock aria-hidden="true" className="h-4 w-4" /> Cronograma</TabsTrigger>
          <TabsTrigger value="leis"><Scale aria-hidden="true" className="h-4 w-4" /> Legislação</TabsTrigger>
        </TabsList>
        <TabsContent value="resumo" className="pcac-astrix-summary space-y-3">
      {cargo.id === "investigador" && (
        <Card className="pcac-edital-card pcac-astrix-focus-card border-amber-400/60">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base">Trilha de preparação · Oficial Investigador</CardTitle>
                <CardDescription>Quatro frentes prioritárias para organizar seus estudos.</CardDescription>
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
          <details className="pcac-astrix-focus-disclosure"><summary><span><strong>Prioridades para começar</strong><small>Disciplinas, assuntos e acesso rápido às questões</small></span><ChevronDown aria-hidden="true" className="h-4 w-4" /></summary><CardContent className="border-t border-amber-400/20 pt-4">
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
          </CardContent></details>
<details className="pcac-astrix-focus-disclosure"><summary><span><strong>Análise de incidência da banca</strong><small>Critérios de priorização e evidências do radar IDECAN</small></span><ChevronDown aria-hidden="true" className="h-4 w-4" /></summary><CardContent className="border-t border-amber-400/20 pt-4">
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
          </CardContent></details>
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

        </TabsContent>
        <TabsContent value="conteudo" className="space-y-5">

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

        </TabsContent>
        <TabsContent value="cronograma" className="pcac-astrix-outer-tab">
      <PcAcCronogramaCard cargo={cargo} userId={userId} />

        </TabsContent>
        <TabsContent value="leis" className="space-y-5">

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
        </TabsContent>
      </Tabs>
    </div>
  );
}
