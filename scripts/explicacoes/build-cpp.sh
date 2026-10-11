#!/bin/sh
# Regenera o SQL do Código de Processo Penal com todos os lotes existentes (idempotente). Exige units_codigo-processo-penal.json exportado do banco.
FILES=$(ls scripts/explicacoes/codigo-processo-penal-*.json | tr '\n' ',' | sed 's/,$//')
node scripts/explicacoes/build.mjs "$FILES" "$1" --partial --sql supabase/migrations/20261013130000_explicacoes_cpp.sh.sql >/dev/null && mv supabase/migrations/20261013130000_explicacoes_cpp.sh.sql supabase/migrations/20261013130000_explicacoes_cpp.sql && echo OK
