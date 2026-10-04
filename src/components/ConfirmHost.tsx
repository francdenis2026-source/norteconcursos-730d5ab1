import { useEffect, useState } from "react";
import { AlertTriangle, HelpCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { registerConfirmHost, type ConfirmOptions } from "@/lib/confirm";

/** Caixa de confirmação da plataforma (no lugar do `window.confirm` do navegador). Montada uma vez na raiz. */
export function ConfirmHost() {
  const [state, setState] = useState<{ opts: ConfirmOptions; resolve: (ok: boolean) => void } | null>(null);

  useEffect(() => {
    registerConfirmHost((opts) => new Promise<boolean>((resolve) => setState({ opts, resolve })));
    return () => registerConfirmHost(null);
  }, []);

  const close = (ok: boolean) => {
    state?.resolve(ok);
    setState(null);
  };
  const tone = state?.opts.tone ?? "danger";
  const danger = tone === "danger";

  return (
    <Dialog open={!!state} onOpenChange={(open) => !open && close(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div
            className={`mb-2 grid h-12 w-12 place-items-center rounded-full ${danger ? "bg-rose-500/12 text-rose-600" : "bg-primary/10 text-primary"}`}
            aria-hidden
          >
            {danger ? <AlertTriangle className="h-6 w-6" /> : tone === "info" ? <Info className="h-6 w-6" /> : <HelpCircle className="h-6 w-6" />}
          </div>
          <DialogTitle>{state?.opts.title}</DialogTitle>
          <DialogDescription>{state?.opts.message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          {!state?.opts.hideCancel && (
            <Button variant="outline" onClick={() => close(false)} autoFocus>
              {state?.opts.cancelLabel ?? "Cancelar"}
            </Button>
          )}
          <Button variant={danger ? "destructive" : "default"} onClick={() => close(true)}>
            {state?.opts.confirmLabel ?? "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
