#!/bin/sh
# Regenera o SQL de uma lei com todos os lotes <slug>-NN.json. Uso: sh build-lei.sh <slug> [numero-da-migration]
SLUG="$1"; N="${2:-20261014000000}"
FILES=$(ls scripts/explicacoes/$SLUG-[0-9]*.json | tr '\n' ',' | sed 's/,$//')
node scripts/explicacoes/build.mjs "$FILES" "$TEMP/units_$SLUG.json" --partial --sql supabase/migrations/${N}_explicacoes_$SLUG.sql >/dev/null && echo OK
