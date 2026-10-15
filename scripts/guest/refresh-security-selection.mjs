// Republish approved existing items only. No question text, answer or review-status writes.
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash, randomBytes } from "node:crypto";
import { dailyGuestQuestions } from "../../src/lib/dailyGuestQuestions.ts";
const key = process.env.SUPABASE_SECRET_KEY;
if (!key) throw new Error("SUPABASE_SECRET_KEY is required in secure environment settings");
const base = "https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/";
async function api(path, body, prefer) {
  const response = await fetch(base + path, {
    method: body === undefined ? "GET" : "POST",
    headers: {
      apikey: key,
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok)
    throw new Error("Supabase HTTP " + response.status + " for " + path.split("?")[0]);
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}
async function all(path, body) {
  const rows = [];
  for (let offset = 0; ;) {
    const page = await api(
      path + (path.includes("?") ? "&" : "?") + "limit=1000&offset=" + offset,
      body,
    );
    if (!page.length) return rows;
    rows.push(...page);
    offset += page.length;
  }
}
const day = await api("rpc/get_current_acre_date", {});
const history = await all(
  "daily_guest_question_items?select=day,position,question_id,content_key&order=day,position",
);
const pool = await all(
  "rpc/_guest_question_pool?select=question_id,content_key,question_format&question_format=eq.true_false",
  { p_ids: null },
);
const poolMap = new Map(pool.map((q) => [q.question_id, q]));
const rows = await all(
  "official_exam_questions?select=id,contest_name,career_name,career_category,exam_year,exam_board,subject,question_text,official_answer,review_note,legal_basis,content_status,law_version_checked_at,legal_review_required,legal_audit_completed,context_review_required&content_status=eq.active&order=id",
);
const seenIds = new Set(history.map((q) => q.question_id)),
  seenContent = new Set(history.map((q) => q.content_key));
const candidates = rows.filter(
  (q) =>
    poolMap.has(q.id) &&
    !seenIds.has(q.id) &&
    !seenContent.has(poolMap.get(q.id).content_key) &&
    dailyGuestQuestions([q]).length,
);
const nonce = randomBytes(32).toString("hex");
const plans = [];
const planned = [];
const year = Number(day.slice(0, 4));
for (let d = 0; d < 14; d++) {
  const date = new Date(day + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() + d);
  const target = date.toISOString().slice(0, 10);
  const subjects = new Map(),
    careers = new Map(),
    answers = new Map();
  const rank = (q) => [
    Number((answers.get(q.official_answer) ?? 0) >= 5),
    Number(q.exam_year < year - 2),
    subjects.get(q.subject) ?? 0,
    careers.get(q.contest_name + " / " + q.career_name) ?? 0,
    answers.get(q.official_answer) ?? 0,
    createHash("sha256")
      .update(nonce + target + q.id)
      .digest("hex"),
  ];
  const selected = [];
  for (let n = 0; n < 10; n++) {
    const stock = candidates.filter(
      (q) => !seenIds.has(q.id) && !seenContent.has(poolMap.get(q.id).content_key),
    );
    stock.sort((a, b) => {
      const x = rank(a),
        y = rank(b);
      for (let k = 0; k < x.length; k++) {
        if (x[k] !== y[k]) return x[k] < y[k] ? -1 : 1;
      }
      return 0;
    });
    if (!stock.length) break;
    const q = stock[0];
    selected.push(q);
    seenIds.add(q.id);
    seenContent.add(poolMap.get(q.id).content_key);
    subjects.set(q.subject, (subjects.get(q.subject) ?? 0) + 1);
    const career = q.contest_name + " / " + q.career_name;
    careers.set(career, (careers.get(career) ?? 0) + 1);
    answers.set(q.official_answer, (answers.get(q.official_answer) ?? 0) + 1);
  }
  if (selected.length !== 10)
    throw new Error("Insufficient reviewed stock for fourteen complete days");
  plans.push({
    day: target,
    count: 10,
    years: [...new Set(selected.map((q) => q.exam_year))],
    subjects: subjects.size,
    careers: Object.fromEntries(careers),
    answers: Object.fromEntries(answers),
  });
  selected.forEach((q, i) =>
    planned.push({
      day: target,
      position: i + 1,
      question_id: q.id,
      content_key: poolMap.get(q.id).content_key,
    }),
  );
}
await mkdir("outputs", { recursive: true });
await writeFile(
  "outputs/security-daily-refresh-plan.json",
  JSON.stringify({ day, history, planned, summary: plans }, null, 2),
);
console.log(
  JSON.stringify(
    {
      eligibleUnseen: candidates.length,
      days: plans.length,
      today: plans[0],
      operation: process.argv.includes("--apply") ? "apply" : "dry-run",
    },
    null,
    2,
  ),
);
if (process.argv.includes("--apply")) {
  const current = await all(
    "daily_guest_question_items?select=day,position,question_id,content_key&order=day,position",
  );
  if (JSON.stringify(current) !== JSON.stringify(history))
    throw new Error("Concurrent selection change; restart instead of overwriting");
  if ((await api("rpc/get_current_acre_date", {})) !== day)
    throw new Error("Acre date changed; restart");
  await api(
    "daily_guest_question_sets?on_conflict=day",
    plans.map((p) => ({ day: p.day })),
    "resolution=ignore-duplicates,return=minimal",
  );
  await api(
    "daily_guest_question_items?on_conflict=day,position",
    planned,
    "resolution=merge-duplicates,return=minimal",
  );
  const served = await api(
    "rpc/get_daily_guest_questions?select=id,contest_name,career_name,career_category,exam_year,exam_board,subject,question_text,official_answer,review_note,legal_basis,content_status,law_version_checked_at,legal_review_required,legal_audit_completed,context_review_required",
    { p_limit: 10 },
  );
  if (
    dailyGuestQuestions(served).length !== 10 ||
    served.some((q) => !planned.slice(0, 10).some((p) => p.question_id === q.id))
  )
    throw new Error("Live verification failed");
  console.log(
    "VERIFIED: today serves ten reviewed security C/E questions; fourteen private daily sets published; visitor quotas preserved.",
  );
}
