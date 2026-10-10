import test from "node:test";
import { selfCheck } from "../src/lib/cronograma.ts";

test("cronograma: semana soma o tempo semanal e respeita pesos", () => {
  selfCheck();
});
