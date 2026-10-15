// Targeted, transactional deployment. Reads an access token only from secure environment settings.
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const project = "gkwphadbveiyjcwiiizw";
const file = "supabase/migrations/20261015010000_balanced_daily_guest_questions.sql";
const sql = await readFile(file, "utf8"),
  sha256 = createHash("sha256").update(sql).digest("hex");
if (process.argv.includes("--dry-run")) {
  await mkdir("outputs", { recursive: true });
  await writeFile(
    "outputs/guest-daily-publication.sql",
    `begin;\n${sql}\nnotify pgrst,'reload schema';\ncommit;\n`,
  );
  console.log(
    JSON.stringify(
      {
        project,
        file,
        sha256,
        preparedSQL: "outputs/guest-daily-publication.sql",
        operation:
          "replace daily selector and create private selection history; no edits to questions, answers or publication statuses",
      },
      null,
      2,
    ),
  );
  process.exit(0);
}
const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!token)
  throw new Error(
    "SUPABASE_ACCESS_TOKEN is required in secure environment settings. A service key cannot deploy SQL.",
  );
async function query(query) {
  const r = await fetch(`https://api.supabase.com/v1/projects/${project}/database/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!r.ok)
    throw new Error(`Supabase management returned HTTP ${r.status}; deployment is not verified`);
  return r.json();
}
const quote = (s) => "'" + s.replaceAll("'", "''") + "'";
const before = await query(
  "select pg_get_functiondef(to_regprocedure('public.get_daily_guest_questions(integer)')) as definition",
);
if (!Array.isArray(before) || !before[0]?.definition)
  throw new Error("Cannot snapshot the current daily selector");
const folder = `outputs/guest-deploy-${Date.now()}`;
await mkdir(folder, { recursive: true });
await writeFile(folder + "/before.json", JSON.stringify({ sha256, before }, null, 2) + "\n");
const guard = `do ${quote(`begin if pg_get_functiondef(to_regprocedure('public.get_daily_guest_questions(integer)')) is distinct from ${quote(before[0].definition)} then raise exception 'Concurrent daily selector change'; end if; end;`)};`;
await query(
  `begin isolation level serializable; select pg_advisory_xact_lock(hashtext('norte-daily-guest-deploy')); ${guard}\n${sql}\nnotify pgrst,'reload schema';commit;`,
);
const verification = await query(
  "select pg_get_functiondef(to_regprocedure('public.get_daily_guest_questions(integer)')) as definition,has_function_privilege('anon','public.get_daily_guest_questions(integer)','execute') as public_access,has_function_privilege('anon','public._guest_question_pool(uuid[])','execute') as pool_access",
);
if (
  !verification?.[0]?.definition?.includes("norte-daily-guest-v2") ||
  !verification[0].public_access ||
  verification[0].pool_access
)
  throw new Error("Post-deployment verification failed");
console.log(
  JSON.stringify({
    project,
    sha256,
    deployed: true,
    snapshot: folder + "/before.json",
    public_access: true,
    pool_access: false,
  }),
);
