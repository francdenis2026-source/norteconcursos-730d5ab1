import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ priceId: z.string(), planId: z.string() }).parse(data))
  .handler(async ({ data }) => {
    // In a real app, you would use the Stripe SDK here
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const session = await stripe.checkout.sessions.create({...});
    // return { url: session.url };
    
    console.log("Mocking Stripe Checkout Session creation for:", data.planId);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a mock URL (in production this would be the Stripe Checkout URL)
    return { url: `/dashboard/profile?success=true&plan=${data.planId}` };
  });

export const createPortalSession = createServerFn({ method: "POST" })
  .handler(async () => {
    // In a real app, you would use the Stripe SDK here
    // const session = await stripe.billingPortal.sessions.create({...});
    // return { url: session.url };
    
    console.log("Mocking Stripe Billing Portal Session creation");
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { url: "https://billing.stripe.com/p/session/test_mock_portal" };
  });
