// PDF export for the central study-plan engine. Keeps identity and watermark consistent with platform exports.
// @ts-expect-error -- jspdf subpath has the runtime export but incomplete package conditions.
import { jsPDF } from "jspdf/dist/jspdf.es.min.js";
import type { StudyPlanConfig, StudyPlanWeek } from "@/lib/studyPlanEngine";

const LOGO = "/media/brand/norte-identity/emblema.png";
const QR = "/media/brand/platform-qr.svg";
const W = 595.28;
const H = 841.89;
const M = 42;
const ink: [number, number, number] = [24, 31, 42];
const muted: [number, number, number] = [100, 112, 126];
const gold: [number, number, number] = [196, 153, 68];
const line: [number, number, number] = [220, 225, 231];
const fmt = (iso: string) => iso.split("-").reverse().join("/");
const loadData = async (url: string) => { const r = await fetch(url); if (!r.ok) return null; const b = await r.blob(); return await new Promise<string | null>((resolve) => { const f = new FileReader(); f.onload = () => resolve(String(f.result)); f.onerror = () => resolve(null); f.readAsDataURL(b); }); };

function watermark(doc: jsPDF, logo: string | null) {
  doc.saveGraphicsState();
  doc.setGState(new doc.GState({ opacity: 0.055 }));
  if (logo) doc.addImage(logo, "PNG", W / 2 - 115, H / 2 - 115, 230, 230);
  doc.setFont("helvetica", "bold"); doc.setFontSize(34); doc.setTextColor(...ink);
  doc.text("NORTE CONCURSOS", W / 2, H / 2 + 145, { align: "center", angle: 28 });
  doc.restoreGraphicsState();
}
function footer(doc: jsPDF, page: number, pages: number, qr: string | null) {
  doc.setDrawColor(...line); doc.line(M, H - 35, W - M, H - 35);
  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(...muted);
  doc.text("Norte Concursos · norteconcursos.xyz · Desenvolvido por Franc Denis", M, H - 20);
  doc.text(`página ${page}/${pages}`, W - M, H - 20, { align: "right" });
  if (qr) doc.addImage(qr, "SVG", W - M - 28, H - 31, 24, 24);
}

export async function generateStudyPlanPdf(config: StudyPlanConfig, weeks: StudyPlanWeek[], title = "Plano geral de estudos") {
  const [logo, qr] = await Promise.all([loadData(LOGO), loadData(QR)]);
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  let page = 1;
  const drawHeader = () => { doc.setFillColor(...ink); doc.rect(0, 0, W, 92, "F"); if (logo) doc.addImage(logo, "PNG", M, 20, 48, 48); doc.setFont("helvetica", "bold"); doc.setFontSize(19); doc.setTextColor(255,255,255); doc.text(title, M + 62, 43); doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(225,230,235); doc.text(`Início ${fmt(config.startDate)} · prova ${fmt(config.examDate)} · ${config.weeklyHours}h/semana`, M + 62, 61); };
  drawHeader(); watermark(doc, logo);
  let y = 130;
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.setTextColor(...ink); doc.text("Plano gerado", M, y); y += 22;
  doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...muted); doc.text("Use esta agenda como proposta editável. O progresso por assunto deve orientar os próximos ajustes.", M, y); y += 28;
  for (const week of weeks) {
    if (y > H - 90) { footer(doc, page, weeks.length + 1, qr); doc.addPage(); page += 1; drawHeader(); watermark(doc, logo); y = 125; }
    doc.setFillColor(238, 241, 245); doc.roundedRect(M, y, W - 2*M, 24, 4, 4, "F"); doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(...ink); doc.text(`Semana ${week.week} · ${fmt(week.startDate)} a ${fmt(week.endDate)}`, M + 10, y + 16); y += 32;
    for (const event of week.events) {
      if (y > H - 80) { footer(doc, page, weeks.length + 1, qr); doc.addPage(); page += 1; drawHeader(); watermark(doc, logo); y = 125; }
      doc.setDrawColor(...line); doc.setFillColor(252,252,250); doc.roundedRect(M, y, W - 2*M, 27, 4, 4, "FD");
      doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); doc.setTextColor(...gold); doc.text(`${fmt(event.date)} · ${event.start}–${event.end}`, M + 8, y + 17);
      doc.setFont("helvetica", "normal"); doc.setTextColor(...ink); doc.text(`${event.kind}${event.discipline ? ` · ${event.discipline}` : ""}${event.topic ? ` · ${event.topic}` : ""}`, M + 145, y + 17, { maxWidth: W - M - 155 }); y += 31;
    }
    y += 9;
  }
  footer(doc, page, page, qr);
  doc.save("plano-geral-de-estudos-norte-concursos.pdf");
}
