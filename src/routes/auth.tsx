import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  IdCard,
  Loader2,
  Lock,
  Mail,
  UserRound,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { NorteBrand } from "@/components/brand/NorteBrand";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: search.mode === "register" ? "register" : undefined,
  }),
  component: AuthPage,
  head: () => ({
    title: "Acessar plataforma | Norte Concurso",
    meta: [{ name: "description", content: "Entre na sua central de preparação Norte Concurso." }],
  }),
});

function AuthPage() {
  const routeSearch = Route.useSearch();
  const [mode, setMode] = useState<"login" | "register">(routeSearch.mode || "login");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const normalizeCpf = (value: string) => value.replace(/\D/g, "").slice(0, 11);
  const formatCpf = (value: string) => {
    const digits = normalizeCpf(value);
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === "register") {
        const cpfDigits = normalizeCpf(cpf);
        if (cpfDigits.length !== 11) throw new Error("Informe um CPF com 11 números.");
        const { error } = await supabase.auth.signUp({
          email: `${cpfDigits}@norteconcurso.local`,
          password: pin,
          options: { data: { full_name: name, cpf: cpfDigits, contact_email: email } },
        });
        if (error) throw error;
        toast.success("Conta criada! Agora você pode acessar com seu CPF.");
      } else {
        const cpfDigits = normalizeCpf(cpf);
        if (cpfDigits.length !== 11) throw new Error("Informe um CPF com 11 números.");
        const { error } = await supabase.auth.signInWithPassword({
          email: `${cpfDigits}@norteconcurso.local`,
          password: pin,
        });
        if (error) throw error;
        toast.success("Bem-vindo à sua preparação!");
        navigate({ to: "/dashboard" });
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Não foi possível autenticar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth">
      <section className="auth-visual">
        <Link to="/" aria-label="Norte Concurso — início" className="w-fit">
          <NorteBrand light />
        </Link>
        <div>
          <span className="chip-brass">
            <Sparkles /> Preparação para carreiras policiais
          </span>
          <h1>
            Entre em operação com <em>um plano claro.</em>
          </h1>
          <p>
            Acesse o ambiente que transforma questões, simulados e desempenho em decisões de estudo.
          </p>
        </div>
        <div className="auth-benefits">
          <div>
            <Target />
            <strong>Prioridades personalizadas</strong>
            <span>Rota ajustada ao seu cargo e banca.</span>
          </div>
          <div>
            <Trophy />
            <strong>Evolução mensurável</strong>
            <span>Precisão e ritmo em cada sessão.</span>
          </div>
          <div>
            <ShieldCheck />
            <strong>Dados protegidos</strong>
            <span>Acesso individual por CPF.</span>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <Link to="/" className="auth-back">
            <ArrowLeft /> Voltar para o início
          </Link>
          <div className="auth-mobile-brand">
            <NorteBrand />
          </div>
          <div className="auth-tabs" role="tablist" aria-label="Tipo de acesso">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              onClick={() => setMode("login")}
            >
              Entrar
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "register"}
              onClick={() => setMode("register")}
            >
              Criar conta
            </button>
          </div>
          <div className="auth-heading">
            <h2>{mode === "login" ? "Acesse sua preparação" : "Crie sua conta gratuita"}</h2>
            <p>
              {mode === "login"
                ? "Entre com seu CPF e continue de onde parou."
                : "Leva menos de dois minutos para começar."}
            </p>
          </div>
          <form onSubmit={handleAuth} className="auth-form">
            {mode === "register" && (
              <div className="auth-field">
                <Label htmlFor="name">Nome completo</Label>
                <div className="auth-field__control">
                  <UserRound />
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Como podemos chamar você?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            {mode === "register" && (
              <div className="auth-field">
                <Label htmlFor="email">E-mail para contato</Label>
                <div className="auth-field__control">
                  <Mail />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div className="auth-field">
              <Label htmlFor="cpf">CPF</Label>
              <div className="auth-field__control">
                <IdCard />
                <Input
                  id="cpf"
                  inputMode="numeric"
                  autoComplete="username"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(formatCpf(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="auth-field">
              <div className="flex items-center justify-between">
                <Label htmlFor="pin">Senha de acesso</Label>
                {mode === "login" && (
                  <button
                    type="button"
                    className="auth-link"
                    onClick={() =>
                      toast.info("Para redefinir sua senha, fale com o suporte da Norte Concurso.")
                    }
                  >
                    Esqueci minha senha
                  </button>
                )}
              </div>
              <div className="auth-field__control">
                <Lock />
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  placeholder="Digite sua senha"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-field__toggle"
                  aria-label={showPin ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            {mode === "register" && (
              <label className="auth-terms">
                <Checkbox required className="mt-0.5" />
                <span>
                  Aceito os <Link to="/terms">termos de uso</Link> e a{" "}
                  <Link to="/privacy">política de privacidade</Link>.
                </span>
              </label>
            )}
            <button type="submit" className="btn-brass auth-submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Entrar na plataforma" : "Criar minha conta"}
                  <ArrowRight />
                </>
              )}
            </button>
          </form>
          <div className="auth-security">
            <ShieldCheck />
            <span>Ambiente criptografado · seus dados não são compartilhados</span>
          </div>
        </div>
      </section>
    </main>
  );
}
