// Deixa o `node --test` resolver o alias "@/..." (-> src/...ts) dos módulos puros testados sem navegador.
import { registerHooks } from "node:module";
import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import path from "node:path";

const src = path.resolve(import.meta.dirname, "../src");
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith("@/")) {
      for (const ext of [".ts", ".tsx"]) {
        const file = path.join(src, spec.slice(2) + ext);
        if (existsSync(file)) return { url: pathToFileURL(file).href, shortCircuit: true };
      }
    }
    return next(spec, ctx);
  },
});
