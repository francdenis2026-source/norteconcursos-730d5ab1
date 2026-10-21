/** Test automatic Auth enforcement without any frontend ownership call. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const { PGlite } = await import(process.env.PGLITE_MODULE || '@electric-sql/pglite');
const db = new PGlite();
try {
  await db.exec(`
    create role authenticated; create role anon;
    create schema auth;
    create table auth.users(id uuid primary key);
    create table auth.sessions(id uuid primary key, user_id uuid references auth.users(id), created_at timestamptz not null, updated_at timestamptz);
    create table auth.refresh_tokens(session_id uuid references auth.sessions(id) on delete cascade);
    create function auth.jwt() returns jsonb language sql stable as $$ select current_setting('request.jwt.claims', true)::jsonb $$;
    create function auth.uid() returns uuid language sql stable as $$ select (auth.jwt()->>'sub')::uuid $$;
    grant usage on schema auth, public to authenticated, anon;
  `);
  const load = name => readFile(new URL(`../../supabase/migrations/${name}`,import.meta.url),'utf8');
  await db.exec(await load('20261021170000_enforce_account_session.sql'));
  const migration=await load('20261021213000_register_account_session_on_auth_login.sql');
  const uid='11111111-1111-4111-8111-111111111111', other='55555555-5555-4555-8555-555555555555';
  const old='22222222-2222-4222-8222-222222222222', newest='33333333-3333-4333-8333-333333333333', next='44444444-4444-4444-8444-444444444444';
  await db.query('insert into auth.users values ($1),($2)',[uid,other]);
  await db.query(`insert into auth.sessions(id,user_id,created_at) values
    ($1,$2,'2026-10-20T10:00:00Z'),($3,$2,'2026-10-21T10:00:00Z'),($4,$4,'2026-10-21T10:00:00Z')`,[old,uid,newest,other]);
  await db.query('insert into auth.refresh_tokens values ($1),($2)',[old,newest]);
  await db.exec(migration);
  const registered=async user=>(await db.query('select session_key from public.active_user_sessions where user_id=$1',[user])).rows[0].session_key;
  const ids=async user=>(await db.query('select id from auth.sessions where user_id=$1 order by id',[user])).rows.map(r=>r.id);
  assert.deepEqual(await ids(uid),[newest],'migration removes old sessions that never reached the frontend guard');
  assert.equal(await registered(uid),`norte_auth_activity:${uid}:${newest}`);
  assert.equal((await db.query('select * from auth.refresh_tokens where session_id=$1',[old])).rows.length,0);
  await db.exec(migration);
  assert.deepEqual(await ids(uid),[newest],'migration can be re-run');
  await db.query(`insert into auth.sessions(id,user_id,created_at) values ($1,$2,'2026-10-21T11:00:00Z')`,[next,uid]);
  assert.deepEqual(await ids(uid),[next],'new Auth login evicts older sessions without calling RPC');
  assert.equal(await registered(uid),`norte_auth_activity:${uid}:${next}`);
  assert.deepEqual(await ids(other),[other],'other accounts remain untouched');
  await db.query('update auth.sessions set updated_at=now() where id=$1',[next]);
  assert.equal(await registered(uid),`norte_auth_activity:${uid}:${next}`,'token refresh does not create a takeover');
  await db.query("select set_config('request.jwt.claims',$1,false)",[JSON.stringify({sub:uid,session_id:next})]);
  await db.exec('set role authenticated');
  assert.equal((await db.query('select public.verify_account_session(false) as owns')).rows[0].owns,true,'new device verifies without a frontend claim');
  await db.exec('reset role');
  await db.query("select set_config('request.jwt.claims',$1,false)",[JSON.stringify({sub:uid,session_id:newest})]);
  await db.exec('set role authenticated');
  assert.equal((await db.query('select public.verify_account_session(true) as owns')).rows[0].owns,false,'stale JWT cannot reclaim');
  await db.exec('reset role');
  console.log('PASS actual SQL: existing-session reconciliation, repeatable migration, automatic Auth login eviction without RPC, refresh token cascade, account isolation and stale JWT rejection');
} finally {await db.close();}
