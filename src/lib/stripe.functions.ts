import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ priceId: z.string(), planId: z.string() }).parse(data))
  .handler(async ({ data }) => {
    console.log("Mocking Stripe Checkout Session creation for:", data.planId);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { url: `/dashboard/profile?success=true&plan=${data.planId}` };
  });

export const createPortalSession = createServerFn({ method: "POST" })
  .handler(async () => {
    console.log("Mocking Stripe Billing Portal Session creation");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { url: "https://billing.stripe.com/p/session/test_mock_portal" };
  });
