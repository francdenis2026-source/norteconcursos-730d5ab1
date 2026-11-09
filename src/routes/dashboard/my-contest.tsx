import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpenText,
  ClipboardList,
  Calendar,
  ChevronRight,
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
import { ContestObjectivesShowcase } from "@/components/dashboard/ContestObjectivesShowcase";
import { MockService } from "@/services/mockService";
import { toast } from "sonner";
import type { Contest } from "@/types";
import "@/styles/contest-objectives-showcase.css";
import { StudyPlanningNav } from "@/components/dashboard/StudyPlanningNav";

export const Route = createFileRoute("/dashboard/my-contest")({ component: MyContestPage });
function MyContestPage() {
  const { focusedContest, contests, isLoading } = useDashboardData();
  const [activeContest, setActiveContest] = React.useState<Contest | undefined>(focusedContest);
  const [savingContestId, setSavingContestId] = React.useState<string | null>(null);
  React.useEffect(() => setActiveContest(focusedContest), [focusedContest?.id]);
  const selectContest = async (contest: Contest) => {
    setSavingContestId(contest.id);
    try {
      await MockService.setFocusedContest(contest.id);
      setActiveContest(contest);
      toast.success("Seu objetivo principal foi atualizado.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar seu objetivo.");
    } finally {
      setSavingContestId(null);
    }
  };
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
  const matches = activeContest
    ? filterEditalEditions(editions.data ?? [], "").filter(
        (e) =>
          editalFold(e.contest_name) === editalFold(activeContest.agency) &&
          editalFold(e.role_name) === editalFold(activeContest.role),
      )
    : [];
  const days = activeContest?.examDate
    ? Math.ceil((new Date(activeContest.examDate).getTime() - platformDate().getTime()) / 86400000)
    : null;
  return (
    <div className="edital-workspace space-y-5">
      <StudyPlanningNav active="objective" />
      <div className="contest-objectives-page">
        <ContestObjectivesShowcase
          focusedContest={activeContest}
          contests={contests}
          onSelect={(contest) => void selectContest(contest)}
          savingId={savingContestId}
        />
      </div>
      {days !== null && Number.isFinite(days) && days < 0 && (
        <p className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
          <Calendar className="h-4 w-4 shrink-0" />A data da prova cadastrada já passou. Atualize o
          seu objetivo se a data mudou.
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
            {activeContest
              ? "Não encontramos uma edição vinculada exatamente a este concurso e cargo. Consulte o catálogo para localizar as opções disponíveis."
              : "Escolha uma edição no catálogo de editais para consultar o programa de estudo."}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <Button asChild variant={activeContest ? "default" : "outline"}>
            <Link to="/dashboard/edital">
              <BookOpenText className="mr-2 h-4 w-4" />
              Estudar pelo edital
            </Link>
          </Button>
          <Button asChild variant={activeContest ? "outline" : "default"}>
            <Link to="/dashboard/questions">
              {activeContest ? "Trocar meu concurso" : "Escolher meu concurso"}
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
