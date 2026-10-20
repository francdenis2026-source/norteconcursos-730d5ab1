import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  FileCheck2,
  Printer,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { NorteBrand } from "@/components/brand/NorteBrand";
import "@/styles/legal-document.css";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({ meta: [{ title: "Termos de uso | Norte Concursos" }] }),
});

const SECTIONS = [
  ["objetivo", "A plataforma"],
  ["conta", "Conta e acesso"],
  ["conteudo", "Conteúdo e fontes"],
  ["planos", "Planos e contratação"],
  ["convivencia", "Uso responsável"],
] as const;

function Terms() {
  const [active, setActive] = useState<string>("objetivo");
  useEffect(() => {
    const syncSection = () => {
      const id = window.location.hash.slice(1);
      setActive(SECTIONS.some(([section]) => section === id) ? id : "objetivo");
    };
    syncSection();
    window.addEventListener("hashchange", syncSection);
    return () => window.removeEventListener("hashchange", syncSection);
  }, []);
  return (
    <div className="legal-center">
      <a className="ld-skip" href="#terms-document">
        Pular para os termos
      </a>
      <header className="ld-header ld-container">
        <Link to="/" aria-label="Norte Concursos — início">
          <NorteBrand light />
        </Link>
        <nav aria-label="Navegação dos termos">
          <Link to="/" className="ld-back">
            <ArrowLeft size={15} aria-hidden="true" /> Início
          </Link>
          <Link to="/suporte" className="ld-button">
            <Headphones size={15} aria-hidden="true" /> Central de suporte
          </Link>
        </nav>
      </header>
      <main className="ld-container">
        <section className="ld-hero" aria-labelledby="terms-title">
          <span className="ld-eyebrow">
            <FileCheck2 size={15} aria-hidden="true" /> Termos de uso
          </span>
          <h1 id="terms-title">
            Regras claras.
            <br />
            <em>Preparação responsável.</em>
          </h1>
          <p>
            Regras claras para utilizar a Norte Concursos e compreender o alcance dos seus recursos
            educacionais.
          </p>
          <div className="ld-metadata">
            <span>
              <CalendarDays size={14} aria-hidden="true" /> Atualizado em{" "}
              <time dateTime="2026-09-30">30/09/2026</time>
            </span>
            <button type="button" onClick={() => window.print()}>
              <Printer size={14} aria-hidden="true" /> Imprimir termos
            </button>
          </div>
        </section>
        <div className="ld-layout">
          <aside className="ld-sidebar">
            <nav className="ld-index" aria-label="Índice dos termos de uso">
              <span className="ld-eyebrow">Guia de leitura</span>
              <p>Cada regra, no seu lugar.</p>
              <ol>
                {SECTIONS.map(([id, label], index) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={active === id ? "location" : undefined}
                      onClick={() => setActive(id)}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {label}
                      <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="ld-assistance">
              <ShieldCheck size={21} aria-hidden="true" />
              <h2>Transparência em primeiro lugar.</h2>
              <p>Consulte também como seus dados são utilizados na plataforma.</p>
              <Link to="/privacy">
                Política de privacidade <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </aside>
          <article
            id="terms-document"
            className="ld-document"
            tabIndex={-1}
            aria-label="Texto completo dos termos de uso"
          >
            <div className="ld-document__heading">
              <span className="ld-eyebrow">Norte Concursos</span>
              <span>Uso responsável da plataforma</span>
            </div>
            <section id="objetivo">
              <h2>01. O que a plataforma oferece</h2>
              <p>
                A Norte Concursos é uma plataforma independente de preparação, com questões,
                simulados, organização de estudos e indicadores de desempenho. Não representa bancas
                examinadoras, órgãos públicos ou instituições de segurança.
              </p>
              <p>
                O uso das ferramentas não garante aprovação, nomeação ou posse. Resultados dependem
                da preparação individual e das regras de cada concurso.
              </p>
            </section>
            <section id="conta">
              <h2>02. Sua conta e seu acesso</h2>
              <p>
                Informe dados corretos, proteja suas credenciais e utilize sua conta pessoal de
                forma responsável. Não compartilhe senhas nem tente acessar informações ou recursos
                de outros usuários sem autorização.
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
                trecho, o motivo e a fonte consultada na{" "}
                <Link to="/suporte">central de suporte</Link>. Conteúdos podem ser corrigidos após
                revisão.
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
                Não conclua um pagamento se as condições de cobrança não estiverem claras. Consulte
                o suporte em caso de divergência no acesso ou na assinatura.
              </p>
            </section>
            <section id="convivencia">
              <h2>05. Uso responsável e privacidade</h2>
              <p>
                Não utilize a plataforma para fraude, exploração de vulnerabilidades, coleta
                indevida de dados ou distribuição de materiais sem autorização. Respeite os direitos
                sobre os conteúdos e a privacidade de outras pessoas.
              </p>
              <p>
                O uso dos seus dados é explicado na <Link to="/privacy">página de privacidade</Link>
                . Mudanças nestas informações serão identificadas pela data de atualização da
                página.
              </p>
            </section>
            <div className="ld-document__end">
              <ShieldCheck size={17} aria-hidden="true" />
              <p>
                Este é o fim dos termos de uso. A data da versão está indicada no início da página.
              </p>
              <a href="#terms-title">
                Voltar ao início <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
        <section className="ld-contact" aria-labelledby="terms-contact-title">
          <span className="ld-contact__icon">
            <Headphones size={23} aria-hidden="true" />
          </span>
          <div>
            <h2 id="terms-contact-title">Ficou alguma dúvida sobre os termos?</h2>
            <p>A Central de suporte ajuda você a encontrar uma orientação.</p>
          </div>
          <Link to="/suporte" className="ld-button ld-button--gold">
            Falar com a equipe <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <footer className="ld-footer ld-container">
        <span>Norte Concursos · De Feijó para todo o Brasil</span>
        <nav aria-label="Links institucionais">
          <Link to="/sobre">Nossa história</Link>
          <Link to="/privacy">Privacidade</Link>
          <Link to="/suporte">Suporte</Link>
          <Link to="/">
            Voltar ao início <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </nav>
      </footer>
    </div>
  );
}
