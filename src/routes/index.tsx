import { useHomeSection } from "@/hooks/useHomeSection";
import { ContestShowcase } from "@/components/landing/ContestShowcase";
import { HomeRankingShowcase } from "@/components/landing/HomeRankingShowcase";
import { StudyPresence } from "@/components/landing/StudyPresence";
import { PublicAchievementSignal } from "@/components/landing/PublicAchievementSignal";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  CalendarCheck,
  Compass,
  Home,
  Landmark,
  Layers3,
  MapPin,
  Mail,
  MessageCircle,
  Menu,
  Plus,
  LogIn,
  Target,
  Trophy,
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
import { SUBSCRIPTION_PLANS } from "@/lib/subscriptions.config";
import { TESTING_LABEL, TESTING_PHASE } from "@/lib/launch.config";
import { PlansSection } from "@/components/landing/PlansSection";
import { HomeIntro } from "@/components/landing/HomeIntro";
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
import "@/styles/home-mobile-compact.css";
import "@/styles/mobile-home-polish-nov10.css";
import "@/styles/home-professional-refinement.css";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Norte Concursos | Preparação estratégica para carreiras policiais",
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

const HOME_SECTION_IDS = ["inicio", "plataforma", "concursos", "planos"] as const;

const EXPLORE_LINKS: [string, string][] = [
  ["A plataforma", "#plataforma"],
  ["Concursos", "#concursos"],
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
  ["Ranking", "ranking-destaque", Target, "ranking-destaque-mobile"],
  ["Desafio diário", "/desafio-diario", Trophy],
  ["Ajuda", "/suporte", MessageCircle],
];

function goToSection(desktopId: string, mobileId?: string) {
  const el = [desktopId, mobileId]
    .map((id) => (id ? document.getElementById(id) : null))
    .find((node) => node && node.getClientRects().length > 0);
  (el ?? document.getElementById("inicio"))?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <HomeIntro />

        <section id="concursos" className="sx-section" aria-label="Concursos em foco">
          <ContestShowcase />
        </section>

        <HomeRankingShowcase anchorId="ranking-destaque" />
        <PlansSection />
      </main>

      <div className="hr-footer-cta">
        <div>
          <h2>Comece a treinar hoje.</h2>
          <p>Conta gratuita, sem cartão.</p>
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
