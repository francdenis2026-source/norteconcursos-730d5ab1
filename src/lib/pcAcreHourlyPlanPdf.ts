// Mesmo caminho de import que os outros geradores de PDF do edital, pela mesma razão: o pacote
// "jspdf" não publica condição de export para o ambiente "workerd" (build de servidor/Cloudflare
// Workers).
// @ts-expect-error -- jspdf não publica tipos para este subpath; o export tem a mesma forma de "jspdf".
import { jsPDF } from "jspdf/dist/jspdf.es.min.js";
import { PCAC_BOARD, PCAC_EXAM_DATE, pcAcDaysUntilExam } from "@/lib/pcAcreStudyPlan";
import { PCAC_ACTIVITY_LABEL, type PcAcPlanDay } from "@/lib/pcAcreMasterPlan";
import { PCAC_HOURLY_DAY_WINDOW, type PcAcHourDay, type PcAcHourWeek } from "@/lib/pcAcreHourlyPlan";

const LOGO_URL = "/media/brand/norte-identity/emblema.png";

const NAVY: [number, number, number] = [18, 30, 39];
const NAVY_SOFT: [number, number, number] = [37, 54, 68];
const GOLD: [number, number, number] = [185, 158, 102];
const GOLD_DEEP: [number, number, number] = [138, 112, 61];
const INK: [number, number, number] = [24, 26, 32];
const MUTED: [number, number, number] = [104, 108, 118];
const LINE: [number, number, number] = [222, 222, 228];
const CARD_BG: [number, number, number] = [250, 249, 246];
const PAUSE_BG: [number, number, number] = [238, 242, 236];

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 44;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const FOOTER_Y = PAGE_H - 34;
const TOP_SAFE = 56;

const WEEKDAY_NAMES = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
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
    const size = 280;
    doc.setGState(new doc.GState({ opacity: 0.08 }));
    doc.addImage(logo, "PNG", (PAGE_W - size) / 2, (PAGE_H - size) / 2, size, size);
  } else {
    doc.setGState(new doc.GState({ opacity: 0.08 }));
    doc.setTextColor(...NAVY);
    doc.setFontSize(46);
    doc.setFont("helvetica", "bold");
    doc.text("NORTE CONCURSOS", PAGE_W / 2, PAGE_H / 2, { angle: 35, align: "center" });
  }
  doc.setGState(new doc.GState({ opacity: 1 }));
  doc.restoreGraphicsState();
}

function drawRunningHeader(doc: jsPDF, logo: string | null, subtitle: string) {
  if (logo) doc.addImage(logo, "PNG", MARGIN_X, 24, 20, 20);
  const textX = logo ? MARGIN_X + 28 : MARGIN_X;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...NAVY);
  doc.text("Cronograma horário detalhado · PC-AC 001/2026", textX, 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(subtitle, textX, 42);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1.2);
  doc.line(MARGIN_X, 50, PAGE_W - MARGIN_X, 50);
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

function drawCoverPage(doc: jsPDF, logo: string | null, weeks: PcAcHourWeek[], cargoLabel: string) {
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, 230, "F");
  doc.setFillColor(...NAVY_SOFT);
  doc.rect(0, 220, PAGE_W, 10, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 228, PAGE_W, 2.5, "F");

  if (logo) doc.addImage(logo, "PNG", (PAGE_W - 72) / 2, 32, 72, 72);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...GOLD);
  doc.text("NORTE CONCURSOS", PAGE_W / 2, logo ? 126 : 58, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(25);
  doc.setTextColor(255, 255, 255);
  doc.text("Cronograma horário detalhado", PAGE_W / 2, logo ? 156 : 92, { align: "center" });
  doc.setFontSize(13);
  doc.setTextColor(...GOLD);
  doc.text(`PC-AC 001/2026 · banca ${PCAC_BOARD} · ${cargoLabel}`, PAGE_W / 2, logo ? 178 : 114, { align: "center" });

  let y = 262;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...MUTED);
  doc.text(
    `De segunda a domingo, das ${PCAC_HOURLY_DAY_WINDOW}, com intervalos de descanso · prova em ${fmtDate(PCAC_EXAM_DATE)}`,
    PAGE_W / 2,
    y,
    { align: "center" },
  );
  y += 28;

  const daysLeft = pcAcDaysUntilExam(PCAC_EXAM_DATE);
  const stats: [string, string][] = [
    ["Dias até a prova", String(daysLeft)],
    ["Semanas detalhadas", String(weeks.length)],
    ["Janela diária", "16h"],
  ];
  const cardW = (CONTENT_W - 24) / 3;
  stats.forEach(([label, value], i) => {
    const x = MARGIN_X + i * (cardW + 12);
    doc.setFillColor(...CARD_BG);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.7);
    doc.roundedRect(x, y, cardW, 52, 6, 6, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.setTextColor(...GOLD_DEEP);
    doc.text(value, x + cardW / 2, y + 27, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text(label, x + cardW / 2, y + 41, { align: "center" });
  });
  y += 76;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  doc.text("Como o dia é dividido", MARGIN_X, y);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(MARGIN_X, y + 5, MARGIN_X + 46, y + 5);
  y += 18;

  const notes = [
    "Segunda a sexta: teoria, questões cronometradas, revisão e (a partir da fase de prática) redação — sempre com pausas curtas e almoço/jantar reservados.",
    "Sábado: simulado completo de 100 questões nas condições da prova, seguido de correção detalhada e redação.",
    "Domingo: descanso ativo, de propósito reduzido — dormir mais e sem conteúdo novo. Estudar 16h por dia, todo dia, por mais de dois meses, piora o desempenho na reta final.",
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...INK);
  notes.forEach((note) => {
    const lines = doc.splitTextToSize(`•  ${note}`, CONTENT_W);
    doc.text(lines, MARGIN_X, y);
    y += lines.length * 12 + 6;
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

function drawDayTable(doc: jsPDF, day: PcAcHourDay, cursor: { y: number }, newPage: () => void) {
  const rowH = 15;
  const headerH = 20;
  const needed = headerH + day.blocks.length * rowH + 10;
  if (cursor.y + Math.min(needed, 120) > FOOTER_Y - 18) newPage();

  doc.setFillColor(...NAVY);
  doc.roundedRect(MARGIN_X, cursor.y, CONTENT_W, headerH, 3, 3, "F");
  doc.setFillColor(...GOLD);
  doc.rect(MARGIN_X, cursor.y, 3.5, headerH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(`${WEEKDAY_NAMES[day.weekday]} · ${fmtDate(day.date)}`, MARGIN_X + 10, cursor.y + 14);
  cursor.y += headerH + 2;

  for (const block of day.blocks) {
    if (cursor.y + rowH > FOOTER_Y - 18) {
      newPage();
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.setTextColor(...MUTED);
      doc.text(`${WEEKDAY_NAMES[day.weekday]} · ${fmtDate(day.date)} (continuação)`, MARGIN_X, cursor.y);
      cursor.y += 14;
    }
    const isPause = block.type === "pausa" || block.type === "rotina";
    doc.setFillColor(...(isPause ? PAUSE_BG : CARD_BG));
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.5);
    doc.roundedRect(MARGIN_X, cursor.y, CONTENT_W, rowH - 2, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...(isPause ? MUTED : GOLD_DEEP));
    doc.text(`${block.start}–${block.end}`, MARGIN_X + 7, cursor.y + 10);
    doc.setFont("helvetica", isPause ? "italic" : "bold");
    doc.setFontSize(8);
    doc.setTextColor(...(isPause ? MUTED : NAVY));
    doc.text(`${PCAC_ACTIVITY_LABEL[block.type]}: `, MARGIN_X + 64, cursor.y + 10);
    const tagW = doc.getTextWidth(`${PCAC_ACTIVITY_LABEL[block.type]}: `);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...INK);
    const label = doc.splitTextToSize(block.label, CONTENT_W - 64 - tagW - 8)[0] ?? block.label;
    doc.text(label, MARGIN_X + 64 + tagW, cursor.y + 10);
    cursor.y += rowH;
  }
  cursor.y += 8;
}

/** Gera o cronograma horário detalhado em PDF: capa explicando a divisão do dia, e uma tabela
 * por dia (06:00–22:00) com cada bloco de atividade e seu horário exato, semana a semana, até
 * 3 dias antes da prova, seguido dos últimos dias (revisão leve e descanso). Módulo separado
 * dos outros geradores de PDF do edital para não conflitar com eles. */
export async function generatePcAcHourlyPlanPdf(cargoLabel: string, weeks: PcAcHourWeek[], finalDays: PcAcPlanDay[]) {
  const logo = await loadLogoDataUrl();
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  drawCoverPage(doc, logo, weeks, cargoLabel);

  const cursor = { y: TOP_SAFE };
  doc.addPage();
  drawWatermark(doc, logo);
  drawRunningHeader(doc, logo, cargoLabel);

  const newContentPage = () => {
    doc.addPage();
    drawWatermark(doc, logo);
    drawRunningHeader(doc, logo, cargoLabel);
    cursor.y = TOP_SAFE;
  };

  for (const week of weeks) {
    if (cursor.y > TOP_SAFE + 30) newContentPage();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(...GOLD_DEEP);
    doc.text(`Semana ${week.weekNumber} · ${fmtDate(week.startDate)} a ${fmtDate(week.endDate)}`, MARGIN_X, cursor.y);
    cursor.y += 16;
    for (const day of week.days) drawDayTable(doc, day, cursor, newContentPage);
  }

  if (finalDays.length) {
    newContentPage();
    doc.setFillColor(...GOLD);
    doc.roundedRect(MARGIN_X, cursor.y, CONTENT_W, 24, 4, 4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.setTextColor(...NAVY);
    doc.text("Últimos dias antes da prova", MARGIN_X + 12, cursor.y + 16);
    cursor.y += 34;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    for (const day of finalDays) {
      const title = `${WEEKDAY_NAMES[day.weekday]} · ${fmtDate(day.date)}`;
      const lines = doc.splitTextToSize(day.activities[0]?.detail ?? "", CONTENT_W - 10);
      if (cursor.y + lines.length * 12 + 20 > FOOTER_Y - 18) newContentPage();
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...GOLD_DEEP);
      doc.text(title, MARGIN_X, cursor.y);
      cursor.y += 13;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...INK);
      doc.text(lines, MARGIN_X, cursor.y);
      cursor.y += lines.length * 12 + 10;
    }
  }

  const pageCount = doc.getNumberOfPages();
  for (let i = 2; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter(doc, logo, i - 1, pageCount - 1);
  }

  doc.save("cronograma-horario-pc-ac-investigador.pdf");
}
