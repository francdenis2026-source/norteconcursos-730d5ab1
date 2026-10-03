import { createFileRoute } from '@tanstack/react-router';
import { useParams } from '@tanstack/react-router';
import { SUBSCRIPTION_PLANS } from '@/lib/subscriptions.config';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Check, ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { createCheckoutSession } from '@/lib/stripe.functions';
import { useServerFn } from '@tanstack/react-start';
import { toast } from 'sonner';
import { SoonBadge } from '@/components/SoonBadge';
import { AI_ENABLED, PAYMENTS_ENABLED, PAYMENTS_NOTICE } from '@/lib/launch.config';

export const Route = createFileRoute('/checkout/$planId')({
  component: CheckoutPage
});

function CheckoutPage() {
  const { planId } = useParams({ from: '/checkout/$planId' });
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  const [isProcessing, setIsProcessing] = useState(false);
  const checkout = useServerFn(createCheckoutSession);

  if (!plan) return <div className="p-8 text-center">Plano não encontrado.</div>;

  const handlePay = async () => {
    if (!PAYMENTS_ENABLED) return;
    setIsProcessing(true);
    try {
      const { url } = await checkout({ data: { priceId: `price_mock_${plan.id}`, planId: plan.id } });
      if (url) window.location.href = url;
    } catch (e) {
      toast.error("Erro ao processar pagamento");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/dashboard/profile" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Voltar ao Perfil
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {!PAYMENTS_ENABLED && (
              <div role="status" className="space-y-1 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-foreground">
                <p className="flex items-center gap-2 font-bold">Pagamentos <SoonBadge /></p>
                <p>{PAYMENTS_NOTICE}</p>
              </div>
            )}
            <h1 className="text-3xl font-black text-primary uppercase tracking-tight">Finalizar Assinatura</h1>
            <p className="text-muted-foreground">Você está a um passo de acelerar sua aprovação com as ferramentas do <strong>Norte Concurso</strong>.</p>
            
            <div className="space-y-4">
              <h3 className="font-bold text-lg">O que você terá acesso:</h3>
              <ul className="space-y-3">
                {Object.entries(plan.features).map(([key, f]) => (
                  <li key={key} className="flex items-start gap-3 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="flex flex-wrap items-center gap-2">
                      {f.name}
                      {key === 'aiSolver' && !AI_ENABLED ? <SoonBadge /> : (f.limit && f.limit !== 'unlimited' && `(limite: ${f.limit})`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {PAYMENTS_ENABLED && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-600 shrink-0" />
                <div className="text-xs text-emerald-800">
                  <p className="font-bold">Pagamento 100% Seguro</p>
                  <p>Processado via Stripe com criptografia de ponta a ponta. Você pode cancelar a qualquer momento.</p>
                </div>
              </div>
            )}
          </div>

          <Card className="shadow-2xl border-2 border-primary/10">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle>Resumo do Plano</CardTitle>
              <CardDescription className="text-primary-foreground/70">{plan.name}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span>Mensalidade</span>
                <span className="font-bold text-lg">R$ {plan.price.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b text-emerald-600 font-bold">
                <span>Taxa de Ativação</span>
                <span>Grátis</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-xl font-black">Total</span>
                <span className="text-2xl font-black text-primary">R$ {plan.price.toFixed(2).replace('.', ',')}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button 
                onClick={handlePay} 
                disabled={isProcessing || !PAYMENTS_ENABLED} 
                className="w-full h-12 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 font-black uppercase tracking-widest"
              >
                {!PAYMENTS_ENABLED ? "Pagamentos em breve" : isProcessing ? "Processando..." : "Pagar Agora"}
                <CreditCard className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-[10px] text-center text-muted-foreground">
                {PAYMENTS_ENABLED
                  ? "Ao clicar em Pagar Agora, você concorda com nossos Termos de Uso e Política de Privacidade."
                  : "Nenhuma cobrança é feita durante a fase de testes."}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}