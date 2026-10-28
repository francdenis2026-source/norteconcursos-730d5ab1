import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BedDouble, Library, Monitor } from "lucide-react";
import { InstitutionalWindow, WindowSections } from "@/components/landing/InstitutionalWindow";

export const Route = createFileRoute("/sala-de-repouso")({
  component: SalaDeRepouso,
  head: () => ({ meta: [{ title: "Sala de repouso | Norte Concursos" }] }),
});

function SalaDeRepouso() {
  return (
    <InstitutionalWindow
      page="/sala-de-repouso"
      title="Sala de repouso."
      description="Um espaço para descansar entre um estudo e outro, disponível todos os dias da semana."
      image="/media/hero/auth-carreiras-composicao.webp"
    >
      <WindowSections
        label="Conheça a sala de repouso"
        sections={[
          {
            id: "espaco",
            label: "O espaço",
            content: (
              <section>
                <h2>Uma pausa também faz parte do estudo.</h2>
                <p>
                  A sala de repouso é uma alternativa de descanso para quem estuda com a gente
                  presencialmente. Não é uma atividade programada: ela fica disponível todos os
                  dias da semana para quem realmente precisar dormir ou repousar um pouco entre
                  os estudos.
                </p>
                <div className="iw-facts">
                  <article>
                    <span>01 · MENINOS</span>
                    <h3>
                      <Library size={16} aria-hidden="true" style={{ display: "inline", marginRight: 6 }} />
                      Na biblioteca
                    </h3>
                    <p>Responsável: Mônica.</p>
                  </article>
                  <article>
                    <span>02 · MENINAS</span>
                    <h3>
                      <Monitor size={16} aria-hidden="true" style={{ display: "inline", marginRight: 6 }} />
                      Na sala de informática
                    </h3>
                    <p>Responsável: Émily.</p>
                  </article>
                  <article>
                    <span>03 · DISPONIBILIDADE</span>
                    <h3>
                      <BedDouble size={16} aria-hidden="true" style={{ display: "inline", marginRight: 6 }} />
                      Todos os dias da semana
                    </h3>
                    <p>Sem agendamento: é só precisar.</p>
                  </article>
                </div>
                <Link to="/sobre" className="iw-about-cta">
                  Conhecer a Norte Concursos <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </section>
            ),
          },
        ]}
      />
    </InstitutionalWindow>
  );
}
