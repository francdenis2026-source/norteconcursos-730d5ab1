// Importa o build ES diretamente (em vez de "jspdf") porque o pacote não publica condição de
// export para o ambiente "workerd" do build de servidor (Cloudflare Workers); esse caminho usa
// o export wildcard "./dist/*", sem condições, e funciona igual no navegador — único lugar onde
// este módulo é usado (atrás de clique, nunca durante SSR).
// @ts-expect-error -- jspdf não publica tipos para este subpath; o export tem a mesma forma de "jspdf".
import { jsPDF } from "jspdf/dist/jspdf.es.min.js";
import type { PcAcVerticalCargo } from "@/data/pcAcreVerticalizado";
import { pcAcVerticalItemId, type PcAcVerticalStatus } from "@/lib/pcAcreVerticalizado";

const STATUS_LABEL: Record<PcAcVerticalStatus, string> = {
  estudado: "Estudado",
  "a-estudar": "A estudar",
};

const LOGO_URL = "/media/brand/norte-identity/emblema.png";

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

/** Marca d'água central (texto) e, quando disponível, o emblema do site em baixa opacidade. */
function drawWatermark(doc: jsPDF, logo: string | null) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.saveGraphicsState();
  doc.setTextColor(200, 200, 205);
  doc.setFontSize(46);
  doc.setFont("helvetica", "bold");
  const text = "NORTE CONCURSOS";
  doc.text(text, pageWidth / 2, pageHeight / 2, {
    angle: 35,
    align: "center",
  });
  if (logo) {
    const size = 170;
    doc.setGState(new doc.GState({ opacity: 0.06 }));
    doc.addImage(logo, "PNG", (pageWidth - size) / 2, pageHeight / 2 - size - 30, size, size);
    doc.setGState(new doc.GState({ opacity: 1 }));
  }
  doc.restoreGraphicsState();
}

/** Emblema pequeno no rodapé de cada página, ao lado da atribuição. */
function drawFooterLogo(doc: jsPDF, logo: string | null, marginX: number) {
  if (!logo) return;
  const size = 14;
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.addImage(logo, "PNG", marginX - 2, pageHeight - 28 - size + 3, size, size);
}

/** Gera o edital verticalizado do cargo em PDF, com o progresso de estudo do aluno e o emblema
 * do site (caveira com pistola) na capa, no rodapé e na marca d'água de cada página. Executa
 * inteiramente no navegador do aluno. */
export async function generatePcAcVerticalPdf(
  cargo: PcAcVerticalCargo,
  progress: Record<string, PcAcVerticalStatus>,
) {
  const logo = await loadLogoDataUrl();
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const marginX = 48;
  let y = 56;

  const newPage = () => {
    doc.addPage();
    drawWatermark(doc, logo);
    y = 56;
  };

  const ensureSpace = (needed: number) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (y + needed > pageHeight - 56) newPage();
  };

  drawWatermark(doc, logo);

  if (logo) {
    doc.addImage(logo, "PNG", marginX, y - 30, 34, 34);
  }
  const headerTextX = logo ? marginX + 44 : marginX;
  doc.setTextColor(20, 20, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Edital verticalizado — PC-AC 001/2026", headerTextX, y);
  y += 22;
  doc.setFontSize(13);
  doc.text(cargo.label, headerTextX, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 100);
  doc.text(
    `${cargo.vagas} vagas · ${cargo.salario} · Edital nº 001 SEAD/PCAC, banca IDECAN · norteconcursos.xyz`,
    marginX,
    y,
  );
  y += 26;

  for (const block of cargo.blocks) {
    ensureSpace(32);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(20, 20, 30);
    doc.text(block.title, marginX, y);
    y += 16;

    for (const discipline of block.disciplines) {
      ensureSpace(26);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(30, 30, 40);
      const nameLines = doc.splitTextToSize(`• ${discipline.name}`, 480);
      doc.text(nameLines, marginX + 8, y);
      y += nameLines.length * 13 + 2;

      const topics = discipline.topics?.length ? discipline.topics : [discipline.name];
      const trackedPerTopic = !!discipline.topics?.length;
      for (let i = 0; i < topics.length; i++) {
        ensureSpace(20);
        const status =
          progress[
            pcAcVerticalItemId(block.title, discipline.id, trackedPerTopic ? i : undefined)
          ];
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(60, 60, 70);
        const lines = doc.splitTextToSize(`– ${topics[i]}`, 420);
        doc.text(lines, marginX + 16, y);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(
          status === "estudado" ? 22 : status === "a-estudar" ? 180 : 140,
          status === "estudado" ? 140 : status === "a-estudar" ? 120 : 140,
          90,
        );
        doc.text(status ? STATUS_LABEL[status] : "Pendente", marginX + 440, y);
        y += lines.length * 11 + 4;
      }
      y += 4;
    }
    y += 8;
  }

  newPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 30);
  doc.text("Legislação institucional", marginX, y);
  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 100);
  const legislacaoNote = doc.splitTextToSize(
    "Lei nº 14.735/2023 (Lei Orgânica Nacional das Polícias Civis), LC nº 129/2004 (Lei Orgânica da Polícia Civil do Acre), Lei nº 2.250/2009 e LC nº 39/1993 (Estatuto dos Servidores Públicos Civis do Acre). Resumo completo de cada lei disponível na área do aluno em norteconcursos.xyz.",
    460,
  );
  doc.text(legislacaoNote, marginX, y);

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 150);
    doc.text(
      `Norte Concursos · norteconcursos.xyz · página ${i} de ${pageCount}`,
      logo ? marginX + 20 : marginX,
      doc.internal.pageSize.getHeight() - 28,
    );
    drawFooterLogo(doc, logo, marginX);
  }

  doc.save(`edital-verticalizado-pc-ac-${cargo.id}.pdf`);
}
