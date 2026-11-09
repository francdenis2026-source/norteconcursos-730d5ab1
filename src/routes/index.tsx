import { useHomeSection } from "@/hooks/useHomeSection";
import { TacticalClockBackdrop } from "@/components/brand/TacticalClockBackdrop";
import { ContestShowcase } from "@/components/landing/ContestShowcase";
import { HomeRankingShowcase } from "@/components/landing/HomeRankingShowcase";
import { StudyPresence } from "@/components/landing/StudyPresence";
import { PublicAchievementSignal } from "@/components/landing/PublicAchievementSignal";
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
  BookOpen,
  BrainCircuit,
  CalendarCheck,
  ChevronDown,
  Compass,
  FileSearch,
  Home,
  Landmark,
  Layers3,
  LineChart,
  Map as MapIcon,
  MapPin,
  Mail,
  MessageCircle,
  Menu,
  Plus,
  X,
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
import "@/styles/home-menu-v2.css";
import "@/styles/home-light.css";
import "@/styles/home-refinements.css";
import "@/styles/home-interactions.css";
import "@/styles/home-responsive.css";
import "@/styles/home-signals.css";
import "@/styles/home-app.css";
import "@/styles/home-touch.css";
import "@/styles/home-footer.css";
import "@/styles/nc-footer.css";
import "@/styles/home-editorial.css";
import "@/styles/hero-x.css";
import "@/styles/home-layout-fixes.css";
import "@/styles/news-banner.css";
import "@/styles/general-access-banner.css";
import { FullscreenToggle } from "@/components/landing/FullscreenToggle";
import { NewsBanner } from "@/components/landing/NewsBanner";
import { GeneralAccessBanner } from "@/components/landing/GeneralAccessBanner";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { QuestionCountBadge } from "@/components/landing/QuestionCountBadge";
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { TESTING_LABEL, TESTING_PHASE } from "@/lib/launch.config";
import { PlansSection } from "@/components/landing/PlansSection";
import { DailyChallengeBadge } from "@/components/landing/DailyChallengeBadge";
import { HomeAppNavigation } from "@/components/landing/HomeAppNavigation";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { MobileHomepage } from "@/components/landing/MobileHomepage";
import "@/styles/home-refinement.css";
import "@/styles/home-recomposition.css";
import "@/styles/home-premium-system.css";
import "@/styles/home-v2.css";
import "@/styles/home-redesign.css";
import "@/styles/home-navigation-premium.css";
import "@/styles/home-color-neutralization.css";
import "@/styles/home-announcements-refined.css";
import "@/styles/home-hero-editorial.css";
import "@/styles/home-navigation-command.css";
import "@/styles/home-feature-rail.css";
import "@/styles/home-glass-fixed-header.css";
import "@/styles/home-daily-challenge-premium.css";
import "@/styles/home-desktop-pro.css";
import "@/styles/home-viewport-fit.css";
import "@/styles/home-showcase-redesign.css";
import "@/styles/home-showcase-band.css";
import "@/styles/home-contests-compact.css";
import "@/styles/home-hero-strategy.css";
import "@/styles/home-hero-fit-correction.css";
import "@/styles/home-agent-fixed-background.css";
import "@/styles/home-preparation-premium.css";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Norte Concursos | Prepare-se com método. tem direção",
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
      {
        rel: "preload",
        as: "image",
        href: "/media/hero/hero-norte-recorte.webp",
        fetchPriority: "high",
      },
    ],
  }),
});

const HOME_SECTION_IDS = ["inicio", "plataforma", "concursos", "planos"] as const;

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

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua+Joel+Fereira+de+Sousa%2C+Bela+Vista%2C+Feij%C3%B3%2C+Acre";
/* [rótulo, id no desktop, id no celular] ou [rótulo, rota] */
const MENU_TILES: [string, string, LucideIcon, string?][] = [
  ["A plataforma", "plataforma", Compass, "mobile-recursos"],
  ["Concursos", "concursos", Landmark, "mobile-concursos"],
  ["Ferramentas", "ferramentas", BrainCircuit, "mobile-ferramentas"],
  ["Carreiras", "carreiras", Target, "mobile-inicio"],
  ["Desafio diário", "/desafio-diario", Trophy],
  ["Ajuda", "/suporte", MessageCircle],
];

function goToSection(desktopId: string, mobileId?: string) {
  const el = [desktopId, mobileId]
    .map((id) => (id ? document.getElementById(id) : null))
    .find((node) => node && node.getClientRects().length > 0);
  (el ?? document.getElementById("inicio"))?.scrollIntoView({ behavior: "smooth", block: "start" });
}

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
    title: "Planejamento individual",
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
  ["como", "Método"],
  ["carreiras", "Concursos"],
  ["fontes", "Fontes confiáveis"],
] as const;

function PreparationInfo() {
  const [active, setActive] = useState<string | null>(null);
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
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);
  const groups = [
    { id: "ferramentas", label: "Ferramentas", icon: BrainCircuit, note: "Treine, revise e acompanhe sua evolução." },
    { id: "como", label: "Método", icon: Target, note: "Um caminho claro do diagnóstico à prova." },
    { id: "carreiras", label: "Concursos", icon: ShieldCheck, note: "Trilhas para diferentes carreiras de segurança." },
    { id: "fontes", label: "Fontes confiáveis", icon: ScrollText, note: "Conteúdo com origem e referência identificadas." },
  ] as const;
  return (
    <div className="hr-preparation">
      <div className="hr-preparation__intro">
        <span className="hr-preparation__eyebrow"><i /> CONHEÇA A PLATAFORMA</span>
        <h2>Preparação inteligente. <em>Do seu jeito.</em></h2>
        <p>Reúna planejamento, treino e evolução em uma única jornada — com ferramentas pensadas para concursos da área policial.</p>
        <div className="hr-preparation__proof">
          <span><BookOpen aria-hidden="true" /> Questões por organizadora</span>
          <span><LineChart aria-hidden="true" /> Evolução acompanhada</span>
          <span><ShieldCheck aria-hidden="true" /> Conteúdo com origem verificada</span>
        </div>
      </div>
      <div className="hr-preparation__explorer">
        <div className="hr-preparation__explorer-head">
          <div><span>EXPLORE OS RECURSOS</span><strong>O que você precisa conhecer?</strong></div>
          <span className="hr-preparation__hint">{active ? "Clique novamente para recolher" : "Selecione para expandir"}</span>
        </div>
        <div className="hr-preparation__categories" role="group" aria-label="Categorias de recursos da plataforma">
          {groups.map(({ id, label, icon: Icon, note }) => (
            <button key={id} type="button" className="hr-preparation__category"
              data-active={active === id || undefined} aria-expanded={active === id}
              aria-controls="preparation-detail-panel"
              onClick={() => setActive((current) => current === id ? null : id)}>
              <span className="hr-preparation__category-icon"><Icon aria-hidden="true" /></span>
              <span className="hr-preparation__category-copy"><strong>{label}</strong><small>{note}</small></span>
              <Plus aria-hidden="true" className="hr-preparation__category-toggle" />
            </button>
          ))}
        </div>
        {active && (
          <div id="preparation-detail-panel" className="hr-preparation__details" role="region"
            aria-label={`Detalhes: ${groups.find((group) => group.id === active)?.label ?? "Preparação"}`}>
            <button type="button" className="hr-preparation__details-backdrop"
              aria-label="Fechar detalhes" onClick={() => setActive(null)} />
            <div className="hr-preparation__details-head">
              <div>
                <span>VISÃO GERAL DA PLATAFORMA</span>
                <strong>{groups.find((group) => group.id === active)?.label}</strong>
              </div>
              <button type="button" className="hr-preparation__details-close"
                onClick={() => setActive(null)} aria-label="Fechar painel">
                <X aria-hidden="true" /><span>Fechar</span>
              </button>
            </div>
            {active === "ferramentas" && (
              <div className="hr-preparation__detail-grid hr-preparation__detail-grid--tools">
                {TOOLS.map(({ icon: Icon, title, text, featured }) => (
                  <article className="hr-preparation__feature" key={title}>
                    <span><Icon aria-hidden="true" /></span>
                    <div><strong>{title}{featured && <i>EM DESTAQUE</i>}</strong><p>{text}</p></div>
                  </article>
                ))}
              </div>
            )}
            {active === "como" && (
              <ol className="hr-preparation__detail-grid hr-preparation__detail-grid--steps">
                {STEPS.map(([Icon, title, text], index) => (
                  <li className="hr-preparation__step" key={title}>
                    <b>0{index + 1}</b><div><strong><Icon aria-hidden="true" />{title}</strong><p>{text}</p></div>
                  </li>
                ))}
              </ol>
            )}
            {active === "carreiras" && (
              <div className="hr-preparation__detail-grid hr-preparation__detail-grid--careers">
                {CAREERS.map(([name, roles]) => (
                  <article className="hr-preparation__career" key={name}>
                    <ShieldCheck aria-hidden="true" /><div><strong>{name}</strong><small>{roles}</small></div>
                  </article>
                ))}
              </div>
            )}
            {active === "fontes" && (
              <div className="hr-preparation__detail-grid hr-preparation__detail-grid--sources">
                {PILLARS.map(({ icon: Icon, title, text }) => (
                  <article className="hr-preparation__source" key={title}>
                    <Icon aria-hidden="true" /><div><strong>{title}</strong><p>{text}</p></div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Index() {
  const activeSection = useHomeSection(HOME_SECTION_IDS);
  const [menuKeyboard, setMenuKeyboard] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="home home-recomposition hr-canvas">
      <PublicAchievementSignal />
      <div className="home-agent-fixed" aria-hidden="true">
        <img
          src="/media/hero/hero-norte-recorte.webp"
          alt=""
          width={1208}
          height={1302}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="home-backdrop" aria-hidden="true">
        <TacticalClockBackdrop />
      </div>
      <a href="#conteudo" className="home-skip home-skip--desktop">
        Pular para o conteúdo
      </a>
      <a href="#conteudo-mobile" className="home-skip home-skip--mobile">
        Pular para o conteúdo
      </a>
      <header className="home-header hr-header" data-scrolled={headerScrolled || undefined}>
        <div className="home-container home-header__inner">
          <div className="home-brand-lockup">
            <Link to="/" aria-label="Norte Concurso — início">
              <NorteBrand />
            </Link>
            <StudyPresence />
          </div>
          <nav className="home-nav hr-nav" aria-label="Navegação principal">
            <a href="#inicio" aria-current={activeSection === "inicio" ? "location" : undefined}>
              <Home aria-hidden="true" className="home-nav__icon" />
              <span>Início</span>
            </a>
            <a href="#plataforma" aria-current={activeSection === "plataforma" ? "location" : undefined}>
              <BookOpen aria-hidden="true" className="home-nav__icon" />
              <span>Plataforma</span>
            </a>
            <a href="#concursos" aria-current={activeSection === "concursos" ? "location" : undefined}>
              <Landmark aria-hidden="true" className="home-nav__icon" />
              <span>Concursos</span>
            </a>
            <details className="home-nav__group">
              <summary aria-label="Abrir menu de preparação">
                <Target aria-hidden="true" className="home-nav__icon" />
                <span>Preparação</span>
                <ChevronDown className="home-nav__chevron" aria-hidden="true" />
              </summary>
              <div className="home-nav__panel">
                <a href="#ferramentas">Ferramentas de estudo</a>
                <a href="#como">Como funciona</a>
                <a href="#carreiras">Carreiras policiais</a>
                <a href="#fontes">Fontes oficiais</a>
                <Link to="/desafio-diario">Desafio diário</Link>
              </div>
            </details>
            <a href="#ranking-destaque">
              <Trophy aria-hidden="true" className="home-nav__icon" />
              <span>Ranking</span>
            </a>
            <Link to="/desafio-diario" className="home-nav__route-link">
              <CalendarCheck aria-hidden="true" className="home-nav__icon" />
              <span>Desafio diário</span>
            </Link>
            <a href="#planos" aria-current={activeSection === "planos" ? "location" : undefined}>
              <Layers3 aria-hidden="true" className="home-nav__icon" />
              <span>Planos</span>
            </a>
          </nav>
          <span className="home-header__tagline" aria-hidden="true">
            Sua preparação tem direção.
          </span>
          <div className="home-header__actions">
            <Link
              to="/auth"
              search={{ mode: undefined }}
              className="home-button home-button--primary home-header__register"
            >
              <LogIn /> Entrar
            </Link>
            <FullscreenToggle />
            <ThemeToggle />
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
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
                className="home-menu hm2"
                data-keyboard={menuKeyboard || undefined}
                onKeyDownCapture={() => setMenuKeyboard(true)}
                menuMotion="popover"
                overlayClassName={`home-menu-overlay${menuKeyboard ? " home-menu-overlay--keyboard" : ""}`}
                closeLabel="Fechar menu"
              >
                <span className="hm2-bg" aria-hidden="true" />
                <SheetHeader className="hm2-header">
                  <SheetTitle>
                    <NorteBrand />
                  </SheetTitle>
                  <SheetDescription>
                    Estude com direção para a carreira que você escolheu.
                  </SheetDescription>
                </SheetHeader>
                <nav className="hm2-grid" aria-label="Navegação móvel">
                  {MENU_TILES.map(([label, target, Icon, mobileId]) =>
                    target.startsWith("/") ? (
                      <SheetClose asChild key={target}>
                        <Link to={target} className="hm2-tile">
                          <Icon aria-hidden="true" />
                          <span>{label}</span>
                        </Link>
                      </SheetClose>
                    ) : (
                      <a
                        key={target}
                        href={`#${target}`}
                        className="hm2-tile"
                        onClick={(event) => {
                          event.preventDefault();
                          setMenuOpen(false);
                          window.setTimeout(() => goToSection(target, mobileId), 380);
                        }}
                      >
                        <Icon aria-hidden="true" />
                        <span>{label}</span>
                      </a>
                    ),
                  )}
                </nav>
                <a
                  href="#planos"
                  className="hm2-plans"
                  aria-label="Ver planos"
                  onClick={(event) => {
                    event.preventDefault();
                    setMenuOpen(false);
                    window.setTimeout(() => goToSection("planos", "mobile-planos"), 380);
                  }}
                >
                  <span className="hm2-plans__lead">
                    <BadgeCheck aria-hidden="true" />
                    <span>
                      <strong>Planos</strong>
                      <small>
                        {TESTING_PHASE
                          ? `${TESTING_LABEL} grátis com tudo do Plus`
                          : "Escolha o seu ritmo"}
                      </small>
                    </span>
                  </span>
                  <span className="hm2-plans__prices" aria-hidden="true">
                    {SUBSCRIPTION_PLANS.map((plan) => (
                      <i key={plan.id} data-featured={plan.id === "plus" || undefined}>
                        {plan.name}
                        <b>
                          {plan.price === 0
                            ? "R$ 0"
                            : `R$ ${plan.price.toFixed(2).replace(".", ",")}`}
                        </b>
                      </i>
                    ))}
                  </span>
                </a>
                <section className="hm2-block" aria-labelledby="hm2-inst">
                  <h2 id="hm2-inst">Institucional</h2>
                  <ul className="hm2-chips">
                    {INSTITUTIONAL_LINKS.map(([label, href]) => (
                      <li key={href}>
                        <SheetClose asChild>
                          <Link to={href}>{label}</Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="hm2-block" aria-labelledby="hm2-contact">
                  <h2 id="hm2-contact">Contato</h2>
                  <div className="hm2-contact">
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Localização no mapa, abre em nova aba"
                    >
                      <MapPin aria-hidden="true" />
                      <span>Mapa</span>
                    </a>
                    <a href="mailto:francdenis2026@gmail.com" aria-label="Enviar e-mail">
                      <Mail aria-hidden="true" />
                      <span>E-mail</span>
                    </a>
                    <a
                      href="https://wa.me/5568992031340"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp, abre em nova aba"
                    >
                      <MessageCircle aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  <p className="hm2-address">
                    Rua Joel Fereira de Sousa, Bela Vista · Feijó, Acre · CEP 69960-000
                  </p>
                </section>
                <div className="hm2-access">
                  <SheetClose asChild>
                    <Link
                      to="/auth"
                      search={{ mode: undefined }}
                      className="home-button home-button--primary"
                    >
                      Entrar
                      <ArrowRight />
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/auth"
                      search={{ mode: "register" }}
                      className="home-button hm2-secondary"
                    >
                      Criar conta
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <GeneralAccessBanner />
      <NewsBanner />

      <MobileHomepage />
      <main id="conteudo" className="desktop-homepage hr-main" tabIndex={-1}>
        <section id="inicio" className="home-hero hr-hero" aria-labelledby="home-hero-title">
          <img
            className="home-hero__image"
            src="/media/hero/hero-norte-recorte.webp"
            alt="Agente de segurança pública em uniforme operacional"
            width={1208}
            height={1302}
            fetchPriority="high"
            decoding="async"
          />
          <div className="hx">
            <div className="hx__inner">
              <div className="hx__copy">
                <div className="hx__kicker" aria-label="Preparação para carreiras policiais">
                  <span className="hx__kicker-mark" aria-hidden="true" />
                  <span className="hx__kicker-primary">NORTE CONCURSOS · FORMAÇÃO PARA CARREIRAS POLICIAIS</span>
                  <span className="hx__kicker-secondary">MÉTODO · CONSTÂNCIA · RESULTADO</span>
                </div>
                <h1 id="home-hero-title" className="hx__headline hr-hero__headline">
                  <span>Preparação estratégica</span>
                  <span>para sua carreira <em>policial.</em></span>
                </h1>
                <p className="hx__description hr-hero__description">
                  Editais organizados, questões por banca e simulados para orientar cada etapa da sua preparação policial.
                </p>
                <div className="home-actions">
                  <Link to="/auth" search={{ mode: "register" }} className="hr-btn hr-btn--gold">
                    Iniciar preparação <ArrowRight aria-hidden="true" />
                  </Link>
                  <a href="#plataforma" className="hr-btn hr-btn--ghost">
                    Explorar a plataforma <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
                <ul className="hx__trust" aria-label="Diferenciais da plataforma">
                  <li><ShieldCheck aria-hidden="true" /><span><strong>Fontes oficiais</strong><small>Referências com origem verificada</small></span></li>
                  <li><BookOpen aria-hidden="true" /><span><strong>Questões por organizadora</strong><small>Treino direcionado por banca</small></span></li>
                  <li><Target aria-hidden="true" /><span><strong>Plano individualizado</strong><small>Rotina alinhada ao edital</small></span></li>
                  <li><Trophy aria-hidden="true" /><span><strong>Desempenho monitorado</strong><small>Indicadores de evolução</small></span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="home-daily-challenge-wrap">
          <DailyChallengeBadge />
        </div>

        <section
          id="plataforma"
          className="home-section home-preparation hr-section hr-showcase"
          aria-labelledby="preparation-title"
        >
          <div className="home-container hr-showcase__inner">
            <PreparationInfo />
          </div>
        </section>

        <section id="concursos" className="home-section home-operations hr-section hr-section--alt">
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

        <HomeRankingShowcase anchorId="ranking-destaque" />
        <PlansSection />
      </main>

      <div className="hr-footer-cta">
        <div>
          <h2>Pronto para dar o próximo passo?</h2>
          <p>Crie sua conta grátis e comece a treinar com questões, simulados e fontes oficiais ainda hoje.</p>
        </div>
        <Link to="/auth" search={{ mode: "register" }} className="hr-btn hr-btn--gold">
          Criar conta grátis <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <footer className="nc-footer">
        <div className="home-container">
          <div className="nc-footer__main">
            <div className="nc-footer__brand">
              <NorteBrand />
              <p>Preparação para carreiras policiais.</p>
            </div>
            <nav className="nc-footer__links" aria-label="Explore">
              {EXPLORE_LINKS.map(([label, href]) => (
                <Link key={label} to={href}>{label}</Link>
              ))}
            </nav>
            <nav className="nc-footer__links" aria-label="Institucional">
              {INSTITUTIONAL_LINKS.map(([label, href]) => (
                <Link key={label} to={href}>{label}</Link>
              ))}
            </nav>
            <div className="nc-footer__side">
              <a
                className="nc-footer__qr"
                href="https://norteconcursos.xyz/"
                aria-label="Abrir a plataforma Norte Concurso. Aponte a câmera do celular para o QR Code."
              >
                <img
                  src="/media/brand/platform-qr.svg"
                  width={56}
                  height={56}
                  loading="lazy"
                  alt="QR Code para https://norteconcursos.xyz/"
                />
                <span>
                  Continue no celular
                  <small>
                    norteconcursos.xyz <ArrowUpRight aria-hidden="true" />
                  </small>
                </span>
              </a>
            </div>
          </div>
          <div className="nc-footer__bar">
            <address>
              <MapPin aria-hidden="true" />
              Rua Joel Fereira de Sousa, Bela Vista · Feijó, AC · CEP 69960-000
            </address>
            <a href="mailto:francdenis2026@gmail.com" aria-label="Enviar e-mail para francdenis2026@gmail.com">
              <Mail aria-hidden="true" />
              francdenis2026@gmail.com
            </a>
            <a
              href="https://wa.me/5568992031340"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conversar pelo WhatsApp: (68) 99203-1340 (abre em nova aba)"
            >
              <MessageCircle aria-hidden="true" />
              (68) 99203-1340
            </a>
            <span className="nc-footer__copy">© 2026 Norte Concursos</span>
            <span className="nc-footer__dev-sign">
              Dev. <strong>Franc D'nis</strong> · Feijó-AC, Brasil
            </span>
          </div>
        </div>
      </footer>
      <HomeAppNavigation />
    </div>
  );
}
