import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

import { AI_ENABLED, effectiveTier } from "@/lib/launch.config";
import { checkFeatureAccess } from "@/lib/subscriptions.config";
import type { SubscriptionTier } from "@/types";

const SUPABASE_URL =
  process.env["VITE_SUPABASE_URL"] ??
  process.env["SUPABASE_URL"] ??
  "https://gkwphadbveiyjcwiiizw.supabase.co";
const SUPABASE_KEY =
  process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";

/** Confere no servidor quem está chamando e se o plano em vigor inclui IA (Gratuito não inclui). */
async function checkAiAccess(request: Request): Promise<Response | null> {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token)
    return Response.json({ error: "Entre na sua conta para usar a IA." }, { status: 401 });
  const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` };
  const who = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers });
  if (!who.ok) return Response.json({ error: "Sessão inválida." }, { status: 401 });
  const { id } = (await who.json()) as { id: string };
  const [prof, role] = await Promise.all([
    fetch(
      `${SUPABASE_URL}/rest/v1/profiles?id=eq.${id}&select=subscription_tier,subscription_expires_at,created_at`,
      { headers },
    ),
    fetch(`${SUPABASE_URL}/rest/v1/user_roles?user_id=eq.${id}&role=eq.admin&select=role`, {
      headers,
    }),
  ]);
  const isAdmin = role.ok && ((await role.json()) as unknown[]).length > 0;
  let limit: number | null = null; // nulo = ilimitado
  if (!isAdmin) {
    const [p] = prof.ok
      ? ((await prof.json()) as {
          subscription_tier: string;
          subscription_expires_at: string | null;
          created_at: string;
        }[])
      : [];
    const { tier } = effectiveTier(p?.subscription_tier, p?.created_at, p?.subscription_expires_at);
    const feature = checkFeatureAccess(tier as SubscriptionTier, "aiSolver");
    if (!feature.included) {
      return Response.json(
        { error: "A resolução com IA não está incluída no plano Gratuito." },
        { status: 403 },
      );
    }
    limit = typeof feature.limit === "number" ? feature.limit : null;
  }
  // Reserva atômica no banco: se o limite do dia acabou, recusa antes de gastar IA.
  const consume = await fetch(`${SUPABASE_URL}/rest/v1/rpc/ai_try_consume`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ _limit: limit }),
  });
  if (!consume.ok || (await consume.json()) !== true) {
    return Response.json(
      {
        error:
          "Você usou todas as resoluções de IA de hoje. O limite renova à meia-noite (horário do Acre).",
      },
      { status: 429 },
    );
  }
  return null;
}

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
  if (!AI_ENABLED) {
    return Response.json(
      { error: "A resolução com IA estará disponível em breve." },
      { status: 503 },
    );
  }
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

  const denied = await checkAiAccess(request);
  if (denied) return denied;

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
