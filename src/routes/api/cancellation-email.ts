import { createFileRoute } from "@tanstack/react-router";

const SUPABASE_URL =
  process.env["VITE_SUPABASE_URL"] ??
  process.env["SUPABASE_URL"] ??
  "https://gkwphadbveiyjcwiiizw.supabase.co";
const SUPABASE_KEY =
  process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Rio_Branco",
  });
const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);

type Row = {
  id: string;
  receipt_number: string;
  user_name: string | null;
  user_email: string | null;
  plan_name: string;
  requested_at: string;
  effective_until: string;
  email_status: string;
};

/**
 * Envia o e-mail de confirmação do cancelamento do PRÓPRIO aluno (o recibo é lido com o token dele,
 * então a regra de acesso do banco já impede pedir o e-mail de outra pessoa) e registra o resultado.
 * Sem RESEND_API_KEY/RESEND_FROM configurados, grava "nao_configurado" e a tela avisa o aluno.
 */
async function handle(request: Request): Promise<Response> {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ error: "Entre na sua conta." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  if (!body?.id || !/^[0-9a-f-]{36}$/i.test(body.id))
    return Response.json({ error: "Recibo inválido." }, { status: 400 });

  const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` };
  const found = await fetch(
    `${SUPABASE_URL}/rest/v1/subscription_cancellations?id=eq.${body.id}&select=*`,
    { headers },
  );
  const [row] = found.ok ? ((await found.json()) as Row[]) : [];
  if (!row) return Response.json({ error: "Recibo não encontrado." }, { status: 404 });
  if (row.email_status === "enviado") return Response.json({ status: "enviado" });

  const mark = (status: string) =>
    fetch(`${SUPABASE_URL}/rest/v1/rpc/mark_cancellation_email`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ p_id: row.id, p_status: status }),
    });

  const apiKey = process.env["RESEND_API_KEY"];
  const from = process.env["RESEND_FROM"];
  if (!apiKey || !from || !row.user_email) {
    await mark("nao_configurado");
    return Response.json({ status: "nao_configurado" });
  }
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
    <h2>Cancelamento agendado</h2>
    <p>Olá, ${esc(row.user_name ?? "aluno")}. Recebemos o seu pedido de cancelamento do plano <b>${esc(row.plan_name)}</b>.</p>
    <p>Você continua com acesso ao plano <b>até ${esc(fmt(row.effective_until))}</b> (horário do Acre). Depois dessa data a conta volta ao plano Gratuito e você poderá assinar de novo.</p>
    <p>Recibo: <b>${esc(row.receipt_number)}</b> · pedido em ${esc(fmt(row.requested_at))}.<br>
    Você pode consultar e imprimir o recibo em Perfil → Histórico de assinatura.</p>
    <p style="color:#666;font-size:12px">Se você não fez este pedido, entre em contato com o suporte.</p></div>`;
  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [row.user_email],
      subject: `Cancelamento agendado — recibo ${row.receipt_number}`,
      html,
    }),
  }).catch(() => null);
  const status = sent?.ok ? "enviado" : "falhou";
  await mark(status);
  return Response.json({ status });
}

export const Route = createFileRoute("/api/cancellation-email")({
  server: { handlers: { POST: ({ request }) => handle(request) } },
});
