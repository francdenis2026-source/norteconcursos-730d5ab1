-- Auditoria SOMENTE LEITURA: execute no SQL Editor do projeto Supabase correto.
-- Confere RLS, permissões e gatilhos de sessão por tabela do esquema public.
WITH tables AS (
  SELECT c.oid, n.nspname AS schema_name, c.relname AS table_name,
         c.relrowsecurity AS rls_enabled, c.relforcerowsecurity AS force_rls
  FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public' AND c.relkind IN ('r','p') AND NOT c.relispartition
), audit AS (
  SELECT t.*,
    EXISTS (SELECT 1 FROM pg_trigger g
            WHERE g.tgrelid = t.oid AND NOT g.tgisinternal
            AND g.tgname = 'norte_require_current_session'
            AND (g.tgtype & 1) = 1
            AND (g.tgtype & 2) = 2
            AND (g.tgtype & 4) = 4
            AND (g.tgtype & 16) = 16) AS session_trigger_present,
    has_table_privilege('anon', t.oid, 'SELECT') AS anon_select,
    has_table_privilege('authenticated', t.oid, 'SELECT') AS authenticated_select
  FROM tables t
)
SELECT schema_name, table_name, rls_enabled, force_rls,
       session_trigger_present, anon_select, authenticated_select,
       CASE
         WHEN NOT rls_enabled THEN 'REVISAR: RLS desabilitado'
         WHEN table_name <> 'active_user_sessions' AND NOT session_trigger_present
           THEN 'REVISAR: trigger de sessao ausente'
         ELSE 'OK (auditoria parcial)'
       END AS result
FROM audit ORDER BY CASE WHEN NOT rls_enabled OR
  (table_name <> 'active_user_sessions' AND NOT session_trigger_present) THEN 0 ELSE 1 END,
  table_name;
-- Confira também políticas, funções SECURITY DEFINER e políticas storage.objects.
-- Este relatório não prova que as regras RLS estão corretas.
