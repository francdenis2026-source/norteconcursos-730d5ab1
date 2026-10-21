/** Execute the actual migration against an isolated PostgreSQL-compatible engine. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const { PGlite } = await import(process.env.PGLITE_MODULE || '@electric-sql/pglite');
const db = new PGlite();
try {
  await db.exec(`
    create role authenticated; create role anon;
    create schema auth;
    create table auth.users(id uuid primary key);
    create table auth.sessions(id uuid primary key, user_id uuid references auth.users(id), created_at timestamptz not null);
    create table auth.refresh_tokens(session_id uuid references auth.sessions(id) on delete cascade);
    create function auth.jwt() returns jsonb language sql stable as $$ select current_setting('request.jwt.claims', true)::jsonb $$;
    create function auth.uid() returns uuid language sql stable as $$ select (auth.jwt()->>'sub')::uuid $$;
    grant usage on schema auth, public to authenticated, anon;
  `);
  const migration = await readFile(new URL('../../supabase/migrations/20261021170000_enforce_account_session.sql', import.meta.url), 'utf8');
  await db.exec(migration);
  const uid = '11111111-1111-4111-8111-111111111111';
  const old = '22222222-2222-4222-8222-222222222222';
  const next = '33333333-3333-4333-8333-333333333333';
  await db.query('insert into auth.users values ($1)', [uid]);
  await db.query(`insert into auth.sessions values ($1,$2,'2026-10-21T10:00:00Z')`, [old,uid]);
  await db.query('insert into auth.refresh_tokens values ($1)',[old]);
  const check = async (id, claim) => {
    await db.query("select set_config('request.jwt.claims',$1,false)", [JSON.stringify({sub:uid,session_id:id})]);
    await db.exec('set role authenticated');
    try { return (await db.query('select public.verify_account_session($1) as owns',[claim])).rows[0].owns; }
    finally { await db.exec('reset role'); }
  };
  assert.equal(await check(old,false),true,'first deployment adopts valid existing login');
  assert.equal(await check(old,false),true,'refresh/poll preserves login');
  await db.exec(migration);
  assert.equal(await check(old,false),true,'migration is repeatable and preserves registration');
  await db.query(`insert into auth.sessions values ($1,$2,'2026-10-21T11:00:00Z')`,[next,uid]);
  assert.equal(await check(old,false),false,'old device loses access as soon as newer auth login exists');
  assert.equal(await check(old,true),false,'old login cannot reclaim even with explicit claim');
  assert.equal(await check(next,true),true,'new login takes ownership');
  assert.equal((await db.query('select * from auth.sessions where id=$1',[old])).rows.length,0,'old auth session revoked');
  assert.equal((await db.query('select * from auth.refresh_tokens')).rows.length,0,'old refresh tokens revoked');
  assert.equal(await check(old,true),false,'revoked JWT cannot restore session');
  assert.equal(await check(next,false),true,'winning login remains valid');
  await db.exec('set role authenticated');
  await assert.rejects(db.query("update public.active_user_sessions set session_key='stolen'"),/permission denied/);
  await db.exec('reset role; set role anon');
  await assert.rejects(db.query('select public.verify_account_session(true)'),/permission denied/);
  await db.exec('reset role');
  console.log('PASS actual SQL: adoption, repeated migration, latest login, stale reclaim rejection, Auth/refresh revocation and permissions');
} finally { await db.close(); }
