import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PAYMENTS_ENABLED, PAYMENTS_NOTICE } from "@/lib/launch.config";

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ priceId: z.string(), planId: z.string() }).parse(data))
  .handler(async ({ data }) => {
    if (!PAYMENTS_ENABLED) throw new Error(PAYMENTS_NOTICE);
    console.log("Mocking Stripe Checkout Session creation for:", data.planId);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { url: `/dashboard/profile?success=true&plan=${data.planId}` };
  });

export const createPortalSession = createServerFn({ method: "POST" })
  .handler(async () => {
    if (!PAYMENTS_ENABLED) throw new Error(PAYMENTS_NOTICE);
    console.log("Mocking Stripe Billing Portal Session creation");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { url: "https://billing.stripe.com/p/session/test_mock_portal" };
  });
