import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
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
import { validateCPF } from "@/lib/utils";

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
  const [login, setLogin] = useState("");
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
        if (!validateCPF(cpfDigits)) throw new Error("CPF inválido. Confira os números.");
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password: pin,
          options: {
            data: { full_name: name, cpf: cpfDigits },
            emailRedirectTo: `${window.location.origin}/auth`,
          },
        });
        if (error) {
          // O trigger de perfil rejeita CPF repetido; o Auth devolve isso como erro genérico.
          if (/database error/i.test(error.message)) throw new Error("CPF ou e-mail já cadastrado.");
          throw error;
        }
        if (data.session) {
          toast.success("Conta criada!");
          navigate({ to: "/dashboard" });
        } else {
          toast.success("Conta criada! Confirme seu e-mail pelo link que enviamos para entrar.");
          setMode("login");
        }
      } else {
        // Contas antigas entram pelo CPF (e-mail interno); contas novas, pelo e-mail real.
        const id = login.trim();
        let loginEmail = id.toLowerCase();
        if (!id.includes("@")) {
          const cpfDigits = normalizeCpf(id);
          if (!validateCPF(cpfDigits)) throw new Error("CPF inválido. Confira os números.");
          loginEmail = `${cpfDigits}@norteconcurso.local`;
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
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
    <main className="auth-shell">
      <section className="auth-visual">
        <div className="auth-visual-image" />
        <div className="auth-visual-content">
          <Link to="/" className="brand-lockup">
            <NorteBrand light />
          </Link>
          <div className="auth-message">
            <span className="eyebrow">
              <Sparkles /> Preparação para carreiras policiais
            </span>
            <h1>Entre em operação com um plano claro.</h1>
            <p>
              Acesse o ambiente que transforma questões, simulados e desempenho em decisões de
              estudo.
            </p>
          </div>
          <div className="auth-benefits">
            <span>
              <Target /> Prioridades personalizadas
            </span>
            <span>
              <Trophy /> Evolução mensurável
            </span>
            <span>
              <ShieldCheck /> Dados protegidos
            </span>
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
          <div className="auth-heading">
            <span>{mode === "login" ? "BEM-VINDO DE VOLTA" : "COMECE SUA JORNADA"}</span>
            <h2>{mode === "login" ? "Acesse sua preparação" : "Crie sua conta gratuita"}</h2>
            <p>
              {mode === "login"
                ? "Entre com seu e-mail (ou CPF, em contas antigas) e continue de onde parou."
                : "Leva menos de dois minutos para começar."}
            </p>
          </div>
          <form onSubmit={handleAuth} className="auth-form">
            {mode === "register" && (
              <div className="auth-field">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Como podemos chamar você?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            {mode === "register" && (
              <div className="auth-field">
                <Label htmlFor="email">E-mail</Label>
                <div>
                  <Mail />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            {mode === "register" ? (
              <div className="auth-field">
                <Label htmlFor="cpf">CPF</Label>
                <div>
                  <UserRound />
                  <Input
                    id="cpf"
                    inputMode="numeric"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(formatCpf(e.target.value))}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="auth-field">
                <Label htmlFor="login">E-mail ou CPF</Label>
                <div>
                  <UserRound />
                  <Input
                    id="login"
                    autoComplete="username"
                    placeholder="seuemail@exemplo.com ou CPF"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div className="auth-field">
              <div className="flex items-center justify-between">
                <Label htmlFor="pin">Senha de acesso</Label>
                {mode === "login" && <button type="button">Esqueci minha senha</button>}
              </div>
              <div>
                <Lock />
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
                <button
                  type="button"
                  aria-label="Mostrar senha"
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            {mode === "register" && (
              <label className="auth-terms">
                <Checkbox required />
                <span>
                  Aceito os <Link to="/terms">termos de uso</Link> e a{" "}
                  <Link to="/privacy">política de privacidade</Link>.
                </span>
              </label>
            )}
            <Button type="submit" className="premium-button h-12 w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Entrar na plataforma" : "Criar minha conta"}
                  <ArrowRight />
                </>
              )}
            </Button>
          </form>
          <div className="auth-switch">
            <span>{mode === "login" ? "Ainda não tem uma conta?" : "Já faz parte da Norte?"}</span>
            <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Criar conta grátis" : "Fazer login"}
            </button>
          </div>
          <div className="auth-security">
            <ShieldCheck />
            <span>Ambiente criptografado e seguro</span>
            <Check />
          </div>
        </div>
      </section>
    </main>
  );
}
