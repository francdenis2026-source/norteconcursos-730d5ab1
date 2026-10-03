import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Square, Eraser, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/dashboard/ai-solver")({
  head: () => ({
    meta: [
      { title: "Resolver questão com IA | Norte Concurso" },
      { name: "description", content: "Cole uma questão de concurso e receba a resolução passo a passo com explicação dos conceitos." },
      { property: "og:title", content: "Resolver questão com IA | Norte Concurso" },
      { property: "og:description", content: "Resolução passo a passo e conceitos cobrados em questões de concurso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AiSolverPage,
});

type Status = "idle" | "loading" | "done" | "error";

function AiSolverPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const isLoading = status === "loading";
  const canSubmit = question.trim().length >= 20 && !isLoading;

  async function solve() {
    const controller = new AbortController();
    abortRef.current = controller;
    setAnswer("");
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/solve-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string; message?: string } | null;
        const fallback =
          res.status === 402
            ? "Créditos de IA esgotados. Tente novamente mais tarde."
            : res.status === 429
              ? "Muitas solicitações. Aguarde um instante e tente de novo."
              : "Não foi possível gerar a resolução.";
        throw new Error(data?.error ?? data?.message ?? fallback);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setAnswer(text);
      }
      if (!text.trim()) throw new Error("A IA não retornou uma resposta para esta questão.");
      setStatus("done");
    } catch (err) {
      if (controller.signal.aborted) {
        setStatus("done");
        return;
      }
      setError(err instanceof Error ? err.message : "Erro inesperado.");
      setStatus("error");
    } finally {
      abortRef.current = null;
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-6">
      <header className="space-y-1">
        <p className="flex items-center gap-2 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" aria-hidden /> Resolução com IA
        </p>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Resolver questão</h1>
        <p className="text-muted-foreground">
          Cole o enunciado e as alternativas. A IA explica a resolução passo a passo e os conceitos cobrados.
        </p>
      </header>

      <Card>
        <CardContent className="space-y-3 pt-6">
          <Textarea
            aria-label="Questão de concurso"
            placeholder="Ex.: (CESPE 2024) Acerca dos atos administrativos, julgue o item a seguir..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={8000}
            className="min-h-48"
            disabled={isLoading}
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">{question.length}/8000</span>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => { setQuestion(""); setAnswer(""); setError(null); setStatus("idle"); }} disabled={isLoading}>
                <Eraser className="h-4 w-4" /> Limpar
              </Button>
              {isLoading ? (
                <Button variant="outline" onClick={() => abortRef.current?.abort()}>
                  <Square className="h-4 w-4" /> Parar
                </Button>
              ) : (
                <Button onClick={solve} disabled={!canSubmit}>
                  <Sparkles className="h-4 w-4" /> Resolver
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {(answer || isLoading) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />} Resolução
            </CardTitle>
            <CardDescription>
              Conteúdo gerado por IA — confira leis no texto oficial do Planalto e jurisprudência no tribunal competente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground" aria-live="polite">
              {answer || "Analisando a questão..."}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
