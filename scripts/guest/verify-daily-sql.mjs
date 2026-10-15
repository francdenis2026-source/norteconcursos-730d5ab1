// Local PostgreSQL engine only. No project connection or educational publication.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { PGlite } = await import(pathToFileURL(process.env.GUEST_SQL_TEST_MODULE).href);
const db = new PGlite();
const migration = await readFile(
  "supabase/migrations/20261015010000_balanced_daily_guest_questions.sql",
  "utf8",
);
try {
  await db.exec(`create role anon;create role authenticated;
 create schema auth;
 create function auth.uid() returns uuid language sql stable as $$select null::uuid$$;
 create function public.has_role(uuid,text) returns boolean language sql stable as $$select false$$;
 create table syllabus_editions(id uuid primary key,status text);
 create table syllabus_topics(id uuid primary key,edition_id uuid,content_status text);
 create table official_exam_questions(id uuid primary key,syllabus_topic_id uuid,current_syllabus_topic_id uuid,contest_name text,career_name text,career_category text,exam_board text,exam_year integer,subject text,question_text text,official_answer text,content_status text,context_review_required boolean,legal_review_required boolean,legal_audit_completed boolean,legal_basis jsonb,law_version_checked_at timestamptz);
 create function get_current_acre_date() returns date language sql stable as $$select coalesce(nullif(current_setting('fixture.acre_day',true),''),'2026-10-15')::date$$;
 insert into syllabus_editions values('00000000-0000-0000-0000-000000000001','active');
 insert into syllabus_topics values('00000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','current');
 insert into official_exam_questions select lpad(i::text,32,'0')::uuid,'00000000-0000-0000-0000-000000000001',null,
 case when i%10<6 then 'Polícia Civil' else 'Secretaria de Administração' end,
 case when i%10<6 then 'Agente de Polícia' else 'Analista Administrativo' end,
 case when i%10<6 then 'Polícia Civil' else 'Administrativo/Outros' end,
 case when i%2=0 then 'CEBRASPE' else 'FGV' end,2025+i%2,
 (array['Língua Portuguesa','Informática','Matemática','Direito Constitucional','Direito Administrativo','Raciocínio Lógico','Estatística','Contabilidade'])[i%8+1],
 'Enunciado independente de teste número '||i||case when i%2=0 then '. Julgue a afirmação sobre este assunto.' else E'.\n(A) Primeira alternativa.\n(B) Segunda alternativa.\n(C) Terceira alternativa.\n(D) Quarta alternativa.\n(E) Quinta alternativa.' end,
 case when i%2=0 then case when i%4=0 then 'C' else 'E' end else substr('ABCDE',i%5+1,1) end,
 'active',false,false,true,'[{"url":"https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"}]'::jsonb,'2026-10-10'::timestamptz from generate_series(1,400)i;
 `);
  const basis = await readFile(
    "supabase/migrations/20261004140000_platform_audit_fixes.sql",
    "utf8",
  );
  await db.exec(
    basis.slice(
      basis.indexOf("create or replace function public.has_verified_question_basis"),
      basis.indexOf("create or replace function public.get_daily_guest_questions"),
    ),
  );
  assert.equal(
    (await db.query("select to_regclass('public.question_support_texts') as name")).rows[0].name,
    null,
  );
  await db.exec(migration);
  assert.equal(
    (
      await db.query(
        "select _guest_question_kind('Questão incompleta. (A) Uma. (B) Duas. (C) Três.','C','CEBRASPE') as kind",
      )
    ).rows[0].kind,
    null,
  );
  const get = async (limit = 10) =>
    (await db.query("select * from get_daily_guest_questions($1)", [limit])).rows;
  const first = await get();
  assert.equal(first.length, 10);
  await db.exec(`begin;
${migration}
notify pgrst,'reload schema';
commit;`);
  assert.deepEqual(
    await get(),
    first,
    "rerunning the standalone migration preserves the current daily set",
  );
  assert.deepEqual(await get(), first);
  assert.deepEqual(await get(3), first.slice(0, 3));
  assert.equal((await get(50)).length, 10);
  assert.equal((await get(-1)).length, 0);
  assert.equal(first.filter((q) => q.exam_board === "FGV").length, 5);
  assert.equal(first.filter((q) => q.career_category === "Polícia Civil").length, 6);
  assert.ok(new Set(first.map((q) => q.subject)).size >= 6);
  assert.ok(
    new Set(first.filter((q) => q.exam_board === "FGV").map((q) => q.official_answer)).size >= 3,
  );
  assert.equal(
    new Set(first.filter((q) => q.exam_board === "CEBRASPE").map((q) => q.official_answer)).size,
    2,
  );
  const seen = new Set(first.map((q) => q.id));
  for (const day of ["2026-10-16", "2026-10-17"]) {
    await db.query("select set_config('fixture.acre_day',$1,false)", [day]);
    for (const q of await get()) {
      assert.ok(!seen.has(q.id));
      seen.add(q.id);
    }
  }
  // Changes to the underlying catalog cannot expose a quarantined cached item.
  const current = await get();
  await db.query("update official_exam_questions set content_status='under_review' where id=$1", [
    current[0].id,
  ]);
  assert.equal((await get()).length, 9);
  // Duplicate imports cannot bypass the history, even under another ID/case/spacing.
  await db.exec(
    `insert into official_exam_questions select (jsonb_populate_record(q,to_jsonb(q)||jsonb_build_object('id','99999999-0000-0000-0000-000000000001','question_text',upper(replace(q.question_text,' ','  '))))).* from official_exam_questions q where id='${first[0].id}';`,
  );
  const pool = (await db.query("select content_key from _guest_question_pool()")).rows;
  assert.ok(pool.length > new Set(pool.map((q) => q.content_key)).size);
  await db.query("select set_config('fixture.acre_day','2026-10-18',false)");
  assert.ok(!(await get()).some((q) => q.id === "99999999-0000-0000-0000-000000000001"));
  // Missing alternative transcriptions and absent Portuguese context stay out.
  await db.exec(`insert into official_exam_questions select (jsonb_populate_record(q,to_jsonb(q)||jsonb_build_object('id','99999999-0000-0000-0000-000000000002','question_text','Assinale a alternativa correta, sem alternativas cadastradas.','exam_board','FGV','official_answer','C'))).* from official_exam_questions q limit 1;
 insert into official_exam_questions select (jsonb_populate_record(q,to_jsonb(q)||jsonb_build_object('id','99999999-0000-0000-0000-000000000003','subject','Língua Portuguesa','question_text','Segundo o autor, o texto apresenta uma opinião sobre a leitura.','exam_board','CEBRASPE','official_answer','C'))).* from official_exam_questions q limit 1;`);
  let bad = (
    await db.query(
      "select question_id from _guest_question_pool() where question_id in ('99999999-0000-0000-0000-000000000002','99999999-0000-0000-0000-000000000003')",
    )
  ).rows;
  assert.equal(bad.length, 0);
  await db.exec(
    `insert into question_support_texts(id,label,body,contest_name,exam_year) values('88888888-0000-0000-0000-000000000001','Texto 1','Texto de apoio completo para a questão de interpretação, com contexto suficiente.','Concurso de teste',2026);update official_exam_questions set support_text_id='88888888-0000-0000-0000-000000000001' where id='99999999-0000-0000-0000-000000000003';`,
  );
  const supported = (
    await db.query(
      "select question_text as text from _guest_question_pool() where question_id='99999999-0000-0000-0000-000000000003'",
    )
  ).rows[0];
  assert.match(supported.text, /^Texto-base \[Texto 1\]:/);
  assert.match(supported.text, /\[\[\/texto-base\]\]/);
  await db.exec("set role anon");
  assert.equal((await get()).length, 10);
  await assert.rejects(() => db.query("select * from _guest_question_pool()"), /permission denied/);
  await assert.rejects(
    () => db.query("select * from daily_guest_question_items"),
    /permission denied/,
  );
  await assert.rejects(
    () => db.query("select * from official_exam_questions"),
    /permission denied/,
  );
  await db.exec("reset role");
  // Sparse stock degrades honestly, never invents a format or returns duplicates.
  await db.exec(
    "update official_exam_questions set content_status='under_review' where exam_board='FGV';select set_config('fixture.acre_day','2026-10-19',false)",
  );
  const sparse = await get();
  assert.equal(sparse.length, 10);
  assert.ok(sparse.every((q) => q.exam_board === "CEBRASPE"));
  assert.equal(new Set(sparse.map((q) => q.id)).size, 10);
  const keep = (
    await db.query(
      "select id from official_exam_questions where content_status='active' and exam_board='CEBRASPE' order by id limit 15",
    )
  ).rows.map((r) => r.id);
  await db.query(
    "update official_exam_questions set content_status='under_review' where not(id=any($1::uuid[]))",
    [keep],
  );
  await db.exec(
    "truncate daily_guest_question_items,daily_guest_question_sets;select set_config('fixture.acre_day','2026-11-01',false)",
  );
  const cycle1 = await get();
  assert.equal(cycle1.length, 10);
  await db.exec("select set_config('fixture.acre_day','2026-11-02',false)");
  const cycle2 = await get();
  assert.equal(cycle2.length, 10);
  assert.equal(new Set([...cycle1, ...cycle2].map((q) => q.id)).size, 15);
  assert.ok(cycle2.slice(0, 5).every((q) => !cycle1.some((p) => p.id === q.id)));
  console.log(
    "PASS SQL: standalone migration without support table/column, safe rerun, 10 shared questions, clamped limits, 5/5 formats, 6/4 careers, subject/answer diversity, date renewal, history, duplicates, quarantine, missing context/options, support text, anon isolation and sparse fallback.",
  );
  if (process.env.GUEST_AUDIT_DATA) {
    await db.exec(
      "truncate daily_guest_question_items,daily_guest_question_sets,official_exam_questions,syllabus_topics,syllabus_editions;select set_config('fixture.acre_day','2026-10-15',false)",
    );
    const datasets = [
      ["syllabus_editions", "/tmp/edital-syllabus_editions.json"],
      ["syllabus_topics", "/tmp/edital-syllabus_topics.json"],
      ["official_exam_questions", process.env.GUEST_AUDIT_DATA],
    ];
    for (const [table, path] of datasets)
      await db.query(
        `insert into ${table} select * from jsonb_populate_recordset(null::${table},$1::jsonb)`,
        [await readFile(path, "utf8")],
      );
    const started = Date.now();
    const poolStats = (
      await db.query(
        "select question_format,count(*)::integer as count from _guest_question_pool() group by question_format",
      )
    ).rows;
    const poolElapsed = Date.now() - started;
    console.log("CORPUS pool verification ms " + poolElapsed);
    const chosen = await get();
    const elapsed = Date.now() - started;
    const cachedStarted = Date.now();
    assert.deepEqual(await get(), chosen);
    const cachedVerificationMs = Date.now() - cachedStarted;
    assert.equal(chosen.length, 10);
    const stats = {
      eligibleByFormat: poolStats,
      selected: chosen.map((q) => ({
        id: q.id,
        year: q.exam_year,
        subject: q.subject,
        board: q.exam_board,
        career: q.career_name,
        answer: q.official_answer,
      })),
      localVerificationMs: elapsed,
      cachedVerificationMs,
    };
    console.log("READ-ONLY CORPUS SIMULATION " + JSON.stringify(stats));
  }
} finally {
  await db.close();
}
