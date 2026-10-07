#!/usr/bin/env node
// Roda antes de "vite build" (hook "prebuild" do npm). Grava um identificador
// único desse build em dois lugares: public/version.json (estático, servido
// direto, sem passar pelo bundle) e src/build-info.ts (importado pelo app).
// O app compara os dois em runtime pra saber se uma versão mais nova já foi
// publicada — mesmo rodando como app instalado, sem barra de navegador pra
// recarregar sozinho.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const buildId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

writeFileSync(
  resolve(root, "public/version.json"),
  JSON.stringify({ buildId, builtAt: new Date().toISOString() }, null, 2) + "\n",
);

writeFileSync(
  resolve(root, "src/build-info.ts"),
  `// Gerado automaticamente por scripts/write-build-version.mjs antes de cada build.\n` +
    `// Não edite à mão — o valor em dev/sandbox é só um placeholder.\n` +
    `export const BUILD_ID = ${JSON.stringify(buildId)};\n`,
);

console.log(`[write-build-version] BUILD_ID=${buildId}`);
