import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { transformWithOxc } from "vite";

const root = fileURLToPath(new URL("../", import.meta.url));

async function sourceFiles(directory) {
  const entries = await readdir(new URL(directory + "/", "file://" + root), { withFileTypes: true });
  const groups = await Promise.all(entries.map(async (entry) => {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) {
      if (["node_modules", ".git"].includes(entry.name)) return [];
      return sourceFiles(path);
    }
    return /\.(?:[cm]?[jt]sx?)$/.test(entry.name) && !entry.name.endsWith(".d.ts") ? [path] : [];
  }));
  return groups.flat();
}

test("application, supporting scripts and background functions parse with the production transformer", async () => {
  const files = (await Promise.all(["src", "scripts", "supabase/functions"].map(sourceFiles))).flat();
  assert.ok(files.includes("src/lib/materialPractice.ts"));
  assert.ok(files.some((file) => file.startsWith("src/routes/")));
  const failures = [];
  for (const file of files) {
    try {
      await transformWithOxc(await readFile(new URL(file, "file://" + root), "utf8"), file);
    } catch (error) {
      failures.push(`${file}: ${String(error)}`);
    }
  }
  assert.deepEqual(failures, [], failures.join("\n"));
});

test("the reported literal newline between imports is rejected", async () => {
  await assert.rejects(() => transformWithOxc(
    'import { first } from "./first";\\nimport { second } from "./second";',
    "regression.ts",
  ));
});