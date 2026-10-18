import { createFileRoute } from "@tanstack/react-router";

const VOICESTUDIO_URL = (
  process.env["VOICESTUDIO_API_URL"] ?? "https://norte-voicestudio.onrender.com"
).replace(/\/$/, "");
const MODEL = process.env["VOICESTUDIO_TTS_MODEL"] ?? "omnivoice";
const VOICE = process.env["VOICESTUDIO_TTS_VOICE"] ?? "default";

type Health = { status: string; device?: string; version?: string };

const timeoutSignal = () => AbortSignal.timeout(4000);

async function handle(): Promise<Response> {
  const configured = Boolean(VOICESTUDIO_URL);
  let health: Health | null = null;
  let installedModels = 0;
  let modelCount = 0;

  if (configured) {
    try {
      const response = await fetch(`${VOICESTUDIO_URL}/health`, { signal: timeoutSignal() });
      if (response.ok) health = (await response.json()) as Health;
    } catch {
      health = null;
    }
    try {
      const response = await fetch(`${VOICESTUDIO_URL}/v1/models`, { signal: timeoutSignal() });
      if (response.ok) {
        const payload = (await response.json()) as unknown;
        const nested =
          typeof payload === "object" && payload !== null
            ? (payload as { models?: unknown }).models
            : undefined;
        const models = Array.isArray(payload) ? payload : Array.isArray(nested) ? nested : [];
        modelCount = models.length;
        installedModels = models.filter(
          (model: unknown) =>
            typeof model === "object" &&
            model !== null &&
            "installed" in model &&
            model.installed === true,
        ).length;
        // The OpenAI-compatible catalogue exposes only engines that are
        // available on this instance. Older VoiceStudio builds omitted the
        // `installed` field, so a non-empty catalogue still proves that at
        // least one usable engine is registered.
        if (installedModels === 0) {
          installedModels = models.filter(
            (model: unknown) => typeof model === "object" && model !== null &&
              typeof (model as { id?: unknown }).id === "string" &&
              (model as { id: string }).id === MODEL,
          ).length;
        }
      }
    } catch {
      // Health remains useful even if the catalogue endpoint is unavailable.
    }
  }

  return Response.json(
    {
      configured,
      endpointHost: configured
        ? (() => {
            try {
              return new URL(VOICESTUDIO_URL).host;
            } catch {
              return "endereço inválido";
            }
          })()
        : null,
      model: MODEL,
      voice: VOICE,
      health,
      modelCount,
      installedModels,
      checkedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export const Route = createFileRoute("/api/voice-studio-admin")({
  server: { handlers: { GET: () => handle() } },
});
