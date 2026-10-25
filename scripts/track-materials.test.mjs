import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { TRACKS } from "../src/data/tracks/index.ts";
import {
  TRACK_MATERIALS,
  PARTIAL_TRACK_MATERIALS,
  materialsForTrackLesson,
  isIntegratedTrackLesson,
} from "../src/lib/trackMaterials.ts";
const audit = JSON.parse(
  readFileSync(
    new URL("../docs/audits/material-consolidation-2026-10-24/inventory.json", import.meta.url),
  ),
);
const portuguese = JSON.parse(
  readFileSync(
    new URL(
      "../supabase/imports/portugues-materiais-2026-10-24/materials-package.json",
      import.meta.url,
    ),
  ),
);
const materials = [
  ...audit.materials,
  ...portuguese.rows
    .filter((r) => !audit.materials.some((m) => m.slug === r.material.slug))
    .map((r) => r.material),
];
test("every curricular link resolves to an existing lesson and a published material from the inspected catalog", () => {
  for (const [slug, lessons] of Object.entries(TRACK_MATERIALS)) {
    const track = TRACKS.find((t) => t.slug === slug);
    assert.ok(track, slug);
    for (const [id, targets] of Object.entries(lessons)) {
      assert.ok(
        track.lessons.some((l) => l.id === id),
        id,
      );
      assert.equal(new Set(targets).size, targets.length);
      for (const target of targets)
        assert.ok(
          materials.some((m) => m.slug === target && m.content_status === "active"),
          target,
        );
      assert.equal(materialsForTrackLesson(slug, id, materials).length, targets.length);
    }
  }
  assert.equal(audit.routes.length, TRACKS.length);
  assert.equal(
    audit.lessons,
    TRACKS.reduce((n, t) => n + t.lessons.length, 0),
  );
});
test("incomplete or archived replacements keep the original lesson available instead of hiding its remaining topics", () => {
  const linked = materialsForTrackLesson("administrativo", "adm-licitacoes", materials);
  assert.equal(linked.length, 2);
  assert.deepEqual(
    materialsForTrackLesson(
      "administrativo",
      "adm-licitacoes",
      materials.filter((m) => m.slug !== linked[1].slug),
    ),
    [],
  );
  assert.deepEqual(
    materialsForTrackLesson(
      "administrativo",
      "adm-licitacoes",
      materials.map((m) => (m.slug === linked[0].slug ? { ...m, content_status: "archived" } : m)),
    ),
    [],
  );
  assert.deepEqual(materialsForTrackLesson("unknown", "anything", materials), []);
});
test("partial thematic matches and subjects without a complete published equivalent do not replace independent teaching", () => {
  for (const key of PARTIAL_TRACK_MATERIALS) {
    const [track, lesson] = key.split(":");
    assert.ok(materialsForTrackLesson(track, lesson, materials).length);
    assert.equal(isIntegratedTrackLesson(track, lesson), false);
  }
  assert.equal(
    isIntegratedTrackLesson("constitucional", "cf-judiciario-controle"),
    false,
    "judiciary does not subsume constitutional review",
  );
  assert.equal(
    isIntegratedTrackLesson("direitos-humanos", "dh-teoria"),
    false,
    "use-of-force legislation does not replace general human-rights theory",
  );
  assert.equal(isIntegratedTrackLesson("informatica", "ia-ml"), false);
});
test("many steps can reuse one material without creating copies or changing lesson identity and progress storage", () => {
  const a = materialsForTrackLesson("contabilidade", "patrimonio-componentes", materials);
  const b = materialsForTrackLesson("contabilidade", "equacao-fundamental", materials);
  assert.equal(a[0].slug, b[0].slug);
  const route = readFileSync(
    new URL("../src/routes/dashboard/trilhas.tsx", import.meta.url),
    "utf8",
  );
  assert.ok(route.includes("`trilha-feitas:${slug}`"));
  assert.match(route, /!integrated &&/);
  assert.match(route, /catalog\.isError/);
  assert.match(route, /catalog\.refetch\(\)/);
  assert.equal(audit.exactBodyDuplicates.length, 0);
  assert.equal(audit.exactTitleDuplicates.length, 0);
});

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import vm from "node:vm";
import ts from "typescript";
function renderLesson(trackSlug, lessonId, available = materials) {
  const lesson = TRACKS.find((t) => t.slug === trackSlug).lessons.find((l) => l.id === lessonId);
  const none = () => null;
  const unknown = new Proxy({}, { get: () => none });
  const stubs = {
    react: React,
    "@/data/tracks": { TRACKS },
    "@/lib/trackMaterials": { materialsForTrackLesson, isIntegratedTrackLesson, TRACK_MATERIALS },
    "@/lib/utils": { cn: (...v) => v.filter(Boolean).join(" ") },
    "@/lib/practiceLink": { TRACK_SUBJECT: {} },
    "@/hooks/useDashboard": { useAuthStatus: () => ({ user: null }) },
    "@/components/library/MaterialStudyTabs": {
      MaterialStudyTabs: ({ text, explanation, practice }) =>
        React.createElement("div", null, text, explanation, practice),
    },
    "@/components/library/GlossaryText": { GlossaryText: ({ text }) => text },
    "@/components/ui/button": {
      Button: ({ children }) => React.createElement("button", null, children),
    },
    "@tanstack/react-router": {
      createFileRoute: () => (x) => x,
      Link: ({ to, params, children }) =>
        React.createElement("a", { href: to.replace("$slug", params?.slug ?? "") }, children),
    },
  };
  const module = { exports: {} };
  const file = readFileSync(
    new URL("../src/routes/dashboard/trilhas.tsx", import.meta.url),
    "utf8",
  );
  const code = ts.transpileModule(file, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(code + "\nexports.TestLesson=Lesson;", {
    module,
    exports: module.exports,
    require: (name) => stubs[name] ?? unknown,
  });
  return {
    html: renderToStaticMarkup(
      React.createElement(module.exports.TestLesson, {
        trackSlug,
        lesson,
        materials: available,
        done: false,
        toggleDone: none,
      }),
    ),
    lesson,
  };
}
test("the actual lesson reader uses canonical material links without rendering the parallel theory and quiz", () => {
  const { html, lesson } = renderLesson("administrativo", "adm-licitacoes");
  assert.ok(html.includes("/dashboard/library/administrativo-licitacoes-lei-14133-modalidades"));
  assert.ok(html.includes("/dashboard/library/administrativo-contratos-administrativos-lei-14133"));
  assert.ok(!html.includes("Conteúdo do assunto"));
  assert.ok(!html.includes("Teste rápido da aula"));
  assert.ok(html.includes("Marcar como concluída"));
  assert.ok(!html.includes(lesson.simples));
});
test("the actual reader preserves the unique lesson when coverage is partial or a referenced material is unavailable", () => {
  const partial = renderLesson("informatica", "protocolos");
  assert.ok(partial.html.includes("Leituras complementares"));
  assert.ok(partial.html.includes("Conteúdo do assunto"));
  const missing = renderLesson(
    "administrativo",
    "adm-licitacoes",
    materials.filter((m) => m.slug !== "administrativo-contratos-administrativos-lei-14133"),
  );
  assert.ok(missing.html.includes("Conteúdo do assunto"));
  assert.ok(!missing.html.includes("Materiais deste passo"));
});
