/** Apply only the reviewed single-session migration; no credentials in source or output. */
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const file = 'supabase/migrations/20261022010000_enforce_single_authenticated_session.sql';
const sql = await readFile(file, 'utf8');
if (process.argv.includes('--dry-run')) {
  console.log(JSON.stringify({ file, sha256: createHash('sha256').update(sql).digest('hex'), applied: false }));
  process.exit(0);
}
const token = process.env.SUPABASE_ACCESS_TOKEN;
if (!token) throw new Error('Configure SUPABASE_ACCESS_TOKEN nas configurações seguras do ambiente. A migração não foi aplicada.');
async function query(query) {
  const response = await fetch('https://api.supabase.com/v1/projects/gkwphadbveiyjcwiiizw/database/query', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) throw new Error(`Supabase HTTP ${response.status}. Publicação não confirmada.`);
  return response.json();
}
await query(sql);
const verification = await query(`select
  to_regprocedure('public.is_current_device_session()') is not null as rpc,
  exists(select 1 from pg_trigger where tgrelid = 'auth.sessions'::regclass and tgname = 'norte_register_auth_session' and tgenabled = 'O') as auth_trigger,
  not exists (
    select 1 from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind in ('r', 'p') and not c.relispartition
      and c.relname <> 'active_user_sessions'
      and not exists (select 1 from pg_trigger t where t.tgrelid = c.oid and t.tgname = 'norte_require_current_session' and t.tgenabled = 'O')
  ) as writes_protected,
  not has_table_privilege('authenticated', 'public.active_user_sessions', 'UPDATE') as registry_protected`);
if (!verification?.[0] || !Object.values(verification[0]).every(value => value === true)) {
  throw new Error('A verificação da migração falhou. Confira os gatilhos e as permissões no Supabase.');
}
console.log(JSON.stringify({ applied: true, verified: verification[0] }));
