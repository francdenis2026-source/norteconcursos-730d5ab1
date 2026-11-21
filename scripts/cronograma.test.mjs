import test from "node:test";
import { selfCheckReserva, selfCheck, disciplineNamesCheck, canonicalDiscipline, isGenericDiscipline } from "../src/lib/cronograma.ts";

test("cronograma: semana soma o tempo semanal e respeita pesos", () => {
  selfCheck();
});

test("cronograma: nomes de disciplinas padronizados", () => {
  disciplineNamesCheck(["Informática"]);
  if (canonicalDiscipline("Língua Portuguesa") !== "Língua Portuguesa") throw new Error("português mudou");
  if (!isGenericDiscipline("Conhecimentos Específicos")) throw new Error("genérica");
});

test("cronograma: painel do dia divide blocos em etapas sem perder minutos", async () => {
  const { selfCheckDia } = await import("../src/lib/cronogramaDia.ts");
  selfCheckDia();
});

test("cronograma: teoria liga o conteúdo ao material certo", async () => {
  const { selfCheckTeoria } = await import("../src/lib/cronogramaTeoria.ts");
  selfCheckTeoria();
});

test("widget flutuante: localiza o bloco atual sem embaralhar a virada da meia-noite", async () => {
  const { default: assert } = await import("node:assert/strict");
  const { buildTodayTimeline, locateNow } = await import("../src/lib/floatingSchedule.ts");
  const mk = (start, end, nome) => ({
    discId: "d", nome, topic: "t", topicId: "d.0", minutes: 0, first: false,
    start, end, rawStart: Number(start.slice(0, 2)) * 60 + Number(start.slice(3)),
    rawEnd: Number(end.slice(0, 2)) * 60 + Number(end.slice(3)) + (end < start ? 1440 : 0),
  });
  // Plantão de ontem 22:30–00:50 (vira a noite) + estudo de hoje às 09:00–10:00.
  const yesterday = [mk("22:30", "00:50", "Plantão")];
  const today = [mk("09:00", "10:00", "Matemática")];
  const timeline = buildTodayTimeline(today, yesterday);
  assert.equal(locateNow(timeline, 0).state, "estudando"); // 00:00, ainda dentro do plantão de ontem
  assert.equal(locateNow(timeline, 5).state, "estudando"); // 00:05, ainda dentro
  const afterPlantao = locateNow(timeline, 60); // 01:00, já acabou: intervalo até o próximo bloco
  assert.equal(afterPlantao.state, "intervalo");
  assert.equal(afterPlantao.next.nome, "Matemática");
  const studying = locateNow(timeline, 9 * 60 + 30); // 09:30
  assert.equal(studying.state, "estudando");
  assert.equal(studying.remainingMin, 30);
  assert.equal(locateNow(timeline, 23 * 60).state, "concluido"); // 23:00, dia encerrado
  assert.equal(locateNow([], 0).state, "vazio");
  // Sem plantão de ontem: antes do primeiro bloco do dia não há nada cobrindo o horário.
  const noCarry = buildTodayTimeline([mk("19:00", "20:00", "Português")], []);
  const early = locateNow(noCarry, 8 * 60);
  assert.equal(early.state, "antes");
  assert.equal(early.next.nome, "Português");
});

test("edital: aulas relacionadas exigem assunto e disciplina compatíveis", async () => {
  const { default: assert } = await import("node:assert/strict");
  const { editalLessonLinks } = await import("../src/lib/editalStudy.ts");
  const tracks = [
    { slug: "portugues", title: "Português", discipline: "Língua Portuguesa", lessons: [
      { id: "crase", title: "Emprego da crase", edital: "Emprego da crase" },
      { id: "verbos", title: "Conjugação verbal", edital: "Conjugação verbal" },
    ] },
    { slug: "outra", title: "Outra disciplina", discipline: "Informática", lessons: [
      { id: "crase", title: "Emprego da crase", edital: "Emprego da crase" },
    ] },
  ];
  const result = editalLessonLinks("Língua Portuguesa", "Emprego da crase", tracks);
  assert.deepEqual(result.lessons.map(l => [l.track, l.lesson]), [["portugues", "crase"]]);
  assert.deepEqual(result.tracks.map(t => t.slug), ["portugues"]);
  assert.equal(editalLessonLinks("Língua Portuguesa", "Figuras de linguagem", tracks).lessons.length, 0);
});

test("cronograma: simulado e redação saem das horas semanais", () => { selfCheckReserva(); });

test("PC-AC: os pontos por disciplina somam o total de cada prova e cada cargo tem disciplina pontuada", async () => {
  const { pcAcDisciplinePoints } = await import("../src/lib/pcAcreExamWeights.ts");
  const { pcAcVerticalCargos } = await import("../src/data/pcAcreVerticalizado.ts");
  for (const cargo of pcAcVerticalCargos) {
    const rows = pcAcDisciplinePoints(cargo);
    const total = rows.reduce((s, r) => s + r.points, 0);
    const want = cargo.exam?.objectivePoints;
    if (!want) continue;
    if (Math.abs(total - want) > 0.01) throw new Error(`${cargo.id}: pontos ${total} != ${want}`);
    if (rows.some((r) => !(r.points > 0))) throw new Error(`${cargo.id}: disciplina sem pontos`);
  }
});

test("PC-AC: modelos com prova discursiva são identificados pelo método", async () => {
  const { MODELOS_CRONOGRAMA } = await import("../src/data/cronogramaModelos.ts");
  const pc = MODELOS_CRONOGRAMA.filter((m) => m.id.startsWith("pcac-2026-"));
  if (!pc.length) throw new Error("sem modelos PC-AC");
  if (pc.some((m) => !/discursiva/i.test(m.metodo))) throw new Error("modelo PC-AC sem discursiva no método");
});
