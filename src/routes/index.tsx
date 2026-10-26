import { useHomeSection } from "@/hooks/useHomeSection";
import { TacticalClockBackdrop } from "@/components/brand/TacticalClockBackdrop";
import { ContestShowcase } from "@/components/landing/ContestShowcase";
import { HeroBadge } from "@/components/landing/HeroBadge";
import { StudyPresence } from "@/components/landing/StudyPresence";
import * as PreparationTabs from "@radix-ui/react-tabs";
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
  ChevronRight,
  Compass,
  FileSearch,
  Landmark,
  LineChart,
  Map as MapIcon,
  MapPin,
  Mail,
  MessageCircle,
  Menu,
  Plus,
  LogIn,
  ScrollText,
  ShieldCheck,
  Target,
  Trophy,
  Volume2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "@/styles/home.css";
import "@/styles/home-hero-emblem.css";
import "@/styles/home-operations.css";
import "@/styles/home-light.css";
import "@/styles/home-refinements.css";
import "@/styles/home-interactions.css";
import "@/styles/home-responsive.css";
import "@/styles/home-signals.css";
import "@/styles/home-app.css";
import "@/styles/home-touch.css";
import "@/styles/home-footer.css";
import "@/styles/home-editorial.css";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { TacticalCrosshair } from "@/components/brand/TacticalCrosshair";
import { QuestionCountBadge } from "@/components/landing/QuestionCountBadge";
import { PlansSection } from "@/components/landing/PlansSection";
import { TestingSeal } from "@/components/landing/TestingSeal";
import { HeroVideo } from "@/components/landing/HeroVideo";
import { DailyChallengeBadge } from "@/components/landing/DailyChallengeBadge";
import { HomeAppNavigation } from "@/components/landing/HomeAppNavigation";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { MobileHomepage } from "@/components/landing/MobileHomepage";

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
    links: [
      { rel: "preload", as: "image", href: "/media/hero/hero-norte-recorte.webp", fetchPriority: "high" },
    ],
  }),
});

const NAV: [string, string][] = [
  ["A plataforma", "#plataforma"],
  ["Concursos", "#concursos"],
  ["Planos", "#planos"],
];

const HOME_SECTION_IDS = ["plataforma", "concursos", "planos"] as const;

const EXPLORE_LINKS: [string, string][] = [
  ["Ferramentas", "#ferramentas"],
  ["Carreiras", "#carreiras"],
  ["Desafio diário", "/desafio-diario"],
  ["Planos e condições", "#planos"],
];
const INSTITUTIONAL_LINKS: [string, string][] = [
  ["Nossa história", "/sobre"],
  ["Privacidade", "/privacy"],
  ["Termos de uso", "/terms"],
  ["Central de suporte", "/suporte"],
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
      <span className="home-eyebrow home-signal">{kicker}</span>
      <h2>{children}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
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
          {TOOLS.map(({ icon: Icon, title, text, featured }) => (
            <details
              key={title}
              name="preparation-tools"
              className={`home-preparation__tool${featured ? " home-preparation__tool--featured" : ""}`}
            >
              <summary>
                <Icon aria-hidden="true" />
                <span>{title}</span>
                {featured && <span className="home-preparation__tool-tag">Destaque</span>}
                <Plus aria-hidden="true" />
              </summary>
              <p>{text}</p>
            </details>
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
  const activeSection = useHomeSection(HOME_SECTION_IDS);
  const [introPlaying, setIntroPlaying] = useState(false);
  const [introSettled, setIntroSettled] = useState(false);
  const [menuKeyboard, setMenuKeyboard] = useState(false);
  const [compactHero, setCompactHero] = useState(false);
  useEffect(() => {
    const media = matchMedia("(max-width: 1100px)");
    const update = () => setCompactHero(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <div className="home">
      <div className="home-backdrop" aria-hidden="true"><TacticalClockBackdrop /></div>
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
              <a key={href} href={href} aria-current={activeSection === href.slice(1) ? "location" : undefined}>
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
                <button
                  type="button"
                  className="home-menu-trigger"
                  aria-label="Abrir menu"
                  onPointerDown={() => setMenuKeyboard(false)}
                  onKeyDown={() => setMenuKeyboard(true)}
                >
                  <Menu />
                </button>
              </SheetTrigger>
              <SheetContent
                className="home-menu"
                data-keyboard={menuKeyboard || undefined}
                onKeyDownCapture={() => setMenuKeyboard(true)}
                menuMotion="popover"
                overlayClassName={`home-menu-overlay${menuKeyboard ? " home-menu-overlay--keyboard" : ""}`}
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
                <div className="home-menu__groups">
                  <details className="home-menu__group" open>
                    <summary>Explore<ChevronRight aria-hidden="true" /></summary>
                    <nav aria-label="Navegação móvel">
                      {[...NAV, ...EXPLORE_LINKS.filter(([, href]) => href !== "#planos")].map(([label, href]) => (
                        <SheetClose asChild key={href}>
                          <a href={href}>{label}<ChevronRight aria-hidden="true" /></a>
                        </SheetClose>
                      ))}
                    </nav>
                  </details>
                  <details className="home-menu__group">
                    <summary>Institucional<ChevronRight aria-hidden="true" /></summary>
                    <nav aria-label="Informações institucionais">
                      {INSTITUTIONAL_LINKS.map(([label, href]) => (
                        <SheetClose asChild key={href}>
                          <a href={href}>{label}<ChevronRight aria-hidden="true" /></a>
                        </SheetClose>
                      ))}
                    </nav>
                  </details>
                  <details className="home-menu__group">
                    <summary>Contato e localização<ChevronRight aria-hidden="true" /></summary>
                    <div className="home-menu__contact">
                      <address><MapPin aria-hidden="true" /><span>Rua Joel Fereira de Sousa, Bela Vista<br />Feijó, Acre · CEP 69960-000</span></address>
                      <a href="mailto:francdenis2026@gmail.com"><Mail aria-hidden="true" /><span>E-mail<small>francdenis2026@gmail.com</small></span></a>
                      <a href="https://wa.me/5568992031340" target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" /><span>WhatsApp<small>(68) 99203-1340 · abre em nova aba</small></span></a>
                    </div>
                  </details>
                </div>
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

      <MobileHomepage />
      <main id="conteudo" className="desktop-homepage" tabIndex={-1}>
        <section id="inicio" className="home-hero" aria-labelledby="home-title" data-intro={introPlaying}>
          <HeroVideo onIntroChange={setIntroPlaying} onIntroSettled={() => setIntroSettled(true)} />
          <HeroBadge show={introSettled} />
          <TacticalCrosshair />
          <div className="home-container home-hero__content" inert={introPlaying}>
            <div className="home-hero__grid">
              <div className="home-hero__copy">
                <span className="home-eyebrow home-signal">
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
                    data-aim
                  >
                    Começar grátis
                    <ArrowUpRight />
                  </Link>
                  <a href="#plataforma" className="home-hero__explore" data-aim>
                    Conhecer a plataforma
                    <ArrowRight />
                  </a>
                </div>
                <div className="home-hero__study-entry" aria-label="Comece sua preparação" data-aim>
                  <TestingSeal />
                  <div className="home-hero__study-links">
                    <QuestionCountBadge />
                  </div>
                </div>
              </div>
            </div>
            <ul className="home-trust" aria-label="Diferenciais" tabIndex={0}>
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

        <section className="home-daily-feature home-container" aria-labelledby="daily-feature-title">
          <div className="home-daily-feature__copy">
            <span className="home-signal"><span /> RITMO DIÁRIO</span>
            <h2 id="daily-feature-title">Constância hoje. Mais preparo para a prova.</h2>
            <p>Treine com 10 questões oficiais por dia, sem cadastro. Confira os comentários e retome amanhã para manter seu ritmo.</p>
          </div>
          <div className="home-daily-feature__card"><DailyChallengeBadge /></div>
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
                <span className="home-preparation__eyebrow home-signal">01 · Prepare-se para sua carreira</span>
                <h2 id="preparation-title">Uma plataforma.<br /><em>A sua carreira.</em></h2>
                <p>Do edital ao treino: teoria, questões, revisão e desempenho para estudar com uma prioridade clara.</p>
              </div>
              <PreparationInfo />
            </div>
          </div>
        </section>

        <section id="concursos" className="home-section home-operations">
          <img
            className="home-operations__art"
            src="/media/hero/carreiras-background.webp"
            alt=""
            width={1926}
            height={816}
            loading="lazy"
            decoding="async"
          />
          <div className="home-container">
            <div className="home-operations__heading">
              <Head
                kicker="02 · Seu foco começa no Acre"
                lead="PC-AC em destaque. Provas da IDECAN e de outras bancas para transformar seu objetivo em prática."
              >
                Seu próximo <em>objetivo.</em>
              </Head>
            </div>
            <ContestShowcase />
          </div>
        </section>

        <PlansSection />

      </main>

      <footer className="home-footer home-footer--command">
        <div className="home-container">
          <div className="home-footer__grid">
            <div className="home-footer__brand">
              <div>
                <NorteBrand />
                <p>Preparação para carreiras policiais.</p>
                <div className="home-footer__access" aria-label="Acesse sua conta">
                  <Link to="/auth" search={{ mode: undefined }}>Entrar <LogIn aria-hidden="true" /></Link>
                  <Link to="/auth" search={{ mode: "register" }}>Começar grátis <ArrowUpRight aria-hidden="true" /></Link>
                </div>
              </div>
            </div>
            <FooterColumn
              title="Explore"
              compact={compactHero}
              links={EXPLORE_LINKS}
            />
            <FooterColumn
              title="Institucional"
              compact={compactHero}
              links={INSTITUTIONAL_LINKS}
            />
            <a
              className="home-platform-qr"
              href="https://norteconcursos.xyz/"
              aria-label="Abrir a plataforma Norte Concurso. Aponte a câmera do celular para o QR Code."
            >
              <img
                src="/media/brand/platform-qr.svg"
                width={128}
                height={128}
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
          <section className="home-footer__contact" aria-labelledby="footer-contact-title">
            <h3 id="footer-contact-title" className="sr-only">Endereço e contato</h3>
            <div className="home-footer__contact-grid">
              {compactHero ? (
                <details className="home-footer__address">
                  <summary><MapPin aria-hidden="true" /><span>Feijó · Acre</span><ChevronRight aria-hidden="true" /></summary>
                  <address>Rua Joel Fereira de Sousa, Bela Vista · Feijó, AC · CEP 69960-000</address>
                </details>
              ) : (
                <div className="home-footer__contact-card">
                  <MapPin aria-hidden="true" />
                  <address>Rua Joel Fereira de Sousa, Bela Vista · Feijó, AC · <span className="whitespace-nowrap">CEP 69960-000</span></address>
                </div>
              )}
              <a className="home-footer__contact-card" href="mailto:francdenis2026@gmail.com" aria-label="Enviar e-mail para francdenis2026@gmail.com">
                <Mail aria-hidden="true" />
                <span className="home-footer__contact-detail">francdenis2026@gmail.com</span>
                <span className="home-footer__contact-label">E-mail</span>
              </a>
              <a
                className="home-footer__contact-card"
                href="https://wa.me/5568992031340"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Conversar pelo WhatsApp: (68) 99203-1340 (abre em nova aba)"
              >
                <MessageCircle aria-hidden="true" />
                <span className="home-footer__contact-detail">WhatsApp · (68) 99203-1340</span>
                <span className="home-footer__contact-label">WhatsApp</span>
              </a>
            </div>
          </section>
          <div className="home-footer__bottom">
            <span>© 2026 Norte Concursos. Todos os direitos reservados.</span>
            <span className="home-footer__credit">Designed by Franc Denis · Feijó, Acre</span>
          </div>
        </div>
      </footer>
      <HomeAppNavigation />
    </div>
  );
}

function FooterColumn({ title, links, compact = false }: { title: string; links: [string, string][]; compact?: boolean }) {
  const visibleLinks = compact ? links.slice(0, 2) : links;
  const list = (
    <ul>
      {visibleLinks.map(([label, href]) => (
        <li key={label}><a href={href}>{label}</a></li>
      ))}
    </ul>
  );
  if (compact) return (
    <details className="home-footer__section" name="home-footer-sections">
      <summary>{title}<Plus aria-hidden="true" /></summary>
      <nav className="home-footer__links" aria-label={title}>{list}</nav>
    </details>
  );
  return <nav className="home-footer__links" aria-label={title}><h3>{title}</h3>{list}</nav>;
}
