// Mesmo caminho de import que src/lib/pcAcreVerticalPdf.ts, pela mesma razão: o pacote "jspdf" não
// publica condição de export para o ambiente "workerd" (build de servidor/Cloudflare Workers).
// @ts-expect-error -- jspdf não publica tipos para este subpath; o export tem a mesma forma de "jspdf".
import { jsPDF } from "jspdf/dist/jspdf.es.min.js";
import type { PcAcVerticalCargo } from "@/data/pcAcreVerticalizado";
import {
  PCAC_BOARD,
  PCAC_EXAM_DATE,
  type PcAcStudyPlanConfig,
  type PcAcWeeklyGridRow,
} from "@/lib/pcAcreStudyPlan";
import {
  PCAC_ACTIVITY_LABEL,
  PCAC_PHASE_LABEL,
  type PcAcPlanDay,
  pcAcDaysBetween,
  type PcAcPlanWeek,
} from "@/lib/pcAcreMasterPlan";
import { platformDate } from "@/lib/platformClock";
import { loadPcAcPdfAssets } from "@/lib/pcAcPdfAssets";

const DEV_SIGNATURE = "Desenvolvido por Franc Denis · Feijó, Acre, Brasil";

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
const FOOTER_Y = PAGE_H - 44;
const TOP_SAFE = 56;

const WEEKDAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
/** Ordem segunda→domingo, como no cronograma em papel que serviu de modelo (colunas S T Q Q S S D). */
const GRID_DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const GRID_DAY_LETTER = ["D", "S", "T", "Q", "Q", "S", "S"]; // índice = weekday (0 domingo)
const fmtDate = (iso: string) => iso.split("-").reverse().join("/");

function drawWatermark(doc: jsPDF, logo: string | null) {
  doc.saveGraphicsState();
  if (logo) {
    const size = 244;
    doc.setGState(new doc.GState({ opacity: 0.035 }));
    doc.addImage(logo, "PNG", (PAGE_W - size) / 2, (PAGE_H - size) / 2, size, size);
  } else {
    doc.setGState(new doc.GState({ opacity: 0.035 }));
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
  const textX = logo ? MARGIN_X + 18 : MARGIN_X;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("Norte Concursos · norteconcursos.xyz", textX, FOOTER_Y + 2);
  doc.text(`página ${page} de ${pageCount}`, PAGE_W - MARGIN_X, FOOTER_Y + 2, { align: "right" });
  doc.setFontSize(6.8);
  doc.text(DEV_SIGNATURE, textX, FOOTER_Y + 12);
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
  cover: string | null,
  qr: string | null,
  cfg: PcAcStudyPlanConfig,
  weeks: PcAcPlanWeek[],
) {
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, 230, "F");
  doc.setFillColor(...NAVY_SOFT);
  doc.rect(0, 220, PAGE_W, 10, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 228, PAGE_W, 2.5, "F");

  if (logo) doc.addImage(logo, "PNG", MARGIN_X, 43, 54, 54);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...GOLD);
  doc.text("NORTE CONCURSOS", MARGIN_X + 66, 58);
  doc.setFontSize(23);
  doc.setTextColor(255, 255, 255);
  doc.text("Cronograma de estudos", MARGIN_X + 66, 94);
  doc.setFontSize(11);
  doc.setTextColor(...GOLD);
  doc.text(`PC-AC 001/2026 · banca ${PCAC_BOARD}`, MARGIN_X + 66, 119);

  if (cover) {
    const imageX = PAGE_W - MARGIN_X - 170;
    const imageY = 42;
    doc.addImage(cover, "JPEG", imageX, imageY, 170, 96);
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.8);
    doc.roundedRect(imageX - 1, imageY - 1, 172, 98, 4, 4, "S");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(218, 218, 224);
    doc.text("Imagem ilustrativa · PC-AC", imageX, imageY + 110);
  }

  let y = 268;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...NAVY);
  const labelLines = doc.splitTextToSize(cargo.label, CONTENT_W);
  doc.text(labelLines, PAGE_W / 2, y, { align: "center" });
  y += labelLines.length * 22 + 4;

  const today = platformDate();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const daysLeft = pcAcDaysBetween(todayKey, PCAC_EXAM_DATE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...MUTED);
  doc.text(
    `Início em ${cfg.startDate ? fmtDate(cfg.startDate) : "hoje"} · prova objetiva em ${fmtDate(PCAC_EXAM_DATE)} · encerra conteúdo novo 3 dias antes`,
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

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(...MUTED);
  doc.text(
    "Plano personalizado de apoio, organizado a partir do Anexo III. Confira o edital oficial e eventuais retificações para datas e regras do concurso.",
    MARGIN_X,
    PAGE_H - 78,
    { maxWidth: CONTENT_W - (qr ? 70 : 0) },
  );
  if (qr) {
    const qrX = PAGE_W - MARGIN_X - 48;
    doc.addImage(qr, "PNG", qrX, PAGE_H - 112, 48, 48);
    doc.setFontSize(6.5);
    doc.text("Acesse a plataforma", qrX + 24, PAGE_H - 58, { align: "center" });
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text("Norte Concursos · norteconcursos.xyz", PAGE_W / 2, PAGE_H - 34, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text(DEV_SIGNATURE, PAGE_W / 2, PAGE_H - 23, { align: "center" });
}

/** Tabela "Disciplina · Peso · Horário · dias da semana", no mesmo formato do cronograma em
 * papel que serviu de modelo (colunas S T Q Q S S D = segunda a domingo). */
function drawWeeklyGridTable(doc: jsPDF, grid: PcAcWeeklyGridRow[], y: number): number {
  const colDisciplina = 168;
  const colPeso = 32;
  const colHorario = 92;
  const dayColsW = CONTENT_W - colDisciplina - colPeso - colHorario;
  const colDay = dayColsW / 7;
  const headerH = 18;

  const xDisciplina = MARGIN_X;
  const xPeso = xDisciplina + colDisciplina;
  const xHorario = xPeso + colPeso;
  const xDayStart = xHorario + colHorario;
  const startY = y;
  const rowBoundaries: number[] = [];

  doc.setFillColor(...NAVY);
  doc.rect(MARGIN_X, y, CONTENT_W, headerH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text("DISCIPLINA", xDisciplina + 6, y + 12);
  doc.text("PESO", xPeso + colPeso / 2, y + 12, { align: "center" });
  doc.text("HORÁRIO", xHorario + colHorario / 2, y + 12, { align: "center" });
  GRID_DAY_ORDER.forEach((weekday, i) => {
    doc.text(GRID_DAY_LETTER[weekday]!, xDayStart + colDay * i + colDay / 2, y + 12, { align: "center" });
  });
  y += headerH;
  rowBoundaries.push(y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  grid.forEach((row, i) => {
    const nameLines = doc.splitTextToSize(row.name, colDisciplina - 12);
    const rowH = Math.max(20, nameLines.length * 9.5 + 8);
    if (i % 2 === 1) {
      doc.setFillColor(...ROW_ALT);
      doc.rect(MARGIN_X, y, CONTENT_W, rowH, "F");
    }
    doc.setTextColor(...INK);
    doc.setFontSize(7.5);
    doc.text(nameLines, xDisciplina + 6, y + 10.5);
    const centerY = y + rowH / 2 + 2.5;
    doc.setTextColor(...GOLD_DEEP);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text(String(row.peso), xPeso + colPeso / 2, centerY, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.setFontSize(7);
    doc.text(row.horario, xHorario + colHorario / 2, centerY, { align: "center" });
    GRID_DAY_ORDER.forEach((weekday, di) => {
      if (row.days.includes(weekday)) {
        doc.setTextColor(...GOLD_DEEP);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("X", xDayStart + colDay * di + colDay / 2, centerY, { align: "center" });
        doc.setFont("helvetica", "normal");
      }
    });
    y += rowH;
    rowBoundaries.push(y);
  });

  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.6);
  doc.rect(MARGIN_X, startY, CONTENT_W, y - startY);
  rowBoundaries.forEach((lineY) => doc.line(MARGIN_X, lineY, MARGIN_X + CONTENT_W, lineY));
  [xPeso, xHorario, xDayStart].forEach((lineX) => doc.line(lineX, startY, lineX, y));
  for (let i = 1; i < 7; i++) doc.line(xDayStart + colDay * i, startY, xDayStart + colDay * i, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text(
    "O peso organiza a distribuição sugerida do tempo de estudo; não representa pontuação oficial nem garantia de incidência.",
    MARGIN_X,
    y + 14,
    { maxWidth: CONTENT_W },
  );
  return y + 26;
}

// Colunas da tabela "Dia · Atividade · Disciplina · Tópico/instrução" — mesmo recorte da tabela
// equivalente na tela (ver PcAcCronogramaCard em pc-acre-edital.tsx).
const DAY_COL_W = 86;
const TYPE_COL_W = 58;
const SUBJECT_COL_W = 108;
const TOPIC_COL_W = CONTENT_W - DAY_COL_W - TYPE_COL_W - SUBJECT_COL_W;
const DAY_COL_X = MARGIN_X;
const TYPE_COL_X = DAY_COL_X + DAY_COL_W;
const SUBJECT_COL_X = TYPE_COL_X + TYPE_COL_W;
const TOPIC_COL_X = SUBJECT_COL_X + SUBJECT_COL_W;

function drawWeekTableHeader(doc: jsPDF, y: number): number {
  const rowH = 16;
  doc.setFillColor(...NAVY);
  doc.rect(MARGIN_X, y, CONTENT_W, rowH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text("DIA", DAY_COL_X + 6, y + 11);
  doc.text("ATIVIDADE", TYPE_COL_X + 6, y + 11);
  doc.text("DISCIPLINA", SUBJECT_COL_X + 6, y + 11);
  doc.text("TÓPICO / INSTRUÇÃO", TOPIC_COL_X + 6, y + 11);
  return y + rowH;
}

/** Uma linha da tabela por atividade (dia · atividade · disciplina · tópico do Anexo III +
 * instrução). Altura variável conforme o texto do tópico, que normalmente é o mais longo. */
function drawActivityRow(
  doc: jsPDF,
  day: PcAcPlanDay,
  activity: PcAcPlanDay["activities"][number],
  zebra: boolean,
  y: number,
  content: { topicLines: string[]; subjectLines: string[]; typeLines: string[]; continuation?: boolean },
): number {
  const lineCount = Math.max(content.topicLines.length, content.subjectLines.length, content.typeLines.length, 1);
  const typeHeight = content.typeLines.length * 8.5 + (activity.start && !content.continuation ? 7 : 0);
  const rowH = Math.max(17, lineCount * 9.5 + 8, typeHeight + 8);

  if (zebra) {
    doc.setFillColor(...ROW_ALT);
    doc.rect(MARGIN_X, y, CONTENT_W, rowH, "F");
  }
  doc.setFont("helvetica", content.continuation ? "normal" : "bold");
  doc.setFontSize(7);
  doc.setTextColor(...INK);
  doc.text(content.continuation ? "continuação" : `${WEEKDAY_NAMES[day.weekday]!.slice(0, 3)} ${fmtDate(day.date)}`, DAY_COL_X + 6, y + 10.5);
  doc.setTextColor(...GOLD_DEEP);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  if (content.typeLines.length) doc.text(content.typeLines, TYPE_COL_X + 6, y + 10.5);
  if (activity.start && !content.continuation) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.text(`${activity.start}–${activity.end}`, TYPE_COL_X + 6, y + 10.5 + content.typeLines.length * 8.5);
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...INK);
  if (content.subjectLines.length) doc.text(content.subjectLines, SUBJECT_COL_X + 6, y + 10.5);
  doc.setTextColor(...MUTED);
  if (content.topicLines.length) doc.text(content.topicLines, TOPIC_COL_X + 6, y + 10.5);

  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.5);
  doc.line(MARGIN_X, y + rowH, MARGIN_X + CONTENT_W, y + rowH);
  [TYPE_COL_X, SUBJECT_COL_X, TOPIC_COL_X].forEach((lineX) => doc.line(lineX, y, lineX, y + rowH));
  return rowH;
}

/** Desenha a semana inteira como tabela (uma linha por atividade), quebrando página quando
 * necessário e repetindo o cabeçalho da tabela no topo de cada página nova. */
function drawWeekTable(doc: jsPDF, week: PcAcPlanWeek, cursor: { y: number }, newPage: () => void) {
  cursor.y = drawWeekTableHeader(doc, cursor.y);
  let zebra = false;
  const pageBottom = FOOTER_Y - 18;
  const maxLinesOnPage = Math.max(1, Math.floor((pageBottom - TOP_SAFE - 28) / 9.5));

  for (const day of week.days) {
    for (const activity of day.activities) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      const topicText = activity.topic ? `${activity.topic} — ${activity.detail}` : activity.detail;
      const topicLines = doc.splitTextToSize(topicText, TOPIC_COL_W - 10);
      const subjectLines = doc.splitTextToSize(activity.subject ?? "—", SUBJECT_COL_W - 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      const typeLines = doc.splitTextToSize(PCAC_ACTIVITY_LABEL[activity.type], TYPE_COL_W - 10);
      const lineCount = Math.max(topicLines.length, subjectLines.length, typeLines.length, 1);

      if (lineCount <= maxLinesOnPage) {
        const estimatedHeight = Math.max(17, lineCount * 9.5 + 8, typeLines.length * 8.5 + (activity.start ? 7 : 0) + 8);
        if (cursor.y + estimatedHeight > pageBottom) {
          newPage();
          cursor.y = drawWeekTableHeader(doc, cursor.y);
          zebra = false;
        }
        cursor.y += drawActivityRow(doc, day, activity, zebra, cursor.y, {
          topicLines,
          subjectLines,
          typeLines,
        });
        zebra = !zebra;
        continue;
      }

      let offset = 0;
      while (offset < lineCount) {
        const availableLines = Math.floor(
          (pageBottom - cursor.y - 8 - (activity.start && offset === 0 ? 7 : 0)) / 9.5,
        );
        if (availableLines < 1) {
          newPage();
          cursor.y = drawWeekTableHeader(doc, cursor.y);
          zebra = false;
          continue;
        }
        const take = Math.min(availableLines, lineCount - offset);
        cursor.y += drawActivityRow(doc, day, activity, zebra, cursor.y, {
          topicLines: topicLines.slice(offset, offset + take),
          subjectLines: subjectLines.slice(offset, offset + take),
          typeLines: typeLines.slice(offset, offset + take),
          continuation: offset > 0,
        });
        zebra = !zebra;
        offset += take;
        if (offset < lineCount) {
          newPage();
          cursor.y = drawWeekTableHeader(doc, cursor.y);
          zebra = false;
        }
      }
    }
  }
  cursor.y += 14;
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
  const { logo, cover, qr } = await loadPcAcPdfAssets();
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  drawCoverPage(doc, cargo, logo, cover, qr, cfg, weeks);

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
      drawWeekTable(doc, week, cursor, newContentPage);
    }
  }

  if (finalDays.length) {
    newContentPage();
    drawSectionBand(doc, "Últimos dias antes da prova", undefined, cursor.y);
    cursor.y += 36;
    drawWeekTable(doc, { weekNumber: 0, phase: "revisao", startDate: "", endDate: "", days: finalDays }, cursor, newContentPage);
  }

  const pageCount = doc.getNumberOfPages();
  for (let i = 2; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter(doc, logo, i - 1, pageCount - 1);
  }

  doc.save(`cronograma-estudos-pc-ac-${cargo.id}.pdf`);
}
