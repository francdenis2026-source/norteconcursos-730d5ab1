import { HeroBadge } from "@/components/landing/HeroBadge";
import { StudyPresence } from "@/components/landing/StudyPresence";
import * as PreparationTabs from "@radix-ui/react-tabs";
import { HomeRail } from "@/components/landing/HomeRail";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
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
  Volume2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "@/styles/home.css";
import "@/styles/home-operations.css";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { QuestionCountBadge } from "@/components/landing/QuestionCountBadge";
import { PlansSection } from "@/components/landing/PlansSection";
import { TestingSeal } from "@/components/landing/TestingSeal";
import { HeroVideo } from "@/components/landing/HeroVideo";
import { DailyChallengeBadge } from "@/components/landing/DailyChallengeBadge";
import { PcprExamPromo } from "@/components/landing/PcprExamPromo";
import { PcpiExamPromo } from "@/components/landing/PcpiExamPromo";
import { ThemeToggle } from "@/components/landing/ThemeToggle";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Norte Concursos | Sua preparação tem direção",
    meta: [
      {
        name: "description",
        content:
          "Plataforma de estudo para Polícia Federal, PRF, Polícias Civis, Penais e Militares, com questões, simulados e inteligência de desempenho.",
      },
      { property: "og:title", content: "Norte Concursos — Sua preparação tem direção" },
      {
        property: "og:description",
        content: "Treino orientado por dados para quem escolheu servir e proteger.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    "Escolha seu objetivo",
    "Escolha carreira, cargo, banca e edital para estudar o que realmente pontua.",
  ],
  [
    FileSearch,
    "Entenda seu ponto de partida",
    "Resolva um diagnóstico e descubra onde você perde pontos, disciplina por disciplina.",
  ],
  [
    BrainCircuit,
    "Pratique e revise",
    "Questões, revisões e blocos de foco com objetivo claro em cada sessão.",
  ],
  [Trophy, "Prepare o ritmo da prova", "Teste tempo e estratégia antes do dia decisivo."],
];

const TOOLS: { icon: LucideIcon; title: string; text: string; featured?: boolean }[] = [
  {
    icon: BrainCircuit,
    title: "Treinador de questões",
    text: "Sessões por banca, cargo e disciplina, com correção imediata, explicação e fonte jurídica oficial.",
    featured: true,
  },
  {
    icon: Trophy,
    title: "Simulador de provas",
    text: "Cronômetro, mapa de questões e diagnóstico por disciplina no ritmo da prova real.",
  },
  {
    icon: MapIcon,
    title: "Edital eletrônico",
    featured: true,
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
    text: "Retome as questões que errou e transforme suas dificuldades em prioridades de revisão.",
  },
  {
    icon: LineChart,
    title: "Análise de desempenho",
    featured: true,
    text: "Precisão, ritmo, lacunas e constância traduzidos em decisões para o próximo ciclo.",
  },
  {
    icon: Volume2,
    title: "Leitura em voz alta",
    text: "Ouça enunciados e alternativas em português enquanto revisa ou descansa os olhos. Use a voz padrão do navegador, quando disponível, em todos os planos.",
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

function usePointerInteractions() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".home :is(.home-core-tool, .home-tool, .home-steps > li, .home-opportunity, .home-career, .home-plan, .home-source-details)",
      ),
    );
    const cleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const handleMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty("--tilt-x", `${(x * 5).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
        card.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);
      };
      const reset = () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--pointer-x", "50%");
        card.style.setProperty("--pointer-y", "50%");
      };
      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", reset);
      cleanups.push(() => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", reset);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}

const PREPARATION_TABS = [
  ["ferramentas", "Ferramentas"],
  ["como", "Como funciona"],
  ["carreiras", "Carreiras"],
  ["fontes", "Fontes oficiais"],
] as const;

function PreparationInfo() {
  const [active, setActive] = useState("ferramentas");
  useEffect(() => {
    const selectHash = (hash: string) => {
      const value = hash.replace(/^#/, "");
      if (PREPARATION_TABS.some(([id]) => id === value)) setActive(value);
    };
    const onHashChange = () => selectHash(window.location.hash);
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      const href = anchor?.getAttribute("href");
      if (href?.startsWith("#")) selectHash(href);
    };
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onAnchorClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);
  return (
    <PreparationTabs.Root value={active} onValueChange={setActive} className="home-preparation__info">
      <PreparationTabs.List className="home-preparation__tabs" aria-label="Conheça a preparação">
        {PREPARATION_TABS.map(([id, label]) => (
          <div key={id} id={id} className="home-preparation__tab-anchor">
            <PreparationTabs.Trigger value={id} className="home-preparation__tab">
              {label}
            </PreparationTabs.Trigger>
          </div>
        ))}
      </PreparationTabs.List>
      <PreparationTabs.Content value="ferramentas" className="home-preparation__panel">
        <div className="home-preparation__items">
          {TOOLS.map(({ icon: Icon, title, text }) => (
            <article key={title}><Icon aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </PreparationTabs.Content>
      <PreparationTabs.Content value="como" className="home-preparation__panel">
        <ol className="home-preparation__items home-preparation__steps">
          {STEPS.map(([Icon, title, text], index) => (
            <li key={title}><span className="home-preparation__number">0{index + 1}</span><div><h3><Icon aria-hidden="true" />{title}</h3><p>{text}</p></div></li>
          ))}
        </ol>
      </PreparationTabs.Content>
      <PreparationTabs.Content value="carreiras" className="home-preparation__panel">
        <div className="home-preparation__items home-preparation__careers">
          {CAREERS.map(([name, roles]) => (
            <article key={name}><ShieldCheck aria-hidden="true" /><div><h3>{name}</h3><p>{roles}</p></div></article>
          ))}
        </div>
      </PreparationTabs.Content>
      <PreparationTabs.Content value="fontes" className="home-preparation__panel">
        <div className="home-preparation__items">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <article key={title}><Icon aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
      </PreparationTabs.Content>
    </PreparationTabs.Root>
  );
}

function Index() {
  const [introPlaying, setIntroPlaying] = useState(false);
  const [introSettled, setIntroSettled] = useState(false);
  usePointerInteractions();
  return (
    <div className="home">
      <a href="#conteudo" className="home-skip">
        Pular para o conteúdo
      </a>
      <header className="home-header">
        <div className="home-container home-header__inner">
          <div className="home-brand-lockup">
            <Link to="/" aria-label="Norte Concurso — início">
              <NorteBrand />
            </Link>
            <StudyPresence />
          </div>
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
              <SheetContent
                className="home-menu"
                menuMotion="popover"
                overlayClassName="home-menu-overlay"
                closeLabel="Fechar menu"
              >
                <SheetHeader className="home-menu__header">
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
        <section className="home-hero" aria-labelledby="home-title" data-intro={introPlaying}>
          <HeroVideo onIntroChange={setIntroPlaying} onIntroSettled={() => setIntroSettled(true)} />
          <div className="home-container home-hero__content" inert={introPlaying}>
            <HeroBadge show={introSettled} />
            <div className="home-hero__grid">
              <div className="home-hero__copy">
                <span className="home-eyebrow">
                  <span /> Carreiras policiais e segurança pública
                </span>
                <h1 id="home-title">
                  Sua preparação
                  <br />
                  <em>tem um norte.</em>
                </h1>
                <p>
                  Questões, legislação e simulados para carreiras policiais. Organize seu estudo,
                  fortaleça suas dificuldades e acompanhe cada avanço em um só lugar.
                </p>
                <div className="home-actions">
                  <Link
                    to="/auth"
                    search={{ mode: "register" }}
                    className="home-button home-button--gold"
                  >
                    Começar grátis
                    <ArrowUpRight />
                  </Link>
                  <a href="#plataforma" className="home-hero__explore">
                    Conhecer a plataforma
                    <ArrowRight />
                  </a>
                </div>
                <div className="home-hero__study-entry" aria-label="Comece sua preparação">
                  <TestingSeal />
                  <div className="home-hero__study-links">
                    <DailyChallengeBadge />
                    <QuestionCountBadge />
                  </div>
                </div>
              </div>
            </div>
            <ul className="home-trust" aria-label="Diferenciais">
              <li>
                <BadgeCheck /> Fontes e revisões identificadas
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

        <section id="plataforma" className="home-section home-preparation" aria-labelledby="preparation-title">
          <div className="home-preparation__fullwidth">
            <div className="home-preparation__band">
              <span className="home-preparation__frame" aria-hidden="true" />
              <span className="home-preparation__sweep" aria-hidden="true" />
              <img
                className="home-preparation__art"
                src="/media/hero/auth-carreiras-composicao.webp"
                alt=""
                width={1440}
                height={600}
                loading="lazy"
                decoding="async"
              />
              <div className="home-preparation__intro">
                <span className="home-preparation__eyebrow">Para quem escolheu servir e proteger</span>
                <h2 id="preparation-title">Uma plataforma.<br /><em>A sua carreira.</em></h2>
                <p>Do edital ao treino: teoria, questões, revisão e desempenho para estudar com uma prioridade clara.</p>
                <div className="home-preparation__actions">
                  <Link to="/auth" search={{ mode: "register" }} className="home-button home-button--gold">
                    Começar gratuitamente <ArrowUpRight aria-hidden="true" />
                  </Link>
                  <Link to="/desafio-diario" className="home-preparation__challenge">
                    Fazer o desafio diário <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <PreparationInfo />
            </div>
          </div>
        </section>

        <section id="concursos" className="home-section home-operations">
          <div className="home-container">
            <div className="home-operations__heading">
              <Head
                kicker="No seu radar"
                lead="Provas para praticar agora e uma próxima oportunidade para começar a se preparar."
              >
                Seu próximo <em>objetivo.</em>
              </Head>
              <img
                className="home-operations__art"
                src="/media/hero/auth-carreiras-composicao.webp"
                alt=""
                width={1440}
                height={600}
                loading="lazy"
                decoding="async"
              />
            </div>
            <HomeRail className="home-opportunities" label="Oportunidades de concursos">
              <PcprExamPromo />
              <PcpiExamPromo />
              <article
                className="home-opportunity home-opportunity--acre"
                aria-labelledby="pcac-title"
              >
                <div className="home-opportunity__header">
                  <div className="home-opportunity__image">
                    <img
                      src="/media/hero/pcac-capa.webp"
                      alt="Capa PC-AC — Polícia Civil do Estado do Acre, com agente, viatura e identidade Norte Concursos"
                      width={1672}
                      height={940}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="home-opportunity__intro">
                    <span className="home-status home-status--inline">
                      <CalendarClock /> Edital ainda não publicado
                    </span>
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
                  </div>
                </div>
                <div className="home-opportunity__body">
                  <details className="home-exam-details">
                    <summary>Cargos e informações</summary>
                    <p>
                      O novo concurso foi anunciado, com vagas previstas para Delegado, Oficial
                      Investigador e Perito. Sua preparação pode começar agora.
                    </p>
                  </details>
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
            </HomeRail>
          </div>
        </section>

        <PlansSection />

      </main>

      <footer className="home-footer home-footer--command">
        <div className="home-container">
          <div className="home-footer__grid">
            <div className="home-footer__brand">
              <img className="home-footer__insignia" src="/media/hero/auth-distintivo.webp" alt="" width={96} height={116} loading="lazy" decoding="async" />
              <div>
                <NorteBrand />
                <p>Seu norte na preparação para carreiras policiais.</p>
              </div>
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
            <a
              className="home-platform-qr"
              href="https://norteconcursos.xyz/"
              aria-label="Abrir a plataforma Norte Concurso. Aponte a câmera do celular para o QR Code."
            >
              <img
                src="/media/brand/platform-qr.svg"
                width={112}
                height={112}
                loading="lazy"
                alt="QR Code para https://norteconcursos.xyz/"
              />
              <span>
                <strong>Continue no celular</strong>
                <span>Aponte a câmera e acesse a plataforma.</span>
                <small>norteconcursos.xyz <ArrowUpRight aria-hidden="true" /></small>
              </span>
            </a>
          </div>
          <div className="home-footer__bottom">
            <span>© 2026 Norte Concursos. Todos os direitos reservados.</span>
            <span>Desenvolvido por Franc D'nis</span>
            <span>Feijó · Acre</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <nav className="home-footer__links" aria-label={title}>
      <h3>{title}</h3>
      <ul>
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
