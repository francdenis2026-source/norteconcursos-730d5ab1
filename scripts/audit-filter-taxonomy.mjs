import { readFileSync, writeFileSync } from "node:fs";
import { canonicalSubject, topicIdentity } from "../src/lib/subjects.ts";

/** Read-only audit of a metadata snapshot. Never publishes or reclassifies questions. */
export function auditFilterTaxonomy(tables) {
  const report = {
    tables: {},
    equivalentNames: [],
    ambiguousLabels: [],
    topicSpellingVariants: [],
  };
  const names = new Map();
  const topics = new Map();
  for (const [table, rows] of Object.entries(tables)) {
    const active = rows.filter((row) => row.content_status === "active");
    report.tables[table] = { inspected: rows.length, activeMetadata: active.length };
    for (const row of active) {
      const raw = row.subject ?? row.discipline;
      if (!raw) continue;
      const canonical = canonicalSubject(raw);
      const counts = names.get(canonical) ?? new Map();
      counts.set(raw, (counts.get(raw) ?? 0) + 1);
      names.set(canonical, counts);
      if (/https?:|conhecimentos|eixo|boa prova/i.test(raw)) {
        const existing = report.ambiguousLabels.find(
          (item) => item.table === table && item.label === raw,
        );
        if (existing) existing.count++;
        else
          report.ambiguousLabels.push({
            table,
            label: raw,
            count: 1,
            action:
              "Revisar a classificação no enunciado e no edital; não inferir apenas pelo título.",
          });
      }
      const topic = row.subtopic ?? row.topic_label;
      if (topic) {
        const key = `${canonical}::${topicIdentity(topic)}`;
        const variants = topics.get(key) ?? new Set();
        variants.add(topic);
        topics.set(key, variants);
      }
    }
  }
  report.equivalentNames = [...names]
    .filter(([, variants]) => variants.size > 1)
    .map(([canonical, variants]) => ({ canonical, variants: Object.fromEntries(variants) }));
  report.topicSpellingVariants = [...topics]
    .filter(([, variants]) => variants.size > 1)
    .map(([key, variants]) => ({ key, variants: [...variants] }));
  return report;
}

if (process.argv[1]?.replaceAll("\\", "/").endsWith("/audit-filter-taxonomy.mjs")) {
  const [input, output] = process.argv.slice(2);
  if (!input || !output)
    throw new Error(
      "Uso: node --import ./scripts/alias.mjs scripts/audit-filter-taxonomy.mjs METADATA_JSON RELATORIO_JSON",
    );
  const report = auditFilterTaxonomy(JSON.parse(readFileSync(input, "utf8")));
  writeFileSync(output, JSON.stringify(report, null, 2) + "\n", "utf8");
  console.log(
    JSON.stringify({
      tables: report.tables,
      equivalentGroups: report.equivalentNames.length,
      ambiguousGroups: report.ambiguousLabels.length,
      topicSpellingVariants: report.topicSpellingVariants.length,
    }),
  );
}
