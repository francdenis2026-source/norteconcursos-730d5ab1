import type { DidacticProvenance } from "@/lib/didacticQuestion";
export function DidacticSourceNotice({
  provenance,
}: {
  provenance?: DidacticProvenance | undefined;
}) {
  if (!provenance) return null;
  return (
    <p
      className="mb-3 break-words text-xs leading-5 text-muted-foreground"
      aria-label="Origem didática da questão"
    >
      <strong>Material didático catalogado</strong> · {provenance.publisher} ·{" "}
      {provenance.documentTitle ?? provenance.documentName.replace(/\.pdf$/i, "")} · item{" "}
      {provenance.itemNumber}
      {provenance.page ? ` · p. ${provenance.page}` : ""}. Enunciado adaptado e revisado; sem
      atribuição a banca oficial.
    </p>
  );
}
