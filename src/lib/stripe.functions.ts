import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PAYMENTS_ENABLED, PAYMENTS_NOTICE } from "@/lib/launch.config";

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ priceId: z.string(), planId: z.string() }).parse(data))
  .handler(async (): Promise<{ url: string }> => {
    if (!PAYMENTS_ENABLED) throw new Error(PAYMENTS_NOTICE);
    throw new Error("Checkout indisponível até a integração de pagamentos ser validada.");
  });

export const createPortalSession = createServerFn({ method: "POST" }).handler(
  async (): Promise<{ url: string }> => {
    if (!PAYMENTS_ENABLED) throw new Error(PAYMENTS_NOTICE);
    throw new Error("Portal indisponível até a integração de pagamentos ser validada.");
  },
);
