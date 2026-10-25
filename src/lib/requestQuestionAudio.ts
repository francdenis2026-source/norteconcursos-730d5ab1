/** Generate once in the background, then fetch the completed audio. */
export async function requestQuestionAudio(text: string, signal: AbortSignal, onProgress?: (value: number) => void) {
  const send = (body: object) => fetch("/api/voice-speech", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal,
  });
  let response = await send({ action: "start", text });
  const started = Date.now();
  while (response.ok && response.headers.get("content-type")?.includes("application/json")) {
    const job = await response.json() as { job_id?: string; status?: string; progress?: number; error?: string };
    if (job.error || !job.job_id) throw new Error(job.error ?? "A geração do áudio falhou.");
    onProgress?.(job.progress ?? 0);
    if (job.status === "ready") return send({ action: "audio", jobId: job.job_id });
    if (job.status !== "pending" || Date.now() - started > 610000) throw new Error("O áudio demorou mais que o esperado. Tente novamente.");
    await new Promise<void>((resolve, reject) => {
      const abort = () => { clearTimeout(timer); reject(new DOMException("Aborted", "AbortError")); };
      const timer = setTimeout(() => { signal.removeEventListener("abort", abort); resolve(); }, 2500);
      if (signal.aborted) abort();
      else signal.addEventListener("abort", abort, { once: true });
    });
    response = await send({ action: "status", jobId: job.job_id });
  }
  return response;
}
