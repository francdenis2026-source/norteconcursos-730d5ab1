// Local PostgreSQL-compatible test only. Never connects to a Supabase project.
// Install PGlite 0.5.9 in a temporary directory and provide its module path.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
if (!process.env.RANKING_SQL_TEST_MODULE)
  throw new Error("Set RANKING_SQL_TEST_MODULE to the temporary PGlite module");
const { PGlite } = await import(pathToFileURL(process.env.RANKING_SQL_TEST_MODULE).href);
const db = new PGlite();
try {
  await db.exec(`
 create role anon; create role authenticated;
 create schema auth;
 create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 create table profiles(id uuid primary key,full_name text);
 create table user_roles(user_id uuid,role text);
 create table fixture_scores(user_id uuid,qp integer,sp integer,fp integer,ep integer,hrs numeric,qn integer,qc integer,sn integer);
 create function score_events(_since timestamptz default '-infinity') returns setof fixture_scores language sql stable as $$select * from fixture_scores$$;
 create table simulator_attempts(user_id uuid,accuracy numeric);
 create table user_streaks(user_id uuid,longest_streak integer);
 create table achievements(id uuid,name text);
 create table user_achievements(user_id uuid,achievement_id uuid);
 create function level_of(integer) returns table(stars integer,level_name text,level_min integer,next_min integer) language sql immutable as $$select 1,'Aspirante'::text,0,250$$;
 insert into profiles select lpad(i::text,32,'0')::uuid,'CANDIDATO '||i from generate_series(1,237) i;
 insert into user_roles select id,'admin' from profiles order by id limit 3;
 update profiles set full_name='ANTÔNIA DA LIBERDADE SILVA' where id=lpad('237',32,'0')::uuid;
 insert into fixture_scores select id,1000-row_number() over(order by id)::integer,0,0,0,1,4,2,0 from profiles order by id limit 10;
 insert into fixture_scores values(lpad('237',32,'0')::uuid,0,0,0,0,100,4,2,0);
 select set_config('request.jwt.claim.sub',lpad('237',32,'0'),false);
 `);
  await db.exec(
    await readFile(
      new URL(
        "../../supabase/migrations/20261012120000_ranking_without_study_time.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  await db.exec(
    await readFile(
      new URL(
        "../../supabase/migrations/20261014030000_paginated_student_ranking.sql",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  const page = async (kind = "general", number = 1, size = 20, search = "") =>
    (await db.query("select get_ranking_page($1,$2,$3,$4) as data", [kind, number, size, search]))
      .rows[0].data;
  const first = await page();
  assert.equal(first.total, 234);
  assert.equal(first.participants, 234);
  assert.equal(first.entries.length, 20);
  assert.equal(first.page_count, 12);
  assert.equal(first.my_entry.rank_position, 234);
  assert.equal(first.my_entry.points, 0);
  assert.equal(first.my_entry.questions, 4);
  assert.equal(first.my_entry.accuracy, 50);
  assert.equal(first.my_entry.display_name, "ANTÔNIA S.");
  const all = [];
  for (let p = 1; p <= 12; p++) all.push(...(await page("general", p)).entries);
  assert.equal(new Set(all.map((e) => e.user_id)).size, 234);
  assert.deepEqual(
    all.map((e) => e.rank_position),
    Array.from({ length: 234 }, (_, i) => i + 1),
  );
  assert.ok(
    all.every(
      (e) =>
        ![
          "00000000-0000-0000-0000-000000000001",
          "00000000-0000-0000-0000-000000000002",
          "00000000-0000-0000-0000-000000000003",
        ].includes(e.user_id),
    ),
  );
  const found = await page("general", 1, 20, "antonia");
  assert.equal(found.total, 1);
  assert.equal(found.entries[0].rank_position, 234);
  assert.equal(found.my_entry.rank_position, 234);
  assert.equal((await page("general", 1, 20, "LIBERDADE")).total, 0); // Private middle names are not searchable.
  assert.equal((await page("general", 1, 20, "%")).total, 0);
  assert.equal((await page("general", 1, 20, "_")).total, 0);
  assert.equal((await page("general", 2147483647, 1000)).page, 3);
  assert.equal((await page("general", -1, 0)).page_size, 1);
  assert.equal((await page("questions")).total, 7);
  assert.equal((await page("questions")).my_entry.rank_position, null);
  assert.equal((await page("simulators")).total, 0);
  assert.equal((await page("general", 1, 20, "absent")).page_count, 1);
  assert.ok(all.every((e) => !("full_name" in e) && !("email" in e)));
  assert.equal((await page("general", 12)).entries.at(-1).is_me, true);
  await assert.rejects(page("arbitrary"));
  await db.exec(`select set_config('request.jwt.claim.sub','',false)`);
  await assert.rejects(page());
  await db.exec("set role anon");
  await assert.rejects(page());
  console.log(
    "PASS SQL: 234 candidates, 12 pages, zero points, own position, stable ranks, protected names, literal search, limits and anonymous denial",
  );
} finally {
  await db.close();
}
