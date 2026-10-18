import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/voice-studio-admin")({
  server: { handlers: { GET: () => Response.json({ configured: false, providerName: "Voz do navegador", remoteAudioEnabled: false }) } },
});
