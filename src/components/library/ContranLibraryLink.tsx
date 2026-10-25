import { Link } from "@tanstack/react-router";
import { ArrowRight, TrafficCone } from "lucide-react";
import { CONTRAN_GUIDES } from "@/data/contranGuides";
import { currentContranGuides } from "@/lib/contranStudy";
import type { LibraryArea } from "@/lib/libraryOrganization";

export function ContranLibraryLink({ area, discipline, contest, topic, query }: {
  area: LibraryArea; discipline: string; contest: string; topic: string; query: string;
}) {
  if ((area !== "all" && area !== "legislation") ||
      (discipline !== "all" && discipline !== "Trânsito — CTB") || contest !== "all" || topic !== "all") return null;
  const matches = currentContranGuides(CONTRAN_GUIDES, query);
  if (!matches.length) return null;
  return <section className="library-subject library-tone-emerald" aria-label="Trânsito — resoluções do CONTRAN">
    <header className="library-subject__heading">
      <span className="library-subject__icon"><TrafficCone size={20} aria-hidden="true" /></span>
      <div><p className="library-eyebrow">LEGISLAÇÃO DE TRÂNSITO</p><h2>Resoluções do CONTRAN</h2></div>
      <span className="library-subject__badge">{matches.length} guias para consulta</span>
    </header>
    <div className="p-4 sm:p-5">
      <p className="text-sm leading-6 text-muted-foreground">Pontos-chave, casos resolvidos, mudanças dos fatos e acesso ao texto oficial. Normas revogadas e prazos antigos ficam fora do estudo atual.</p>
      <Link to="/dashboard/ctb" search={{ tab: "resolucoes", q: query || undefined }} className="library-study-button mt-3">Estudar resoluções e exemplos <ArrowRight size={16} aria-hidden="true" /></Link>
    </div>
  </section>;
}
