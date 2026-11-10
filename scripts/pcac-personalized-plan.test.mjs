import test from "node:test";
import assert from "node:assert/strict";
import { pcAcVerticalCargos } from "../src/data/pcAcreVerticalizado.ts";
import { DEFAULT_PCAC_STUDY_CONFIG, PCAC_EXAM_DATE } from "../src/lib/pcAcreStudyPlan.ts";
import { buildPcAcMasterPlan } from "../src/lib/pcAcreMasterPlan.ts";

const config = {
  ...DEFAULT_PCAC_STUDY_CONFIG,
  weeklyHours: 8,
  days: [1, 3, 5],
  startDate: "2026-11-16",
  startTime: "05:00",
  includeTaf: true,
  tafDays: [2, 4, 6],
  tafTime: "17:00",
  tafDurationMinutes: 60,
};

test("PC-AC: cada especialidade recebe plano detalhado com tópicos do próprio edital", () => {
  for (const cargo of pcAcVerticalCargos) {
    const weeks = buildPcAcMasterPlan(config.days, PCAC_EXAM_DATE, config, cargo);
    assert.ok(weeks.length > 0, `sem semanas para ${cargo.id}`);
    const day = weeks[0]?.days[0];
    assert.ok(day, `sem dia gerado para ${cargo.id}`);
    assert.ok(day.activities.some((item) => ["teoria", "video", "questoes", "revisao"].includes(item.type)));
    assert.ok(day.activities.some((item) => item.topic && item.subject), `sem tópico específico para ${cargo.id}`);
    assert.ok(day.activities.some((item) => item.type === "rotina" && item.subject === "Café da manhã"));
    assert.ok(day.activities.some((item) => item.type === "pausa"), `sem pausa calculada para ${cargo.id}`);
    assert.ok(weeks[0].days.some((plannedDay) => plannedDay.activities.some((item) => item.type === "descanso")), "a semana precisa reservar recuperação");
    const allTopics = cargo.blocks.flatMap((block) => block.disciplines.flatMap((discipline) => discipline.topics ?? []));
    assert.ok(allTopics.length > 0, `cargo sem tópicos oficiais: ${cargo.id}`);
  }
});

test("PC-AC: carga líquida semanal respeita horas escolhidas e TAF não sobrepõe o estudo", () => {
  const cargo = pcAcVerticalCargos.find((item) => item.id === "investigador");
  assert.ok(cargo);
  const weeks = buildPcAcMasterPlan(config.days, PCAC_EXAM_DATE, config, cargo);
  const firstWeek = weeks[0];
  const studyTypes = new Set(["teoria", "video", "questoes", "redacao", "revisao", "simulado"]);
  const studyMinutes = firstWeek.days.reduce((sum, day) =>
    sum + day.activities.reduce((daily, item) => daily + (studyTypes.has(item.type) ? item.minutes ?? 0 : 0), 0), 0);
  assert.equal(studyMinutes, 8 * 60);
  const tuesday = firstWeek.days.find((day) => day.weekday === 2);
  assert.ok(tuesday?.activities.some((item) => item.type === "exercicio"));
  for (const day of firstWeek.days) {
    const timed = day.activities.filter((item) => item.start && item.end).sort((a, b) => a.start.localeCompare(b.start));
    for (let i = 1; i < timed.length; i++) {
      assert.ok(timed[i - 1].end <= timed[i].start, `atividades sobrepostas em ${day.date}`);
    }
  }
});

test("PC-AC: rotina de refeições, pausas e TAF são independentes da carga líquida de estudo", () => {
  const cargo = pcAcVerticalCargos[0];
  const weeks = buildPcAcMasterPlan(config.days, PCAC_EXAM_DATE, config, cargo);
  const tuesday = weeks[0].days.find((day) => day.weekday === 2);
  const labels = tuesday.activities.map((item) => item.subject);
  assert.ok(labels.includes("Café da manhã"));
  assert.ok(labels.includes("Almoço"));
  assert.ok(labels.includes("Jantar"));
  assert.ok(tuesday.activities.some((item) => item.type === "exercicio"));
});
