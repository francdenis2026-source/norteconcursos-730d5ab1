-- Add indexes for public-schema foreign keys that lack a matching leading-column index.
-- Safe to run against environments where these indexes already exist.
DO $$
DECLARE
  fk record;
  column_list text;
  index_name text;
BEGIN
  FOR fk IN
    SELECT c.oid, c.conname, c.conrelid, c.conkey
    FROM pg_constraint c
    WHERE c.contype = 'f'
      AND c.connamespace = 'public'::regnamespace
      AND NOT EXISTS (
        SELECT 1
        FROM pg_index i
        WHERE i.indrelid = c.conrelid
          AND i.indisvalid
          AND i.indisready
          AND (
            SELECT array_agg(i.indkey[pos]::int ORDER BY pos)
            FROM generate_series(0, cardinality(c.conkey) - 1) AS pos
          ) = (
            SELECT array_agg(c.conkey[pos]::int ORDER BY pos)
            FROM generate_series(1, cardinality(c.conkey)) AS pos
          )
      )
    ORDER BY c.conrelid, c.conname
  LOOP
    SELECT string_agg(quote_ident(a.attname), ', ' ORDER BY k.ord)
      INTO column_list
    FROM unnest(fk.conkey) WITH ORDINALITY AS k(attnum, ord)
    JOIN pg_attribute a
      ON a.attrelid = fk.conrelid
     AND a.attnum = k.attnum;

    index_name := left(
      'idx_' || (SELECT relname FROM pg_class WHERE oid = fk.conrelid)
      || '_' || regexp_replace(fk.conname, '_fkey$', '') || '_fk',
      63
    );

    EXECUTE format(
      'CREATE INDEX IF NOT EXISTS %I ON %s (%s)',
      index_name, fk.conrelid::regclass, column_list
    );
  END LOOP;
END $$;

ANALYZE;