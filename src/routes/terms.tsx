import { createFileRoute, Link } from "@tanstack/react-router";
import { InstitutionalLayout } from "@/components/landing/InstitutionalLayout";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({ meta: [{ title: "Termos de uso | Norte Concursos" }] }),
});

function Terms() {
  return (
    <InstitutionalLayout
      eyebrow="Uso responsável · Atualizado em 30/09/2026"
      title="Um compromisso com a preparação."
      intro="Regras claras para utilizar a Norte Concursos e compreender o alcance dos seus recursos educacionais."
    >
      <div className="institutional-document lp-container">
        <aside>
          <span>GUIA DE LEITURA</span>
          <a href="#objetivo">Objetivo</a>
          <a href="#conta">Conta e acesso</a>
          <a href="#conteudo">Conteúdo e fontes</a>
          <a href="#planos">Planos</a>
          <a href="#convivencia">Uso responsável</a>
        </aside>
        <div className="institutional-prose">
          <section id="objetivo">
            <h2>01. O que a plataforma oferece</h2>
            <p>
              A Norte Concursos é uma plataforma independente de preparação, com questões,
              simulados, organização de estudos e indicadores de desempenho. Não representa bancas
              examinadoras, órgãos públicos ou instituições de segurança.
            </p>
            <p>
              O uso das ferramentas não garante aprovação, nomeação ou posse. Resultados dependem da
              preparação individual e das regras de cada concurso.
            </p>
          </section>
          <section id="conta">
            <h2>02. Sua conta e seu acesso</h2>
            <p>
              Informe dados corretos, proteja suas credenciais e utilize sua conta pessoal de forma
              responsável. Não compartilhe senhas nem tente acessar informações ou recursos de
              outros usuários sem autorização.
            </p>
            <p>
              Algumas experiências podem ser utilizadas como visitante; outras exigem autenticação
              ou um plano com os recursos correspondentes.
            </p>
          </section>
          <section id="conteudo">
            <h2>03. Material de estudo e atualização</h2>
            <p>
              Questões e explicações são instrumentos de aprendizagem. Consulte o edital, as
              publicações da banca e as fontes oficiais para decisões sobre sua inscrição e
              preparação, especialmente em assuntos sujeitos a alterações legislativas.
            </p>
            <p>
              Ao identificar uma possível inconsistência, registre o identificador da questão, o
              trecho, o motivo e a fonte consultada na <Link to="/suporte">central de suporte</Link>
              . Conteúdos podem ser corrigidos após revisão.
            </p>
          </section>
          <section id="planos">
            <h2>04. Recursos e contratação</h2>
            <p>
              Antes de contratar, confira os recursos, o valor, a duração e as condições
              apresentados na oferta e no fluxo de pagamento. Estes termos não substituem as
              condições específicas exibidas na contratação nem restringem direitos previstos na
              legislação aplicável.
            </p>
            <p>
              Não conclua um pagamento se as condições de cobrança não estiverem claras. Consulte o
              suporte em caso de divergência no acesso ou na assinatura.
            </p>
          </section>
          <section id="convivencia">
            <h2>05. Uso responsável e privacidade</h2>
            <p>
              Não utilize a plataforma para fraude, exploração de vulnerabilidades, coleta indevida
              de dados ou distribuição de materiais sem autorização. Respeite os direitos sobre os
              conteúdos e a privacidade de outras pessoas.
            </p>
            <p>
              O uso dos seus dados é explicado na <Link to="/privacy">página de privacidade</Link>.
              Mudanças nestas informações serão identificadas pela data de atualização da página.
            </p>
          </section>
        </div>
      </div>
    </InstitutionalLayout>
  );
}
