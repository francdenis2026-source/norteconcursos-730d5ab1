import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, ChevronRight, FileText } from "lucide-react";
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
import { userStorageKey } from "@/lib/userStorage";

export const Route = createFileRoute("/dashboard/my-contest")({ component: MyContestPage });

function MyContestPage() {
  const { focusedContest, contests, isLoading } = useDashboardData();
  const [activeContest, setActiveContest] = React.useState<Contest | undefined>(focusedContest);
  const [savingContestId, setSavingContestId] = React.useState<string | null>(null);
  React.useEffect(() => setActiveContest(focusedContest), [focusedContest]);

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

  const clearContest = async () => {
    setSavingContestId(activeContest?.id ?? "clear");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Entre na sua conta para alterar seu objetivo.");
      const { error } = await supabase
        .from("profiles")
        .update({ focused_contest_id: null })
        .eq("id", session.user.id);
      if (error) throw error;
      try { localStorage.removeItem(userStorageKey("norte_focused_contest")); } catch { /* cache opcional */ }
      setActiveContest(undefined);
      toast.success("Objetivo desmarcado. Os demais concursos foram desbloqueados.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível desmarcar o objetivo.");
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
          .select("id,contest_name,role_name,contest_year,exam_board,status,source:content_sources(title,url,source_type,status)")
          .in("status", ["active", "archived"])
          .order("id")
          .range(from, to)
          .returns<EditalEdition[]>(),
      ),
    staleTime: 300_000,
  });

  if (isLoading) return <p role="status">Carregando seu concurso…</p>;

  const matches = activeContest
    ? filterEditalEditions(editions.data ?? [], "").filter((edition) =>
        editalFold(edition.contest_name) === editalFold(activeContest.agency) &&
        editalFold(edition.role_name) === editalFold(activeContest.role),
      )
    : [];

  const days = activeContest?.examDate
    ? Math.ceil((new Date(activeContest.examDate).getTime() - platformDate().getTime()) / 86400000)
    : null;

  return (
    <div className="edital-workspace my-contest-one-window">
      <StudyPlanningNav active="objective" />
      <div className="contest-objectives-page">
        <ContestObjectivesShowcase
          focusedContest={activeContest}
          contests={contests}
          onSelect={(contest) => void selectContest(contest)}
          savingId={savingContestId}
          onClear={() => void clearContest()}
        />
      </div>

      {days !== null && Number.isFinite(days) && days < 0 && (
        <p className="my-contest-expired" role="status">
          <Calendar aria-hidden="true" />
          A data da prova cadastrada já passou. Atualize seu objetivo se a data mudou.
        </p>
      )}

      <section className="edital-catalog" aria-labelledby="my-contest-edital-title">
        <div className="edital-catalog__heading">
          <div>
            <h2 id="my-contest-edital-title">Edital e programa de estudo</h2>
            <p>{activeContest ? "Edições vinculadas ao cargo selecionado." : "Defina um cargo para visualizar o programa correspondente."}</p>
          </div>
          {activeContest && <Badge variant="outline">Cargo ativo</Badge>}
        </div>

        {editions.isLoading && <p className="edital-catalog__message" role="status">Consultando edições vinculadas…</p>}
        {editions.isError && (
          <div className="edital-catalog__message" role="status">
            <span>Não foi possível consultar as edições.</span>
            <Button size="sm" variant="outline" onClick={() => void editions.refetch()}>Tentar novamente</Button>
          </div>
        )}

        {!editions.isLoading && !editions.isError && activeContest && matches.length > 0 && (
          <ul className="edital-catalog__list">
            {matches.slice(0, 3).map((edition) => (
              <li key={edition.id}>
                <div className="edital-catalog__edition-info">
                  <FileText aria-hidden="true" />
                  <div>
                    <strong>{edition.contest_year} · {edition.role_name}</strong>
                    <span>{editalSourceLabel(edition)}{edition.exam_board ? ` · ${edition.exam_board}` : ""}</span>
                  </div>
                </div>
                <Link to="/dashboard/edital" search={{ edition: edition.id }} className="edital-catalog__open">
                  Abrir programa <ChevronRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!editions.isLoading && !editions.isError && activeContest && matches.length === 0 && (
          <p className="edital-catalog__message">
            Ainda não há uma edição vinculada exatamente a este cargo. O objetivo continua ativo; o catálogo de outros concursos permanece bloqueado.
          </p>
        )}

        {!activeContest && (
          <p className="edital-catalog__message">Quando você definir um cargo, o edital e os assuntos correspondentes aparecerão aqui.</p>
        )}
      </section>
    </div>
  );
}
