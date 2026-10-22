import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { CreditCard, ExternalLink, Shield, History as HistoryIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStatus } from "@/hooks/useDashboard";
import { MockService } from "@/services/mockService";
import { acreDate } from "@/lib/acreTime";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { CancelSubscriptionDialog } from "./CancelSubscriptionDialog";
import { useMyCancellations } from "@/hooks/useCancellations";
import { emailStatusLabel, isPaidSubscriber, scheduledCancellation } from "@/lib/cancellation";
import { createPortalSession } from "@/lib/stripe.functions";

/** Billing has one home; profile only links here. Existing server operations are unchanged. */
export function SubscriptionManagement() {
  const { user } = useAuthStatus();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const cancellations = useMyCancellations(user?.id);
  const scheduled = scheduledCancellation(cancellations.list);
  const paid =
    !!user && isPaidSubscriber(user.subscription_tier, user.subscription_expires_at, user.on_trial);
  const [auditLogs, setAuditLogs] = useState<import("@/types").SubscriptionAuditLog[]>([]);

  const portal = useServerFn(createPortalSession);

  useEffect(() => {
    let active = true;
    setAuditLogs([]);
    if (user)
      void MockService.getSubscriptionAuditLogs(user.id).then((logs) => {
        if (active) setAuditLogs(logs);
      });
    return () => {
      active = false;
    };
  }, [user?.id]);
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

  if (!user) return null;
  return (
    <section className="space-y-6" aria-label="Gestão da assinatura">
      <Card className="md:col-span-3">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-secondary" />
              Gerenciar assinatura
            </CardTitle>
            <CardDescription>Cobrança, cancelamentos e recibos da sua conta.</CardDescription>
          </div>
          {paid && (
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
            Gerencie a cobrança e consulte os registros da sua assinatura. A comparação dos planos e
            o consumo de recursos também estão nesta página.
          </p>

          <div className="mt-6 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-emerald-500" />
              <div className="text-sm">
                <p className="font-medium">Assinatura Segura</p>
                <p className="text-muted-foreground text-xs">
                  Sua conexão usa HTTPS. O acesso aos dados da conta é protegido por autenticação e
                  permissões.
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
      <CancelSubscriptionDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        planName={SUBSCRIPTION_PLANS.find((p) => p.id === user?.subscription_tier)?.name ?? "atual"}
        endsAt={user?.subscription_expires_at}
        onDone={handleCancelled}
      />
    </section>
  );
}
