import "@/styles/question-workspace.css";
import { PlanGate } from "@/components/dashboard/PlanGate";
import { useAuthStatus } from "@/hooks/useDashboard";
import { StudyLaterNotebook } from "@/components/dashboard/StudyLaterNotebook";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { PageHero } from "@/components/dashboard/PageHero";
import { AiResolutionsSection } from "@/components/dashboard/AiResolutionsSection";

export const Route = createFileRoute("/dashboard/notebooks")({
  component: () => (
    <PlanGate feature="notebooks" title="Cadernos de estudo">
      <NotebooksPage />
    </PlanGate>
  ),
});

function NotebooksPage() {
  const { user } = useAuthStatus();
  const owner = user?.id && user.id !== "demo-user" ? user.id : null;

  return (
    <div className="question-workspace question-collections">
      <PageHero
        image="study-desk"
        kicker="Questões"
        icon={BookOpen}
        title={
          <>
            Caderno de <em>estudo</em>
          </>
        }
        description="Reveja as questões que você guardou ou pulou no treinador."
      />

      {owner && <StudyLaterNotebook key={owner} userId={owner} />}

      <AiResolutionsSection />
    </div>
  );
}
