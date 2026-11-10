import * as React from "react";
import { Highlighter, Download, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportMaterialPdf } from "@/lib/materialPdf";

type Mark = { text: string; color: string };
const COLORS = ["#fef08a", "#bbf7d0", "#bae6fd", "#fecdd3"];

export function ReadingAnnotations({ userId, slug, title, body }: { userId: string; slug: string; title: string; body: string }) {
  const key = `norte-reading:${userId}:${slug}`;
  const [marks, setMarks] = React.useState<Mark[]>([]);
  const [note, setNote] = React.useState("");
  const [color, setColor] = React.useState(COLORS[0]);
  const selection = React.useCallback(() => window.getSelection()?.toString().trim() ?? "", []);
  React.useEffect(() => { try { const saved = JSON.parse(localStorage.getItem(key) ?? "{}"); setMarks(Array.isArray(saved.marks) ? saved.marks : []); setNote(typeof saved.note === "string" ? saved.note : ""); } catch { /* storage unavailable */ } }, [key]);
  React.useEffect(() => { try { localStorage.setItem(key, JSON.stringify({ marks, note })); } catch { /* storage unavailable */ } }, [key, marks, note]);
  const addMark = () => { const text = selection(); if (!text || marks.some((mark) => mark.text === text)) return; setMarks((current) => [...current, { text, color }]); };
  return <div className="reading-annotations no-print" aria-label="Ferramentas de estudo">
    <div className="reading-annotations__tools">
      <Button type="button" variant="outline" size="sm" onClick={addMark}><Highlighter className="mr-2 h-4 w-4" />Marcar seleção</Button>
      {COLORS.map((value) => <button key={value} type="button" aria-label={`Usar cor ${value}`} className={`reading-color ${color === value ? "is-active" : ""}`} style={{ backgroundColor: value }} onClick={() => setColor(value)} />)}
      <Button type="button" variant="outline" size="sm" onClick={() => void exportMaterialPdf({ title, body, note, marks })}><Download className="mr-2 h-4 w-4" />Exportar PDF</Button>
    </div>
    <label className="reading-annotations__note"><StickyNote className="h-4 w-4" /><span>Anotações pessoais</span><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Registre dúvidas, relações e pontos para revisar…" /></label>
    {marks.length > 0 && <div className="reading-annotations__list"><strong>{marks.length} marcações salvas</strong>{marks.slice(-4).map((mark, index) => <span key={`${mark.text}-${index}`} style={{ backgroundColor: mark.color }}>{mark.text}</span>)}</div>}
  </div>;
}
