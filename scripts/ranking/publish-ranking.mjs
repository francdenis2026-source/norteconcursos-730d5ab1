// Authorized, targeted function deployment through Supabase's HTTPS management API.
// Tokens are read from environment variables and are never persisted.
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const project = process.env.TASK_SUPABASE_PROJECT ?? "gkwphadbveiyjcwiiizw";
if (project !== "gkwphadbveiyjcwiiizw") throw new Error("Unexpected project");
const files = [
  "supabase/migrations/20261012120000_ranking_without_study_time.sql",
  "supabase/migrations/20261014030000_paginated_student_ranking.sql",
];
const sql = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");
const hash = createHash("sha256").update(sql).digest("hex");
if (process.argv.includes("--dry-run")) {
  let preparedSQL;
  if (process.argv.includes("--emit-sql")) {
    preparedSQL = "outputs/ranking-publication-2026-10-14.sql";
    await mkdir("outputs", { recursive: true });
    await writeFile(preparedSQL, `begin;\n${sql}\nnotify pgrst, 'reload schema';\ncommit;\n`);
  }
  console.log(
    JSON.stringify(
      {
        project,
        files,
        sha256: hash,
        preparedSQL,
        operation: "replace ranking functions only; no student data writes",
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
    "SUPABASE_ACCESS_TOKEN is required in secure environment settings; database password and service keys cannot replace it",
  );
const endpoint = `https://api.supabase.com/v1/projects/${project}/database/query`;
async function query(sql) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: sql }),
  });
  if (!response.ok)
    throw new Error(`Management API returned HTTP ${response.status}; deployment not verified`);
  return response.json();
}
const signatures = [
  "public.get_ranking_section(text,integer)",
  "public.get_ranking_profile(uuid)",
  "public.rank_table(text,text)",
  "public.my_rank_summary(text,text)",
  "public.get_ranking_page(text,integer,integer,text)",
  "public._ranking_search_key(text)",
];
const literal = (value) => "'" + value.replaceAll("'", "''") + "'";
const before = await query(
  `select signature,pg_get_functiondef(to_regprocedure(signature)) as definition from unnest(array[${signatures.map(literal).join(",")}]) signature`,
);
if (!Array.isArray(before) || before.length !== signatures.length)
  throw new Error("Could not obtain complete function snapshot");
const guards = before
  .map(
    (row) =>
      `if pg_get_functiondef(to_regprocedure(${literal(row.signature)})) is distinct from ${row.definition === null ? "null" : literal(row.definition)} then raise exception 'Concurrent ranking update detected'; end if;`,
  )
  .join("\n");
const folder = `outputs/ranking-deploy-${Date.now()}`;
await mkdir(folder, { recursive: true });
await writeFile(
  `${folder}/before.json`,
  JSON.stringify({ sha256: hash, functions: before }, null, 2) + "\n",
);
const guardSQL = `do ${literal(`begin ${guards} end;`)};`;
await query(
  `begin isolation level serializable; select pg_advisory_xact_lock(hashtext('norte-ranking-functions')); ${guardSQL} ${sql}\n notify pgrst,'reload schema'; commit;`,
);
const after = await query(
  `select signature,pg_get_functiondef(to_regprocedure(signature)) as definition from unnest(array[${signatures.map(literal).join(",")}]) signature`,
);
if (!Array.isArray(after) || after.some((row) => !row.definition))
  throw new Error("Function deployment could not be verified");
await writeFile(
  `${folder}/after.json`,
  JSON.stringify({ sha256: hash, functions: after }, null, 2) + "\n",
);
// Read-only check in an authenticated DB context; no login links or credentials are generated.
const verified = await query(`with actor as materialized (
 select set_config('request.jwt.claim.sub',p.id::text,true) from public.profiles p
 where p.id='f5cb5a75-da7a-419b-897b-e8fd83dd3c17'::uuid
), page as materialized (select public.get_ranking_page('general',1,20,'') as data from actor)
select (data->>'participants')::integer as participants,
 data->'my_entry'->>'rank_position' is not null as requested_candidate_has_position,
 (data->'my_entry'->>'points')::integer as requested_candidate_points from page`);
await writeFile(`${folder}/verification.json`, JSON.stringify(verified, null, 2) + "\n");
if (!Array.isArray(verified) || !verified[0]?.requested_candidate_has_position)
  throw new Error("Requested candidate visibility was not verified");
console.log(
  JSON.stringify({ published: true, sha256: hash, evidence: folder, verification: verified }),
);
