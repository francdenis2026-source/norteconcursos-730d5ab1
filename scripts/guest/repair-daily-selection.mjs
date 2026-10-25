// Existing approved items only. Never update question text, answers, statuses or visitor progress.
import { mkdir, writeFile } from "node:fs/promises";
import { dailyGuestQuestions } from "../../src/lib/dailyGuestQuestions.ts";
import { planDailyGuestRepairs } from "../../src/lib/dailyGuestRepair.ts";
const secret = process.env.SUPABASE_SECRET_KEY;
if (!secret) throw new Error("SUPABASE_SECRET_KEY is required in secure environment settings");
const root = "https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/";
async function api(path, body, prefer) {
  const response = await fetch(root + path, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      apikey: secret,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Supabase HTTP ${response.status} for ${path.split("?")[0]}`);
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}
async function all(path, body) {
  const result = [];
  for (let offset = 0; ;) {
    const page = await api(
      path + (path.includes("?") ? "&" : "?") + `limit=1000&offset=${offset}`,
      body,
    );
    result.push(...page);
    if (page.length < 1000) return result;
    offset += page.length;
  }
}
const fields =
  "id,contest_name,career_name,career_category,exam_year,exam_board,subject,question_text,official_answer,review_note,legal_basis,content_status,law_version_checked_at,legal_review_required,legal_audit_completed,context_review_required";
const historyPath =
  "daily_guest_question_items?select=day,position,question_id,content_key&order=day,position";
const day = await api("rpc/get_current_acre_date", {}),
  history = await all(historyPath);
const pool = await all(
  "rpc/_guest_question_pool?select=question_id,content_key,question_format,question_text&question_format=eq.true_false&order=question_id",
  { p_ids: null },
);
const candidates = [];
for (let start = 0; start < pool.length; start += 80) {
  const batch = pool.slice(start, start + 80),
    byId = new Map(batch.map((q) => [q.question_id, q]));
  const rows = await api(
    `official_exam_questions?select=${fields}&id=in.(${batch.map((q) => q.question_id).join(",")})`,
  );
  for (const row of rows) {
    const served = { ...row, question_text: byId.get(row.id).question_text };
    if (dailyGuestQuestions([served]).length)
      candidates.push({
        id: row.id,
        key: byId.get(row.id).content_key,
        subject: row.subject,
        career: row.contest_name + " / " + row.career_name,
        year: row.exam_year,
        answer: row.official_answer,
      });
  }
}
const daysArg = process.argv.find((arg) => arg.startsWith("--days="));
const days = daysArg ? Number(daysArg.slice(7)) : 1;
const plan = planDailyGuestRepairs(day, history, candidates, days);
const folder = `outputs/guest-repair-${Date.now()}`;
await mkdir(folder, { recursive: true });
await writeFile(folder + "/plan.json", JSON.stringify({ day, history, ...plan }, null, 2));
console.log(
  JSON.stringify(
    {
      mode: process.argv.includes("--apply") ? "apply" : "dry-run",
      eligibleStock: candidates.length,
      changes: plan.changes.length,
      summary: plan.summary,
      snapshot: folder + "/plan.json",
    },
    null,
    2,
  ),
);
if (process.argv.includes("--apply")) {
  if ((await api("rpc/get_current_acre_date", {})) !== day)
    throw new Error("Acre day changed; restart");
  if (JSON.stringify(await all(historyPath)) !== JSON.stringify(history))
    throw new Error("Concurrent selection change; restart");
  await api(
    "daily_guest_question_sets?on_conflict=day",
    plan.summary.map((q) => ({ day: q.day })),
    "resolution=ignore-duplicates,return=minimal",
  );
  // A single bulk request updates only invalid/missing slots. Valid published positions remain untouched.
  if (plan.changes.length)
    await api(
      "daily_guest_question_items?on_conflict=day,position",
      plan.changes,
      "resolution=merge-duplicates,return=minimal",
    );
  const after = await all(historyPath),
    approved = new Map(candidates.map((q) => [q.id, q.key]));
  for (const summary of plan.summary) {
    const items = after.filter((q) => q.day === summary.day);
    if (items.length !== 10 || items.some((q) => approved.get(q.question_id) !== q.content_key))
      throw new Error("Stored-day verification failed: " + summary.day);
  }
  const originalGood = history.filter(
    (q) => q.day === day && approved.get(q.question_id) === q.content_key,
  );
  if (originalGood.some((q) => !after.some((a) => JSON.stringify(a) === JSON.stringify(q))))
    throw new Error("Valid current-day item was changed");
  const served = await api("rpc/get_daily_guest_questions?select=" + fields, { p_limit: 10 });
  if (dailyGuestQuestions(served).length !== 10)
    throw new Error("Public API still does not serve ten eligible questions");
  console.log(
    JSON.stringify({
      verified: true,
      day,
      publicQuestions: 10,
      currentValidPositionsPreserved: originalGood.length,
      completeDays: plan.summary.length,
    }),
  );
}
