import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
const migration = await readFile(new URL('../supabase/migrations/20261022010000_enforce_single_authenticated_session.sql', import.meta.url), 'utf8');
const user = '11111111-1111-4111-8111-111111111111';
const first = '22222222-2222-4222-8222-222222222222';
const second = '33333333-3333-4333-8333-333333333333';
async function setup() {
  const db = new PGlite();
  await db.exec(`
    create role anon; create role authenticated;
    create schema auth;
    create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb $$;
    create function auth.uid() returns uuid language sql stable as $$ select (auth.jwt()->>'sub')::uuid $$;
    create function auth.role() returns text language sql stable as $$ select auth.jwt()->>'role' $$;
    create table auth.users(id uuid primary key);
    create table auth.sessions(id uuid primary key, user_id uuid references auth.users(id), created_at timestamptz);
    insert into auth.users values ('${user}');
    insert into auth.sessions values ('${first}', '${user}', '2026-10-20T10:00:00Z');
    create table public.answers(id integer primary key, answer text);
    grant usage on schema public, auth to authenticated, anon;
    grant all on public.answers to authenticated, anon;
    create function public.save_answer() returns void language sql security definer as $$ insert into public.answers values (9, 'stale RPC') $$;
  `);
  await db.exec(migration);
  return db;
}
async function jwt(db, session, role = 'authenticated') {
  await db.query(`select set_config('request.jwt.claims', $1, false)`, [JSON.stringify({ sub: user, role, session_id: session })]);
}
async function current(db) { return (await db.query('select public.is_current_device_session() as active')).rows[0].active; }

test('actual PostgreSQL migration: bootstrap, newest login, token refresh, stale writes and definer RPC', async () => {
  const db = await setup();
  try {
    await jwt(db, first); assert.equal(await current(db), true);
    await db.exec("insert into public.answers values (1, 'old before takeover')");
    // Auth, not the browser, issues the new ownership row.
    await jwt(db, null, 'service_role');
    await db.exec(`insert into auth.sessions values ('${second}', '${user}', '2026-10-20T11:00:00Z')`);
    await jwt(db, first); assert.equal(await current(db), false);
    for (const sql of ["insert into public.answers values (2, 'stale')", "update public.answers set answer = 'stale'", 'delete from public.answers', 'select public.save_answer()']) {
      await assert.rejects(db.exec(sql), e => e.code === '42501' && e.detail === 'NORTE_SESSION_REPLACED');
    }
    await jwt(db, second); assert.equal(await current(db), true);
    await db.exec("insert into public.answers values (2, 'new owner')");
    // Refresh changes access-token timestamps but not Auth session_id.
    await jwt(db, second); assert.equal(await current(db), true);
    await db.exec("update public.answers set answer = 'new owner updated' where id = 2");
    assert.equal((await db.query('select count(*)::int as n from public.answers')).rows[0].n, 2);
    // New owner logging out cannot resurrect the previous device.
    await jwt(db, null, 'service_role');
    await db.exec(`delete from auth.sessions where id = '${second}'`);
    await jwt(db, first); assert.equal(await current(db), false);
    await assert.rejects(db.exec('select public.save_answer()'), e => e.detail === 'NORTE_SESSION_REPLACED');
  } finally { await db.close(); }
});

test('registry is read-only to browsers; session timestamps cannot be forged; reinstall preserves latest ownership', async () => {
  const db = await setup();
  try {
    await jwt(db, first);
    await db.exec('set role authenticated');
    assert.equal((await db.query('select count(*)::int as n from public.active_user_sessions')).rows[0].n, 1);
    await assert.rejects(db.exec("update public.active_user_sessions set session_key = 'forged'"), e => e.code === '42501');
    await db.exec('reset role');
    await jwt(db, null, 'service_role');
    await db.exec(`insert into auth.sessions values ('${second}', '${user}', '2026-10-20T11:00:00Z')`);
    // A delayed, older Auth insertion must never replace the newest login.
    await db.exec(`insert into auth.sessions values ('44444444-4444-4444-8444-444444444444', '${user}', '2026-10-20T09:00:00Z')`);
    await db.exec(migration);
    await jwt(db, second); assert.equal(await current(db), true);
    await jwt(db, first); assert.equal(await current(db), false);
    await jwt(db, null, 'anon');
    await db.exec("insert into public.answers values (3, 'public flow remains public')");
  } finally { await db.close(); }
});
