import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  CircleAlert,
  ExternalLink,
  Headphones,
  Loader2,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Volume2,
  Wifi,
} from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/dashboard/PageHero";
import { useAuthStatus } from "@/hooks/useDashboard";

export const Route = createFileRoute("/dashboard/admin-voice-studio")({
  component: AdminVoiceStudioPage,
  head: () => ({
    meta: [
      { title: "Leitura em voz alta | Administração" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

type Status = {
  configured: boolean;
  endpointHost: string | null;
  model: string;
  voice: string;
  health: { status: string; device?: string; version?: string } | null;
  modelCount: number;
  installedModels: number;
  checkedAt: string;
};

function AdminVoiceStudioPage() {
  const { isAdmin, isLoading: authLoading } = useAuthStatus();
  const [status, setStatus] = React.useState<Status | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [testText, setTestText] = React.useState("Teste de leitura em voz alta da Norte Concursos.");
  const [testLoading, setTestLoading] = React.useState(false);
  const [testError, setTestError] = React.useState<string | null>(null);
  const [testAudioUrl, setTestAudioUrl] = React.useState<string | null>(null);

  const loadStatus = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/voice-studio-admin", { cache: "no-store" });
      if (!response.ok) throw new Error("Não foi possível consultar o VoiceStudio.");
      setStatus((await response.json()) as Status);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Falha ao consultar a integração.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (isAdmin) void loadStatus();
  }, [isAdmin, loadStatus]);

  React.useEffect(() => () => {
    if (testAudioUrl) URL.revokeObjectURL(testAudioUrl);
  }, [testAudioUrl]);

  const runVoiceTest = async () => {
    const text = testText.trim();
    if (!text) {
      setTestError("Digite uma frase para testar.");
      return;
    }
    setTestLoading(true);
    setTestError(null);
    if (testAudioUrl) URL.revokeObjectURL(testAudioUrl);
    setTestAudioUrl(null);
    try {
      const response = await fetch("/api/voice-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string; detail?: string } | null;
        throw new Error(payload?.error ?? "O VoiceStudio não respondeu ao teste.");
      }
      setTestAudioUrl(URL.createObjectURL(await response.blob()));
    } catch (cause) {
      setTestError(cause instanceof Error ? cause.message : "Não foi possível gerar o áudio.");
    } finally {
      setTestLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  if (!isAdmin) {
    return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;
  }

  const online = status?.health?.status === "ok";
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Administração · Acessibilidade"
        icon={Headphones}
        title={
          <>
            Leitura <em>em voz alta</em>
          </>
        }
        description="Gerencie a conexão do VoiceStudio usada para ler questões, alternativas e materiais para os alunos."
        actions={
          <Button
            className="hero-btn-ghost gap-2"
            onClick={() => void loadStatus()}
            disabled={loading}
          >
            <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} aria-hidden />
            Atualizar status
          </Button>
        }
      />

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <StatusCard
          icon={Settings2}
          label="Configuração"
          value={status?.configured ? "Configurada" : "Pendente"}
          tone={status?.configured ? "success" : "warning"}
          detail={status?.endpointHost ?? "Defina VOICESTUDIO_API_URL no servidor"}
        />
        <StatusCard
          icon={Wifi}
          label="Serviço"
          value={online ? "Servidor online" : "Offline"}
          tone={online && status?.installedModels ? "success" : "warning"}
          detail={
            status?.health
              ? `VoiceStudio ${status.health.version ?? ""} · ${status.health.device ?? "dispositivo não informado"}`
              : "Ainda não respondeu ao health check"
          }
        />
        <StatusCard
          icon={Volume2}
          label="Modelos instalados"
          value={String(status?.installedModels ?? 0)}
          tone={status?.installedModels ? "success" : "warning"}
          detail={status ? status.installedModels === 0 ? "Voz natural indisponível: instale um modelo no VoiceStudio." : `${status.modelCount} modelos catalogados; confirme o modelo ativo no teste abaixo.` : "Consultando catálogo"}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Configuração ativa</CardTitle>
            <CardDescription>
              Os valores são controlados no ambiente do servidor e não ficam expostos ao aluno.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <ConfigRow label="Modelo padrão" value={status?.model ?? "—"} />
            <ConfigRow label="Voz padrão" value={status?.voice ?? "—"} />
            <ConfigRow label="Endpoint" value={status?.endpointHost ?? "Não configurado"} />
            <div className="rounded-xl border border-amber-400/40 bg-amber-50 p-4 text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
              <p className="font-semibold">Como habilitar</p>
              <p className="mt-1 leading-6">
                Configure <code>VOICESTUDIO_API_URL</code>, instale um modelo com licença compatível
                e aceite a licença no VoiceStudio. Depois, use “Atualizar status”.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operação</CardTitle>
            <CardDescription>Controles rápidos para acompanhar a funcionalidade.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 rounded-xl border p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" aria-hidden />
              <div>
                <p className="font-semibold">Uso controlado</p>
                <p className="text-sm leading-5 text-muted-foreground">
                  A URL do serviço e os modelos ficam apenas no servidor.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border p-4">
              <Headphones className="mt-0.5 h-5 w-5 text-primary" aria-hidden />
              <div>
                <p className="font-semibold">Ponto de uso</p>
                <p className="text-sm leading-5 text-muted-foreground">
                  O botão aparece no Treinador, ao lado do título da questão. Enquanto o VoiceStudio
                  não está conectado, a voz nativa em português do navegador é usada
                  automaticamente.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full gap-2">
              <Link to="/dashboard/question-trainer">
                <Volume2 className="h-4 w-4" /> Abrir Treinador
              </Link>
            </Button>
            <a
              className="flex items-center justify-center gap-2 text-sm text-primary underline"
              href="https://github.com/debpalash/VoiceStudio"
              target="_blank"
              rel="noreferrer"
            >
              Documentação do VoiceStudio <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Volume2 className="h-5 w-5 text-primary" aria-hidden="true" /> Testar leitura em voz alta</CardTitle>
          <CardDescription>
            Use o mesmo caminho de áudio dos alunos para confirmar se o VoiceStudio está online e com
            um modelo instalado.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={testText}
            onChange={(event) => setTestText(event.target.value)}
            maxLength={4096}
            rows={3}
            aria-label="Texto para teste de voz"
            className="w-full resize-y rounded-xl border bg-background px-3 py-2 text-sm leading-6 outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" onClick={() => void runVoiceTest()} disabled={testLoading} className="gap-2">
              {testLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
              {testLoading ? "Gerando áudio…" : "Gerar teste de voz"}
            </Button>
            {testAudioUrl && <audio controls preload="metadata" src={testAudioUrl} aria-label="Resultado do teste de voz" />}
          </div>
          {testError && (
            <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {testError} Verifique se o Render está online, se o modelo OmniVoice foi instalado e se a licença foi aceita.
            </p>
          )}
          {!testError && testAudioUrl && <p role="status" className="text-sm text-emerald-700 dark:text-emerald-300">Áudio gerado com sucesso. O serviço de voz respondeu.</p>}
        </CardContent>
      </Card>

      {status?.checkedAt && (
        <p className="text-xs text-muted-foreground">
          Última verificação: {new Date(status.checkedAt).toLocaleString("pt-BR")}
        </p>
      )}
    </div>
  );
}

function StatusCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  detail: string;
  tone: "success" | "warning";
}) {
  const GoodIcon = tone === "success" ? CheckCircle2 : CircleAlert;
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <Icon className="h-5 w-5 text-primary" aria-hidden />
          <GoodIcon
            className={tone === "success" ? "h-4 w-4 text-emerald-600" : "h-4 w-4 text-amber-600"}
            aria-hidden
          />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-2xl font-black">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}

function ConfigRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b pb-3 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <Badge variant="outline" className="max-w-[65%] truncate font-mono text-[11px]">
        {value}
      </Badge>
    </div>
  );
}
