import test from "node:test";
import fs from "node:fs";

// Estrutura mínima de cada explicação por artigo (a conferência contra o texto oficial roda em scripts/explicacoes/build.mjs).
for (const file of fs.readdirSync("scripts/explicacoes").filter((f) => f.endsWith(".json"))) {
  test(`explicações por artigo: ${file}`, () => {
    const exp = JSON.parse(fs.readFileSync(`scripts/explicacoes/${file}`, "utf8"));
    if (!exp.course_slug) throw new Error("course_slug ausente");
    for (const [key, e] of Object.entries(exp.units)) {
      for (const f of ["simples", "exemplo"]) if (typeof e[f] !== "string" || e[f].length < 20) throw new Error(`${key}: ${f} curto`);
      for (const f of ["pontos", "atencao", "prova"]) if (!Array.isArray(e[f]) || !e[f].length) throw new Error(`${key}: ${f} vazio`);
      if (e.simples.split(/\s+/).length < 15) throw new Error(`${key}: explicação rasa`);
    }
  });
}
