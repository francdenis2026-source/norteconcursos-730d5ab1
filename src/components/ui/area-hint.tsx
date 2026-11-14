import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import "@/styles/area-hint.css";

/**
 * Descrição discreta de uma área, exibida ao apontar o mouse ou ao chegar pelo teclado.
 * Não abre por toque nem quando o foco volta ao elemento por programa (ex.: ao fechar um menu),
 * para não cobrir a tela de quem só está navegando.
 */
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
  const [open, setOpen] = React.useState(false);
  if (!description) return children;
  const onOpenChange = (next: boolean) => {
    if (!next) return setOpen(false);
    const el = ref.current;
    if (!el) return;
    const canHover = typeof window !== "undefined" && window.matchMedia?.("(hover: hover)").matches;
    const hovered = canHover && el.matches(":hover");
    let keyboard = false;
    try {
      keyboard = el.matches(":focus-visible");
    } catch {
      keyboard = false;
    }
    if (hovered || keyboard) setOpen(true);
  };
  return (
    <TooltipPrimitive.Provider delayDuration={450} skipDelayDuration={250}>
      <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild ref={ref as React.Ref<HTMLButtonElement>}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={8}
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
