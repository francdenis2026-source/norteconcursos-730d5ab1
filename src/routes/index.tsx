import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { 
  Compass, 
  ChevronRight, 
  Search, 
  BookOpen, 
  BarChart3, 
  Calendar, 
  Layers, 
  FileText, 
  CheckCircle2,
  Users,
  ShieldCheck,
  Zap,
  LayoutDashboard
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Norte Concurso | Seu estudo na direção certa",
    meta: [
      { name: "description", content: "Plataforma completa para preparação para concursos públicos com IA, diagnósticos e planos personalizados." },
      { property: "og:title", content: "Norte Concurso" },
      { property: "og:description", content: "Seu estudo na direção certa." },
    ]
  })
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Compass className="h-8 w-8 text-secondary" />
            <span className="text-xl font-bold tracking-tight text-primary">Norte Concurso</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-primary">Início</Link>
            <a href="#como-funciona" className="transition-colors hover:text-primary">Como funciona</a>
            <a href="#ferramentas" className="transition-colors hover:text-primary">Ferramentas</a>
            <a href="#concursos" className="transition-colors hover:text-primary">Concursos</a>
            <a href="#planos" className="transition-colors hover:text-primary">Planos</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-sm font-medium hover:underline hidden sm:block">Entrar</Link>
            <Button className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/auth">Começar grátis</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="container px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600">
                  <Zap className="mr-1 h-3.5 w-3.5" />
                  <span>Ambiente Demonstrativo Local</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary leading-tight">
                  Descubra onde você está errando e estude na <span className="text-secondary">direção certa.</span>
                </h1>
                <p className="text-lg text-muted-foreground md:max-w-[500px]">
                  Envie suas provas, identifique seus pontos fracos e receba um plano de estudo personalizado com inteligência artificial.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button size="lg" className="bg-primary text-lg h-14 px-8" asChild>
                    <Link to="/auth">Testar grátis por 15 dias</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg h-14 px-8 group">
                    Conhecer as ferramentas
                    <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-xl bg-muted shadow-2xl overflow-hidden border">
                  <div className="p-4 bg-primary/5 flex items-center justify-between border-b">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="text-xs text-muted-foreground">Painel de Evolução - Norte Concurso</div>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-4">
                    <div className="h-32 rounded-lg bg-card border shadow-sm flex items-center justify-center">
                      <BarChart3 className="h-12 w-12 text-secondary/40" />
                    </div>
                    <div className="h-32 rounded-lg bg-card border shadow-sm flex items-center justify-center">
                      <Calendar className="h-12 w-12 text-primary/40" />
                    </div>
                    <div className="col-span-2 h-40 rounded-lg bg-card border shadow-sm flex items-center justify-center">
                      <LayoutDashboard className="h-16 w-16 text-muted/40" />
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
                <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-accent/20 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section id="como-funciona" className="py-20 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">Como funciona</h2>
              <p className="mt-4 text-muted-foreground">O caminho para sua aprovação em quatro passos simples</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Escolha o concurso", desc: "Selecione a carreira ou órgão que você deseja focar.", icon: Search },
                { step: "2", title: "Envie sua prova", desc: "Suba uma prova realizada e o gabarito oficial.", icon: FileText },
                { step: "3", title: "Receba o diagnóstico", desc: "Nossa IA detalha seu desempenho e falhas.", icon: BarChart3 },
                { step: "4", title: "Siga seu plano", desc: "Estude com cronograma personalizado para você.", icon: CheckCircle2 }
              ].map((item, idx) => (
                <div key={idx} className="relative p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-shadow">
                  <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    <item.icon className="h-10 w-10 text-primary/60" />
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ferramentas */}
        <section id="ferramentas" className="py-20">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">Ferramentas poderosas</h2>
              <p className="mt-4 text-muted-foreground">Tudo o que você precisa para dominar o conteúdo e gerenciar seu tempo</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Diagnóstico de provas", "Plano de estudo inteligente", "Banco de questões", "Simulados",
                "Flashcards", "Resumos", "Áudio de revisão", "Treino de redação",
                "Gerador de mnemônicos", "Caderno de erros", "Painel de evolução"
              ].map((tool, idx) => (
                <div key={idx} className="p-4 rounded-xl border bg-card flex items-center gap-3 hover:border-secondary/50 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                  <span className="text-sm font-medium">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Carreiras */}
        <section id="concursos" className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Prepare-se para qualquer carreira</h2>
              <p className="mt-4 text-primary-foreground/70">As melhores ferramentas para os concursos mais concorridos</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Polícia Federal", "Polícia Rodoviária Federal", "Polícias Civis", "Polícias Militares",
                "Polícia Penal", "Polícia Científica", "Tribunais", "Carreiras administrativas",
                "Carreiras fiscais", "Carreiras bancárias", "Controle e gestão", "Educação",
                "Saúde", "Prefeituras e câmaras"
              ].map((career, idx) => (
                <div key={idx} className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-default text-sm font-medium">
                  {career}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planos */}
        <section id="planos" className="py-20">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">Planos para todos os níveis</h2>
              <p className="mt-4 text-muted-foreground">Escolha o plano que melhor se adapta à sua jornada</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Teste */}
              <div className="p-8 rounded-2xl border bg-card flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-bold">Teste Gratuito</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold">R$ 0</span>
                    <span className="text-muted-foreground text-sm">/15 dias</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> 10 questões / dia</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> 1 Diagnóstico de prova</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> Plano básico</li>
                </ul>
                <Button variant="outline" className="mt-auto w-full">Começar agora</Button>
              </div>

              {/* Plus - Destaque */}
              <div className="p-8 rounded-2xl border-2 border-secondary bg-card flex flex-col gap-6 relative shadow-xl transform md:-translate-y-4">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Mais recomendado
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">Plus</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">R$ 39,90</span>
                    <span className="text-muted-foreground text-sm">/mês</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> <b>Tudo do Essencial</b></li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> Diagnóstico com IA</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> Planejador adaptativo</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> 150 ações de IA / mês</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> Assistente de estudos</li>
                </ul>
                <Button className="mt-auto w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold">Assinar Plus</Button>
              </div>

              {/* Premium */}
              <div className="p-8 rounded-2xl border bg-card flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-bold">Premium</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold">R$ 69,90</span>
                    <span className="text-muted-foreground text-sm">/mês</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-3 text-sm">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> <b>Tudo do Plus</b></li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> 500 ações de IA / mês</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> 30 provas processadas</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-secondary" /> Prioridade no suporte</li>
                </ul>
                <Button variant="outline" className="mt-auto w-full">Assinar Premium</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 pt-16 pb-8">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Compass className="h-6 w-6 text-secondary" />
                <span className="text-lg font-bold tracking-tight text-primary">Norte Concurso</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Seu estudo na direção certa. A plataforma definitiva para transformar seu esforço em aprovação.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Plataforma</h4>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Como funciona</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Ferramentas</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Perguntas frequentes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Institucional</h4>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Termos de uso</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Política de privacidade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Suporte</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Aviso Legal</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A Norte Concurso é uma plataforma de tecnologia educacional independente. Não possuímos vínculo com órgãos públicos ou bancas examinadoras.
              </p>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-xs text-muted-foreground">
            © 2026 Norte Concurso. Todos os direitos reservados. Inicialmente lançado em Feijó, Acre.
          </div>
        </div>
      </footer>
    </div>
  );
}
