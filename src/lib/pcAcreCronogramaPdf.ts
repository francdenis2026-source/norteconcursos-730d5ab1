// Mesmo caminho de import que src/lib/pcAcreVerticalPdf.ts, pela mesma razão: o pacote "jspdf" não
// publica condição de export para o ambiente "workerd" (build de servidor/Cloudflare Workers).
// @ts-expect-error -- jspdf não publica tipos para este subpath; o export tem a mesma forma de "jspdf".
import { jsPDF } from "jspdf/dist/jspdf.es.min.js";
import type { PcAcVerticalCargo } from "@/data/pcAcreVerticalizado";
import {
  pcAcDaysUntilExam,
  PCAC_BOARD,
  PCAC_EXAM_DATE,
  type PcAcStudyBlock,
  type PcAcStudyPlanConfig,
} from "@/lib/pcAcreStudyPlan";

const LOGO_URL = "/media/brand/norte-identity/emblema.png";

const NAVY: [number, number, number] = [18, 30, 39];
const NAVY_SOFT: [number, number, number] = [37, 54, 68];
const GOLD: [number, number, number] = [185, 158, 102];
const GOLD_DEEP: [number, number, number] = [138, 112, 61];
const INK: [number, number, number] = [24, 26, 32];
const MUTED: [number, number, number] = [104, 108, 118];
const LINE: [number, number, number] = [222, 222, 228];
const CARD_BG: [number, number, number] = [250, 249, 246];

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 48;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const FOOTER_Y = PAGE_H - 34;
const TOP_SAFE = 56;

const DAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

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

function drawDayBand(doc: jsPDF, title: string, y: number) {
  doc.setFillColor(...NAVY);
  doc.roundedRect(MARGIN_X, y, CONTENT_W, 24, 4, 4, "F");
  doc.setFillColor(...GOLD);
  doc.rect(MARGIN_X, y, 4, 24, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(255, 255, 255);
  doc.text(title, MARGIN_X + 14, y + 16);
}

function drawCoverPage(
  doc: jsPDF,
  cargo: PcAcVerticalCargo,
  logo: string | null,
  cfg: PcAcStudyPlanConfig,
  week: Record<number, PcAcStudyBlock[]>,
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
  doc.setFontSize(27);
  doc.setTextColor(255, 255, 255);
  doc.text("Cronograma de estudos", PAGE_W / 2, logo ? 158 : 95, { align: "center" });
  doc.setFontSize(14);
  doc.setTextColor(...GOLD);
  doc.text(`PC-AC 001/2026 · banca ${PCAC_BOARD}`, PAGE_W / 2, logo ? 180 : 118, { align: "center" });

  let y = 268;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(...NAVY);
  const labelLines = doc.splitTextToSize(cargo.label, CONTENT_W);
  doc.text(labelLines, PAGE_W / 2, y, { align: "center" });
  y += labelLines.length * 22 + 6;

  const daysLeft = pcAcDaysUntilExam(PCAC_EXAM_DATE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...MUTED);
  doc.text(
    `Prova objetiva em ${PCAC_EXAM_DATE.split("-").reverse().join("/")} · ${cfg.weeklyHours}h de estudo por semana`,
    PAGE_W / 2,
    y,
    { align: "center" },
  );
  y += 30;

  const stats: [string, string][] = [
    ["Dias até a prova", String(daysLeft)],
    ["Dias de estudo/semana", String(cfg.days.length)],
    ["Horas/semana", `${cfg.weeklyHours}h`],
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
  y += 80;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11.5);
  doc.setTextColor(...NAVY);
  doc.text("Semana de estudo", MARGIN_X, y);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(MARGIN_X, y + 5, MARGIN_X + 46, y + 5);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  for (const day of cfg.days) {
    const blocks = week[day] ?? [];
    const minutes = blocks.reduce((s, b) => s + b.minutes, 0);
    doc.setFillColor(...GOLD);
    doc.circle(MARGIN_X + 2, y - 3, 2, "F");
    doc.setTextColor(...INK);
    doc.text(DAY_NAMES[day]!, MARGIN_X + 12, y);
    doc.setTextColor(...MUTED);
    doc.text(
      `${blocks.length} bloco${blocks.length === 1 ? "" : "s"} · ${Math.round(minutes / 60)}h${minutes % 60 ? String(minutes % 60).padStart(2, "0") : ""}`,
      MARGIN_X + CONTENT_W,
      y,
      { align: "right" },
    );
    y += 17;
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text(
    "Cronograma calculado a partir do conteúdo programático oficial do Anexo III (conhecimentos específicos pesam mais que os básicos) e da sua disponibilidade semanal.",
    MARGIN_X,
    PAGE_H - 70,
    { maxWidth: CONTENT_W },
  );
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text("Dev. Franc D'nis · Feijó-AC, Brasil", PAGE_W / 2, PAGE_H - 44, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text("norteconcursos.xyz", PAGE_W / 2, PAGE_H - 30, { align: "center" });
}

/** Gera o cronograma de estudo do cargo em PDF: capa com resumo da semana e contagem de dias até
 * a prova, e uma página por dia de estudo com os blocos de horário e disciplina. Executa
 * inteiramente no navegador do aluno — não compartilha código com o gerador do edital
 * verticalizado (pcAcreVerticalPdf.ts) para não haver risco de conflito entre os dois. */
export async function generatePcAcCronogramaPdf(
  cargo: PcAcVerticalCargo,
  cfg: PcAcStudyPlanConfig,
  week: Record<number, PcAcStudyBlock[]>,
) {
  const logo = await loadLogoDataUrl();
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  drawCoverPage(doc, cargo, logo, cfg, week);

  const cursor = { y: TOP_SAFE, page: 2 };
  doc.addPage();
  drawWatermark(doc, logo);
  drawRunningHeader(doc, logo, cargo.label);

  const newContentPage = () => {
    doc.addPage();
    cursor.page += 1;
    drawWatermark(doc, logo);
    drawRunningHeader(doc, logo, cargo.label);
    cursor.y = TOP_SAFE;
  };
  const ensureSpace = (needed: number) => {
    if (cursor.y + needed > FOOTER_Y - 18) newContentPage();
  };

  for (const day of cfg.days) {
    const blocks = week[day] ?? [];
    if (!blocks.length) continue;
    if (cursor.y > TOP_SAFE) newContentPage();
    drawDayBand(doc, DAY_NAMES[day]!, cursor.y);
    cursor.y += 34;

    for (const block of blocks) {
      const lines = doc.splitTextToSize(block.discipline, CONTENT_W - 100);
      const rowH = Math.max(lines.length * 12.5, 12.5) + 10;
      ensureSpace(rowH);
      doc.setFillColor(...CARD_BG);
      doc.setDrawColor(...LINE);
      doc.setLineWidth(0.6);
      doc.roundedRect(MARGIN_X, cursor.y - 9, CONTENT_W, rowH - 2, 3, 3, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(...INK);
      doc.text(lines, MARGIN_X + 10, cursor.y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...GOLD_DEEP);
      doc.text(`${block.start}–${block.end}`, MARGIN_X + CONTENT_W - 8, cursor.y, { align: "right" });
      cursor.y += rowH + 5;
    }
    cursor.y += 6;
  }

  const pageCount = doc.getNumberOfPages();
  for (let i = 2; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter(doc, logo, i - 1, pageCount - 1);
  }

  doc.save(`cronograma-estudos-pc-ac-${cargo.id}.pdf`);
}
