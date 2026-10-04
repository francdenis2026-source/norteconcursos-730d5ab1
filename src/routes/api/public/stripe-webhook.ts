import { createFileRoute } from "@tanstack/react-router";

// No payment event may alter subscriptions until a verified provider is installed.
export const Route = createFileRoute("/api/public/stripe-webhook")({
  server: {
    handlers: { POST: () => new Response("Pagamentos indisponíveis nesta fase.", { status: 503 }) },
  },
});
