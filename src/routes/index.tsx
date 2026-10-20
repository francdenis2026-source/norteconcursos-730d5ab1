import { StudyPresence } from "@/components/landing/StudyPresence";
import { HomeRail } from "@/components/landing/HomeRail";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
  ChevronDown,
  Plus,
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

function BulletCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduceMotion.matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    const root = cursor.closest(".home");
    root?.classList.add("has-bullet-cursor");
    let frame = 0;
    let x = -40;
    let y = -40;
    let nextX = x;
    let nextY = y;
    const move = (event: PointerEvent) => {
      nextX = event.clientX;
      nextY = event.clientY;
      cursor.classList.toggle(
        "is-action",
        Boolean((event.target as HTMLElement | null)?.closest("a,button,summary,[role='button']")),
      );
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          x += (nextX - x) * 0.28;
          y += (nextY - y) * 0.28;
          cursor.style.transform = `translate3d(${x - 8}px, ${y - 18}px, 0) rotate(28deg)`;
          frame = 0;
        });
      }
    };
    const leave = () => cursor.classList.add("is-hidden");
    const enter = () => cursor.classList.remove("is-hidden");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);
    window.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerenter", enter);
      if (frame) window.cancelAnimationFrame(frame);
      root?.classList.remove("has-bullet-cursor");
    };
  }, []);

  return (
    <span ref={cursorRef} className="home-bullet-cursor is-hidden" aria-hidden="true">
      <svg viewBox="0 0 24 34" role="presentation">
        <path d="M12 1.5 17.2 7v9.2l-2.1 14.2h-6.2L6.8 16.2V7L12 1.5Z" />
        <path d="M7 9.2h10M8.3 15.8h7.4" />
      </svg>
      <i />
    </span>
  );
}

function Index() {
  const [introPlaying, setIntroPlaying] = useState(false);
  usePointerInteractions();
  return (
    <div className="home">
      <BulletCursor />
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
          <HeroVideo onIntroChange={setIntroPlaying} />
          <div className="home-container home-hero__content" inert={introPlaying}>
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
                    Começar grátis
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
                  Seu estudo conectado.
                  <br />
                  <em>Da teoria à próxima questão.</em>
                </h2>
              </div>
              <p className="home-section-intro">
                Encontre o conteúdo, pratique e acompanhe sua evolução. Cada recurso tem um papel no
                próximo passo da sua preparação.
              </p>
            </div>
            <div className="home-platform__workspace">
              <figure className="home-platform__visual">
                <img
                  src="/media/hero/painel-aluno-estudo.webp"
                  alt="Ambiente de estudo com materiais para a preparação de concursos"
                  width={960}
                  height={640}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <BookOpenCheck aria-hidden="true" />
                  <span>
                    Do conteúdo à prática.<strong>Um lugar para seguir evoluindo.</strong>
                  </span>
                </figcaption>
              </figure>
              <div className="home-core-tools">
                {TOOLS.filter(({ featured }) => featured).map(
                  ({ icon: Icon, title, text }, index) => (
                    <article className="home-core-tool" key={title}>
                      <span className="home-core-tool__number">0{index + 1}</span>
                      <div>
                        <h3>
                          <Icon aria-hidden="true" />
                          {title}
                        </h3>
                        <p>{text}</p>
                      </div>
                    </article>
                  ),
                )}
                <Link to="/auth" search={{ mode: "register" }} className="home-text-link">
                  Organizar minha preparação <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="home-tools" aria-label="Mais recursos de estudo">
              {TOOLS.filter(({ featured }) => !featured).map(({ icon: Icon, title, text }) => (
                <details key={title} className="home-tool">
                  <summary>
                    <Icon aria-hidden="true" />
                    <h3>{title}</h3>
                    <Plus aria-hidden="true" />
                  </summary>
                  <p>{text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="como" className="home-section home-method">
          <div className="home-container">
            <div className="home-method__intro">
              <Head
                kicker="Como funciona"
                lead="Um ciclo objetivo para transformar edital, desempenho e tempo disponível em uma rotina até a prova."
              >
                Cada etapa tem <em>um propósito.</em>
              </Head>
              <figure className="home-method__visual">
                <img
                  src="/media/hero/journey.webp"
                  alt="Pessoa organizando uma jornada de estudos para a prova"
                  width={960}
                  height={540}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>Da primeira meta ao dia da prova.</figcaption>
              </figure>
            </div>
            <ol className="home-steps">
              {STEPS.map(([Icon, title, text], index) => (
                <li key={title}>
                  <div className="home-step__top">
                    <span>0{index + 1}</span>
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
              lead="Provas para praticar agora e uma próxima oportunidade para começar a se preparar."
            >
              Seu próximo <em>objetivo.</em>
            </Head>
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

        <section id="carreiras" className="home-section home-careers">
          <div className="home-container home-careers__layout">
            <div>
              <Head kicker="Para quem escolheu servir e proteger">
                Uma plataforma.
                <br />
                <em>A sua carreira.</em>
              </Head>
            </div>
            <div className="home-careers__grid">
              {CAREERS.map(([name, roles]) => (
                <div className="home-career" key={name}>
                  <div>
                    <h3>{name}</h3>
                    <p>{roles}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-interstitial" aria-label="Preparação orientada para carreiras policiais">
          <div className="home-container">
            <figure className="home-interstitial__frame">
              <img
                src="/media/hero/home-interstitial.webp"
                alt="Profissional de segurança pública em uma paisagem urbana noturna"
                width={2048}
                height={683}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="home-interstitial__content">
                <span className="home-eyebrow">Norte · operação</span>
                <strong>Treino com direção.</strong>
                <span>Fonte, carreira e prática em um só caminho.</span>
                <Link to="/auth" search={{ mode: "register" }} className="home-button home-button--gold">
                  Começar grátis <ArrowUpRight aria-hidden="true" />
                </Link>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="home-sources" aria-label="Rastreabilidade jurídica">
          <div className="home-container">
            <div className="home-sources__layout">
              <details className="home-source-details">
                <summary>
                  <ShieldCheck aria-hidden="true" />
                  <span>
                    Conteúdo jurídico com fonte e verificação de vigência
                    <small>Conheça os critérios de revisão</small>
                  </span>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <p>
                  Cada item jurídico fica ligado ao edital ativo, à fonte oficial e à verificação de
                  vigência.
                </p>
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
              </details>
            </div>
          </div>
        </section>

        <PlansSection />

        <section className="home-final" aria-labelledby="home-final-title">
          <img
            className="home-final__image"
            src="/media/hero/lineup-carreiras-ajustada.webp"
            alt=""
            aria-hidden="true"
            width={1896}
            height={830}
            loading="lazy"
          />
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
            <span>© 2026 Norte Concurso. Todos os direitos reservados.</span>
            <span>Desenvolvido por Franc D'nis</span>
            <span>Feijó, Acre · 08°09′S 70°21′W</span>
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
