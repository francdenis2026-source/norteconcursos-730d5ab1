import { createFileRoute } from "@tanstack/react-router";

// Keep the old URL explicit for outdated clients without contacting a voice service.
export const Route = createFileRoute("/api/voice-speech")({
  server: { handlers: { POST: () => Response.json({ error: "A geração de áudio foi desativada. Use a voz do navegador." }, { status: 410 }) } },
});
