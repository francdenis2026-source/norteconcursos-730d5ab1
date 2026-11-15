import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = async (path) => readFile(new URL(path, import.meta.url), "utf8");

test("student home exposes the shared platform question inventory in Editais e acervo", async () => {
  const dashboard = await source("../src/routes/dashboard/index.tsx");
  assert.match(dashboard, /import \{ PlatformQuestionCounts \} from "@\/components\/dashboard\/PlatformQuestionCounts"/);
  assert.match(
    dashboard,
    /<section className="sh2-resources" aria-labelledby="dashboard-resources-title">[\s\S]*?<PlatformQuestionCounts compact \/>[\s\S]*?<\/section>/,
  );
});

test("student inventory cards lead to the complete question catalog", async () => {
  const component = await source("../src/components/dashboard/PlatformQuestionCounts.tsx");
  assert.match(component, /usePlatformQuestionSummary\(enabled\)/);
  assert.match(component, /to="\/dashboard\/question-bank"/);
  assert.match(component, /Acervo da plataforma/);
  assert.match(component, /aria-label=\{label\}/);
});

test("homepage and catalog use the same authenticated summary RPC and cache key", async () => {
  const hook = await source("../src/hooks/usePlatformQuestionSummary.ts");
  assert.match(hook, /queryKey: \["public-question-summary"\]/);
  assert.match(hook, /supabase\.rpc\("get_public_question_summary"\)/);
  assert.match(hook, /staleTime: 60_000/);
  assert.match(hook, /refetchInterval: 60_000/);
  assert.match(hook, /parsePlatformQuestionSummary\(data\)/);
});

test("student counter never substitutes a fabricated zero when summary data is unavailable", async () => {
  const component = await source("../src/components/dashboard/PlatformQuestionCounts.tsx");
  assert.match(component, /value === undefined \? "—" : value\.toLocaleString\("pt-BR"\)/);
  assert.match(component, /summary\.isError/);
  assert.match(component, /Exibindo a última contagem recebida/);
});
