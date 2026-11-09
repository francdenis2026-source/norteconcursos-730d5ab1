import { INVESTIGATOR_STUDY_ORDER } from "@/data/pcAcreIdecanRadar";
import { PCAC_EXAM_DATE } from "@/lib/pcAcreStudyPlan";

/** Plano de estudos completo (semana a semana, dia a dia) para o Oficial Investigador da PC-AC,
 * organizado pela ordem de relevância da banca IDECAN já marcada em `pcAcreIdecanRadar.ts` —
 * reaproveita a mesma marcação usada nos cartões "Foco recomendado" e "Onde concentrar seu
 * tempo" do edital verticalizado, em vez de criar uma nova. Encerra o estudo de conteúdo novo
 * 3 dias antes da prova, deixando esses últimos dias para revisão leve e descanso. */

export const PCAC_LAST_STUDY_OFFSET_DAYS = 3;

export type PcAcActivityType =
  | "teoria"
  | "questoes"
  | "redacao"
  | "revisao"
  | "simulado"
  | "descanso"
  | "pausa"
  | "rotina";

export interface PcAcPlanActivity {
  type: PcAcActivityType;
  subject?: string;
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

function activitiesForFundamentos(subject: string, dayIndexInWeek: number): PcAcPlanActivity[] {
  if (dayIndexInWeek === 0) {
    return [
      { type: "teoria", subject, detail: `Teoria: ${subject} — leia o resumo e os pontos do Anexo III, sem pressa.` },
    ];
  }
  return [
    { type: "teoria", subject, detail: `Teoria: continue ${subject} — fixe os pontos marcados como "a estudar" no edital digital.` },
    { type: "questoes", subject, detail: `Questões: 15 a 20 questões de ${subject} no Treinador, revisando cada erro.` },
  ];
}

function activitiesForPratica(subject: string, isLastStudyDayOfWeek: boolean, weekIndex: number): PcAcPlanActivity[] {
  if (isLastStudyDayOfWeek) {
    const theme = REDACAO_THEMES[weekIndex % REDACAO_THEMES.length];
    return [
      { type: "questoes", subject, detail: `Questões: 20 a 30 questões de ${subject}, cronometradas.` },
      { type: "redacao", detail: `Redação: um texto dissertativo-argumentativo de 20 a 30 linhas sobre ${theme} (modelo da prova discursiva).` },
    ];
  }
  return [
    { type: "questoes", subject, detail: `Questões: 25 a 35 questões de ${subject}, misturando bancas policiais.` },
    { type: "revisao", subject, detail: `Revisão: reveja os erros do dia anterior antes de avançar.` },
  ];
}

function activitiesForRevisao(subject: string | undefined, isLastStudyDayOfWeek: boolean, weekIndex: number): PcAcPlanActivity[] {
  if (isLastStudyDayOfWeek) {
    return [{ type: "simulado", detail: "Simulado completo: 100 questões cronometradas, nas condições da prova (ver Simulados)." }];
  }
  const theme = REDACAO_THEMES[weekIndex % REDACAO_THEMES.length];
  return [
    { type: "revisao", ...(subject ? { subject } : {}), detail: subject ? `Revisão rápida: ${subject} — refaça só as questões que errou antes.` : "Revisão rápida dos pontos mais fracos do Anexo III." },
    { type: "redacao", detail: `Redação: pratique novamente sobre ${theme}, cronometrando 1h.` },
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

  const subjects = INVESTIGATOR_STUDY_ORDER;
  let subjectCursor = 0;
  const nextSubject = () => {
    const s = subjects[subjectCursor % subjects.length]!;
    subjectCursor += 1;
    return s.subject;
  };

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
        activities = activitiesForFundamentos(nextSubject(), i);
      } else if (phase === "pratica") {
        activities = activitiesForPratica(nextSubject(), isLast, w);
      } else {
        activities = activitiesForRevisao(isLast ? undefined : nextSubject(), isLast, w);
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
};
