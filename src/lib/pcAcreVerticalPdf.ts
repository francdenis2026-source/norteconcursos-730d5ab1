// Importa o build ES diretamente (em vez de "jspdf") porque o pacote não publica condição de
// export para o ambiente "workerd" do build de servidor (Cloudflare Workers); esse caminho usa
// o export wildcard "./dist/*", sem condições, e funciona igual no navegador — único lugar onde
// este módulo é usado (atrás de clique, nunca durante SSR).
// @ts-expect-error -- jspdf não publica tipos para este subpath; o export tem a mesma forma de "jspdf".
import { jsPDF } from "jspdf/dist/jspdf.es.min.js";
import type { PcAcVerticalCargo } from "@/data/pcAcreVerticalizado";
import {
  pcAcVerticalCounts,
  pcAcVerticalDisciplineCounts,
  pcAcVerticalItemId,
  type PcAcVerticalStatus,
} from "@/lib/pcAcreVerticalizado";

const STATUS_LABEL: Record<PcAcVerticalStatus, string> = {
  estudado: "Estudado",
  "a-estudar": "A estudar",
};

const LOGO_URL = "/media/brand/norte-identity/emblema.png";
const DEV_SIGNATURE = "Desenvolvido por Franc Denis · Feijó, Acre, Brasil";

/** Paleta da marca (mesmas cores do emblema — dourado e azul-marinho quase preto), em RGB 0-255. */
const NAVY: [number, number, number] = [18, 30, 39];
const NAVY_SOFT: [number, number, number] = [37, 54, 68];
const GOLD: [number, number, number] = [185, 158, 102];
const GOLD_DEEP: [number, number, number] = [138, 112, 61];
const INK: [number, number, number] = [24, 26, 32];
const MUTED: [number, number, number] = [104, 108, 118];
const LINE: [number, number, number] = [222, 222, 228];
const CARD_BG: [number, number, number] = [250, 249, 246];
const STATUS_COLOR: Record<PcAcVerticalStatus | "pendente", [number, number, number]> = {
  estudado: [17, 134, 94],
  "a-estudar": [180, 120, 10],
  pendente: [150, 150, 158],
};

const PAGE_W = 595.28; // A4 em pt
const PAGE_H = 841.89;
const MARGIN_X = 48;
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const FOOTER_Y = PAGE_H - 44;
const TOP_SAFE = 56;

/** Busca o emblema do site (caveira com pistola) e devolve como data URL, para embutir no PDF.
 * `null` se a busca falhar (ex. offline) — o PDF ainda assim é gerado, só sem a imagem. */
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

/** Marca d'água do site: o emblema centralizado em opacidade baixa, mas nitidamente visível —
 * não o texto diagonal genérico de antes, que ficava quase invisível. */
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

/** Cabeçalho compacto repetido em toda página de conteúdo: logo, título do documento e cargo. */
function drawRunningHeader(doc: jsPDF, logo: string | null, cargoLabel: string) {
  if (logo) doc.addImage(logo, "PNG", MARGIN_X, 24, 22, 22);
  const textX = logo ? MARGIN_X + 30 : MARGIN_X;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(...NAVY);
  doc.text("Edital verticalizado · PC-AC 001/2026", textX, 33);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text(cargoLabel, textX, 43);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1.2);
  doc.line(MARGIN_X, 52, PAGE_W - MARGIN_X, 52);
}

/** Rodapé com selo da marca, nome da plataforma, assinatura do desenvolvedor e paginação,
 * separado por um filete dourado — repetido em toda página de conteúdo. */
function drawFooter(doc: jsPDF, logo: string | null, page: number, pageCount: number) {
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.6);
  doc.line(MARGIN_X, FOOTER_Y - 10, PAGE_W - MARGIN_X, FOOTER_Y - 10);
  if (logo) doc.addImage(logo, "PNG", MARGIN_X, FOOTER_Y - 7, 13, 13);
  const textX = logo ? MARGIN_X + 18 : MARGIN_X;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...NAVY);
  doc.text("Norte Concursos · norteconcursos.xyz", textX, FOOTER_Y + 2);
  doc.text(`página ${page} de ${pageCount}`, PAGE_W - MARGIN_X, FOOTER_Y + 2, { align: "right" });
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text(DEV_SIGNATURE, textX, FOOTER_Y + 12);
}

/** Faixa colorida de título de bloco (ex.: "Conhecimentos básicos"), cheia a largura da página. */
function drawBlockBand(doc: jsPDF, title: string, y: number) {
  doc.setFillColor(...NAVY);
  doc.roundedRect(MARGIN_X, y, CONTENT_W, 24, 4, 4, "F");
  doc.setFillColor(...GOLD);
  doc.rect(MARGIN_X, y, 4, 24, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(255, 255, 255);
  doc.text(title, MARGIN_X + 14, y + 16);
}

/** Selo compacto com o status do item, em formato de pílula colorida. */
function drawStatusPill(
  doc: jsPDF,
  status: PcAcVerticalStatus | undefined,
  rightX: number,
  y: number,
) {
  const key = status ?? "pendente";
  const label = status ? STATUS_LABEL[status] : "Pendente";
  const color = STATUS_COLOR[key];
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  const textW = doc.getTextWidth(label);
  const pillW = textW + 12;
  const pillH = 11;
  const x = rightX - pillW;
  doc.setFillColor(color[0], color[1], color[2]);
  doc.setGState(new doc.GState({ opacity: status ? 1 : 0.55 }));
  doc.roundedRect(x, y - pillH + 2.5, pillW, pillH, 5, 5, "F");
  doc.setGState(new doc.GState({ opacity: 1 }));
  doc.setTextColor(255, 255, 255);
  doc.text(label, x + pillW / 2, y - 2.3, { align: "center" });
}

type Cursor = { y: number; page: number };

/** Gera o edital verticalizado do cargo em PDF: capa com sumário dos blocos, conteúdo organizado
 * em cartões por disciplina com marca d'água e selo do site em toda página, e progresso de estudo
 * do aluno. Executa inteiramente no navegador do aluno. */
export async function generatePcAcVerticalPdf(
  cargo: PcAcVerticalCargo,
  progress: Record<string, PcAcVerticalStatus>,
) {
  const logo = await loadLogoDataUrl();
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const counts = pcAcVerticalCounts(cargo, progress);
  const percent = counts.total ? Math.round((counts.estudado / counts.total) * 100) : 0;

  drawCoverPage(doc, cargo, logo, percent, counts);

  const cursor: Cursor = { y: TOP_SAFE, page: 2 };
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

  for (const block of cargo.blocks) {
    if (cursor.y > TOP_SAFE) newContentPage(); // cada bloco começa em página própria
    drawBlockBand(doc, block.title, cursor.y);
    cursor.y += 34;

    for (const discipline of block.disciplines) {
      const topics = discipline.topics?.length ? discipline.topics : [discipline.name];
      const trackedPerTopic = !!discipline.topics?.length;
      const dCounts = pcAcVerticalDisciplineCounts(block.title, discipline, progress);

      ensureSpace(30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(...NAVY);
      const nameLines = doc.splitTextToSize(discipline.name, CONTENT_W - 110);
      doc.text(nameLines, MARGIN_X + 4, cursor.y + 10);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...MUTED);
      doc.text(
        `${dCounts.estudado}/${dCounts.total} estudado`,
        MARGIN_X + CONTENT_W - 4,
        cursor.y + 10,
        {
          align: "right",
        },
      );
      doc.setFillColor(...GOLD);
      doc.circle(MARGIN_X - 1, cursor.y + 6.5, 2, "F");
      cursor.y += nameLines.length * 13 + 12;
      if (discipline.note) {
        ensureSpace(14);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.setTextColor(...MUTED);
        const noteLines = doc.splitTextToSize(discipline.note, CONTENT_W - 8);
        doc.text(noteLines, MARGIN_X + 4, cursor.y);
        cursor.y += noteLines.length * 10 + 8;
      }

      for (let i = 0; i < topics.length; i++) {
        const status =
          progress[pcAcVerticalItemId(block.title, discipline.id, trackedPerTopic ? i : undefined)];
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const lines = doc.splitTextToSize(topics[i]!, CONTENT_W - 100);
        const rowH = Math.max(lines.length * 11.5, 11.5) + 7;
        ensureSpace(rowH);
        doc.setFillColor(...CARD_BG);
        doc.setDrawColor(...LINE);
        doc.setLineWidth(0.6);
        doc.roundedRect(MARGIN_X, cursor.y - 9, CONTENT_W, rowH - 2, 3, 3, "FD");
        doc.setTextColor(...INK);
        doc.text(lines, MARGIN_X + 10, cursor.y);
        drawStatusPill(doc, status, MARGIN_X + CONTENT_W - 8, cursor.y + 1.5);
        cursor.y += rowH + 3;
      }
      cursor.y += 6;
    }
  }

  newContentPage();
  drawBlockBand(doc, "Legislação institucional", cursor.y);
  cursor.y += 34;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  const legislacaoNote = doc.splitTextToSize(
    "Lei nº 14.735/2023 (Lei Orgânica Nacional das Polícias Civis), LC nº 129/2004 (Lei Orgânica da Polícia Civil do Acre), Lei nº 2.250/2009 e LC nº 39/1993 (Estatuto dos Servidores Públicos Civis do Acre). Resumo completo de cada lei disponível na área do aluno em norteconcursos.xyz.",
    CONTENT_W - 8,
  );
  doc.text(legislacaoNote, MARGIN_X, cursor.y);

  const contentPageCount = doc.getNumberOfPages() - 1; // exclui a capa
  for (let i = 2; i <= doc.getNumberOfPages(); i++) {
    doc.setPage(i);
    drawFooter(doc, logo, i - 1, contentPageCount);
  }

  drawBackCover(doc, logo);

  doc.save(`edital-verticalizado-pc-ac-${cargo.id}.pdf`);
}

function drawCoverPage(
  doc: jsPDF,
  cargo: PcAcVerticalCargo,
  logo: string | null,
  percent: number,
  counts: { total: number; estudado: number },
) {
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, 230, "F");
  doc.setFillColor(...NAVY_SOFT);
  doc.rect(0, 220, PAGE_W, 10, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 228, PAGE_W, 2.5, "F");

  if (logo) {
    const size = 72;
    doc.addImage(logo, "PNG", (PAGE_W - size) / 2, 34, size, size);
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...GOLD);
  doc.text("NORTE CONCURSOS", PAGE_W / 2, logo ? 128 : 60, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(27);
  doc.setTextColor(255, 255, 255);
  doc.text("Edital verticalizado", PAGE_W / 2, logo ? 158 : 95, { align: "center" });
  doc.setFontSize(14);
  doc.setTextColor(...GOLD);
  doc.text("PC-AC 001/2026 · banca IDECAN", PAGE_W / 2, logo ? 180 : 118, { align: "center" });

  let y = 268;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(...NAVY);
  const labelLines = doc.splitTextToSize(cargo.label, CONTENT_W);
  doc.text(labelLines, PAGE_W / 2, y, { align: "center" });
  y += labelLines.length * 22 + 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...MUTED);
  doc.text(`${cargo.vagas} vagas · ${cargo.salario} · Edital nº 001 SEAD/PCAC`, PAGE_W / 2, y, {
    align: "center",
  });
  y += 30;

  const stats: [string, string][] = [
    ["Itens no edital", String(counts.total)],
    ["Já estudado", `${counts.estudado}`],
    ["Progresso", `${percent}%`],
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
  doc.text("Sumário", MARGIN_X, y);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(MARGIN_X, y + 5, MARGIN_X + 46, y + 5);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  for (const block of cargo.blocks) {
    const disciplineCount = block.disciplines.length;
    doc.setFillColor(...GOLD);
    doc.circle(MARGIN_X + 2, y - 3, 2, "F");
    doc.setTextColor(...INK);
    doc.text(block.title, MARGIN_X + 12, y);
    doc.setTextColor(...MUTED);
    doc.text(
      `${disciplineCount} disciplina${disciplineCount === 1 ? "" : "s"}`,
      MARGIN_X + CONTENT_W,
      y,
      { align: "right" },
    );
    y += 17;
  }
  y += 8;
  doc.setTextColor(...INK);
  doc.text("Legislação institucional", MARGIN_X + 12, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text(
    "Marque o que já estudou na área do aluno — o progresso deste PDF reflete o que estava salvo no seu navegador no momento da exportação.",
    MARGIN_X,
    PAGE_H - 62,
    { maxWidth: CONTENT_W },
  );
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text("Norte Concursos · norteconcursos.xyz", PAGE_W / 2, PAGE_H - 34, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);
  doc.text(DEV_SIGNATURE, PAGE_W / 2, PAGE_H - 23, { align: "center" });
}

/** Contracapa: fecha o documento reforçando a marca, o site e a assinatura do desenvolvedor. */
function drawBackCover(doc: jsPDF, logo: string | null) {
  doc.addPage();
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  if (logo) {
    const size = 90;
    doc.setGState(new doc.GState({ opacity: 0.9 }));
    doc.addImage(logo, "PNG", (PAGE_W - size) / 2, PAGE_H / 2 - 150, size, size);
    doc.setGState(new doc.GState({ opacity: 1 }));
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(255, 255, 255);
  doc.text("NORTE CONCURSOS", PAGE_W / 2, PAGE_H / 2 - 30, { align: "center" });
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1);
  doc.line(PAGE_W / 2 - 40, PAGE_H / 2 - 18, PAGE_W / 2 + 40, PAGE_H / 2 - 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...GOLD);
  doc.text("norteconcursos.xyz", PAGE_W / 2, PAGE_H / 2 + 4, { align: "center" });
  doc.setFontSize(9.5);
  doc.setTextColor(210, 210, 216);
  doc.text(DEV_SIGNATURE, PAGE_W / 2, PAGE_H / 2 + 24, { align: "center" });
}
