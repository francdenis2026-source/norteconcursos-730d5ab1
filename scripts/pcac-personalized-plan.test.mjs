import test from "node:test";
import assert from "node:assert/strict";
import { pcAcVerticalCargos } from "../src/data/pcAcreVerticalizado.ts";
import { DEFAULT_PCAC_STUDY_CONFIG, PCAC_EXAM_DATE, sanitizePcAcCommitments } from "../src/lib/pcAcreStudyPlan.ts";
import { pcAcDisciplinePoints } from "../src/lib/pcAcreExamWeights.ts";
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

test("PC-AC: o tempo de cada disciplina acompanha os pontos dela na prova objetiva", () => {
  const cargo = pcAcVerticalCargos.find((item) => item.id === "delegado");
  const weeks = buildPcAcMasterPlan(config.days, PCAC_EXAM_DATE, config, cargo);
  const studyTypes = new Set(["teoria", "video", "questoes", "revisao"]);
  const minutesBySubject = new Map();
  let total = 0;
  for (const week of weeks) {
    for (const day of week.days) {
      for (const activity of day.activities) {
        if (!studyTypes.has(activity.type) || !activity.subject) continue;
        minutesBySubject.set(activity.subject, (minutesBySubject.get(activity.subject) ?? 0) + (activity.minutes ?? 0));
        total += activity.minutes ?? 0;
      }
    }
  }
  assert.ok(total > 0, "plano sem minutos de estudo");
  const points = pcAcDisciplinePoints(cargo);
  const byName = new Map(points.map((row) => [row.name, row]));
  // Jurídicas valem 110 dos 155 pontos do Delegado: precisam levar a maior parte do tempo.
  const legalMinutes = [...minutesBySubject.entries()]
    .filter(([name]) => /jur[ií]dic/i.test(byName.get(name)?.blockTitle ?? ""))
    .reduce((sum, [, minutes]) => sum + minutes, 0);
  assert.ok(legalMinutes / total > 0.5, `bloco jurídico com apenas ${Math.round(100 * legalMinutes / total)}% do tempo`);
  // Nenhuma disciplina do edital pode ficar fora do plano.
  for (const row of points) assert.ok(minutesBySubject.has(row.name), `disciplina sem tempo: ${row.name}`);
  // Uma disciplina de peso maior nunca recebe menos tempo que uma de peso muito menor.
  const penal = minutesBySubject.get("Direito Penal") ?? 0;
  const acre = minutesBySubject.get(points.find((row) => row.id === "realidade-acre").name) ?? 0;
  assert.ok(penal > acre * 2, "Direito Penal (20 pontos) deveria ter bem mais tempo que Realidade do Acre (4 pontos)");
});

test("PC-AC: revisão espaçada devolve o assunto estudado e o dia fecha com recuperação ativa", () => {
  const cargo = pcAcVerticalCargos.find((item) => item.id === "investigador");
  const weeks = buildPcAcMasterPlan(config.days, PCAC_EXAM_DATE, config, cargo);
  const firstTopic = weeks[0].days
    .flatMap((day) => day.activities)
    .find((activity) => activity.type === "teoria" && activity.topic);
  assert.ok(firstTopic, "sem bloco de teoria na primeira semana");
  const reviews = weeks
    .flatMap((week) => week.days)
    .flatMap((day) => day.activities)
    .filter((activity) => activity.type === "revisao" && activity.topic === firstTopic.topic);
  assert.ok(reviews.length >= 1, "o assunto estudado não voltou em nenhuma revisão");
  const recall = weeks[0].days
    .flatMap((day) => day.activities)
    .filter((activity) => activity.type === "revisao" && /Recuperação ativa/.test(activity.detail));
  assert.ok(recall.length > 0, "nenhum bloco de recuperação ativa no fim do dia");
});

test("PC-AC: compromissos do aluno são respeitados e o estudo é remanejado em volta deles", () => {
  const cargo = pcAcVerticalCargos.find((item) => item.id === "investigador");
  const commitments = sanitizePcAcCommitments([
    { id: "trabalho", kind: "trabalho", time: "07:30", minutes: 480, days: [1, 2, 3, 4, 5] },
    { id: "medico", kind: "medico", time: "20:00", minutes: 90, date: "2026-11-18" },
    { id: "invalido", kind: "trabalho", time: "99:99", minutes: 60, days: [1] },
    { id: "sem-quando", kind: "outro", time: "08:00", minutes: 60 },
  ]);
  assert.equal(commitments.length, 2, "compromisso inválido ou sem recorrência não deveria ser aceito");
  const weeks = buildPcAcMasterPlan(config.days, PCAC_EXAM_DATE, { ...config, commitments }, cargo);
  const studyTypes = new Set(["teoria", "video", "questoes", "redacao", "revisao", "simulado"]);
  const net = weeks[0].days.reduce((sum, day) =>
    sum + day.activities.reduce((daily, item) => daily + (studyTypes.has(item.type) ? item.minutes ?? 0 : 0), 0), 0);
  assert.equal(net, config.weeklyHours * 60, "as horas da semana mudaram por causa dos compromissos");

  const monday = weeks[0].days.find((day) => day.weekday === 1);
  const work = monday.activities.find((item) => item.type === "compromisso");
  assert.ok(work, "compromisso fixo não apareceu na segunda-feira");
  assert.equal(work.start, "07:30");
  assert.equal(work.end, "15:30");

  const appointment = weeks
    .flatMap((week) => week.days)
    .find((day) => day.date === "2026-11-18")
    ?.activities.find((item) => item.type === "compromisso" && item.subject === "Consulta médica");
  assert.ok(appointment, "compromisso pontual não entrou na data marcada");
  assert.equal(appointment.start, "20:00");

  for (const week of weeks) {
    for (const day of week.days) {
      const timed = day.activities.filter((item) => item.start && item.end).sort((a, b) => a.start.localeCompare(b.start));
      for (let i = 1; i < timed.length; i += 1) {
        assert.ok(timed[i - 1].end <= timed[i].start, `estudo sobre compromisso em ${day.date}`);
      }
    }
  }
});

test("PC-AC: plantão que passa da meia-noite é aceito e não quebra o dia", () => {
  const cargo = pcAcVerticalCargos.find((item) => item.id === "investigador");
  // Entra 19:00, sai 07:00 do dia seguinte (12h) numa data pontual.
  const overnight = sanitizePcAcCommitments([
    { id: "plantao", kind: "trabalho", label: "Plantão", time: "19:00", minutes: 12 * 60, date: "2026-11-18" },
  ]);
  assert.equal(overnight.length, 1, "plantão de 12h virando o dia deveria ser aceito");
  assert.equal(overnight[0].minutes, 720);

  // 24h cheias (entra e sai no mesmo horário, dia seguinte) — o limite agora é 24h, não 16h.
  const fullDay = sanitizePcAcCommitments([
    { id: "plantao24", kind: "trabalho", time: "07:00", minutes: 24 * 60, date: "2026-11-19" },
  ]);
  assert.equal(fullDay.length, 1, "plantão de 24h deveria ser aceito (antes o limite era 16h)");

  const weeks = buildPcAcMasterPlan(config.days, PCAC_EXAM_DATE, { ...config, commitments: overnight }, cargo);
  const day = weeks.flatMap((week) => week.days).find((d) => d.date === "2026-11-18");
  assert.ok(day, "dia do plantão não foi gerado");
  const work = day.activities.find((item) => item.type === "compromisso");
  assert.ok(work, "plantão não apareceu como compromisso no dia");
  assert.equal(work.start, "19:00");
  // Bloqueado só até o fim deste dia — a madrugada é responsabilidade de outro compromisso
  // cadastrado pro dia seguinte (ver dica do formulário).
  assert.equal(work.end, "00:00");

  const timed = day.activities.filter((item) => item.start && item.end).sort((a, b) => a.start.localeCompare(b.start));
  for (let i = 1; i < timed.length; i += 1) {
    assert.ok(timed[i - 1].end <= timed[i].start, "estudo marcado sobre o plantão");
  }
});
