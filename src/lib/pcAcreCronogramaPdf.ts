// Mesmo caminho de import que src/lib/pcAcreVerticalPdf.ts, pela mesma razão: o pacote "jspdf" não
// publica condição de export para o ambiente "workerd" (build de servidor/Cloudflare Workers).
// @ts-expect-error -- jspdf não publica tipos para este subpath; o export tem a mesma forma de "jspdf".
import { jsPDF } from "jspdf/dist/jspdf.es.min.js";
import type { PcAcVerticalCargo } from "@/data/pcAcreVerticalizado";
import {
  pcAcDaysUntilExam,
  PCAC_BOARD,
  PCAC_EXAM_DATE,
  type PcAcStudyPlanConfig,
  type PcAcWeeklyGridRow,
} from "@/lib/pcAcreStudyPlan";
import {
  PCAC_ACTIVITY_LABEL,
  PCAC_PHASE_LABEL,
  type PcAcPlanDay,
  type PcAcPlanWeek,
} from "@/lib/pcAcreMasterPlan";

const LOGO_URL = "/media/brand/norte-identity/emblema.png";

const NAVY: [number, number, number] = [18, 30, 39];
const NAVY_SOFT: [number, number, number] = [37, 54, 68];
const GOLD: [number, number, number] = [185, 158, 102];
const GOLD_DEEP: [number, number, number] = [138, 112, 61];
const INK: [number, number, number] = [24, 26, 32];
const MUTED: [number, number, number] = [104, 108, 118];
const LINE: [number, number, number] = [222, 222, 228];
const CARD_BG: [number, number, number] = [250, 249, 246];
const ROW_ALT: [number, number, number] = [245, 244, 240];

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 48;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const FOOTER_Y = PAGE_H - 34;
const TOP_SAFE = 56;

const WEEKDAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
/** Ordem segunda→domingo, como no cronograma em papel que serviu de modelo (colunas S T Q Q S S D). */
const GRID_DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const GRID_DAY_LETTER = ["D", "S", "T", "Q", "Q", "S", "S"]; // índice = weekday (0 domingo)
const fmtDate = (iso: string) => iso.split("-").reverse().join("/");

async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const res = await fetch(LOGO_URL);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function drawWatermark(doc: jsPDF, logo: string | null) {
  doc.saveGraphicsState();
  if (logo) {
    const size = 300;
    doc.setGState(new doc.GState({ opacity: 0.08 }));
    doc.addImage(logo, "PNG", (PAGE_W - size) / 2, (PAGE_H - size) / 2, size, size);
  } else {
    doc.setGState(new doc.GState({ opacity: 0.08 }));
    doc.setTextColor(...NAVY);
    doc.setFontSize(50);
    doc.setFont("helvetica", "bold");
    doc.text("NORTE CONCURSOS", PAGE_W / 2, PAGE_H / 2, { angle: 35, align: "center" });
  }
  doc.setGState(new doc.GState({ opacity: 1 }));
  doc.restoreGraphicsState();
}

function drawRunningHeader(doc: jsPDF, logo: string | null, subtitle: string) {
  if (logo) doc.addImage(logo, "PNG", MARGIN_X, 24, 22, 22);
  const textX = logo ? MARGIN_X + 30 : MARGIN_X;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(...NAVY);
  doc.text("Cronograma de estudos · PC-AC 001/2026", textX, 33);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text(subtitle, textX, 43);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1.2);
  doc.line(MARGIN_X, 52, PAGE_W - MARGIN_X, 52);
}

function drawFooter(doc: jsPDF, logo: string | null, page: number, pageCount: number) {
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.6);
  doc.line(MARGIN_X, FOOTER_Y - 10, PAGE_W - MARGIN_X, FOOTER_Y - 10);
  if (logo) doc.addImage(logo, "PNG", MARGIN_X, FOOTER_Y - 7, 13, 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("Norte Concursos · norteconcursos.xyz", logo ? MARGIN_X + 18 : MARGIN_X, FOOTER_Y + 2);
  doc.text(`página ${page} de ${pageCount}`, PAGE_W - MARGIN_X, FOOTER_Y + 2, { align: "right" });
}

function drawSectionBand(doc: jsPDF, title: string, subtitle: string | undefined, y: number) {
  doc.setFillColor(...NAVY);
  doc.roundedRect(MARGIN_X, y, CONTENT_W, 26, 4, 4, "F");
  doc.setFillColor(...GOLD);
  doc.rect(MARGIN_X, y, 4, 26, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(title, MARGIN_X + 14, y + 17);
  if (subtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...GOLD);
    doc.text(subtitle, MARGIN_X + CONTENT_W - 10, y + 17, { align: "right" });
  }
}

function drawCoverPage(
  doc: jsPDF,
  cargo: PcAcVerticalCargo,
  logo: string | null,
  cfg: PcAcStudyPlanConfig,
  weeks: PcAcPlanWeek[],
) {
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, 230, "F");
  doc.setFillColor(...NAVY_SOFT);
  doc.rect(0, 220, PAGE_W, 10, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 228, PAGE_W, 2.5, "F");

  if (logo) doc.addImage(logo, "PNG", (PAGE_W - 72) / 2, 34, 72, 72);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...GOLD);
  doc.text("NORTE CONCURSOS", PAGE_W / 2, logo ? 128 : 60, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text("Cronograma de estudos", PAGE_W / 2, logo ? 158 : 95, { align: "center" });
  doc.setFontSize(14);
  doc.setTextColor(...GOLD);
  doc.text(`PC-AC 001/2026 · banca ${PCAC_BOARD}`, PAGE_W / 2, logo ? 180 : 118, { align: "center" });

  let y = 268;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...NAVY);
  const labelLines = doc.splitTextToSize(cargo.label, CONTENT_W);
  doc.text(labelLines, PAGE_W / 2, y, { align: "center" });
  y += labelLines.length * 22 + 4;

  const daysLeft = pcAcDaysUntilExam(PCAC_EXAM_DATE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...MUTED);
  doc.text(
    `Prova objetiva em ${fmtDate(PCAC_EXAM_DATE)} · encerra conteúdo novo 3 dias antes`,
    PAGE_W / 2,
    y,
    { align: "center" },
  );
  y += 28;

  const stats: [string, string][] = [
    ["Dias até a prova", String(daysLeft)],
    ["Horas/semana", `${cfg.weeklyHours}h`],
    ["Semanas planejadas", weeks.length ? String(weeks.length) : "—"],
  ];
  const cardW = (CONTENT_W - 24) / 3;
  stats.forEach(([label, value], i) => {
    const x = MARGIN_X + i * (cardW + 12);
    doc.setFillColor(...CARD_BG);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.7);
    doc.roundedRect(x, y, cardW, 54, 6, 6, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(...GOLD_DEEP);
    doc.text(value, x + cardW / 2, y + 28, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text(label, x + cardW / 2, y + 42, { align: "center" });
  });
  y += 76;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  doc.setTextColor(...NAVY);
  doc.text("Como usar este cronograma", MARGIN_X, y);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(MARGIN_X, y + 5, MARGIN_X + 46, y + 5);
  y += 20;

  const steps: [string, string][] = [
    ["Grade semanal", "Quanto tempo e em que dias estudar cada disciplina, pelo peso dela na prova (Anexo III + banca IDECAN)."],
    ["Semana a semana", "O que fazer em cada dia: teoria, questões, redação e simulados, até 3 dias antes da prova."],
    ["Últimos dias", "Revisão leve e descanso — sem conteúdo novo, para chegar na prova com a cabeça fresca."],
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  steps.forEach(([title, desc], i) => {
    doc.setTextColor(...GOLD_DEEP);
    doc.setFont("helvetica", "bold");
    doc.text(`${i + 1}. ${title}`, MARGIN_X, y);
    y += 13;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    const lines = doc.splitTextToSize(desc, CONTENT_W - 10);
    doc.text(lines, MARGIN_X, y);
    y += lines.length * 11 + 8;
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text("Dev. Franc D'nis · Feijó-AC, Brasil", PAGE_W / 2, PAGE_H - 44, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text("norteconcursos.xyz", PAGE_W / 2, PAGE_H - 30, { align: "center" });
}

/** Tabela "Disciplina · Peso · Horário · dias da semana", no mesmo formato do cronograma em
 * papel que serviu de modelo (colunas S T Q Q S S D = segunda a domingo). */
function drawWeeklyGridTable(doc: jsPDF, grid: PcAcWeeklyGridRow[], y: number): number {
  const colDisciplina = 168;
  const colPeso = 32;
  const colHorario = 92;
  const dayColsW = CONTENT_W - colDisciplina - colPeso - colHorario;
  const colDay = dayColsW / 7;
  const rowH = 17;

  const xDisciplina = MARGIN_X;
  const xPeso = xDisciplina + colDisciplina;
  const xHorario = xPeso + colPeso;
  const xDayStart = xHorario + colHorario;
  const startY = y;

  doc.setFillColor(...NAVY);
  doc.rect(MARGIN_X, y, CONTENT_W, rowH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("DISCIPLINA", xDisciplina + 6, y + 11.5);
  doc.text("PESO", xPeso + colPeso / 2, y + 11.5, { align: "center" });
  doc.text("HORÁRIO", xHorario + colHorario / 2, y + 11.5, { align: "center" });
  GRID_DAY_ORDER.forEach((weekday, i) => {
    doc.text(GRID_DAY_LETTER[weekday]!, xDayStart + colDay * i + colDay / 2, y + 11.5, { align: "center" });
  });
  y += rowH;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  grid.forEach((row, i) => {
    if (i % 2 === 1) {
      doc.setFillColor(...ROW_ALT);
      doc.rect(MARGIN_X, y, CONTENT_W, rowH, "F");
    }
    doc.setTextColor(...INK);
    const nameLines = doc.splitTextToSize(row.name, colDisciplina - 10);
    doc.text(nameLines[0] ?? row.name, xDisciplina + 6, y + 11.5);
    doc.setTextColor(...GOLD_DEEP);
    doc.setFont("helvetica", "bold");
    doc.text(String(row.peso), xPeso + colPeso / 2, y + 11.5, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text(row.horario, xHorario + colHorario / 2, y + 11.5, { align: "center" });
    GRID_DAY_ORDER.forEach((weekday, di) => {
      if (row.days.includes(weekday)) {
        doc.setTextColor(...GOLD_DEEP);
        doc.setFont("helvetica", "bold");
        doc.text("X", xDayStart + colDay * di + colDay / 2, y + 11.5, { align: "center" });
        doc.setFont("helvetica", "normal");
      }
    });
    y += rowH;
  });

  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.6);
  doc.rect(MARGIN_X, startY, CONTENT_W, y - startY);
  for (let i = 1; i <= grid.length; i += 1) {
    const ly = startY + rowH * i;
    doc.line(MARGIN_X, ly, MARGIN_X + CONTENT_W, ly);
  }
  const vLines = [xPeso, xHorario, xDayStart];
  for (let i = 1; i < 7; i += 1) vLines.push(xDayStart + colDay * i);
  vLines.forEach((lx) => doc.line(lx, startY, lx, y));

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text(
    "Peso 2 = disciplina de maior incidência na banca IDECAN e maior dificuldade. Peso 1 = demais disciplinas.",
    MARGIN_X,
    y + 14,
    { maxWidth: CONTENT_W },
  );
  return y + 26;
}

function activityLine(doc: jsPDF, activity: { type: keyof typeof PCAC_ACTIVITY_LABEL; detail: string }, x: number, y: number, maxWidth: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...GOLD_DEEP);
  const tag = `${PCAC_ACTIVITY_LABEL[activity.type]} — `;
  doc.text(tag, x, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...INK);
  const tagWidth = doc.getTextWidth(tag);
  const lines = doc.splitTextToSize(activity.detail, maxWidth - tagWidth);
  doc.text(lines[0] ?? "", x + tagWidth, y);
  for (let i = 1; i < lines.length; i += 1) doc.text(lines[i]!, x, y + i * 11);
  return Math.max(1, lines.length);
}

function drawDay(doc: jsPDF, day: PcAcPlanDay, cursor: { y: number }, newPage: () => void) {
  const rowH = 16 + day.activities.length * 13 + 6;
  if (cursor.y + rowH > FOOTER_Y - 18) newPage();
  doc.setFillColor(...CARD_BG);
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.6);
  doc.roundedRect(MARGIN_X, cursor.y, CONTENT_W, rowH, 4, 4, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...NAVY);
  doc.text(`${WEEKDAY_NAMES[day.weekday]} · ${fmtDate(day.date)}`, MARGIN_X + 10, cursor.y + 14);
  let lineY = cursor.y + 29;
  for (const activity of day.activities) {
    const n = activityLine(doc, activity, MARGIN_X + 10, lineY, CONTENT_W - 20);
    lineY += n * 11 + 3;
  }
  cursor.y += rowH + 8;
}

export interface PcAcCronogramaPdfInput {
  cargo: PcAcVerticalCargo;
  cfg: PcAcStudyPlanConfig;
  grid: PcAcWeeklyGridRow[];
  weeks: PcAcPlanWeek[];
  finalDays: PcAcPlanDay[];
}

/** Gera o cronograma de estudos completo em PDF: capa, grade semanal por disciplina (peso,
 * horário e dias da semana, no formato do cronograma em papel que serviu de modelo) e, quando
 * disponível, a programação semana a semana (teoria, questões, redação, revisão e simulados) até
 * os últimos dias antes da prova. Roda inteiramente no navegador do aluno. */
export async function generatePcAcCronogramaPdf({ cargo, cfg, grid, weeks, finalDays }: PcAcCronogramaPdfInput) {
  const logo = await loadLogoDataUrl();
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  drawCoverPage(doc, cargo, logo, cfg, weeks);

  const cursor = { y: TOP_SAFE };
  doc.addPage();
  drawWatermark(doc, logo);
  drawRunningHeader(doc, logo, cargo.label);

  const newContentPage = () => {
    doc.addPage();
    drawWatermark(doc, logo);
    drawRunningHeader(doc, logo, cargo.label);
    cursor.y = TOP_SAFE;
  };

  drawSectionBand(doc, "Grade semanal por disciplina", `${cfg.weeklyHours}h/semana`, cursor.y);
  cursor.y += 36;
  cursor.y = drawWeeklyGridTable(doc, grid, cursor.y);

  if (weeks.length) {
    for (const week of weeks) {
      if (cursor.y + 60 > FOOTER_Y - 18) newContentPage();
      drawSectionBand(doc, `Semana ${week.weekNumber} · ${fmtDate(week.startDate)} a ${fmtDate(week.endDate)}`, PCAC_PHASE_LABEL[week.phase], cursor.y);
      cursor.y += 36;
      for (const day of week.days) drawDay(doc, day, cursor, newContentPage);
      cursor.y += 6;
    }
  }

  if (finalDays.length) {
    newContentPage();
    drawSectionBand(doc, "Últimos dias antes da prova", undefined, cursor.y);
    cursor.y += 36;
    for (const day of finalDays) drawDay(doc, day, cursor, newContentPage);
  }

  const pageCount = doc.getNumberOfPages();
  for (let i = 2; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter(doc, logo, i - 1, pageCount - 1);
  }

  doc.save(`cronograma-estudos-pc-ac-${cargo.id}.pdf`);
}
