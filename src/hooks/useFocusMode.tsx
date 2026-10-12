import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Modo foco: o conteúdo em estudo ocupa a tela inteira, sem menu, topo nem listas laterais.
 * O mesmo elemento só troca de classe (não remonta), então respostas e anotações não se perdem. Esc sai.
 */
export function useFocusMode() {
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    if (!focus) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFocus(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [focus]);
  /** Classes do contêiner do conteúdo: tela cheia, coluna central de leitura. */
  const containerClass = focus ? "fixed inset-0 z-[60] overflow-y-auto bg-background px-4 py-4 sm:px-8 [&>*]:mx-auto [&>*]:max-w-3xl" : "";
  const button = (
    <Button type="button" size="sm" variant="outline" className="no-print" onClick={() => setFocus((v) => !v)} aria-pressed={focus}>
      {focus ? <><X className="mr-1 h-4 w-4" /> Sair do foco (Esc)</> : <><Maximize2 className="mr-1 h-4 w-4" /> Modo foco</>}
    </Button>
  );
  return { focus, containerClass, button };
}
