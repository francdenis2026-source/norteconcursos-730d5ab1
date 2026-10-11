import { createFileRoute, Link } from "@tanstack/react-router";
import { InstitutionalLayout } from "@/components/landing/InstitutionalLayout";
import { FounderStory } from "@/components/landing/FounderStory";

export const Route = createFileRoute("/sobre")({
  component: About,
  head: () => ({ meta: [{ title: "Nossa história | Norte Concursos" }] }),
});
function About() {
  return (
    <InstitutionalLayout
      eyebrow="Raízes no Acre. Ambição de ir além."
      title="Estudar pode caber na vida real."
      intro="A Norte Concursos nasceu em Feijó, no Acre, para transformar a experiência de quem ensina e de quem estuda em um caminho mais claro para a aprovação."
      heroImage="/media/hero/journey.webp"
      className="institutional-page--about"
    >
      <section className="about-proof lp-container" aria-label="A Norte em três ideias">
        <div className="about-proof__intro">
          <span className="lp-kicker">O ponto de partida</span>
          <h2>Uma plataforma feita de experiência, método e presença.</h2>
        </div>
        <div className="about-proof__items">
          <article>
            <strong>01</strong>
            <span>Origem</span>
            <p>Feijó, Acre. Uma história local com horizonte nacional.</p>
          </article>
          <article>
            <strong>02</strong>
            <span>Prática</span>
            <p>Quem estuda encontra rotina, correção e próximos passos.</p>
          </article>
          <article>
            <strong>03</strong>
            <span>Progresso</span>
            <p>Dados e tecnologia para enxergar o que fazer a seguir.</p>
          </article>
        </div>
      </section>
      <FounderStory full />
      <section className="institutional-values lp-container">
        <article>
          <span>01 · DIREÇÃO</span>
          <h2>
            Menos dispersão.
            <br />
            Mais propósito.
          </h2>
          <p>
            Escolher uma carreira, ler o edital e transformar prioridades em uma rotina executável.
          </p>
        </article>
        <article>
          <span>02 · APRENDIZADO</span>
          <h2>
            O erro também
            <br />
            ensina.
          </h2>
          <p>Resolver, compreender a correção e voltar ao assunto com uma pergunta melhor.</p>
        </article>
        <article>
          <span>03 · RESPONSABILIDADE</span>
          <h2>
            Confiança se
            <br />
            constrói.
          </h2>
          <p>
            Valorizar fontes, sinalizar o que precisa de revisão e tratar a preparação com
            seriedade.
          </p>
        </article>
      </section>
      <div className="institutional-cta lp-container">
        <div>
          <span className="lp-kicker">O próximo capítulo é seu</span>
          <h2>
            Comece com uma questão.
            <br />
            Continue com um plano.
          </h2>
        </div>
        <Link to="/desafio-diario" className="btn-brass">
          Experimentar o desafio diário
        </Link>
      </div>
    </InstitutionalLayout>
  );
}
