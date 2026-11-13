import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.112.3";
import webpush from "npm:web-push@3.6.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://norteconcursos.xyz",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-release-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: corsHeaders });

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY");
  const vapidPublicKey = "BF5LkSoZ0JBV2MtH-35WSL2vfltAe7w8gV8NUeL9ezpwU5_IvSBDo1RJnODKUFLRrhABkJ19oVGvs3q-UicIKS0";
  const releaseSecret = Deno.env.get("PUSH_RELEASE_WEBHOOK_SECRET");
  if (!supabaseUrl || !serviceKey || !vapidPrivateKey) {
    return json({ error: "Serviço de notificações ainda não configurado." }, 503);
  }

  let payload: { type?: string; title?: string; body?: string; url?: string };
  try { payload = await request.json(); } catch { return json({ error: "JSON inválido." }, 400); }

  const type = payload.type;
  if (type !== "update" && type !== "announcement") return json({ error: "Tipo de notificação inválido." }, 400);
  const title = String(payload.title ?? "").trim().slice(0, 55);
  const body = String(payload.body ?? "").trim().slice(0, 180);
  const rawUrl = String(payload.url ?? "/dashboard");
  const targetUrl = rawUrl.startsWith("/") && !rawUrl.startsWith("//") ? rawUrl : "/dashboard";
  if (!title || !body) return json({ error: "Título e mensagem são obrigatórios." }, 400);

  const suppliedReleaseSecret = request.headers.get("x-release-secret") ?? "";
  const isReleaseWebhook = Boolean(releaseSecret && suppliedReleaseSecret && suppliedReleaseSecret === releaseSecret);

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  if (!isReleaseWebhook) {
    const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "Autenticação necessária." }, 401);
    const { data: authData, error: authError } = await admin.auth.getUser(token);
    if (authError || !authData.user) return json({ error: "Sessão inválida." }, 401);
    const { data: role, error: roleError } = await admin.from("user_roles")
      .select("role").eq("user_id", authData.user.id).eq("role", "admin").maybeSingle();
    if (roleError || !role) return json({ error: "Apenas administradores podem enviar comunicados." }, 403);
    if (type !== "announcement") return json({ error: "Envios de atualização são reservados ao fluxo de publicação." }, 403);
  } else if (type !== "update") {
    return json({ error: "O webhook de publicação só pode enviar avisos de atualização." }, 403);
  }

  try {
    webpush.setVapidDetails(Deno.env.get("VAPID_SUBJECT") ?? "mailto:suporte@norteconcursos.xyz", vapidPublicKey, vapidPrivateKey);
  } catch {
    return json({ error: "Chaves VAPID inválidas. Revise os segredos da função." }, 503);
  }

  const preferenceColumn = type === "update" ? "updates_enabled" : "announcements_enabled";
  const { data: subscriptions, error: queryError } = await admin.from("push_subscriptions")
    .select("id, endpoint, p256dh, auth")
    .eq("enabled", true)
    .eq(preferenceColumn, true)
    .limit(5000);
  if (queryError) return json({ error: "Não foi possível consultar os dispositivos." }, 500);

  const notification = JSON.stringify({
    title,
    body,
    url: targetUrl,
    tag: type === "update" ? "norte-platform-update" : "norte-important-announcement",
    icon: "/icons/norte-192.png",
    badge: "/icons/favicon-32.png",
    timestamp: Date.now(),
  });

  let sent = 0;
  let failed = 0;
  let removed = 0;
  await Promise.all((subscriptions ?? []).map(async (subscription) => {
    try {
      await webpush.sendNotification({
        endpoint: subscription.endpoint,
        keys: { p256dh: subscription.p256dh, auth: subscription.auth },
      }, notification, { TTL: 60 * 60 * 24, urgency: "normal" });
      sent++;
    } catch (error) {
      failed++;
      const statusCode = Number((error as { statusCode?: number })?.statusCode ?? 0);
      if (statusCode === 404 || statusCode === 410) {
        const { error: deleteError } = await admin.from("push_subscriptions").delete().eq("id", subscription.id);
        if (!deleteError) removed++;
      }
    }
  }));

  return json({ success: true, type, sent, failed, removed, total: subscriptions?.length ?? 0 });
});
