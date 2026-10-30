// Ajuda o administrador a cadastrar um concurso em "Concursos disponíveis": ele cola a URL
// oficial do edital (gov.br, site da banca, do órgão etc.), esta função baixa a página de
// verdade (busca real na internet, feita pelo servidor) e usa o AI Gateway só para EXTRAIR os
// campos estruturados do texto já baixado — nunca para "pesquisar" ou inventar dados. O
// resultado volta como rascunho para o admin conferir e corrigir; nada é salvo automaticamente
// no banco (mesma regra da Biblioteca: conteúdo nasce em revisão, só o admin publica).
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EXTRACTION_SYSTEM_PROMPT = `Você recebe o texto (HTML simplificado) de uma página oficial de edital de concurso público brasileiro.
Extraia SOMENTE o que está escrito no texto. Responda SOMENTE com um objeto JSON válido, sem markdown, no formato:
{
  "name": string | null,            // nome do concurso/órgão, ex: "Tribunal Regional Federal da 1ª Região"
  "agency": string | null,          // órgão responsável
  "role": string | null,            // cargo (se a página tratar de um único cargo; senão null)
  "exam_board": string | null,      // banca organizadora
  "education_level": "Médio" | "Superior" | null,
  "location": string | null,        // estado/região de lotação
  "vacancies": number | null,
  "salary": number | null,          // remuneração inicial em reais, só o número
  "exam_date": string | null,       // data da prova objetiva, formato AAAA-MM-DD
  "start_date": string | null,      // início das inscrições, formato AAAA-MM-DD
  "end_date": string | null,        // fim das inscrições, formato AAAA-MM-DD
  "status": "Previsto" | "Autorizado" | "Edital Publicado" | "Inscrições Abertas" | "Encerrado" | null,
  "confidence": "alta" | "media" | "baixa"
}
Se um campo não aparecer claramente no texto, use null — NUNCA invente ou estime um valor que não está escrito. NUNCA invente links.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const jwt = authHeader.replace(/^Bearer\s+/i, "");
    if (!jwt) {
      return new Response(JSON.stringify({ error: "Não autenticado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: userData, error: userError } = await supabase.auth.getUser(jwt);
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: "Sessão inválida" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Acesso restrito ao administrador" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { url } = await req.json();
    if (!url || typeof url !== "string" || !/^https?:\/\//i.test(url)) {
      return new Response(JSON.stringify({ error: "Informe uma URL válida (http/https)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Only public HTTPS web destinations are accepted. DNS-resolved private
    // addresses and redirects must not be fetched by this privileged service.
    let target: URL;
    try {
      target = new URL(url);
      if (target.protocol !== "https:" || target.username || target.password || target.port) {
        throw new Error("Destino inválido");
      }
      const host = target.hostname.toLowerCase().replace(/\\.$/, "");
      if (!/^[a-z0-9.-]+$/.test(host) || !host.includes(".") ||
          host === "localhost" || host.endsWith(".localhost") ||
          host.endsWith(".local") || host.endsWith(".internal") ||
          /^\\d+\\.\\d+\\.\\d+\\.\\d+$/.test(host) ||
          host.includes(":")) throw new Error("Destino inválido");
      // Constrain requests to known official publishing domains. Additional
      // exam boards may be added only after explicit security review.
      const trusted = ["gov.br", "jus.br", "leg.br", "edu.br", "cebraspe.org.br", "fgv.br",
        "fcc.org.br", "vunesp.com.br", "ibfc.org.br", "institutoaocp.org.br"];
      if (!trusted.some((domain) => host === domain || host.endsWith("." + domain))) {
        throw new Error("Domínio não autorizado para importação");
      }
    } catch {
      return new Response(JSON.stringify({ error: "URL não permitida. Use um endereço HTTPS de fonte oficial autorizada." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let pageText: string;
    try {
      const pageResponse = await fetch(target.toString(), {
        redirect: "error",
        signal: AbortSignal.timeout(10000),
        headers: { "User-Agent": "Mozilla/5.0 (compatible; NorteConcursosBot/1.0)" },
      });
      if (!pageResponse.ok) {
        throw new Error(`A página respondeu ${pageResponse.status}`);
      }
      const declaredSize = Number(pageResponse.headers.get("content-length") || "0");
      if (declaredSize > 1_000_000) throw new Error("Página muito grande");
      const reader = pageResponse.body?.getReader();
      if (!reader) throw new Error("Resposta sem conteúdo");
      const chunks: Uint8Array[] = [];
      let total = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        total += value.byteLength;
        if (total > 1_000_000) {
          await reader.cancel();
          throw new Error("Página muito grande");
        }
        chunks.push(value);
      }
      const bytes = new Uint8Array(total);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      const html = new TextDecoder().decode(bytes);
      // Extração simples: remove script/style/tags e colapsa espaços. Não precisa ser perfeita —
      // o modelo só usa isso para localizar os campos, e o admin confere tudo antes de salvar.
      pageText = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 18000);
    } catch (fetchError) {
      return new Response(
        JSON.stringify({ error: `Não foi possível baixar a página: ${String(fetchError)}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "LOVABLE_API_KEY não configurada no projeto Supabase (Edge Function Secrets).",
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: EXTRACTION_SYSTEM_PROMPT },
          { role: "user", content: `URL: ${url}\n\nTexto da página:\n${pageText}` },
        ],
      }),
    });
    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      throw new Error(`AI Gateway retornou ${aiResponse.status}: ${errText}`);
    }
    const aiJson = await aiResponse.json();
    const rawText: string = aiJson.choices?.[0]?.message?.content ?? "{}";
    const cleaned = rawText
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "");
    let extracted: Record<string, unknown>;
    try {
      extracted = JSON.parse(cleaned);
    } catch {
      extracted = { confidence: "baixa" };
    }

    return new Response(JSON.stringify({ ok: true, source_url: url, extracted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("fetch-contest-edital error", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
