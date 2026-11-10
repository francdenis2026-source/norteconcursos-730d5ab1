export async function exportMaterialPdf({ title, body, note, marks }: { title: string; body: string; note: string; marks: { text: string; color: string }[] }) {
  // The package root has no Worker export; load the ES build on download.
  // @ts-expect-error -- jsPDF has no declarations for this supported dist subpath.
  const { jsPDF } = await import("jspdf/dist/jspdf.es.min.js") as typeof import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const width = doc.internal.pageSize.getWidth(); const height = doc.internal.pageSize.getHeight();
  const margin = 48; let y = 54;
  const footer = () => { doc.setTextColor(145); doc.setFontSize(8); doc.text("NORTE CONCURSOS · Desenvolvido por Franc Denis · norteconcursos.xyz", width / 2, height - 24, { align: "center" }); doc.setTextColor(35); };
  const write = (text: string, size = 10, gap = 15) => { doc.setFontSize(size); const lines = doc.splitTextToSize(text, width - margin * 2); for (const line of lines) { if (y > height - 55) { footer(); doc.addPage(); y = 54; } doc.text(line, margin, y); y += gap; } y += 5; };
  doc.setFontSize(18); doc.setFont("helvetica", "bold"); write(title, 18, 23); doc.setFont("helvetica", "normal"); write(body.replace(/[#*_`]/g, ""), 10, 15);
  if (marks.length) { doc.setFont("helvetica", "bold"); write("Marcações do aluno", 12, 18); doc.setFont("helvetica", "normal"); marks.forEach((mark) => write(`• ${mark.text}`, 10, 15)); }
  if (note.trim()) { doc.setFont("helvetica", "bold"); write("Anotações pessoais", 12, 18); doc.setFont("helvetica", "normal"); write(note, 10, 15); }
  footer(); doc.save(`${title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.pdf`);
}
