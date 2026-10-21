import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  BookOpenText,
  Calendar,
  CalendarClock,
  ChevronRight,
  ClipboardList,
  Radar,
  Target,
} from "lucide-react";
import { useAuthStatus, useDashboardData } from "@/hooks/useDashboard";
import { supabase } from "@/integrations/supabase/client";
import { fetchAllRows } from "@/lib/catalog";
import {
  editalFold,
  editalSourceLabel,
  filterEditalEditions,
  type EditalEdition,
} from "@/lib/editalCatalog";
import { platformDate } from "@/lib/platformClock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NEXT_STEPS = [
  {
    to: "/dashboard/edital-radar",
    title: "Radar do edital",
    text: "O que mais cai e o que tende a cair no seu edital.",
    icon: Radar,
  },
  {
    to: "/dashboard/exam-panorama",
    title: "Panorama das provas",
    text: "O peso de cada disciplina nas provas já realizadas.",
    icon: BarChart3,
  },
  {
    to: "/dashboard/cronograma",
    title: "Cronograma por edital",
    text: "Disciplinas e tópicos distribuídos até a prova.",
    icon: CalendarClock,
  },
  {
    to: "/dashboard/study-plan",
    title: "Plano por resultados",
    text: "Prioridades a partir das provas que você já fez.",
    icon: ClipboardList,
  },
] as const;

export const Route = createFileRoute("/dashboard/my-contest")({ component: MyContestPage });
function MyContestPage() {
  const { focusedContest, isLoading } = useDashboardData();
  const { user } = useAuthStatus();
  const editions = useQuery({
    queryKey: ["my-contest-editions", user?.id],
    enabled: !!user && user.id !== "demo-user",
    queryFn: () =>
      fetchAllRows<EditalEdition>((from, to) =>
        supabase
          .from("syllabus_editions")
          .select(
            "id,contest_name,role_name,contest_year,exam_board,status,source:content_sources(title,url,source_type,status)",
          )
          .in("status", ["active", "archived"])
          .order("id")
          .range(from, to)
          .returns<EditalEdition[]>(),
      ),
    staleTime: 300_000,
  });
  if (isLoading) return <p role="status">Carregando seu concurso…</p>;
  const matches = focusedContest
    ? filterEditalEditions(editions.data ?? [], "").filter(
        (e) =>
          editalFold(e.contest_name) === editalFold(focusedContest.agency) &&
          editalFold(e.role_name) === editalFold(focusedContest.role),
      )
    : [];
  const days = focusedContest?.examDate
    ? Math.ceil((new Date(focusedContest.examDate).getTime() - platformDate().getTime()) / 86400000)
    : null;
  return (
    <div className="edital-workspace space-y-5">
      <header className="edital-heading workspace-banner">
        <div>
          <span className="edital-eyebrow">SEU OBJETIVO</span>
          <h1>{focusedContest?.agency || "Meu concurso"}</h1>
          <p>
            {focusedContest
              ? `${focusedContest.role} · ${focusedContest.examBoard}`
              : "Defina o concurso que orienta sua preparação."}
          </p>
        </div>
        <Target className="edital-heading-icon" />
      </header>
      {days !== null && Number.isFinite(days) && (
        <p className="flex items-center gap-2 rounded-xl border p-4">
          <Calendar className="h-5 w-5" />
          {days >= 0
            ? `${days} dias para a data da prova cadastrada`
            : "A data da prova cadastrada já passou"}
        </p>
      )}
      <section className="edital-catalog">
        <div>
          <h2>Programa e documentos do concurso</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Consulte a edição e o cargo antes de escolher seus assuntos de estudo.
          </p>
        </div>
        {editions.isLoading && <p role="status">Consultando edições…</p>}
        {editions.isError && (
          <p role="status">
            Não foi possível consultar as edições.{" "}
            <Button variant="outline" onClick={() => void editions.refetch()}>
              Tentar novamente
            </Button>
          </p>
        )}
        <div className="edital-editions">
          {matches.map((e) => (
            <Link
              to="/dashboard/edital"
              search={{ edition: e.id }}
              key={e.id}
              className="edital-edition"
            >
              <Badge variant="outline">
                {e.contest_year} · {e.status === "archived" ? "Arquivado" : editalSourceLabel(e)}
              </Badge>
              <h3>{e.role_name}</h3>
              <span className="flex items-center gap-2 text-sm">
                Abrir programa <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
        {!matches.length && !editions.isLoading && (
          <p className="text-sm text-muted-foreground">
            {focusedContest
              ? "Não encontramos uma edição vinculada exatamente a este concurso e cargo. Consulte o catálogo para localizar as opções disponíveis."
              : "Escolha uma edição no catálogo de editais para consultar o programa de estudo."}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <Button asChild variant={focusedContest ? "default" : "outline"}>
            <Link to="/dashboard/edital">
              <BookOpenText className="mr-2 h-4 w-4" />
              Ver todos os editais
            </Link>
          </Button>
          <Button asChild variant={focusedContest ? "outline" : "default"}>
            <Link to="/dashboard/questions">
              {focusedContest ? "Trocar meu concurso" : "Escolher meu concurso"}
            </Link>
          </Button>
        </div>
      </section>
      <section aria-labelledby="my-contest-next" className="space-y-3">
        <h2 id="my-contest-next" className="text-lg font-black">
          Próximos passos
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {NEXT_STEPS.map(({ to, title, text, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex gap-3 rounded-2xl border bg-card p-4 transition-colors hover:bg-muted/60"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <strong className="block text-sm">{title}</strong>
                <small className="text-xs text-muted-foreground">{text}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
