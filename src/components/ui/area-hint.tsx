import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import "@/styles/area-hint.css";

/**
 * Descrição discreta de uma área, como em sites profissionais:
 * - aparece só ao apontar o mouse (com uma pequena espera) ou ao chegar pelo teclado;
 * - some ao clicar e só volta depois que o mouse sai e entra de novo;
 * - nunca aparece com o menu daquele botão aberto, nem por toque.
 */
// Depois de qualquer clique, nenhuma descrição aparece por um instante: a tela pode ter mudado
// sob o mouse parado, e o texto surgiria sem o usuário ter apontado para nada.
const QUIET_MS = 900;
let quietUntil = 0;
let downAt = { x: 0, y: 0 };
// Verdadeiro quando, depois do último clique, o mouse já se afastou do ponto clicado.
let traveled = true;
if (typeof document !== "undefined")
  document.addEventListener(
    "pointerdown",
    (event) => {
      quietUntil = Date.now() + QUIET_MS;
      downAt = { x: event.clientX, y: event.clientY };
      traveled = false;
    },
    true,
  );
if (typeof document !== "undefined")
  document.addEventListener(
    "pointermove",
    (event) => {
      if (!traveled && Math.hypot(event.clientX - downAt.x, event.clientY - downAt.y) > 24)
        traveled = true;
    },
    { capture: true, passive: true },
  );

export function AreaHint({
  title,
  description,
  side = "bottom",
  align = "center",
  children,
}: {
  /** Mantido por compatibilidade: o nome já aparece no próprio menu, então só a descrição é exibida. */
  title?: React.ReactNode;
  description?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  children: React.ReactElement;
}) {
  const ref = React.useRef<HTMLElement | null>(null);
  const inside = React.useRef(false);
  const suppressed = React.useRef(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    // Explicação breve: some sozinha depois de alguns segundos, mesmo com o mouse parado.
    const fade = window.setTimeout(() => {
      suppressed.current = true;
      setOpen(false);
    }, 4000);
    window.addEventListener("scroll", close, true);
    window.addEventListener("blur", close);
    document.addEventListener("pointerdown", close, true);
    return () => {
      window.clearTimeout(fade);
      document.removeEventListener("pointerdown", close, true);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("blur", close);
    };
  }, [open]);
  if (!description) return children;
  const silence = () => {
    suppressed.current = true;
    setOpen(false);
  };
  const onOpenChange = (next: boolean) => {
    if (!next) return setOpen(false);
    const el = ref.current;
    if (!el || suppressed.current || el.getAttribute("aria-expanded") === "true") return;
    // Nos segundos após um clique, o mouse parado (ou tremendo) sobre o mesmo ponto não abre nada.
    if (!traveled && Date.now() < quietUntil + 3000) return;
    const wait = quietUntil - Date.now();
    if (wait > 0) {
      // Logo após um clique (ex.: abrir o menu): espera um instante e mostra se o mouse continuar ali.
      window.setTimeout(() => {
        // Só se o usuário de fato levou o mouse até o item (não um tremor sobre o ponto do clique).
        if (traveled && inside.current && !suppressed.current && ref.current?.isConnected) setOpen(true);
      }, wait + 250);
      return;
    }
    let keyboard = false;
    try {
      keyboard = el.matches(":focus-visible");
    } catch {
      keyboard = false;
    }
    const canHover = window.matchMedia?.("(hover: hover)").matches ?? false;
    if (keyboard || (inside.current && canHover)) setOpen(true);
  };
  return (
    <TooltipPrimitive.Provider delayDuration={500} skipDelayDuration={200}>
      <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger
          asChild
          ref={ref as React.Ref<HTMLButtonElement>}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") inside.current = true;
          }}
          onPointerLeave={() => {
            inside.current = false;
            suppressed.current = false;
            setOpen(false);
          }}
          onPointerDown={silence}
          onClick={silence}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " " || event.key === "Escape") silence();
          }}
          onBlur={() => {
            suppressed.current = false;
            setOpen(false);
          }}
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={6}
            collisionPadding={12}
            className="area-hint"
          >
            <span className="area-hint__text">{description}</span>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
