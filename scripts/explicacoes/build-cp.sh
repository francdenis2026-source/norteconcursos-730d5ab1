#!/bin/sh
# Regenera o SQL do Código Penal com todos os lotes existentes (idempotente). Exige units_codigo-penal.json exportado do banco.
FILES=$(ls scripts/explicacoes/codigo-penal-*.json | tr '\n' ',' | sed 's/,$//')
node scripts/explicacoes/build.mjs "$FILES" "$1" --partial --sql supabase/migrations/20261013120000_explicacoes_codigo_penal.sh.sql >/dev/null && mv supabase/migrations/20261013120000_explicacoes_codigo_penal.sh.sql supabase/migrations/20261013120000_explicacoes_codigo_penal.sql && echo OK
