import type { ReactElement, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Drop-in replacement for the native `title=` attribute: same one-line hint,
 * but rendered with the app's own compact, themed tooltip instead of the
 * browser's unstyled popup. Relies on the `TooltipProvider` already mounted
 * around the authenticated shell.
 */
export function Hint({
  content,
  side,
  children,
}: {
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  children: ReactElement;
}) {
  if (!content) return children;
  return (
    // Own provider so hints work on public pages too (nested providers are safe).
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side ?? "top"}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
