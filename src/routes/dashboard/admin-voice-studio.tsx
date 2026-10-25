import { createFileRoute } from "@tanstack/react-router";
import { QuestionAudioButton } from "@/components/dashboard/QuestionAudioButton";
import { useAuthStatus } from "@/hooks/useDashboard";

export const Route = createFileRoute("/dashboard/admin-voice-studio")({
  component: AdminVoiceStudioPage,
});

function AdminVoiceStudioPage() {
  const { isAdmin, isLoading } = useAuthStatus();
  if (isLoading) return <p role="status">Verificando acesso…</p>;
  if (!isAdmin) return <p>Acesso restrito à administração.</p>;
  return <section className="space-y-4 rounded-2xl border bg-card p-5">
    <header className="workspace-banner"><span className="workspace-banner__kicker">Administração · acessibilidade</span>
    <h1 className="text-xl font-bold">Leitura em voz alta</h1>
    <p className="text-sm text-muted-foreground">A leitura das questões usa apenas a voz padrão do navegador, em todos os planos. A disponibilidade e as vozes em português dependem do dispositivo.</p>
    </header>
    <QuestionAudioButton text="Teste de leitura em voz alta da Norte Concursos." />
  </section>;
}
