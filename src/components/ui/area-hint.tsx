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
if (typeof document !== "undefined")
  document.addEventListener(
    "pointerdown",
    () => {
      quietUntil = Date.now() + QUIET_MS;
    },
    true,
  );

export function AreaHint({
  title,
  description,
  side = "bottom",
  align = "center",
  children,
}: {
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
    window.addEventListener("scroll", close, true);
    window.addEventListener("blur", close);
    document.addEventListener("pointerdown", close, true);
    return () => {
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
    if (!el || suppressed.current || Date.now() < quietUntil || el.getAttribute("aria-expanded") === "true") return;
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
            {title && <strong className="area-hint__title">{title}</strong>}
            <span className="area-hint__text">{description}</span>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
