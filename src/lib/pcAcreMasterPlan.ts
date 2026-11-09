import { INVESTIGATOR_DISCIPLINE_ORDER } from "@/data/pcAcreIdecanRadar";
import { pcAcVerticalCargos } from "@/data/pcAcreVerticalizado";
import { PCAC_EXAM_DATE } from "@/lib/pcAcreStudyPlan";

/** Plano de estudos completo (semana a semana, dia a dia) para o Oficial Investigador da PC-AC,
 * organizado pela ordem de relevância da banca IDECAN já marcada em `pcAcreIdecanRadar.ts` —
 * reaproveita a mesma marcação usada nos cartões "Foco recomendado" e "Onde concentrar seu
 * tempo" do edital verticalizado, em vez de criar uma nova. Cada atividade de teoria/questões
 * cita o tópico (ou subtópico) exato do Anexo III, não só o nome da disciplina — para o aluno
 * saber na hora o que abrir no edital digital, sem adivinhar. Encerra o estudo de conteúdo novo
 * 3 dias antes da prova, deixando esses últimos dias para revisão leve e descanso. */

interface DisciplineTopics {
  name: string;
  topics: string[];
}

/** Disciplinas do Investigador (nome + tópicos do Anexo III), chaveadas pelo `id` usado em
 * `pcAcVerticalCargos` — mesma fonte do edital digital, para o plano nunca divergir dela. */
const INVESTIGATOR_DISCIPLINE_TOPICS: Record<string, DisciplineTopics> = (() => {
  const cargo = pcAcVerticalCargos.find((c) => c.id === "investigador");
  const out: Record<string, DisciplineTopics> = {};
  for (const block of cargo?.blocks ?? []) {
    for (const d of block.disciplines) {
      out[d.id] = { name: d.name, topics: d.topics?.length ? d.topics : [d.name] };
    }
  }
  return out;
})();

/** Um tópico específico a estudar: disciplina + o texto exato do item do Anexo III. */
export interface PcAcStudyTopic {
  discipline: string;
  topic: string;
}

/** Percorre `INVESTIGATOR_DISCIPLINE_ORDER` em roda-viva; cada vez que uma disciplina volta a
 * aparecer, avança para o próximo tópico dela (volta ao primeiro depois do último), para nunca
 * repetir o mesmo tópico duas vezes seguidas e cobrir o Anexo III inteiro ao longo do plano. */
function createTopicCursor() {
  const topicIndexByDiscipline: Record<string, number> = {};
  let disciplineCursor = 0;
  return (): PcAcStudyTopic => {
    const order = INVESTIGATOR_DISCIPLINE_ORDER.length ? INVESTIGATOR_DISCIPLINE_ORDER : Object.keys(INVESTIGATOR_DISCIPLINE_TOPICS);
    const disciplineId = order[disciplineCursor % order.length]!;
    disciplineCursor += 1;
    const entry = INVESTIGATOR_DISCIPLINE_TOPICS[disciplineId];
    if (!entry) return { discipline: disciplineId, topic: disciplineId };
    const topicIndex = topicIndexByDiscipline[disciplineId] ?? 0;
    topicIndexByDiscipline[disciplineId] = (topicIndex + 1) % entry.topics.length;
    return { discipline: entry.name, topic: entry.topics[topicIndex]! };
  };
}

export const PCAC_LAST_STUDY_OFFSET_DAYS = 3;

export type PcAcActivityType =
  | "teoria"
  | "questoes"
  | "redacao"
  | "revisao"
  | "simulado"
  | "descanso"
  | "pausa"
  | "rotina"
  | "exercicio";

export interface PcAcPlanActivity {
  type: PcAcActivityType;
  subject?: string;
  /** Tópico (ou subtópico) exato do Anexo III a que a atividade se refere, quando houver um. */
  topic?: string;
  detail: string;
}

export interface PcAcPlanDay {
  date: string; // ISO yyyy-mm-dd
  weekday: number; // 0 domingo … 6 sábado
  activities: PcAcPlanActivity[];
}

export type PcAcPlanPhase = "fundamentos" | "pratica" | "revisao";

export const PCAC_PHASE_LABEL: Record<PcAcPlanPhase, string> = {
  fundamentos: "Base teórica por prioridade",
  pratica: "Prática intensiva e redação",
  revisao: "Simulados e revisão final",
};

export interface PcAcPlanWeek {
  weekNumber: number;
  phase: PcAcPlanPhase;
  startDate: string;
  endDate: string;
  days: PcAcPlanDay[];
}

const toIso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);

/** Próxima segunda-feira a partir de `from` (ou o próprio dia, se já for segunda). Toda semana do
 * plano começa na segunda para ficar fácil de ler. */
function nextMonday(from: Date): Date {
  const day = from.getDay();
  const diff = day === 1 ? 0 : day === 0 ? 1 : 8 - day;
  return new Date(from.getFullYear(), from.getMonth(), from.getDate() + diff);
}

const REDACAO_THEMES = [
  "atuação do investigador na apuração de crimes patrimoniais",
  "uso de tecnologia e análise de dados na investigação policial",
  "cadeia de custódia e valor da prova no inquérito policial",
  "direitos humanos e atuação policial no Acre",
  "crimes contra a administração pública e investigação financeira",
];

function activitiesForFundamentos(topic: PcAcStudyTopic, dayIndexInWeek: number): PcAcPlanActivity[] {
  const base = { subject: topic.discipline, topic: topic.topic };
  if (dayIndexInWeek === 0) {
    return [{ type: "teoria", ...base, detail: "Leia o resumo e os pontos do Anexo III, sem pressa." }];
  }
  return [
    { type: "teoria", ...base, detail: 'Continue o tópico — fixe os pontos marcados como "a estudar" no edital digital.' },
    { type: "questoes", ...base, detail: "15 a 20 questões no Treinador, revisando cada erro." },
  ];
}

function activitiesForPratica(topic: PcAcStudyTopic, isLastStudyDayOfWeek: boolean, weekIndex: number): PcAcPlanActivity[] {
  const base = { subject: topic.discipline, topic: topic.topic };
  if (isLastStudyDayOfWeek) {
    const theme = REDACAO_THEMES[weekIndex % REDACAO_THEMES.length];
    return [
      { type: "questoes", ...base, detail: "20 a 30 questões, cronometradas." },
      { type: "redacao", detail: `Texto dissertativo-argumentativo de 20 a 30 linhas sobre ${theme} (modelo da prova discursiva).` },
    ];
  }
  return [
    { type: "questoes", ...base, detail: "25 a 35 questões, misturando bancas policiais." },
    { type: "revisao", ...base, detail: "Reveja os erros do dia anterior antes de avançar." },
  ];
}

function activitiesForRevisao(topic: PcAcStudyTopic | undefined, isLastStudyDayOfWeek: boolean, weekIndex: number): PcAcPlanActivity[] {
  if (isLastStudyDayOfWeek) {
    return [{ type: "simulado", detail: "100 questões cronometradas, nas condições da prova (ver Simulados)." }];
  }
  const theme = REDACAO_THEMES[weekIndex % REDACAO_THEMES.length];
  return [
    topic
      ? { type: "revisao", subject: topic.discipline, topic: topic.topic, detail: "Refaça só as questões que errou antes." }
      : { type: "revisao", detail: "Revisão rápida dos pontos mais fracos do Anexo III." },
    { type: "redacao", detail: `Pratique novamente sobre ${theme}, cronometrando 1h.` },
  ];
}

/** Monta o plano completo entre `fromDate` e `examDateIso`, parando de estudar conteúdo novo
 * `PCAC_LAST_STUDY_OFFSET_DAYS` dias antes da prova. `studyDays` são os dias da semana (0–6) em
 * que o aluno estuda — a mesma configuração usada no cronograma de horários. */
export function buildPcAcMasterPlan(
  studyDays: number[],
  examDateIso: string = PCAC_EXAM_DATE,
  fromDate: Date = new Date(),
): PcAcPlanWeek[] {
  const days = [...new Set(studyDays)].sort((a, b) => a - b);
  if (!days.length) return [];

  const examDate = new Date(`${examDateIso}T00:00:00`);
  const lastStudyDate = addDays(examDate, -PCAC_LAST_STUDY_OFFSET_DAYS);
  const start = nextMonday(new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()));
  if (start.getTime() > lastStudyDate.getTime()) return [];

  const totalWeeks = Math.max(1, Math.ceil((lastStudyDate.getTime() - start.getTime() + 86_400_000) / (7 * 86_400_000)));
  const fundamentosWeeks = Math.max(1, Math.round(totalWeeks * 0.5));
  const praticaWeeks = totalWeeks <= 2 ? 0 : Math.max(1, Math.round(totalWeeks * 0.3));

  const nextTopic = createTopicCursor();

  const weeks: PcAcPlanWeek[] = [];
  let cursor = start;
  for (let w = 0; w < totalWeeks; w += 1) {
    const phase: PcAcPlanPhase = w < fundamentosWeeks ? "fundamentos" : w < fundamentosWeeks + praticaWeeks ? "pratica" : "revisao";
    const weekDays: PcAcPlanDay[] = [];
    const studyDaysThisWeek = days
      .map((wd) => addDays(cursor, (wd - cursor.getDay() + 7) % 7))
      .filter((d) => d.getTime() <= lastStudyDate.getTime())
      .sort((a, b) => a.getTime() - b.getTime());

    studyDaysThisWeek.forEach((date, i) => {
      const isLast = i === studyDaysThisWeek.length - 1;
      let activities: PcAcPlanActivity[];
      if (phase === "fundamentos") {
        activities = activitiesForFundamentos(nextTopic(), i);
      } else if (phase === "pratica") {
        activities = activitiesForPratica(nextTopic(), isLast, w);
      } else {
        activities = activitiesForRevisao(isLast ? undefined : nextTopic(), isLast, w);
      }
      weekDays.push({ date: toIso(date), weekday: date.getDay(), activities });
    });

    if (weekDays.length) {
      weeks.push({
        weekNumber: w + 1,
        phase,
        startDate: toIso(cursor),
        endDate: toIso(addDays(cursor, 6)),
        days: weekDays,
      });
    }
    cursor = addDays(cursor, 7);
  }
  return weeks;
}

/** Os últimos dias antes da prova (não incluídos no plano de estudo novo): revisão leve e
 * descanso, para chegar na prova com a cabeça fresca. */
export function buildPcAcFinalDays(examDateIso: string = PCAC_EXAM_DATE): PcAcPlanDay[] {
  const examDate = new Date(`${examDateIso}T00:00:00`);
  const out: PcAcPlanDay[] = [];
  for (let i = PCAC_LAST_STUDY_OFFSET_DAYS; i >= 1; i -= 1) {
    const date = addDays(examDate, -i);
    const detail =
      i === PCAC_LAST_STUDY_OFFSET_DAYS
        ? "Revisão leve: releia só seus próprios resumos e grifos, sem conteúdo novo nem questões longas."
        : i === 2
          ? "Descanso ativo: durma bem, organize seus documentos e o caminho até o local de prova."
          : "Véspera: revisão rápida de 30 minutos no máximo, depois descanse. Chegue descansado é mais importante que estudar mais.";
    out.push({ date: toIso(date), weekday: date.getDay(), activities: [{ type: "descanso", detail }] });
  }
  return out;
}

export const PCAC_ACTIVITY_LABEL: Record<PcAcActivityType, string> = {
  teoria: "Teoria",
  questoes: "Questões",
  redacao: "Redação",
  revisao: "Revisão",
  simulado: "Simulado",
  descanso: "Descanso",
  pausa: "Pausa",
  rotina: "Rotina",
  exercicio: "Treino físico",
};
