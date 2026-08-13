import React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuthStatus } from '@/hooks/useDashboard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MockService } from '@/services/mockService';
import { User, Mail, CreditCard, Shield, LogOut, Check, ExternalLink, Zap, RefreshCw } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '@/lib/subscriptions.config';
import { cn } from '@/lib/utils';
import { createCheckoutSession, createPortalSession } from '@/lib/stripe.functions';
import { useServerFn } from '@tanstack/react-start';


export const Route = createFileRoute('/dashboard/profile')({
  component: ProfilePage,
  head: () => ({
    meta: [{ title: 'Meu Perfil | Norte Concurso' }],
  })
});

function ProfilePage() {
  const { user, isLoading } = useAuthStatus();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const [isActivating, setIsActivating] = React.useState(false);
  const [auditLogs, setAuditLogs] = React.useState<any[]>([]);
  const [activationCode, setActivationCode] = React.useState('');
  
  const checkout = useServerFn(createCheckoutSession);
  const portal = useServerFn(createPortalSession);
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    newEmail: ''
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        newEmail: ''
      });
    }
    const loadAudit = async () => {
      const logs = await MockService.getSubscriptionAuditLogs();
      setAuditLogs(logs);
    };
    loadAudit();
  }, [user]);

  const handleActivate = async () => {
    if (!activationCode) return;
    setIsActivating(true);
    try {
      const result = await MockService.validateActivationCode(activationCode);
      if (result.success) {
        toast.success(result.message);
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } finally {
      setIsActivating(false);
    }
  };

  const handleResendCode = async () => {
    const success = await MockService.resendActivationEmail();
    if (success) {
      toast.success('Novo código enviado para seu e-mail!');
    } else {
      toast.error('Erro ao reenviar código.');
    }
  };

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: formData.name, name: formData.name }
      });
      if (error) throw error;
      toast.success('Nome atualizado com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar nome');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newEmail === formData.email) {
      toast.error('O novo e-mail deve ser diferente do atual.');
      return;
    }
    setIsVerifying(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.newEmail
      });
      if (error) throw error;
      toast.info('Um link de confirmação foi enviado para o novo e-mail. A alteração só será efetivada após a confirmação.');
      setFormData(prev => ({ ...prev, newEmail: '' }));
    } catch (error: any) {
      toast.error(error.message || 'Erro ao solicitar troca de e-mail');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleUpgrade = async (planId: string) => {
    setIsRedirecting(true);
    try {
      const { url } = await checkout({ data: { priceId: `price_mock_${planId}`, planId } });
      if (url) window.location.href = url;
    } catch (error) {
      toast.error("Erro ao iniciar pagamento");
    } finally {
      setIsRedirecting(false);
    }
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

  if (isLoading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e plano.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>
              Mantenha seus dados de contato atualizados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateName} className="space-y-4 pb-6 border-b">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="pl-9"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Salvando...' : 'Atualizar Nome'}
              </Button>
            </form>

            <form onSubmit={handleUpdateEmail} className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label>E-mail Atual</Label>
                <div className="relative opacity-60">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    value={formData.email} 
                    readOnly
                    disabled
                    className="pl-9 bg-muted"
                  />
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
                    onChange={(e) => setFormData({...formData, newEmail: e.target.value})}
                    className="pl-9"
                    required
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  * Você receberá um e-mail de confirmação no novo endereço para validar a troca.
                </p>
              </div>
              <Button type="submit" variant="secondary" disabled={isVerifying}>
                {isVerifying ? 'Processando...' : 'Solicitar Troca de E-mail'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {user && !user.is_activated && (
          <Card className="md:col-span-3 border-secondary bg-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-secondary" />
                Ativar Assinatura
              </CardTitle>
              <CardDescription>
                Insira o código enviado para seu e-mail após o pagamento para liberar seu acesso.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="Código de ativação (Ex: X8J-29K)" 
                  className="max-w-xs"
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value)}
                  disabled={isActivating}
                />
                <Button onClick={handleActivate} disabled={isActivating || !activationCode}>
                  {isActivating ? 'Validando...' : 'Ativar Agora'}
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-xs" onClick={handleResendCode}>
                   <RefreshCw className="h-3 w-3" /> Reenviar E-mail
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground italic">
                * Para o período de testes, utilize o código: <strong>TRIAL-2026</strong>
              </p>
              {user?.activation_attempts && user.activation_attempts > 0 && (
                <p className="text-[10px] text-rose-500 font-medium">
                  Tentativas: {user.activation_attempts}/5
                </p>
              )}
            </CardContent>
          </Card>
        )}


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
            {user?.subscription_tier !== 'free' && (
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const isCurrent = user?.subscription_tier === plan.id;
                return (
                  <Card key={plan.id} className={cn(
                    "relative overflow-hidden flex flex-col",
                    plan.isPopular ? "border-secondary ring-1 ring-secondary" : "",
                    isCurrent ? "bg-muted/50" : ""
                  )}>
                    {plan.isPopular && (
                      <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-bl-lg uppercase">
                        Popular
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">R$ {plan.price.toFixed(2).replace('.', ',')}</span>
                        <span className="text-xs text-muted-foreground">/mês</span>
                      </div>
                      <CardDescription className="text-xs min-h-[32px]">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                      <ul className="space-y-2 text-xs">
                        {Object.entries(plan.features).map(([key, feature], idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className={cn(
                              "h-3 w-3",
                              feature.included ? "text-emerald-500" : "text-muted-foreground/30"
                            )} />
                            <span className={cn(feature.included ? "" : "text-muted-foreground/50")}>
                              {feature.name}
                              {feature.limit && feature.limit !== 'unlimited' && ` (${feature.limit})`}
                            </span>
                          </li>
                        ))}
                      </ul>

                    </CardContent>
                    <div className="p-4 pt-0">
                      <Button 
                        asChild
                        variant={isCurrent ? "outline" : (plan.isPopular ? "secondary" : "default")} 
                        className="w-full"
                        disabled={isCurrent}
                      >
                        <Link to="/checkout/$planId" params={{ planId: plan.id }}>
                          {isCurrent ? "Plano Atual" : "Selecionar"}
                        </Link>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-emerald-500" />
                <div className="text-sm">
                  <p className="font-medium">Assinatura Segura</p>
                  <p className="text-muted-foreground text-xs">Seus dados estão protegidos com criptografia de ponta a ponta.</p>
                </div>
              </div>
              <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Sair da Conta
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
