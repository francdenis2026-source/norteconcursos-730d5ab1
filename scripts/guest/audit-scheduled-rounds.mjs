// Read-only check of stored rounds against the server's current eligibility rules.
// Credentials are read exclusively from the environment. Raw evidence stays in ignored outputs.
import { mkdir, writeFile } from "node:fs/promises";
const [from, daysText] = process.argv.slice(2);
const days = Number(daysText);
if (!/^\d{4}-\d{2}-\d{2}$/.test(from ?? "") || !Number.isInteger(days) || days < 1 || days > 31)
  throw new Error("Usage: node scripts/guest/audit-scheduled-rounds.mjs YYYY-MM-DD DAYS(1..31)");
const start = Date.parse(`${from}T12:00:00Z`);
if (!Number.isFinite(start) || new Date(start).toISOString().slice(0, 10) !== from)
  throw new Error("Invalid date");
const dates = Array.from({ length: days }, (_, i) =>
  new Date(start + i * 86400000).toISOString().slice(0, 10),
);
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required");
async function read(path, body) {
  const response = await fetch(`${url}/rest/v1/${path}`, {
    method: body ? "POST" : "GET",
    headers: { apikey: key, "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`Read failed: HTTP ${response.status}`);
  return response.json();
}
const [day, items, pool] = await Promise.all([
  read("rpc/get_current_acre_date", {}),
  read(
    `daily_guest_question_items?select=*&day=gte.${from}&day=lte.${dates.at(-1)}&order=day,position`,
  ),
  read("rpc/_guest_question_pool", {}),
]);
const eligible = new Map(pool.map((q) => [q.question_id, q]));
const rounds = dates.map((date) => {
  const rows = items.filter((r) => r.day === date);
  const valid = rows.filter(
    (r) => eligible.has(r.question_id) && eligible.get(r.question_id).content_key === r.content_key,
  );
  const correct = valid.filter((r) => eligible.get(r.question_id).official_answer === "C").length;
  const wrong = valid.filter((r) => eligible.get(r.question_id).official_answer === "E").length;
  const ok =
    rows.length === 10 &&
    valid.length === 10 &&
    correct === 5 &&
    wrong === 5 &&
    new Set(rows.map((r) => r.question_id)).size === 10 &&
    new Set(rows.map((r) => r.content_key)).size === 10 &&
    rows.every((r, i) => r.position === i + 1);
  return { date, questions: rows.length, eligible: valid.length, correct, wrong, ok };
});
await mkdir("outputs/round-repair-2026-10-19", { recursive: true });
await writeFile(
  "outputs/round-repair-2026-10-19/verified.json",
  JSON.stringify({ checkedAt: new Date().toISOString(), day, rounds, items, pool }, null, 2),
);
console.log(JSON.stringify({ day, writes: 0, rounds }, null, 2));
if (rounds.some((r) => !r.ok)) process.exitCode = 1;
