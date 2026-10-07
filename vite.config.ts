// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { writeFileSync } from "node:fs";
import type { Plugin } from "vite";

// Grava um identificador único de build em public/version.json (estático) e
// src/build-info.ts (embutido no bundle) toda vez que um build de produção
// roda de verdade — inclusive quando é o próprio pipeline do Lovable quem
// invoca o Vite, não um "npm run build" local. O app compara os dois em
// runtime pra saber se uma versão mais nova foi publicada (ver
// UpdateAvailablePrompt). Só roda em build (nunca no dev server), senão
// BUILD_ID ficaria mudando a cada reload e o app ficaria "oferecendo
// atualização" de si mesmo.
function writeBuildVersionPlugin(): Plugin {
  // TanStack Start roda vários passos de build (client, server, prerender…)
  // dentro do mesmo processo — "buildStart" dispara uma vez por passo. O id
  // precisa ser gerado só uma vez aqui fora, não dentro do hook, senão cada
  // passo grava um valor diferente e o id embutido no bundle do cliente
  // nunca bate com o que termina salvo em public/version.json.
  const buildId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    name: "write-build-version",
    apply: "build",
    buildStart() {
      writeFileSync(
        "public/version.json",
        JSON.stringify({ buildId, builtAt: new Date().toISOString() }, null, 2) + "\n",
      );
      writeFileSync(
        "src/build-info.ts",
        `// Gerado automaticamente pelo plugin write-build-version (vite.config.ts) a cada build de produção.\n` +
          `// Não edite à mão — o valor em dev/sandbox é só um placeholder.\n` +
          // Tipado como "string" (não o literal) pra "BUILD_ID === 'dev'" no
          // componente continuar válido pro typecheck depois de um build real.
          `export const BUILD_ID: string = ${JSON.stringify(buildId)};\n`,
      );
    },
  };
}

export default defineConfig({
  plugins: [writeBuildVersionPlugin()],
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
