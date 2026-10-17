import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
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
  Check,
  CirclePlay,
  Compass,
  FileSearch,
  Landmark,
  LineChart,
  Map as MapIcon,
  Menu,
  LogIn,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
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

const ROLES = [
  "Agente da Polícia Federal",
  "Escrivão PF",
  "Delegado de Polícia",
  "Policial Rodoviário Federal",
  "Investigador de Polícia",
  "Perito Criminal",
  "Policial Penal",
  "Soldado PM",
  "Bombeiro Militar",
  "Guarda Municipal",
];

const STEP_HUES = ["gold", "sky", "emerald", "rose"] as const;
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

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function Head({ kicker, children, lead }: { kicker: string; children: React.ReactNode; lead?: string }) {
  return (
    <div className="hp-head">
      <span className="hp-kicker">{kicker}</span>
      <h2 className="hp-h2">{children}</h2>
      {lead && <p className="hp-lead">{lead}</p>}
    </div>
  );
}

function Index() {
  const scrolled = useScrolled();
  const [heroReady, setHeroReady] = useState(false);

  return (
    <div className={`lp hp${heroReady ? " is-ready" : " is-intro"}`}>
      <header className="lp-header" data-scrolled={scrolled}>
        <div className="lp-container lp-header__bar">
          <Link to="/" aria-label="Norte Concurso — início">
            <NorteBrand light />
          </Link>
          <nav className="lp-nav" aria-label="Navegação principal">
            {NAV.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="lp-header__actions">
            <Link to="/auth" search={{ mode: undefined }} className="lp-header__login">
              <LogIn aria-hidden="true" /> Entrar
            </Link>
            <Link to="/auth" search={{ mode: "register" }} className="btn-brass">
              Começar grátis <ArrowRight />
            </Link>
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <button type="button" className="lp-menu-btn" aria-label="Abrir menu">
                  <Menu />
                </button>
              </SheetTrigger>
              <SheetContent className="lp-sheet flex flex-col">
                <SheetHeader className="text-left">
                  <SheetTitle>
                    <NorteBrand light />
                  </SheetTitle>
                </SheetHeader>
                <p className="lp-sheet__intro">Estude com direção para a carreira que você escolheu.</p>
                <span className="lp-sheet__label">Explorar</span>
                <nav className="lp-sheet-nav" aria-label="Navegação móvel">
                  {NAV.map(([label, href]) => (
                    <SheetClose asChild key={href}>
                      <a href={href}>
                        {label} <ArrowUpRight />
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto grid gap-3 pt-10">
                  <span className="lp-sheet__label">Acesso rápido</span>
                  <SheetClose asChild>
                    <Link to="/auth" search={{ mode: "register" }} className="btn-brass">
                      Começar grátis <ArrowRight />
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/auth" search={{ mode: undefined }} className="btn-glass">
                      Já tenho conta
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        <section className={`lp-hero${heroReady ? " is-ready" : ""}`}>
          <div className="lp-hero__media" aria-hidden="true">
            <HeroVideo onDone={() => setHeroReady(true)} />
          </div>
          <div className="lp-hero__shade" aria-hidden="true" />
          <div className="lp-hero__grid" aria-hidden="true" />
          <div className="lp-container lp-hero__body">
            <div className="lp-hero__layout">
              <div className="lp-hero__content">
                <span className="chip-brass">
                  <Compass /> Preparação para segurança pública
                </span>
                <h1 className="lp-hero__title">
                  Sua aprovação não é sorte.
                  <em>É operação bem planejada.</em>
                </h1>
                <p className="lp-hero__lead">
                  Conteúdo direcionado, treino por banca e simulados de alta pressão para quem mira
                  Polícia Federal, PRF, Polícias Civis, Penais e Militares.
                </p>
                <div className="lp-hero__ctas">
                  <Link to="/auth" search={{ mode: "register" }} className="btn-brass">
                    Iniciar minha preparação <ArrowRight />
                  </Link>
                  <a href="#plataforma" className="btn-glass">
                    <CirclePlay /> Conhecer a plataforma
                  </a>
                </div>
                <ul className="lp-hero__pillars" aria-label="Diferenciais">
                  {(
                    [
                      [BadgeCheck, "emerald", "Edital e lei vigentes conferidos"],
                      [Target, "sky", "Treino por banca e disciplina"],
                      [Timer, "rose", "Simulados sob pressão"],
                    ] as const
                  ).map(([Icon, hue, label]) => (
                    <li key={label}>
                      <i className="app-ico" data-hue={hue} aria-hidden="true">
                        <Icon />
                      </i>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="lp-hero__panel" aria-label="Destaques">
                <TestingSeal />
                <DailyChallengeBadge />
                <QuestionCountBadge />
              </aside>
            </div>
            <div className="lp-hero__aside" aria-hidden="true">
              <span className="lp-coord">
                <b>N</b> · 08°09′S 70°21′W
              </span>
              <span className="lp-coord">FEIJÓ — ACRE — BRASIL</span>
            </div>
          </div>
          <div className="lp-rail">
            <div className="lp-container lp-rail__grid">
              {(
                [
                  [Landmark, "sky", "Federais", "PF · PRF"],
                  [ShieldCheck, "emerald", "Estaduais", "Civil · Penal"],
                  [Trophy, "orange", "Militares", "PM · Bombeiros"],
                  [Compass, "gold", "Metodologia", "Ciclo completo"],
                ] as const
              ).map(([Icon, hue, label, value]) => (
                <div className="lp-rail__item" key={label}>
                  <i className="app-ico" data-hue={hue} aria-hidden="true">
                    <Icon />
                  </i>
                  <div className="lp-rail__text">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="lp-marquee" aria-hidden="true">
          <div className="lp-marquee__track">
            {[...ROLES, ...ROLES].map((role, i) => (
              <span className="lp-marquee__item" key={`${role}-${i}`}>
                {role}
              </span>
            ))}
          </div>
        </div>

        <PcprExamPromo />

        <section className="hp-section" aria-label="Campanha PCAC 2026">
          <div className="lp-container">
            <div className="hp-campaign hp-campaign--image">
              <div>
                <div className="hp-campaign__emblems" aria-label="Identidade institucional do Acre">
                  <img src="/media/brasao-acre-oficial.svg" alt="Brasão do Estado do Acre" />
                  <img
                    src="/media/brasao-pcac-oficial.jpg"
                    alt="Brasão da Polícia Civil do Acre"
                  />
                </div>
                <h3>PCAC 2026: sua próxima missão começa agora</h3>
                <p>
                  O novo concurso da Polícia Civil do Acre foi anunciado, com vagas previstas para
                  Delegado, Oficial Investigador e Perito. Comece a treinar desde já.
                </p>
              </div>
              <figure className="hp-campaign__visual">
                <img
                  src="/media/hero/landing-pcac.webp"
                  alt="Composição ilustrativa de profissionais da Polícia Civil do Acre"
                  width={1672}
                  height={941}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="hp-campaign__side">
                <Link to="/auth" search={{ mode: "register" }} className="btn-brass">
                  Quero me preparar <ArrowRight />
                </Link>
                <span className="hp-campaign__status">
                  <CalendarClock className="h-3.5 w-3.5" /> Edital ainda não publicado
                </span>
                <small>
                  Campanha educacional independente, sem vínculo ou endosso do Governo do Acre ou
                  da Polícia Civil.
                </small>
              </div>
            </div>
          </div>
        </section>

        <section id="como" className="hp-section hp-section--tint">
          <div className="lp-container">
            <Head
              kicker="Como funciona"
              lead="Um ciclo objetivo que transforma edital, desempenho e tempo disponível em uma rotina executável até a prova."
            >
              Preparação é estratégia, <em>não improviso.</em>
            </Head>
            <ol className="hp-grid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {STEPS.map(([Icon, title, text], i) => (
                <li className="hp-card" key={title}>
                  <div className="hp-card__top">
                    <span className="hp-ico" data-hue={STEP_HUES[i]}>
                      <Icon />
                    </span>
                    <span className="hp-step__n">0{i + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="ferramentas" className="hp-section">
          <div className="lp-container">
            <Head
              kicker="Ferramentas"
              lead="Questões, simulados, rotina e desempenho no mesmo painel: você entra em cada sessão sabendo o que treinar e por quê."
            >
              Cada dado aponta para a <em>próxima ação.</em>
            </Head>
            <div className="hp-grid hp-tools">
              {TOOLS.map(({ icon: Icon, title, text, lead }) => (
                <article key={title} className={`hp-card${lead ? " hp-card--lead" : ""}`}>
                  <span className="hp-ico">
                    <Icon />
                  </span>
                  <h3>
                    {title}
                    {lead && <span className="hp-badge">Principal</span>}
                  </h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="carreiras" className="hp-section hp-section--photo">
          <div className="lp-container">
            <Head kicker="Para quem é">
              A plataforma de quem escolheu <em>servir e proteger.</em>
            </Head>
            <div className="hp-grid hp-careers">
              {CAREERS.map(([name, roles], i) => (
                <div className="hp-career" key={name}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <strong>{name}</strong>
                  <small>{roles}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hp-section" aria-label="Rastreabilidade jurídica">
          <div className="lp-container">
            <Head
              kicker="Rastreabilidade jurídica"
              lead="Cada item jurídico fica ligado ao edital ativo, à fonte oficial e à verificação de vigência."
            >
              Estude o que é <em>vigente.</em> Com fonte.
            </Head>
            <div className="hp-grid" style={{ ["--hp-min" as string]: "280px" }}>
              {PILLARS.map(({ icon: Icon, title, text }) => (
                <article className="hp-card" key={title}>
                  <span className="hp-ico">
                    <Icon />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PlansSection />

        <section className="hp-final" aria-labelledby="hp-final-title">
          <div className="lp-container">
            <div className="hp-final__box">
              <span className="chip-brass">
                <Sparkles /> Pronto para entrar em operação
              </span>
              <h2 id="hp-final-title" className="hp-h2">
                Disciplina sem estratégia desgasta. <em>Treino orientado aprova.</em>
              </h2>
              <p className="hp-lead">
                Defina sua carreira, faça o diagnóstico e comece o primeiro ciclo de treino.
              </p>
              <div className="hp-final__actions">
                <Link to="/auth" search={{ mode: "register" }} className="btn-brass">
                  Começar gratuitamente <ArrowRight />
                </Link>
                <Link to="/desafio-diario" className="btn-glass">
                  <BookOpenCheck /> Fazer o desafio diário
                </Link>
              </div>
              <img
                className="hp-final__img"
                src="/media/hero/lineup-carreiras-ajustada.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-container lp-footer__grid">
          <div className="lp-footer__brand">
            <NorteBrand light />
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
        </div>
        <div className="lp-container lp-footer__bottom">
          <span>© 2026 Norte Concurso. Todos os direitos reservados.</span>
          <span className="lp-footer__dev">Desenvolvido por Franc D'nis</span>
          <span className="lp-coord">
            <b>N</b> · De Feijó-Acre para todo o Brasil
          </span>
        </div>
      </footer>
    </div>
  );
}

function ProductMock() {
  const progress = ["ok", "ok", "ko", "ok", "ok", "ok", "ko", "ok", "ok", "ok", "ok", "now"];
  const options: [string, string, boolean?][] = [
    ["A", "o recebimento da denúncia pelo juiz"],
    ["B", "o trânsito em julgado de sentença penal condenatória", true],
    ["C", "a prolação da sentença em primeiro grau"],
    ["D", "a confirmação da condenação em segunda instância"],
  ];
  return (
    <div className="lp-mock" aria-hidden="true">
      <div className="lp-mock__chrome">
        <span className="lp-mock__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="lp-mock__title">Treinador de questões</span>
        <span className="lp-mock__live">
          <b /> Correção imediata
        </span>
      </div>
      <div className="lp-mock__app">
        <div className="lp-mock__head">
          <div>
            <span className="lp-mock__tag">Direito Constitucional</span>
            <strong>
              Questão 12 <em>de 30</em>
            </strong>
          </div>
          <span className="lp-mock__timer">
            <Timer /> 01:42
          </span>
        </div>
        <div className="lp-mock__progress">
          {progress.map((state, i) => (
            <i key={i} className={state} />
          ))}
          {[0, 1, 2].map((i) => (
            <i key={`rest-${i}`} />
          ))}
        </div>
        <p className="lp-mock__stem">
          Segundo a Constituição Federal de 1988, a presunção de inocência prevalece até:
        </p>
        <div className="lp-mock__opts">
          {options.map(([letter, text, correct]) => (
            <div className={`lp-mock__opt${correct ? " is-correct" : ""}`} key={letter}>
              <b>{letter}</b>
              <span>{text}</span>
              {correct && (
                <small>
                  <Check /> Correta
                </small>
              )}
            </div>
          ))}
        </div>
        <div className="lp-mock__explain">
          <ScrollText />
          <div>
            <strong>Por que a alternativa B está correta</strong>
            <p>
              Ninguém será considerado culpado até o trânsito em julgado de sentença penal
              condenatória.
            </p>
            <span>
              <ShieldCheck /> CF/88, art. 5º, LVII · fonte oficial verificada
            </span>
          </div>
        </div>
        <div className="lp-mock__stats">
          <span>
            <b>83%</b> acertos
          </span>
          <span>
            <b>9</b> em sequência
          </span>
          <span className="lp-mock__ai">✦ IA explicou · salvo no caderno</span>
        </div>
      </div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4>{title}</h4>
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
