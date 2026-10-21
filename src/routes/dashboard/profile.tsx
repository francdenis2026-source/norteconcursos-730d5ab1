import { acreDate } from "@/lib/acreTime";
import React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuthStatus } from "@/hooks/useDashboard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MockService } from "@/services/mockService";
import {
  User,
  Mail,
  CreditCard,
  Shield,
  LogOut,
  ExternalLink,
  Zap,
  RefreshCw,
  History as HistoryIcon,
} from "lucide-react";
import { PageHero } from "@/components/dashboard/PageHero";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { CancelSubscriptionDialog } from "@/components/dashboard/CancelSubscriptionDialog";
import { useMyCancellations } from "@/hooks/useCancellations";
import { emailStatusLabel, isPaidSubscriber, scheduledCancellation } from "@/lib/cancellation";
import { PlanStatusCard } from "@/components/dashboard/PlanStatusCard";
import { AvatarUploader } from "@/components/dashboard/AvatarUploader";
import { normalizeUppercase } from "@/lib/utils";
import { createPortalSession } from "@/lib/stripe.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [{ title: "Meu Perfil | Norte Concurso" }],
  }),
});

function ProfilePage() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthStatus();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const cancellations = useMyCancellations(user?.id);
  const scheduled = scheduledCancellation(cancellations.list);
  const paid = !!user && isPaidSubscriber(user.subscription_tier, user.subscription_expires_at, user.on_trial);
  const [auditLogs, setAuditLogs] = React.useState<import("@/types").SubscriptionAuditLog[]>([]);

  const portal = useServerFn(createPortalSession);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    newEmail: "",
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        newEmail: "",
      });
    }
    const loadAudit = async () => {
      const logs = await MockService.getSubscriptionAuditLogs();
      setAuditLogs(logs);
    };
    loadAudit();
  }, [user]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      if (!user) throw new Error("Entre novamente para atualizar seus dados.");
      const normalizedName = normalizeUppercase(formData.name.trim());
      const { error } = await supabase.auth.updateUser({
        data: { full_name: normalizedName, name: normalizedName },
      });
      if (error) throw error;
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: normalizedName })
        .eq("id", user.id);
      if (profileError) throw profileError;
      setFormData((previous) => ({ ...previous, name: normalizedName }));
      toast.success("Nome atualizado com sucesso!");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar nome");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newEmail === formData.email) {
      toast.error("O novo e-mail deve ser diferente do atual.");
      return;
    }
    setIsVerifying(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.newEmail,
      });
      if (error) throw error;
      toast.info(
        "Um link de confirmação foi enviado para o novo e-mail. A alteração só será efetivada após a confirmação.",
      );
      setFormData((prev) => ({ ...prev, newEmail: "" }));
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Erro ao solicitar troca de e-mail");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut({ scope: "local" });
    await navigate({ to: "/", replace: true });
  };

  const handleOpenBillingPortal = async () => {
    setIsRedirecting(true);
    try {
      const { url } = await portal();
      if (url) window.location.href = url;
    } catch (error) {
      toast.error("Erro ao abrir portal de cobrança");
    } finally {
      setIsRedirecting(false);
    }
  };

  const handleCancelled = (
    record: { receipt_number: string; effective_until: string },
    emailStatus: string,
  ) => {
    void cancellations.refresh();
    toast.success(
      `Cancelamento agendado (recibo ${record.receipt_number}). Seu plano continua até ${new Date(record.effective_until).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" })}.`,
    );
    if (emailStatus === "enviado") toast.info("Enviamos a confirmação para o seu e-mail.");
    else
      toast.info("O e-mail de confirmação não foi enviado agora; o recibo está no seu histórico.");
  };

  if (isLoading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHero
        image="auth"
        kicker="Conta"
        icon={User}
        title={
          <>
            Meu <em>perfil</em>
          </>
        }
        description="Gerencie suas informações pessoais, plano e assinatura."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>Mantenha seus dados de contato atualizados.</CardDescription>
          </CardHeader>
          <CardContent>
            {user && (
              <AvatarUploader userId={user.id} name={user.full_name ?? ""} url={user.avatar_url} />
            )}
            <form onSubmit={handleUpdateName} className="space-y-4 pb-6 border-b">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: normalizeUppercase(e.target.value) })
                    }
                    className="pl-9 uppercase"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Salvando..." : "Atualizar Nome"}
              </Button>
            </form>

            <form onSubmit={handleUpdateEmail} className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label>E-mail Atual</Label>
                <div className="relative opacity-60">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input value={formData.email} readOnly disabled className="pl-9 bg-muted" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newEmail">Novo E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="newEmail"
                    type="email"
                    placeholder="Digite o novo e-mail"
                    value={formData.newEmail}
                    onChange={(e) => setFormData({ ...formData, newEmail: e.target.value })}
                    className="pl-9"
                    required
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  * Você receberá um e-mail de confirmação no novo endereço para validar a troca.
                </p>
              </div>
              <Button type="submit" variant="secondary" disabled={isVerifying}>
                {isVerifying ? "Processando..." : "Solicitar Troca de E-mail"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <PlanStatusCard />

        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-secondary" />
                Planos e Assinatura
              </CardTitle>
              <CardDescription>
                Escolha o plano que melhor se adapta ao seu ritmo de estudos.
              </CardDescription>
            </div>
            {user?.subscription_tier !== "free" && (
              <Button
                variant="outline"
                size="sm"
                className="flex gap-2"
                onClick={handleOpenBillingPortal}
                disabled={isRedirecting}
              >
                <ExternalLink className="h-4 w-4" />
                Gerenciar Assinatura
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              O plano em vigor e o prazo aparecem em <strong>Seu plano</strong>, acima. Para
              comparar o que cada plano oferece e acompanhar o uso, abra{" "}
              <Link
                to="/dashboard/subscriptions"
                className="font-semibold text-primary hover:underline"
              >
                Plano e uso
              </Link>
              .
            </p>

            <div className="mt-6 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-emerald-500" />
                <div className="text-sm">
                  <p className="font-medium">Assinatura Segura</p>
                  <p className="text-muted-foreground text-xs">
                    Sua conexão usa HTTPS. O acesso aos dados da conta é protegido por autenticação
                    e permissões.
                  </p>
                </div>
              </div>
              {scheduled ? (
                <p className="text-xs text-muted-foreground">
                  Cancelamento agendado: seu plano continua até{" "}
                  {new Date(scheduled.effective_until).toLocaleDateString("pt-BR", {
                    timeZone: "America/Rio_Branco",
                  })}
                  .
                </p>
              ) : (
                paid && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive/70 hover:text-destructive hover:bg-destructive/10 text-[10px]"
                    onClick={() => setCancelOpen(true)}
                  >
                    Cancelar Plano
                  </Button>
                )
              )}
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" /> Sair da Conta
              </Button>
            </div>
          </CardContent>
        </Card>

        {auditLogs.length > 0 && (
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HistoryIcon className="h-5 w-5 text-primary" />
                Histórico de Assinatura
              </CardTitle>
              <CardDescription>Eventos importantes relacionados ao seu plano.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium capitalize">
                        {log.event_type.replace("_", " ")}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {acreDate(log.created_at).toLocaleString("pt-BR", {
                          timeZone: "America/Rio_Branco",
                        })}
                      </span>
                      {typeof log.metadata?.["reason"] === "string" && (
                        <span className="text-[9px] text-rose-500/80 mt-0.5 italic">
                          Motivo: {String(log.metadata?.["reason"])}
                        </span>
                      )}
                    </div>
                    <Badge variant="outline" className="uppercase text-[9px]">
                      {log.new_tier}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        {cancellations.list.length > 0 && (
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HistoryIcon className="h-5 w-5 text-primary" />
                Cancelamentos e recibos
              </CardTitle>
              <CardDescription>
                Cada cancelamento gera um recibo que você pode consultar e imprimir.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {cancellations.list.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 last:border-0"
                >
                  <div className="text-sm">
                    <p className="font-semibold">
                      {c.receipt_number} · Plano {c.plan_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Pedido em{" "}
                      {acreDate(c.requested_at).toLocaleString("pt-BR", {
                        timeZone: "America/Rio_Branco",
                      })}{" "}
                      · vale até{" "}
                      {new Date(c.effective_until).toLocaleDateString("pt-BR", {
                        timeZone: "America/Rio_Branco",
                      })}{" "}
                      · e-mail: {emailStatusLabel[c.email_status]}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/dashboard/cancellation-receipt/$id" params={{ id: c.id }}>
                      Ver recibo
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
      <CancelSubscriptionDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        planName={SUBSCRIPTION_PLANS.find((p) => p.id === user?.subscription_tier)?.name ?? "atual"}
        endsAt={user?.subscription_expires_at}
        onDone={handleCancelled}
      />
    </div>
  );
}
