import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const KEY = "norte_mobile_notice_v1";

/** Aviso único (uma vez por aparelho) para quem abre no celular: a experiência completa é melhor em telas maiores. */
export function MobileNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {
      /* sem storage: mostra, e só nesta visita */
    }
    setOpen(true);
  }, []);

  const close = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignora */
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-[92vw] rounded-2xl sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          <svg
            viewBox="0 0 96 64"
            className="mb-1 h-16 w-24 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="6" y="6" width="56" height="38" rx="4" />
            <path d="M24 56h20M34 44v12" />
            <rect x="62" y="20" width="28" height="38" rx="4" className="text-amber-500" />
            <path d="M73 52h6" className="text-amber-500" />
          </svg>
          <DialogTitle className="text-lg">Melhor visualizado no computador ou tablet</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Você pode usar a plataforma normalmente aqui, no celular. Para o cronograma, os
            simulados e a sala de estudo, telas maiores deixam tudo mais confortável.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full" onClick={close}>
            Continuar no celular
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
