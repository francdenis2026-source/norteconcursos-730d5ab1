/** Server-only voice configuration. Existing deployments can retain their overrides. */
export function voiceServiceConfig(env: Record<string, string | undefined> = process.env) {
  const model = env["VOICESTUDIO_TTS_MODEL"] ?? "kokoro";
  const kokoro = model.startsWith("kokoro");
  return {
    url: (env["VOICESTUDIO_API_URL"] ?? "https://norte-kokoro.onrender.com").replace(/\/$/, ""),
    model,
    voice: env["VOICESTUDIO_TTS_VOICE"] ?? (kokoro ? "pf_dora" : "default"),
    format: kokoro ? "wav" : "mp3",
    language: kokoro ? "pt-br" : "pt",
    name: kokoro ? "Kokoro ONNX" : "Serviço de voz",
  };
}

export async function generateVoiceAudio(
  text: string,
  config = voiceServiceConfig(),
  fetcher: typeof fetch = fetch,
): Promise<Response> {
  if (!text.trim() || text.length > 4096) {
    return Response.json({ error: "O texto para leitura é inválido." }, { status: 400 });
  }
  if (!config.url) {
    return Response.json({ error: "A leitura em voz alta ainda não foi configurada." }, { status: 503 });
  }
  try {
    const upstream = await fetcher(`${config.url}/v1/audio/speech`, {
      method: "POST",
      signal: AbortSignal.timeout(80000),
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: config.model, voice: config.voice, input: text.trim(), language: config.language, response_format: config.format, speed: 1 }),
    });
    if (!upstream.ok) {
      return Response.json({ error: "O serviço de voz está ocupado ou indisponível. Tente novamente." }, { status: 503 });
    }
    const type = upstream.headers.get("content-type");
    if (!type?.startsWith("audio/")) {
      return Response.json({ error: "O serviço de voz não retornou um áudio válido." }, { status: 502 });
    }
    // Read under the upstream deadline, so body failures trigger device speech too.
    const audio = await upstream.arrayBuffer();
    if (!audio.byteLength) return Response.json({ error: "O áudio retornado está vazio." }, { status: 502 });
    return new Response(audio, { headers: { "Content-Type": type, "Cache-Control": "private, no-store" } });
  } catch {
    return Response.json({ error: "Não foi possível conectar ao serviço de leitura em voz alta." }, { status: 503 });
  }
}

export async function voiceJobRequest(
  action: "start" | "status" | "audio",
  text: string,
  jobId: string,
  config = voiceServiceConfig(),
  fetcher: typeof fetch = fetch,
): Promise<Response> {
  if (!config.model.startsWith("kokoro")) {
    return action === "start" ? generateVoiceAudio(text, config, fetcher)
      : Response.json({ error: "Geração não encontrada." }, { status: 400 });
  }
  if (action === "start" && (!text.trim() || text.length > 4096)) {
    return Response.json({ error: "O texto para leitura é inválido." }, { status: 400 });
  }
  if (action !== "start" && !/^[a-f0-9]{32}$/.test(jobId)) {
    return Response.json({ error: "Geração inválida." }, { status: 400 });
  }
  const path = action === "start" ? "/v1/audio/jobs" : `/v1/audio/jobs/${jobId}${action === "audio" ? "/audio" : ""}`;
  try {
    const response = await fetcher(config.url + path, {
      method: action === "start" ? "POST" : "GET",
      signal: AbortSignal.timeout(action === "start" ? 60000 : 15000),
      headers: { "Content-Type": "application/json" },
      ...(action === "start" ? { body: JSON.stringify({ input: text.trim(), model: config.model, voice: config.voice, language: config.language, response_format: config.format }) } : {}),
    });
    if (!response.ok) return Response.json({ error: "O serviço de voz está ocupado ou indisponível. Tente novamente." }, { status: 503 });
    if (action === "audio") {
      const type = response.headers.get("content-type");
      if (!type?.startsWith("audio/")) throw new Error("Invalid audio");
      const audio = await response.arrayBuffer();
      if (!audio.byteLength) throw new Error("Empty audio");
      return new Response(audio, { headers: { "Content-Type": type, "Cache-Control": "private, no-store" } });
    }
    const job = await response.json() as { job_id?: string; status?: string; progress?: number; error?: string };
    if (!job.job_id || !/^[a-f0-9]{32}$/.test(job.job_id) || !["pending", "ready", "error"].includes(job.status ?? "")) throw new Error("Invalid generation");
    return Response.json({ job_id: job.job_id, status: job.status, progress: Math.max(0, Math.min(100, Number(job.progress) || 0)), error: job.status === "error" ? "Não foi possível preparar o áudio. Tente novamente." : undefined }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Não foi possível conectar ao serviço de voz." }, { status: 503 });
  }
}
