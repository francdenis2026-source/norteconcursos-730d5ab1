import { createFileRoute, Link } from "@tanstack/react-router";
import { InstitutionalLayout } from "@/components/landing/InstitutionalLayout";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({ meta: [{ title: "Privacidade | Norte Concursos" }] }),
});

function Privacy() {
  return (
    <InstitutionalLayout
      eyebrow="Transparência · Atualizado em 30/09/2026"
      title="Seus dados. Sua confiança."
      intro="Entenda quais informações participam da sua experiência e como buscar orientação sobre privacidade."
    >
      <div className="institutional-document lp-container">
        <aside>
          <span>GUIA DE LEITURA</span>
          <a href="#dados">Dados utilizados</a>
          <a href="#finalidades">Finalidades</a>
          <a href="#servicos">Serviços e armazenamento</a>
          <a href="#direitos">Seus direitos</a>
        </aside>
        <div className="institutional-prose">
          <section id="dados">
            <h2>01. Informações da sua conta e dos seus estudos</h2>
            <p>
              A criação da conta utiliza nome, CPF, e-mail e credenciais de acesso. O e-mail permite
              entrar e recuperar a senha; contas antigas também aceitam CPF no login. Ao estudar,
              são registrados dados como respostas, resultados de simulados, progresso, cadernos e
              preferências de preparação.
            </p>
            <p>
              Forneça apenas as informações necessárias para usar cada recurso. Não envie senhas,
              documentos pessoais ou dados de terceiros em relatos de erro.
            </p>
          </section>
          <section id="finalidades">
            <h2>02. Para que essas informações são usadas</h2>
            <p>
              Os dados permitem autenticar seu acesso, manter sua conta, registrar sua evolução,
              organizar seus materiais e apresentar indicadores de desempenho. Informações de plano
              e assinatura apoiam a gestão do acesso aos recursos contratados.
            </p>
            <p>
              Dados técnicos de falhas podem ser utilizados para diagnosticar problemas e melhorar o
              funcionamento da plataforma.
            </p>
          </section>
          <section id="servicos">
            <h2>03. Infraestrutura e armazenamento local</h2>
            <p>
              A plataforma utiliza Supabase para autenticação e persistência de dados. Integrações
              de pagamento, quando utilizadas, seguem também as informações apresentadas pelo
              respectivo provedor no fluxo de contratação.
            </p>
            <p>
              O navegador pode armazenar a sessão e informações locais de funcionamento, como a
              contagem de questões respondidas no acesso de visitante. Limpar esses dados pode
              encerrar a sessão ou redefinir preferências locais.
            </p>
            <p>
              A conservação das informações deve considerar a finalidade do tratamento e as
              obrigações aplicáveis. Esta página não estabelece um prazo único para todos os tipos
              de registro.
            </p>
          </section>
          <section id="direitos">
            <h2>04. Direitos e solicitações</h2>
            <p>
              A LGPD prevê direitos como confirmação do tratamento, acesso, correção e, nas
              hipóteses legais, eliminação e revogação do consentimento. Consulte a{" "}
              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm"
                target="_blank"
                rel="noreferrer"
              >
                Lei Geral de Proteção de Dados, especialmente o art. 18
              </a>
              .
            </p>
            <p>
              Pedidos enviados pelo suporte incluem seu e-mail e relato, são recebidos pela
              administração e têm acesso restrito. Você pode revisar seus dados na área Meu perfil.
              Para outras solicitações, consulte a <Link to="/suporte">central de suporte</Link> e
              prepare um relato com o assunto “Privacidade”, sem incluir dados sensíveis
              desnecessários.
            </p>
          </section>
        </div>
      </div>
    </InstitutionalLayout>
  );
}
