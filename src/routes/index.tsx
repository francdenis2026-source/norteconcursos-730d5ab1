import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  CalendarClock,
  ChevronRight,
  Compass,
  FileSearch,
  Landmark,
  LineChart,
  Map as MapIcon,
  Menu,
  LogIn,
  ScrollText,
  ShieldCheck,
  Target,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "@/styles/home.css";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { QuestionCountBadge } from "@/components/landing/QuestionCountBadge";
import { PlansSection } from "@/components/landing/PlansSection";
import { TestingSeal } from "@/components/landing/TestingSeal";
import { HeroVideo } from "@/components/landing/HeroVideo";
import { DailyChallengeBadge } from "@/components/landing/DailyChallengeBadge";
import { PcprExamPromo } from "@/components/landing/PcprExamPromo";
import { ThemeToggle } from "@/components/landing/ThemeToggle";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Norte Concurso | Preparação de elite para carreiras policiais",
    meta: [
      {
        name: "description",
        content:
          "Plataforma de estudo para Polícia Federal, PRF, Polícias Civis, Penais e Militares, com questões, simulados e inteligência de desempenho.",
      },
      { property: "og:title", content: "Norte Concurso — Sua aprovação tem direção" },
      {
        property: "og:description",
        content: "Treino orientado por dados para quem escolheu servir e proteger.",
      },
      { property: "og:image", content: "/media/hero/landing-hero.webp" },
    ],
  }),
});

const NAV: [string, string][] = [
  ["Como funciona", "#como"],
  ["Ferramentas", "#ferramentas"],
  ["Carreiras", "#carreiras"],
  ["Planos", "#planos"],
];

const STEPS: [LucideIcon, string, string][] = [
  [
    Target,
    "Defina a missão",
    "Escolha carreira, cargo, banca e edital para estudar o que realmente pontua.",
  ],
  [
    FileSearch,
    "Faça o reconhecimento",
    "Resolva um diagnóstico e descubra onde você perde pontos, disciplina por disciplina.",
  ],
  [
    BrainCircuit,
    "Entre em treinamento",
    "Questões, revisões e blocos de foco com objetivo claro em cada sessão.",
  ],
  [Trophy, "Simule sob pressão", "Teste tempo e estratégia antes do dia decisivo."],
];

const TOOLS: { icon: LucideIcon; title: string; text: string; lead?: boolean }[] = [
  {
    icon: BrainCircuit,
    title: "Treinador de questões",
    text: "Sessões por banca, cargo e disciplina, com correção imediata, explicação e fonte jurídica oficial.",
    lead: true,
  },
  {
    icon: Trophy,
    title: "Simulador de provas",
    text: "Cronômetro, mapa de questões e diagnóstico por disciplina no ritmo da prova real.",
  },
  {
    icon: MapIcon,
    title: "Edital eletrônico",
    text: "Cada assunto do edital vira porta de entrada para resumo, explicações e treino.",
  },
  {
    icon: Compass,
    title: "Plano de estudos",
    text: "Prioridades pelo cargo, pela banca e pelo seu desempenho, com foco e revisão no mesmo lugar.",
  },
  {
    icon: FileSearch,
    title: "Caderno de erros",
    text: "Cada falha vira uma ordem de revisão clara, sem estudar no escuro.",
  },
  {
    icon: LineChart,
    title: "Análise de desempenho",
    text: "Precisão, ritmo, lacunas e constância traduzidos em decisões para o próximo ciclo.",
  },
];

const CAREERS: [string, string][] = [
  ["Polícia Federal", "Agente, Escrivão, Delegado"],
  ["Polícia Rodoviária Federal", "Policial Rodoviário Federal"],
  ["Polícias Civis", "Investigador, Escrivão, Delegado"],
  ["Polícias Penais", "Federal e estaduais"],
  ["Polícias Militares", "Soldado e Oficial"],
  ["Bombeiros Militares", "Soldado e Oficial"],
  ["Perícia Criminal", "Perito e Papiloscopista"],
  ["Guardas Municipais", "Guarda Civil Municipal"],
];

const PILLARS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ScrollText,
    title: "Fonte oficial em cada questão jurídica",
    text: "Questões jurídicas indicam a fonte, a referência e a data de verificação quando aplicável.",
  },
  {
    icon: Landmark,
    title: "Texto legal vigente",
    text: "Leis federais no texto compilado do Planalto; súmulas e jurisprudência, no tribunal competente.",
  },
  {
    icon: ShieldCheck,
    title: "Conteúdo auditado e identificado",
    text: "O que foi auditado vem sinalizado, para você saber exatamente o que está estudando.",
  },
];

function Head({ kicker, children, lead }: { kicker: string; children: ReactNode; lead?: string }) {
  return (
    <div className="home-heading">
      <span className="home-eyebrow">{kicker}</span>
      <h2>{children}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

function Index() {
  return (
    <div className="home">
      <a href="#conteudo" className="home-skip">
        Pular para o conteúdo
      </a>
      <header className="home-header">
        <div className="home-container home-header__inner">
          <Link to="/">
            <NorteBrand />
          </Link>
          <nav className="home-nav" aria-label="Navegação principal">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="home-header__actions">
            <Link to="/auth" search={{ mode: undefined }} className="home-login">
              <LogIn /> Entrar
            </Link>
            <Link
              to="/auth"
              search={{ mode: "register" }}
              className="home-button home-button--primary home-header__register"
            >
              Começar grátis <ArrowUpRight />
            </Link>
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <button type="button" className="home-menu-trigger" aria-label="Abrir menu">
                  <Menu />
                </button>
              </SheetTrigger>
              <SheetContent className="home-menu">
                <SheetHeader>
                  <SheetTitle>
                    <NorteBrand />
                  </SheetTitle>
                  <SheetDescription>
                    Estude com direção para a carreira que você escolheu.
                  </SheetDescription>
                </SheetHeader>
                <nav aria-label="Navegação móvel">
                  {NAV.map(([label, href]) => (
                    <SheetClose asChild key={href}>
                      <a href={href}>
                        {label}
                        <ChevronRight />
                      </a>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link to="/desafio-diario">
                      Desafio diário
                      <ChevronRight />
                    </Link>
                  </SheetClose>
                </nav>
                <div className="home-menu__access">
                  <SheetClose asChild>
                    <Link
                      to="/auth"
                      search={{ mode: "register" }}
                      className="home-button home-button--primary"
                    >
                      Começar grátis
                      <ArrowRight />
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/auth"
                      search={{ mode: undefined }}
                      className="home-button home-button--secondary"
                    >
                      Já tenho conta
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id="conteudo" tabIndex={-1}>
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-container">
            <div className="home-hero__grid">
              <div className="home-hero__copy">
                <span className="home-eyebrow">
                  <span /> Carreiras policiais e segurança pública
                </span>
                <h1 id="home-title">
                  Sua aprovação
                  <br />
                  tem <em>direção.</em>
                </h1>
                <p>
                  Do edital ao próximo treino. Questões, simulados e um plano de estudos para
                  transformar sua dedicação em uma preparação bem planejada.
                </p>
                <div className="home-actions">
                  <Link
                    to="/auth"
                    search={{ mode: "register" }}
                    className="home-button home-button--gold"
                  >
                    Iniciar minha preparação
                    <ArrowUpRight />
                  </Link>
                  <a href="#plataforma" className="home-hero__explore">
                    Conhecer a plataforma
                    <ArrowRight />
                  </a>
                </div>
                <span className="home-hero__note">
                  Comece gratuitamente. No seu ritmo, com um objetivo claro.
                </span>
              </div>
              <div className="home-hero__visual">
                <div className="home-hero__visual-label">
                  <span>O seu futuro começa no próximo passo.</span>
                  <Compass aria-hidden="true" />
                </div>
                <HeroVideo />
                <div className="home-hero__caption">
                  <span>De Feijó, Acre. Para todo o Brasil.</span>
                  <span>
                    ESTUDE COM DIREÇÃO <ArrowUpRight aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
            <ul className="home-trust" aria-label="Diferenciais">
              <li>
                <BadgeCheck /> Edital e lei vigentes conferidos
              </li>
              <li>
                <Target /> Treino por banca e disciplina
              </li>
              <li>
                <Trophy /> Simulados no ritmo da prova
              </li>
            </ul>
          </div>
        </section>

        <div className="home-start home-container">
          <TestingSeal />
          <div className="home-start__grid">
            <DailyChallengeBadge />
            <QuestionCountBadge />
          </div>
        </div>

        <section
          id="plataforma"
          className="home-section home-platform"
          aria-labelledby="platform-title"
        >
          <div className="home-container">
            <div id="ferramentas" className="home-section-top">
              <div className="home-heading">
                <span className="home-eyebrow">Sua preparação, em um só lugar</span>
                <h2 id="platform-title">
                  Mais clareza.
                  <br />
                  <em>Menos abas abertas.</em>
                </h2>
              </div>
              <p className="home-section-intro">
                Questões, simulados, rotina e desempenho conectados. Entre em cada sessão sabendo o
                que treinar e por quê.
              </p>
            </div>
            <div className="home-tools">
              {TOOLS.map(({ icon: Icon, title, text, lead }) => (
                <article key={title} className={`home-tool${lead ? " home-tool--featured" : ""}`}>
                  <span className="home-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3>
                      {title}
                      {lead && <span className="home-tag">Principal</span>}
                    </h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="como" className="home-section home-method">
          <div className="home-container">
            <Head
              kicker="Como funciona"
              lead="Um ciclo objetivo para transformar edital, desempenho e tempo disponível em uma rotina até a prova."
            >
              Cada etapa tem <em>um propósito.</em>
            </Head>
            <ol className="home-steps">
              {STEPS.map(([Icon, title, text], i) => (
                <li key={title}>
                  <div className="home-step__top">
                    <span>0{i + 1}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="concursos" className="home-section">
          <div className="home-container">
            <Head
              kicker="No seu radar"
              lead="Uma prova para praticar agora. Uma próxima oportunidade para começar a se preparar."
            >
              Seu próximo <em>objetivo.</em>
            </Head>
            <div className="home-opportunities">
              <PcprExamPromo />
              <article
                className="home-opportunity home-opportunity--acre"
                aria-labelledby="pcac-title"
              >
                <div className="home-opportunity__image">
                  <img
                    src="/media/hero/landing-pcac.webp"
                    alt="Composição ilustrativa de profissionais da Polícia Civil do Acre"
                    width={1672}
                    height={941}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="home-status">
                    <CalendarClock /> Edital ainda não publicado
                  </span>
                </div>
                <div className="home-opportunity__body">
                  <div className="home-opportunity__identity">
                    <span className="home-eyebrow">Preparação antecipada · PCAC 2026</span>
                    <div>
                      <img
                        src="/media/brasao-acre-oficial.svg"
                        alt="Brasão do Estado do Acre"
                        width={32}
                        height={32}
                        loading="lazy"
                      />
                      <img
                        src="/media/brasao-pcac-oficial.jpg"
                        alt="Brasão da Polícia Civil do Acre"
                        width={32}
                        height={32}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h3 id="pcac-title">Polícia Civil do Acre</h3>
                  <p>
                    O novo concurso foi anunciado, com vagas previstas para Delegado, Oficial
                    Investigador e Perito. Sua preparação pode começar agora.
                  </p>
                  <div className="home-opportunity__bottom">
                    <Link
                      to="/auth"
                      search={{ mode: "register" }}
                      className="home-button home-button--secondary"
                    >
                      Quero me preparar
                      <ArrowUpRight />
                    </Link>
                    <small>
                      Campanha educacional independente, sem vínculo ou endosso do Governo do Acre
                      ou da Polícia Civil.
                    </small>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="carreiras" className="home-section home-careers">
          <div className="home-container home-careers__layout">
            <div>
              <Head kicker="Para quem escolheu servir e proteger">
                Uma plataforma.
                <br />
                <em>A sua carreira.</em>
              </Head>
              <p className="home-section-intro">
                Preparação para Polícia Federal, PRF, Polícias Civis, Penais, Militares e outras
                carreiras da segurança pública.
              </p>
              <a className="home-text-link" href="#planos">
                Encontre seu ponto de partida
                <ArrowRight />
              </a>
            </div>
            <div className="home-careers__grid">
              {CAREERS.map(([name, roles], i) => (
                <div className="home-career" key={name}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{name}</h3>
                    <p>{roles}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-sources" aria-label="Rastreabilidade jurídica">
          <div className="home-container">
            <Head
              kicker="Rastreabilidade jurídica"
              lead="Cada item jurídico fica ligado ao edital ativo, à fonte oficial e à verificação de vigência."
            >
              Estude com fonte. <em>Avance com confiança.</em>
            </Head>
            <div className="home-sources__grid">
              {PILLARS.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PlansSection />

        <section className="home-final" aria-labelledby="home-final-title">
          <div className="home-container">
            <div className="home-final__inner">
              <div>
                <span className="home-eyebrow">O próximo passo é seu</span>
                <h2 id="home-final-title">
                  Dedicação você já tem.
                  <br />
                  <em>Agora, estude com direção.</em>
                </h2>
                <p>
                  Defina sua carreira, faça o diagnóstico e comece seu primeiro ciclo de treino.
                </p>
              </div>
              <div className="home-final__actions">
                <Link
                  to="/auth"
                  search={{ mode: "register" }}
                  className="home-button home-button--gold"
                >
                  Começar gratuitamente
                  <ArrowUpRight />
                </Link>
                <Link to="/desafio-diario" className="home-final__challenge">
                  <BookOpenCheck />
                  Fazer o desafio diário
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-container">
          <div className="home-footer__grid">
            <div className="home-footer__brand">
              <NorteBrand />
              <p>Inteligência de estudo para as carreiras que protegem o Brasil.</p>
              <span>De Feijó, Acre, para todo o Brasil.</span>
            </div>
            <FooterColumn
              title="Plataforma"
              links={[
                ["Como funciona", "#como"],
                ["Ferramentas", "#ferramentas"],
                ["Carreiras", "#carreiras"],
                ["Desafio diário", "/desafio-diario"],
              ]}
            />
            <FooterColumn
              title="Institucional"
              links={[
                ["Nossa história", "/sobre"],
                ["Privacidade", "/privacy"],
                ["Termos de uso", "/terms"],
                ["Central de suporte", "/suporte"],
              ]}
            />
            <FooterColumn
              title="Acesso"
              links={[
                ["Entrar", "/auth"],
                ["Criar conta", "/auth?mode=register"],
              ]}
            />
          </div>
          <div className="home-footer__bottom">
            <span>© 2026 Norte Concurso. Todos os direitos reservados.</span>
            <span>Desenvolvido por Franc D'nis</span>
            <span>08°09′S 70°21′W</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
