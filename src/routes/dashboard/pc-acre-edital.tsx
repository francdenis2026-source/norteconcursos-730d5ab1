import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  Download,
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
} from "@/data/pcAcreVerticalizado";
import {
  pcAcVerticalCargo,
  pcAcVerticalCounts,
  pcAcVerticalItemId,
  readPcAcVerticalProgress,
  writePcAcVerticalProgress,
  type PcAcVerticalStatus,
} from "@/lib/pcAcreVerticalizado";
import { pcAcDisciplineLink } from "@/lib/pcAcreVerticalLinks";

const LEGISLACAO_INSTITUCIONAL_ANCHOR = "pcac-legislacao-institucional";

export const Route = createFileRoute("/dashboard/pc-acre-edital")({
  component: PcAcreEditalVerticalizadoPage,
  validateSearch: (s: Record<string, unknown>): { cargo?: string | undefined } => ({
    cargo: typeof s["cargo"] === "string" ? s["cargo"] : undefined,
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
}: {
  status: PcAcVerticalStatus | undefined;
  onClick: () => void;
}) {
  const label =
    status === "estudado" ? "Estudado" : status === "a-estudar" ? "A estudar" : "Pendente";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!status}
      className={
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition-colors " +
        (status === "estudado"
          ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
          : status === "a-estudar"
            ? "border-amber-500/50 bg-amber-500/15 text-amber-700 dark:text-amber-400"
            : "border-muted-foreground/30 bg-muted/40 text-muted-foreground")
      }
    >
      {status === "estudado" && <CheckCircle2 className="h-3.5 w-3.5" />}
      {label}
    </button>
  );
}

/** Liga o assunto ao material que já existe na plataforma (teoria e questões por disciplina)
 * ou, quando o assunto é só legislação institucional, aponta para a seção abaixo na própria
 * página. Assuntos sem correspondência confiável não recebem link. */
function DisciplineStudyLinks({ disciplineId }: { disciplineId: string }) {
  const link = pcAcDisciplineLink(disciplineId);
  if (!link) return null;
  const linkClass =
    "inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10";
  if (link.anchor)
    return (
      <a href={`#${link.anchor}`} className={`mt-2 ${linkClass}`}>
        <Scale className="h-3 w-3" aria-hidden="true" />
        Ver leis institucionais abaixo
      </a>
    );
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {link.subjects!.map((subject) => (
        <React.Fragment key={subject}>
          <Link
            to="/dashboard/library"
            search={{ collection: "subjects", discipline: subject }}
            className={linkClass}
          >
            <BookOpen className="h-3 w-3" aria-hidden="true" />
            Teoria{link.subjects!.length > 1 ? `: ${subject}` : ""}
          </Link>
          <Link to="/dashboard/question-trainer" search={{ subject }} className={linkClass}>
            <BrainCircuit className="h-3 w-3" aria-hidden="true" />
            Questões{link.subjects!.length > 1 ? `: ${subject}` : ""}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}

function PcAcreEditalVerticalizadoPage() {
  const { user } = useAuthStatus();
  const userId = user?.id ?? "guest";
  const { cargo: cargoParam } = Route.useSearch();
  const navigate = Route.useNavigate();
  const cargo = pcAcVerticalCargo(cargoParam);

  const [progress, setProgress] = React.useState<Record<string, PcAcVerticalStatus>>({});

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setProgress(readPcAcVerticalProgress(window.localStorage, userId, cargo.id));
  }, [userId, cargo.id]);

  const toggle = (block: string, disciplineId: string) => {
    const itemId = pcAcVerticalItemId(block, disciplineId);
    setProgress((prev) => {
      const next = { ...prev };
      const nextValue = nextStatus(prev[itemId]);
      if (nextValue) next[itemId] = nextValue;
      else delete next[itemId];
      if (typeof window !== "undefined")
        writePcAcVerticalProgress(window.localStorage, userId, cargo.id, next);
      return next;
    });
  };

  const counts = pcAcVerticalCounts(cargo, progress);
  const percent = counts.total ? Math.round((counts.estudado / counts.total) * 100) : 0;

  const exportPdf = async () => {
    const { generatePcAcVerticalPdf } = await import("@/lib/pcAcreVerticalPdf");
    generatePcAcVerticalPdf(cargo, progress);
  };

  return (
    <div className="space-y-5 pb-10">
      <PageHero
        image="careers-team"
        kicker="ÁREA PROFISSIONAL · PC DO ACRE"
        icon={ShieldCheck}
        title="Edital verticalizado — PC-AC 001/2026"
        description="Marque o que já estudou, acompanhe o progresso por cargo e exporte seu edital verticalizado em PDF. Conteúdo organizado a partir do Edital nº 001 SEAD/PCAC, banca IDECAN."
        actions={
          <Button variant="secondary" onClick={() => void exportPdf()}>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        }
      >
        <div className="page-hero__stats">
          <HeroStat icon={Users} label="Vagas" value={cargo.vagas} />
          <HeroStat icon={BookOpenCheck} label="Disciplinas" value={counts.total} />
          <HeroStat icon={CheckCircle2} label="Estudado" value={`${percent}%`} />
        </div>
      </PageHero>

      <Card>
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
                onClick={() => void navigate({ search: { cargo: item.id as PcAcVerticalCargoId } })}
                className={
                  "flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors " +
                  (active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background/50 text-foreground hover:bg-muted/60")
                }
              >
                <span className="text-xs font-bold leading-snug">{item.label}</span>
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

      <Card>
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
                      <li
                        key={discipline.id}
                        className="flex flex-wrap items-start justify-between gap-2 rounded-lg border bg-background/60 p-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{discipline.name}</p>
                          {discipline.note && (
                            <p className="mt-1 text-xs text-muted-foreground">{discipline.note}</p>
                          )}
                          <DisciplineStudyLinks disciplineId={discipline.id} />
                        </div>
                        <StatusButton
                          status={progress[pcAcVerticalItemId(block.title, discipline.id)]}
                          onClick={() => toggle(block.title, discipline.id)}
                        />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card id={LEGISLACAO_INSTITUCIONAL_ANCHOR} className="scroll-mt-20">
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
