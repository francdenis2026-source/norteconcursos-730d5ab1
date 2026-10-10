import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, dependencies = {}, globals = {}) {
  const exports = {};
  const source = fs.readFileSync(new URL(`../src/${file}`, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(compiled, {
    exports,
    module: { exports },
    require: (name) => {
      if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
      return dependencies[name];
    },
    Date,
    URL,
    ...globals,
  });
  return exports;
}

test("CESPE variants group into CEBRASPE while other boards remain distinct", () => {
  const { canonicalBoard } = load("lib/subjects.ts");
  for (const board of ["CESPE", "CESPE/CEBRASPE", " Cebraspe ", "CEBRASPE - UnB"])
    assert.equal(canonicalBoard(board), "CEBRASPE");
  assert.equal(canonicalBoard("FGV"), "FGV");
  assert.equal(canonicalBoard("CESPENSE"), "CESPENSE");
});

test("subject names normalize aliases without merging unrelated subjects", () => {
  const { canonicalSubject } = load("lib/subjects.ts");
  assert.equal(canonicalSubject("Raciocínio Lógico-Matemático"), "Raciocínio Lógico");
  assert.equal(canonicalSubject("Noções de Informática"), "Informática");
  assert.equal(canonicalSubject("Direito Penal"), "Direito Penal");
});

test("local progress follows session changes without reading another account's keys", async () => {
  let notify;
  const sdk = {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: (callback) => {
        notify = callback;
      },
    },
  };
  const { userStorageKey } = load(
    "lib/userStorage.ts",
    { "@/integrations/supabase/client": { supabase: sdk } },
    { window: {} },
  );
  await Promise.resolve();
  const guest = userStorageKey("norte_enem_check");
  notify("SIGNED_IN", { user: { id: "student-a" } });
  const a = userStorageKey("norte_enem_check");
  notify("SIGNED_IN", { user: { id: "student-b" } });
  const b = userStorageKey("norte_enem_check");
  assert.notEqual(a, b);
  assert.notEqual(guest, a);
  assert.notEqual(b, "norte_enem_check");
  notify("SIGNED_OUT", null);
  assert.equal(userStorageKey("norte_enem_check"), guest);
});

test("explicit storage ownership keeps library markers separate", () => {
  const { setStorageOwner, userStorageKey } = load("lib/userStorage.ts", {
    "@/integrations/supabase/client": { supabase: {} },
  });
  setStorageOwner("student-a");
  const a = userStorageKey("norte-library-read");
  setStorageOwner("student-b");
  assert.notEqual(a, userStorageKey("norte-library-read"));
  setStorageOwner(null);
  assert.equal(userStorageKey("norte-library-read"), "norte-library-read:guest");
});
