import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  Check,
  ChevronRight,
  CirclePlay,
  Clock3,
  FileSearch,
  Flame,
  Gavel,
  LineChart,
  Menu,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NorteBrand } from "@/components/brand/NorteBrand";

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
      { property: "og:title", content: "Norte Concurso — Sua preparação entra em operação" },
      {
        property: "og:description",
        content: "Treino orientado por dados para quem escolheu servir e proteger.",
      },
      { property: "og:image", content: "/media/hero-home-police-v2.png" },
    ],
  }),
});

const tools = [
  {
    icon: BookOpenCheck,
    title: "Banco policial",
    text: "Questões de PF, PRF, Polícias Civis, Penais e Militares organizadas por banca e edital.",
  },
  {
    icon: BrainCircuit,
    title: "Treinador tático",
    text: "Sessões rápidas com correção imediata, explicação pedagógica e fonte jurídica.",
  },
  {
    icon: Trophy,
    title: "Simulador de prova",
    text: "Cronômetro, mapa de questões e diagnóstico por disciplina no ritmo da prova real.",
  },
  {
    icon: FileSearch,
    title: "Caderno de erros",
    text: "Transforme cada falha em uma ordem de revisão clara, sem repetir estudo no escuro.",
  },
  {
    icon: Target,
    title: "Rota por edital",
    text: "Prioridades alinhadas ao cargo, à banca, ao peso das matérias e ao seu desempenho.",
  },
  {
    icon: LineChart,
    title: "Painel de inteligência",
    text: "Precisão, ritmo, lacunas e constância traduzidos em decisões para o próximo ciclo.",
  },
];
const steps = [
  [
    "01",
    "Defina a missão",
    "Escolha carreira, cargo, banca e edital para concentrar energia no que realmente pontua.",
  ],
  ["02", "Faça o reconhecimento", "Resolva um diagnóstico e identifique riscos por disciplina."],
  ["03", "Entre em treinamento", "Execute questões, revisões e blocos de foco com objetivo claro."],
  ["04", "Simule sob pressão", "Teste tempo, estratégia e domínio antes do dia decisivo."],
];
const careers = [
  "Polícia Federal",
  "Polícia Rodoviária Federal",
  "Polícias Civis",
  "Polícias Penais",
  "Polícias Militares",
  "Bombeiros Militares",
  "Perícia Criminal",
  "Guardas Municipais",
];

function Index() {
  return (
    <div className="landing-shell">
      <header className="landing-header">
        <div className="site-container flex h-16 items-center justify-between sm:h-[76px]">
          <Link to="/" aria-label="Norte Concurso — início">
            <NorteBrand light />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            <a href="#metodo">Método</a>
            <a href="#plataforma">Plataforma</a>
            <a href="#carreiras">Carreiras</a>
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <Button
              variant="ghost"
              className="text-white/80 hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link to="/auth">Entrar</Link>
            </Button>
            <Button className="premium-button" asChild>
              <Link to="/auth">
                Começar agora <ArrowRight />
              </Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white sm:hidden"
                aria-label="Abrir menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-white/10 bg-[#071a2b] text-white [&>button]:text-white [&>button]:opacity-90">
              <SheetHeader className="border-b border-white/10 pb-5 text-left">
                <SheetTitle>
                  <NorteBrand light />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 grid gap-2" aria-label="Navegação móvel">
                {[
                  ["Método", "#metodo"],
                  ["Centro de treino", "#plataforma"],
                  ["Carreiras policiais", "#carreiras"],
                ].map(([label, href]) => (
                  <SheetClose asChild key={href}>
                    <a
                      href={href}
                      className="rounded-lg border border-white/10 px-4 py-3 text-base font-bold text-white/85 hover:bg-white/10"
                    >
                      {label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-8 grid gap-3">
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="border-white/20 bg-transparent text-white"
                    asChild
                  >
                    <Link to="/auth">Entrar</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="premium-button" asChild>
                    <Link to="/auth">Começar agora</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        <section className="hero-professional">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="site-container relative z-10 grid min-h-0 items-center py-12 sm:min-h-[560px] sm:py-20 lg:min-h-[760px] lg:grid-cols-[1.08fr_.92fr] lg:py-28">
            <div className="max-w-[720px] pt-2 sm:pt-8">
              <div className="eyebrow reveal-up">
                <ShieldCheck /> Preparação especializada em segurança pública
              </div>
              <h1 className="hero-title reveal-up delay-1">
                Sua aprovação não é sorte. É <em>operação bem planejada.</em>
              </h1>
              <p className="hero-copy reveal-up delay-2">
                Conteúdo direcionado, treino por banca e simulados de alta pressão para quem mira
                Polícia Federal, PRF, Polícias Civis, Penais e Militares.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row reveal-up delay-3">
                <Button size="lg" className="premium-button h-14 px-7 text-[15px]" asChild>
                  <Link to="/auth">
                    Iniciar minha preparação <ArrowRight />
                  </Link>
                </Button>
                <a href="#plataforma" className="hero-secondary">
                  <CirclePlay /> Explorar o centro de treino
                </a>
              </div>
              <div className="hero-proof reveal-up delay-3 flex-wrap !gap-x-6 !gap-y-3">
                <span className="flex items-center gap-2 text-xs font-bold text-white/70">
                  <ScrollText className="h-4 w-4 shrink-0 text-emerald-300" />
                  Questões oficiais e autorais auditadas
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-white/70">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
                  Sem cartão de crédito para começar
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-white/70">
                  <Clock3 className="h-4 w-4 shrink-0 text-emerald-300" />
                  Evolução medida em cada sessão
                </span>
              </div>
            </div>
            <div className="hidden lg:block" aria-hidden="true">
              <div className="floating-metric metric-one">
                <span className="metric-icon">
                  <Target />
                </span>
                <div>
                  <small>Meta semanal</small>
                  <strong>82% concluída</strong>
                </div>
                <span className="metric-up">+12%</span>
              </div>
              <div className="floating-metric metric-two">
                <span className="metric-icon gold">
                  <Flame />
                </span>
                <div>
                  <small>Sequência de estudos</small>
                  <strong>21 dias</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-stats">
            <div className="site-container grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
              <div>
                <strong>PF · PRF</strong>
                <span>carreiras federais</span>
              </div>
              <div>
                <strong>PC · PP</strong>
                <span>civis e penais</span>
              </div>
              <div>
                <strong>PM · CBM</strong>
                <span>militares e bombeiros</span>
              </div>
              <div>
                <strong>1 comando</strong>
                <span>treino, prova e evolução</span>
              </div>
            </div>
          </div>
        </section>

        <section id="metodo" className="mobile-optional-section section-pad bg-[#f6f8fb]">
          <div className="site-container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">Protocolo Norte</span>
                <h2>Preparação é estratégia, não improviso.</h2>
              </div>
              <p>
                Um ciclo objetivo para transformar edital, desempenho e tempo disponível em uma
                rotina executável até a prova.
              </p>
            </div>
            <div className="method-grid">
              {steps.map(([number, title, text], index) => (
                <article className="method-card" key={number}>
                  <span className="method-number">{number}</span>
                  <div className="method-line">
                    <span style={{ width: `${25 * (index + 1)}%` }} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <ChevronRight className="method-arrow" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="plataforma" className="section-pad overflow-hidden">
          <div className="site-container grid items-center gap-16 lg:grid-cols-[.95fr_1.05fr]">
            <div className="dashboard-showcase">
              <div className="showcase-glow" />
              <div className="mock-window">
                <div className="mock-top">
                  <NorteBrand />
                  <span>Visão geral</span>
                  <span className="mock-avatar">FD</span>
                </div>
                <div className="mock-body">
                  <div className="mock-sidebar">
                    {[Target, BarChart3, BookOpenCheck, Trophy].map((Icon, i) => (
                      <span className={i === 0 ? "active" : ""} key={i}>
                        <Icon />
                      </span>
                    ))}
                  </div>
                  <div className="mock-content">
                    <small>SALA DE COMANDO</small>
                    <h3>Próxima missão: Direito Penal.</h3>
                    <div className="mock-metrics">
                      <div>
                        <span>Taxa de acerto</span>
                        <strong>76,4%</strong>
                        <i>+8,2%</i>
                      </div>
                      <div>
                        <span>Questões hoje</span>
                        <strong>42</strong>
                        <i>meta 60</i>
                      </div>
                    </div>
                    <div className="mock-chart">
                      <div className="chart-label">
                        <span>Evolução por semana</span>
                        <strong>+18%</strong>
                      </div>
                      <div className="chart-bars">
                        {[38, 48, 42, 62, 58, 76, 88].map((h, i) => (
                          <span key={i} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="showcase-badge">
                <BrainCircuit />
                <div>
                  <small>INTELIGÊNCIA NORTE</small>
                  <strong>Rota atualizada</strong>
                </div>
                <Check />
              </div>
            </div>
            <div>
              <span className="section-kicker">Centro de operações</span>
              <h2 className="feature-title">Cada dado aponta para a próxima ação.</h2>
              <p className="feature-copy">
                Questões, simulados, rotina e desempenho trabalham no mesmo painel para você entrar
                em cada sessão sabendo o que treinar e por quê.
              </p>
              <div className="feature-list">
                {(
                  [
                    ["Diagnóstico por disciplina e banca", FileSearch],
                    ["Prioridade ajustada ao seu desempenho", BrainCircuit],
                    ["Indicadores claros para decidir rápido", LineChart],
                  ] as [string, LucideIcon][]
                ).map(([label, Icon]) => (
                  <div key={label}>
                    <span>
                      <Icon />
                    </span>
                    <p>{label}</p>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-8 h-12 rounded-xl border-slate-300 px-6"
                asChild
              >
                <Link to="/auth">
                  Conhecer o centro de treino <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mobile-optional-section section-pad bg-[#071a2f] text-white">
          <div className="site-container">
            <div className="section-heading light">
              <div>
                <span className="section-kicker">Equipamento de preparação</span>
                <h2>Ferramentas para cada fase da missão.</h2>
              </div>
              <p>
                Do primeiro diagnóstico ao último simulado: um fluxo contínuo de treino, correção e
                ajuste.
              </p>
            </div>
            <div className="tools-grid">
              {tools.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <span>
                    <Icon />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link to="/auth">
                    Acessar plataforma <ArrowRight />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="carreiras" className="mobile-optional-section section-pad career-section">
          <div className="site-container text-center">
            <span className="section-kicker">Foco total em segurança pública</span>
            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold tracking-[-.04em] text-primary md:text-5xl">
              A plataforma de quem escolheu servir e proteger.
            </h2>
            <div className="career-cloud">
              {careers.map((career, i) => (
                <span key={career} className={i < 3 ? "featured" : ""}>
                  <ShieldCheck />
                  {career}
                </span>
              ))}
            </div>
            <div className="testimonial-card">
              <Gavel className="h-8 w-8" aria-hidden="true" />
              <h3 className="mt-5 text-center text-xl font-black tracking-tight text-primary">
                Base de estudo com rastreabilidade jurídica
              </h3>
              <ul className="mx-auto mt-6 max-w-xl space-y-3 text-left text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Questões jurídicas sinalizam fonte, referência e data de verificação quando
                  aplicável.
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Leis federais no texto compilado do Planalto; súmulas e jurisprudência, no
                  tribunal competente.
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Conteúdos auditados são identificados para você saber exatamente o que está
                  estudando.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="site-container relative z-10 text-center">
            <span className="eyebrow mx-auto">
              <Zap /> Pronto para entrar em operação
            </span>
            <h2>
              Disciplina sem estratégia desgasta.
              <br />
              Treino orientado aprova.
            </h2>
            <p>Defina sua carreira, faça o diagnóstico e comece o primeiro ciclo de treino.</p>
            <Button size="lg" className="premium-button mt-8 h-14 px-8" asChild>
              <Link to="/auth">
                Começar gratuitamente <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="site-container grid gap-12 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <NorteBrand light />
            <p className="mt-5 max-w-xs">
              Inteligência de estudo para as carreiras que protegem o Brasil.
            </p>
          </div>
          <FooterColumn title="Plataforma" links={["Método", "Ferramentas", "Carreiras"]} />
          <FooterColumn
            title="Institucional"
            links={["Sobre nós", "Privacidade", "Termos de uso", "Suporte"]}
          />
          <div>
            <h4>Segurança</h4>
            <p className="mt-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" /> Dados protegidos
            </p>
          </div>
        </div>
        <div className="site-container flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <span>© 2026 Norte Concurso. Todos os direitos reservados.</span>
          <span>Feito no Acre para todo o Brasil.</span>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  const destinations: Record<string, string> = {
    Método: "#metodo",
    Ferramentas: "#plataforma",
    Carreiras: "#carreiras",
    "Sobre nós": "#metodo",
    Privacidade: "/privacy",
    "Termos de uso": "/terms",
    Suporte: "/auth",
  };
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <a href={destinations[link] ?? "/"}>{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
