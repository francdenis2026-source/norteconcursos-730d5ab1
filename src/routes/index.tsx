import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
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
  ScrollText,
  ShieldCheck,
  Sparkles,
  Timer,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NorteBrand } from "@/components/brand/NorteBrand";
import { QuestionCountBadge } from "@/components/landing/QuestionCountBadge";

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
    links: [{ rel: "preload", as: "image", href: "/media/hero/landing-hero.webp" }],
  }),
});

const NAV: [string, string][] = [
  ["Método", "#metodo"],
  ["Plataforma", "#plataforma"],
  ["Carreiras", "#carreiras"],
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

const STEPS = [
  [
    "Defina a missão",
    "Escolha carreira, cargo, banca e edital para concentrar energia no que realmente pontua.",
  ],
  ["Faça o reconhecimento", "Resolva um diagnóstico e identifique riscos por disciplina."],
  ["Entre em treinamento", "Execute questões, revisões e blocos de foco com objetivo claro."],
  ["Simule sob pressão", "Teste tempo, estratégia e domínio antes do dia decisivo."],
];

const TOOLS: { icon: LucideIcon; title: string; text: string; variant?: string }[] = [
  {
    icon: Trophy,
    title: "Simulador profissional",
    text: "Cronômetro, mapa de questões e diagnóstico por disciplina no ritmo da prova real.",
    variant: "lp-tile--brass",
  },
  {
    icon: MapIcon,
    title: "Edital eletrônico",
    text: "Cada assunto do edital vira uma porta de entrada para resumo, explicações e treino.",
  },
  {
    icon: Compass,
    title: "Plano de estudos",
    text: "Prioridades alinhadas ao cargo, à banca, ao peso das matérias e ao seu desempenho.",
  },
  {
    icon: FileSearch,
    title: "Caderno de erros",
    text: "Cada falha vira uma ordem de revisão clara, sem repetir estudo no escuro.",
  },
  {
    icon: LineChart,
    title: "Raio-X de desempenho",
    text: "Precisão, ritmo, lacunas e constância traduzidos em decisões para o próximo ciclo.",
    variant: "lp-tile--wide",
  },
  {
    icon: Timer,
    title: "Central de estudos",
    text: "Pomodoro, flashcards e cronômetro de foco no mesmo lugar.",
    variant: "lp-tile--wide",
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
    text: "Questões jurídicas sinalizam fonte, referência e data de verificação quando aplicável.",
  },
  {
    icon: Landmark,
    title: "Texto legal vigente",
    text: "Leis federais no texto compilado do Planalto; súmulas e jurisprudência, no tribunal competente.",
  },
  {
    icon: ShieldCheck,
    title: "Conteúdo auditado e identificado",
    text: "Conteúdos auditados são sinalizados para você saber exatamente o que está estudando.",
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

function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) return;
    root.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}

const delay = (n: number) => ({ "--reveal-delay": n }) as CSSProperties;

function Index() {
  const scrolled = useScrolled();
  useReveal();

  return (
    <div className="lp">
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
            <a href="#pcac" className="is-campaign">
              PCAC 2026
            </a>
          </nav>
          <div className="lp-header__actions">
            <Link to="/auth" search={{ mode: undefined }} className="lp-header__login">
              Entrar
            </Link>
            <Link to="/auth" search={{ mode: "register" }} className="btn-brass">
              Começar grátis <ArrowRight />
            </Link>
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
                <nav className="lp-sheet-nav" aria-label="Navegação móvel">
                  {[...NAV, ["PCAC 2026", "#pcac"] as [string, string]].map(([label, href]) => (
                    <SheetClose asChild key={href}>
                      <a href={href}>
                        {label} <ArrowUpRight />
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto grid gap-3 pt-10">
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
        <section className="lp-hero">
          <div className="lp-hero__media" aria-hidden="true" />
          <div className="lp-hero__shade" aria-hidden="true" />
          <div className="lp-hero__grid" aria-hidden="true" />
          <div className="lp-container lp-hero__body">
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
              <Link to="/desafio-diario" className="lp-hero__daily">
                <span className="chip-dot" aria-hidden="true" />
                <span>
                  <strong>Teste agora, sem cadastro:</strong> 10 questões oficiais grátis hoje
                </span>
                <ArrowRight />
              </Link>
              <QuestionCountBadge />
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
              {[
                ["Federais", "PF · PRF"],
                ["Estaduais", "Civil · Penal"],
                ["Militares", "PM · Bombeiros"],
                ["Metodologia", "Ciclo completo"],
              ].map(([label, value]) => (
                <div className="lp-rail__item" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
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

        <section id="pcac" className="lp-section lp-photo lp-pcac" aria-labelledby="pcac-title">
          <div className="lp-photo__media" aria-hidden="true" />
          <div className="lp-photo__shade" aria-hidden="true" />
          <div className="lp-container">
            <div className="lp-pcac__content" data-reveal>
              <div className="lp-pcac__emblems" aria-label="Identidade institucional do Acre">
                <span className="lp-pcac__emblem">
                  <img src="/media/brasao-acre-oficial.svg" alt="Brasão do Estado do Acre" />
                </span>
                <hr />
                <span className="lp-pcac__emblem">
                  <img src="/media/brasao-pcac-oficial.jpg" alt="Brasão da Polícia Civil do Acre" />
                </span>
              </div>
              <span className="lp-kicker">Campanha especial · PCAC 2026</span>
              <h2 id="pcac-title" className="lp-h2">
                PCAC: sua próxima missão <em>começa agora.</em>
              </h2>
              <p className="lp-lead">
                O novo concurso da Polícia Civil do Acre foi anunciado. Prepare-se desde agora para
                Delegado, Oficial Investigador de Polícia e Perito com treino direcionado, simulados
                e inteligência de desempenho.
              </p>
              <div className="lp-pcac__roles" aria-label="Cargos anunciados">
                {["Delegado de Polícia", "Oficial Investigador", "Perito"].map((role) => (
                  <span key={role}>
                    <Check /> {role}
                  </span>
                ))}
              </div>
              <div className="lp-pcac__actions">
                <Link to="/auth" search={{ mode: "register" }} className="btn-brass">
                  Quero me preparar para a PCAC <ArrowRight />
                </Link>
                <span className="lp-pcac__status">
                  <CalendarClock className="h-3.5 w-3.5" /> Edital ainda não publicado
                </span>
              </div>
              <p className="lp-pcac__disclaimer">
                Campanha educacional independente. A Norte Concursos não possui vínculo ou endosso
                institucional do Governo do Acre ou da Polícia Civil.
              </p>
            </div>
          </div>
        </section>

        <section id="acre" className="lp-section lp-photo lp-acre" aria-labelledby="acre-title">
          <div className="lp-photo__media" aria-hidden="true" />
          <div className="lp-photo__shade" aria-hidden="true" />
          <div className="lp-container lp-acre__grid">
            <div className="lp-acre__copy" data-reveal>
              <span className="lp-kicker">Segurança pública do Acre</span>
              <h2 id="acre-title" className="lp-h2">
                Cinco carreiras. <em>Um só compromisso.</em>
              </h2>
              <p className="lp-lead">
                Bombeiros, polícias civil, penal e federal, e o sistema socioeducativo. A Norte
                prepara você para servir o Acre e o Brasil.
              </p>
              <ul className="lp-acre__list">
                {[
                  "Corpo de Bombeiros",
                  "Polícia Civil",
                  "Polícia Penal",
                  "Socioeducativo",
                  "Polícia Federal",
                ].map((name, i) => (
                  <li key={name}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="lp-acre__stage"
              data-reveal
              style={delay(1)}
              role="img"
              aria-label="Mapa do Acre com profissionais da segurança pública"
            >
              <div className="lp-acre__map" aria-hidden="true">
                <div className="lp-acre__fill" />
              </div>
              <img
                className="lp-acre__people"
                src="/media/acre-profissionais.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section id="metodo" className="lp-section lp-photo lp-method">
          <div className="lp-photo__media" aria-hidden="true" />
          <div className="lp-photo__shade" aria-hidden="true" />
          <div className="lp-container">
            <div className="lp-head" data-reveal>
              <div>
                <span className="lp-kicker">Protocolo Norte</span>
                <h2 className="lp-h2">
                  Preparação é estratégia, <em>não improviso.</em>
                </h2>
              </div>
              <p className="lp-lead">
                Um ciclo objetivo para transformar edital, desempenho e tempo disponível em uma
                rotina executável até a prova.
              </p>
            </div>
            <ol className="lp-steps">
              {STEPS.map(([title, text], i) => (
                <li className="lp-step" key={title} data-reveal style={delay(i)}>
                  <span className="lp-step__node">0{i + 1}</span>
                  <div className="lp-step__card">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="plataforma" className="lp-section lp-platform">
          <div className="lp-container">
            <div className="lp-head" data-reveal>
              <div>
                <span className="lp-kicker">Centro de operações</span>
                <h2 className="lp-h2">
                  Cada dado aponta para a <em>próxima ação.</em>
                </h2>
              </div>
              <p className="lp-lead">
                Questões, simulados, rotina e desempenho trabalham no mesmo painel para você entrar
                em cada sessão sabendo o que treinar e por quê.
              </p>
            </div>

            <div className="lp-bento">
              <article className="lp-tile lp-tile--feature" data-reveal>
                <div className="lp-tile__copy">
                  <span className="lp-tile__icon">
                    <BrainCircuit />
                  </span>
                  <h3 className="mt-6">Treinador de questões</h3>
                  <p>
                    Sessões por banca, carreira e disciplina com correção imediata, explicação
                    pedagógica e fonte jurídica.
                  </p>
                </div>
                <ProductMock />
              </article>
              {TOOLS.map(({ icon: Icon, title, text, variant }, i) => (
                <article
                  key={title}
                  className={`lp-tile ${variant ?? ""}`}
                  data-reveal
                  style={delay((i % 3) + 1)}
                >
                  <span className="lp-tile__icon">
                    <Icon />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="carreiras" className="lp-section lp-photo lp-careers">
          <div className="lp-photo__media" aria-hidden="true" />
          <div className="lp-photo__shade" aria-hidden="true" />
          <div className="lp-container">
            <div data-reveal>
              <span className="lp-kicker">Foco total em segurança pública</span>
              <h2 className="lp-h2 max-w-[640px]">
                A plataforma de quem escolheu <em>servir e proteger.</em>
              </h2>
            </div>
            <div className="lp-careers__list" data-reveal style={delay(1)}>
              {CAREERS.map(([name, roles], i) => (
                <div className="lp-career" key={name}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{name}</strong>
                  <small>{roles}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-photo lp-trust">
          <div className="lp-photo__media" aria-hidden="true" />
          <div className="lp-photo__shade" aria-hidden="true" />
          <div className="lp-container lp-trust__inner">
            <div className="lp-trust__content" data-reveal>
              <span className="lp-kicker">Rastreabilidade jurídica</span>
              <h2 className="lp-h2">
                Estude o que é <em>vigente.</em> Com fonte.
              </h2>
              <p className="lp-lead">
                Uma base de estudo construída com governança de conteúdo: cada item jurídico ligado
                ao edital ativo, à fonte oficial e à verificação de vigência.
              </p>
              <div className="lp-pillars">
                {PILLARS.map(({ icon: Icon, title, text }) => (
                  <div className="lp-pillar" key={title}>
                    <span>
                      <Icon />
                    </span>
                    <div>
                      <strong>{title}</strong>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lp-section lp-photo lp-final">
          <div className="lp-photo__media" aria-hidden="true" />
          <div className="lp-photo__shade" aria-hidden="true" />
          <div className="lp-container" data-reveal>
            <span className="chip-brass">
              <Sparkles /> Pronto para entrar em operação
            </span>
            <h2 className="lp-h2">
              Disciplina sem estratégia desgasta. <em>Treino orientado aprova.</em>
            </h2>
            <p className="lp-lead">
              Defina sua carreira, faça o diagnóstico e comece o primeiro ciclo de treino.
            </p>
            <div className="lp-final__actions">
              <Link to="/auth" search={{ mode: "register" }} className="btn-brass">
                Começar gratuitamente <ArrowRight />
              </Link>
              <Link to="/desafio-diario" className="btn-glass">
                <BookOpenCheck /> Fazer o desafio diário
              </Link>
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
              ["Método", "#metodo"],
              ["Ferramentas", "#plataforma"],
              ["Carreiras", "#carreiras"],
              ["Desafio diário", "/desafio-diario"],
            ]}
          />
          <FooterColumn
            title="Institucional"
            links={[
              ["Privacidade", "/privacy"],
              ["Termos de uso", "/terms"],
              ["Suporte", "/auth"],
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
          <span className="lp-coord">
            <b>N</b> · De Feijó-Acre para todo o Brasil
          </span>
        </div>
      </footer>
    </div>
  );
}

function ProductMock() {
  return (
    <div className="lp-mock" aria-hidden="true">
      <div className="lp-mock__bar">
        <span className="lp-mock__crumb">
          Treino · <b>Questão 12 de 30</b>
        </span>
        <span className="lp-mock__timer">
          <Timer /> 01:42
        </span>
      </div>
      <div className="lp-mock__body">
        <div className="lp-mock__progress">
          {["ok", "ok", "ko", "ok", "ok", "ok", "ko", "ok", "ok", "ok", "ok", "now", "", "", ""].map(
            (s, i) => (
              <i key={i} className={s} />
            ),
          )}
        </div>
        <div className="lp-mock__line" style={{ width: "96%" }} />
        <div className="lp-mock__line" style={{ width: "88%" }} />
        <div className="lp-mock__line" style={{ width: "54%", marginBottom: 6 }} />
        <div className="lp-mock__opt">
          <b>A</b>
          <span className="lp-mock__line" style={{ maxWidth: "70%" }} />
        </div>
        <div className="lp-mock__opt is-correct">
          <b>B</b>
          <span className="lp-mock__line" style={{ maxWidth: "62%" }} />
          <small>Correta</small>
        </div>
        <div className="lp-mock__opt">
          <b>C</b>
          <span className="lp-mock__line" style={{ maxWidth: "78%" }} />
        </div>
        <div className="lp-mock__explain">
          <ScrollText />
          <div>
            <span className="lp-mock__line" style={{ width: "92%" }} />
            <span className="lp-mock__line" style={{ width: "70%" }} />
          </div>
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
