import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PAYMENTS_ENABLED } from "@/lib/launch.config";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import type { UserProfile } from "@/types";

const seenKey = (id: string) => `norte_renew_seen_${id}`;

/**
 * Aparece uma vez por sessão, só depois que o plano vigente expirou e a conta voltou ao Gratuito.
 * Enquanto os pagamentos estão desativados, "renovar" leva à página de planos (que mostra "Em breve").
 */
export function RenewPlanDialog({ user, enabled }: { user: UserProfile | null; enabled: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled || !user?.expired_plan) return;
    try {
      if (sessionStorage.getItem(seenKey(user.id))) return;
      sessionStorage.setItem(seenKey(user.id), "1");
    } catch {
      /* sessionStorage indisponível: mostra mesmo assim */
    }
    setOpen(true);
  }, [enabled, user?.id, user?.expired_plan]);

  if (!user?.expired_plan) return null;
  const name = SUBSCRIPTION_PLANS.find((p) => p.id === user.expired_plan)?.name ?? "anterior";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-600">
            <Hourglass className="h-6 w-6" aria-hidden />
          </div>
          <DialogTitle>Seu plano {name} expirou</DialogTitle>
          <DialogDescription>
            Sua conta entrou em modo limitado: até 10 questões por dia no Treinador, sem simulados
            completos nem plano de estudos personalizado. Deseja renovar o plano para recuperar o
            acesso completo?
            {!PAYMENTS_ENABLED && " Os planos pagos serão ativados em breve — avisaremos você."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Continuar no Gratuito
          </Button>
          <Button asChild onClick={() => setOpen(false)}>
            <Link to="/dashboard/subscriptions">Ver planos e renovar</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
