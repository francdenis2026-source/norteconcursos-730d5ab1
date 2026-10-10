import { run } from "./review-question-corpus.mjs";
const [previous, next, report, mode] = process.argv.slice(2);
if (!previous || !next || !report)
  throw Error(
    "Uso: node scripts/refine-held-question-corpus.mjs ANTERIOR_JSON NOVO_JSON RELATORIO_JSON [--dry-run]",
  );
console.log(JSON.stringify(await run(previous, next, report, mode, true)));
