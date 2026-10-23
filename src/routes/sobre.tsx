import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { FounderStory } from "@/components/landing/FounderStory";
import { InstitutionalWindow, WindowSections } from "@/components/landing/InstitutionalWindow";
export const Route = createFileRoute("/sobre")({
  component: About,
  head: () => ({
    meta: [{ title: "Nossa história | Norte Concursos" }, ...SHARE_IMAGE_META],
  }),
});
function About() {
  return (
    <InstitutionalWindow
      page="/sobre"
      title="Nossa história tem um norte."
      description="De Feijó, no Acre, uma plataforma que une experiência em educação, segurança pública e tecnologia."
      image="/media/hero/auth-carreiras-composicao.webp"
    >
      <WindowSections
        label="Conheça a Norte Concursos"
        sections={[
          {
            id: "projeto",
            label: "O projeto",
            content: (
              <section>
                <h2>Estudar pode caber na vida real.</h2>
                <p>
                  A Norte Concursos nasceu em Feijó, no Acre, para transformar a experiência de quem
                  ensina e de quem estuda em um caminho mais claro para a aprovação.
                </p>
                <p>
                  Uma plataforma feita de experiência, método e presença: quem estuda encontra
                  rotina, correção e próximos passos, com dados e tecnologia para enxergar o que
                  fazer a seguir.
                </p>
                <div className="iw-facts">
                  <article>
                    <span>01 · ORIGEM</span>
                    <h3>Raízes no Acre.</h3>
                    <p>Feijó, Acre. Uma história local com horizonte nacional.</p>
                  </article>
                  <article>
                    <span>02 · PRÁTICA</span>
                    <h3>Direção em cada sessão.</h3>
                    <p>Quem estuda encontra rotina, correção e próximos passos.</p>
                  </article>
                  <article>
                    <span>03 · PROGRESSO</span>
                    <h3>Evolução com clareza.</h3>
                    <p>Dados e tecnologia para enxergar o que fazer a seguir.</p>
                  </article>
                </div>
                <Link to="/desafio-diario" className="iw-about-cta">
                  Experimentar o desafio diário <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </section>
            ),
          },
          { id: "quem-somos", label: "Quem criou", content: <FounderStory full /> },
          {
            id: "principios",
            label: "Nossos princípios",
            content: (
              <section>
                <h2>Direção, aprendizado e responsabilidade.</h2>
                <p>O próximo capítulo é seu. Comece com uma questão. Continue com um plano.</p>
                <div className="iw-facts">
                  <article>
                    <span>01 · DIREÇÃO</span>
                    <h3>Menos dispersão. Mais propósito.</h3>
                    <p>
                      Escolher uma carreira, ler o edital e transformar prioridades em uma rotina
                      executável.
                    </p>
                  </article>
                  <article>
                    <span>02 · APRENDIZADO</span>
                    <h3>O erro também ensina.</h3>
                    <p>
                      Resolver, compreender a correção e voltar ao assunto com uma pergunta melhor.
                    </p>
                  </article>
                  <article>
                    <span>03 · RESPONSABILIDADE</span>
                    <h3>Confiança se constrói.</h3>
                    <p>
                      Valorizar fontes, sinalizar o que precisa de revisão e tratar a preparação com
                      seriedade.
                    </p>
                  </article>
                </div>
                <Link to="/auth" search={{ mode: "register" }} className="iw-about-cta">
                  Começar minha preparação <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </section>
            ),
          },
        ]}
      />
    </InstitutionalWindow>
  );
}
