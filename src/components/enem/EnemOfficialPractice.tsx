import { FileText, ExternalLink } from "lucide-react";
const root =
  "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos";
const pdf = "https://download.inep.gov.br/enem/provas_e_gabaritos/";
export function EnemOfficialPractice() {
  return (
    <section className="rounded-2xl border bg-card p-5" aria-label="Provas oficiais para simular">
      <h3 className="flex items-center gap-2 text-lg font-bold">
        <FileText className="h-5 w-5 text-sky-500" /> Simule com provas anteriores do Inep
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Os cadernos completos preservam todas as figuras. Reserve 5h30 para o primeiro dia,
        incluindo a redação, e 5h para o segundo. Responda antes de abrir o gabarito e desconsidere
        os itens anulados. Acertos não equivalem à nota TRI.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          { day: 1, code: "D1_CD1", color: "Azul" },
          { day: 2, code: "D2_CD5", color: "Amarelo" },
        ].map((e) => (
          <article key={e.day} className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4">
            <h4 className="font-semibold">
              ENEM 2025 · dia {e.day} · {e.color}
            </h4>
            <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
              <a
                href={`${pdf}2025_PV_impresso_${e.code}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline"
              >
                Prova completa <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={`${pdf}2025_GB_impresso_${e.code}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Gabarito oficial
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {[2025, 2024, 2023].map((year) => (
          <a
            key={year}
            href={`${root}/${year}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border px-3 py-1.5 font-medium hover:bg-muted"
          >
            Acervo oficial {year}
          </a>
        ))}
      </div>
    </section>
  );
}
