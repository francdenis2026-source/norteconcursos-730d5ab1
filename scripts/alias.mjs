// Deixa o `node --test` resolver o alias "@/..." (-> src/...ts) e imports relativos sem extensão
// dos módulos testados sem navegador.
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import path from "node:path";

const src = path.resolve(import.meta.dirname, "../src");
const tryExt = (base) => [".ts", ".tsx"].map((ext) => base + ext).find((f) => existsSync(f));
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith("@/")) {
      const file = tryExt(path.join(src, spec.slice(2)));
      if (file) return { url: pathToFileURL(file).href, shortCircuit: true };
    } else if ((spec.startsWith("./") || spec.startsWith("../")) && !path.extname(spec) && ctx.parentURL?.startsWith("file:")) {
      const file = tryExt(path.resolve(path.dirname(fileURLToPath(ctx.parentURL)), spec));
      if (file) return { url: pathToFileURL(file).href, shortCircuit: true };
    }
    return next(spec, ctx);
  },
});
