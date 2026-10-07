import { Link } from "@tanstack/react-router";
import { ExternalLink, ShieldCheck, History } from "lucide-react";
import { isStudySourceUrl } from "@/lib/studySourceUrl";

export type LegalReview = {
  checked_at: string;
  scope: string;
  course_slug?: string | null | undefined;
  corrections: string[];
  sources: { title: string; url: string; sha256?: string }[];
  changes: {
    title: string; url: string; articles: string[]; summary: string;
    vigency: string; state: "effective" | "future" | "reference" | "expired";
  }[];
};

export function LegalUpdateNotice({ review }: { review?: LegalReview | null | undefined }) {
  if (!review) return null;
  const date = new Date(review.checked_at).toLocaleDateString("pt-BR", { timeZone: "America/Rio_Branco" });
  return <aside className="surface-card space-y-4 p-5" aria-label="Atualização legislativa">
    <h2 className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-5 w-5" /> Legislação conferida em {date}</h2>
    <p className="text-sm text-muted-foreground">{review.scope}</p>
    {!!review.changes.length && <details open>
      <summary className="cursor-pointer font-medium"><History className="mr-2 inline h-4 w-4" /> Mudanças recentes e vigência ({review.changes.length})</summary>
      <ul className="mt-4 space-y-5">
        {review.changes.map((change, index) => <li key={`${change.url}-${index}`} className="border-l-2 border-primary pl-3 text-sm">
          <p className="font-semibold">{change.title} · {change.state === "expired" ? "Vigência encerrada" : change.state === "future" ? "Vigência futura" : change.state === "effective" ? "Em vigor na conferência" : "Referência a conferir no caso concreto"}</p>
          <p className="mt-1">{change.summary}</p>
          {!!change.articles.length && <p className="mt-1 text-muted-foreground">Dispositivos: {change.articles.join(", ")}</p>}
          <p className="mt-1">{change.vigency}</p>
          {isStudySourceUrl(change.url) && <a href={change.url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 underline">Conferir ato oficial <ExternalLink className="h-3 w-3" /></a>}
        </li>)}
      </ul>
    </details>}
    {!!review.corrections.length && <details>
      <summary className="cursor-pointer font-medium">O que foi corrigido neste material</summary>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">{review.corrections.map(text => <li key={text}>{text}</li>)}</ul>
    </details>}
    {review.course_slug && <Link to="/dashboard/legal-course/$slug" params={{ slug: review.course_slug }} className="inline-flex items-center gap-1 text-sm font-medium underline">Abrir leitura dos dispositivos da lei</Link>}
    <details>
      <summary className="cursor-pointer text-sm">Fontes oficiais desta conferência</summary>
      <ul className="mt-3 space-y-2 text-sm">{review.sources.map(source => <li key={source.url}>{isStudySourceUrl(source.url) ? <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">{source.title} <ExternalLink className="h-3 w-3" /></a> : source.title}</li>)}</ul>
    </details>
    <p className="text-xs text-muted-foreground">Esta é a versão conferida na data indicada. A data de corte do seu edital pode ser diferente. Alterações futuras estão separadas das regras já vigentes.</p>
  </aside>;
}
