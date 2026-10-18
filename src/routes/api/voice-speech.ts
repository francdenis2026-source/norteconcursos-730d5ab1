import { createFileRoute } from "@tanstack/react-router";
import { generateVoiceAudio, voiceJobRequest } from "@/lib/voiceService";

async function handle(request: Request): Promise<Response> {
  const body = (await request.json().catch(() => null)) as { text?: unknown; action?: unknown; jobId?: unknown } | null;
  if (body?.action === "start" || body?.action === "status" || body?.action === "audio") {
    return voiceJobRequest(body.action, typeof body.text === "string" ? body.text : "", typeof body.jobId === "string" ? body.jobId : "");
  }
  return generateVoiceAudio(typeof body?.text === "string" ? body.text : "");
}

export const Route = createFileRoute("/api/voice-speech")({
  server: { handlers: { POST: ({ request }) => handle(request) } },
});
