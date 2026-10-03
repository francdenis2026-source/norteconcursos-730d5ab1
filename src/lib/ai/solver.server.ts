import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.server";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

const InputSchema = z.object({
  question: z.string().trim().min(20, "Cole a questão completa (mínimo 20 caracteres).").max(8000),
});

const SYSTEM_PROMPT = `Você é um professor especialista em concursos públicos brasileiros.
O candidato colará uma questão (com ou sem alternativas). Responda em português, em texto simples (sem tabelas), com estas seções:

1. GABARITO PROVÁVEL — indique a alternativa correta (ou a resposta) e o nível de confiança.
2. RESOLUÇÃO PASSO A PASSO — raciocínio numerado e objetivo.
3. ANÁLISE DAS ALTERNATIVAS — por que cada uma está certa ou errada.
4. CONCEITOS COBRADOS — explique os conceitos e a disciplina/assunto envolvidos.
5. DICA DE PROVA — uma pegadinha comum ou macete.

Regras: cite o dispositivo legal (lei, artigo) quando aplicável, mas avise que o candidato deve conferir a vigência no texto oficial (Planalto) e a jurisprudência no tribunal competente. Se a questão estiver incompleta ou ambígua, diga isso claramente. Nunca invente súmulas ou números de artigos. Limite a resposta a cerca de 600 palavras.`;

export async function handleSolveQuestion(request: Request): Promise<Response> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    return Response.json({ error: "Serviço de IA não configurado." }, { status: 500 });
  }

  let parsed: z.infer<typeof InputSchema>;
  try {
    parsed = InputSchema.parse(await request.json());
  } catch (err) {
    const message = err instanceof z.ZodError ? err.issues[0]?.message : "Requisição inválida.";
    return Response.json({ error: message }, { status: 400 });
  }

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: parsed.question }],
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "medium",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return withLovableAiGatewayRunIdHeader(result.toTextStreamResponse(), runIdFetch);
}
