import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, GraduationCap, ShieldCheck, Code2 } from "lucide-react";

const milestones = [
  [
    "2018",
    "Primeiro cargo efetivo de professor",
    "Ingresso na educação municipal de Feijó, no Acre: a experiência de ensinar levada para a preparação de quem estuda.",
  ],
  [
    "2019",
    "Segundo cargo efetivo de professor",
    "Uma nova conquista no concurso do município de Feijó, ampliando a trajetória na educação pública.",
  ],
  [
    "2021",
    "Segurança e tecnologia no ISE/AC",
    "Aprovações para agente socioeducativo e técnico de informática no Instituto Socioeducativo do Acre, com efetivação como agente socioeducativo.",
  ],
  [
    "2023",
    "Aprovação para agente penitenciário",
    "Aprovação no concurso do Estado do Acre, somando mais uma conquista à trajetória como concurseiro.",
  ],
  [
    "2025",
    "Concurso para agente da PF",
    "56,00 pontos líquidos e 13.104ª colocação na prova objetiva, na ampla concorrência. Foram 82 acertos, 26 erros e 12 questões em branco, conforme o resultado registrado na plataforma, com o boletim da Cebraspe indicado como fonte.",
  ],
];

export function FounderStory({ full = false }: { full?: boolean }) {
  return (
    <section id="quem-somos" className="founder-section" aria-labelledby="founder-title">
      <div className="lp-container">
        <div className="founder-grid">
          <div className="founder-identity">
            <span className="lp-kicker">Nossa origem · Feijó, Acre</span>
            <img
              className="founder-portrait"
              src="/media/franc-denis-retrato-v1.webp"
              alt="Franc Denis, com camisa azul e colete, em composição com fundo escuro"
              width={1086}
              height={1448}
              decoding="async"
            />
            <span className="founder-location">
              <MapPin size={15} /> Feijó · Acre · Brasil
            </span>
            <h2>Franc Denis</h2>
            <p>
              Desenvolvedor da Norte Concursos.
              <br />
              Concurseiro, concursado e agente de segurança pública.
            </p>
            <div className="founder-tags">
              <span>
                <GraduationCap /> Educação
              </span>
              <span>
                <ShieldCheck /> Segurança
              </span>
              <span>
                <Code2 /> Tecnologia
              </span>
            </div>
          </div>
          <div className="founder-copy">
            <span className="lp-kicker">Uma plataforma com história</span>
            <h2 id="founder-title" className="lp-h2">
              De quem conhece a jornada.
              <br />
              <em>Para quem quer avançar.</em>
            </h2>
            <p className="lp-lead">
              A Norte Concursos nasce em Feijó, no interior do Acre, do encontro entre a experiência
              em sala de aula, o serviço público e a tecnologia.
            </p>
            <p>
              Franc Denis conhece a preparação pelo lado de quem estuda e pelo lado de quem ensina.
              Sua trajetória reúne cargos efetivos na educação municipal, atuação socioeducativa e
              aprovações em concursos de segurança e informática.
            </p>
            <p>
              Essa vivência dá direção ao projeto: transformar um edital extenso em próximos passos
              claros, dar sentido aos erros e ajudar o aluno a construir uma rotina que cabe na vida
              real.
            </p>
            {full ? (
              <div className="founder-manifesto">
                <span>O que nos move</span>
                <p>
                  Clareza para escolher o que estudar. Método para continuar. Tecnologia para
                  enxergar a própria evolução.
                </p>
              </div>
            ) : (
              <Link to="/sobre" className="founder-link">
                Conheça a história e os princípios <ArrowUpRight size={18} />
              </Link>
            )}
          </div>
        </div>
        {full && (
          <>
            <div className="founder-timeline" aria-label="Trajetória de Franc Denis">
              {milestones.map(([date, title, text]) => (
                <article key={title}>
                  <span>{date}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <p className="founder-note">
              Trajetória apresentada a partir das informações fornecidas pelo desenvolvedor. As
              aprovações individuais não representam garantia de resultado para outros candidatos.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
