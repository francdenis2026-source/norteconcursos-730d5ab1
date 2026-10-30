import { createFileRoute } from "@tanstack/react-router";
import { Volume2 } from "lucide-react";
import { QuestionAudioButton } from "@/components/dashboard/QuestionAudioButton";
import { useAuthStatus } from "@/hooks/useDashboard";
import { PageHero } from "@/components/dashboard/PageHero";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/dashboard/admin-voice-studio")({
  component: AdminVoiceStudioPage,
});

function AdminVoiceStudioPage() {
  const { isAdmin, isLoading } = useAuthStatus();
  if (isLoading) return <p role="status" className="p-6 text-muted-foreground">Verificando acesso…</p>;
  if (!isAdmin) return <p className="p-6 text-muted-foreground">Acesso restrito à administração.</p>;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Administração · acessibilidade"
        icon={Volume2}
        title={
          <>
            Leitura em <em>voz alta</em>
          </>
        }
        description="A leitura das questões usa apenas a voz padrão do navegador, em todos os planos. A disponibilidade e as vozes em português dependem do dispositivo."
      />
      <Card>
        <CardContent className="p-5">
          <QuestionAudioButton text="Teste de leitura em voz alta da Norte Concursos." />
        </CardContent>
      </Card>
    </div>
  );
}
