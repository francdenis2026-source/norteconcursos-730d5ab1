// Classifies a candidate-uploaded exam file (photo/PDF of a cover page,
// question booklet, or gabarito) using the Lovable AI Gateway. It only
// identifies metadata (contest, year, board, disciplines) — it never
// invents a score or a grading result. That distinction matters: this
// project's content-governance rule is to never present unverified data as
// an official result, so the output here is always stored as a reviewable
// suggestion (analysis_status = 'concluido' with ai_extracted populated),
// left for a human (candidate or admin) to confirm before it feeds any
// "resultado" record.
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const EXTRACTION_SYSTEM_PROMPT = `Você analisa a imagem ou o texto de uma capa/caderno de prova de concurso público brasileiro (banca, cargo, edital, disciplinas).
Responda SOMENTE com um objeto JSON válido, sem markdown, no formato:
{
  "contest_name": string | null,   // nome do órgão/concurso, ex: "Polícia Federal", "Polícia Rodoviária Federal"
  "contest_year": number | null,   // ano de aplicação da prova
  "exam_board": string | null,     // banca organizadora, ex: "CEBRASPE", "IBADE", "IBFC"
  "role_name": string | null,      // cargo, ex: "Agente de Polícia Federal"
  "disciplines": string[],         // lista de disciplinas/matérias identificadas na capa ou no sumário
  "confidence": "alta" | "media" | "baixa",
  "raw_notes": string              // qualquer texto relevante que você tenha lido (código da prova, data, edital nº)
}
Se não conseguir identificar algum campo com segurança, use null (ou lista vazia para disciplines). NUNCA invente gabarito, nota ou resultado — isso não é objetivo desta análise.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { documentId } = await req.json();
    if (!documentId) {
      return new Response(JSON.stringify({ error: "documentId é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: doc, error: fetchError } = await supabase
      .from("student_exam_documents")
      .select("id, storage_path, file_name, user_id")
      .eq("id", documentId)
      .single();
    if (fetchError || !doc) {
      return new Response(JSON.stringify({ error: "Documento não encontrado" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabase
      .from("student_exam_documents")
      .update({ analysis_status: "processando" })
      .eq("id", documentId);

    if (!LOVABLE_API_KEY) {
      await supabase
        .from("student_exam_documents")
        .update({
          analysis_status: "erro",
          notes:
            "LOVABLE_API_KEY não configurada no projeto Supabase (Edge Function Secrets); não foi possível chamar o AI Gateway.",
        })
        .eq("id", documentId);
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY não configurada" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: signed, error: signError } = await supabase.storage
      .from("student-exams")
      .createSignedUrl(doc.storage_path, 300);
    if (signError || !signed) {
      throw new Error(`Falha ao gerar URL assinada do arquivo: ${signError?.message}`);
    }

    const fileResponse = await fetch(signed.signedUrl);
    const contentType = fileResponse.headers.get("content-type") || "application/octet-stream";
    const isImage = contentType.startsWith("image/");

    const userContent: unknown[] = [
      {
        type: "text",
        text: `Arquivo enviado pelo candidato: "${doc.file_name}". Identifique o concurso conforme as instruções.`,
      },
    ];

    if (isImage) {
      const bytes = new Uint8Array(await fileResponse.arrayBuffer());
      let binary = "";
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      const base64 = btoa(binary);
      userContent.push({
        type: "image_url",
        image_url: { url: `data:${contentType};base64,${base64}` },
      });
    } else {
      userContent.push({
        type: "text",
        text: 'O arquivo não é uma imagem (provavelmente PDF); classifique com base apenas no nome do arquivo e em qualquer contexto disponível, e marque confidence como "baixa" se não tiver certeza.',
      });
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
          { role: "user", content: userContent },
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
      extracted = { raw_notes: rawText, confidence: "baixa" };
    }

    const update: Record<string, unknown> = {
      analysis_status: "concluido",
      ai_extracted: extracted,
    };
    // Only overwrite the classification fields if the document doesn't
    // already have a confirmed contest attached (a candidate might upload
    // straight into an existing panel; we should never silently move it).
    const { data: current } = await supabase
      .from("student_exam_documents")
      .select("contest_name")
      .eq("id", documentId)
      .single();
    if (!current?.contest_name && extracted.contest_name) {
      update.contest_name = extracted.contest_name;
      update.contest_year = extracted.contest_year ? String(extracted.contest_year) : null;
      update.exam_board = extracted.exam_board ?? null;
    }

    const { error: updateError } = await supabase
      .from("student_exam_documents")
      .update(update)
      .eq("id", documentId);
    if (updateError) throw updateError;

    return new Response(JSON.stringify({ ok: true, extracted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("analyze-exam-upload error", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
