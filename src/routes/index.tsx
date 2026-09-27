import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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
  Landmark,
  LineChart,
  Menu,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Norte Concurso | Preparação inteligente para concursos públicos",
    meta: [
      {
        name: "description",
        content:
          "Diagnóstico de desempenho, plano adaptativo, questões e simulados para acelerar sua aprovação em concursos públicos.",
      },
      { property: "og:title", content: "Norte Concurso — Estude com direção" },
      { property: "og:description", content: "Transforme esforço em evolução mensurável." },
      { property: "og:image", content: "/hero-concurso.png" },
    ],
  }),
});

const tools = [
  {
    icon: FileSearch,
    title: "Diagnóstico de provas",
    text: "Envie suas provas e descubra padrões de erro, lacunas e oportunidades de ganho.",
  },
  {
    icon: BrainCircuit,
    title: "Plano adaptativo com IA",
    text: "Um roteiro que muda com seu desempenho, sua rotina e a proximidade da prova.",
  },
  {
    icon: BookOpenCheck,
    title: "Questões inteligentes",
    text: "Treine por banca, disciplina e dificuldade com comentários pedagógicos.",
  },
  {
    icon: Trophy,
    title: "Simulados estratégicos",
    text: "Reproduza o ritmo da prova e acompanhe sua posição em indicadores claros.",
  },
  {
    icon: LineChart,
    title: "Evolução mensurável",
    text: "Visualize constância, domínio por matéria e projeção de desempenho.",
  },
  {
    icon: Clock3,
    title: "Foco e produtividade",
    text: "Pomodoro, revisões e agenda integrados em um fluxo de estudo sustentável.",
  },
];
const steps = [
  [
    "01",
    "Defina seu alvo",
    "Escolha carreira, banca e edital para criar uma preparação sem dispersão.",
  ],
  ["02", "Mapeie seu nível", "Faça um diagnóstico inicial ou envie uma prova já realizada."],
  ["03", "Siga a rota", "Receba prioridades diárias com teoria, questões e revisões."],
  ["04", "Ajuste e avance", "A plataforma aprende com seus resultados e recalibra o plano."],
];
const careers = [
  "Polícia Federal",
  "PRF",
  "Tribunais",
  "Área Fiscal",
  "Controle",
  "Bancárias",
  "Polícias Civis",
  "Administrativas",
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className="brand-lockup">
      <span className="brand-mark">
        <Star aria-hidden="true" />
      </span>
      <span className={light ? "text-white" : "text-primary"}>
        Norte<span>Concurso</span>
      </span>
    </span>
  );
}

function Index() {
  return (
    <div className="landing-shell">
      <header className="landing-header">
        <div className="site-container flex h-[76px] items-center justify-between">
          <Link to="/" aria-label="Norte Concurso — início">
            <Brand light />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            <a href="#metodo">Método</a>
            <a href="#plataforma">Plataforma</a>
            <a href="#carreiras">Carreiras</a>
            <a href="#planos">Planos</a>
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
          <Button
            variant="ghost"
            size="icon"
            className="text-white sm:hidden"
            aria-label="Abrir menu"
          >
            <Menu />
          </Button>
        </div>
      </header>

      <main>
        <section className="hero-professional">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="site-container relative z-10 grid min-h-[760px] items-center py-28 lg:grid-cols-[1.08fr_.92fr]">
            <div className="max-w-[720px] pt-8">
              <div className="eyebrow reveal-up">
                <Sparkles /> Inteligência aplicada à sua aprovação
              </div>
              <h1 className="hero-title reveal-up delay-1">
                Você não precisa estudar mais. Precisa estudar <em>na direção certa.</em>
              </h1>
              <p className="hero-copy reveal-up delay-2">
                Diagnóstico preciso, plano adaptativo e dados claros para transformar cada hora de
                estudo em avanço real rumo à nomeação.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row reveal-up delay-3">
                <Button size="lg" className="premium-button h-14 px-7 text-[15px]" asChild>
                  <Link to="/auth">
                    Montar meu plano gratuito <ArrowRight />
                  </Link>
                </Button>
                <a href="#plataforma" className="hero-secondary">
                  <CirclePlay /> Conhecer a plataforma
                </a>
              </div>
              <div className="hero-proof reveal-up delay-3 flex-wrap !gap-x-6 !gap-y-3">
                <span className="flex items-center gap-2 text-xs font-bold text-white/70">
                  <ScrollText className="h-4 w-4 shrink-0 text-emerald-300" />
                  Conteúdo com fonte oficial verificada
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-white/70">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />
                  Sem cartão de crédito para começar
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-white/70">
                  <Clock3 className="h-4 w-4 shrink-0 text-emerald-300" />
                  Seu plano pronto em minutos
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
            <div className="site-container grid grid-cols-2 gap-6 md:grid-cols-4">
              <div>
                <strong>+12 mil</strong>
                <span>questões comentadas</span>
              </div>
              <div>
                <strong>360°</strong>
                <span>visão do desempenho</span>
              </div>
              <div>
                <strong>24h</strong>
                <span>para seu primeiro plano</span>
              </div>
              <div>
                <strong>1 rota</strong>
                <span>feita para o seu objetivo</span>
              </div>
            </div>
          </div>
        </section>

        <section id="metodo" className="section-pad bg-[#f6f8fb]">
          <div className="site-container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">Método Norte</span>
                <h2>Clareza antes de velocidade.</h2>
              </div>
              <p>
                Uma jornada estruturada para você saber exatamente onde está, o que fazer hoje e
                como medir sua evolução.
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
                  <Brand />
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
                    <small>SEU PROGRESSO</small>
                    <h3>Continue avançando, Franc.</h3>
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
                  <small>IA NORTE</small>
                  <strong>Plano recalibrado</strong>
                </div>
                <Check />
              </div>
            </div>
            <div>
              <span className="section-kicker">Sua central de preparação</span>
              <h2 className="feature-title">
                Tudo conversa. Tudo aponta para a sua próxima melhor ação.
              </h2>
              <p className="feature-copy">
                Chega de ferramentas soltas, planilhas esquecidas e decisões no escuro. A Norte
                integra sua rotina em uma experiência simples, profunda e acionável.
              </p>
              <div className="feature-list">
                {(
                  [
                    ["Diagnóstico que encontra a causa do erro", FileSearch],
                    ["Prioridades recalculadas pelo seu desempenho", BrainCircuit],
                    ["Indicadores fáceis de entender e usar", LineChart],
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
                  Explorar a plataforma <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="section-pad bg-[#071a2f] text-white">
          <div className="site-container">
            <div className="section-heading light">
              <div>
                <span className="section-kicker">Ecossistema completo</span>
                <h2>Da dúvida à evolução.</h2>
              </div>
              <p>
                Recursos que trabalham juntos para manter foco, ritmo e confiança até o dia da
                prova.
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
                  <a href="#planos">
                    Saiba mais <ArrowRight />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="carreiras" className="section-pad career-section">
          <div className="site-container text-center">
            <span className="section-kicker">Do seu primeiro edital à nomeação</span>
            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold tracking-[-.04em] text-primary md:text-5xl">
              Uma plataforma. Todas as carreiras que movem o Brasil.
            </h2>
            <div className="career-cloud">
              {careers.map((career, i) => (
                <span key={career} className={i < 3 ? "featured" : ""}>
                  <Landmark />
                  {career}
                </span>
              ))}
            </div>
            <div className="testimonial-card">
              <Gavel className="h-8 w-8" aria-hidden="true" />
              <h3 className="mt-5 text-center text-xl font-black tracking-tight text-primary">
                Conteúdo com a seriedade que sua aprovação exige
              </h3>
              <ul className="mx-auto mt-6 max-w-xl space-y-3 text-left text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Toda questão é vinculada ao edital ativo e a uma fonte oficial verificada.
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Leis federais no texto compilado do Planalto; súmulas e jurisprudência, no
                  tribunal competente.
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Verificação de vigência antes de qualquer conteúdo jurídico ser publicado.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="planos" className="section-pad bg-[#f6f8fb]">
          <div className="site-container">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="section-kicker">Planos transparentes</span>
              <h2 className="mt-3 text-4xl font-extrabold tracking-[-.04em] text-primary md:text-5xl">
                Invista na preparação que sabe para onde ir.
              </h2>
            </div>
            <div className="pricing-grid">
              <Pricing
                name="Essencial"
                price="0"
                description="Para organizar os primeiros passos."
                features={["10 questões por dia", "Diagnóstico inicial", "Plano básico"]}
              />
              <Pricing
                featured
                name="Plus"
                price="39,90"
                description="Para acelerar com inteligência e constância."
                features={[
                  "Tudo do Essencial",
                  "Diagnóstico completo com IA",
                  "Plano adaptativo",
                  "150 ações de IA por mês",
                  "Assistente de estudos",
                ]}
              />
              <Pricing
                name="Premium"
                price="69,90"
                description="Para uma preparação de alta performance."
                features={[
                  "Tudo do Plus",
                  "500 ações de IA por mês",
                  "30 provas processadas",
                  "Suporte prioritário",
                ]}
              />
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="site-container relative z-10 text-center">
            <span className="eyebrow mx-auto">
              <Zap /> Seu próximo ciclo começa agora
            </span>
            <h2>
              Esforço sem direção cansa.
              <br />
              Esforço inteligente aprova.
            </h2>
            <p>
              Crie sua conta, defina seu objetivo e receba os próximos passos da sua preparação.
            </p>
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
            <Brand light />
            <p className="mt-5 max-w-xs">
              Tecnologia, método e clareza para transformar preparação em aprovação.
            </p>
          </div>
          <FooterColumn
            title="Plataforma"
            links={["Método", "Ferramentas", "Planos", "Carreiras"]}
          />
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

function Pricing({
  name,
  price,
  description,
  features,
  featured = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <article className={`pricing-card ${featured ? "featured" : ""}`}>
      {featured && <span className="popular-tag">MAIS ESCOLHIDO</span>}
      <div>
        <span className="plan-name">{name}</span>
        <p>{description}</p>
      </div>
      <div className="price">
        <small>R$</small>
        <strong>{price}</strong>
        <span>{price !== "0" ? "/mês" : "/15 dias"}</span>
      </div>
      <ul>
        {features.map((f) => (
          <li key={f}>
            <span>
              <Check />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <Button
        className={featured ? "premium-button" : ""}
        variant={featured ? "default" : "outline"}
        asChild
      >
        <Link to="/auth">
          Escolher {name}
          <ArrowRight />
        </Link>
      </Button>
    </article>
  );
}
function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
