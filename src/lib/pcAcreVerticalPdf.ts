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

function drawWatermark(doc: jsPDF) {
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
  doc.restoreGraphicsState();
}

/** Gera o edital verticalizado do cargo em PDF, com o progresso de estudo do aluno e marca
 * d'água "Norte Concursos" em cada página. Executa inteiramente no navegador do aluno. */
export function generatePcAcVerticalPdf(
  cargo: PcAcVerticalCargo,
  progress: Record<string, PcAcVerticalStatus>,
) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const marginX = 48;
  let y = 56;

  const newPage = () => {
    doc.addPage();
    drawWatermark(doc);
    y = 56;
  };

  const ensureSpace = (needed: number) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (y + needed > pageHeight - 56) newPage();
  };

  drawWatermark(doc);

  doc.setTextColor(20, 20, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Edital verticalizado — PC-AC 001/2026", marginX, y);
  y += 22;
  doc.setFontSize(13);
  doc.text(cargo.label, marginX, y);
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
      const status = progress[pcAcVerticalItemId(block.title, discipline.id)];
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(30, 30, 40);
      const lines = doc.splitTextToSize(`• ${discipline.name}`, 400);
      doc.text(lines, marginX + 8, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(
        status === "estudado" ? 22 : status === "a-estudar" ? 180 : 140,
        status === "estudado" ? 140 : status === "a-estudar" ? 120 : 140,
        90,
      );
      doc.text(status ? STATUS_LABEL[status] : "Pendente", marginX + 420, y);
      y += lines.length * 13 + 6;
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
      marginX,
      doc.internal.pageSize.getHeight() - 28,
    );
  }

  doc.save(`edital-verticalizado-pc-ac-${cargo.id}.pdf`);
}
