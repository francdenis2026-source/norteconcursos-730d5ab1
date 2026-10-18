import { createFileRoute } from "@tanstack/react-router";

const VOICESTUDIO_URL = (process.env["VOICESTUDIO_API_URL"] ?? "").replace(/\/$/, "");
const VOICESTUDIO_MODEL = process.env["VOICESTUDIO_TTS_MODEL"] ?? "kittentts";
const VOICESTUDIO_VOICE = process.env["VOICESTUDIO_TTS_VOICE"] ?? "default";

/**
 * Small server-side bridge for the optional VoiceStudio integration.
 * The browser never receives the VoiceStudio URL or any server configuration.
 * Keep this route disabled until a licensed model is installed and the API URL
 * is configured in the deployment environment.
 */
async function handle(request: Request): Promise<Response> {
  if (!VOICESTUDIO_URL) {
    return Response.json(
      { error: "A leitura em voz alta ainda não foi configurada nesta plataforma." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as { text?: unknown } | null;
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text || text.length > 4096) {
    return Response.json({ error: "O texto para leitura é inválido." }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${VOICESTUDIO_URL}/v1/audio/speech`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: VOICESTUDIO_MODEL,
        voice: VOICESTUDIO_VOICE,
        input: text,
        language: "pt",
        response_format: "mp3",
        speed: 1,
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      return Response.json(
        {
          error:
            upstream.status === 403
              ? "O modelo de voz ainda não teve a licença aceita no VoiceStudio."
              : "O serviço de leitura em voz alta está indisponível no momento.",
          detail: detail.slice(0, 300),
        },
        { status: upstream.status === 403 ? 503 : 502 },
      );
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "audio/mpeg",
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return Response.json(
      { error: "Não foi possível conectar ao serviço de leitura em voz alta." },
      { status: 503 },
    );
  }
}

export const Route = createFileRoute("/api/voice-speech")({
  server: { handlers: { POST: ({ request }) => handle(request) } },
});
