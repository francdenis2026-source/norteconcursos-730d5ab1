import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("video library lists every edital discipline and offers an all-subjects mode", () => {
  const workspace = read("src/components/media/VideoWorkspace.tsx");
  assert.match(workspace, /Pelo meu edital/);
  assert.match(workspace, /Todas as matérias/);
  assert.match(workspace, /pcAcVerticalCargos/);
  assert.match(workspace, /cargo\.blocks/);
  assert.match(workspace, /count: subjects\.reduce/);
  assert.match(workspace, /Marcar como assistida/);
});

test("lesson player keeps keyboard shortcuts and colored controls", () => {
  const player = read("src/components/media/LessonPlayer.tsx");
  for (const text of ["vp2__btn--play", "vp2__btn--red", "vp2__btn--violet", "seekBy(-10)", "vp2__hotkeys", "<kbd>K</kbd>"]) assert.ok(player.includes(text), text);
  const css = read("src/components/media/video-library.css");
  assert.match(css, /aspect-ratio: 16 \/ 9/);
  assert.match(css, /@media \(max-width: 760px\)/);
});
